import { AnimatedSection } from '@/components/ui/AnimatedSection';

const metrics = [
  {
    value: '<60s',
    label: 'Speed to Lead',
    description: 'Average response time to new inquiries',
    accent: 'text-accent',
  },
  {
    value: '340%',
    label: 'Contact Rate Increase',
    description: 'Average improvement in qualified conversations',
    accent: 'text-primary',
  },
  {
    value: '67%',
    label: 'More Meetings',
    description: 'Increase in booked consultations',
    accent: 'text-primary',
  },
  {
    value: '15hrs',
    label: 'Saved Weekly',
    description: 'On average per team member',
    accent: 'text-contrast',
  },
];

export const MetricsSection = () => {
  return (
    <section className="section-padding border-t border-border/40">
      <div className="container-custom">
        {/* Heading — fade left (slides from right) */}
        <AnimatedSection variant="fadeLeft">
          <div className="mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">
              Results That Matter
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight">
              Value in Numbers
            </h2>
          </div>
        </AnimatedSection>

        {/* Full-width counter row — stagger each metric */}
        <AnimatedSection
          delay={100}
          variant="fadeUp"
          stagger
          staggerDelay={150}
          className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          <div className="absolute -inset-40 bg-primary/5 blur-[100px] rounded-full -z-10 animate-pulse-soft" />
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`group glass-card py-8 px-4 sm:py-12 sm:px-8 rounded-3xl text-center hover:scale-[1.03] transition-all duration-500 ${metric.accent === 'text-accent' ? 'hover:border-accent/40' : 'hover:border-contrast/40'
                }`}
            >
              <span className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-black leading-none block mb-4 sm:mb-6 transition-all duration-500 group-hover:scale-110 drop-shadow-xl ${metric.accent === 'text-accent' ? 'text-accent accent-glow' : 'text-contrast contrast-glow'
                }`}>
                {metric.value}
              </span>
              <span className="text-sm md:text-base font-bold uppercase tracking-widest text-foreground block mb-3 opacity-90 group-hover:opacity-100">
                {metric.label}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium mx-auto max-w-[200px]">
                {metric.description}
              </p>
            </div>
          ))}
        </AnimatedSection>

      </div>
    </section>
  );
};
