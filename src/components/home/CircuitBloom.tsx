import { useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/**
 * Circuit bloom — an ornamental root system that grows in from the page edge.
 *
 * Blueprint vocabulary (traces, nodes, right-angle jogs) arranged like botany:
 * a trunk that branches, sub-branches that fork again, and node "buds" at the
 * tips. Pulses travel outward along the traces. Purely decorative.
 *
 * viewBox is 300x760 and the art is authored for the LEFT edge; the right-hand
 * instance is mirrored with a CSS transform so a single path set serves both.
 */

// Trunk plus branches. Each branch mixes curves with a squared-off jog so the
// result reads as circuitry rather than a plant.
const BRANCHES = [
  // upper fork
  'M -6,96 C 70,96 86,64 118,64 L 168,64 C 196,64 200,40 232,40',
  'M 118,64 C 150,64 154,92 190,92 L 226,92',
  // upper-mid
  'M -6,206 C 64,206 78,178 112,178 L 176,178 C 204,178 208,150 244,150',
  'M 112,178 C 146,178 150,214 188,214 L 218,214',
  // centre trunk — the heaviest run
  'M -6,330 C 88,330 104,306 148,306 L 214,306 C 244,306 248,282 282,282',
  'M 148,306 C 184,306 188,344 230,344 L 264,344',
  'M 214,306 C 236,306 240,330 262,330',
  // lower-mid
  'M -6,452 C 66,452 80,478 116,478 L 180,478 C 208,478 212,504 248,504',
  'M 116,478 C 150,478 154,444 194,444 L 224,444',
  // lower fork
  'M -6,570 C 72,570 88,600 122,600 L 172,600 C 200,600 204,628 238,628',
  'M 122,600 C 154,600 158,570 196,570 L 224,570',
  // fine capillaries
  'M 190,92 C 214,92 216,74 236,74',
  'M 188,214 C 212,214 214,232 234,232',
  'M 230,344 C 252,344 254,362 272,362',
  'M 194,444 C 216,444 218,426 238,426',
  'M 196,570 C 218,570 220,552 240,552',
] as const;

// Node "buds" at branch tips — mostly small, a few larger to break the rhythm.
const NODES: { x: number; y: number; r: number; solid?: boolean }[] = [
  { x: 232, y: 40, r: 5, solid: true },
  { x: 236, y: 74, r: 3 },
  { x: 226, y: 92, r: 3.5 },
  { x: 244, y: 150, r: 5, solid: true },
  { x: 218, y: 214, r: 3.5 },
  { x: 234, y: 232, r: 3 },
  { x: 282, y: 282, r: 6.5, solid: true },
  { x: 262, y: 330, r: 3.5 },
  { x: 264, y: 344, r: 4.5 },
  { x: 272, y: 362, r: 3 },
  { x: 248, y: 504, r: 5, solid: true },
  { x: 224, y: 444, r: 3.5 },
  { x: 238, y: 426, r: 3 },
  { x: 238, y: 628, r: 5, solid: true },
  { x: 224, y: 570, r: 3.5 },
  { x: 240, y: 552, r: 3 },
  // junctions along the trunks
  { x: 118, y: 64, r: 3 },
  { x: 112, y: 178, r: 3 },
  { x: 148, y: 306, r: 4 },
  { x: 214, y: 306, r: 3 },
  { x: 116, y: 478, r: 3 },
  { x: 122, y: 600, r: 3 },
];

// Pulses ride the longer branches. Staggered so the bloom never beats in sync.
const PULSE_PATHS = [
  { d: BRANCHES[0], dur: 4.2, begin: 0 },
  { d: BRANCHES[2], dur: 5.1, begin: 1.4 },
  { d: BRANCHES[4], dur: 3.8, begin: 0.6 },
  { d: BRANCHES[7], dur: 4.8, begin: 2.1 },
  { d: BRANCHES[9], dur: 5.4, begin: 1.1 },
  { d: BRANCHES[5], dur: 4.4, begin: 2.8 },
];

interface CircuitBloomProps {
  /** Mirror the art for the right-hand edge. */
  flip?: boolean;
  className?: string;
}

export const CircuitBloom = ({ flip = false, className }: CircuitBloomProps) => {
  const reduceMotion = useReducedMotion();
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const animate = isInView && !reduceMotion;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid={flip ? 'circuit-bloom-right' : 'circuit-bloom-left'}
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 300 760"
        preserveAspectRatio="xMinYMid meet"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        {/* Traces */}
        <g
          stroke="hsl(var(--primary) / 0.55)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {BRANCHES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Node buds */}
        {NODES.map((n) => (
          <circle
            key={`${n.x}-${n.y}`}
            cx={n.x}
            cy={n.y}
            r={n.r * 1.5}
            fill={n.solid ? 'hsl(var(--primary) / 0.85)' : 'hsl(var(--background))'}
            stroke="hsl(var(--primary) / 0.7)"
            strokeWidth="2"
          />
        ))}

        {/* Travelling pulses */}
        {PULSE_PATHS.map((p, i) => (
          <circle key={i} r="3" fill="hsl(var(--primary))" opacity="0.85">
            {animate ? (
              <animateMotion
                path={p.d}
                dur={`${p.dur}s`}
                begin={`${p.begin}s`}
                repeatCount="indefinite"
              />
            ) : (
              // Reduced motion: park each pulse along its branch so the bloom
              // still reads as carrying signal rather than looking dead.
              <animateMotion
                path={p.d}
                dur="1s"
                begin="0s"
                fill="freeze"
                keyPoints={`${0.35 + i * 0.09};${0.35 + i * 0.09}`}
                keyTimes="0;1"
                calcMode="linear"
              />
            )}
          </circle>
        ))}
      </svg>
    </div>
  );
};
