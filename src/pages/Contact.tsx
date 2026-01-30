import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@auctolabs.com' },
  { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
  { icon: MapPin, label: 'Location', value: 'Remote-first, Worldwide' },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-warm-radial">
        <div className="container-custom">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Contact Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-foreground">
                Let's Start a <span className="gradient-text-warm">Conversation</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Ready to grow your business? We'd love to hear from you. Book a call or send us a message.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <AnimatedSection>
              <div className="soft-card p-8">
                <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Send Us a Message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2 text-foreground">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours.</p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@company.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" placeholder="Your Company" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project or goals..." 
                        rows={5}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <AnimatedSection delay={100}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-serif font-bold mb-6 text-foreground">Get in Touch</h2>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Have a question or ready to start your project? Reach out using any of the methods below, or fill out the form and we'll get back to you quickly.
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="soft-card p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="soft-card p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <h3 className="font-serif font-bold mb-2 text-foreground">Prefer to Talk?</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Book a free 30-minute strategy call to discuss your goals and see if we're a good fit.
                  </p>
                  <Button variant="outline" className="w-full">
                    Book a Call
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
