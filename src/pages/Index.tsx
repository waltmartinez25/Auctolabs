import { Layout } from '@/components/layout/Layout';
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

const Index = () => {
  return (
    <Layout>
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
