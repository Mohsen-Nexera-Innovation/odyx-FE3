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
};

export const LINES_SECTION = {
  eyebrow: 'Five resins. Endless possibilities.',
  title: 'Find the Right Resin for Your Workflow',
  intro:
    'From highly esthetic restorations to precise models and surgical guides, ODYX resins deliver exceptional performance for every clinical need.',
};

/** Card order / copy matches the client resins-line reference (L → R). */
export const LINES: ResinLine[] = [
  {
    id: 'ceramic-crown',
    name: 'Ceramic Crown Resin',
    highlight:
      'High-strength, highly esthetic resin for long-lasting crowns with natural translucency.',
    img: '/img/resins/card-ceramic.png',
    imgAlt: 'ODYX Ceramic Crown Resin bottle with printed crowns',
  },
  {
    id: 'temporary',
    name: 'Temporary Resin',
    highlight:
      'Reliable and easy-to-finish resin for temporary crowns and provisional restorations.',
    img: '/img/resins/card-temporary.png',
    imgAlt: 'ODYX Temporary Resin bottle with printed temporary crowns',
  },
  {
    id: 'surgical-guide',
    name: 'Surgical Resin',
    highlight:
      'Biocompatible and precise resin for accurate surgical guides and drilling templates.',
    img: '/img/resins/card-surgical.png',
    imgAlt: 'ODYX Surgical Resin bottle with printed surgical guide',
  },
  {
    id: 'ortho-model',
    name: 'Model Resin',
    highlight:
      'High-precision resin for detailed study models with sharp features and accuracy.',
    img: '/img/resins/card-model.png',
    imgAlt: 'ODYX Model Resin bottle with printed dental model',
  },
  {
    id: 'crown-bridge',
    name: 'Crown & Bridge Resin',
    highlight:
      'Durable and strong resin for long-span bridges and high-load restorations.',
    img: '/img/resins/card-crown-bridge.png',
    imgAlt: 'ODYX Crown & Bridge Resin bottle with printed bridge',
  },
];

export const LINE_CTA_LABEL = 'Explore';

export const WHY = {
  eyebrow: 'Why dentists & labs choose ODYX resins',
  features: [
    {
      id: 'proven',
      title: 'Proven Performance',
      body: 'Consistent clinical results you can trust',
    },
    {
      id: 'formulas',
      title: 'Optimized Formulas',
      body: 'Purpose-built for each indication',
    },
    {
      id: 'compat',
      title: 'Perfect Compatibility',
      body: 'Tuned for the ODYX print workflow',
    },
    {
      id: 'esthetics',
      title: 'Natural Esthetics',
      body: 'Lifelike shade and surface quality',
    },
    {
      id: 'safe',
      title: 'Safe & Biocompatible',
      body: 'Biocompatibility tested per line',
    },
  ],
  docs: {
    title: 'Technical Data & Safety Sheets',
    body: 'Download detailed information about all ODYX resins.',
    cta: { label: 'View Downloads', href: '#downloads' },
  },
};

export const DOCS = {
  title: 'Documents & certification',
  intro:
    'Technical data sheets and safety documents, per line - and certification stated per line, because that is the only honest way to state it.',
  tabs: ['Technical data', 'Handling & safety'] as const,
  emptyLine: 'Document on request - tell us which line and we will send it.',
  requestHref: (line: string, doc: string) =>
    `mailto:info@odyx.dental?subject=${encodeURIComponent(`Document request: ${line} - ${doc}`)}`,
  docNames: ['Technical Data Sheet (TDS)', 'Safety Data Sheet (SDS)'] as const,
  certTitle: 'Certification, per line',
  certColumns: ['CE', 'FDA', 'ISO', 'ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'],
  certRows: [
    { line: 'Ceramic Crown Resin', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Temporary Resin', marks: ['ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Surgical Resin', marks: ['ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Model Resin', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Crown & Bridge Resin', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
  ],
  certMicro: 'MSDS available for all five lines. Certification is stated per resin line, never range-wide.',
};
