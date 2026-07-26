---
screen: 039-resins
section: Products
page: Resins
tier: Detail            # Landing | Hub | Detail | Utility
workflow_step: PRINT
audience: Dentists + dental labs
v1_status: live
live_url: https://odyx-fe-3.vercel.app/products/Resin
spec_status: drafted          # scaffold | drafted | reviewed | approved
owner: reksols / Khaled
---

# 039 · Resins

> Scaffolded from the sitemap xlsx. Everything under **Client input** is the client's, verbatim —
> quote it, don't paraphrase it away. Everything marked TODO is yours to decide and to justify.

## 1. Purpose
The range page for all five ODYX resin lines: it answers **"which resin for which clinical job?"**
in one visit and routes each line to its own detail page — no other screen compares the lines or
carries the range-level data-sheet library.

## 2. Client input (verbatim — do not rewrite)

**Client comment (`Remaining work (5 July)`):**
- _(none)_

**From the 37-item review, mapped to this screen:**
- **#23** — "Resign is plural, "Resigns" is invalid"

**Description (client):** Product family page for ODYX dental resins.

**Proposed content (client):** Resin categories, indications, compatibility, handling, data sheets and safety documents.

**Inner links (client):** Types / Applications / Data Sheets/ Downloads

**Client notes:** _(none)_

**Responsibility (client):** Scientific Team

**Client design references (outrank everything below):** `all-resign.jpeg` (the range page) plus
five per-line pages — `ceremic-crown-resign.jpeg`, `crown-and-bridge-resign.jpeg`,
`model-resign.jpeg`, `surcgical-guide-resign-pro.jpeg`, `temp-restro-resign.jpeg` — all in
`knowledge_base/resources/client-design-refrence/product-design-refrences/`.
⚠️ The spec numbers **inside** those mockups are AI-fabricated (e.g. "Terolle Strength", flexural
values contradicting the catalog glossary) and the hardware names are garbled ("UV-02", "P1-36").
Decode the *structure*; take every *fact* from `docs/products.md`.

<details><summary>reksols' own gap analysis (not client-authored)</summary>

- **v1 status:** live
- **Live URL:** https://odyx-fe-3.vercel.app/products/Resin
- **Mapping notes:** —
- **SprintRay reference:** https://sprintray.com/dental-3d-printing-materials/ , https://sprintray.com/sprintray-open-certified-resin-system/
  — our benchmark, a hypothesis to pressure-test. Never present it to ODYX as their idea.
  (Pressure-tested 2026-07-26: the open-resin-system URL resolves to a support-KB article, not a
  marketing page. Formlabs' materials library is the stronger benchmark for this screen — see
  `content.md` §10.)
</details>

## 3. Which complaint does this screen answer?

- [ ] 1 · No identity
- [x] 2 · Every screen looks the same
- [x] 3 · No clear design per page
- [ ] 4 · Too many boxes on the homepage
- [x] 5 · Sections aren't connected
- [x] 6 · Boring for doctors to explore

**How this screen answers them:**
- **#2 / #3** — this is the one Products page whose subject is a *set*, so it is the page that
  earns the dark full-bleed lineup hero (MASTER §6: "dark is what a lineup gets"). Its five
  per-line gradient environments come straight from the client's range reference. No other
  product page looks like this, by rule.
- **#5** — the resin page carries the workflow *on the page*: a PRINT-step module that shows what
  happens to a printed part next (wash & cure, with real per-application cure times from the
  catalog), and workflow sentences that hand off to 037 Curing Machines. No competitor does this
  (research note, `content.md` §10).
- **#6** — the comparison section is built on the catalog's own properties glossary (p24–p26):
  every spec teaches what it means clinically instead of asserting a number. "A spec table that
  teaches" is the direct answer to "boring for doctors to explore."

## 4. Page tier and archetype
**Tier:** Detail — confirmed at Checkpoint A, with one nuance: after the range + 5 child-pages
decision, 039 behaves as a **range hub** (it routes) with a Detail-grade hero (it stages the
lineup). Density and rhythm follow Detail; the routing job means every lineup card must carry a
real "Explore" path to its child page.

**Archetype:** **Range lineup** — new, and justified: the reference set itself singles this page
out (dark + full-bleed appear on exactly two of thirteen references, both *set* pages). The five
child pages reuse the existing **product Detail** skeleton (hero → chips → description → why →
applications → trust → spec table → post-processing → CTA), which the client's five per-line
references and the Formlabs single-resin page independently agree on.

## 5. Sections on this screen

