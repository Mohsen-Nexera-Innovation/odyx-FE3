---
screen: 036-3d-printers
section: Products
page: 3D Printers
tier: Detail            # Landing | Hub | Detail | Utility
workflow_step: PRINT
audience: Dentists + dental labs
v1_status: live
live_url: https://odyx-fe-3.vercel.app/products/3d-printers
spec_status: drafted          # scaffold | drafted | reviewed | approved
owner: TODO
---

# 036 · 3D Printers

> Scaffolded from the sitemap xlsx. Everything under **Client input** is the client's, verbatim —
> quote it, don't paraphrase it away. Everything marked TODO is yours to decide and to justify.

## 1. Purpose

The one page that turns a file into an object — it makes the PRINT step buyable by sorting two
very different printers by the **job a buyer is printing**, not by whose spec sheet is longer.

## 2. Client input (verbatim — do not rewrite)

**Client comment (`Remaining work (5 July)`):**
- _(none)_

**Description (client):** Product family page for ODYX dental printers.

**Proposed content (client):** Benefits, models, applications, technical specifications, workflow integration and demo CTA.

**Inner links (client):** Overview / Models / Specs / Downloads

**Client notes:** _(none)_

**Responsibility (client):** Scientific Team

### Design references (client-supplied — these outrank every competitor)

Two of the 13 references are printer pages. More of this screen is client-specified than any other
product page in the sitemap.

| Reference | What it already decides |
|---|---|
| [`printer-odyx-p1-26.jpeg`](../../../resources/client-design-refrence/product-design-refrences/printer-odyx-p1-26.jpeg) | Light hero, eyebrow → two-line display headline → lede → dual CTA (`Request Demo` solid + `Download Brochure ↓` outlined) · feature-chip row under the hero · "Why P1-26?" checklist paired with a video panel · **empty spec table** handed to us to fill · applications shown as photographed printed parts, not icons · workflow strip · ecosystem strip with dotted connectors · clinical cases `before → printed → final` · reviews with gold stars · ROI calculator |
| [`printer-halot-x1.jpeg`](../../../resources/client-design-refrence/product-design-refrences/printer-halot-x1.jpeg) | Blue rule + label section headers · applications grid · 8 technical-feature cards (AFU, ACF, RFID, open material, speed, Z-axis, touchscreen, LCD engine — all corroborated at p11–p13) · resin compatibility row · case gallery · trust bar |

**Two things the P1-26 reference decides that are bigger than this screen:**

1. Its workflow strip reads **Scan → Design → Print → Wash & Cure → Deliver**. Five steps. WASH is
   folded into CURE and FINISH is gone — which is exactly what `products.md` Q4 and Q5 ask.
   **Confirmed by Khaled at Checkpoint A (2026-07-25) as a sitewide decision.** See §13.
2. The `#F5761E` PRINT family accent is not an applied brand color here — it is the P1-26's own
   resin hood. The family color is already in the product photography.

### Review items that land on this screen

None of the 37 are mapped to 036, but four constrain it:

| # | Client comment (verbatim) | Consequence here |
|---|---|---|
| 20 | _"The description of the section headers need to be removed"_ | No sub-line under any section header. Section headers stand alone |
| 21 | _"The way of showing the products is not unified Once it's shown as stand a lone products Once it's shown as group"_ | This page is the **group** case, and it must resolve to the same component language as the standalone product pages |
| 22 | _"In the name of the product, we shouldn't say only Interoral scanner, we should display the name of the model"_ | A page called "3D Printers" must surface **ODYX P1-26** and **HALOT-X1** in the H1 area, the nav dropdown and every card |
| 33 | _"Navigation between sections has a lot of issues (It seems the transition between sections and colors not satisfying him"_ | Section transitions are a design deliverable on this page, not a build detail. §5 varies form deliberately and the light→dark→light sequence is planned, not incidental |

<details><summary>reksols' own gap analysis (not client-authored)</summary>

- **v1 status:** live
- **Live URL:** https://odyx-fe-3.vercel.app/products/3d-printers
- **Mapping notes:** —
- **SprintRay reference:** https://sprintray.com/dental-3d-printers/ , https://sprintray.com/pro2-dental-3d-printer/ , https://sprintray.com/pro-s-dental-3d-printer/
  — our benchmark, a hypothesis to pressure-test. Never present it to ODYX as their idea.

