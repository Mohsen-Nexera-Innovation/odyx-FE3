/**
 * Hardware + materials in the ODYX workflow (SCAN → PRINT → RESIN → CURE).
 * Compatible Products on a product page lists peers — never the product itself.
 */
export type EcosystemProductId = 'scanner' | 'printer' | 'resins' | 'cure';

export type CompatibleProduct = {
  id: EcosystemProductId;
  name: string;
  category: string;
  href: string;
  img: string;
};

export const ECOSYSTEM_COMPATIBLE_PRODUCTS: readonly CompatibleProduct[] = [
  {
    id: 'scanner',
    name: 'ODYX S1',
    category: 'Intra-oral Scanner',
    href: '/products/odyx-s1',
    img: '/img/scanner/s1-hero-cutout.png',
  },
  {
    id: 'printer',
    name: 'P1-26',
    category: '3D Printer',
    href: '/products/odyx-p1-26',
    img: '/img/scanner/compat/p126.png',
  },
  {
    id: 'resins',
    name: 'ODYX Resins',
    category: 'Dental Resins',
    href: '/products/resins',
    img: '/img/hv2-hub/store-resins-cutout.png',
  },
  {
    id: 'cure',
    name: 'ODYX Cure',
    category: 'Curing Station',
    href: '/products/curing-machines',
    img: '/img/scanner/compat/cure.png',
  },
];

export function compatibleProductsFor(
  current: EcosystemProductId,
): CompatibleProduct[] {
  return ECOSYSTEM_COMPATIBLE_PRODUCTS.filter((product) => product.id !== current);
}

export const COMPATIBLE_PRODUCTS_TITLE = 'Compatible Products';
