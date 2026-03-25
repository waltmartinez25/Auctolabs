import { Link } from 'react-router-dom';
import {
  Search,
  WrenchAdjustable,
  Robot,
  GraphUpArrow,
  ArrowRight,
  CheckLg,
  XCircle,
} from 'react-bootstrap-icons';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

type IconComponent = React.ComponentType<{ className?: string }>;

const steps: {
  number: string;
  icon: IconComponent;
  title: string;
  heading: string;
  intro: string;
  description: string;
  listLabel: string;
  activities: string[];
  outcome: string;
  week: string;
}[] = [
  {
    number: '01',
    icon: Search,
    title: 'Audit',
    heading: "Find Where You're Losing Leads",
    intro: "Most businesses are already getting traffic — they're just losing it.",
    description:
      "We analyze your current setup to identify exactly where leads are dropping off and what's holding your growth back.",
    listLabel: 'What We Look At',
    activities: [
      'Website structure and conversion paths',
      'Lead response speed and follow-up gaps',
      'Existing tools, CRM, and integrations',
      'Messaging, UX, and user behavior',
      'Missed opportunities in your funnel',
    ],
    outcome: 'A clear plan to increase conversions and capture more opportunities',
    week: 'Week 1',
  },
  {
    number: '02',
    icon: WrenchAdjustable,
    title: 'Build',
    heading: 'Turn Your Website Into a Conversion Engine',
    intro:
      'We design and develop a high-performance website built to guide users, capture attention, and drive action.',
    description: 'This is where your system starts working for you.',
    listLabel: 'What We Build',
    activities: [
      'Conversion-focused website design',
      'Clear messaging and strategic page structure',
      'Mobile-first, responsive experience',
      'Fast, SEO-ready architecture',
      'Integrated tools and tracking setup',
    ],
    outcome: 'A website designed to turn traffic into qualified leads',
    week: 'Weeks 2–3',
  },
  {
    number: '03',
    icon: Robot,
    title: 'Automate',
    heading: 'Respond, Qualify, and Book — Automatically',
    intro: 'Speed is everything. Most businesses lose leads because they respond too late.',
    description:
      'We build automation systems that handle lead response, qualification, and follow-up instantly.',
    listLabel: 'What We Implement',
    activities: [
      'AI-powered lead response systems',
      'CRM integration and data flow setup',
      'Email and SMS follow-up sequences',
      'Automated appointment booking',
      'Lead routing and qualification logic',
    ],
    outcome: 'No missed leads, faster response, and more booked calls',
    week: 'Weeks 3–4',
  },
  {
    number: '04',
    icon: GraphUpArrow,
    title: 'Optimize',
    heading: 'Improve Performance Over Time',
    intro: 'Launching is just the beginning.',
    description:
      'We continuously monitor performance, identify opportunities, and refine your system to improve results over time.',
    listLabel: 'What We Optimize',
    activities: [
      'Conversion rates across key pages',
      'Lead response speed and engagement',
      'Funnel performance and drop-off points',
      'A/B testing and improvements',
      'Ongoing system enhancements',
    ],
    outcome: 'A system that gets better, more efficient, and more profitable over time',
    week: 'Weeks 4–6',
  },
];

const deliverables = [
  'A website that converts traffic into leads',
  'Instant lead response (no delays)',
  'Automated qualification and booking',
  'A structured, scalable growth system',
  'Clear visibility into performance',
];

const processSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'AuctoLabs Growth System Process: Audit, Build, Automate, Optimize',
    description:
      'A proven 4-step methodology for service businesses: Audit your current setup to find gaps, Build a conversion-focused website, Automate lead response and follow-up, then Optimize performance over time. Most systems launch in 4–6 weeks.',
    totalTime: 'P6W',
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.title,
      text: `${s.description} Timeline: ${s.week}.`,
      url: `https://auctolabs.com/process#step-${s.number}`,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://auctolabs.com/' },
      { '@type': 'ListItem', position: 2, name: 'Our Process', item: 'https://auctolabs.com/process' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does the AuctoLabs process take from start to finished website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most AuctoLabs systems launch in 4–6 weeks. Week 1 is the Audit phase, Weeks 2–3 are Design and Build, Weeks 3–4 are Automation setup and integration, and Weeks 4–6+ are Optimization and launch. Complex systems with multiple CRM integrations may take slightly longer.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do I need to have ready before starting with AuctoLabs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You need your brand assets (logo, colors), access to your current website or hosting account, and a clear idea of your ideal client. If you have an existing CRM, we will need admin access to set up integrations. Everything else — strategy, copywriting direction, and system design — is handled by AuctoLabs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I start with just a website redesign and add automation later?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The Launch package includes web design without automation. However, we strongly recommend including at least basic lead capture automation — because a new website without automation still means a manual response gap. Most clients find the Grow package delivers the most value.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens after the project launches?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'All packages include a post-launch support period (30 to 90 days depending on package). We provide team training, monitor system performance, and fix any issues. After the support period, we offer monthly retainer options starting at $1,500/month for ongoing optimization and improvements.',
        },
      },
    ],
  },
];

