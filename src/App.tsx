import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import logoUrl from './assets/more-fla-logo.svg';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { LandingPage } from './components/LandingPage';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import {
  areaProfiles,
  ecosystemAreas,
  ecosystemLabels,
  filterByConstruction,
  filterBySize,
  getBudgetAllowedAreas,
  questions
} from './data/quizData';
import { AreaKey, BudgetBracket, ConstructionPreference, EcosystemKey, LeadFormData, SizeNeed } from './types';
import { sendEvent } from './utils/analytics';

type Stage = 'landing' | 'quiz' | 'clarify' | 'lead' | 'result';

type AnswerMap = Record<
  | 'q1_schools_importance'
  | 'q2_school_priority'
  | 'q3_work_location'
  | 'q4_commute_tolerance'
  | 'q5_theme_park_relevance'
  | 'q6_weekend_activity'
  | 'q7_neighborhood_type'
  | 'q8_hoa_preference'
  | 'q9_airport_access'
  | 'q10_dining_preference'
  | 'q11_budget'
  | 'q12_home_size'
  | 'q13_construction_type'
  | 'q14_coastal_comfort'
  | 'q15_exploration_openness',
  string
>;

type UtmParams = Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term', string>;
type Clarification = 'themeParks' | 'coastal' | 'balanced' | '';

const defaultAnswerValues: AnswerMap = {
  q1_schools_importance: '',
  q2_school_priority: '',
  q3_work_location: '',
  q4_commute_tolerance: '',
  q5_theme_park_relevance: '',
  q6_weekend_activity: '',
  q7_neighborhood_type: '',
  q8_hoa_preference: '',
  q9_airport_access: '',
  q10_dining_preference: '',
  q11_budget: '',
  q12_home_size: '',
  q13_construction_type: '',
  q14_coastal_comfort: '',
  q15_exploration_openness: ''
};

const questionToAnswerKey: Record<number, keyof AnswerMap> = {
  1: 'q1_schools_importance',
  2: 'q2_school_priority',
  3: 'q3_work_location',
  4: 'q4_commute_tolerance',
  5: 'q5_theme_park_relevance',
  6: 'q6_weekend_activity',
  7: 'q7_neighborhood_type',
  8: 'q8_hoa_preference',
  9: 'q9_airport_access',
  10: 'q10_dining_preference',
  11: 'q11_budget',
  12: 'q12_home_size',
  13: 'q13_construction_type',
  14: 'q14_coastal_comfort',
  15: 'q15_exploration_openness'
};

const answerTagPrefixes: Record<keyof AnswerMap, string> = {
  q1_schools_importance: 'PREF_SchoolsImportance',
  q2_school_priority: 'PREF_SchoolPriority',
  q3_work_location: 'PREF_WorkLocation',
  q4_commute_tolerance: 'PREF_CommuteTolerance',
  q5_theme_park_relevance: 'PREF_ThemeParkRelevance',
  q6_weekend_activity: 'PREF_WeekendActivity',
  q7_neighborhood_type: 'PREF_NeighborhoodType',
  q8_hoa_preference: 'PREF_HOA',
  q9_airport_access: 'PREF_AirportAccess',
  q10_dining_preference: 'PREF_DiningPreference',
  q11_budget: 'PREF_Budget',
  q12_home_size: 'PREF_HomeSize',
  q13_construction_type: 'PREF_ConstructionType',
  q14_coastal_comfort: 'PREF_CoastalComfort',
  q15_exploration_openness: 'PREF_Exploration'
};

const formatTagValue = (value: string) => value.trim().replace(/\+/g, 'plus').replace(/\s+/g, '').replace(/[^a-zA-Z0-9_-]/g, '');
const shouldSkipLanding = () => new URLSearchParams(window.location.search).get('start') === 'quiz' || window.location.hash === '#quiz';
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

function getActiveQuestions(skipSchoolPriority: boolean) {
  return questions.filter((q) => !(skipSchoolPriority && q.id === 2));
}

