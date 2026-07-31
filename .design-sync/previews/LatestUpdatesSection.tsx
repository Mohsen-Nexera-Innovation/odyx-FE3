// LatestUpdatesSection is the news carousel that closes the Home screen's
// editorial run — events, product news and webinars as dated cards.
//
// The flanking cards are rotateY trapezoids, so the card needs real width for
// the perspective to read as intended rather than as clipped artwork.
import * as React from 'react';
import { LatestUpdatesSection } from 'web';
import { HomeStage } from './_stage';

export function NewsCarousel() {
  return (
    <HomeStage>
      <LatestUpdatesSection />
    </HomeStage>
  );
}
