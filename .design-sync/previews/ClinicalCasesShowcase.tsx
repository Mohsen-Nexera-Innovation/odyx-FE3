// ClinicalCasesShowcase is the Home screen's case gallery — implant,
// orthodontic, restorative and surgical work shown as a deck the visitor
// advances through, with the active case described alongside.
import * as React from 'react';
import { ClinicalCasesShowcase } from 'web';
import { HomeStage } from './_stage';

export function CaseGallery() {
  return (
    <HomeStage>
      <ClinicalCasesShowcase />
    </HomeStage>
  );
}
