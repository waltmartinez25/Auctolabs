import { Link } from 'react-router-dom';
import { ArrowRight, GraphUpArrow } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const tags = ['Law Firm', 'Automation', 'CRM Integration', 'Speed-to-Lead'];

export const CaseStudyPreview = () => {
  return (
    <section className="section-padding bg-secondary/20 border-t border-border/40">
      <div className="container-custom">
        {/* Section label — fade in */}
        <AnimatedSection variant="fadeIn">
          <span className="text-primary font-bold text-xs uppercase tracking-widest mb-8 block">
            Our Works
          </span>
        </AnimatedSection>

        {/* Full-width showcase area — scale up dramatically */}
        <AnimatedSection delay={100} variant="scaleUp" duration="slow">
          <div className="w-full rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary min-h-[280px] md:min-h-[360px] flex items-center justify-center mb-10 border border-border/30 card-hover overflow-hidden">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <GraphUpArrow className="w-8 h-8 text-primary" />
              </div>
              <p className="text-5xl md:text-6xl font-serif font-bold text-primary">
                340%
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Growth Achieved
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Project name + pills — fade up */}
        <AnimatedSection delay={200} variant="fadeUp">
          <div className="mb-6">
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Chen & Associates
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="uxis-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 4-column details row — stagger */}
        <AnimatedSection
          delay={300}
          variant="fadeUp"
          stagger
          staggerDelay={120}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-border/40"
        >
          <div className="py-8 px-6 border-b lg:border-b-0 lg:border-r border-border/40">
            <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-3">
              Overview
            </span>
            <p className="text-sm text-foreground leading-relaxed">
              Speed-to-lead system and automated qualification workflow for a
              5-attorney firm.
            </p>
          </div>
          <div className="py-8 px-6 border-b lg:border-b-0 lg:border-r border-border/40">
            <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-3">
              Before
            </span>
            <span className="text-3xl font-serif font-bold text-foreground">
              12 /mo
            </span>
            <p className="text-xs text-muted-foreground mt-1">consultations</p>
          </div>
          <div className="py-8 px-6 border-b lg:border-b-0 lg:border-r border-border/40">
            <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-3">
              After
            </span>
            <span className="text-3xl font-serif font-bold text-primary">
              53 /mo
            </span>
            <p className="text-xs text-muted-foreground mt-1">consultations</p>
          </div>
          <div className="py-8 px-6 flex items-end">
            <Link
              to="/case-studies"
              className="link-arrow text-primary font-medium"
            >
              Read full story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
