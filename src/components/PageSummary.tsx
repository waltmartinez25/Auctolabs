interface PageSummaryProps {
  topic: string;
  purpose: string;
  audience: string;
  services: string[];
  businessName?: string;
  location?: string;
}

export const PageSummary = ({
  topic,
  purpose,
  audience,
  services,
  businessName = "AuctoLabs",
  location = "Remote-first, serving clients globally",
}: PageSummaryProps) => {
  return (
    <aside 
      aria-label="Page summary" 
      className="sr-only"
      itemScope 
      itemType="https://schema.org/WebPage"
    >
      <meta itemProp="name" content={topic} />
      <meta itemProp="description" content={purpose} />
      <p itemProp="abstract">
        <strong>Topic:</strong> {topic}. <strong>Purpose:</strong> {purpose}. 
        <strong>For:</strong> {audience}. 
        <strong>Services:</strong> {services.join(", ")}. 
        <strong>Provider:</strong> {businessName}, {location}.
      </p>
    </aside>
  );
};

// Visible variant for pages where you want the summary shown
export const VisiblePageSummary = ({
  topic,
  purpose,
  audience,
  services,
  businessName = "AuctoLabs",
  location = "Remote-first, serving clients globally",
}: PageSummaryProps) => {
  return (
    <section 
      aria-label="Page overview"
      className="bg-muted/30 border-b border-border py-4"
    >
      <div className="container-custom">
        <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
          <span className="font-medium text-foreground">{topic}</span> — {purpose} Designed for {audience.toLowerCase()}. 
          {businessName} offers {services.join(", ").toLowerCase()}. Based {location.toLowerCase()}.
        </p>
      </div>
    </section>
  );
};
