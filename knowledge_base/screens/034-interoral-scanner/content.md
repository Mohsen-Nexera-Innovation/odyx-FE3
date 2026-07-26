---
screen: 034-intraoral-scanner
audience: Dentists + dental labs
locales: [en, ar, fr]        # +zh if confirmed
primary_keyword: intraoral scanner
spec_status: drafted
sources_checked:
  - docs/products.md SCAN p31-p32
  - .firecrawl/itero.com-our-solutions-itero-lumina.md
  - .firecrawl/shining3ddental.com-en-solution-intraoral-scanner.md
  - .firecrawl/3shape.com-en-scanners-trios.md
  - v1 live page (odyx-fe-3.vercel.app/products/intraoral-scanner)
---

# Content · Intraoral Scanner

> **Claims rule — read before writing.** Every spec, number, certification and clinical claim
> must trace to `knowledge_base/ODYX Products - 18.7.26.pdf` or a client-supplied source, and be
> listed in §7. **Never invent a number.** ODYX is a Chinese brand building trust in MENA; one
> wrong spec is a credibility loss the design can't repair.

## 1. Who is reading, and what do they want

| | |
|---|---|
| Primary audience | Dentists + dental labs |
| Where they are in the journey | **Comparing.** They know what an intraoral scanner is; they are weighing the S1 against iTero, TRIOS, Medit, Aoralscan — usually on price-to-spec and on "can I trust this brand" |
| What they're actually asking | Dentist: "Is it accurate enough for crown margins, is it fast chairside, and will my lab accept the files?" Lab: "What files does it send me, and how clean are the margins when they arrive?" |
| What makes them leave | An unverifiable spec, a page with no numbers at all, no proof from a clinician they recognize, or the smell of ecosystem lock-in |

**Dentist vs lab — served separately on this page.** Sections 3–4 (chairside: infection control,
speed, the software video) speak to the dentist. Sections 6–7 (the full spec table, open STL/OBJ
output) speak to the lab — a lab's real question is what arrives in their inbox. The two paths
exit differently: dentist → Request a Demo; lab → Talk to a Representative.

## 2. Objections to defeat on this screen

| Objection | Answer | Proof |
|---|---|---|
| "A brand I don't know — can I trust the accuracy?" | Publish the numbers competitors hide: ≤20 µm, 40 s full arch, and invite a chairside demo | Spec table §7 (p31–32); Request a Demo |
| "Scanners lock me into one company's workflow" | The S1 is deliberately open — STL/OBJ to any lab, any CAD, no ecosystem restriction | p31–32 "Open system"; section 7 statement band |
| "Another screen to touch with gloved hands" | Remote control completes a scan without touching the screen — the catalog's own "fast & clean" argument | p31–32 remote control |
| "Heavy wands tire my hand across a day of appointments" | 270 g, rounded 20 × 17 mm tip | p31–32 |
| "Will it handle my actual cases?" | Named indications: crowns & bridges, inlays/onlays, veneers, basic implant planning, orthodontics — plus deep margins and implant scan bodies | p31–32 applications + "good for" list |
| "Who supports me in Egypt / MENA?" | Local representatives and training, linked before the CTA | Screens 073, 075 |

## 3. SEO

| | |
|---|---|
| Primary keyword | intraoral scanner |
| Secondary keywords | digital impressions · full-arch scan · dental scanner |
| Search intent | Commercial — model comparison stage |
| Title tag (<60 chars) | ODYX-S1 Intraoral Scanner — Full-Arch Scans in 40 Seconds |
| Meta description (<160 chars) | The ODYX-S1 intraoral scanner captures full-arch digital impressions in 40 seconds at ≤20 µm — AI margin detection, 270 g, open STL/OBJ export to any lab. |
| URL slug | `/products/odyx-s1-intraoral-scanner` — carries the model name per review #22; 301 from v1's `/products/intraoral-scanner` |
| H1 (one, matches the title) | ODYX-S1 Intraoral Scanner |
| Featured-snippet play | FAQ definition paragraph ("How does an intraoral scanner work?") + the spec table |
| Internal links | 045 Scan (workflow step) · 036 3D Printers (next hardware) · 035 Digital Products (where the STL goes) |

## 4. Copy, section by section

_Mirrors screen-details.md §5 — same order, same names._

