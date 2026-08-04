import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';

/** A ruled divider, positioned as percentages of the grid box. */
export interface Rule {
  dir: 'h' | 'v';
  /** For 'h': the y position. For 'v': the x position. */
  at: string;
  /** Start offset along the rule's own axis. */
  from?: string;
  /** Length along the rule's own axis. */
  length?: string;
}

interface BlueprintGridProps {
  children: ReactNode;
  className?: string;
  /** Interior rules to draw. Cell walls, not the outer border. */
  rules?: Rule[];
  /** Crosshair positions as [left, top]. Put these where rules actually cross. */
  marks?: [string, string][];
  /** Stagger between each rule's draw-on, in ms. */
  stagger?: number;
  /**
   * Percentage rules only describe real cell boundaries at the breakpoint the
   * grid was laid out for. Below that the grid collapses and the rules would
   * cut through the middle of stacked cells, so hide them.
   */
  rulesFrom?: 'sm' | 'lg';
}

/**
 * A continuous ruled grid — cells share walls, so the section reads as one
 * technical drawing instead of a row of separate cards.
 *
 * Rules draw themselves in on scroll (transform: scale, which is compositable;
 * animating `border` is not). Crosshairs fade in once their rules land.
 *
 * Crosshairs live in an unclipped overlay *outside* the rounded, overflowing
 * box: they are centred on their coordinates, so `overflow-hidden` on the box
 * would otherwise clip three-quarters off each one.
 */
export const BlueprintGrid = ({
  children,
  className,
  rules = [],
  marks = [],
  stagger = 80,
  rulesFrom = 'lg',
}: BlueprintGridProps) => {
  const { ref, isInView } = useInView({ threshold: 0.15 });
  const showFrom = rulesFrom === 'sm' ? 'hidden sm:block' : 'hidden lg:block';

  return (
    <div ref={ref} className="relative">
      <div className={cn('blueprint', isInView && 'bp-drawn', className)}>
        {children}

        {/* Interior cell walls */}
        {rules.map((r, i) => (
          <span
            key={`${r.dir}-${r.at}-${i}`}
            aria-hidden="true"
            className={cn('bp-rule', showFrom, r.dir === 'h' ? 'bp-rule-h' : 'bp-rule-v')}
            style={{
              ...(r.dir === 'h'
                ? { top: r.at, left: r.from ?? '0%', width: r.length ?? '100%' }
                : { left: r.at, top: r.from ?? '0%', height: r.length ?? '100%' }),
              transitionDelay: `${i * stagger}ms`,
            }}
          />
        ))}
      </div>

      {/* Unclipped decorative overlay */}
      <div
        aria-hidden="true"
        className={cn('absolute inset-0 pointer-events-none', isInView && 'bp-drawn')}
      >
        {marks.map(([left, top], i) => (
          <span
            key={`${left}-${top}`}
            className={cn('crosshair bp-mark', showFrom)}
            style={{ left, top, transitionDelay: `${400 + i * 60}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
