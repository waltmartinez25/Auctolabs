/**
 * Pre-rendering entry point for vite-prerender-plugin.
 * All pages are eagerly imported (no React.lazy) so renderToString works in Node.
 * useEffect does NOT run during renderToString, so Canvas/window calls in effects are safe.
 */

// MUST be first — sets up browser globals (HTMLElement, document, etc.) before
// any library with module-level browser API access (e.g. number-flow) is evaluated.
import './ssr-browser-shims';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HelmetProvider } from 'react-helmet-async';

// Eager page imports — do NOT use React.lazy here
import Index from './pages/Index';
import Services from './pages/Services';
import Process from './pages/Process';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Industries from './pages/Industries';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

type AttrMap = Record<string, string>;
type HeadElement = { type: string; props: AttrMap };

/** Parse key="value" attribute pairs from an HTML attribute string */
function parseAttrs(attrsStr: string): AttrMap {
  const props: AttrMap = {};
  const re = /([\w:-]+)="([^"]*)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(attrsStr)) !== null) {
    props[m[1]] = m[2];
  }
  return props;
}

/** Extract head elements (meta, link, or script) from an HTML string */
function parseElements(html: string, tag: 'meta' | 'link' | 'script'): HeadElement[] {
  const elements: HeadElement[] = [];
  if (!html) return elements;

  if (tag === 'script') {
    const re = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const props = parseAttrs(m[1]);
      const content = m[2].trim();
      if (content) props.children = content;
      elements.push({ type: 'script', props });
    }
  } else {
    const re = new RegExp(`<${tag}\\s+([^>]+?)\\s*/?>`, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const props = parseAttrs(m[1]);
      if (Object.keys(props).length > 0) elements.push({ type: tag, props });
    }
  }
  return elements;
}

export async function prerender({ url }: { url: string }) {
  const helmetContext: { helmet?: any } = {};
  const queryClient = new QueryClient();

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const helmet = helmetContext.helmet;

  // Extract plain-text title from <title>...</title>
  const titleStr: string = helmet?.title?.toString() ?? '';
  const titleMatch = titleStr.match(/<title>(.*?)<\/title>/s);
  const title = titleMatch?.[1] ?? '';

  // Collect meta, link, and script (JSON-LD) elements from Helmet
  const allElements: HeadElement[] = [
    ...parseElements(helmet?.meta?.toString() ?? '', 'meta'),
    ...parseElements(helmet?.link?.toString() ?? '', 'link'),
    ...parseElements(helmet?.script?.toString() ?? '', 'script'),
  ];

  return {
    html,
    head: {
      lang: 'en',
      title,
      elements: new Set(allElements),
    },
  };
}
