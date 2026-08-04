/** Shared compatible devices for resin detail pages. */
export const RESIN_DETAIL_COMPATIBLE = [
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
    img: '/images/compat-s1.png',
    imgAlt: 'ODYX S1 intraoral scanner',
    href: '/products/odyx-s1-intraoral-scanner',
  },
] as const;

export const RESIN_DETAIL_CASES_CTA = {
  label: 'View More Cases',
  href: '/solutions/clinical-applications',
};
