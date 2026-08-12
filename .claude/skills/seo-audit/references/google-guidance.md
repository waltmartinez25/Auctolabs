# Google Search guidance — cached summary

Last refreshed: 2026-08-12. Refresh manually (see SKILL.md) — this file is
NOT auto-updated. The changelog check in the skill flow always fetches live
regardless of this file's age; only re-run the full refresh when you suspect
something below has moved, or periodically (e.g. quarterly).

## Search Essentials — technical requirements
(developers.google.com/search/docs/essentials/technical)

Three minimum requirements for indexing eligibility:
1. **Not blocked** — Googlebot must be able to fetch the page (robots.txt,
   auth walls, IP/geo gating all disqualify it).
2. **HTTP 200** — error-status pages are not indexed. Verify via URL
   Inspection in Search Console, or check the server's actual response code.
3. **Indexable content** — supported file type, and compliant with spam
   policies.

No HTTPS requirement stated here specifically, but HTTPS is a page-experience
signal (see below). No JS-rendering requirement listed on this page, but see
the JS SEO section — Google does render JS, on a delay, and not all
crawlers/bots do.

## SEO Starter Guide fundamentals
(developers.google.com/search/docs/fundamentals/seo-starter-guide)

- **Titles**: unique per page, clear, concise, accurately describe content.
- **Meta descriptions**: unique per page, 1–2 sentences, summarize the page.
  Google often rewrites these from page content anyway — treat as a strong
  suggestion, not a guarantee of the displayed snippet.
- **Headings**: semantic order preferred for accessibility, but Google says
  order doesn't affect ranking and there's no ideal heading count.
- **Alt text**: short but descriptive, on every `<img>`. Decorative images
  should be `alt=""` (not omitted) plus `aria-hidden="true"`.
- **Link text**: descriptive, never "click here" / "read more" / bare "here".
- **External links**: `rel="nofollow"`/`"noopener noreferrer"` on untrusted
  or user-generated links; `target="_blank"` links should always carry
  `rel="noopener noreferrer"` regardless (security best practice, and
  Google-adjacent).
- **URLs**: descriptive words help users (shown in breadcrumbs in results).
  Keywords in the domain/path have "hardly any effect" on ranking — don't
  over-optimize for this.
- **Internal linking**: the primary way Google discovers new pages. Link to
  related pages; nav + footer links count.
- **Structured data**: optional, but unlocks rich-result eligibility for
  supported types (see below — this list changes, always check current
  eligibility before relying on a type).
- **Duplicate content**: not a spam violation on your own site (canonicalize
  with `rel="canonical"` or redirects) — but copying *others'* content is a
  spam violation.
- **Content**: original, helpful, well-organized, no keyword stuffing, kept
  current (revisit and update stale pages).

### Explicitly NOT ranking factors (don't waste effort here)
- `<meta name="keywords">` — completely ignored by Google Search. Remove if
  present; it's dead weight, and if hardcoded once + injected per-page again
  it becomes an actual duplicate-tag bug (found and fixed 2026-08-12).
- Content length / word count — no minimum or maximum.
- Subdomain vs. subdirectory choice — equivalent for ranking.
- TLD choice — only matters for explicit country-targeting.
- E-E-A-T is not itself a direct ranking signal (though it correlates with
  what the guidance elsewhere asks you to build).

## Structured data general guidelines
(developers.google.com/search/docs/appearance/structured-data/sd-policies)

- Supported formats: JSON-LD (recommended), Microdata, RDFa.
- Pages with structured data must NOT be blocked from Googlebot via
  robots.txt/noindex — the crawler needs to see the markup.
- **Never mark up invisible content** — if JSON-LD describes something, that
  same thing must appear in the page's visible HTML. This is the same
  principle behind the SPA note below: a soft-404 page emitting rich content
  markup while showing a blank/generic error UI would violate this.
- Don't mark up irrelevant/misleading content (fake reviews, wrong category).
- All *required* properties for a type must be present or the whole block is
  ineligible for that type's rich result — check the specific type's page.
- Use `@id` to link related items when a page has multiple structured-data
  blocks referencing each other (e.g. `Organization` `@id` referenced from
  `WebSite.publisher`).

