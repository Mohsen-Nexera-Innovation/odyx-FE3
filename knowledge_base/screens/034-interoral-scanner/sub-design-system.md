---
screen: 034-intraoral-scanner
inherits: design-system/odyx/MASTER.md
tier: Detail
surface_mode: light                      # light (default) | dark-hero
accent_source: product-logo   # master | category | product-logo
spec_status: drafted
---

# Sub-design-system · Intraoral Scanner

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

**Product family:** Scanners teal — accent **`#3A9C96`** (hue 176°), sampled from `knowledge_base/resources/images/logo-images/ODYX logo Scanners.pdf`.

This is **decided**, not a proposal — it is the client's own logo color for this product family. Evidence and the full contrast table: [../../../../docs/logo-colors.md](../../../../docs/logo-colors.md).

> ⚠️ Large text ≥24px bold only on light (3:1). Never body text.

| | |
|---|---|
| **Accent** | **`#3A9C96`** — Scanners teal |
| **Evidence** | Client logo file, sampled at 200dpi. Corroborated by the reference set (hue 176° recurs in the product hardware and the category accents) — and by the S1 device itself, which is teal in the real photography |
| **Contrast on `#FFFFFF`** | 3.29:1 |
| **Contrast on `#0A1020`** | 5.75:1 (unused here — this page has no dark section) |

**Axis:** product family (Axis A) only — this screen answers "where am I in the workflow?"
The clinical-category axis does not appear on this page; the Applications list (crowns, implant,
ortho…) renders in ink + teal `.STL` badges, **not** in per-category colors — that would be the
two-axis failure.

**Allowed uses on this screen:** hero eyebrow ("SCAN · STEP 1 OF 5" — weight 700, +size, and it
may set the ≥24px bold chip figures), the filled first dot of the micro-spine, chip icon glyphs
(always with text labels), the `.STL` badges' fill, the section-8 stepper's active step, the
scan-sweep line (§4), the soft gradient environment behind the device photo, hover underlines.

**Never:** primary CTA (stays `#0050D8`), body text, link text, error/success, meaning by color
alone.

### 2. Surface mode

**Light, all ten sections. No dark band on this page — deliberately.**

The master's measured rule: dark is what a *lineup* gets (it appears on the resin range and one
solution page — pages whose subject is a set). The S1 is a single device, and the scanner
archetype is the airy one (measured inset 0.121, the most spacious of the references). Surfaces
alternate `#FFFFFF` ↔ `#F5F8FF`: sections 2, 5, 8 and the FAQ block sit on tint; everything else
on white. Section 7 (Open system statement band) is white with an oversized ink headline — the
full-width moment is typographic, not chromatic.

### 3. Section rhythm and density

**Density:** spacious (archetype-level, per master §4 rule 4 — scanner = airy 0.121) — except
section 6 (spec table), which runs locally dense (6–7/10), and is the only place it does.

**Rhythm (the anti-sameness sequence):**
split hero → 5-up chip strip → editorial split (image left) → split (video right — mirrored) →
3-panel sticky → dense table → type-led full-width band → connector strip → 3-up cards →
accordion + utility row.

No two consecutive sections share a column count; the widest visual pause (section 7) lands
between the two densest moments (specs, ecosystem strip). Vertical interval varies `3xl`–`5xl`;
uniform 64px gaps between uniform grids is exactly complaint 4 — do not regularize this sequence
in build.

### 4. Motion

| | |
|---|---|
| **Signature moment** | **The scan-sweep** (section 4 "Scan in action"): a thin `#3A9C96` scan line sweeps once across a full-arch visual, and the image resolves from photograph to 3D scan mesh behind it — the product's entire job, shown in one gesture |
| GSAP preset | Tier A pinned scrub (master §5 / ui-ux-pro-max Scroll Reveal · Complex): `gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=120%', scrub: 1, pin: true } })` — scan line `xPercent: 0 → 100`, mesh layer revealed by a translating cover panel whose leading edge *is* the scan line (pure transform — no clip-path, stays on the compositor) |
| Trigger | Scroll scrub, pinned; this is the **only pinned section on the page** (master: 1–2 max) |
| Duration · easing | Scrub-tied (`scrub: 1`); no easing (scrub-driven) |
| Stagger | — (single continuous gesture) |
| Reduced-motion fallback | No pin, no sweep: static side-by-side — photo left, mesh right, teal rule between. All information present |
| Mobile behaviour | **No pinning.** Tap-advanced two-step: tap toggles photo ↔ mesh with a 300ms crossfade; the teal line sits static as the divider |

