/**
 * Temporary Restoration Resin — detail page content.
 * Matched to client mock (temp-restro-resign / user reference).
 */

import type { ResinDetailContent } from '@/components/products/resins/ResinDetailPage';
import { FEATURE_ICON_COMPONENTS } from '@/components/products/resins/temporary/FeatureIcons';
import {
  RESIN_DETAIL_CASES_CTA,
  RESIN_DETAIL_COMPATIBLE,
} from '@/content/resin-detail-shared';

export const TEMPORARY_RESIN_SLUG = 'temporary-restoration-resin';

export const TEMPORARY_RESIN_META = {
  title: 'Temporary Restoration Resin | ODYX',
  description:
    'ODYX Temporary Restoration Resin — fast, strong, and esthetic provisionals for temporary crowns, bridges, and long-span restorations.',
};

export const TEMPORARY_RESIN_HERO = {
  kicker: 'PREMIUM DENTAL RESIN',
  titleBold: 'Temporary Restoration',
  titleLight: 'Resin',
  tagline: 'Fast. Strong. Esthetic.',
  body: 'Ideal for temporary crowns, bridges and provisional restorations.',
  img: '/images/resin-hero-temporary-restoration-v2.png',
  imgAlt:
    'ODYX Temporary Restoration Resin bottle with 3D-printed temporary dental restorations',
  primaryCta: { label: 'Request a Demo', href: '/request-demo' },
  secondaryCta: {
    label: 'Download Datasheet',
    href: '/docs/resins/resin-flyer.pdf',
  },
};

export const TEMPORARY_RESIN_APPLICATIONS = [
  {
    id: 'crowns',
    label: 'Temporary Crowns',
    img: '/images/app-temporary-crowns.png',
    imgAlt: '3D-printed temporary crowns',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'bridges',
    label: 'Temporary Bridges',
    img: '/images/app-temporary-bridges.png',
    imgAlt: '3D-printed temporary bridge',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'long-span',
    label: 'Long-span Provisionals',
    img: '/images/app-long-span-provisionals.png',
    imgAlt: '3D-printed long-span provisional',
    href: '/solutions/clinical-applications',
  },
] as const;

export type TemporaryResinFeatureId =
  | 'strength'
  | 'comfort'
  | 'temperature'
  | 'shrinkage'
  | 'shades'
  | 'finish';

export const TEMPORARY_RESIN_FEATURES: {
  id: TemporaryResinFeatureId;
  label: string;
}[] = [
  { id: 'strength', label: 'Excellent Strength' },
  { id: 'comfort', label: 'Comfortable Wear' },
  { id: 'temperature', label: 'High Temperature Resistance' },
  { id: 'shrinkage', label: 'Low Shrinkage' },
  { id: 'shades', label: 'Multiple Tooth Shades' },
  { id: 'finish', label: 'Smooth Surface Finish' },
];

export const TEMPORARY_RESIN_SPECS = [
  { property: 'Hardness', value: '85–90 Shore D' },
  { property: 'Flexural Strength', value: '100–140 MPa' },
  { property: 'Tensile Strength', value: '65–85 MPa' },
  { property: 'Water Absorption', value: '< 1.5 %' },
  { property: 'Elongation at Break', value: '10–15 %' },
  { property: 'Applicable Light Source', value: '385–405 nm' },
] as const;

export const TEMPORARY_RESIN_COMPATIBLE = RESIN_DETAIL_COMPATIBLE;

export const TEMPORARY_RESIN_CASES = [
  {
    id: 'case-1',
    img: '/img/printers/p126/app-temporary.png',
    imgAlt: 'Clinical case — printed temporary restorations',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-2',
    img: '/images/case-1.jpg',
    imgAlt: 'Clinical case — temporary restoration result',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-3',
    img: '/images/case-2.jpg',
    imgAlt: 'Clinical case — provisional smile',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-4',
    img: '/img/printers/p126/case-final.png',
    imgAlt: 'Clinical case — seated temporary restorations',
    href: '/solutions/clinical-applications',
  },
] as const;

export const TEMPORARY_RESIN_CASES_CTA = RESIN_DETAIL_CASES_CTA;

export const TEMPORARY_RESIN_CONTENT: ResinDetailContent = {
  featuresAriaLabel: 'Temporary Restoration Resin features',
  appColumns: 3,
  hero: {
    kicker: TEMPORARY_RESIN_HERO.kicker,
    titleLines: [TEMPORARY_RESIN_HERO.titleBold, TEMPORARY_RESIN_HERO.titleLight],
    tagline: TEMPORARY_RESIN_HERO.tagline,
    body: TEMPORARY_RESIN_HERO.body,
    img: TEMPORARY_RESIN_HERO.img,
    imgAlt: TEMPORARY_RESIN_HERO.imgAlt,
    imgWidth: 1024,
    imgHeight: 568,
    primaryCta: TEMPORARY_RESIN_HERO.primaryCta,
    secondaryCta: TEMPORARY_RESIN_HERO.secondaryCta,
  },
  applications: TEMPORARY_RESIN_APPLICATIONS,
  features: TEMPORARY_RESIN_FEATURES,
  featureIcons: FEATURE_ICON_COMPONENTS,
  specs: TEMPORARY_RESIN_SPECS,
  compatible: [...RESIN_DETAIL_COMPATIBLE],
  cases: TEMPORARY_RESIN_CASES,
  casesCta: RESIN_DETAIL_CASES_CTA,
};
