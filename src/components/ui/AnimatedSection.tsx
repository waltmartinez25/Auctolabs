import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import { ReactNode, Children, cloneElement, isValidElement, useState, useEffect } from 'react';

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}

type AnimationVariant = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scaleUp' | 'clipReveal';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
  /** If true, each direct child animates with a stagger delay */
  stagger?: boolean;
  /** Stagger delay between children in ms (default: 120) */
  staggerDelay?: number;
  /** Animation duration class override */
  duration?: 'fast' | 'normal' | 'slow';
}

const variantStyles: Record<AnimationVariant, { hidden: string; visible: string }> = {
  fadeUp: {
    hidden: 'opacity-0 translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  fadeDown: {
    hidden: 'opacity-0 -translate-y-8',
    visible: 'opacity-100 translate-y-0',
  },
  fadeLeft: {
    hidden: 'opacity-0 translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  fadeRight: {
    hidden: 'opacity-0 -translate-x-8',
    visible: 'opacity-100 translate-x-0',
  },
  fadeIn: {
    hidden: 'opacity-0',
    visible: 'opacity-100',
  },
  scaleUp: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
  clipReveal: {
    hidden: 'opacity-0 scale-95',
    visible: 'opacity-100 scale-100',
  },
};

const durationClass = {
  fast: 'duration-500',
  normal: 'duration-700',
  slow: 'duration-1000',
};

export const AnimatedSection = ({
  children,
  className,
  delay = 0,
  variant = 'fadeUp',
  stagger = false,
  staggerDelay = 120,
  duration = 'normal',
}: AnimatedSectionProps) => {
  const { ref, isInView } = useInView({ threshold: 0.08 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const styles = variantStyles[variant];
  // When the user prefers reduced motion, skip all transitions and show content immediately
  const show = prefersReducedMotion || isInView;

  if (stagger) {
    const childArray = Children.toArray(children);
    return (
      <div ref={ref} className={cn(className)}>
        {childArray.map((child, index) => {
          if (!isValidElement(child)) return child;
          const childDelay = prefersReducedMotion ? 0 : delay + index * staggerDelay;
          return cloneElement(child as React.ReactElement<any>, {
            key: index,
            className: cn(
              (child as React.ReactElement<any>).props.className,
              !prefersReducedMotion && `transition-all ${durationClass[duration]} ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`,
              show ? styles.visible : styles.hidden,
            ),
            style: {
              ...((child as React.ReactElement<any>).props.style || {}),
              transitionDelay: `${childDelay}ms`,
            },
          });
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        !prefersReducedMotion && `transition-all ${durationClass[duration]} ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`,
        show ? styles.visible : styles.hidden,
        className
      )}
      style={{ transitionDelay: prefersReducedMotion ? '0ms' : `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Animated card wrapper — adds Google-style hover lift + shadow effect
 */
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'a';
  href?: string;
}

export const AnimatedCard = ({
  children,
  className,
  as: Component = 'div',
  ...rest
}: AnimatedCardProps & Record<string, any>) => {
  return (
    <Component
      className={cn(
        'group transition-all duration-300 ease-out cursor-pointer',
        'hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/5',
        'active:scale-[0.98] active:shadow-md',
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
};
