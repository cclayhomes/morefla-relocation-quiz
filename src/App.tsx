import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import logoUrl from './assets/more-fla-logo.svg';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import { areaProfiles, filterByConstruction, filterBySize, getBudgetAllowedAreas, questions } from './data/quizData';
import { AREA_KEYS, AreaKey, BudgetBracket, ConstructionPreference, LeadFormData, QuizOption, SizeNeed } from './types';

type Stage = 'quiz' | 'lead' | 'result';

const baseScores = AREA_KEYS.reduce((scores, key) => {
  scores[key] = 0;
  return scores;
}, {} as Record<AreaKey, number>);

const schoolScores = { 'A+': 3, A: 2.5, 'A-': 2, 'B+': 1, B: 0.5, 'B-': 0 };

function getActiveQuestions(skipSchoolPriority: boolean) {
  return questions.filter((q) => !(skipSchoolPriority && q.id === 2));
}

function App() {
  const [stage, setStage] = useState<Stage>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<AreaKey, number>>(baseScores);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [budgetChoice, setBudgetChoice] = useState<BudgetBracket>('400to500');
  const [sizeChoice, setSizeChoice] = useState<SizeNeed>(2000);
  const [constructionChoice, setConstructionChoice] = useState<ConstructionPreference>('either');
  const [insights, setInsights] = useState<string[]>([]);
  const [skipSchoolPriority, setSkipSchoolPriority] = useState(false);
  const [workPreference, setWorkPreference] = useState<string>('remote');

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

  const handleSelectAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];

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
      setStage('lead');
      return;
    }
    setQuestionIndex((current) => current + 1);
  };

  const handleLeadSubmit = (form: LeadFormData) => {
    setLeadData(form);
    setStage('result');
  };

  const restartQuiz = () => {
    setStage('quiz');
    setQuestionIndex(0);
    setScores(baseScores);
    setLeadData(null);
    setBudgetChoice('400to500');
    setSizeChoice(2000);
    setConstructionChoice('either');
    setInsights([]);
    setSkipSchoolPriority(false);
    setWorkPreference('remote');
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
              <ProgressBar current={questionIndex + 1} total={activeQuestions.length} />
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
              <ResultsCard rankedMatches={rankedMatches} scoreBreakdown={scores} leadData={leadData} insights={insights} onRestart={restartQuiz} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
