import type { RealClinicalCase } from '@/content/clinical-case-photos';

/** Grid of real before/after clinical case cards (not application links). */
export default function RealCaseGallery({
  cases,
  emptyLabel = 'Clinical case photography for this category is coming soon.',
}: {
  cases: RealClinicalCase[];
  emptyLabel?: string;
}) {
  if (cases.length === 0) {
    return <p className="cl-cases-empty">{emptyLabel}</p>;
  }

  return (
    <div className="cl-real-grid">
      {cases.map((c) => (
        <article key={c.id} className="cl-real-card">
          <header className="cl-real-card-head">
            <span className="cl-real-tag">{c.tag}</span>
            <h3>{c.title}</h3>
          </header>
          <div className="cl-real-pair">
            <figure className={`cl-real-shot${c.before.focus === 'smile' ? ' cl-real-shot--smile' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.before.img} alt={c.before.alt} loading="lazy" />
              <figcaption>Before</figcaption>
            </figure>
            <figure className={`cl-real-shot${c.after.focus === 'smile' ? ' cl-real-shot--smile' : ''}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.after.img} alt={c.after.alt} loading="lazy" />
              <figcaption>After</figcaption>
            </figure>
          </div>
        </article>
      ))}
    </div>
  );
}
