import { Link } from 'react-router-dom';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

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
      'Dedicated account manager',
      '90-day support + optimization',
    ],
    cta: 'Book a Call',
    featured: false,
  },
];

export const PricingPreview = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Pricing</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              Investment Levels
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing with no hidden fees. Choose the package that fits your growth goals.
            </p>
          </div>
        </AnimatedSection>

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

        <AnimatedSection delay={400}>
          <p className="text-center text-muted-foreground mt-8">
            Need something custom?{' '}
            <Link to="/contact" className="text-primary hover:underline font-medium">
              Let's talk about your specific needs →
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
