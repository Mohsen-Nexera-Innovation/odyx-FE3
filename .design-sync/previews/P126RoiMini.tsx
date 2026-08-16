// P126RoiMini is the inline savings estimator on the P1-26 product screen: two
// inputs (monthly cases, cost per case) driving a computed monthly saving.
//
// Its styling lives entirely under the `.p126-page` root in odyx-p126.css, so
// without that wrapper the panel renders as unstyled text on white — which is
// why the unauthored card looked blank despite mounting correctly (its text
// content was there all along).
//
// The figures are the component's own defaults from src/content/p1-26.ts; the
// preview supplies no props because the component takes none.
import * as React from 'react';
import { P126RoiMini } from 'web';
import { P126Stage } from './_stage';

export function SavingsEstimator() {
  return (
    <P126Stage>
      <P126RoiMini />
    </P126Stage>
  );
}
