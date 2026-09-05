/**
 * Case By Application — same listing/detail chrome as Case By Product,
 * filtered by clinical application instead of product family.
 */
import {
  searchProductCases,
  type ApplicationCaseSlug,
  type ProductCaseCard,
} from '@/content/product-cases';

export type { ApplicationCaseSlug };

export const APPLICATION_CASE_SLUGS = [
  'restorative',
  'implant',
  'orthodontic',
  'denture',
] as const;

export type ApplicationCaseFamily = 'all' | ApplicationCaseSlug;

export const APPLICATION_CASE_META: Record<
  ApplicationCaseSlug,
  { label: string; title: string; description: string }
> = {
  restorative: {
    label: 'Restorative',
    title: 'Restorative Cases | ODYX',
    description: 'Real restorative clinical cases — veneers and crowns, before and after.',
  },
  implant: {
    label: 'Implant',
    title: 'Implant Cases | ODYX',
    description: 'Real implant clinical cases — surgical guides and planning models.',
  },
  orthodontic: {
    label: 'Orthodontic',
    title: 'Orthodontic Cases | ODYX',
    description: 'Real orthodontic clinical cases — aligners and retainers.',
  },
  denture: {
    label: 'Prosthetic',
    title: 'Prosthetic Cases | ODYX',
    description: 'Real prosthetic clinical cases — dentures and try-ins.',
  },
};

export const APPLICATION_CASES_META = {
  title: 'Cases by Application | ODYX',
  description: 'Browse real clinical cases by clinical application — restorative, implant, orthodontic, and prosthetic.',
};

export const LEGACY_APPLICATION_LISTING: Record<string, ApplicationCaseSlug> = {
  'restorative-cases': 'restorative',
  'implant-cases': 'implant',
  'ortho-cases': 'orthodontic',
  'prosthetic-cases': 'denture',
};

export function isApplicationCaseSlug(value: string): value is ApplicationCaseSlug {
  return (APPLICATION_CASE_SLUGS as readonly string[]).includes(value);
}

export function applicationCasesPath(family: ApplicationCaseFamily = 'all') {
  if (family === 'all') return '/solutions/cases/applications';
  return `/solutions/cases/applications/${family}`;
}

export function applicationCaseDetailPath(applicationSlug: ApplicationCaseSlug, caseSlug: string) {
  return `/solutions/cases/applications/${applicationSlug}/${caseSlug}`;
}

export function casesForApplication(
  cases: ProductCaseCard[],
  family: ApplicationCaseFamily,
): ProductCaseCard[] {
  if (family === 'all') return cases;
  return cases.filter((c) => c.applicationSlug === family);
}

export function filterApplicationCases(
  cases: ProductCaseCard[],
  family: ApplicationCaseFamily,
  query: string,
): ProductCaseCard[] {
  return searchProductCases(casesForApplication(cases, family), query);
}

export function applicationCaseCardHref(
  item: ProductCaseCard,
  listingFamily: ApplicationCaseFamily,
): string | null {
  if (!item.slug || !item.applicationSlug) return null;
  const family = listingFamily === 'all' ? item.applicationSlug : listingFamily;
  if (item.applicationSlug !== family) return null;
  return applicationCaseDetailPath(family, item.slug);
}
