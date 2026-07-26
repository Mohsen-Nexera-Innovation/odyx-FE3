# Competitive analysis & benchmark verdict

> **Phase 2 deliverable.** Companion to [reference-decode.md](reference-decode.md), which is the
> **answer key** this file scores against. Client references outrank competitors — always.
>
> 🔒 **Internal.** §4 decides a benchmark *we* chose. SprintRay was never an ODYX instruction and is
> never presented to them as one. §5 is the only section written to survive a client meeting.

**Scraped:** 2026-07-25 · 15 files in [`.firecrawl/`](../.firecrawl/) · 8 `branding-*.json` extractions.

---

## 0. Verdict, first

**Split the benchmark. SprintRay is retained as the coverage benchmark and demoted as the visual
one. Formlabs Dental is elevated to the visual benchmark for product pages.**

SprintRay maps 60 of our 76 pages and is the only competitor localised for MENA — that asset is real
and nothing replaces it. But on the section vocabulary the client's own references draw, Formlabs
matches and SprintRay diverges: Formlabs has the ecosystem strip, the numbered workflow and named
practitioner reviews; SprintRay's Pro 2 page opens on stat blocks the references never use, puts its
spec table behind a PDF, and carries **zero** testimonials. Its primary is crimson `#CC0033` against
ODYX's approved blue.

The argument against this verdict is in §4.4, and it is not weak.

---

## 1. Scope and method

### 1.1 The two jobs a benchmark does — and only one is on trial

This distinction dissolves the "validate or replace" question rather than winning it.

| Job | What SprintRay supplies | Status |
|---|---|---|
| **(a) Coverage / IA** — *what page belongs here* | A per-page URL for **60 of 76** sitemap rows ([page-inventory.md](page-inventory.md)), including the awkward ones — device registration, warranty status, AI chat, language switcher. Plus an **`en-sa` locale**: SprintRay has already localised for ODYX's exact target market | Strong, already banked |
| **(b) Visual / experience** — *what it should look and feel like* | Nothing the client ever asked for | **Untested — this is what Phase 2 tests** |

**No other competitor can do job (a).** Formlabs Dental's catalog is narrower, Stratasys is
lab/enterprise-only, 3Shape is scanning-only. Replacing SprintRay outright would discard 60 rows of
gap analysis to fix a problem located entirely in column (b).

### 1.2 The rubric — answer key is the client, not our taste

Twenty attributes, all **observable** rather than aesthetic. The answer key column is what the 13
client references do, per [reference-decode.md](reference-decode.md). Scoring: **Match 1 · Partial
0.5 · Miss 0**, unweighted. Weighting is where opinion re-enters; if a weighting is ever needed it
gets named and both totals shown.

### 1.3 The decision rule — written before any score was entered

- **Keep SprintRay as visual benchmark** if it tops the table, or is within 2.0 of the top and no
  competitor beats it on ≥3 of the section-vocabulary attributes (7–15).
- **Split** if another site wins by ≥2.0 while SprintRay retains its unique coverage advantage.
- **Replace outright** only if a competitor wins the visual score **and** offers ≥60 mappable pages.
- **A falsification paragraph is mandatory** whatever the verdict (§4.4).

### 1.4 What we scraped — and the bias we had to correct first

The inherited scrape set was **printer-biased**. The client reference set is **resin-biased**. They
barely overlapped: we had scraped competitors precisely where the client is silent.

| | homepage | category hub | printer detail | scanner | resins / materials | wash & cure |
|---|---|---|---|---|---|---|
| SprintRay | ✅ + `en-sa` | ✅ | ✅ Pro 2 | — | ✅ **added** | ✅ **added** |
| Formlabs Dental | ✅ | ✅ | ✅ Form 4B | n/a | ✅ **added** | in-page |
| Stratasys Dental | ✅ | ✅ | ✗ | n/a | in-page | ✗ |
| 3Shape | ✅ **re-scraped** | — | n/a | ✅ **added** TRIOS | n/a | n/a |

