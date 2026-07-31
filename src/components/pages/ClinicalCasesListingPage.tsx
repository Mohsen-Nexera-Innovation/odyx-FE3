import Link from 'next/link';
import {
  caseListingBadgeAccent,
  resolveCaseListingItems,
  type ClinicalCaseListing,
} from '@/content/clinical-case-listings';
import '@/app/odyx-clinical.css';

/** Category case listing — heroes from indication pages, links to detail. */
export default function ClinicalCasesListingPage({ data }: { data: ClinicalCaseListing }) {
  const items = resolveCaseListingItems(data);
  const badge = caseListingBadgeAccent(data);

  return (
    <div className="cl cl--sdc cl--cases-list" style={{ ['--cl-badge' as string]: badge }}>
      <section className="cl-hero cl-hero--cases-list" data-hero-dark>
        <div className="cl-wrap">
          <p className="cl-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path
                d="M12 3c2.5 2.2 4 5.2 4 8.2A4 4 0 0 1 8 11.2C8 8.2 9.5 5.2 12 3z"
                strokeLinejoin="round"
              />
            </svg>
            Clinical Cases
          </p>
          <h1>{data.title}</h1>
          <p className="cl-hero-sub">{data.subtitle}</p>
          <p className="cl-hero-body cl-hero-body--wide">{data.body}</p>
          <Link className="cl-cases-back" href="/solutions/clinical-applications">
            ← All clinical applications
          </Link>
        </div>
      </section>

      <section className="cl-sec cl-sec--cases-grid">
        <div className="cl-wrap">
          <h2 className="cl-sec-title">Applications in this category</h2>
          <div className="cl-cases-grid">
            {items.map((item) => (
              <Link key={item.slug} href={item.href} className="cl-cases-card">
                <span className="cl-cases-card-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.imgAlt} />
                </span>
                <span className="cl-cases-card-copy">
                  <strong>{item.title}</strong>
                  <span className="cl-cases-card-sub">{item.subtitle}</span>
                  <span className="cl-cases-card-body">{item.body}</span>
                  <span className="cl-cases-card-cta">
                    View workflow
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
