/**
 * BreadcrumbList structured data.
 *
 * Google's SEO starter guide notes that breadcrumbs are one of the things it
 * can surface directly in a result, above the title link. The site is a flat
 * two-level hierarchy (home → page), which is exactly what the spec expects:
 * position 1 is the site root, position 2 is the current page.
 *
 * `item` is omitted on the final crumb per Google's guidance — the current
 * page doesn't need to link to itself.
 */

const SITE_URL = 'https://auctolabs.com';

export interface Crumb {
  name: string;
  /** Path relative to the site root, e.g. "/services". Omit for the current page. */
  path?: string;
}

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    ...(crumb.path ? { item: `${SITE_URL}${crumb.path}` } : {}),
  })),
});

/** Home → <page>. The trailing crumb is the current page, so it carries no URL. */
export const pageBreadcrumb = (name: string) =>
  breadcrumbSchema([{ name: 'Home', path: '/' }, { name }]);
