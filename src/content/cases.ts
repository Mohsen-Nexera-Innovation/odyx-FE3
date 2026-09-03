/**
 * Real Case Library — hub chrome content.
 * Case cards and counts come from the CMS (`fetchCaseLibrary`).
 */

export const CASES_META = {
  title: 'Real Case Library | ODYX',
  description:
    'Browse real clinical cases completed with ODYX solutions across applications and products.',
};

export type CasesCta = {
  label: string;
  href: string;
};

export type CasesHeroAction = CasesCta & {
  variant: 'primary' | 'outline';
  /** Leading icon id — resolved in CasesIcons (About-page icon-map pattern) */
  icon: HeroActionIconId;
};

export type HeroActionIconId = 'layout-grid' | 'box' | 'cloud-upload';

export type CasesHeroData = {
  kicker: string;
  titleLead: string;
  titleRest: string;
  body: string;
  searchPlaceholder: string;
  before: { img: string; alt: string };
  after: { img: string; alt: string };
  actions: CasesHeroAction[];
};

export type ApplicationIconId = 'restorative' | 'implant' | 'orthodontic' | 'denture';

export type BrowseCard = {
  id: string;
  title: string;
  countLabel: string;
  href: string;
  img: string;
  imgAlt: string;
  icon?: ApplicationIconId;
};

export type BrowseSectionData = {
  id: string;
  kicker: string;
  title: string;
  viewAll?: CasesCta;
  items: BrowseCard[];
  productStyle?: boolean;
};

export type FeaturedProductIcon = {
  id: string;
  img: string;
  alt: string;
};

export type FeaturedCase = {
  id: string;
  badge: string;
  title: string;
  tags: string[];
  href: string;
  img: string;
  imgAlt: string;
  /** Optional before/after pair for the mock split preview */
  before?: { img: string; alt: string };
  after?: { img: string; alt: string };
  /** All product keys used by this case (for CASE BY PRODUCT filtering) */
  productKeys?: string[];
  products: FeaturedProductIcon[];
  moreProducts: number;
};

export type FeaturedSectionData = {
  kicker: string;
  title: string;
  viewAll?: CasesCta;
  items: FeaturedCase[];
};

export type ShareSectionData = {
  title: string;
  body: string;
  clipboard: { img: string; alt: string };
  registered: { label: string; cta: CasesCta };
  newUser: { label: string; cta: CasesCta };
};

export type CasesPageData = {
  hero: CasesHeroData;
  applications: BrowseSectionData;
  products: BrowseSectionData;
  featured: FeaturedSectionData;
  share: ShareSectionData;
};

const IMG = '/img/real-case-library';

/** Hub chrome only — case cards and counts come from the CMS. */
export const casesData: CasesPageData = {
  hero: {
    kicker: 'REAL CASE LIBRARY',
    titleLead: 'Real Cases. ',
    titleRest: 'Real Confidence.',
    body: 'Browse real clinical cases completed with ODYX solutions across different applications and products.',
    searchPlaceholder: 'Search cases by treatment, product, or keyword...',
    before: {
      img: '/img/scanner/s1-hero-cutout.png',
      alt: 'ODYX intraoral scanner',
    },
    after: {
      img: '/img/printers/p126/hero-packshot.png',
      alt: 'ODYX P1-26 dental 3D printer',
    },
    actions: [
      {
        label: 'Browse by Application',
        href: '/solutions/cases/applications',
        variant: 'primary',
        icon: 'layout-grid',
      },
      {
        label: 'Browse by Product',
        href: '/solutions/cases/products',
        variant: 'outline',
        icon: 'box',
      },
    ],
  },
  applications: {
    id: 'by-application',
    kicker: 'CASE BY APPLICATION',
    title: 'Browse cases by clinical application.',
    viewAll: { label: 'View all', href: '/solutions/cases/applications' },
    items: [
      {
        id: 'restorative',
        title: 'Restorative',
        countLabel: '0 Cases',
        href: '/solutions/cases/applications/restorative',
        img: '/img/clinical/same-day-crown/hero-cutout.png',
        imgAlt: 'Restorative clinical application',
        icon: 'restorative',
      },
      {
        id: 'implant',
        title: 'Implant',
        countLabel: '0 Cases',
        href: '/solutions/cases/applications/implant',
        img: '/img/clinical/surgical-guide/hero-cutout.png',
        imgAlt: 'Surgical guide for implant planning',
        icon: 'implant',
      },
      {
        id: 'orthodontic',
        title: 'Orthodontic',
        countLabel: '0 Cases',
        href: '/solutions/cases/applications/orthodontic',
        img: '/img/clinical/aligners/hero-cutout.png',
        imgAlt: 'Orthodontic aligner photography',
        icon: 'orthodontic',
      },
      {
        id: 'denture',
        title: 'Prosthetic',
        countLabel: '0 Cases',
        href: '/solutions/cases/applications/denture',
        img: '/img/clinical/dentures/hero-cutout.png',
        imgAlt: 'Printed denture photography',
        icon: 'denture',
      },
    ],
  },
  products: {
    id: 'by-product',
    kicker: 'CASE BY PRODUCT',
    title: 'Browse cases by the ODYX products.',
    viewAll: { label: 'View all', href: '/solutions/cases/products' },
    productStyle: true,
    items: [
      {
        id: 'scanner',
        title: 'Scanner',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/scanner',
        img: '/img/scanner/s1-hero-cutout.png',
        imgAlt: 'ODYX intraoral scanner',
      },
      {
        id: 'printer',
        title: 'Printer',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/printer',
        img: '/img/cutouts/feat-printer-cutout.png',
        imgAlt: 'ODYX dental 3D printer',
      },
      {
        id: 'curing',
        title: 'Curing Machine',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/curing',
        img: '/img/cure-uv02/hero/machine-cutout.png',
        imgAlt: 'ODYX curing machine',
      },
      {
        id: 'resin',
        title: 'Resin',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/resin',
        img: '/img/hv2-hub/store-resins-cutout.png',
        imgAlt: 'ODYX dental resin bottles',
      },
    ],
  },
  featured: {
    kicker: 'FEATURED CLINICAL CASES',
    title: 'Explore real results from dental professionals.',
    items: [],
  },
  share: {
    title: 'Share Your Success. Inspire the Community.',
    body: 'Submit your clinical cases to be featured in the ODYX Case Library and help advance digital dentistry.',
    clipboard: {
      img: `${IMG}/cta-clipboard.jpg`,
      alt: 'Clinical case submission clipboard illustration',
    },
    registered: {
      label: 'Already registered?',
      cta: { label: 'Login & Submit Case', href: '/login' },
    },
    newUser: {
      label: 'New to ODYX?',
      cta: { label: 'Register Now', href: '/register' },
    },
  },
};
