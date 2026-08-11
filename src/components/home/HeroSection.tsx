import { Link } from 'react-router-dom';
import { ArrowRight, LightningCharge } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LeadTrail } from '@/components/home/LeadTrail';
import { MobileJourney } from '@/components/home/MobileJourney';

const EASE = [0.2, 0.8, 0.2, 1] as const;

/**
 * One clock for the whole hero.
 *
 * The travelling lead and the automation card's row highlighting both read
 * from this single step index, so they cannot drift out of sync. -1 is idle;
 * the sequence then cycles 0 → 1 → 2 and repeats.
 *
 * Under reduced motion it parks on the final step: the finished state is the
 * readable one, showing every caption and every completed row at once.
 */
function useLeadJourney(steps: number) {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(reduceMotion ? steps - 1 : -1);

  useEffect(() => {
    if (reduceMotion) {
      setActiveStep(steps - 1);
      return;
    }
    // Wait for the card entrance animations to settle (~1600ms) before the
    // lead appears, so the two sequences don't compete for attention.
    const start = setTimeout(() => setActiveStep(0), 1200);
    return () => clearTimeout(start);
  }, [reduceMotion, steps]);

  useEffect(() => {
    if (reduceMotion || activeStep < 0) return;
    // Hold on the completed journey before looping back to the start.
    const isComplete = activeStep >= steps - 1;
    const t = setTimeout(
      () => setActiveStep((s) => (s >= steps - 1 ? 0 : s + 1)),
      isComplete ? 2800 : 1400,
    );
    return () => clearTimeout(t);
  }, [activeStep, reduceMotion, steps]);

  return activeStep;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        delay: reduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
};

// ── Card 1: Website Card ──────────────────────────────────────────────────────
const WebsiteCard = () => (
  <div className="w-full bg-card border border-border/80 rounded-2xl shadow-soft-lg p-5 flex flex-col justify-between select-none transform -rotate-3 hover:rotate-0 transition-transform duration-500">
    <div className="space-y-4">
      {/* Top Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-[10px] font-bold">
            🌿
          </div>
          <span className="text-xs font-bold text-foreground tracking-tight">Penn Turf</span>
        </div>
        <div className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
          Live Site
        </div>
      </div>

      {/* Website mockup hero block */}
      <div className="space-y-2">
        <span className="text-[9px] uppercase tracking-wider font-extrabold text-primary">
          Our Services
        </span>
        <h4 className="text-sm font-serif font-bold text-foreground leading-tight">
          Scrap tire service built around your volume
        </h4>
        <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
          Fill a rack a month or a trailer a week, we've got a schedule that fits. Every tire we pick up gets processed at our own facility.
        </p>
      </div>

      {/* Metrics breakdown table */}
      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-[11px] py-1 border-b border-border/30">
          <span className="text-muted-foreground font-medium">Pages</span>
          <span className="font-bold text-foreground">12</span>
        </div>
        <div className="flex justify-between text-[11px] py-1 border-b border-border/30">
          <span className="text-muted-foreground font-medium">Load time</span>
          <span className="font-bold text-emerald-600">0.9s</span>
        </div>
        <div className="flex justify-between text-[11px] py-1">
          <span className="text-muted-foreground font-medium">Mobile</span>
          <span className="font-bold text-primary">Optimized</span>
        </div>
      </div>
    </div>

    {/* Brand color swatches footer */}
    <div className="pt-4 flex items-center justify-between">
      <span className="text-[10px] font-semibold text-muted-foreground">Brand</span>
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded bg-primary shadow-sm" />
        <div className="w-3.5 h-3.5 rounded bg-slate-200 shadow-sm" />
        <div className="w-3.5 h-3.5 rounded bg-slate-900 shadow-sm" />
        <span className="text-[9px] font-mono text-muted-foreground ml-1">#1A56FF</span>
      </div>
    </div>
  </div>
);

