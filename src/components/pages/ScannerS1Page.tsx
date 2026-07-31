import Link from 'next/link';
import S1Video from '@/components/scannerLanding/S1Video';
import { APP_ICONS, CheckIcon, WHY_ICONS } from '@/components/scannerLanding/S1Icons';
import {
  S1_AI_FEATURES,
  S1_APPLICATIONS,
  S1_CASES,
  S1_COMPATIBLE,
  S1_LANDING_HERO,
  S1_REVIEW,
  S1_TECH_FEATURES,
  S1_WHY,
} from '@/content/scanner-landing';
import '@/app/odyx-s1-landing.css';

function Stars() {
  return (
    <div className="s1l-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" aria-hidden>
          <path
            fill="currentColor"
            d="M10 1.8l2.4 5 5.5.5-4.2 3.6 1.3 5.3L10 13.6l-4.9 2.6 1.3-5.3L2.1 7.3l5.5-.5L10 1.8z"
          />
        </svg>
      ))}
    </div>
  );
}

function SectionRule({ children }: { children: React.ReactNode }) {
  return (
    <div className="s1l-rule">
      <span className="s1l-rule-line" aria-hidden />
      <h2 className="s1l-rule-title">{children}</h2>
      <span className="s1l-rule-line" aria-hidden />
    </div>
  );
}

export default function ScannerS1Page() {
  const hero = S1_LANDING_HERO;

  return (
    <main className="s1l-page" id="top">
      {/* Hero uses wider rail than body sections (mock) */}
      <section className="s1l-hero" data-hero-light aria-label="ODYX-S1 Intraoral Scanner">
        <div className="s1l-wrap s1l-wrap--hero s1l-hero-grid">
          <div className="s1l-hero-copy">
            <h1 className="s1l-title">{hero.title}</h1>
            <p className="s1l-subtitle">{hero.subtitle}</p>
            <p className="s1l-tagline">{hero.tagline}</p>
            <p className="s1l-body">{hero.body}</p>
            <div className="s1l-hero-ctas">
              <Link className="s1l-btn s1l-btn--primary" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
              <a className="s1l-btn s1l-btn--ghost" href={hero.secondaryCta.href}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 4v12M6 12l6 6 6-6M5 20h14"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="s1l-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${hero.img}?v=waves4`}
              alt={hero.imgAlt}
              width={1200}
              height={800}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="s1l-sec">
        <div className="s1l-wrap s1l-wrap--body">
          <SectionRule>Why S1?</SectionRule>
          <ul className="s1l-why-grid">
            {S1_WHY.map((item) => (
              <li key={item.id} className="s1l-why-card reveal">
                <span className="s1l-why-icon">{WHY_ICONS[item.id]}</span>
                <span className="s1l-why-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s1l-sec">
        <div className="s1l-wrap s1l-wrap--body">
          <div className="s1l-row s1l-row--apps">
            <div className="s1l-card s1l-card--apps reveal">
              <h2 className="s1l-card-title s1l-card-title--accent">Applications</h2>
              <ul className="s1l-apps">
                {S1_APPLICATIONS.map((app) => (
                  <li key={app.id} className="s1l-app">
                    <span className="s1l-app-icon">{APP_ICONS[app.id]}</span>
                    <div className="s1l-app-copy">
                      <span className="s1l-app-label">{app.label}</span>
                      <span className="s1l-app-badge">{app.badge}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <S1Video />
          </div>
        </div>
      </section>

      {/* One shared features shell: AI list + Technical 2-col checklist (mock) */}
      <section className="s1l-sec">
        <div className="s1l-wrap s1l-wrap--body">
          <div className="s1l-card s1l-feat-shell reveal">
            <div className="s1l-feat-grid">
              <div className="s1l-feat-col">
                <h2 className="s1l-card-title s1l-card-title--accent">AI-Powered Features</h2>
                <ul className="s1l-check-list">
                  {S1_AI_FEATURES.map((f) => (
                    <li key={f}>
                      <span className="s1l-check" aria-hidden>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="s1l-feat-col">
                <h2 className="s1l-card-title s1l-card-title--accent">Technical Features</h2>
                <ul className="s1l-tech-grid">
                  {S1_TECH_FEATURES.map((f) => (
                    <li key={f.label}>
                      <span className="s1l-check" aria-hidden>
                        <CheckIcon />
                      </span>
                      <span className="s1l-tech-text">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s1l-sec">
        <div className="s1l-wrap s1l-wrap--body">
          <SectionRule>Compatible Products</SectionRule>
          <ul className="s1l-compat">
            {S1_COMPATIBLE.map((p) => (
              <li key={p.name} className="s1l-compat-card reveal">
                <Link href={p.href} className="s1l-compat-link">
                  <span className="s1l-compat-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${p.img}?v=cut2`} alt="" loading="lazy" />
                  </span>
                  <span className="s1l-compat-copy">
                    <p className="s1l-compat-name">{p.name}</p>
                    {p.category ? <p className="s1l-compat-cat">{p.category}</p> : null}
                    <span className="s1l-compat-more">Learn more &gt;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="s1l-sec s1l-sec--last">
        <div className="s1l-wrap s1l-wrap--cases">
          <SectionRule>Clinical Cases &amp; Reviews</SectionRule>
          <ul className="s1l-cases">
            {S1_CASES.map((c) => (
              <li key={c.title} className="s1l-case-card reveal">
                <figure>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.img} alt={c.title} loading="lazy" />
                </figure>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <cite>— {c.author}</cite>
                <Stars />
              </li>
            ))}
            <li className="s1l-case-card s1l-case-card--quote reveal">
              <span className="s1l-quote-mark" aria-hidden>
                “
              </span>
              <blockquote>{S1_REVIEW.quote}</blockquote>
              <cite>— {S1_REVIEW.author}</cite>
              <Stars />
            </li>
          </ul>
          <div className="s1l-cases-cta">
            <Link className="s1l-btn s1l-btn--primary" href="/learning">
              View More Cases
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
