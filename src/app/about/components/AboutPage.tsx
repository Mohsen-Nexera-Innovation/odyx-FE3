import React from 'react';
import { AboutHero } from './AboutHero';
import { WhyOdyxSection } from './WhyOdyxSection';
import { ValuesSection } from './ValuesSection';
import { aboutData } from '../data/about.data';

export default function AboutPage() {
  return (
    <div className="about bg-white w-full min-h-screen flex flex-col gap-3 md:gap-4 pb-4">
      <AboutHero data={aboutData.hero} />
      <WhyOdyxSection data={aboutData.why} />
      <ValuesSection data={aboutData.values} />
    </div>
  );
}
