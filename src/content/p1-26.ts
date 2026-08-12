/**
 * Dedicated P1-26 landing — attached product UI.
 * Specs/claims aligned with printers-3d.ts P1_26 (claims register).
 */

import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

export const P1_26_SLUG = 'odyx-p1-26';

export const P1_26_META = {
  title: 'ODYX P1-26 — Dental 3D Printer',
  description:
    'Precision dental 3D printing for crowns, bridges, guides and models — 18 µm X-Y accuracy on a 6.8″ 9K LCD with an open material workflow.',
};

export const P1_26_HERO = {
  eyebrow: 'P1-26 Dental 3D Printer',
  title: 'Precision Printing. Better Dentistry.',
  body: 'The ODYX P1-26 delivers ultra-high precision and speed for all your dental 3D printing needs in one reliable solution.',
  /** Multi-layer hero — packshot + angled print outputs on short stands */
  bg: '/img/printers/p126/hero/hero-bg.jpg',
  printerImg: '/img/printers/p126/hero-packshot.png',
  outputBridgeImg: '/img/printers/p126/hero/output-bridge.png',
  outputArchImg: '/img/printers/p126/hero/output-arch.png',
  imgAlt: 'ODYX P1-26 dental 3D printer with printed dental models',
  primaryCta: { label: 'Request Demo', href: '/request-demo' },
  secondaryCta: {
    label: 'Download Brochure',
    href: '/docs/resins/3d-printer-flyer.pdf',
  },
};

export const P1_26_FEATURE_CHIPS = [
  { id: 'lcd', label: 'LCD Technology', lines: ['LCD', 'Technology'] },
  { id: 'tank', label: 'Optional Small Tank', lines: ['Optional', 'Small Tank'] },
  { id: 'speed', label: 'High Print Speed', lines: ['High', 'Print Speed'] },
  { id: 'open', label: 'Open System', lines: ['Open', 'System'] },
  { id: 'acf', label: 'ACF Release Film', lines: ['ACF', 'Release', 'Film'] },
] as const;

export const P1_26_WHY = {
  title: 'Why P1-26?',
  img: '/img/printers/p126/packshot-cover-off.png',
  imgAlt: 'ODYX P1-26 with red cover open showing build platform',
  points: [
    'Ultra-High Precision for Accurate Results',
    'Optional small tank designed to fit your workflow and applications',
    'High-Speed Printing to Save Time',
    'ACF Release Film for Easy Peeling',
    'Open Material Compatibility for Flexibility',
  ],
};

export const P1_26_VIDEO = {
  title: 'Watch P1-26 in Action',
  poster: '/img/printers/p126/video-poster.jpg',
  posterAlt: 'ODYX P1-26 on the bench mid-workflow',
  src: '/video/hero.mp4',
};

export const P1_26_SPECS = [
  { label: 'Printing Technology', value: '405 nm monochrome LCD' },
  { label: 'XY Resolution', value: '18 µm' },
  { label: 'Build Volume', value: '153 × 77 × 160 mm' },
  { label: 'Layer Thickness', value: '0.01 – 0.1 mm' },
  { label: 'Max Print Speed', value: '60 mm/h' },
  { label: 'Light Source', value: '3rd-gen integral 405 nm, >90% uniformity' },
  { label: 'Screen', value: '6.8″ 9K monochrome LCD' },
] as const;

export const P1_26_PRINT_APPS = [
  {
    label: 'Crown & Bridges',
    img: '/img/printers/p126/app-crown.png',
    alt: '3D-printed crown and bridge',
  },
  {
    label: 'Surgical Guides',
    img: '/img/printers/p126/app-guide.png',
    alt: 'Clear surgical guide with metal and colored sleeves',
  },
  {
    label: 'Dentures',
    img: '/img/printers/p126/app-denture.png',
    alt: '3D-printed denture',
  },
  {
    label: 'Models',
    img: '/img/printers/p126/app-models.png',
    alt: '3D-printed dental models',
  },
  {
    label: 'Splints & Night Guards',
    img: '/img/printers/p126/app-splint.png',
    alt: '3D-printed occlusal splint',
  },
  {
    label: 'Temporary Restorations',
    img: '/img/printers/p126/app-temporary.png',
    alt: 'Tan temporary arch restoration',
  },
] as const;

