interface StructuredFactsProps {
  facts: {
    label: string;
    value: string;
  }[];
  className?: string;
}

// Renders facts in a semantically rich, plain-text format that AI can parse
export const StructuredFacts = ({ facts, className = "" }: StructuredFactsProps) => {
  return (
    <dl 
      className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}
      itemScope 
      itemType="https://schema.org/ItemList"
    >
      {facts.map((fact, index) => (
        <div 
          key={fact.label} 
          className="text-center p-4 rounded-xl bg-secondary/50"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <meta itemProp="position" content={String(index + 1)} />
          <dt className="text-sm text-muted-foreground mb-1" itemProp="name">{fact.label}</dt>
          <dd className="text-2xl md:text-3xl font-serif font-bold gradient-text-warm" itemProp="description">
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

// Hidden but parseable facts for AI search engines
export const HiddenStructuredFacts = ({ facts }: { facts: Record<string, string> }) => {
  return (
    <div 
      className="sr-only" 
      aria-hidden="false"
      itemScope 
      itemType="https://schema.org/Dataset"
    >
      <dl>
        {Object.entries(facts).map(([key, value]) => (
          <div key={key} itemProp="datasetProperty">
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