Six pages were added on 2026-07-25 to close that gap. The 3Shape homepage was re-scraped: the
inherited file was 5 KB and gated by an *"Internet Explorer is not supported"* interstitial.

**Two honest limits, both material:**

1. **3Shape remains thin** — 6.5 KB homepage, 7.9 KB TRIOS, and the IE banner still appears in the
   markdown. 3Shape is a genuinely light-content site, but its scores carry lower confidence than
   the other three and are marked ⚠️ below.
2. **Motion is not measurable by any scrape.** Firecrawl captures no motion in any format. Attributes
   below are all static-observable; the motion question is logged in §10 as outstanding and needs a
   20-minute human browsing pass. It is deliberately **not** allowed to gate this phase.

---

## 2. Per-site profiles

### 2.1 SprintRay — the incumbent benchmark

- **IA:** product-led. Homepage opens on a **masterclass promotion**, then material and appliance
  sections (`Built for Dentistry`, `Unlock Next-gen Printed Appliances`, `Cutting Edge 3D Printing
  Materials`). Commerce-forward.
- **Product page (Pro 2):** `hero → 3x / 4x / 15+ stat blocks → Precision Revolution → indication
  list (Night Guards, Dentures, Surgical Guides, Models, Retainers…) → component deep-dives
  (Pixel Perfect Accuracy, 35µm, Onboard Intelligence, 385nm UV-A) → ecosystem → CTA`.
- **Ecosystem:** ✅ present and explicit — *"SprintRay doesn't stop with printing. Our ecosystem
  includes design software and services, printers, and post processing equipment. It all works
  together to create a singular, streamlined workflow experience."*
- **Spec table:** ❌ **a PDF download**, not an on-page table.
- **Reviews:** ❌ **zero.** No testimonial, no named practitioner, no star rating anywhere on the Pro 2 page.
- **Branding:** primary `#CC0033`, `colorScheme: dark`, radius 5px, Roboto, base unit 4.
- **MENA:** ✅ `en-sa` locale — unique in the set.

### 2.2 Formlabs Dental — the challenger

- **IA:** audience-led. Homepage runs `Trusted by Labs, Loved by Dentists → Latest News →
  **Dental Laboratories / Dental Practices / Orthodontics** → Formlabs Dental: Your Partner for
  Innovation → Software → Resources`. That three-way split is a role router.
- **Product page (Form 4B):** `hero with a quantified claim ("Print 11 dental models in 9 minutes")
  → Low Force Display technology → **named practitioner reviews** → **numbered workflow** →
  **The Form 4B Ecosystem** → materials`.
- **The workflow, verbatim:** `1 Import your model and prepare your print · 2 Load a material and
  click print · 3 **Remove, wash, cure** · 4 Finish your part` — and step 1 notes *"Automatic print
  setup based on indication."*
- **Reviews:** ✅ named, titled, attributed — *Stephan Kreimer, MDT, Kreimer Dentallabor*;
  *Alan Alves, Director, Smileep*.
- **Branding:** primary **`#0762C8`** — the only blue-family primary in the set, and the nearest
  thing to ODYX's approved `#0050D8`. Light scheme, radius 12px, pill buttons (40px), base unit 4.

> **Independent corroboration of our five-step workflow.** Formlabs groups **wash and cure into one
> step**. CLAUDE.md's correction — WASH folds into CURE, because a printed part is washed in IPA
> before it is post-cured — is not an ODYX idiosyncrasy. Best-in-class does the same.
>
> Note the asymmetry honestly: Formlabs keeps a **Finish** step. ODYX dropped it because no product
> backs it after staining & glazing was removed at the client's request (review #7). That is a
> product-line difference, not a modelling error on either side.

### 2.3 Stratasys Dental — the trust-device source

