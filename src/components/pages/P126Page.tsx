import Link from 'next/link';
import type { ReactNode } from 'react';
import P126Cases from '@/components/p126/P126Cases';
import P126RoiMini from '@/components/p126/P126RoiMini';
import P126Video from '@/components/p126/P126Video';
import {
  P1_26_ECOSYSTEM,
  P1_26_FEATURE_CHIPS,
  P1_26_HERO,
  P1_26_PRINT_APPS,
  P1_26_REVIEWS,
  P1_26_SPECS,
  P1_26_WHY,
  P1_26_WORKFLOW,
} from '@/content/p1-26';
import '@/app/odyx-p126.css';

const chipStroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Feature-chip icons — bold line art matched to printer-odyx-p1-26.jpeg */
const CHIP_ICONS: Record<string, ReactNode> = {
  lcd: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect x="6" y="6" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="27" y="6" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="6" y="27" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="27" y="27" width="15" height="15" rx="2.2" {...chipStroke} />
    </svg>
  ),
  volume: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M8 30V15l16-9 16 9v15l-16 9-16-9z" {...chipStroke} />
      <path d="M8 15l16 9 16-9M24 24v15" {...chipStroke} />
      <path d="M30 19.5l5 2.8M30 25l5 2.8" {...chipStroke} strokeWidth={2.3} />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M8 31a16 16 0 0 1 32 0" {...chipStroke} />
      <path d="M13 31h3.5M18.8 18.5l1.8 2.8M24 15v3.5M29.2 18.5l-1.8 2.8M35 31h-3.5" {...chipStroke} strokeWidth={2.3} />
      <path d="M24 31l11-10" {...chipStroke} />
      <circle cx="24" cy="31" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M10 15l14-7 14 7-14 7-14-7z" {...chipStroke} />
      <path d="M10 22l14 7 14-7" {...chipStroke} />
      <path d="M10 29l14 7 14-7" {...chipStroke} />
      <path d="M10 15v7M38 15v7M10 22v7M38 22v7" {...chipStroke} strokeWidth={2.3} />
    </svg>
  ),
  acf: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M13 10h16l7 7v21a2.2 2.2 0 0 1-2.2 2.2H13A2.2 2.2 0 0 1 10.8 38V12.2A2.2 2.2 0 0 1 13 10z" {...chipStroke} />
      <path d="M29 10v7h7" {...chipStroke} />
      <path d="M17 8h14l6 6" {...chipStroke} opacity={0.9} />
      <path d="M36 14l4-1.2M38 17.5l2.8 2.8" {...chipStroke} strokeWidth={2.2} />
    </svg>
  ),
};

/** Exact icons cropped from printer-odyx-p1-26.jpeg — do not replace with SVGs */
const FLOW_ICONS: Record<string, string> = {
  scan: '/img/workflow/flow/scan.png',
  design: '/img/workflow/flow/design.png',
  print: '/img/workflow/flow/print.png',
  cure: '/img/workflow/flow/cure.png',
  deliver: '/img/workflow/flow/deliver.png',
};

