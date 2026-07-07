'use client';
// Hero "Get the highlights"-style video slider (scan -> smile).
// Self-contained: a CSS scroll-snap peek-card row where only the visible slide's
// video plays; a pill bar tracks the active video's currentTime / duration.
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

type Accent = 'teal' | 'orange';
type StepIcon = 'scan' | 'design' | 'print' | 'cure' | 'finish' | 'smile';
interface JStep {
  no: string;
  label: string;
  accent: Accent;
  cap: string;
  icon: StepIcon;
  video: string;
  poster: string;
}

// Reuse the two shipped clips cyclically; each step's still image is the paint-first poster.
// Swapping in six real clips later is just editing this array.
const STEPS: JStep[] = [
  { no: '01', label: 'Scan', accent: 'teal', icon: 'scan', video: '/video/hero.mp4', poster: '/img/feat-scanner.jpg', cap: 'A chairside intraoral scan captures the mouth in seconds - no molds.' },
  { no: '02', label: 'Design', accent: 'teal', icon: 'design', video: '/video/dental-scan-animation.mp4', poster: '/img/odyx/design.webp', cap: 'Scan data flows into CAD, where the restoration is designed precisely.' },
  { no: '03', label: 'Print', accent: 'orange', icon: 'print', video: '/video/hero.mp4', poster: '/img/feat-printer.jpg', cap: 'Built layer-by-layer on the ODYX printer using ODYX resin.' },
  { no: '04', label: 'Cure', accent: 'orange', icon: 'cure', video: '/video/dental-scan-animation.mp4', poster: '/img/feat-curing.jpg', cap: 'Controlled UV completes polymerization for full strength.' },
  { no: '05', label: 'Finish', accent: 'orange', icon: 'finish', video: '/video/hero.mp4', poster: '/img/feat-finishing.jpg', cap: 'Final polish and characterization bring lifelike color and natural gloss.' },
  { no: '06', label: 'Smile', accent: 'orange', icon: 'smile', video: '/video/dental-scan-animation.mp4', poster: '/img/feat-facescanner.jpg', cap: 'A finished restoration, delivered - often same-day. One connected workflow.' },
];
const N = STEPS.length;
const Arrow = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);

const STEP_ICONS: Record<StepIcon, ReactNode> = {
  scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" /><circle cx="12" cy="12" r="3" /></>,
  design: <><path d="M3 3h18v14H3zM3 21h18M9 17v4M15 17v4" /><path d="M7 9l3 3-3 3" /></>,
  print: <><rect x="6" y="9" width="12" height="8" rx="1" /><path d="M6 17v3h12v-3M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" /></>,
  cure: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2" /></>,
  finish: <><path d="M12 19l7-7a4 4 0 0 0-6-6l-1 1-1-1a4 4 0 0 0-6 6l7 7z" /></>,
  smile: <><circle cx="12" cy="12" r="9" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><path d="M9 9.5h.01M15 9.5h.01" /></>,
};

const StepIconSvg = ({ name }: { name: StepIcon }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {STEP_ICONS[name]}
  </svg>
);

export default function HeroJourney() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for the active video
  const [reduced, setReduced] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);

  // Smooth-scroll a slide into view; native scroll-snap settles it precisely.
  const goTo = useCallback((i: number, smooth = true) => {
    const el = slideRefs.current[i];
    if (!el) return;
    el.scrollIntoView({ behavior: smooth && !reduced ? 'smooth' : 'auto', inline: 'center', block: 'nearest' });
  }, [reduced]);

  // Detect reduced-motion once.
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Track the most-visible slide via IntersectionObserver rooted on the track.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const ratios = new Array(N).fill(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number((e.target as HTMLElement).dataset.idx);
          if (!Number.isNaN(i)) ratios[i] = e.intersectionRatio;
        }
        let best = 0;
        for (let i = 1; i < N; i++) if (ratios[i] > ratios[best]) best = i;
        setActive(best);
      },
      { root, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Intelligent media control: only the active video plays; the rest pause + reset.
  useEffect(() => {
    activeRef.current = active;
    setProgress(0);
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        if (reduced) { v.pause(); return; }
        v.play?.().catch(() => {});
      } else {
        v.pause();
        try { v.currentTime = 0; } catch { /* not seekable yet */ }
      }
    });
  }, [active, reduced]);

  // Drive the active pill's progress fill + sequential auto-advance on end.
  useEffect(() => {
    const v = videoRefs.current[active];
    if (!v || reduced) return;
    const onTime = () => {
      if (v.duration && isFinite(v.duration) && v.duration > 0) {
        setProgress(Math.min(1, v.currentTime / v.duration));
      }
    };
    const onEnded = () => goTo((activeRef.current + 1) % N);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
  }, [active, reduced, goTo]);

  const step = STEPS[active];
  return (
    <div className="hl-hero" data-accent={step.accent}>
      <div className="hl-intro">
        <h1 className="hl-title">
          From a single <span className={`kw${active === 0 ? ' lit' : ''}`}>scan</span> to a finished <span className={`kw${active === N - 1 ? ' lit' : ''}`}>smile</span>.
        </h1>
        <p className="hl-lead">{step.cap}</p>
        <div className="hl-cta">
          <a className="btn" href="/products">Explore Products <Arrow /></a>
          <a className="btn btn-ghost" href="/support">Request a Demo →</a>
        </div>
      </div>

      <div className="hl-track" ref={trackRef} role="group" aria-roledescription="carousel" aria-label="ODYX workflow, scan to smile">
        {STEPS.map((s, i) => (
          <article
            key={s.no}
            className={`hl-slide${i === active ? ' on' : ''}`}
            data-idx={i}
            data-accent={s.accent}
            ref={(el) => { slideRefs.current[i] = el; }}
            aria-roledescription="slide"
            aria-label={`${s.no} - ${s.label}`}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              className="hl-video"
              muted
              playsInline
              preload={i === 0 ? 'auto' : 'none'}
              poster={s.poster}
              aria-hidden
            >
              <source src={s.video} type="video/mp4" />
            </video>
            <span className="hl-veil" aria-hidden />
            <div className="hl-cap">
              <span className="hl-no">
                <span className="hl-glyph"><StepIconSvg name={s.icon} /></span>
                {s.no}
              </span>
              <h3>{s.label}</h3>
              <p>{s.cap}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="hl-pills" role="tablist" aria-label="Workflow steps">
        {STEPS.map((s, i) => (
          <button
            key={s.no}
            type="button"
            role="tab"
            className={`hl-pill${i === active ? ' on' : i < active ? ' done' : ''}`}
            aria-selected={i === active}
            aria-label={`${s.label} step`}
            onClick={() => goTo(i)}
          >
            <span
              className="hl-fill"
              style={{ '--p': i === active ? `${progress * 100}%` : i < active ? '100%' : '0%' } as React.CSSProperties}
              aria-hidden
            />
            <span className="hl-pill-l">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
