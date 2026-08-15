// P126RoiMini is the inline savings estimator on the P1-26 product screen: two
// inputs (monthly cases, cost per case) driving a computed monthly saving.
//
// Styling is Tailwind on the component. P126Stage still wraps with
// `.p126-page` so preview reveal rules match the live page root.
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
