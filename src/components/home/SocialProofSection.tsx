import { AnimatedSection } from '@/components/ui/AnimatedSection';

const logos = [
  'TechCorp',
  'LegalFirst',
  'MedFlow',
  'BuildPro',
  'FinServe',
  'DataFlow',
];

export const SocialProofSection = () => {
  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container-custom">
        <AnimatedSection>
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by growing businesses like yours
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo) => (
              <div
                key={logo}
                className="text-xl md:text-2xl font-serif font-bold text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors cursor-default"
              >
                {logo}
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
