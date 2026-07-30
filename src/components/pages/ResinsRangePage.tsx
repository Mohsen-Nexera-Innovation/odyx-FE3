import type { ReactNode } from 'react';
import DocsTabs from '@/components/resin/DocsTabs';
import {
  DOCS,
  HERO,
  LINES,
  LINES_SECTION,
  LINE_CTA_LABEL,
  WHY,
} from '@/content/resins';

/** Hero feature icons — traced from resins-line UI mock (thin cyan neon line art). */
const FEATURE_ICONS: Record<string, ReactNode> = {
  validated: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      {/* Shield: peaked top, pointed base */}
      <path
        d="M20 5.2L31.2 9.4v9.2c0 7.4-4.5 12.2-11.2 14.6C13.3 30.8 8.8 26 8.8 18.6V9.4L20 5.2z"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 19.6l3.1 3.15 6.7-7"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  strength: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      {/* Faceted diamond + corner sparkles (design) */}
      <path
        d="M16.4 8.8h7.2L30 14.4H10l6.4-5.6z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.4L20 33.4 30 14.4"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path d="M16.4 8.8L20 14.4M23.6 8.8L20 14.4" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
      <path d="M14.2 14.4L20 33.4M25.8 14.4L20 33.4" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M9 10.4v3.2M7.4 12h3.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
      <path d="M31 10.4v3.2M29.4 12h3.2" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  ),
  compat: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="11.2" stroke="currentColor" strokeWidth="1.65" />
      <path
        d="M14.4 20.3l3.5 3.4 8-8.2"
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  esthetics: (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden>
      {/* Leaf tilted right with midrib + short stem */}
      <g transform="rotate(18 20 20)">
        <path
          d="M20 7.5c6.2 4.2 9.2 9.4 9.2 14.6 0 5.1-3.6 8.6-9.2 10.4-5.6-1.8-9.2-5.3-9.2-10.4 0-5.2 3-10.4 9.2-14.6z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M20 9.2v23.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 32.4c-1.6.6-2.8 1.3-3.4 2.2"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
      </g>
    </svg>
  ),
};

const WHY_ICONS: Record<string, ReactNode> = {
  proven: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M20 6l10 4v9c0 7-4.2 11.4-10 13.5C14.2 30.4 10 26 10 19V10l10-4z" />
      <path d="M15.5 20.2l3.2 3.2 6.2-6.6" />
    </svg>
  ),
  formulas: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M20 8c4 6 8 10 8 15a8 8 0 1 1-16 0c0-5 4-9 8-15z" />
      <path d="M15 24h10" />
    </svg>
  ),
  compat: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="14" cy="20" r="6" />
      <circle cx="26" cy="20" r="6" />
      <path d="M20 17.5v5" />
    </svg>
  ),
  esthetics: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="14" cy="16" r="5" />
      <circle cx="24" cy="14" r="4" />
      <circle cx="26" cy="24" r="5" />
      <circle cx="15" cy="26" r="3.5" />
    </svg>
  ),
  safe: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M12 28c6-2 10-8 12-18 1.2 0 3.2.6 4 2-1 8-5 14-12 18-1.4.8-3.2 1.2-4 0z" />
      <path d="M16 22c2.5-1 5-3.5 7-7M14 26c2.2-.8 4.5-2.5 6.5-5" />
    </svg>
  ),
};

const DocsIcon = () => (
  <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
    <path d="M14 8h9l5 5v17a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
    <path d="M23 8v5h5M16 20h10M16 25h7" />
  </svg>
);

