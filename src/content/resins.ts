// 039 · Resins — range page content.
// Copy from knowledge_base/screens/039-resin/content.md §4; every number traced
// in the claims register (§7). Never add a spec that isn't there — the per-line
// mechanical values and the "385–405 nm compatibility" claim are blocked on the
// Scientific Team (screen-details §13) and must not appear.

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
  eyebrow: 'ODYX Resins',
  h1: 'Dental 3D Printing Resins',
  // The client's own line, from their range reference — kept verbatim.
  headline: 'Engineered for Precision. Built for Every Indication.',
  sub: 'Five specialized resin lines behind everything the ODYX workflow prints — from study models to permanent crowns.',
  chips: [
    'Five specialized lines',
    'Natural tooth shades A1–B2',
    'Validated cure settings',
    'Data sheets per line',
  ],
  primaryCta: { label: 'Request a demo', href: '/support' },
  secondaryCta: { label: 'Download data sheets', href: '#downloads' },
  // Background-free cutout (Vision subject lift from all-resins.jpg)
  img: '/img/resins/all-resins-cutout.png',
  imgAlt: 'The five ODYX resin lines — matte black 1 kg bottles, staggered in depth',
};

export const SUBNAV = [
  { label: 'The five lines', href: '#lines' },
  { label: 'Which resin for which job', href: '#compare' },
  { label: 'Shades', href: '#shades' },
  { label: 'Wash & cure', href: '#wash-cure' },
  { label: 'Downloads', href: '#downloads' },
];

export const WORKFLOW_BAND = {
  title: 'Where resin sits in the workflow',
  headline: 'The step where digital becomes physical.',
  body: 'Your case arrives sliced from Design. The resin you load decides what it becomes — a model, a guide, a crown. And printed isn’t finished: every part is washed, cured, and only then delivered. ODYX resins are made for that whole chain, with cure settings published per application.',
  steps: [
    { name: 'Scan', caption: 'ODYX S1' },
    { name: 'Design', caption: 'ODYX Box' },
    { name: 'Print', caption: 'P1-26 + five resin lines' },
    { name: 'Wash & Cure', caption: 'Typical cure 1–5 min' },
    { name: 'Deliver', caption: 'Same-visit handoff' },
  ],
  activeStep: 2,
  back: { label: 'The printers of PRINT', href: '/products/3d-printers' },
  forward: { label: 'Cure times per application', href: '#wash-cure' },
};

export type ResinLine = {
  id: string;
  name: string;
  idealFor: string;
  highlight: string;
  cert: string;
  certKind: 'regulatory' | 'biocompatibility';
  /** Photographic environment color — imagery only, never UI (sub-design-system §1) */
  env: string;
  img: string;
  imgAlt: string;
};

export const LINES_SECTION = {
  title: 'The five lines',
  intro: 'Indications first — pick the clinical job, and the line is obvious.',
};

