import { motion } from 'framer-motion';
import logoUrl from '../assets/more-fla-logo.svg';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-sand">
      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-3">
          <img src={logoUrl} alt="More FLA Homes" className="h-10 w-10" />
          <div>
            <p className="text-sm font-bold text-lagoon">More FLA Homes</p>
            <p className="text-xs text-slate-500">Relocation Match Quiz</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Headline */}
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-lagoon md:text-5xl">
            Find Your Best-Fit Florida Area in 60 Seconds
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-600 md:text-lg">
            Answer 6 quick questions and get your Top 3 matches for Central Florida relocation.
          </p>

          {/* Video embed placeholder */}
          <div className="mx-auto mt-8 aspect-video max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-card">
            {/* Replace the src below with your actual video embed URL */}
            <iframe
              className="h-full w-full"
              src="about:blank"
              title="Relocation Quiz Intro"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Example: src="https://www.youtube.com/embed/YOUR_VIDEO_ID" */}
          </div>

          {/* CTA */}
          <button
            onClick={onStartQuiz}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-citrus px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-citrus focus:ring-offset-2"
          >
            Start the Quiz
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* What you get */}
          <div className="mx-auto mt-10 max-w-md text-left">
            <ul className="space-y-3 text-sm text-slate-700 md:text-base">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-citrus">&#10003;</span>
                Personalized Top 3 area matches based on your lifestyle, budget, and commute
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-citrus">&#10003;</span>
                New construction pricing snapshots and school district ratings
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-citrus">&#10003;</span>
                Built by local Central Florida experts — not a generic internet quiz
              </li>
            </ul>
          </div>

          {/* Trust elements */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-1">
              <span className="text-citrus">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span>4.9/5 (XXX reviews)</span>
            </div>
            <div>XXXX+ subscribers</div>
            <div>XXX+ families helped</div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-400">
        <p>Brokered by Dalton Wade Inc.</p>
        <p className="mt-1">More FLA Homes &copy; {new Date().getFullYear()}. All rights reserved.</p>
      </footer>
    </div>
  );
}
