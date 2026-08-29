import { P1_26_HERO } from '@/content/p1-26';
import { LINES, LINES_SECTION } from '@/content/resins';
import { REQUEST_DEMO_TRUST, requestDemoHref } from '@/content/request-demo';

export const PRODUCTS_LANDING_META = {
  title: 'Products | ODYX',
  description:
    'Explore the ODYX digital dentistry portfolio — ODYX-S1 scanner, P1-26 printer, ODYX Cure, and five clinical resin lines in one connected workflow.',
};

export const PRODUCTS_LANDING_HERO = {
  titleLead: 'Technology that',
  titleAccent: 'moves dentistry forward.',
  body: 'Discover the ODYX portfolio — from intelligent scanning and digital printing to precision curing and advanced dental materials.',
};

export const PRODUCTS_LANDING_HERO_ITEMS = [
  {
    id: 'scanner',
    label: 'Scanner',
    href: '/products/odyx-s1',
    img: '/img/hv2-cut/scanner-product.webp',
    imgAlt: 'ODYX-S1 intraoral scanner',
    media: 'wand' as const,
  },
  {
    id: 'printer',
    label: '3D Printer',
    href: '/products/odyx-p1-26',
    img: P1_26_HERO.printerImg,
    imgAlt: 'ODYX P1-26 dental 3D printer',
    media: 'machine' as const,
  },
  {
    id: 'cure',
    label: 'Curing Machine',
    href: '/products/curing-machines',
    img: '/img/hv2-cut/cure-product.webp',
    imgAlt: 'ODYX Cure curing station',
    media: 'machine' as const,
  },
  {
    id: 'resins',
    label: 'Dental Resins',
    href: '/products/resins',
    bottles: [
      {
        src: '/img/resins/card-ceramic.png',
        alt: 'ODYX Ceramic Crown Resin',
      },
      {
        src: '/img/resins/card-crown-bridge.png',
        alt: 'ODYX Crown & Bridge Resin',
      },
    ],
    media: 'bottles' as const,
  },
] as const;

export const PRODUCTS_LANDING_FAMILIES = [
  {
    id: 'scanner',
    index: '01',
    kicker: 'Scanner',
    title: 'Capture with confidence.',
    body: 'The ODYX-S1 captures full-arch digital impressions in 40 seconds, accurate to 20 microns — open STL and OBJ export, no lock-in.',
    href: '/products/odyx-s1',
    cta: 'Explore Scanner',
    img: '/img/hv2-cut/scanner-product.webp',
    imgAlt: 'ODYX-S1 intraoral scanner wand',
    imageSide: 'start' as const,
    points: [
      'Exceptional accuracy at the margin',
      'Smooth, fast full-arch scanning',
      'Open system compatibility',
    ],
  },
  {
    id: 'printer',
    index: '02',
    kicker: '3D Printer',
    title: 'Turn digital into reality.',
    body: 'The ODYX P1-26 prints crowns, guides, models and dentures at 18 µm X-Y accuracy on a 6.8″ 9K LCD — open materials, clinic-ready footprint.',
    href: '/products/odyx-p1-26',
    cta: 'Explore 3D Printer',
    img: P1_26_HERO.printerImg,
    imgAlt: 'ODYX P1-26 resin 3D printer',
    imageSide: 'end' as const,
    points: [
      'High-precision 18 µm X-Y printing',
      'Open material compatibility',
      'Consistent, clinic-ready output',
    ],
  },
  {
    id: 'cure',
    index: '03',
    kicker: 'Curing Machine',
    title: 'Consistency after printing.',
    body: 'ODYX Cure finishes the print with 360° coverage and triple-wavelength light (365 / 385 / 405 nm) plus validated presets for dental applications.',
    href: '/products/curing-machines',
    cta: 'Explore Curing Machine',
    img: '/img/cure-uv02/hero/machine-cutout.png',
    imgAlt: 'ODYX Cure dental curing station',
    imageSide: 'start' as const,
    points: [
      'Uniform 360° light distribution',
      'Triple-wavelength curing modes',
      'Safe, efficient chairside cycles',
    ],
  },
  {
    id: 'resins',
    index: '04',
    kicker: 'Dental Resins',
    title: 'Materials made for the workflow.',
    body: 'Five clinical resin lines — Ceramic Crown, Crown & Bridge, Temporary Restoration, Model, and Surgical Guide Pro — each with its own indication and data sheet.',
    href: '/products/resins',
    cta: 'Explore Resins',
    // Same packshots as the hero resins pedestal.
    bottles: [
      {
        src: '/img/resins/card-ceramic.png',
        alt: 'ODYX Ceramic Crown Resin',
      },
      {
        src: '/img/resins/card-crown-bridge.png',
        alt: 'ODYX Crown & Bridge Resin',
      },
    ],
    imageSide: 'end' as const,
    points: [
      'Wide range of clinical indications',
      'Mechanical properties per line',
      'Indication-specific documentation',
    ],
  },
] as const;

