import { useEffect } from 'react';
import { AreaProfile } from '../types';
import { sendEvent } from '../utils/analytics';

interface RankedArea {
  area: AreaProfile;
  score: number;
}

interface ResultsCardProps {
  rankedMatches: RankedArea[];
  secondaryMatches: RankedArea[];
  primaryEcosystemLabel: string;
  secondaryEcosystemLabel: string | null;
  showSecondary: boolean;
  insights: string[];
  timeline: string;
  onRestart: () => void;
}

function formatPrice(price: number) {
  return `$${(price / 1000).toFixed(0)}K`;
}

export function ResultsCard({ rankedMatches, secondaryMatches, primaryEcosystemLabel, secondaryEcosystemLabel, showSecondary, insights, timeline, onRestart }: ResultsCardProps) {
  const topThree = rankedMatches.slice(0, 3);

  useEffect(() => {
    sendEvent('results_view', { timeline, topMatches: topThree.map((item) => item.area.key), primaryEcosystem: primaryEcosystemLabel });
  }, [timeline, topThree, primaryEcosystemLabel]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-lagoon p-6 text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Your Primary Lifestyle Fit</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{primaryEcosystemLabel}</h2>
        <p className="mt-2 text-sm text-cyan-100">Top communities below are ranked inside your primary ecosystem first, then filtered by budget, home size, and preferences.</p>
      </div>

      <div className="grid gap-4">
        {topThree.map((match, index) => (
          <article key={match.area.key} className="rounded-2xl bg-white p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-lagoon">#{index + 1} community</p>
            <h3 className="text-xl font-bold text-slate-900">{match.area.title}</h3>
            <p className="text-sm text-slate-600">{match.area.region} • 2025 median {formatPrice(match.area.medianPrice)}</p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
              {match.area.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {showSecondary && secondaryEcosystemLabel && secondaryMatches.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Secondary ecosystem to explore: {secondaryEcosystemLabel}</h3>
          <p className="mt-2 text-sm text-slate-600">Because your answers show commute/work flexibility, we included cross-ecosystem backups.</p>
          <p className="mt-2 text-sm font-medium text-slate-700">Suggested backups: {secondaryMatches.map((item) => item.area.title).join(', ')}</p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Area-specific insights from your answers</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          {(insights.length ? insights : ['Your ranking balanced lifestyle identity, commute tolerance, coastal comfort, and budget.']).slice(0, 6).map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>

      <button type="button" onClick={onRestart} className="w-full rounded-xl border border-lagoon px-5 py-3 font-semibold text-lagoon transition hover:bg-lagoon hover:text-white">
        Retake Quiz
      </button>
    </div>
  );
}
