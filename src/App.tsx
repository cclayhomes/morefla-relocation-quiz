import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import logoUrl from './assets/more-fla-logo.svg';
import { LeadCaptureForm } from './components/LeadCaptureForm';
import { ProgressBar } from './components/ProgressBar';
import { ResultsCard } from './components/ResultsCard';
import { areaProfiles, questions } from './data/quizData';
import { AREA_KEYS, AreaKey, LeadFormData } from './types';

type Stage = 'quiz' | 'lead' | 'result';

const baseScores = AREA_KEYS.reduce((scores, key) => {
  scores[key] = 0;
  return scores;
}, {} as Record<AreaKey, number>);

const areaLabel = AREA_KEYS.reduce((labels, key) => {
  labels[key] = areaProfiles[key].title;
  return labels;
}, {} as Record<AreaKey, string>);

function App() {
  const [stage, setStage] = useState<Stage>('quiz');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<AreaKey, number>>(baseScores);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);

  const currentQuestion = questions[questionIndex];

  const rankedMatches = useMemo(
    () =>
      Object.entries(scores)
        .sort(([, a], [, b]) => b - a)
        .map(([key]) => areaProfiles[key as AreaKey]),
    [scores]
  );

  const topMatches = rankedMatches.slice(0, 2);

  const handleSelectAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];

    setScores((current) =>
      AREA_KEYS.reduce((nextScores, key) => {
        nextScores[key] = current[key] + selectedOption.scores[key];
        return nextScores;
      }, {} as Record<AreaKey, number>)
    );

    if (questionIndex === questions.length - 1) {
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
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sand via-white to-cyan-50 px-4 py-8 text-slate-900">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <header className="rounded-2xl bg-white p-4 shadow-card sm:p-6">
          <img src={logoUrl} alt="More FLA Homes" className="h-auto w-full max-w-xs" />
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">Relocation Match Quiz</h1>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Answer 12 quick questions to discover your best-fit More FLA area.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {stage === 'quiz' && (
            <motion.section
              key={`question-${currentQuestion.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
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
            <motion.section
              key="lead-capture"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl bg-white p-6 shadow-card"
            >
              <h2 className="text-2xl font-bold text-slate-900">You are one step away from your matches</h2>
              <p className="mt-2 text-slate-600">
                We analyzed your answers across all More FLA markets. Share your info to see your top Florida matches.
              </p>
              <div className="mt-6">
                <LeadCaptureForm onSubmit={handleLeadSubmit} />
              </div>
            </motion.section>
          )}

          {stage === 'result' && leadData && (
            <motion.section
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ResultsCard
                topMatches={topMatches}
                scoreBreakdown={scores}
                areaLabel={areaLabel}
                leadData={leadData}
                onRestart={restartQuiz}
              />
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;
