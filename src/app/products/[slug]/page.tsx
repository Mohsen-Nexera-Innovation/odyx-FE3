import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import PrintersFamilyPage from '@/components/pages/PrintersFamilyPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';
import { PRINTERS_META } from '@/content/printers-3d';

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
  if (slug === '3d-printers') {
    return { title: PRINTERS_META.title, description: PRINTERS_META.description };
  }
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
  // 036 · 3D Printers is a product-family (forked) page with its own layout —
  // spec in knowledge_base/screens/036-3d-printers/
  if (raw === '3d-printers') {
    return (
      <>
        <PrintersFamilyPage />
        <InnerPageMotion />
      </>
    );
  }
  return (
    <>
      <ProductDetailPage slug={raw} />
      <InnerPageMotion />
    </>
  );
}
