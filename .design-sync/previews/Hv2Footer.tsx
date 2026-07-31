// Hv2Footer is the navy footer that closes the Home screen — the design
// system's canonical footer.
//
// It lays its link columns out with container queries against `.hv2-ft-in`,
// so it needs real width to resolve: in a narrow card the column tracks
// collapse and the headings overlap each other. The stage therefore gives it
// the full card width and the `.hv2` root the descendant rules expect.
// See cfg.overrides.Hv2Footer (cardMode column).
import * as React from 'react';
import { Hv2Footer } from 'web';
import { HomeStage } from './_stage';

export function SiteFooter() {
  return (
    <HomeStage>
      <Hv2Footer />
    </HomeStage>
  );
}
