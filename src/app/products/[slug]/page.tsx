import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import CuringClinicalPage from '@/components/pages/CuringClinicalPage';
import CuringCutoutPage from '@/components/pages/CuringCutoutPage';
import CuringEditorialPage from '@/components/pages/CuringEditorialPage';
import CuringFloatPage from '@/components/pages/CuringFloatPage';
import CuringV4Page from '@/components/pages/CuringV4Page';
import CuringV5Page from '@/components/pages/CuringV5Page';
import PrintersFamilyPage from '@/components/pages/PrintersFamilyPage';
import ResinsRangePage from '@/components/pages/ResinsRangePage';
import ScannerS1Page from '@/components/pages/ScannerS1Page';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';
import { PRINTERS_META } from '@/content/printers-3d';
import { RESINS_META, RESINS_SLUG } from '@/content/resins';
import { SCANNER_META, SCANNER_SLUG } from '@/content/scanner-s1';

type Props = { params: Promise<{ slug: string }> };

/** Legacy product slugs → current (301 — the scanner slug carries the model name, review #22;
 *  the resins slug is plural lowercase per 039 content.md §3) */
const SLUG_ALIASES: Record<string, string> = {
  Resin: RESINS_SLUG,
  Resins: RESINS_SLUG,
  'intraoral-scanner': SCANNER_SLUG,
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
  if (slug === SCANNER_SLUG) {
    return { title: SCANNER_META.title, description: SCANNER_META.description };
  }
  if (slug === RESINS_SLUG) {
    return { title: RESINS_META.title, description: RESINS_META.description };
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
  if (SLUG_ALIASES[raw]) permanentRedirect(`/products/${SLUG_ALIASES[raw]}`);
  if (!PRODUCTS.some((p) => p.slug === raw)) notFound();
  // 034 · Intraoral Scanner is a single-model detail page with its own layout —
  // spec in knowledge_base/screens/034-interoral-scanner/
  if (raw === SCANNER_SLUG) {
    return (
      <>
        <ScannerS1Page />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'curing-machines') {
    return (
      <>
        <CuringClinicalPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'cure-cutout') {
    return (
      <>
        <CuringCutoutPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'cure-editorial') {
    return (
      <>
        <CuringEditorialPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'cure-float') {
    return (
      <>
        <CuringFloatPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'cure-v4') {
    return (
      <>
        <CuringV4Page />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === 'cure-v5') {
    return (
      <>
        <CuringV5Page />
        <InnerPageMotion />
      </>
    );
  }
  // 039 · Resins is the range-lineup page with its own layout —
  // spec in knowledge_base/screens/039-resin/
  if (raw === RESINS_SLUG) {
    return (
      <>
        <ResinsRangePage />
        <InnerPageMotion />
      </>
    );
  }
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
