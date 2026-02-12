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
  { id: 1, prompt: 'Pick your ideal Florida weekend', options: [
    { text: 'Beach mornings + waterfront dining', subLabel: 'Coastal lifestyle is your priority', value: 'beach', insight: 'Beach and coastal recreation are a major lifestyle driver.' },
    { text: 'Theme parks and attractions', subLabel: 'Disney/Universal access matters', value: 'themeparks', insight: 'Attractions and theme-park access are central to your location fit.' },
    { text: 'Downtown events + pro sports', subLabel: 'City energy and nightlife', value: 'downtown', insight: 'Urban lifestyle with walkability and dining is a priority.' },
    { text: 'Backyard BBQ + youth sports', subLabel: 'Family suburban amenities', value: 'familysuburb', insight: 'Family-oriented neighborhoods with sports and community events are key.' },
    { text: 'Quiet space + value', subLabel: 'More home for the money', value: 'quiet', insight: 'You value space, affordability, and a quieter pace.' }
  ] },
  { id: 2, prompt: 'Where will you be most often during the week?', options: [
    { text: 'Tampa side', subLabel: 'Tampa metro job centers', value: 'tampa', insight: 'You are optimizing for Tampa-area job centers.' },
    { text: 'Orlando side', subLabel: 'Orlando metro job centers', value: 'orlando', insight: 'You are optimizing for Orlando-area job centers.' },
    { text: 'Between both (I-4 corridor)', subLabel: 'Need access to both metros', value: 'i4', insight: 'You need practical access to both metros via I-4.' },
    { text: 'Remote / hybrid', subLabel: 'Lifestyle fit matters more than commute', value: 'remote', insight: 'Commute constraints are minimal, so lifestyle fit leads.' }
  ] },
  { id: 3, prompt: "On a normal weekday, what's the max drive you'd tolerate during rush hour?", options: [
    { text: '15-25 minutes max', subLabel: 'I want life close and simple', value: 'under25', insight: 'You need a short day-to-day commute.' },
    { text: '25-40 minutes', subLabel: 'I can handle some traffic', value: '25to40' },
    { text: "40-60 minutes (if it's worth it)", subLabel: "I'll drive for the right home/lifestyle", value: '40to60' },
    { text: "I'm remote (commute doesn't matter)", subLabel: 'Flexibility opens more options', value: 'noLimit' }
  ] },
  { id: 4, prompt: 'How do you feel about living near the coast?', options: [
    { text: 'I want to be near beaches no matter what', subLabel: 'Coastal living is non-negotiable', value: 'high', insight: 'Coastal proximity is a top priority for your lifestyle.' },
    { text: 'I want access but not right on the coast', subLabel: 'Beach trips yes, flood zone no', value: 'medium' },
    { text: 'I prefer inland for insurance + storms', subLabel: 'Lower risk and lower costs', value: 'low', insight: 'You prefer inland ecosystems with less coastal exposure.' },
    { text: "Doesn't matter", subLabel: 'Not a deciding factor', value: 'neutral' }
  ] },
  { id: 5, prompt: 'How important is being near Disney/Universal?', options: [
    { text: 'Must be close', subLabel: 'Annual passes, guest visits, or work nearby', value: 'mustHave', insight: 'Theme park proximity is essential for your lifestyle.' },
    { text: 'Nice to have', subLabel: 'Fun for occasional visits', value: 'niceToHave' },
    { text: "Doesn't matter", subLabel: 'Not a factor in my decision', value: 'notImportant' },
    { text: 'I prefer to avoid tourist zones', subLabel: 'Less traffic and tourist crowds', value: 'avoidTourist', insight: 'You prefer areas away from heavy tourist corridors.' }
  ] },
  { id: 6, prompt: 'How important are strong public schools?', options: [
    { text: 'Must-have', subLabel: 'A-rated districts are non-negotiable', value: 'mustHave', insight: 'Top-rated school zones are essential.' },
    { text: 'Nice-to-have', subLabel: "Good schools matter but aren't the only factor", value: 'niceToHave' },
    { text: 'Not a factor', subLabel: 'No kids or kids are grown', value: 'noKids', insight: 'Schools are not a deciding factor for your move.' }
  ] },
  { id: 7, prompt: "What's your comfortable purchase range?", options: [
    { text: 'Under $300K', subLabel: 'Value-focused new construction', value: 'under300', budgetValue: 'under300' },
    { text: '$300K - $400K', subLabel: 'Strong options across multiple areas', value: '300to400', budgetValue: '300to400' },
    { text: '$400K - $500K', subLabel: 'Move-up communities and suburbs', value: '400to500', budgetValue: '400to500' },
    { text: '$500K - $650K', subLabel: 'Master-planned and premium suburbs', value: '500to650', budgetValue: '500to650' },
    { text: '$650K - $800K', subLabel: 'Luxury pockets and top communities', value: '650to800', budgetValue: '650to800' },
    { text: '$800K+', subLabel: 'High-end and custom options', value: '800plus', budgetValue: '800plus' }
  ] },
  { id: 8, prompt: 'How wide should we search to find your best fit?', options: [
    { text: 'Keep it close to the major hubs', subLabel: 'Stay tight to Tampa/Orlando core areas', value: 'hubsOnly', insight: 'You want to stay close to major metro cores.' },
    { text: 'Open to suburbs if the fit is right', subLabel: 'Show me strong nearby options', value: 'openSuburbs' },
    { text: "Show the best value/growth even if it's farther", subLabel: "I'll trade distance for space/price", value: 'openWide', insight: "You're open to value-forward areas farther from metro cores." },
    { text: "Surprise me - I'm open to anything", subLabel: 'Show my best fit anywhere', value: 'openAnywhere' }
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
