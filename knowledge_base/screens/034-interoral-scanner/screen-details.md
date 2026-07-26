---
screen: 034-intraoral-scanner
section: Products
page: Intraoral Scanner
tier: Detail            # Landing | Hub | Detail | Utility
workflow_step: SCAN
audience: Dentists + dental labs
v1_status: live
live_url: https://odyx-fe-3.vercel.app/products/intraoral-scanner
spec_status: drafted          # scaffold | drafted | reviewed | approved
owner: reksols / Khaled
---

# 034 · Intraoral Scanner

> Scaffolded from the sitemap xlsx. Everything under **Client input** is the client's, verbatim —
> quote it, don't paraphrase it away. Everything marked TODO is yours to decide and to justify.

## 1. Purpose

The ODYX-S1 product page: where a dentist or lab decides the scanner is credible — and where the
five-step workflow *starts*. It is the only screen that sells the SCAN step's hardware; every
workflow narrative on the site ultimately lands its first click here.

## 2. Client input (verbatim — do not rewrite)

**Client comment (`Remaining work (5 July)`):**
- _(none)_

**Description (client):** Product family page for ODYX Intraoral scanners.

**Proposed content (client):** Benefits, models, specifications, videos, use cases, downloads and demo CTA.

**Inner links (client):** Overview / Models / Specs / Downloads

**Client notes:** _(none)_

**Responsibility (client):** Scientific Team

**From the 37-item review, mapped to this screen:**
- **#22** — "In the name of the product, we shouldn't say only Interoral scanner, we should display the name of the model"

**Client design reference:** `knowledge_base/resources/client-design-refrence/product-design-refrences/intraoral scanne-odyxs1.jpeg`
— a near-complete page design, not a mood board. Its skeleton: light hero (device on stand,
"AI-Powered. Accurate. Effortless.", Request Demo + Download Brochure) → "Why S1?" five icon
chips → Applications with `.STL` tags + "Videos for S1" → AI-Powered / Technical feature lists →
Compatible Products (P1-26 · Resin · Cure) → Clinical Cases & Reviews. This outranks every
competitor input; the section table below systematizes it.

<details><summary>reksols' own gap analysis (not client-authored)</summary>

- **v1 status:** live
- **Live URL:** https://odyx-fe-3.vercel.app/products/intraoral-scanner
- **Mapping notes:** —
- **SprintRay reference:** Not found — SprintRay does not sell intraoral scanners
  — our benchmark, a hypothesis to pressure-test. Never present it to ODYX as their idea.
- **Competitor set for this screen (Checkpoint A, 2026-07-25):** iTero Lumina, 3Shape TRIOS,
  Shining3D Aoralscan. Research note in [content.md](content.md) §10.
</details>

## 3. Which complaint does this screen answer?

- [ ] 1 · No identity
- [x] 2 · Every screen looks the same
- [x] 3 · No clear design per page
- [ ] 4 · Too many boxes on the homepage
- [x] 5 · Sections aren't connected
- [x] 6 · Boring for doctors to explore

**How this screen answers them:**
- **#2 / #3** — the scanner archetype is the *airiest* page in the product set (measured density
  0.121 vs printer 0.079, resin 0.025–0.045), teal-accented, light-surface. It cannot be mistaken
  for the printer page (dark-capable, orange, denser) or the resin page (dense, gradient
  environments). The H1 is the model name — review #22 — not a generic category.
- **#5** — the page opens with its workflow position ("SCAN · Step 1 of 5"), and ends by *handing
  the reader to the next step* — scan → design → print — with the client's own Compatible
  Products strip systematized as the ecosystem strip.
- **#6** — the signature scan-sweep motion (§ sub-design-system), the software video, and a spec
  presentation that teaches rather than dumps (per the Shining3D research finding).

## 4. Page tier and archetype

**Tier:** Detail — confirmed at Checkpoint A. It is a product page: reference skeleton, standard
density going dense in specs, light product hero.

