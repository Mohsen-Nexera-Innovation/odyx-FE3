---
screen: 036-3d-printers
inherits: design-system/odyx/MASTER.md
tier: Detail
surface_mode: light                     # light (default) | dark-hero — one dark section, §8
accent_source: product-logo   # master | category | product-logo
spec_status: drafted
---

# Sub-design-system · 3D Printers

**This file is a delta, not a design system.** It may only add or narrow. If you find yourself
redefining something in the Inherited list, the master is wrong — fix the master, not this file.

## Inherited — locked, do not redefine here

| | |
|---|---|
| Primary action | `#0050D8` (`--action`), hover `#0040B8` |
| Ink / headline | `#0A1050` |
| Surface | `#FFFFFF`, tint `#F5F8FF` — **light-dominant** |
| Dark surface | `#0A1020` — product drama only, never the default page |
| Typeface | **Tajawal** · 400 / 500 / 700. **No 600.** No italic |
| Arabic | No `letter-spacing`. No `text-transform: uppercase`. RTL is architecture |
| Grid / spacing scale | master |
| Contrast | 4.5:1 body, 3:1 large text and UI — non-negotiable |
| Focus rings | never removed |
| Reduced motion | every motion spec needs a `prefers-reduced-motion` fallback |

Approved 2026-07-25. **The master is [../../../../design-system/odyx/MASTER.md](../../../../design-system/odyx/MASTER.md)** —
read it before filling anything in below. Palette evidence:
[../../../../docs/design-tokens-draft.md](../../../../docs/design-tokens-draft.md).

## Overridable at screen level — this is what this file is for

### 1. Screen accent

**Product family:** Digital Printing orange — accent **`#F5761E`** (hue 25°), sampled from `knowledge_base/resources/images/logo-images/Logo 3D Printer, Cure & Resin .pdf`.

This is **decided**, not a proposal — it is the client's own logo color for this product family. Evidence and the full contrast table: [../../../../docs/logo-colors.md](../../../../docs/logo-colors.md).

> ⚠️ Fills, rules and icons only on light — fails 3:1. Text-safe on #0A1020.

| | |
|---|---|
| **Accent** | **`#F5761E`** — Digital Printing orange |
| **Evidence** | Client logo file, sampled at 200dpi. Corroborated by the reference set (hue 25° recurs in the product hardware and the category accents) |
| **Contrast on `#FFFFFF`** | 2.80:1 |
| **Contrast on `#0A1020`** | 6.76:1 |

**Axis: product family. One axis only** — this screen answers *"where am I in the workflow?"*. It
does not also take a clinical-category accent because the printers make crowns.

> **A finding worth designing around.** On this screen the family accent is not applied — it is
> **photographed**. The P1-26's resin hood is the orange, in every client reference. The accent's
> job here is therefore to *echo the hardware*, not to brand the page: use it where it reads as
> the machine's own color continuing off the product and into the layout (the active step marker,
> the section rule beneath a model heading, the router's connector line) and nowhere it would read
> as decoration. This is the strongest identity argument on the page and it costs nothing —
> complaint 1.

**Allowed uses here:** eyebrow label (weight 700 + accent, never accent as body text) · section
rule under model headings · icon fill inside the chip row (each chip has a text label) · active
step marker on the spine · the router's connector line · the image gradient environment in §8.

**Never:** primary CTA (stays `#0050D8` sitewide) · body text on light · the "not recommended for"
warning block — that is `--ink` on `--surface-tint` with a border, because meaning must never be
carried by color alone 🔒.

### 2. Surface mode

**Light, with exactly one dark section.**

| Section | Surface |
|---|---|
| 1 Hero | `#FFFFFF` with a soft `#F5F8FF` sweep behind the product |
| 2 Why print it yourself | `#FFFFFF` |
| 3 The two printers | `#FFFFFF` — the P1-26 block; HALOT-X1 block sits on `#F5F8FF` to separate them without a card |
| 4 Indication router | `#F5F8FF`, full-bleed |
| 5 Specifications | `#FFFFFF` |
| 6 Running costs | `#FFFFFF`, hairline-ruled |
| 7 What ODYX changed | `#F5F8FF` |
| **8 PRINT in the workflow** | **`#0A1020` — full-bleed, the only dark section** |
| 9 Works with | `#FFFFFF` |
| 10 Proof | `#FFFFFF` |
| 11 Downloads + CTA | `#F5F8FF` |

The dark section is **earned**, and earned in a specific way: `#F5761E` fails 3:1 on white and
passes at 6.76:1 on `#0A1020`. §8 is the one place the family color can set type. That is the
argument for putting the workflow — the thing this whole engagement is about — on the dark ground,
rather than using dark for a mood.

### 3. Section rhythm and density

**Density:** 4/10 in §1–§2 (spacious, marketing) · 5/10 in §3–§4 · **7/10 in §5–§6** (spec tables,
per MASTER §7) · 4/10 in §8–§11.

