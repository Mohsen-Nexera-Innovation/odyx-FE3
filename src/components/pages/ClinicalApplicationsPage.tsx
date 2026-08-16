import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  CLINICAL_CATEGORIES,
  CLINICAL_HUB_BANNER,
  CLINICAL_HUB_FEATURES,
} from '@/content/clinical-applications';
import '@/app/odyx-clinical.css';

/** Category icons — extracted from design strip (circle + white glyph) */
const CAT_ICON_SRC: Record<string, string> = {
  restorative: '/img/clinical-hub/icons/cat-restorative.png',
  implant: '/img/clinical-hub/icons/cat-implant.png',
  orthodontics: '/img/clinical-hub/icons/cat-orthodontics.png',
  prosthetics: '/img/clinical-hub/icons/cat-prosthetics.png',
  cases: '/img/clinical-hub/icons/cat-cases.png',
};

/** Bottom feature icons — stroke + light fill, matching design reference */
const FEAT_ICONS: Record<string, ReactNode> = {
  integration: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.2 20.2 7.8v8.4L12 20.8 3.8 16.2V7.8L12 3.2Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 3.2v17.6M3.8 7.8 12 12.2l8.2-4.4" stroke="#0050D8" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3.5h7.4L18.5 8.1V20a1.4 1.4 0 0 1-1.4 1.4H6.5A1.4 1.4 0 0 1 5.1 20V4.9A1.4 1.4 0 0 1 6.5 3.5Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.7 3.5V8h4.8" stroke="#0050D8" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.4 12h7.2M8.4 15h5.6M8.4 18h4" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  reliable: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="10.4" r="6.2" fill="#E8F0FF" stroke="#0050D8" strokeWidth="1.6" />
      <path
        d="M8.2 8.2c.7-.9 1.7-1.5 2.8-1.7M15.8 8.2c-.7-.9-1.7-1.5-2.8-1.7M7.6 12.6c.4 1.8 1.8 3.2 3.6 3.7M16.4 12.6c-.4 1.8-1.8 3.2-3.6 3.7"
        stroke="#0050D8"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M9.6 10.5 11.3 12.2 14.7 8.7" stroke="#0050D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.6 16.6 8.5 21.2l3.5-1.2 3.5 1.2-1.1-4.6" stroke="#0050D8" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13" r="7.4" fill="#E8F0FF" stroke="#0050D8" strokeWidth="1.6" />
      <path d="M12 9.2V13l2.8 1.7" stroke="#0050D8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 3.6h4" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5.8 12a6.2 6.2 0 0 1 12.4 0" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M4.6 12.2v2.8a1.7 1.7 0 0 0 1.7 1.7h1.3V12.2H4.6Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 12.2v2.8a1.7 1.7 0 0 1-1.7 1.7h-1.3V12.2h3Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16.4 16.7v.7A2.4 2.4 0 0 1 14 19.8h-1.2" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

/** Clinical Applications hub — fidelity: clinical-application-all-types.jpeg */
export default function ClinicalApplicationsPage() {
  return (
    <div className="cl cl--hub">
      <section className="cl-hub" data-hero-light>
        <div className="cl-wrap">
          <div className="cl-hub-grid">
            {CLINICAL_CATEGORIES.map((cat) => (
              <article
                key={cat.id}
                className={`cl-cat${cat.id === 'cases' ? ' cl-cat--cases' : ''}`}
                style={{ ['--cat' as string]: cat.accent }}
              >
                <div className="cl-cat-head">
                  <span className="cl-cat-dot" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={CAT_ICON_SRC[cat.id]} alt="" />
                  </span>
                  <h2 className="cl-cat-title">{cat.title}</h2>
                </div>

                <ul className="cl-cat-list">
                  {cat.items.map((item) => (
                    <li key={item.id} className="cl-cat-item">
                      <Link href={item.href}>
                        <span
                          className={[
                            'cl-cat-thumb',
                            cat.id === 'cases' ? 'cl-cat-thumb--photo' : 'cl-cat-thumb--cutout',
                            item.id === 'restorative-cases' ? 'cl-cat-thumb--smile' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.thumb} alt="" />
                        </span>
                        <span className="cl-cat-copy">
                          <strong>{item.title}</strong>
                          <span>{item.body}</span>
                        </span>
                        <span className="cl-cat-chev" aria-hidden>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {cat.exploreAll ? (
                  <Link className="cl-cat-explore" href={cat.exploreAll.href}>
                    {cat.exploreAll.label}
                  </Link>
                ) : null}

                {cat.footerImg ? (
                  <div className="cl-cat-foot">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.footerImg} alt={cat.footerAlt || ''} />
                  </div>
                ) : (
                  <div className="cl-cat-foot cl-cat-foot--spacer" aria-hidden />
                )}
              </article>
            ))}
          </div>

          <aside className="cl-banner">
            <div className="cl-banner-copy">
              <span className="cl-banner-kicker" aria-hidden>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.2 13.8 9.2 21 11l-7.2 1.8L12 19.8l-1.8-7L3 11l7.2-1.8L12 2.2Z" />
                  <circle cx="18.8" cy="5.6" r="1.15" />
                  <circle cx="5.4" cy="7.8" r=".9" />
                  <circle cx="18.2" cy="17.6" r=".8" />
                </svg>
              </span>
              <h2 className="cl-banner-title">
                <span>{CLINICAL_HUB_BANNER.titleLine1}</span>
                <span>{CLINICAL_HUB_BANNER.titleLine2}</span>
              </h2>
              <p>{CLINICAL_HUB_BANNER.body}</p>
            </div>

            <div className="cl-banner-thumbs">
              {CLINICAL_HUB_BANNER.thumbs.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" />
              ))}
            </div>

            <Link className="cl-banner-cta" href={CLINICAL_HUB_BANNER.cta.href}>
              {CLINICAL_HUB_BANNER.cta.label}
            </Link>
          </aside>

          <ul className="cl-hub-feats">
            {CLINICAL_HUB_FEATURES.map((f) => (
              <li key={f.id} className="cl-hub-feat">
                <span className="cl-hub-feat-ic">{FEAT_ICONS[f.id]}</span>
                <span className="cl-hub-feat-copy">
                  <strong>{f.title}</strong>
                  <span>{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
