import Link from 'next/link';
import ClinicalCasesHero from '@/components/solutions/cases/ClinicalCasesHero';
import RealCaseGallery from '@/components/solutions/cases/RealCaseGallery';
import {
  caseListingBadgeAccent,
  listingHeroImages,
  resolveRealCases,
  type ClinicalCaseListing,
} from '@/content/clinical-case-listings';
import ClinicalCanvas from '@/components/solutions/ClinicalCanvas';

const INTER =
  "[font-family:var(--font-inter),'Inter',system-ui,sans-serif]";
const SORA =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const WRAP = 'w-full max-w-none mx-auto px-[clamp(20px,4vw,56px)]';

/** Category clinical cases — real before/after photography only. */
export default function ClinicalCasesListingPage({ data }: { data: ClinicalCaseListing }) {
  const cases = resolveRealCases(data);
  const heroImages = listingHeroImages(data);
  const badge = caseListingBadgeAccent(data);

  return (
    <div className={`${INTER} min-h-dvh overflow-x-clip bg-[#f4f7fc] text-[#14203a]`}>
      <ClinicalCanvas color="#f4f7fc" />
      <ClinicalCasesHero
        title={data.title}
        subtitle={data.subtitle}
        body={data.body}
        images={heroImages}
        badgeColor={badge}
      />

      <section className="py-[clamp(28px,3.6vw,44px)]">
        <div className={WRAP}>
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-4">
            <h2
              className={`${SORA} m-0 inline-flex flex-wrap items-center gap-2.5 text-[clamp(1.25rem,1.6vw,1.4rem)] font-bold tracking-[-0.02em] text-[#14203a]`}
            >
              Patient cases
              {cases.length > 0 ? (
                <span className="inline-flex h-[1.6em] min-w-[1.6em] items-center justify-center rounded-full bg-[rgba(0,80,216,.1)] px-[7px] text-[0.72rem] font-bold tracking-normal text-[#0050D8]">
                  {cases.length}
                </span>
              ) : null}
            </h2>
            <Link
              href="/solutions/cases#featured-cases"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.875rem] font-semibold tracking-[-0.01em] text-[#0050D8] no-underline hover:text-[#0041AF]"
            >
              All clinical cases
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="size-3.5">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <RealCaseGallery cases={cases} tagColor={badge} />
        </div>
      </section>
    </div>
  );
}
