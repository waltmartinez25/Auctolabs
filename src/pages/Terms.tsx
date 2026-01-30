import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const Terms = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">Terms of Service</h1>
              
              <div className="prose prose-lg text-muted-foreground space-y-6">
                <p className="text-sm">Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">1. Acceptance of Terms</h2>
                <p>By accessing and using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">2. Services</h2>
                <p>AuctoLabs provides web design, development, and automation services as described on our website. Specific deliverables and timelines are outlined in individual project agreements.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">3. Payment Terms</h2>
                <p>Payment terms are specified in your project agreement. All fees are non-refundable unless otherwise stated in writing.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">4. Intellectual Property</h2>
                <p>Upon full payment, you own all custom work created specifically for your project. We retain rights to reuse general code, templates, and methodologies.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">5. Limitation of Liability</h2>
                <p>Our liability is limited to the amount paid for services. We are not liable for indirect, incidental, or consequential damages.</p>
                
                <h2 className="text-2xl font-serif font-bold text-foreground mt-8">6. Contact</h2>
                <p>For questions about these Terms, please contact us at hello@auctolabs.com.</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