const Process = () => {
  return (
    <Layout>
      <SEO
        title="Our Process — Audit, Build, Automate, Optimize | AuctoLabs"
        description="AuctoLabs follows a proven 4-step growth system: Audit your current setup, Build a conversion-focused website, Automate lead response, and Optimize performance over time. Most systems launch in 4–6 weeks."
        keywords="web development process, automation workflow, lead generation methodology, business growth system, audit build automate optimize, AuctoLabs process"
        canonical="https://auctolabs.com/process"
        jsonLd={processSchema}
      />

      <PageSummary
        topic="AuctoLabs Process — Audit, Build, Automate, Optimize"
        purpose="This page explains AuctoLabs' proven 4-step process: (1) Audit your current website and lead flow, (2) Build a conversion-focused website, (3) Automate lead response and follow-up, and (4) Optimize performance continuously. Most systems launch in 4–6 weeks."
        audience="Business owners evaluating agencies and looking for a structured, predictable approach to improving lead generation and conversion"
        services={[
          'Audit (Week 1) — Website analysis, lead response review, opportunity mapping',
          'Build (Weeks 2–3) — Conversion-focused design, mobile-first development, SEO architecture',
          'Automate (Weeks 3–4) — AI lead response, CRM integration, email/SMS sequences, appointment booking',
          'Optimize (Weeks 4–6+) — Performance dashboards, A/B testing, conversion optimization, ongoing improvements',
        ]}
      />

      <HiddenStructuredFacts
        facts={{
          'Process name': 'Audit, Build, Automate, Optimize',
          'Typical timeline': '4–6 weeks',
          'Step 1 — Audit (Week 1)':
            'Website and conversion path review, lead response time analysis, tech stack mapping, opportunity identification',
          'Step 2 — Build (Weeks 2–3)':
            'Conversion-focused website design, mobile-first development, SEO optimization, tool integrations',
          'Step 3 — Automate (Weeks 3–4)':
            'AI lead response systems, CRM integration, email/SMS automation, automated appointment booking, lead routing',
          'Step 4 — Optimize (Weeks 4–6+)':
            'Performance monitoring, A/B testing, conversion rate optimization, ongoing system improvements',
          'Methodology': 'Systematic, no-guesswork approach to predictable revenue growth',
        }}
      />

      {/* ─── Hero ─── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Our Process
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                A Proven System for{' '}
                <span className="gradient-text-warm">Predictable Growth</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
                Every AuctoLabs project follows a structured process designed to capture more
                leads, respond faster, and convert more opportunities into clients.
              </p>
              <p className="text-base font-semibold text-foreground mb-10 max-w-xl mx-auto">
                No guesswork. No wasted time. Just systems built to perform.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book a Free Strategy Call
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
          <p className="text-center text-base md:text-lg font-semibold text-foreground">
            This isn't a typical "project" —{' '}
            <span className="text-primary">
              it's a complete growth system built step-by-step.
            </span>
          </p>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid grid-cols-3 divide-x divide-border/60 max-w-3xl mx-auto">
            {[
              { value: '4–6', suffix: 'wks', label: 'Typical time to launch' },
              { value: '4', suffix: 'steps', label: 'Proven methodology' },
              { value: '24/7', suffix: '', label: 'Automated lead follow-up' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 80}>
                <div className="text-center px-6">
                  <div className="flex items-baseline justify-center gap-1.5 mb-1">
                    <span className="text-4xl md:text-5xl font-serif font-bold text-primary">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-sm font-semibold text-muted-foreground">{stat.suffix}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process Overview (at a glance) ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Audit. Build. Automate. Optimize.
              </h2>
              <p className="text-muted-foreground">
                We don't just launch and leave. We design, implement, and refine systems that
                continuously improve your results.
              </p>
            </div>
          </AnimatedSection>

          {/* Horizontal step flow */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line (desktop) */}
            <div
              className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-primary/15"
              aria-hidden="true"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <AnimatedSection key={step.number} delay={i * 80}>
                  <div className="flex flex-col items-center text-center">
                    {/* Icon node */}
                    <div className="relative z-10 w-20 h-20 rounded-2xl bg-white border-2 border-primary/20 flex flex-col items-center justify-center mb-5 shadow-sm">
                      <step.icon className="w-6 h-6 text-primary mb-1" />
                      <span className="text-xs font-bold text-primary/50 font-mono" aria-hidden="true">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-xs text-primary font-semibold mb-2">{step.week}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.intro}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Step Sections (detail) ─── */}
      {steps.map((step, index) => (
        <section
          key={step.number}
          id={`step-${step.number}`}
          className={`section-padding ${index % 2 === 0 ? 'bg-secondary/30' : ''}`}
        >
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Content side */}
              <AnimatedSection className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="relative">
                  {/* Watermark number */}
                  <span
                    className="absolute -top-6 -left-4 text-[9rem] font-serif font-bold text-primary/5 select-none pointer-events-none leading-none"
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>

                  <div className="relative">
                    {/* Step badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <step.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary/50 font-mono" aria-hidden="true">
                          {step.number}
                        </span>
                        <span className="text-sm text-muted-foreground">—</span>
                        <span className="text-sm font-bold text-primary uppercase tracking-widest">
                          {step.title}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                      {step.heading}
                    </h2>
                    <p className="text-base font-semibold text-foreground mb-3">{step.intro}</p>
                    <p className="text-muted-foreground mb-8">{step.description}</p>

                    {/* Outcome callout */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-primary/10 border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm font-semibold text-primary">{step.outcome}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Activities card */}
              <AnimatedSection delay={100} className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="soft-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 rounded-full bg-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">
                      {step.listLabel}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {step.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3">
                        <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 pt-6 border-t border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">
                      Timeline
                    </p>
                    <p className="font-serif font-bold text-lg">{step.week}</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      ))}

      {/* ─── CTA between steps and timeline ─── */}
      <section className="py-10 bg-primary/5 border-y border-primary/10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <p className="font-semibold text-foreground text-center sm:text-left">
              You get a complete system — not a dragged-out project.
            </p>
            <Button asChild variant="hero" size="lg" className="shrink-0">
              <Link to="/contact">
                Book a Free Strategy Call
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Timeline ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Timeline
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Built for Speed Without Sacrificing Performance
              </h2>
              <p className="text-muted-foreground">
                Most AuctoLabs systems launch within 4–6 weeks, depending on complexity.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Track */}
              <div
                className="hidden md:block absolute top-5 left-5 right-5 h-0.5 bg-primary/15"
                aria-hidden="true"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {steps.map((step, i) => (
                  <AnimatedSection key={step.number} delay={i * 80}>
                    <div className="flex flex-col items-center text-center">
                      {/* Dot on track */}
                      <div className="relative z-10 w-10 h-10 rounded-full border-2 border-primary/30 bg-white flex items-center justify-center mb-4 shadow-sm">
                        <span className="text-xs font-bold text-primary font-mono">{step.number}</span>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-1">
                        {step.week}
                      </p>
                      <p className="text-sm font-semibold text-foreground mb-1">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.listLabel.replace('What We ', '')}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/15 text-center">
                <p className="font-semibold text-foreground">
                  From strategy to launch in as little as 4 weeks — without cutting corners.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── What This Delivers ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                The Result
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                More Leads. Faster Response.
                <br />
                Better Conversions.
              </h2>
              <p className="text-muted-foreground">
                By following this process, your business gets a complete, connected system that
                runs around the clock — capturing leads, qualifying them, and booking calls
                automatically.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="soft-card p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  What this process delivers
                </p>
                <ul className="space-y-4">
                  {deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Why It Works ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Why It Works
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Why It Works</h2>
            </div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
              {/* Problems */}
              <AnimatedSection>
                <div className="soft-card p-8 h-full">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                    Most businesses
                  </p>
                  <ul className="space-y-5">
                    {[
                      'Have disconnected tools',
                      'Respond too slowly',
                      "Don't track performance properly",
                    ].map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-destructive/60 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Divider */}
              <AnimatedSection delay={100}>
                <div className="hidden md:flex flex-col items-center justify-center gap-3 py-8 self-center">
                  <div className="h-12 w-px bg-primary/20" />
                  <div className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                    We fix that
                  </div>
                  <div className="h-12 w-px bg-primary/20" />
                </div>
                <div className="flex md:hidden items-center gap-4 my-1">
                  <div className="flex-1 h-px bg-primary/20" />
                  <span className="text-primary text-xs font-bold uppercase tracking-widest">
                    We fix that
                  </span>
                  <div className="flex-1 h-px bg-primary/20" />
                </div>
              </AnimatedSection>

              {/* Solution */}
              <AnimatedSection delay={200}>
                <div className="soft-card p-8 h-full border-2 border-primary/20">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                    By building everything into one system
                  </p>
                  <ul className="space-y-4">
                    {[
                      'One connected infrastructure',
                      'Instant, automated response',
                      'Real-time performance visibility',
                      'Continuous improvement built in',
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Process Questions</h2>
            </div>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto space-y-5">
            {[
              {
                q: 'How long does the process take from start to finished website?',
                a: 'Most systems launch in 4–6 weeks. Week 1 is the Audit, Weeks 2–3 are Design and Build, Weeks 3–4 are Automation setup, and Weeks 4–6+ are Optimization and launch. Complex systems with multiple CRM integrations may take slightly longer.',
              },
              {
                q: 'What do I need to have ready before starting?',
                a: 'Your brand assets (logo, colors), access to your current website or hosting, and clarity on your ideal client. If you have a CRM, we will need admin access. Everything else — strategy, copy direction, and system design — is handled by us.',
              },
              {
                q: 'Can I start with just a website and add automation later?',
                a: 'Yes. The Launch package includes web design without automation. However, a website without at least basic lead capture automation still leaves a manual response gap. Most clients find the Grow package delivers the most value.',
              },
              {
                q: 'What happens after the project launches?',
                a: 'All packages include a post-launch support period (30–90 days depending on package). We provide team training, monitor performance, and fix issues. After the support period, monthly retainer options start at $1,500/month.',
              },
            ].map((faq) => (
              <AnimatedSection key={faq.q}>
                <div className="soft-card p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="section-padding bg-secondary/30">
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
                We'll walk you through exactly how this process applies to your business and where
                your biggest opportunities are.
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

export default Process;
