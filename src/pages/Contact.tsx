import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Send, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'How quickly can we get started?',
    answer: 'Most projects kick off within 1-2 weeks of signing. We will schedule a discovery call to understand your needs and begin the audit phase immediately.',
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes, we offer flexible payment options. Typically 50% upfront and 50% on completion, but we can discuss arrangements that work for your business.',
  },
  {
    question: 'What if I am not satisfied with the results?',
    answer: 'We work closely with you throughout the project to ensure alignment. All packages include revision rounds, and we do not consider a project complete until you are satisfied.',
  },
  {
    question: 'Can you work with my existing systems?',
    answer: 'Absolutely. We integrate with virtually any CRM, email platform, or business tool. During the audit phase, we will map out your current tech stack and plan the integration.',
  },
];

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
    toast({
      title: 'Message sent!',
      description: 'We will get back to you within 24 hours.',
    });
  };

  return (
    <Layout>
      <SEO
        title="Contact AuctoLabs - Book a Free Strategy Call"
        description="Ready to transform your lead generation? Contact AuctoLabs for a free strategy call. We respond within 2 hours during business hours."
        keywords="contact AuctoLabs, book strategy call, free consultation, web design inquiry, automation consultation"
        canonical="https://auctolabs.com/contact"
      />
      
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Contact</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
                Let's Build Your<br />
                <span className="gradient-text-warm">Growth Machine</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to turn your website into a client-generating system?
                Book a call or send us a message.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="soft-card p-8">
                <h2 className="text-2xl font-serif font-bold mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-6" />
                    <h3 className="text-xl font-serif font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      We will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="John"
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input
                          type="text"
                          required
                          placeholder="Smith"
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Work Email *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="john@company.com"
                        className="bg-secondary/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <Input
                        type="text"
                        placeholder="Your Company"
                        className="bg-secondary/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        What can we help you with? *
                      </label>
                      <Textarea
                        required
                        rows={4}
                        placeholder="Tell us about your project, goals, or questions..."
                        className="bg-secondary/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={100}>
              <div className="space-y-8">
                {/* Book a Call */}
                <div className="soft-card p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold">Book a Strategy Call</h3>
                      <p className="text-sm text-muted-foreground">
                        30-minute discovery call
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    The fastest way to get started. We will discuss your goals,
                    audit your current systems, and show you exactly how we can help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Schedule Now
                  </Button>
                </div>

                {/* Contact Details */}
                <div className="soft-card p-8">
                  <h3 className="font-serif font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-primary" />
                      <span>hello@auctolabs.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>Remote-first, serving clients globally</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm">
                    <span className="font-semibold">Typical response time:</span>{' '}
                    <span className="text-primary font-bold">Under 2 hours</span>{' '}
                    during business hours (Mon-Fri, 9am-6pm EST)
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
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
                    className="soft-card px-6 border-none"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
