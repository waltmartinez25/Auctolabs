import { Link } from 'react-router-dom';
import { ArrowRight, LightningCharge } from 'react-bootstrap-icons';
import { useState, useEffect, type ReactNode, type CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DotGlobe from '@/components/ui/globe-hero';

// ─── FadeIn ───────────────────────────────────────────────────────────────────

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) => {
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

// ─── Bubble data ───────────────────────────────────────────────────────────────
//
// Globe geometry at 1280×900:
//   size = min(100vw,120vh) = 1080px,  radius = 540px
//   bottom offset = -(globeSize × 0.58) → globe top ≈ 446px from section top
//   Globe surface positions (% of section width):
//     at bottom 48% (top 52%): x_left ≈ 38.3%  — pill right edge @ ~32%  gap ≈ 6%
//     at bottom 38% (top 62%): x_left ≈ 24.3%  — pill right edge @ ~18%  gap ≈ 6%
//     at bottom 28% (top 72%): x_left ≈ 17.1%  — pill right edge @ ~13%  gap ≈ 4%
//
// ──────────────────────────────────────────────────────────────────────────────

const bubbles: { label: string; side: 'left' | 'right'; css: CSSProperties; floatDuration: number; delay: number }[] = [
  { label: 'AI Automations',  side: 'left',  css: { left: '27%', bottom: '48%' }, floatDuration: 3.2, delay: 1.1 },
  { label: 'Web Design',      side: 'left',  css: { left: '13%', bottom: '38%' }, floatDuration: 3.8, delay: 1.4 },
  { label: 'CRM Integration', side: 'left',  css: { left: '8%',  bottom: '28%' }, floatDuration: 3.5, delay: 1.7 },
  { label: 'Lead Generation', side: 'right', css: { right: '27%', bottom: '48%' }, floatDuration: 3.6, delay: 1.2 },
  { label: 'Speed-to-Lead',   side: 'right', css: { right: '13%', bottom: '38%' }, floatDuration: 3.3, delay: 1.5 },
];

// ─── Bubble pill ───────────────────────────────────────────────────────────────

const BubblePill = ({ label, side, css, floatDuration, delay }: (typeof bubbles)[number]) => {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="absolute z-30 hidden md:flex items-center"
      style={css}
      initial={{ opacity: 0, x: side === 'left' ? -16 : 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : delay,
        ease: [0, 0, 0.2, 1] as [number, number, number, number],
      }}
    >
      <motion.div
        animate={reduceMotion ? {} : { y: [0, -6, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: reduceMotion ? 'auto' : 'transform' }}
        className="glass-panel border-border/40 shadow-lg rounded-full px-4 py-2 whitespace-nowrap"
      >
        <span className="text-xs font-bold text-foreground">{label}</span>
      </motion.div>
    </motion.div>
  );
};

// ─── Hero Section ─────────────────────────────────────────────────────────────

export const HeroSection = () => (
  <section aria-label="Hero" className="relative w-full h-screen bg-background overflow-hidden">

    {/* Radial glow centred behind the globe top — adds depth on light bg */}
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
      style={{
        bottom: 0,
        width: 'min(100vw, 120vh)',
        height: 'min(60vw, 72vh)',
        background: 'radial-gradient(ellipse at 50% 100%, hsl(var(--primary)/0.07) 0%, transparent 70%)',
      }}
    />

    {/* Top + bottom edge fade — keeps the section seamless */}
    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background pointer-events-none z-10" />

    {/* ── Compact text block — sits in the clear sky above the globe ── */}
    <div className="relative z-20 flex flex-col items-center pt-12 md:pt-16 px-4">
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center">

        {/* Badge — 44px min height for touch target */}
        <FadeIn delay={0.15} className="flex justify-center mb-5">
          <div
            role="presentation"
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel border-primary/40 shadow-lg hover:border-primary/60 transition-colors duration-300 min-h-[44px]"
          >
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black text-primary tracking-[0.18em] uppercase select-none">
              AuctoLabs Intelligence
            </span>
            <span aria-hidden="true" className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          </div>
        </FadeIn>

        {/* H1 — two-line serif headline */}
        <FadeIn delay={0.3} duration={0.85} className="mb-4">
          <h1 className="font-serif leading-[0.88] select-none">
            <span className="block font-light tracking-tight text-foreground/50 text-2xl md:text-3xl lg:text-4xl mb-2">
              Websites Built
            </span>
            <span className="relative block">
              <span className="bg-gradient-to-br from-foreground via-primary to-primary/40 bg-clip-text text-transparent font-black italic text-5xl md:text-7xl lg:text-8xl">
                To Grow
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 blur-[72px] opacity-30"
                style={{ background: 'hsl(var(--primary))' }}
              />
            </span>
          </h1>
        </FadeIn>

        {/* Sub-copy — WCAG AA contrast: text-muted-foreground on bg-background ≥ 4.5:1 */}
        <FadeIn delay={0.55} className="mb-7">
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed font-medium max-w-md mx-auto">
            Your website should do more than exist. We build{' '}
            <strong className="text-foreground font-semibold">intelligent, AI-powered websites</strong>
            {' '}that attract the right clients, convert visitors, and{' '}
            <strong className="text-foreground font-semibold">scale with your business</strong>.
          </p>
        </FadeIn>

        {/* CTAs — both buttons meet 44×44px minimum touch target */}
        <FadeIn delay={0.75}>
          <div className="glass-panel border-border/30 p-1.5 rounded-2xl inline-flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center shadow-xl">

            <Link
              to="/contact"
              aria-label="Start building your website with AuctoLabs"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm min-h-[44px] transition-all duration-300 overflow-hidden border border-primary/20 hover:scale-[1.02] active:scale-[0.98] primary-glow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
            >
              <span aria-hidden="true" className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 tracking-wide">Start Building</span>
              <ArrowRight aria-hidden="true" className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              to="/contact?audit=true"
              aria-label="Request a free website audit from AuctoLabs"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3 border border-border/50 rounded-xl font-bold text-sm min-h-[44px] text-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <LightningCharge aria-hidden="true" className="w-3.5 h-3.5 text-contrast group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
              <span className="tracking-wide">Free Audit</span>
            </Link>

          </div>
        </FadeIn>

      </div>
    </div>

    {/* ── Globe — full-width, centered, rising from the bottom ──────────────────
      Size: min(100vw, 120vh) — fills viewport width on landscape.
      Bottom offset: -58% of globe size — shows upper ~42% (cap to shoulder).
      The extra offset vs the old -45% clears the text block on large monitors
      (e.g. 1920×1080) where the globe previously crept into the copy zone.
      dotColor: Evergreen "4,42,43" — dark dots on the light bg-background.
    ──────────────────────────────────────────────────────────────────────────── */}
    <div
      aria-hidden="true"
      className="absolute left-1/2 -translate-x-1/2 z-10"
      style={{
        width:  'min(120vw, 140vh)',
        height: 'min(120vw, 140vh)',
        bottom: 'calc(min(120vw, 140vh) * -0.70)',
      }}
    >
      <DotGlobe
        dotDensity={28}
        rotationSpeed={0.0018}
        dotColor="4, 42, 43"
        dotRadius={2.2}
        className="w-full h-full"
      />
    </div>

    {/* Bottom fade — blends the globe's equator into the next section */}
    <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />

    {/* ── Service bubble pills ── */}
    {bubbles.map((b) => (
      <BubblePill key={b.label} {...b} />
    ))}

  </section>
);
