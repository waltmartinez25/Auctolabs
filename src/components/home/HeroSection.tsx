import { Link } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-warm-radial" />
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* Warm decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <AnimatedSection>
            <div className="feature-badge mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
              <span>Built for Small Businesses</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight mb-6 text-foreground">
              Turn Your Website Into a{' '}
              <span className="gradient-text-warm">Client-Getting Machine</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              We build beautiful websites and smart automations that respond to leads in under 60 seconds, 
              qualify prospects automatically, and book meetings while you focus on what you do best.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Book a Strategy Call
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/contact?audit=true">
                  <Play className="mr-2 h-5 w-5" />
                  Get a Free Loom Audit
                </Link>
              </Button>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Results in 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Built for small businesses</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
