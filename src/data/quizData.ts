import { AreaKey, AreaProfile, BudgetBracket, EcosystemKey, QuizQuestion, SizeNeed } from '../types';

const defaults = {
  hasPrivateSchools: false,
  strongSports: false,
  commuteOrlando: 'medium' as const,
  commuteTampa: 'medium' as const,
  commuteI4: 'medium' as const,
  nearAttractions: false,
  waterAccess: 'good' as const,
  golfCommunities: false,
  downtownWalkable: false,
  farmersMarkets: false,
  natureTrails: false,
  neighborhoodType: 'mixed' as const,
  hoaLevel: 'mixed' as const,
  airportMCO: 55,
  airportTPA: 55,
  airportSRQ: 90,
  diningStyle: 'mixed' as const
};

export const areaProfiles: Record<AreaKey, AreaProfile> = {
  winterGarden: { ...defaults, key: 'winterGarden', title: 'Winter Garden', region: 'Orlando West', medianPrice: 560000, schoolRating: 'A', constructionType: 'mixed', sizeCapacity: 3000, commuteOrlando: 'close', commuteTampa: 'far', nearAttractions: true, downtownWalkable: true, farmersMarkets: true, hasPrivateSchools: true, airportMCO: 35, neighborhoodType: 'mixed', highlights: ['Top schools and family-focused neighborhoods', 'Historic downtown plus modern conveniences', 'Quick access to Orlando job centers'] },
  horizonWest: { ...defaults, key: 'horizonWest', title: 'Horizon West', region: 'Orlando West', medianPrice: 560000, schoolRating: 'A', constructionType: 'new', sizeCapacity: 3000, commuteOrlando: 'close', commuteTampa: 'far', nearAttractions: true, golfCommunities: true, neighborhoodType: 'new', hoaLevel: 'full', diningStyle: 'chains', airportMCO: 35, highlights: ['Hamlin Town Center and newer retail', 'Master-planned communities with trails', 'Strong new-build inventory'] },
  windermere: { ...defaults, key: 'windermere', title: 'Windermere', region: 'Orlando West', medianPrice: 836000, schoolRating: 'A+', constructionType: 'mixed', sizeCapacity: 3000, commuteOrlando: 'close', hasPrivateSchools: true, golfCommunities: true, neighborhoodType: 'established', airportMCO: 30, diningStyle: 'local', highlights: ['Luxury lakefront homes and gated options', 'Top school zoning including Windermere High', 'Upscale lifestyle with privacy'] },
  drPhillips: { ...defaults, key: 'drPhillips', title: 'Dr. Phillips', region: 'Orlando West', medianPrice: 836000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, commuteOrlando: 'close', hasPrivateSchools: true, diningStyle: 'local', airportMCO: 25, downtownWalkable: true, neighborhoodType: 'established', highlights: ['Restaurant Row and upscale dining', 'Established high-demand neighborhoods', 'Close to Universal and major roads'] },
  clermont: { ...defaults, key: 'clermont', title: 'Clermont + South Lake', region: 'Orlando West', medianPrice: 447000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, commuteOrlando: 'medium', commuteI4: 'medium', waterAccess: 'excellent', natureTrails: true, neighborhoodType: 'mixed', golfCommunities: true, highlights: ['Rolling hills and lake lifestyle', 'Outdoor recreation and trails', 'Great blend of space and value'] },
  grovelandMascotte: { ...defaults, key: 'grovelandMascotte', title: 'Groveland + Mascotte', region: 'Orlando West', medianPrice: 375000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, commuteOrlando: 'medium', commuteI4: 'medium', neighborhoodType: 'new', hoaLevel: 'light', diningStyle: 'chains', highlights: ['Affordable new construction communities', 'Rural-to-suburban growth corridor', 'Large homesites for the price'] },
  minneola: { ...defaults, key: 'minneola', title: 'Minneola', region: 'Orlando West', medianPrice: 520000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, commuteOrlando: 'medium', waterAccess: 'excellent', natureTrails: true, neighborhoodType: 'mixed', airportMCO: 45, highlights: ['Hills of Minneola growth area', 'Lakefront and elevated-view options', 'Fast-growing with new retail'] },
  lakeNona: { ...defaults, key: 'lakeNona', title: 'Lake Nona', region: 'Orlando East', medianPrice: 760000, schoolRating: 'A+', constructionType: 'new', sizeCapacity: 3000, hasPrivateSchools: true, golfCommunities: true, strongSports: true, commuteOrlando: 'close', neighborhoodType: 'new', hoaLevel: 'full', diningStyle: 'mixed', airportMCO: 10, highlights: ['Medical City and innovation hub', 'Modern master-planned communities', 'Strong schools and amenity districts'] },
  winterParkMaitland: { ...defaults, key: 'winterParkMaitland', title: 'Winter Park + Maitland', region: 'Orlando East', medianPrice: 550000, schoolRating: 'A+', constructionType: 'resale', sizeCapacity: 2500, hasPrivateSchools: true, commuteOrlando: 'close', downtownWalkable: true, diningStyle: 'local', neighborhoodType: 'established', airportMCO: 30, farmersMarkets: true, highlights: ['Historic charm and tree-lined streets', 'Park Avenue walkability and dining', 'Consistently strong school demand'] },
  apopka: { ...defaults, key: 'apopka', title: 'Apopka', region: 'Orlando East', medianPrice: 400000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, commuteOrlando: 'medium', natureTrails: true, hoaLevel: 'none', commuteI4: 'medium', airportMCO: 40, highlights: ['Affordable access to Orlando', 'Near Wekiva Springs and nature', 'Growing mix of old and new neighborhoods'] },
  sanford: { ...defaults, key: 'sanford', title: 'Sanford', region: 'Orlando East', medianPrice: 375000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2500, commuteOrlando: 'medium', commuteI4: 'medium', downtownWalkable: true, waterAccess: 'excellent', farmersMarkets: true, natureTrails: true, neighborhoodType: 'established', hoaLevel: 'none', airportMCO: 35, highlights: ['Historic downtown and waterfront', 'SunRail connectivity to Orlando', 'Character homes plus value pockets'] },
  kissimmeeStCloud: { ...defaults, key: 'kissimmeeStCloud', title: 'Kissimmee + St. Cloud', region: 'Orlando South', medianPrice: 325000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, commuteOrlando: 'medium', commuteI4: 'medium', nearAttractions: true, airportMCO: 25, diningStyle: 'chains', highlights: ['Affordable Disney-area access', 'Diverse communities and price points', 'Short-term-rental-friendly zones nearby'] },
  davenport: { ...defaults, key: 'davenport', title: 'Davenport', region: 'Orlando South', medianPrice: 360000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, commuteI4: 'close', nearAttractions: true, neighborhoodType: 'new', diningStyle: 'chains', airportMCO: 40, airportTPA: 70, highlights: ['Vacation-home and investor demand', 'Strong short-term rental relevance', 'Fast access to Disney corridors'] },
  celebration: { ...defaults, key: 'celebration', title: 'Celebration', region: 'Orlando South', medianPrice: 650000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, hasPrivateSchools: true, nearAttractions: true, downtownWalkable: true, neighborhoodType: 'established', hoaLevel: 'full', airportMCO: 30, diningStyle: 'local', highlights: ['Disney-built walkable town center', 'Distinctive architecture and HOA upkeep', 'Premium feel with community events'] },
  wesleyChapelNewTampa: { ...defaults, key: 'wesleyChapelNewTampa', title: 'Wesley Chapel + New Tampa', region: 'Tampa North', medianPrice: 424000, schoolRating: 'A', constructionType: 'new', sizeCapacity: 3000, strongSports: true, commuteTampa: 'close', commuteI4: 'medium', golfCommunities: true, neighborhoodType: 'new', hoaLevel: 'full', airportTPA: 35, diningStyle: 'chains', highlights: ['Top schools and family communities', 'Major new construction inventory', 'Easy I-75 access to Tampa'] },
  landOLakes: { ...defaults, key: 'landOLakes', title: 'Land O Lakes', region: 'Tampa North', medianPrice: 434000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 3000, commuteTampa: 'close', natureTrails: true, neighborhoodType: 'mixed', hoaLevel: 'light', airportTPA: 40, highlights: ['Family-oriented planned neighborhoods', 'Connerton and Starkey-adjacent growth', 'Good value for size near Tampa'] },
  brandon: { ...defaults, key: 'brandon', title: 'Brandon', region: 'Tampa East', medianPrice: 365000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2500, strongSports: true, commuteTampa: 'close', commuteI4: 'medium', airportTPA: 25, diningStyle: 'chains', highlights: ['Established neighborhoods near Tampa', 'Strong commuter convenience', 'Affordable compared to core Tampa'] },
  riverview: { ...defaults, key: 'riverview', title: 'Riverview', region: 'Tampa East', medianPrice: 410000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, commuteTampa: 'close', neighborhoodType: 'new', hoaLevel: 'full', diningStyle: 'chains', airportTPA: 35, highlights: ['Massive new-construction pipeline', 'Popular with young families', 'Convenient for Tampa and Brandon commutes'] },
  plantCity: { ...defaults, key: 'plantCity', title: 'Plant City', region: 'Tampa East', medianPrice: 340000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 3000, commuteTampa: 'medium', commuteI4: 'close', farmersMarkets: true, neighborhoodType: 'mixed', hoaLevel: 'none', airportTPA: 35, airportMCO: 55, highlights: ['Rural character with larger lots', 'Affordable homes and acreage options', 'Between Tampa and Lakeland'] },
  southTampa: { ...defaults, key: 'southTampa', title: 'South Tampa', region: 'Tampa Core', medianPrice: 780000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, hasPrivateSchools: true, commuteTampa: 'close', downtownWalkable: true, diningStyle: 'local', neighborhoodType: 'established', airportTPA: 15, highlights: ['Urban lifestyle near Bayshore and Hyde Park', 'Top private schools and dining scene', 'Quick access to downtown employers'] },
  stPetersburg: { ...defaults, key: 'stPetersburg', title: 'St. Petersburg', region: 'Pinellas', medianPrice: 490000, schoolRating: 'B+', constructionType: 'resale', sizeCapacity: 2500, commuteTampa: 'medium', nearAttractions: true, waterAccess: 'excellent', downtownWalkable: true, diningStyle: 'local', airportTPA: 30, airportSRQ: 45, highlights: ['Waterfront downtown with arts and nightlife', 'Beach proximity and boating access', 'Strong lifestyle appeal for remote workers'] },
  clearwater: { ...defaults, key: 'clearwater', title: 'Clearwater', region: 'Pinellas', medianPrice: 375000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, commuteTampa: 'medium', nearAttractions: true, waterAccess: 'excellent', airportTPA: 30, diningStyle: 'mixed', highlights: ['Award-winning Gulf beaches nearby', 'Condos, homes, and retirement-friendly options', 'Strong value compared with core beach markets'] },
  lakeland: { ...defaults, key: 'lakeland', title: 'Lakeland', region: 'Polk', medianPrice: 320000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, commuteI4: 'close', commuteOrlando: 'medium', commuteTampa: 'medium', waterAccess: 'excellent', farmersMarkets: true, downtownWalkable: true, airportMCO: 50, airportTPA: 45, highlights: ['True midpoint between Tampa and Orlando', 'Chain of Lakes lifestyle with affordability', 'Growing job base and revitalized downtown'] },
  winterHaven: { ...defaults, key: 'winterHaven', title: 'Winter Haven', region: 'Polk', medianPrice: 305000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 2500, commuteI4: 'close', waterAccess: 'excellent', golfCommunities: true, airportMCO: 55, airportTPA: 60, highlights: ['Dozens of interconnected lakes for boating', 'Strong affordability for first-time movers', 'Mix of established neighborhoods and new communities'] },
  lakeAlfred: { ...defaults, key: 'lakeAlfred', title: 'Lake Alfred', region: 'Polk', medianPrice: 315000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 2500, commuteI4: 'close', waterAccess: 'good', hoaLevel: 'none', airportMCO: 50, airportTPA: 60, highlights: ['Small-town feel near major I-4 routes', 'Value-focused pricing with room to grow', 'Convenient access to Winter Haven and Lakeland'] },
  hainesCity: { ...defaults, key: 'hainesCity', title: 'Haines City', region: 'Polk', medianPrice: 300000, schoolRating: 'B-', constructionType: 'new', sizeCapacity: 3000, commuteI4: 'close', nearAttractions: true, neighborhoodType: 'new', diningStyle: 'chains', airportMCO: 45, highlights: ['Fast-growing new-construction corridor', 'Affordable larger homes for families', 'Close to ChampionsGate and Disney access'] },
  lakeWales: { ...defaults, key: 'lakeWales', title: 'Lake Wales', region: 'Polk', medianPrice: 285000, schoolRating: 'B-', constructionType: 'resale', sizeCapacity: 2500, commuteI4: 'far', hoaLevel: 'none', neighborhoodType: 'established', airportMCO: 65, airportTPA: 70, highlights: ['Quiet and affordable with old-Florida feel', 'Large-lot opportunities and fewer HOAs', 'Great fit for peace-and-quiet seekers'] },
  auburndale: { ...defaults, key: 'auburndale', title: 'Auburndale', region: 'Polk', medianPrice: 315000, schoolRating: 'B', constructionType: 'mixed', sizeCapacity: 2500, commuteI4: 'close', waterAccess: 'good', farmersMarkets: true, airportMCO: 55, airportTPA: 50, highlights: ['Central Polk location with easy I-4 access', 'Strong value for growing households', 'Close to major logistics and distribution jobs'] },
  lakewoodRanch: { ...defaults, key: 'lakewoodRanch', title: 'Lakewood Ranch', region: 'Manatee/Sarasota', medianPrice: 640000, schoolRating: 'A+', constructionType: 'new', sizeCapacity: 3000, hasPrivateSchools: true, strongSports: true, golfCommunities: true, neighborhoodType: 'new', hoaLevel: 'full', airportSRQ: 20, airportTPA: 55, diningStyle: 'mixed', highlights: ['Master-planned lifestyle with resort amenities', 'Top school choices and sports options', 'Golf, dining, and healthcare all in one hub'] },
  sarasota: { ...defaults, key: 'sarasota', title: 'Sarasota', region: 'Sarasota Coast', medianPrice: 560000, schoolRating: 'A-', constructionType: 'resale', sizeCapacity: 2500, nearAttractions: true, waterAccess: 'excellent', downtownWalkable: true, diningStyle: 'local', hasPrivateSchools: true, airportSRQ: 15, highlights: ['Beach and arts lifestyle with premium amenities', 'Strong dining and cultural scene', 'Appealing for both retirees and professionals'] },
  bradenton: { ...defaults, key: 'bradenton', title: 'Bradenton', region: 'Manatee Coast', medianPrice: 395000, schoolRating: 'B+', constructionType: 'mixed', sizeCapacity: 2500, nearAttractions: true, waterAccess: 'excellent', airportSRQ: 25, airportTPA: 50, diningStyle: 'mixed', highlights: ['Riverfront and island access at lower prices', 'Boating, beaches, and family neighborhoods', 'Convenient to Sarasota and Lakewood Ranch'] },
  parrish: { ...defaults, key: 'parrish', title: 'Parrish', region: 'Manatee Inland', medianPrice: 430000, schoolRating: 'B+', constructionType: 'new', sizeCapacity: 3000, neighborhoodType: 'new', hoaLevel: 'full', commuteTampa: 'medium', airportSRQ: 35, airportTPA: 45, highlights: ['Rapidly growing new-build communities', 'Big-home value compared to coastal markets', 'Popular with buyers seeking peace and space'] },
  mountDora: { ...defaults, key: 'mountDora', title: 'Mount Dora', region: 'North Orlando', medianPrice: 460000, schoolRating: 'A-', constructionType: 'mixed', sizeCapacity: 2500, commuteOrlando: 'medium', waterAccess: 'excellent', downtownWalkable: true, farmersMarkets: true, diningStyle: 'local', neighborhoodType: 'established', airportMCO: 50, highlights: ['Charming downtown and lakeside living', 'Strong festivals, markets, and local shops', 'Great fit for character over cookie-cutter'] }
};

