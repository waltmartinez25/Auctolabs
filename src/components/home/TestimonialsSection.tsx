import { Star, Quote } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const testimonials = [
  {
    quote: "Within 30 days of launching, our lead response time dropped from 4 hours to under a minute. The automation handles everything—we just show up to qualified calls.",
    author: 'Michael Chen',
    role: 'Partner',
    company: 'Chen & Associates Law',
  },
  {
    quote: "We were losing leads to competitors who responded faster. AuctoLabs fixed that completely. Now we're the ones beating everyone to the punch.",
    author: 'Sarah Martinez',
    role: 'Marketing Director',
    company: 'TechFlow Solutions',
  },
  {
    quote: "The ROI was obvious within 60 days. More qualified leads, less admin work, and a website that actually converts. Worth every penny.",
    author: 'David Park',
    role: 'CEO',
    company: 'BuildRight Construction',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">Client Stories</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              What Our Clients Say
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.author} delay={index * 100}>
              <div className="soft-card p-8 h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-primary/20 mb-3" />
                <p className="text-foreground flex-grow mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
