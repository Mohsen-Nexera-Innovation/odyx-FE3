/**
 * Surgical Guide Resin Pro — detail page content.
 * Matched to client mock (surcgical-guide-resign-pro / user reference).
 */

import type { ResinDetailContent } from '@/components/products/resins/ResinDetailPage';
import { SURGICAL_GUIDE_FEATURE_ICONS } from '@/components/products/resins/surgical-guide/FeatureIcons';
import {
  RESIN_DETAIL_CASES_CTA,
  RESIN_DETAIL_COMPATIBLE,
} from '@/content/resin-detail-shared';

export const SURGICAL_GUIDE_RESIN_SLUG = 'surgical-guide-resin-pro';

export const SURGICAL_GUIDE_RESIN_META = {
  title: 'Surgical Guide Resin Pro | ODYX',
  description:
    'ODYX Surgical Guide Resin Pro — highly transparent biocompatible resin for accurate surgical guides.',
};

export const SURGICAL_GUIDE_RESIN_CONTENT: ResinDetailContent = {
  featuresAriaLabel: 'Surgical Guide Resin Pro features',
  appColumns: 3,
  hero: {
    kicker: 'PREMIUM DENTAL RESIN',
    titleLines: ['Surgical Guide', 'Resin Pro'],
    tagline: 'Confidence in every implant surgery.',
    body: 'Highly transparent biocompatible resin for accurate surgical guides.',
    img: '/images/resin-hero-surgical-guide-pro-v2.png',
    imgAlt: 'ODYX Surgical Guide Resin Pro bottle with a transparent surgical guide',
    imgWidth: 1024,
    imgHeight: 576,
    primaryCta: { label: 'Request a Demo', href: '/request-demo' },
    secondaryCta: {
      label: 'Download Datasheet',
      href: '/docs/resins/resin-flyer.pdf',
    },
  },
  applications: [
    {
      id: 'implant-guides',
      label: 'Implant Guides',
      img: '/images/app-sg-implant-guides.png',
      imgAlt: '3D-printed implant surgical guide',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'surgical-templates',
      label: 'Surgical Templates',
      img: '/images/app-sg-surgical-templates.png',
      imgAlt: '3D-printed surgical template',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'orthopedic-guides',
      label: 'Orthopedic Guides',
      img: '/images/app-sg-orthopedic-guides.png',
      imgAlt: '3D-printed orthopedic guide',
      href: '/solutions/clinical-applications',
    },
  ],
  features: [
    { id: 'transparency', label: 'High Transparency' },
    { id: 'sterilizable', label: 'Sterilizable (up to 135°C)' },
    { id: 'shrinkage', label: 'Low Shrinkage' },
    { id: 'impact', label: 'High Impact Strength' },
    { id: 'flexibility', label: 'Excellent Flexibility' },
    { id: 'biocompatible', label: 'Biocompatible' },
  ],
  featureIcons: SURGICAL_GUIDE_FEATURE_ICONS,
  specs: [
    { property: 'Transparency', value: 'High' },
    { property: 'Hardness', value: '75–80 Shore D' },
    { property: 'Flexural Strength', value: '>40 MPa' },
    { property: 'Elongation at Break', value: '110–140 %' },
    { property: 'Sterilization Temperature', value: '135 °C' },
    { property: 'Applicable Light Source', value: '385–405 nm' },
  ],
  compatible: [...RESIN_DETAIL_COMPATIBLE],
  cases: [
    {
      id: 'case-1',
      img: '/img/printers/p126/app-guide.png',
      imgAlt: 'Clinical case — surgical guide with sleeves',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-2',
      img: '/img/printers/p126/case-guide-strip.png',
      imgAlt: 'Clinical case — guided surgery outcome',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-3',
      img: '/img/hv2-cases/surgical.webp',
      imgAlt: 'Clinical case — surgical guide workflow',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-4',
      img: '/img/hv2-cases/implant.webp',
      imgAlt: 'Clinical case — implant planning with surgical guide',
      href: '/solutions/clinical-applications',
    },
  ],
  casesCta: RESIN_DETAIL_CASES_CTA,
};