export const LINES: ResinLine[] = [
  {
    id: 'ceramic-crown',
    name: 'Ceramic Crown Resin',
    idealFor: 'Crowns, veneers, inlays/onlays',
    highlight:
      'Permanent and temporary restorations with low polymerization shrinkage for an accurate marginal fit; wear- and fracture-resistant, in six natural shades.',
    cert: 'CE · FDA · ISO',
    certKind: 'regulatory',
    env: '#8A6242',
    img: '/img/resins/ceramic-crown.jpg',
    imgAlt: 'ODYX Ceramic Crown Resin, 1 kg bottle',
  },
  {
    id: 'crown-bridge',
    name: 'Crown & Bridge Resin',
    idealFor: 'Crowns, bridges, denture teeth, inlays, onlays, veneers',
    highlight:
      'Mechanical strength for long-term restorations; impact resistance that minimizes fracture risk.',
    cert: 'CE · FDA · ISO',
    certKind: 'regulatory',
    env: '#B87333',
    img: '/img/resins/crown-and-bridge.jpg',
    imgAlt: 'ODYX Crown & Bridge Resin, 1 kg bottle',
  },
  {
    id: 'ortho-model',
    name: 'Ortho Model Resin 2.0',
    idealFor: 'Study models, aligner models, working models',
    highlight:
      'High dimensional accuracy with a smooth surface — and it withstands vacuum thermoforming heat.',
    cert: 'CE · FDA · ISO',
    certKind: 'regulatory',
    env: '#6E6258',
    img: '/img/resins/model-resin.jpg',
    imgAlt: 'ODYX Model Resin, 1 kg bottle',
  },
  {
    id: 'surgical-guide',
    name: 'Surgical Guide Resin Pro',
    idealFor: 'Implant surgical guides',
    highlight:
      'High transparency for visibility during surgery; flexibility that prevents cracking; steam-sterilizable to 135 °C.',
    cert: 'Biocompatibility-tested: ISO 10993 · ISO 13485',
    certKind: 'biocompatibility',
    env: '#1E6E78',
    img: '/img/resins/surgical-guide-pro-white.jpg',
    imgAlt: 'ODYX Surgical Guide Resin Pro, clear, 1 kg bottle',
  },
  {
    id: 'temporary',
    name: 'Temporary Restoration Resin',
    idealFor: 'Temporary crowns and bridges',
    highlight:
      'Easy polishing and patient comfort, water absorption under 1.5 %, six natural shades.',
    cert: 'Biocompatibility-tested: ISO 10993 · ISO 13485',
    certKind: 'biocompatibility',
    env: '#6C4FA6',
    img: '/img/resins/temporary-restoration.jpg',
    imgAlt: 'ODYX Temporary Restoration Resin, 1 kg bottle',
  },
];

/** Card CTA — routes to the per-line documents until the five child pages ship
 *  (range + child-pages structure is a sitemap addition, screen-details §13.5). */
export const LINE_CTA_LABEL = 'Data sheet & certification';

export const COMPARE = {
  title: 'Which resin for which job?',
  intro: 'Every property explained in clinical terms — open any term below the table to see why it matters.',
  microcopy: 'Full per-line technical data arrives with each line’s data sheet (see Downloads).',
  // Rows map clinical jobs to lines: order matches LINES above.
  rows: [
    { job: 'Permanent crowns, veneers, inlays/onlays', lines: ['ceramic-crown', 'crown-bridge'] },
    { job: 'Bridges & denture teeth', lines: ['crown-bridge'] },
    { job: 'Temporary crowns & bridges', lines: ['temporary', 'ceramic-crown'] },
    { job: 'Study / working models', lines: ['ortho-model'] },
    { job: 'Aligner & thermoforming models', lines: ['ortho-model'] },
    { job: 'Implant surgical guides', lines: ['surgical-guide'] },
  ],
};

// The teaching layer — verbatim-close to the catalog properties glossary (p24–p26).
export const GLOSSARY = {
  title: 'What the properties mean, clinically',
  terms: [
    {
      term: 'Flexural strength',
      def: 'Resistance to bending under chewing load; 140–160 MPa reads as “very strong — essential for permanent restorations.”',
    },
    {
      term: 'Heat deflection temperature',
      def: 'Above 100 °C a part withstands sterilization; around 60 °C suits models only.',
    },
    {
      term: 'Elongation at break',
      def: '5–10 % behaves ceramic-like and brittle; 100 %+ behaves elastic, gingiva-like.',
    },
    {
      term: 'Water absorption',
      def: 'Lower is better: dimensional stability, no staining, no odor.',
    },
    {
      term: 'Shore D hardness',
      def: 'Surface hardness of rigid materials (Shore A is for soft, gingiva-like ones).',
    },
  ],
};

export const SHADES = {
  title: 'The shade system',
  headline: 'Six shades. Matched at the chair.',
  body: 'Ceramic Crown Resin and Temporary Restoration Resin share one shade system — A1, A2, A3, BL1, B1, B2 — so the temporary a patient wears this week and the crown they receive next visit can be matched from the same palette.',
  // Swatch fills are design-drawn UI (not sampled from any catalog) — codes are the claim, colors are illustrative.
  swatches: [
    { code: 'BL1', fill: '#F6F0E4' },
    { code: 'A1', fill: '#F0E4CE' },
    { code: 'A2', fill: '#EADAB9' },
    { code: 'A3', fill: '#E2CCA0' },
    { code: 'B1', fill: '#EFE3C4' },
    { code: 'B2', fill: '#E7D5A8' },
  ],
  carriedBy: 'Carried by Ceramic Crown Resin and Temporary Restoration Resin.',
  img: '/img/resins/ceramic-scene.jpg',
  imgAlt: 'Printed ceramic crown restorations beside the Ceramic Crown Resin bottle',
};

