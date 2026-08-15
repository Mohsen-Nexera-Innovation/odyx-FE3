# design-sync notes — ODYX

Repo-specific gotchas for future syncs. Read this before re-running.

## What this repo is

A **Next.js application**, not a component library: no `dist/`, no package
`exports`, no Storybook. `shape` is pinned to `package` in config.json and the
converter runs against a hand-written entry, `.design-sync/ds-entry.tsx`, passed
via `--entry`. That entry is the scope contract — it exports only the Home and
P1-26 surfaces. Do **not** let the converter synthesise an entry from `src/`:
it globs every `.tsx` under the source root and would drag admin, auth,
checkout and inbox into the design system.

`componentSrcMap` is what defines the component list here. With no shipped
`.d.ts` tree there is nothing for the converter to enumerate, so every card in
the design system is a non-null entry in that map. Adding a component means
adding it in **both** `ds-entry.tsx` and `componentSrcMap`.

## The build is a three-step chain

`package-build.mjs` alone is not enough. Run, in order:

```sh
node .design-sync/build-fonts.mjs          # brand woff2 + @font-face -> .cache/fonts/
node .design-sync/build-css.mjs            # flattened stylesheet     -> .cache/ds-styles.css
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --entry ./.design-sync/ds-entry.tsx --out ./ds-bundle
node .design-sync/copy-assets.mjs ./ds-bundle       # MUST run after build (build clears the out dir)
node .design-sync/copy-foundations.mjs ./ds-bundle  # tokens/ + guidelines/ + styles.css splice
node .ds-sync/package-validate.mjs ./ds-bundle
```

`build-fonts.mjs` requires a populated `.next/` — run `npm run build` (or
`npm run dev` once) first, or it exits with `[FONTS]`.

## Shims (`.design-sync/shims/`, wired through `tsconfig.dssync.json`)

The design bundle is a plain browser IIFE with no Next runtime. Four aliases
make that work; they live in a **separate tsconfig** so the app's own build
never sees them.

- `next/link` -> plain `<a>`. Every ODYX use of Link is "an anchor pointing
  somewhere", so this is behaviourally faithful.
- `next/navigation` -> `usePathname()` pinned to `"/"`. Deliberate, not a stub:
  the approved chrome is the Home treatment, and Header/Footer branch on the
  path. Returning `/admin` here would make Header render `null`.
- `next/script` -> renders nothing.
- `@/lib/config` -> API mode pinned off. **This one is load-bearing.** The real
  module reads `process.env.NEXT_PUBLIC_*` at module scope; with no `process`
  in the browser IIFE it threw a `ReferenceError` that took down all 13
  exports at once (symptom: `[BUNDLE_EXPORT] 13/13 not a component`).
- P1-26 no longer imports a dedicated stylesheet (Tailwind on the page).
  Product CSS that used to be mapped to `shims/empty.css` has been removed.

**Gotcha:** the converter strips `//` and `/* */` from a tsconfig before
`JSON.parse`. A `"//"` comment key silently corrupts the file, `tsconfigPaths`
returns null, and **every alias is silently ignored** — the build fails much
later with a confusing unresolved-import error. Keep `tsconfig.dssync.json`
free of comments.

## CSS: why it is flattened rather than bundled

esbuild cannot resolve the host-absolute `url("/img/...")` references the ODYX
sheets use and hard-errors on them, so CSS is **not** imported from the JS
entry. Instead `build-css.mjs` flattens the `@import` chain itself and points
`cfg.cssEntry` at the result — the converter appends that file to
`_ds_bundle.css` verbatim, never parsing it. Background images are inlined as
data URIs so the stylesheet is self-contained (~2MB, of which ~1.6MB is four
inlined backgrounds; `why-odyx-board-t.png` alone is 995KB).

Deliberate exclusions from the flatten: `tailwindcss` (the scoped components
use **zero** Tailwind utility classes — verified — and globals.css ships its
own reset), and the out-of-scope sheets `product-print.css`, `about.css`,
and `background-picker.css` (dev tooling). Every ODYX sheet namespaces its
own selectors, so dropping them cannot change how Home or P1-26 cascade.

**Gotcha:** never write the literal at-import keyword into a generated CSS
comment. The validator scans raw CSS text, so a commented-out reference is
reported as an unresolvable import (`[CSS_IMPORT_MISSING]`).

