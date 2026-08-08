import { CasesHero } from './CasesHero';
import { BrowseCardsSection } from './BrowseCardsSection';
import { FeaturedCasesSection } from './FeaturedCasesSection';
import { ShareCtaSection } from './ShareCtaSection';
import { casesData } from '../data/cases.data';
import type { BrowseSectionData, FeaturedSectionData } from '../types';

type Props = {
  applications: BrowseSectionData;
  products: BrowseSectionData;
  featured: FeaturedSectionData;
  productFilter?: string;
};

export default function CasesPage({
  applications,
  products,
  featured,
  productFilter,
}: Props) {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col gap-3 md:gap-4 pb-4" data-hero-light>
      <CasesHero data={casesData.hero} />
      <BrowseCardsSection data={applications} />
      <BrowseCardsSection data={products} />
      <FeaturedCasesSection data={featured} productFilter={productFilter} />
      <ShareCtaSection data={casesData.share} />
    </div>
  );
}