export const P1_26_WORKFLOW = [
  { id: 'scan', label: 'Scan', bold: 'Scan', rest: '', href: DIGITAL_WORKFLOW_LINKS.scan, dimmed: isDigitalWorkflowDimmed('scan') },
  { id: 'design', label: 'Design', bold: 'Design', rest: '', href: DIGITAL_WORKFLOW_LINKS.design, dimmed: isDigitalWorkflowDimmed('design') },
  { id: 'print', label: 'Print', bold: 'Print', rest: '', href: DIGITAL_WORKFLOW_LINKS.print, dimmed: isDigitalWorkflowDimmed('print') },
  { id: 'cure', label: 'Cure', bold: 'Cure', rest: '', href: DIGITAL_WORKFLOW_LINKS.cure, dimmed: isDigitalWorkflowDimmed('cure') },
] as const;

export const P1_26_ROI = {
  title: 'ROI Calculator',
  lead: 'Estimate Your Savings.',
  monthlyLabel: 'Monthly Cases',
  costLabel: 'Average Cost per Case (EGP)',
  resultLabel: 'Potential Savings',
  resultUnit: '/ Month',
  defaultMonthly: 30,
  defaultCost: 1500,
  /** In-house resin cost per case — from ROI_DEFAULTS resinCostPerCrown */
  resinCostPerCase: 200,
};

export const P1_26_ECOSYSTEM = {
  title: 'Compatible with ODYX Ecosystem',
  nodes: [
    {
      name: 'ODYX S1',
      subtitle: 'Intra-oral Scanner',
      href: '/products/odyx-s1-intraoral-scanner',
      img: '/img/scanner/s1-hero-cutout.png',
    },
    {
      name: 'P1-26',
      subtitle: '3D Printer',
      href: '#top',
      img: '/img/printers/p126/eco/printer.png',
    },
    {
      name: 'ODYX Dental Resins',
      subtitle: 'High-Performance Resins',
      href: '/products/resins',
      img: '/img/printers/p126/eco/resins.png',
    },
    {
      name: 'ODYX Cure',
      subtitle: 'Curing Station',
      href: '/products/curing-machines',
      img: '/img/printers/p126/eco/cure.png',
    },
  ],
};

export const P1_26_CASE_TABS = [
  {
    id: 'crown',
    label: 'Crown',
    steps: [
      { label: 'Before', img: '/img/printers/p126/case-before.png', alt: 'Teeth before restoration' },
      { label: 'Printed with P1-26', img: '/img/printers/p126/case-printed.png', alt: 'Crowns printed on P1-26' },
      { label: 'Final Restoration', img: '/img/printers/p126/packshot-cover-off.png', alt: 'ODYX P1-26 with red cover open showing build platform' },
    ],
  },
  {
    id: 'guide',
    label: 'Surgical Guide',
    steps: [
      { label: 'Before', img: '/img/printers/p126/case-before.png', alt: 'Pre-op clinical view' },
      { label: 'Printed with P1-26', img: '/img/printers/p126/app-guide.png', alt: 'Clear surgical guide with metal and colored sleeves' },
      { label: 'Final Restoration', img: '/img/printers/p126/case-guide-strip.png', alt: 'Guide case outcome' },
    ],
  },
  {
    id: 'splint',
    label: 'Splint',
    steps: [
      { label: 'Before', img: '/img/printers/p126/case-before.png', alt: 'Pre-treatment occlusion' },
      { label: 'Printed with P1-26', img: '/img/printers/p126/app-splint.png', alt: 'Printed night guard' },
      { label: 'Final Restoration', img: '/img/printers/p126/case-final.png', alt: 'Seated splint result' },
    ],
  },
  {
    id: 'denture',
    label: 'Denture',
    steps: [
      { label: 'Before', img: '/img/printers/p126/case-before.png', alt: 'Edentulous case before' },
      { label: 'Printed with P1-26', img: '/img/printers/p126/app-denture.png', alt: 'Printed denture' },
      { label: 'Final Restoration', img: '/img/printers/p126/case-final.png', alt: 'Final denture delivery' },
    ],
  },
  {
    id: 'model',
    label: 'Model',
    steps: [
      { label: 'Before', img: '/img/printers/p126/case-before.png', alt: 'Scan reference' },
      { label: 'Printed with P1-26', img: '/img/printers/p126/app-models.png', alt: 'Printed dental models' },
      { label: 'Final Restoration', img: '/img/printers/p126/why-bridge.png', alt: 'Model used for casework' },
    ],
  },
] as const;

export const P1_26_REVIEWS = {
  title: 'Reviews',
  footer: 'Trusted by Dental Professionals Worldwide.',
  items: [
    {
      quote: 'Fit and surface quality on crowns are consistently chairside-ready.',
      author: 'Dr. Ahmed K.',
    },
    {
      quote: 'The open material system keeps our resin costs flexible without sacrificing detail.',
      author: 'Dr. Sara M.',
    },
    {
      quote: 'Same-day temporaries and guides changed how we schedule restorative cases.',
      author: 'Dr. Youssef R.',
    },
  ],
};
