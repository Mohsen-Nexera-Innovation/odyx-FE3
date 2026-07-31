import Link from 'next/link';
import type { ReactNode } from 'react';
import BeforeAfterSlider from '@/components/clinical/BeforeAfterSlider';
import {
  CLINICAL_BADGE_ACCENTS,
  type ClinicalIndicationContent,
} from '@/content/clinical-indication-types';
import '@/app/odyx-clinical.css';

/** Why ODYX icons — blue outline line-art */
const WHY_ICONS: Record<string, ReactNode> = {
  'one-visit': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.2V12l3.4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  strength: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path
        d="M12 3.2c2.6 2.2 4.2 5.1 4.2 8.1a4.2 4.2 0 0 1-8.4 0c0-3 1.6-5.9 4.2-8.1z"
        strokeLinejoin="round"
      />
      <path d="M9.4 15.6c.8 1.6 1.7 2.9 2.6 3.7.9-.8 1.8-2.1 2.6-3.7" strokeLinecap="round" />
    </svg>
  ),
  connected: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="6.2" cy="12" r="2.3" />
      <circle cx="17.8" cy="6.8" r="2.3" />
      <circle cx="17.8" cy="17.2" r="2.3" />
      <path d="M8.4 11.1 15.5 7.8M8.4 12.9l7.1 3.3" strokeLinecap="round" />
    </svg>
  ),
  roi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4.5 18.5V6.5M4.5 18.5H19" strokeLinecap="round" />
      <path d="M7.5 14.2 11 10l3 2.4L17.8 7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.8" cy="7" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/** Square checkbox mark — Clinical Tips (not circular / radio-style) */
function TipCheck() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden className="cl-tip-check-svg">
      <rect x="1" y="1" width="18" height="18" rx="3" fill="rgba(0,80,216,.10)" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 10.2 8.6 13.2 14.7 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Shared clinical indication detail — Same-Day Crown chrome; content/images only vary. */
export default function ClinicalIndicationPage({ data }: { data: ClinicalIndicationContent }) {
  const d = data;
  const badge = CLINICAL_BADGE_ACCENTS[d.category];

  return (
    <div className="cl cl--sdc" style={{ ['--cl-badge' as string]: badge }}>
      <section className="cl-hero" data-hero-dark>
        <div className="cl-wrap cl-hero-grid">
          <div className="cl-hero-copy">
            <p className="cl-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path
                  d="M12 3c2.5 2.2 4 5.2 4 8.2A4 4 0 0 1 8 11.2C8 8.2 9.5 5.2 12 3z"
                  strokeLinejoin="round"
                />
              </svg>
              {d.hero.badge}
            </p>
            <h1>{d.hero.title}</h1>
            <p className="cl-hero-sub">{d.hero.subtitle}</p>
            <p className="cl-hero-body">{d.hero.body}</p>
            <Link className="cl-btn" href={d.hero.cta.href}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 4v10M8 10l4 4 4-4M5 18h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d.hero.cta.label}
            </Link>
          </div>
          <figure className="cl-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={d.hero.img} alt={d.hero.imgAlt} />
          </figure>
        </div>
      </section>

      <section className="cl-sec cl-sec--products">
        <div className="cl-wrap">
          <h2 className="cl-sec-title">{d.productsTitle}</h2>
          <div className="cl-products">
            {d.products.map((p) => (
              <Link key={p.id} href={p.href} className="cl-prod">
                <span className="cl-prod-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt="" />
                </span>
                <span className="cl-prod-copy">
                  <strong>{p.name}</strong>
                  <span>{p.sub}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-sec cl-sec--timeline">
        <div className="cl-wrap">
          <div className="cl-tl-head">
            <h2 className="cl-sec-title">{d.timeline.title}</h2>
            <p className="cl-tl-total">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d.timeline.total}
            </p>
          </div>
          <ol className="cl-tl">
            {d.timeline.steps.map((s) => (
              <li key={s.n} className="cl-tl-step">
                <span className="cl-tl-n">{s.n}</span>
                <span className="cl-tl-ic">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" />
                </span>
                <strong>{s.title}</strong>
                <p>{s.body}</p>
                <span className="cl-tl-time">{s.time}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cl-sec cl-sec--mid">
        <div className="cl-wrap cl-split">
          <BeforeAfterSlider title={d.beforeAfter.title} slides={d.beforeAfter.slides} />
          <div className="cl-card cl-card--why">
            <h2>{d.why.title}</h2>
            <ul className="cl-why-list">
              {d.why.items.map((item) => (
                <li key={item.id} className="cl-why-item">
                  <span className="cl-why-ic">{WHY_ICONS[item.id] ?? WHY_ICONS.connected}</span>
                  <span className="cl-why-copy">
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="cl-sec cl-sec--bottom">
        <div className="cl-wrap cl-trio">
          <div className="cl-card">
            <h2>{d.params.title}</h2>
            <table className="cl-params">
              <tbody>
                {d.params.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cl-card">
            <h2>{d.tips.title}</h2>
            <ul className="cl-tips">
              {d.tips.items.map((tip) => (
                <li key={tip}>
                  <span className="cl-tip-check" aria-hidden>
                    <TipCheck />
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cl-card cl-card--case">
            <h2>{d.realCase.title}</h2>
            <div className="cl-case-grid">
              <div className="cl-case-copy">
                <p className="cl-case-body">{d.realCase.body}</p>
                <Link className="cl-case-link" href={d.realCase.videoHref}>
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5.5v13l11-6.5-11-6.5z" />
                  </svg>
                  {d.realCase.videoLabel}
                </Link>
              </div>
              <Link className="cl-case-thumb" href={d.realCase.videoHref} aria-label={d.realCase.videoLabel}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.realCase.thumb} alt={d.realCase.thumbAlt} />
                <span className="cl-case-play">
                  <span>
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
