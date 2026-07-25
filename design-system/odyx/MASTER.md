# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

> ⚠️ **CLIENT-APPROVED TOKENS OVERRIDE THIS FILE.** This file was generated from the
> ui-ux-pro-max database as supplementary guidance. Where it disagrees with the
> client-approved decisions below, the client's decisions win:
>
> - **Primary action color:** `#0050D8` on white (approved 2026-07-25) — NOT the navy/sky
>   palette below. Family accents: Scanners `#3A9C96`, Digital Printing `#F5761E`,
>   masterbrand `#06A5DE`. Gold `#F0B838` for rating stars only.
> - **Typography:** Tajawal (Latin + Arabic, weights 400/500/700 — no 600, no italic,
>   no letter-spacing or uppercase on Arabic) — NOT Rubik/Nunito Sans below.
> - **Surfaces:** light-dominant `#FFFFFF` / tint `#F5F8FF`; dark `#0A1020` reserved for
>   cinematic product heroes only.
> - **Layout:** standard vertical page flow with RTL (Arabic) support — NOT the
>   "Horizontal Scroll Journey" pattern below.
> - **Density:** the global scale below (6/10, standard) is the page default. Denser
>   spacing is reserved for spec tables and technical-feature sections — see the
>   per-page overrides in `pages/`.
>
> What remains valid from this file: the design dials, motion specs (subtle scroll
> reveals, 300–400ms, reduced-motion respected), the pre-delivery checklist, and the
> anti-pattern list.

---

**Project:** ODYX
**Generated:** 2026-07-25 16:12:35
**Category:** E-commerce Luxury
**Design Dials:** Variance 3/10 (Consistent / Card-based) | Motion 6/10 (Noticeable) | Density 7/10 (Dense)

> ⚠️ **Dials revised 2026-07-25 (Khaled), superseding the generated values above's
> original Variance 7 / Motion 3 / Density 6.** Rationale — the client's own design
> references (the #1 authority) are card-dense and imagery-first, and the first build
> that followed the airy editorial interpretation was rejected:
>
> - **Variance 3/10:** consistent card-based sections, like the client references.
>   Repeating card grids beat one-off editorial layouts. Whitespace is *filled with
>   content*, not left as a design element.
> - **Motion 6/10:** noticeable scroll reveals and grid staggers on every section
>   (the site-wide `.reveal`/`.in` system), plus per-component micro-interactions.
>   A screen with no motion at all is a defect. `prefers-reduced-motion` still wins.
> - **Density 7/10:** tight paddings (sections ~48–64px, cards 14–20px), full-width
>   grids. The measured airiness of the resin references applies to insets within
>   cards, not to empty page bands.
> - **Section headers:** every section carries a short, clear noun title in the client
>   reference style — accent vertical bar + bold title (e.g. "▎Technical features").
>   Conversational copy goes in the intro line below, never replaces the title.
> - **Imagery-first:** every section that has real product imagery available uses it.
>   Text-only sections are the fallback, not the default.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#0F172A` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#334155` | `--color-secondary` |
| Accent/CTA | `#0369A1` | `--color-accent` |
| Background | `#F8FAFC` | `--color-background` |
| Foreground | `#020617` | `--color-foreground` |
| Muted | `#E8ECF1` | `--color-muted` |
| Border | `#E2E8F0` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#0F172A` | `--color-ring` |

**Color Notes:** Professional navy + blue CTA

### Typography

- **Heading Font:** Rubik
- **Body Font:** Nunito Sans
- **Mood:** ecommerce, clean, shopping, product, retail, conversion
- **Google Fonts:** [Rubik + Nunito Sans](https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700&family=Rubik:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

*Density: 6/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #0369A1;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #0F172A;
  border: 2px solid #0F172A;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #F8FAFC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0F172A;
  outline: none;
  box-shadow: 0 0 0 3px #0F172A20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Enterprise SaaS (Mobile)

**Keywords:** enterprise, saas, b2b, professional, indigo, violet, gradient, polished, trustworthy, clean, approachable, spring, haptic

**Best For:** B2B backend management, productivity tools, government and finance mobile apps, SaaS companion apps, enterprise dashboards

**Key Effects:** Indigo→Violet gradient primary CTAs + active tab highlights, colored card shadows rgba(79,70,229,0.08), pill buttons or 12pt radius, full-width CTA at screen bottom, spring press scale 0.97, floating label inputs with animated focus border, skeletal loading pulses (Indigo/Slate tint), Bottom Sheets with drag dismiss, swipe-to-action list cards, scroll-linked title collapse

### Page Pattern

**Pattern Name:** Horizontal Scroll Journey

- **Conversion Strategy:** Immersive product discovery. High engagement. Keep navigation visible.
- **CTA Placement:** Floating Sticky CTA or End of Horizontal Track
- **Section Order:** 1. Intro (Vertical), 2. The Journey (Horizontal Track), 3. Detail Reveal, 4. Vertical Footer

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger)

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Vibrant & Block-based
- ❌ Playful colors

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
