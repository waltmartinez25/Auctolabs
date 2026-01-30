import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export const CaseStudyPreview = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <AnimatedSection>
          <div className="soft-card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Visual area */}
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary min-h-[300px] flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-10 h-10 text-primary" />
                  </div>
                  <p className="text-muted-foreground font-medium">Featured Case Study</p>
                  <p className="text-4xl font-serif font-bold text-primary mt-2">340%</p>
                  <p className="text-sm text-muted-foreground">Growth Achieved</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>
                <span className="text-primary font-semibold mb-2 text-sm uppercase tracking-wide">Success Story</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-foreground">
                  How a Local Law Firm Increased Consultations by 340%
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  By implementing our speed-to-lead system and automated qualification workflow,
                  this 5-attorney firm went from 12 consultations per month to 53—without hiring additional intake staff.
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="soft-card px-4 py-2 bg-background">
                    <span className="text-sm font-semibold text-primary">340%</span>
                    <span className="text-xs text-muted-foreground ml-1">more leads</span>
                  </div>
                  <div className="soft-card px-4 py-2 bg-background">
                    <span className="text-sm font-semibold text-primary">&lt;60s</span>
                    <span className="text-xs text-muted-foreground ml-1">response time</span>
                  </div>
                  <div className="soft-card px-4 py-2 bg-background">
                    <span className="text-sm font-semibold text-primary">$0</span>
                    <span className="text-xs text-muted-foreground ml-1">extra staff</span>
                  </div>
                </div>

                <Button asChild variant="outline" className="w-fit">
                  <Link to="/case-studies">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
