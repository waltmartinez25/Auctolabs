import { Link } from 'react-router-dom';
import { ArrowRight, LightningCharge } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { analytics } from '@/lib/analytics';
import { CALENDLY_URL, CTA_BOOK } from '@/lib/constants';


export const CTASection = () => {
  return (
    <section className="ink-section relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.28),transparent_70%)] pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="section-padding">
          {/* Giant heading — scale up from center */}
          <AnimatedSection variant="scaleUp" duration="slow" className="flex flex-col items-center text-center">
            <span className="eyebrow text-primary-accessible tracking-[0.3em] mb-4 block">
              Let's get to work.
            </span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black leading-[0.9] tracking-tight mb-6 italic">
              Let's
              <br />
              <span className="text-primary accent-glow">Build</span>
            </h2>
          </AnimatedSection>

          {/* Subtitle + CTA row — fade up with delay */}
          <AnimatedSection delay={300} variant="fadeUp">
            <div className="flex flex-col items-center text-center gap-7">
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Your website should work as hard as you do. If you're ready to turn it into a system that supports{' '}
                <span className="text-foreground font-bold italic underline decoration-primary underline-offset-8">real growth</span>,
                {' '}we'd love to help.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl px-4">
                {/* Straight to the calendar. The whole pitch is that speed to
                    lead wins, so the last CTA on the page shouldn't route a
                    ready-to-book visitor through a form first. */}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.calendlyOpen('home_final_cta')}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-[15px] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-[0_0_40px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.55)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">{CTA_BOOK.primary}</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
                <Link
                  to="/contact?audit=true"
                  onClick={() => analytics.freeAuditClick('home_final_cta')}
                  className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl text-foreground font-black text-xl hover:bg-white/10 hover:border-white/20 hover:scale-[1.05] active:scale-[0.98] transition-all duration-500 shadow-xl"
                >
                  <span className="relative z-10">Free Audit</span>
                  <LightningCharge className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Social links — stagger fade in */}
          <AnimatedSection
            delay={500}
            variant="fadeUp"
            stagger
            staggerDelay={150}
            className="flex flex-wrap justify-center gap-8 mt-14 pt-8 border-t border-white/5"
          >
            {[
              { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/auctolabs' },
              { label: 'X',         href: 'https://x.com/AuctoLabs' },
              { label: 'Instagram', href: 'https://www.instagram.com/auctolabs' },
              { label: 'Email',     href: 'mailto:contact@auctolabs.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-all duration-300 font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em]">
                  {label}
                </span>
                <div className="w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
