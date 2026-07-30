/**
 * Dedicated Cure UV-02 landing — attached product UI.
 * Specs from CuringUv02Page / claims register (no Smart Heating).
 */

export const CURE_UV02_SLUG = 'cure-v6';

export const CURE_UV02_META = {
  title: 'ODYX Cure UV-02 — Dental UV Curing Machine',
  description:
    'Triple-wavelength UV curing (365/385/405 nm) with 360° coverage, 8 presets, and 1–5 minute typical cures.',
};

export const CURE_UV02_HERO = {
  eyebrow: 'ODYX Cure UV-02',
  title: 'Powerful Curing. Perfect Results.',
  tagline: 'Dental UV Curing Machine',
  body: 'The ODYX Cure UV-02 delivers powerful, uniform UV curing for consistent results across your dental resins — from clinic restorations to lab production.',
  img: '/img/cure-uv02/hero-packshot.png',
  imgAlt: 'ODYX Cure UV-02 dental UV curing station',
  primaryCta: { label: 'Request Demo', href: '/support' },
  secondaryCta: { label: 'Download Brochure', href: '/support' },
};

export const CURE_UV02_CHIPS = [
  { id: 'orbit', label: '360° Uniform Curing', line: 'All-round coverage for every surface.' },
  { id: 'waves', label: 'Powerful UV Light', line: '365 / 385 / 405 nm, alone or together.' },
  { id: 'preset', label: '8 Memory Presets', line: 'Wavelength, intensity and time stored.' },
  { id: 'compat', label: 'Wide Compatibility', line: 'Validated across ODYX dental resins.' },
  { id: 'safe', label: 'Safe & User Friendly', line: 'Stops instantly if the cover opens.' },
] as const;

export const CURE_UV02_WHY = {
  title: 'Why ODYX Cure UV-02?',
  img: '/img/cure-uv02/why-open.png',
  imgAlt: 'ODYX Cure UV-02 with chamber open and UV active',
  points: [
    '360° all-round UV coverage for uniform polymerization',
    'Triple wavelength: 365 / 385 / 405 nm',
    'Typical cure times of 1–5 minutes',
    'Adjustable intensity 5%–100% and timer 1 s–30 min',
    '8 memory presets for repeatable protocols',
    'One-way mirror chamber with cover-open safety stop',
  ],
};

export const CURE_UV02_VIDEO = {
  title: 'Watch UV-02 in Action',
  poster: '/img/cure-uv02/device-front.jpg',
  posterAlt: 'ODYX Cure UV-02 curing cycle',
  src: '/video/cure-uv02-hero.mp4',
};

export const CURE_UV02_SPECS = [
  { label: 'Light Source', value: 'Triple-wavelength UV LED' },
  { label: 'Wavelength', value: '365 / 385 / 405 nm' },
  { label: 'Coverage', value: '360° all-round' },
  { label: 'Light Intensity', value: '5% – 100%' },
  { label: 'Timer', value: '1 second – 30 minutes' },
  { label: 'Memory Presets', value: '8 saved profiles' },
  { label: 'Typical Cure Time', value: '1 – 5 minutes' },
  { label: 'Chamber', value: '180 mm ⌀ × 120 mm H' },
] as const;

export const CURE_UV02_APPS = [
  { label: 'Surgical Guides', img: '/img/cure-uv02/app-guides.jpg' },
  { label: 'Crowns & Bridges', img: '/img/cure-uv02/app-crowns.jpg' },
  { label: 'Denture Bases', img: '/img/cure-uv02/app-dentures.jpg' },
  { label: 'Models', img: '/img/cure-uv02/app-models.jpg' },
  { label: 'Splints', img: '/img/cure-uv02/app-splints.jpg' },
  { label: 'Temporary Restorations', img: '/img/cure-uv02/app-temps.jpg' },
] as const;

export const CURE_UV02_WORKFLOW = [
  { id: 'scan', label: 'Scan' },
  { id: 'design', label: 'Design' },
  { id: 'print', label: 'Print' },
  { id: 'wash', label: 'Wash' },
  { id: 'cure', label: 'Cure' },
  { id: 'deliver', label: 'Deliver' },
] as const;

export const CURE_UV02_ROI = {
  title: 'ROI Calculator',
  lead: 'Estimate Your Savings.',
  monthlyLabel: 'Monthly Cases',
  timeLabel: 'Average Time Saved per Case (min)',
  timeResultLabel: 'Potential Time Savings',
  timeResultUnit: '/ Month',
  costResultLabel: 'Potential Cost Savings',
  costResultUnit: '/ Month',
  defaultMonthly: 40,
  defaultMinutes: 15,
  /** Assumed chair-time value for illustrative savings */
  hourlyValue: 80,
};

export const CURE_UV02_ECOSYSTEM = {
  title: 'Compatible with ODYX Ecosystem',
  nodes: [
    {
      name: 'ODYX S1 Intra-oral Scanner',
      href: '/products/odyx-s1-intraoral-scanner',
      img: '/img/cutouts/feat-scanner-cutout.png',
    },
    {
      name: 'P1-26 3D Printer',
      href: '/products/odyx-p1-26',
      img: '/img/printers/p126/hero-packshot.png',
    },
    {
      name: 'ODYX Dental Resins',
      href: '/products/resins',
      img: '/img/scanner/eco-resins.jpg',
    },
    {
      name: 'ODYX Cure UV-02',
      href: '#top',
      img: '/img/cure-uv02/hero-packshot.png',
    },
  ],
};

export const CURE_UV02_CASE_TABS = [
  {
    id: 'crown',
    label: 'Crown',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-temps.jpg', alt: 'Printed temporary before cure' },
      { label: 'Curing with UV-02', img: '/img/cure-uv02/act-cure.png', alt: 'Curing cycle in UV-02' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-crowns.jpg', alt: 'Finished cured crown' },
    ],
  },
  {
    id: 'guide',
    label: 'Surgical Guide',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-guides.jpg', alt: 'Guide before cure' },
      { label: 'Curing with UV-02', img: '/img/cure-uv02/act-cure.png', alt: 'Guide in chamber' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-guides.jpg', alt: 'Cured surgical guide' },
    ],
  },
  {
    id: 'denture',
    label: 'Denture',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-dentures.jpg', alt: 'Denture before cure' },
      { label: 'Curing with UV-02', img: '/img/cure-uv02/act-cure.png', alt: 'Denture curing' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-dentures.jpg', alt: 'Finished denture base' },
    ],
  },
  {
    id: 'splint',
    label: 'Splint',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-splints.jpg', alt: 'Splint before cure' },
      { label: 'Curing with UV-02', img: '/img/cure-uv02/act-cure.png', alt: 'Splint curing' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-splints.jpg', alt: 'Finished splint' },
    ],
  },
  {
    id: 'model',
    label: 'Model',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-models.jpg', alt: 'Model before cure' },
      { label: 'Curing with UV-02', img: '/img/cure-uv02/act-cure.png', alt: 'Model curing' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-models.jpg', alt: 'Finished model' },
    ],
  },
] as const;

export const CURE_UV02_REVIEWS = {
  title: 'Reviews',
  footer: 'Trusted by Dental Professionals Worldwide.',
  items: [
    {
      quote: 'Even polymerization on guides and temps — presets remove the guesswork.',
      author: 'Dr. Ahmed K.',
    },
    {
      quote: 'Triple wavelength means one box covers our full resin shelf.',
      author: 'Dr. Sara M.',
    },
    {
      quote: 'Fast cycles and the safety stop make it easy to train the whole team.',
      author: 'Dr. Youssef R.',
    },
  ],
};
