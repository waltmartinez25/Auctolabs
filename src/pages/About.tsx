import { Link } from 'react-router-dom';
import {
  Bullseye,
  LightningCharge,
  BarChartLine,
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

const principles: {
  number: string;
  icon: IconComponent;
  title: string;
  description: string;
}[] = [
  {
    number: '01',
    icon: Bullseye,
    title: 'Systems-First Thinking',
    description:
      "We don't build one-off assets. We build complete systems where every component works together to generate and convert leads.",
  },
  {
    number: '02',
    icon: BarChartLine,
    title: 'Measurable Outcomes',
    description:
      "If it doesn't improve response time, conversion rate, or pipeline performance — we don't build it.",
  },
  {
    number: '03',
    icon: LightningCharge,
    title: 'Automation as Leverage',
    description:
      "Automation isn't about replacing people. It's about removing bottlenecks so your team can focus on high-value work.",
  },
];

const metrics = [
  { value: '< 60s', label: 'Average lead response time' },
  { value: '340%+', label: 'Average conversion improvement' },
  { value: '24/7', label: 'Automated lead handling' },
  { value: '100+', label: 'Systems deployed' },
];

const industries = [
  { name: 'Law Firms', description: 'Speed-to-lead wins cases before competitors respond' },
  { name: 'Home Service Companies', description: 'First to respond gets the job — every time' },
  { name: 'Healthcare Practices', description: 'Patient acquisition running around the clock' },
  { name: 'B2B Service Providers', description: 'Systematic pipeline generation at scale' },
];

const problemFlow = [
  { text: 'Leads come in', type: 'neutral' as const },
  { text: 'No response', type: 'problem' as const },
  { text: 'Delayed follow-up', type: 'problem' as const },
  { text: 'Missed opportunities', type: 'problem' as const },
];

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AuctoLabs',
  description:
    'AuctoLabs builds automated client-generating systems — combining conversion-focused websites with AI automation to capture leads instantly, qualify prospects automatically, and book meetings 24/7.',
  url: 'https://auctolabs.com',
  knowsAbout: [
    'Web Design',
    'AI Automation',
    'Lead Generation',
    'CRM Integration',
    'Conversion Rate Optimization',
  ],
};

