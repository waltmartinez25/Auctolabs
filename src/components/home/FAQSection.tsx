import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const faqs = [
  {
    question: 'How long does it take to build a complete system?',
    answer:
      'Most projects are completed within 4-6 weeks. This includes the website build, automation setup, and integration testing. Complex enterprise projects may take 8-10 weeks.',
  },
  {
    question: 'Do I need to provide content for my website?',
    answer:
      'We help you develop messaging and copy as part of the process. You\'ll provide your core value propositions and we\'ll craft compelling content that converts visitors into leads.',
  },
  {
    question: 'What if I already have a CRM?',
    answer:
      'We integrate with virtually any CRM including HubSpot, Salesforce, Pipedrive, Clio, and many others. If you don\'t have one, we can recommend and set up the right solution for your needs.',
  },
  {
    question: 'How does the speed-to-lead automation work?',
    answer:
      'When a lead submits a form, our system instantly qualifies them using AI, routes them to the right team member, and sends personalized SMS/email responses—all within seconds. No human intervention needed for the initial response.',
  },
  {
    question: 'What happens after the project is complete?',
    answer:
      'We provide training for your team and include support in all packages. For ongoing optimization and maintenance, we offer monthly retainer options to keep your systems performing at peak levels.',
  },
  {
    question: 'Do you work with businesses outside the US?',
    answer:
      'Yes, we work with clients globally. Our systems are designed to work across time zones and can handle multi-language requirements.',
  },
];

export const FAQSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">FAQ</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              Common Questions
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="soft-card px-6 border-none data-[state=open]:shadow-soft-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6 text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
