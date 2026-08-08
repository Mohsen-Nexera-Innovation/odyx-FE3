/**
 * Ceramic Crown Resin — detail page content.
 * Matched to client mock (ceremic-crown-resign / user reference).
 * Specs: Hardness & Flexural Strength also on product-photos/resin collage.
 */

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
  img: '/images/hero-ceramic-crown-resin.png',
  imgAlt:
    'ODYX Ceramic Crown Resin bottle with a 3D-printed ceramic crown',
  primaryCta: { label: 'Request a Demo', href: '/request-demo' },
  secondaryCta: {
    label: 'Download Datasheet',
    href: 'mailto:info@odyx.dental?subject=Document%20request%3A%20Ceramic%20Crown%20Resin',
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

export const CERAMIC_CROWN_RESIN_COMPATIBLE = [
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
    img: '/images/compat-uv-02.png',
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

export const CERAMIC_CROWN_RESIN_CASES = [
  {
    id: 'case-1',
    img: '/images/case-ceramic-1.jpg',
    imgAlt: 'Clinical case — ceramic crown result',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-2',
    img: '/images/case-ceramic-2.jpg',
    imgAlt: 'Clinical case — anterior ceramic restorations',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-3',
    img: '/images/case-ceramic-3.jpg',
    imgAlt: 'Clinical case — seated ceramic units',
    href: '/solutions/clinical-applications',
  },
  {
    id: 'case-4',
    img: '/images/case-ceramic-4.jpg',
    imgAlt: 'Clinical case — ceramic smile result',
    href: '/solutions/clinical-applications',
  },
] as const;

export const CERAMIC_CROWN_RESIN_CASES_CTA = {
  label: 'View More Cases',
  href: '/solutions/clinical-applications',
};
