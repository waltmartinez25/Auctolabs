import { Clock, TrendingUp, Users, Zap } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const metrics = [
  {
    icon: Clock,
    value: '<60s',
    label: 'Speed to Lead',
    description: 'Average response time to new inquiries',
  },
  {
    icon: TrendingUp,
    value: '340%',
    label: 'Contact Rate Increase',
    description: 'Average improvement in qualified conversations',
  },
  {
    icon: Users,
    value: '67%',
    label: 'More Meetings',
    description: 'Increase in booked consultations',
  },
  {
    icon: Zap,
    value: '15hrs',
    label: 'Saved Weekly',
    description: 'On average per team member',
  },
];

export const MetricsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Results That Matter</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              Real Outcomes,<br />Not Empty Promises
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our clients see genuine improvements in lead response time, conversion rates, and team efficiency.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <AnimatedSection key={metric.label} delay={index * 100}>
              <div className="stat-card">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-serif font-bold text-primary mb-2">{metric.value}</div>
                <div className="font-semibold text-foreground mb-1">{metric.label}</div>
                <p className="text-sm text-muted-foreground">{metric.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