### Rich-result type status (CHECK LIVE — this list changes)
As of the 2026-08-12 refresh:
- **FAQPage**: discontinued as a rich result (Google announced May 2026; the
  feature doc now redirects to the deprecation changelog entry). Markup is
  harmless but produces zero visible benefit — don't add new FAQPage schema;
  remove existing instances when touching a page (visible FAQ content stays,
  only the JSON-LD goes).
- **HowTo**: discontinued the same way, same timeframe. Same treatment.
- **Still active** (per the current search-gallery listing): Article,
  Breadcrumb, Event, Local business, Organization, Product / Product
  snippet / Merchant listing / Variants, Profile page, Review snippet,
  Sitelinks, Video. Re-verify against the live gallery before relying on any
  of these for a new feature — this snapshot is not a permanent guarantee.

## LocalBusiness structured data
(developers.google.com/search/docs/appearance/structured-data/local-business)

- **Required**: `name`, `address` only.
- **Recommended**: `telephone` (with country + area code — omit entirely
  rather than inventing one if the business doesn't publish a phone line),
  `openingHoursSpecification`, `priceRange` (<100 chars, e.g. "$$$"), `geo`
  (5+ decimal places).
- `ProfessionalService` is a valid LocalBusiness subtype — using it satisfies
  the same requirements.
- No explicit guidance found for service-area-only businesses (no storefront)
  beyond using the same properties without implying a physical location if
  none exists.

## JavaScript SEO basics
(developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

Directly relevant to this project's stack (Vite + React Router SPA):

- Set unique `<title>`/meta description per route via JS (Helmet does this;
  verify it lands in the **prerendered/served HTML**, not only after
  client-side hydration — check `dist/**/index.html` directly, don't trust
  dev-server behavior alone).
- **Use the History API for routing, never URL fragments** (`#/path`).
  `BrowserRouter` from react-router-dom is correct; `HashRouter` would not
  be reliably indexable.
- Don't use JS to change `rel="canonical"` away from what's in the initial
  HTML — keep it consistent between server-rendered and hydrated states.
- Server-side or prerendering is "still a great idea" for speed and crawler
  reliability, even though Googlebot does render JS. This project prerenders
  to `dist/` — always validate that output, not just source.
- **Soft 404s in SPAs**: if a catch-all route serves the app shell with
  HTTP 200 for any unmatched path (true of this project via `_redirects`:
  `/* /index.html 200`), the 404 UI component MUST set
  `<meta name="robots" content="noindex">` (or noindex,follow to preserve
  link equity through its own nav) — otherwise every broken/mistyped URL on
  the site looks like a real indexable page to Google. This was found and
  fixed 2026-08-12 (`NotFound.tsx` had no SEO tags at all).
- Content fingerprinting in asset filenames (Vite does this by default —
  hashed chunk names) avoids Googlebot serving stale cached JS/CSS.
- Lazy-loaded images need to actually resolve in the rendered/prerendered
  HTML, not only on scroll-triggered client JS — verify in `dist/`.

## Page experience
(developers.google.com/search/docs/appearance/page-experience)

Self-assessment questions Google poses (no hard numeric CWV thresholds
published on this page — check Search Console's Core Web Vitals report for
actual LCP/INP/CLS numbers on live traffic, this skill's static analysis
cannot measure real user metrics):

1. Good Core Web Vitals? (LCP, INP, CLS — needs field data, not source review)
2. Served securely (HTTPS)?
3. Displays well on mobile?
4. Ads don't distract from/interfere with main content?
5. No intrusive interstitials?
6. Main content clearly distinguishable from other page elements?

**What static/source-level review CAN catch toward #1 (CLS specifically)**:
missing `width`/`height` (or aspect-ratio CSS) on `<img>` tags, which lets
the browser reserve layout space before the image loads. Verified image
pixel dimensions directly from file headers rather than guessing — a Node
one-liner reading the JPEG SOF0 marker works without needing a browser.

## Breadcrumbs
(developers.google.com/search/docs/appearance/structured-data/breadcrumb)

- `BreadcrumbList` can make Google show a breadcrumb trail above the title
  link in results instead of the raw URL.
- Omit `item` (the URL) on the final/current-page crumb — it doesn't need to
  link to itself.
- For a flat two-level site (home → page, no deeper nesting), a two-item
  list (`Home` → current page name) is sufficient and correctly modeled.
- The homepage itself doesn't need a breadcrumb (it IS the root).
- `noindex` pages don't need one either (nothing to surface it against).

## Spam policies
(developers.google.com/search/docs/essentials/spam-policies)

Concrete prohibited practices — consequence is ranking demotion or full
removal from results, sometimes loss of specific features (Top Stories,
Discover):
- **Cloaking** — different content to users vs. crawlers.
- **Hidden text/links** — content invisible to users but present in the DOM
  (white-on-white, off-screen CSS positioning, `display:none` abuse).
  Note the connection to the "never mark up invisible content" structured-
  data rule above — same underlying principle, different mechanism.
- **Keyword stuffing** — unnatural repetition, city/region lists, etc.
- **Scraped content** — republishing others' material with only superficial
  changes and no added value.
- **Link spam** — buying/selling links for ranking, excessive exchanges.
  Legitimate paid/sponsored links need `rel="nofollow"` or `rel="sponsored"`.
- **Doorway pages** — near-duplicate pages targeting slightly different
  queries, all funneling to the same destination.
- **Expired domain abuse** — repurposing an expired domain's authority for
  unrelated low-value content.
- **AI-generated scaled content spam** — mass-generating pages with generative
  AI without adding real value. (Distinct from using AI as a *tool* while
  writing — the policy targets the scaled, valueless-output pattern, not
  AI-assisted writing itself.)
- **Sneaky redirects** — sending users somewhere different than what
  crawlers see.
- **Site reputation abuse** — hosting third-party content mainly to borrow
  the host site's ranking authority.

## Sitemaps
(developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

- Only `<loc>` is actually required, and it must be a fully-qualified
  absolute URL (this site's sitemap.xml already does this correctly).
- `<lastmod>` is used by Google **only if it's consistently and verifiably
  accurate** — reflect real content-change dates, don't bump it reflexively
  on every deploy. Legitimate to update when a page's content, structured
  data, or links actually changed.
- **`<changefreq>` and `<priority>` are both completely ignored by Google.**
  Present in this site's sitemap.xml — harmless (not invalid XML, just
  inert), low priority to clean up, not worth a dedicated fix cycle on its
  own. Fine to strip opportunistically if touching the file for another
  reason.
- Size limits: 50,000 URLs / 50MB uncompressed per sitemap file — not a
  concern at this site's scale (9 URLs).
- Submission (via Search Console or the `Sitemap:` line in robots.txt, both
  present here) is a hint, not a guarantee of crawling.

## Canonicalization
(developers.google.com/search/docs/crawling-indexing/canonicalization)

- Common duplicate-URL causes: www vs. non-www, http vs. https, trailing
  slash, query params, regional/device variants.
- Google auto-selects a canonical using multiple signals (HTTPS preference,
  redirects, sitemap presence, `rel="canonical"`) when you don't specify
  one — but an explicit `rel="canonical"` (this site sets one per-page via
  `SEO.tsx`) is still a strong hint worth keeping.
- **www/non-www and protocol canonicalization is a hosting/DNS-level concern
  for this project** (Cloudflare Pages), not something fixed in application
  code — verify at the Cloudflare Pages project settings / DNS level, not
  in `_redirects`, if this is ever in question.

## robots.txt
(developers.google.com/search/docs/crawling-indexing/robots/intro)

- **Controls crawling only, NOT indexing.** A page disallowed in robots.txt
  can still appear in search results (without a description) if other
  sites link to it. `noindex` is the correct tool to keep a page out of
  results entirely — robots.txt is the wrong tool for that job.
- Not required — this site has one primarily to make the AI-crawler
  allowlist policy explicit (see site-map.md), not because it's mandatory.
- Not a security/privacy mechanism — never rely on it to hide something
  that actually needs protecting (password-protect or noindex instead).
- Different crawlers interpret syntax inconsistently — Google's own
  crawlers are the reliable target; third-party bot behavior on the same
  file is not guaranteed.

## Mobile-first indexing
(developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)

- Google indexes and ranks based on the **mobile-rendered version** of the
  page — for a single responsive site (no separate m.site or adaptive
  serving), this is largely satisfied by construction, since the same HTML/
  React tree renders at every viewport. Still worth spot-checking that no
  content is conditionally hidden at mobile widths via CSS in a way that
  would make it inaccessible to Googlebot's mobile crawl (`display:none`
  driven by a mobile breakpoint, not just visual reflow).
- If ever adding responsive variants that hide real content (not just
  reflow it) at any breakpoint, that content effectively doesn't exist for
  ranking purposes.
- Structured data should be present and consistent at every breakpoint —
  true here since it's not viewport-conditional.

## Redirects
(developers.google.com/search/docs/crawling-indexing/301-redirects)

- **301/308 (permanent)**: signals the target should become canonical —
  use when a change really is permanent.
- **302/307 (temporary)**: does NOT signal a new canonical — use for
  genuinely short-term redirects.
- Server-side redirects are the most reliable; meta-refresh and JS-based
  redirects are progressively less reliable, per Google's own ranking of
  redirect mechanisms.
- This project's only redirect is the SPA catch-all in `_redirects`
  (`/* /index.html 200`) — that's a rewrite serving 200, not a redirect,
  and is unrelated to this guidance; it's covered under the JS SEO soft-404
  section above instead.

## Core Web Vitals — exact thresholds
(developers.google.com/search/docs/appearance/core-web-vitals)

"Good" thresholds (field data, real users — not lab/synthetic scores):
- **LCP** (Largest Contentful Paint): under 2.5s
- **INP** (Interaction to Next Paint): under 200ms
- **CLS** (Cumulative Layout Shift): under 0.1

This skill's static/source analysis can only catch CLS risk factors
(missing image dimensions, layout-shifting web fonts/ads) — it cannot
measure real LCP/INP/CLS numbers. Those require Search Console's Core Web
Vitals report or a Lighthouse/PageSpeed Insights run against the live URL.
Flag this as a real gap in any audit rather than silently skipping it.

## Intrusive interstitials
(developers.google.com/search/docs/appearance/avoid-intrusive-interstitials)

- Problematic: full-page overlays blocking content on arrival, forced
  redirect-to-consent pages, app-install prompts covering the whole page.
- Acceptable: small banners (small fraction of the screen), standard
  cookie-consent notices, legally-mandated age gates.
- A chat widget that stays collapsed/closed by default and only expands on
  user action is the acceptable pattern — confirmed this site's
  `ChatWidget` defaults to closed (`isOpen` starts `false`), not
  auto-triggered.

## Title links & snippets — how Google actually generates them
(developers.google.com/search/docs/appearance/title-link,
developers.google.com/search/docs/appearance/snippet)

- Google's title link is **automated**, not a direct passthrough of
  `<title>`. It weighs, in rough order: `<title>`, the page's visually
  dominant heading, `og:title`, prominent styled text, `<h1>`, inbound
  anchor text, `WebSite` structured data. It overrides your `<title>` when
  the tag looks stale, inaccurate, boilerplate-repetitive across pages, or
  mismatched to the page's actual language/script.
  - Practical implication: keep the H1 and `<title>` saying materially the
    same thing (this site's `SEO.tsx` + per-page H1 pattern already does
    this) — a mismatch between them is exactly the kind of signal that
    makes Google discard your intended title.
- Snippets (the description text) are generated primarily from page
  content, with the meta description used **only when Google judges it
  more accurate than what it would otherwise extract.** No character
  limit — display truncation happens at render time based on device width,
  so don't hand-wrap or pad to hit an exact number.

## Site name in results
(developers.google.com/search/docs/appearance/site-names)

- Primary signal: **`WebSite` structured data's `name` property** (this
  site's homepage has this — see `pages/Index.tsx`'s `@graph`).
- Secondary signals: `og:site_name`, `<title>`, headings, general homepage
  content. `og:site_name` was missing sitewide until added 2026-08-12 (now
  emitted by every page via `SEO.tsx`, since it's a static site name, not
  page-specific content).

## Favicon requirements
(developers.google.com/search/docs/appearance/favicon-in-search)

- Any valid format (`.ico`, `.svg`, etc.), minimum 8×8px, square aspect
  ratio, recommended 48×48px+, discovered via a `<link rel="icon">` on the
  homepage. This site has both `.svg` and `.ico` variants correctly linked
  — no action needed, verified 2026-08-12.
- Keep the favicon URL stable once set — Google's favicon crawl/refresh
  cycle can take days to weeks, so frequent path changes hurt more than
  they help.
