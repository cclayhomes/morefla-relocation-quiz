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
  | 'q1_lifestyle'
  | 'q2_work_location'
  | 'q3_commute_tolerance'
  | 'q4_coastal_comfort'
  | 'q5_theme_park_relevance'
  | 'q6_schools_importance'
  | 'q7_budget'
  | 'q8_search_width',
  string
>;

type UtmParams = Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term', string>;
type Clarification = 'themeParks' | 'coastal' | 'balanced' | '';

const defaultAnswerValues: AnswerMap = {
  q1_lifestyle: '',
  q2_work_location: '',
  q3_commute_tolerance: '',
  q4_coastal_comfort: '',
  q5_theme_park_relevance: '',
  q6_schools_importance: '',
  q7_budget: '',
  q8_search_width: ''
};

const questionToAnswerKey: Record<number, keyof AnswerMap> = {
  1: 'q1_lifestyle',
  2: 'q2_work_location',
  3: 'q3_commute_tolerance',
  4: 'q4_coastal_comfort',
  5: 'q5_theme_park_relevance',
  6: 'q6_schools_importance',
  7: 'q7_budget',
  8: 'q8_search_width'
};

const answerTagPrefixes: Record<keyof AnswerMap, string> = {
  q1_lifestyle: 'PREF_Lifestyle',
  q2_work_location: 'PREF_WorkLocation',
  q3_commute_tolerance: 'PREF_CommuteTolerance',
  q4_coastal_comfort: 'PREF_CoastalComfort',
  q5_theme_park_relevance: 'PREF_ThemeParkRelevance',
  q6_schools_importance: 'PREF_SchoolsImportance',
  q7_budget: 'PREF_Budget',
  q8_search_width: 'PREF_SearchWidth'
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

function App() {
  const [stage, setStage] = useState<Stage>(() => (shouldSkipLanding() ? 'quiz' : 'landing'));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetBracket>('400to500');
  const [sizeChoice, setSizeChoice] = useState<SizeNeed>(2000);
  const [constructionChoice, setConstructionChoice] = useState<ConstructionPreference>('either');
  const [insights, setInsights] = useState<string[]>([]);
  const [answerValues, setAnswerValues] = useState<AnswerMap>(defaultAnswerValues);
  const [utmParams] = useState<UtmParams>(() => readInitialUtms());
  const [clarification, setClarification] = useState<Clarification>('');

  const activeQuestions = useMemo(() => questions, []);
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

    const work = answerValues.q2_work_location;
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

    const traffic = answerValues.q3_commute_tolerance;
    if (traffic === 'under25') {
      add('orlandoCore', 3);
      add('tampaBayCore', 3);
    }
    if (traffic === '40to60' || traffic === 'noLimit') {
      add('polkCounty', 3);
      add('sarasotaLakewoodRanch', 2);
    }

    const themeParks = answerValues.q5_theme_park_relevance;
    if (themeParks === 'mustHave') add('orlandoCore', 5);
    if (themeParks === 'niceToHave') add('orlandoCore', 2);

    const lifestyle = answerValues.q1_lifestyle;
    if (lifestyle === 'beach') {
      add('pinellasStPete', 4);
      add('sarasotaLakewoodRanch', 3);
      add('polkCounty', 1);
    }
    if (lifestyle === 'themeparks') add('orlandoCore', 3);
    if (lifestyle === 'downtown') {
      add('pinellasStPete', 3);
      add('tampaBayCore', 2);
      add('orlandoCore', 2);
    }
    if (lifestyle === 'familysuburb') {
      add('orlandoCore', 2);
      add('tampaBayCore', 2);
      add('polkCounty', 2);
    }
    if (lifestyle === 'quiet') add('polkCounty', 2);

    const coastal = answerValues.q4_coastal_comfort;
    if (coastal === 'high') {
      add('pinellasStPete', 4);
      add('sarasotaLakewoodRanch', 4);
    }
    if (coastal === 'low') {
      add('orlandoCore', 2);
      add('polkCounty', 3);
    }

    if (answerValues.q6_schools_importance === 'mustHave') {
      add('orlandoCore', 3);
      add('sarasotaLakewoodRanch', 2);
      add('tampaBayCore', 2);
    }

    if (['500to650', '650to800', '800plus'].includes(answerValues.q7_budget)) {
      add('orlandoCore', 2);
      add('sarasotaLakewoodRanch', 2);
    }

    if (clarification === 'themeParks') add('orlandoCore', 4);
    if (clarification === 'coastal') {
      add('pinellasStPete', 3);
      add('sarasotaLakewoodRanch', 3);
    }

    const opennessAllowed =
      answerValues.q3_commute_tolerance === '40to60' ||
      answerValues.q3_commute_tolerance === 'noLimit' ||
      answerValues.q2_work_location === 'remote' ||
      answerValues.q8_search_width === 'openAnywhere' ||
      answerValues.q8_search_width === 'openWide';

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
      if (lifestyle === 'downtown' && area.downtownWalkable) score += 4;
      if (lifestyle === 'beach' && area.waterAccess === 'excellent') score += 4;
      if (themeParks === 'mustHave' && area.nearAttractions) score += 4;
      if (coastal === 'high' && ['stPetersburg', 'clearwater', 'sarasota', 'bradenton'].includes(areaKey)) score += 3;
      if (answerValues.q6_schools_importance === 'mustHave' && ['A+', 'A', 'A-'].includes(area.schoolRating)) score += 3;
      return score;
    };

    const primaryPool = ecosystemAreas[primaryEcosystem];
    const topPrimaryAreas = eligibleAreas
      .filter(([key]) => primaryPool.includes(key))
      .filter(([key]) => !(answerValues.q2_work_location === 'orlando' && !['40to60', 'noLimit'].includes(answerValues.q3_commute_tolerance) && key === 'davenport'))
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

    if (selectedOption.budgetValue) setBudgetChoice(selectedOption.budgetValue);
    if (selectedOption.sizeValue) setSizeChoice(selectedOption.sizeValue);
    if (selectedOption.constructionValue) setConstructionChoice(selectedOption.constructionValue);
    if (selectedOption.insight) setInsights((current) => (current.includes(selectedOption.insight!) ? current : [...current, selectedOption.insight!]));

    if (questionIndex === activeQuestions.length - 1) {
      sendEvent('quiz_complete', { answers: nextAnswerValues });
      const hasLifestyleConflict = nextAnswerValues.q5_theme_park_relevance === 'mustHave' && nextAnswerValues.q4_coastal_comfort === 'high';
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
        trafficTolerance: answerValues.q3_commute_tolerance,
        coastalComfortLevel: answerValues.q4_coastal_comfort
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
              <ProgressBar current={questionIndex + 1} total={8} />
              <h2 className="mt-4 text-base font-semibold text-slate-800 md:text-lg">{currentQuestion.prompt}</h2>
              <div className="mt-4 flex flex-col gap-3 w-full">
                {currentQuestion.options.map((option, optionIndex) => (
                  <button key={option.value} onClick={() => handleSelectAnswer(optionIndex)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-lagoon hover:bg-cyan-50">
                    <span className="block">{option.text}</span>
                    {option.subLabel ? <span className="mt-1 block text-xs font-normal text-slate-500">{option.subLabel}</span> : null}
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