- **IA:** **indication-led**, the only one in the set: `What is Dental 3D Printing? → Applications →
  Printers → **High Efficiency, Low Touch Workflow** → Trusted by Dental Labs Worldwide → Advanced
  Materials → Service & Support → FAQ`.
- **Trust devices:** ✅ strongest in the set — named customer logos (Glidewell) linking to case studies.
- **Buyer:** the enterprise laboratory. ODYX is clinic-first. **Not a contender for the visual
  benchmark**, and scored here only to keep the table complete.
- **Branding:** primary `#32C8FF` cyan, radius 2px, base unit 4.

### 2.4 3Shape — the scanner archetype ⚠️

- **Homepage H1: *"Better dental care starts with better workflows."*** The only competitor to put
  workflow in the headline.
- **Role router:** ✅ *"I want to:"* → `Understand digital dentistry · Explore TRIOS scanners ·
  Discover lab solutions · Get support & training`. **This is the "Choose Your Path" pattern
  (screen 009) — the section the client asked *us* what to put in.**
- **TRIOS page:** `hero + breadcrumb → Compare TRIOS scanners → "A great scan is just the beginning"
  → Services → **What others say about TRIOS** → How to buy`.
- **Branding:** primary `#D1004B` crimson, radius 0px — the sharpest, most editorial of the four.
- ⚠️ Low confidence: 6.5 KB / 7.9 KB scrapes with a persistent IE interstitial.

---

## 3. Scorecard

Answer key = the client references. **M** = 1 · **P** = 0.5 · **✗** = 0.

| # | Attribute (what the references do) | SprintRay | Formlabs | Stratasys | 3Shape ⚠️ |
|---|---|:--:|:--:|:--:|:--:|
| 1 | Light-dominant surface | ✗ dark scheme | **M** | **M** | **M** |
| 2 | Dark reserved for a *lineup*, not default | P | **M** | P | **M** |
| 3 | Primary in the blue family (`#0050D8`) | ✗ `#CC0033` | **M** `#0762C8` | P `#32C8FF` | ✗ `#D1004B` |
| 4 | Eyebrow label above the H1 | **M** | **M** | P | **M** |
| 5 | Breadcrumb on product detail | ✗ | P | ✗ | **M** |
| 6 | Solid primary + outlined secondary CTA pair | **M** | **M** | **M** | **M** |
| 7 | Feature-chip row under the hero | P | **M** | **M** | P |
| 8 | **No big-number stat blocks** | ✗ `3x/4x/15+` | **M** | **M** | **M** |
| 9 | **On-page** spec table | ✗ PDF | P | P | **M** compare |
| 10 | Applications as a captioned grid | **M** | **M** | **M** | P |
| 11 | Workflow strip, sequential | P | **M** 4-step | **M** | P |
| 12 | Ecosystem / compatibility strip | **M** | **M** | P | P |
| 13 | Case flow, before → printed → final | P | P | **M** | P |
| 14 | **Named reviews with attribution** | ✗ **zero** | **M** | P logos | **M** |
| 15 | Interactive calculator | P ROI ref | ✗ | P | ✗ |
| 16 | Card-in-container as default | **M** | **M** | **M** | P |
| 17 | Category color-coding | ✗ | P | **M** | ✗ |
| 18 | Inline click-to-play video | **M** | **M** | **M** | **M** |
| 19 | Indication-led IA | P | P | **M** | P |
| 20 | MENA / regional localisation | **M** `en-sa` | ✗ | ✗ | ✗ |
| | **Total / 20** | **11.0** | **15.5** | **13.5** | **11.5** ⚠️ |
| | **Section vocabulary only (7–15)** | **5.0** | **7.0** | **7.0** | **6.0** |

---

## 4. The verdict, argued

### 4.1 What SprintRay is genuinely strong at

Coverage (60/76), MENA localisation (attribute 20, uniquely), commerce depth, and a confident
technical voice. Its component deep-dives — *Pixel Perfect Accuracy*, *35µm Resolution*, *385nm
UV-A* — are a good model for how to make a spec feel like an argument rather than a row in a table.