export const questions: QuizQuestion[] = [
  { id: 1, prompt: 'Do you need good schools?', options: [
    { text: 'No kids or kids are grown', value: 'noKids', insight: 'Schools are not a deciding factor for your move.' },
    { text: 'Yes, elementary age focus', value: 'elem', insight: 'You need strong elementary school zones.' },
    { text: 'Yes, middle/high school focus', value: 'middleHigh', insight: 'You want areas with strong middle and high school options.' },
    { text: 'Yes, all ages matter', value: 'allAges', insight: 'You are prioritizing excellent school pipelines across all grades.' }
  ] },
  { id: 2, prompt: 'What matters most for schools?', options: [
    { text: 'Top academics and test scores', value: 'academics', insight: 'Academic performance and elite school ratings are top priorities.' },
    { text: 'Strong sports and athletics programs', value: 'sports', insight: 'Athletics programs and extracurricular strength matter most.' },
    { text: 'Private school options nearby', value: 'private', insight: 'Access to private school options is key for your family.' },
    { text: 'Just need solid public schools', value: 'solid', insight: 'You want consistently solid public-school coverage.' }
  ] },
  { id: 3, prompt: 'Where will you or your household be working?', options: [
    { text: 'Orlando area', value: 'orlando', insight: 'You are optimizing for Orlando-area job centers.' },
    { text: 'Tampa area', value: 'tampa', insight: 'You are optimizing for Tampa-area job centers.' },
    { text: 'Between both (I-4 corridor)', value: 'i4', insight: 'You need practical access to both metros via I-4.' },
    { text: "Remote/retired/doesn't matter", value: 'remote', insight: 'Commute constraints are minimal, so lifestyle fit leads.' }
  ] },
  { id: 4, prompt: 'How long of a commute is acceptable?', options: [
    { text: 'Under 20 minutes', value: 'under20', insight: 'You need a short day-to-day commute.' },
    { text: '20-35 minutes is fine', value: '20to35' },
    { text: '35-45 minutes is okay', value: '35to45' },
    { text: "Commute doesn't matter", value: 'noLimit' }
  ] },
  { id: 5, prompt: 'How important are theme parks/major attractions to your lifestyle?', options: [
    { text: 'Must-have for regular use or guests', value: 'mustHave', insight: 'Attractions and theme-park access are central to your location fit.' },
    { text: 'Nice bonus, but not required', value: 'niceToHave' },
    { text: 'Not important', value: 'notImportant' }
  ] },
  { id: 6, prompt: "What's your ideal weekend activity?", options: [
    { text: 'Boating, fishing, or water sports', value: 'water', insight: 'Water access and lake/coastal recreation are a major lifestyle fit.' },
    { text: 'Golf and country club lifestyle', value: 'golf' },
    { text: 'Downtown dining, shops, and nightlife', value: 'downtown' },
    { text: 'Farmers markets and community events', value: 'markets' },
    { text: 'Hiking, trails, and nature', value: 'trails' },
    { text: 'Relaxing at home - peace and quiet', value: 'quiet', insight: 'Low-noise communities with extra breathing room are a priority.' }
  ] },
  { id: 7, prompt: 'What type of neighborhood appeals to you?', options: [
    { text: 'Brand new, modern, and growing', value: 'new' },
    { text: 'Established with character and charm', value: 'established' },
    { text: 'Mix of both', value: 'mix' },
    { text: 'Whatever offers the best value', value: 'value', insight: 'You are price-sensitive and open to emerging value areas.' }
  ] },
  { id: 8, prompt: 'How do you feel about HOAs?', options: [
    { text: 'Want full amenities - pools, clubhouse, events', value: 'full' },
    { text: 'Light HOA with basic maintenance is fine', value: 'light' },
    { text: 'Prefer no HOA - want freedom', value: 'none' },
    { text: "Doesn't matter to me", value: 'doesntMatter' }
  ] },
  { id: 9, prompt: 'How important is airport access?', options: [
    { text: 'Very important - I travel frequently for work', value: 'very', insight: 'Fast airport access is an essential convenience for your move.' },
    { text: 'Somewhat - a few trips per year', value: 'somewhat' },
    { text: 'Not important', value: 'not' }
  ] },
  { id: 10, prompt: "What's your dining and shopping preference?", options: [
    { text: 'Big chains and convenient shopping centers', value: 'chains' },
    { text: 'Local unique restaurants and boutiques', value: 'local' },
    { text: 'Good mix of both', value: 'mixed' }
  ] },
  { id: 11, prompt: "What's your maximum budget?", options: [
    { text: 'Under $300K', value: 'under300', budgetValue: 'under300' },
    { text: '$300K - $400K', value: '300to400', budgetValue: '300to400' },
    { text: '$400K - $500K', value: '400to500', budgetValue: '400to500' },
    { text: '$500K - $650K', value: '500to650', budgetValue: '500to650' },
    { text: '$650K - $800K', value: '650to800', budgetValue: '650to800' },
    { text: '$800K+', value: '800plus', budgetValue: '800plus' }
  ] },
  { id: 12, prompt: 'What minimum home size do you need?', options: [
    { text: 'At least 1,500 sq ft', value: '1500', sizeValue: 1500 },
    { text: 'At least 2,000 sq ft', value: '2000', sizeValue: 2000 },
    { text: 'At least 2,500 sq ft', value: '2500', sizeValue: 2500 },
    { text: 'At least 3,000 sq ft', value: '3000', sizeValue: 3000 }
  ] },
  { id: 13, prompt: 'New construction or resale?', options: [
    { text: 'New construction only', value: 'new', constructionValue: 'new' },
    { text: 'Resale/established only', value: 'resale', constructionValue: 'resale' },
    { text: 'Either is fine', value: 'either', constructionValue: 'either' }
  ] },
  { id: 14, prompt: 'How comfortable are you with coastal hurricane exposure?', options: [
    { text: 'Very comfortable with coastal living', value: 'high' },
    { text: 'Some comfort, but prefer balance', value: 'medium' },
    { text: 'Prefer inland / lower coastal risk', value: 'low', insight: 'You prefer inland ecosystems with less coastal exposure.' }
  ] },
  { id: 15, prompt: 'How open are you to exploring outside your primary metro?', options: [
    { text: 'Open to exploring anywhere in Central/West Florida', value: 'openAnywhere' },
    { text: 'Prefer one primary ecosystem only', value: 'primaryOnly' }
  ] }
];

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

  ordered.slice(0, maxIndex + 1).forEach((bracket) => budgetPools[bracket].forEach((key) => allowed.add(key)));
  return allowed;
}

