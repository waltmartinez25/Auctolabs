import { motion, useReducedMotion } from 'framer-motion';

/**
 * The hero's story, at phone width.
 *
 * On desktop three tilted cards plus the LeadTrail show one lead moving from
 * site → automation → booking. Below `lg` the outer cards are hidden and the
 * trail does not render, so mobile showed the automation card alone — the
 * middle of a story with no beginning or end.
 *
 * Deliberately NOT an icon-and-connector step row. That shape is already used
 * by WorkflowRelay in "AI Workflows", and the automation card sitting directly
 * below this one already lists the same three events as rows. A third copy of
 * the same pattern, ten pixels away, reads as repetition rather than emphasis.
 *
 * Instead this mirrors the desktop LeadTrail it stands in for: one avatar
 * travelling a single rail, with a caption that changes as it arrives. Same
 * `activeStep` clock as everything else in the hero — no second timer.
 */

// Two-part captions: muted lead-in, bolded payoff. Trimmed from the desktop
// trail's wording — at 390px the full sentences wrap to three lines.
const CAPTIONS = [
  { lead: 'Lands at', punch: '11:47pm.' },
  { lead: 'Answered in 4s.', punch: 'Not by you.' },
  { lead: 'Booked.', punch: '12:00 Thursday.' },
] as const;

const EASE = [0.2, 0.8, 0.2, 1] as const;

// Where the avatar rests for each beat, as a percentage of the rail.
const STOPS = [6, 50, 94];

interface MobileJourneyProps {
  /** -1 while idle, then 0..2. Shared with AutomationCard and LeadTrail. */
  activeStep: number;
}

export const MobileJourney = ({ activeStep }: MobileJourneyProps) => {
  const reduceMotion = useReducedMotion();
  const step = Math.max(0, Math.min(activeStep, CAPTIONS.length - 1));
  const caption = CAPTIONS[step];
  const isBooked = step === CAPTIONS.length - 1;

  return (
    <div aria-hidden="true" className="lg:hidden mx-auto w-full max-w-[19rem]">
      {/* Rail */}
      <div className="relative h-7">
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-primary/25" />

        {/* Progress fill trailing the avatar, so the rail reads as a route
            being travelled rather than three separate points. */}
        <motion.div
          className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-primary/60"
          initial={false}
          animate={{ width: `${STOPS[step]}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        />

        {/* The lead */}
        <motion.div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={{ left: `${STOPS[step]}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.7, ease: EASE }}
        >
          <span
            className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[10px] font-bold shadow-soft-md transition-colors duration-500 ${
              isBooked
                ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                : 'bg-primary text-primary-foreground'
            }`}
          >
            {/* Halo pulses out on arrival. */}
            {!reduceMotion && (
              <motion.span
                key={`halo-${step}`}
                aria-hidden="true"
                className={`absolute inset-0 rounded-full ${
                  isBooked ? 'bg-[hsl(var(--success))]/40' : 'bg-primary/40'
                }`}
                initial={{ scale: 1, opacity: 0.7 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            )}
            R
          </span>
        </motion.div>
      </div>

      {/* Caption. Under reduced motion all three show at once, so the story is
          fully readable without any movement. */}
      {reduceMotion ? (
        <div className="mt-2 flex flex-col items-center gap-0.5">
          {CAPTIONS.map((c) => (
            <p key={c.punch} className="text-[12px]">
              <span className="text-muted-foreground">{c.lead} </span>
              <span className="font-semibold text-foreground">{c.punch}</span>
            </p>
          ))}
        </div>
      ) : (
        <div className="mt-2 flex h-5 items-start justify-center">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-[12px] tracking-tight"
          >
            <span className="text-muted-foreground">{caption.lead} </span>
            <span
              className={`font-semibold ${
                isBooked ? 'text-[hsl(var(--success))]' : 'text-foreground'
              }`}
            >
              {caption.punch}
            </span>
          </motion.p>
        </div>
      )}
    </div>
  );
};