| # | Section | Form | Job (what the user gets) | Source of truth |
|---|---|---|---|---|
| 1 | Range hero — five-bottle lineup | Full-bleed, dark `#0A1020` | Instantly reads "this is the materials system", not another device page. H1 + client's headline + 4 non-regulatory trust chips | Client ref `all-resign.jpeg`; MASTER §6 dark-lineup rule |
| 2 | Where resin sits in the workflow | Stepper band (inline spine, PRINT active) | Sees that resin is the material of PRINT, and that a printed part goes on to WASH & CURE — with real cure times one scroll away | CLAUDE.md workflow; products.md p15 |
| 3 | The five lines | 5-up dense grid, each card on its own gradient environment | Picks a lane: indications-first cards ("Ideal for:"), per-line certification stated honestly, Explore → child page | Client ref (gradients); products.md p24–p30, p30 |
| 4 | Which resin for which job | Table (indication matrix + glossary tooltips) | Answers the first real question — crowns / bridges / models / aligners / guides / temporaries mapped across the five lines; every property term explains itself | products.md p24–p26 glossary + line table |
| 5 | The shade system | Split editorial (swatches + printed-part imagery) | Sees A1/A2/A3/BL1/B1/B2 and which two lines carry them | products.md p24–p30 (Ceramic Crown, Temporary Restoration) |
| 6 | Wash & cure settings | Split (content + cure-unit image) | Gets the validated per-application cure times and the reason one box handles all five lines — the cross-sell to 037 | products.md p15, p14–p16 |
| 7 | Documents & certification | Tabs (Data Sheets / Safety) + per-line badge table | Downloads TDS/SDS per line; reads certification per line, never per range | Client proposed content; p30 cert table; docs blocked on Scientific Team |
| 8 | Ecosystem strip + CTA | Full-width strip + CTA block | Scanner → printer → resins → cure with dotted connectors; one primary CTA: Request a Demo | MASTER §6 ecosystem strip; client refs' CTA pair |

Rhythm check: full-bleed dark → band → 5-up grid → table → split → split → tabs → strip. No two
consecutive sections share a column count; one full-bleed per page, earned (rule 3, §4 of MASTER).

## 6. Workflow connection

This screen sits at **PRINT** (material).

```
SCAN → DESIGN → PRINT → WASH & CURE → DELIVER
```

| | |
|---|---|
| **Upstream step** | `046-design` (DESIGN) — the sliced case file decides which material it needs |
| **Downstream step** | `048-cure` (WASH & CURE) — no resin part is finished uncured; section 6 carries the real timings |
| **How the spine appears here** | Inline stepper band (section 2), PRINT active, both neighbours visible and linked; breadcrumb carries Products › Resins |
| **Can a user enter the chain here?** | Yes — resin is a natural search entry ("surgical guide resin"). They land on the lineup, and section 2 orients them into the chain; next hop is either a child line page or 048-cure |

## 7. Cross-sell and product linking

