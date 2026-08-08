import React from 'react';
import { LearningHero } from './LearningHero';
import { SearchSection } from './SearchSection';
import { JourneySection } from './JourneySection';
import { BeginnerPathSection } from './BeginnerPathSection';
import { ClinicalCoursesSection } from './ClinicalCoursesSection';
import { ResourcesSection } from './ResourcesSection';
import { ImpactSection } from './ImpactSection';
import { LearningCtaSection } from './LearningCtaSection';
import { learningData } from '../data/learning.data';

export default function LearningPage() {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col gap-3 md:gap-4 pb-4">
      <LearningHero data={learningData.hero} featured={learningData.featured} />
      <SearchSection data={learningData.search} />
      <JourneySection data={learningData.journey} />
      <BeginnerPathSection data={learningData.beginner} />
      <ClinicalCoursesSection data={learningData.clinical} />
      <ResourcesSection data={learningData.resources} />
      <ImpactSection data={learningData.impact} />
      <LearningCtaSection data={learningData.cta} />
    </div>
  );
}
