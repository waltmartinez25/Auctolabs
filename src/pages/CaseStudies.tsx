import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const caseStudies = [
  {
    id: 'personal-injury-firm',
    title: 'Personal Injury Law Firm',
    subtitle: '340% Increase in Qualified Consultations',
    description: 'A 5-attorney personal injury firm struggling with slow lead response and manual intake processes.',
    challenge: 'The firm was losing potential clients to competitors who responded faster. Their average response time was 4+ hours, and intake staff were overwhelmed with unqualified leads.',
    solution: 'We implemented a complete speed-to-lead system with AI qualification, instant SMS/email response, and automated appointment booking. Leads are now qualified and routed within 60 seconds.',
    results: [
      { icon: TrendingUp, value: '340%', label: 'More consultations' },
      { icon: Clock, value: '<45s', label: 'Response time' },
      { icon: Users, value: '$0', label: 'Additional staff' },
    ],
    testimonial: {
      quote: 'We went from scrambling to respond to leads to having a system that works 24/7. The ROI was obvious within the first month.',
      author: 'Managing Partner',
    },
    isExample: true,
  },
  {
    id: 'home-services',
    title: 'Home Services Company',
    subtitle: '67% Increase in Booked Jobs',
    description: 'A regional HVAC company with multiple locations wanted to improve their lead-to-job conversion rate.',
    challenge: 'Leads were getting lost between locations, response times varied wildly, and there was no consistent follow-up process. Marketing spend was increasing but job bookings remained flat.',
    solution: 'We built a centralized lead management system with intelligent routing based on location and availability, automated follow-up sequences, and real-time dashboards for management.',
    results: [
      { icon: TrendingUp, value: '67%', label: 'More booked jobs' },
      { icon: Clock, value: '2 min', label: 'Avg response time' },
      { icon: Users, value: '23%', label: 'Lower cost per lead' },
    ],
    testimonial: {
      quote: 'Finally, all our leads go to one place and get handled consistently. No more finger-pointing between locations about who dropped the ball.',
      author: 'Operations Director',
    },
    isExample: true,
  },
  {
    id: 'saas-startup',
    title: 'B2B SaaS Startup',
    subtitle: '4x Demo Booking Rate',
    description: 'An early-stage SaaS company needed to maximize conversions from their limited marketing budget.',
    challenge: 'The founding team was spending hours manually qualifying leads and scheduling demos. Many leads went cold before they could reach them.',
    solution: 'We created an AI-powered qualification chatbot that engages leads instantly, qualifies them based on ICP criteria, and books demos directly on the calendar—no human touch needed for initial contact.',
    results: [
      { icon: TrendingUp, value: '4x', label: 'Demo booking rate' },
      { icon: Clock, value: '15 hrs', label: 'Saved per week' },
      { icon: Users, value: '89%', label: 'Qualification accuracy' },
    ],
    testimonial: {
      quote: 'Our AI chatbot books more demos than our SDR did. And it works nights and weekends without complaining.',
      author: 'CEO & Founder',
    },
    isExample: true,
  },
];

const CaseStudies = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Case Studies</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Real Results From<br />
                <span className="gradient-text-warm">Real Clients</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                See how businesses like yours have transformed their lead generation
                and follow-up with our automation systems.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mx-auto block text-center">
              <span className="text-sm text-muted-foreground">
                Note: These case studies are illustrative examples based on typical client results.
              </span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.map((study, index) => (
        <section
          key={study.id}
          className={`section-padding ${index % 2 === 0 ? 'bg-secondary/30' : ''}`}
        >
          <div className="container-custom">
            <AnimatedSection>
              <div className="soft-card overflow-hidden">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-semibold">{study.title}</span>
                    {study.isExample && (
                      <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        Example
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-4">
                    {study.subtitle}
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-3xl">
                    {study.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">The Challenge</h3>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 text-primary">The Solution</h3>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center p-4 rounded-xl bg-secondary/50">
                        <result.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-2xl md:text-3xl font-serif font-bold gradient-text-warm">
                          {result.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{result.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-lg italic mb-4">"{study.testimonial.quote}"</p>
                    <p className="text-muted-foreground">— {study.testimonial.author}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="soft-card p-12 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Become Our Next Success Story?
              </h2>
              <p className="text-muted-foreground mb-8">
                Book a strategy call to discuss how we can achieve similar results for your business.
              </p>
              <Button asChild variant="hero" size="lg">
                <Link to="/contact">
                  Book Your Strategy Call
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

export default CaseStudies;
