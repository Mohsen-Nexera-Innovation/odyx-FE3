import type { Metadata } from 'next';
import InnerPageMotion from '@/components/InnerPageMotion';
import ProductsLandingPage from '@/components/products/ProductsLandingPage';
import { PRODUCTS_LANDING_META } from '@/content/products-landing';

export const metadata: Metadata = {
  title: PRODUCTS_LANDING_META.title,
  description: PRODUCTS_LANDING_META.description,
};

export default function Page() {
  return (
    <>
      <ProductsLandingPage />
      <InnerPageMotion />
    </>
  );
}
