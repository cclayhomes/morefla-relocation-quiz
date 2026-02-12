import { AreaKey, AreaProfile, BudgetBracket, QuizQuestion, ScoreTag, SizeNeed } from '../types';

export const areaProfiles: Record<AreaKey, AreaProfile> = {
  winterGarden: { key: 'winterGarden', title: 'Winter Garden', region: 'Orlando West', medianPrice: 560000, schoolRating: 'A', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Top schools and family-focused neighborhoods', 'Historic downtown plus modern conveniences', 'Quick access to Orlando job centers'] },
  horizonWest: { key: 'horizonWest', title: 'Horizon West', region: 'Orlando West', medianPrice: 560000, schoolRating: 'A', constructionType: 'new', sizeCapacity: 3000, highlights: ['Hamlin Town Center and newer retail', 'Master-planned communities with trails', 'Strong new-build inventory'] },
  windermere: { key: 'windermere', title: 'Windermere', region: 'Orlando West', medianPrice: 836000, schoolRating: 'A', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Luxury lakefront homes and gated options', 'Top school zoning including Windermere High', 'Upscale lifestyle with privacy'] },
  drPhillips: { key: 'drPhillips', title: 'Dr. Phillips', region: 'Orlando West', medianPrice: 836000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Restaurant Row and upscale dining', 'Established high-demand neighborhoods', 'Close to Universal and major roads'] },
  clermont: { key: 'clermont', title: 'Clermont + South Lake', region: 'Orlando West', medianPrice: 447000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Rolling hills and lake lifestyle', 'Outdoor recreation and trails', 'Great blend of space and value'] },
  grovelandMascotte: { key: 'grovelandMascotte', title: 'Groveland + Mascotte', region: 'Orlando West', medianPrice: 375000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, highlights: ['Affordable new construction communities', 'Rural-to-suburban growth corridor', 'Large homesites for the price'] },
  minneola: { key: 'minneola', title: 'Minneola', region: 'Orlando West', medianPrice: 520000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Hills of Minneola growth area', 'Lakefront and elevated-view options', 'Fast-growing with new retail'] },
  lakeNona: { key: 'lakeNona', title: 'Lake Nona', region: 'Orlando East', medianPrice: 760000, schoolRating: 'A', constructionType: 'new', sizeCapacity: 3000, highlights: ['Medical City and innovation hub', 'Modern master-planned communities', 'Strong schools and amenity districts'] },
  winterParkMaitland: { key: 'winterParkMaitland', title: 'Winter Park + Maitland', region: 'Orlando East', medianPrice: 550000, schoolRating: 'A', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Historic charm and tree-lined streets', 'Park Avenue walkability and dining', 'Consistently strong school demand'] },
  apopka: { key: 'apopka', title: 'Apopka', region: 'Orlando East', medianPrice: 400000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, highlights: ['Affordable access to Orlando', 'Near Wekiva Springs and nature', 'Growing mix of old and new neighborhoods'] },
  sanford: { key: 'sanford', title: 'Sanford', region: 'Orlando East', medianPrice: 375000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Historic downtown and waterfront', 'SunRail connectivity to Orlando', 'Character homes plus value pockets'] },
  kissimmeeStCloud: { key: 'kissimmeeStCloud', title: 'Kissimmee + St. Cloud', region: 'Orlando South', medianPrice: 325000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, highlights: ['Affordable Disney-area access', 'Diverse communities and price points', 'Short-term-rental-friendly zones nearby'] },
  davenport: { key: 'davenport', title: 'Davenport', region: 'Orlando South', medianPrice: 360000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, highlights: ['Vacation-home and investor demand', 'Strong short-term rental relevance', 'Fast access to Disney corridors'] },
  celebration: { key: 'celebration', title: 'Celebration', region: 'Orlando South', medianPrice: 650000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Disney-built walkable town center', 'Distinctive architecture and HOA upkeep', 'Premium feel with community events'] },
  wesleyChapelNewTampa: { key: 'wesleyChapelNewTampa', title: 'Wesley Chapel + New Tampa', region: 'Tampa North', medianPrice: 424000, schoolRating: 'A', constructionType: 'new', sizeCapacity: 3000, highlights: ['Top schools and family communities', 'Major new construction inventory', 'Easy I-75 access to Tampa'] },
  landOLakes: { key: 'landOLakes', title: 'Land O Lakes', region: 'Tampa North', medianPrice: 434000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Family-oriented planned neighborhoods', 'Connerton and Starkey-adjacent growth', 'Good value for size near Tampa'] },
  brandon: { key: 'brandon', title: 'Brandon', region: 'Tampa East', medianPrice: 365000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Established neighborhoods near Tampa', 'Strong commuter convenience', 'Affordable compared to core Tampa'] },
  riverview: { key: 'riverview', title: 'Riverview', region: 'Tampa East', medianPrice: 410000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, highlights: ['Massive new-construction pipeline', 'Popular with young families', 'Convenient for Tampa and Brandon commutes'] },
  plantCity: { key: 'plantCity', title: 'Plant City', region: 'Tampa East', medianPrice: 340000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Rural character with larger lots', 'Affordable homes and acreage options', 'Between Tampa and Lakeland'] },
  southTampa: { key: 'southTampa', title: 'South Tampa', region: 'Tampa West', medianPrice: 650000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2000, highlights: ['Urban walkable lifestyle and dining', 'Hyde Park and waterfront appeal', 'Premium pricing with top demand'] },
  stPetersburg: { key: 'stPetersburg', title: 'St. Petersburg', region: 'Pinellas', medianPrice: 400000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2000, highlights: ['Arts-and-culture downtown energy', 'Waterfront parks and marinas', 'Beach access with urban amenities'] },
  clearwater: { key: 'clearwater', title: 'Clearwater', region: 'Pinellas', medianPrice: 340000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2000, highlights: ['Close to award-winning beaches', 'Tourism-driven economy and convenience', 'Affordable Pinellas entry point'] },
  lakeland: { key: 'lakeland', title: 'Lakeland', region: 'Polk County', medianPrice: 295000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['One of the best values on I-4', 'Revitalizing downtown and job growth', 'Balanced distance to Tampa and Orlando'] },
  winterHaven: { key: 'winterHaven', title: 'Winter Haven', region: 'Polk County', medianPrice: 295000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Chain of Lakes lifestyle', 'Affordable pricing with recreation', 'Retirement- and family-friendly options'] },
  lakeAlfred: { key: 'lakeAlfred', title: 'Lake Alfred', region: 'Polk County', medianPrice: 330000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 2500, highlights: ['Small-town feel and lower prices', 'Convenient to Lakeland and Winter Haven', 'Emerging value neighborhoods'] },
  hainesCity: { key: 'hainesCity', title: 'Haines City', region: 'Polk County', medianPrice: 325000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Affordable with Disney-side access', 'Growing rental and vacation demand', 'New communities at lower price points'] },
  lakeWales: { key: 'lakeWales', title: 'Lake Wales', region: 'Polk County', medianPrice: 258000, schoolRating: 'B', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Most affordable market in the quiz', 'Historic downtown and Bok Tower area', 'Great for strict budget shoppers'] },
  auburndale: { key: 'auburndale', title: 'Auburndale', region: 'Polk County', medianPrice: 326000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 3000, highlights: ['Family-focused communities', 'Easy access to Lakeland employers', 'Solid value with newer pockets'] },
  lakewoodRanch: { key: 'lakewoodRanch', title: 'Lakewood Ranch', region: 'Sarasota/Manatee', medianPrice: 595000, schoolRating: 'A+', constructionType: 'new', sizeCapacity: 3000, highlights: ['Top master-planned community in the U.S.', 'A+ schools and full amenities', 'Upscale lifestyle near beaches'] },
  sarasota: { key: 'sarasota', title: 'Sarasota', region: 'Sarasota/Manatee', medianPrice: 475000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 2500, highlights: ['Strong arts and cultural scene', 'Beach-city lifestyle with walkability', 'Popular retirement and relocation market'] },
  bradenton: { key: 'bradenton', title: 'Bradenton', region: 'Sarasota/Manatee', medianPrice: 435000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, highlights: ['Beach access at lower cost than Sarasota', 'Anna Maria Island proximity', 'Good range of neighborhoods'] },
  parrish: { key: 'parrish', title: 'Parrish', region: 'Sarasota/Manatee', medianPrice: 443000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, highlights: ['Booming new-construction market', 'Family-oriented master plans', 'Strong inventory for larger homes'] },
  mountDora: { key: 'mountDora', title: 'Mount Dora', region: 'Lake County', medianPrice: 435000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, highlights: ['Charming and walkable historic downtown', 'Lakefront views and festivals', 'Top choice for arts-focused retirees'] }
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What lifestyle is the best fit?',
    options: [
      { text: 'Beach + coastal energy', tagBoosts: { beach: 3, downtownWalkable: 1 }, insight: 'You value coastal lifestyle and waterfront access.' },
      { text: 'Master-planned suburbs with amenities', tagBoosts: { newConstruction: 3, topSchools: 2 }, insight: 'You prefer amenity-rich suburban communities.' },
      { text: 'Historic downtown charm and walkability', tagBoosts: { downtownWalkable: 3, luxury: 1 }, insight: 'Walkable districts and character neighborhoods matter to you.' },
      { text: 'Space, lakes, trails, and outdoors', tagBoosts: { outdoorNature: 3, affordability: 1 }, insight: 'You prioritize nature access and elbow room.' }
    ]
  },
  {
    id: 2,
    prompt: 'How important are top-rated schools?',
    options: [
      { text: 'Critical priority', tagBoosts: { topSchools: 3 }, insight: 'Top-tier school zones are a major priority.' },
      { text: 'Important but not everything', tagBoosts: { topSchools: 2 } },
      { text: 'Nice to have', tagBoosts: { topSchools: 1 } },
      { text: 'Not a deciding factor', tagBoosts: {} }
    ]
  },
  {
    id: 3,
    prompt: 'How much does Disney/theme park access matter?',
    options: [
      { text: 'Very important', tagBoosts: { themeParks: 3 }, insight: 'Theme park proximity is a strong driver in your search.' },
      { text: 'Somewhat important', tagBoosts: { themeParks: 2 } },
      { text: 'Only for occasional visits', tagBoosts: { themeParks: 1 } },
      { text: 'Not important', tagBoosts: {} }
    ]
  },
  {
    id: 4,
    prompt: 'Will you need short-term-rental flexibility?',
    options: [
      { text: 'Yes, STR potential is important', tagBoosts: { shortTermRental: 3 }, insight: 'You want markets that support short-term rental opportunities.' },
      { text: 'Maybe in the future', tagBoosts: { shortTermRental: 2 } },
      { text: 'Unlikely', tagBoosts: { shortTermRental: 1 } },
      { text: 'No, owner-occupied only', tagBoosts: {} }
    ]
  },
  {
    id: 5,
    prompt: 'Which commute target matters more?',
    options: [
      { text: 'Tampa area access', tagBoosts: { commuteTampa: 3 }, insight: 'You want shorter commutes to Tampa hubs.' },
      { text: 'Orlando area access', tagBoosts: { commuteOrlando: 3 }, insight: 'You want to stay convenient to Orlando.' },
      { text: 'Balanced between both metros', tagBoosts: { commuteTampa: 2, commuteOrlando: 2 } },
      { text: 'Commute is not a major factor', tagBoosts: {} }
    ]
  },
  {
    id: 6,
    prompt: 'What price point best matches your maximum budget?',
    options: [
      { text: 'Under $300K', budgetValue: 'under300', insight: 'You are focused on the most affordable relocation options.' },
      { text: '$300K - $400K', budgetValue: '300to400' },
      { text: '$400K - $500K', budgetValue: '400to500' },
      { text: '$500K - $650K', budgetValue: '500to650' },
      { text: '$650K - $800K', budgetValue: '650to800' },
      { text: '$800K+', budgetValue: '800plus' }
    ]
  },
  {
    id: 7,
    prompt: 'What minimum home size do you want?',
    options: [
      { text: 'At least 1,500 sf', sizeValue: 1500 },
      { text: 'At least 2,000 sf', sizeValue: 2000 },
      { text: 'At least 2,500 sf', sizeValue: 2500, insight: 'You need areas where larger homes are common.' },
      { text: 'At least 3,000 sf', sizeValue: 3000, insight: 'You are targeting large-home inventory.' }
    ]
  },
  {
    id: 8,
    prompt: 'Do you prefer new construction or resale homes?',
    options: [
      { text: 'New construction only', constructionValue: 'new', tagBoosts: { newConstruction: 3 } },
      { text: 'Resale/established only', constructionValue: 'resale', tagBoosts: { downtownWalkable: 1 } },
      { text: 'Either is fine', constructionValue: 'either' }
    ]
  }
];

export const tagWeights: Record<ScoreTag, Partial<Record<AreaKey, number>>> = {
  beach: { stPetersburg: 3, clearwater: 3, sarasota: 3, bradenton: 3, lakewoodRanch: 2 },
  themeParks: { kissimmeeStCloud: 3, davenport: 3, celebration: 3, horizonWest: 2, lakeNona: 2 },
  topSchools: { lakewoodRanch: 3, lakeNona: 3, wesleyChapelNewTampa: 3, winterParkMaitland: 3, windermere: 3, winterGarden: 2 },
  affordability: { lakeWales: 3, winterHaven: 3, lakeland: 3, hainesCity: 3, grovelandMascotte: 2, kissimmeeStCloud: 2 },
  newConstruction: { wesleyChapelNewTampa: 3, riverview: 3, parrish: 3, horizonWest: 3, grovelandMascotte: 3, lakewoodRanch: 2, lakeNona: 2, davenport: 3 },
  luxury: { windermere: 3, southTampa: 3, lakeNona: 3, winterParkMaitland: 2, lakewoodRanch: 2 },
  shortTermRental: { davenport: 3, kissimmeeStCloud: 3, hainesCity: 3, celebration: 2 },
  downtownWalkable: { winterParkMaitland: 3, stPetersburg: 3, mountDora: 3, southTampa: 3, sarasota: 2, lakeland: 2 },
  outdoorNature: { clermont: 3, mountDora: 3, winterHaven: 3, sanford: 2, landOLakes: 2 },
  commuteTampa: { wesleyChapelNewTampa: 3, brandon: 3, riverview: 3, lakeland: 2, landOLakes: 2 },
  commuteOrlando: { winterGarden: 3, lakeNona: 3, winterParkMaitland: 3, sanford: 2, apopka: 2 }
};

const budgetPools: Record<BudgetBracket, AreaKey[]> = {
  under300: ['lakeWales', 'winterHaven', 'lakeland', 'hainesCity', 'lakeAlfred', 'auburndale'],
  '300to400': ['kissimmeeStCloud', 'davenport', 'grovelandMascotte', 'sanford', 'apopka', 'brandon', 'clearwater', 'plantCity'],
  '400to500': ['wesleyChapelNewTampa', 'riverview', 'mountDora', 'clermont', 'landOLakes', 'bradenton', 'stPetersburg', 'parrish'],
  '500to650': ['winterGarden', 'horizonWest', 'winterParkMaitland', 'minneola', 'lakewoodRanch', 'southTampa'],
  '650to800': ['lakeNona', 'celebration', 'sarasota'],
  '800plus': ['windermere', 'drPhillips', 'lakeNona', 'lakewoodRanch']
};

export function getBudgetAllowedAreas(budget: BudgetBracket): Set<AreaKey> {
  const ordered: BudgetBracket[] = ['under300', '300to400', '400to500', '500to650', '650to800', '800plus'];
  const maxIndex = ordered.indexOf(budget);
  const allowed = new Set<AreaKey>();

  ordered.slice(0, maxIndex + 1).forEach((bracket) => {
    budgetPools[bracket].forEach((key) => allowed.add(key));
  });

  return allowed;
}

export function filterBySize(area: AreaProfile, minSize: SizeNeed) {
  return area.sizeCapacity >= minSize;
}

export function filterByConstruction(area: AreaProfile, preference: 'new' | 'resale' | 'either') {
  if (preference === 'either') {
    return true;
  }

  if (preference === 'new') {
    return area.constructionType === 'new' || area.constructionType === 'mixed';
  }

  return area.constructionType === 'resale' || area.constructionType === 'mixed';
}
