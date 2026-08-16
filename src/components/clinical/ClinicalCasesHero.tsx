import Link from 'next/link';

type Props = {
  badge?: string;
  title: string;
  subtitle: string;
  body: string;
  images: string[];
  backHref?: string;
  backLabel?: string;
};

/** Light clinical hero with real case photo collage (not black cutout chrome). */
export default function ClinicalCasesHero({
  badge = 'Clinical Cases',
  title,
  subtitle,
  body,
  images,
  backHref = '/solutions/clinical-applications',
  backLabel = '← All clinical applications',
}: Props) {
  const shots = images.slice(0, 4);

  return (
    <section className="cl-cases-hero" data-hero-light aria-label={title}>
      <div className="cl-wrap cl-cases-hero-grid">
        <div className="cl-cases-hero-copy">
          <p className="cl-cases-hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path
                d="M12 3c2.5 2.2 4 5.2 4 8.2A4 4 0 0 1 8 11.2C8 8.2 9.5 5.2 12 3z"
                strokeLinejoin="round"
              />
            </svg>
            {badge}
          </p>
          <h1>{title}</h1>
          <p className="cl-cases-hero-sub">{subtitle}</p>
          <p className="cl-cases-hero-body">{body}</p>
          <Link className="cl-cases-hero-back" href={backHref}>
            {backLabel}
          </Link>
        </div>

        <div className="cl-cases-hero-collage" aria-hidden={shots.length === 0}>
          {shots.length > 0 ? (
            shots.map((src, i) => (
              <figure key={src} className={`cl-cases-hero-shot cl-cases-hero-shot--${i + 1}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" />
              </figure>
            ))
          ) : (
            <div className="cl-cases-hero-empty">Case photography coming soon</div>
          )}
        </div>
      </div>
    </section>
  );
}
