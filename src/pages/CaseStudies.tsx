import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';

const caseStudies = [
  {
    title: 'Chen & Associates Law',
    industry: 'Legal',
    challenge: 'Slow lead response time causing lost opportunities',
    solution: 'Implemented speed-to-lead automation with AI qualification',
    results: [
      { metric: '340%', label: 'More consultations' },
      { metric: '<60s', label: 'Response time' },
      { metric: '4x', label: 'ROI in 90 days' },
    ],
    quote: "Within 30 days of launching, our lead response time dropped from 4 hours to under a minute.",
    author: 'Michael Chen, Partner',
  },
  {
    title: 'TechFlow Solutions',
    industry: 'Technology',
    challenge: 'Competitors responding to leads faster',
    solution: 'Built automated lead capture and instant follow-up system',
    results: [
      { metric: '67%', label: 'More meetings' },
      { metric: '15hrs', label: 'Saved weekly' },
      { metric: '2.5x', label: 'Conversion rate' },
    ],
    quote: "We were losing leads to competitors who responded faster. AuctoLabs fixed that completely.",
    author: 'Sarah Martinez, Marketing Director',
  },
  {
    title: 'BuildRight Construction',
    industry: 'Construction',
    challenge: 'Manual lead qualification consuming too much time',
    solution: 'AI-powered qualification chatbot with CRM integration',
    results: [
      { metric: '89%', label: 'Lead qualification' },
      { metric: '50%', label: 'Less admin time' },
      { metric: '$120k', label: 'New revenue' },
    ],
    quote: "The ROI was obvious within 60 days. More qualified leads, less admin work.",
    author: 'David Park, CEO',
  },
];

const CaseStudies = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Case Studies</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                Real Results from <span className="gradient-text-warm">Real Businesses</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                See how we've helped businesses like yours grow with our systems.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <AnimatedSection key={study.title} delay={index * 100}>
                <div className="soft-card overflow-hidden">
                  <div className="grid lg:grid-cols-2">
                    {/* Visual */}
                    <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary p-8 lg:p-12 flex flex-col justify-center min-h-[300px]">
                      <span className="text-sm font-medium text-primary mb-2">{study.industry}</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-foreground">{study.title}</h3>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        {study.results.map((result) => (
                          <div key={result.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-serif font-bold text-primary">{result.metric}</div>
                            <div className="text-xs text-muted-foreground">{result.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">The Challenge</h4>
                        <p className="text-muted-foreground">{study.challenge}</p>
                      </div>
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-2">Our Solution</h4>
                        <p className="text-muted-foreground">{study.solution}</p>
                      </div>
                      <blockquote className="border-l-4 border-primary pl-4 my-6">
                        <p className="text-foreground italic mb-2">"{study.quote}"</p>
                        <cite className="text-sm text-muted-foreground not-italic">— {study.author}</cite>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                Your Success Story Starts Here
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join the growing list of businesses achieving real results.
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

export default CaseStudies;
