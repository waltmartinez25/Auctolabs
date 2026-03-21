import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Testimonial } from '@/components/ui/clean-testimonial';

export const TestimonialsSection = () => {
  return (
    <section className="section-padding border-t border-border/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[120px] rounded-full -z-10" />
      <div className="container-custom">

        {/* Section label + heading */}
        <AnimatedSection variant="fadeDown">
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-6 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
            Trusted by businesses<br />
            <span className="text-primary italic">ready to grow.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md mb-12">
            Our clients don't just want a new website — they want a platform that supports their next stage of growth. That's exactly what we build.
          </p>
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
