'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CURE_UV02_CASE_TABS } from '@/content/cure-uv02';

type CaseTabId = (typeof CURE_UV02_CASE_TABS)[number]['id'];

export default function CureCases() {
  const [active, setActive] = useState<CaseTabId>(CURE_UV02_CASE_TABS[0].id);
  const tab = CURE_UV02_CASE_TABS.find((t) => t.id === active) ?? CURE_UV02_CASE_TABS[0];

  return (
    <div className="cu2-card cu2-cases-card reveal">
      <h2 className="cu2-card-title">Clinical Cases</h2>
      <div className="cu2-case-tabs" role="tablist" aria-label="Case indication">
        {CURE_UV02_CASE_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === active}
            className={`cu2-case-tab${t.id === active ? ' is-active' : ''}`}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="cu2-case-steps" key={tab.id} role="tabpanel">
        {tab.steps.map((step, i) => (
          <div key={step.label} className="cu2-case-step">
            <figure className="cu2-case-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={step.img} alt={step.alt} loading="lazy" />
            </figure>
            <p>{step.label}</p>
            {i < tab.steps.length - 1 ? (
              <span className="cu2-case-arrow" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
      <Link href="/learning" className="cu2-btn cu2-btn--primary cu2-cases-cta">
        View More Cases
      </Link>
    </div>
  );
}
