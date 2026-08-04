import { useReducedMotion } from 'framer-motion';
import { LightningChargeFill, CalendarCheck, Diagram3 } from 'react-bootstrap-icons';
import { useInView } from '@/hooks/useInView';

// ─── Flow paths ───────────────────────────────────────────────────────────────
// viewBox is 640×260. Left-hand curves carry inquiries in; right-hand curves
// carry replies and bookings back out. Each is a gentle bezier so the dots
// visibly arc rather than sliding along a straight line.

const LEFT_PATHS = [
  'M -10,40  C 90,40 150,95 258,120',
  'M -10,95  C 90,95 170,112 258,126',
  'M -10,165 C 90,165 170,144 258,134',
  'M -10,220 C 90,220 150,165 258,140',
];

const RIGHT_PATHS = [
  'M 382,120 C 490,95 550,40 650,40',
  'M 382,126 C 470,112 550,95 650,95',
  'M 382,134 C 470,144 550,165 650,165',
  'M 382,140 C 490,165 550,220 650,220',
];

// One tone per line — four genuinely distinct colours so each path reads as
// its own thread. Note --contrast (223 100% 48%) is nearly identical to
// --primary (223 100% 55%), so it is deliberately not used here.
const DOT_TONES = [
  'hsl(var(--primary))',    // azure — brand
  'hsl(160 84% 39%)',       // emerald — matches "booked" on the hero cards
  'hsl(38 92% 50%)',        // amber
  'hsl(var(--destructive))', // orange-red
];

interface FlowDotsProps {
  paths: string[];
  animate: boolean;
}

// One dot per line, each its own colour.
//
// Stagger is kept small (0.25s) on purpose. A dot waits at the path origin —
// (0,0) in user space, the clipped top-left corner — until its first run
// begins, so a long delay reads as a missing dot for the first few seconds.
const FlowDots = ({ paths, animate }: FlowDotsProps) =>
  paths.map((d, i) => {
    const dur = 3.2 + i * 0.55;
    return (
      <circle key={d} r="3.5" fill={DOT_TONES[i % DOT_TONES.length]}>
        {animate ? (
          <animateMotion
            path={d}
            dur={`${dur}s`}
            begin={`${(i * 0.25).toFixed(2)}s`}
            repeatCount="indefinite"
            rotate="auto"
          />
        ) : (
          // Reduced motion: park each dot part-way along its path so the
          // graphic still reads as flow rather than looking broken.
          <animateMotion
            path={d}
            dur="1s"
            begin="0s"
            fill="freeze"
            keyPoints="0.55;0.55"
            keyTimes="0;1"
            calcMode="linear"
          />
        )}
      </circle>
    );
  });

// ─── Automation Flow ──────────────────────────────────────────────────────────

export const AutomationFlow = () => {
  const reduceMotion = useReducedMotion();
  // Only mount SMIL once visible — off-screen animation still burns CPU.
  const { ref, isInView } = useInView({ threshold: 0.15, triggerOnce: false });
  const animate = isInView && !reduceMotion;

  return (
    <div ref={ref} className="relative w-full" aria-hidden="true">
      {/*
        Keyed on `animate` so the SVG subtree is genuinely remounted when the
        graphic scrolls into view. Swapping the <animateMotion> attributes in
        place does not restart SMIL on an already-live element — the dots stay
        parked at the path origin (the clipped top-left corner) instead of
        travelling.
      */}
      <svg
        key={animate ? 'run' : 'idle'}
        viewBox="0 0 640 260"
        className="w-full h-auto"
        fill="none"
        role="presentation"
      >
        {/* Dashed flow curves.
            Darker than --border (89% lightness, 1.31:1 on white) — at that
            value the rails all but vanished and the dots read as floating
            rather than travelling along a route. 78% lands at 1.75:1.
            Deliberately not darker than that: BlueprintGrid's cell walls are
            82%, and since lower lightness reads heavier on a white canvas,
            going past ~80% would make these decorative curves out-weigh the
            tile's actual structure. */}
        <g stroke="hsl(220 14% 78%)" strokeWidth="1" strokeDasharray="4 5">
          {[...LEFT_PATHS, ...RIGHT_PATHS].map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* Traveling dots */}
        <FlowDots paths={LEFT_PATHS} animate={animate} />
        <FlowDots paths={RIGHT_PATHS} animate={animate} />
      </svg>

      {/* ── Centre hub, overlaid on the curves ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Floating status pill */}
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-[hsl(var(--ink))] px-3 py-1.5 shadow-soft-md whitespace-nowrap">
            <span
              className={`w-1.5 h-1.5 rounded-full bg-primary ${animate ? 'animate-pulse-soft' : ''}`}
            />
            <span className="text-[10px] font-bold text-[hsl(var(--ink-foreground))] tracking-wide">
              Responding
            </span>
          </div>

          {/* Hub container */}
          <div className="flex gap-1.5 rounded-2xl border border-border bg-card p-1.5 shadow-soft-md">
            {/* Main panel */}
            <div className="relative flex w-[124px] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 py-4">
              {/* data strips — abstract bars, not fake log output */}
              <div className="absolute top-2 left-0 right-0 flex justify-center gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-0.5 w-2 rounded-full bg-border" />
                ))}
              </div>

              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LightningChargeFill className="h-4 w-4" />
              </span>

              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-0.5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="h-0.5 w-2 rounded-full bg-border" />
                ))}
              </div>
            </div>

            {/* Satellite tiles */}
            <div className="flex flex-col gap-1.5">
              <div className="flex h-[38px] w-[46px] items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                <CalendarCheck className="h-4 w-4" />
              </div>
              <div className="flex h-[38px] w-[46px] items-center justify-center rounded-lg border border-border bg-background text-muted-foreground">
                <Diagram3 className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
