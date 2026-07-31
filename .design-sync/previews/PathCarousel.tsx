// PathCarousel is the Home screen's audience selector — Lab Technician,
// Dentist and Guest as a 3D deck, the active card face-on and the other two
// angled away as trapezoids.
//
// Wrapped in the `.hv2-sec` section and given the screen's own heading block,
// matching how HomeV2Page presents it.
//
// Interactive: the arrows and dots move the deck. A still frame shows the
// opening state, which is what the screen loads with.
//
// NB: this card needs a wide viewport (see cfg.overrides). The angled side
// cards sit outside the stage and are clipped; at a narrow viewport their
// images never finish decoding and the capture harness hangs on them.
import * as React from 'react';
import { PathCarousel } from 'web';
import { HomeStage } from './_stage';

export function AudiencePaths() {
  return (
    <HomeStage>
      <section className="hv2-sec" id="path">
        <div className="hv2-wrap hv2-center">
          <p className="hv2-eyebrow">Choose Your Path</p>
          <h2 className="hv2-h2">
            Your Journey. <span className="hv2-blue">Your Solution.</span>
          </h2>
        </div>
        <PathCarousel />
      </section>
    </HomeStage>
  );
}
