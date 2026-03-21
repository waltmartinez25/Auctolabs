import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most websites launch within 4–8 weeks depending on the scope of the project. This includes design, development, automation setup, and integration testing.',
  },
  {
    question: 'What makes an AuctoLabs website different?',
    answer:
      "We combine modern web design with automation and performance strategy to create websites that don't just look great — they actively help grow your business. Every build is engineered for speed, conversion, and long-term results.",
  },
  {
    question: 'Can my website integrate with my existing tools?',
    answer:
      'Yes. AuctoLabs websites integrate with CRM systems, marketing platforms, analytics tools, and other essential software — including HubSpot, Salesforce, Pipedrive, and more.',
  },
  {
    question: 'How does the speed-to-lead automation work?',
    answer:
      'When a lead submits a form, our system instantly qualifies them using AI, routes them to the right team member, and sends personalized SMS/email responses — all within seconds.',
  },
  {
    question: 'What happens after the project is complete?',
    answer:
      'We provide training for your team and include support in all packages. For ongoing optimization and growth, we offer monthly retainer options.',
  },
  {
    question: 'Do you work with businesses outside the US?',
    answer:
      'Yes, we work with clients globally. Our systems are built to handle multi-timezone and multi-language requirements.',
  },
];

export const FAQSection = () => {
  return (
    <section className="section-padding border-t border-border/40">
      <div className="container-custom">
        {/* REVERSED split — accordion LEFT, heading RIGHT */}
        <div className="grid gap-16 lg:gap-24 grid-cols-1 lg:grid-cols-[3fr_2fr]">
          {/* Left — Accordion with staggered items */}
          <div className="order-last lg:order-first">
            <AnimatedSection variant="fadeUp" stagger staggerDelay={80} className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full px-6"
                  >
                    <AccordionItem
                      value={`item-${index}`}
                      className="border-none"
                    >
                      <AccordionTrigger className="text-left font-bold hover:no-underline py-6 text-foreground text-lg group">
                        <span className="group-data-[state=open]:text-primary transition-colors">
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-8 leading-relaxed text-base font-medium">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              ))}
            </AnimatedSection>
          </div>

          {/* Right — Heading (sticky) — fade left */}
          <AnimatedSection delay={100} variant="fadeLeft" className="lg:block">
            <div className="lg:sticky lg:top-32 relative">
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -z-10" />
              <span className="text-primary font-bold text-xs uppercase tracking-widest mb-6 block accent-glow">
                Knowledge Base
              </span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-none mb-8 tracking-tightest">
                Common
                <br />
                <span className="text-primary italic accent-glow">Questions</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg font-medium max-w-md">
                Everything you need to know about our high-performance systems,
                our precise timeline, and how we scale your operations.
              </p>

              <div className="mt-12 p-8 glass-card rounded-2xl border-primary/20">
                <p className="text-sm font-bold text-foreground mb-2">Still have questions?</p>
                <p className="text-xs text-muted-foreground mb-6">Our specialists are ready to help you scale.</p>
                <Link
                  to="/contact"
                  className="block w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm text-center primary-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Book a Call
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
