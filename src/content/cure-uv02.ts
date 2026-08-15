/**
 * Single Cure landing — fidelity to product-design-refrences/cure.jpeg
 * Uses the same layout system as P1-26.
 */

import {
  DIGITAL_WORKFLOW_LINKS,
  isDigitalWorkflowDimmed,
} from '@/content/digital-workflow-links';

export const CURE_UV02_SLUG = 'curing-machines';

export const CURE_UV02_META = {
  title: 'ODYX Cure — Dental Curing Machine',
  description:
    'Triple-wavelength curing (365/385/405 nm) with 360° coverage, smart heating, and validated presets for consistent dental results.',
};

export const CURE_UV02_HERO = {
  eyebrow: 'ODYX CURE',
  title: 'Powerful Curing. Perfect Results.',
  body: 'The ODYX Cure delivers uniform, reliable, and efficient curing for all your dental 3D printed applications.',
  /** Multi-layer hero — real product photo + cured outputs (P1-26 pattern) */
  machineImg: '/img/cure-uv02/hero/machine-cutout.png',
  outputArchImg: '/img/cure-uv02/hero/output-arch-cutout.png',
  outputAlignerImg: '/img/cure-uv02/hero/output-aligner-cutout.png',
  imgAlt: 'ODYX Cure dental curing station with cured models',
  imgVersion: '18',
  primaryCta: { label: 'Request Demo', href: '/request-demo' },
  secondaryCta: { label: 'Download Brochure', href: '/docs/resins/curing-flyer.pdf' },
};

export const CURE_UV02_CHIPS = [
  { id: 'orbit', label: '360° Uniform Curing', lines: ['360°', 'Uniform Curing'] },
  { id: 'waves', label: 'Powerful Light', lines: ['Powerful', 'Light'] },
  { id: 'heat', label: 'Smart Heating', lines: ['Smart', 'Heating'] },
  { id: 'compat', label: 'Wide Compatibility', lines: ['Wide', 'Compatibility'] },
  { id: 'safe', label: 'Safe & User Friendly', lines: ['Safe &', 'User Friendly'] },
] as const;

export const CURE_UV02_WHY = {
  title: 'Why ODYX Cure?',
  img: '/img/cure-uv02/why-open.png',
  imgAlt: 'ODYX Cure with chamber open and curing active',
  imgVersion: '6',
  points: [
    '360° all-round light coverage for uniform polymerization',
    'Triple wavelength: 365 / 385 / 405 nm',
    'Typical cure times of 1–5 minutes',
    'Adjustable intensity 5%–100% and timer 1 s–30 min',
    '8 memory presets for repeatable protocols',
    'One-way mirror chamber with cover-open safety stop',
  ],
};

export const CURE_UV02_VIDEO = {
  title: 'Watch ODYX Cure in Action',
  poster: '/img/cure-uv02/device-front.jpg',
  posterAlt: 'ODYX Cure curing cycle',
  src: '/video/cure-uv02-hero.mp4',
};

export const CURE_UV02_SPECS = [
  { label: 'Light Source', value: 'Triple-wavelength LED' },
  { label: 'Wavelength', value: '365 / 385 / 405 nm' },
  { label: 'Coverage', value: '360° all-round' },
  { label: 'Light Intensity', value: '5% – 100%' },
  { label: 'Timer', value: '1 second – 30 minutes' },
  { label: 'Memory Presets', value: '8 saved profiles' },
  { label: 'Typical Cure Time', value: '1 – 5 minutes' },
  { label: 'Chamber', value: '180 mm ⌀ × 120 mm H' },
] as const;

export const CURE_UV02_APPS = [
  { label: 'Surgical Guides', img: '/img/cure-uv02/apps/guides.png', alt: 'Clear surgical guide with metal and colored sleeves' },
  { label: 'Crowns & Bridges', img: '/img/cure-uv02/apps/crowns.png', alt: 'Crowns and bridges' },
  { label: 'Denture Bases', img: '/img/cure-uv02/apps/dentures.png', alt: 'Denture base' },
  { label: 'Models', img: '/img/cure-uv02/apps/models.png', alt: 'Dental model' },
  { label: 'Splints & Night Guards', img: '/img/cure-uv02/apps/splints.png', alt: 'Splint' },
  { label: 'Temporary Restorations', img: '/img/cure-uv02/apps/temps.png', alt: 'Tan temporary arch restoration' },
] as const;

