import { useState } from 'react';
import { Diagram3Fill } from 'react-bootstrap-icons';
import { cn } from '@/lib/utils';

interface ToolLogoProps {
  /** Simple Icons slug, e.g. "hubspot". */
  slug: string;
  className?: string;
  /** Applied to the <img> only — e.g. a brightness filter for white-on-brand. */
  style?: React.CSSProperties;
}

/**
 * A third-party tool logo from the Simple Icons CDN, with a bundled fallback.
 *
 * The logos are fetched at runtime, so a blocked or slow CDN would otherwise
 * leave broken-image glyphs on the page. On error we swap in a neutral shape
 * and keep whatever label the caller renders alongside.
 */
export const ToolLogo = ({ slug, className, style }: ToolLogoProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <Diagram3Fill aria-hidden="true" className={cn('opacity-70', className)} />;
  }

  return (
    <img
      src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`}
      alt=""
      aria-hidden="true"
      className={className}
      style={style}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};
