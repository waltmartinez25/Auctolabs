import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckLg, XLg } from 'react-bootstrap-icons';
import { useInView } from '@/hooks/useInView';

// The same lead enters both lanes at 9:14pm. What happens next is the pitch.
interface Stop {
  time: string;
  label: string;
  /** A waiting gap rendered before this stop. */
  gap?: string;
}

const SLOW_LANE: Stop[] = [
  { time: '9:14pm', label: 'Inquiry arrives' },
  { time: '', label: 'Nobody sees it', gap: 'overnight' },
  { time: 'Mon 9am', label: 'First opened', gap: 'still sitting' },
  { time: '', label: 'They already called someone else' },
];

const FAST_LANE: Stop[] = [
  { time: '9:14pm', label: 'Inquiry arrives' },
  { time: '9:14pm', label: 'Auto-replied' },
  { time: '9:15pm', label: 'Qualified and routed' },
  { time: '9:17pm', label: 'Call booked' },
];

// The slow lane crawls while the fast lane finishes — that contrast is the
// whole point, so both lanes share one clock and reset together.
const TOTAL_STEPS = 5;
const STEP_MS = 1250;
const HOLD_MS = 2600;

interface LaneProps {
  title: string;
  caption: string;
  stops: Stop[];
  /** Steps elapsed on the shared clock. */
  step: number;
  tone: 'slow' | 'fast';
  reduceMotion: boolean;
}

