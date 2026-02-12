import { AreaKey, AreaProfile, QuizQuestion } from '../types';

export const areaProfiles: Record<AreaKey, AreaProfile> = {
  wesleyChapel: {
    key: 'wesleyChapel',
    title: 'Wesley Chapel + New Tampa',
    subtitle: 'Fast-growing master-planned communities north of Tampa.',
    vibe: 'Family-friendly neighborhoods, top schools, and abundant newer homes with suburban convenience.',
    callout: 'Great fit for households wanting modern communities near Wiregrass and Tampa Premium Outlets.',
    highlights: ['A-rated school options in many zones', 'Amenity-rich master-planned communities', 'Easy access to Tampa job hubs via I-75']
  },
  southTampa: {
    key: 'southTampa',
    title: 'South Tampa + Brandon + Riverview',
    subtitle: 'Urban convenience paired with affordable suburban options.',
    vibe: 'Choose walkable, upscale city living or value-oriented neighborhoods with practical commutes.',
    callout: 'Ideal if you want Tampa access, MacDill proximity, and lifestyle flexibility by budget.',
    highlights: ['Close to downtown Tampa and major employers', 'Blend of city, suburban, and waterfront access', 'Solid value pockets in Brandon and Riverview']
  },
  stPete: {
    key: 'stPete',
    title: 'St. Petersburg + Clearwater',
    subtitle: 'Gulf coast energy with vibrant culture and world-class beaches.',
    vibe: 'Urban waterfront neighborhoods, arts districts, breweries, and sunset-driven beach life.',
    callout: 'Perfect for buyers who prioritize coastal living with walkable downtown amenities.',
    highlights: ['Top beach access and waterfront lifestyle', 'Strong arts, dining, and nightlife scene', 'Mix of historic charm and modern condo options']
  },
  polkCounty: {
    key: 'polkCounty',
    title: 'Lakeland + Winter Haven',
    subtitle: 'Affordable Central Florida living between Tampa and Orlando.',
    vibe: 'Small-city charm, larger lots, and practical pricing with easy I-4 positioning.',
    callout: 'A smart central-location play for remote workers and value-focused buyers.',
    highlights: ['Lower average home prices and more space', 'Growing downtown districts and local events', 'Convenient midpoint for Tampa/Orlando access']
  },
  lakewoodRanch: {
    key: 'lakewoodRanch',
    title: 'Lakewood Ranch',
    subtitle: 'Premier master-planned living near Sarasota and the Gulf.',
    vibe: 'Upscale new construction, resort-style amenities, and strong schools in a polished setting.',
    callout: 'Excellent for buyers wanting elevated suburban-coastal living with turnkey neighborhoods.',
    highlights: ['Highly amenitized planned communities', 'Consistently strong school demand', 'Quick routes to Sarasota culture and beaches']
  },
  sarasota: {
    key: 'sarasota',
    title: 'Sarasota + Bradenton',
    subtitle: 'Coastal culture, arts, and beach-town lifestyle.',
    vibe: 'Historic charm and newer builds blend with dining, arts, and Gulf waterfront living.',
    callout: 'Great for lifestyle buyers seeking Siesta Key, Anna Maria, and cultural depth.',
    highlights: ['Access to premier Gulf beaches', 'Strong arts and dining scenes', 'Diverse housing from character homes to new builds']
  },
  winterGarden: {
    key: 'winterGarden',
    title: 'Winter Garden + Horizon West',
    subtitle: 'Master-planned convenience with a family-forward feel.',
    vibe: 'Walkable districts, newer homes, and easy Disney-area access.',
    callout: 'Great blend of neighborhoods, schools, and lifestyle amenities.',
    highlights: ['Historic downtown events and markets', 'Modern communities with parks and trails', 'Strong fit for active households']
  },
  lakeNona: {
    key: 'lakeNona',
    title: 'Lake Nona',
    subtitle: 'Innovation corridor energy with upscale modern living.',
    vibe: 'Tech-forward, polished, and highly connected to Orlando hotspots.',
    callout: 'Ideal if you want newer construction and a sleek lifestyle hub.',
    highlights: ['Medical City and business growth', 'Dining, fitness, and recreation clusters', 'Convenient airport and highway access']
  },
  clermont: {
    key: 'clermont',
    title: 'Clermont + South Lake',
    subtitle: 'Space, nature, and value with a laid-back pace.',
    vibe: 'Rolling hills, lakes, and room to breathe without losing convenience.',
    callout: 'Perfect for buyers who want space and outdoor living.',
    highlights: ['Larger lots and scenic views', 'Strong sense of community', 'Appealing value relative to core Orlando']
  },
  kissimmee: {
    key: 'kissimmee',
    title: 'Kissimmee + St. Cloud + Davenport',
    subtitle: 'Affordable Orlando-area access near Disney growth corridors.',
    vibe: 'Fast-growing new communities with practical prices for first-time and family buyers.',
    callout: 'Strong option for budget-conscious buyers who still want major-attraction access.',
    highlights: ['Plentiful newer construction at approachable prices', 'Convenient to theme parks and hospitality jobs', 'Family-friendly neighborhoods with steady growth']
  },
  winterPark: {
    key: 'winterPark',
    title: 'Winter Park + Maitland',
    subtitle: 'Established charm with upscale character and culture.',
    vibe: 'Tree-lined streets, boutique districts, and timeless architecture.',
    callout: 'Best for buyers seeking classic charm and central location.',
    highlights: ['Dining, arts, and shopping destinations', 'Character homes and mature neighborhoods', 'Close-in commute advantages']
  }
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What lifestyle vibe feels most like home?',
    options: [
      { text: 'Urban, walkable, and always something happening', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 1, sarasota: 2, winterGarden: 1, lakeNona: 2, clermont: 0, kissimmee: 1, winterPark: 3 } },
      { text: 'Master-planned suburban living with amenities', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 1, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 2, winterPark: 1 } },
      { text: 'More space, quieter roads, and a slower pace', scores: { wesleyChapel: 2, southTampa: 0, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 2, winterPark: 1 } },
      { text: 'Coastal relaxed with beach-town energy', scores: { wesleyChapel: 0, southTampa: 1, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Small-city feel with local pride and affordability', scores: { wesleyChapel: 1, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 0, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 2, kissimmee: 2, winterPark: 0 } }
    ]
  },
  {
    id: 2,
    prompt: 'Which work/commute setup best matches your life right now?',
    options: [
      { text: 'I need strong access to Tampa-area jobs', scores: { wesleyChapel: 3, southTampa: 3, stPete: 2, polkCounty: 1, lakewoodRanch: 1, sarasota: 1, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 0 } },
      { text: 'I need strong access to Orlando-area jobs', scores: { wesleyChapel: 0, southTampa: 0, stPete: 0, polkCounty: 1, lakewoodRanch: 0, sarasota: 0, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 3, winterPark: 3 } },
      { text: 'Remote or hybrid — I care more about quality of life', scores: { wesleyChapel: 2, southTampa: 1, stPete: 2, polkCounty: 3, lakewoodRanch: 2, sarasota: 2, winterGarden: 2, lakeNona: 1, clermont: 3, kissimmee: 2, winterPark: 1 } },
      { text: 'Medical/tech ecosystem is a major priority', scores: { wesleyChapel: 1, southTampa: 2, stPete: 1, polkCounty: 0, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 3, clermont: 0, kissimmee: 1, winterPark: 2 } }
    ]
  },
  {
    id: 3,
    prompt: 'Pick your ideal weekend plan:',
    options: [
      { text: 'Beach day, sunset, and waterfront dining', scores: { wesleyChapel: 0, southTampa: 2, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Theme parks and entertainment hubs', scores: { wesleyChapel: 0, southTampa: 0, stPete: 0, polkCounty: 1, lakewoodRanch: 0, sarasota: 0, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 3, winterPark: 1 } },
      { text: 'Lakes, trails, and outdoor adventure', scores: { wesleyChapel: 2, southTampa: 1, stPete: 1, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 2, lakeNona: 1, clermont: 3, kissimmee: 2, winterPark: 1 } },
      { text: 'Arts, dining, breweries, and culture', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 1, lakewoodRanch: 1, sarasota: 3, winterGarden: 1, lakeNona: 2, clermont: 0, kissimmee: 1, winterPark: 3 } },
      { text: 'Community events and neighborhood gatherings', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 2, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 2, winterPark: 1 } }
    ]
  },
  {
    id: 4,
    prompt: 'What home style are you most drawn to?',
    options: [
      { text: 'New construction in master-planned communities', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 2, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 3, winterPark: 0 } },
      { text: 'Modern upscale homes with design-forward finishes', scores: { wesleyChapel: 2, southTampa: 3, stPete: 2, polkCounty: 0, lakewoodRanch: 3, sarasota: 2, winterGarden: 1, lakeNona: 3, clermont: 0, kissimmee: 1, winterPark: 2 } },
      { text: 'Larger lots and better value for square footage', scores: { wesleyChapel: 2, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 3, winterPark: 0 } },
      { text: 'Coastal homes or condos near the water', scores: { wesleyChapel: 0, southTampa: 2, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Historic character and established neighborhoods', scores: { wesleyChapel: 0, southTampa: 2, stPete: 2, polkCounty: 1, lakewoodRanch: 0, sarasota: 2, winterGarden: 1, lakeNona: 0, clermont: 1, kissimmee: 1, winterPark: 3 } }
    ]
  },
  {
    id: 5,
    prompt: 'What budget range are you targeting?',
    options: [
      { text: 'Under $300k', scores: { wesleyChapel: 1, southTampa: 0, stPete: 0, polkCounty: 3, lakewoodRanch: 0, sarasota: 0, winterGarden: 0, lakeNona: 0, clermont: 2, kissimmee: 3, winterPark: 0 } },
      { text: '$300k - $450k', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 3, lakeNona: 2, clermont: 3, kissimmee: 3, winterPark: 1 } },
      { text: '$450k - $600k', scores: { wesleyChapel: 2, southTampa: 3, stPete: 2, polkCounty: 1, lakewoodRanch: 3, sarasota: 2, winterGarden: 2, lakeNona: 3, clermont: 2, kissimmee: 1, winterPark: 2 } },
      { text: '$600k+', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 1, lakeNona: 3, clermont: 1, kissimmee: 0, winterPark: 3 } }
    ]
  },
  {
    id: 6,
    prompt: 'How important are top-rated schools?',
    options: [
      { text: 'Critical — this is a top decision factor', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 1, lakewoodRanch: 3, sarasota: 2, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 1, winterPark: 2 } },
      { text: 'Good schools are enough, balance matters most', scores: { wesleyChapel: 2, southTampa: 2, stPete: 2, polkCounty: 2, lakewoodRanch: 2, sarasota: 2, winterGarden: 2, lakeNona: 2, clermont: 2, kissimmee: 2, winterPark: 2 } },
      { text: 'Not a major factor (no kids or different priority)', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 2, lakewoodRanch: 2, sarasota: 3, winterGarden: 1, lakeNona: 2, clermont: 2, kissimmee: 2, winterPark: 3 } },
      { text: 'I want school quality plus after-school amenities', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 1, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 2, winterPark: 1 } }
    ]
  },
  {
    id: 7,
    prompt: 'How important is being close to Gulf beaches?',
    options: [
      { text: 'Must be close — beach life is non-negotiable', scores: { wesleyChapel: 0, southTampa: 2, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Nice to have on weekends', scores: { wesleyChapel: 2, southTampa: 3, stPete: 2, polkCounty: 1, lakewoodRanch: 2, sarasota: 2, winterGarden: 1, lakeNona: 0, clermont: 1, kissimmee: 0, winterPark: 1 } },
      { text: 'Not important to me', scores: { wesleyChapel: 3, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 0, winterGarden: 3, lakeNona: 3, clermont: 3, kissimmee: 3, winterPark: 2 } },
      { text: 'I prefer lakes and parks over beaches', scores: { wesleyChapel: 2, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 0, winterGarden: 2, lakeNona: 2, clermont: 3, kissimmee: 2, winterPark: 2 } }
    ]
  },
  {
    id: 8,
    prompt: 'How much does theme park proximity matter?',
    options: [
      { text: 'Very important for my lifestyle', scores: { wesleyChapel: 0, southTampa: 0, stPete: 0, polkCounty: 2, lakewoodRanch: 0, sarasota: 0, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 3, winterPark: 1 } },
      { text: 'Nice to have for visitors', scores: { wesleyChapel: 1, southTampa: 1, stPete: 1, polkCounty: 3, lakewoodRanch: 0, sarasota: 0, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 3, winterPark: 2 } },
      { text: 'Not a priority at all', scores: { wesleyChapel: 3, southTampa: 3, stPete: 3, polkCounty: 1, lakewoodRanch: 3, sarasota: 3, winterGarden: 1, lakeNona: 1, clermont: 2, kissimmee: 0, winterPark: 2 } },
      { text: 'I care more about central access to both metros', scores: { wesleyChapel: 1, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 0, sarasota: 0, winterGarden: 2, lakeNona: 1, clermont: 2, kissimmee: 2, winterPark: 1 } }
    ]
  },
  {
    id: 9,
    prompt: 'What pace of life do you prefer?',
    options: [
      { text: 'Fast-paced urban energy', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 1, sarasota: 2, winterGarden: 1, lakeNona: 2, clermont: 0, kissimmee: 1, winterPark: 3 } },
      { text: 'Active suburban with plenty to do', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 1, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 2, winterPark: 1 } },
      { text: 'Laid-back small-town rhythm', scores: { wesleyChapel: 2, southTampa: 0, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 2, winterPark: 1 } },
      { text: 'Relaxed coastal lifestyle', scores: { wesleyChapel: 0, southTampa: 1, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } }
    ]
  },
  {
    id: 10,
    prompt: 'What neighborhood feature matters most?',
    options: [
      { text: 'Walkability, restaurants, and nightlife', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 1, sarasota: 2, winterGarden: 2, lakeNona: 2, clermont: 0, kissimmee: 1, winterPark: 3 } },
      { text: 'Community amenities (pools, parks, events)', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 1, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 2, winterPark: 1 } },
      { text: 'Space, privacy, and room to grow', scores: { wesleyChapel: 2, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 2, winterPark: 1 } },
      { text: 'Direct beach and waterfront access', scores: { wesleyChapel: 0, southTampa: 2, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Affordability and monthly budget comfort', scores: { wesleyChapel: 2, southTampa: 1, stPete: 0, polkCounty: 3, lakewoodRanch: 0, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 3, winterPark: 0 } }
    ]
  },
  {
    id: 11,
    prompt: 'How much commute time are you comfortable with?',
    options: [
      { text: 'Under 20 minutes preferred', scores: { wesleyChapel: 2, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 1, sarasota: 2, winterGarden: 2, lakeNona: 3, clermont: 1, kissimmee: 2, winterPark: 3 } },
      { text: '20-40 minutes is reasonable', scores: { wesleyChapel: 3, southTampa: 2, stPete: 2, polkCounty: 2, lakewoodRanch: 3, sarasota: 2, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 2, winterPark: 2 } },
      { text: '40+ minutes is fine for more house/space', scores: { wesleyChapel: 1, southTampa: 0, stPete: 0, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 1, lakeNona: 0, clermont: 3, kissimmee: 3, winterPark: 0 } },
      { text: 'I mostly work from home, commute is occasional', scores: { wesleyChapel: 2, southTampa: 1, stPete: 2, polkCounty: 3, lakewoodRanch: 2, sarasota: 2, winterGarden: 2, lakeNona: 1, clermont: 3, kissimmee: 2, winterPark: 1 } }
    ]
  },
  {
    id: 12,
    prompt: 'What would you most want to show visitors?',
    options: [
      { text: 'City skyline, nightlife, and downtown spots', scores: { wesleyChapel: 1, southTampa: 3, stPete: 3, polkCounty: 0, lakewoodRanch: 1, sarasota: 2, winterGarden: 1, lakeNona: 2, clermont: 0, kissimmee: 1, winterPark: 3 } },
      { text: 'Beach sunsets and waterfront views', scores: { wesleyChapel: 0, southTampa: 2, stPete: 3, polkCounty: 0, lakewoodRanch: 3, sarasota: 3, winterGarden: 0, lakeNona: 0, clermont: 0, kissimmee: 0, winterPark: 1 } },
      { text: 'Theme parks and entertainment', scores: { wesleyChapel: 0, southTampa: 0, stPete: 0, polkCounty: 2, lakewoodRanch: 0, sarasota: 0, winterGarden: 3, lakeNona: 2, clermont: 2, kissimmee: 3, winterPark: 1 } },
      { text: 'My community amenities and neighborhood vibe', scores: { wesleyChapel: 3, southTampa: 2, stPete: 1, polkCounty: 2, lakewoodRanch: 3, sarasota: 1, winterGarden: 3, lakeNona: 3, clermont: 2, kissimmee: 2, winterPark: 1 } },
      { text: 'Lakes, trails, and natural scenery', scores: { wesleyChapel: 2, southTampa: 1, stPete: 1, polkCounty: 3, lakewoodRanch: 1, sarasota: 1, winterGarden: 2, lakeNona: 1, clermont: 3, kissimmee: 2, winterPark: 1 } }
    ]
  }
];
