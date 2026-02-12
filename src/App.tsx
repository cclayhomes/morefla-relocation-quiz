import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import logoUrl from './assets/more-fla-logo.svg';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import { areaProfiles, filterByConstruction, filterBySize, getBudgetAllowedAreas, questions } from './data/quizData';
import { sendEvent } from './utils/analytics';
import { AREA_KEYS, AreaKey, BudgetBracket, ConstructionPreference, LeadFormData, QuizOption, SizeNeed } from './types';

type Stage = 'quiz' | 'lead' | 'result';
type WeeklyPreference = 'tampa' | 'pinellas' | 'sarasota' | 'orlando' | 'remote';
type AnswerMap = {
  q1_lifestyle: string;
  q2_weekday: string;
  q3_commute: string;
  q4_budget: string;
  q5_schools: string;
  q6_fees: string;
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

const defaultAnswers: AnswerMap = {
  q1_lifestyle: '',
  q2_weekday: '',
  q3_commute: '',
  q4_budget: '',
  q5_schools: '',
  q6_fees: ''
};

const questionToAnswerKey: Record<number, keyof AnswerMap> = {
  1: 'q1_lifestyle',
  2: 'q2_weekday',
  3: 'q3_commute',
  4: 'q4_budget',
  5: 'q5_schools',
  6: 'q6_fees'
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

function App() {
  const [stage, setStage] = useState<Stage>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<AreaKey, number>>(baseScores);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetBracket>('400to500');
  const [sizeChoice] = useState<SizeNeed>(2000);
  const [constructionChoice] = useState<ConstructionPreference>('either');
  const [insights, setInsights] = useState<string[]>([]);
  const [weeklyPreference, setWeeklyPreference] = useState<WeeklyPreference>('remote');
  const [answers, setAnswers] = useState<AnswerMap>(defaultAnswers);
  const [utmParams] = useState<UtmParams>(() => readInitialUtms());

  const currentQuestion = questions[questionIndex];

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

      if (questionId === 1) {
        if (selected.value === 'beach') current[key] += area.waterAccess === 'excellent' ? 3 : area.waterAccess === 'good' ? 1 : 0;
        if (selected.value === 'themeparks') current[key] += area.nearAttractions ? 3 : 0;
        if (selected.value === 'city') current[key] += (area.downtownWalkable ? 2 : 0) + (area.strongSports ? 1 : 0);
        if (selected.value === 'suburban') current[key] += (area.neighborhoodType === 'new' || area.neighborhoodType === 'mixed' ? 1.5 : 0) + (area.natureTrails ? 1.5 : 0);
        if (selected.value === 'spacevalue') current[key] += (area.medianPrice <= 450000 ? 2 : 0) + (area.hoaLevel === 'none' || area.hoaLevel === 'light' ? 1.5 : 0);
      }

      if (questionId === 2) {
        if (selected.value === 'orlando') current[key] += area.commuteOrlando === 'close' ? 3 : area.commuteOrlando === 'medium' ? 1 : 0;
        if (selected.value === 'tampa' || selected.value === 'pinellas') current[key] += area.commuteTampa === 'close' ? 3 : area.commuteTampa === 'medium' ? 1 : 0;
        if (selected.value === 'sarasota') current[key] += area.airportSRQ <= 30 ? 3 : area.airportSRQ <= 50 ? 1 : 0;
        if (selected.value === 'remote') current[key] += area.neighborhoodType === 'mixed' ? 1 : 0;
      }

      if (questionId === 3) {
        const commuteBand =
          weeklyPreference === 'orlando'
            ? area.commuteOrlando
            : weeklyPreference === 'tampa' || weeklyPreference === 'pinellas'
              ? area.commuteTampa
              : weeklyPreference === 'sarasota'
                ? area.airportSRQ <= 30
                  ? 'close'
                  : area.airportSRQ <= 50
                    ? 'medium'
                    : 'far'
                : area.commuteI4;

        if (selected.value === 'under25') current[key] += commuteBand === 'close' ? 3 : 0;
        if (selected.value === '25to45') current[key] += commuteBand === 'close' ? 2 : commuteBand === 'medium' ? 2 : 0;
        if (selected.value === '45to75') current[key] += commuteBand === 'far' ? 1 : 1.5;
        if (selected.value === 'longok') current[key] += 1;
      }

      if (questionId === 5) {
        if (selected.value === 'must') current[key] += schoolScores[area.schoolRating] * 1.2;
        if (selected.value === 'nice') current[key] += schoolScores[area.schoolRating] * 0.6;
      }

      if (questionId === 6) {
        if (selected.value === 'amenities') current[key] += area.hoaLevel === 'full' ? 3 : area.hoaLevel === 'mixed' ? 1.5 : 0;
        if (selected.value === 'moderate') current[key] += area.hoaLevel === 'light' || area.hoaLevel === 'mixed' ? 2 : 0;
        if (selected.value === 'lowfees') current[key] += area.hoaLevel === 'none' ? 3 : area.hoaLevel === 'light' ? 1.5 : 0;
      }
    });

    if (questionId === 1 && selected.value === 'beach') addPoints(['clearwater', 'stPetersburg', 'sarasota', 'bradenton', 'lakewoodRanch'], 3, current);
    if (questionId === 1 && selected.value === 'themeparks') addPoints(['winterGarden', 'horizonWest', 'drPhillips', 'celebration', 'lakeNona'], 3, current);
    if (questionId === 1 && selected.value === 'city') addPoints(['southTampa', 'stPetersburg', 'winterParkMaitland', 'sarasota'], 3, current);
    if (questionId === 1 && selected.value === 'suburban') addPoints(['wesleyChapelNewTampa', 'landOLakes', 'parrish', 'clermont', 'horizonWest'], 3, current);
    if (questionId === 1 && selected.value === 'spacevalue') addPoints(['lakeWales', 'hainesCity', 'auburndale', 'grovelandMascotte', 'lakeland'], 3, current);

    if (questionId === 2 && selected.value === 'pinellas') addPoints(['stPetersburg', 'clearwater', 'southTampa', 'brandon', 'riverview'], 3, current);
    if (questionId === 2 && selected.value === 'sarasota') addPoints(['sarasota', 'bradenton', 'lakewoodRanch', 'parrish'], 3, current);
    if (questionId === 2 && selected.value === 'orlando') addPoints(['winterGarden', 'horizonWest', 'lakeNona', 'winterParkMaitland', 'drPhillips'], 3, current);
    if (questionId === 2 && selected.value === 'tampa') addPoints(['southTampa', 'wesleyChapelNewTampa', 'brandon', 'riverview', 'landOLakes'], 3, current);

    if (questionId === 5 && selected.value === 'must') addPoints(['winterParkMaitland', 'lakeNona', 'windermere', 'winterGarden', 'lakewoodRanch'], 3, current);
    if (questionId === 6 && selected.value === 'amenities') addPoints(['lakewoodRanch', 'lakeNona', 'horizonWest', 'wesleyChapelNewTampa'], 3, current);
    if (questionId === 6 && selected.value === 'lowfees') addPoints(['plantCity', 'lakeWales', 'lakeAlfred', 'sanford', 'apopka'], 3, current);
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];

    if (questionIndex === 0) {
      sendEvent('quiz_start', { questionId: currentQuestion.id });
    }

    sendEvent('quiz_answer', { questionId: currentQuestion.id, value: selectedOption.value });

    setAnswers((current) => ({
      ...current,
      [questionToAnswerKey[currentQuestion.id]]: selectedOption.value
    }));

    setScores((current) => {
      const next = { ...current };
      scoreQuestion(currentQuestion.id, selectedOption, next);
      return next;
    });

    if (currentQuestion.id === 2) setWeeklyPreference(selectedOption.value as WeeklyPreference);

    if (selectedOption.budgetValue) setBudgetChoice(selectedOption.budgetValue);
    if (selectedOption.insight) setInsights((current) => (current.includes(selectedOption.insight!) ? current : [...current, selectedOption.insight!]));

    if (questionIndex === questions.length - 1) {
      sendEvent('quiz_complete', { answers: { ...answers, [questionToAnswerKey[currentQuestion.id]]: selectedOption.value } });
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

    const tags = [
      'SRC_RelocationQuiz',
      `INT_Timeline_${formatTagValue(form.timeline)}`,
      `PREF_Lifestyle_${formatTagValue(answers.q1_lifestyle)}`,
      `PREF_Schools_${formatTagValue(answers.q5_schools)}`,
      `PREF_HOA_${formatTagValue(answers.q6_fees)}`,
      `PREF_Commute_${formatTagValue(answers.q3_commute)}`,
      `PREF_Budget_${formatTagValue(answers.q4_budget)}`,
      `PREF_WorkHub_${formatTagValue(answers.q2_weekday)}`,
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
      answers,
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(() => {
      // fire-and-forget by design
    });
  };

  const restartQuiz = () => {
    setStage('quiz');
    setQuestionIndex(0);
    setScores(baseScores);
    setLeadData(null);
    setBudgetChoice('400to500');
    setInsights([]);
    setWeeklyPreference('remote');
    setAnswers(defaultAnswers);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sand via-white to-cyan-50 px-4 py-8 text-slate-900">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
          <img src={logoUrl} alt="More FLA Homes" className="h-auto w-full max-w-xs" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Relocation Match Quiz</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">Answer targeted questions to reveal your top 3 Florida area matches across 30+ local markets.</p>
        </header>

        <AnimatePresence mode="wait">
          {stage === 'quiz' && (
            <motion.section
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.24, ease: 'easeInOut' }}
              className="rounded-2xl bg-white p-6 shadow-card"
            >
              <ProgressBar current={questionIndex + 1} total={questions.length} />
              <h2 className="mt-6 text-xl font-semibold text-slate-900">{currentQuestion.prompt}</h2>
              <div className="mt-5 grid gap-3">
                {currentQuestion.options.map((option, optionIndex) => (
                  <button
                    key={option.text}
                    type="button"
                    onClick={() => handleSelectAnswer(optionIndex)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-lagoon hover:bg-cyan-50"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.section>
          )}

          {stage === 'lead' && (
            <motion.section key="lead-capture" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="rounded-2xl bg-white p-6 shadow-card">
              <h2 className="text-2xl font-bold text-slate-900">You are one step away from your top 3 matches</h2>
              <p className="mt-2 text-slate-600">We scored your answers and filtered by budget, home size, and new-vs-resale fit. Share your info to unlock your ranked results.</p>
              <div className="mt-6">
                <LeadCaptureForm onSubmit={handleLeadSubmit} />
              </div>
            </motion.section>
          )}

          {stage === 'result' && leadData && (
            <motion.section key="result" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
              <ResultsCard rankedMatches={rankedMatches} leadData={leadData} insights={insights} timeline={leadData.timeline} onRestart={restartQuiz} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