export const PRODUCTS_LANDING_RESINS = {
  eyebrow: LINES_SECTION.eyebrow,
  title: LINES_SECTION.title,
  lines: LINES,
};

export const PRODUCTS_LANDING_WORKFLOW = {
  title: 'One Portfolio. One Workflow.',
  steps: [
    {
      id: 'scan',
      label: 'Scan',
      caption: 'Capture impressions',
      href: '/products/odyx-s1',
      img: '/img/hv2-cut/scanner-product.webp',
      imgAlt: 'ODYX-S1 scanner',
    },
    {
      id: 'design',
      label: 'Design',
      caption: 'Digital planning',
      href: '/products/design-services',
      img: '/img/cutouts/feat-design-cutout.png',
      imgAlt: 'ODYX design services',
    },
    {
      id: 'print',
      label: 'Print',
      caption: '3D manufacturing',
      href: '/products/odyx-p1-26',
      img: P1_26_HERO.printerImg,
      imgAlt: 'ODYX P1-26 printer',
    },
    {
      id: 'cure',
      label: 'Cure',
      caption: 'Post processing',
      href: '/products/curing-machines',
      img: '/img/hv2-cut/cure-product.webp',
      imgAlt: 'ODYX Cure',
    },
    {
      id: 'material',
      label: 'Material',
      caption: 'Dental resins',
      href: '/products/resins',
      bottles: [
        {
          src: '/img/resins/card-ceramic.png',
          alt: 'ODYX Ceramic Crown Resin',
        },
        {
          src: '/img/resins/card-crown-bridge.png',
          alt: 'ODYX Crown & Bridge Resin',
        },
      ],
    },
  ],
} as const;

export const PRODUCTS_LANDING_CTA = {
  titleLead: 'Build your digital dentistry ecosystem with',
  titleAccent: 'ODYX.',
  body: 'Request a demo and discover the right solution for your practice or lab.',
  primary: { label: 'Request a Demo', href: requestDemoHref('workflow') },
  secondary: { label: 'Explore Workflows', href: '/workflows' },
  collage: [
    {
      id: 'scanner',
      src: '/img/hv2-cut/scanner-product.webp',
      alt: 'ODYX-S1 intraoral scanner',
    },
    {
      id: 'printer',
      src: P1_26_HERO.printerImg,
      alt: 'ODYX P1-26 3D printer',
    },
    {
      id: 'cure',
      src: '/img/hv2-cut/cure-product.webp',
      alt: 'ODYX Cure',
    },
    {
      id: 'resins',
      bottles: [
        {
          src: '/img/resins/card-ceramic.png',
          alt: 'ODYX Ceramic Crown Resin',
        },
        {
          src: '/img/resins/card-crown-bridge.png',
          alt: 'ODYX Crown & Bridge Resin',
        },
      ],
    },
  ],
} as const;

export const PRODUCTS_LANDING_TRUST = REQUEST_DEMO_TRUST;
