/**
 * Ceramic Crown Resin — detail page content.
 * Matched to client mock (ceremic-crown-resign / user reference).
 * Specs: Hardness & Flexural Strength also on product-photos/resin collage.
 */

import type { ResinDetailContent } from '@/components/products/resins/ResinDetailPage';
import { FEATURE_ICON_COMPONENTS } from '@/components/products/resins/ceramic-crown/FeatureIcons';
import {
  RESIN_DETAIL_CASES_CTA,
  RESIN_DETAIL_COMPATIBLE,
} from '@/content/resin-detail-shared';

export const CERAMIC_CROWN_RESIN_SLUG = 'ceramic-crown-resin';

export const CERAMIC_CROWN_RESIN_META = {
  title: 'Ceramic Crown Resin | ODYX',
  description:
    'ODYX Ceramic Crown Resin — permanent strength and natural esthetics for crowns, inlays, onlays, veneers, bridges, and denture teeth.',
};

export const CERAMIC_CROWN_RESIN_HERO = {
  kicker: 'PREMIUM DENTAL RESIN',
  titleBold: 'Ceramic Crown',
  titleLight: 'Resin',
  tagline: 'Permanent strength. Natural esthetics.',
  body: 'Indicated for permanent single units (crowns, inlays, onlays, veneers) and bridges, and denture teeth.',
  img: '/images/resin-hero-ceramic-crown-v2.png',
  imgAlt:
    'ODYX Ceramic Crown Resin bottle with a 3D-printed ceramic crown',
  primaryCta: { label: 'Request a Demo', href: '/request-demo' },
  secondaryCta: {
    label: 'Download Datasheet',
    href: '/docs/resins/resin-flyer.pdf',
  },
};

export const CERAMIC_CROWN_RESIN_APPLICATIONS = [
  {
    id: 'crowns',
    label: 'Crowns',
    img: '/images/app-ceramic-crowns.png',
    imgAlt: '3D-printed ceramic crown',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'inlays',
    label: 'Inlays',
    img: '/images/app-ceramic-inlays.png',
    imgAlt: '3D-printed ceramic inlay',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'onlays',
    label: 'Onlays',
    img: '/images/app-ceramic-onlays.png',
    imgAlt: '3D-printed ceramic onlay',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'veneers',
    label: 'Veneers',
    img: '/images/app-ceramic-veneers.png',
    imgAlt: '3D-printed ceramic veneers',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'bridges',
    label: 'Bridges',
    img: '/images/app-ceramic-bridges.png',
    imgAlt: '3D-printed ceramic bridge',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'denture-teeth',
    label: 'Denture Teeth',
    img: '/images/app-ceramic-denture-teeth.png',
    imgAlt: '3D-printed denture teeth on a gum base',
    href: '/solutions/clinical-applications',
  },
] as const;

export type CeramicCrownResinFeatureId =
  | 'hardness'
  | 'shrinkage'
  | 'temperature'
  | 'biocompatible'
  | 'shades'
  | 'wavelength';

export const CERAMIC_CROWN_RESIN_FEATURES: {
  id: CeramicCrownResinFeatureId;
  label: string;
}[] = [
  { id: 'hardness', label: 'High Hardness' },
  { id: 'shrinkage', label: 'Low Shrinkage' },
  { id: 'temperature', label: 'High Temperature Resistance' },
  { id: 'biocompatible', label: 'Low Irritation & Biocompatible' },
  { id: 'shades', label: 'Natural Tooth Shades' },
  { id: 'wavelength', label: '385–405nm Compatibility' },
];

export const CERAMIC_CROWN_RESIN_SPECS = [
  { property: 'Hardness', value: '93–95 Shore D' },
  { property: 'Flexural Strength', value: '110–140 MPa' },
  { property: 'Tensile Strength', value: '70–80 MPa' },
  { property: 'Heat Deflection Temperature', value: '100–110 °C' },
  { property: 'Elongation at Break', value: '5–8 %' },
  { property: 'Applicable Light Source', value: '385–405 nm' },
] as const;

export const CERAMIC_CROWN_RESIN_COMPATIBLE = RESIN_DETAIL_COMPATIBLE;

export const CERAMIC_CROWN_RESIN_CASES = [
  {
    id: 'case-1',
    img: '/img/hv2-clinical/restorative.webp',
    imgAlt: 'Clinical case — ceramic crown restorative result',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-2',
    img: '/img/printers/p126/case-printed.png',
    imgAlt: 'Clinical case — printed ceramic crown units',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-3',
    img: '/img/printers/p126/case-final.png',
    imgAlt: 'Clinical case — seated ceramic restorations',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-4',
    img: '/img/printers/p126/case-crown-strip.png',
    imgAlt: 'Clinical case — finished ceramic smile',
    href: '/solutions/clinical-applications',
  },
] as const;

export const CERAMIC_CROWN_RESIN_CASES_CTA = RESIN_DETAIL_CASES_CTA;

export const CERAMIC_CROWN_RESIN_CONTENT: ResinDetailContent = {
  featuresAriaLabel: 'Ceramic Crown Resin features',
  appColumns: 6,
  hero: {
    kicker: CERAMIC_CROWN_RESIN_HERO.kicker,
    titleLines: [
      CERAMIC_CROWN_RESIN_HERO.titleBold,
      CERAMIC_CROWN_RESIN_HERO.titleLight,
    ],
    tagline: CERAMIC_CROWN_RESIN_HERO.tagline,
    body: CERAMIC_CROWN_RESIN_HERO.body,
    img: CERAMIC_CROWN_RESIN_HERO.img,
    imgAlt: CERAMIC_CROWN_RESIN_HERO.imgAlt,
    imgWidth: 1024,
    imgHeight: 568,
    primaryCta: CERAMIC_CROWN_RESIN_HERO.primaryCta,
    secondaryCta: CERAMIC_CROWN_RESIN_HERO.secondaryCta,
  },
  applications: CERAMIC_CROWN_RESIN_APPLICATIONS,
  features: CERAMIC_CROWN_RESIN_FEATURES,
  featureIcons: FEATURE_ICON_COMPONENTS,
  specs: CERAMIC_CROWN_RESIN_SPECS,
  compatible: [...RESIN_DETAIL_COMPATIBLE],
  cases: CERAMIC_CROWN_RESIN_CASES,
  casesCta: RESIN_DETAIL_CASES_CTA,
};