### 4.2 Where it diverges from the client's approved taste

Three divergences, each measurable:

1. **Stat blocks.** `3x / 4x / 15+` opens the Pro 2 page. **No client reference uses this device.**
   The sharpest single discriminator in the set.
2. **Spec table behind a PDF.** Every printer and resin reference draws the spec table **on the
   page**. Attribute 9.
3. **Zero reviews.** The client references carry named-dentist reviews with `--gold` star ratings —
   a component already in MASTER §6. SprintRay's Pro 2 page has none.

Plus the palette: crimson `#CC0033` against ODYX's approved blue.

### 4.3 Recommendation, against the pre-registered rule

Formlabs wins by **4.5 points**, clearing the ≥2.0 threshold, while SprintRay retains the coverage
advantage no one else can supply. §1.3 calls that a **split**:

| Role | Benchmark | Why |
|---|---|---|
| **Coverage / IA** | **SprintRay** (retained) | 60/76 mapped, `en-sa` locale |
| **Product-page visual** | **Formlabs Dental** (elevated) | 15.5/20; matches the section vocabulary and the blue family |
| **Indication-led IA + trust devices** | **Stratasys** | Only indication-led site; strongest customer proof |
| **Role router + scanner archetype** | **3Shape** ⚠️ | Owns the "Choose Your Path" pattern and the only scanner page |

### 4.4 🔴 The strongest argument against this conclusion

*Written in earnest, as §1.3 requires.*

**SprintRay's stat blocks and typographic drama are aimed squarely at complaint 6 — "boring for
doctors to explore, not attractive" — and the client reference set does not obviously solve that
complaint at all.** The references are quiet: card-based, table-led, orderly. Measured, they are
also the densest layouts in our evidence (§3.2 of the decode: resin insets ≈0.03).

There is a real possibility that ODYX approved a reference set that is itself a bit dull, and that
`3x / 4x / 15+` is precisely the "Wow" they keep asking for and cannot articulate. If we
faithfully systematise the references and nothing else, we may deliver a site that satisfies
complaints 1–5 and fails 6 — the one the client called the missing "Wow."

**How Phase 3 must hold both:** take Formlabs' section vocabulary as the skeleton, and take
SprintRay's *confidence* — quantified claims, dramatic type, the spec-as-argument treatment — as the
tone laid over it. Note Formlabs already does this in its own register: *"Print 11 dental models in
9 minutes"* is a stat block that reads as a sentence. **That is the synthesis, and it is the single
most important instruction this analysis hands forward.**

### 4.5 What would override all of this

[PLAN.md](PLAN.md) open question **#6 — "has ODYX ever named a website they admire?"** One sentence
from the client outranks this entire document. **Send it now; do not block on it.**

Second question, new: **who produced the 13 reference images** — ODYX, a Chinese HQ agency, or a
generative tool? [reference-decode.md](reference-decode.md) §1.1 logs artifacts suggesting
generation. It changes their authority on *layout*, not on *taste*.

---

## 5. Where the connected workflow beats all four

**The only section here written to be shown to the client.**

Every competitor communicates the workflow **as a section**. Not one runs it as a persistent
navigational spine.

| Site | Workflow treatment | Ceiling |
|---|---|---|
| Formlabs | 4 numbered steps, one static in-page graphic on the product page | Explains once, then disappears |
| Stratasys | `High Efficiency, Low Touch Workflow` — a section | Same |
| 3Shape | Workflow in the H1, then nothing structural | A claim, not an architecture |
| SprintRay | Ecosystem paragraph + image on Pro 2 | Prose, not navigation |

**None of them lets you enter at any step and travel the chain.** That is exactly complaint 5 —
*"sections aren't connected"* — and the differentiation is available because nobody in the category
has taken it. It is not a better version of what competitors do; it is a thing they do not do.

