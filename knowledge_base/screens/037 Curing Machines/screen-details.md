---
screen: 037-curing-machines
section: Products
page: Curing Machines
tier: Detail            # Landing | Hub | Detail | Utility
workflow_step: WASH & CURE
audience: Dentists + dental labs
v1_status: live
live_url: https://odyx-fe-3.vercel.app/products/curing-machines
spec_status: drafted          # scaffold | drafted | reviewed | approved
owner: reksols / Khaled
---

# 037 · Curing Machines → **ODYX Cure UV-02**

> **Decision 2026-07-26 (client, confirmed via Khaled):** single-product page for the
> **ODYX Cure UV-02** (catalog p14–16). The UW-03 wash-and-cure unit is **not covered on the
> website** — neglect everything UW-03/UV-03. This supersedes the same-day earlier draft that
> merged under the UW-03; resolves products.md open question 3.
>
> **Design consequence to hold honestly:** the workflow step is WASH & CURE, and the UV-02
> cures — it does not wash. Washing is presented as the bench step that precedes curing (IPA
> bath), with no product claim attached. See §13.3.

## 1. Purpose
The WASH & CURE chapter of the ODYX story: the precision cure box whose triple-wavelength light
lets one machine finish every resin in the ODYX range — the step where a printed part becomes a
restoration.

## 2. Client input (verbatim — do not rewrite)

**Client comment (`Remaining work (5 July)`):**
- _(none)_

**Description (client):** Product family page for ODYX curing units.

**Proposed content (client):** Why curing matters, models, compatible resins, technical specs and workflow role.

**Inner links (client):** Overview / Models / Specs / Downloads

**Client notes:** _(none)_

**Responsibility (client):** Scientific Team

**Client design reference:** `cure.jpeg` — a near-complete **ODYX CURE UV-02** page design and
now the governing reference: hero ("Powerful Curing. Perfect Results."), 5 feature chips, "Why"
checklist + video slot, spec table (rows drawn, values blank — we fill from catalog p14–16),
"What Can You Cure?" tiles, workflow strip, ROI, ecosystem strip, clinical cases, reviews.
(`cure-uw-03.jpeg` is retired from this screen — UW-03 is off the website.)

**Global review items landing here:** #22 (model name displayed — the H1 is "ODYX Cure UV-02",
exactly as the client's reference names it). #20 (no descriptions under section headers).
#21 (unified product presentation — same product-hero grammar as 034/036/039).

<details><summary>reksols' own gap analysis (not client-authored)</summary>

- **v1 status:** live — v1 already featured the Cure UV-02 (right product), but with specs that
  contradict the catalog: "385+405 nm" vs 365/385/405 (p14), "110–240 V" vs 100–240 V (p14), and
  "≤45 °C regulated heat" with no catalog source. Catalog wins on every number.
- **Live URL:** https://odyx-fe-3.vercel.app/products/curing-machines
- **SprintRay reference:** https://sprintray.com/procure-2-advanced-dental-3d-printing-post-curing/ ,
  https://sprintray.com/nanocure-dental-curing/ — our benchmark, a hypothesis to pressure-test.
  Never present it to ODYX as their idea. NanoCure's per-appliance cure-time cards map directly
  onto our p15 table — and ours is catalog-sourced.
</details>

## 3. Which complaint does this screen answer?

- [ ] 1 · No identity
- [x] 2 · Every screen looks the same
- [x] 3 · No clear design per page
- [ ] 4 · Too many boxes on the homepage
- [x] 5 · Sections aren't connected
- [x] 6 · Boring for doctors to explore

**How this screen answers them:**
- **2 + 3:** the only Products page with a **dark cinematic chamber sequence** — washed (violet)
  to cured (orange glow), the mood set by the on-file reference
  (`knowledge_base/resources/mood-references/037-odyx-cure-chamber-glow.png`).
- **5:** the page receives the part from PRINT and hands it to DELIVER in copy and in the spine
  (WASH & CURE active); the ecosystem strip reuses the client's own component.
- **6:** "Why washing & curing matters" teaches the chemistry; the per-application cure-time
  cards (p15) turn a spec table into something a dentist actually uses.

## 4. Page tier and archetype

**Tier:** Detail — confirmed at Checkpoint A. Product hero, standard density, dense in specs.

