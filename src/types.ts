export const AREA_KEYS = [
  'winterGarden',
  'horizonWest',
  'windermere',
  'drPhillips',
  'clermont',
  'grovelandMascotte',
  'minneola',
  'lakeNona',
  'winterParkMaitland',
  'apopka',
  'sanford',
  'kissimmeeStCloud',
  'davenport',
  'celebration',
  'wesleyChapelNewTampa',
  'landOLakes',
  'brandon',
  'riverview',
  'plantCity',
  'southTampa',
  'stPetersburg',
  'clearwater',
  'lakeland',
  'winterHaven',
  'lakeAlfred',
  'hainesCity',
  'lakeWales',
  'auburndale',
  'lakewoodRanch',
  'sarasota',
  'bradenton',
  'parrish',
  'mountDora'
] as const;

export type AreaKey = (typeof AREA_KEYS)[number];

export type ScoreTag =
  | 'beach'
  | 'themeParks'
  | 'topSchools'
  | 'affordability'
  | 'newConstruction'
  | 'luxury'
  | 'shortTermRental'
  | 'downtownWalkable'
  | 'outdoorNature'
  | 'commuteTampa'
  | 'commuteOrlando';

export type BudgetBracket = 'under300' | '300to400' | '400to500' | '500to650' | '650to800' | '800plus';
export type SizeNeed = 1500 | 2000 | 2500 | 3000;
export type ConstructionPreference = 'new' | 'resale' | 'either';

export interface QuizOption {
  text: string;
  tagBoosts?: Partial<Record<ScoreTag, number>>;
  budgetValue?: BudgetBracket;
  sizeValue?: SizeNeed;
  constructionValue?: ConstructionPreference;
  insight?: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: QuizOption[];
}

export interface AreaProfile {
  key: AreaKey;
  title: string;
  region: string;
  medianPrice: number;
  schoolRating: 'A+' | 'A' | 'A-' | 'B+' | 'B';
  highlights: string[];
  constructionType: 'new' | 'resale' | 'mixed';
  sizeCapacity: SizeNeed;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeline: string;
  wantsCommunityInfo: boolean;
}
