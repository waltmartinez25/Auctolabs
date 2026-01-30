import { Link } from 'react-router-dom';
import { Search, Wrench, Bot, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    subtitle: 'Week 1',
    description: 'We deep-dive into your current systems to identify exactly where leads are falling through the cracks.',
    activities: [
      'Review current website and conversion paths',
      'Analyze lead response times and follow-up sequences',
      'Map existing tech stack and integrations',
      'Identify quick wins and major opportunities',
      'Deliver comprehensive audit report with recommendations',
    ],
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Build',
    subtitle: 'Weeks 2-4',
    description: 'We design and develop your conversion-optimized website with clear messaging and strategic CTAs.',
    activities: [
      'Custom website design and development',
      'Mobile-responsive implementation',
      'SEO optimization and page speed tuning',
      'CMS setup for easy content management',
      'Integration with existing tools and platforms',
    ],
  },
  {
    number: '03',
    icon: Bot,
    title: 'Automate',
    subtitle: 'Weeks 4-5',
    description: 'We connect AI-powered automation workflows that handle lead qualification, routing, and follow-up.',
    activities: [
      'AI chatbot or qualification system setup',
      'CRM integration and data flow configuration',
      'Email/SMS automation sequences',
      'Speed-to-lead system implementation',
      'Appointment scheduling automation',
    ],
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimize',
    subtitle: 'Ongoing',
    description: 'We monitor performance, analyze data, and continuously refine the system for maximum results.',
    activities: [
      'Performance monitoring and reporting',
      'A/B testing of key elements',
      'Conversion rate optimization',
      'System refinements based on data',
      'Regular strategy reviews and updates',
    ],
  },
];

const Process = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Our Process</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                A Systematic Approach to<br />
                <span className="gradient-text-warm">Predictable Growth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Every engagement follows our proven methodology: Audit, Build, Automate, Optimize.
                No guesswork. No wasted effort. Just results.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <AnimatedSection key={step.number} delay={index * 100}>
                <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">{step.number}</span>
                      </div>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold">{step.title}</h2>
                        <span className="text-muted-foreground">{step.subtitle}</span>
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className={`soft-card p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex items-center gap-3 mb-6">
                      <step.icon className="w-6 h-6 text-primary" />
                      <h3 className="font-semibold">Key Activities</h3>
                    </div>
                    <ul className="space-y-4">
                      {step.activities.map((activity) => (
                        <li key={activity} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Summary */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Typical Timeline
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Most projects are completed within 4-6 weeks, depending on complexity.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-semibold text-sm">{step.title}</div>
                  <div className="text-xs text-muted-foreground">{step.subtitle}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground mb-8">
                Book a strategy call and we will walk you through how this process
                applies to your specific situation.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book Your Strategy Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Process;
