/** Shared types for clinical indication detail pages (Same-Day Crown chrome). */

import { DIGITAL_WORKFLOW_LINKS } from '@/content/digital-workflow-links';

export type ClinicalCategoryId =
  | 'restorative'
  | 'implant'
  | 'orthodontics'
  | 'prosthetics'
  | 'cases';

export const CLINICAL_BADGE_ACCENTS: Record<ClinicalCategoryId, string> = {
  restorative: '#8153CF',
  implant: '#5480EB',
  orthodontics: '#56B1A3',
  prosthetics: '#ED9E5E',
  cases: '#D65765',
};

export type ClinicalProduct = {
  id: string;
  name: string;
  sub: string;
  img: string;
  href: string;
  layout?: 'stack';
  /** Visible but non-navigable (page not ready) */
  dimmed?: boolean;
};

export type ClinicalTimelineStep = {
  n: number;
  title: string;
  body: string;
  time: string;
  icon: string;
};

export type ClinicalBaSlide = {
  before: { img: string; alt: string };
  after: { img: string; alt: string };
};

export type ClinicalWhyItem = {
  id: string;
  title: string;
  body: string;
};

export type ClinicalIndicationContent = {
  slug: string;
  category: ClinicalCategoryId;
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    body: string;
    cta: { label: string; href: string };
    img: string;
    imgAlt: string;
  };
  productsTitle: string;
  products: ClinicalProduct[];
  timeline: {
    title: string;
    total: string;
    steps: ClinicalTimelineStep[];
  };
  beforeAfter: {
    title: string;
    slides: ClinicalBaSlide[];
  };
  why: {
    title: string;
    items: ClinicalWhyItem[];
  };
  params: {
    title: string;
    rows: { label: string; value: string }[];
  };
  tips: {
    title: string;
    items: string[];
  };
  realCase: {
    title: string;
    body: string;
    videoLabel: string;
    videoHref: string;
    thumb: string;
    thumbAlt: string;
  };
};

export type ClinicalIndicationMeta = {
  title: string;
  description: string;
};

export function clinicalPath(slug: string) {
  return `/solutions/clinical-applications/${slug}`;
}

/** Shared ODYX ecosystem product cards — override resin/appliance per indication. */
export const ECOSYSTEM_PRODUCTS = {
  scanner: {
    id: 'scanner',
    name: 'ODYX S1',
    sub: 'Intraoral Scanner',
    img: '/img/scanner/s1-hero-cutout.png',
    href: '/products/odyx-s1-intraoral-scanner',
    layout: 'stack' as const,
  },
  cad: {
    id: 'cad',
    name: 'CAD Software',
    sub: '(exocad)',
    img: '/img/clinical-sdc/card-cad-software.png',
    href: DIGITAL_WORKFLOW_LINKS.design,
    layout: 'stack' as const,
    dimmed: true,
  },
  printer: {
    id: 'printer',
    name: 'ODYX P1-26',
    sub: '3D Printer',
    img: '/img/printers/p126/hero-packshot.png',
    href: '/products/odyx-p1-26',
    layout: 'stack' as const,
  },
  cure: {
    id: 'cure',
    name: 'ODYX UV-02',
    sub: 'UV Curing Unit',
    img: '/img/cure-uv02/hero/machine-cutout.png',
    href: '/products/curing-machines',
    layout: 'stack' as const,
  },
} as const;

export const SHARED_TL = {
  scan: '/img/clinical-sdc/tl/tl-scan.png',
  design: '/img/clinical/shared/tl-design.png',
  print: '/img/clinical-sdc/tl/tl-print.png',
  cure: '/img/clinical-sdc/tl/tl-cure.png',
} as const;

/** Per-indication finish icon; scan/design/print/cure are shared across indications. */
export function tlIcons(slug: string) {
  return {
    scan: SHARED_TL.scan,
    design: SHARED_TL.design,
    print: SHARED_TL.print,
    cure: SHARED_TL.cure,
    finish: `/img/clinical/${slug}/tl/tl-finish.png`,
  };
}
