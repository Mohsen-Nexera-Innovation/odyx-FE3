import Link from 'next/link';
import ClinicalCasesHero from '@/components/clinical/ClinicalCasesHero';
import RealCaseGallery from '@/components/clinical/RealCaseGallery';
import {
  caseListingBadgeAccent,
  listingHeroImages,
  resolveRealCases,
  type ClinicalCaseListing,
} from '@/content/clinical-case-listings';
import '@/app/odyx-clinical.css';

/** Category clinical cases — real before/after photography only. */
export default function ClinicalCasesListingPage({ data }: { data: ClinicalCaseListing }) {
  const cases = resolveRealCases(data);
  const heroImages = listingHeroImages(data);
  const badge = caseListingBadgeAccent(data);

  return (
    <div className="cl cl--cases-list" style={{ ['--cl-badge' as string]: badge }}>
      <ClinicalCasesHero
        title={data.title}
        subtitle={data.subtitle}
        body={data.body}
        images={heroImages}
      />

      <section className="cl-sec cl-sec--cases-grid">
        <div className="cl-wrap">
          <div className="cl-cases-section-head">
            <h2 className="cl-sec-title">
              Patient cases
              {cases.length > 0 ? (
                <span className="cl-cases-count">{cases.length}</span>
              ) : null}
            </h2>
            <Link className="cl-cases-section-link" href="/cases#featured-cases">
              All clinical cases
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <RealCaseGallery cases={cases} />
        </div>
      </section>
    </div>
  );
}
