# grow-your-business — SEO-relevant file map

Kept separate from google-guidance.md because this one changes with the
codebase, not with Google's policies. Update opportunistically when you
notice it's drifted (new page added, SEO.tsx changed shape, etc.) — no
formal refresh cadence needed.

## Stack

- Vite 5 + React 18 + TypeScript + `react-router-dom` v6 (`BrowserRouter`,
  not hash routing).
- `vite-plugin-prerender` renders every route to static HTML at build time —
  **this is what Google actually receives**, not the SPA shell. Always
  audit `dist/**/index.html` after `npx vite build`, never just `src/` or
  the dev server.
- Hosted on Cloudflare Pages. `public/_redirects` contains the SPA
  catch-all (`/* /index.html 200`) — this is *why* the soft-404 problem
  exists structurally; any new catch-all route needs the same `noindex`
  treatment `NotFound.tsx` now has.
- `public/_headers` sets security headers (X-Frame-Options, etc.) but no
  CSP by design (documented in-file: too many third-party origins to get
  right blind). Not an SEO concern, noted here so it isn't mistaken for one.

## Per-page SEO wiring

- `src/components/SEO.tsx` — the single Helmet wrapper every page uses.
  Props: `title`, `description`, `keywords` (still emitted per-page even
  though Google ignores it — low priority cleanup, not yet done sitewide),
  `canonical`, `ogImage`, `ogType`, `jsonLd`, `noindex`.
  - `noindex` renders `<meta name="robots" content="noindex, follow" />` —
    follow is deliberate, so link equity still flows through the page's own
    nav even while the page itself stays out of results.
  - Every page in `src/pages/*.tsx` wraps itself in `<Layout>` and renders
    `<SEO ... />` as the first child. New pages must follow this pattern or
    they silently ship with no title/description/canonical.

- `src/lib/breadcrumbs.ts` — shared `pageBreadcrumb(name)` helper, produces
  a two-level `BreadcrumbList` (`Home` → current page, current page has no
  `item` URL). Used inside each page's `@graph` array.

- JSON-LD pattern: each page defines one or more `const xSchema = {...}`
  objects, then a `const xSchemaGraph = { "@context": ..., "@graph": [...] }`
  that's passed to `<SEO jsonLd={xSchemaGraph} />`. When a `@graph` member
  object carries its own `'@context'` key, that's a bug (redundant/invalid
  nesting) — strip it, `@context` belongs once at the graph root only.

- Routes (`src/App.tsx`): `/`, `/services`, `/process`, `/pricing`, `/about`,
  `/contact`, `/privacy`, `/terms`, `/industries`, `/blog` (currently
  `noindex` — thin/placeholder content, see the `noindex` comment in
  `Blog.tsx`; lift it once real posts exist and add `/blog` back to
  `public/sitemap.xml` at the same time), catch-all `*` → `NotFound`.

## Files to check every audit

- `public/robots.txt` — currently allows everything, explicitly lists AI
  crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) as a deliberate policy,
  not an oversight. Don't "clean up" the explicit list into a bare
  wildcard — the explicitness is intentional (see in-file comment).
- `public/sitemap.xml` — must match live routes exactly. `/blog` is
  deliberately absent while `noindex`.
- `index.html` — static `<head>` tags that exist outside Helmet's control
  (fonts, preloads, the `<title>` fallback for pre-hydration). Don't
  duplicate anything Helmet already injects per-page (this is exactly how
  the duplicate `meta keywords` bug happened — a static tag in `index.html`
  plus a per-page one from `SEO.tsx`).
- `src/pages/NotFound.tsx` — must stay wrapped in `<Layout>` and keep
  `noindex` on its `<SEO>` call. Regression-check this first if anyone
  touches routing.
- `src/components/home/MockupStack.tsx` — the three hero screenshot images
  (`public/mockups/hero-*.jpg`) need `width`/`height` matching their actual
  pixel dimensions if they're ever replaced — read the real dimensions from
  the file (Node JPEG SOF0 parse, see SKILL.md), don't guess or reuse old
  numbers.

## Known accepted gaps (don't re-flag without new information)

- No `telephone` in any LocalBusiness/ContactPage schema — no published
  business line exists. Inventing one would be a false NAP (name/address/
  phone) signal. Revisit only if a real number gets published.
- No `priceRange`/`openingHoursSpecification` on the homepage
  `ProfessionalService` schema — both optional, and pricing is
  quote-per-engagement (no fixed price range to state truthfully); hours
  don't apply to a remote-first service business the way they would to a
  storefront.
