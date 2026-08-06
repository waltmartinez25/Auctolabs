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
    // Asks about scope/timing rather than budget — we quote per engagement,
    // so anchoring on a number here would work against that.
    id: 3,
    botMessage: 'Almost there. What are you looking for right now?',
    options: [
      { label: 'A new site, launched fast', value: 'new-build' },
      { label: 'Automation on my current site', value: 'automation-only' },
      { label: 'Ongoing help as we grow', value: 'ongoing' },
      { label: 'Still figuring it out', value: 'exploring' },
    ],
  },
];

export interface TierResult {
  name: string;
  description: string;
}

/**
 * Recommends a lane, not a price. Scope is quoted per engagement after a
 * strategy call, so the widget points at the right conversation instead of
 * naming a figure.
 */
export function getTierRecommendation(volume: string, goal: string): TierResult {
  if (goal === 'ongoing' || volume === '100-plus') {
    return {
      name: 'Partner',
      description:
        'Month-to-month: ongoing optimization, new pages and campaign assets, and automation tuning as you grow.',
    };
  }
  return {
    name: 'Launch',
    description:
      'A fixed-scope build: site and automation from one team, live in 4–6 weeks, then handed over to you.',
  };
}
