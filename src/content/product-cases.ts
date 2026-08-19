/**
 * Case By Product — family tabs, listing cards, detail helpers.
 * Cards come from the CMS (`GET /case-library`) only.
 */
import {
  resolveMediaUrl,
  type CaseLibraryPublic,
  type ShowcaseApplication,
  type ShowcaseCase,
  type ShowcaseJourneyStep,
  type ShowcaseMaterial,
} from '@/lib/api/case-library';

export const PRODUCT_FAMILY_SLUGS = ['scanner', 'printer', 'curing', 'resin'] as const;

export type ProductFamilySlug = (typeof PRODUCT_FAMILY_SLUGS)[number];

export type ProductCaseFamily = 'all' | ProductFamilySlug;

export type ProductCaseIcon = {
  id: string;
  img: string;
  alt: string;
};

export type ProductCaseGalleryItem = {
  id: string;
  img: string;
  alt: string;
  label: string;
};

export type ProductCaseGlanceRow = {
  label: string;
  value: string;
};

export type ApplicationCaseSlug = 'restorative' | 'implant' | 'orthodontic' | 'denture';

export type ProductCaseCard = {
  id: string;
  slug: string;
  badge: string;
  applicationSlug: ApplicationCaseSlug | null;
  title: string;
  summary?: string | null;
  tags: string[];
  img: string;
  imgAlt: string;
  before?: { img: string; alt: string };
  after?: { img: string; alt: string };
  gallery: ProductCaseGalleryItem[];
  productKeys: ProductFamilySlug[];
  products: ProductCaseIcon[];
  moreProducts: number;
  caseType?: string | null;
  procedure?: string | null;
  treatmentArea?: string | null;
  tooth?: string | null;
  patient?: string | null;
  caseId?: string | null;
  keyMaterials: ShowcaseMaterial[];
  clinicalChallenge?: string | null;
  treatmentApproach?: string | null;
  treatmentOutcome?: string | null;
  treatmentJourney: ShowcaseJourneyStep[];
};

export const PRODUCT_FAMILY_META: Record<
  ProductFamilySlug,
  { label: string; title: string; description: string }
> = {
  scanner: {
    label: 'Scanner',
    title: 'Scanner Cases | ODYX',
    description: 'Clinical cases that use an ODYX intraoral scanner.',
  },
  printer: {
    label: 'Printer',
    title: 'Printer Cases | ODYX',
    description: 'Clinical cases that use an ODYX 3D printer.',
  },
  curing: {
    label: 'Curing',
    title: 'Curing Cases | ODYX',
    description: 'Clinical cases that use an ODYX curing machine.',
  },
  resin: {
    label: 'Resin',
    title: 'Resin Cases | ODYX',
    description: 'Clinical cases that use ODYX clinical resins.',
  },
};

export const PRODUCT_CASES_META = {
  title: 'Cases by Product | ODYX',
  description: 'Browse real clinical cases by ODYX product family — scanner, printer, curing, and resin.',
};

const APPLICATION_LABEL: Record<ShowcaseApplication, string> = {
  RESTORATIVE: 'Restorative',
  IMPLANT: 'Implant',
  ORTHODONTIC: 'Orthodontic',
  DENTURE: 'Denture',
  PROSTHETICS: 'Prosthetics',
  OTHER: 'Clinical',
};

const CMS_APPLICATION_SLUG: Record<ShowcaseApplication, ApplicationCaseSlug | null> = {
  RESTORATIVE: 'restorative',
  IMPLANT: 'implant',
  ORTHODONTIC: 'orthodontic',
  DENTURE: 'denture',
  PROSTHETICS: 'denture',
  OTHER: null,
};

export const PRODUCT_FAMILY_ICONS: Record<ProductFamilySlug, ProductCaseIcon> = {
  scanner: { id: 'scanner', img: '/img/scanner/s1-hero-cutout.png', alt: 'Scanner' },
  printer: { id: 'printer', img: '/img/printers/p126/hero-packshot.png', alt: 'Printer' },
  curing: { id: 'curing', img: '/img/cure-uv02/hero/machine-cutout.png', alt: 'Curing' },
  resin: { id: 'resin', img: '/img/hv2-hub/store-resins-cutout.png', alt: 'Resin' },
};

