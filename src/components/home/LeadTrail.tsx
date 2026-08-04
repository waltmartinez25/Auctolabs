import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * The thread that turns three cards into one story.
 *
 * Without it the hero reads as three unrelated widgets — a website, a chat
 * app, a calendar. Following one lead across them makes the offer legible to
 * someone who has never heard of us: they land, we answer, they're booked.
 *
 * Driven by the hero's shared step clock (see useLeadJourney in HeroSection)
 * so the avatar and the automation card's rows can never drift apart.
 */

// Each caption is a beat in one sentence: arrival, response, outcome. The
// lead-in is muted and the payoff carries the weight, so the eye lands on the
// part that sells — "Not by you", "12:00 Thursday".
const CAPTIONS = [
  { lead: 'Ray finds you at', punch: '11:47pm on a Tuesday.' },
  { lead: 'Answered in 4 seconds.', punch: 'Not by you.' },
  { lead: 'Booked.', punch: '12:00 Thursday.' },
] as const;

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Fallback centres, used only for the first paint before measurement lands.
// Real values are read from the DOM because the row width — and therefore the
// card centres — shifts between breakpoints (960px at lg, 1024px above it),
// and the ±3° tilts make each card's bounding box wider than its layout width.
const FALLBACK = [15.8, 50, 84.2];

interface LeadTrailProps {
  /** -1 while idle, then 0..2 as the journey advances. */
  activeStep: number;
  /** Card the pointer is over, or -1. Takes over from the clock while set. */
  hoveredCard?: number;
}

export const LeadTrail = ({ activeStep, hoveredCard = -1 }: LeadTrailProps) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [centres, setCentres] = useState<number[]>(FALLBACK);

  // Measure where the avatar should rest. Card *centres* would put it on top
  // of card content, so instead it stops just inside each card's leading edge
  // for the outer cards and in the gaps between them — visible, never
  // covering text. Re-measures on resize, since the row is fluid.
  useLayoutEffect(() => {
    const measure = () => {
      const el = ref.current;
      const row = el?.parentElement;
      if (!el || !row) return;

      const rowRect = row.getBoundingClientRect();
      if (rowRect.width === 0) return;

      const cards = [...row.children]
        .filter((c) => c !== el && c.getBoundingClientRect().width > 0)
        .map((c) => c.getBoundingClientRect());

      if (cards.length !== CAPTIONS.length) return;

      const pct = (x: number) => ((x - rowRect.left) / rowRect.width) * 100;

      // Each stop is the card it describes, so the avatar reads as "this
      // one". Vertically the whole rail sits below the cards, so resting on
      // a card's x-position never covers its content.
      setCentres(cards.map((r) => pct(r.left + r.width / 2)));
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Hover wins over the clock: pointing at a card jumps the lead to that beat
  // of the story, so the trail answers "what is this card?" on demand.
  // Otherwise fall back to the clock, waiting at the first stop before start.
  const clockIndex = Math.max(0, Math.min(activeStep, CAPTIONS.length - 1));
  const stopIndex = hoveredCard >= 0 ? hoveredCard : clockIndex;
  const isHovering = hoveredCard >= 0;
  const caption = CAPTIONS[stopIndex];
  const left = `${centres[stopIndex]}%`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid="lead-trail"
      className="pointer-events-none absolute inset-x-0 top-[calc(100%+2rem)] z-30 hidden lg:block"
    >
      {/* The rail the lead travels along. Straight, because it crosses the
          gaps between the ±3° cards rather than running alongside them.
          Spans first stop to last so it never overhangs the outer cards. */}
      <div
        className="absolute top-1/2 h-px -translate-y-1/2 border-t border-dashed border-primary/25"
        style={{
          left: `${centres[0]}%`,
          right: `${100 - centres[centres.length - 1]}%`,
        }}
      />

      {/* Progress fill — a solid line trailing the lead, so the rail reads as
          a route being travelled rather than three disconnected dots. */}
      <motion.div
        className="absolute top-1/2 h-px -translate-y-1/2 bg-primary/60"
        initial={false}
        animate={{ left: `${centres[0]}%`, width: `${Math.max(0, centres[stopIndex] - centres[0])}%` }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }}
      />

      {/* The lead. Follows the clock, or the pointer while hovering. */}
      <motion.div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={false}
        animate={{ left }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.75, ease: EASE }
        }
      >
        <motion.span
          className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-primary text-[11px] font-bold text-primary-foreground shadow-soft-lg"
          animate={reduceMotion ? {} : { scale: isHovering ? 1.15 : 1 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          {/* Halo — pulses out on arrival, holds steady while hovered. */}
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-primary/40"
              key={`halo-${stopIndex}`}
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 2.1, opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
          )}
          R
        </motion.span>
      </motion.div>

      {/* Captions sit below the card row — the gap between cards is too
          narrow for text. Under reduced motion all three show at once, so the
          story is fully readable without any movement. */}
      {reduceMotion ? (
        <div className="absolute inset-x-0 top-[1.25rem] flex flex-col items-center gap-1">
          {CAPTIONS.map((c) => (
            <p key={c.punch} className="px-3 py-0.5 text-[13px]">
              <span className="text-muted-foreground">{c.lead} </span>
              <span className="font-semibold text-foreground">{c.punch}</span>
            </p>
          ))}
        </div>
      ) : (
        <div className="absolute inset-x-0 top-[1.25rem] flex justify-center">
          <motion.p
            key={stopIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="px-3 py-0.5 text-[13px] tracking-tight"
          >
            <span className="text-muted-foreground">{caption.lead} </span>
            {/* The payoff, wiped in just behind the lead-in — the half-beat
                delay is what makes it land as a punchline. */}
            <motion.span
              className="inline-block font-semibold text-foreground"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.18, ease: EASE }}
            >
              {caption.punch}
            </motion.span>
          </motion.p>
        </div>
      )}
    </div>
  );
};
