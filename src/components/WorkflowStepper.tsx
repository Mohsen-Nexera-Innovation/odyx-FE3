'use client';
// Guided Workflow as an animated circular stepper. Six circular image nodes connected by a
// teal-to-orange rail with a glowing pulse. The active step auto-advances (pauses on hover),
// the rail fills to the active node, and a caption below shows the product used at each step.
// Click a node to jump. Per-step accent: Scan/Design teal, Print/Cure/Finish/Deliver orange.
import { useEffect, useRef, useState } from 'react';

type Accent = 'teal' | 'orange';
interface WStep { no: string; label: string; product: string; desc: string; img: string; accent: Accent; brand?: { src: string; alt: string } }

const BRAND_SCANNERS = { src: '/brand/odyx-scanners-wide.png', alt: 'ODYX Scanners' };
const BRAND_PRINTING = { src: '/brand/odyx-digital-printing.png', alt: 'ODYX Digital Printing' };

const STEPS: WStep[] = [
  { no: '01', label: 'Scan', product: 'Intraoral Scanner', desc: 'A chairside intraoral scan captures the mouth in seconds, with no molds, just instant accurate 3D data.', img: '/img/feat-scanner.jpg', accent: 'teal', brand: BRAND_SCANNERS },
  { no: '02', label: 'Design', product: 'Design Software', desc: 'Scan data flows into CAD, where the restoration is designed with precise, repeatable accuracy.', img: '/img/odyx/design.webp', accent: 'teal', brand: BRAND_SCANNERS },
  { no: '03', label: 'Print', product: '3D Printer', desc: 'The restoration is built layer by layer on the ODYX printer using validated ODYX resin.', img: '/img/feat-printer.jpg', accent: 'orange', brand: BRAND_PRINTING },
  { no: '04', label: 'Cure', product: 'Curing Machine', desc: 'Controlled UV completes polymerization for full strength and biocompatibility.', img: '/img/feat-curing.jpg', accent: 'orange', brand: BRAND_PRINTING },
  { no: '05', label: 'Finish', product: 'Staining & Glazing', desc: 'Staining and glazing bring lifelike color and a natural gloss to the final restoration.', img: '/img/crowns.jpg', accent: 'orange', brand: BRAND_PRINTING },
  { no: '06', label: 'Deliver', product: 'Finished Smile', desc: 'A finished restoration, delivered, often same-day. One connected workflow, from scan to smile.', img: '/img/step-deliver.jpg', accent: 'orange' },
];
const N = STEPS.length;

const Check = () => (<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>);

export default function WorkflowStepper() {
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const iv = setInterval(() => { if (!paused.current) setActive((a) => (a + 1) % N); }, 2800);
    return () => clearInterval(iv);
  }, []);

  const step = STEPS[active];
  const fill = (active / (N - 1)) * 100;

  return (
    <div className="wfs" data-accent={step.accent}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}>
      <div className="wfs-track">
        <div className="wfs-line"><div className="wfs-fill" style={{ width: `${fill}%` }} /></div>
        {STEPS.map((s, i) => (
          <button key={s.no} type="button"
            className={`wfs-node${i === active ? ' on' : i < active ? ' done' : ''}`}
            data-accent={s.accent}
            onClick={() => setActive(i)}
            aria-current={i === active} aria-label={`${s.label}: ${s.product}`}>
            <span className="wfs-circle">
              <img src={s.img} alt={s.product} loading="lazy" />
              <span className="wfs-ring" />
              {i < active && <span className="wfs-check" aria-hidden><Check /></span>}
            </span>
            <span className="wfs-no">Step {s.no}</span>
            <span className="wfs-label">{s.label}</span>
          </button>
        ))}
      </div>

      <div className="wfs-caption" key={active}>
        <span className="eyebrow">Step {step.no} &middot; {step.product}</span>
        <p>{step.desc}</p>
        {step.brand && (
          <span className="wfs-brand" aria-label={`Powered by ${step.brand.alt}`}>
            <small>Powered by</small>
            <img src={step.brand.src} alt={step.brand.alt} loading="lazy" />
          </span>
        )}
      </div>
    </div>
  );
}