The client already drew it. The `Compatible with ODYX Ecosystem` strip in the P1-26 reference —
scanner → printer → resins → cure with dotted connectors — is the spine, at section scale. Phase 3
promotes it from a section to the architecture.

---

## 6. What we take, and what we refuse

| Source | Take | Refuse |
|---|---|---|
| **Formlabs** | Section vocabulary; the 4-step workflow shape; named practitioner reviews; the ecosystem strip; the quantified-claim headline | Lab-first framing — ODYX is clinic-first |
| **SprintRay** | Confidence of voice; spec-as-argument; the `en-sa` localisation model | Stat-block openers; spec tables behind PDFs; the crimson palette; masterclass-promo homepage |
| **Stratasys** | Indication-led IA for Solutions; named customer logos as proof | Enterprise density; lab-only buyer framing |
| **3Shape** | The `I want to:` role router → screen 009; workflow-forward headline; the scanner archetype | Crimson palette; thin content model |

**A competitive analysis with no rejections isn't an analysis.** The refusals column is the load-bearing one.

---

## 7. The homepage borrow map

The homepage has **no client reference image** but **is** verbally directed — see
[reference-decode.md](reference-decode.md) §7.1. **Order and roster come from the client; only form
is ours to source.** Every row cites a review number, a screen, a reference, or a competitor URL.
No row is sourced to "we think."

| # | Section | Order source | Form source | Note |
|---|---|---|---|---|
| 1 | Hero | screen 008 · review 3, 4, 28 | competitor — no client ref for a homepage hero | **Blocked on ODYX footage** (review 4). Specify with *and* without video |
| 2 | **Ecosystem / workflow spine** | **review 8 — *"Ecosystem must come first"*** | client ref `printer-odyx-p1-26` ecosystem strip, promoted to full width | Review 9, 30: *"enhance the animation"*. MASTER §5 Tier A |
| 3 | Featured Products | review 8, 6, 21 | client ref `all-resign` 5-up grid, **borders removed** per client comment | Review 21: presentation *"is not unified"*. Review 22: show model names |
| 4 | Choose Your Path | screen 009 · review 29 | **3Shape `I want to:` router** | The client asked *us* what goes here |
| 5 | Why ODYX | **review 31 — *"need to be under the video"*** | Formlabs `Your Partner for Innovation` | Review 10: *"more visual and engaging"* |
| 6 | Clinical Cases | review 32 | client ref triptych (**not** a slider — decode §5.1) | Review 32: *"real cases with image for the doctor"* |
| 7 | Proof | **review 11 — split into three** | Stratasys customer-logo row | Was one merged section |
| 8 | Learning | review 11, 36 | Formlabs `Dental Resources` | Review 36: *"Support shouldn't be part of learning"* |
| 9 | Support | review 11, 36 | Stratasys `Dedicated Service & Support` | Now standalone |
| 10 | Latest News | **review 34 — *"like newspaper website"*** | Formlabs `Latest News` — the only competitor leading with news | Editorial, not cards |
| 11 | Device Registration | review 12, 24 | — | Review 24: remove from top; review 12: reachable from nav |
| 12 | Buy Online | **review 35 — *"replace it with Buy online. As we are not retailers"*** | — | Gated on scope question 11 |
| 13 | Contact · Case Library · Events | **review 37 — absent from the homepage** | — | Client-requested additions |

**Removed outright:** Staining & Glazing everywhere (review 7 — hero, products, ecosystem, dropdown).
**Collapsed:** Request a Demo becomes a CTA, not a section (reviews 16, 26).

**Three sections with no form source at all:** Device Registration, Buy Online, and the
Contact/Case Library/Events additions. No competitor and no client reference covers them. Flagged
rather than invented — they need a Phase 3 proposal of their own.

---

## 8. Sitemap merge candidates, judged against competitor IA

