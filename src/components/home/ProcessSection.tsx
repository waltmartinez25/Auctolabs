import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search,
  WrenchAdjustable,
  Robot,
  GraphUpArrow,
  ArrowRight,
  CheckLg,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { analytics } from '@/lib/analytics';
import { CTA_FORM } from '@/lib/constants';

// Phases mirror `src/pages/Process.tsx` — same durations, same outcomes.
// If a phase changes there, change it here too. Each card shows 3 of that
// page's 5 activities; the full list is what the CTA leads to.
const phases = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    week: 'Week 1',
    summary: "Find where you're losing leads.",
    activities: [
      'Website structure and conversion paths',
      'Lead response speed and follow-up gaps',
      'Existing tools, CRM, and integrations',
    ],
    outcome: 'A clear plan to increase conversions and capture more opportunities',
  },
  {
    number: '02',
    icon: WrenchAdjustable,
    title: 'Build',
    week: 'Weeks 2–3',
    summary: 'Turn the site into a conversion engine.',
    activities: [
      'Conversion-focused website design',
      'Mobile-first, responsive experience',
      'Fast, SEO-ready architecture',
    ],
    outcome: 'A website designed to turn traffic into qualified leads',
  },
  {
    number: '03',
    icon: Robot,
    title: 'Automate',
    week: 'Weeks 3–4',
    summary: 'Respond, qualify, and book — automatically.',
    activities: [
      'AI-powered lead response systems',
      'CRM integration and data flow setup',
      'Automated appointment booking',
    ],
    outcome: 'No missed leads, faster response, and more booked calls',
  },
  {
    number: '04',
    icon: GraphUpArrow,
    title: 'Optimize',
    week: 'Weeks 4–6+',
    summary: 'Improve performance over time.',
    activities: [
      'Conversion rates across key pages',
      'Funnel performance and drop-off points',
      'A/B testing and ongoing improvements',
    ],
    outcome: 'A system that gets better and more profitable over time',
  },
];

// ─── Phase card ───────────────────────────────────────────────────────────────

// Closed cards ascend left to right so the strip reads as a rising staircase;
// the open card always stands at full height. Index-matched to `phases`.
const CLOSED_HEIGHTS = [250, 285, 320, 355];
const OPEN_HEIGHT = 380;

/** True from Tailwind's `lg` up, where the horizontal accordion applies. */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

interface PhaseCardProps {
  phase: (typeof phases)[number];
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  reduceMotion: boolean;
  isLast: boolean;
  isDesktop: boolean;
}

