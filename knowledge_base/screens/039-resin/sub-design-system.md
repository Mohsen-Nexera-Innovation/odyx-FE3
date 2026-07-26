---
screen: 039-resins
inherits: design-system/odyx/MASTER.md
tier: Detail
surface_mode: dark-hero                 # light (default) | dark-hero
accent_source: product-logo   # master | category | product-logo
spec_status: drafted
---

# Sub-design-system · Resins

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

**One axis per screen.** A resin page is orange because resin is a printing product — it does not
also turn violet because the resin makes crowns. Both axes at once is "everything looks the same"
arriving by a new route.

**Allowed uses here:** eyebrow labels, the PRINT node + material-thread line, section rules, icon
fills, matrix column highlight, hover underline. On the dark hero it may set display-support text
(6.76:1). **Never:** primary CTA (stays `#0050D8`), body text on light, error/success, meaning by
color alone.

#### Per-line gradient environments — imagery only, not UI

The client's range reference stages each line on its own colored gradient environment. These are
**photographic environments inside imagery** (MASTER §8 already sanctions exactly this for
resins); they are *not* UI accents and do not join the accent axis. Sampled from
`all-resign.jpeg`, approximate — eyedropper against the final renders before locking:

| Line | Environment | ~Hex |
|---|---|---|
| Ceramic Crown | warm bronze | `#8A6242` |
| Temporary Restoration | violet | `#6C4FA6` |
| Surgical Guide Pro | deep teal | `#1E6E78` |
| Ortho Model 2.0 | warm neutral grey | `#6E6258` |
| Crown & Bridge | copper amber | `#B87333` |

Rule: environment colors appear only inside card/hero imagery and their soft overflow glows.
All UI chrome on those cards (text, links, badges) uses ink/action per the master. Text never
sits on the gradient without the card's white content zone.
**Promotion note:** the five child pages will reuse these environments as hero treatments — when
they are authored, this table moves to MASTER (component: *resin environment*), per the ≥2-screens
promotion rule.

### 2. Surface mode
**dark-hero.** Section 1 only runs `#0A1020` — this is the lineup page, the exact case MASTER §6
names as *earning* dark + full-bleed ("dark is what a lineup gets"; two of thirteen references,
both set-pages). Everything below the hero is light: white → tint alternation per the rhythm
below. The wash & cure split (section 6) may run a `#F5F8FF` tint panel with the accent rule, not
a second dark band — one dark moment per page.

### 3. Section rhythm and density
**Density:** standard overall; **dense (6–7 local)** in the indication matrix (section 4) and the
certification table (section 7) — resin pages measure densest in the reference set (0.025–0.045
inset, MASTER §4 rule 4). Spacious is wrong here; this page is allowed to feel technical.

**Rhythm (the sequence, from screen-details §5):**
full-bleed dark hero → stepper band (white) → 5-up gradient grid (tint) → matrix table (white) →
split editorial shades (tint) → split wash & cure (white) → tabs + badge table (tint) →
ecosystem strip + CTA (white).
No two consecutive sections share a column count; the single full-bleed is the hero. This
sequence cannot be produced by the 036 printer page (split light hero, chips, ROI) or the 037
cure page — which is the point.

### 4. Motion

| | |
|---|---|
| Signature moment | **The material thread.** An SVG stroke in `#F5761E` that starts at the PRINT node of the stepper (section 2), draws down the page as the user scrolls — threading through the five lineup cards and ending at the Wash & Cure split (section 6). The line literally connects the sections (complaint 5) and reads as resin flowing through the workflow |
| GSAP preset | Scrubbed timeline on `stroke-dashoffset` (no plugin needed): `gsap.fromTo(path, {strokeDashoffset: len}, {strokeDashoffset: 0, ease: 'none', scrollTrigger: {trigger: '#lines', start: 'top 80%', endTrigger: '#wash-cure', end: 'top 40%', scrub: 1}})` — **no pinning**; the thread accompanies scroll rather than hijacking it (max 1–2 pins per page, and this page uses zero) |
| Trigger | scroll scrub across sections 2→6 |
| Duration · easing | scrub-tied; `ease: 'none'` on the draw |
| Everything else | Master defaults: Tier B section reveals; Tier C stagger on the lineup grid — `stagger: {each: 0.08, grid: 'auto'}` for a wave across the 5-up, easing stays `power2.out` (the generator's `back.out` overshoot is banned near spec content) |
| Stagger | 0.08 grid-auto on lineup cards; none in the matrix (tables don't bounce) |
| Reduced-motion fallback | Thread renders fully drawn as a static connector line; reveals become opacity-only 150ms; grid stagger off |
| Mobile behaviour | No scrub — the thread renders as a static vertical rule linking section headers; Tier B reveals only. Nothing pins (nothing pins on desktop either) |

### 5. Imagery treatment
| | |
|---|---|
| Background | Hero: `#0A1020` with a low warm `#F5761E` ambient glow rising behind the lineup, cool rim separation — same grammar as the printer dark shot in the asset log. Body imagery: per-line gradient environments (§1 table) as soft radial washes behind bottles |
| Product shot treatment | **Bottles are generated label-blank.** The matte black 1 kg bottle silhouette (client's reference packaging language) is generated with a clean, empty label zone; the ODYX wordmark and label text are **typeset as vector overlays in the design comp — never model-generated** (nano-banana fabricates wordmarks and micro-text; every reference and exploration render shows it). Five-bottle hero: staggered depth arrangement, center bottle sharp, shallow falloff |
| Case imagery | Printed-part vignettes reuse the 036 promoted set (`part-crown-bridge`, `part-study-model`, `part-surgical-guide`, `part-temporary-bridge`, `part-aligner-model`) on this page's gradient environments — consistent parts across screens is ecosystem storytelling |
| Shade imagery | Six-swatch row A1–B2 as flat UI (design-drawn, not generated) beside a printed-crown macro |
| **Hard rule** | **Never synthesize ODYX hardware.** No real bottle photography exists in the repo — until ODYX supplies packshots, every bottle render is a *design-comp stand-in* flagged in the asset log, and label text is vector overlay only. The 16 PNGs in `assets/` are reksols explorations (Checkpoint A, 2026-07-26): art direction only, never promoted |

### 6. Components
**Reused from master:** workflow spine (inline stepper variant) · ecosystem strip · indication
matrix · shade selector (A1–B2, the master already names it) · certification badge row (**per
line, never per range**) · spec table (dense local) · CTA block · feature chips (hero trust chips).
**New on this screen:** *gradient environment card* (lineup card with imagery environment + white
content zone) — screen-local today, **flagged for promotion** to master when the five child pages
adopt it (§1 promotion note). *Material thread* (signature motion) — 039-only.

## Deviation register
Anything below breaks the master and needs sign-off before it ships.

| What | Why it's necessary | Approved by |
|---|---|---|
| — | | |

## Token delta (dev handoff)

Tailwind v4 → these land in `@theme`. Empty is a valid answer; most screens should be near-empty.

```css
/* 039-resins */
:root {
  --screen-accent: #F5761E;            /* family-print — fills/rules/icons on light; text only on #0A1020 */
  /* environment colors are imagery-only — deliberately NOT tokens (see §1) */
}
```
