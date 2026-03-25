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

const homeSchema = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AuctoLabs",
    "url": "https://auctolabs.com",
    "logo": "https://auctolabs.com/logo.png",
    "description": "AuctoLabs builds conversion-focused websites and AI-powered lead automation systems for service businesses — responding to leads in under 60 seconds, 24/7.",
    "email": "contact@auctolabs.com",
    "areaServed": "Worldwide",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "contact@auctolabs.com",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://www.linkedin.com/company/auctolabs",
      "https://x.com/AuctoLabs",
      "https://www.instagram.com/auctolabs"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AuctoLabs",
    "url": "https://auctolabs.com",
    "description": "Web design, AI automations, and lead generation systems for service businesses",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://auctolabs.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a typical AuctoLabs project take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most websites launch within 4–8 weeks depending on scope. This includes design, development, automation setup, and integration testing. Simple websites can launch in 4 weeks; full growth systems with CRM integrations typically take 6–8 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "What makes an AuctoLabs website different from a regular web design agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AuctoLabs builds complete growth systems, not just websites. Every site we build includes speed-to-lead automation, CRM integration, and conversion optimization — so your website actively generates and responds to leads, not just presents information."
        }
      },
      {
        "@type": "Question",
        "name": "Can my website integrate with my existing CRM or tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. AuctoLabs integrates with HubSpot, Salesforce, Pipedrive, Clio, and virtually any CRM or business tool via API. During the audit phase we map your entire tech stack and plan all integrations."
        }
      },
      {
        "@type": "Question",
        "name": "How does speed-to-lead automation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When a lead submits a form on your website, our system instantly qualifies them using AI, routes them to the right team member, and sends personalized SMS and email responses — all within 60 seconds. This dramatically improves contact rates since 78% of leads go with the first business to respond."
        }
      },
      {
        "@type": "Question",
        "name": "What happens after the website project is complete?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide full team training and include post-launch support in all packages (30 to 90 days depending on package). For ongoing optimization, performance tracking, and system improvements, we offer monthly retainer options starting at $1,500/month."
        }
      },
      {
        "@type": "Question",
        "name": "Does AuctoLabs work with businesses outside the US?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We are remote-first and work with clients globally. Our systems are built to handle multi-timezone and multi-language requirements."
        }
      }
    ]
  }
];

const Index = () => {
  return (
    <Layout>
      <SEO
        title="AuctoLabs | Web Design, AI Automations & Lead Generation for Service Businesses"
        description="Turn your website into a client-getting machine. AuctoLabs builds high-converting websites and AI-powered automations that respond to leads in under 60 seconds. Free strategy call."
        keywords="web design, AI automations, lead generation, small business, CRM integration, speed to lead, conversion optimization, service business"
        canonical="https://auctolabs.com/"
        jsonLd={homeSchema}
      />

      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="AuctoLabs — Web Design and AI Automation Agency for Service Businesses"
        purpose="AuctoLabs helps service businesses turn their websites into client-getting machines with high-converting web design and AI-powered automations that respond to leads in under 60 seconds, 24/7."
        audience="Small business owners, service businesses, law firms, home services companies, healthcare practices, and B2B service providers who want to automate lead generation and improve response times"
        services={[
          "Custom web design and development — conversion-focused, mobile-first",
          "AI-powered lead qualification chatbots — responds in under 60 seconds",
          "CRM integration — HubSpot, Salesforce, Pipedrive, Clio and more",
          "Email and SMS automation sequences — automated follow-up",
          "Speed-to-lead systems — under 60-second response times guaranteed",
          "Lead generation and conversion optimization — 340%+ average improvement"
        ]}
      />

      {/* Structured facts for AI parsing */}
      <HiddenStructuredFacts
        facts={{
          "What is AuctoLabs": "AuctoLabs is a web design and AI automation agency that builds complete growth systems for service businesses — combining high-converting websites with intelligent automation to capture leads, qualify prospects, and book meetings automatically.",
          "Average lead response time": "Under 60 seconds",
          "Average conversion improvement": "340%+",
          "Systems deployed": "100+",
          "System uptime": "24/7 automated",
          "Typical project timeline": "4–8 weeks",
          "Starter package price": "$3,500 one-time (Launch)",
          "Growth package price": "$7,500 one-time (Grow)",
          "Scale package price": "$15,000 one-time (Scale)",
          "Target industries": "Law firms, home services, healthcare, real estate, B2B services",
          "Service area": "Remote-first, serving clients globally",
          "Contact email": "contact@auctolabs.com",
          "Free consultation": "30-minute strategy call — book at calendly.com/waltermartinez-auctolabs/30min"
        }}
      />

      {/* 1. Attention — above the fold */}
      <HeroSection />

      {/* 2. Immediate trust — credibility before they scroll */}
      <SocialProofSection />

      {/* 3. The offer — what we do */}
      <ServicesSection />

      {/* 4. The path — now they want results, show them how */}
      <ProcessSection />

      {/* 5. Emotional proof — fast, human, scannable */}
      <TestimonialsSection />

      {/* 6. Investment — after full value has been demonstrated */}
      <PricingPreview />

      {/* 7. Objection handling — clear doubts before final decision */}
      <FAQSection />

      {/* 8. Final conversion push */}
      <CTASection />
    </Layout>
  );
};

export default Index;
