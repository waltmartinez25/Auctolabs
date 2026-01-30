import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe, Bot, Target, Zap, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Beautiful, fast websites that capture attention and turn visitors into leads.',
    features: [
      'Custom responsive design',
      'Lightning-fast performance',
      'SEO-optimized structure',
      'Conversion-focused layouts',
      'Mobile-first approach',
      'Brand-aligned aesthetics',
    ],
  },
  {
    id: 'ai-automations',
    icon: Bot,
    title: 'AI Automations',
    description: 'Smart workflows that handle repetitive tasks so you can focus on what matters.',
    features: [
      'Lead qualification bots',
      'Automated email sequences',
      'SMS follow-up systems',
      'CRM integration',
      'Appointment scheduling',
      'Data sync workflows',
    ],
  },
  {
    id: 'lead-generation',
    icon: Target,
    title: 'Lead Generation Systems',
    description: 'End-to-end systems that attract and nurture prospects automatically.',
    features: [
      'Landing page creation',
      'Lead magnet setup',
      'Funnel optimization',
      'A/B testing',
      'Analytics tracking',
      'Conversion optimization',
    ],
  },
  {
    id: 'performance-systems',
    icon: Zap,
    title: 'Performance Systems',
    description: 'Speed-to-lead response and real-time analytics for consistent growth.',
    features: [
      'Instant lead response',
      'Performance dashboards',
      'KPI tracking',
      'Team notifications',
      'Lead scoring',
      'ROI reporting',
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Our Services</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                Everything You Need to <span className="gradient-text-warm">Grow Online</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From stunning websites to smart automations, we build complete systems that work together to generate and convert leads.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-24">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 50}>
                <div id={service.id} className="scroll-mt-24">
                  <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">{service.title}</h2>
                      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{service.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-primary shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild>
                        <Link to="/contact">
                          Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <div className={`soft-card p-8 bg-gradient-to-br from-primary/5 to-accent/5 min-h-[300px] flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <service.icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss which services are right for your business.
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

export default Services;
