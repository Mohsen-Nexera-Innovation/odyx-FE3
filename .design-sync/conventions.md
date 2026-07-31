# Building with the ODYX design system

These components are the real ODYX marketing surfaces, compiled from the
production Next.js app. They are **page sections, not primitives**: each one
owns its content and takes no props (the single exception is `ProductsRail`,
which accepts `children` as a heading slot). Compose screens by arranging
sections; style your own connective layout with the class vocabulary below.

## Required wrapper

Every screen must be wrapped in `GlobalToolsProvider`, and every section must
sit inside its screen's root class. Both matter:

- `GlobalToolsProvider` carries locale and UI context. `Header` and
  `Hv2Footer` call `useGlobalTools()` and **throw** without it.
- The root class is not decoration. 69 rules in the Home stylesheet are
  written `.hv2 <descendant>` — including all heading typography — and the
  P1-26 rules are scoped under `.p126-page`. A section rendered outside its
  root renders with unstyled headings.

Use `.hv2` for Home components (`PathCarousel`, `ProductsRail`,
`ClinicalApplicationsSection`, `ClinicalCasesShowcase`, `HubCardsSection`,
`LatestUpdatesSection`, `Hv2Footer`) and `.p126-page` for the P1-26 ones
(`P126Cases`, `P126RoiMini`, `P126Video`). `HomeV2Page` and `P126Page` are
whole screens and bring their own root.

## Reveal-on-scroll — read this before debugging a blank screen

Both screens ship content hidden until scrolled into view, using two different
vocabularies:

- Home: `.hv2 .rv { opacity: 0 }` until `Hv2Motion` adds `.rv-in`. **Render
  `<Hv2Motion />` once inside your `.hv2` root** or the content stays invisible.
- P1-26: `.p126-page .reveal { opacity: 0 }` until `.reveal.in` is added.

If a section mounts but shows nothing, this is almost always why — the markup
is in the DOM, just transparent.

## Styling idiom

Namespaced BEM-ish classes plus CSS custom properties. **There are no utility
classes** — no Tailwind, no `flex`/`gap-4`. Write your own layout CSS using the
tokens; reach for a component class only when reusing an ODYX element.

Class families — `hv2-*` for Home, `p126-*` for P1-26:

| Family | What it styles |
|---|---|
| `hv2-hero`, `hv2-wrap` | hero band, max-width content column |
| `hv2-eyebrow`, `hv2-h2`, `hv2-body` | section eyebrow, heading, body copy |
| `hv2-chip`, `hv2-dot` | pills, carousel dots |
| `hv2-hub`, `hv2-lu`, `hv2-cc`, `hv2-ca` | hub grid, latest updates, clinical cases, clinical applications |
| `p126-hero`, `p126-card`, `p126-roi` | product hero, panel, ROI estimator |
| `p126-btn`, `p126-chip` | buttons, feature chips |

Tokens (all defined in `styles.css`):

| Token | Use |
|---|---|
| `--sky`, `--sky-deep` | site accent blue; `--acc` aliases it |
| `--nav-blue` | `#0050D8` action blue — **header-scoped only** |
| `--navy`, `--navy-deep`, `--navy-card` | dark surfaces (footer, cinematic cards) |
| `--white`, `--grey`, `--line` | ink, muted text, hairlines |
| `--r-btn`, `--r-chip`, `--r-card`, `--r-panel`, `--r-band`, `--r-pill` | radii |
| `--font-display`, `--font-body` | Sora / Space Grotesk; swap to Tajawal + IBM Plex Sans Arabic under `[dir="rtl"]` |

Arabic is a first-class locale: set `dir="rtl"` and the font tokens rebind
automatically. Never apply letter-spacing, uppercase or italic to Arabic text.

## Where the truth is

Read `styles.css` and its imports for the real cascade, and each component's
`<Name>.prompt.md` for its specific composition. Those beat this summary.

## Idiomatic composition

```jsx
<GlobalToolsProvider>
  <Header />
  <div className="hv2">
    <Hv2Motion />
    <ProductsRail>
      <p className="hv2-eyebrow">One Ecosystem</p>
      <h2 className="hv2-h2">Every Step, One System.</h2>
    </ProductsRail>
    <HubCardsSection />
    <Hv2Footer />
  </div>
</GlobalToolsProvider>
```

## Imagery

Components reference imagery at host-absolute paths (`/img/…`, `/brand/…`) and
those files ship alongside the design system. If images render broken, the
host is not serving the project's `img/` and `brand/` directories from its root.
