'use client';

import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type TabId = 'guides' | 'courses' | 'webinars' | 'academy';

interface LearnTab {
  id: TabId;
  label: string;
  t: string;
  d: string;
  meta: string;
  featured: string;
  items: string[];
  href: string;
}

const TABS: LearnTab[] = [
  {
    id: 'guides',
    label: 'Guides',
    t: 'Beginner guides',
    d: 'Step-by-step onboarding to go fully digital with confidence.',
    meta: '20+ guides',
    featured: 'From your first scan to a finished crown — every step documented.',
    items: ['Scanner setup & calibration', 'Chairside design basics', 'Resin selection guide', 'Same-day workflow checklist'],
    href: '/learning#beginner',
  },
  {
    id: 'courses',
    label: 'Courses',
    t: 'Clinical courses',
    d: 'Structured modules from the first scan to final delivery.',
    meta: '12 courses',
    featured: 'Progressive learning paths for dentists and lab technicians.',
    items: ['Digital restorative fundamentals', 'Implant guide design', 'Denture digital workflow', 'Advanced CAD techniques'],
    href: '/learning#courses',
  },
  {
    id: 'webinars',
    label: 'Webinars',
    t: 'Webinars & events',
    d: 'Live demos and Q&A with ODYX clinical specialists.',
    meta: 'Monthly',
    featured: 'Join live sessions and watch on-demand replays anytime.',
    items: ['Product deep-dives', 'Clinical case reviews', 'Workflow optimization tips', 'Q&A with specialists'],
    href: '/learning#videos',
  },
  {
    id: 'academy',
    label: 'Academy',
    t: 'Certified academy',
    d: 'Certification paths for chairside teams and labs.',
    meta: 'Members',
    featured: 'Earn credentials that validate your digital dentistry skills.',
    items: ['Chairside certification', 'Lab technician track', 'Instructor-led assessments', 'Continuing education credits'],
    href: '/learning',
  },
];

const ICONS: Record<TabId, React.ReactNode> = {
  guides: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19V5" />
    </svg>
  ),
  courses: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 9L12 5 2 9l10 4 10-4z" /><path d="M6 11v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  ),
  webinars: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M10 9l5 3-5 3z" />
    </svg>
  ),
  academy: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" /><path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
    </svg>
  ),
};

const Arrow = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const SWAP_MS = 280;

export default function LearningTabs() {
  const [active, setActive] = useState<TabId>('guides');
  const [displayId, setDisplayId] = useState<TabId>('guides');
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const [direction, setDirection] = useState<1 | -1>(1);
  const [reduced, setReduced] = useState(false);
  const [thumb, setThumb] = useState({ x: 0, w: 0 });

  const segRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayTab = TABS.find((t) => t.id === displayId)!;
  const activeIdx = TABS.findIndex((t) => t.id === active);

  const syncThumb = useCallback(() => {
    const seg = segRef.current;
    const btn = btnRefs.current[activeIdx];
    if (!seg || !btn) return;
    const segRect = seg.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    setThumb({ x: btnRect.left - segRect.left, w: btnRect.width });
  }, [activeIdx]);

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useLayoutEffect(() => {
    syncThumb();
  }, [syncThumb]);

  useEffect(() => {
    const seg = segRef.current;
    if (!seg) return;
    const ro = new ResizeObserver(() => syncThumb());
    ro.observe(seg);
    window.addEventListener('resize', syncThumb);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', syncThumb);
    };
  }, [syncThumb]);

  const selectTab = useCallback((id: TabId) => {
    if (id === active) return;
    const nextIdx = TABS.findIndex((t) => t.id === id);
    const prevIdx = TABS.findIndex((t) => t.id === active);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    setActive(id);

    if (reduced) {
      setDisplayId(id);
      setPhase('in');
      return;
    }

    setPhase('out');
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      setDisplayId(id);
      setPhase('in');
    }, SWAP_MS);
  }, [active, reduced]);

  useEffect(() => () => {
    if (swapTimer.current) clearTimeout(swapTimer.current);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, id: TabId) => {
    const idx = TABS.findIndex((t) => t.id === id);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      selectTab(TABS[(idx + 1) % TABS.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      selectTab(TABS[(idx - 1 + TABS.length) % TABS.length].id);
    }
  };

  return (
    <div className="lt-wrap m-up">
      <div className="lt-seg" ref={segRef} role="tablist" aria-label="Learning categories">
        <span
          className="lt-seg-thumb"
          aria-hidden
          style={{
            transform: `translateX(${thumb.x}px)`,
            width: thumb.w,
            transition: reduced ? 'none' : undefined,
          }}
        />
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { btnRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`lt-tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`lt-panel-${t.id}`}
            className={`lt-seg-btn${active === t.id ? ' on' : ''}`}
            onClick={() => selectTab(t.id)}
            onKeyDown={(e) => onKeyDown(e, t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id={`lt-panel-${displayTab.id}`}
        role="tabpanel"
        aria-labelledby={`lt-tab-${displayTab.id}`}
        className={`lt-panel lt-panel--${phase}${reduced ? ' lt-panel--reduced' : ''}`}
        style={{ '--lt-dir': direction } as React.CSSProperties}
      >
        <div className="lt-panel-inner">
          <div className="lt-featured">
            <div className="lt-icon">{ICONS[displayTab.id]}</div>
            <span className="lt-meta">{displayTab.meta}</span>
            <h3>{displayTab.t}</h3>
            <p className="lt-lead">{displayTab.featured}</p>
            <p className="lt-desc">{displayTab.d}</p>
          </div>

          <div className="lt-list">
            <h4>What you&apos;ll find</h4>
            <ul>
              {displayTab.items.map((item, i) => (
                <li key={item} style={{ '--lt-i': i } as React.CSSProperties}>{item}</li>
              ))}
            </ul>
            <Link className="btn lt-cta" href={displayTab.href}>
              Explore {displayTab.label.toLowerCase()} <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
