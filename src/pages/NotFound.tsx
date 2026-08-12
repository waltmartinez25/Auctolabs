import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/SEO";

/**
 * 404 page.
 *
 * Marked `noindex` deliberately. The SPA host rewrites every unknown path to
 * index.html with a 200, so without this tag Google would treat each bad URL
 * as a real, indexable page — a soft 404. `follow` is kept so the links below
 * still pass equity to the pages that matter.
 */
const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <SEO
        title="Page Not Found"
        description="That page doesn't exist. Browse AuctoLabs services, pricing, and process, or get in touch to talk about your project."
        noindex
      />

      <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-lg text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            404
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            We couldn&apos;t find that page
          </h1>
          <p className="mb-10 text-base leading-relaxed text-muted-foreground">
            The link may be out of date or mistyped. Here&apos;s where most people are headed:
          </p>

          {/* Descriptive link text, per Google's guidance — no bare "click here". */}
          <nav aria-label="Popular pages" className="mb-10 grid gap-3 sm:grid-cols-2">
            <Link
              to="/services"
              className="rounded-xl border border-border/60 bg-card px-5 py-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="block font-bold text-foreground">Services</span>
              <span className="text-sm text-muted-foreground">
                Web design and lead automation
              </span>
            </Link>
            <Link
              to="/pricing"
              className="rounded-xl border border-border/60 bg-card px-5 py-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="block font-bold text-foreground">Pricing</span>
              <span className="text-sm text-muted-foreground">
                Launch and Partner options
              </span>
            </Link>
            <Link
              to="/process"
              className="rounded-xl border border-border/60 bg-card px-5 py-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="block font-bold text-foreground">Our process</span>
              <span className="text-sm text-muted-foreground">
                Audit, build, automate, optimize
              </span>
            </Link>
            <Link
              to="/contact"
              className="rounded-xl border border-border/60 bg-card px-5 py-4 text-left transition-colors hover:border-primary/40"
            >
              <span className="block font-bold text-foreground">Contact</span>
              <span className="text-sm text-muted-foreground">
                Book a free strategy call
              </span>
            </Link>
          </nav>

          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Back to the homepage
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
