/**
 * Clinical Cases hub → category listing pages.
 * Pages show real clinical photos (before/after), not application workflows.
 */
import { LEGACY_APPLICATION_LISTING, applicationCasesPath } from '@/content/application-cases';
import {
  allRealClinicalCases,
  heroCaseImages,
  realCasesForListing,
  type RealClinicalCase,
} from '@/content/clinical-case-photos';
import { CLINICAL_BADGE_ACCENTS, type ClinicalCategoryId } from '@/content/clinical-indication-types';

export type ClinicalCaseListing = {
  slug: string;
  /** Category for badge accent (cases column uses cases red) */
  category: ClinicalCategoryId;
  /** Source indication category being listed */
  sourceCategory: Exclude<ClinicalCategoryId, 'cases'>;
  title: string;
  subtitle: string;
  body: string;
};

const LISTING_DEFS: ClinicalCaseListing[] = [
  {
    slug: 'restorative-cases',
    category: 'cases',
    sourceCategory: 'restorative',
    title: 'Restorative Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Patient photography from restorative treatments — veneers and crowns — before and after.',
  },
  {
    slug: 'implant-cases',
    category: 'cases',
    sourceCategory: 'implant',
    title: 'Implant Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Clinical photography from implant workflows — surgical guides and planning models.',
  },
  {
    slug: 'ortho-cases',
    category: 'cases',
    sourceCategory: 'orthodontics',
    title: 'Orthodontic Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Clinical photography from aligner and retainer treatments.',
  },
  {
    slug: 'prosthetic-cases',
    category: 'cases',
    sourceCategory: 'prosthetics',
    title: 'Prosthetic Cases',
    subtitle: 'Real cases. Real results.',
    body: 'Clinical photography from denture and try-in pathways.',
  },
];

export const CLINICAL_CASE_LISTINGS: Record<string, ClinicalCaseListing> = Object.fromEntries(
  LISTING_DEFS.map((d) => [d.slug, d]),
);

export const CLINICAL_CASE_LISTING_SLUGS = LISTING_DEFS.map((d) => d.slug);

export function solutionsCasesPath(slug: string) {
  const applicationSlug = LEGACY_APPLICATION_LISTING[slug];
  if (applicationSlug) return applicationCasesPath(applicationSlug);
  return `/solutions/cases/${slug}`;
}

export const CLINICAL_CASE_LISTING_META: Record<string, { title: string; description: string }> = {
  'restorative-cases': {
    title: 'Restorative Cases | ODYX Clinical Applications',
    description: 'Real restorative clinical cases — veneers and crowns, before and after.',
  },
  'implant-cases': {
    title: 'Implant Cases | ODYX Clinical Applications',
    description: 'Real implant clinical cases — surgical guides and planning models.',
  },
  'ortho-cases': {
    title: 'Orthodontic Cases | ODYX Clinical Applications',
    description: 'Real orthodontic clinical cases — aligners and retainers.',
  },
  'prosthetic-cases': {
    title: 'Prosthetic Cases | ODYX Clinical Applications',
    description: 'Real prosthetic clinical cases — dentures and try-ins.',
  },
};

export type ClinicalCaseSection = {
  listing: ClinicalCaseListing;
  cases: RealClinicalCase[];
  categoryHref: string;
  heroImages: string[];
};

export function getClinicalCaseListing(slug: string): ClinicalCaseListing | undefined {
  return CLINICAL_CASE_LISTINGS[slug];
}

export function resolveRealCases(listing: ClinicalCaseListing): RealClinicalCase[] {
  return realCasesForListing(listing.slug);
}

export function listingHeroImages(listing: ClinicalCaseListing): string[] {
  return heroCaseImages(listing.slug);
}

/** All category sections that have real photos (shown on `/solutions/cases#all-cases`). */
export function getAllClinicalCaseSections(): ClinicalCaseSection[] {
  const bySlug = Object.fromEntries(LISTING_DEFS.map((d) => [d.slug, d]));
  return allRealClinicalCases()
    .map(({ listingSlug, cases }) => {
      const listing = bySlug[listingSlug];
      if (!listing) return null;
      return {
        listing,
        cases,
        categoryHref: solutionsCasesPath(listing.slug),
        heroImages: heroCaseImages(listing.slug),
      };
    })
    .filter((x): x is ClinicalCaseSection => x !== null);
}

export function caseListingBadgeAccent(listing: ClinicalCaseListing) {
  return CLINICAL_BADGE_ACCENTS[listing.sourceCategory] ?? CLINICAL_BADGE_ACCENTS[listing.category];
}

export { heroCaseImages };
