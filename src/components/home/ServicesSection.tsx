import { Link } from 'react-router-dom';
import { Globe, Bot, Target, Zap, ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const services = [
  {
    icon: Globe,
    title: 'Web Design & Development',
    description: 'Beautiful, fast websites that capture attention and turn visitors into leads. Built to reflect your brand and convert.',
    link: '/services#web-design',
  },
  {
    icon: Bot,
    title: 'AI Automations',
    description: 'Smart workflows that handle lead routing, CRM updates, email/SMS sequences, and more—so you can focus on your clients.',
    link: '/services#ai-automations',
  },
  {
    icon: Target,
    title: 'Lead Generation Systems',
    description: 'End-to-end systems that attract, qualify, and nurture prospects without the manual busywork. Built for sustainable growth.',
    link: '/services#lead-generation',
  },
  {
    icon: Zap,
    title: 'Performance Systems',
    description: 'Speed-to-lead response, automated follow-ups, and real-time analytics to help you hit your growth goals consistently.',
    link: '/services#performance-systems',
  },
];

export const ServicesSection = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold mb-4 block text-sm uppercase tracking-wide">What We Build</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-foreground">
              Complete Growth Systems,<br />Not Just Websites
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every component works together to turn your online presence into a 24/7 lead generation machine.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <AnimatedSection key={service.title} delay={index * 100}>
              <Link to={service.link} className="block group h-full">
                <div className="soft-card-hover p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center text-primary font-medium group-hover:gap-3 gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
