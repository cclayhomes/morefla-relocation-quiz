import { useEffect } from 'react';
import { AreaProfile, LeadFormData } from '../types';
import { sendEvent } from '../utils/analytics';

interface RankedArea {
  area: AreaProfile;
  score: number;
}

interface ResultsCardProps {
  rankedMatches: RankedArea[];
  leadData: LeadFormData;
  insights: string[];
  timeline: string;
  onRestart: () => void;
}

function formatPrice(price: number) {
  return `$${(price / 1000).toFixed(0)}K`;
}

export function ResultsCard({ rankedMatches, leadData, insights, timeline, onRestart }: ResultsCardProps) {
  const topThree = rankedMatches.slice(0, 3);
  const isUrgentTimeline = timeline === '0-3 months' || timeline === '3-6 months';

  useEffect(() => {
    sendEvent('results_view', { timeline, topMatches: topThree.map((item) => item.area.key) });
  }, [timeline, topThree]);

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
          {(insights.length ? insights : ['Your ranking balanced commute, lifestyle, and practical fit across all quiz answers.']).slice(0, 6).map((insight) => (
            <li key={insight}>{insight}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-dashed border-lagoon/40 bg-white p-6 text-sm text-slate-700">
        <p className="font-medium text-slate-900">Thanks, {leadData.firstName}!</p>
        <p className="mt-2">
          Your specialist will send your relocation summary to <strong>{leadData.email}</strong> and follow up on your{' '}
          <strong>{leadData.timeline}</strong> timeline.
        </p>
        {leadData.wantsCommunityInfo && topThree.length > 0 && (
          <>
            <p className="mt-2">
              Perfect—we will include the best communities in your top areas: <strong>{topThree.map((item) => item.area.title).join(', ')}</strong>.
            </p>
            <a
              href="https://calendly.com/morefla"
              target="_blank"
              rel="noreferrer"
              onClick={() => sendEvent('guide_request', { topAreas: topThree.map((item) => item.area.key) })}
              className="mt-3 inline-flex text-sm font-semibold text-lagoon underline-offset-2 hover:underline"
            >
              Request your community guide
            </a>
          </>
        )}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-card">
        {isUrgentTimeline ? (
          <>
            <h3 className="text-xl font-bold text-slate-900">Ready to explore your top areas?</h3>
            <a
              href="https://calendly.com/morefla"
              target="_blank"
              rel="noreferrer"
              onClick={() => sendEvent('booking_click', { timeline, variant: 'prominent' })}
              className="mt-4 inline-flex rounded-xl bg-lagoon px-5 py-3 font-semibold text-white transition hover:brightness-110"
            >
              Book a Free 15-Min Relocation Call
            </a>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-slate-900">When you're ready, we're here</h3>
            <a
              href="https://calendly.com/morefla"
              target="_blank"
              rel="noreferrer"
              onClick={() => sendEvent('booking_click', { timeline, variant: 'soft' })}
              className="mt-2 inline-flex text-sm text-lagoon underline-offset-2 hover:underline"
            >
              Book a Free 15-Min Relocation Call
            </a>
          </>
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
