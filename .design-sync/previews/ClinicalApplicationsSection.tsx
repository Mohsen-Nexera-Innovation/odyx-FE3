// ClinicalApplicationsSection presents the indications ODYX covers — clear
// aligners, dental models, implant dentistry, prosthetics, restorative — as a
// stacked deck of photographic cards with a copy column alongside.
//
// Interactive: selecting an indication brings its card to the front. The still
// frame documents the default selection.
import * as React from 'react';
import { ClinicalApplicationsSection } from 'web';
import { HomeStage } from './_stage';

export function Indications() {
  return (
    <HomeStage>
      <ClinicalApplicationsSection />
    </HomeStage>
  );
}
