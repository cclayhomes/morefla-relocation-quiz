import { FormEvent, useState } from 'react';
import { LeadFormData } from '../types';

interface LeadCaptureFormProps {
  onSubmit: (data: LeadFormData) => void;
}

const initialState: LeadFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  timeline: '',
  wantsCommunityInfo: true
};

export function LeadCaptureForm({ onSubmit }: LeadCaptureFormProps) {
  const [formState, setFormState] = useState<LeadFormData>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-sm text-slate-600">Your info is only shared with your dedicated More FLA relocation specialist.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          First Name
          <input
            required
            value={formState.firstName}
            onChange={(event) => setFormState((current) => ({ ...current, firstName: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-lagoon focus:ring"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Last Name
          <input
            required
            value={formState.lastName}
            onChange={(event) => setFormState((current) => ({ ...current, lastName: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-lagoon focus:ring"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-slate-700">
        Where should we send your relocation report?
        <input
          required
          type="email"
          placeholder="your@email.com"
          value={formState.email}
          onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-lagoon focus:ring"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Best number for your relocation specialist
        <input
          required
          type="tel"
          placeholder="(555) 555-5555"
          value={formState.phone}
          onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-lagoon focus:ring"
        />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        When are you hoping to make your move?
        <select
          required
          value={formState.timeline}
          onChange={(event) => setFormState((current) => ({ ...current, timeline: event.target.value }))}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-lagoon focus:ring"
        >
          <option value="">Select one</option>
          <option value="0-3 months">0-3 months</option>
          <option value="3-6 months">3-6 months</option>
          <option value="6-12 months">6-12 months</option>
          <option value="just exploring">Just exploring</option>
        </select>
      </label>
      <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={formState.wantsCommunityInfo}
          onChange={(event) => setFormState((current) => ({ ...current, wantsCommunityInfo: event.target.checked }))}
          className="mt-0.5 h-4 w-4 rounded border-slate-300 text-lagoon focus:ring-lagoon"
        />
        <span>Yes, send me info on the best communities in my matched area(s)</span>
      </label>
      <button
        type="submit"
        className="w-full rounded-xl bg-citrus px-5 py-3 font-semibold text-slate-900 transition hover:brightness-105"
      >
        See My Top Florida Matches
      </button>
    </form>
  );
}
