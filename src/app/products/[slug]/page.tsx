import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import CuringPage from '@/components/pages/CuringPage';
import PrintersFamilyPage from '@/components/pages/PrintersFamilyPage';
import P126Page from '@/components/pages/P126Page';
import ResinsRangePage from '@/components/pages/ResinsRangePage';
import ScannerS1Page from '@/components/pages/ScannerS1Page';
import TemporaryResinPage from '@/components/pages/TemporaryResinPage';
import CeramicCrownResinPage from '@/components/pages/CeramicCrownResinPage';
import CrownBridgeResinPage from '@/components/pages/CrownBridgeResinPage';
import ModelResinPage from '@/components/pages/ModelResinPage';
import SurgicalGuideResinPage from '@/components/pages/SurgicalGuideResinPage';
import InnerPageMotion from '@/components/InnerPageMotion';
import { PRODUCTS } from '@/content/products';
import { PRINTERS_META } from '@/content/printers-3d';
import { CURE_UV02_META, CURE_UV02_SLUG } from '@/content/cure-uv02';
import { P1_26_META, P1_26_SLUG } from '@/content/p1-26';
import { RESINS_META, RESINS_SLUG } from '@/content/resins';
import { SCANNER_META, SCANNER_SLUG } from '@/content/scanner-s1';
import {
  TEMPORARY_RESIN_META,
  TEMPORARY_RESIN_SLUG,
} from '@/content/temporary-resin';
import {
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
  'cure-cutout': CURE_UV02_SLUG,
  'cure-editorial': CURE_UV02_SLUG,
  'cure-float': CURE_UV02_SLUG,
  'cure-v4': CURE_UV02_SLUG,
  'cure-v5': CURE_UV02_SLUG,
  'cure-v6': CURE_UV02_SLUG,
  'odyx-halot-x1': '3d-printers',
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
  // Cure UV-02 — same layout system as P1-26; content from cure.jpeg
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
  // Dedicated P1-26 landing — attached product UI
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
        <TemporaryResinPage />
        <InnerPageMotion />
      </>
    );
  }
  // Ceramic Crown Resin — fidelity to ceremic-crown-resign mock
  if (raw === CERAMIC_CROWN_RESIN_SLUG) {
    return (
      <>
        <CeramicCrownResinPage />
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
