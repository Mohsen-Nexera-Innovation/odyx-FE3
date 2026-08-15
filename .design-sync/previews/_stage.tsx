// Shared preview scaffolding for the ODYX cards.
//
// Nothing here ships in the design system — it only reproduces the page
// context each component needs to look the way it looks on the real screen.
// Three things the app provides that a bare preview root does not:
//
//  1. Root class. 69 rules in home-v2.css are written `.hv2 <descendant>`
//     (including all heading typography), and the P1-26 preview root uses
//     `.p126-page`. Rendered without the wrapper, sections come out
//     with unstyled headings — which is exactly what the unauthored cards did.
//  2. Settled reveal state. `.hv2 .rv{opacity:0}` keeps reveal-on-scroll
//     elements invisible until Hv2Motion adds `.rv-in` on intersection. A
//     screenshot is one static frame, so previews render the settled state
//     directly — the same end state the stylesheet's own
//     prefers-reduced-motion branch produces.
//  3. A light page canvas. globals.css paints it on `main`, which previews
//     do not have.
import * as React from 'react';

// Both screens hide their content until a scroll observer marks it in, using
// two different vocabularies: Home uses `.hv2 .rv` -> `.rv-in` (Hv2Motion),
// P1-26 uses `.p126-page .reveal` -> `.reveal.in`. Either way a static
// screenshot catches the pre-reveal frame and the card looks empty — which is
// exactly why P126RoiMini rendered blank while its text was present in the DOM.
// These two rules are copied from each stylesheet's own
// prefers-reduced-motion branch, so previews show the settled state the CSS
// itself defines rather than an invention of ours.
export const REVEALED =
  '.hv2 .rv{opacity:1;transform:none;transition:none}' +
  '.p126-page .reveal{opacity:1!important;transform:none!important;transition:none!important}';

// GlobalToolsProvider (cfg.provider) mounts the site-wide floating action
// buttons and the command-palette overlay. They are `position:fixed`, so they
// stamp themselves onto every card regardless of which component it shows.
// Hidden here so each card documents its own component; the real chrome still
// ships in the bundle and appears on the whole-screen cards.
export const NO_GLOBAL_CHROME = '.fabs,.search-ov{display:none!important}';

export const PREVIEW_CSS = `${REVEALED}${NO_GLOBAL_CHROME}`;

const CANVAS =
  'linear-gradient(180deg,#f5fafd 0%,#eef6fc 40%,#e9f4fb 70%,#f5fafd 100%)';

// Force every lazy image to load immediately.
//
// The ODYX components mark their imagery `loading="lazy"`, so Chromium never
// starts the request for anything below the fold. The capture harness's
// settle() then awaits `img.decode()` on those images — and decode() on an
// image that has never begun loading neither resolves nor rejects, with no
// timeout around it. One such image hangs the whole capture silently.
//
// It bites hardest on the full-screen cards: a ~5000px page has most of its
// imagery below any viewport. Flipping to eager makes the page load exactly
// what a full-page screenshot is going to show anyway.
export function EagerImages() {
  React.useEffect(() => {
    for (const img of Array.from(document.images)) {
      if (img.loading === 'lazy') img.loading = 'eager';
    }
  }, []);
  return null;
}

export function HomeStage({ children }: { children: React.ReactNode }) {
  return (
    <div className="hv2" style={{ background: CANVAS }}>
      <style>{PREVIEW_CSS}</style>
      {children}
    </div>
  );
}

export function P126Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="p126-page" style={{ background: CANVAS }}>
      <style>{PREVIEW_CSS}</style>
      {children}
    </div>
  );
}
