import { AreaKey, AreaProfile, QuizQuestion } from '../types';

export const areaProfiles: Record<AreaKey, AreaProfile> = {
  winterGarden: {
    key: 'winterGarden',
    title: 'Winter Garden + Horizon West',
    subtitle: 'Master-planned convenience with a family-forward feel.',
    vibe: 'Walkable districts, newer homes, and easy Disney-area access.',
    callout: 'Great blend of neighborhoods, schools, and lifestyle amenities.',
    highlights: [
      'Historic downtown events and markets',
      'Modern communities with parks and trails',
      'Strong fit for active households'
    ]
  },
  lakeNona: {
    key: 'lakeNona',
    title: 'Lake Nona',
    subtitle: 'Innovation corridor energy with upscale modern living.',
    vibe: 'Tech-forward, polished, and highly connected to Orlando hotspots.',
    callout: 'Ideal if you want newer construction and a sleek lifestyle hub.',
    highlights: [
      'Medical City and business growth',
      'Dining, fitness, and recreation clusters',
      'Convenient airport and highway access'
    ]
  },
  clermont: {
    key: 'clermont',
    title: 'Clermont + South Lake',
    subtitle: 'Space, nature, and value with a laid-back pace.',
    vibe: 'Rolling hills, lakes, and room to breathe without losing convenience.',
    callout: 'Perfect for buyers who want space and outdoor living.',
    highlights: [
      'Larger lots and scenic views',
      'Strong sense of community',
      'Appealing value relative to core Orlando'
    ]
  },
  winterPark: {
    key: 'winterPark',
    title: 'Winter Park + Maitland',
    subtitle: 'Established charm with upscale character and culture.',
    vibe: 'Tree-lined streets, boutique districts, and timeless architecture.',
    callout: 'Best for buyers seeking classic charm and central location.',
    highlights: [
      'Dining, arts, and shopping destinations',
      'Character homes and mature neighborhoods',
      'Close-in commute advantages'
    ]
  }
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What type of community atmosphere feels most like home?',
    options: [
      { text: 'Planned neighborhoods with amenities and community events', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 1 } },
      { text: 'Modern and fast-growing with a polished vibe', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Quiet, spacious, and close to nature', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 1 } },
      { text: 'Historic, established, and full of character', scores: { winterGarden: 0, lakeNona: 1, clermont: 1, winterPark: 3 } }
    ]
  },
  {
    id: 2,
    prompt: 'How important is being near major employment hubs?',
    options: [
      { text: 'Very important — I value direct access to major job centers', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Moderately important, but lifestyle still comes first', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 1 } },
      { text: 'I work remotely and prioritize space over commute', scores: { winterGarden: 1, lakeNona: 1, clermont: 3, winterPark: 0 } },
      { text: 'I want central access with multiple route options', scores: { winterGarden: 1, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 3,
    prompt: 'Pick your ideal weekend routine:',
    options: [
      { text: 'Farmers markets, family outings, and community parks', scores: { winterGarden: 3, lakeNona: 1, clermont: 2, winterPark: 1 } },
      { text: 'Brunch, fitness classes, and modern mixed-use spots', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Lake days, cycling trails, and outdoor adventures', scores: { winterGarden: 1, lakeNona: 1, clermont: 3, winterPark: 0 } },
      { text: 'Museums, boutique shopping, and local dining', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 4,
    prompt: 'What best matches your home-style preference?',
    options: [
      { text: 'New construction in master-planned neighborhoods', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 0 } },
      { text: 'Ultra-modern architecture and energy-efficient builds', scores: { winterGarden: 1, lakeNona: 3, clermont: 1, winterPark: 0 } },
      { text: 'Larger lots and flexible floor plans', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 1 } },
      { text: 'Classic homes with unique character and curb appeal', scores: { winterGarden: 0, lakeNona: 1, clermont: 1, winterPark: 3 } }
    ]
  },
  {
    id: 5,
    prompt: 'How would you describe your pace of life?',
    options: [
      { text: 'Balanced and family-oriented', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 1 } },
      { text: 'Fast-paced and connected', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Relaxed and low-key', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 1 } },
      { text: 'Refined with cultural depth', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 6,
    prompt: 'What matters most in your surrounding amenities?',
    options: [
      { text: 'Top schools, playgrounds, and daily convenience', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 1 } },
      { text: 'Cutting-edge wellness, dining, and innovation', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Boat ramps, trails, and open green spaces', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 0 } },
      { text: 'Fine dining, boutiques, and arts nearby', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 7,
    prompt: 'What is your ideal drive to Orlando attractions/business districts?',
    options: [
      { text: 'Close enough for convenience, far enough for neighborhood feel', scores: { winterGarden: 3, lakeNona: 1, clermont: 2, winterPark: 1 } },
      { text: 'As direct and central as possible', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'I do not mind a longer drive for more space', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 0 } },
      { text: 'Prefer central neighborhoods with established roads', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 8,
    prompt: 'Which school/community setup do you prefer?',
    options: [
      { text: 'Growing communities with newer school zones', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 0 } },
      { text: 'Future-focused community with modern resources', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 1 } },
      { text: 'Smaller-town feel with strong local identity', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 1 } },
      { text: 'Established districts with longstanding reputations', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 9,
    prompt: 'Budget priorities for your move?',
    options: [
      { text: 'I want value plus amenities in a newer area', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 0 } },
      { text: 'I can pay a premium for modern convenience', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'I want maximum space for my budget', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 0 } },
      { text: 'I value central charm even at a higher price point', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  },
  {
    id: 10,
    prompt: 'When friends visit, what do you want to show off?',
    options: [
      { text: 'Community events, parks, and polished neighborhoods', scores: { winterGarden: 3, lakeNona: 2, clermont: 1, winterPark: 1 } },
      { text: 'A modern hub with big energy', scores: { winterGarden: 1, lakeNona: 3, clermont: 0, winterPark: 2 } },
      { text: 'Lakes, hills, and outdoor lifestyle', scores: { winterGarden: 1, lakeNona: 0, clermont: 3, winterPark: 0 } },
      { text: 'Historic streets and upscale local gems', scores: { winterGarden: 0, lakeNona: 1, clermont: 0, winterPark: 3 } }
    ]
  }
];
