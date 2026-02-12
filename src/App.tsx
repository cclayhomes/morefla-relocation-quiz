import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import logoUrl from './assets/more-fla-logo.svg';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { LandingPage } from './components/LandingPage';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import { areaProfiles, filterByConstruction, filterBySize, getBudgetAllowedAreas, questions } from './data/quizData';
import { AREA_KEYS, AreaKey, BudgetBracket, ConstructionPreference, LeadFormData, QuizOption, SizeNeed } from './types';
import { sendEvent } from './utils/analytics';

type Stage = 'landing' | 'quiz' | 'lead' | 'result';

type AnswerMap = {
  q1_schools_importance: string;
  q2_school_priority: string;
  q3_work_location: string;
  q4_commute_tolerance: string;
  q5_visitor_frequency: string;
  q6_weekend_activity: string;
  q7_neighborhood_type: string;
  q8_hoa_preference: string;
  q9_airport_access: string;
  q10_dining_preference: string;
  q11_budget: string;
  q12_home_size: string;
  q13_construction_type: string;
};

type UtmParams = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

const baseScores = AREA_KEYS.reduce((scores, key) => {
  scores[key] = 0;
  return scores;
}, {} as Record<AreaKey, number>);

const schoolScores = { 'A+': 3, A: 2.5, 'A-': 2, 'B+': 1, B: 0.5, 'B-': 0 };

const defaultAnswerValues: AnswerMap = {
  q1_schools_importance: '',
  q2_school_priority: '',
  q3_work_location: '',
  q4_commute_tolerance: '',
  q5_visitor_frequency: '',
  q6_weekend_activity: '',
  q7_neighborhood_type: '',
  q8_hoa_preference: '',
  q9_airport_access: '',
  q10_dining_preference: '',
  q11_budget: '',
  q12_home_size: '',
  q13_construction_type: ''
};

const questionToAnswerKey: Record<number, keyof AnswerMap> = {
  1: 'q1_schools_importance',
  2: 'q2_school_priority',
  3: 'q3_work_location',
  4: 'q4_commute_tolerance',
  5: 'q5_visitor_frequency',
  6: 'q6_weekend_activity',
  7: 'q7_neighborhood_type',
  8: 'q8_hoa_preference',
  9: 'q9_airport_access',
  10: 'q10_dining_preference',
  11: 'q11_budget',
  12: 'q12_home_size',
  13: 'q13_construction_type'
};

const answerTagPrefixes: Record<keyof AnswerMap, string> = {
  q1_schools_importance: 'PREF_SchoolsImportance',
  q2_school_priority: 'PREF_SchoolPriority',
  q3_work_location: 'PREF_WorkLocation',
  q4_commute_tolerance: 'PREF_CommuteTolerance',
  q5_visitor_frequency: 'PREF_VisitorFrequency',
  q6_weekend_activity: 'PREF_WeekendActivity',
  q7_neighborhood_type: 'PREF_NeighborhoodType',
  q8_hoa_preference: 'PREF_HOA',
  q9_airport_access: 'PREF_AirportAccess',
  q10_dining_preference: 'PREF_DiningPreference',
  q11_budget: 'PREF_Budget',
  q12_home_size: 'PREF_HomeSize',
  q13_construction_type: 'PREF_ConstructionType'
};

const formatTagValue = (value: string) =>
  value
    .trim()
    .replace(/\+/g, 'plus')
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '');

const readInitialUtms = (): UtmParams => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content: params.get('utm_content') ?? '',
    utm_term: params.get('utm_term') ?? ''
  };
};

// Check if URL has ?start=quiz or #quiz to skip landing
const shouldSkipLanding = (): boolean => {
  const params = new URLSearchParams(window.location.search);
  return params.get('start') === 'quiz' || window.location.hash === '#quiz';
};

function getActiveQuestions(skipSchoolPriority: boolean) {
  return questions.filter((q) => !(skipSchoolPriority && q.id === 2));
}