export function isProductFamilySlug(value: string): value is ProductFamilySlug {
  return (PRODUCT_FAMILY_SLUGS as readonly string[]).includes(value);
}

export function productCasesPath(family: ProductCaseFamily = 'all') {
  if (family === 'all') return '/solutions/cases/products';
  return `/solutions/cases/products/${family}`;
}

export function productCaseDetailPath(productSlug: ProductFamilySlug, caseSlug: string) {
  return `/solutions/cases/products/${productSlug}/${caseSlug}`;
}

function knownProductKeys(keys: readonly string[] | undefined): ProductFamilySlug[] {
  if (!keys?.length) return [];
  return keys.filter((k): k is ProductFamilySlug => isProductFamilySlug(k));
}

function iconsForKeys(keys: ProductFamilySlug[], moreExtra = 0): {
  products: ProductCaseIcon[];
  moreProducts: number;
} {
  const shown = keys.slice(0, 2).map((k) => PRODUCT_FAMILY_ICONS[k]);
  const remaining = Math.max(0, keys.length - shown.length);
  return { products: shown, moreProducts: remaining + moreExtra };
}

function nonEmpty(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function galleryItems(args: {
  title: string;
  cover?: { img: string; alt: string };
  before?: { img: string; alt: string };
  after?: { img: string; alt: string };
  extras?: { img: string; alt: string }[];
}): ProductCaseGalleryItem[] {
  const out: ProductCaseGalleryItem[] = [];
  const seen = new Set<string>();
  const push = (id: string, img: string, alt: string, label: string) => {
    if (!img || seen.has(img)) return;
    seen.add(img);
    out.push({ id, img, alt, label });
  };
  if (args.before) push('before', args.before.img, args.before.alt, 'Before');
  if (args.after) push('after', args.after.img, args.after.alt, 'After');
  if (args.cover) push('cover', args.cover.img, args.cover.alt, 'Case');
  args.extras?.forEach((item, i) => push(`gallery-${i}`, item.img, item.alt, `Image ${i + 1}`));
  return out;
}

export function productCaseFromShowcase(c: ShowcaseCase): ProductCaseCard {
  const productKeys = knownProductKeys(c.productKeys);
  const cmsIcons = c.products.map((p) => ({
    id: p.id,
    img: resolveMediaUrl(p.img),
    alt: p.alt,
  }));
  const { products, moreProducts } =
    cmsIcons.length > 0
      ? { products: cmsIcons, moreProducts: c.moreProducts }
      : iconsForKeys(productKeys);

  const before = c.beforeImageUrl
    ? { img: resolveMediaUrl(c.beforeImageUrl), alt: `${c.title} before` }
    : undefined;
  const after = c.afterImageUrl
    ? { img: resolveMediaUrl(c.afterImageUrl), alt: `${c.title} after` }
    : undefined;
  const coverImg = resolveMediaUrl(c.coverImageUrl);
  const extras = (c.galleryImageUrls ?? [])
    .map((url) => resolveMediaUrl(url))
    .filter(Boolean)
    .map((img) => ({ img, alt: c.title }));

  return {
    id: c.id,
    slug: c.slug,
    badge: c.badge,
    applicationSlug: CMS_APPLICATION_SLUG[c.application],
    title: c.title,
    summary: nonEmpty(c.summary),
    tags: c.tags,
    img: coverImg || after?.img || before?.img || '',
    imgAlt: c.coverImageAlt || c.title,
    before,
    after,
    gallery: galleryItems({
      title: c.title,
      cover: coverImg ? { img: coverImg, alt: c.coverImageAlt || c.title } : undefined,
      before,
      after,
      extras,
    }),
    productKeys,
    products,
    moreProducts,
    caseType: nonEmpty(c.caseType) || APPLICATION_LABEL[c.application] || nonEmpty(c.badge),
    procedure: nonEmpty(c.procedure) || (c.tags.length ? c.tags.join(', ') : null),
    treatmentArea: nonEmpty(c.treatmentArea),
    tooth: nonEmpty(c.tooth),
    patient: nonEmpty(c.patient),
    caseId: nonEmpty(c.caseId) || c.slug,
    keyMaterials: (c.keyMaterials ?? []).filter((m) => nonEmpty(m.name)),
    clinicalChallenge: nonEmpty(c.clinicalChallenge),
    treatmentApproach: nonEmpty(c.treatmentApproach),
    treatmentOutcome: nonEmpty(c.treatmentOutcome),
    treatmentJourney: (c.treatmentJourney ?? []).filter((s) => nonEmpty(s.title)),
  };
}

/** Published CMS showcase cases. Empty when the API is down or has no rows. */
export function buildProductCases(library: CaseLibraryPublic | null): ProductCaseCard[] {
  const rows = library?.cases?.length ? library.cases : library?.featured ?? [];
  return rows.map(productCaseFromShowcase);
}

export function findProductCase(cases: ProductCaseCard[], caseSlug: string): ProductCaseCard | undefined {
  return cases.find(
    (c) =>
      c.slug === caseSlug ||
      c.id === caseSlug ||
      c.id.endsWith(`:${caseSlug}`) ||
      c.caseId === caseSlug,
  );
}

export function productCaseCardHref(
  item: ProductCaseCard,
  listingFamily: ProductCaseFamily,
): string | null {
  if (!item.slug || item.productKeys.length === 0) return null;
  const family = listingFamily === 'all' ? item.productKeys[0] : listingFamily;
  if (!item.productKeys.includes(family)) return null;
  return productCaseDetailPath(family, item.slug);
}

export function productCaseGlance(c: ProductCaseCard): ProductCaseGlanceRow[] {
  const rows: ProductCaseGlanceRow[] = [];
  if (c.caseType) rows.push({ label: 'Case Type', value: c.caseType });
  if (c.procedure) rows.push({ label: 'Procedure', value: c.procedure });
  if (c.treatmentArea) rows.push({ label: 'Treatment Area', value: c.treatmentArea });
  if (c.tooth) rows.push({ label: 'Teeth', value: c.tooth });
  if (c.patient) rows.push({ label: 'Patient', value: c.patient });
  if (c.caseId) rows.push({ label: 'Case ID', value: c.caseId });
  return rows;
}

export function productCaseUsedProducts(c: ProductCaseCard): ProductCaseIcon[] {
  const byId = new Map<string, ProductCaseIcon>();
  for (const key of c.productKeys) {
    byId.set(key, PRODUCT_FAMILY_ICONS[key]);
  }
  for (const p of c.products) {
    byId.set(p.id, p);
  }
  return [...byId.values()];
}

export function casesForFamily(
  cases: ProductCaseCard[],
  family: ProductCaseFamily,
): ProductCaseCard[] {
  if (family === 'all') return cases;
  return cases.filter((c) => c.productKeys.includes(family));
}

function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

export function searchProductCases(cases: ProductCaseCard[], query: string): ProductCaseCard[] {
  const q = normalizeSearch(query);
  if (!q) return cases;
  const tokens = q.split(' ');
  return cases.filter((c) => {
    const hay = normalizeSearch(
      [
        c.title,
        c.summary ?? '',
        c.badge,
        c.procedure ?? '',
        c.caseType ?? '',
        ...c.tags,
        ...c.productKeys,
        ...c.productKeys.map((k) => PRODUCT_FAMILY_META[k].label),
        ...c.products.map((p) => `${p.id} ${p.alt}`),
        ...c.keyMaterials.map((m) => m.name),
      ].join(' '),
    );
    return hay.includes(q) || tokens.every((token) => hay.includes(token));
  });
}

export function filterProductCases(
  cases: ProductCaseCard[],
  family: ProductCaseFamily,
  query: string,
): ProductCaseCard[] {
  return searchProductCases(casesForFamily(cases, family), query);
}

export function productFamilyCounts(cases: ProductCaseCard[]): Record<ProductCaseFamily, number> {
  return {
    all: cases.length,
    scanner: casesForFamily(cases, 'scanner').length,
    printer: casesForFamily(cases, 'printer').length,
    curing: casesForFamily(cases, 'curing').length,
    resin: casesForFamily(cases, 'resin').length,
  };
}
