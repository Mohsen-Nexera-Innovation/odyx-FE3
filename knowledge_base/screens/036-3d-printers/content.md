---
screen: 036-3d-printers
audience: Dentists + dental labs
locales: [en, ar, fr]        # +zh if confirmed
primary_keyword: dental 3D printer
spec_status: drafted
sources_checked:
  - knowledge_base/ODYX Products - 18.7.26.pdf (p1–p16, p24–p30) via docs/products.md
  - client-design-refrence/product-design-refrences/printer-odyx-p1-26.jpeg
  - client-design-refrence/product-design-refrences/printer-halot-x1.jpeg
  - .firecrawl/sprintray.com-dental-3d-printers.md
  - .firecrawl/sprintray.com-pro2-dental-3d-printer.md
  - .firecrawl/dental.formlabs.com-products.md
  - .firecrawl/dental.formlabs.com-products-form-4b.md
  - .firecrawl/stratasys.com-en-dental-printers.md
  - .firecrawl/3shape.com.md (no printer page — 3Shape sells no printer)
---

# Content · 3D Printers

> **Claims rule — read before writing.** Every spec, number, certification and clinical claim
> must trace to `knowledge_base/ODYX Products - 18.7.26.pdf` or a client-supplied source, and be
> listed in §7. **Never invent a number.** ODYX is a Chinese brand building trust in MENA; one
> wrong spec is a credibility loss the design can't repair.

## 1. Who is reading, and what do they want

| | |
|---|---|
| Primary audience | Dentists + dental labs |
| Where they are in the journey | **Comparing.** "3D printer" is the highest-intent term in the section — most arrivals land here cold from search, already know they want a printer, and are deciding whose. A minority arrive from `034` or `010` already inside the workflow story |
| What they're actually asking | *"Which one do I need, what can it actually make, and what will it cost me after I've bought it?"* — in that order. Not "what technology does it use" |
| What makes them leave | A spec table they can't map to a job · a claim they can check and find wrong · no price and no way to ask · discovering after the fact that the machine can't make the thing they bought it for |

**Dentist vs lab — they do not buy for the same reason.**

- **The dentist** is buying back an appointment. The case stays in the building; the patient does
  not come back for a temporary. The P1-26 is 221 × 221 × 404 mm and 6.6 kg (p5) — it fits in an
  operatory, which is a purchase-blocking practicality, not a spec.
- **The lab** is buying plate throughput and a controllable cost per unit. Both machines are
  open-material, which the catalog frames exactly right: it *"keeps ongoing resin cost flexible"*
  (p7). The HALOT-X1's plate is 211.68 × 118.37 × 200 mm (p11) — the argument is how many units
  fit on it per run, not how sharp one of them is.

The page forks at §4.2 and never merges again. No section speaks to "the customer".

## 2. Objections to defeat on this screen

| Objection | Answer | Proof |
|---|---|---|
| *"Which of the two do I need?"* | Sorted by indication, not by tier. The router resolves printer + resin + cure time from the thing you're making | p13 suitability list · p15 cure timings · p24–p30 resin uses |
| *"Is this a rebadged machine with a logo on it?"* | The P1-26 is the one ODYX engineered, and the four changes are named plainly: small tank and platform option, ACF release sheets, ODYX Box slicing, a dispensing channel in the tank | p7 |
| *"The big one has better specs — why isn't it the flagship?"* | Stated outright rather than hidden: the HALOT-X1 has the larger screen, larger plate and faster quoted speed, and it is still the narrower clinical instrument. Bigger spec sheet, narrower claim | p11 vs p2 · p13–p14 |
| *"LCD printers eat consumables."* | The schedule is published rather than argued: 2000 h screen (P1-26); ~3000 h LCD, ~30,000-layer film, ~20,000 h UV lamp (HALOT-X1) | p5 · p11 |
| *"Will it lock me into your materials?"* | Both are open-material systems. The S1 exports STL/OBJ, and the HALOT-X1 reads STL/OBJ from EXOCAD and 3Shape | p7 · p11 · p13 · p31 |
| *"Can it make crowns that go in the mouth?"* | Yes — on the P1-26, with the resin that is cleared for it. What the part is cleared for is a property of the **resin line**, not the printer, and certification is stated per line | p13–p14 · p30 |
| *"Nobody near me can service it."* | ⚠️ **Unanswerable today.** No warranty period and no service network in the knowledge base. `screen-details.md` §13 #7 | — |