### Section 1 · Hero — ODYX-S1
- **Eyebrow:** SCAN · STEP 1 OF 5 _(five-dot micro-spine, first dot filled teal)_
- **Headline:** ODYX-S1
- **Sub:** Intraoral Scanner — AI-powered. Accurate. Effortless. _(client's reference tagline, kept)_
- **Body:** Full-arch digital impressions in 40 seconds, accurate to 20 microns — and open to
  whatever workflow you already run. The ODYX-S1 is where the digital chain starts.
- **CTAs:** Request a Demo _(primary)_ · Download Brochure _(secondary)_ · Buy online _(tertiary;
  price renders only once confirmed — screen-details §13.1)_
- **Microcopy under CTA:** Demos available chairside or online, in Arabic, English or French.

### Section 2 · Why S1 — proof chips
_Five chips, icon + label + one line. Labels stay short enough to survive French._
1. **≤ 20 µm accuracy** — margin-level detail, scan after scan.
2. **Full arch in 40 s** — an impression in the time a tray takes to seat.
3. **270 g in the hand** — comfortable through a full day of appointments.
4. **AI margin detection** — the prep line, found while you scan.
5. **Open system** — STL / OBJ out. Any CAD, any lab, no lock-in.

### Section 3 · Clean by design
- **Eyebrow:** CHAIRSIDE
- **Headline:** Scan without touching the screen.
- **Body:** The S1's remote control lets you complete an entire scan without reaching for the
  display — fewer touchpoints with gloved hands, and a cleaner protocol between patients. At
  270 g with a rounded 20 × 17 mm tip, it stays comfortable for you and tolerable for the
  patient, even on long procedures.
- **Caption (image):** Fast and clean: the full scan sequence, hands on the wand only.

### Section 4 · Scan in action
- **Headline:** See the S1 at work.
- **Body (beside video):** Real-time capture in high-resolution 3D and true color — deep margins,
  implant scan bodies and gingival contour, rendered as they're scanned.
- **Video:** client-supplied (screen-details §13.2). Until then: software still frame.
- **Applications list (each with `.STL` badge):** Crowns & bridges · Inlays / onlays · Veneers ·
  Basic implant planning · Orthodontics
- **Microcopy:** Every case exports as an open STL or OBJ file.

### Section 5 · Software that works with you
_Three panels — only the three catalog-backed features. The reference's "AI Scan Cleaning" and
"Smart Scan Guidance" are not in the catalog and do not ship (screen-details §13.4)._
1. **AI margin detection** — The software traces the preparation margin during the scan, so the
   case leaves the chair lab-ready.
2. **AI soft-tissue filtering** — Tongue and lip capture is filtered out automatically while you
   scan — less cleanup, fewer rescans.
3. **Remote control** — Start, pause and complete a scan from the wand. The screen is for
   looking, not touching.

### Section 6 · Specifications
- **Headline:** Specifications
- **Intro line:** Every number below is from the ODYX product catalog. Download the datasheet or
  request a demo to verify them chairside.

| Spec | Value |
|---|---|
| Accuracy | ≤ 20 µm |
| Scanning speed | 40 seconds, full arch |
| Scan depth | 23 mm |
| Tip | Rounded, 20 × 17 mm |
| Weight | 270 g |
| Imaging | High-resolution 3D (HD), real color |
| Export | STL / OBJ — open system |
| Control | Remote control from the wand |
| Software | AI margin detection · AI tongue-and-lip filtering |

### Section 7 · Open system — statement band
- **Headline:** Your scan. Your workflow.
- **Body:** The S1 exports open STL and OBJ files that any lab and any CAD can read. No
  subscription gate, no ecosystem restriction — the ODYX workflow earns its place at every step,
  it never forces it.
- **Microcopy:** Prefer the full chain? The same file slices in ODYX Box, print-ready for the P1-26.

### Section 8 · Your scan's next step
- **Eyebrow:** THE CONNECTED WORKFLOW
- **Headline:** A great scan is only step one.
- **Stepper:** SCAN ● → DESIGN → PRINT → WASH & CURE → DELIVER
- **Body:** From the chair, your scan becomes a design; the design becomes a print. With the
  P1-26 printing at 18 µm from the S1's ≤ 20 µm capture, precision carries through the whole
  chain — that's how a restoration happens the same day.
- **Ecosystem strip:** P1-26 3D Printer — *prints your scan at 18 µm* · ODYX Resins — *five lines,
  matched to the case* · ODYX Cure — *the finish the resin needs*
- **Link out:** See the full workflow, step by step → (045)

### Section 9 · Clinical cases & reviews
- **Headline:** Proven in the clinic.
- **Structure:** three case cards (case type · scan detail image · clinician name + credential) +
  one pull-quote review with stars.
- **Content:** **client-supplied — never fabricated** (screen-details §13.3; Halim #32 "Put real
  cases with image for the doctor and image for the case"). Ask: named regional clinicians with
  credentials, per the Shining3D KOL model.
- **Link out:** View more cases → (059/060)

### Section 10 · FAQ + Downloads + closing CTA
**FAQ (accordion, four items):**
1. **How does an intraoral scanner work?** — An intraoral scanner projects light onto the teeth
   and soft tissue and captures the reflection with optical sensors, building a 3D digital
   impression in real time — no trays, no impression material.
2. **Does the ODYX-S1 lock me into ODYX software?** — No. The S1 is an open system: it exports
   standard STL and OBJ files that work with any CAD software and any lab.
3. **How fast is a full-arch scan?** — 40 seconds for a full arch, captured in high-resolution 3D
   with real color.
4. **Which cases can I scan with the S1?** — Crowns and bridges, inlays and onlays, veneers,
   basic implant planning, and orthodontics — including deep margins and implant scan bodies.

**Downloads row:** S1 Datasheet (PDF) · Brochure (client-supplied — §13.7) · Manuals → (066)

**Closing CTA band:**
- **Headline:** Put the S1 in your hand.
- **Body:** Book a chairside demo and scan a full arch yourself — in your clinic, on your cases.
- **CTA:** Request a Demo _(primary, repeated)_ · Talk to a Representative _(labs / distributors)_

## 5. The workflow sentences

- **Arriving from the previous step:** — (entry point). From the home hero / ecosystem: "Every
  same-day restoration starts with a scan. This one takes 40 seconds."
- **Leaving to the next step:** "Your scan is ready — see how it becomes a design in ODYX Box,
  or send it to the CAD you already use." → 035 / 046
- **Why the next product exists (one line a buyer would repeat):** "The P1-26 prints the scan you
  just took — at 18 microns, before the patient comes back."

## 6. CTAs

| | Copy | Where it goes | Microcopy under it |
|---|---|---|---|
| Primary | Request a Demo | 072 | Demos available chairside or online, in Arabic, English or French |
| Secondary | Download Brochure | Downloads (`#downloads`) | PDF, EN/AR/FR |
| Tertiary (commerce) | Buy online | Quote/checkout flow — price only when confirmed (§13.1) | — |
| In-line (labs) | Talk to a Representative | 073 | Coverage across Egypt and MENA |
| In-line (workflow) | See the full workflow → | 045 | — |

## 7. Claims register — every number gets a source

| Claim / spec | Value | Source (file + page) | Verified |
|---|---|---|---|
| Accuracy | ≤ 20 µm | ODYX Products 18.7.26.pdf p31–32 | ☑ |
| Full-arch scan speed | 40 seconds | p31–32 | ☑ |
| Scan depth | 23 mm | p31–32 | ☑ |
| Tip size / shape | Rounded, 20 × 17 mm | p31–32 | ☑ |
| Weight | 270 g | p31–32 | ☑ |
| Imaging | High-resolution 3D (HD), real color | p31–32 | ☑ |
| Export formats / open system | STL, OBJ; any lab, no restriction | p31–32 | ☑ |
| Remote control | Complete a scan without touching the screen | p31–32 | ☑ |
| AI margin detection | Yes | p31–32 | ☑ |
| AI tongue/lip filtering | Yes | p31–32 | ☑ |
| Applications | Crowns & bridges, inlays/onlays, veneers, **basic** implant planning, orthodontics | p31–32 | ☑ |
| Good for | Deep margins, implant scan bodies, gingival contour | p31–32 | ☑ |
| Tagline | "AI-Powered. Accurate. Effortless." | Client design reference (intraoral scanne-odyxs1.jpeg) | ☑ |
| P1-26 X-Y accuracy (section 8 cross-ref) | 18 µm | p1–7 | ☑ |
| **Price** | **EGP 449,950 (v1 site only)** | **No catalog source — does not ship until client confirms** | ☐ |
| ~~"Under 60 seconds"~~ | v1 claim | Unsourced — dropped, replaced by 40 s | ✗ |
| ~~"STL, PLY, OBJ"~~ | v1 claim | Unsourced (PLY) — dropped | ✗ |
| ~~"USB-C / Wi-Fi"~~ | v1 claim | Unsourced — dropped; connectivity absent from catalog | ✗ |
| ~~"Autoclavable tips"~~ | v1 claim | Unsourced — dropped; asked in screen-details §13.6 | ✗ |
| ~~"AI Scan Cleaning" / "Smart Scan Guidance"~~ | Reference chips | Not in catalog — held back; asked in §13.4 | ✗ |

**Note:** "basic implant planning" — the catalog's word is *basic*. Never upgraded to "implant
planning" anywhere on this page.

## 8. Arabic

Transcreation, not translation. Arabic is a first-class locale — doing it properly is part of
the trust argument.

- **Terminology:** الماسح الضوئي داخل الفم (intraoral scanner — established clinical term);
  الطبعة الرقمية (digital impression); حواف التحضير (preparation margins). Model name stays Latin:
  **ODYX-S1**, never transliterated.
- **Numerals:** Western 0–9 for all specs (20 µm · 40 ث · 270 غ) — master rule, sitewide. Units:
  ميكرون for µm in body copy; symbol form in the table.
- **Tagline transcreation:** "AI-Powered. Accurate. Effortless." → proposal:
  **«بدقّة الذكاء الاصطناعي. وبلا عناء.»** — keeps the triplet's rhythm as a pair; literal
  three-adjective stacking reads flat in Arabic. Needs native review before client presentation.
- **Headline that won't survive literal translation:** "Your scan. Your workflow." — possessive
  repetition is weak in Arabic; proposal: **«المسح مسحك، وسير العمل خيارك.»** (the scan is yours,
  the workflow is your choice). Native review required.
- **Length check:** Arabic runs similar-to-shorter vs EN for these headlines; the risk is the
  chips — verify the five-chip strip at 375 px in AR. Eyebrows lose uppercase; weight 700 + teal
  carries the style instead.

## 9. French

- **Length:** ~+20% vs EN. Break risks: the five chips ("Détection des marges par IA" — must wrap
  to two lines), the CTA pair in the hero ("Demander une démonstration" is long — allow
  "Demander une démo"), and the stepper labels (NUMÉRISER → CONCEVOIR → IMPRIMER → LAVER &
  POLYMÉRISER → LIVRER — WASH & CURE is the long one; the spine component must tolerate it).
- **Terminology:** scanner intra-oral (hyphenated, standard FR dental usage) · empreinte optique /
  empreinte numérique (digital impression — *empreinte optique* is what FR dentists search) ·
  ligne de finition (margin). "Open system" → « système ouvert ».

## 10. Sources consulted
_Filled by the research pass. Competitor scrapes live in `../../../../.firecrawl/`._

- `knowledge_base/ODYX Products - 18.7.26.pdf` via `docs/products.md` (SCAN, p31–p32) — all claims
- Client reference: `client-design-refrence/product-design-refrences/intraoral scanne-odyxs1.jpeg`
- `.firecrawl/itero.com-our-solutions-itero-lumina.md` (scraped 2026-07-25)
- `.firecrawl/shining3ddental.com-en-solution-intraoral-scanner.md` (scraped 2026-07-25)
- `.firecrawl/3shape.com-en-scanners-trios.md` (on disk)
- v1 live page `odyx-fe-3.vercel.app/products/intraoral-scanner` (fetched 2026-07-25)

### Competitor set — decided at Checkpoint A (2026-07-25)

SprintRay, Formlabs and Stratasys sell no intraoral scanner — dropped for this screen; recorded
as a category finding, not a failed lookup. The set for SCAN is the three real scanner makers:
**iTero (Lumina)**, **3Shape (TRIOS)**, **Shining3D (Aoralscan)** — the last two added at the
user's request. Shining3D is the closest strategic analogue: a Chinese brand building clinical
trust in export markets, which is exactly ODYX's position in MENA.

### Comparison — six dimensions

| Dimension | iTero Lumina (single-model page) | 3Shape TRIOS (portfolio page) | Shining3D Aoralscan (category page) |
|---|---|---|---|
| **Content** | Hero value-prop → GP/Ortho audience split → "why professionals choose" by discipline → peer case gallery → video → hero feature (3× FOV) → software suite carousel → 3 configurations → named-doctor quotes | Hero trust claim → stat pair (12× award, "a patient every 0.9 s") → 4 model cards with one-word positioning (Revolutionary / Intelligent / Proven / Core) → feature comparison table → software (Unite) → services & warranty → testimonials per model → How to buy (Demo / Shop / Trade up) | SEO-led H1 → anchor nav (Overview / Awards / Testimonials / Types / Comparison / Clinical cases / FAQ) → educational "why you need one" → 4 ecosystem value props → awards row → KOL testimonials → lineup by type (IPG / wireless / wired) → full spec table → case studies → FAQ |
| **Level of detail** | Almost no hard specs on-page — no µm, no weight. Specs deferred to a separate PC-config page | Feature checklist, no numbers; spec depth deferred to per-model pages | Deepest: full numeric comparison on the category page — weights, dimensions, scan fields, even PC requirements |
| **Technical depth** | Benefit-framed comparatives ("2× faster", "50 % smaller wand", "3× larger FOV") — every one carrying a numbered footnote to bench methodology (18 footnotes) | Features named in benefit language ("ScanAssist", "calibration-free"); assumes the reader, explains nothing | Leads with technology taxonomy — photogrammetry vs structured light — and explains what IPG *is*. Teaches |
| **Product linking** | Routes to software (Align Oral Health Suite) and Invisalign — a **closed** ecosystem; "Compare all iTero scanners" | "A great scan is just the beginning" → Unite → labs, apps, PMS. Strongest workflow *sentence* of the three | "End-to-end digital dentistry solution", clinic↔lab cloud; case studies pair scanner + face scanner. Ecosystem is claimed, not walked |
| **Animation / interaction** | Carousels, video block, configuration cards — modest | Comparison table, demo/shop overlays | Anchor nav, sliders, accordion FAQ |
| **Proof** | Real peer scan-case gallery; named doctors with credential + practice + state; survey stats (90 %, 92 %); footnoted bench tests vs named rivals | 25 years, 12× Cellerant award, usage stat, named dentists quoted about a *specific model*, first-year TRIOS Care warranty | Design awards (iF, Red Dot) + institutional (IDD, DDS) + KOL testimonials with academic credentials — including **Dr. Amr Elkhadem (Egypt)** — + clinical case studies |

### Take / reject

**Take:**
- **iTero — the claim-plus-source pattern.** Every headline number footnoted to methodology. Ours is
  the same move with catalog page cites (§7). A claim without a source doesn't ship; iTero proves
  the discipline reads as premium, not pedantic.
- **iTero — peer case gallery.** Real scan imagery, named clinicians. The client reference already
  asks for exactly this (Clinical Cases & Reviews) and Halim #32 demands real cases.
- **3Shape — the workflow bridge sentence.** "A great scan is just the beginning" is the single best
  line in the category and it is *our* thesis. Ours continues into physical hardware, theirs into software.
- **3Shape — Demo + buy dual path.** Matches the Checkpoint A decision (Request Demo primary, Buy
  online retained).
- **Shining3D — anchor nav.** Overview / Comparison / Cases / FAQ maps almost 1:1 onto the client's
  requested inner links (Overview / Models / Specs / Downloads). Validated pattern.
- **Shining3D — credentialed KOLs as the trust engine.** The playbook for a Chinese brand earning
  clinical trust abroad, including a MENA name. This is the proof strategy for ODYX; flag to client
  as the ask: named regional clinicians with credentials.
- **Shining3D — the FAQ that teaches.** Explaining how a scanner works in plain language serves
  complaint 6 ("boring for doctors") and wins featured snippets.

**Reject:**
- **iTero's spec-free page.** The S1's ≤20 µm / 40 s / 270 g / open-system specs are real
  differentiators and the client reference explicitly draws a Technical Features list. Publish specs.
- **iTero's comparative claims against named competitors.** Needs bench data we don't hold; legal
  exposure. Never.
- **iTero's closed-ecosystem software upsell.** The S1's story is the opposite — open system, STL/OBJ
  to any lab (p31–32). Our trust argument *is* the absence of lock-in.
- **3Shape's portfolio structure and Shining3D's 6-model comparison table.** We have one scanner.
  Single-model page per Checkpoint A; the family question is logged in screen-details §13.
- **Trade-up / financing devices.** No pricing architecture in the catalog to support them.

### Where we beat all three

None of the three walks the scanner forward into a physical workflow on the page. iTero routes to
software, 3Shape to software and labs, Shining3D claims "end-to-end" but the page never takes you
to the printer. **Ours does: SCAN is step one of a five-step chain with real hardware at every
step, and the client's own reference already draws the Compatible Products strip (P1-26 → Resin →
Cure).** The workflow spine is the differentiator no competitor occupies — which is exactly what
the client is buying.

### Vocabulary observed (feeds §3 SEO)

"intraoral scanner" (universal head term) · "digital impressions" · "full-arch scan" · "wand" ·
"chairside" · "scan clean-up" · "clinic-to-lab workflow" · "case acceptance" · "All-on-X" ·
"structured light" · FAQ phrasing mirrors real queries ("how does an intraoral scanner work").
