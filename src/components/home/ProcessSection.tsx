import { Search, Wrench, Bot, TrendingUp } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    description: 'We analyze your current setup, identify bottlenecks, and map out where leads are slipping through the cracks.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Build',
    description: 'We design and develop a beautiful website with clear messaging, fast load times, and conversion-focused design.',
  },
  {
    number: '03',
    icon: Bot,
    title: 'Automate',
    description: 'We connect smart automations for instant lead response, qualification workflows, and CRM integration.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimize',
    description: 'We continuously monitor performance, test improvements, and refine the system for maximum results.',
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">How It Works</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              A Proven Process for<br />Predictable Growth
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a systematic approach that transforms your online presence into a revenue-generating asset.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 100}>
                <div className="soft-card p-6 text-center relative bg-background">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary mb-2 block">{step.number}</span>
                  <h3 className="text-lg font-serif font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
