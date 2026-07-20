import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';

type Props = { params: Promise<{ slug: string }> };

/** Legacy product slugs → current */
const SLUG_ALIASES: Record<string, string> = {
  Resins: 'Resin',
};

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = SLUG_ALIASES[raw] ?? raw;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Product | ODYX' };
  return {
    title: `${product.name} | ODYX`,
    description: product.tagline,
  };
}

export default async function Page({ params }: Props) {
  const { slug: raw } = await params;
  if (SLUG_ALIASES[raw]) redirect(`/products/${SLUG_ALIASES[raw]}`);
  if (!PRODUCTS.some((p) => p.slug === raw)) notFound();
  return (
    <>
      <ProductDetailPage slug={raw} />
      <InnerPageMotion />
    </>
  );
}
