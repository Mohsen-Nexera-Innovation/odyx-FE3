// P126Video is the click-to-play product film block on the P1-26 screen.
//
// It renders its poster frame and a play affordance until activated, which is
// exactly what a design surface should show — the source file itself
// (public/video/hero.mp4, 44MB) is deliberately not shipped with the design
// system, so the poster is the whole card.
import * as React from 'react';
import { P126Video } from 'web';
import { P126Stage } from './_stage';

export function PosterState() {
  return (
    <P126Stage>
      <P126Video />
    </P126Stage>
  );
}
