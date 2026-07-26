# 3D Printers Page Overrides

> **PROJECT:** ODYX
> **Generated:** 2026-07-25 16:12:35
> **Page Type:** Product Detail

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

> ⚠️ **Revised 2026-07-25 (Khaled) — reference-anchored rebuild.** The binding layout
> authority for this page is the two client references (`printer-odyx-p1-26.jpeg`,
> `printer-halot-x1.jpeg`), rendered with the revised Master dials (Variance 3,
> Motion 6, Density 7). Concretely for this page:
>
> - Sections are **card grids**, not editorial columns: hero chip mini-cards, boxed
>   "why" panels with checklists + imagery, a technical-features image-card grid
>   (from `knowledge_base/product-photos/` tiles), an ecosystem chain with product
>   cutout images and dotted connectors, and a downloads/demo band with imagery.
> - Every section has a short bar-titled header ("▎Technical features" style).
> - Scroll reveals + staggers on all card grids (site `.reveal` system).
> - The spec's content rules are unchanged: catalog-only claims, per-line
>   certification, tabbed specs (never side-by-side), Proof hidden until real cases.

> **Hero experiment (2026-07-25, Khaled): "3D & Hyperrealism" style, CSS-tier.**
> Dark cinematic ground (`#141216`, allowed by the token rule for product heroes),
> `perspective: 1100px` stage, pointer-tilt, 5 depth layers (glows → floor shadow →
> machine cutout → floating part tile → stat tile), multi-layer drop-shadows.
> Deliberately NOT the full DB version: no WebGL/Three.js (no 3D model of ODYX
> hardware exists; synthesizing one is forbidden), and the DB's own performance ❌ /
> accessibility ⚠ flags are mitigated by staying CSS-only, keeping text off the
> tilting stage, and disabling tilt/float under `prefers-reduced-motion` and on
> touch. The previous light hero styles are kept in CSS for revert.

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Hero (Configurator), 2. Feature Highlight (synced), 3. Price/Specs, 4. Purchase

### Spacing Overrides

- **Page default:** use Master spacing (density 6 — standard, airy). Hero, narrative
  sections, workflow spine and clinical cases keep the generous global scale.
- **Spec tables and technical-feature sections only** (`#specs`, running-cost schedule,
  technical feature grids): tighten to density ~7 — row padding `8px 12px`, grid gaps
  `12–16px`, section-internal spacing `--space-md`/`--space-lg`. Per screen-details §4:
  "Density runs standard in the narrative sections and 6–7 in specs."
- Do NOT apply the tight scale to the whole page — the client references run airy
  (resin insets ≈ 0.03 are the measured extreme), and a dense page will read cramped
  next to them.

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Neutral studio background. Product: Realistic materials. UI: Minimal overlay.

### Component Overrides

- Avoid: Load 50MB textures
- Avoid: Wide tables breaking layout
- Avoid: Unoptimized full-size images

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: WebGL/Three.js 3D, realistic shadows (layers), physics lighting, parallax (3-5 layers), smooth 3D (300-400ms)
- Sustainability: Compress and lazy load 3D models
- Responsive: Use horizontal scroll or card layout
- Performance: Use appropriate size and format (WebP)
- CTA Placement: Inside Configurator UI + Sticky Bottom Bar
