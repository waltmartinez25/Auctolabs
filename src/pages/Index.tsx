import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "AuctoLabs",
      "url": "https://auctolabs.com",
      "logo": "https://auctolabs.com/logo.png",
      "description": "Web design, AI automations, and lead generation systems for small businesses",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@auctolabs.com",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.linkedin.com/company/auctolabs",
        "https://x.com/AuctoLabs",
        "https://www.instagram.com/auctolabs"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does a typical project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most websites launch within 4–8 weeks depending on the scope of the project. This includes design, development, automation setup, and integration testing."
          }
        },
        {
          "@type": "Question",
          "name": "What makes an AuctoLabs website different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We combine modern web design with automation and performance strategy to create websites that don't just look great — they actively help grow your business. Every build is engineered for speed, conversion, and long-term results."
          }
        },
        {
          "@type": "Question",
          "name": "Can my website integrate with my existing tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AuctoLabs websites integrate with CRM systems, marketing platforms, analytics tools, and other essential software — including HubSpot, Salesforce, Pipedrive, and more."
          }
        },
        {
          "@type": "Question",
          "name": "How does the speed-to-lead automation work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When a lead submits a form, our system instantly qualifies them using AI, routes them to the right team member, and sends personalized SMS/email responses — all within seconds."
          }
        },
        {
          "@type": "Question",
          "name": "What happens after the project is complete?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide training for your team and include support in all packages. For ongoing optimization and growth, we offer monthly retainer options."
          }
        },
        {
          "@type": "Question",
          "name": "Do you work with businesses outside the US?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we work with clients globally. Our systems are built to handle multi-timezone and multi-language requirements."
          }
        }
      ]
    }
  ]
};

const Index = () => {
  return (
    <Layout>
      <SEO
        title="AuctoLabs | Web Design, AI Automations & Lead Generation"
        description="Turn your website into a client-getting machine. AuctoLabs builds high-converting websites and AI-powered automations that respond to leads in under 60s."
        keywords="web design, AI automations, lead generation, small business, CRM integration, speed to lead, conversion optimization"
        canonical="https://auctolabs.com/"
        jsonLd={homeSchema}
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
          "Target speed to lead": "Under 5 minutes via automated systems",
          "Industry stat — lead qualification": "21x more likely to qualify a lead responding in 5 min vs 30 min (InsideSales.com)",
          "Industry stat — first responder": "78% of buyers go with the first company to respond (Velocify)",
          "System uptime": "24/7",
          "Typical project timeline": "4-6 weeks",
          "Starter package price": "$3,500 one-time",
          "Growth package price": "$7,500 one-time",
          "Scale package price": "$12,000 one-time",
          "Target industries": "Law firms, home services, healthcare, B2B services",
          "Service area": "Remote-first, serving clients globally"
        }}
      />
      
      {/* 1. Attention — above the fold */}
      <HeroSection />

      {/* 2. Immediate trust — credibility before they scroll */}
      <SocialProofSection />

      {/* 3. The offer — what we do */}
      <ServicesSection />

      {/* 5. The path — now they want results, show them how */}
      <ProcessSection />

      {/* 6. Emotional proof */}
      <TestimonialsSection />


      {/* 8. Investment — after full value has been demonstrated */}
      <PricingPreview />

      {/* 9. Objection handling — clear doubts before final decision */}
      <FAQSection />

      {/* 10. Final conversion push */}
      <CTASection />
    </Layout>
  );
};

export default Index;
