/**
 * Temporary Restoration Resin — detail page content.
 * Matched to client mock (temp-restro-resign / user reference).
 */

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

export const TEMPORARY_RESIN_COMPATIBLE = [
  {
    id: 'p1-36',
    label: 'ODYX P1-36 3D Printer',
    img: '/images/compat-p1-36.png',
    imgAlt: 'ODYX P1-36 3D printer',
    href: '/products/odyx-p1-26',
  },
  {
    id: 'uv-02',
    label: 'ODYX UV-02 Curing Unit',
    img: '/img/cure-uv02/hero/machine-cutout.png',
    imgAlt: 'ODYX UV-02 curing unit',
    href: '/products/curing-machines',
  },
  {
    id: 's1',
    label: 'ODYX S1 Intraoral Scanner',
    img: '/img/scanner/s1-hero-cutout.png',
    imgAlt: 'ODYX S1 intraoral scanner',
    href: '/products/odyx-s1-intraoral-scanner',
  },
] as const;

export const TEMPORARY_RESIN_CASES = [
  {
    id: 'case-1',
    img: '/images/case-1.jpg',
    imgAlt: 'Clinical case — temporary restoration result',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-2',
    img: '/images/case-2.jpg',
    imgAlt: 'Clinical case — provisional smile',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-3',
    img: '/images/case-3.jpg',
    imgAlt: 'Clinical case — seated temporary',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-4',
    img: '/images/case-4.jpg',
    imgAlt: 'Clinical case — anterior provisionals',
    href: '/solutions/clinical-applications',
  },
] as const;

export const TEMPORARY_RESIN_CASES_CTA = {
  label: 'View More Cases',
  href: '/cases?product=resin#featured-cases',
};