const About = () => {
  return (
    <Layout>
      <SEO
        title="About AuctoLabs — We Build Automated Client-Generating Systems"
        description="AuctoLabs builds conversion-focused websites and AI automation systems that capture leads instantly, qualify prospects automatically, and book meetings while you sleep. Infrastructure for growth."
        keywords="about AuctoLabs, AI automation agency, automated lead generation, conversion-focused websites, growth systems, speed-to-lead, service business automation"
        canonical="https://auctolabs.com/about"
        jsonLd={aboutSchema}
      />

      <PageSummary
        topic="About AuctoLabs — Automated Client-Generating Systems"
        purpose="AuctoLabs is a web design and AI automation agency that builds complete growth systems for service businesses — combining high-converting websites with intelligent automation to capture leads, qualify prospects, and book meetings automatically."
        audience="Service business owners, law firms, home service companies, healthcare practices, and B2B providers looking for automated lead generation and conversion systems"
        services={[
          'Conversion-focused web design and development',
          'AI-powered lead qualification and instant response systems',
          'CRM integration and workflow automation',
          'Speed-to-lead systems with under 60-second response times',
        ]}
      />

      <HiddenStructuredFacts
        facts={{
          'Company name': 'AuctoLabs',
          'Company type': 'Web design and AI automation agency',
          'Mission': 'Give every business the infrastructure to compete — and win',
          'Founded on':
            'The observation that businesses lose revenue because their systems respond too slowly',
          'Systems deployed': '100+',
          'Average response time achieved': 'Under 60 seconds',
          'Average conversion improvement': '340%+',
          'System uptime': '24/7 automated',
          'Core principles': 'Systems-first thinking, measurable outcomes, automation as leverage',
          'Target industries': 'Law firms, home service companies, healthcare practices, B2B service providers',
          'Contact email': 'hello@auctolabs.com',
        }}
      />

      {/* ─── Hero ─── */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                About AuctoLabs
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                We Build Automated{' '}
                <span className="gradient-text-warm">Client-Generating Systems</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl">
                Most businesses don't struggle because of demand. They struggle because their
                systems don't capture, respond, or convert fast enough.
              </p>
              <p className="text-base font-semibold text-foreground mb-4">
                AuctoLabs was built to fix that.
              </p>
              <p className="text-muted-foreground mb-10 max-w-2xl leading-relaxed">
                We combine conversion-focused websites with intelligent automation to create
                systems that capture leads instantly, qualify prospects automatically, and book
                meetings while you sleep. This isn't just marketing. It's infrastructure for
                growth.
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
            This isn't just marketing —{' '}
            <span className="text-primary">it's infrastructure for growth.</span>
          </p>
        </div>
      </section>

      {/* ─── Problem We Solve ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                The Problem
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Most Businesses Lose Leads — Not Because of Traffic, But Because of Speed
              </h2>
              <p className="text-muted-foreground mb-8">
                The difference between businesses that grow and those that don't often comes down
                to one thing:
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/10 border border-primary/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-bold text-primary">
                  How fast and effectively they respond
                </span>
              </div>
              <p className="text-muted-foreground font-semibold">
                We build systems that eliminate that gap.
              </p>
            </AnimatedSection>

            {/* Lead drop-off visual */}
            <AnimatedSection delay={100}>
              <div className="space-y-2">
                {problemFlow.map((item, i) => (
                  <div
                    key={item.text}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                      item.type === 'neutral'
                        ? 'bg-background border-border/50'
                        : 'bg-destructive/5 border-destructive/10'
                    }`}
                  >
                    {item.type === 'neutral' ? (
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive/60 shrink-0" />
                    )}
                    <span
                      className={`font-medium text-sm ${
                        item.type === 'neutral' ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
                {/* Connecting arrow */}
                <div className="flex items-center gap-2 px-4 py-1" aria-hidden="true">
                  <div className="flex-1 h-px bg-destructive/20" />
                  <ArrowRight className="w-3 h-3 text-destructive/30 rotate-90" />
                  <div className="flex-1 h-px bg-destructive/20" />
                </div>
                <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/15 text-center">
                  <p className="text-sm font-bold text-destructive/70">
                    That's where revenue is lost.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── What We Do ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                What We Build
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                We Build Systems That Capture, Qualify, and Convert — Automatically
              </h2>
              <p className="text-muted-foreground">
                Every AuctoLabs system runs as a complete, connected infrastructure. No
                disconnected tools. No manual bottlenecks. Everything works together.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="soft-card p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  Every system is designed to
                </p>
                <ul className="space-y-4">
                  {[
                    'Capture attention with a high-converting website',
                    'Respond instantly to every lead',
                    'Qualify prospects based on your criteria',
                    'Route opportunities to the right place',
                    'Book calls automatically',
                    'Track and improve performance over time',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Our Mission
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                Make Every Business as Responsive as the Best
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                The best companies win because they move faster. They respond instantly, follow up
                consistently, and never miss an opportunity.
              </p>
              <p className="text-muted-foreground mb-10">
                Most businesses can't compete at that level — not because they lack skill, but
                because they lack systems.
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm font-bold text-primary">
                  Our mission: give every business the infrastructure to compete — and win
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Metrics ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-10">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center mb-10">
                Built for Performance
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border/40">
                {metrics.map((m, i) => (
                  <div key={m.label} className="text-center px-6 py-6 lg:py-0">
                    <p className="text-4xl md:text-5xl font-serif font-bold gradient-text-warm mb-2">
                      {m.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground mt-10 max-w-md mx-auto">
                Results vary by business, but the system is designed for measurable improvement.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── How We Think (editorial list) ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-14">
                <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                  How We Think
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold">
                  Systems Over Tactics
                </h2>
              </div>
            </AnimatedSection>

            {principles.map((p, i) => (
              <AnimatedSection key={p.number} delay={i * 80}>
                <div
                  className={`py-8 border-t border-border/40 grid md:grid-cols-[3rem_1fr_2fr] gap-6 md:gap-10 items-start ${
                    i === principles.length - 1 ? 'border-b' : ''
                  }`}
                >
                  {/* Number */}
                  <span
                    className="text-4xl font-serif font-bold text-primary/15 leading-none mt-1"
                    aria-hidden="true"
                  >
                    {p.number}
                  </span>
                  {/* Icon + Title */}
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <p.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif font-bold text-xl">{p.title}</h3>
                  </div>
                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed md:pt-2">{p.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Who We Work With ─── */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Who We Work With
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Built for Service Businesses That Value Speed
              </h2>
              <p className="text-muted-foreground">
                We work best with businesses where speed-to-lead directly impacts revenue.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
            {industries.map((industry, i) => (
              <AnimatedSection key={industry.name} delay={i * 60}>
                <div className="soft-card p-6 h-full">
                  <h3 className="font-serif font-bold mb-2">{industry.name}</h3>
                  <p className="text-sm text-muted-foreground">{industry.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <p className="text-center text-muted-foreground">
              If you're losing deals because competitors respond faster —{' '}
              <span className="font-semibold text-foreground">we fix that.</span>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── Why AuctoLabs Exists ─── */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Why We Exist
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                Built for Businesses That Want Systems — Not Guesswork
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-start max-w-4xl mx-auto">
            {/* Most agencies */}
            <AnimatedSection>
              <div className="soft-card p-8 h-full">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
                  Most agencies
                </p>
                <ul className="space-y-4">
                  {['Focus on design', 'Deliver projects', 'Then disappear'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive/60 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
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
                  We don't
                </div>
                <div className="h-12 w-px bg-primary/20" />
              </div>
              <div className="flex md:hidden items-center gap-4 my-1">
                <div className="flex-1 h-px bg-primary/20" />
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  We don't
                </span>
                <div className="flex-1 h-px bg-primary/20" />
              </div>
            </AnimatedSection>

            {/* AuctoLabs */}
            <AnimatedSection delay={200}>
              <div className="soft-card p-8 h-full border-2 border-primary/20">
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">
                  We focus on
                </p>
                <ul className="space-y-4 mb-6">
                  {['Performance', 'Systems', 'Long-term growth'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckLg className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-border/40">
                  <p className="text-sm text-muted-foreground">
                    We don't just build something that looks good. We build something that works.
                  </p>
                </div>
              </div>
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
                Ready to Build Your Growth System?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                If you're serious about capturing more leads, responding faster, and converting
                more opportunities — let's talk. We'll break down exactly what your business needs
                and where your biggest opportunities are.
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

export default About;
