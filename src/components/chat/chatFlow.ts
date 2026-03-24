export interface FlowStep {
  id: number;
  botMessage: string;
  options: { label: string; value: string }[];
}

export const chatSteps: FlowStep[] = [
  {
    id: 0,
    botMessage: "Hi! I'll help find the right solution for your business. What best describes you?",
    options: [
      { label: 'Law Firm', value: 'law-firm' },
      { label: 'Real Estate', value: 'real-estate' },
      { label: 'Health & Wellness', value: 'health-wellness' },
      { label: 'B2B / IT Services', value: 'b2b' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 1,
    botMessage: "Got it. What's your biggest challenge right now?",
    options: [
      { label: 'Not enough leads', value: 'not-enough-leads' },
      { label: 'Slow lead follow-up', value: 'slow-followup' },
      { label: 'Too many manual tasks', value: 'manual-tasks' },
      { label: 'Poor website conversions', value: 'poor-conversions' },
    ],
  },
  {
    id: 2,
    botMessage: 'Understood. How many leads do you receive per month?',
    options: [
      { label: 'Under 20', value: 'under-20' },
      { label: '20–100', value: '20-100' },
      { label: '100+', value: '100-plus' },
    ],
  },
  {
    id: 3,
    botMessage: "Almost there — what's your budget range for this project?",
    options: [
      { label: 'Under $3,500', value: 'under-3500' },
      { label: '$3,500–$8,000', value: '3500-8000' },
      { label: '$8,000+', value: '8000-plus' },
    ],
  },
];

export interface TierResult {
  name: string;
  price: string;
  description: string;
}

export function getTierRecommendation(volume: string, budget: string): TierResult {
  if (budget === '8000-plus' || volume === '100-plus') {
    return {
      name: 'Scale System',
      price: '$15,000',
      description: 'Unlimited pages, advanced automation workflows, dedicated account manager, and quarterly strategy reviews.',
    };
  }
  if (budget === 'under-3500' || volume === 'under-20') {
    return {
      name: 'Starter System',
      price: '$3,500',
      description: '5-page website, lead capture form, contact automation, and on-page SEO setup.',
    };
  }
  return {
    name: 'Growth System',
    price: '$7,500',
    description: 'Website + AI automation, CRM integration, speed-to-lead <60s, and email & SMS sequences.',
  };
}
