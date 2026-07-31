import Link from 'next/link';
import ClinicalCasesHero from '@/components/clinical/ClinicalCasesHero';
import RealCaseGallery from '@/components/clinical/RealCaseGallery';
import {
  ALL_CLINICAL_CASES,
  caseListingBadgeAccent,
  getAllClinicalCaseSections,
  heroCaseImages,
} from '@/content/clinical-case-listings';
import { CLINICAL_BADGE_ACCENTS } from '@/content/clinical-indication-types';
import '@/app/odyx-clinical.css';

/** All clinical cases — real photography grouped by category. */
export default function ClinicalAllCasesPage() {
  const sections = getAllClinicalCaseSections();
  const badge = CLINICAL_BADGE_ACCENTS.cases;

  return (
    <div className="cl cl--cases-list cl--all-cases" style={{ ['--cl-badge' as string]: badge }}>
      <ClinicalCasesHero
        title={ALL_CLINICAL_CASES.title}
        subtitle={ALL_CLINICAL_CASES.subtitle}
        body={ALL_CLINICAL_CASES.body}
        images={heroCaseImages()}
      />

      {sections.length === 0 ? (
        <section className="cl-sec cl-sec--cases-grid">
          <div className="cl-wrap">
            <p className="cl-cases-empty">Clinical case photography is coming soon.</p>
          </div>
        </section>
      ) : (
        sections.map(({ listing, cases, categoryHref }) => (
          <section
            key={listing.slug}
            className="cl-sec cl-sec--cases-grid"
            style={{ ['--cl-badge' as string]: caseListingBadgeAccent(listing) }}
          >
            <div className="cl-wrap">
              <div className="cl-cases-section-head">
                <h2 className="cl-sec-title">
                  {listing.title}
                  <span className="cl-cases-count">{cases.length}</span>
                </h2>
                <Link className="cl-cases-section-link" href={categoryHref}>
                  View category
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
              <p className="cl-cases-section-body">{listing.body}</p>
              <RealCaseGallery cases={cases} />
            </div>
          </section>
        ))
      )}
    </div>
  );
}
