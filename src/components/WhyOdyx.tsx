'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SecHead from '@/components/SecHead';

type Accent = 'teal' | 'orange';

interface Reason {
  n: string;
  title: string;
  desc: string;
  count: string;
  suf: string;
  lbl: string;
  img: string;
  accent: Accent;
  highlights: string[];
}

const SWAP_MS = 320;

const REASONS: Reason[] = [
  {
    n: 'REASON 01',
    title: 'Precision',
    desc: 'Accurate scans and prints that fit the first time — less chair time, fewer remakes.',
    count: '99',
    suf: '%',
    lbl: 'First-fit accuracy',
    img: '/img/why/why-precision.png',
    accent: 'teal',
    highlights: ['Sub-millimeter fit', 'Fewer remakes', 'Same-day delivery'],
  },
  {
    n: 'REASON 02',
    title: 'Integrated workflow',
    desc: 'Every device connects, so data flows scan-to-delivery with no compatibility guesswork.',
    count: '6',
    suf: '',
    lbl: 'Connected steps',
    img: '/img/why/why-integrated.png',
    accent: 'orange',
    highlights: ['Scan to smile', 'No data silos', 'One ecosystem'],
  },
  {
    n: 'REASON 03',
    title: 'Training & support',
    desc: 'An academy and a team that grow with your practice, from first scan to advanced cases.',
    count: '24',
    suf: '/7',
    lbl: 'Support access',
    img: '/img/why/why-training.png',
    accent: 'teal',
    highlights: ['ODYX Academy', 'Live expert help', 'Guided onboarding'],
  },
  {
    n: 'REASON 04',
    title: 'Clinical confidence',
    desc: 'Proven materials and validated curing for safe, durable, biocompatible results.',
    count: '5',
    suf: '',
    lbl: 'Clinical resin lines',
    img: '/img/why/why-clinical.png',
    accent: 'orange',
    highlights: ['Biocompatible', 'Validated curing', 'Clinical materials'],
  },
];

const Placeholder = ({ label }: { label: string }) => (
  <div className="why-ph">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M3 17l5-4 4 3 5-5 4 4" />
    </svg>
    <small>{label}</small>
  </div>
);

export default function WhyOdyx() {
  const [active, setActive] = useState(0);
  const [displayIdx, setDisplayIdx] = useState(0);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [reduced, setReduced] = useState(false);
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const display = REASONS[displayIdx];

  const selectReason = useCallback((i: number) => {
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
    REASONS.forEach((r) => {
      const probe = new Image();
      probe.onload = () => setLoaded((prev) => ({ ...prev, [r.img]: true }));
      probe.src = r.img;
    });
  }, []);

  useEffect(() => {
    const el = document.querySelector('.why-num');
    if (!el || reduced) {
      if (el) el.textContent = display.count;
      return;
    }

    const end = parseFloat(display.count);
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
      el.textContent = String(Math.floor(cur));
    }, 32);
    return () => clearInterval(iv);
  }, [displayIdx, phase, reduced, display.count]);

  return (
    <section className="sec sec-orange sec-motion" id="why">
      <div className="wrap">
        <SecHead
          eyebrow="Why ODYX"
          action={
            <a className="btn btn-ghost btn-sm" href="/workflows">
              Explore the workflow →
            </a>
          }
        />

        <div className="why-wrap m-up">
          <div className="why-rail" role="tablist" aria-label="Why choose ODYX">
            {REASONS.map((r, i) => (
              <button
                key={r.n}
                type="button"
                role="tab"
                className={`why-tab${active === i ? ' on' : ''}`}
                data-accent={r.accent}
                aria-selected={active === i}
                onClick={() => selectReason(i)}
                onMouseEnter={() => { if (!reduced) selectReason(i); }}
              >
                <span className="why-tab-no">{String(i + 1).padStart(2, '0')}</span>
                <span className="why-tab-copy">
                  <span className="why-tab-title">{r.title}</span>
                  <span className="why-tab-metric">
                    {r.count}{r.suf}
                    <small>{r.lbl}</small>
                  </span>
                </span>
                {active === i && <span className="why-tab-bar" aria-hidden />}
              </button>
            ))}
          </div>

          <div
            className={`why-stage why-stage--${phase}${reduced ? ' why-stage--reduced' : ''}`}
            data-accent={display.accent}
          >
            <div className="why-backdrop" aria-hidden>
              {REASONS.map((r, i) => (
                <div
                  key={r.n}
                  className={`why-bg${displayIdx === i ? ' on' : ''}${loaded[r.img] ? ' loaded' : ''}`}
                  style={loaded[r.img] ? { backgroundImage: `url(${r.img})` } : undefined}
                >
                  {!loaded[r.img] && <Placeholder label={r.title} />}
                </div>
              ))}
              <span className="why-scrim" />
              <span className="why-watermark" aria-hidden>
                {String(displayIdx + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="why-panel">
              <div className="why-glass-stat">
                <span className="why-stat-val">
                  <span className="why-num">{display.count}</span>
                  {display.suf && <span className="why-suf">{display.suf}</span>}
                </span>
                <span className="why-stat-lbl">{display.lbl}</span>
              </div>

              <div className={`why-copy why-copy--${phase}`}>
                <span className="why-kicker">{display.n}</span>
                <h3>{display.title}</h3>
                <p>{display.desc}</p>
                <ul className="why-highlights">
                  {display.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
