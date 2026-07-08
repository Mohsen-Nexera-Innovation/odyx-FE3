'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

interface CaseItem {
  badge: string;
  t: string;
  d: string;
  img: string;
  metricNum: string;
  metricSuf: string;
  metricLbl: string;
  steps: string[];
  outcomes: string[];
}

const CASES: CaseItem[] = [
  {
    badge: 'Crown & Bridge',
    t: 'Same-day full-contour crown',
    d: 'Scan, design and print a natural-looking crown in a single visit — no lab wait, no second appointment.',
    img: '/img/crowns.jpg',
    metricNum: '1',
    metricSuf: ' visit',
    metricLbl: 'Scan to seat',
    steps: ['Intraoral scan', 'CAD design', 'Print & cure', 'Chairside delivery'],
    outcomes: ['Natural esthetics', 'Single appointment', 'Validated resin'],
  },
  {
    badge: 'Surgical Guide',
    t: 'Guided implant placement',
    d: 'A printed surgical guide for confident, accurate positioning — designed from scan data and ready same day.',
    img: '/img/implant.jpg',
    metricNum: '0.1',
    metricSuf: ' mm',
    metricLbl: 'Positional accuracy',
    steps: ['CBCT + scan merge', 'Guide design', 'Resin print', 'Sterilize & place'],
    outcomes: ['Stackable options', 'Sub-mm fit', 'Confident placement'],
  },
  {
    badge: 'Prosthetics',
    t: 'Digital denture, delivered',
    d: 'A complete denture workflow with a natural, lifelike finish — fewer steps, predictable outcomes.',
    img: '/img/denture.jpg',
    metricNum: '3',
    metricSuf: ' steps',
    metricLbl: 'Streamlined workflow',
    steps: ['Digital impression', 'Try-in print', 'Final denture'],
    outcomes: ['Lifelike finish', 'Fewer remakes', 'Happy patients'],
  },
];

const SWAP_MS = 320;

const Arrow = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Placeholder = ({ label }: { label: string }) => (
  <div className="cs-ph">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M3 17l5-4 4 3 5-5 4 4" />
    </svg>
    <small>{label}</small>
  </div>
);

export default function CaseSpotlight() {
  const [active, setActive] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const display = CASES[displayIdx];

  const selectCase = useCallback((i: number) => {
    if (i === active) return;
    setActive(i);

    if (reduced) {
      setDisplayIdx(i);
      setPhase('in');
      return;
    }

    setPhase('out');
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      setDisplayIdx(i);
      setPhase('in');
    }, SWAP_MS);
  }, [active, reduced]);

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useEffect(() => () => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
  }, []);

  useEffect(() => {
    CASES.forEach((c) => {
      const probe = new Image();
      probe.onload = () => setLoaded((prev) => ({ ...prev, [c.img]: true }));
      probe.src = c.img;
    });
  }, []);

  useEffect(() => {
    const c = CASES[displayIdx];
    const el = document.querySelector('.cs-metric-num');
    if (!el || reduced) {
      if (el) el.textContent = c.metricNum;
      return;
    }

    const end = parseFloat(c.metricNum);
    const decimals = c.metricNum.includes('.') ? 1 : 0;
    const steps = 34;
    const inc = end / steps;
    let cur = 0;
    el.textContent = '0';
    const iv = setInterval(() => {
      cur += inc;
      if (cur >= end) {
        cur = end;
        clearInterval(iv);
      }
      el.textContent = decimals ? cur.toFixed(decimals) : String(Math.floor(cur));
    }, 32);
    return () => clearInterval(iv);
  }, [displayIdx, phase, reduced]);

  return (
    <div className="cs-wrap m-up">
      <div className={`cs-hero cs-hero--${phase}${reduced ? ' cs-hero--reduced' : ''}`}>
        <div className="cs-backdrop" aria-hidden>
          {CASES.map((c, i) => (
            <div
              key={c.t}
              className={`cs-bg${displayIdx === i ? ' on' : ''}${loaded[c.img] ? ' loaded' : ''}`}
              style={loaded[c.img] ? { backgroundImage: `url(${c.img})` } : undefined}
            >
              {!loaded[c.img] && <Placeholder label={c.t} />}
            </div>
          ))}
          <span className="cs-scrim" />
        </div>

        <div className="cs-hero-inner">
          <div className="cs-copy">
            <span className="cs-badge">{display.badge}</span>
            <h3>{display.t}</h3>
            <p>{display.d}</p>

            <div className="cs-steps" aria-label="Workflow steps">
              {display.steps.map((step, i) => (
                <span key={step} className="cs-step" style={{ '--cs-i': i } as React.CSSProperties}>
                  {i > 0 && <span className="cs-step-arrow" aria-hidden>→</span>}
                  {step}
                </span>
              ))}
            </div>

            <ul className="cs-outcomes">
              {display.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>

            <div className="cs-foot">
              <div className="cs-metric">
                <span className="cs-metric-val">
                  <span className="cs-metric-num">{display.metricNum}</span>
                  {display.metricSuf && <span className="cs-metric-suf">{display.metricSuf}</span>}
                </span>
                <span className="cs-metric-lbl">{display.metricLbl}</span>
              </div>
              <Link className="btn cs-cta" href="/learning">
                View full case <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="cs-filmstrip" role="tablist" aria-label="Select a case study">
        {CASES.map((c, i) => (
          <button
            key={c.t}
            type="button"
            role="tab"
            className={`cs-thumb${active === i ? ' on' : ''}`}
            aria-selected={active === i}
            onClick={() => selectCase(i)}
            onMouseEnter={() => { if (!reduced) selectCase(i); }}
          >
            <span className="cs-thumb-media">
              {loaded[c.img] ? (
                <img src={c.img} alt="" loading="lazy" />
              ) : (
                <Placeholder label={c.badge} />
              )}
              <span className="cs-thumb-scrim" />
            </span>
            <span className="cs-thumb-body">
              <span className="cs-thumb-badge">{c.badge}</span>
              <span className="cs-thumb-title">{c.t}</span>
              <span className="cs-thumb-metric">
                {c.metricNum}{c.metricSuf}
                <small>{c.metricLbl}</small>
              </span>
            </span>
            {active === i && <span className="cs-thumb-bar" aria-hidden />}
          </button>
        ))}
      </div>
    </div>
  );
}