**Rhythm** — the sequence of *forms*, which is what stops this reading like every other product page:

```
split → editorial 2-col → ASYMMETRIC SPLIT → interactive selector → tabbed table
→ schedule strip → annotated diagram → FULL-BLEED DARK PINNED → connector chain
→ case flow → utility band
```

Vertical interval alternates `--space-5xl` / `--space-4xl`, with two deliberate exceptions:
**§5 → §6 sit at `--space-3xl`** because they are one argument (what it does / what it costs), and
**§8 has no top or bottom margin at all** — the dark ground runs edge to edge and the light
sections butt straight against it. That hard cut is the answer to review #33
(*"the transition between sections and colors not satisfying him"*): the page has exactly one
ground change, it is abrupt on purpose, and every other transition is carried by whitespace and
rules rather than by a new box.

**Boxes appear three times only** — the two model blocks (§3), the router result panel (§4), the
review cards (§10). Everywhere else: rules, ground shifts, whitespace.

**The asymmetric split (§3) is the screen's structural signature.** Two printers rendered as two
equal cards *is* the tier ladder the catalog warns against (p13), stated in layout before a word
is read. The P1-26 gets full width and the larger photography; the HALOT-X1 gets a narrower block
on tinted ground with a different internal rhythm. Different shape = different job.

### 4. Motion

GSAP + Lenis + Motion are already installed in `app/` — motion is a design decision, not a
build constraint. Motion must **communicate the workflow**, not decorate (complaint 6).

#### Signature moment — *the chain draws itself*

| | |
|---|---|
| Signature moment | In the **Indication Router** (§4), selecting an indication draws the answer as a chain, left to right: `printer ● ─ ─ ─ ● resin ─ ─ ─ ● cure time`. The connector line draws first, then each node arrives on it. Every question a user asks re-draws the workflow in miniature — the spine is not illustrated, it *runs* |
| Why this and not the pinned hero | The pinned spine (§8) is the master's Tier A, inherited unchanged. This screen adds one thing, and it adds it on the interaction a buyer actually performs. A viewer remembers what answered their question |
| GSAP preset | Tier D micro-interaction (MASTER §5), extended with a draw: `gsap.timeline().fromTo('.chain-line', {scaleX: 0}, {scaleX: 1, duration: 0.26, ease: 'power2.out'}).from('.chain-node', {opacity: 0, y: 8, duration: 0.2, stagger: 0.12, ease: 'power1.out'}, '-=0.1')` |
| Trigger | Chip selection (click / tap / keyboard). Also fires once on first in-view for the server-rendered default selection |
| Duration · easing | Line 260 ms `power2.out`; nodes 200 ms `power1.out`. Total under 700 ms — a user changes selection repeatedly and must never wait |
| Stagger | 0.12 s between nodes — three nodes, so the chain reads as a sequence, not a flash |
| **Reduced-motion fallback** | Required. No draw, no stagger: the result panel cross-fades `opacity` over 100 ms and the connector renders at full width immediately. Identical content, identical layout |
| Mobile behaviour | The chain stacks vertically — the line draws on `scaleY` instead. **Nothing pins on mobile** (MASTER §5) |
| **RTL** | `transform-origin` must be logical, not `left`. In RTL the chain draws right-to-left, matching the reversed spine. Verify alongside `ScrollTrigger.refresh()` after the direction switch — this is the highest-risk RTL item on the screen |

#### Everything else — master defaults, no invention

- **§8 spine:** MASTER §5 **Tier A** verbatim, pinned scrub. This is the page's only pinned section
  (`ui-ux-pro-max`: *"don't pin more than 1-2 sections per page"*), and it must not be pinned on
  mobile — tap-advanced stepper instead.
- **§3, §7, §9:** Tier B section reveal, `play none none reverse`.
- **§4 chips, §6 schedule, §10 cases:** Tier C grid stagger, 0.08 s.
- **§5 spec-table tab switch:** Tier D, 150 ms opacity only. **`back.out` overshoot is banned on
  spec tables** (MASTER §5 Tier C) — the tab content does not bounce.
- **§1 hero:** one Tier B reveal on the headline. The product image does not animate in; a hardware
  brand's product should be there when the page is.

### 5. Imagery treatment

Specific enough to generate or brief from. **Every hardware frame is an edit of real pixels.**

