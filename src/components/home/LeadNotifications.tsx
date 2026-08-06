import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChatDotsFill, CalendarCheckFill, SendFill } from 'react-bootstrap-icons';
import { useInView } from '@/hooks/useInView';

// Capability statements, not claimed metrics — no counts, names, or revenue.
const NOTIFICATIONS = [
  { icon: ChatDotsFill, title: 'New inquiry', meta: 'Contact form, website' },
  { icon: CalendarCheckFill, title: 'Appointment booked', meta: 'Added to calendar' },
  { icon: SendFill, title: 'Follow-up sent', meta: 'Email + SMS' },
] as const;

const STEP_MS = 1100;
const HOLD_MS = 2200;

/**
 * A short feed of notifications arriving one at a time, then cycling —
 * showing leads landing without asserting how many.
 */
export const LeadNotifications = () => {
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const animate = isInView && !reduceMotion;

  // Number of cards currently revealed. Static state shows all of them.
  const [shown, setShown] = useState(reduceMotion ? NOTIFICATIONS.length : 0);

  useEffect(() => {
    // Reduced motion wins outright: show the finished feed and never cycle.
    // `useReducedMotion` reports false on the very first render, so this must
    // be re-asserted in an effect rather than only in the state initializer.
    if (reduceMotion) {
      setShown(NOTIFICATIONS.length);
      return;
    }
    if (!animate) {
      setShown(NOTIFICATIONS.length);
      return;
    }
    // One interval advancing a counter, rather than a recursive tree of
    // setTimeouts. The old version re-armed itself inside a closure over the
    // first run's timer array, so later cycles were untracked and cleanup
    // missed them — with `triggerOnce: false` the effect re-fires on every
    // scroll past, and those orphaned timers compounded.
    const CYCLE = NOTIFICATIONS.length + Math.round(HOLD_MS / STEP_MS);
    setShown(0);
    let tick = 0;
    const id = setInterval(() => {
      tick = (tick + 1) % CYCLE;
      setShown(Math.min(tick, NOTIFICATIONS.length));
    }, STEP_MS);

    return () => clearInterval(id);
  }, [animate, reduceMotion]);

  return (
    <div ref={ref} aria-hidden="true" className="flex flex-col gap-2.5">
      {NOTIFICATIONS.map((n, i) => {
        const Icon = n.icon;
        const visible = i < shown;
        // The newest card reads full-strength; older ones recede into the feed.
        const isNewest = i === shown - 1;
        // Last card closes the loop — the follow-up went out. Green marks the
        // sequence as resolved instead of just stopping.
        const isFinal = i === NOTIFICATIONS.length - 1;
        const succeeded = visible && isFinal;
        return (
          <motion.div
            key={n.title}
            initial={false}
            animate={{
              opacity: visible ? (isNewest || reduceMotion ? 1 : 0.55) : 0,
              y: visible ? 0 : 10,
            }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            /* The whole arriving card blooms, so the glow reads as the
               notification landing rather than as an icon treatment. `.lit-node`
               owns box-shadow outright, so the resting `shadow-soft-sm` is
               swapped out rather than layered — two box-shadows on one element
               would just fight. */
            className={`flex items-center gap-3 rounded-xl border bg-card px-3.5 py-2.5 transition-[border-color,box-shadow] duration-500 ${
              isNewest && animate
                ? isFinal
                  ? 'lit-node-success border-[hsl(var(--success))]/50'
                  : 'lit-node border-primary/40'
                : succeeded
                  ? 'border-[hsl(var(--success))]/40 shadow-soft-sm'
                  : 'border-border shadow-soft-sm'
            }`}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500 ${
                succeeded
                  ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                  : isNewest && animate
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-bold leading-tight text-foreground">{n.title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{n.meta}</p>
            </div>
            <span className="ml-auto shrink-0 text-[10px] font-medium text-muted-foreground">
              just now
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