**Archetype:** **Product Detail — Scanner variant** of the master reference skeleton
(`hero → feature chips → why → video → specs table → applications → workflow strip → ecosystem
strip → clinical cases → reviews`). No new archetype needed; the scanner variant narrows it:
light-airy throughout (no dark band — dark is for lineups, and this is a single device), teal
Axis-A accent, densest section is the spec table only.

## 5. Sections on this screen

| # | Section | Form | Job (what the user gets) | Source of truth |
|---|---|---|---|---|
| 1 | Hero — ODYX-S1 | Split: type left, device photo right, light surface | Model name (review #22), tagline, workflow entry marker "SCAN · Step 1 of 5", primary CTA | Reference hero; claims p31–32; real S1 pixels (`product-images/`) |
| 2 | Why S1 — proof chips | 5-up icon chip strip (not cards) | The five reasons in nine words each: ≤20 µm · 40 s full arch · 270 g · AI margin detection · open system | Reference "Why S1?"; p31–32 |
| 3 | Clean by design | Editorial split: large in-clinic image + copy | The chairside argument — remote control = scan without touching the screen; infection control; 270 g over a full appointment | Catalog "fast & clean" framing, p31–32 |
| 4 | Scan in action | Split: software video player + applications list with `.STL` badges | See the software actually working; which indications the S1 serves | Reference "Videos for S1" + Applications; video **client-supplied** (§13); applications p31–32 |
| 5 | Software that works with you | 3-panel sticky-scroll (desktop) / stacked (mobile) | The three catalog-backed AI/software features: AI margin detection · AI tongue-and-lip filtering · remote control | p31–32 **only** — reference lists two features the catalog doesn't back (§13) |
| 6 | Specifications | Dense anchor-linked table (`#specs`) | Full sourced spec table — the lab's section; every row page-cited | p31–32, claims register content.md §7 |
| 7 | Open system | Full-width statement band (type-led, no box) + DESIGN hand-off foot band | The trust argument: STL/OBJ to any lab, no lock-in — the anti-iTero position. Then the constructive half: the open file's next phase is DESIGN — micro-spine at step 2, ODYX Design Services offer, secondary CTA "Explore Design Services" → `/design-services` | p31–32; service list from `src/content/design-services.ts` (five SKUs), no prices shown |
| 8 | Your scan's next step | Workflow stepper + ecosystem strip (P1-26 · Resins · Cure, dotted connectors) | Hand-off to DESIGN → PRINT; the connected-workflow moment; cross-sell with arguments | Reference "Compatible Products"; master ecosystem-strip component |
| 9 | Clinical cases & reviews | 3-up case cards + named-dentist quote | Proof — real cases, real clinicians (Halim #32: real content **client-supplied**, §13) | Reference "Clinical Cases & Reviews"; Shining3D KOL finding |
| 10 | FAQ + Downloads + CTA | Accordion (4 items) + utility download row + closing CTA band | Featured-snippet SEO, objection handling, brochure/datasheet, final Request Demo | Shining3D FAQ finding; client inner link "Downloads" |

Column-count sequence: split → 5-up → split → split → 3-panel → table → full-width → strip → 3-up
→ accordion. No two consecutive sections share a form; one type-led full-width band per three
inset sections (§7). Master rhythm rules hold.

## 6. Workflow connection

This screen sits at **SCAN** — the entry point of the chain.

```
SCAN → DESIGN → PRINT → WASH & CURE → DELIVER
 ●
```

| | |
|---|---|
| **Upstream step** | — (entry point; arrivals come from home, Products hub 033, Solutions 042/043) |
| **Downstream step** | `046-design` (DESIGN) — and commercially, `036-3d-printers` (PRINT) |
| **How the spine appears here** | Twice, deliberately: (1) hero eyebrow "SCAN · STEP 1 OF 5" with a five-dot micro-spine, first dot teal-filled; (2) section 8 — the full stepper with the ecosystem strip, deep-linkable, reverses in RTL |
| **Can a user enter the chain here?** | Yes — this is the most likely product entry (a scanner is the first purchase in going digital). They leave to 046 Design (workflow story) or 036 Printers (product path); both exits live in section 8 |

## 7. Cross-sell and product linking

| Relationship | Product / screen | The argument (why a buyer cares) |
|---|---|---|
| **Requires** (won't work without) | Nothing ODYX — by design | The S1 is an open system: STL/OBJ export, any lab, no ecosystem restriction (p31–32). The absence of a requirement *is* the argument — the workflow is chosen, not enforced |
| **Pairs with** (better together) | 035 Digital Products (DESIGN) | The scan exports to the CAD you already use — or into ODYX Box, pre-set to slice for the P1-26. One less format hand-off to debug |
| **Design-as-a-service** (no CAD seat needed) | Design Services (`/design-services`) | The DESIGN step without buying software: upload the S1's STL, ODYX designs the case (single units, smile design, RPD, splints, surgical guides), delivered back print-ready. Offered twice: §5 software link-out and the §7 hand-off band with "Explore Design Services" CTA |
| **Completes the workflow** (next step's hardware) | 036 P1-26 + 039 Resins, then 037 Cure | The scan you take chairside becomes a printed restoration in-house: P1-26 prints at 18 µm X-Y from the S1's ≤20 µm scan — precision in, precision out. Same-day is the chain's promise, and it starts with this scan |
| **Upgrade / alternative** | — none | Single-model line today; "more scanners coming?" logged in §13 |
| **Consumable pull-through** | ⚠ unknown | Catalog lists no scanner tips/sleeves as consumables. Asked in §13 — if tips are consumable, this page needs a reorder path |

**Ecosystem strip:** section 8 reuses the master component (scanner → printer → resins → cure,
dotted connectors) — systematized from the client's printer reference, and already drawn on this
page's own reference as "Compatible Products".

## 8. Conversion path

| | |
|---|---|
| **Primary CTA** | **Request a Demo** — per the client reference hero; one per screen |
| **Secondary CTA** | Download Brochure (hero + Downloads section) |
| **Tertiary / commerce** | **Buy online** with price — Checkpoint A decision (2026-07-25): commerce path retained. Price value itself is **unconfirmed** (v1's EGP 449,950 is not in the catalog) — §13. Until confirmed, the buy path leads to a quote/contact flow, never a fabricated figure |
| **Lead capture** | Request a Demo (072). Labs secondary path: Talk to Representative (073) |
| **Objection handled before the CTA** | Lock-in fear (§7 Open system) and credibility (§9 cases/reviews) both sit above the closing CTA band |
| **Dentist path vs lab path** | Dentist: sections 3–4 (chairside, infection control, video) → Request Demo. Lab: sections 6–7 (full specs, open STL/OBJ intake from any clinic's scanner) → Talk to Representative. Both paths named in copy, not averaged |

## 9. Link map (feeds content.md's internal linking and SEO)

- **Links in:** 008 Home hero / 011 Featured Products · 033 Products Overview · 042 Dentists ·
  043 Dental Labs · 045 Scan (workflow ↔ product pair) · 010 Ecosystem
- **Links out (each earning its place):** 045 Scan ("see the scan step inside the full workflow") ·
  036 3D Printers ("what the P1-26 does with your scan") · 035 Digital Products ("where the STL
  goes next") · Design Services `/design-services` ("the DESIGN step done for you" — §5 link-out +
  §7 hand-off CTA) · 072 Request a Demo (primary CTA)
- **Deep links / anchors:** `#overview` · `#applications` · `#specs` · `#downloads` — the client's
  inner links, with "Models" resolved to `#applications` while the line has one model (§13)

## 10. States and edge cases

- **Video missing (current state — client hasn't supplied):** section 4 renders the scan-software
  still frame with applications list full-width; no dead player chrome
- **Cases/reviews missing (current state):** section 9 renders two case slots + one quote slot with
  client-supplied-content flags in handoff; never fabricated dentists
- **Price unconfirmed:** Buy online routes to quote request; no placeholder number ever renders
- **Loading:** hero device image gets `priority`; spec table is server-rendered text (no skeleton)
- **Logged-in vs anonymous:** identical — this is a marketing page; registration lives at 018
- **Not-available-in-region:** EGP pricing signals Egypt-first; if regioned, hide price, keep demo CTA

## 11. RTL and localization

- **Layout mirroring:** layout mirrors (logical properties throughout); the five-dot micro-spine
  and the section-8 stepper **reverse direction**; device photography does **not** mirror; the
  software video does not mirror
- **Arabic type:** no letter-spacing, no uppercase, no italic; eyebrows differentiate by weight
  700 + teal; `:lang(ar)` line-height 1.8
- **Numerals:** Western 0–9 for all specs (20 µm, 40 s, 270 g) — master rule, sitewide
- **Text expansion:** FR ~+20% — the five chips (section 2) are the break risk ("Détection des
  marges par IA"); chip labels must wrap to two lines without breaking the strip
- **Untranslatable:** "ODYX-S1" stays Latin in all locales; "STL/OBJ" stays Latin; µm/g/s units
  stay Western

## 12. Responsive

- **Mobile (<768):** hero stacks (type above device); chips become a 2-col grid (5th chip
  full-width); sticky-scroll (section 5) becomes stacked cards with no pinning; spec table
  collapses to label/value pairs inside its own scroll container; ecosystem strip scrolls
  horizontally with snap points
- **Tablet:** hero stays split; chips 3+2; section 5 stacked
- **Not carried to mobile:** the pinned scan-sweep scrub (sub-design-system §4) — replaced by a
  tap-advanced stepped sequence per the master's mobile rule. Nothing informational is dropped;
  dentists read specs on phones between patients (brief)

## 13. Open questions / blocked on

Recorded at Checkpoint A (2026-07-25) and during drafting:

1. **Price** — v1 shows EGP 449,950; the catalog's only price anywhere is the HALOT's. Commerce
   path retained per Checkpoint A, but the figure needs client confirmation before it renders.
   *(Blocked on: ODYX — also open question 7 in docs/products.md.)*
2. **S1 video** — "Videos for S1" is in the client's reference and proposed content; no video is
   on file. Same class as Halim #4 (hero video). *(Blocked on: ODYX.)*
3. **Real clinical cases + named reviews** — Halim #32 demands real cases/doctors; reference shows
   named dentists with stars. Proof strategy per Shining3D finding: credentialed regional KOLs.
   *(Blocked on: ODYX / Scientific Team — the client's own Responsibility column names them.)*
4. **Reference features not in the catalog** — "AI Scan Cleaning" and "Smart Scan Guidance" appear
   in the client's reference but not on p31–32. Copy ships the three catalog-backed features only;
   if the S1 does have these, the catalog needs a page for them. *(Blocked on: ODYX.)*
5. **More scanner models coming?** — client's description says "product family"; the catalog has
   one model. Page is designed single-model (Checkpoint A); "Models" inner link resolved to
   `#applications` meanwhile. *(Blocked on: ODYX.)*
6. **Scanner consumables** — are tips autoclavable/reusable or consumable? v1 claimed "autoclavable
   tips" with no catalog source. Affects §7 pull-through and support content. *(Blocked on: ODYX.)*
7. **Downloads inventory** — client asked for Downloads; we hold no S1 brochure/datasheet PDF.
   Datasheet can be generated from the claims register if ODYX supplies none. *(Blocked on: ODYX,
   with a reksols fallback.)*
8. **Assumption recorded:** v1's unsourced claims ("under 60 seconds", "STL, PLY, OBJ", "USB-C /
   Wi-Fi", "autoclavable tips") are **dropped**, replaced by catalog values. If any were
   client-supplied facts, they must enter the catalog first.