const PhaseCard = ({ phase, index, isOpen, onOpen, reduceMotion, isLast, isDesktop }: PhaseCardProps) => {
  const Icon = phase.icon;
  const spring = reduceMotion
    ? { duration: 0 }
    : ({ type: 'spring', stiffness: 220, damping: 28 } as const);

  return (
    <motion.li
      // The parent bottom-aligns these at lg, so the differing heights create
      // the ascending diagonal. Below lg every card is full-width and auto
      // height, so the staircase is skipped entirely.
      className="relative flex min-w-0"
      animate={
        isDesktop
          ? { flex: isOpen ? 4.8 : 1.5, height: isOpen ? OPEN_HEIGHT : CLOSED_HEIGHTS[index] }
          : { flex: 1, height: 'auto' }
      }
      initial={false}
      transition={spring}
    >
      <button
        type="button"
        onClick={onOpen}
        onMouseEnter={onOpen}
        onFocus={onOpen}
        aria-expanded={isOpen}
        className={`group relative flex h-full w-full min-w-0 flex-col overflow-hidden p-6 text-left transition-colors duration-300 md:p-7 lg:rounded-t-2xl lg:border ${
          isLast ? '' : 'border-b border-border lg:border-b'
        } lg:border-border ${
          isOpen ? 'bg-accent/60' : 'bg-card hover:bg-secondary'
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary`}
      >
        {/* Watermark numeral — sits below the title row so a narrow closed
            card never has the numeral colliding with the phase name. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 right-3 select-none font-serif text-6xl font-bold leading-none text-primary/[0.13] lg:text-7xl"
        >
          {phase.number}
        </span>

        {/* Icon + phase name. Stacks on a closed card so the name is never
            truncated at flex: 1.5. */}
        <div
          className={`relative z-10 flex min-w-0 gap-3 ${
            isOpen ? 'flex-row items-center' : 'flex-col items-start lg:gap-2.5'
          }`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
              isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
            }`}
          >
            <Icon aria-hidden="true" className="h-4 w-4" />
          </span>
          <h3 className="font-serif text-lg font-bold text-foreground">{phase.title}</h3>
        </div>

        {/* Duration — what a closed card leads with */}
        <p className="relative z-10 mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          {phase.week}
        </p>
        <p className="relative z-10 mt-1.5 text-sm leading-snug text-muted-foreground lg:min-h-[2.5rem]">
          {phase.summary}
        </p>

        {/* Detail. Always in the DOM — collapsed cards hide it visually so
            screen readers and crawlers still get the whole process. */}
        <div
          className={`relative z-10 transition-opacity duration-300 lg:absolute lg:inset-x-6 lg:bottom-6 ${
            isOpen
              ? 'mt-5 opacity-100'
              : 'mt-5 opacity-100 lg:pointer-events-none lg:mt-0 lg:opacity-0'
          }`}
        >
          <ul className="space-y-2">
            {phase.activities.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <CheckLg aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                <span className="text-[13px] leading-snug text-foreground">{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-border/70 pt-3 text-[13px] font-semibold leading-snug text-foreground">
            {phase.outcome}
          </p>
        </div>
      </button>
    </motion.li>
  );
};

// ─── Process Section ──────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="section-padding border-t border-border/60 bg-background">
      <div className="container-custom">

        {/* Heading */}
        <AnimatedSection variant="fadeUp">
          <div className="section-head section-head-left">
            <span className="eyebrow">Our Approach</span>
            <h2>
              From audit to live system{' '}
              <em>in four to six weeks.</em>
            </h2>
            <p>
              Four phases, each with a defined scope and a date attached. You always know
              what is happening and what comes next.
            </p>
          </div>
        </AnimatedSection>

        {/* Timeline rail + phase strip */}
        <AnimatedSection variant="fadeUp" delay={100}>
          <div data-testid="process-timeline">
            {/* items-end bottom-aligns the cards so their stepped heights
                read as an ascending diagonal. */}
            {/* At lg the container drops its own frame — each card carries its
                own border so the staircase silhouette stays visible. */}
            <ul className="flex flex-col overflow-hidden rounded-2xl border border-border lg:flex-row lg:items-end lg:overflow-visible lg:rounded-none lg:border-0">
              {phases.map((phase, i) => (
                <PhaseCard
                  key={phase.number}
                  phase={phase}
                  index={i}
                  isOpen={openIdx === i}
                  onOpen={() => setOpenIdx(i)}
                  reduceMotion={!!reduceMotion}
                  isLast={i === phases.length - 1}
                  isDesktop={isDesktop}
                />
              ))}
            </ul>

            {/* Baseline the staircase stands on, with a marker per phase. */}
            <div aria-hidden="true" className="relative hidden h-px w-full bg-border lg:block">
              {phases.map((p, i) => (
                <span
                  key={p.number}
                  className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    i <= openIdx ? 'bg-primary' : 'bg-border'
                  }`}
                  style={{ left: `calc(${((i + 0.5) / phases.length) * 100}% - 4px)` }}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA row — one link goes deeper into the site, one converts. */}
        <AnimatedSection delay={300} variant="fadeIn">
          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-sm sm:flex-row sm:gap-5">
            <Link to="/process" className="link-arrow font-medium text-primary">
              Explore our process
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <span aria-hidden="true" className="hidden text-muted-foreground sm:block">
              ·
            </span>

            <Link
              to="/contact"
              onClick={() => analytics.contactFormClick('process')}
              className="link-arrow font-semibold text-primary"
            >
              {CTA_FORM.primary}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
