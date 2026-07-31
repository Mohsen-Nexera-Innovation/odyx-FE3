// Header renders the ODYX main navigation in its Home-screen treatment.
//
// Two things make this component need a hand-built stage:
//
//  1. odyx.css sets a bare element rule `header{position:fixed;top:0}`, so the
//     bar leaves normal flow and a plain preview root measures zero height —
//     that is why the unauthored card fell back to the typographic floor. A
//     `transform` on the stage creates a containing block, which pins the
//     fixed bar inside the card instead of the viewport.
//  2. The bar picks its own colour treatment by inspecting the page: it looks
//     for `.page-hero, [data-hero-light], [data-hero-dark]`. The Home screen
//     exposes `data-hero-light`, which puts the bar in its `on-light` state
//     where `--sky` resolves to the approved action blue #0050D8.
//
// Only one cell: the treatment is chosen from document state rather than
// props, so two Header cells sharing a card document would both resolve to the
// same state and render identically. See cfg.overrides.Header (cardMode single).
import * as React from 'react';
import { Header } from 'web';
import { PREVIEW_CSS } from './_stage';

const stage: React.CSSProperties = {
  position: 'relative',
  transform: 'translateZ(0)',
  height: 240,
  overflow: 'hidden',
  background: 'linear-gradient(180deg,#eef6fc 0%,#e9f4fb 100%)',
};

export function HomeNavigation() {
  return (
    <div style={stage}>
      <style>{PREVIEW_CSS}</style>
      {/* The Home hero's marker: what puts the bar on its action-blue
          on-light treatment. Empty and inert — only its attribute matters. */}
      <div data-hero-light aria-hidden style={{ position: 'absolute', inset: 0 }} />
      <Header />
    </div>
  );
}