## 3. SEO

| | |
|---|---|
| Primary keyword | `dental 3D printer` |
| Secondary keywords | `ODYX P1-26` · `chairside 3D printing` · `dental resin printer` |
| Search intent | Commercial — comparing vendors, pre-purchase |
| Title tag (<60 chars) | `Dental 3D Printers — ODYX P1-26 & HALOT-X1` (42) |
| Meta description (<160 chars) | `Two ODYX dental 3D printers, sorted by what you print: the P1-26 for definitive restorations, the HALOT-X1 for models and appliances.` (132) |
| URL slug | `/products/3d-printers` — unchanged from v1, the live URL keeps its equity |
| H1 (one, matches the title) | `Dental 3D printers that finish what the scan started` — carries the primary keyword and the workflow idea in one line. The title tag is the model-named variant, per review #22 |
| Featured-snippet play | The indication → printer → resin → cure-time table behind §4.4. It is a definition-style answer to *"which dental 3D printer for surgical guides / models / temporaries"*, which is how the question is actually typed |
| Internal links | `039` Resins (from the router) · `037` Curing Machines (from Works with) · `047` Print (from the spine) |

**Vocabulary note.** Take the buyer's words from Stage 2 — *chairside*, *same-visit*, *appliances*,
*indications*, *throughput*, *build plate*, *biocompatible*. Avoid *voxel*, *MSLA*, *optical panel*:
category jargon that belongs to whoever coined it.

## 4. Copy, section by section

> **Review #20 is in force:** _"The description of the section headers need to be removed."_ No
> section carries a sub-line under its header. Where context is genuinely needed it is written into
> the first body element, not hung under the heading.

### Section 1 · Hero — the print step `#overview`

- **Eyebrow:** STEP 3 OF 5 · PRINT
- **Headline:** Dental 3D printers that finish what the scan started.
- **Sub:** Two machines, two jobs. The **ODYX P1-26** prints the definitive work that goes in the
  mouth. The **HALOT-X1** prints the volume that supports it.
- **Primary CTA:** Request a demo · **Secondary:** Download the datasheet
- **Chip row** — labelled *Common to both printers*, five chips, icon + label:
  `405 nm LCD light engine` · `Open material system` · `Cloud & USB printing` ·
  `Wash and cure on one bench` · `Cure times published per application`
- **Image caption:** ODYX P1-26 with a printed full-arch model, straight off the plate.

### Section 2 · Why print it yourself

Two columns, one shared rule. **The header is the whole header** — no sub-line.

**Header:** Two reasons to bring it in-house, and they are not the same reason.

**Column A — For the clinic**
> The case stops leaving the building. A model, a guide, a splint or a temporary is made in the
> room where it was designed, on a machine that is 221 × 221 × 404 mm and 6.6 kg — an operatory
> footprint, not a lab bench. The patient's second appointment stops being a logistics problem.

**Column B — For the laboratory**
> The plate is the unit of economics. A 211.68 × 118.37 × 200 mm build area printing at up to
> 170 mm/h at a 0.20 mm layer changes what a night shift produces. Both machines are open-material
> — the catalog's own phrase is that it *"keeps ongoing resin cost flexible"* — so cost per unit
> stays something you negotiate, not something you inherit.

### Section 3 · The two printers `#models`

**Header:** Two printers. Not two tiers.

**Intro (one paragraph, carries the section — no sub-line under the header):**
> These are not a small model and a big model. They are built for different work, and the honest
> way to choose between them is to start from the thing you are making.

#### 3a · ODYX P1-26 `#p1-26`

- **Label:** THE DENTAL PRINTER
- **Headline:** Engineered for the work that goes in the mouth.
- **Body:** 18 µm X-Y accuracy across a 6.8" 9K monochrome LCD at 8520 × 4320 px. Layers from
  0.01 to 0.1 mm, up to 60 mm/h, on a 153 × 77 × 160 mm plate. A third-generation integral
  405 nm light source holds better than 90 % uniformity, so a part at the edge of the plate
  matches a part at the centre — which is the whole argument for printing a definitive
  restoration rather than a model.
