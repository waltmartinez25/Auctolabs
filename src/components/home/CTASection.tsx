import { Link } from 'react-router-dom';
import { ArrowRight, LightningCharge } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const CTASection = () => {
  return (
    <section className="border-t border-border/40 relative overflow-hidden bg-foreground text-background">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(94,177,191,0.1),transparent)] pointer-events-none" />
      <div className="container-custom relative z-10">
        <div className="py-32 md:py-48 lg:py-60">
          {/* Giant heading — scale up from center */}
          <AnimatedSection variant="scaleUp" duration="slow" className="flex flex-col items-center text-center">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.4em] mb-12 block accent-glow">
              Let's get to work.
            </span>
            <h2 className="text-7xl md:text-9xl lg:text-[180px] xl:text-[220px] font-serif font-black leading-[0.75] tracking-tightest mb-20 italic">
              Let's
              <br />
              <span className="text-primary accent-glow">Build</span>
            </h2>
          </AnimatedSection>

          {/* Subtitle + CTA row — fade up with delay */}
          <AnimatedSection delay={300} variant="fadeUp">
            <div className="flex flex-col items-center text-center gap-12">
              <p className="text-xl md:text-2xl text-background/60 max-w-2xl leading-relaxed font-medium">
                Your website should work as hard as you do. If you're ready to turn it into a system that supports{' '}
                <span className="text-background font-bold italic underline decoration-primary underline-offset-8">real growth</span>,
                {' '}we'd love to help.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl px-4">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 rounded-2xl bg-primary text-primary-foreground font-black text-xl hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 shadow-[0_0_40px_rgba(94,177,191,0.3)] hover:shadow-[0_0_60px_rgba(94,177,191,0.5)] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">Start Building</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
                <Link
                  to="/contact?audit=true"
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-background font-black text-xl hover:bg-white/10 hover:border-white/20 hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 shadow-xl"
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
            className="flex flex-wrap justify-center gap-12 mt-32 pt-12 border-t border-white/5"
          >
            {[
              { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/auctolabs' },
              { label: 'X',         href: 'https://x.com/AuctoLabs' },
              { label: 'Instagram', href: 'https://www.instagram.com/auctolabs' },
              { label: 'Email',     href: 'mailto:hello@auctolabs.com' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex flex-col items-center gap-2"
              >
                <span className="text-sm text-background/40 group-hover:text-primary transition-all duration-300 font-black uppercase tracking-[0.3em] group-hover:tracking-[0.4em]">
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