**Gotcha:** `next/font` defines `--font-sora`, `--font-space`,
`--font-tajawal`, `--font-plex-ar` at runtime. Outside Next they are undefined,
and because globals.css writes `--font-display: var(--font-sora), 'Sora',
sans-serif`, an undefined var makes the **whole declaration invalid** — the
comma fallback never applies and type collapses to the initial family.
`build-css.mjs` binds all four explicitly (`FONT_VARS`).

## Fonts

Sourced from the Next build cache, not the repo: `next/font/google` self-hosts
at build time, so there is no `@font-face` in the repo and no woff2 under
`public/`. `build-fonts.mjs` harvests Sora, Space Grotesk, Tajawal and IBM Plex
Sans Arabic (58 faces / 29 woff2 / ~383KB) out of `.next/**/*.css` +
`.next/static/media/`. Dev and prod chunks emit the same logical face under
different content hashes, so faces are deduped on identity
(family|weight|style|unicode-range), not filename.

## Images

Components address imagery as host-absolute string literals (`<img
src="/brand/odyx-company.png">`) — not imports, so no bundler step can rewrite
them. `copy-assets.mjs` mirrors the referenced files into the bundle at the
same absolute paths, which is why it must run **after** every build.

`public/video/hero.mp4` (44MB — four times the whole image set) is
deliberately skipped: P126Video renders its poster frame and only fetches the
source on play, which a design surface never does.

**Open risk:** whether `/img/...` resolves for a *rendered design* depends on
the design runtime serving the project from its origin root. It is verified to
work for the local review server. If designs come back with missing imagery,
this is the cause.

## Foundations (tokens/ + guidelines/) are authored, not converted

The converter leaves both directories **empty** for this repo. `copyTokens` in
`lib/css.mjs` returns immediately unless `cfg.tokensPkg` is set, and that key
resolves under `node_modules` — it assumes a design system shipped as a package
with a sibling tokens package. An application repo has neither, so every value
ends up inside the 2MB `_ds_bundle.css` where the Design System pane has
nothing browsable to show. That is why the first upload had no colour, type,
spacing or motion cards.

So the foundation layer is hand-authored under `.design-sync/` and mirrored in
by `copy-foundations.mjs`:

- `.design-sync/tokens/{colors,typography,layout,motion}.css` — curated
  foundation variables, spliced into the **front** of the `styles.css` import
  closure. `_ds_bundle.css` is imported after them and stays authoritative on
  any value it also defines; these files document and expose the palette, they
  never override it.
- `.design-sync/guidelines/*.html` — the browsable cards. A card is registered
  purely by its **first line** being `<!-- @dsCard group="…" viewport="WxH"
  name="…" subtitle="…" -->`; the file then links `../styles.css` so it renders
  in real brand type. `copy-foundations.mjs` exits non-zero if any guideline
  loses that marker, because an unmarked card fails silently — it simply never
  appears in the pane.

Values are transcribed from the two screens' own custom properties, so a change
in `home-v2.css` will NOT propagate automatically. When that
sheet changes, re-check `tokens/colors.css` against the `--hv2-*`
blocks in `.design-sync/.cache/ds-styles.css`.

**Anchor caveat:** `_ds_sync.json` is written by `package-build.mjs`, before
`copy-foundations.mjs` edits `styles.css`. The anchor therefore never reflects
the foundation splice, so a future re-sync will read styling as changed and
re-upload it. Harmless — re-uploads are idempotent — but do not chase it as a
bug.

## Preview authoring

`.design-sync/previews/_stage.tsx` is shared scaffolding (not a component — the
build logs a harmless `stale preview: _stage` line for it). Three things it
supplies that a bare preview root does not:

1. **Root class.** 69 rules in home-v2.css are written `.hv2 <descendant>`
   (including all heading typography); P1-26 previews wrap with
   `.p126-page`. Without the wrapper, sections render with unstyled headings.
2. **Settled reveal state.** Home hides content with `.hv2 .rv{opacity:0}`
   until Hv2Motion adds `.rv-in`; P1-26 does the same with `.p126-page
   .reveal` -> `.reveal.in`. **Two different vocabularies** — miss either and
   the card looks blank while its text is present in the DOM (this is exactly
   why P126RoiMini first captured empty). The neutralising rules are copied
   from each stylesheet's own `prefers-reduced-motion` branch.
3. **Global chrome suppression.** GlobalToolsProvider mounts fixed-position
   floating action buttons and a command-palette overlay that otherwise stamp
   themselves onto every card.

