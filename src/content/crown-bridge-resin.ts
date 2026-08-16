/**
 * Crown & Bridge Resin — detail page content.
 * Matched to client mock (crown-and-bridge-resign / user reference).
 */

import type { ResinDetailContent } from '@/components/pages/ResinDetailPage';
import { CROWN_BRIDGE_FEATURE_ICONS } from '@/components/crown-bridge-resin/FeatureIcons';
import {
  RESIN_DETAIL_CASES_CTA,
  RESIN_DETAIL_COMPATIBLE,
} from '@/content/resin-detail-shared';

export const CROWN_BRIDGE_RESIN_SLUG = 'crown-bridge-resin';

export const CROWN_BRIDGE_RESIN_META = {
  title: 'Crown & Bridge Resin | ODYX',
  description:
    'ODYX Crown & Bridge Resin — strong, precise, reliable resin for crowns, bridges, veneers, inlays and onlays.',
};

export const CROWN_BRIDGE_RESIN_CONTENT: ResinDetailContent = {
  featuresAriaLabel: 'Crown & Bridge Resin features',
  appColumns: 5,
  hero: {
    kicker: 'PREMIUM DENTAL RESIN',
    titleLines: ['Crown & Bridge', 'Resin'],
    tagline: 'Strong. Precise. Reliable.',
    body: 'Designed for crowns, bridges, veneers, inlays and onlays with exceptional mechanical performance.',
    img: '/images/resin-hero-crown-bridge-v2.png',
    imgAlt: 'ODYX Crown & Bridge Resin bottle with printed dental restorations',
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
      id: 'crowns',
      label: 'Crowns',
      img: '/images/app-cb-crowns.png',
      imgAlt: '3D-printed crown',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'bridges',
      label: 'Bridges',
      img: '/images/app-cb-bridges.png',
      imgAlt: '3D-printed bridge',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'veneers',
      label: 'Veneers',
      img: '/images/app-cb-veneers.png',
      imgAlt: '3D-printed veneers',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'inlays',
      label: 'Inlays',
      img: '/images/app-cb-inlays.png',
      imgAlt: '3D-printed inlay',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'onlays',
      label: 'Onlays',
      img: '/images/app-cb-onlays.png',
      imgAlt: '3D-printed onlay',
      href: '/solutions/clinical-applications',
    },
  ],
  features: [
    { id: 'hardness', label: 'High Hardness' },
    { id: 'impact', label: 'Impact Resistant' },
    { id: 'accuracy', label: 'Excellent Marginal Accuracy' },
    { id: 'shrinkage', label: 'Low Shrinkage' },
    { id: 'temperature', label: 'High Temperature Resistance' },
    { id: 'shades', label: 'Tooth Shade Options' },
  ],
  featureIcons: CROWN_BRIDGE_FEATURE_ICONS,
  specs: [
    { property: 'Hardness', value: '92–94 Shore D' },
    { property: 'Flexural Strength', value: '140–160 MPa' },
    { property: 'Tensile Strength', value: '80–90 MPa' },
    { property: 'Heat Deflection Temperature', value: '100–110 °C' },
    { property: 'Elongation at Break', value: '8–10 %' },
    { property: 'Applicable Light Source', value: '385–405 nm' },
  ],
  compatible: [...RESIN_DETAIL_COMPATIBLE],
  cases: [
    {
      id: 'case-1',
      img: '/img/printers/p126/app-crown.png',
      imgAlt: 'Clinical case — printed crowns',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-2',
      img: '/img/printers/p126/case-printed.png',
      imgAlt: 'Clinical case — crown and bridge units as printed',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-3',
      img: '/img/printers/p126/case-final.png',
      imgAlt: 'Clinical case — seated crown and bridge restorations',
      href: '/solutions/clinical-applications',
    },
    {
      id: 'case-4',
      img: '/img/printers/p126/case-crown-strip.png',
      imgAlt: 'Clinical case — finished crown and bridge smile',
      href: '/solutions/clinical-applications',
    },
  ],
  casesCta: RESIN_DETAIL_CASES_CTA,
};
