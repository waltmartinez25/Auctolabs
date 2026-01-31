import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { MetricsSection } from '@/components/home/MetricsSection';
import { CaseStudyPreview } from '@/components/home/CaseStudyPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AuctoLabs",
  "url": "https://auctolabs.com",
  "logo": "https://auctolabs.com/logo.png",
  "description": "Web design, AI automations, and lead generation systems for small businesses",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@auctolabs.com",
    "contactType": "customer service"
  },
  "sameAs": [
    "https://linkedin.com/company/auctolabs",
    "https://twitter.com/auctolabs"
  ]
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="AuctoLabs | Web Design & AI Automations for Small Business Growth"
        description="Turn your website into a client-getting machine. AuctoLabs builds high-converting websites and AI-powered automations that respond to leads in under 60 seconds."
        keywords="web design, AI automations, lead generation, small business, CRM integration, speed to lead, conversion optimization"
        canonical="https://auctolabs.com/"
        jsonLd={organizationSchema}
      />
      <HeroSection />
      <SocialProofSection />
      <ServicesSection />
      <ProcessSection />
      <MetricsSection />
      <CaseStudyPreview />
      <TestimonialsSection />
      <PricingPreview />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
