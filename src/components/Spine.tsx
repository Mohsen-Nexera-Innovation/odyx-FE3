'use client';
// Left vertical story-spine — whole-site journey nav (ported from the Sample).
// Fill grows with page scroll; the active section's dot highlights; hover shows the label;
// click smooth-scrolls to the section. Hidden < 980px (see .spine CSS).
import { useEffect, useRef } from 'react';

const SECTIONS: [string, string][] = [
  ['#hero', 'Start'],
  ['#path', 'Choose Path'],
  ['#featured', 'Products'],
  ['#ecosystem', 'Ecosystem'],
  ['#clinical', 'Applications'],
  ['#why', 'Why ODYX'],
  ['#previews', 'Resources'],
  ['#news', 'News'],
  ['#register', 'Register'],
  ['#shop', 'Shop'],
  ['#cta', 'Demo'],
];

export default function Spine() {
  const fillRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const sc = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) || 0;
      if (fillRef.current) fillRef.current.style.height = sc * 100 + '%';
      const vh = window.innerHeight;
      navRef.current?.querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
        const tgt = document.querySelector(b.dataset.target!);
        if (!tgt) return;
        const r = tgt.getBoundingClientRect();
        b.classList.toggle('on', r.top < vh * 0.5 && r.bottom > vh * 0.4);
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  const go = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className="spine" ref={navRef} aria-label="Page sections">
      <div className="track" />
      <div className="trackfill" ref={fillRef} />
      {SECTIONS.map(([target, label]) => (
        <button key={target} data-target={target} data-label={label} onClick={() => go(target)} aria-label={label} />
      ))}
    </nav>
  );
}
