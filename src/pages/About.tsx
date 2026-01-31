import { Link } from 'react-router-dom';
import { Target, Zap, BarChart3, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const principles = [
  {
    icon: Target,
    title: 'Systems-First Thinking',
    description: 'We build systems, not just websites. Every component is designed to work together as a cohesive lead generation and qualification machine.',
  },
  {
    icon: BarChart3,
    title: 'Measurable Outcomes',
    description: 'We focus on metrics that matter: response time, conversion rate, cost per lead. If we cannot measure it, we do not build it.',
  },
  {
    icon: Zap,
    title: 'Automation as Leverage',
    description: 'Technology should multiply your efforts, not add complexity. We automate the repetitive so your team can focus on high-value work.',
  },
];

const About = () => {
  return (
    <Layout>
      <SEO
        title="About AuctoLabs - Automated Client-Generating Machines"
        description="AuctoLabs builds automated client-generating machines. We help service businesses respond to leads in seconds, qualify prospects automatically, and book meetings 24/7."
        keywords="about AuctoLabs, web design agency, AI automation company, lead generation experts, business automation"
        canonical="https://auctolabs.com/about"
      />
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl">
              <span className="text-primary font-semibold mb-4 block">About AuctoLabs</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                We Build <span className="gradient-text-warm">Automated Client-Generating Machines</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                AuctoLabs was founded on a simple observation: businesses are losing clients
                because they respond too slowly. In a world where prospects expect instant
                answers, the companies that respond first win the deal.
              </p>
              <p className="text-lg text-muted-foreground">
                We combine high-converting web design with AI-powered automation to help
                service businesses respond to leads in seconds, qualify prospects automatically,
                and book meetings while they sleep.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="text-primary font-semibold mb-4 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Make Every Business As Responsive As The Best
              </h2>
              <p className="text-muted-foreground mb-4">
                The gap between businesses that respond instantly and those that don't is
                growing every day. We're on a mission to close that gap.
              </p>
              <p className="text-muted-foreground">
                By combining beautiful, conversion-focused websites with intelligent automation,
                we help service businesses compete with (and beat) larger competitors who have
                bigger teams and bigger budgets.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="soft-card p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold gradient-text-warm mb-2">100+</div>
                    <div className="text-sm text-muted-foreground">Systems Deployed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold gradient-text-warm mb-2">&lt;60s</div>
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold gradient-text-warm mb-2">340%</div>
                    <div className="text-sm text-muted-foreground">Avg Conversion Lift</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-serif font-bold gradient-text-warm mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">System Uptime</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold mb-4 block">Our Principles</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                How We Think About Growth
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <AnimatedSection key={principle.title} delay={index * 100}>
                <div className="soft-card p-8 h-full">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <principle.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-primary font-semibold mb-4 block">Who We Work With</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Service Businesses That Value Speed
              </h2>
              <p className="text-muted-foreground mb-8">
                We work best with service businesses and professional firms—especially
                those in competitive markets where speed-to-lead matters. Law firms,
                home services, healthcare practices, and B2B service providers are our
                sweet spot.
              </p>
              <p className="text-muted-foreground">
                If you're tired of losing leads to slower competitors and want a system
                that works as hard as you do, we should talk.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Build Your Growth Machine?
              </h2>
              <p className="text-muted-foreground mb-8">
                Let's discuss how we can help you respond faster and convert more.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book a Strategy Call
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