function App() {
  const [stage, setStage] = useState<Stage>(() => shouldSkipLanding() ? 'quiz' : 'landing');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<AreaKey, number>>(baseScores);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetBracket>('400to500');
  const [sizeChoice, setSizeChoice] = useState<SizeNeed>(2000);
  const [constructionChoice, setConstructionChoice] = useState<ConstructionPreference>('either');
  const [insights, setInsights] = useState<string[]>([]);
  const [skipSchoolPriority, setSkipSchoolPriority] = useState(false);
  const [workPreference, setWorkPreference] = useState('remote');
  const [answerValues, setAnswerValues] = useState<AnswerMap>(defaultAnswerValues);
  const [utmParams] = useState<UtmParams>(() => readInitialUtms());

  const activeQuestions = useMemo(() => getActiveQuestions(skipSchoolPriority), [skipSchoolPriority]);
  const currentQuestion = activeQuestions[questionIndex];

  const rankedMatches = useMemo(() => {
    const budgetAllowed = getBudgetAllowedAreas(budgetChoice);
    return AREA_KEYS.map((key) => ({ area: areaProfiles[key], score: scores[key] }))
      .filter((item) => budgetAllowed.has(item.area.key))
      .filter((item) => filterBySize(item.area, sizeChoice))
      .filter((item) => filterByConstruction(item.area, constructionChoice))
      .sort((a, b) => b.score - a.score || a.area.medianPrice - b.area.medianPrice);
  }, [scores, budgetChoice, sizeChoice, constructionChoice]);

  const addPoints = (areaKeys: AreaKey[], points: number, current: Record<AreaKey, number>) => {
    areaKeys.forEach((key) => {
      current[key] += points;
    });
  };

  const scoreQuestion = (questionId: number, selected: QuizOption, current: Record<AreaKey, number>) => {
    AREA_KEYS.forEach((key) => {
      const area = areaProfiles[key];
      if (questionId === 1 && selected.value !== 'noKids') current[key] += schoolScores[area.schoolRating];
      if (questionId === 2 && selected.value === 'solid' && ['A+', 'A', 'A-'].includes(area.schoolRating)) current[key] += 1.5;
      if (questionId === 3) {
        if (selected.value === 'orlando') current[key] += area.commuteOrlando === 'close' ? 3 : area.commuteOrlando === 'medium' ? 1 : 0;
        if (selected.value === 'tampa') current[key] += area.commuteTampa === 'close' ? 3 : area.commuteTampa === 'medium' ? 1 : 0;
        if (selected.value === 'i4') current[key] += area.commuteI4 === 'close' ? 3 : area.commuteI4 === 'medium' ? 1 : 0;
      }
      if (questionId === 4) {
        const map = workPreference === 'orlando' ? area.commuteOrlando : workPreference === 'tampa' ? area.commuteTampa : area.commuteI4;
        if (selected.value === 'under20') current[key] += map === 'close' ? 3 : 0;
        if (selected.value === '20to35') current[key] += map === 'close' ? 2 : map === 'medium' ? 2 : 0;
        if (selected.value === '35to45') current[key] += map !== 'far' ? 1.5 : 1;
      }
      if (questionId === 5 && selected.value === 'constantly') current[key] += area.nearAttractions ? 2 : 0;
      if (questionId === 6) {
        if (selected.value === 'water') current[key] += area.waterAccess === 'excellent' ? 3 : area.waterAccess === 'good' ? 1 : 0;
        if (selected.value === 'golf' && area.golfCommunities) current[key] += 2;
        if (selected.value === 'downtown' && area.downtownWalkable) current[key] += 2;
        if (selected.value === 'markets' && area.farmersMarkets) current[key] += 2;
        if (selected.value === 'trails' && area.natureTrails) current[key] += 2;
        if (selected.value === 'quiet') current[key] += area.hoaLevel === 'none' ? 2 : 0;
      }
      if (questionId === 7) {
        if (selected.value === 'new' && area.neighborhoodType === 'new') current[key] += 2;
        if (selected.value === 'established' && area.neighborhoodType === 'established') current[key] += 2;
        if (selected.value === 'mix' && area.neighborhoodType === 'mixed') current[key] += 1.5;
      }
      if (questionId === 8) {
        if (selected.value === 'full' && area.hoaLevel === 'full') current[key] += 2;
        if (selected.value === 'light' && (area.hoaLevel === 'light' || area.hoaLevel === 'mixed')) current[key] += 1.5;
        if (selected.value === 'none' && area.hoaLevel === 'none') current[key] += 2;
      }
      if (questionId === 9) {
        const bestAirport = Math.min(area.airportMCO, area.airportTPA, area.airportSRQ);
        if (selected.value === 'very') current[key] += bestAirport <= 30 ? 3 : bestAirport <= 45 ? 1 : 0;
        if (selected.value === 'somewhat') current[key] += bestAirport <= 45 ? 2 : 1;
      }
      if (questionId === 10) {
        if (selected.value === area.diningStyle) current[key] += 2;
        if (selected.value === 'mixed' && area.diningStyle === 'mixed') current[key] += 1;
      }
    });
    if (questionId === 2 && selected.value === 'academics') addPoints(['winterParkMaitland', 'lakeNona', 'lakewoodRanch', 'windermere'], 3, current);
    if (questionId === 2 && selected.value === 'sports') addPoints(['wesleyChapelNewTampa', 'lakewoodRanch', 'brandon'], 3, current);
    if (questionId === 2 && selected.value === 'private') addPoints(['winterParkMaitland', 'southTampa', 'lakeNona', 'drPhillips'], 3, current);
    if (questionId === 3 && selected.value === 'orlando') addPoints(['winterGarden', 'lakeNona', 'winterParkMaitland', 'apopka', 'sanford'], 3, current);
    if (questionId === 3 && selected.value === 'tampa') addPoints(['wesleyChapelNewTampa', 'brandon', 'riverview', 'southTampa', 'landOLakes'], 3, current);
    if (questionId === 3 && selected.value === 'i4') addPoints(['lakeland', 'winterHaven', 'hainesCity', 'plantCity', 'auburndale'], 3, current);
    if (questionId === 5 && selected.value === 'constantly') {
      addPoints(['kissimmeeStCloud', 'davenport', 'celebration', 'winterGarden'], 3, current);
      addPoints(['stPetersburg', 'clearwater', 'sarasota'], 2, current);
    }
    if (questionId === 6 && selected.value === 'water') addPoints(['winterHaven', 'clermont', 'sanford', 'mountDora', 'lakeland'], 3, current);
    if (questionId === 6 && selected.value === 'golf') addPoints(['lakewoodRanch', 'lakeNona', 'wesleyChapelNewTampa'], 3, current);
    if (questionId === 6 && selected.value === 'downtown') addPoints(['winterParkMaitland', 'stPetersburg', 'southTampa', 'mountDora', 'sarasota'], 3, current);
    if (questionId === 6 && selected.value === 'markets') addPoints(['plantCity', 'mountDora', 'winterGarden', 'lakeland'], 3, current);
    if (questionId === 6 && selected.value === 'trails') addPoints(['clermont', 'sanford', 'landOLakes'], 3, current);
    if (questionId === 6 && selected.value === 'quiet') addPoints(['lakeWales', 'lakeAlfred', 'grovelandMascotte', 'parrish'], 3, current);
    if (questionId === 7 && selected.value === 'new') addPoints(['wesleyChapelNewTampa', 'riverview', 'parrish', 'horizonWest', 'grovelandMascotte', 'davenport'], 3, current);
    if (questionId === 7 && selected.value === 'established') addPoints(['winterParkMaitland', 'southTampa', 'mountDora', 'sanford', 'celebration'], 3, current);
    if (questionId === 7 && selected.value === 'value') addPoints(['lakeland', 'winterHaven', 'hainesCity', 'lakeWales', 'auburndale', 'kissimmeeStCloud', 'grovelandMascotte'], 3, current);
    if (questionId === 8 && selected.value === 'full') addPoints(['lakewoodRanch', 'wesleyChapelNewTampa', 'lakeNona', 'horizonWest'], 3, current);
    if (questionId === 8 && selected.value === 'none') addPoints(['plantCity', 'lakeWales', 'lakeAlfred', 'sanford', 'apopka'], 3, current);
  };

  const handleStartQuiz = () => {
    sendEvent('landing_start_quiz', {});
    setStage('quiz');
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];
    if (questionIndex === 0) {
      sendEvent('quiz_start', { questionId: currentQuestion.id });
    }
    sendEvent('quiz_answer', { questionId: currentQuestion.id, value: selectedOption.value });

    const answerKey = questionToAnswerKey[currentQuestion.id];
    const nextAnswerValues = { ...answerValues, [answerKey]: selectedOption.value };
    setAnswerValues(nextAnswerValues);

    setScores((current) => {
      const next = { ...current };
      scoreQuestion(currentQuestion.id, selectedOption, next);
      return next;
    });

    if (currentQuestion.id === 1) setSkipSchoolPriority(selectedOption.value === 'noKids');
    if (currentQuestion.id === 3) setWorkPreference(selectedOption.value);
    if (selectedOption.budgetValue) setBudgetChoice(selectedOption.budgetValue);
    if (selectedOption.sizeValue) setSizeChoice(selectedOption.sizeValue);
    if (selectedOption.constructionValue) setConstructionChoice(selectedOption.constructionValue);
    if (selectedOption.insight) setInsights((current) => (current.includes(selectedOption.insight!) ? current : [...current, selectedOption.insight!]));

    const nextQuestions = getActiveQuestions(currentQuestion.id === 1 ? selectedOption.value === 'noKids' : skipSchoolPriority);
    if (questionIndex === nextQuestions.length - 1) {
      sendEvent('quiz_complete', { answers: nextAnswerValues });
      setStage('lead');
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  const handleLeadSubmit = (form: LeadFormData) => {
    setLeadData(form);
    setStage('result');
    sendEvent('lead_submit', { timeline: form.timeline, wantsCommunityInfo: form.wantsCommunityInfo });

    const topMatches = rankedMatches.slice(0, 3).map((match) => ({
      area: match.area.title,
      region: match.area.region,
      score: match.score,
      medianPrice: match.area.medianPrice,
      key: match.area.key
    }));

    const answerTags = Object.entries(answerValues)
      .filter(([, value]) => Boolean(value))
      .map(([key, value]) => `${answerTagPrefixes[key as keyof AnswerMap]}_${formatTagValue(value)}`);

    const tags = [
      'SRC_RelocationQuiz',
      `INT_Timeline_${formatTagValue(form.timeline)}`,
      ...answerTags,
      ...topMatches.map((match) => `MATCH_${match.key}`),
      ...(form.wantsCommunityInfo ? ['OPT_CommunityInfo_Yes'] : [])
    ];

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL?.trim();
    if (!webhookUrl) {
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      source: 'morefla-relocation-quiz',
      lead: {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        timeline: form.timeline,
        wantsCommunityInfo: form.wantsCommunityInfo
      },
      answers: answerValues,
      topMatches: topMatches.map(({ key, ...match }) => match),
      insights,
      tags,
      metadata: {
        userAgent: window.navigator.userAgent,
        referrer: document.referrer,
        pageUrl: window.location.href,
        ...utmParams
      }
    };

    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {
      // fire-and-forget by design
    });
  };

  const restartQuiz = () => {
    setStage('landing');
    setQuestionIndex(0);
    setScores(baseScores);
    setLeadData(null);
    setBudgetChoice('400to500');
    setSizeChoice(2000);
    setConstructionChoice('either');
    setInsights([]);
    setSkipSchoolPriority(false);
    setWorkPreference('remote');
    setAnswerValues(defaultAnswerValues);
  };

  // If on landing page, show LandingPage component
  if (stage === 'landing') {
    return <LandingPage onStartQuiz={handleStartQuiz} />;
  }

  return (
    <div className="min-h-screen bg-sand">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <img src={logoUrl} alt="More FLA Homes" className="h-10 w-10" />
          <div>
            <p className="text-sm font-bold text-lagoon">More FLA Homes</p>
            <p className="text-xs text-slate-500">Relocation Match Quiz</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 rounded-xl border border-citrus/20 bg-citrus/5 px-4 py-3 text-center">
          <h1 className="text-lg font-bold text-lagoon md:text-xl">Relocation Match Quiz</h1>
          <p className="mt-1 text-sm text-slate-600">
            Answer targeted questions to reveal your top 3 Florida area matches across 30+ local markets.
          </p>
        </div>

        {stage === 'quiz' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={questionIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:p-6"
            >
              <ProgressBar current={questionIndex + 1} total={activeQuestions.length} />
              <h2 className="mt-4 text-base font-semibold text-slate-800 md:text-lg">{currentQuestion.prompt}</h2>
              <div className="mt-4 space-y-2">
                {currentQuestion.options.map((option, optionIndex) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelectAnswer(optionIndex)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-lagoon hover:bg-cyan-50"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {stage === 'lead' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:p-6">
            <h2 className="text-lg font-bold text-lagoon">You are one step away from your top 3 matches</h2>
            <p className="mt-2 text-sm text-slate-600">
              We scored your answers and filtered by budget, home size, and new-vs-resale fit. Share your info to unlock your ranked results.
            </p>
            <LeadCaptureForm onSubmit={handleLeadSubmit} />
          </motion.div>
        )}

        {stage === 'result' && leadData && (
          <ResultsCard rankedMatches={rankedMatches} insights={insights} leadData={leadData} timeline={leadData.timeline} onRestart={restartQuiz} />
        )}
      </main>
    </div>
  );
}

export default App;
