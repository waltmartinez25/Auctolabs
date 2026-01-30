import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Target, Zap, Users } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Small Business First',
    description: 'We build solutions sized for growing businesses, not enterprise budgets.',
  },
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'Every decision is driven by one question: will this help you grow?',
  },
  {
    icon: Zap,
    title: 'Speed Matters',
    description: 'Fast response times win clients. We build systems that move quickly.',
  },
  {
    icon: Users,
    title: 'Partnership Approach',
    description: "We're not just vendors—we're partners invested in your success.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">About Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                Built for Businesses <span className="gradient-text-warm">Like Yours</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're a team of designers, developers, and automation experts who believe every small business deserves enterprise-level growth systems.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                  Why We Started AuctoLabs
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    We saw too many small businesses struggling with outdated websites and manual processes while their larger competitors were automating everything.
                  </p>
                  <p>
                    The tools existed, but they were either too expensive or too complex for the average business owner to implement. We knew there had to be a better way.
                  </p>
                  <p>
                    That's why we built AuctoLabs—to bring enterprise-grade growth systems to businesses of all sizes, packaged in a way that's affordable and easy to manage.
                  </p>
                  <p>
                    Today, we help businesses across industries respond faster, convert more leads, and grow predictably with beautiful websites and smart automations.
                  </p>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <div className="soft-card p-8 bg-gradient-to-br from-primary/5 to-accent/5 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-serif font-bold text-primary mb-2">100+</div>
                  <p className="text-muted-foreground">Businesses Served</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                What Drives Us
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 50}>
                <div className="soft-card p-6 text-center h-full bg-background">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-serif font-bold mb-2 text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Ready to Work Together?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can help your business grow.
              </p>
              <Button asChild variant="hero" size="xl">
                <Link to="/contact">
                  Book a Strategy Call <ArrowRight className="ml-2 h-5 w-5" />
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