export function filterBySize(area: AreaProfile, minSize: SizeNeed) {
  return area.sizeCapacity >= minSize;
}

export function filterByConstruction(area: AreaProfile, preference: 'new' | 'resale' | 'either') {
  if (preference === 'either') return true;
  if (preference === 'new') return area.constructionType === 'new' || area.constructionType === 'mixed';
  return area.constructionType === 'resale' || area.constructionType === 'mixed';
}


export const ecosystemLabels: Record<EcosystemKey, string> = {
  orlandoCore: 'Orlando Core',
  tampaBayCore: 'Tampa Bay Core',
  pinellasStPete: 'Pinellas / St. Pete',
  sarasotaLakewoodRanch: 'Sarasota / Lakewood Ranch',
  polkCounty: 'Polk County'
};

export const ecosystemAreas: Record<EcosystemKey, AreaKey[]> = {
  orlandoCore: ['lakeNona', 'horizonWest', 'celebration', 'winterGarden', 'windermere', 'clermont', 'davenport', 'kissimmeeStCloud', 'apopka'],
  tampaBayCore: ['southTampa', 'wesleyChapelNewTampa', 'brandon', 'riverview', 'landOLakes'],
  pinellasStPete: ['stPetersburg', 'clearwater'],
  sarasotaLakewoodRanch: ['sarasota', 'lakewoodRanch', 'bradenton'],
  polkCounty: ['lakeland', 'winterHaven', 'hainesCity', 'davenport']
};
