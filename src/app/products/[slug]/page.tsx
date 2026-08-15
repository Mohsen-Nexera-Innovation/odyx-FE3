import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import CuringPage from '@/components/products/cure/CuringPage';
import P126Page from '@/components/products/p1-26/P126Page';
import ResinsRangePage from '@/components/products/resins/ResinsRangePage';
import ResinDetailPage from '@/components/products/resins/ResinDetailPage';
import CrownBridgeResinPage from '@/components/products/resins/CrownBridgeResinPage';
import ModelResinPage from '@/components/products/resins/ModelResinPage';
import SurgicalGuideResinPage from '@/components/products/resins/SurgicalGuideResinPage';
import ScannerS1Page from '@/components/products/s1/ScannerS1Page';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';
import { CURE_UV02_META, CURE_UV02_SLUG } from '@/content/cure-uv02';
import { P1_26_META, P1_26_SLUG } from '@/content/p1-26';
import { RESINS_META, RESINS_SLUG } from '@/content/resins';
import { SCANNER_META, SCANNER_SLUG } from '@/content/scanner-s1';
import {
  TEMPORARY_RESIN_CONTENT,
  TEMPORARY_RESIN_META,
  TEMPORARY_RESIN_SLUG,
} from '@/content/temporary-resin';
import {
  CERAMIC_CROWN_RESIN_CONTENT,
  CERAMIC_CROWN_RESIN_META,
  CERAMIC_CROWN_RESIN_SLUG,
} from '@/content/ceramic-crown-resin';
import {
  CROWN_BRIDGE_RESIN_META,
  CROWN_BRIDGE_RESIN_SLUG,
} from '@/content/crown-bridge-resin';
import { MODEL_RESIN_META, MODEL_RESIN_SLUG } from '@/content/model-resin';
import {
  SURGICAL_GUIDE_RESIN_META,
  SURGICAL_GUIDE_RESIN_SLUG,
} from '@/content/surgical-guide-resin';

type Props = { params: Promise<{ slug: string }> };

/** Legacy product slugs → current (301 — curing demo variants collapse to one Cure page) */
const SLUG_ALIASES: Record<string, string> = {
  Resin: RESINS_SLUG,
  Resins: RESINS_SLUG,
  'intraoral-scanner': SCANNER_SLUG,
  'odyx-s1-intraoral-scanner': SCANNER_SLUG,
  'cure-cutout': CURE_UV02_SLUG,
  'cure-editorial': CURE_UV02_SLUG,
  'cure-float': CURE_UV02_SLUG,
  'cure-v4': CURE_UV02_SLUG,
  'cure-v5': CURE_UV02_SLUG,
  'cure-v6': CURE_UV02_SLUG,
  '3d-printers': P1_26_SLUG,
  'odyx-halot-x1': P1_26_SLUG,
};

export function generateStaticParams() {
  const catalog = PRODUCTS.map((p) => ({ slug: p.slug }));
  const aliases = Object.keys(SLUG_ALIASES).map((slug) => ({ slug }));
  return [...catalog, ...aliases];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: raw } = await params;
  const slug = SLUG_ALIASES[raw] ?? raw;
  if (slug === SCANNER_SLUG) {
    return { title: SCANNER_META.title, description: SCANNER_META.description };
  }
  if (slug === P1_26_SLUG) {
    return { title: P1_26_META.title, description: P1_26_META.description };
  }
  if (slug === RESINS_SLUG) {
    return { title: RESINS_META.title, description: RESINS_META.description };
  }
  if (slug === CURE_UV02_SLUG) {
    return { title: CURE_UV02_META.title, description: CURE_UV02_META.description };
  }
  if (slug === TEMPORARY_RESIN_SLUG) {
    return {
      title: TEMPORARY_RESIN_META.title,
      description: TEMPORARY_RESIN_META.description,
    };
  }
  if (slug === CERAMIC_CROWN_RESIN_SLUG) {
    return {
      title: CERAMIC_CROWN_RESIN_META.title,
      description: CERAMIC_CROWN_RESIN_META.description,
    };
  }
  if (slug === CROWN_BRIDGE_RESIN_SLUG) {
    return {
      title: CROWN_BRIDGE_RESIN_META.title,
      description: CROWN_BRIDGE_RESIN_META.description,
    };
  }
  if (slug === MODEL_RESIN_SLUG) {
    return {
      title: MODEL_RESIN_META.title,
      description: MODEL_RESIN_META.description,
    };
  }
  if (slug === SURGICAL_GUIDE_RESIN_SLUG) {
    return {
      title: SURGICAL_GUIDE_RESIN_META.title,
      description: SURGICAL_GUIDE_RESIN_META.description,
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
  // ODYX Cure — same layout system as P1-26; content from cure.jpeg
  if (raw === CURE_UV02_SLUG) {
    return (
      <>
        <CuringPage />
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
  // Dedicated P1-26 landing — canonical printer product page
  if (raw === P1_26_SLUG) {
    return (
      <>
        <P126Page />
        <InnerPageMotion />
      </>
    );
  }
  // Temporary Restoration Resin — fidelity to temp-restro-resign mock
  if (raw === TEMPORARY_RESIN_SLUG) {
    return (
      <>
        <ResinDetailPage content={TEMPORARY_RESIN_CONTENT} />
        <InnerPageMotion />
      </>
    );
  }
  // Ceramic Crown Resin — fidelity to ceremic-crown-resign mock
  if (raw === CERAMIC_CROWN_RESIN_SLUG) {
    return (
      <>
        <ResinDetailPage content={CERAMIC_CROWN_RESIN_CONTENT} />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === CROWN_BRIDGE_RESIN_SLUG) {
    return (
      <>
        <CrownBridgeResinPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === MODEL_RESIN_SLUG) {
    return (
      <>
        <ModelResinPage />
        <InnerPageMotion />
      </>
    );
  }
  if (raw === SURGICAL_GUIDE_RESIN_SLUG) {
    return (
      <>
        <SurgicalGuideResinPage />
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