- **Spec pull (4, visible without opening the table):** `18 µm XY` · `9K · 6.8"` · `60 mm/h` ·
  `153 × 77 × 160 mm`
- **Prints:** crowns · bridges · veneers · inlays and onlays · temporary crowns and bridges ·
  study, aligner and working models · implant surgical guides — each with the resin line cleared
  for it.
- **Microcopy:** What a printed part is cleared for is a property of the resin, not the machine.
  Certification is stated per resin line. →️ `039`

#### 3b · ODYX HALOT-X1 `#halot-x1`

- **Label:** THE VOLUME PRINTER
- **Headline:** For everything that supports the case.
- **Body:** A 10.1" 16K monochrome LCD at 15120 × 6230 px over a 211.68 × 118.37 × 200 mm plate,
  running up to 170 mm/h at a 0.20 mm layer. A honeycomb 405 nm matrix fires only the 92 zones
  under the model. It is factory-calibrated and leveling-free, the vat and light source move
  while the plate stays still, and the Auto Feed Unit keeps resin topped up, heated to 30–45 °C
  and weighed in real time.
- **Spec pull (4):** `16K · 10.1"` · `170 mm/h` · `211.68 × 118.37 × 200 mm` · `Leveling-free`
- **The honest line — published, not footnoted:**
  > It has the larger screen, the larger plate and the faster quoted speed. It is still the
  > narrower instrument. **Suitable for** study models, orthodontic models, surgical guides,
  > splints and night guards, and temporary crowns. **Not recommended for** final restorations,
  > advanced implant surgical guides, or full-arch prosthetics. For those, print on the P1-26.
- **Microcopy:** Reads STL and OBJ straight from EXOCAD and 3Shape.

### Section 4 · What are you printing? — the Indication Router `#indications`

**Header:** What are you printing?

Selector chips → result panel. Every value below is catalog-sourced; nothing is inferred.

| Pick this | Printer | Resin line | Cure time |
|---|---|---|---|
| Crown or bridge | **P1-26** | Crown & Bridge — CE ✅ FDA ✅ | Varies by resin — see cure timings |
| Veneer, inlay or onlay | **P1-26** | Ceramic Crown — CE ✅ FDA ✅ | Varies by resin — see cure timings |
| Temporary crown or bridge | **P1-26** · HALOT-X1 for volume | Temporary Restoration — **no CE, no FDA** | ~10 min |
| Study or orthodontic model | Either | Ortho Model 2.0 — CE ✅ FDA ✅ | ~2 min |
| Aligner / thermoform model | Either | Ortho Model 2.0 — withstands vacuum thermoforming heat | ~2 min |
| Implant surgical guide | **P1-26** | Surgical Guide Pro — **no CE, no FDA** · steam sterilizable to 135 °C | ~3 min |
| Splint or night guard | Either | ⚠️ No ODYX resin line — open material system | Set by your resin |
| Denture | **P1-26** | ⚠️ No ODYX resin line — open material system | ~15 min |

- **Result-panel microcopy:** `Print it on {printer} · in {resin} · cure {time}` →
  two links, `See the resin` and `See the cure settings`.
- **Empty-state / no-ODYX-resin copy:** Both printers are open-material systems, so this one runs
  on the 405 nm resin you already use. There is no ODYX line for it yet.
- **Certification footnote (permanent, not dismissible):** Two of the five ODYX resin lines carry
  neither CE nor FDA. Certification is stated per line, never across the range.

> ⚠️ **Three indications have a published cure time and no ODYX resin line** — splints and night
> guards, dentures, and castable work. See `screen-details.md` §13 #9.

### Section 5 · Specifications `#specs`

**Header:** Specifications

Two tabs — **ODYX P1-26** / **HALOT-X1**. Never rendered side by side; §7 records why.

**Tab intro microcopy:** Every figure below is from the ODYX product catalog, 18 July 2026.

Full rows are in §7. The table's own row order leads with what a buyer checks first — accuracy,
screen, build volume, speed, layer range — then light source, motion, connectivity, software,
dimensions, consumables.

