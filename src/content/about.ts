/**
 * About ODYX — brand story content.
 * Narrative from knowledge_base/docs/brief.md §1–4.
 * No product specs invented here; links point to catalog-backed product pages.
 */

import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

export const ABOUT_META = {
  title: 'About ODYX',
  description:
    'Who we are, vision, values and the team behind one connected digital dentistry ecosystem — from scan to delivered restoration.',
};

export const ABOUT_HERO = {
  brand: 'ODYX',
  title: 'One connected digital dentistry ecosystem',
  lead: 'From the first scan to the delivered restoration — hardware, materials, and guidance designed as one uninterrupted path.',
  primaryCta: { label: 'Explore products', href: '/products' },
  secondaryCta: { label: 'Our story', href: '/about#who-we-are' },
  float: [
    {
      src: '/img/scanner/s1-hero-cutout.png',
      alt: 'ODYX intraoral scanner',
      className: 'about-hero__float--scanner',
    },
    {
      src: '/img/cutouts/feat-printer-cutout.png',
      alt: 'ODYX dental 3D printer',
      className: 'about-hero__float--printer',
    },
    {
      src: '/img/cure-uv02/hero/machine-cutout.png',
      alt: 'ODYX Cure curing station',
      className: 'about-hero__float--cure',
    },
  ],
};

export const ABOUT_MANIFESTO = {
  kicker: 'The idea',
  line: 'Not a catalog of devices.',
  emphasis: 'A single digital workflow.',
  body: 'Every ODYX product connects into one sequence — so clinics and labs go digital with clarity, not complexity.',
};

export const ABOUT_STORY = {
  eyebrow: 'Who we are',
  h2: 'Built for the full clinical path',
  paragraphs: [
    'ODYX covers the technology a dental clinic or laboratory needs to run a complete digital workflow — from the first scan of a patient’s mouth to the final delivered restoration.',
    'That connected path is the brand. Scanner, design, print, cure, and resin are steps in one system — not isolated products on a shelf.',
  ],
  mosaic: [
    {
      src: '/img/scanner/s1-hero.png',
      alt: 'ODYX S1 intraoral scanner in a clinical chairside setting',
      caption: 'Scan',
    },
    {
      src: '/img/printers/clinic-scene.jpg',
      alt: 'ODYX dental 3D printer in a clinic production scene',
      caption: 'Print',
    },
    {
      src: '/img/printers/lab-scene.jpg',
      alt: 'ODYX printing workflow in a dental laboratory',
      caption: 'Lab',
    },
    {
      src: '/img/cure-uv02/device-angle.jpg',
      alt: 'ODYX Cure post-curing unit',
      caption: 'Cure',
    },
  ],
};

/** Four-step spine (SCAN → DESIGN → PRINT → CURE). Design is dimmed until ready. */
export const ABOUT_SPINE = [
  {
    no: '01',
    label: 'Scan',
    blurb: 'Chairside digital impression — instant 3D data, no molds.',
    href: DIGITAL_WORKFLOW_LINKS.scan,
    dimmed: isDigitalWorkflowDimmed('scan'),
    img: '/img/scanner/s1-hero.png',
    alt: 'Digital intraoral scan',
  },
  {
    no: '02',
    label: 'Design',
    blurb: 'Scan data becomes a precise restoration in CAD.',
    href: DIGITAL_WORKFLOW_LINKS.design,
    dimmed: isDigitalWorkflowDimmed('design'),
    img: '/img/odyx/design.webp',
    alt: 'Dental restoration design',
  },
  {
    no: '03',
    label: 'Print',
    blurb: 'Layer by layer — crowns, guides, models, dentures.',
    href: DIGITAL_WORKFLOW_LINKS.print,
    dimmed: isDigitalWorkflowDimmed('print'),
    img: '/img/scanner/step-print.jpg',
    alt: 'Dental 3D printing',
  },
  {
    no: '04',
    label: 'Cure',
    blurb: 'Controlled finishing for strength and biocompatibility.',
    href: DIGITAL_WORKFLOW_LINKS.cure,
    dimmed: isDigitalWorkflowDimmed('cure'),
    img: '/img/scanner/step-cure.jpg',
    alt: 'Cure step',
  },
] as const;

export const ABOUT_VISION = {
  title: 'Vision',
  body: 'Make digital dentistry the default standard of care — accessible, reliable, and clinically trusted for every practice ready to go digital.',
  img: '/img/why/why-clinical.png',
  alt: 'Clinical digital dentistry environment',
};