**Everything else uses master defaults:** Tier B section reveals (`opacity 0→1, y 12, 0.35s,
power1.out`); Tier C grid stagger on the chips, ecosystem strip and case cards (`stagger 0.08`,
max 8 children — the 5-chip strip is fine); Tier D micro-interactions on chips, accordion and
CTAs. `back.out` stays banned on the spec table. Hero: single Tier B entrance for type block +
device (two elements — at the master's animate-1–2-elements ceiling). The five-dot micro-spine
fills its first dot on load (`opacity`, 200ms, after hero settles) — a quiet statement of
"you are at step 1", not a spectacle.

### 5. Imagery treatment

| | |
|---|---|
| Background | Daylight studio: `#FFFFFF` base falling to a soft `#3A9C96`-tinted gradient environment behind the device (8–12% tint saturation, never a flat teal panel). Airy — generous negative space per the 0.121 archetype inset |
| Product shot treatment | **Edits of the real S1 photography only** — `knowledge_base/resources/images/product-images/WhatsApp Image 2026-06-05 at 22.56.28.jpeg` (1600×634, teal device). Background swap + lighting regrade at the **same camera angle** (proven safe); no re-angling — a new viewpoint is a synthesis and fabricates wordmarks. Device in sharp focus, soft shadow, shallow gradient falloff behind |
| Section 3 image | Background-swap edit of the real S1 photo into bright chairside context (clean operatory bokeh). **No hands, no patient, no instruments in AI output** — ambience only |
| Scan-mesh visual (section 4) | A generic 3D dental-arch mesh/point-cloud render — explicitly *scan output*, not ODYX hardware, so generation is permitted; styled in teal wireframe on white. Never presented as a clinical case photo |
| Case imagery (section 9) | **Client-supplied only** (screen-details §13.3). No generated teeth, no stock smiles — Halim #32 asked for real cases and real doctors |
| **Hard rule** | **Never synthesize ODYX hardware.** Edit real photography; if a shot doesn't exist, request it |

### 6. Components

**Reused from master:** workflow spine (hero micro variant + section-8 full stepper) · ecosystem
strip · feature chips (icon + label) · spec table (dense, responsive-collapsing) · review card
(named dentist, photo, `--gold` stars) · CTA block (one primary) · certification badge row — n/a
on this page (scanner carries no per-line cert claims; the rule lives on resins).

**New on this screen:**
- **Scan-sweep reveal panel** (§4) — promotion candidate: 045 Scan will almost certainly want it.
  If 045 adopts it, it moves to the master library per the promotion rule.
- **`.STL` badge** — a small teal-filled chip on applications; promotion candidate for 035/046.
- **FAQ accordion** — promotion candidate: 065 Troubleshooting and the Learning screens will need
  it. Flagging now rather than duplicating later.
- **Anchor nav row** (`#overview · #applications · #specs · #downloads`) — sticky under the
  header on this page; promotion candidate for all product Detail pages.

## Deviation register
Anything below breaks the master and needs sign-off before it ships.

| What | Why it's necessary | Approved by |
|---|---|---|
| — | | |

## Token delta (dev handoff)

Tailwind v4 → these land in `@theme`. Empty is a valid answer; most screens should be near-empty.

```css
/* 034-intraoral-scanner */
:root {
  --screen-accent: #3A9C96;          /* family-scan, Axis A */
  --screen-accent-tint: #3A9C961F;   /* 12% — gradient environments, .STL badge fills */
}
```
