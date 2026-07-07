'use client';
// "Get the highlights"-style ecosystem slider (scan -> smile). Self-contained:
// a CSS scroll-snap peek-card row where the active card is centered and only the
// visible slide's video plays; a pill bar tracks the active video's currentTime / duration.
import { useCallback, useEffect, useRef, useState } from 'react';

type Accent = 'teal' | 'orange';
interface EStep {
  no: string;
  label: string;
  product: string;
  accent: Accent;
  cap: string;
  video: string;
  poster: string;
}

// Reuse the two shipped clips cyclically; each step's still image is the paint-first poster.
// Swapping in six real clips later is just editing this array.
const STEPS: EStep[] = [
  { no: '01', label: 'Scan', product: 'Intraoral Scanner', accent: 'teal', video: '/video/hero.mp4', poster: '/img/feat-scanner.jpg', cap: 'A chairside intraoral scan captures the mouth in seconds - no molds, just instant, accurate 3D data.' },
  { no: '02', label: 'Design', product: 'Design Software', accent: 'teal', video: '/video/dental-scan-animation.mp4', poster: '/img/odyx/design.webp', cap: 'Scan data flows into CAD, where the restoration is designed with precise, repeatable accuracy.' },
  { no: '03', label: 'Print', product: '3D Printer', accent: 'orange', video: '/video/hero.mp4', poster: '/img/feat-printer.jpg', cap: 'The restoration is built layer by layer on the ODYX printer using validated ODYX resin.' },
  { no: '04', label: 'Cure', product: 'Curing Machine', accent: 'orange', video: '/video/dental-scan-animation.mp4', poster: '/img/feat-curing.jpg', cap: 'Controlled UV completes polymerization for full strength and biocompatibility.' },
  { no: '05', label: 'Finish', product: 'Final Polish', accent: 'orange', video: '/video/hero.mp4', poster: '/img/feat-finishing.jpg', cap: 'Characterization and gloss bring lifelike color and a natural finish to the restoration.' },
  { no: '06', label: 'Deliver', product: 'Finished Smile', accent: 'orange', video: '/video/dental-scan-animation.mp4', poster: '/img/step-deliver.jpg', cap: 'A finished restoration, delivered - often same-day. One connected workflow, from scan to smile.' },
];
const N = STEPS.length;

export default function EcosystemHighlights() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 for the active video
  const [reduced, setReduced] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const activeRef = useRef(0);

  // Smooth-scroll a slide to dead-center. We scroll ONLY the horizontal track
  // (never scrollIntoView, which would also scroll the page vertically and yank
  // the user back to this section during auto-advance).
  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const el = slideRefs.current[i];
    if (!track || !el) return;
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const delta = (elRect.left - trackRect.left) - (track.clientWidth - el.clientWidth) / 2;
    track.scrollBy({ left: delta, behavior: smooth && !reduced ? 'smooth' : 'auto' });
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
    <div className="hl-slider" data-accent={step.accent}>
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
