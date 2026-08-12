import { Link } from 'react-router-dom';
import { ArrowRight, CheckLg, XLg } from 'react-bootstrap-icons';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { pageBreadcrumb } from '@/lib/breadcrumbs';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { LaneCards } from '@/components/pricing/LaneCards';

const capabilities = [
  'Custom lead routing and qualification logic',
  'Advanced multi-step automation workflows',
  'CRM customization and pipeline structuring',
  'API integrations between tools and platforms',
  'Internal workflow automation (sales, ops, support)',
  'AI-powered chat and response systems',
  'Custom dashboards and reporting systems',
];

const integrationsList = [
  'CRMs (HubSpot, Salesforce, Pipedrive)',
  'Communication (Twilio, email, SMS platforms)',
  'Scheduling (Calendly, booking systems)',
  'Marketing tools and ad platforms',
  'Internal databases and custom APIs',
  'Automation platforms (Zapier, Make, and more)',
];

const outcomes = [
  'Reduces manual work',
  'Eliminates delays',
  'Improves accuracy',
  'Scales with your business',
];

type ComparisonValue = 'yes' | 'no' | 'text';
const comparisonRows: { feature: string; auctolabs: string; aval: ComparisonValue; freelancer: string; fval: ComparisonValue; inhouse: string; ival: ComparisonValue; diy: string; dval: ComparisonValue }[] = [
  { feature: 'Launch timeline',        auctolabs: '4–6 weeks',     aval: 'yes', freelancer: '8–16 weeks',  fval: 'text', inhouse: '3–6 months',  ival: 'text', diy: '1–2 days',      dval: 'text' },
  { feature: 'Automation included',    auctolabs: 'Included',      aval: 'yes', freelancer: 'Extra cost',  fval: 'no',   inhouse: 'Extra hire',   ival: 'no',   diy: 'Not available', dval: 'no'   },
  { feature: 'CRM integration',        auctolabs: 'Included',      aval: 'yes', freelancer: 'Extra cost',  fval: 'no',   inhouse: 'Extra cost',   ival: 'no',   diy: 'Not available', dval: 'no'   },
  { feature: 'Speed-to-lead <60s',     auctolabs: 'Standard',      aval: 'yes', freelancer: 'Not offered', fval: 'no',   inhouse: 'Varies',       ival: 'text', diy: 'Not available', dval: 'no'   },
  { feature: 'Ongoing optimization',   auctolabs: 'Optional retainer', aval: 'yes', freelancer: 'Not included', fval: 'no', inhouse: 'Ongoing cost', ival: 'text', diy: 'Self-managed', dval: 'text' },
  { feature: 'Single point of contact', auctolabs: 'Always',       aval: 'yes', freelancer: 'Usually',    fval: 'yes',  inhouse: 'Multiple hires',ival: 'no',   diy: 'Self-serve',    dval: 'text' },
  { feature: 'Proven results',         auctolabs: 'Tracked & reported', aval: 'yes', freelancer: 'Varies', fval: 'text', inhouse: 'Varies',      ival: 'text', diy: 'Not tracked',   dval: 'no'   },
];

const addOns = [
  { name: 'Monthly Retainer', description: 'Ongoing optimization, support, and system improvements' },
  { name: 'Additional Pages', description: 'Extra pages beyond the agreed scope' },
  { name: 'Content Writing', description: 'Professional copywriting for your pages' },
  { name: 'Custom Integration', description: 'Connect additional tools and platforms' },
];

const pricingSchema = {
  "@type": "Product",
  "name": "AuctoLabs Web Design & Automation Services",
  "description": "Web design and AI automation packages for small businesses",
  // No `price` / `priceCurrency`: scope is quoted per engagement, and a
  // structured price here can surface in search results even though the page
  // itself shows none. `Offer` stays valid without them.
  "offers": [
    {
      "@type": "Offer",
      "name": "Launch",
      "description": "Fixed-scope build: conversion-focused website plus lead automation, live in 4–6 weeks",
      "availability": "https://schema.org/InStock"
    },
    {
      "@type": "Offer",
      "name": "Partner",
      "description": "Month-to-month partnership: ongoing optimization, new pages and campaign assets, automation tuning",
      "availability": "https://schema.org/InStock"
    }
  ]
};

