import { useState } from 'react';
import { Envelope, GeoAlt, Calendar3, Send, CheckCircle, ArrowClockwise } from 'react-bootstrap-icons';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { SEO } from '@/components/SEO';
import { PageSummary } from '@/components/PageSummary';
import { HiddenStructuredFacts } from '@/components/StructuredFacts';
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

const contactSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name:  z.string().min(1, 'Last name is required').max(100),
  email:      z.string().email('Please enter a valid email address'),
  company:    z.string().max(200).optional(),
  message:    z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

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

    const formData = new FormData(e.currentTarget);
    const raw = {
      first_name: (formData.get('first_name') as string).trim(),
      last_name:  (formData.get('last_name')  as string).trim(),
      email:      (formData.get('email')       as string).trim(),
      company:    (formData.get('company')     as string).trim() || undefined,
      message:    (formData.get('message')     as string).trim(),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      setIsLoading(false);
      toast({
        title: 'Please check your details',
        description: parsed.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    const { error } = await supabase.from('form_submissions').insert({
      ...parsed.data,
      company: parsed.data.company ?? null,
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again or email us directly.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: 'Message sent!',
      description: 'We will get back to you within 24 hours.',
    });
  };

  return (
    <Layout>
      <SEO
        title="Contact AuctoLabs — Free 30-Min Web Design Strategy Call"
        description="Ready to transform your lead generation? Book a free AuctoLabs strategy call. We respond within 2 hours and help identify your biggest growth opportunities."
        keywords="contact AuctoLabs, book strategy call, free consultation, web design inquiry, automation consultation"
        canonical="https://auctolabs.com/contact"
      />
      
      {/* Plain-text summary for AI search engines */}
      <PageSummary
        topic="Contact AuctoLabs - Book a Free Strategy Call"
        purpose="Contact AuctoLabs to discuss your web design and automation needs. Book a free 30-minute strategy call to audit your current systems and discover opportunities for improvement. We respond within 2 hours during business hours."
        audience="Business owners ready to improve their lead generation, marketing managers seeking automation solutions, and decision-makers evaluating web design agencies"
        services={[
          "Free 30-minute strategy call",
          "Current system audit and recommendations",
          "Custom web design and automation proposals",
          "Flexible payment options available"
        ]}
      />
      
      <HiddenStructuredFacts
        facts={{
          "Contact email": "hello@auctolabs.com",
          "Location": "Remote-first, serving clients globally",
          "Response time": "Under 2 hours during business hours (Mon-Fri, 9am-6pm EST)",
          "Free consultation": "30-minute strategy call available",
          "Project kickoff": "Most projects start within 1-2 weeks of signing",
          "Payment terms": "Flexible options, typically 50% upfront and 50% on completion",
          "Integrations supported": "HubSpot, Salesforce, Pipedrive, and virtually any CRM or business tool"
        }}
      />
      
      {/* Hero */}
      <section className="section-padding pt-32">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-primary font-semibold mb-4 block">Contact</span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
                Let's Build Your<br />
                <span className="gradient-text-warm">Growth Machine</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-3">
                Ready to turn your website into a client-generating system?
              </p>
              <p className="text-xl text-muted-foreground">
                Book a strategy call or send us a message. We'll review your current
                setup and show you how it can work harder for your business.
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
                  <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="first_name" className="block text-sm font-medium mb-2">
                          First Name *
                        </label>
                        <Input
                          id="first_name"
                          type="text"
                          name="first_name"
                          required
                          autoComplete="given-name"
                          placeholder="John"
                          className="bg-secondary/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="last_name" className="block text-sm font-medium mb-2">
                          Last Name *
                        </label>
                        <Input
                          id="last_name"
                          type="text"
                          name="last_name"
                          required
                          autoComplete="family-name"
                          placeholder="Smith"
                          className="bg-secondary/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Work Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="john@company.com"
                        className="bg-secondary/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <Input
                        id="company"
                        type="text"
                        name="company"
                        autoComplete="organization"
                        placeholder="Your Company"
                        className="bg-secondary/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        What can we help you with? *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
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
                        <>
                          <ArrowClockwise className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" fill="currentColor" />
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
                      <Calendar3 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-serif font-bold">Book a Strategy Call</h3>
                      <p className="text-sm text-muted-foreground">
                        30-minute discovery call
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    A focused 30-minute session where we review your website, identify
                    missed opportunities, and outline how an automated growth system
                    could work for your business.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://calendly.com/waltermartinez-auctolabs/30min" target="_blank" rel="noopener noreferrer">Schedule Now</a>
                  </Button>
                </div>

                {/* Contact Details */}
                <div className="soft-card p-8">
                  <h3 className="text-lg font-serif font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Envelope className="w-5 h-5 text-primary" />
                      <a href="mailto:hello@auctolabs.com" className="hover:text-primary transition-colors">hello@auctolabs.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                      <GeoAlt className="w-5 h-5 text-primary" />
                      <span>Remote-first, serving clients globally</span>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-sm mb-2">
                    <span className="font-semibold">Typical response time:</span>{' '}
                    <span className="text-primary font-bold">Under 2 hours</span>{' '}
                    during business hours.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We move quickly because opportunities shouldn't wait.
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
