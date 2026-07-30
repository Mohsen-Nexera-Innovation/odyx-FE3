'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { CURE_UV02_CASE_TABS } from '@/content/cure-uv02';

type CaseTabId = (typeof CURE_UV02_CASE_TABS)[number]['id'];

const CASE_CHEVRON = (
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

export default function CureCases() {
  const [active, setActive] = useState<CaseTabId>(CURE_UV02_CASE_TABS[0].id);
  const tab = CURE_UV02_CASE_TABS.find((t) => t.id === active) ?? CURE_UV02_CASE_TABS[0];

  return (
    <div className="p126-card p126-cases-card reveal">
      <h2 className="p126-card-title">Clinical Cases</h2>
      <div className="p126-case-tabs" role="tablist" aria-label="Case indication">
        {CURE_UV02_CASE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            className={`p126-case-tab${t.id === active ? ' is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p126-case-steps" key={tab.id} role="tabpanel">
        {tab.steps.map((step, i) => (
          <Fragment key={step.label}>
            <div className="p126-case-step">
              <figure className="p126-case-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={step.img} alt={step.alt} loading="lazy" />
              </figure>
              <p>{step.label}</p>
            </div>
            {i < tab.steps.length - 1 ? (
              <span className="p126-case-arrow" aria-hidden>
                {CASE_CHEVRON}
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
      <Link href="/learning" className="p126-btn p126-btn--primary p126-cases-cta">
        View More Cases
      </Link>
    </div>
  );
}
