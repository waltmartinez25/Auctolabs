import { Link } from 'react-router-dom';
import { CheckLg, ArrowRight } from 'react-bootstrap-icons';
import { analytics } from '@/lib/analytics';

/**
 * The two ways to work with AuctoLabs.
 *
 * Deliberately price-free: the goal is a conversation, not a comparison of
 * figures. Every claim below already appears elsewhere on the site (the 4–6
 * week timeline on /process, speed-to-lead <60s, CRM integration, the
 * month-to-month retainer) — nothing new is asserted here.
 */
const lanes = [
  {
    id: 'launch',
    name: 'Launch',
    tagline: 'Your site and system, live.',
    meta: 'Fixed scope · 4–6 weeks',
    features: [
      'Audit, build, automate, optimize',
      'Site and automation from one team',
      'Speed-to-lead under 2 minutes',
      'CRM and calendar integration',
      'Full handover. The system is yours',
    ],
    featured: false,
  },
  {
    id: 'partner',
    name: 'Partner',
    tagline: 'We keep it improving.',
    meta: 'Month-to-month',
    features: [
      'Ongoing optimization and testing',
      'New pages and campaign assets',
      'Automation tuning as you grow',
      'Direct access, no account managers',
      'Month-to-month, no long contracts',
    ],
    featured: true,
  },
] as const;

interface LaneCardsProps {
  /** Passed to analytics so we can tell home from /pricing. */
  source: string;
}

export const LaneCards = ({ source }: LaneCardsProps) => (
  <div
    data-testid="lane-cards"
    className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-7"
  >
    {lanes.map((lane) => {
      const featured = lane.featured;

      return (
        <div
          key={lane.id}
          data-testid={`lane-${lane.id}`}
          className={
            featured
              ? // `.ink-section` re-points --foreground/--card/--border for its
                // descendants, so the checks and body copy invert correctly.
                'ink-section relative flex flex-col rounded-2xl border-2 border-primary p-7 shadow-soft-lg md:p-9'
              : 'relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft-sm md:p-9'
          }
        >
          <h3
            className={`font-serif text-2xl font-bold ${
              featured ? 'text-[hsl(var(--ink-foreground))]' : 'text-foreground'
            }`}
          >
            {lane.name}
          </h3>
          <p className="mt-1.5 text-[15px] text-muted-foreground">{lane.tagline}</p>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary-accessible">
            {lane.meta}
          </p>

          <ul className="mt-7 flex-1 space-y-3.5">
            {lane.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <CheckLg className="h-3 w-3" />
                </span>
                <span
                  className={`text-[15px] leading-snug ${
                    featured ? 'text-[hsl(var(--ink-foreground))]' : 'text-foreground'
                  }`}
                >
                  {f}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/contact"
            onClick={() => analytics.contactFormClick(`${source}_${lane.id}`)}
            aria-label={`Start a ${lane.name} project. Opens the contact form`}
            className={`mt-8 inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 ${
              featured
                ? 'bg-primary text-primary-foreground primary-glow'
                : 'border border-border bg-card text-foreground hover:border-primary/50 hover:text-primary'
            }`}
          >
            Get Started
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      );
    })}
  </div>
);
