import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$3,500',
    description: 'Perfect for businesses ready to upgrade their online presence',
    features: [
      'Custom 5-page website',
      'Mobile-responsive design',
      'Basic SEO optimization',
      'Contact form with email notifications',
      'Google Analytics setup',
      '30-day support',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$7,500',
    description: 'For businesses ready to automate lead generation',
    features: [
      'Everything in Starter',
      'AI lead qualification chatbot',
      'CRM integration (HubSpot, Pipedrive, etc.)',
      'Automated email/SMS sequences',
      'Speed-to-lead system (<60s response)',
      'Appointment scheduling integration',
      '60-day support + training',
    ],
    cta: 'Book a Call',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$15,000',
    description: 'For growing businesses ready for enterprise systems',
    features: [
      'Everything in Growth',
      'Advanced automation workflows',
      'Custom lead routing logic',
      'Multi-channel attribution tracking',
      'Custom reporting dashboard',
      'Dedicated account manager',
      '90-day support + optimization',
    ],
    cta: 'Book a Call',
    featured: false,
  },
];

const addOns = [
  { name: 'Monthly Retainer', price: '$1,500/mo', description: 'Ongoing optimization & support' },
  { name: 'Additional Pages', price: '$500/page', description: 'Extra website pages' },
  { name: 'Content Creation', price: '$2,000', description: 'Professional copywriting' },
  { name: 'Advanced Analytics', price: '$1,000', description: 'Custom tracking & reporting' },
];

const Pricing = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Pricing</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                Simple, Transparent <span className="gradient-text-warm">Pricing</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Choose the package that fits your growth goals. No hidden fees, no surprises.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 100}>
                <div
                  className={`h-full rounded-2xl p-8 relative ${
                    plan.featured
                      ? 'bg-gradient-to-b from-primary/10 to-background border-2 border-primary/30 shadow-soft-lg'
                      : 'soft-card'
                  }`}
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                        <Sparkles className="w-3 h-3" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-serif font-bold mb-2 text-foreground">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-serif font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm ml-1">one-time</span>
                  </div>
                  <p className="text-muted-foreground mb-6 text-sm">{plan.description}</p>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    variant={plan.featured ? 'hero' : 'outline'}
                    className="w-full"
                  >
                    <Link to="/contact">
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Optional Add-Ons
              </h2>
              <p className="text-lg text-muted-foreground">
                Enhance your package with these additional services.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <AnimatedSection key={addon.name} delay={index * 50}>
                <div className="soft-card p-6 text-center h-full">
                  <h4 className="font-semibold text-foreground mb-2">{addon.name}</h4>
                  <div className="text-2xl font-serif font-bold text-primary mb-2">{addon.price}</div>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Need Something Custom?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every business is unique. Let's discuss your specific requirements.
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

export default Pricing;
