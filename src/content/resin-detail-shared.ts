import { compatibleProductsFor } from '@/content/compatible-products';

/** Shared compatible devices for resin detail pages (excludes resins). */
export const RESIN_DETAIL_COMPATIBLE = compatibleProductsFor('resins').map(
  (product) => ({
    id: product.id,
    label: `${product.name} ${product.category}`,
    img: product.img,
    imgAlt: `${product.name} ${product.category}`,
    href: product.href,
  }),
);

export const RESIN_DETAIL_CASES_CTA = {
  label: 'View More Cases',
  href: '/solutions/cases/products/resin',
};