### Section 6 · What it costs to keep running `#running-costs`

**Header:** What it costs to keep running

**Intro:** Every LCD printer has consumables. Here is the schedule, in hours and layers, so it
can be budgeted rather than discovered.

| Part | P1-26 | HALOT-X1 |
|---|---|---|
| LCD screen | 2000 h | ~3000 h |
| Release film | ACF release sheet | ~30,000 layers |
| UV light source | — | ~20,000 h |

- **Microcopy:** Resin is the ongoing cost, and both machines are open — so it stays negotiable.
- ⚠️ **Blocked:** what the warranty covers, and for how long. `screen-details.md` §13 #7.

### Section 7 · What ODYX changed `#engineered`

**Header:** What ODYX changed on the P1-26

**Intro:** The straight answer to the question every buyer of a new hardware brand is entitled to
ask. Four modifications, on the machine we do our own engineering on.

Four annotated callouts on one product image:

1. **A small tank and platform** — 60 × 60 × 100 mm, for crowns, bridges and veneers. Less resin
   in the vat for a single-unit case.
2. **ACF release sheets** — replacing NFEP, for easier peeling between layers.
3. **ODYX Box** — the slicing software, rebranded and shipped as ours. Windows and macOS.
4. **A dispensing channel in the tank** — pour resin back without decanting the vat.

### Section 8 · PRINT, in the workflow

**Header:** Where printing sits

Full-bleed dark. The five-step spine, PRINT active.

`SCAN → DESIGN → PRINT → WASH & CURE → DELIVER`

- **Step copy (PRINT, active):** The file becomes an object. Minutes to hours, depending on what
  it is and how many of them are on the plate.
- **Back one step:** The file that lands here came from the S1 or from your own CAD — STL or OBJ,
  from whatever software you already use. → `046`
- **Forward one step:** Nothing comes off the plate finished. It is washed, then post-cured — and
  the time depends on the resin, not the printer. → `048`

### Section 9 · Works with

**Header:** Works with

Horizontal chain, dotted connectors: **ODYX-S1 → P1-26 / HALOT-X1 → ODYX resins → ODYX Cure / UW-03**

| Node | The argument |
|---|---|
| **ODYX-S1 scanner** | Exports STL and OBJ to any CAD, with no ecosystem restriction. The workflow is chosen, not enforced |
| **ODYX resins** | Five lines. The resin decides what the part is cleared for — and certification is stated per line |
| **ODYX Cure** | Three selectable wavelengths — 365, 385 and 405 nm — which is what lets one box cure the whole range properly. Eight saved profiles |
| **UW-03** | Washes models still attached to the build plate. Less handling, and hands stay out of uncured resin |

### Section 10 · Proof ⚠️ blocked

**Header:** Cases

`before → printed → final restoration`, plus named-clinician review cards.

**Section is hidden until real content exists.** Review #32: _"Put real cases with image for the
doctor and image for the case."_ Placeholder dentists on a trust-building page for a new-to-market
brand are worse than no section. `screen-details.md` §13 #6.

### Section 11 · Downloads and demo `#downloads`

**Header:** Downloads

- **Present state (no PDFs on file):** Datasheets and the full specification sheet are available on
  request. → Request a demo
- **Target state:** `ODYX P1-26 — datasheet (PDF)` · `HALOT-X1 — datasheet (PDF)` ·
  `ODYX Box — installation and setup` · `Maintenance and consumables schedule`

**Closing CTA block**
- **Headline:** See it print the case you're holding.
- **Sub:** A demo runs on your file, in your resin, on the printer you're considering.
- **Primary CTA:** Request a demo

## 5. The workflow sentences

- **Arriving from the previous step:** *The file that lands here came from the S1 or from your own
  CAD — STL or OBJ, from whatever software you already use.*
- **Leaving to the next step:** *Nothing comes off the plate finished. It is washed, then
  post-cured — and the time depends on the resin, not the printer.*
- **Why the next product exists (in one line a buyer would repeat):** *A part that skips the cure
  is a part that fails in the mouth.*

## 6. CTAs

