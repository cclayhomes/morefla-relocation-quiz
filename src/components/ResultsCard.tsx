import { AreaKey, AreaProfile, LeadFormData } from '../types';

interface ResultsCardProps {
  topMatches: AreaProfile[];
  scoreBreakdown: Record<AreaKey, number>;
  areaLabel: Record<AreaKey, string>;
  leadData: LeadFormData;
  onRestart: () => void;
}

export function ResultsCard({ topMatches, scoreBreakdown, areaLabel, leadData, onRestart }: ResultsCardProps) {
  const rankedAreas = Object.entries(scoreBreakdown)
    .sort(([, a], [, b]) => b - a)
    .map(([key, score]) => ({ key: key as AreaKey, score }));

  const [primaryMatch, secondaryMatch] = topMatches;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-lagoon p-6 text-white shadow-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Your Top 2 Matches</p>
        <h2 className="mt-2 text-3xl font-bold">{primaryMatch.title}</h2>
        <p className="mt-1 text-cyan-100">{primaryMatch.subtitle}</p>
        <p className="mt-4 text-slate-100">{primaryMatch.vibe}</p>
        <p className="mt-4 rounded-lg bg-white/10 p-3 text-sm">{primaryMatch.callout}</p>
      </div>

      {secondaryMatch && (
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lagoon">Second Match</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{secondaryMatch.title}</h3>
          <p className="mt-1 text-slate-600">{secondaryMatch.subtitle}</p>
          <p className="mt-3 text-slate-700">{secondaryMatch.vibe}</p>
          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{secondaryMatch.callout}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Why {primaryMatch.title} fits you</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
            {primaryMatch.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        {secondaryMatch && (
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold text-slate-900">Why {secondaryMatch.title} also stands out</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-slate-700">
              {secondaryMatch.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">Complete area ranking</h3>
        <div className="mt-3 space-y-2">
          {rankedAreas.map((area, index) => (
            <div key={area.key} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2 text-sm">
              <span className="font-medium text-slate-700">
                #{index + 1} {areaLabel[area.key]}
              </span>
              <span className="font-semibold text-lagoon">{area.score} pts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-lagoon/40 bg-white p-6 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Thanks, {leadData.firstName}!</p>
        <p className="mt-2">
          A relocation specialist will contact you at <strong>{leadData.email}</strong> with next steps aligned to your{' '}
          <strong>{leadData.timeline}</strong> timeline.
        </p>
        {leadData.wantsCommunityInfo && secondaryMatch && (
          <p className="mt-2">
            A More FLA specialist will reach out with top community picks in <strong>{primaryMatch.title}</strong> and{' '}
            <strong>{secondaryMatch.title}</strong>.
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