| Relationship | Product / screen | The argument (why a buyer cares) |
|---|---|---|
| **Requires** (won't work without) | 036 printers (P1-26) | Resin is inert without a printer; the P1-26's small tank + platform option (60×60×100 mm) exists specifically for crowns, bridges and veneers — the jobs these resins do (p7) |
| **Pairs with** (better together) | 037 ODYX Cure | Triple wavelength (365/385/405 nm, selectable) is what lets **one** box cure a range of resins properly — and the per-application timings are published (p15–p16). Biocompatibility claims live here on the resin page, not on the cure page (p14) |
| **Completes the workflow** (next step's hardware) | 037 UW-03 | A printed part is washed in IPA before it cures; the UW-03 is that bench — wash-on-plate keeps hands away from uncured resin, the argument that lands with lab techs (p16–p23) |
| **Upgrade / alternative** | — | No intra-range upgrade path; the lines are jobs, not tiers. (Ceramic Crown vs Temporary Restoration overlap is a client question — §13) |
| **Consumable pull-through** | This page **is** the consumable | Resins are the repeat purchase of the whole ecosystem; every hardware page should link back here |

**Ecosystem strip:** systematized from the printer reference — scanner → printer → resins → cure,
dotted connectors, resins node active on this screen.

## 8. Conversion path

| | |
|---|---|
| **Primary CTA** | **Request a Demo** — one per screen, `--action` blue, both hero and closing block |
| **Secondary CTA** | Download Data Sheets (anchors to section 7) |
| **Lead capture** | Request a Demo form; distributor path via footer/nav, not this page's job |
| **Objection handled before the CTA** | Safety/serviceability: per-line certification stated honestly (section 7) and validated wash & cure settings (section 6) — the "can I trust an unfamiliar brand's chemistry" objection |
| **Dentist path vs lab path** | Dentist: indications-first cards + shade system + same-day framing (sections 3–5). Lab: throughput framing in copy, wash-on-plate safety, batch consistency (sections 4, 6). See `content.md` §1 |

## 9. Link map (feeds content.md's internal linking and SEO)

- **Links in:** 033 Products hub · 036 3D Printers ("materials" cross-link) · 037 Curing Machines
  (cure-parameters table names the resins) · 047 Print workflow page · homepage ecosystem strip
- **Links out:** 5 × per-line child pages (new — §13) · 037 Curing Machines (section 6) ·
  036 3D Printers (section 2 stepper) · 048 Cure workflow page
- **Deep links / anchors:** `#lines` (section 3) · `#compare` (section 4) · `#shades` ·
  `#wash-cure` · `#downloads` — these carry the client's inner links "Types / Applications /
  Data Sheets / Downloads"

## 10. States and edge cases
- Empty / no data: data-sheet tabs render a "documents on request" contact path until the
  Scientific Team supplies files — never an empty tab
- Loading: lineup card images lazy-load below fold; reserve aspect boxes (CLS < 0.1)
- Error: download failures fall back to a contact-us mailto with the document name prefilled
- Logged-in vs anonymous: none — this page has no gated state
- Not-available-in-region: certification differs by market; per-line badges are the honest layer.
  If regional availability data ever arrives, it attaches per line, Formlabs-style
- 404 guard: v1 lives at `/products/Resin` (singular, capital R) — redirect old slug to the new one

## 11. RTL and localization
- Layout mirroring: grid and stepper mirror; **the spine reverses direction in RTL**; product
  photography does not mirror; bottle renders keep Latin wordmarks
- Arabic type rules: no letter-spacing, no uppercase, no italic; eyebrow style = weight 700 + accent
- Spec numerals stay Western (0–9) in all locales (MASTER §3)
- Text expansion: FR ~+20% — the 5-up lineup cards and table headers are the components at risk;
  card titles must wrap to two lines without breaking equal heights
- Untranslatable: line names (Latin), shade codes (A1…B2), unit strings (MPa, °C, µm)

## 12. Responsive
- Mobile (<768): hero keeps the lineup as a horizontal swipe of bottles; 5-up grid becomes a
  vertical stack ordered by most-searched line (surgical guide first); the comparison table
  collapses to a per-line accordion of the same rows — the matrix never side-scrolls the page
- Tablet: lineup 2+3 rows; comparison table scrolls inside its own container
- Not carried to mobile: the gradient environments simplify to flat tinted cards (perf), and the
  stepper pin is replaced by a static strip — pinning on mobile is wrong (MASTER §5)

## 13. Open questions / blocked on
1. **Per-line technical data** — the child pages' spec tables and this page's TDS/SDS downloads
   need real numbers/documents from the **Scientific Team** (client's own responsibility column).
   The reference mockups' numbers are fabricated and cannot ship.
2. **CE/FDA status refresh** (products.md Q1) — has certification landed for Temporary Restoration
   and Surgical Guide Pro since 18 July? Until answered, section 7 states it per line.
3. **Canonical line names** — catalog says *Ortho Model 2.0 / Surgical Guide Pro / Temporary
   Restoration*; the client's reference bottles say *Model Resin / Surgical Guide Resin Pro /
   Temporary Resin*. Copy below uses catalog names + "Resin"; confirm with client.
   Review #23 ("Resign is plural, "Resigns" is invalid") is treated as a spelling correction —
   the page uses **Resins**, and "Resign/Resigns" must never appear. Confirm that reading.
4. **Ceramic Crown vs Temporary Restoration** (products.md Q8) — when does a clinician choose
   which? Section 4 needs the answer; until then the matrix shows both without adjudicating.
5. **Sitemap addition** — the range + 5 child pages structure (Checkpoint A decision, 2026-07-26)
   adds five screens the xlsx doesn't have. Flag to ODYX before the child pages are authored.
6. **Printer–resin compatibility wording** — the references claim "385–405 nm compatibility";
   the catalog never states resin wavelength. Blocked on Scientific Team; copy avoids the claim.
7. **Checkpoint A record (2026-07-26):** the 16 PNGs in `assets/` are reksols' own AI
   explorations — art-direction reference only; final imagery regenerates through the
   nano-banana → promote_asset.py pipeline. Competitor set confirmed as the default four.
