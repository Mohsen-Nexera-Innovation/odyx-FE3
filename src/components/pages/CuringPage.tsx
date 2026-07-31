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
import '@/app/odyx-p126.css';
import '@/app/odyx-cure.css';

const chipStroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Feature-chip icons — motifs from product-design-refrences/cure.jpeg */
const CHIP_ICONS: Record<string, ReactNode> = {
  /* Sun: solid-ish disc + 8 short equal rays */
  orbit: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="8" {...chipStroke} />
      <path
        d="M24 6.5v5M24 36.5v5M6.5 24h5M36.5 24h5M12.2 12.2l3.5 3.5M32.3 32.3l3.5 3.5M35.8 12.2l-3.5 3.5M15.7 32.3l-3.5 3.5"
        {...chipStroke}
        strokeWidth={2.4}
      />
    </svg>
  ),
  /* Lightbulb + glow rays on top + screw base (cure.jpeg) */
  waves: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M24 3.5v3.2M17.2 6.2l1.8 2.6M30.8 6.2l-1.8 2.6" {...chipStroke} strokeWidth={2.2} />
      <path
        d="M24 9.5c-5.4 0-9.6 4-9.6 9 0 3.3 1.7 5.7 4 7.5.7.6 1.2 1.4 1.2 2.3V31h8.8v-2.7c0-.9.5-1.7 1.2-2.3 2.3-1.8 4-4.2 4-7.5 0-5-4.2-9-9.6-9z"
        {...chipStroke}
      />
      <path d="M20 34h8M21 37h6M22 40h4" {...chipStroke} strokeWidth={2.2} />
    </svg>
  ),
  /* Three wavy heat lines rising from a base bar */
  heat: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M16 31c2.4-3.5 2.4-7 0-10.5 2.4-3.5 2.4-7 0-10.5" {...chipStroke} />
      <path d="M24 33c2.4-3.8 2.4-7.6 0-11.4 2.4-3.8 2.4-7.6 0-11.4" {...chipStroke} />
      <path d="M32 31c2.4-3.5 2.4-7 0-10.5 2.4-3.5 2.4-7 0-10.5" {...chipStroke} />
      <path d="M12 36.5h24" {...chipStroke} strokeWidth={3} />
    </svg>
  ),
  /* Three nodes in a triangle network */
  compat: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="11.5" r="3.6" {...chipStroke} />
      <circle cx="11.5" cy="35" r="3.6" {...chipStroke} />
      <circle cx="36.5" cy="35" r="3.6" {...chipStroke} />
      <path d="M21.4 14.4L14.4 31.6M26.6 14.4l7 17.2M15.2 35h17.6" {...chipStroke} strokeWidth={2.3} />
    </svg>
  ),
  /* Shield + check */
  safe: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        d="M24 6.5l13.5 4.8v11.2c0 9.4-5.5 15.2-13.5 18-8-2.8-13.5-8.6-13.5-18V11.3L24 6.5z"
        {...chipStroke}
      />
      <path d="M17.2 24.2l4.4 4.4L31.5 18" {...chipStroke} strokeWidth={2.8} />
    </svg>
  ),
};

