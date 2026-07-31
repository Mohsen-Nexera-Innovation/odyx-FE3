// P126Cases is the P1-26 clinical evidence block: a tab per case type (crown,
// surgical guide, splint, denture, model) revealing a before / printed / final
// image triptych for the selected one.
//
// Tabs are client state, so a still frame shows the first tab. Wrapped in
// .p126-page because every rule that styles it is scoped under that root.
import * as React from 'react';
import { P126Cases } from 'web';
import { P126Stage } from './_stage';

export function CaseTabs() {
  return (
    <P126Stage>
      <P126Cases />
    </P126Stage>
  );
}
