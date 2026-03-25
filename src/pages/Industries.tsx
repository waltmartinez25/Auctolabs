import { Link } from 'react-router-dom';
import { ArrowRight, CheckLg, Calendar3 } from 'react-bootstrap-icons';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const industries = [
  {
    id: 'law-firms',
    label: 'Law Firms',
    overline: 'Legal Services',
    tagline: 'Speed-to-lead wins cases.',
    pain: 'Every minute you wait to reach a potential client, your competitor is already on the phone. Most law firm inquiries come in after hours — and the first firm to respond gets the case. Without automation, you\'re losing clients to slower competitors who picked up the call.',
    stats: [
      { value: '25%', label: 'increase in qualified leads' },
      { value: '2 min', label: 'average lead response time' },
      { value: '35%', label: 'more booked consultations' },
    ],
    features: [
      'AI-powered case intake and qualification',
      'Instant SMS/email response to new inquiries',
      'CRM integration (Clio, HubSpot, Salesforce)',
      'After-hours automated lead capture',
      'Appointment booking and calendar sync',
    ],
    answerBlock: {
      q: 'Why do law firms lose leads without automation?',
      a: 'Studies show that 78% of clients hire the first attorney who responds. Most inquiries arrive after hours or during client meetings — without an automated response system, those leads go cold before your team sees them.',
    },
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    overline: 'Real Estate & Home Services',
    tagline: 'First to respond gets the listing.',
    pain: '80% of buyers and sellers go with the first agent who responds. Most inquiries come outside business hours — without automation, you\'re handing leads to your competition every night and weekend. A single missed listing can cost $10,000+ in commissions.',
    stats: [
      { value: '2×', label: 'more website inquiries' },
      { value: '2 min', label: 'average first response time' },
      { value: '30%', label: 'more listing or showing requests' },
    ],
    features: [
      'After-hours AI lead qualification',
      'MLS and CRM synchronization',
      'Automated showing scheduling',
      'Buyer and seller nurture sequences',
      'Lead scoring, routing, and follow-up',
    ],
    answerBlock: {
      q: 'How does automation help real estate agents respond faster?',
      a: 'An automated lead response system sends a personalized message within seconds of a new inquiry, 24/7. It qualifies the buyer or seller based on your criteria, then routes qualified leads to you immediately — so no opportunity goes to a competitor.',
    },
  },
  {
    id: 'health-wellness',
    label: 'Health & Wellness',
    overline: 'Healthcare & Wellness Practices',
    tagline: 'Patient acquisition on autopilot.',
    pain: 'Patients research and book online — often at night or on weekends. If your intake process isn\'t automated, they\'ll book with a practice that responds before you even see the request. Manual follow-up means losing patients to more responsive competitors.',
    stats: [
      { value: '20%', label: 'increase in new patient inquiries' },
      { value: '15%', label: 'reduction in no-shows' },
      { value: '40%', label: 'of web leads booking an appointment' },
    ],
    features: [
      'Online booking integration',
      'New patient digital intake forms',
      'Automated appointment reminders',
      'Post-visit follow-up sequences',
      'Review and referral generation',
    ],
    answerBlock: {
      q: 'How can healthcare practices reduce no-shows with automation?',
      a: 'Automated appointment reminders via SMS and email — sent 48 hours, 24 hours, and 2 hours before a visit — reduce no-show rates by 15–25%. Practices using our system also see higher patient satisfaction scores because follow-up care instructions are sent automatically after visits.',
    },
  },
  {
    id: 'b2b',
    label: 'B2B & IT Services',
    overline: 'B2B & Technology Services',
    tagline: 'Systematic pipeline generation at scale.',
    pain: 'B2B sales cycles are long and complex. Without automation, leads go cold before your team can reach them — and manual tasks eat up the hours your team should spend closing deals. The businesses that win are the ones making consistent, timely touches across the entire pipeline.',
    stats: [
      { value: '25%', label: 'more demo or discovery calls' },
      { value: '30%', label: 'reduction in manual follow-up tasks' },
      { value: '<1 day', label: 'average pipeline follow-up time' },
    ],
    features: [
      'Multi-touch outreach sequences',
      'CRM pipeline automation (Salesforce, HubSpot)',
      'Lead scoring, routing, and assignment',
      'Slack and Teams notifications',
      'Custom dashboards and reporting',
    ],
    answerBlock: {
      q: 'What does AI automation actually do for B2B sales pipelines?',
      a: 'AI automation handles the repeatable tasks: sending follow-up sequences, qualifying inbound leads, routing discovery calls to the right rep, and alerting your team when a hot prospect goes quiet. This means your sales team focuses exclusively on high-value conversations and closing — not admin.',
    },
  },
];

const industriesSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Industry-Specific Web Design and AI Automation',
    provider: {
      '@type': 'Organization',
      name: 'AuctoLabs',
      url: 'https://auctolabs.com',
    },
    areaServed: 'Worldwide',
    description: 'AuctoLabs builds custom web design and AI automation systems for law firms, real estate agencies, healthcare practices, and B2B service companies — with speed-to-lead systems that respond in under 60 seconds.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Industry-Specific Growth Systems',
      itemListElement: industries.map((ind) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `AI Automation and Web Design for ${ind.label}`,
          description: ind.pain,
        },
      })),
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://auctolabs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Industries', item: 'https://auctolabs.com/industries' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: industries.map((ind) => ({
      '@type': 'Question',
      name: ind.answerBlock.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: ind.answerBlock.a,
      },
    })),
  },
];

const Industries = () => {
  return (
    <Layout>
      <SEO
        title="Industries We Serve | AuctoLabs — Law Firms, Real Estate, Healthcare, B2B"
        description="AuctoLabs builds AI automation and web design systems for law firms, real estate, healthcare, and B2B services. Industry-specific speed-to-lead systems respond to leads in under 60 seconds, 24/7."
        keywords="law firm automation, real estate lead generation, healthcare patient acquisition, B2B automation, industry-specific web design, AI automation agency"
        canonical="https://auctolabs.com/industries"
        jsonLd={industriesSchema}
      />

      <PageSummary
        topic="AuctoLabs Industries — AI Automation for Law Firms, Real Estate, Healthcare, and B2B"
        purpose="AuctoLabs builds industry-specific web design and AI automation systems for service businesses where speed-to-lead directly impacts revenue. This page explains how our systems work for law firms, real estate agents, healthcare practices, and B2B service providers."
        audience="Law firm principals, real estate brokers, healthcare practice owners, and B2B sales managers looking for automated lead generation and response systems"
        services={[
          'Law Firms: AI case intake, instant response, after-hours lead capture, CRM integration (Clio, HubSpot)',
          'Real Estate: After-hours AI qualification, MLS sync, automated showing scheduling, buyer/seller nurture sequences',
          'Health & Wellness: Online booking integration, automated reminders, post-visit follow-up, review generation',
          'B2B & IT Services: Multi-touch outreach, CRM pipeline automation, lead scoring, custom reporting',
        ]}
      />

      <HiddenStructuredFacts
        facts={{
          'Industries served': 'Law firms, real estate, healthcare and wellness practices, B2B and IT services',
          'Law firm result': '25% more qualified leads, 2-minute average response time, 35% more booked consultations',
          'Real estate result': '2x more website inquiries, 2-minute first response, 30% more showing requests',
          'Healthcare result': '20% more new patient inquiries, 15% reduction in no-shows, 40% web lead booking rate',
          'B2B result': '25% more demo calls, 30% reduction in manual tasks, under 1 day pipeline follow-up',
          'Key differentiator': 'Speed-to-lead — 78% of clients go with the first business to respond',
          'CRM integrations': 'Clio, HubSpot, Salesforce, Pipedrive and more',
          'Service availability': '24/7 automated, including after-hours and weekends',
        }}
      />

      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                Who We Serve
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                Built for businesses that{' '}
                <span className="gradient-text-warm">can't afford to lose leads.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
                Every industry has a different growth bottleneck. We've built systems for four of the most lead-sensitive service businesses — and we know exactly what moves the needle in each.
              </p>
              <p className="text-base font-semibold text-foreground mb-10">
                Jump to your industry, or keep scrolling to see them all.
              </p>
              {/* Anchor chips */}
              <div className="flex flex-wrap gap-3 justify-center">
                {industries.map((ind) => (
                  <a
                    key={ind.id}
                    href={`#${ind.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-background hover:border-primary/40 hover:text-primary text-sm font-medium text-muted-foreground transition-colors"
                  >
                    {ind.label}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Industry sections */}
      {industries.map((industry, i) => {
        const isEven = i % 2 === 0;
        return (
          <section
            key={industry.id}
            id={industry.id}
            className={`section-padding border-b border-border/40${i % 2 !== 0 ? ' bg-secondary/20' : ''}`}
          >
            <div className="container-custom">
              <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-start ${isEven ? '' : 'lg:[&>*:first-child]:order-last'}`}>

                {/* Left — copy */}
                <AnimatedSection variant={isEven ? 'fadeUp' : 'fadeUp'} delay={0}>
                  <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                    {industry.overline}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                    {industry.label}
                  </h2>
                  <p className="text-xl font-semibold text-primary mb-6 italic">
                    {industry.tagline}
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {industry.pain}
                  </p>

                  {/* AEO answer block */}
                  <div className="mb-8 p-5 rounded-xl bg-primary/5 border border-primary/15">
                    <p className="text-sm font-bold text-primary mb-2">{industry.answerBlock.q}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{industry.answerBlock.a}</p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-10">
                    {industry.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <CheckLg className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-foreground">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild variant="hero" size="lg">
                    <Link to="/contact">
                      Get a free strategy call
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </AnimatedSection>

                {/* Right — stats */}
                <AnimatedSection variant="fadeUp" delay={150}>
                  <div className="soft-card rounded-3xl p-8 border border-border/40">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-8">
                      Results driven in this industry
                    </p>
                    <div className="space-y-8">
                      {industry.stats.map((stat) => (
                        <div key={stat.label} className="flex items-baseline gap-4 pb-8 border-b border-border/30 last:border-0 last:pb-0">
                          <span className="text-5xl font-black text-primary leading-none shrink-0">
                            {stat.value}
                          </span>
                          <span className="text-sm font-semibold text-foreground leading-snug">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/30">
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Results are based on client systems deployed by AuctoLabs. Actual outcomes vary by business size, market, and starting point.
                      </p>
                    </div>
                  </div>
                </AnimatedSection>

              </div>
            </div>
          </section>
        );
      })}

      {/* Many More */}
      <section className="section-padding bg-secondary/20 border-b border-border/40">
        <div className="container-custom">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                Not Listed Here?
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-5 leading-tight">
                We work with any service business{' '}
                <span className="gradient-text-warm">that depends on leads.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                The systems we build — automated lead capture, qualification, follow-up, and CRM sync — work for any business that generates revenue through client relationships. If your business lives and dies by leads, we can build the infrastructure.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                'Consulting',
                'Financial Services',
                'Home Services',
                'Insurance',
                'Coaching & Courses',
                'Cleaning Services',
                'Accounting & Tax',
                'Logistics & Freight',
                'Dental & Orthodontics',
                'Mortgage & Lending',
                'Staffing & Recruiting',
                'Event Planning',
              ].map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground"
                >
                  {industry}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full border border-primary/40 bg-primary/5 text-sm font-semibold text-primary">
                + Your Industry
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Industry-Specific Questions</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-6">
            {industries.map((ind) => (
              <AnimatedSection key={ind.id} delay={100}>
                <div className="soft-card p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">{ind.answerBlock.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{ind.answerBlock.a}</p>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection delay={100}>
              <div className="soft-card p-6">
                <h3 className="text-base font-bold text-foreground mb-2">Do you work with industries not listed here?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Yes. Any service business that generates revenue through leads can benefit from our systems. We work with consulting firms, financial advisors, home services companies, insurance agencies, dental practices, mortgage brokers, and many more. Book a free strategy call to discuss your specific needs.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection variant="scaleUp">
            <div className="rounded-3xl bg-primary/5 border border-primary/20 p-10 md:p-16 text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-widest mb-4 block">
                Ready to Get Started
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Which industry are{' '}
                <span className="gradient-text-warm">you growing?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                Book a free 30-minute strategy call. We'll audit your current setup and show you exactly what a system built for your industry would look like.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild variant="hero" size="lg">
                  <a href="https://calendly.com/waltermartinez-auctolabs/30min" target="_blank" rel="noopener noreferrer">
                    <Calendar3 className="mr-2 w-4 h-4" />
                    Book a Free Strategy Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/pricing">
                    See Pricing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
