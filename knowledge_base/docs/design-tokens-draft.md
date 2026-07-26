# Design Tokens — Draft v0, extracted from client references

Source: the 13 client-supplied images in `knowledge_base/resources/client-design-refrence/`.
Values sampled programmatically (hue-family analysis, clinical photography filtered out).
**Draft — confirm with an eyedropper on the originals before locking.**

---

## ✅ Color direction — approved

ODYX approved **Palette B** on 2026-07-25: blue `#0050D8` on white, per their design
references. The Website Brief's `#FF8400` orange on `#1A1A2E` navy is **formally superseded**.
Compared side by side in [palette-comparison.html](palette-comparison.html).

What the references do with orange: it appears as **product hardware** (the P1-26's UV hood,
`#F06000`), as **one category accent** (Prosthetics, `#F09040`), and as **rating stars**
(`#F0B838`). It is never the brand's primary action color — the orange is *the machine
itself*, so the product supplies the accent.

---

## Core palette

| Token | Hex | Evidence | Use |
|---|---|---|---|
| `--action` | `#0050D8` | Top blue in 5 independent references | Links, CTAs, active states, "Explore →" |
| `--action-deep` | `#0040B8` | cure-uw-03 | Hover/pressed |
| `--ink` | `#0A1050` | scanner ref headline + dark button (`#081058`) | Headlines, primary buttons on light |
| `--surface-dark` | `#0A1020` | resin + cure heroes (`#101828`, `#081828`) | Cinematic product heroes |
| `--surface` | `#FFFFFF` | dominant across all refs | Page background |
| `--surface-tint` | `#F5F8FF` | card and section fills | Cards, alternating sections |
| `--gold` | `#F0B838` | scanner ref star ratings | Ratings only |

Light-dominant, not dark-dominant. Dark is a **tool for product drama** (the resin lineup
hero, the cure machine), not the default page background the brief implied.

## Product-family accents — extracted from the logo files (2026-07-25)

The three logo PDFs are the same wordmark with **a different colored X per product family**.
ODYX already had a family accent system; nobody had opened the files.

| Family | Accent | Hue | Covers |
|---|---|---|---|
| Scanners | `#3A9C96` | 176° | **SCAN** — the S1 |
| Digital Printing | `#F5761E` | 25° | **PRINT · CURE** — P1-26, HALOT, Cure, UW-03, resins |
| Masterbrand swoosh | `#06A5DE` | 196° | Ecosystem / About / footer only |
| Logo ink | `#231F20` | — | Not pure black |

**This is where the brief's orange belongs.** `#FF8400` wasn't wrong, it was misfiled — orange at
hue 25° is the Digital Printing family's own logo color, promoted to masterbrand primary by
mistake. The Prosthetics accent below (`#F09040`, hue 24°) and the P1-26's UV hood (`#F06000`,
hue 24°) land in the same hue family from independent sources.

**None of the three passes 4.5:1 on white** (2.82 / 2.80 / 3.29). They are fills, rules and icon
glyphs on light — and text-safe only on `#0A1020`. Full contrast table, the two-axis rule, and
the open `#0050D8`-vs-`#06A5DE` question: [logo-colors.md](logo-colors.md).

## Category accent system — the answer to "all screens look the same"

The solutions reference assigns each clinical category its own color. This is the most
valuable thing in the reference set: it is a ready-made mechanism for making pages feel
distinct while staying one system.

| Category | Hex | Hue |
|---|---|---|
| Restorative | `#8048D8` | violet 264° |
| Implant | `#4070F0` | blue 228° |
| Orthodontics | `#48B0A0` | teal 168° |
| Prosthetics | `#F09040` | orange 24° |
| Clinical Cases | ~`#D04858` | crimson — approximate, isolate by eyedropper |

The resin range extends the same idea through **lighting rather than flat color**: each
bottle is shot on its own colored gradient (ceramic = amber, temporary = violet, surgical =
teal, model = blue, crown & bridge = bronze). Same system, photographic expression.

---

## What the references already solve

These are not mood boards — they are near-complete page designs, and they answer four of the
six complaints on their own:

- **Complaint 2 (screens look alike):** the scanner page (light, airy, icon-led), the printer
  page (light with spec tables and an ROI calculator), and the resin page (dark cinematic
  hero, then a light range grid) are visibly different archetypes.
- **Complaint 3 (no clear design per page):** each has its own hero treatment and section rhythm.
- **Complaint 5 (sections not connected):** the printer reference contains a **"Compatible
  with ODYX Ecosystem"** strip — scanner → printer → resins → cure, joined by dotted
  connectors. That is the connected-workflow spine, already drawn. Systematize it and put it
  on every product page.
- **Complaint 6 (boring):** before → printed → final restoration case flows, named dentist
  reviews with stars, an ROI calculator, embedded video.

Recurring product-page skeleton across the references:
`hero → feature chips → why → video → specs table → applications → workflow strip → ecosystem strip → clinical cases → reviews`

---

## The gap nobody has covered

**There is no homepage reference.** The client's loudest complaint — "a lot of boxes in the
home screen" — is the one page they gave us no direction for. Product and solution pages,
which they complained about less, are the ones fully specified.

So: product/solution pages are largely a **systematization** job. The homepage is a genuine
**design** job, and it carries the most risk in Phase 4. Budget accordingly.

> **Corrected 2026-07-25 — this is half right, and the false half is the useful half.** The client
> gave no homepage *image*, but they did give a homepage *edit list*: the 37-item review is
> overwhelmingly homepage, and items 8, 11, 16, 26, 31, 34 and 37 are instructions about section
> **order, count, adjacency and form**. So the roster and order come from the client; only the
> section **form** is ours to source. That is a smaller and much better-defined job than "no
> direction." → [reference-decode.md](reference-decode.md) §7.1 and the borrow map in
> [competitive-analysis.md](competitive-analysis.md) §7.

## Tension to watch
The references are themselves card-heavy. The client complained about boxes. The difference
that makes them work is **varied card size, content type, and rhythm** — not uniform grids.
When applying these to the homepage, keep the variety and drop the uniformity.

## Typography — ✅ Tajawal (approved 2026-07-25)

```css
--font-sans: "Tajawal", -apple-system, system-ui, sans-serif;
```

Free (OFL), Latin + Arabic from one designer. **No 600 weight** — use 400 / 500 / 700.
Full scale, Arabic/RTL rules, and the Chinese gap in
[typography-analysis.md](typography-analysis.md).

Three rules that are correctness rather than taste, repeated here because they're easy to miss:
- **No `letter-spacing` on Arabic** — it breaks the cursive joins.
- **No `text-transform: uppercase` on Arabic** — it has no case; use weight + accent color.
- **No italic** — Tajawal has none; browsers fake it badly.

## Resolved
- **Logo lockup: `ODYX`, all caps.** The "ODyx S1" casing in the intraoral scanner reference
  is an error. If that image is ever shown to the client, flag it.
