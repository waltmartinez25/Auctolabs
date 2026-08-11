import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
import { HeroSection } from '@/components/home/HeroSection';
import { SocialProofSection } from '@/components/home/SocialProofSection';
import { ProblemSection } from '@/components/home/ProblemSection';
import { BuildTiles } from '@/components/home/BuildTiles';
import { ProcessSection } from '@/components/home/ProcessSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { PricingPreview } from '@/components/home/PricingPreview';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      // ProfessionalService rather than plain Organization: it is a subtype of
      // LocalBusiness, so `areaServed` and `serviceType` are meaningful and the
      // entity can be understood as a business someone can hire — which is what
      // an assistant needs to know before recommending it.
      "@type": "ProfessionalService",
      "@id": "https://auctolabs.com/#organization",
      "name": "AuctoLabs",
      "url": "https://auctolabs.com",
      "logo": "https://auctolabs.com/logo.svg",
      "image": "https://auctolabs.com/og-image.jpg",
      "description": "Web design, AI automations, and lead generation systems for small businesses",
      "slogan": "Never miss a lead. Ever again.",
      "founder": {
        "@type": "Person",
        "name": "Walter Martinez",
        "jobTitle": "Founder"
      },
      // Based in Houston, serving the US remotely. Both are stated: the city
      // is what earns Map Pack placement (proximity is roughly half of local
      // ranking weight), the country is what keeps national queries valid.
      //
      // `addressLocality` + `addressRegion` only — no street address, since
      // there is no public office. A fabricated street address in structured
      // data is exactly what Google penalises, and Google Business Profile
      // supports service-area businesses that hide their address.
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Houston",
        "addressRegion": "TX",
        "addressCountry": "US"
      },
      "areaServed": [
        { "@type": "City", "name": "Houston" },
        { "@type": "State", "name": "Texas" },
        { "@type": "Country", "name": "United States" }
      ],
      "availableLanguage": "English",
      "serviceType": [
        "Web Design",
        "AI Automation",
        "Lead Generation",
        "CRM Integration",
        "Conversion Rate Optimization"
      ],
      "knowsAbout": [
        "Speed to lead",
        "Automated lead qualification",
        "CRM integration",
        "Conversion-focused web design",
        "Marketing automation"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@auctolabs.com",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.linkedin.com/company/auctolabs",
        "https://x.com/AuctoLabs",
        "https://www.instagram.com/auctolabs"
      ]
    },
    {
      // Names the site itself, so search engines can attribute pages to the
      // organisation above rather than treating each as a standalone document.
      "@type": "WebSite",
      "@id": "https://auctolabs.com/#website",
      "url": "https://auctolabs.com",
      "name": "AuctoLabs",
      "publisher": { "@id": "https://auctolabs.com/#organization" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does a typical project take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most websites launch within 4–6 weeks depending on the scope of the project. This includes design, development, automation setup, and integration testing."
          }
        },
        {
          "@type": "Question",
          "name": "What makes an AuctoLabs website different?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We combine modern web design with automation and performance strategy to create websites that don't just look great. They actively help grow your business. Every build is engineered for speed, conversion, and long-term results."
          }
        },
        {
          "@type": "Question",
          "name": "Can my website integrate with my existing tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. AuctoLabs websites integrate with CRM systems, marketing platforms, analytics tools, and other essential software, including HubSpot, Salesforce, Pipedrive, and more."
          }
        },
        {
          "@type": "Question",
          "name": "How does the speed-to-lead automation work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "When a lead submits a form, our system automatically qualifies them using AI, routes them to the right team member, and sends personalized SMS/email responses, all in under 2 minutes."
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
          "name": "Where is AuctoLabs located and who do you work with?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AuctoLabs is based in Houston, Texas and works with service businesses across the United States. The work is remote-first, so location is not a constraint. Houston-area clients can meet in person."
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
        title="AuctoLabs | AI Automation & Web Design, Houston TX"
        description="Houston agency building websites plus the automation behind them, so every lead is answered, qualified, and booked in under 2 minutes, day or night."
        keywords="web design, AI automations, lead generation, small business, CRM integration, speed to lead, conversion optimization"
        canonical="https://auctolabs.com/"
        jsonLd={homeSchema}
      />
      
      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="AuctoLabs - Web Design and AI Automation Agency"
        purpose="We help small businesses turn their websites into client-getting machines with high-converting web design and AI-powered automations that respond to leads in under 2 minutes."
        audience="Small business owners, service businesses, law firms, home services companies, healthcare practices, and B2B service providers who want to automate lead generation and improve response times"
        services={[
          "Custom web design and development",
          "AI-powered lead qualification chatbots",
          "CRM integration (HubSpot, Salesforce, Pipedrive)",
          "Email and SMS automation sequences",
          "Speed-to-lead systems with under 2-minute response times",
          "Lead generation and conversion optimization"
        ]}
      />
      
      {/* Structured facts for AI parsing */}
      <HiddenStructuredFacts
        facts={{
          "Target speed to lead": "Under 2 minutes via automated systems",
          "Industry stat, lead qualification": "21x more likely to qualify a lead responding in 5 min vs 30 min (InsideSales.com)",
          "Industry stat, first responder": "78% of buyers go with the first company to respond (Velocify)",
          "System uptime": "24/7",
          "Typical project timeline": "4-6 weeks",
          "Engagement models": "Two options: Launch (fixed-scope build, live in 4–6 weeks) and Partner (month-to-month ongoing work)",
          "How pricing works": "Scope is quoted per engagement after a free strategy call. No fixed package prices",
          "Target industries": "Law firms, home services, healthcare, B2B services",
          "Service area": "Houston, TX. Serving clients nationwide"
        }}
      />
      
      {/* 1. Attention — above the fold */}
      <HeroSection />

      {/* 2. The tension — name the problem before offering the fix */}
      <ProblemSection />

      {/* 3. The offer — what we build, as bento tiles. Carries its own
             closing CTA so the middle of the page isn't a dead zone. */}
      <BuildTiles />

      {/* 4. Proof — the numbers land after the offer has been made */}
      <SocialProofSection />

      {/* 5. The path — how it happens, ending in a booking link */}
      <ProcessSection />

      {/* 6. The decision */}
      <PricingPreview />

      {/* 7. Emotional proof, sitting right beside the decision it supports */}
      <TestimonialsSection />

      {/* 8. Objection handling — clear doubts before final decision */}
      <FAQSection />

      {/* 9. Final conversion push */}
      <CTASection />
    </Layout>
  );
};

export default Index;
