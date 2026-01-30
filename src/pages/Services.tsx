import { Link } from 'react-router-dom';
import { Globe, Bot, Target, Zap, ArrowRight, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const services = [
  {
    id: 'web-design',
    icon: Globe,
    title: 'Web Design & Development',
    description: 'High-converting websites built for speed, clarity, and results.',
    longDescription: 'We design and develop custom websites that are optimized for conversion from day one. Every element serves a purpose: clear messaging, strategic CTAs, fast load times, and mobile-first design that captures leads effectively.',
    features: [
      'Custom design tailored to your brand',
      'Mobile-responsive across all devices',
      'Optimized for page speed (90+ Lighthouse score)',
      'SEO-ready architecture',
      'Conversion-focused UX/UI',
      'CMS integration for easy updates',
    ],
  },
  {
    id: 'ai-automations',
    icon: Bot,
    title: 'AI Automations',
    description: 'Smart workflows that handle lead qualification, routing, and follow-up automatically.',
    longDescription: 'Powered by n8n and custom AI integrations, we build automation systems that respond to leads instantly, qualify prospects based on your criteria, route them to the right team members, and nurture them through personalized sequences.',
    features: [
      'AI-powered lead qualification',
      'Instant response systems (<60 seconds)',
      'CRM integration (HubSpot, Salesforce, Pipedrive, etc.)',
      'Email/SMS automation sequences',
      'Intelligent lead routing',
      'Appointment scheduling automation',
    ],
  },
  {
    id: 'lead-generation',
    icon: Target,
    title: 'Lead Generation Systems',
    description: 'End-to-end systems that attract, capture, and convert prospects at scale.',
    longDescription: 'We build complete lead generation systems that work 24/7. From landing pages and lead magnets to multi-channel follow-up sequences, every component is designed to fill your pipeline with qualified prospects.',
    features: [
      'High-converting landing pages',
      'Lead magnet strategy and creation',
      'Multi-channel capture (forms, chat, phone)',
      'Automated nurture sequences',
      'Lead scoring and qualification',
      'Analytics and attribution tracking',
    ],
  },
  {
    id: 'performance-systems',
    icon: Zap,
    title: 'Performance Systems',
    description: 'SLA-driven systems that ensure every lead gets a fast, consistent response.',
    longDescription: 'Speed wins deals. Our performance systems guarantee response time SLAs, track every interaction, and provide real-time dashboards so you always know how your lead handling is performing.',
    features: [
      'Speed-to-lead SLAs (configurable targets)',
      'Real-time performance dashboards',
      'Automated escalation workflows',
      'Team performance tracking',
      'Response time monitoring',
      'Continuous optimization',
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Services</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Everything You Need to<br />
                <span className="gradient-text-warm">Automate Growth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                From websites that convert to AI systems that never sleep.
                We build complete growth infrastructure for modern businesses.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-secondary/30' : ''}`}
        >
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{service.title}</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.longDescription}
                </p>
                <Button asChild>
                  <Link to="/contact">
                    Discuss Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection delay={100} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="soft-card p-8">
                  <h3 className="font-semibold mb-6">What's Included</h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Not Sure What You Need?
              </h2>
              <p className="text-muted-foreground mb-8">
                Book a free strategy call and we will help you identify the biggest opportunities
                in your current lead generation and follow-up systems.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book a Free Strategy Call
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

export default Services;
