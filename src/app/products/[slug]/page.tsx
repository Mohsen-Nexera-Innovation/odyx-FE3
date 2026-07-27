import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import CuringPage from '@/components/pages/CuringPage';
import CuringUv02Page from '@/components/pages/CuringUv02Page';
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
 *  the resins slug is plural lowercase per 039 content.md §3;
 *  curing demo variants collapse to the single Cure page) */
const SLUG_ALIASES: Record<string, string> = {
  Resin: RESINS_SLUG,
  Resins: RESINS_SLUG,
  'intraoral-scanner': SCANNER_SLUG,
  'cure-cutout': 'curing-machines',
  'cure-editorial': 'curing-machines',
  'cure-float': 'curing-machines',
  'cure-v4': 'curing-machines',
  'cure-v5': 'curing-machines',
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
  if (slug === 'cure-v6') {
    // 037 content.md §3 — title tag + meta description
    return {
      title: 'ODYX Cure UV-02 — Dental UV Curing Machine',
      description:
        'Triple-wavelength UV curing (365/385/405 nm) for every dental resin. 360° coverage, 8 presets, 1–5 minute typical cures. Meet the ODYX Cure UV-02.',
    };
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
        <CuringPage />
        <InnerPageMotion />
      </>
    );
  }
  // 037 · spec-faithful ODYX Cure UV-02 build — knowledge_base/screens/037 Curing Machines
  if (raw === 'cure-v6') {
    return (
      <>
        <CuringUv02Page />
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