const Lane = ({ title, caption, stops, step, tone, reduceMotion }: LaneProps) => {
  const isFast = tone === 'fast';

  // The fast lane completes a stop per step. The slow lane opens, then waits
  // three beats before its next stop lands.
  const reached = (i: number) => {
    if (isFast) return step >= i + 1;
    if (i === 0) return step >= 1;
    if (i === 1) return step >= 2;
    if (i === 2) return step >= 4;
    return step >= TOTAL_STEPS;
  };

  return (
    <div className="w-full">
      {/* Lane header */}
      <div className="mb-5">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
            isFast ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          {title}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{caption}</p>
      </div>

      <ol className="relative">
        {stops.map((stop, i) => {
          const on = reached(i);
          const last = i === stops.length - 1;
          const failed = !isFast && last;
          // The two lanes end on opposite outcomes, so the final node carries
          // the verdict rather than continuing the lane's running colour:
          // green for the booked call, red for the lead lost to a competitor.
          // Only once reached — an outcome should not be asserted before the
          // sequence has actually arrived there.
          const succeeded = isFast && last && on;
          const lost = failed && on;
          // Both lanes start from the *same* inquiry, so the first node reads
          // identically on both sides. That shared starting point is what makes
          // the diverging outcomes below it land as a race rather than two
          // unrelated timelines.
          const isStart = i === 0 && on;
          // A slow-lane stop that has been reached but is not the start or the
          // verdict — "nobody sees it", "first opened". These are events that
          // happened without anything being achieved, so they get a hollow
          // dashed node rather than a filled one. Previously they used the same
          // treatment as an un-reached stop, which made elapsed-but-idle look
          // identical to not-yet-happened and lost the point of the lane.
          const idle = on && !isFast && !isStart && !lost;

          return (
            <li key={`${stop.label}-${i}`} className="relative flex min-h-[68px] gap-3 pb-7 last:min-h-0 last:pb-0">
              {/* Rail + node */}
              <div className="relative flex flex-col items-center">
                <motion.span
                  initial={false}
                  // Full opacity once reached, including idle stops — the grey
                  // fill is what signals "nothing achieved", so dimming it as
                  // well just made the node hard to see rather than clearly
                  // inert.
                  animate={{ scale: on ? 1 : 0.75, opacity: on ? 1 : 0.45 }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                  className={`z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                    lost
                      ? 'border-[hsl(var(--destructive-solid))] bg-[hsl(var(--destructive-solid))] text-white'
                      : succeeded
                        ? 'border-[hsl(var(--success))] bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                        : isStart || (on && isFast)
                          ? 'border-primary bg-primary text-primary-foreground'
                          : idle
                            ? // Filled, but grey — the shape matches the azure
                              // and green nodes so it reads as "this happened",
                              // while the colour says nothing was achieved.
                              // A hollow ring was too close to an un-reached
                              // node to tell the two apart at 24px.
                              'border-muted-foreground/50 bg-muted-foreground/45 text-white'
                            : 'border-border bg-card text-muted-foreground'
                  }`}
                >
                  {last
                    ? failed
                      ? <XLg className="h-2.5 w-2.5" />
                      : <CheckLg className="h-3 w-3" />
                    : idle
                      // A dash where the other nodes carry a tick: the step
                      // registered, nothing came of it.
                      ? <span aria-hidden="true" className="block h-0.5 w-2 rounded-full bg-white/90" />
                      : null}
                </motion.span>

                {/* Connector down to the next stop. -mb-7 cancels the row's
                    bottom padding so the rail meets the next node. */}
                {!last && (
                  <span className="relative -mb-7 mt-1 w-px flex-1 bg-border">
                    <motion.span
                      initial={false}
                      animate={{ scaleY: reached(i + 1) ? 1 : 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : isFast ? 0.4 : 1.1,
                        ease: 'easeOut',
                      }}
                      style={{ transformOrigin: 'top center' }}
                      // The slow lane's fill was bg-border on a bg-border
                      // track — invisible, so the rail never read as moving.
                      // A faint grey advances just enough to show time passing
                      // without implying progress the way the azure fill does.
                      className={`absolute inset-0 block ${
                        isFast ? 'bg-primary' : 'bg-muted-foreground/25'
                      }`}
                    />
                  </span>
                )}
              </div>

              {/* Stop copy. `-mt-1` pulls the block up so the timestamp sits
                  level with its node — the reserved blank lines add height
                  above the label, and without this the copy drifts well below
                  the circle it belongs to. */}
              <div className="min-w-0 -mt-1 pb-1">
                {/* The gap line is reserved in every row, not just the ones
                    that have text. It only exists in the slow lane, and
                    rendering it conditionally made those rows 6–23px taller —
                    so the two lanes' nodes drifted out of line down the
                    column, and the side-by-side comparison stopped reading as
                    the same moments. `invisible` keeps the box, drops the ink. */}
                <p
                  aria-hidden={!stop.gap}
                  className={`mb-1 text-[11px] italic text-muted-foreground/70 ${
                    stop.gap ? '' : 'invisible'
                  }`}
                >
                  {stop.gap ? `⋯ ${stop.gap} ⋯` : ' '}
                </p>
                {/* Reserved on every row for the same reason as the gap line —
                    two of the slow lane's stops have no timestamp, and
                    omitting the element shortened those rows out of step with
                    the lane beside them. */}
                <p
                  aria-hidden={!stop.time}
                  className={`${stop.time ? '' : 'invisible'} text-[11px] font-bold tabular-nums transition-colors duration-300 ${
                    succeeded
                      ? 'text-[hsl(var(--success))]'
                      : isStart || (on && isFast)
                        ? 'text-primary'
                        : 'text-muted-foreground'
                  }`}
                >
                  {stop.time || ' '}
                </p>
                <p
                  className={`text-[13px] leading-snug transition-colors duration-300 ${
                    lost
                      ? 'font-bold text-[hsl(var(--destructive))]'
                      : succeeded
                        ? 'font-bold text-[hsl(var(--success))]'
                        : failed
                          ? 'font-bold text-foreground'
                          : on
                            ? 'font-semibold text-foreground'
                            : 'text-muted-foreground'
                  }`}
                >
                  {stop.label}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

/**
 * Two lanes, one lead, opposite outcomes.
 *
 * Both lanes run off a single step counter so the slow lane is visibly still
 * waiting while the fast lane finishes — the contrast only reads if they share
 * a clock.
 */
export const RaceLanes = () => {
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const animate = isInView && !reduceMotion;

  const [step, setStep] = useState(reduceMotion ? TOTAL_STEPS : 0);

  useEffect(() => {
    // Reduced motion wins outright: show both finished lanes, never cycle.
    if (reduceMotion || !animate) {
      setStep(TOTAL_STEPS);
      return;
    }
    // One interval advancing a counter. The previous version re-armed itself
    // inside a closure over the first run's timer array, so later cycles were
    // untracked and cleanup missed them.
    const CYCLE = TOTAL_STEPS + Math.round(HOLD_MS / STEP_MS);
    setStep(0);
    let tick = 0;
    const id = setInterval(() => {
      tick = (tick + 1) % CYCLE;
      setStep(Math.min(tick, TOTAL_STEPS));
    }, STEP_MS);

    return () => clearInterval(id);
  }, [animate, reduceMotion]);

  return (
    <div
      ref={ref}
      data-testid="race-lanes"
      className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8"
    >
      <div data-testid="race-lane-slow">
        <Lane
          title="Your site today"
          caption="The lead waits."
          stops={SLOW_LANE}
          step={step}
          tone="slow"
          reduceMotion={!!reduceMotion}
        />
      </div>
      <div data-testid="race-lane-fast">
        <Lane
          title="With AuctoLabs"
          caption="The lead gets answered."
          stops={FAST_LANE}
          step={step}
          tone="fast"
          reduceMotion={!!reduceMotion}
        />
      </div>
    </div>
  );
};
