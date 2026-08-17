import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InnerPageMotion from '@/components/InnerPageMotion';
import ProductCaseDetail from '@/components/solutions/cases/products/ProductCaseDetail';
import { resolveProductCase } from '@/app/solutions/cases/products/load-product-case';
import {
  PRODUCT_FAMILY_META,
  isProductFamilySlug,
  staticProductCases,
} from '@/content/product-cases';

type Props = { params: Promise<{ productSlug: string; caseSlug: string }> };

export function generateStaticParams() {
  return staticProductCases().flatMap((c) =>
    c.productKeys.map((productSlug) => ({
      productSlug,
      caseSlug: c.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productSlug, caseSlug } = await params;
  const c = await resolveProductCase(productSlug, caseSlug);
  if (!c) return { title: 'Case | ODYX' };
  const family = isProductFamilySlug(productSlug) ? PRODUCT_FAMILY_META[productSlug].label : 'Product';
  return {
    title: `${c.title} | ${family} | ODYX`,
    description: c.summary || `${c.badge} clinical case from the ODYX Real Case Library.`,
  };
}

export default async function ProductCaseDetailPage({ params }: Props) {
  const { productSlug, caseSlug } = await params;
  if (!isProductFamilySlug(productSlug)) notFound();

  const caseItem = await resolveProductCase(productSlug, caseSlug);
  if (!caseItem) notFound();

  return (
    <>
      <ProductCaseDetail productSlug={productSlug} caseItem={caseItem} />
      <InnerPageMotion />
    </>
  );
}
