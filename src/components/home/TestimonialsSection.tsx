import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Testimonial } from '@/components/ui/clean-testimonial';

export const TestimonialsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden border-t border-border/40 bg-background">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full -z-10" />
      <div className="container-custom">

        {/* Section label + heading */}
        <AnimatedSection variant="fadeDown">
          <div className="section-head">
            <span className="eyebrow">Client Stories</span>
            <h2>
              Trusted by businesses{' '}
              <em>ready to grow.</em>
            </h2>
            <p>
              Our clients don&apos;t just want a new website. They want a platform that
              supports their next stage of growth. That&apos;s exactly what we build.
            </p>
          </div>
        </AnimatedSection>

        {/* Testimonial component centered in a card */}
        <AnimatedSection variant="scaleUp" delay={100}>
          <div className="max-w-2xl mx-auto soft-card rounded-3xl overflow-hidden">
            <Testimonial />
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};
