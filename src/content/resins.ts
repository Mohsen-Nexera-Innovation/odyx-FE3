// 039 · Resins — range page content (client resins-line UI reference).

export const RESINS_SLUG = 'resins';

export const RESINS_META = {
  title: 'Dental 3D Printing Resins | ODYX',
  description:
    'Five specialized dental resin lines for crowns, bridges, models, surgical guides and temporaries — with validated cure settings and per-line data sheets.',
};

export const HERO = {
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Resins' },
  ],
  title: 'ODYX Resins',
  tagline: 'Engineered for Precision. Built for Every Indication.',
  sub: 'High-performance resins developed for accurate, reliable, and esthetic results across every workflow.',
  features: [
    {
      id: 'validated',
      title: 'Tested & Validated',
      body: 'Rigorously tested for consistent results',
    },
    {
      id: 'strength',
      title: 'High Strength & Accuracy',
      body: 'Engineered for superior mechanical properties',
    },
    {
      id: 'compat',
      title: 'Wide Compatibility',
      body: 'Optimized for ODYX printers and workflows',
    },
    {
      id: 'esthetics',
      title: 'Reliable Esthetics',
      body: 'Natural-looking results patients love',
    },
  ],
  img: '/img/resins/hero-packshot.png',
  imgAlt: 'Five ODYX resin bottles with matching 3D-printed dental applications',
};

export type ResinLine = {
  id: string;
  name: string;
  highlight: string;
  img: string;
  imgAlt: string;
  /** Optional deep-link; defaults to why-band docs CTA */
  href?: string;
};

export const LINES_SECTION = {
  eyebrow: 'Five resins. Endless possibilities.',
  title: 'Find the Right Resin for Your Workflow',
  intro:
    'From highly esthetic restorations to precise models and surgical guides, ODYX resins deliver exceptional performance for every clinical need.',
};

/** Card order / copy matches the client resins-line reference (L → R). */
const docsMail = (line: string) =>
  `mailto:info@odyx.dental?subject=${encodeURIComponent(`Document request: ${line}`)}`;

export const LINES: ResinLine[] = [
  {
    id: 'ceramic-crown',
    name: 'Ceramic Crown Resin',
    highlight:
      'High-strength, highly esthetic resin for long-lasting crowns with natural translucency.',
    img: '/img/resins/card-ceramic.png',
    imgAlt: 'ODYX Ceramic Crown Resin 1kg bottle, shade A1',
    href: '/products/ceramic-crown-resin',
  },
  {
    id: 'temporary',
    name: 'Temporary Resin',
    highlight:
      'Reliable and easy-to-finish resin for temporary crowns and provisional restorations.',
    img: '/img/resins/card-temporary.png',
    imgAlt: 'ODYX Temporary Restoration Resin bottle, shade A2, 1 kg',
    href: '/products/temporary-restoration-resin',
  },
  {
    id: 'surgical-guide',
    name: 'Surgical Resin',
    highlight:
      'Biocompatible and precise resin for accurate surgical guides and drilling templates.',
    img: '/img/resins/card-surgical.png',
    imgAlt: 'ODYX Surgical Resin bottle with printed surgical guide',
    href: '/products/surgical-guide-resin-pro',
  },
  {
    id: 'ortho-model',
    name: 'Model Resin',
    highlight:
      'High-precision resin for detailed study models with sharp features and accuracy.',
    img: '/img/resins/card-model.png',
    imgAlt: 'ODYX Model Resin Toughness 1kg bottle, shade A2',
    href: '/products/model-resin',
  },
  {
    id: 'crown-bridge',
    name: 'Crown & Bridge Resin',
    highlight:
      'Durable and strong resin for long-span bridges and high-load restorations.',
    img: '/img/resins/card-crown-bridge.png',
    imgAlt: 'ODYX Crown & Bridge Resin 1kg bottle, shade A2',
    href: '/products/crown-bridge-resin',
  },
];

export const LINE_CTA_LABEL = 'Explore';

export const WHY = {
  eyebrow: 'Why dentists & labs choose ODYX resins',
  features: [
    {
      id: 'proven',
      title: 'Proven Performance',
      body: 'Clinically tested for reliable outcomes',
    },
    {
      id: 'formulas',
      title: 'Optimized Formulas',
      body: 'Balanced strength, precision & esthetics',
    },
    {
      id: 'compat',
      title: 'Perfect Compatibility',
      body: 'Designed for seamless workflow with ODYX ecosystem',
    },
    {
      id: 'esthetics',
      title: 'Natural Esthetics',
      body: 'Life-like shades and translucency',
    },
    {
      id: 'safe',
      title: 'Safe & Biocompatible',
      body: 'Patient-safe materials you can trust',
    },
  ],
  docs: {
    title: 'Technical Data & Safety Sheets',
    body: 'Download detailed information about all ODYX resins.',
    cta: {
      label: 'View Downloads',
      href: 'mailto:info@odyx.dental?subject=ODYX%20Resins%20Technical%20Data%20%26%20Safety%20Sheets',
    },
  },
};
