import type { CasesPageData } from '../types';
import { clinicalCaseMedia } from '@/lib/clinical-media-url';

const IMG = '/img/real-case-library';

export const casesData: CasesPageData = {
  hero: {
    kicker: 'REAL CASE LIBRARY',
    titleLead: 'Real Cases. ',
    titleRest: 'Real Confidence.',
    body: 'Browse real clinical cases completed with ODYX solutions across different applications and products.',
    searchPlaceholder: 'Search cases by treatment, product, or keyword...',
    before: {
      img: clinicalCaseMedia('_DSC0184_4.jpg'),
      alt: 'Severely carious molar before treatment',
    },
    after: {
      img: clinicalCaseMedia('_DSC0809_2.jpg'),
      alt: 'Seated posterior crown after restoration',
    },
    actions: [
      {
        label: 'Browse by Application',
        href: '/solutions/cases/applications',
        variant: 'primary',
        icon: 'layout-grid',
      },
      {
        label: 'Browse by Product',
        href: '/solutions/cases/products',
        variant: 'outline',
        icon: 'box',
      },
    ],
  },
  applications: {
    id: 'by-application',
    kicker: 'CASE BY APPLICATION',
    title: 'Browse cases by clinical application.',
    viewAll: { label: 'View all', href: '/solutions/cases/applications' },
    items: [
      {
        id: 'restorative',
        title: 'Restorative',
        countLabel: '128 Cases',
        href: '/solutions/cases/applications/restorative',
        img: clinicalCaseMedia('_DSC0255_1.JPG'),
        imgAlt: 'Restorative smile after veneer delivery',
        icon: 'restorative',
      },
      {
        id: 'implant',
        title: 'Implant',
        countLabel: '96 Cases',
        href: '/solutions/cases/applications/implant',
        img: '/img/clinical/surgical-guide/hero-cutout.png',
        imgAlt: 'Surgical guide for implant planning',
        icon: 'implant',
      },
      {
        id: 'orthodontic',
        title: 'Orthodontic',
        countLabel: '64 Cases',
        href: '/solutions/cases/applications/orthodontic',
        img: '/img/clinical/aligners/hero-cutout.png',
        imgAlt: 'Orthodontic aligner case photography',
        icon: 'orthodontic',
      },
      {
        id: 'denture',
        title: 'Denture',
        countLabel: '52 Cases',
        href: '/solutions/cases/applications/denture',
        img: clinicalCaseMedia('_DSC0197_4.JPG'),
        imgAlt: 'Fabricated prosthetic units ready for try-in',
        icon: 'denture',
      },
    ],
  },
  products: {
    id: 'by-product',
    kicker: 'CASE BY PRODUCT',
    title: 'Browse cases by the ODYX products.',
    viewAll: { label: 'View all', href: '/solutions/cases/products' },
    productStyle: true,
    items: [
      {
        id: 'scanner',
        title: 'Scanner',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/scanner',
        img: '/img/scanner/s1-hero-cutout.png',
        imgAlt: 'ODYX intraoral scanner',
      },
      {
        id: 'printer',
        title: 'Printer',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/printer',
        img: '/img/cutouts/feat-printer-cutout.png',
        imgAlt: 'ODYX dental 3D printer',
      },
      {
        id: 'curing',
        title: 'Curing Machine',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/curing',
        img: '/img/cure-uv02/hero/machine-cutout.png',
        imgAlt: 'ODYX curing machine',
      },
      {
        id: 'resin',
        title: 'Resin',
        countLabel: '0 Cases',
        href: '/solutions/cases/products/resin',
        img: '/img/hv2-hub/store-resins-cutout.png',
        imgAlt: 'ODYX dental resin bottles',
      },
    ],
  },
  featured: {
    kicker: 'FEATURED CLINICAL CASES',
    title: 'Explore real results from dental professionals.',
    items: [
      {
        id: 'posterior-crown',
        badge: 'Restorative',
        title: 'Posterior Crown Seating',
        tags: ['Crowns'],
        href: '/solutions/cases/restorative-cases',
        img: clinicalCaseMedia('_DSC0809_2.jpg'),
        imgAlt: 'Seated posterior crown in the arch',
        before: {
          img: clinicalCaseMedia('_DSC0804_4.jpg'),
          alt: 'Restored posterior tooth before crown delivery',
        },
        after: {
          img: clinicalCaseMedia('_DSC0809_2.jpg'),
          alt: 'Seated posterior crown in the arch',
        },
        products: [
          { id: 'scanner', img: '/img/scanner/s1-hero-cutout.png', alt: 'Scanner' },
          { id: 'printer', img: '/img/cutouts/feat-printer-cutout.png', alt: 'Printer' },
        ],
        moreProducts: 1,
      },
      {
        id: 'buccal-composite',
        badge: 'Restorative',
        title: 'Buccal Composite Restoration',
        tags: ['Composite'],
        href: '/solutions/cases/restorative-cases',
        img: clinicalCaseMedia('_DSC0681_4.jpg'),
        imgAlt: 'Finished buccal composite restoration',
        before: {
          img: clinicalCaseMedia('_DSC0667_1.jpg'),
          alt: 'Isolated teeth during restorative build-up',
        },
        after: {
          img: clinicalCaseMedia('_DSC0681_4.jpg'),
          alt: 'Finished buccal composite restoration',
        },
        products: [
          { id: 'scanner', img: '/img/scanner/s1-hero-cutout.png', alt: 'Scanner' },
          { id: 'resin', img: '/img/resins/all-resins-cutout.png', alt: 'Resin' },
        ],
        moreProducts: 0,
      },
      {
        id: 'deep-molar-endo',
        badge: 'Restorative',
        title: 'Deep Molar Caries to Endo Fill',
        tags: ['Endo'],
        href: '/solutions/cases/restorative-cases',
        img: clinicalCaseMedia('_DSC0199_3.jpg'),
        imgAlt: 'Root canal orifices obturated under rubber dam',
        before: {
          img: clinicalCaseMedia('_DSC0184_4.jpg'),
          alt: 'Severely carious molar before treatment',
        },
        after: {
          img: clinicalCaseMedia('_DSC0199_3.jpg'),
          alt: 'Root canal orifices obturated under rubber dam',
        },
        products: [
          { id: 'scanner', img: '/img/scanner/s1-hero-cutout.png', alt: 'Scanner' },
          { id: 'printer', img: '/img/cutouts/feat-printer-cutout.png', alt: 'Printer' },
        ],
        moreProducts: 0,
      },
      {
        id: 'onlay-fiber',
        badge: 'Prosthetics',
        title: 'Ceramic Onlay and Fiber Core',
        tags: ['Onlay'],
        href: '/solutions/cases/prosthetic-cases',
        img: clinicalCaseMedia('_DSC0562_2.jpg'),
        imgAlt: 'Fiber reinforcement seated inside the preparation',
        before: {
          img: clinicalCaseMedia('_DSC0558.jpg'),
          alt: 'Ceramic restorations ready to bond',
        },
        after: {
          img: clinicalCaseMedia('_DSC0562_2.jpg'),
          alt: 'Fiber reinforcement seated inside the preparation',
        },
        products: [
          { id: 'printer', img: '/img/cutouts/feat-printer-cutout.png', alt: 'Printer' },
          { id: 'curing', img: '/img/cure-uv02/hero/machine-cutout.png', alt: 'Curing' },
        ],
        moreProducts: 1,
      },
    ],
  },
  share: {
    title: 'Share Your Success. Inspire the Community.',
    body: 'Submit your clinical cases to be featured in the ODYX Case Library and help advance digital dentistry.',
    clipboard: {
      img: `${IMG}/cta-clipboard.jpg`,
      alt: 'Clinical case submission clipboard illustration',
    },
    registered: {
      label: 'Already registered?',
      cta: { label: 'Login & Submit Case', href: '/login' },
    },
    newUser: {
      label: 'New to ODYX?',
      cta: { label: 'Register Now', href: '/register' },
    },
  },
};