export const CURE_UV02_WORKFLOW = [
  { id: 'scan', label: 'Scan', bold: 'Scan', rest: '', href: DIGITAL_WORKFLOW_LINKS.scan, dimmed: isDigitalWorkflowDimmed('scan') },
  { id: 'design', label: 'Design', bold: 'Design', rest: '', href: DIGITAL_WORKFLOW_LINKS.design, dimmed: isDigitalWorkflowDimmed('design') },
  { id: 'print', label: 'Print', bold: 'Print', rest: '', href: DIGITAL_WORKFLOW_LINKS.print, dimmed: isDigitalWorkflowDimmed('print') },
  { id: 'cure', label: 'Cure', bold: 'Cure', rest: '', href: DIGITAL_WORKFLOW_LINKS.cure, dimmed: isDigitalWorkflowDimmed('cure') },
] as const;

export const CURE_UV02_ROI = {
  title: 'ROI Calculator',
  lead: 'Estimate Your Savings',
  monthlyLabel: 'Monthly Cases',
  timeLabel: 'Average Time Saved per Case',
  hourlyLabel: 'Value of Clinic Time (L.E/hr)',
  timeResultLabel: 'Potential Time Savings',
  timeResultUnit: '/ Month',
  costResultLabel: 'Potential Cost Savings',
  costResultUnit: '/ Month',
  defaultMonthly: 40,
  defaultMinutes: 15,
  defaultHourly: 80,
};

export const CURE_UV02_ECOSYSTEM = {
  title: 'Compatible with ODYX Ecosystem',
  nodes: [
    {
      name: 'ODYX S1',
      subtitle: 'Intra-oral Scanner',
      href: '/products/odyx-s1',
      img: '/img/scanner/s1-hero-cutout.png',
    },
    {
      name: 'P1-26',
      subtitle: '3D Printer',
      href: '/products/odyx-p1-26',
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
      href: '#top',
      img: '/img/printers/p126/eco/cure.png',
    },
  ],
};

export const CURE_UV02_CASE_TABS = [
  {
    id: 'crown',
    label: 'Crown',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-temps.jpg', alt: 'Tan temporary arch before cure' },
      { label: 'Curing', img: '/img/cure-uv02/act-cure.png', alt: 'Curing cycle in ODYX Cure' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-crowns.jpg', alt: 'Finished cured crown' },
    ],
  },
  {
    id: 'guide',
    label: 'Surgical Guide',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-guides.jpg', alt: 'Clear surgical guide before cure' },
      { label: 'Curing', img: '/img/cure-uv02/act-cure.png', alt: 'Guide in chamber' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-guides.jpg', alt: 'Cured clear surgical guide' },
    ],
  },
  {
    id: 'denture',
    label: 'Denture',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-dentures.jpg', alt: 'Denture before cure' },
      { label: 'Curing', img: '/img/cure-uv02/act-cure.png', alt: 'Denture curing' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-dentures.jpg', alt: 'Finished denture base' },
    ],
  },
  {
    id: 'splint',
    label: 'Splint',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-splints.jpg', alt: 'Splint before cure' },
      { label: 'Curing', img: '/img/cure-uv02/act-cure.png', alt: 'Splint curing' },
      { label: 'Finished Restoration', img: '/img/cure-uv02/app-splints.jpg', alt: 'Finished splint' },
    ],
  },
  {
    id: 'model',
    label: 'Model',
    steps: [
      { label: 'Before Curing', img: '/img/cure-uv02/app-models.jpg', alt: 'Model before cure' },
      { label: 'Curing', img: '/img/cure-uv02/act-cure.png', alt: 'Model curing' },
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