export const ABOUT_MISSION = {
  title: 'Mission',
  body: 'Reduce the complexity of going digital with guided, visual, workflow-led tools — so dentists and labs move from first scan to delivered restoration with confidence.',
  img: '/img/why/why-integrated.png',
  alt: 'Integrated digital dentistry workflow',
};

export const ABOUT_VALUES = [
  {
    no: '01',
    title: 'Clinical confidence',
    desc: 'Validated parameters from scan to cure so outcomes stay predictable across the chairside and lab floor.',
    img: '/img/why/why-clinical.png',
    alt: 'Clinical confidence',
  },
  {
    no: '02',
    title: 'Connected workflow',
    desc: 'Hardware, materials, and guidance designed to work as one system — not isolated devices.',
    img: '/img/why/why-integrated.png',
    alt: 'Connected workflow',
  },
  {
    no: '03',
    title: 'Professional clarity',
    desc: 'Direct language for dentists and labs — no unnecessary complexity, no marketing fog.',
    img: '/img/why/why-precision.png',
    alt: 'Professional clarity',
  },
  {
    no: '04',
    title: 'Lifelong support',
    desc: 'Training, manuals, and service that stay with the practice after purchase.',
    img: '/img/why/why-training.png',
    alt: 'Lifelong support and training',
  },
] as const;

export const ABOUT_AUDIENCES = [
  {
    title: 'Dentists & clinics',
    desc: 'Same-day capability, implant guides, and a clear path from analog impressions to a full digital chairside workflow.',
    img: '/img/paths/dentist.jpg',
    alt: 'Dentist digital workflow path',
    href: '/solutions/dentists',
    cta: 'Dentist journey',
    tone: 'teal' as const,
  },
  {
    title: 'Dental laboratories',
    desc: 'High-volume resin production, CAD/CAM integration, and an end-to-end stack for labs transitioning from milling to print.',
    img: '/img/paths/lab.jpg',
    alt: 'Dental laboratory digital workflow path',
    href: '/solutions/labs',
    cta: 'Lab journey',
    tone: 'sky' as const,
  },
] as const;

export const ABOUT_FAMILIES = [
  {
    name: 'ODYX Scanners',
    desc: 'Chairside capture that starts the digital path.',
    img: '/img/scanner/s1-hero-cutout.png',
    brand: '/brand/odyx-scanners.png',
    href: '/products/odyx-s1-intraoral-scanner',
    accent: 'teal' as const,
  },
  {
    name: 'Digital Printing',
    desc: 'Print, cure, and clinical resins as one production line.',
    img: '/img/cutouts/feat-printer-cutout.png',
    brand: '/brand/odyx-digital-printing.png',
    href: '/products/3d-printers',
    accent: 'print' as const,
  },
] as const;

export const ABOUT_TEAM = [
  {
    name: 'Leadership',
    role: 'Strategy, partnerships, and brand direction',
    focus: 'Building the ecosystem dentists and labs can grow with.',
  },
  {
    name: 'Clinical advisors',
    role: 'Workflow & indications',
    focus: 'Keeping every recommendation grounded in real chairside and lab practice.',
  },
  {
    name: 'Product engineering',
    role: 'Hardware & materials',
    focus: 'Scanner, printers, cure systems, and resin lines that connect cleanly.',
  },
  {
    name: 'Customer care',
    role: 'Support & training',
    focus: 'Setup, troubleshooting, and academy paths after the purchase.',
  },
] as const;

export const ABOUT_NEWS = [
  {
    tag: 'Product',
    title: 'Permanent crown & bridge resin line',
    href: '/products/resins',
    img: '/img/news-1.jpg',
    alt: 'ODYX resin product news',
    featured: true,
  },
  {
    tag: 'Workflow',
    title: 'Scan to cure — the four-step path',
    href: '/workflows',
    img: '/img/news-2.jpg',
    alt: 'ODYX digital workflow news',
    featured: false,
  },
  {
    tag: 'Academy',
    title: 'Learning paths for clinics and labs',
    href: '/learning',
    img: '/img/news-3.jpg',
    alt: 'ODYX academy news',
    featured: false,
  },
] as const;

export const ABOUT_CHAPTERS = [
  { id: 'who-we-are', label: 'Story' },
  { id: 'ecosystem', label: 'Workflow' },
  { id: 'vision-mission', label: 'Vision' },
  { id: 'values', label: 'Values' },
  { id: 'audiences', label: 'Paths' },
  { id: 'team', label: 'Team' },
] as const;