const FLOW_CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Stars() {
  return (
    <div className="p126-stars" aria-label="5 out of 5 stars">
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

export default function P126Page() {
  const hero = P1_26_HERO;

  return (
    <main className="p126-page" id="top">
      {/* Hero — fidelity to printer-odyx-p1-26.jpeg */}
      <section
        className="p126-hero"
        data-hero-light
        aria-label="ODYX P1-26"
        style={{ ['--p126-hero-bg' as string]: `url('${hero.bg}?v=12')` }}
      >
        <div className="p126-hero-bg" aria-hidden />
        <div className="p126-wrap p126-wrap--hero p126-hero-grid">
          <div className="p126-hero-left">
            <div className="p126-hero-copy">
              <p className="p126-eyebrow">{hero.eyebrow}</p>
              <h1 className="p126-title">{hero.title}</h1>
              <p className="p126-body">{hero.body}</p>
              <div className="p126-hero-ctas">
                <Link className="p126-btn p126-btn--primary" href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </Link>
                <a className="p126-btn p126-btn--ghost" href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M12 3v12M7 11l5 5 5-5M5 20h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <ul className="p126-chips">
              {P1_26_FEATURE_CHIPS.map((chip) => (
                <li key={chip.id} className="p126-chip">
                  <span className="p126-chip-icon">{CHIP_ICONS[chip.id]}</span>
                  <span className="p126-chip-label">
                    {chip.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p126-hero-media" aria-label={hero.imgAlt}>
            {/* Soft ground contact shadow under current printer packshot */}
            <span className="p126-hero-ground-shadow" aria-hidden />
            {/* Angled print outputs behind; white packshot in front */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer p126-layer--output-bridge"
              src={`${hero.outputBridgeImg}?v=46`}
              alt=""
              width={885}
              height={595}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer p126-layer--output-arch"
              src={`${hero.outputArchImg}?v=46`}
              alt=""
              width={895}
              height={698}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer p126-layer--printer"
              src={`${hero.printerImg}?v=21`}
              alt=""
              width={661}
              height={1170}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className="p126-wrap p126-wrap--body p126-stack">
        {/* Why + Video */}
        <div className="p126-row p126-row--why">
          <div className="p126-card p126-why-card reveal">
            <h2 className="p126-card-title">{P1_26_WHY.title}</h2>
            <div className="p126-why-grid">
              <ul className="p126-why-list">
                {P1_26_WHY.points.map((point) => (
                  <li key={point}>
                    <span className="p126-check" aria-hidden>
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
              <figure className="p126-why-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${P1_26_WHY.img}?v=29`} alt={P1_26_WHY.imgAlt} loading="lazy" />
              </figure>
            </div>
          </div>
          <P126Video />
        </div>

        {/* Specs + Apps */}
        <div className="p126-row p126-row--specs">
          <div className="p126-card p126-specs-card reveal">
            <h2 className="p126-card-title">Technical Specifications</h2>
            <ul className="p126-specs">
              {P1_26_SPECS.map((row) => (
                <li key={row.label} className="p126-spec-row">
                  <span className="p126-spec-label">{row.label}</span>
                  <span className="p126-spec-value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p126-card p126-apps-card reveal">
            <h2 className="p126-card-title">What Can You Print?</h2>
            <ul className="p126-apps-grid">
              {P1_26_PRINT_APPS.map((app) => (
                <li key={app.label} className="p126-app">
                  <div className="p126-app-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${app.img}?v=32`} alt={app.alt} loading="lazy" />
                  </div>
                  <p>{app.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workflow + ROI */}
        <div className="p126-row p126-row--flow">
          <div className="p126-card p126-flow-card reveal">
            <h2 className="p126-card-title">Digital Workflow</h2>
            <ol className="p126-flow">
              {P1_26_WORKFLOW.map((step, i) => {
                const body = (
                  <>
                    <span className="p126-flow-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${FLOW_ICONS[step.id]}?v=42`} alt="" loading="lazy" />
                    </span>
                    <span className="p126-flow-label">
                      <strong>{step.bold}</strong>
                      {step.rest}
                    </span>
                  </>
                );
                return (
                  <li
                    key={step.id}
                    className={`p126-flow-step${step.id === 'print' ? ' is-current' : ''}${step.dimmed ? ' is-dimmed' : ''}`}
                  >
                    {step.dimmed ? (
                      <span className="p126-flow-link is-dimmed" aria-disabled="true" title="Coming soon">
                        {body}
                      </span>
                    ) : (
                      <Link href={step.href} className="p126-flow-link">
                        {body}
                      </Link>
                    )}
                    {i < P1_26_WORKFLOW.length - 1 ? (
                      <span className="p126-flow-arrow" aria-hidden>
                        {FLOW_CHEVRON}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
          <P126RoiMini />
        </div>

        {/* Ecosystem */}
        <div className="p126-card p126-eco-card reveal">
          <h2 className="p126-card-title">{P1_26_ECOSYSTEM.title}</h2>
          <ul className="p126-eco">
            {P1_26_ECOSYSTEM.nodes.map((node, i) => (
              <li key={node.name} className="p126-eco-node">
                <Link href={node.href} className="p126-eco-link">
                  <span className="p126-eco-label">
                    <span className="p126-eco-name">{node.name}</span>
                    {node.subtitle ? <span className="p126-eco-sub">{node.subtitle}</span> : null}
                  </span>
                  <span className="p126-eco-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${node.img}?v=43`} alt="" loading="lazy" />
                  </span>
                </Link>
                {i < P1_26_ECOSYSTEM.nodes.length - 1 ? (
                  <span className="p126-eco-dots" aria-hidden />
                ) : null}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Cases + Reviews — full-width rail (matches hero), 20% wider than mid body */}
      <div className="p126-wrap p126-wrap--last">
        <div className="p126-row p126-row--proof">
          <P126Cases />
          <div className="p126-card p126-reviews-card reveal">
            <h2 className="p126-card-title">{P1_26_REVIEWS.title}</h2>
            <ul className="p126-reviews">
              {P1_26_REVIEWS.items.map((r) => (
                <li key={r.author}>
                  <Stars />
                  <blockquote>“{r.quote}”</blockquote>
                  <cite>- {r.author}</cite>
                </li>
              ))}
            </ul>
            <p className="p126-reviews-footer">{P1_26_REVIEWS.footer}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
