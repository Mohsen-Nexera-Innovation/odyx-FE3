'use client';
// 037 §5.3 — "Washed. Then cured." two-act pinned sequence.
// Scroll scrubs a crossfade from the wash act (violet — the bench step
// before) to the cure act (orange — the UV-02's chamber). The progress
// value lands in the --p custom property; the crossfade itself is CSS.
// Mobile and reduced-motion get two static stacked frames (CSS media
// queries) — the listeners below simply never fire a visible change.
import { useEffect, useRef } from 'react';

const ACTS = [
  {
    id: 'wash',
    kicker: 'Act I — Washed',
    title: 'Every fine detail stripped of uncured resin.',
    body:
      'Fresh from the printer, the part goes through its alcohol wash — an IPA bath at the bench lifts the film of uncured resin from fine details and deep cavities.',
    img: '/img/cure-uv02/act-wash.jpg',
    alt: 'A printed appliance in a swirling alcohol wash under cool violet light',
  },
  {
    id: 'cure',
    kicker: 'Act II — Cured',
    title: 'Light reaches every surface.',
    body:
      'Inside the UV-02, 360° coverage and wavelengths matched to the resin complete polymerization — until the part is fully hardened.',
    img: '/img/cure-uv02/act-cure.jpg',
    alt: 'Cured crowns glowing orange on the curing plate inside the chamber',
  },
] as const;

export default function CureActsSequence() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const total = root.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -root.getBoundingClientRect().top / total));
      root.style.setProperty('--p', p.toFixed(4));
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, []);

  return (
    <div className="c6-acts" ref={rootRef} id="washed-then-cured">
      <div className="c6-acts-pin">
        <div className="c6-acts-head">
          <div className="c6-acts-head-in">
            <p className="c6-acts-eyebrow">Washed. Then cured.</p>
            <p className="c6-acts-rail" aria-hidden>
              <span>Wash</span>
              <i />
              <span>Cure</span>
            </p>
          </div>
        </div>
        {ACTS.map((act) => (
          <div className={`c6-act c6-act--${act.id}`} key={act.id}>
            <img src={act.img} alt={act.alt} loading="lazy" />
            <div className="c6-act-copy">
              <div className="c6-act-copy-in">
                <p className="c6-act-kicker">{act.kicker}</p>
                <h3 className="c6-act-title">{act.title}</h3>
                <p className="c6-act-body">{act.body}</p>
              </div>
            </div>
          </div>
        ))}
        <p className="c6-acts-close">One to five minutes, typically. Then it&rsquo;s ready for the patient.</p>
      </div>
    </div>
  );
}