**Header needs a hand-built stage.** odyx.css sets a bare element rule
`header{position:fixed;top:0}`, so the bar leaves normal flow and a plain
preview root measures zero height — the unauthored card fell to the floor card.
A `transform` on the stage creates a containing block. Header also picks its
colour treatment by querying the document for `.page-hero, [data-hero-light],
[data-hero-dark]`; the preview includes an inert `data-hero-light` marker to
get the Home `on-light` state where `--sky` is the approved action blue
`#0050D8`. Only one cell: the treatment comes from document state, not props,
so two Header cells in one card document would resolve identically.

**Every card is `cardMode: single`.** These are full-bleed page sections; the
validator flags all of them `[GRID_OVERFLOW] (fixed/portal)` in a grid.

## Capture hangs: every card needs a wide viewport

`package-capture.mjs`'s `settle()` awaits `img.decode()` on every image with
**no timeout**. Chromium never resolves that promise for an image that is
loaded but clipped off-stage — which is exactly what these carousels do to
their inactive slides (`.hv2-pcard.is-side` sits at `translateX(-410px)` inside
an overflow-hidden stage). One such image hangs the capture forever, with no
error and no output: the run just stops after the previously-completed
component.

Measured on PathCarousel — same page, same build, only the card viewport
differs:

| Card viewport | Images that never decode |
|---|---|
| 900x700 (the default) | 4 of 7 |
| 1440x760 | 2 of 7 |
| 1920x900 | 0 of 7 |

So **every component carries an explicit wide `viewport` in
`cfg.overrides`**. That is load-bearing, not cosmetic — dropping it to the
900x700 default reintroduces the hang. If a future capture stalls silently,
this is the first thing to check; bisect by running
`package-capture.mjs --components <one>` per component.

The same failure has a second cause, and the two compound: ODYX imagery is
marked `loading="lazy"`, so Chromium never even starts the request for
anything below the fold — and `decode()` on an image that never began loading
also never settles. Viewport size cannot fix that on the whole-screen cards,
where a ~5000px page leaves most imagery below any viewport. `EagerImages` in
`_stage.tsx` flips every lazy image to eager on mount; **HomeV2Page and
P126Page cannot be captured without it.**

## Known render warns

- `stale preview: _stage — component no longer exported` on every build —
  expected; `_stage.tsx` is shared scaffolding, not a component.
- `[FONT_MISSING]` / `[TOKENS_MISSING]` should **not** appear. If they do,
  `build-fonts.mjs` or `build-css.mjs` did not run before the converter.

## Divergence from the knowledge base

`AGENTS.md` states the approved tokens as action blue `#0050D8` with Tajawal
as the brand font. The shipped code is not a clean match, and the design system
ships **what the code does**:

- Site accent is `--sky` (`#06A5DF`) with `--orange` aliased onto it. The
  approved `#0050D8` appears specifically as the **header-scoped** override
  (`header{--nav-blue:#0050D8}` / `header.on-light{--sky:#0050D8}`).
- Latin type is Sora (display) + Space Grotesk (body). Tajawal is the **RTL**
  display face, bound under `[dir="rtl"]`, not the default brand font.

Worth resolving with the client; flagged rather than silently reconciled.

## Re-sync risks

- **Requires a populated `.next/`.** Fonts come from the build cache. A clean
  clone with no `.next/` cannot produce the font set — build the app first.
- **`copy-assets.mjs` is order-dependent.** `package-build.mjs` clears the
  output directory, so a rebuild without re-running it silently ships a bundle
  whose every image 404s.
- **The upload plan carries extra globs.** `img/**`, `brand/**`, `tokens/**` and `guidelines/**` are not all in
  the skill's default plan; a future `finalize_plan` that omits them will
  leave orphaned assets in the project and break imagery.
- **Data-URI CSS weight.** If more background images enter the scoped sheets,
  `ds-styles.css` grows fast. `INLINE_MAX` in build-css.mjs caps per-asset
  inlining; anything over it stays host-absolute and will 404.
- **Shim drift.** If `src/lib/config.ts` gains exports, or components start
  importing other `next/*` modules, the shims must be extended or the bundle
  breaks at load with a single opaque ReferenceError.
- **Only Home and P1-26 are covered.** `light.css` and `odyx.css` ship whole,
  so shared classes from other screens are present in the CSS but have no
  components behind them.
