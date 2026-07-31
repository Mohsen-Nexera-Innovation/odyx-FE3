// HomeV2Page is the whole ODYX home screen — hero, ecosystem rail, clinical
// applications, case gallery, hub grid, latest updates and the navy footer,
// assembled in order.
//
// It brings its own `.hv2` root and mounts Hv2Motion itself, so the only thing
// the preview adds is the settled reveal state (a screenshot would otherwise
// catch mid-transition frames) and suppression of the fixed global chrome,
// which on a full-page capture would otherwise float over the middle of the
// screen rather than sit where a real viewport puts it.
import * as React from 'react';
import { HomeV2Page } from 'web';
import { EagerImages, PREVIEW_CSS } from './_stage';

export function FullScreen() {
  return (
    <>
      <style>{PREVIEW_CSS}</style>
      <EagerImages />
      <HomeV2Page />
    </>
  );
}
