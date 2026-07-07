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
  const navigatingRef = useRef(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const releaseNavLock = useCallback(() => {
    navigatingRef.current = false;
    if (navTimerRef.current !== null) {
      clearTimeout(navTimerRef.current);
      navTimerRef.current = null;
    }
  }, []);

  const scrollTargetFor = useCallback((track: HTMLDivElement, el: HTMLElement) => {
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const raw =
      track.scrollLeft +
      (elRect.left - trackRect.left) -
      (track.clientWidth - el.offsetWidth) / 2;
    const max = track.scrollWidth - track.clientWidth;
    return Math.max(0, Math.min(raw, max));
  }, []);

  // Scroll the track to a slide and mark that slide active immediately so pills
  // always match the user's click (IO/scroll sync alone can pick a neighbor mid-scroll).
  const goTo = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const el = slideRefs.current[i];
    if (!track || !el) return;

    navigatingRef.current = true;
    activeRef.current = i;
    setActive(i);
    setProgress(0);

    track.scrollTo({
      left: scrollTargetFor(track, el),
      behavior: smooth && !reduced ? 'smooth' : 'auto',
    });

    if (navTimerRef.current !== null) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(releaseNavLock, smooth && !reduced ? 700 : 80);
  }, [reduced, releaseNavLock, scrollTargetFor]);

  // Detect reduced-motion once.
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  // Release the nav lock as soon as programmatic scroll settles.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scrollend', releaseNavLock);
    return () => track.removeEventListener('scrollend', releaseNavLock);
  }, [releaseNavLock]);

  // While the user drags/swipes, pick whichever slide is closest to center.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const syncFromScroll = () => {
      if (navigatingRef.current) return;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncFromScroll);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    syncFromScroll();
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
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