**What v1 actually ships** — [`app/src/content/products.ts:171-227`](../../../../app/src/content/products.ts):
one `[slug]` template, `models: [P1-26]`. The HALOT does not exist on the page. Four of the five
published specs are unsourced or wrong against the catalog: `"25-100 microns"` (catalog: 0.01–0.1 mm),
`"LCD / DLP"` (it is LCD), `"Build volume: See datasheet"` (the catalog has it: 153 × 77 × 160 mm),
and a `25µm` headline stat that corresponds to nothing (XY accuracy is 18 µm). **None of it survives.**
</details>

## 3. Which complaint does this screen answer?

- [ ] 1 · No identity
- [x] 2 · Every screen looks the same
- [x] 3 · No clear design per page
- [ ] 4 · Too many boxes on the homepage
- [x] 5 · Sections aren't connected
- [x] 6 · Boring for doctors to explore

**How this screen answers them:**

- **2 + 3** — the page has a structural idea no other product page can reuse: **the fork**. Two
  printers that are not two tiers, resolved by an asymmetric split (§5.3) rather than the
  side-by-side comparison every competitor defaults to. The scanner page has one product and no
  fork; the resin page has five and needs a matrix. Same design system, three genuinely different
  shapes.
- **5** — the **Indication Router** (§5.4) is the connected workflow made operable. Pick what you're
  printing and the page resolves printer → resin line → published cure time in one interaction. It
  spans three screens' worth of product in a single component, with every value catalog-sourced.
  A user cannot use this page without meeting the workflow.
- **6** — two devices a dentist would actually stop for: the router above, and the **running-cost
  schedule** (§5.6), which publishes consumable life in hours and layers. No competitor in the set
  publishes theirs; SprintRay attacks LCD printers on exactly this and offers no numbers of its own.

## 4. Page tier and archetype

**Tier:** Detail — **confirmed.** The client's four inner links (`Overview / Models / Specs /
Downloads`) describe one page with anchors, and the sitemap holds one screen. Density runs standard
in the narrative sections and 6–7 in specs, per MASTER §7.

**Archetype:** **Product-family (forked)** — a new archetype, and it earns the exception. The
existing Detail archetype assumes one product per page; this page carries two that must not be
read as a ladder. The catalog is explicit (p13): the HALOT and the P1-26 are *"not two tiers of the
same thing"*, and the HALOT out-specs the flagship on nearly every line while being the narrower
clinical instrument. An archetype that renders them as sibling cards tells the wrong story by
layout alone, before a word is read.

**Reusable by:** 037 Curing Machines (ODYX Cure + UW-03 — the same two-products-one-step problem,
per `products.md` p16 positioning note). That is the second use, so the archetype belongs in
MASTER §6, not in this screen's `sub-design-system.md`. Flagged in §13.

## 5. Sections on this screen

| # | Section | Form | Job (what the user gets) | Source of truth |
|---|---|---|---|---|
| 1 | **Hero — the print step** `#overview` | Split, light. Product + printed arch right, copy left. Feature chips inline below, borderless | Knows within 5 seconds: this is step 3 of 5, there are two printers, and they do different things | Client ref (P1-26) · p1–p5 |
| 2 | **Why print it yourself** | Editorial, two-register split — dentist column / lab column, one shared rule between them | The buying reason, in the buyer's own terms. Not averaged | `content.md` §1 · p5–p6 |
| 3 | **The two printers** `#models` | **Asymmetric split** — P1-26 at full width with hero photography; HALOT-X1 as a narrower, differently-shaped block below it. Deliberately *not* two equal cards | Understands the fork: definitive work vs volume work. Model names, per review #22 | p1–p14 · catalog §2 |
| 4 | **What are you printing?** — the **Indication Router** | Interactive selector, sticky result panel. Full-bleed `--surface-tint` | Picks an indication → gets printer, resin line, and published cure time. The workflow, operable | p13 · p15 · p24–p30 |
| 5 | **Specifications** `#specs` | Table, **tabbed by model — never side by side**. Scrolls in its own container | Full spec sheet for the model they've chosen, at density 6–7 | p1–p14 |
| 6 | **What it costs to keep running** | Horizontal schedule strip — a maintenance timeline, not cards | Consumable life in hours and layers, published. Pre-empts the running-cost objection | p5 · p11 |
| 7 | **What ODYX changed** | Annotated product diagram — four callouts on a single P1-26 image | The honest answer to "is this a rebadge?". Four concrete modifications | p7 |
| 8 | **PRINT, in the workflow** | **Full-bleed `--surface-dark`**, pinned scrub timeline (desktop) / tap-advanced stepper (mobile) | Sees where PRINT sits, both neighbours, and can enter the chain either direction. The one dark section on the page — this is where the family accent gets to speak (6.76:1) | MASTER §5 Tier A · CLAUDE.md |
| 9 | **Works with** | Horizontal chain with dotted connectors — scanner → printer → resins → wash & cure | The cross-sell as an argument, not a carousel. Each node is a real link | Client ref (ecosystem strip) · §7 below |
| 10 | **Proof** ⚠️ | Case flow `before → printed → final`, plus named-clinician review cards | Belief. **Blocked — see §13** | Review #32 · client to supply |
| 11 | **Downloads + demo** `#downloads` | Utility band, light. Compact list + single CTA block | Leaves with the datasheet or a demo booked. **Partly blocked — see §13** | Client inner links |

