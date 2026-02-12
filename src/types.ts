export const AREA_KEYS = [
  'wesleyChapel',
  'southTampa',
  'stPete',
  'polkCounty',
  'lakewoodRanch',
  'sarasota',
  'winterGarden',
  'lakeNona',
  'clermont',
  'kissimmee',
  'winterPark'
] as const;

export type AreaKey = (typeof AREA_KEYS)[number];

export interface AnswerOption {
  text: string;
  scores: Record<AreaKey, number>;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: AnswerOption[];
}

export interface AreaProfile {
  key: AreaKey;
  title: string;
  subtitle: string;
  highlights: string[];
  vibe: string;
  callout: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeline: string;
  wantsCommunityInfo: boolean;
}
