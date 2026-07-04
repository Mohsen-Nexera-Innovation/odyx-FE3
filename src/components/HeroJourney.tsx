'use client';
// Hero with a cinematic video background (scan -> smile). Video is scoped to this section only.
// The stepper is DRIVEN BY the video's playback time while the hero is in view.
import { useEffect, useRef, useState } from 'react';

type Accent = 'teal' | 'orange';
interface JStep { no: string; label: string; accent: Accent; cap: string; }

const STEPS: JStep[] = [
  { no: '01', label: 'Scan', accent: 'teal', cap: 'A chairside intraoral scan captures the mouth in seconds - no molds.' },
  { no: '02', label: 'Design', accent: 'teal', cap: 'Scan data flows into CAD, where the restoration is designed precisely.' },
  { no: '03', label: 'Print', accent: 'orange', cap: 'Built layer-by-layer on the ODYX printer using ODYX resin.' },
  { no: '04', label: 'Cure', accent: 'orange', cap: 'Controlled UV completes polymerization for full strength.' },
  { no: '05', label: 'Finish', accent: 'orange', cap: 'Final polish and characterization bring lifelike color and natural gloss.' },
  { no: '06', label: 'Smile', accent: 'orange', cap: 'A finished restoration, delivered - often same-day. One connected workflow.' },
];
const N = STEPS.length;
const Arrow = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6" /></svg>);

export default function HeroJourney() {
  const [active, setActive] = useState(0);
  const secsPerStep = useRef(3); // updated to duration/N once metadata loads

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const v = document.getElementById('bgvideo') as HTMLVideoElement | null;
    const hero = document.getElementById('hero');
    if (reduce) { v?.pause(); return; }

    let playing = false;
    const onMeta = () => { if (v && v.duration && isFinite(v.duration)) secsPerStep.current = v.duration / N; };
    const onTime = () => { if (v) setActive(Math.min(N - 1, Math.floor(v.currentTime / secsPerStep.current))); };
    const onPlay = () => { playing = true; };
    const onPause = () => { playing = false; };

    v?.addEventListener('loadedmetadata', onMeta);
    v?.addEventListener('timeupdate', onTime);
    v?.addEventListener('playing', onPlay);
    v?.addEventListener('pause', onPause);
    onMeta();

    // Play only while the hero is visible; pause when scrolled away
    const io = hero && v ? new IntersectionObserver(
      ([e]) => { e.isIntersecting ? v.play?.().catch(() => {}) : v.pause(); },
      { threshold: 0.15 },
    ) : null;
    if (hero && v) io?.observe(hero);

    // fallback: if the video isn't playing, advance every 3s so it still works
    const iv = setInterval(() => { if (!playing) setActive((a) => (a + 1) % N); }, 3000);

    return () => {
      v?.removeEventListener('loadedmetadata', onMeta);
      v?.removeEventListener('timeupdate', onTime);
      v?.removeEventListener('playing', onPlay);
      v?.removeEventListener('pause', onPause);
      if (hero) io?.unobserve(hero);
      io?.disconnect();
      clearInterval(iv);
    };
  }, []);

  const jump = (i: number) => {
    setActive(i);
    const v = document.getElementById('bgvideo') as HTMLVideoElement | null;
    if (v && v.readyState > 0) { v.currentTime = i * secsPerStep.current + 0.04; v.play?.().catch(() => {}); }
  };

  const step = STEPS[active];
  return (
    <div className="herocard hero-video" data-accent={step.accent}>
      <video id="bgvideo" className="hc-video" autoPlay muted loop playsInline preload="auto" poster="/img/feat-scanner.jpg" aria-hidden>
        {/* Replace /video/dental-scan-animation.mp4 with official ODYX hero film when delivered */}
        <source src="/video/dental-scan-animation.mp4" type="video/mp4" />
      </video>
      <div className="hc-veil" aria-hidden />
      <div className="hc-main">
        <div className="hc-text">
          <h1 className="hc-title">
            From a single <span className={`kw${active === 0 ? ' lit' : ''}`}>scan</span><br />
            to a finished <span className={`kw${active === N - 1 ? ' lit' : ''}`}>smile</span>.
          </h1>
          <p className="hc-lead">{step.cap}</p>
          <div className="hc-cta">
            <a className="btn" href="/products">Explore Products <Arrow /></a>
            <a className="btn btn-ghost" href="/support">Request a Demo →</a>
          </div>
        </div>
      </div>

      <div className="hc-nav">
        <div className="hc-line"><div className="f" style={{ width: `${(active / (N - 1)) * 100}%` }} /></div>
        {STEPS.map((s, i) => (
          <button key={s.no} className={`hc-node${i === active ? ' on' : i < active ? ' done' : ''}`}
            onClick={() => jump(i)} aria-current={i === active} aria-label={`${s.label} step`}>
            <span className="d">{i < active ? '✓' : s.no}</span>
            <span className="l">{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
