import {
  solutionsCasesPath,
  type ClinicalCaseSection,
} from '@/content/clinical-case-listings';
import {
  allRealClinicalCases,
  realCasesForListing,
  type RealClinicalCase,
} from '@/content/clinical-case-photos';
import type { FeaturedCase, FeaturedProductIcon } from '../types';

const LISTING_BADGE: Record<string, string> = {
  'restorative-cases': 'Restorative',
  'implant-cases': 'Implant',
  'ortho-cases': 'Orthodontic',
  'prosthetic-cases': 'Prosthetics',
};

const LISTING_PRODUCTS: Record<string, { keys: string[]; more: number }> = {
  'restorative-cases': { keys: ['scanner', 'printer', 'resin'], more: 1 },
  'implant-cases': { keys: ['scanner', 'printer'], more: 1 },
  'ortho-cases': { keys: ['scanner', 'printer', 'resin'], more: 0 },
  'prosthetic-cases': { keys: ['printer', 'curing', 'resin'], more: 1 },
};

const PRODUCT_ICONS: Record<string, FeaturedProductIcon> = {
  scanner: { id: 'scanner', img: '/img/scanner/s1-hero-cutout.png', alt: 'Scanner' },
  printer: { id: 'printer', img: '/img/cutouts/feat-printer-cutout.png', alt: 'Printer' },
  curing: { id: 'curing', img: '/img/cure-uv02/hero/machine-cutout.png', alt: 'Curing' },
  resin: { id: 'resin', img: '/img/resins/all-resins-cutout.png', alt: 'Resin' },
};

/** Browse-card app id → clinical listing slug (same pages the cards link to). */
export const APP_TO_LISTING_SLUG: Record<string, string> = {
  restorative: 'restorative-cases',
  implant: 'implant-cases',
  orthodontic: 'ortho-cases',
  denture: 'prosthetic-cases',
};

export function caseCountLabel(count: number) {
  return `${count} Case${count === 1 ? '' : 's'}`;
}

/** Counts that match category listing pages (`resolveRealCases` / `realCasesForListing`). */
export function applicationCountsFromClinical(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [appId, slug] of Object.entries(APP_TO_LISTING_SLUG)) {
    out[appId] = realCasesForListing(slug).length;
  }
  return out;
}

function productsForListing(listingSlug: string): {
  products: FeaturedProductIcon[];
  moreProducts: number;
} {
  const cfg = LISTING_PRODUCTS[listingSlug] ?? { keys: ['scanner', 'printer'], more: 0 };
  const shown = cfg.keys.slice(0, 2).map((k) => PRODUCT_ICONS[k]).filter(Boolean);
  const remaining = Math.max(0, cfg.keys.length - shown.length);
  return { products: shown, moreProducts: remaining + cfg.more };
}

function toFeaturedCase(
  c: RealClinicalCase,
  listingSlug: string,
): FeaturedCase {
  const cfg = LISTING_PRODUCTS[listingSlug] ?? { keys: ['scanner', 'printer'], more: 0 };
  const { products, moreProducts } = productsForListing(listingSlug);
  return {
    id: c.id,
    badge: LISTING_BADGE[listingSlug] ?? 'Clinical',
    title: c.title,
    tags: [c.tag],
    href: solutionsCasesPath(listingSlug),
    img: c.after.img,
    imgAlt: c.after.alt,
    before: { img: c.before.img, alt: c.before.alt },
    after: { img: c.after.img, alt: c.after.alt },
    productKeys: cfg.keys,
    products,
    moreProducts,
  };
}

export function productCaseHref(productId: string) {
  return `/solutions/cases?product=${encodeURIComponent(productId)}#featured-cases`;
}

/** How many clinical cases are tagged with each product key. */
export function productCountsFromClinical(
  featured: FeaturedCase[] = featuredFromClinicalPhotos(),
): Record<string, number> {
  const out: Record<string, number> = {
    scanner: 0,
    printer: 0,
    curing: 0,
    resin: 0,
  };
  for (const item of featured) {
    for (const key of item.productKeys ?? item.products.map((p) => p.id)) {
      if (key in out) out[key] += 1;
    }
  }
  return out;
}

/** Build featured carousel cards from the old clinical photo library. */
export function featuredFromClinicalPhotos(): FeaturedCase[] {
  return allRealClinicalCases().flatMap(({ listingSlug, cases }) =>
    cases.map((c) => toFeaturedCase(c, listingSlug)),
  );
}

/** Prefer after-shot from each category section for application browse cards. */
export function applicationThumbsFromClinical(
  sections: ClinicalCaseSection[],
): Record<string, { img: string; imgAlt: string; count: number }> {
  const out: Record<string, { img: string; imgAlt: string; count: number }> = {};
  for (const [appId, slug] of Object.entries(APP_TO_LISTING_SLUG)) {
    const section = sections.find((s) => s.listing.slug === slug);
    const count = realCasesForListing(slug).length;
    const first = section?.cases[0];
    out[appId] = {
      img: first?.after.img ?? '',
      imgAlt: first?.after.alt ?? '',
      count,
    };
  }
  return out;
}
