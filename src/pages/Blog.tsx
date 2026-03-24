import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Rss } from 'react-bootstrap-icons';

const Blog = () => {
  return (
    <Layout>
      <SEO
        title="Blog | AuctoLabs — AI Automation & Web Design Insights"
        description="Practical guides on AI automation, speed-to-lead systems, web design, and lead generation for small businesses. Real strategies from the AuctoLabs team."
        keywords="AI automation blog, lead generation tips, web design insights, speed to lead, CRM automation, small business growth"
        canonical="https://auctolabs.com/blog"
      />

      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection variant="fadeUp">
            <div className="text-center max-w-4xl mx-auto">
              <Rss className="w-5 h-5 text-primary mb-3 mx-auto block" />
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-widest">
                Coming Soon
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                Growth{' '}
                <span className="gradient-text-warm">Playbook</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3 max-w-2xl mx-auto">
                Practical guides on AI automation, speed-to-lead systems, and web design built for real business results — no fluff.
              </p>
              <p className="text-base font-semibold text-foreground mb-10 max-w-xl mx-auto">
                Real strategies from the AuctoLabs team. Published when it's ready.
              </p>

              <div className="glass-card rounded-2xl p-10 text-left max-w-2xl mx-auto mb-12">
                <p className="text-sm font-bold text-foreground mb-1">Get notified when we publish</p>
                <p className="text-sm text-muted-foreground mb-6">
                  We're writing guides on topics like: cutting lead response time to under 60 seconds, CRM automation setups that actually work, and what makes a high-converting agency website.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/contact">
                    Let us know you're interested <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                In the meantime, book a free strategy call and get personalized insights for your business.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
