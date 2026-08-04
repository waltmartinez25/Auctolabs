import { useState, useEffect, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';

interface FadeInProps {
  children: ReactNode;
  /** Seconds to wait before revealing. */
  delay?: number;
  /** Seconds the fade/rise takes. */
  duration?: number;
  className?: string;
}

/**
 * Time-based reveal for above-the-fold content.
 *
 * Deliberately NOT scroll-triggered like `AnimatedSection` — hero content must
 * animate on load, without waiting for an IntersectionObserver that may never
 * fire because the element is already in view.
 */
export const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: FadeInProps) => {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), reduceMotion ? 0 : delay * 1000);
    return () => clearTimeout(t);
  }, [delay, reduceMotion]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: reduceMotion || visible ? 'translateY(0)' : 'translateY(18px)',
        transition: reduceMotion
          ? 'none'
          : `opacity ${duration}s cubic-bezier(.25,.46,.45,.94), transform ${duration}s cubic-bezier(.25,.46,.45,.94)`,
        willChange: visible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