**Archetype:** **Product Detail (device)** — shared grammar with 034/036/039 (review #21). One
earned deviation: the two-act dark chamber sequence (§5.3). Cure density measured "standard"
(0.079) in the reference decode.

## 5. Sections on this screen

| # | Section | Form | Job (what the user gets) | Source of truth |
|---|---|---|---|---|
| 1 | Hero — ODYX Cure UV-02 | Split (copy left, device photo right), light | Model name as H1 (review #22 + the client's reference), client's tagline "Powerful Curing. Perfect Results.", Request a Demo + Download Datasheet | `cure.jpeg`; real device pixels only (⚠ §13.1 — confirm photo is the UV-02) |
| 2 | Why washing & curing matters | Editorial, two-column prose + inline print→wash→cure mini-timeline | Teaches why a printed part isn't finished: IPA wash strips uncured resin (bench step), UV completes polymerization (the UV-02's job) | Client's "Why curing matters"; catalog p14; honest-washing rule §13.3 |
| 3 | Washed. Then cured. | **Full-bleed dark sticky-scroll** — WASH scene → CURE scene | The signature: cool violet wash (the step before) resolves into the orange glow of the UV-02's 360° chamber. Curing claims attach to the product; washing stays a workflow step | Catalog p14 (360° coverage); mood ref for grade |
| 4 | Feature chips | Chip row ×5 | 360° Uniform Curing · Triple-Wavelength UV (365/385/405) · Adjustable Intensity & Timer · 8 Memory Presets · Safety by Design | `cure.jpeg` chip row; values catalog p14. ("Smart Heating" held — §13.2) |
| 5 | Cure times by application | Card row (NanoCure pattern, ours catalog-sourced) + mechanism note | Models ~2 min → dentures ~15 min, "may vary by resin type" — and *why* one box does it: three wavelengths, selectable | Catalog p15; triple-wavelength argument p14 |
| 6 | What can you cure | Tile grid 6-up | Surgical guides, crowns & bridges, models, splints & night guards, temporary restorations, dentures — routes to Solutions | `cure.jpeg` tiles; per-application timings p15 |
| 7 | Technical specifications | Table (dense, 2-col collapsing) + Downloads row | The client's drawn spec table, filled from p14: chamber, wavelengths, intensity, timer, presets, coverage, voltage, body, safety | Catalog p14 |
| 8 | Workflow position | Full-bleed spine band — 5 steps, WASH & CURE active | Receives from PRINT, hands to DELIVER; wash acknowledged as the bench step inside this chapter | CLAUDE.md 5-step sequence |
| 9 | Ecosystem strip | Horizontal strip, dotted connectors | S1 → P1-26 → resins → **ODYX Cure UV-02** | MASTER §6; `cure.jpeg` ecosystem row |
| 10 | Results + CTA | Gallery row (placeholder) + full-width CTA | Cured-part results (⚠ awaiting real cases, review #32) closing into Request a Demo | `cure.jpeg` cases row; review #32 |

Rhythm check: split → editorial → full-bleed dark → chip row → card row → tiles 6-up → table →
full-bleed tint → strip → gallery+CTA. No two consecutive sections share a column count; boxes
appear at two different counts only.

## 6. Workflow connection

This screen sits at **WASH & CURE** — the fourth of five steps.

```
SCAN → DESIGN → PRINT → WASH & CURE → DELIVER
```

| | |
|---|---|
| **Upstream step** | `047-print` (PRINT — P1-26, resins) |
| **Downstream step** | `050-deliver` (DELIVER — same-day restoration) |
| **How the spine appears here** | Section 8 spine band, WASH & CURE active in family orange; section 2's mini-timeline zooms into this step (print → wash → cure) |
| **Can a user enter the chain here?** | Yes — "dental curing machine" searches land here. Section 2 orients (step 4 of 5); section 8 routes upstream and downstream |

> Scaffold correction retained: downstream is DELIVER — FINISH was dropped 2026-07-25.

## 7. Cross-sell and product linking

| Relationship | Product / screen | The argument (why a buyer cares) |
|---|---|---|
| **Requires** (won't work without) | 036 3D Printers (P1-26) | No printed part is finished at the printer — it must be washed and post-cured before it touches a patient. The UV-02 is the finish line of every print job |
| **Pairs with** (better together) | 039 Resins | The p15 cure table names the resin applications by type — castable ~3 min, temporary crowns ~10, dentures ~15. Triple wavelength is what lets one box serve all five lines. Biocompatibility "depends entirely on the resin you are using" (p14), so resin choice and cure settings are one decision |
| **Completes the workflow** (next step) | 050 Deliver / 048 Cure workflow screen | Out of the UV-02 in 1–5 minutes typical (p14), the restoration is ready to seat — the same-day promise made concrete |
| **Upgrade / alternative** | — | None. One curing product on the website (client decision 2026-07-26) |
| **Consumable pull-through** | IPA (91–99%) for the wash step | Washing runs on isopropyl alcohol at the bench; state the requirement in section 2, no store link |

**Ecosystem strip:** master component (scanner → printer → resins → cure box), not redrawn here.

## 8. Conversion path

| | |
|---|---|
| **Primary CTA** | **Request a Demo** — the client's own button in the reference |
| **Secondary CTA** | Download Datasheet (PDF) — the spec-checking dentist between patients |
| **Lead capture** | Request a Demo form; distributor path via footer |
| **Objection handled before the CTA** | "Do I need a dedicated cure box — can't I leave parts in sunlight?" — section 2: incomplete polymerization = weak, inaccurate, potentially unsafe parts; section 5: validated per-application timings |
| **Dentist path vs lab path** | Dentist: 1–5 minute typical cures keep same-day real; 8 presets mean no guesswork between patients. Lab: 365/385/405 selectable + 5–100% intensity handles every resin a lab runs; 180 × 120 mm chamber batches small parts. Section 5 carries the dentist story; sections 4 + 7 carry the lab numbers |

## 9. Link map (feeds content.md's internal linking and SEO)

- **Links in:** 033 Products hub · 036 3D Printers ("what happens after printing") · 039 Resins
  (cure guidance) · 048 Cure workflow screen · 011 homepage featured products · 044 Guided
  Workflows hub
- **Links out:** 036 3D Printers (upstream) · 039 Resins (pairing) · 048 Cure workflow screen ·
  019 Request a Demo (conversion)
- **Deep links / anchors:** `#specs` · `#downloads` · `#applications` · `#cure-times` · `#workflow`

## 10. States and edge cases
- Empty / no data: results gallery (§5.10) ships hidden until real case imagery exists — never placeholder stock
- Loading: hero device image priority-loaded; chamber-sequence media lazy-loads with reserved space (CLS < 0.1)
- Error: datasheet link falls back to contact form if PDF missing
- Logged-in vs anonymous: none — public marketing page
- Not-available-in-region: none known; distributor CTA handles market coverage

## 11. RTL and localization
- Layout and spine direction mirror in RTL; device photography does **not** mirror; spec numerals
  stay Western (0–9) and LTR inside RTL text
- Arabic type rules: no letter-spacing, no uppercase, no italic; eyebrow differentiates by
  weight 700 + accent
- Text expansion: FR ~+20% — feature-chip labels and spine step labels are the break risks
- Untranslatable: "ODYX Cure UV-02" stays Latin in all locales; units (mm, nm, min, V) stay Latin/SI

## 12. Responsive
- Mobile (<768): hero stacks copy-over-image; sticky-scroll chamber sequence becomes a stepped,
  tap-advanced two-act sequence (no pinning on mobile, MASTER §5); cure-time cards become a
  horizontal snap scroller; spec table collapses to stacked label/value pairs; spine band scrolls
  in its own container
- Tablet: cure-time cards 2-up; hero stays split
- Not carried to mobile: the sticky pin and parallax grade shift — the two acts remain as
  discrete frames; nothing informational is lost

## 13. Open questions / blocked on

1. **Is the photographed white unit the ODYX Cure UV-02?** The only real device photo
   (`WhatsApp Image 2026-06-05 at 00.53.17.jpeg`, white box, amber top window, no model number)
   matches neither the reference's front-window cube nor anything labeled. The promoted hero is
   an edit of it. **Hero ships uncaptioned until the client confirms**; if it is not the UV-02,
   the hero becomes a photography gap and the ask is UV-02 shots on white.
2. **"Smart Heating"** — in the client's reference chips and v1 ("≤45 °C regulated"), absent from
   catalog p14–16. Confirm the feature and its numbers, or it stays off the page.
3. **WASH & CURE with no wash product.** The UW-03 is off the website (client, 2026-07-26), so
   the step's washing half is presented as a bench step (IPA), claim-free. Confirm the client is
   comfortable with this treatment — the alternative is renaming the step, which is theirs to call.
4. **Real clinical results** for the gallery (review #32) — client to supply; ships hidden until then.
5. Already logged in `docs/products.md`: pricing (Q7), warranty (Q9). Q3 (UW-03 vs Cure) —
   **answered 2026-07-26: website covers the ODYX Cure UV-02 only.**
6. **Nav label** — "Curing Machines" (plural) in the sitemap vs one product. Propose "Curing
   Machine" or the model name itself; client to pick.
