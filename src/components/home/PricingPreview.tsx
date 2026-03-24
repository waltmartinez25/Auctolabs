import { Link } from 'react-router-dom';
import { CheckLg, ArrowRight } from 'react-bootstrap-icons';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Launch',
    price: '$3,500',
    retainer: '$1,500/mo',
    description: 'A conversion-ready website that gets your business found and generates consistent inquiries.',
    features: [
      'Pages included',
      'Mobile-responsive design',
      'On-page SEO setup',
      'Contact form + analytics',
    ],
    popular: false,
  },
  {
    name: 'Grow',
    price: '$7,500',
    retainer: '$2,500/mo',
    description: 'Everything in Launch, plus a fully automated lead pipeline — AI qualification, CRM sync, and speed-to-lead under 60 seconds.',
    features: [
      'Everything in Launch',
      'AI-assisted qualification workflows',
      'CRM integration',
      'Speed-to-lead automation',
      'Email & SMS sequences',
      'Advanced automation workflows',
    ],
    popular: true,
  },
  {
    name: 'Scale',
    price: '$15,000',
    retainer: '$4,000/mo',
    description: 'Full-stack growth infrastructure with custom integrations, dedicated strategy, and unlimited optimization.',
    features: [
      'Everything in Grow',
      'Custom integrations',
      'Dedicated account manager',
      'Quarterly strategy reviews',
    ],
    popular: false,
  },
];

export const PricingPreview = () => {
  return (
    <section className="section-padding bg-secondary/20 border-t border-border/40">
      <div className="container-custom">
        <AnimatedSection variant="fadeRight">
          <div className="uxis-split mb-16">
            <div className="section-heading-left">
              <span className="section-label">Pricing</span>
              <h2>Investment Levels</h2>
              <p>
                Every business is different, and so is every website we build.
                Our pricing reflects the level of strategy, design, and systems
                required to create a website that truly supports your growth.
                Choose the option that fits where you are today — and where
                you're going next.
              </p>
            </div>
            <div />
          </div>
        </AnimatedSection>

        <AnimatedSection
          delay={100}
          variant="fadeUp"
          stagger
          staggerDelay={120}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`soft-card p-8 flex flex-col relative ${
                plan.popular ? 'border-primary/40 ring-1 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                {plan.name}
              </h3>
              <div className="mb-1">
                <span className="text-4xl font-serif font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-sm text-muted-foreground ml-2">one-time</span>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                + {plan.retainer} retainer (optional)
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckLg className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild variant={plan.popular ? 'hero' : 'outline'} className="w-full">
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </AnimatedSection>

        <AnimatedSection delay={400} variant="fadeIn">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 text-sm text-muted-foreground">
            <Link to="/pricing" className="link-arrow text-primary font-medium">
              View full pricing details
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="hidden sm:block text-border">·</span>
            <Link to="/contact" className="hover:text-primary transition-colors">
              Need something custom? Let's talk
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