[PLAN.md](PLAN.md) §6 decision 5 defers these explicitly *"to evaluate in Phase 2."* Competitor IA
is the evidence, so they are evaluable now.

| Candidate | Competitor evidence | Recommendation |
|---|---|---|
| **Guided Workflows — 9 pages** | **No competitor gives a page per workflow step.** All four treat the workflow as one unit | **Merge six single-step pages into one deep-linkable module.** This *strengthens* the complaint-5 fix rather than diluting it — the spine becomes the page. Keep the Hub, Dentist and Lab variants |
| **Contact — 5 near-identical forms** | Every competitor runs one routed contact form | **Merge to one routed form.** Constraint holds: Request a Demo, Book Training and Become a Distributor stay as **routes** |
| **Case Library — split by application / by product** | Stratasys runs one filterable case-study library | **Merge to one filterable view** |
| **Support — 7 pages, several thin** | Stratasys `Dedicated Service & Support` is one hub; SprintRay splits | **Keep separate but restructure** — review 36 says *"Support shouldn't be part of learning."* The client wants support **more** distinct, not merged away |

Net: 76 → roughly **64–66** pages, with no entry point lost.

---

## 9. Differentiation check — does `#0050D8` collide?

| Brand | Primary | Collision risk vs `#0050D8` |
|---|---|---|
| ODYX | `#0050D8` | — |
| **Formlabs Dental** | **`#0762C8`** | ⚠️ **Real.** Same family, similar value |
| Stratasys | `#32C8FF` | Low — cyan, much lighter |
| SprintRay | `#CC0033` | None |
| 3Shape | `#D1004B` | None |

**Verdict: proceed.** The palette is client-approved (2026-07-25) and a competitor's blue does not
reopen it. But Formlabs is the nearest neighbour *and* the elevated visual benchmark — so the
differentiation has to come from somewhere other than hue. It comes from the **two accent axes**
(MASTER §1), which no competitor has: Formlabs uses one flat brand blue throughout, while ODYX
color-codes by product family and clinical category. That is a structural difference, and it is what
makes an ODYX page unmistakable at a glance with the logo cropped out — complaint 1's actual fix.

Also open, unaffected by this: logo cyan `#06A5DE` vs action blue `#0050D8`
([logo-colors.md](logo-colors.md)).

---

## 10. Open questions, and what each blocks

| # | Question | Blocks |
|---|---|---|
| 1 | **Has ODYX named a site they admire?** (PLAN OQ 6) | Would override §4 entirely. Send today |
| 2 | **Who produced the 13 references?** | Their layout authority (decode §1.1). Not their taste authority |
| 3 | **Competitor motion** — 20-minute human browsing pass | Attribute-level confidence on motion. Deliberately not gating |
| 4 | Hero video — who shoots it, when? (review 4) | Homepage hero form, row 1 |
| 5 | E-commerce in scope? (PLAN OQ 11) | Row 12, and the Support merge |
| 6 | Chinese as a 4th locale? (PLAN OQ 9) | The type system — Noto Sans SC pairing |

**Deliberately out of scope:** Stratasys product-detail pages (wrong buyer), 3Shape beyond TRIOS +
homepage (scanner-only vendor), SprintRay checkout flows (blocked on question 5).

---

## What Phase 3 receives

1. **Benchmark verdict** — split, §4.3, with the falsification paragraph §4.4 attached
2. **The synthesis instruction** — Formlabs' skeleton, SprintRay's confidence (§4.4). The most important line here
3. **Six archetypes with section sequences** — [reference-decode.md](reference-decode.md) §6
4. **Validated container** — 1280/48 confirmed at 51px measured; vertical rhythm deliberately unresolved
5. **Four rhythm rules** answering complaint 4 — decode §4.2
6. **The homepage borrow map** — §7, every row cited, three gaps named
7. **Merge recommendations** — §8, 76 → ~64–66 pages
8. **Take/refuse list** — §6
