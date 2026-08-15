# Reference — ODYX screen-from-image

Read on demand. Not every screen uses the Temporary Resin shape.

## Authority

1. Read `knowledge_base/README.md` first (authority order).
2. Client design references under `knowledge_base/design-references/` outrank generated suggestions.
3. Tokens: action blue `#0050D8` on white; Tajawal 400/500/700; light surfaces; dark `#0A1020` only for cinematic heroes.
4. Product facts/claims: `knowledge_base/ODYX Products - 18.7.26.pdf` — never invent numbers. Certification is per resin line, never range-wide.
5. Screen specs under `knowledge_base/screens/` when present; otherwise the user mock is the fidelity target.
6. `design-system/odyx/` is supplementary; client decisions win on conflict.

## Asset placement

- Prefer the existing tree for that screen family (`public/img/scanner/…`, `public/img/resins/…`, etc.).
- Flat `public/images/` is fine for new one-off landings when no family folder exists.
- Keep filenames stable across LQ → HQ so content paths do not change.
- Simple line icons → SVG components. Photos/product shots → rasters.

## Global CSS pitfalls (`odyx.css`)

Unlayered global rules often beat Tailwind utilities:

- `* { margin: 0; padding: 0 }` — use `!` utilities or scoped CSS when spacing collapses.
- `.grid { gap: 20px }` — page-scoped selectors with `gap: … !important` when the mock needs tighter gutters.
- Fixed site header — light heroes usually need top padding + `data-hero-light` so content is not under the nav.
- After swapping images under `public/`, clear `.next/cache/images` so Next serves new bytes.

## Implementation habits

- Infer sections from the mock top-to-bottom; do not force a fixed spine.
- Match routing/content/page patterns of the **closest existing screen**, not a single canonical template.
- Plan RTL from the start (no letter-spacing / uppercase / italic on Arabic).
- Prefer scoped page CSS class prefixes (e.g. `.trr-page`) over global edits.

---

## Worked example only — Temporary Restoration Resin

Optional. Use when the mock is a similar resin detail page; **do not** treat this as required for every screen.

| Role | Path |
|------|------|
| Content | `src/content/temporary-resin.ts` |
| Page | `src/components/products/resins/ResinDetailPage.tsx` |
| Feature icons | `src/components/products/resins/temporary/FeatureIcons.tsx` |
| Route branch | `src/app/products/[slug]/page.tsx` |
| Registry | `src/content/products.ts` |
| Mock | `knowledge_base/design-references/product-design-refrences/temp-restro-resign.jpeg` |
| Assets | `public/images/{hero,app,compat,case}-*` |

Typical sections on that mock (not universal): Hero → Applications → Features → Specs + Compatible → Cases.
