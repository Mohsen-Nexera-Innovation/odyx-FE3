/** Clinical Applications — hub (design refs in knowledge_base). */

import { clinicalPath } from '@/content/clinical-indication-types';
import {
  CLINICAL_INDICATION_META,
  CLINICAL_INDICATIONS,
} from '@/content/clinical-indications';

export const CLINICAL_APPS_SLUG = 'clinical-applications';
export const SAME_DAY_CROWN_PATH = clinicalPath('same-day-crown');

export const CLINICAL_APPS_META = {
  title: 'Clinical Applications | ODYX Solutions',
  description:
    'Explore ODYX digital workflows by indication — restorative, implant, orthodontics, prosthetics, and clinical cases.',
};

/** @deprecated Use CLINICAL_INDICATION_META['same-day-crown'] */
export const SAME_DAY_CROWN_META = CLINICAL_INDICATION_META['same-day-crown'];

/** @deprecated Use CLINICAL_INDICATIONS['same-day-crown'] */
export const SAME_DAY_CROWN = CLINICAL_INDICATIONS['same-day-crown'];

export {
  CLINICAL_INDICATIONS,
  CLINICAL_INDICATION_META,
  CLINICAL_INDICATION_SLUGS,
  getClinicalIndication,
} from '@/content/clinical-indications';

export {
  clinicalPath,
  CLINICAL_BADGE_ACCENTS,
  type ClinicalIndicationContent,
  type ClinicalCategoryId,
} from '@/content/clinical-indication-types';

/* ---------- Hub (clinical-application-all-types.jpeg) ---------- */

export type ClinicalAppLink = {
  id: string;
  title: string;
  body: string;
  href: string;
  thumb: string;
};

export type ClinicalCategory = {
  id: string;
  title: string;
  accent: string;
  items: ClinicalAppLink[];
  footerImg?: string;
  footerAlt?: string;
  exploreAll?: { label: string; href: string };
};

export const CLINICAL_CATEGORIES: ClinicalCategory[] = [
  {
    id: 'restorative',
    title: 'Restorative',
    accent: '#8153CF',
    footerImg: '/img/clinical-hub/foot-restorative.png',
    footerAlt: 'Crown seating on a dental model',
    items: [
      {
        id: 'same-day-crown',
        title: 'Same-Day Crown',
        body: 'Chairside single crown in one visit',
        href: clinicalPath('same-day-crown'),
        thumb: '/img/printers/p126/app-crown.png',
      },
      {
        id: 'veneers',
        title: 'Veneers',
        body: 'Esthetic veneers in a single visit',
        href: clinicalPath('veneers'),
        thumb: '/img/printers/p126/app-temporary.png',
      },
      {
        id: 'inlays',
        title: 'Inlays & Onlays',
        body: 'Precise partial restorations',
        href: clinicalPath('inlays'),
        thumb: '/img/printers/p126/app-models.png',
      },
    ],
  },
  {
    id: 'implant',
    title: 'Implant',
    accent: '#5480EB',
    footerImg: '/img/clinical-hub/foot-implant.png',
    footerAlt: 'Surgical guide on implant model',
    items: [
      {
        id: 'surgical-guide',
        title: 'Surgical Guide',
        body: 'Accurate implant placement',
        href: clinicalPath('surgical-guide'),
        thumb: '/img/printers/p126/app-guide.png',
      },
      {
        id: 'implant-model',
        title: 'Implant Model',
        body: 'Detailed planning models',
        href: clinicalPath('implant-model'),
        thumb: '/img/printers/p126/app-models.png',
      },
    ],
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    accent: '#56B1A3',
    footerImg: '/img/clinical-hub/foot-orthodontics.png',
    footerAlt: 'Clear aligners',
    items: [
      {
        id: 'aligners',
        title: 'Aligners',
        body: 'Clear aligner workflows',
        href: clinicalPath('aligners'),
        thumb: '/img/printers/p126/app-splint.png',
      },
      {
        id: 'retainers',
        title: 'Retainers',
        body: 'Retention appliances',
        href: clinicalPath('retainers'),
        thumb: '/img/printers/p126/app-splint.png',
      },
    ],
  },
  {
    id: 'prosthetics',
    title: 'Prosthetics',
    accent: '#ED9E5E',
    footerImg: '/img/clinical-hub/foot-prosthetics.png',
    footerAlt: 'Full denture set',
    items: [
      {
        id: 'dentures',
        title: 'Dentures',
        body: 'Complete & partial dentures',
        href: clinicalPath('dentures'),
        thumb: '/img/printers/p126/app-denture.png',
      },
      {
        id: 'try-ins',
        title: 'Try-ins',
        body: 'Perfect try-ins for better fit & function',
        href: clinicalPath('try-ins'),
        thumb: '/img/printers/p126/app-denture.png',
      },
    ],
  },
  {
    id: 'cases',
    title: 'Clinical Cases',
    accent: '#D65765',
    footerImg: '',
    footerAlt: '',
    exploreAll: { label: 'Explore all cases →', href: '/cases#featured-cases' },
    items: [
      {
        id: 'restorative-cases',
        title: 'Restorative Cases',
        body: 'Crowns, veneers — real patient photos',
        href: clinicalPath('restorative-cases'),
        thumb: '/img/clinical-cases/_DSC0255_1.JPG',
      },
      {
        id: 'implant-cases',
        title: 'Implant Cases',
        body: 'Surgical guides & planning models',
        href: clinicalPath('implant-cases'),
        thumb: '/img/clinical/surgical-guide/hero-cutout.png',
      },
      {
        id: 'ortho-cases',
        title: 'Orthodontic Cases',
        body: 'Aligners & retainers',
        href: clinicalPath('ortho-cases'),
        thumb: '/img/clinical/aligners/hero-cutout.png',
      },
      {
        id: 'prosthetic-cases',
        title: 'Prosthetic Cases',
        body: 'Dentures & try-ins — real photos',
        href: clinicalPath('prosthetic-cases'),
        thumb: '/img/clinical-cases/_DSC0197_4.JPG',
      },
    ],
  },
];

export const CLINICAL_HUB_BANNER = {
  titleLine1: 'Real Cases.',
  titleLine2: 'Real Results.',
  body: 'Discover how ODYX workflows deliver exceptional outcomes every day.',
  cta: { label: 'View All Clinical Cases →', href: '/cases#featured-cases' },
  thumbs: [
    '/img/clinical-cases/_DSC0255_1.JPG',
    '/img/clinical-cases/_DSC0108_1.JPG',
    '/img/clinical-cases/_DSC0245.JPG',
    '/img/clinical-cases/_DSC0259_2.JPG',
  ],
};

export const CLINICAL_HUB_FEATURES = [
  { id: 'integration', title: 'Seamless Integration', body: 'All products. One workflow.' },
  { id: 'open', title: 'Open System', body: 'STL, PLY, OBJ compatible.' },
  { id: 'reliable', title: 'Reliable Results', body: 'Accuracy you can trust.' },
  { id: 'time', title: 'Time Saving', body: 'Optimized for efficiency.' },
  { id: 'support', title: 'Expert Support', body: "We're with you all the way." },
] as const;
