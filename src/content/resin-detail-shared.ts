/** Shared compatible devices for resin detail pages. */
export const RESIN_DETAIL_COMPATIBLE = [
  {
    id: 'p1-26',
    label: 'ODYX P1-26 3D Printer',
    img: '/img/hv2-cut/printer-product.webp',
    imgAlt: 'ODYX P1-26 3D printer',
    href: '/products/odyx-p1-26',
  },
  {
    id: 'uv-02',
    label: 'ODYX Cure',
    img: '/img/hv2-cut/cure-product.webp',
    imgAlt: 'ODYX Cure',
    href: '/products/curing-machines',
  },
  {
    id: 's1',
    label: 'ODYX S1 Intraoral Scanner',
    img: '/img/scanner/s1-hero-cutout.png',
    imgAlt: 'ODYX S1 intraoral scanner',
    href: '/products/odyx-s1',
  },
] as const;

export const RESIN_DETAIL_CASES_CTA = {
  label: 'View More Cases',
  href: '/solutions/cases/products/resin',
};
