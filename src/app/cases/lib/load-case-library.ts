import { getApiBaseUrl } from '@/lib/config';
import { resolveMediaUrl, type CaseLibraryPublic } from '@/lib/api/case-library';
import type { BrowseSectionData, FeaturedCase, FeaturedSectionData } from '../types';
import { casesData } from '../data/cases.data';
import {
  applicationCountsFromClinical,
  caseCountLabel,
  productCaseHref,
  productCountsFromClinical,
} from './clinical-media';

function toFeaturedItems(library: CaseLibraryPublic): FeaturedCase[] {
  return library.featured.map((c) => ({
    id: c.id,
    badge: c.badge,
    title: c.title,
    tags: c.tags,
    href: c.href || '/cases#featured-cases',
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

/**
 * Inject the old clinical photo library into the mock featured carousel.
 * CMS featured cases are used only when the clinical library is empty.
 */
export function buildFeaturedFromLibrary(
  library: CaseLibraryPublic | null,
  clinicalFallback: FeaturedCase[],
): FeaturedSectionData {
  const fromCms = library?.featured?.length ? toFeaturedItems(library) : [];
  const items = clinicalFallback.length
    ? clinicalFallback
    : fromCms.length
      ? fromCms
      : casesData.featured.items;
  return {
    ...casesData.featured,
    viewAll: { label: 'View All Cases', href: '/cases#featured-cases' },
    items,
  };
}

export function buildApplicationsFromLibrary(
  library: CaseLibraryPublic | null,
  clinicalThumbs?: Record<string, { img: string; imgAlt: string; count: number }>,
): BrowseSectionData {
  const base = casesData.applications;
  const counts = applicationCountsFromClinical();

  // Fill remaining application cards that have no restorative/prosthetic gallery
  // with existing clinical indication photography.
  const fallbackThumbs: Record<string, { img: string; imgAlt: string }> = {
    implant: {
      img: '/img/clinical/surgical-guide/hero-cutout.png',
      imgAlt: 'Surgical guide for implant planning',
    },
    orthodontic: {
      img: '/img/clinical/aligners/hero-cutout.png',
      imgAlt: 'Orthodontic aligner case photography',
    },
    denture: {
      img: '/img/clinical/dentures/hero-cutout.png',
      imgAlt: 'Printed denture case photography',
    },
    restorative: {
      img: '/img/clinical-cases/_DSC0255_1.JPG',
      imgAlt: 'Restorative smile after veneer delivery',
    },
  };

  const items = (library?.applications?.length
    ? library.applications.map((a) => ({
        id: a.id,
        title: a.title,
        countLabel: a.countLabel,
        href: a.href,
        img: resolveMediaUrl(a.img),
        imgAlt: a.imgAlt,
        icon: a.icon,
      }))
    : base.items
  ).map((item) => {
    const count = counts[item.id] ?? 0;
    const thumb = clinicalThumbs?.[item.id];
    const fb = fallbackThumbs[item.id];
    return {
      ...item,
      // Always match the category listing page gallery length.
      countLabel: caseCountLabel(count),
      img: (thumb?.img || fb?.img || item.img),
      imgAlt: (thumb?.imgAlt || fb?.imgAlt || item.imgAlt),
    };
  });

  return {
    ...base,
    items,
  };
}

export function buildProductsFromLibrary(
  library: CaseLibraryPublic | null,
  clinicalFeatured: FeaturedCase[],
): BrowseSectionData {
  const counts = productCountsFromClinical(clinicalFeatured);
  const baseItems = library?.products?.length
    ? library.products.map((p) => ({
        id: p.id,
        title: p.title,
        countLabel: p.countLabel,
        href: p.href,
        img: resolveMediaUrl(p.img),
        imgAlt: p.imgAlt,
      }))
    : casesData.products.items;

  return {
    ...casesData.products,
    productStyle: true,
    viewAll: { label: 'View All Products', href: '/cases#featured-cases' },
    items: baseItems.map((item) => ({
      ...item,
      href: productCaseHref(item.id),
      countLabel: caseCountLabel(counts[item.id] ?? 0),
    })),
  };
}

/** Server-side fetch of the public case library (falls back to null on error). */
export async function fetchCaseLibrary(): Promise<CaseLibraryPublic | null> {
  const base = getApiBaseUrl();
  if (!base) return null;
  try {
    const res = await fetch(`${base}/case-library`, {
      next: { revalidate: 30 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as CaseLibraryPublic;
  } catch {
    return null;
  }
}
