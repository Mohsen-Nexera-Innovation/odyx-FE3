import Link from 'next/link';
import type { ReactNode } from 'react';
import CureCases from '@/components/cureLanding/CureCases';
import CureRoiMini from '@/components/cureLanding/CureRoiMini';
import CureVideo from '@/components/cureLanding/CureVideo';
import {
  CURE_UV02_APPS,
  CURE_UV02_CHIPS,
  CURE_UV02_ECOSYSTEM,
  CURE_UV02_HERO,
  CURE_UV02_REVIEWS,
  CURE_UV02_SPECS,
  CURE_UV02_WHY,
  CURE_UV02_WORKFLOW,
} from '@/content/cure-uv02';
import '@/app/odyx-cure-uv02.css';

const chipStroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Icons aligned to product-design-refrences/cure.jpeg (claims-safe chip set) */
const CHIP_ICONS: Record<string, ReactNode> = {
  orbit: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="7" {...chipStroke} />
      <path
        d="M24 8v4M24 36v4M8 24h4M36 24h4M12.5 12.5l2.8 2.8M32.7 32.7l2.8 2.8M35.5 12.5l-2.8 2.8M15.3 32.7l-2.8 2.8"
        {...chipStroke}
      />
    </svg>
  ),
  waves: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        d="M24 10c-2 6-8 9-8 16a8 8 0 0 0 16 0c0-7-6-10-8-16z"
        {...chipStroke}
      />
      <path d="M18 40h12M21 36h6" {...chipStroke} />
    </svg>
  ),
  preset: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect x="12" y="12" width="24" height="24" rx="4" {...chipStroke} />
      <path d="M18 20h12M18 25h12M18 30h8" {...chipStroke} />
    </svg>
  ),
  compat: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="4" {...chipStroke} />
      <circle cx="12" cy="14" r="3.2" {...chipStroke} />
      <circle cx="36" cy="14" r="3.2" {...chipStroke} />
      <circle cx="12" cy="34" r="3.2" {...chipStroke} />
      <circle cx="36" cy="34" r="3.2" {...chipStroke} />
      <path d="M15 16l6 6M33 16l-6 6M15 32l6-6M33 32l-6-6" {...chipStroke} />
    </svg>
  ),
  safe: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M24 8l14 5v10c0 10-6 15.5-14 18-8-2.5-14-8-14-18V13l14-5z" {...chipStroke} />
      <path d="M17 24l5 5 10-10" {...chipStroke} />
    </svg>
  ),
};

const FLOW_ICONS: Record<string, ReactNode> = {
  scan: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M18 12h12l4 8v16H14V20l4-8z" />
      <circle cx="24" cy="28" r="5" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="8" y="10" width="32" height="22" rx="2" />
      <path d="M16 40h16M24 32v8" />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="14" y="8" width="20" height="32" rx="3" />
      <path d="M18 14h12M18 20h12" />
    </svg>
  ),
  wash: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M24 8c6 8 10 12 10 18a10 10 0 1 1-20 0c0-6 4-10 10-18z" />
    </svg>
  ),
  cure: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="12" y="10" width="24" height="28" rx="3" />
      <path d="M18 18h12M18 24h12M18 30h8" />
    </svg>
  ),
  deliver: (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M24 10c-5 6-10 10-10 16a10 10 0 0 0 20 0c0-6-5-10-10-16z" />
    </svg>
  ),
};

