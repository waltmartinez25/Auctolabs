import { Search, WrenchAdjustable, Robot, GraphUpArrow, ArrowRight } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    description:
      'We start by understanding your business, your audience, and where your current website falls short.',
  },
  {
    number: '02',
    icon: WrenchAdjustable,
    title: 'Build',
    description:
      'Next, we design and develop a modern website built for speed, clarity, and conversion.',
  },
  {
    number: '03',
    icon: Robot,
    title: 'Automate',
    description:
      'We integrate systems that capture leads, streamline workflows, and reduce manual work.',
  },
  {
    number: '04',
    icon: GraphUpArrow,
    title: 'Optimize',
    description:
      'Then we refine and improve — using data, insights, and continuous iteration to help your website perform better over time.',
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-secondary/20 border-t border-border/60">
      <div className="container-custom">
        {/* Centered heading — scale up */}
        <AnimatedSection variant="scaleUp">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Audit. Build. Automate. Optimize.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We follow a systematic approach that transforms your online
              presence into a revenue-generating asset.
            </p>
          </div>
        </AnimatedSection>

        {/* Horizontal step cards — stagger with fadeUp */}
        <AnimatedSection
          delay={100}
          variant="fadeUp"
          stagger
          staggerDelay={120}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border/60 rounded-xl overflow-hidden"
        >
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`relative p-8 md:p-10 ${index < steps.length - 1
                ? 'border-b lg:border-b-0 lg:border-r border-border/60'
                : ''
                } group card-hover`}
            >
              {/* Large faded step number */}
              <span className="absolute top-4 right-4 text-6xl font-serif font-bold text-border/30 select-none leading-none">
                {step.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </AnimatedSection>

        {/* CTA link — fade in */}
        <AnimatedSection delay={600} variant="fadeIn">
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="link-arrow text-primary font-medium"
            >
              Explore our process
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
