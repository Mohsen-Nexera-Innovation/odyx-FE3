import { CasesHero } from './CasesHero';
import { BrowseCardsSection } from './BrowseCardsSection';
import { ShareCtaSection } from './ShareCtaSection';
import { casesData } from '@/content/cases';
import type { BrowseSectionData } from '@/content/cases';

type Props = {
  applications: BrowseSectionData;
  products: BrowseSectionData;
};

export default function CasesPage({
  applications,
  products,
}: Props) {
  return (
    <div className="bg-white w-full min-h-screen flex flex-col gap-3 md:gap-4 pb-4" data-hero-light>
      <CasesHero data={casesData.hero} />
      <BrowseCardsSection data={applications} />
      <BrowseCardsSection data={products} />
      <ShareCtaSection data={casesData.share} />
    </div>
  );
}
