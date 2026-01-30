import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Wrench, Bot, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Audit',
    duration: 'Week 1',
    description: 'We start by understanding your business, goals, and current challenges.',
    details: [
      'Deep-dive strategy call',
      'Current systems audit',
      'Competitor analysis',
      'Opportunity identification',
      'Goal setting & KPIs',
    ],
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Design & Build',
    duration: 'Weeks 2-4',
    description: 'We design and develop your custom website and systems.',
    details: [
      'Brand-aligned design concepts',
      'Mobile-first development',
      'Content creation support',
      'Performance optimization',
      'Revision rounds included',
    ],
  },
  {
    number: '03',
    icon: Bot,
    title: 'Automation Setup',
    duration: 'Weeks 3-5',
    description: 'We connect smart automations to power your lead generation.',
    details: [
      'CRM integration',
      'Lead qualification workflows',
      'Email/SMS sequences',
      'Appointment scheduling',
      'Speed-to-lead system',
    ],
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Launch & Optimize',
    duration: 'Week 6+',
    description: 'We launch your system and continuously optimize for results.',
    details: [
      'Soft launch testing',
      'Team training sessions',
      'Performance monitoring',
      'A/B testing',
      'Ongoing optimization',
    ],
  },
];

const Process = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Our Process</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                A Proven Path to <span className="gradient-text-warm">Predictable Growth</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our systematic approach ensures your project is delivered on time and exceeds expectations.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedSection key={step.title} delay={index * 100}>
                <div className="soft-card p-8 lg:p-12">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Step Info */}
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <step.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-primary block">{step.number}</span>
                          <span className="text-sm text-muted-foreground">{step.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-3 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-foreground mb-4">What's Included:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.details.map((detail) => (
                          <li key={detail} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Typical Timeline
              </h2>
              <p className="text-lg text-muted-foreground">
                Most projects are completed within 4-6 weeks from kickoff to launch.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="soft-card p-8 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">1-2</div>
                  <div className="text-sm text-muted-foreground">Days to kickoff</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">4-6</div>
                  <div className="text-sm text-muted-foreground">Weeks to launch</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">30</div>
                  <div className="text-sm text-muted-foreground">Days of support</div>
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">∞</div>
                  <div className="text-sm text-muted-foreground">Results forever</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book a call to discuss your goals and see how we can help.
              </p>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Book a Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
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
