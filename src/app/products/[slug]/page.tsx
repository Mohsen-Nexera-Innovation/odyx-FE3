import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product | ODYX' };
  return {
    title: `${product.name} | ODYX`,
    description: product.tagline,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  if (!PRODUCTS.some((p) => p.slug === slug)) notFound();
  return (
    <>
      <ProductDetailPage slug={slug} />
      <InnerPageMotion />
    </>
  );
}