/** Digital Workflow icons — 5 steps (no wash) */
const FLOW_ICONS: Record<string, string> = {
  scan: '/img/cure-uv02/flow/scan.png',
  design: '/img/cure-uv02/flow/design.png',
  print: '/img/cure-uv02/flow/print.png',
  cure: '/img/cure-uv02/flow/cure.png',
  deliver: '/img/cure-uv02/flow/deliver.png',
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

/** Single curing landing — P1-26 layout system + cure.jpeg content */
export default function CuringPage() {
  const hero = CURE_UV02_HERO;

  return (
    <main className="p126-page cure-page" id="top">
      <section className="p126-hero" data-hero-light aria-label="ODYX Cure UV-02">
        <div className="p126-hero-bg" aria-hidden />
        <div className="p126-wrap p126-hero-grid">
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
              {CURE_UV02_CHIPS.map((chip) => (
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

          <div className="p126-hero-media cure-hero-media" aria-label={hero.imgAlt}>
            <span className="p126-hero-ground-shadow" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer cure-layer cure-layer--arch"
              src={`${hero.outputArchImg}?v=${hero.imgVersion}`}
              alt=""
              width={953}
              height={759}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer cure-layer cure-layer--aligner"
              src={`${hero.outputAlignerImg}?v=${hero.imgVersion}`}
              alt=""
              width={898}
              height={464}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-layer cure-layer cure-layer--machine"
              src={`${hero.machineImg}?v=${hero.imgVersion}`}
              alt=""
              width={1309}
              height={1020}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className="p126-wrap p126-stack">
        <div className="p126-row p126-row--why">
          <div className="p126-card p126-why-card reveal">
            <h2 className="p126-card-title">{CURE_UV02_WHY.title}</h2>
            <div className="p126-why-grid">
              <ul className="p126-why-list">
                {CURE_UV02_WHY.points.map((point) => (
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
                <img
                  src={`${CURE_UV02_WHY.img}?v=${CURE_UV02_WHY.imgVersion ?? 14}`}
                  alt={CURE_UV02_WHY.imgAlt}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
          <CureVideo />
        </div>

        <div className="p126-row p126-row--specs">
          <div className="p126-card p126-specs-card reveal">
            <h2 className="p126-card-title">Technical Specifications</h2>
            <ul className="p126-specs">
              {CURE_UV02_SPECS.map((row) => (
                <li key={row.label} className="p126-spec-row">
                  <span className="p126-spec-label">{row.label}</span>
                  <span className="p126-spec-value">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p126-card p126-apps-card reveal">
            <h2 className="p126-card-title">What Can You Cure?</h2>
            <ul className="p126-apps-grid">
              {CURE_UV02_APPS.map((app) => (
                <li key={app.label} className="p126-app">
                  <div className="p126-app-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${app.img}?v=cut1`} alt={app.alt} loading="lazy" />
                  </div>
                  <p>{app.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p126-row p126-row--flow">
          <div className="p126-card p126-flow-card reveal in">
            <h2 className="p126-card-title">Digital Workflow</h2>
            <ol className="p126-flow">
              {CURE_UV02_WORKFLOW.map((step, i) => {
                const body = (
                  <>
                    <span className="p126-flow-icon">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`${FLOW_ICONS[step.id]}?v=4`} alt="" loading="lazy" />
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
                    className={`p126-flow-step${step.id === 'cure' ? ' is-current' : ''}${step.dimmed ? ' is-dimmed' : ''}`}
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
                    {i < CURE_UV02_WORKFLOW.length - 1 ? (
                      <span className="p126-flow-arrow" aria-hidden>
                        {FLOW_CHEVRON}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
          <CureRoiMini />
        </div>

        <div className="p126-card p126-eco-card reveal">
          <h2 className="p126-card-title">{CURE_UV02_ECOSYSTEM.title}</h2>
          <ul className="p126-eco">
            {CURE_UV02_ECOSYSTEM.nodes.map((node, i) => (
              <li key={node.name} className="p126-eco-node">
                <Link href={node.href} className="p126-eco-link">
                  <span className="p126-eco-label">
                    <span className="p126-eco-name">{node.name}</span>
                    {node.subtitle ? <span className="p126-eco-sub">{node.subtitle}</span> : null}
                  </span>
                  <span className="p126-eco-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${node.img}?v=14`} alt="" loading="lazy" />
                  </span>
                </Link>
                {i < CURE_UV02_ECOSYSTEM.nodes.length - 1 ? (
                  <span className="p126-eco-dots" aria-hidden />
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div className="p126-row p126-row--proof">
          <CureCases />
          <div className="p126-card p126-reviews-card reveal">
            <h2 className="p126-card-title">{CURE_UV02_REVIEWS.title}</h2>
            <ul className="p126-reviews">
              {CURE_UV02_REVIEWS.items.map((r) => (
                <li key={r.author}>
                  <Stars />
                  <blockquote>“{r.quote}”</blockquote>
                  <cite>- {r.author}</cite>
                </li>
              ))}
            </ul>
            <p className="p126-reviews-footer">{CURE_UV02_REVIEWS.footer}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
