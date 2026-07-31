/**
 * Clinical Cases hub items → category listing pages.
 * Each listing aggregates indication detail pages (heroes + copy) for that category.
 */
import { CLINICAL_INDICATIONS } from '@/content/clinical-indications';
import {
  CLINICAL_BADGE_ACCENTS,
  clinicalPath,
  type ClinicalCategoryId,
} from '@/content/clinical-indication-types';

export type ClinicalCaseListingItem = {
  slug: string;
  href: string;
  title: string;
  subtitle: string;
  body: string;
  img: string;
  imgAlt: string;
};

export type ClinicalCaseListing = {
  slug: string;
  /** Category for badge accent (cases column uses cases red) */
  category: ClinicalCategoryId;
  /** Source indication category being listed */
  sourceCategory: Exclude<ClinicalCategoryId, 'cases'>;
  title: string;
  subtitle: string;
  body: string;
  indicationSlugs: string[];
};

const LISTING_DEFS: ClinicalCaseListing[] = [
  {
    slug: 'restorative-cases',
    category: 'cases',
    sourceCategory: 'restorative',
    title: 'Restorative Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Explore every restorative workflow — crowns, veneers, and inlays & onlays — with the ODYX digital pathway.',
    indicationSlugs: ['same-day-crown', 'veneers', 'inlays'],
  },
  {
    slug: 'implant-cases',
    category: 'cases',
    sourceCategory: 'implant',
    title: 'Implant Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Browse implant workflows — surgical guides and planning models — printed in-house with ODYX.',
    indicationSlugs: ['surgical-guide', 'implant-model'],
  },
  {
    slug: 'ortho-cases',
    category: 'cases',
    sourceCategory: 'orthodontics',
    title: 'Orthodontic Cases',
    subtitle: 'Real cases. Real results.',
    body: 'See aligner and retainer workflows powered by ODYX scanning and model printing.',
    indicationSlugs: ['aligners', 'retainers'],
  },
  {
    slug: 'prosthetic-cases',
    category: 'cases',
    sourceCategory: 'prosthetics',
    title: 'Prosthetic Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Review denture and try-in pathways from digital design to in-house print.',
    indicationSlugs: ['dentures', 'try-ins'],
  },
];

export const CLINICAL_CASE_LISTINGS: Record<string, ClinicalCaseListing> = Object.fromEntries(
  LISTING_DEFS.map((d) => [d.slug, d]),
);

export const CLINICAL_CASE_LISTING_SLUGS = LISTING_DEFS.map((d) => d.slug);

export const CLINICAL_CASE_LISTING_META: Record<string, { title: string; description: string }> = {
  'restorative-cases': {
    title: 'Restorative Cases | ODYX Clinical Applications',
    description: 'Browse restorative clinical applications — same-day crowns, veneers, and inlays & onlays.',
  },
  'implant-cases': {
    title: 'Implant Cases | ODYX Clinical Applications',
    description: 'Browse implant clinical applications — surgical guides and implant models.',
  },
  'ortho-cases': {
    title: 'Orthodontic Cases | ODYX Clinical Applications',
    description: 'Browse orthodontic clinical applications — aligners and retainers.',
  },
  'prosthetic-cases': {
    title: 'Prosthetic Cases | ODYX Clinical Applications',
    description: 'Browse prosthetic clinical applications — dentures and try-ins.',
  },
};

export function getClinicalCaseListing(slug: string): ClinicalCaseListing | undefined {
  return CLINICAL_CASE_LISTINGS[slug];
}

/** Resolve listing cards from indication registry (heroes + copy). */
export function resolveCaseListingItems(listing: ClinicalCaseListing): ClinicalCaseListingItem[] {
  return listing.indicationSlugs
    .map((slug) => {
      const ind = CLINICAL_INDICATIONS[slug];
      if (!ind) return null;
      return {
        slug,
        href: clinicalPath(slug),
        title: ind.hero.title,
        subtitle: ind.hero.subtitle,
        body: ind.hero.body,
        img: ind.hero.img,
        imgAlt: ind.hero.imgAlt,
      };
    })
    .filter((x): x is ClinicalCaseListingItem => x !== null);
}

export function caseListingBadgeAccent(listing: ClinicalCaseListing) {
  return CLINICAL_BADGE_ACCENTS[listing.category];
}
