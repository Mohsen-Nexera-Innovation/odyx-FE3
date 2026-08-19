import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCasesListing from '@/components/solutions/cases/products/ProductCasesListing';
import InnerPageMotion from '@/components/InnerPageMotion';
import { fetchCaseLibrary } from '@/app/cases/lib/load-case-library';
import {
  PRODUCT_FAMILY_META,
  PRODUCT_FAMILY_SLUGS,
  buildProductCases,
  isProductFamilySlug,
} from '@/content/product-cases';

type Props = { params: Promise<{ productSlug: string }> };

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return PRODUCT_FAMILY_SLUGS.map((productSlug) => ({ productSlug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug } = await params;
  if (!isProductFamilySlug(productSlug)) return { title: 'Cases by Product | ODYX' };
  const meta = PRODUCT_FAMILY_META[productSlug];
  return { title: meta.title, description: meta.description };
}

export default async function ProductCasesFamilyPage({ params }: Props) {
  const { productSlug } = await params;
  if (!isProductFamilySlug(productSlug)) notFound();

  const library = await fetchCaseLibrary();
  const cases = buildProductCases(library);

  return (
    <>
      <ProductCasesListing cases={cases} family={productSlug} />
      <InnerPageMotion />
    </>
  );
}
