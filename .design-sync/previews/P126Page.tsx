// P126Page is the complete ODYX P1-26 product screen — hero packshot and
// feature chips, the spec run, clinical cases, the ROI estimator and the
// product film — as one composition.
//
// Like HomeV2Page it supplies its own root (`.p126-page`); the preview only
// settles the reveal state and hides the fixed global chrome for the capture.
import * as React from 'react';
import { P126Page } from 'web';
import { EagerImages, PREVIEW_CSS } from './_stage';

export function FullScreen() {
  return (
    <>
      <style>{PREVIEW_CSS}</style>
      <EagerImages />
      <P126Page />
    </>
  );
}