function App() {
  const [stage, setStage] = useState<Stage>(() => (shouldSkipLanding() ? 'quiz' : 'landing'));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetBracket>('400to500');
  const [sizeChoice, setSizeChoice] = useState<SizeNeed>(2000);
  const [constructionChoice, setConstructionChoice] = useState<ConstructionPreference>('either');
  const [insights, setInsights] = useState<string[]>([]);
  const [skipSchoolPriority, setSkipSchoolPriority] = useState(false);
  const [answerValues, setAnswerValues] = useState<AnswerMap>(defaultAnswerValues);
  const [utmParams] = useState<UtmParams>(() => readInitialUtms());
  const [clarification, setClarification] = useState<Clarification>('');

  const activeQuestions = useMemo(() => getActiveQuestions(skipSchoolPriority), [skipSchoolPriority]);
  const currentQuestion = activeQuestions[questionIndex];

  const scoringResult = useMemo(() => {
    const ecosystemScores: Record<EcosystemKey, number> = {
      orlandoCore: 0,
      tampaBayCore: 0,
      pinellasStPete: 0,
      sarasotaLakewoodRanch: 0,
      polkCounty: 0
    };

    const add = (key: EcosystemKey, points: number) => {
      ecosystemScores[key] += points;
    };

    const work = answerValues.q3_work_location;
    if (work === 'orlando') add('orlandoCore', 5);
    if (work === 'tampa') add('tampaBayCore', 5);
    if (work === 'i4') {
      add('orlandoCore', 3);
      add('polkCounty', 4);
      add('tampaBayCore', 3);
    }
    if (work === 'remote') {
      add('pinellasStPete', 2);
      add('sarasotaLakewoodRanch', 2);
    }

    const traffic = answerValues.q4_commute_tolerance;
    if (traffic === 'under20') {
      add('orlandoCore', 3);
      add('tampaBayCore', 3);
    }
    if (traffic === '35to45' || traffic === 'noLimit') {
      add('polkCounty', 3);
      add('sarasotaLakewoodRanch', 2);
    }

    const themeParks = answerValues.q5_theme_park_relevance;
    if (themeParks === 'mustHave') add('orlandoCore', 5);
    if (themeParks === 'niceToHave') add('orlandoCore', 2);

    const weekend = answerValues.q6_weekend_activity;
    if (weekend === 'water') {
      add('pinellasStPete', 4);
      add('sarasotaLakewoodRanch', 3);
      add('polkCounty', 1);
    }
    if (weekend === 'downtown') {
      add('pinellasStPete', 3);
      add('tampaBayCore', 2);
      add('orlandoCore', 2);
    }
    if (weekend === 'quiet') add('polkCounty', 2);

    const coastal = answerValues.q14_coastal_comfort;
    if (coastal === 'high') {
      add('pinellasStPete', 4);
      add('sarasotaLakewoodRanch', 4);
    }
    if (coastal === 'low') {
      add('orlandoCore', 2);
      add('polkCounty', 3);
    }

    if (answerValues.q1_schools_importance === 'mustHave') {
      add('orlandoCore', 3);
      add('sarasotaLakewoodRanch', 2);
      add('tampaBayCore', 2);
    }

    if (['500to650', '650to800', '800plus'].includes(answerValues.q11_budget)) {
      add('orlandoCore', 2);
      add('sarasotaLakewoodRanch', 2);
    }

    if (clarification === 'themeParks') add('orlandoCore', 4);
    if (clarification === 'coastal') {
      add('pinellasStPete', 3);
      add('sarasotaLakewoodRanch', 3);
    }

    const opennessAllowed =
      answerValues.q4_commute_tolerance === '35to45' ||
      answerValues.q4_commute_tolerance === 'noLimit' ||
      answerValues.q3_work_location === 'remote' ||
      answerValues.q15_exploration_openness === 'openAnywhere';

    const eligibleAreas = Object.entries(areaProfiles)
      .filter(([, area]) => getBudgetAllowedAreas(budgetChoice).has(area.key))
      .filter(([, area]) => filterBySize(area, sizeChoice))
      .filter(([, area]) => filterByConstruction(area, constructionChoice)) as [AreaKey, (typeof areaProfiles)[AreaKey]][];

    const rankedEcosystems = Object.entries(ecosystemScores)
      .map(([key, score]) => ({ key: key as EcosystemKey, score }))
      .sort((a, b) => b.score - a.score);

    const primaryEcosystem = rankedEcosystems[0]?.key ?? 'orlandoCore';
    const secondaryEcosystem = opennessAllowed ? rankedEcosystems[1]?.key : null;

    const areaWeights = (areaKey: AreaKey) => {
      const area = areaProfiles[areaKey];
      let score = ecosystemScores[primaryEcosystem] * 2;
      if (weekend === 'downtown' && area.downtownWalkable) score += 4;
      if (weekend === 'water' && area.waterAccess === 'excellent') score += 4;
      if (themeParks === 'mustHave' && area.nearAttractions) score += 4;
      if (coastal === 'high' && ['stPetersburg', 'clearwater', 'sarasota', 'bradenton'].includes(areaKey)) score += 3;
      if (answerValues.q1_schools_importance === 'mustHave' && ['A+', 'A', 'A-'].includes(area.schoolRating)) score += 3;
      if (answerValues.q7_neighborhood_type === 'new' && (area.neighborhoodType === 'new' || area.neighborhoodType === 'mixed')) score += 2;
      if (answerValues.q7_neighborhood_type === 'established' && (area.neighborhoodType === 'established' || area.neighborhoodType === 'mixed')) score += 2;
      if (answerValues.q10_dining_preference === area.diningStyle) score += 2;
      return score;
    };

    const primaryPool = ecosystemAreas[primaryEcosystem];
    const topPrimaryAreas = eligibleAreas
      .filter(([key]) => primaryPool.includes(key))
      .filter(([key]) => !(answerValues.q3_work_location === 'orlando' && !['35to45', 'noLimit'].includes(answerValues.q4_commute_tolerance) && key === 'davenport'))
      .map(([key, area]) => ({ area, score: areaWeights(key) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const secondaryAreas = secondaryEcosystem
      ? eligibleAreas
          .filter(([key]) => ecosystemAreas[secondaryEcosystem].includes(key))
          .map(([key, area]) => ({ area, score: areaWeights(key) }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 2)
      : [];

    return { primaryEcosystem, secondaryEcosystem, topPrimaryAreas, secondaryAreas, opennessAllowed };
  }, [answerValues, budgetChoice, clarification, constructionChoice, sizeChoice]);


  const handleSelectAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];
    if (questionIndex === 0) sendEvent('quiz_start', { questionId: currentQuestion.id });
    sendEvent('quiz_answer', { questionId: currentQuestion.id, value: selectedOption.value });

    const answerKey = questionToAnswerKey[currentQuestion.id];
    const nextAnswerValues = { ...answerValues, [answerKey]: selectedOption.value };
    setAnswerValues(nextAnswerValues);

    if (currentQuestion.id === 1) setSkipSchoolPriority(selectedOption.value === 'noKids');
    if (selectedOption.budgetValue) setBudgetChoice(selectedOption.budgetValue);
    if (selectedOption.sizeValue) setSizeChoice(selectedOption.sizeValue);
    if (selectedOption.constructionValue) setConstructionChoice(selectedOption.constructionValue);
    if (selectedOption.insight) setInsights((current) => (current.includes(selectedOption.insight!) ? current : [...current, selectedOption.insight!]));

    const nextQuestions = getActiveQuestions(currentQuestion.id === 1 ? selectedOption.value === 'noKids' : skipSchoolPriority);
    if (questionIndex === nextQuestions.length - 1) {
      sendEvent('quiz_complete', { answers: nextAnswerValues });
      const hasLifestyleConflict = nextAnswerValues.q5_theme_park_relevance === 'mustHave' && nextAnswerValues.q14_coastal_comfort === 'high';
      setStage(hasLifestyleConflict ? 'clarify' : 'lead');
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  const handleLeadSubmit = (form: LeadFormData) => {
    setLeadData(form);
    setStage('result');

    const topMatches = scoringResult.topPrimaryAreas.map((match) => ({
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
      `PRIMARY_${formatTagValue(scoringResult.primaryEcosystem)}`,
      ...(scoringResult.secondaryEcosystem ? [`SECONDARY_${formatTagValue(scoringResult.secondaryEcosystem)}`] : []),
      ...answerTags,
      ...topMatches.map((match) => `MATCH_${match.key}`),
      ...(form.wantsCommunityInfo ? ['OPT_CommunityInfo_Yes'] : [])
    ];

    const webhookUrl = import.meta.env.VITE_WEBHOOK_URL?.trim();
    if (!webhookUrl) return;

    const payload = {
      timestamp: new Date().toISOString(),
      source: 'morefla-relocation-quiz',
      lead: form,
      answers: answerValues,
      topMatches: topMatches.map(({ key, ...match }) => match),
      insights,
      tags,
      results: {
        primaryEcosystem: ecosystemLabels[scoringResult.primaryEcosystem],
        secondaryEcosystem: scoringResult.secondaryEcosystem ? ecosystemLabels[scoringResult.secondaryEcosystem] : null,
        topAreas: topMatches.map((match) => match.area),
        trafficTolerance: answerValues.q4_commute_tolerance,
        coastalComfortLevel: answerValues.q14_coastal_comfort
      },
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
    }).catch(() => {});
  };

  const restartQuiz = () => {
    setStage('landing');
    setQuestionIndex(0);
    setLeadData(null);
    setBudgetChoice('400to500');
    setSizeChoice(2000);
    setConstructionChoice('either');
    setInsights([]);
    setSkipSchoolPriority(false);
    setAnswerValues(defaultAnswerValues);
    setClarification('');
  };

  if (stage === 'landing') return <LandingPage onStartQuiz={() => setStage('quiz')} />;

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
                  <button key={option.value} onClick={() => handleSelectAnswer(optionIndex)} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-lagoon hover:bg-cyan-50">
                    {option.text}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {stage === 'clarify' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <h2 className="text-lg font-bold text-lagoon">Quick tie-breaker before your match results</h2>
            <p className="mt-2 text-sm text-slate-600">You selected strong beach/coastal comfort and theme-park relevance. Which should we prioritize more for your primary ecosystem?</p>
            <div className="mt-4 space-y-2">
              <button onClick={() => { setClarification('themeParks'); setStage('lead'); }} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-lagoon">Theme parks and attractions</button>
              <button onClick={() => { setClarification('coastal'); setStage('lead'); }} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-lagoon">Coastal and beach lifestyle</button>
              <button onClick={() => { setClarification('balanced'); setStage('lead'); }} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-lagoon">Keep it balanced</button>
            </div>
          </div>
        )}

        {stage === 'lead' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card md:p-6">
            <h2 className="text-lg font-bold text-lagoon">You are one step away from your ecosystem match</h2>
            <LeadCaptureForm onSubmit={handleLeadSubmit} />
          </motion.div>
        )}

        {stage === 'result' && leadData && (
          <ResultsCard
            rankedMatches={scoringResult.topPrimaryAreas}
            secondaryMatches={scoringResult.secondaryAreas}
            primaryEcosystemLabel={ecosystemLabels[scoringResult.primaryEcosystem]}
            secondaryEcosystemLabel={scoringResult.secondaryEcosystem ? ecosystemLabels[scoringResult.secondaryEcosystem] : null}
            showSecondary={scoringResult.opennessAllowed}
            insights={insights}
            timeline={leadData.timeline}
            onRestart={restartQuiz}
          />
        )}
      </main>
    </div>
  );
}

export default App;
