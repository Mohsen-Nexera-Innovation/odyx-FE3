# ODYX Knowledge Base

Client-supplied materials and derived research for the ODYX website. **Read the relevant
files here before designing or implementing any screen.** Copied from the `odyx-am-agent`
research repo on 2026-07-25.

## Authority order (highest first)

1. **Client design references** — [design-references/](design-references/) (13 images).
   These outrank every competitor pattern and every generated suggestion.
2. **Approved design tokens** — [docs/design-tokens-draft.md](docs/design-tokens-draft.md).
   Blue `#0050D8` on white (approved 2026-07-25), Tajawal typography, family accents
   (Scanners `#3A9C96`, Digital Printing `#F5761E`, masterbrand `#06A5DE`), light-dominant
   surfaces with dark `#0A1020` reserved for cinematic product heroes.
3. **The client brief** — [docs/brief.md](docs/brief.md). The connected workflow
   (SCAN → DESIGN → PRINT → WASH & CURE → DELIVER, five steps) is the core idea the site
   must communicate. Note: its §5 orange-on-navy palette is superseded by the tokens above.
4. **Product facts** — [ODYX Products - 18.7.26.pdf](ODYX%20Products%20-%2018.7.26.pdf).
   The claims source of truth. **Never invent a spec** — every number on the site must
   trace to this catalog. Certification is stated per resin line, never range-wide
   (Temporary Restoration and Surgical Guide Pro carry no CE and no FDA).
5. **Screen specs** — [screens/](screens/) (036 3D Printers: content, screen details,
   sub-design-system). Section-by-section copy and layout decisions for the screen.
6. **Competitive research** — [docs/competitive-analysis.md](docs/competitive-analysis.md).
   Benchmark verdict: Formlabs = visual benchmark, SprintRay = coverage/IA benchmark.
   The refusals list matters as much as the takes.
7. **Generated design system** — [../design-system/odyx/](../design-system/odyx/)
   (ui-ux-pro-max output). Supplementary only; its warning block defers to items 1–2.

## Contents

| Path | What it is |
|---|---|
| `design-references/product-design-refrences/` | 11 client mockups: resins landing, 5 resin detail pages, P1-26 + HALOT-X1 printers, S1 scanner, Cure UV-02, UW-03 |
| `design-references/solution-design-refrences/` | 2 clinical-application mockups (category accent system source) |
| `logos/` | Brand + family logo PDFs with official hex values per product family |
| `product-photos/` | Real studio photography (⚠️ the printer photo does not fully match the P1-26 mockup — unresolved, see screens/036 §13 #11) |
| `product-photos/p1-26/` | ODYX P1-26 image set (added 2026-07-25): `p1-26-hero-annotated.png` (dental-shelf hero with callouts), `p1-26-front-packshot.png` (straight-on packshot — ⚠️ the checkerboard "transparency" is baked into the pixels, alpha is fully opaque; cut out the background before compositing), `p1-26-detail-sheet.png` (4-up annotated sheet: accuracy, rails, platform close-up, tank/ACF), `p1-26-feature-icons-sheet.png` (12-tile core-feature icon grid), `p1-26-lifestyle-front.jpg` + `p1-26-lifestyle-angle.jpg` (3580×4800 wood-shelf scenes — ⚠️ backgrounds show FDM filament spools, which don't fit a resin-printer context; crop or judge before shipping). ⚠️ AI-generated renders. Annotation copy verified against the catalog on 2026-07-25 (18 µm X-Y, 6.8" 9k LCD, 60 mm/h, 153×77×160 mm, 2000 h screen, third-gen 405nm >90% uniformity, dual linear rails + T-screw, 221 mm machine depth, optional 60×60 mm tank, ACF film, WiFi/USB) — but the ~896px sheets are reference quality; rebuild annotations natively for production |
| `product-photos/halot-x1/` | HALOT-X1 image set (added 2026-07-25): `halot-x1-lifestyle-sheet.png` (hero, in-print, model close-ups, ecosystem, printed parts) and `halot-x1-tech-features-sheet.png` (light source, Z-axis, RFID/AFU, build volume). Individual crops in `tiles/` — `lifestyle-00-hero-full.png` is the full-width hero strip. ⚠️ AI-generated renders, 864px source width — reference/placeholder quality, regenerate at higher resolution before production use. ⚠️ The tech sheet's captions are demo copy — do NOT ship verbatim: they contain typos ("10.1-induch") and OEM names ("Creality Cloud") that `products.md` §3 says not to publish |
| `OPEN-QUESTIONS.md` | Consolidated register of everything blocked on the client (or on us), across screens — check it before shipping a section it lists |
| `docs/` | Brief transcription, approved tokens, competitive analysis |
| `screens/036-3d-printers/` | Full spec for the 3D printers screen (copy, sections, RTL, open questions) |
| `ODYX Products - 18.7.26.pdf` | Product catalog — all specs and claims |

Also in the repo root: `Websites Overview - ODYX Web Preparation.pdf` (client's analysis
of competitor intraoral-scanner websites: 3Shape, Align/iTero).
