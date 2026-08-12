import { useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Globe } from 'react-bootstrap-icons';
import { useInView } from '@/hooks/useInView';

// All three shots are normalised to the same 16:10 hero crop, so the cards
// scale identically instead of one zooming into a headline.
const SHOTS = [
  {
    src: '/mockups/hero-penn-turf.jpg',
    alt: 'Penn Turf website built by AuctoLabs',
    label: 'pennturf.com',
    indent: 'ml-0',
  },
  {
    src: '/mockups/hero-pinnacle.jpg',
    alt: 'Pinnacle Law Group website built by AuctoLabs',
    label: 'pinnaclelawgroup.com',
    indent: 'ml-6 lg:ml-8',
  },
  {
    src: '/mockups/hero-mitrix.jpg',
    alt: 'Mitrix IT website built by AuctoLabs',
    label: 'mitrixit.com',
    indent: 'ml-12 lg:ml-16',
  },
] as const;

// Slower than the sibling tiles (LeadNotifications 1100ms, WorkflowRelay 900ms)
// on purpose: those cycle abstract UI, this one asks you to actually look at a
// screenshot of somebody's website.
const STEP_MS = 2400;

/**
 * Client sites as a cascade of labelled cards.
 *
 * Every mockup on the page is web-design work, so they all live in this tile.
 * Cards deliberately overflow the tile's right edge — the clip is what creates
 * the "stack continues off-screen" read. Each carries its own domain label so
 * the visual states which site it is.
 *
 * The stack cycles: one card at a time takes the `.lit-node` bloom, matching
 * the arrive-glow-settle grammar the Lead Generation and AI Workflows tiles
 * already use, so this tile isn't the one dead panel in a row of live ones.
 * Hover overrides the timer and lights whichever card you point at.
 */
export const MockupStack = () => {
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const animate = isInView && !reduceMotion;

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(-1);

  useEffect(() => {
    if (!animate) return;
    const t = setInterval(() => setActive((a) => (a + 1) % SHOTS.length), STEP_MS);
    return () => clearInterval(t);
  }, [animate]);

  // Pointing at a card wins over the clock, so the visual answers "what is
  // this one?" on demand rather than making you wait for the cycle.
  const lit = hovered >= 0 ? hovered : active;

  return (
    <div ref={ref} className="flex flex-col gap-3">
      {SHOTS.map((shot, i) => {
        // Under reduced motion nothing is singled out — the cascade reads as a
        // static portfolio, which is what it is.
        const isLit = animate && i === lit;
        return (
          <div
            key={shot.src}
            className={`group/card relative ${shot.indent}`}
            // Later cards sit above earlier ones, so each overlaps the one
            // before — except the lit card, which comes forward so its bloom
            // is not clipped by the card stacked on top of it.
            style={{ zIndex: isLit ? SHOTS.length + 1 : i + 1 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          >
            <div
              /* Half-strength: a portfolio card rotating on a timer is the
                 least meaningful movement in the row, so it should not shout
                 as loudly as a lead arriving. Hover still gets the full lift. */
              className={`w-[112%] overflow-hidden rounded-l-xl bg-card transition-[transform,box-shadow] duration-500 group-hover/card:-translate-x-1.5 ${
                isLit ? 'lit-node-soft' : 'shadow-soft-md'
              }`}
            >
              {/* Tab header */}
              <div className="flex items-center gap-2 bg-secondary px-3.5 py-2">
                <Globe aria-hidden="true" className="h-3 w-3 shrink-0 text-primary" />
                <span className="truncate text-[11px] font-semibold text-foreground">
                  {shot.label}
                </span>
              </div>
              {/* Hero crop — the sources are already trimmed to 16:10, so
                  showing the whole image keeps every hero intact at any width. */}
              <img
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={750}
                className="block w-full h-auto"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
