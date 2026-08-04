import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckLg } from 'react-bootstrap-icons';
import { useInView } from '@/hooks/useInView';
import { ToolLogo } from '@/components/ui/tool-logo';

// Slugs verified against the Simple Icons CDN — all four return 200.
const NODES = [
  { name: 'Typeform', slug: 'typeform', label: 'Form' },
  { name: 'HubSpot', slug: 'hubspot', label: 'CRM' },
  { name: 'Slack', slug: 'slack', label: 'Notify' },
  { name: 'Google Calendar', slug: 'googlecalendar', label: 'Book' },
] as const;

const STEP_MS = 900;
const HOLD_MS = 1800;

/**
 * Four tools in a chain with a pulse traveling left to right; each node ticks
 * complete as the pulse passes, then the chain resets.
 */
export const WorkflowRelay = () => {
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const animate = isInView && !reduceMotion;

  // How many nodes have completed. Static state shows the finished chain.
  const [done, setDone] = useState(reduceMotion ? NODES.length : 0);

  useEffect(() => {
    // Reduced motion wins outright: show the completed chain and never cycle.
    // `useReducedMotion` reports false on the very first render, so this must
    // be re-asserted in an effect rather than only in the state initializer.
    if (reduceMotion) {
      setDone(NODES.length);
      return;
    }
    if (!animate) {
      setDone(NODES.length);
      return;
    }
    // One interval advancing a counter, rather than a recursive tree of
    // setTimeouts. The old version re-armed itself inside a closure over the
    // first run's timer array, so later cycles were untracked and cleanup
    // missed them — with `triggerOnce: false` the effect re-fires on every
    // scroll past, and those orphaned timers compounded.
    const CYCLE = NODES.length + Math.round(HOLD_MS / STEP_MS);
    setDone(0);
    let tick = 0;
    const id = setInterval(() => {
      tick = (tick + 1) % CYCLE;
      setDone(Math.min(tick, NODES.length));
    }, STEP_MS);

    return () => clearInterval(id);
  }, [animate, reduceMotion]);

  return (
    <div ref={ref} aria-hidden="true" className="w-full">
      {/* 2×2 below sm so four nodes never squash on a phone */}
      <div className="grid grid-cols-2 gap-x-1 gap-y-3 sm:flex sm:items-start sm:justify-between">
        {NODES.map((node, i) => {
          const complete = i < done;
          // The node that just fired. Only one is lit at a time, so the bloom
          // travels with the pulse instead of accumulating down the chain.
          const firing = animate && i === done - 1;
          // Last node is the payoff — the booking. Green says "done" in a way
          // azure cannot, since azure is already every other state here.
          const isFinal = i === NODES.length - 1;
          const succeeded = complete && isFinal;
          return (
            <div key={node.slug} className="flex flex-1 items-start gap-1">
              {/* Node */}
              <div className="flex w-full flex-col items-center gap-1.5 sm:w-auto">
                <div className="relative">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border bg-card transition-[border-color,box-shadow] duration-500 ${
                      succeeded
                        ? 'border-[hsl(var(--success))]'
                        : complete
                          ? 'border-primary/50'
                          : 'border-border'
                    } ${firing ? (isFinal ? 'lit-node-success' : 'lit-node') : ''}`}
                  >
                    <ToolLogo slug={node.slug} className="h-4 w-4 opacity-80" />
                  </div>

                  {/* Completion tick — green on the last node, so the chain
                      visibly resolves rather than just running out of steps. */}
                  <motion.span
                    initial={false}
                    animate={{ opacity: complete ? 1 : 0, scale: complete ? 1 : 0.6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-500 ${
                      succeeded
                        ? 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                        : 'bg-primary text-primary-foreground'
                    }`}
                  >
                    <CheckLg className="h-2.5 w-2.5" />
                  </motion.span>
                </div>

                <span
                  className={`text-[10px] font-semibold transition-colors duration-300 ${
                    complete ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {node.label}
                </span>
              </div>

              {/* Connector to the next node — fills as the pulse passes */}
              {i < NODES.length - 1 && (
                <div className="relative mt-5 hidden h-px flex-1 bg-border sm:block">
                  <motion.span
                    initial={false}
                    animate={{ scaleX: complete ? 1 : 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease: 'easeOut' }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute inset-0 block bg-primary"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
