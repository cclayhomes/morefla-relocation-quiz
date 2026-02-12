import { AreaKey, AreaProfile, LeadFormData } from '../types';

interface RankedArea {
  area: AreaProfile;
  score: number;
}

interface ResultsCardProps {
  rankedMatches: RankedArea[];
  scoreBreakdown: Record<AreaKey, number>;
  leadData: LeadFormData;
  insights: string[];
  onRestart: () => void;
}

function formatPrice(price: number) {
  return `$${(price / 1000).toFixed(0)}K`;
}

export function ResultsCard({ rankedMatches, scoreBreakdown, leadData, insights, onRestart }: ResultsCardProps) {
  const topThree = rankedMatches.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-lagoon p-6 text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Your top 3 relocation matches</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Smart-matched to your budget, size, and lifestyle priorities</h2>
        <p className="mt-2 text-sm text-cyan-100">
          We filtered out areas that do not fit your pricing and home-size requirements, then ranked the strongest market fits.
        </p>
      </div>

      <div className="grid gap-4">
        {topThree.map((match, index) => (
          <article key={match.area.key} className="rounded-2xl bg-white p-5 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-lagoon">#{index + 1} match • {match.area.region}</p>
                <h3 className="text-xl font-bold text-slate-900">{match.area.title}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-700">{match.score} points</p>
                <p className="text-sm text-slate-600">2025 median: {formatPrice(match.area.medianPrice)}</p>
                <p className="text-sm text-slate-600">School rating: {match.area.schoolRating}</p>
              </div>
            </div>
            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-700">
              {match.area.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Area-specific insights from your answers</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-slate-700">
          {insights.slice(0, 4).map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Filtered ranking across qualifying areas</h3>
        <div className="mt-3 space-y-2">
          {rankedMatches.map((match, index) => (
            <div key={match.area.key} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2 text-sm">
              <span className="font-medium text-slate-700">#{index + 1} {match.area.title}</span>
              <span className="font-semibold text-lagoon">{scoreBreakdown[match.area.key]} pts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-lagoon/40 bg-white p-6 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Thanks, {leadData.firstName}!</p>
        <p className="mt-2">
          Your specialist will send your relocation summary to <strong>{leadData.email}</strong> and follow up on your{' '}
          <strong>{leadData.timeline}</strong> timeline.
        </p>
        {leadData.wantsCommunityInfo && topThree.length > 0 && (
          <p className="mt-2">
            Perfect—we will include the best communities in your top areas: <strong>{topThree.map((item) => item.area.title).join(', ')}</strong>.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="w-full rounded-xl border border-lagoon px-5 py-3 font-semibold text-lagoon transition hover:bg-lagoon hover:text-white"
      >
        Retake Quiz
      </button>
    </div>
  );
}