| | |
|---|---|
| **Background** | Daylight studio, ~5600 K, neutral. `#FFFFFF` base with a soft `#F5F8FF` radial sweep behind and beneath the device — the client's own reference grade, not a new direction. No vignette, no gradient mesh, no glass |
| **Product shot treatment** | Device sharp front to back, three-quarter view, horizon at roughly one third. Contact shadow soft and close — the machine sits on a surface, it does not float. **Do not add orange light:** the P1-26's resin hood already is `#F5761E`, and coloring the environment to match turns a product feature into a filter |
| **Scale cue — required on the HALOT-X1** | Its argument is plate area (211.68 × 118.37 × 200 mm, p11). Every HALOT frame shows a **full plate of printed parts**, not the empty machine. The P1-26's argument is precision, so its frames show a **single finished unit**, close |
| **Printed parts (§4 router, §3 "prints")** | Mid-grey seamless (`#3A3F4A`–`#4A505C` range), top-lit, shadow anchored — deliberately borrowed from the client's HALOT reference case gallery, which already photographs parts this way. Parts read as objects, not as icons. **No icon substitutes** — the P1-26 reference uses photographs of printed dentition and that is the standard |
| **§7 annotated diagram** | One P1-26 frame, straight-on, generous margin around the machine so four callout labels sit in whitespace and never over the product. Leader lines in `#E6ECF7`, dots in `#F5761E` |
| **§8 dark section** | `#0A1020` ground. Device rim-lit, cool key from behind-left, with a low `#F5761E` gradient environment rising from the base — this is the one frame where the family color may light the scene, because it is also the one surface where it is text-safe |
| **Case imagery (§10)** | Clinical photography: `before → printed → final restoration`. Consistent framing across all three, same white balance. ⚠️ Blocked on real cases — review #32 |
| **RTL** | Product photography **does not mirror** (MASTER §3). The §7 callouts reposition around the un-mirrored frame |
| **Hard rule** | **Never synthesize ODYX hardware.** Edit real photography; if a shot doesn't exist, request it. An invented wordmark or screen UI on a hardware brand is a fatal trust error 🔒 |

### 6. Components

**Reused from master (MASTER §6), unchanged:** Product hero (light variant) · Feature chips ·
Spec table · Workflow spine · Ecosystem strip · Case flow · Review card · Certification badge row
(**per line, never per range** 🔒) · CTA block.

**Promotion candidates — these belong in MASTER §6, not in this file** (promotion rule: used on
≥2 screens). Logged in `screen-details.md` §13:

| Component | Second use |
|---|---|
| **Product-family (forked) archetype** — asymmetric split for two products that are not two tiers | `037` Curing Machines: ODYX Cure + UW-03, the same problem (`products.md` p16) |
| **Indication Router** — indication → printer → resin → cure time | `039` Resins and `047` Print share its logic and its data |

**Screen-local (used exactly once):**

- **Running-cost schedule strip** (§6) — a horizontal maintenance timeline, not cards. Rows are
  parts, values are hours and layers. Deliberately plain: its persuasive force is that it exists.
- **Annotated product diagram** (§7) — four callouts on one frame. Hover reveals on desktop;
  becomes a plain captioned list on mobile, per `screen-details.md` §12.

### 7. What this screen must not borrow

Recorded because Stage 2 surfaced them and they are tempting:

- **No glassmorphism / translucency.** `ui-ux-pro-max` proposed "Liquid Glass" for this archetype,
  flagged in its own record as *"Performance ⚠ Moderate-Poor, Accessibility ⚠ Text contrast"*.
  MASTER §12 already discarded it once for this project. Discarded again here.
- **No side-by-side comparison table** of the two printers. §5 is tabbed. This is the single
  strongest layout constraint on the screen and it comes from the catalog, not from taste.
- **No competitor palette or typeface** from the tooling output — it returned `#2563EB` with
  Rubik/Nunito Sans. Ours is client-approved.

## Deviation register
Anything below breaks the master and needs sign-off before it ships.

| What | Why it's necessary | Approved by |
|---|---|---|
| Dials revised to Variance 3 / Motion 6 / Density 7; card-based sections; "boxes three times" rule dropped; every section gets a short bar-titled header (conversational lines move to intros) | The first build followed this file's airy editorial rhythm and was rejected: unused whitespace, unattractive content display, unclear titles, imagery unused. The client references (authority #1) are card-dense and imagery-first — this file's §3 rhythm strayed from them | Khaled, 2026-07-25 |
| Screen palette follows the live home screen (sky `#06A5DF` actions with dark ink text, charcoal ink `#211C1D`, paper surfaces, dark `#141216`) instead of this file's inherited `#0050D8`-on-white / `#0A1020` set. Family accent `#F5761E` unchanged | Cross-screen consistency: the shipped site runs the sky/paper palette; a one-screen `#0050D8` system read as foreign next to the home screen. If the client re-asserts `#0050D8`, the migration is sitewide, not per screen | Khaled, 2026-07-25 |

## Token delta (dev handoff)

Tailwind v4 → these land in `@theme`. Empty is a valid answer; most screens should be near-empty.

```css
/* 036-3d-printers */
:root {
  --screen-accent: #F5761E;   /* = --color-family-print, no new value introduced */
}
```

Nothing else. The running-cost strip, the annotated diagram and the router are built from existing
spacing, radius and border tokens — a screen that needs new tokens to look different is usually a
screen that hasn't found its structural idea.
