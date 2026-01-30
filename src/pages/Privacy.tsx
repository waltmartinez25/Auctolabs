import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const Privacy = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">Privacy Policy</h1>
              
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you fill out a contact form, request a consultation, or communicate with us via email.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">2. How We Use Your Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and respond to your inquiries.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">3. Information Sharing</h2>
                <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">4. Data Security</h2>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">5. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at hello@auctolabs.com.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
