import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckLg,
  XCircle,
  Search,
  Tools,
  Robot,
  GraphUp,
} from 'react-bootstrap-icons';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { pageBreadcrumb } from '@/lib/breadcrumbs';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { LaneCards } from '@/components/pricing/LaneCards';
import { CALENDLY_URL, CTA_BOOK } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

type IconComponent = React.ComponentType<{ className?: string }>;

const systemSteps: {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: IconComponent;
  features: string[];
}[] = [
  {
    number: '01',
    title: 'Audit',
    subtitle: 'Identify the gaps.',
    description: "We analyze your current website, traffic, and lead flow to identify exactly where you're losing opportunities.",
    icon: Search,
    features: [
      'Funnel and conversion analysis',
      'Lead response time review',
      'UX and messaging breakdown',
      'Opportunity mapping',
    ],
  },
  {
    number: '02',
    title: 'Build',
    subtitle: 'Design for conversion.',
    description: 'We design and develop a high-performance website structured to convert visitors into leads.',
    icon: Tools,
    features: [
      'Conversion-focused website design',
      'Mobile-first responsive development',
      'Fast-loading, SEO-ready architecture',
      'Strategic page structure and CTAs',
    ],
  },
  {
    number: '03',
    title: 'Automate',
    subtitle: 'Respond before competitors.',
    description: 'We install systems that capture, qualify, and respond to leads in under 2 minutes, without manual intervention.',
    icon: Robot,
    features: [
      'AI-powered lead response systems',
      'CRM integrations (HubSpot, Salesforce, etc.)',
      'Email and SMS follow-up sequences',
      'Automated appointment booking',
      'Lead routing and qualification',
    ],
  },
  {
    number: '04',
    title: 'Optimize',
    subtitle: "Scale what's working.",
    description: 'We track performance and continuously improve your system so results compound over time.',
    icon: GraphUp,
    features: [
      'Real-time performance dashboards',
      'Conversion tracking and reporting',
      'Lead flow optimization',
      'Ongoing system improvements',
    ],
  },
];

const systemFlow = [
  'A visitor lands on your website',
  "They're guided through a structured conversion path",
  'They submit a form or inquiry',
  'They receive a response in under 2 minutes (AI + automation)',
  "They're qualified based on your criteria",
  "They're automatically booked into your calendar",
  'Follow-ups continue until they convert',
];

const whyItems = [
  'We build complete systems, not just websites',
  'Every deliverable is designed for conversion',
  'Speed to lead is built into the architecture',
  'We integrate with your existing tools',
  'Performance is tracked from day one',
  'We improve systems continuously post-launch',
];

const servicesSchema = {
  '@type': 'Service',
  serviceType: 'Web Design, AI Automation, and Lead Generation Services',
  provider: {
    '@type': 'Organization',
    name: 'AuctoLabs',
  },
  areaServed: 'Worldwide',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AuctoLabs Growth Systems',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Design & Development',
          description: 'Conversion-focused websites built to guide visitors and capture leads',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Automation Systems',
          description: 'Lead response in under 2 minutes, qualification workflows, and automated follow-up',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Lead Generation Systems',
          description: 'Complete lead generation infrastructure including landing pages and nurture sequences',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Performance Systems',
          description: 'Real-time dashboards, tracking, and conversion optimization',
        },
      },
    ],
  },
};

// Page schema plus FAQs. Answers are written to stand alone in the
// first 30-50 words, which is the span answer engines extract.
const servicesSchemaFaq = {
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you build the website, or just the automation?",
      "acceptedAnswer": { "@type": "Answer", "text": "Both, as one system. The site is designed around how visitors decide, and the automation behind it answers, qualifies, and books every inquiry. Buying them separately is where most businesses lose leads in the handoff." }
    },
    {
      "@type": "Question",
      "name": "How is this different from buying speed-to-lead software?",
      "acceptedAnswer": { "@type": "Answer", "text": "Software gives you a tool to configure. We design the workflow, connect it to your CRM and calendar, write the qualification logic, and hand over a system that already works. There is nothing for you to set up." }
    },
    {
      "@type": "Question",
      "name": "Which CRMs do you integrate with?",
      "acceptedAnswer": { "@type": "Answer", "text": "HubSpot, Salesforce and Pipedrive most often, plus Clio for law firms. Anything with an API can be connected, including Zapier and Make for tools without a direct integration." }
    },
    {
      "@type": "Question",
      "name": "How fast does the automated response actually go out?",
      "acceptedAnswer": { "@type": "Answer", "text": "Under 2 minutes from form submission. The lead is qualified against your criteria, routed to the right person, and sent a reply by SMS or email before a competitor has opened their inbox." }
    }
  ]
};

const servicesSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [servicesSchema, servicesSchemaFaq, pageBreadcrumb('Services')]
};

const Services = () => {
  return (
    <Layout>
      <SEO
        title="Done-For-You Lead Response & Web Design | AuctoLabs"
        description="A website built to convert, plus the automation behind it. Every inquiry gets answered, screened, and booked, day or night."
        keywords="web design services, AI automation systems, lead generation, CRM integration, automated follow-up, conversion optimization, lead capture, performance systems, growth systems"
        canonical="https://auctolabs.com/services"
        jsonLd={servicesSchemaGraph}
      />

      <PageSummary
        topic="AuctoLabs Services: Turning Traffic Into Booked Calls"
        purpose="This page describes AuctoLabs' complete growth system: auditing current systems, building conversion-focused websites, installing AI automation, and optimizing performance over time."
        audience="Business owners and marketing leaders looking to increase leads, improve response time, and scale revenue with automated systems"
        services={[
          'Web Design & Development: Conversion-focused, mobile-first websites built to guide visitors and capture leads',
          'AI Automation Systems: Lead response in under 2 minutes, qualification workflows, CRM integration, and automated follow-up',
          'Lead Generation Systems: Landing pages, lead magnets, multi-channel capture, and nurture sequences',
          'Performance Systems: Real-time dashboards, response time tracking, and conversion rate optimization',
        ]}
      />

      <HiddenStructuredFacts
        facts={{
          'Value proposition': 'Complete growth systems that capture leads, respond in under 2 minutes, qualify prospects, and convert them into booked calls, automatically',
          'Process': 'Audit → Build → Automate → Optimize',
          'Web Design features': 'Conversion-focused design, mobile-first responsive layouts, high-performance architecture, strategic CTA placement, SEO-ready structure, CMS integration',
          'AI Automation features': 'Automated lead capture and qualification, rapid response systems, CRM integration (HubSpot, Salesforce, Pipedrive), email and SMS follow-up, automated appointment booking, intelligent lead routing',
          'Lead Generation features': 'High-converting landing pages, lead magnet strategy and funnel setup, multi-channel lead capture, automated nurture sequences, lead scoring and qualification, analytics and attribution tracking',
          'Performance System features': 'Real-time performance dashboards, lead response time tracking, automated alerts and escalation workflows, conversion rate optimization, continuous system improvements',
          'How engagements work': 'Two options: Launch (fixed-scope build, live in 4–6 weeks) and Partner (month-to-month ongoing work). Scope is quoted per engagement after a free strategy call.',
          'Supported CRMs': 'HubSpot, Salesforce, Pipedrive',
        }}
      />

      {/* ─── Hero ─── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Growth Systems
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                We Build Systems That Turn{' '}
                <em>Traffic Into Clients</em>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
                AuctoLabs designs and builds complete growth systems that capture leads, respond
                in under 2 minutes, qualify prospects, and convert them into booked calls, automatically.
              </p>
              <p className="text-base font-semibold text-foreground mb-10 max-w-xl mx-auto">
                This isn't just web design. This is infrastructure built to grow your business.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Tell Us About Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Positioning Strip ─── */}
      <section className="py-6 bg-primary/5 border-y border-primary/10">
        <div className="container-custom">
          <p className="accent-em text-center text-base md:text-lg font-semibold text-foreground">
            Not just web design.{' '}
            <em>
              A complete growth system that captures, converts, and scales.
            </em>
          </p>
        </div>
      </section>

      {/* ─── Positioning ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-14">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Not Just Services.
                <br />A Complete Growth System.
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start max-w-4xl mx-auto">
            {/* Problems */}
            <AnimatedSection>
              <div className="soft-card p-8 h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  Most businesses have
                </p>
                <ul className="space-y-5">
                  {[
                    "A website that doesn't convert",
                    'Slow or inconsistent lead follow-up',
                    'No clear system for turning traffic into revenue',
                  ].map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive/60 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Divider */}
            <AnimatedSection delay={100}>
              {/* Desktop */}
              <div className="hidden md:flex flex-col items-center justify-center gap-3 py-8 self-center">
                <div className="h-12 w-px bg-primary/20" />
                <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                  We fix that
                </div>
                <div className="h-12 w-px bg-primary/20" />
              </div>
              {/* Mobile */}
              <div className="flex md:hidden items-center gap-4 my-1">
                <div className="flex-1 h-px bg-primary/20" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  We fix that
                </span>
                <div className="flex-1 h-px bg-primary/20" />
              </div>
            </AnimatedSection>

            {/* Solutions */}
            <AnimatedSection delay={200}>
              <div className="soft-card p-8 h-full border-2 border-primary/20">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                  We build a system that
                </p>
                <ul className="space-y-4">
                  {[
                    'Attracts the right traffic',
                    'Captures and qualifies leads',
                    'Responds in under 2 min',
                    'Books calls automatically',
                    'Tracks and improves performance',
                  ].map((solution) => (
                    <li key={solution} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── The AuctoLabs Growth System ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                The AuctoLabs Growth System
              </h2>
              <p className="text-muted-foreground">
                Audit. Build. Automate. Optimize. Every system we build follows a proven structure
                designed for performance and scalability.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 80}>
                <div className={`soft-card p-8 h-full relative overflow-hidden glow-${(i % 4) + 1}`}>
                  {/* Watermark number */}
                  <span
                    className="absolute -top-3 -right-1 text-9xl font-serif font-bold text-primary/[0.11] select-none pointer-events-none leading-none"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <div className="relative">
                    {/* Step icon + number row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <step.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-2xl font-serif font-bold text-primary/60" aria-hidden="true">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-1">{step.title}</h3>
                    <p className="text-sm text-primary font-semibold mb-3">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckLg className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="text-center mt-12">
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Tell Us About Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── What This Does For You ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                The Outcome
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                More Leads. Faster Response. Higher Close Rates.
              </h2>
              <p className="text-muted-foreground mb-4">
                Most businesses lose deals because they respond too late, don't qualify leads
                properly, or their website doesn't guide users to act.
              </p>
              <p className="font-semibold text-foreground">We solve all of that.</p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="soft-card p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  With AuctoLabs, your system
                </p>
                <ul className="space-y-4">
                  {[
                    'Responds to leads in under 2 minutes',
                    'Filters out unqualified prospects',
                    'Books more qualified calls',
                    'Keeps your pipeline full',
                    'Runs 24/7 without manual work',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={250}>
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground mb-4 font-medium">
                Want a system that does this for your business?
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Tell Us About Your Project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/pricing">
                    See Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Example System Flow ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                In Practice
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                What This Looks Like in Action
              </h2>
              <p className="text-muted-foreground">
                Here's how a typical AuctoLabs system works end to end.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div
                className="absolute left-5 top-5 bottom-5 w-px bg-primary/15"
                aria-hidden="true"
              />
              <ul className="space-y-0">
                {systemFlow.map((step, i) => (
                  <AnimatedSection key={step} delay={i * 60}>
                    <li className="relative flex items-start gap-5 pb-7 last:pb-0">
                      <div className="relative z-10 w-10 h-10 rounded-full bg-card border-2 border-primary/25 flex items-center justify-center shrink-0 shadow-sm">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <div className="pt-2.5">
                        <p className="font-medium text-foreground">{step}</p>
                      </div>
                    </li>
                  </AnimatedSection>
                ))}
              </ul>
            </div>

            <AnimatedSection delay={500}>
              <div className="mt-10 p-6 rounded-xl bg-primary/5 border border-primary/15 text-center">
                <p className="font-semibold text-foreground">
                  No missed leads. No delays. No manual chasing.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Who This Is For ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-12">
                <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                  Fit
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
                  Built for Businesses Ready to Grow
                </h2>
                <p className="text-muted-foreground">This is for you if:</p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="soft-card p-8 md:p-10">
                <ul className="grid sm:grid-cols-2 gap-5">
                  {[
                    "You're already getting traffic but not enough conversions",
                    "You're missing or responding late to leads",
                    'You want a system that runs without constant manual work',
                    "You're serious about scaling",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Investment ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Working Together
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Pick your lane
              </h2>
              <p className="text-muted-foreground">
                Every system is scoped to the business it serves. Choose how you want to
                work with us and we&apos;ll shape the rest around you.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <LaneCards source="services" />
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <p className="text-center text-sm text-muted-foreground mt-8">
              Most clients recover their investment from just a few new deals.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Why AuctoLabs ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Why Us
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Built for Performance,
                <br />
                Not Just Design
              </h2>
              <p className="text-muted-foreground mb-8">
                We don't just make things look good. We build systems designed to generate leads,
                improve response time, increase conversions, and drive real business growth.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Tell Us About Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <ul className="space-y-3">
                {whyItems.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border/50"
                  >
                    <span className="text-xs font-bold text-primary/50 font-mono w-5 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Build a System That Actually Works?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Book a free strategy call and we'll break down exactly what your business needs to
                capture, convert, and scale.
              </p>
              {/* Copy above promises a call, so this goes straight to the
                  calendar rather than to the contact form. */}
              <Button asChild variant="hero" size="lg">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.calendlyOpen('services_footer')}
                >
                  {CTA_BOOK.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
