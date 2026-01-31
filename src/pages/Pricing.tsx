import { Link } from 'react-router-dom';
import { Check, ArrowRight, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const plans = [
  {
    name: 'Starter',
    price: '$3,500',
    period: 'one-time',
    description: 'For businesses ready to upgrade their online presence with a professional, conversion-focused website.',
    features: [
      'Custom 5-page website design',
      'Mobile-responsive development',
      'Basic SEO optimization',
      'Contact form with email notifications',
      'Google Analytics setup',
      '30-day post-launch support',
    ],
    notIncluded: [
      'AI automation workflows',
      'CRM integration',
      'Speed-to-lead system',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: '$7,500',
    period: 'one-time',
    description: 'For businesses ready to automate lead generation and follow-up with AI-powered systems.',
    features: [
      'Everything in Starter',
      'Up to 10 pages',
      'AI lead qualification chatbot',
      'CRM integration (HubSpot, Pipedrive, etc.)',
      'Automated email/SMS sequences',
      'Speed-to-lead system (<60s response)',
      'Lead routing workflows',
      '60-day support + training',
    ],
    notIncluded: [
      'Advanced n8n workflows',
      'Multi-channel attribution',
      'Dedicated account manager',
    ],
    cta: 'Book a Call',
    featured: true,
  },
  {
    name: 'Scale',
    price: '$15,000',
    period: 'one-time',
    description: 'For firms ready for enterprise-grade automation systems and dedicated support.',
    features: [
      'Everything in Growth',
      'Unlimited pages',
      'Advanced n8n automation workflows',
      'Custom lead routing logic',
      'Multi-channel attribution tracking',
      'Custom integrations',
      'Dedicated account manager',
      '90-day support + optimization',
      'Quarterly strategy reviews',
    ],
    notIncluded: [],
    cta: 'Book a Call',
    featured: false,
  },
];

const addOns = [
  { name: 'Monthly Retainer', price: 'From $1,500/mo', description: 'Ongoing optimization, support, and system improvements' },
  { name: 'Additional Pages', price: '$300/page', description: 'Extra pages beyond package limits' },
  { name: 'Content Writing', price: '$500/page', description: 'Professional copywriting for your pages' },
  { name: 'Custom Integration', price: 'From $1,000', description: 'Connect additional tools and platforms' },
];

const pricingSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "AuctoLabs Web Design & Automation Services",
  "description": "Web design and AI automation packages for small businesses",
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "3500",
      "priceCurrency": "USD",
      "description": "Custom 5-page website with basic SEO"
    },
    {
      "@type": "Offer",
      "name": "Growth",
      "price": "7500",
      "priceCurrency": "USD",
      "description": "Website + AI automation with CRM integration"
    },
    {
      "@type": "Offer",
      "name": "Scale",
      "price": "15000",
      "priceCurrency": "USD",
      "description": "Enterprise-grade automation with dedicated support"
    }
  ]
};

const Pricing = () => {
  return (
    <Layout>
      <SEO
        title="Pricing - Transparent Investment, Measurable Returns"
        description="AuctoLabs pricing: Starter from $3,500, Growth from $7,500, Scale from $15,000. No hidden fees, no long-term contracts. Get a custom quote today."
        keywords="web design pricing, automation pricing, lead generation cost, website development prices, AI automation packages"
        canonical="https://auctolabs.com/pricing"
        jsonLd={pricingSchema}
      />
      
      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="AuctoLabs Pricing - Web Design and Automation Packages"
        purpose="This page shows transparent pricing for AuctoLabs web design and AI automation services. Three packages available: Starter ($3,500), Growth ($7,500), and Scale ($15,000). All packages are one-time payments with no long-term contracts."
        audience="Small business owners, marketing managers, and decision-makers comparing web design and automation service pricing"
        services={[
          "Starter Package: $3,500 one-time - 5-page custom website, mobile-responsive, basic SEO, 30-day support",
          "Growth Package: $7,500 one-time - 10 pages, AI chatbot, CRM integration, speed-to-lead system, 60-day support",
          "Scale Package: $15,000 one-time - Unlimited pages, advanced automation, dedicated account manager, 90-day support"
        ]}
      />
      
      <HiddenStructuredFacts
        facts={{
          "Starter Package price": "$3,500 one-time",
          "Starter Package includes": "5-page custom website, mobile-responsive design, basic SEO, contact form, Google Analytics, 30-day support",
          "Growth Package price": "$7,500 one-time (Most Popular)",
          "Growth Package includes": "10 pages, AI lead qualification chatbot, CRM integration, email/SMS automation, speed-to-lead under 60 seconds, 60-day support",
          "Scale Package price": "$15,000 one-time",
          "Scale Package includes": "Unlimited pages, advanced n8n workflows, multi-channel attribution, dedicated account manager, 90-day support, quarterly strategy reviews",
          "Monthly Retainer add-on": "From $1,500/month for ongoing optimization",
          "Additional Pages add-on": "$300 per page",
          "Content Writing add-on": "$500 per page",
          "Custom Integration add-on": "From $1,000",
          "Payment terms": "No long-term contracts, one-time payment",
          "Custom pricing": "Available for enterprise requirements"
        }}
      />
      
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Pricing</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Transparent Investment,<br />
                <span className="gradient-text-warm">Measurable Returns</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                No hidden fees. No long-term contracts. Just clear pricing for systems
                that pay for themselves.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan, index) => (
              <AnimatedSection key={plan.name} delay={index * 100}>
                <div
                  className={`h-full rounded-2xl p-8 flex flex-col ${
                    plan.featured
                      ? 'bg-gradient-to-b from-primary/20 to-primary/5 border-2 border-primary/50 shadow-soft-lg'
                      : 'soft-card'
                  }`}
                >
                  {plan.featured && (
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground mb-4 w-fit">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-serif font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-serif font-bold">{plan.price}</span>
                    <span className="text-muted-foreground"> {plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm mb-4">What's Included</h4>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <>
                        <h4 className="font-semibold text-sm mb-4 text-muted-foreground">Not Included</h4>
                        <ul className="space-y-3 mb-6">
                          {plan.notIncluded.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                              <span className="w-5 h-5 shrink-0 mt-0.5 text-center">—</span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <Button
                    asChild
                    variant={plan.featured ? 'hero' : 'outline'}
                    className="w-full mt-auto"
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
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Add-Ons & Extras</h2>
              <p className="text-muted-foreground">
                Customize your package with additional services.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon) => (
                <div key={addon.name} className="soft-card p-6">
                  <h3 className="font-semibold mb-2">{addon.name}</h3>
                  <p className="text-primary font-bold mb-2">{addon.price}</p>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Need Something Custom?
              </h2>
              <p className="text-muted-foreground mb-8">
                Enterprise requirements? Complex integrations? Multi-location deployment?
                Let's discuss a custom solution tailored to your needs.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Discuss Custom Requirements
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

export default Pricing;