// Page schema plus FAQs. Answers are written to stand alone in the
// first 30-50 words, which is the span answer engines extract.
const pricingSchemaFaq = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does an AuctoLabs project cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Scope is quoted per engagement after a free strategy call, so there are no fixed package prices. Cost depends on how many pages, integrations and automation workflows the build needs." }
    },
    {
      "@type": "Question",
      "name": "What is the difference between Launch and Partner?",
      "acceptedAnswer": { "@type": "Answer", "text": "Launch is a fixed-scope build that goes live in 4 to 6 weeks and is handed over complete. Partner is month to month for ongoing optimisation, new pages and automation tuning after launch." }
    },
    {
      "@type": "Question",
      "name": "Is there a long-term contract?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Launch is a one-time fixed scope. Partner is month to month and can be stopped at any time. The system stays yours either way." }
    },
    {
      "@type": "Question",
      "name": "How long until the system is live?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most builds launch in 4 to 6 weeks, covering audit, design, development, automation setup and integration testing. Lead response is running from the day the site goes live." }
    }
  ]
};

const pricingSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [pricingSchema, pricingSchemaFaq, pageBreadcrumb('Pricing')]
};

const Pricing = () => {
  return (
    <Layout>
      <SEO
        title="AuctoLabs Pricing: Web Design & Automation"
        description="Two ways to work together: Launch, a fixed-scope build live in 4–6 weeks, or Partner, month-to-month. No long-term contracts."
        keywords="web design pricing, automation pricing, lead generation, website development, AI automation packages"
        canonical="https://auctolabs.com/pricing"
        jsonLd={pricingSchemaGraph}
      />
      
      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="AuctoLabs: Two Ways to Work Together"
        purpose="This page explains the two ways to engage AuctoLabs: Launch, a fixed-scope build that goes live in 4–6 weeks, and Partner, a month-to-month arrangement for ongoing optimization. Scope is quoted per engagement after a strategy call, so no package prices are listed."
        audience="Small business owners, marketing managers, and decision-makers evaluating web design and automation partners"
        services={[
          "Launch: fixed-scope build. Audit, conversion-focused website, lead automation, CRM and calendar integration, full handover. Live in 4–6 weeks.",
          "Partner: month-to-month. Ongoing optimization and testing, new pages and campaign assets, automation tuning, direct access with no account managers.",
          "Add-ons available: monthly retainer, additional pages, content writing, custom integrations."
        ]}
      />

      <HiddenStructuredFacts
        facts={{
          "Engagement models": "Two options: Launch (fixed-scope build) and Partner (month-to-month ongoing work)",
          "Launch includes": "Audit, conversion-focused website, lead automation, speed-to-lead under 2 minutes, CRM and calendar integration, full handover",
          "Launch timeline": "Live in 4–6 weeks",
          "Partner includes": "Ongoing optimization and testing, new pages and campaign assets, automation tuning, direct access without account managers",
          "Partner terms": "Month-to-month, no long-term contracts",
          "How pricing works": "Scope is quoted per engagement after a free strategy call. No fixed package prices",
          "Add-ons available": "Monthly retainer, additional pages, content writing, custom integrations",
          "Guarantee": "If we don't deliver qualified leads within 60 days of launch, the final invoice waits until we do"
        }}
      />
      
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">Working Together</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                Pick your <em>lane.</em>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
                No packages to squeeze into and no long-term contracts. Every build is
                scoped to the business it serves, so the honest answer to &ldquo;what
                does it cost?&rdquo; starts with a conversation.
              </p>
              <p className="text-base font-semibold text-foreground mb-10 max-w-xl mx-auto">
                Choose how you want to work with us. We&apos;ll shape the rest around your business.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* The two lanes */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <AnimatedSection variant="fadeUp" delay={100}>
            <LaneCards source="pricing" />
          </AnimatedSection>
        </div>
      </section>

      {/* Performance guarantee strip */}
      <section className="pb-2 pt-0">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto px-4">
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <CheckLg className="w-4 h-4 text-primary shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-semibold">Our guarantee:</span>{' '}
                If we don't deliver qualified leads within 60 days of your website launch, you don't pay the final invoice until we do.
              </p>
            </div>
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
                Every engagement starts with a plan and grows from there. Add only what moves the needle.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, i) => (
                <div key={addon.name} className={`soft-card p-6 glow-${(i % 4) + 1}`}>
                  <h3 className="text-sm font-serif font-semibold mb-2">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground">{addon.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison */}
      <section className="section-padding border-t border-border/40">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-5 block">Why AuctoLabs</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                One investment.<br />
                <em>The complete growth infrastructure.</em>
              </h2>
              <p className="text-muted-foreground">
                Most businesses pay more for less. Here's why our clients switch, and stay.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={100}>
            <div className="soft-card rounded-2xl overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="text-left py-4 px-5 font-semibold text-foreground w-[28%]">Feature</th>
                    <th className="py-4 px-4 text-center font-bold text-primary bg-primary/5 border-x border-primary/20">
                      <span className="block text-xs uppercase tracking-widest mb-0.5 font-bold">AuctoLabs</span>
                    </th>
                    <th className="py-4 px-4 text-center font-medium text-muted-foreground">Freelancer</th>
                    <th className="py-4 px-4 text-center font-medium text-muted-foreground">In-House Hire</th>
                    <th className="py-4 px-4 text-center font-medium text-muted-foreground">DIY Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={`border-b border-border/30 ${i % 2 === 0 ? '' : 'bg-secondary/10'}`}>
                      <td className="py-4 px-5 font-medium text-foreground text-sm">{row.feature}</td>
                      <td className="py-4 px-4 text-center bg-primary/5 border-x border-primary/20">
                        <div className="flex flex-col items-center gap-1">
                          {row.aval === 'yes' && <CheckLg className="w-4 h-4 text-primary shrink-0" />}
                          {row.aval === 'no'  && <XLg className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
                          <span className="text-xs font-semibold text-foreground leading-tight">{row.auctolabs}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {row.fval === 'yes' && <CheckLg className="w-4 h-4 text-primary shrink-0" />}
                          {row.fval === 'no'  && <XLg className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
                          <span className="text-xs text-muted-foreground leading-tight">{row.freelancer}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {row.ival === 'yes' && <CheckLg className="w-4 h-4 text-primary shrink-0" />}
                          {row.ival === 'no'  && <XLg className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
                          <span className="text-xs text-muted-foreground leading-tight">{row.inhouse}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          {row.dval === 'yes' && <CheckLg className="w-4 h-4 text-primary shrink-0" />}
                          {row.dval === 'no'  && <XLg className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />}
                          <span className="text-xs text-muted-foreground leading-tight">{row.diy}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Custom Systems */}
      <section className="section-padding border-t border-border/40">
        <div className="container-custom">

          {/* Heading + intro */}
          <AnimatedSection>
            <div className="max-w-3xl mb-14">
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-5 block">
                Custom Systems
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-6">
                Built Around Your Business,<br className="hidden sm:block" /> Not Templates
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-3 max-w-2xl">
                Every business runs differently. That's why we don't rely on rigid templates or one-size-fits-all setups.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                We build the workflow around how your business actually runs, so everything works together seamlessly.
              </p>
            </div>
          </AnimatedSection>

          {/* Two-col: What We Can Build + Common Integrations */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <AnimatedSection variant="fadeUp" delay={100}>
              <div className="soft-card p-8 h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  What We Can Build
                </p>
                <ul className="space-y-3.5">
                  {capabilities.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={180}>
              <div className="soft-card p-8 h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                  Common Integrations
                </p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  We work with tools across your entire stack, including:
                </p>
                <ul className="space-y-3.5">
                  {integrationsList.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" aria-hidden="true" />
                      <span className="text-sm font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Why This Matters — callout + CTA */}
          <AnimatedSection variant="fadeUp" delay={260}>
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-8 md:p-10">
              <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-4">
                    Why This Matters
                  </p>
                  <p className="text-base font-semibold text-foreground mb-2 max-w-xl">
                    Most businesses lose time and revenue because their systems don't talk to each other.
                  </p>
                  <p className="text-sm text-muted-foreground mb-7 max-w-xl leading-relaxed">
                    We connect it all into one system that:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {outcomes.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckLg className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-semibold text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 lg:self-center">
                  <Button asChild variant="hero" size="lg">
                    <Link to="/contact">
                      Discuss Custom Requirements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
