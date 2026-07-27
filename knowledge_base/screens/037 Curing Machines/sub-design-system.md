---
screen: 037-curing-machines
inherits: design-system/odyx/MASTER.md
tier: Detail
surface_mode: light + one dark band     # light (default) | dark-hero
accent_source: product-logo   # master | category | product-logo
spec_status: drafted
---

# Sub-design-system · ODYX Cure UV-02

> **Product decision (client, 2026-07-26):** the page's one product is the **ODYX Cure UV-02**;
> the UW-03 is off the website. The visual system below is unchanged by this — accent, dark band,
> two-act motion and imagery grades all carry over — but the acts are reframed: Act I (wash) is
> workflow context, Act II (cure) is the product.

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
| **Evidence** | Client logo file, sampled at 200dpi. Corroborated by the reference set (hue 25° recurs in the product hardware and the category accents) — and by the chamber itself: the cure glow *is* this hue, which is why the dark band feels inevitable rather than styled |
| **Contrast on `#FFFFFF`** | 2.80:1 — fills/rules/icons only |
| **Contrast on `#0A1020`** | 6.76:1 — text-safe at display sizes in the dark band |

**One axis per screen — this screen uses Axis A (product family) only.** The application tiles in
section 6 route to clinical Solutions pages but stay in this page's orange; the category colors
belong to the destination pages.

**Allowed uses here:** eyebrow "WASH & CURE", section rules, feature-card icon glyphs (with
labels), the active WASH & CURE step on the spine, the mini-timeline's active segment, the cure
glow gradient in imagery. In the dark band only, orange may set display-size type.

**Never:** primary CTA (stays `#0050D8` sitewide), body text on light, error/success states,
meaning-by-color-alone.

**One narrowing this page adds:** the wash act inside the dark band uses a cool violet-blue glow
(from real UV-wash photography; the 039 vignette `wash-cure-vignette.jpg` already established it)
against the cure act's orange. The violet is **imagery grade, not a UI token** — no UI element,
icon or text ever sets it, so the one-axis rule holds. Cool wash → warm cure is what makes the
two acts legible as two acts.

### 2. Surface mode

**Choice: light page, one earned dark band.**

| Sections (screen-details §5) | Surface |
|---|---|
| 1 Hero · 2 Why · 4 Features · 5 On-plate · 6 Applications · 7 Specs · 9 Ecosystem | `#FFFFFF` / `#F5F8FF` alternating per master |
| **3 One machine, two acts** | **`#0A1020` full-bleed** — the master names the cure machine as the product that *earns* dark ("cure cinematic", §8), and the client's own `cure.jpeg` renders the chamber dark-on-light this way |
| 8 Workflow spine band | `#F5F8FF` tint (not dark — one dark band per page keeps it earned) |
| 10 Results + CTA | `#FFFFFF` |

The hero stays **light** (per `cure-uw-03.jpeg` — the client drew a light hero with the real
device photo). Dark is reserved for the chamber sequence, which is this page's identity move.

### 3. Section rhythm and density

**Density:** standard (measured 0.079 inset for the cure archetype in the reference decode);
**locally dense (6–7)** in the section 7 spec table only.

**Rhythm** (the anti-sameness sequence): split hero → editorial 2-col → **full-bleed dark
sticky-scroll** → card grid 3×2 → split → tile grid 6-up → dense table → full-bleed tint band →
horizontal strip → gallery + CTA. No two consecutive sections share a column count; forms
alternate inset/full-bleed at ≤1:3; boxes appear exactly twice, at different counts (3×2 vs 6-up).

### 4. Motion

GSAP + Lenis + Motion are already installed in `app/` — motion is a design decision, not a
build constraint. Motion must **communicate the workflow**, not decorate (complaint 6).

| | |
|---|---|
| Signature moment | **"Washed. Then cured."** — section 3 pins; scroll scrubs from the wash (violet glow, vortex in the liquid — the bench step before) to the cure (orange glow, 360° light in the UV-02's chamber), the part staying fixed in frame while its state changes. The viewer watches the step complete. Copy attributes the cure to the product and the wash to the workflow — the UV-02 does not wash, and the visuals must not imply it does (no single-chamber continuity cues between acts) |
| GSAP preset | Master Tier A pinned scrub: `gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=150%', scrub: 1, pin: true } })` — crossfade wash-state → cure-state layers (opacity/transform only), act labels swap at 50% |
| Trigger | Scroll scrub, pinned. `ScrollTrigger.refresh()` after media loads — pin height must be deterministic |
| Duration · easing | Scrub-tied (scrub: 1); act-label swaps 300ms `power1.out` |
| Stagger | None inside the pin (one element pair). Elsewhere: master Tier B reveals; Tier C stagger on the six feature cards (0.08, `power2.out` — no `back.out` anywhere near the spec table) |
| Reduced-motion fallback | No pin, no scrub: the two acts render as two static stacked frames with captions; Tier B fades only |
| Mobile behaviour | **No pinning** (master rule): stepped, tap-advanced two-frame sequence with act labels as tabs. Nothing informational lost |

Only this one section pins — the master's 1–2 pin budget is spent here deliberately.

### 5. Imagery treatment

| | |
|---|---|
| Background | Hero: studio light, `#F5F8FF`-compatible seamless, soft single-direction shadow. Chamber band: near-black blue `#0A1020` environment, dark stone bench texture permitted (see mood ref) |
| Product shot treatment | **Real device pixels only.** The one real photo on file (white unit, amber top window) is not confirmed to be the UV-02 — hero ships uncaptioned until the client confirms (screen-details §13.1). Background swaps at the same angle pass fidelity review; new camera angles do not. The device carries a screen and wordmark, both fabrication magnets — blank the screen in any edit |
| Chamber/glow imagery | Art direction from `knowledge_base/resources/mood-references/037-odyx-cure-chamber-glow.png` (reference only, per Khaled — not a page asset): macro warmth, parts silhouetted against the glow, everything else falling to near-black. Wash act: violet-blue liquid vortex, no device visible = safely generatable. Cure act: orange glow on cured parts, no device visible = safely generatable |
| Case imagery | Section 10 gallery: real cured parts on dark, consistent with the 039 `wash-cure-vignette` grade — **blocked on client-supplied case photography (review #32); ships hidden until then** |
| **Hard rule** | **Never synthesize ODYX hardware.** Edit real photography; if a shot doesn't exist, request it. Every hardware image passes the §5d fidelity review before promotion |

### 6. Components

**Reused from master:** product hero (light variant) · feature chips/cards · spec table (dense,
collapsing) · workflow spine (band variant, step 4 active) · ecosystem strip · CTA block ·
certification badge row **not used** (no per-device CE/FDA claims in catalog — nothing to badge).

**New on this screen:** the two-act pinned wash→cure sequence, plus the per-application
cure-time card row (section 5 — NanoCure pattern, catalog p15 values). Both used once, live here.
If another screen adopts either, promote the pattern to the master and keep only this page's
content local.

## Deviation register
Anything below breaks the master and needs sign-off before it ships.

| What | Why it's necessary | Approved by |
|---|---|---|
| — | | |

## Token delta (dev handoff)

Tailwind v4 → these land in `@theme`. Empty is a valid answer; most screens should be near-empty.

```css
/* 037-curing-machines */
:root {
  --screen-accent: #F5761E;        /* family: print/cure — fills, rules, icons on light; text only on dark */
  --band-dark: #0A1020;            /* section 3 only — inherited token, listed for the dev's grep */
}
```
