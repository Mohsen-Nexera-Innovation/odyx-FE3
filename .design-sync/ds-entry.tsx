// ODYX design-system export surface.
//
// This is the entry the converter bundles into `_ds_bundle.js`; every export
// below becomes `window.OdyxDS.<Name>` for the claude.ai/design agent. It is
// deliberately scoped to the two approved screens — Home and the P1-26 product
// page — rather than letting the converter synthesise an entry from all of
// src/, which would drag the admin, auth, checkout and inbox surfaces into a
// design system that is not meant to describe them.
//
// Names are the repo's own component names on purpose: a design built from
// `HubCardsSection` maps 1:1 onto the file an ODYX engineer already ships.

// ── Chrome ───────────────────────────────────────────────────────────────
// Header renders its home-screen state: the navigation shim pins the pathname
// to "/", which is the action-blue treatment approved for the design system.
export { default as Header } from '@/components/header/Header';
// Site-wide Footer (Home V2 navy band). Kept as `Hv2Footer` for design-sync
// preview name stability after the home2 component was consolidated.
export { default as Hv2Footer } from '@/components/footer/Footer';
export { default as Footer } from '@/components/footer/Footer';

// ── Home screen sections ─────────────────────────────────────────────────
export { default as PathCarousel } from '@/components/home2/PathCarousel';
export { default as ProductsRail } from '@/components/home2/ProductsRail';
export { default as ClinicalApplicationsSection } from '@/components/home2/ClinicalApplicationsSection';
export { default as ClinicalCasesShowcase } from '@/components/home2/ClinicalCasesShowcase';
export { default as HubCardsSection } from '@/components/home2/HubCardsSection';
export { default as LatestUpdatesSection } from '@/components/home2/LatestUpdatesSection';

// ── P1-26 product screen ─────────────────────────────────────────────────
export { default as P126Cases } from '@/components/products/p1-26/P126Cases';
export { default as P126RoiMini } from '@/components/products/p1-26/P126RoiMini';
export { default as P126Video } from '@/components/products/p1-26/P126Video';

// ── Whole-screen compositions ────────────────────────────────────────────
// Shipped so the design agent can read how the sections are assembled at full
// screen scale, not just how each one looks alone.
export { default as HomeV2Page } from '@/components/home2/HomeV2Page';
export { default as P126Page } from '@/components/products/p1-26/P126Page';

// ── Runtime requirements (bundled, no preview card of their own) ──────────
// GlobalToolsProvider carries locale/theme context that Header and Footer
// read; without it they throw. Hv2Motion is the reveal-on-scroll driver for
// `.hv2 .rv` elements — see the README conventions header.
export { GlobalToolsProvider } from '@/components/GlobalTools';
export { default as Hv2Motion } from '@/components/home2/Hv2Motion';
