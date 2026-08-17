import type { Metadata } from 'next';
import ProductCasesListing from '@/components/solutions/cases/products/ProductCasesListing';
import InnerPageMotion from '@/components/InnerPageMotion';
import { fetchCaseLibrary } from '@/app/cases/lib/load-case-library';
import { PRODUCT_CASES_META, buildProductCases } from '@/content/product-cases';

export const metadata: Metadata = {
  title: PRODUCT_CASES_META.title,
  description: PRODUCT_CASES_META.description,
};

export default async function ProductCasesAllPage() {
  const library = await fetchCaseLibrary();
  const cases = buildProductCases(library);

  return (
    <>
      <ProductCasesListing cases={cases} family="all" />
      <InnerPageMotion />
    </>
  );
}