// ── Card 2: Automation Card (Focal Center) ───────────────────────────────────
//
// Rows light up as the travelling lead reaches each stage. `activeStep` comes
// from the hero's shared clock; the row styling below is the only thing that
// changes — copy, icons and layout are untouched.
const AutomationCard = ({ activeStep }: { activeStep: number }) => (
  <div className="w-full bg-card border border-border/90 rounded-2xl shadow-soft-xl p-5 flex flex-col justify-between select-none">
    <div className="space-y-4">
      {/* Active automation status pill */}
      <div className="flex items-center justify-between bg-primary/10 border border-primary/20 rounded-xl px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold text-primary">Automation active · 24/7</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Live</span>
      </div>

      {/* Main card headline */}
      <div>
        <h3 className="text-lg font-serif font-bold text-foreground leading-snug">
          Respond, qualify, and book. Automatically.
        </h3>
      </div>

      {/* Notification timeline events */}
      <div className="space-y-2.5 pt-1">
        <div
          className={`flex items-start gap-3 bg-muted/50 p-2.5 rounded-xl border transition-all duration-500 ${
            activeStep >= 0
              ? 'border-primary/40 ring-1 ring-primary/20 opacity-100'
              : 'border-border/40 opacity-60'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 mt-0.5">
            💬
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">New inquiry received</div>
            <div className="text-[10px] text-muted-foreground">auctolabs.com/contact</div>
          </div>
        </div>

        <div
          className={`flex items-start gap-3 bg-primary/5 p-2.5 rounded-xl border transition-all duration-500 ${
            activeStep >= 1
              ? 'border-primary/40 ring-1 ring-primary/20 opacity-100'
              : 'border-primary/20 opacity-60'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold text-primary">Auto-replied in under 2 minutes</div>
            <div className="text-[10px] text-muted-foreground">AI response sent</div>
          </div>
        </div>

        <div
          className={`flex items-start gap-3 bg-muted/50 p-2.5 rounded-xl border transition-all duration-500 ${
            activeStep >= 2
              ? 'border-emerald-500/40 ring-1 ring-emerald-500/20 opacity-100'
              : 'border-border/40 opacity-60'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">
            📅
          </div>
          <div>
            <div className="text-xs font-bold text-foreground">Call booked</div>
            <div className="text-[10px] text-muted-foreground">Added to calendar</div>
          </div>
        </div>
      </div>
    </div>

    {/* Metadata footer */}
    <div className="pt-4 border-t border-border/40 grid grid-cols-2 gap-2 text-[10px]">
      <div>
        <span className="text-muted-foreground uppercase font-bold tracking-wider block">Channel</span>
        <span className="font-bold text-foreground">Email + SMS</span>
      </div>
      <div>
        <span className="text-muted-foreground uppercase font-bold tracking-wider block">Routing</span>
        <span className="font-bold text-foreground">Auto-assigned</span>
      </div>
    </div>
  </div>
);

// ── Card 3: Calendar Card ─────────────────────────────────────────────────────
const CalendarCard = () => (
  <div className="w-full bg-card border border-border/80 rounded-2xl shadow-soft-lg p-5 flex flex-col justify-between select-none transform rotate-3 hover:rotate-0 transition-transform duration-500">
    <div className="space-y-4">
      {/* Calendar header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-border/40">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-foreground">This week</span>
          <span className="text-[10px] text-muted-foreground">▼</span>
        </div>
        <div className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
          3 booked
        </div>
      </div>

      {/* Weekday schedule visualization */}
      <div className="grid grid-cols-5 gap-1.5 text-center">
        {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
          <div key={idx} className="space-y-1">
            <span className="text-[10px] font-bold text-muted-foreground">{day}</span>
            <div
              className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${
                idx === 0 || idx === 2 || idx === 4
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground'
              }`}
            >
              {idx === 0 || idx === 2 || idx === 4 ? '●' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Booked meetings list */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-bold text-foreground">9:00</span>
          <span className="text-muted-foreground truncate">Discovery call</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-bold text-foreground">12:00</span>
          <span className="text-muted-foreground truncate">Strategy session</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="font-bold text-foreground">4:15</span>
          <span className="text-muted-foreground truncate">Follow-up call</span>
        </div>
      </div>
    </div>

    {/* Synced integrations footer */}
    <div className="pt-4 flex items-center justify-between text-[10px]">
      <span className="font-semibold text-muted-foreground uppercase tracking-wider">Synced to</span>
      <div className="flex items-center gap-2 font-bold text-foreground">
        <span className="bg-muted px-1.5 py-0.5 rounded border border-border/40">✓ Calendar</span>
        <span className="bg-muted px-1.5 py-0.5 rounded border border-border/40">✓ CRM</span>
        <span className="bg-muted px-1.5 py-0.5 rounded border border-border/40">✓ Slack</span>
      </div>
    </div>
  </div>
);

// ── Hero Section ─────────────────────────────────────────────────────────────
export const HeroSection = () => {
  const activeStep = useLeadJourney(3);
  const [hoveredCard, setHoveredCard] = useState(-1);
  const [hasEntered, setHasEntered] = useState(false);
  const reduceMotion = useReducedMotion();

  // Once the entrance stagger has played out, hover takes over the timing.
  useEffect(() => {
    const t = setTimeout(() => setHasEntered(true), 1700);
    return () => clearTimeout(t);
  }, []);

  // Hovering a card scrubs the trail to that card's beat; the automation
  // card's rows follow the same index so everything stays in agreement.
  const shownStep = hoveredCard >= 0 ? hoveredCard : activeStep;

  // Hover treatment: lift and straighten the tilt. Driven from `animate`
  // rather than `whileHover` so the resting rotation is always an explicit
  // target — `whileHover` alone leaves the outer cards stuck at 0° on exit.
  // The entrance runs once with its stagger delay; after that, hover changes
  // need to feel immediate, so the delay is dropped.
  const cardTransition = (delay: number) =>
    hoveredCard >= 0 || hasEntered
      ? { duration: 0.35, ease: EASE }
      : { duration: 0.7, delay, ease: EASE };

  const cardState = (index: number, restRotate: number) => {
    if (reduceMotion) return { opacity: 1, y: 0, rotate: restRotate };
    const on = hoveredCard === index;
    return {
      opacity: 1,
      y: on ? -8 : 0,
      rotate: on ? 0 : restRotate,
      scale: on ? 1.02 : 1,
    };
  };

  return (
    <section aria-label="Hero" className="relative w-full bg-background overflow-hidden">
      {/* Background glow effects */}
      <div aria-hidden="true" className="absolute inset-0 bg-warm-radial pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

      {/* Bottom padding matches .section-padding (py-16 md:py-24 lg:py-28).
          The lg step goes further because the lead trail's captions are
          desktop-only and hang below the card row — without the extra space
          the caption sits ~60px off the section edge, tighter than the 87px
          mobile gets with no caption at all. */}
      <div className="relative z-10 container-custom pt-10 md:pt-14 pb-16 md:pb-24 lg:pb-40">

        {/* ── Centered Copy Stack ── */}
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn delay={0.1} className="mb-3">
            <span className="eyebrow">
              AuctoLabs Automation
            </span>
          </FadeIn>

          <FadeIn delay={0.25} duration={0.85}>
            <h1 className="font-serif font-medium leading-[1.02] tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl">
              Never miss a lead.
              <br />
              {/* Colour comes from the `h1 em` rule; italics are this
                  headline's own emphasis and are re-enabled deliberately. */}
              <em className="italic">Ever again.</em>
            </h1>
          </FadeIn>

          <FadeIn delay={0.45}>
            <p className="mt-4 mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed font-medium">
              We build the website and the automation behind it, so every lead is answered,
              qualified, and booked the moment they arrive, while you run your business.
            </p>
          </FadeIn>

          <FadeIn delay={0.6} className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="glass-panel border-border/30 p-1.5 rounded-2xl inline-flex shadow-xl">
              <Link
                to="/contact"
                aria-label="Start building with AuctoLabs. Opens the contact form"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-[15px] min-h-[48px] transition-all duration-300 overflow-hidden border border-primary/20 hover:scale-[1.02] active:scale-[0.98] primary-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                />
                <span className="relative z-10 tracking-wide">Start Building</span>
                <ArrowRight aria-hidden="true" className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <Link
              to="/contact?audit=true"
              aria-label="Request a free website audit from AuctoLabs"
              className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <LightningCharge aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
              <span>Or get a free audit first</span>
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        {/* ── 3 Hero Cards Stage ── */}
        <div className="relative mt-10 md:mt-14 max-w-5xl mx-auto">
          {/* Below lg the outer cards and the LeadTrail are hidden, leaving the
              automation card with no before or after. This states the same
              three beats compactly, off the same clock. */}
          <div className="mb-6 lg:mb-0">
            <MobileJourney activeStep={shownStep} />
          </div>

          <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">

            {/* Card 1 — Website (left) */}
            <motion.div
              className="hidden lg:flex w-[300px] shrink-0 cursor-default"
              initial={{ opacity: 0, y: 40, rotate: -3 }}
              animate={cardState(0, -3)}
              transition={cardTransition(0.8)}
              onHoverStart={() => setHoveredCard(0)}
              onHoverEnd={() => setHoveredCard(-1)}
            >
              <WebsiteCard />
            </motion.div>

            {/* Card 2 — Automation (centre focal) */}
            <motion.div
              className="w-full max-w-md lg:w-[320px] lg:max-w-[320px] shrink-0"
              initial={{ opacity: 0, y: 40 }}
              animate={cardState(1, 0)}
              transition={cardTransition(0.65)}
              onHoverStart={() => setHoveredCard(1)}
              onHoverEnd={() => setHoveredCard(-1)}
            >
              <AutomationCard activeStep={shownStep} />
            </motion.div>

            {/* Card 3 — Calendar (right) */}
            <motion.div
              className="hidden lg:flex w-[300px] shrink-0 cursor-default"
              initial={{ opacity: 0, y: 40, rotate: 3 }}
              animate={cardState(2, 3)}
              transition={cardTransition(0.9)}
              onHoverStart={() => setHoveredCard(2)}
              onHoverEnd={() => setHoveredCard(-1)}
            >
              <CalendarCard />
            </motion.div>

            {/* The lead travelling between the cards — ties the three
                panels into one story. Desktop only; below lg the outer
                cards don't render. */}
            <LeadTrail activeStep={activeStep} hoveredCard={hoveredCard} />

          </div>
        </div>

      </div>
    </section>
  );
};
