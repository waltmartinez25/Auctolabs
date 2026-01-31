import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
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
      
      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="AuctoLabs - Web Design and AI Automation Agency"
        purpose="We help small businesses turn their websites into client-getting machines with high-converting web design and AI-powered automations that respond to leads in under 60 seconds."
        audience="Small business owners, service businesses, law firms, home services companies, healthcare practices, and B2B service providers who want to automate lead generation and improve response times"
        services={[
          "Custom web design and development",
          "AI-powered lead qualification chatbots",
          "CRM integration (HubSpot, Salesforce, Pipedrive)",
          "Email and SMS automation sequences",
          "Speed-to-lead systems with under 60-second response times",
          "Lead generation and conversion optimization"
        ]}
      />
      
      {/* Structured facts for AI parsing */}
      <HiddenStructuredFacts
        facts={{
          "Average response time": "Under 60 seconds",
          "Average conversion lift": "340%",
          "Systems deployed": "100+",
          "System uptime": "24/7",
          "Typical project timeline": "4-6 weeks",
          "Starter package price": "$3,500 one-time",
          "Growth package price": "$7,500 one-time",
          "Scale package price": "$15,000 one-time",
          "Target industries": "Law firms, home services, healthcare, B2B services",
          "Service area": "Remote-first, serving clients globally"
        }}
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