**Section rhythm** (answering review #33 directly): `light → light-tint → light → tint → light →
light → light → DARK → light → light → light`. One dark section, at §8, positioned so the workflow
is the visual climax of the page rather than a strip at the bottom. Vertical interval alternates
`--space-4xl` / `--space-5xl`; §5 and §6 sit tight together at `--space-3xl` because they are one
argument (what it does / what it costs).

**Boxes appear exactly three times** — the model blocks (§3), the router result panel (§4) and the
review cards (§10). Everything else is separated by rules, ground shifts or whitespace.

## 6. Workflow connection

This screen sits at **PRINT**.

```
SCAN → DESIGN → PRINT → WASH & CURE → DELIVER
```

> ⚠️ **Five steps, not six.** Confirmed at Checkpoint A (2026-07-25): WASH folds into CURE as
> "Wash & Cure" and FINISH is dropped. This follows the client's own P1-26 reference and resolves
> `products.md` Q4 and Q5. **It is a sitewide change** — CLAUDE.md, MASTER §6 and every screen
> carrying the spine still say six. See §13.

| | |
|---|---|
| **Upstream step** | `046-design` (DESIGN) |
| **Downstream step** | `048-cure` (WASH & CURE) |
| **How the spine appears here** | Three ways, escalating. (a) An **eyebrow position marker** in the hero — `STEP 3 OF 5 · PRINT`. (b) The **Indication Router** (§5.4), which is the spine functioning rather than illustrating — it resolves across PRINT and WASH & CURE in one interaction. (c) The **full-bleed dark spine section** (§5.8) with the pinned scrub timeline from MASTER §5 Tier A. Not a strip at the foot of the page |
| **Can a user enter the chain here?** | Yes — this is the most common entry point in the section, because "3D printer" is the highest-intent search term we hold. They land here cold and leave in one of three directions: **back** to `034` (the scan that feeds it, open STL/OBJ so no lock-in), **sideways** to `039` (the resin that determines what it can make), or **forward** to `037`/`048` (a printed part cannot go to a patient uncured). §5.9 makes all three visible without a nav trip |

The spine is the organizing principle, not a section (CLAUDE.md). If this screen can be read
without ever meeting the workflow, the screen is wrong.

## 7. Cross-sell and product linking

| Relationship | Product / screen | The argument (why a buyer cares) |
|---|---|---|
| **Requires** (won't work without) | **Resins** → [039](../039%20Resins/) | A printer is an empty box without resin, and the resin — not the printer — decides what the part is cleared for. Both machines are open-material (p13, p11), so the choice stays the buyer's; the argument for the ODYX lines is that their cure times are published per application (p15) and their certification is stated per line. **Certification is per line, never per range** 🔒 |
| **Pairs with** (better together) | **ODYX Cure** → [037](../037%20Curing%20Machines/) | The part that comes off the plate is not finished — it is washed in IPA, then post-cured. The Cure's three selectable wavelengths (365/385/405 nm, p14) are the mechanism behind the per-application timing table at p15: models ~2 min, guides ~3 min, temporary crowns ~10 min, dentures ~15 min. One box, correctly, across the whole resin range |
| **Completes the workflow** (next step's hardware) | **UW-03** → [037](../037%20Curing%20Machines/) · [048](../../07%20Guided%20Workflows/048%20Cure/) | Washes models **still attached to the build plate** (p20) — less handling, delicate models survive, and hands stay out of uncured resin. That last one is an occupational-safety argument, and it is the one that lands with a lab tech who handles IPA all day |
| **Upgrade / alternative** | **P1-26 ↔ HALOT-X1** (on-page, §5.3–§5.4) | Not an upgrade path — a fork. P1-26 for definitive intraoral work; HALOT-X1 for volume: study and ortho models, splints and night guards, surgical guides, temporary crowns (p13). The HALOT is **not recommended for final restorations, advanced implant surgical guides or full-arch prosthetics** (p13–p14), and the page says so where a buyer will read it, not in a footnote |
| **Consumable pull-through** | ACF release film · resin vat · build platform · LCD screen | Published, not buried: P1-26 screen life 2000 h (p5); HALOT LCD ~3000 h, release film ~30,000 layers, UV lamp ~20,000 h (p11). This is §5.6, and it is the section that answers the running-cost objection before a competitor plants it |
| **Upstream** | **ODYX-S1 scanner** → [034](../034%20Intraoral%20Scanner/) | The S1 exports STL/OBJ to any CAD (p31) and the HALOT reads STL/OBJ from EXOCAD and 3Shape (p11). The workflow is chosen, not enforced — a trust argument for a buyer who fears an ecosystem trap |

**Ecosystem strip:** the client's P1-26 reference already draws this — scanner → printer → resins →
cure, joined by dotted connectors. Systematize it as one component (MASTER §6); do not redraw it
per page.

## 8. Conversion path

| | |
|---|---|
| **Primary CTA** | **Request a demo** → `019`. One per screen. Repeated in the hero and the closing band, same label both times |
| **Secondary CTA** | **Download the datasheet** (`#downloads`) — the client's reference puts this beside the primary in the hero, and it is the right secondary for a spec-driven buyer who is not ready to talk to sales. ⚠️ Blocked on the PDFs existing |
| **Lead capture** | Request a Demo. Not a newsletter, not a brochure gate — the catalog gives us enough to publish specs openly, and gating them on a trust-building page for a new-to-market brand is the wrong trade |
| **Objection handled before the CTA** | Four, in page order: *"which one do I need?"* (§5.3–§5.4) · *"what does it actually make?"* (§5.4) · *"what will it cost me to run?"* (§5.6) · *"is this just a rebadged machine?"* (§5.7). The last one is the real objection for a Chinese brand entering MENA, and p7's four modifications are the only honest answer we hold |
| **Dentist path vs lab path** | Forked at §5.2 and never merged again. **Dentist:** chair time, one appointment instead of two, the patient leaves with the restoration — routes to P1-26. **Lab:** plate throughput, cost per unit, batch scheduling, open material cost control — routes to HALOT-X1 for models and appliances, P1-26 for definitive work. The Indication Router serves both without either reading generic copy |

## 9. Link map

- **Links in:** `011` Featured Products · `010` Ecosystem · `033` Products hub · `047` Print
  (workflow) · `034` Intraoral Scanner · `039` Resins · `037` Curing Machines · `020` Buy Online ·
  Solutions pages for labs and clinics
- **Links out** (each earning its place):
  1. `039` Resins — from the Indication Router, contextual: the resin decides the indication
  2. `037` Curing Machines — from §5.9, with the "cannot go to a patient uncured" argument attached
  3. `047` Print (Guided Workflow) — from the dark spine section, for a reader who wants the whole chain
  4. `019` Request a Demo — the primary CTA
- **Deep links / anchors this screen must expose:** `#overview` · `#models` · `#specs` ·
  `#downloads` (all four client-specified) — plus `#p1-26`, `#halot-x1`, `#indications`,
  `#running-costs`. The sticky sub-nav shows the client's four; the rest are addressable for
  campaign and support linking

## 10. States and edge cases

- **Empty / no data:** `#downloads` has no PDFs today. It renders as a request line —
  *"Datasheets are available on request"* → demo form — never as an empty section or a dead link.
  §5.10 Proof is hidden entirely rather than shown with placeholder dentists ⚠️ blocked, §13
- **Loading:** hero product image is `priority`; everything below lazy-loads. Reserved aspect boxes
  on all product photography to hold CLS < 0.1 (MASTER §8). The Indication Router renders its
  default selection server-side so it is never an empty panel
- **Error:** the router falls back to a plain indication → printer table if JS fails. It is
  content, not an app — it must work without scripting
- **Logged-in vs anonymous:** `app/` carries `shop` / `cart` / `checkout`. If pricing is published
  (blocked, `products.md` Q7), price and buy actions appear for authenticated distributors only,
  and the anonymous page shows Request a Demo in that slot. No empty price row either way
- **Not-available-in-region:** the only price in the catalog is in EGP (p14) — **Egypt is the live
  market**. Region gating is a real requirement, not a hypothetical. Availability copy is per
  region; specs are global

## 11. RTL and localization

RTL is architecture, not a toggle. EN / AR / FR (+ Chinese requested).

- **Mirrors:** page layout, the sticky sub-nav, the asymmetric model split (§5.3 — P1-26 block
  flips side), the ecosystem chain and its dotted connectors, the Indication Router's
  selector → result relationship, all iconography with directional meaning (arrows reverse)
- **Does not mirror:** product photography (MASTER §3) — the P1-26's touchscreen and ODYX wordmark
  stay where they are; a flipped machine reads as a different machine. Spec numerals. The
  annotated-diagram callouts in §5.7 reposition around the un-mirrored photo rather than flipping it
- **The spine reverses direction in RTL** — `SCAN → … → DELIVER` runs right-to-left, and the
  pinned scrub timeline's x-axis inverts with it. This is the highest-risk RTL item on the page
  because it is motion, not layout: verify with `ScrollTrigger.refresh()` after the direction switch
- **Arabic type:** no letter-spacing, no uppercase, no italic. The eyebrow `STEP 3 OF 5 · PRINT`
  loses uppercase as a cue in Arabic — differentiate with weight 700 + the family accent (MASTER §3)
- **Numerals:** Western 0–9 throughout — `18 µm`, `60 mm/h`, `2000 h`, `153 × 77 × 160 mm`. Units
  stay LTR-isolated inside Arabic text; wrap them so the bidi algorithm cannot reorder `mm/h`
- **Untranslatable:** `ODYX P1-26`, `HALOT-X1`, `ODYX Box`, `ACF`, `AFU`, `RFID`, `STL`, `OBJ`,
  `CXDLPV4`, `EXOCAD`, `3Shape`, and all units. Model names never transliterate
- **FR (~20% longer):** the feature chips (§5.1) and the router's result panel are the two
  components that break first — both are fixed-height by design. Chips get a two-line allowance;
  the result panel grows rather than truncates

## 12. Responsive

Mobile carries equal weight — dentists check specs between patients.

- **Mobile (<768):** single column. §5.3's asymmetric split stacks with **P1-26 first**, and the
  size difference is carried by image scale and vertical space rather than width. The Indication
  Router becomes a full-width accordion — indication chips scroll horizontally in their own
  container, result panel expands in place. Spec tables (§5.5) scroll horizontally **inside their
  own container** — the page never scrolls sideways (MASTER §9). The spine (§5.8) is
  **not pinned** on mobile (MASTER §5) — it becomes a tap-advanced stepper. Sticky sub-nav collapses
  to a single scrolling anchor row, 44 px targets
- **Tablet (768–1023):** two columns where content is genuinely paired (§5.2's dentist/lab split,
  the ecosystem chain at two nodes per row). The model split (§5.3) stays stacked — the asymmetry
  is the point and it does not survive being squeezed into equal columns
- **Not carried to mobile:** the annotated-diagram hotspots in §5.7 become a plain captioned list
  (hover has no mobile equivalent, and four short captions lose nothing), and the parallax layer
  behind §5.8 is dropped. Both are enhancements over content that is complete without them

## 13. Open questions / blocked on

**Recorded at Checkpoint A (2026-07-25, Khaled):**

- **Architecture:** family page with both models inline — not a hub, not two detail pages. Honors
  the client's four inner links and holds the sitemap at 76 screens.
- **HALOT claims:** design to the catalog and flag the conflict. Where the client's own reference
  and their own catalog disagree, the catalog wins until they say otherwise.
- **Competitor set:** the default four. Research in `content.md` §10a.
- **The workflow is five steps:** `SCAN → DESIGN → PRINT → WASH & CURE → DELIVER`. Confirmed as a
  sitewide decision, following the client's P1-26 reference.

**Blocked on the client:**

| # | Question | Blocks | Status |
|---|---|---|---|
| 1 | **The HALOT resin-compatibility conflict.** The client's own HALOT-X1 reference lists all five resin lines including **Ceramic Crown** (permanent restorations) and **Surgical Guide Pro**, and closes *"Compatible with the complete ODYX Dental Resin portfolio."* The catalog (p13–p14) says the HALOT is **not recommended for** final restorations or advanced implant surgical guides. Same two applications | §5.3, §5.4, §5.5 — the HALOT half of the page | **New.** A sharper form of `products.md` Q2 — this is their reference against their catalog, not our interpretation |
| 2 | **HALOT positioning** — how much of *"not a dedicated dental 3D printer"* (p13) reaches the page? We have designed it as an honest fork by job. Confirm the framing | §5.3 copy | `products.md` Q2, already logged |
| 3 | **"HALOT-X1" is the OEM's product name.** `products.md` §3 says don't publish OEM names, yet the client's reference puts the ODYX wordmark on a machine still called HALOT, and the RFID note at p12 reads *"Piocreat Resin> ODYX Resin to be"* — a rebrand in flight. Is HALOT-X1 the shipping name? | Every heading, the nav dropdown, review #22 compliance, and the SEO title | ✅ **RESOLVED (2026-07-25, Khaled): HALOT-X1 IS the shipping name.** Use "ODYX HALOT-X1" in headings, nav, cards and the SEO title. The don't-publish-OEM-names rule does not apply to this model name |
| 4 | **Are prices published, and where?** 45,000–55,000 EGP (p14) is the only price in the catalog | §5.3, §10 logged-in state, the `020` Buy Online link | `products.md` Q7 |
| 5 | **Datasheet / brochure PDFs** — the client specified a `Downloads` inner link and a `Download Brochure` CTA sits in their own hero. We hold no files | §5.11, the secondary CTA | **New** — small, and it blocks a CTA the client drew themselves |
| 6 | **Real clinical cases and named clinicians.** Review #32: *"Put real cases with image for the doctor and image for the case."* The reference's reviews are placeholders (*"Dr. Ahmed K."*) | §5.10 — hidden until supplied | `products.md`-adjacent; review #32 |
| 7 | **Warranty period** — screen life 2000 h / 3000 h and film life ~30,000 layers are consumable schedules, not warranty. §5.6 publishes them and a buyer will immediately ask what is covered | §5.6, and page `070` | `products.md` Q9 |
| 8 | **Is the ROI calculator on this page?** The client's reference puts it here; `app/` has an `/roi` route; review #16 and #26 both trim surplus CTAs. Currently **excluded** from §5 to protect one primary CTA — confirm | §5 section list | **New** — our judgement, needs a nod |
| 9 | **Three indications have a published cure time and no ODYX resin line.** The cure table at p15 gives timings for **dentures** (~15 min) and **castable resins** (~3 min); the HALOT's own suitability list at p13 includes **splints and night guards**. None of the five resin lines covers any of them. The Indication Router surfaces this — it is what the component is for — and currently answers "open material system, no ODYX line yet" | §5.4 router, and `039` Resins directly | **New.** Found by building the router. Either lines are coming, or the site says plainly that these run on third-party resin |
| 11 | **Which printer is in the photograph?** ⚠️ Real studio photography exists at `knowledge_base/resources/images/product-images/3d printer.jpeg` — and it **does not match the client's own P1-26 design reference**. The photo shows a red hood on a brushed **silver** base with `ODYX DIGITAL PRINTING` on the **hood**; the reference shows an orange hood on a **black** base with the wordmark on the **base** and a `P1-26` label. The photo carries **no model number at all**. Either these are two different units, or the reference mockup is not faithful to the hardware. Until it is answered, no caption on this page names the machine | Every hero and model caption on 036 — and the same question lands on 034 and 037, whose photography was found alongside it | **New**, and it outranks most of the list: we are currently unable to say which product the hero shows |
| 10 | **ACF on the HALOT-X1.** Their reference lists an *"ACF Release Sheet"* as a HALOT feature; p7 says modifications were applied *"exclusively to the ODYX P1-26"*, and NFEP → ACF is one of them. Copy currently attributes ACF to the P1-26 only | §5.3b, §5.6 | **New**, minor — one sentence resolves it |

**Owed to the system, not the client:**

- **The five-step workflow must propagate.** CLAUDE.md, `design-system/odyx/MASTER.md` §6 and every
  screen already carrying the six-step spine still say `SCAN → DESIGN → PRINT → CURE → FINISH →
  DELIVER`. Screens `045`–`049` and `044` are directly affected; `038` and `049` were already marked
  removed. This is a one-line change in many files and must not be done screen by screen.
- **Two components belong in MASTER §6, not here** (promotion rule — used on 2+ screens):
  the **product-family (forked) archetype**, reused by `037` Curing Machines; and the
  **Indication Router**, whose logic is shared with `039` Resins and `047` Print.