const Dot = () => (
  <svg className="rs-dot" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity=".12" />
    <path
      d="M7.5 12.2l3 3 6-6.4"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** 039 · Resins — client resins-line UI reference */
export default function ResinsRangePage() {
  return (
    <div className="rs">
      <section className="rs-hero" data-hero-dark>
        <div className="rs-hero-glow" aria-hidden />
        <div className="rs-hero-glow rs-hero-glow--streak" aria-hidden />
        <div className="rs-wrap rs-hero-grid">
          <div className="rs-hero-copy">
            <p className="rs-eyebrow">{HERO.title}</p>
            <h1 className="rs-display">{HERO.tagline}</h1>
            <p className="rs-hero-sub">{HERO.sub}</p>
            <ul className="rs-features">
              {HERO.features.map((f) => (
                <li key={f.id} className="rs-feature">
                  <span className="rs-feature-ic">{FEATURE_ICONS[f.id]}</span>
                  <span className="rs-feature-copy">
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="rs-hero-media" aria-label={HERO.imgAlt}>
            <div className="rs-hero-products">
              {LINES.map((line, i) => (
                <img
                  key={line.id}
                  className="rs-hero-product"
                  src={`${line.img}?v=12`}
                  alt={line.imgAlt}
                  width={800}
                  height={1400}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section className="rs-sec rs-lines-sec" id="lines">
        <div className="rs-wrap">
          <div className="rs-sec-head">
            <p className="rs-sec-eyebrow">{LINES_SECTION.eyebrow}</p>
            <h2 className="rs-sec-title">{LINES_SECTION.title}</h2>
            <p className="rs-sec-intro">{LINES_SECTION.intro}</p>
          </div>
          <div className="rs-lines">
            {LINES.map((line) => (
              <article key={line.id} className={`rs-line rs-line--${line.id}`}>
                <div className="rs-line-media">
                  <img
                    src={`${line.img}?v=12`}
                    alt={line.imgAlt}
                    loading="lazy"
                    width={800}
                    height={1400}
                  />
                </div>
                <div className="rs-line-body">
                  <h3>{line.name}</h3>
                  <p>{line.highlight}</p>
                  <a className="rs-line-cta" href={`#docs-${line.id}`}>
                    {LINE_CTA_LABEL} <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-sec rs-why-sec" id="why">
        <div className="rs-wrap">
          <div className="rs-why">
            <div className="rs-why-main">
              <p className="rs-why-eyebrow">{WHY.eyebrow}</p>
              <ul className="rs-why-grid">
                {WHY.features.map((f) => (
                  <li key={f.id} className="rs-why-item">
                    <span className="rs-why-ic">{WHY_ICONS[f.id]}</span>
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rs-why-docs">
              <span className="rs-why-docs-ic">
                <DocsIcon />
              </span>
              <h3>{WHY.docs.title}</h3>
              <p>{WHY.docs.body}</p>
              <a className="rs-line-cta" href={WHY.docs.cta.href}>
                {WHY.docs.cta.label} <span aria-hidden>→</span>
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="rs-sec rs-sec--tint" id="downloads">
        <div className="rs-wrap">
          <div className="rs-sec-head rs-sec-head--start">
            <h2 className="rs-sec-title">{DOCS.title}</h2>
            <p className="rs-sec-intro">{DOCS.intro}</p>
          </div>
          <div className="rs-docs-grid">
            <div className="rs-card rs-card--pad">
              <DocsTabs />
            </div>
            <div className="rs-card rs-card--pad">
              <h3 className="rs-cert-title">{DOCS.certTitle}</h3>
              <div className="rs-table-scroll">
                <table className="rs-cert">
                  <thead>
                    <tr>
                      <th scope="col">Line</th>
                      {DOCS.certColumns.map((c) => (
                        <th scope="col" key={c}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DOCS.certRows.map((row) => (
                      <tr key={row.line}>
                        <th scope="row">{row.line}</th>
                        {DOCS.certColumns.map((c) => (
                          <td key={c} data-yes={row.marks.includes(c)}>
                            {row.marks.includes(c) ? <Dot /> : <span aria-hidden>—</span>}
                            <span className="rs-visually-hidden">
                              {row.marks.includes(c) ? `${c}: yes` : `${c}: no`}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="rs-micro">{DOCS.certMicro}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
