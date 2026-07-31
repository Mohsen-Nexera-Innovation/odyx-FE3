// HubCardsSection is the Home screen's four-way entry grid — Learning and
// Support on the first row, Store and Registration on the second — each card
// pairing an illustration band with its own link set.
//
// The section is a single fixed composition with no props; its content comes
// from the component itself.
import * as React from 'react';
import { HubCardsSection } from 'web';
import { HomeStage } from './_stage';

export function EcosystemHubs() {
  return (
    <HomeStage>
      <HubCardsSection />
    </HomeStage>
  );
}
