import { Link } from 'react-router-dom';
import { ArrowRight, ChatDots } from 'react-bootstrap-icons';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PricingTable, type PricingFeature, type PricingPlan } from '@/components/ui/pricing-table';

const tablePlans: PricingPlan[] = [
  { name: 'Starter', level: 'starter', price: { monthly: 3500, yearly: 1500 } },
  { name: 'Growth',  level: 'pro',     price: { monthly: 7500, yearly: 2500 }, popular: true },
  { name: 'Scale',   level: 'all',     price: { monthly: 15000, yearly: 4000 } },
];

const tableFeatures: PricingFeature[] = [
  { name: 'Pages Included',              included: 'starter' },
  { name: 'Mobile-Responsive Design',    included: 'starter' },
  { name: 'On-Page SEO Setup',           included: 'starter' },
  { name: 'Contact Form + Analytics',    included: 'starter' },
  { name: 'AI-Assisted Lead Qualification', included: 'pro' },
  { name: 'CRM Integration',               included: 'pro' },
  { name: 'Speed-to-Lead Automation',      included: 'pro' },
  { name: 'Email & SMS Sequences',         included: 'pro' },
  { name: 'Advanced n8n Workflows',        included: 'pro' },
  { name: 'Custom Integrations',         included: 'all' },
  { name: 'Dedicated Account Manager',   included: 'all' },
  { name: 'Quarterly Strategy Reviews',  included: 'all' },
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
        title="AuctoLabs Pricing — Web Design & Automation Packages"
        description="AuctoLabs pricing: Starter from $3,500, Growth from $7,500, Scale from $15,000. No hidden fees, no long-term contracts. Book a free strategy call today."
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
                Transparent Investment.<br />
                <span className="gradient-text-warm">Measurable Returns.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                No hidden fees. No long-term contracts. Just clear pricing for
                systems designed to generate consistent leads and measurable growth.
              </p>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choosing the right system depends on where your business is today — and
                where you want it to go. Each AuctoLabs package combines strategy, design,
                automation, and optimization to create a website that works as a true
                growth asset.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection variant="fadeUp" delay={100}>
            <PricingTable
              plans={tablePlans}
              features={tableFeatures}
              defaultPlan="pro"
              defaultInterval="monthly"
            />
          </AnimatedSection>
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
                  <h3 className="text-sm font-serif font-semibold mb-2">{addon.name}</h3>
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
              <ChatDots className="w-12 h-12 text-primary mx-auto mb-6" />
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
