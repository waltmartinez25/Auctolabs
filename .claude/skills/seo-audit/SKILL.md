---
name: seo-audit
description: Audit and fix AuctoLabs' SEO against Google Search Central guidance. Use when asked to review, improve, or fix the site's SEO, check Google compliance, audit meta tags/structured data/crawlability, or after adding a new page/route.
---

# AuctoLabs SEO audit & fix

Audits `grow-your-business` against Google Search Central's actual current
guidance, then implements fixes with the same verification bar as any other
change to this codebase. Built from a full manual audit done 2026-08-12 —
see `references/` for what that audit found and what it's checked against.

## Core principle: use judgment, not a checklist

This is not "go through every rule and report a finding for each one."
Google's own guidance repeatedly says things like "there's no magical ideal
number," "this is a hint, not a rule," and explicitly lists things that
*don't* matter (meta keywords, content length, subdomain choice). Applying
every rule mechanically produces noise and can even hurt — e.g. adding
FAQPage schema today would be pointless work on a discontinued feature.

For each area you look at:
1. **Decide if it's relevant to this site at all** before checking it.
   (International/hreflang, ecommerce markup, and video sitemaps don't
   apply here — don't audit against them.)
2. **Weigh severity against effort.** A missing `og:site_name` is a
   one-line, zero-risk fix — just do it. A "lastmod dates could be more
   precise" observation on a sitemap Google mostly ignores anyway is not
   worth a commit on its own — note it, don't chase it.
3. **Distinguish "wrong" from "not maximally optimized."** Only the former
   is a finding worth fixing outright. The latter is worth mentioning to
   the user with a recommendation, not silently changing.
4. **When guidance conflicts with a deliberate site decision, the site
   decision wins** unless it's actually a mistake. `references/site-map.md`
   has a "known accepted gaps" section for exactly this — e.g. no
   `telephone` in LocalBusiness schema is correct, not a gap, because no
   business line exists to publish.
5. **If something in `references/` looks like it might have changed since
   it was written, say so and offer to verify it live** rather than either
   blindly trusting the cache or re-fetching everything by default (see
   Freshness below).

## Flow

### 1. Freshness check (always do this first, every run)

Fetch `https://developers.google.com/search/updates` live. This is the one
page in the guidance set that changes unpredictably and where staleness
actually bit before — the FAQ/HowTo rich-result deprecation (found
2026-08-12) is exactly the kind of thing that only shows up here first.

Skim recent entries for anything relevant to a marketing SPA: rich-result
feature changes, ranking system updates, structured data policy changes,
crawling/indexing changes. If something new and relevant shows up, treat it
as higher-priority than anything in the cached references below, and note
in your output that you found something newer than the cache.

Everything else in this skill (`references/google-guidance.md`) is cached
from the 2026-08-12 audit and is NOT re-fetched automatically. If you
suspect a specific cached fact is stale — the rich-result gallery listing
is the most likely to drift — say so and offer to verify that one page live
rather than re-fetching the whole set. Full manual refresh instructions are
at the bottom of `references/google-guidance.md`.

### 2. Read the references

- `references/google-guidance.md` — what Google actually requires/
  recommends/ignores, organized by topic, with this site's status noted
  inline where it was already checked.
- `references/site-map.md` — where the SEO-relevant code actually lives in
  this repo (SEO.tsx, breadcrumbs.ts, the @graph JSON-LD pattern, routing,
  known accepted gaps). Read this before touching any file so you don't
  rediscover the codebase shape from scratch.

### 3. Survey the site — the served output, not just source

This is a Vite-prerendered SPA. Google receives `dist/**/index.html`, not
`src/`. Always run `npx vite build` and inspect the actual prerendered
output before concluding anything about titles, descriptions, canonicals,
or structured data. Dev-server behavior and source code are not sufficient
evidence on their own for those specific checks (they're fine for things
like alt-text or link-text review, which don't depend on the build step).

Useful checks, adapt rather than run all of them every time:

```bash
# Per-page title / description / canonical, straight from prerendered HTML
for f in $(find dist -name "index.html" | sort); do
  echo "--- $f"
  grep -oE "<title>[^<]*</title>" "$f" | head -1
  grep -oE '<meta name="description" content="[^"]{0,110}' "$f" | head -1
  grep -oE '<link rel="canonical" href="[^"]*"' "$f" | head -1
done

# H1 count per page (must be exactly 1)
for f in $(find dist -name "index.html" | sort); do
  echo "$(grep -o "<h1" "$f" | wc -l)  $f"
done

# JSON-LD: parse-validate every block and list @type per page
node -e "
const fs=require('fs'),path=require('path');
const files=fs.readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('index.html'));
for(const f of files){
  const html=fs.readFileSync(path.join('dist',f),'utf8');
  const blocks=[...html.matchAll(/<script type=\"application\/ld\+json\"[^>]*>([\s\S]*?)<\/script>/g)];
  const types=[];
  for(const b of blocks){
    try{ const j=JSON.parse(b[1]);
      const collect=o=>{if(Array.isArray(o))return o.forEach(collect);if(o&&typeof o==='object'){if(o['@type'])types.push(o['@type']);Object.values(o).forEach(collect);}};
      collect(j);
    }catch(e){console.log('INVALID JSON-LD in',f,e.message);}
  }
  console.log(f.padEnd(26), [...new Set(types)].join(', '));
}"

# Images missing alt, vague link text, unattributed target=_blank
grep -rnoE '<img [^>]*>' src --include=*.tsx | grep -v 'alt='
grep -rniE '>(click here|here|read more|learn more)<' src --include=*.tsx
grep -rn 'target="_blank"' src --include=*.tsx -A2 | grep -B2 -v 'rel='

# Read actual JPEG/PNG pixel dimensions before writing width/height —
# never guess or reuse old numbers
node -e "
const fs=require('fs');
const b=fs.readFileSync('PATH_HERE');
let i=2;
while(i<b.length){
  if(b[i]!==0xFF){i++;continue;}
  const marker=b[i+1];
  if(marker===0xC0||marker===0xC2){
    console.log(b.readUInt16BE(i+7)+'x'+b.readUInt16BE(i+5)); process.exit(0);
  }
  i+=2+b.readUInt16BE(i+2);
}"
```

Also check: `public/robots.txt`, `public/sitemap.xml` (routes match live
routes exactly, absolute URLs, `noindex` pages excluded), `index.html` for
anything duplicating what `SEO.tsx` already injects per-page.

### 4. Report findings

Before changing anything, tell the user what you found — grouped by
severity/effort per the judgment principle above, not as an undifferentiated
list. Distinguish real defects (soft 404, duplicate tags, broken canonical)
from "could be improved" observations (missing `priceRange`, sitemap
`lastmod` precision) from "already correct, no action" (things you checked
and confirmed fine — worth saying explicitly so the user knows they were
checked, not skipped).

### 5. Fix, with verification

For anything you implement:
- `npx tsc --noEmit` — must be clean.
- `npx eslint <changed files>` — must be clean.
- `npx vite build` — must succeed; re-run the JSON-LD parse-validation
  snippet above against the fresh `dist/` output.
- Never invent data to fill an optional schema property (phone numbers,
  prices, hours) — omit the property if the real value doesn't exist yet,
  and say so. A false NAP (name/address/phone) or pricing signal is worse
  than an incomplete one.
- Ask before removing anything that changes visible page content, not just
  markup around it. Removing dead JSON-LD (e.g. discontinued rich-result
  types) is markup-only and fine to just confirm briefly; anything that
  changes what a visitor actually sees is not markup-only.

### 6. After pushing — tell the user how Google actually sees it

Deploying doesn't mean Google has recrawled. If asked, or if it's relevant
context after a push: Search Console's URL Inspection → Request Indexing is
the fastest manual trigger per URL; otherwise Google recrawls on its own
schedule. Updating `sitemap.xml` `<lastmod>` to the real change date for
pages that actually changed is a legitimate (if soft) freshness signal —
don't bump it reflexively on unrelated deploys.