function Stars() {
  return (
    <div className="cu2-stars" aria-label="5 out of 5 stars">
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

export default function CuringUv02Page() {
  const hero = CURE_UV02_HERO;

  return (
    <main className="cu2-page" id="top">
      <section className="cu2-hero" aria-label="ODYX Cure UV-02">
        <div className="cu2-wrap cu2-hero-grid">
          <div className="cu2-hero-copy">
            <p className="cu2-eyebrow">{hero.eyebrow}</p>
            <h1 className="cu2-title">{hero.title}</h1>
            <p className="cu2-tagline">{hero.tagline}</p>
            <p className="cu2-body">{hero.body}</p>
            <div className="cu2-hero-ctas">
              <Link className="cu2-btn cu2-btn--primary" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Link>
              <a className="cu2-btn cu2-btn--ghost" href={hero.secondaryCta.href}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 4v12M6 12l6 6 6-6M5 20h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="cu2-hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${hero.img}?v=10`} alt={hero.imgAlt} width={1174} height={1092} fetchPriority="high" />
          </div>
        </div>
        <div className="cu2-wrap">
          <ul className="cu2-chips">
            {CURE_UV02_CHIPS.map((chip) => (
              <li key={chip.id} className="cu2-chip" title={chip.line}>
                <span className="cu2-chip-icon">{CHIP_ICONS[chip.id]}</span>
                <span>{chip.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="cu2-wrap cu2-stack">
        <div className="cu2-row cu2-row--why">
          <div className="cu2-card cu2-why-card reveal">
            <h2 className="cu2-card-title">{CURE_UV02_WHY.title}</h2>
            <div className="cu2-why-grid">
              <ul className="cu2-why-list">
                {CURE_UV02_WHY.points.map((point) => (
                  <li key={point}>
                    <span className="cu2-check" aria-hidden>
                      <svg viewBox="0 0 20 20" width="12" height="12">
                        <path
                          d="M4 10.5l4 4 8-9"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <figure className="cu2-why-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${CURE_UV02_WHY.img}?v=10`} alt={CURE_UV02_WHY.imgAlt} loading="lazy" />
              </figure>
            </div>
          </div>
          <CureVideo />
        </div>

        <div className="cu2-row cu2-row--specs">
          <div className="cu2-card reveal">
            <h2 className="cu2-card-title">Technical Specifications</h2>
            <table className="cu2-spec-table">
              <thead>
                <tr>
                  <th scope="col">Specification</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {CURE_UV02_SPECS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="cu2-card reveal">
            <h2 className="cu2-card-title">What Can You Cure?</h2>
            <ul className="cu2-apps-grid">
              {CURE_UV02_APPS.map((app) => (
                <li key={app.label} className="cu2-app">
                  <div className="cu2-app-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={app.img} alt={app.label} loading="lazy" />
                  </div>
                  <p>{app.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="cu2-row cu2-row--flow">
          <div className="cu2-card reveal">
            <h2 className="cu2-card-title">Digital Workflow</h2>
            <ol className="cu2-flow">
              {CURE_UV02_WORKFLOW.map((step, i) => (
                <li key={step.id} className="cu2-flow-step">
                  <span className="cu2-flow-icon">{FLOW_ICONS[step.id]}</span>
                  <span className="cu2-flow-label">{step.label}</span>
                  {i < CURE_UV02_WORKFLOW.length - 1 ? (
                    <span className="cu2-flow-arrow" aria-hidden>
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
          <CureRoiMini />
        </div>

        <div className="cu2-card cu2-eco-card reveal">
          <h2 className="cu2-card-title">{CURE_UV02_ECOSYSTEM.title}</h2>
          <ul className="cu2-eco">
            {CURE_UV02_ECOSYSTEM.nodes.map((node, i) => (
              <li key={node.name} className="cu2-eco-node">
                <Link href={node.href} className="cu2-eco-link">
                  <span className="cu2-eco-name">{node.name}</span>
                  <span className="cu2-eco-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${node.img}?v=10`} alt="" loading="lazy" />
                  </span>
                </Link>
                {i < CURE_UV02_ECOSYSTEM.nodes.length - 1 ? (
                  <span className="cu2-eco-dots" aria-hidden />
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="cu2-row cu2-row--proof">
          <CureCases />
          <div className="cu2-card cu2-reviews-card reveal">
            <h2 className="cu2-card-title">{CURE_UV02_REVIEWS.title}</h2>
            <ul className="cu2-reviews">
              {CURE_UV02_REVIEWS.items.map((r) => (
                <li key={r.author}>
                  <Stars />
                  <blockquote>“{r.quote}”</blockquote>
                  <cite>{r.author}</cite>
                </li>
              ))}
            </ul>
            <p className="cu2-reviews-footer">{CURE_UV02_REVIEWS.footer}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