| | Copy | Where it goes | Microcopy under it |
|---|---|---|---|
| Primary | **Request a demo** | `019` Request a Demo | On your file, in your resin, on the printer you're considering |
| Secondary | **Download the datasheet** | `#downloads` | ⚠️ Blocked — renders as "available on request" until the PDFs exist |
| In-line (router) | **See the resin** / **See the cure settings** | `039` · `037` | — |
| In-line (spine) | **Follow the whole workflow** | `047` | — |

One primary CTA per screen — `Request a demo`, same label in the hero and the closing band.
The ROI calculator from the client's reference is **excluded pending confirmation**
(`screen-details.md` §13 #8): it is a second conversion path, and reviews #16 and #26 both point
at trimming surplus CTAs.

## 7. Claims register — every number gets a source

Source is `knowledge_base/ODYX Products - 18.7.26.pdf` throughout, via `docs/products.md`.
**Verified** = the value in the copy above matches the catalog exactly.

### ODYX P1-26

| Claim / spec | Value | Source | Verified |
|---|---|---|---|
| X-Y accuracy | 18 µm | p2 | ☑ |
| Print screen | 6.8" 9K monochrome LCD | p2 | ☑ |
| Resolution | 8520 × 4320 px | p2 | ☑ |
| Layer thickness | 0.01 – 0.1 mm | p2 | ☑ |
| Max print speed | 60 mm/h | p2 | ☑ |
| Build volume | 153 × 77 × 160 mm | p2 | ☑ |
| Machine size | 221 × 221 × 404 mm | p5 | ☑ |
| Weight | 6.6 kg | p5 | ☑ |
| Light source | 3rd-gen integral, 405 nm, uniformity > 90 % | p5 | ☑ |
| Z-axis | Dual linear guide rails + T-shaped screw | p5 | ☑ |
| Screen lifetime | 2000 h | p5 | ☑ |
| Touch screen | 5" capacitive color | p5 | ☑ |
| Connectivity | USB / WiFi, cloud printing | p6 | ☑ |
| Slicer | ODYX Box — Windows 7/8/10 x64, macOS | p6 | ☑ |
| UI languages | 13 | p6 | ☑ |
| Materials | Open choice, *"keeps ongoing resin cost flexible"* | p7 | ☑ |
| ODYX modification 1 | Small tank + platform option, 60 × 60 × 100 mm | p7 | ☑ |
| ODYX modification 2 | NFEP → ACF release sheets | p7 | ☑ |
| ODYX modification 3 | ODYX Box slicing software | p7 | ☑ |
| ODYX modification 4 | Dispensing channel added to the tank | p7 | ☑ |

### ODYX HALOT-X1

| Claim / spec | Value | Source | Verified |
|---|---|---|---|
| XY resolution | 14 × 19 µm | p11 | ☑ |
| Layer thickness | 0.01 – 0.2 mm | p11 | ☑ |
| Build volume | 211.68 × 118.37 × 200 mm | p11 | ☑ |
| Screen | 10.1" 16K monochrome LCD, 15120 × 6230 px | p11 | ☑ |
| Print speed | 170 mm/h at 0.20 mm layer | p11 | ☑ |
| Light source | Honeycomb matrix, 405 nm | p11 | ☑ |
| Exposure zones | 92 intelligent zones | p11 | ☑ |
| Motion | Moving vat and light source, fixed build plate | p11 | ☑ |
| Leveling | Leveling-free, factory calibrated | p11 | ☑ |
| Release film life | ~30,000 layers | p11 | ☑ |
| LCD life | ~3000 h | p11 | ☑ |
| UV lamp life | ~20,000 h | p11 | ☑ |
| File formats | STL / OBJ — EXOCAD, 3Shape | p11 | ☑ |
| Printer size / weight | 344 × 331 × 434 mm · 12.93 kg | p11 | ☑ |
| AFU | Automatic resin feed, real-time level and bottle weight, heating 30–45 °C | p12 | ☑ |
| Suitable for | Study models · orthodontic models · surgical guides · splints and night guards · temporary crowns | p13 | ☑ |
| **Not recommended for** | **Final restoration · advanced implant surgical guide · full-arch prosthetics** | p13–p14 | ☑ |

### Resins and cure (referenced from the router)

| Claim / spec | Value | Source | Verified |
|---|---|---|---|
| Cure — standard models | ~2 min | p15 | ☑ |
| Cure — surgical guides | ~3 min | p15 | ☑ |
| Cure — temporary crowns | ~10 min | p15 | ☑ |
| Cure — dentures | ~15 min | p15 | ☑ |
| ODYX Cure wavelengths | 365 / 385 / 405 nm, selectable | p14 | ☑ |
| Certification — Ceramic Crown, Crown & Bridge, Ortho Model 2.0 | CE ✅ FDA ✅ | p30 | ☑ |
| **Certification — Temporary Restoration, Surgical Guide Pro** | **No CE, no FDA** 🔒 | p30 | ☑ |
| Surgical Guide Pro | Steam sterilizable to 135 °C | p29 | ☑ |
| Ortho Model 2.0 | Withstands vacuum thermoforming heat | p27 | ☑ |
| UW-03 | Washes models on the build plate | p20 | ☑ |
| ODYX-S1 | Exports STL / OBJ, open system | p31 | ☑ |

### Not published, and why

| Held back | Reason |
|---|---|
| HALOT-X1 price, 45,000–55,000 EGP (p14) | Blocked on `products.md` Q7 — whether prices are published at all, and in which currencies |
| The P1-26 "does not have" list (p6) | Sales-enablement material. `docs/products.md` marks it explicitly as internal |
| OEM manufacturer and slicer names (p11–p13, p16) | `docs/products.md` §3 — do not publish OEM names, and do not imply in-house manufacture of the units ODYX did not modify |
| "Same-visit" / "under 10 minutes" | No timing claim in the catalog supports it. Same-day is the DELIVER *narrative*, not a printer spec |
| Any range-level CE/FDA badge | Two of five lines carry neither 🔒 |

⚠️ **One discrepancy logged, not resolved.** The client's HALOT-X1 reference lists an *"ACF Release
Sheet"* as a HALOT feature, while p7 states modifications were applied *"exclusively to the ODYX
P1-26 printer"* — and NFEP → ACF is one of those four. The copy above attributes ACF to the P1-26
only. Confirm with the client before the HALOT block is signed off.

## 8. Arabic

Transcreation, not translation. Arabic is a first-class locale here, not a bolt-on — doing it
properly is part of the trust argument.

- **Terminology:** `P1-26`, `HALOT-X1`, `ODYX Box`, `ACF`, `AFU`, `RFID`, `STL`, `OBJ`, `EXOCAD`,
  `3Shape` stay in Latin script, never transliterated. `resin` → **راتنج**, `curing` →
  **المعالجة الضوئية** (not the bare معالجة, which reads as medical treatment), `build plate` →
  **منصة الطباعة**, `surgical guide` → **دليل جراحي**, `night guard` → **واقي ليلي**. Decide these
  once and hold them across all 76 screens — a resin called two different things on two pages
  costs more credibility than a bad headline.
- **Numerals:** Western 0–9 sitewide (MASTER §3.5). Units stay LTR-isolated inside Arabic runs —
  `60 mm/h` and `153 × 77 × 160 mm` must not be reordered by the bidi algorithm. Wrap every
  measurement.
- **Headlines that will not survive literal translation:**
  - *"finish what the scan started"* — the English leans on a start/finish idiom that flattens in
    Arabic. Transcreate toward completion of the chain: **من المسح الرقمي إلى قطعة بين يديك**
    ("from the digital scan to a piece in your hands").
  - *"Two printers. Not two tiers."* — "tiers" has no crisp Arabic equivalent in this sense.
    Transcreate to **طابعتان، ووظيفتان مختلفتان** ("two printers, two different jobs").
  - *"What it costs to keep running"* — literal translation reads as a warning about expense.
    Reframe as a published schedule: **جدول الاستهلاك والصيانة**.
- **Length:** Arabic runs shorter than English here (~10–15 % fewer characters), so the risk is the
  opposite of French — **short headlines look under-set**. The display sizes hold, but the two-line
  hero headline may collapse to one line; set an explicit break. Line-height +0.15 per MASTER §3.3.
- **The honest-line block in §4.3b is the highest-stakes translation on the page.** "Not
  recommended for" must not soften into "less suitable for" in Arabic. Have it reviewed by someone
  clinical, not only by a translator.

## 9. French

- **Length:** FR runs ~20 % longer. Components that break first:
  1. **The hero chip row** — `Cure times published per application` → *"Temps de polymérisation
     publiés par application"* is +38 %. Chips need a two-line allowance, not truncation.
  2. **The router result panel** — fixed-height by design; must grow instead.
  3. **The spec-table label column** — *"Épaisseur de couche"*, *"Volume d'impression"*. Set the
     label column to `min-content` with wrapping allowed, not a fixed width.
- **Terminology:** `résine` · `polymérisation` (never *"séchage"* — a resin is cured, not dried) ·
  `plateau de fabrication` · `guide chirurgical` · `gouttière` (splint / night guard) ·
  `impression 3D dentaire`. `Same-day` has no idiomatic French equivalent — use *"dans la journée"*,
  and only in the DELIVER narrative, never as a printer claim.
- **Decimals:** French uses a comma — `0,01 – 0,1 mm`. The number formatter must be locale-aware or
  the spec table will read wrong to a French clinician.

## 10. Sources consulted

### Client inputs (outrank everything below)
- `knowledge_base/resources/client-design-refrence/product-design-refrences/printer-odyx-p1-26.jpeg`
- `knowledge_base/resources/client-design-refrence/product-design-refrences/printer-halot-x1.jpeg`
- xlsx: Description / Proposed Content / Inner Links / Responsibility. No per-page comment.
- Review items applying globally: #20, #21, #22, #33.

### Claims
- `docs/products.md` → PRINT — ODYX P1-26 (p1–p7) · PRINT — HALOT (p7–p14) · §2, §3, §4 constraints.

### Competitor scrapes (`.firecrawl/`)
| File | Page |
|---|---|
| `sprintray.com-dental-3d-printers.md` | SprintRay printer **family** page |
| `sprintray.com-pro2-dental-3d-printer.md` | SprintRay Pro 2 **detail** page |
| `dental.formlabs.com-products.md` | Formlabs printer **family** page |
| `dental.formlabs.com-products-form-4b.md` | Form 4B **detail** page |
| `stratasys.com-en-dental-printers.md` | Stratasys dental printer **catalog** |
| `3shape.com.md` | homepage — **no printer page exists** |

---

## 10a. Competitor research — the six dimensions

| | **SprintRay** | **Formlabs Dental** | **Stratasys Dental** | **3Shape** |
|---|---|---|---|---|
| **Content** | Editorial, not a grid. Intro → "3 categories driving adoption" → **interactive printer finder** → tech explainer (SLA/DLP/LCD) → "30-minute test". Products are *outcomes* of an argument | Hero → 2 printer cards → software → post-processing → materials → **6-row compare table** → buy | Filterable catalog. 4 printers, filters by Application + Industry, video-first cards, all depth pushed to detail pages | **No equivalent page — 3Shape sells no printer.** Zero occurrences of "printer" on the homepage |
| **Level of detail** | Almost no specs on the family page. Specs live on Pro 2 | Deliberately thin: technology, max part size, layer thickness, biocompatible y/n, light source, dimensions. Six rows, nothing else | None on the family page. Card = name + technology + video | — |
| **Technical depth** | Explains the *category* — what SLA vs DLP vs LCD means, why it matters clinically. Teaches before it sells | Benchmarked claims: "11 dental models in 9 minutes" vs named competitor classes (44min DLP, 1h16 LCD) | Assumes the reader knows. Enterprise vocabulary | — |
| **Product linking** | Strong in nav, weak on-page. Materials and post-processing are separate destinations, not a chain | **Best in set.** "The Form 4B Ecosystem — Complete Your 3D Printing Experience": printer + wash + cure as one add-to-cart row with prices | Series → model routing only | — |
| **Animation / interaction** | 3-question **printer finder**; animated GIFs comparing light-delivery technologies; YouTube tech breakdown | Speed-comparison bar animation; indication tabs | Vidyard video per card, filter interaction | — |
| **Proof** | University accuracy study, speed case studies, SprintRay University | Independent testing (blog: "Form 4B independently tested"), partner logos (3Shape, exocad, Medit, Dentsply), published prices | Named case studies with % claims (10× production, 90% savings) | — |
| **Vocabulary** | "chairside", "same-visit", "appliances", "indications", "throughput", "repeatability", "build plate", "biocompatible" | "indications", "dental practices vs dental labs", "open material mode", "post-processing", "part size" | "DentaJet", "TrueDent", "workflow", "production" | — |

### Take

1. **SprintRay's printer finder, reframed as our P1-26 vs HALOT device.** They ask three job questions — *what will you print most often / what turnaround / which workflow* — and never line the two printers up as tiers. This is the exact answer to the problem in `docs/products.md` p13: the HALOT out-specs the P1-26 on paper while being the *narrower* clinical instrument. A chooser sorts by job; a spec table sorts by number and sells the wrong machine. **Take the mechanism, drop the quiz-styling.**
2. **Formlabs' six-row compare table.** Short, boring, factual, no marketing adjectives. Proof that a family page does not need a 20-row matrix. Ours can be shorter still, and must be reachable from the `Specs` anchor the client asked for.
3. **Formlabs' ecosystem row as a purchasable chain**, not a diagram. The client's own P1-26 reference already draws scanner → printer → resins → cure with dotted connectors; Formlabs proves it converts when each node is a real link with a real next action.
4. **SprintRay's "teach the category" register** — the catalog's properties glossary (p24–p26) is the same asset for resins, and it is the direct answer to complaint 6 ("boring for doctors").
5. **Formlabs' indication-led framing over feature-led** — "what you can make" before "what it has". Both client references already lead applications before specs; this corroborates it.
6. **Stratasys' filterable catalog** — rejected as a page shape (four printers vs our two), but the *filter-by-application* idea survives as the applications section's organizing logic.

### Reject

1. **SprintRay's DLP-vs-LCD attack.** ⚠️ Their tech explainer states LCD printers require *"costly, frequent repairs"* and *"often utilize a smaller build plate"*. **Both ODYX printers are LCD.** We do not enter this argument on their terms — but we must not ignore it either (see *Where we beat all four*, item 3).
2. **Formlabs' published prices.** One price exists in our entire catalog — the HALOT at 45,000–55,000 EGP (p14) — and it is unresolved whether prices are published at all (`products.md` Q7).
3. **Formlabs' head-to-head speed benchmark** ("11 models in 9 minutes vs 44min DLP"). We hold no comparative test data. A benchmark we cannot reproduce is a claim we cannot defend.
4. **Stratasys' filter-driven catalog.** A filter over two products is UI theatre.
5. **SprintRay's "same-visit chairside restorations" as a headline promise.** They pair it with a printer built for it. The P1-26 at 60 mm/h (p5) supports a same-day *narrative*, not a "under 10 minutes" *claim*.
6. **Every competitor's certification framing.** All four state biocompatibility at range level. Two of our five resin lines carry no CE and no FDA (p30) — certification is stated per line, always. 🔒

### Where we beat all four

1. **Nobody connects the steps on the page.** Formlabs comes closest, and its ecosystem row is a *bundle*, not a *workflow* — it never says what happens between the printer and the cure box. SprintRay splits materials, wash/dry and ProCure across four destinations reachable only through the nav. **The workflow spine is a genuine category gap, not a stylistic preference** — which is exactly what the client is buying.
2. **Nobody is honest about model differences.** Formlabs' compare table implies Form 4BL is Form 4B but bigger — a tier ladder. Our two printers are not a ladder, and saying so plainly is a trust argument no competitor is making.
3. **Consumables are the unclaimed ground.** SprintRay attacks LCD on running cost and *provides no numbers of its own*. Our catalog publishes them: 2000 h screen life on the P1-26 (p5), 3000 h LCD / ~30,000-layer film / 20,000 h UV lamp on the HALOT (p11). Publishing a maintenance-and-consumables schedule turns their attack line into our transparency section. Nobody in the set does this.
4. **Arabic.** All four are English-first; SprintRay's "localization" is a Google Translate widget offering French, German, Italian and Spanish — **no Arabic at all**, on a page served from their `en-sa` (Saudi Arabia) region. Properly typeset Arabic is a differentiator in this market, not a compliance task.
