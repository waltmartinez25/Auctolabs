import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { LaneCards } from '@/components/pricing/LaneCards';

export const PricingPreview = () => {
  return (
    <section className="section-padding border-t border-border/40 bg-secondary">
      <div className="container-custom">

        <AnimatedSection variant="fadeUp">
          <div className="section-head">
            <span className="eyebrow">Working Together</span>
            <h2>Pick your lane.</h2>
            <p>
              Every build is scoped to the business it serves, so the honest answer to
              &ldquo;what does it cost?&rdquo; starts with a conversation. Here is how
              that work is shaped.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={100}>
          <LaneCards source="home" />
        </AnimatedSection>

        <AnimatedSection delay={300} variant="fadeIn">
          <div className="mt-10 flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground sm:flex-row">
            <Link to="/pricing" className="link-arrow font-medium text-primary">
              See how we compare
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <span aria-hidden="true" className="hidden text-muted-foreground sm:block">
              ·
            </span>
            <Link to="/contact" className="transition-colors hover:text-primary">
              Not sure which fits? Let&apos;s talk
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