export const WASH_CURE = {
  title: 'Wash & cure settings',
  headline: 'Printed isn’t finished.',
  body: 'A printed part is washed in IPA, then post-cured — that’s what turns a print into a restoration. ODYX publishes the settings instead of leaving your lab to guess. One ODYX Cure box covers the whole range, because its three wavelengths are selectable per resin. For labs, the UW-03 washes models while they’re still on the build plate, keeping hands away from uncured resin.',
  times: [
    { app: 'Standard models', time: '~2 min' },
    { app: 'Surgical guides', time: '~3 min' },
    { app: 'Temporary crowns', time: '~10 min' },
  ],
  timesNote: 'Validated cure times per application — settings may vary by resin type.',
  wavelengths: ['365 nm', '385 nm', '405 nm'],
  wavelengthsNote: 'Three wavelengths, selectable per resin — why one box cures all five lines.',
  link: { label: 'See the curing machines', href: '/products/curing-machines' },
  microcopy: 'Biocompatibility depends on the resin — which is why these claims live here, per line, and not on the cure page.',
  img: '/img/cure-stitch/machine-hero-cutout.png',
  imgAlt: 'ODYX Cure unit — the one post-curing box for all five resin lines',
};

export const DOCS = {
  title: 'Documents & certification',
  intro: 'Technical data sheets and safety documents, per line — and certification stated per line, because that’s the only honest way to state it.',
  tabs: ['Technical data', 'Handling & safety'] as const,
  emptyLine: 'Document on request — tell us which line and we’ll send it.',
  requestHref: (line: string, doc: string) =>
    `mailto:info@odyx.dental?subject=${encodeURIComponent(`Document request: ${line} — ${doc}`)}`,
  docNames: ['Technical Data Sheet (TDS)', 'Safety Data Sheet (SDS)'] as const,
  certTitle: 'Certification, per line',
  // Exactly what the catalog p30 lists per line — never aggregated to the range.
  certColumns: ['CE', 'FDA', 'ISO', 'ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'],
  certRows: [
    { line: 'Ceramic Crown Resin', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Crown & Bridge Resin', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Ortho Model Resin 2.0', marks: ['CE', 'FDA', 'ISO', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Surgical Guide Resin Pro', marks: ['ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'] },
    { line: 'Temporary Restoration Resin', marks: ['ISO 10993', 'ISO 13485', 'MSDS', 'REACH', 'RoHS'] },
  ],
  certMicro: 'MSDS available for all five lines. Certification is stated per resin line, never range-wide.',
};

export const ECOSYSTEM = {
  title: 'One workflow, end to end',
  // Product images shared with the scanner screen's ecosystem strip (034)
  nodes: [
    { name: 'ODYX S1 Scanner', href: '/products/odyx-s1-intraoral-scanner', img: '/img/scanner/s1-hero.jpg' },
    { name: 'P1-26 Printer', href: '/products/3d-printers', img: '/img/scanner/eco-printer.jpg' },
    { name: 'Five resin lines', href: '#lines', img: '/img/scanner/eco-resins.jpg', active: true },
    { name: 'ODYX Cure + UW-03', href: '/products/curing-machines', img: '/img/scanner/eco-cure.jpg', fit: 'cover' as const },
  ],
  closing: {
    headline: 'See all five resins in one live workflow.',
    body: 'One session: a case scanned, printed, washed, cured and in your hands. That’s the demo — and it’s how these materials are meant to be judged.',
    cta: { label: 'Request a demo', href: '/support' },
    ctaMicro: 'See all five resins printed, washed and cured in one session',
  },
};
