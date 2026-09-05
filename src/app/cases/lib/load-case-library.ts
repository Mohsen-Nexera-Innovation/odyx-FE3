import { getServerApiBaseUrl } from '@/lib/config';
import { resolveMediaUrl, type CaseLibraryPublic, type ShowcaseCase } from '@/lib/api/case-library';
import type { BrowseSectionData, FeaturedCase, FeaturedSectionData } from '@/content/cases';
import { casesData } from '@/content/cases';
import {
  applicationCasesPath,
  isApplicationCaseSlug,
} from '@/content/application-cases';
import { isProductFamilySlug, productCasesPath } from '@/content/product-cases';

function caseCountLabel(count: number) {
  return `${count} Case${count === 1 ? '' : 's'}`;
}

function toFeaturedItems(library: CaseLibraryPublic): FeaturedCase[] {
  return library.featured.map((c) => ({
    id: c.id,
    badge: c.badge,
    title: c.title,
    tags: c.tags,
    href: caseDetailHref(c),
    img: resolveMediaUrl(c.coverImageUrl),
    imgAlt: c.coverImageAlt || c.title,
    before: c.beforeImageUrl
      ? { img: resolveMediaUrl(c.beforeImageUrl), alt: `${c.title} before` }
      : undefined,
    after: c.afterImageUrl
      ? { img: resolveMediaUrl(c.afterImageUrl), alt: `${c.title} after` }
      : undefined,
    productKeys: c.productKeys,
    products: c.products.map((p) => ({
      ...p,
      img: resolveMediaUrl(p.img),
    })),
    moreProducts: c.moreProducts,
  }));
}

/** Prefer a real case detail URL; never loop via /all-cases → /cases. */
function caseDetailHref(c: { slug: string; href?: string | null }): string {
  const href = c.href?.trim() || '';
  if (
    !href ||
    href === '/cases' ||
    href.startsWith('/cases#') ||
    href === '/solutions/cases' ||
    href.startsWith('/solutions/cases#') ||
    href.includes('/all-cases')
  ) {
    return `/cases/${c.slug}`;
  }
  return href;
}

export function buildFeaturedFromLibrary(
  library: CaseLibraryPublic | null,
): FeaturedSectionData {
  return {
    ...casesData.featured,
    items: library?.featured?.length ? toFeaturedItems(library) : [],
  };
}

export function buildApplicationsFromLibrary(
  library: CaseLibraryPublic | null,
): BrowseSectionData {
  const base = casesData.applications;
  const titlesById = new Map(base.items.map((item) => [item.id, item.title]));
  const fromApi = library?.applications?.length
    ? library.applications.map((a) => ({
        id: a.id,
        title: titlesById.get(a.id) ?? a.title,
        countLabel: a.countLabel,
        href: a.href,
        img: resolveMediaUrl(a.img),
        imgAlt: a.imgAlt,
        icon: a.icon,
      }))
    : base.items.map((item) => ({ ...item, countLabel: caseCountLabel(0) }));

  return {
    ...base,
    items: fromApi.map((item) => ({
      ...item,
      href: isApplicationCaseSlug(item.id) ? applicationCasesPath(item.id) : item.href,
    })),
  };
}

export function buildProductsFromLibrary(
  library: CaseLibraryPublic | null,
): BrowseSectionData {
  const base = casesData.products;
  const fromApi = library?.products?.length
    ? library.products.map((p) => ({
        id: p.id,
        title: p.title,
        countLabel: p.countLabel,
        href: p.href,
        img: resolveMediaUrl(p.img),
        imgAlt: p.imgAlt,
      }))
    : base.items.map((item) => ({ ...item, countLabel: caseCountLabel(0) }));

  return {
    ...base,
    productStyle: true,
    items: fromApi.map((item) => ({
      ...item,
      href: isProductFamilySlug(item.id) ? productCasesPath(item.id) : productCasesPath('all'),
    })),
  };
}

const CASE_LIBRARY_FETCH: RequestInit = {
  cache: 'no-store',
  headers: { Accept: 'application/json' },
};

/** Server-side fetch of the public case library (falls back to null on error). */
export async function fetchCaseLibrary(): Promise<CaseLibraryPublic | null> {
  const base = getServerApiBaseUrl();
  if (!base) return null;
  try {
    const res = await fetch(`${base}/case-library`, CASE_LIBRARY_FETCH);
    if (!res.ok) {
      console.error(`[case-library] GET ${base}/case-library → ${res.status}`);
      return null;
    }
    return (await res.json()) as CaseLibraryPublic;
  } catch (err) {
    console.error(`[case-library] GET ${base}/case-library failed`, err);
    return null;
  }
}

/** Server-side fetch of one published showcase case by slug. */
export async function fetchShowcaseCaseBySlug(slug: string): Promise<ShowcaseCase | null> {
  const base = getServerApiBaseUrl();
  if (!base) return null;
  const url = `${base}/case-library/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, CASE_LIBRARY_FETCH);
    if (!res.ok) {
      console.error(`[case-library] GET ${url} → ${res.status}`);
      return null;
    }
    return (await res.json()) as ShowcaseCase;
  } catch (err) {
    console.error(`[case-library] GET ${url} failed`, err);
    return null;
  }
}
