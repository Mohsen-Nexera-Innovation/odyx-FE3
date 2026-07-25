'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { HERO } from '@/content/printers-3d';

/**
 * 3D & Hyperrealism hero (ui-ux-pro-max style category), CSS-tier:
 * perspective + layered translate3d parallax + pointer tilt + multi-layer
 * shadows. No WebGL — we hold no 3D model of ODYX hardware, and synthesizing
 * one is forbidden (knowledge_base hard rule). Dark ground per the token rule
 * "dark #141216 reserved for cinematic product heroes".
 * Tilt and float are disabled under prefers-reduced-motion and on touch.
 */
export default function HyperHero({
  chips,
}: {
  chips: { label: string; icon: React.ReactNode }[];
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    const hero = heroRef.current;
    if (!stage || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--ry', `${(x * 9).toFixed(2)}deg`);
        stage.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      stage.style.setProperty('--ry', '0deg');
      stage.style.setProperty('--rx', '0deg');
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section className="ph-hero" id="overview" ref={heroRef}>
      <div className="pf-wrap ph-grid">
        <div className="ph-copy">
          <span className="pf-eyebrow reveal">{HERO.eyebrow}</span>
          <h1 className="reveal">{HERO.headline}</h1>
          <p className="ph-sub reveal">
            Two machines, two jobs. The <strong>ODYX P1-26</strong> prints the
            definitive work that goes in the mouth. The <strong>HALOT-X1</strong>{' '}
            prints the volume that supports it.
          </p>
          <div className="pf-hero-ctas reveal">
            <Link className="pf-btn" href={HERO.primaryCta.href}>
              {HERO.primaryCta.label}
            </Link>
            <a className="pf-btn pf-btn--onDark" href={HERO.secondaryCta.href}>
              {HERO.secondaryCta.label}
            </a>
          </div>
          <ul className="ph-chips" aria-label={HERO.chipsLabel}>
            {chips.map((chip) => (
              <li key={chip.label} className="ph-chip reveal">
                {chip.icon}
                <span>{chip.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="ph-stage" ref={stageRef}>
          <span className="ph-glow ph-glow--amber" aria-hidden />
          <span className="ph-glow ph-glow--sky" aria-hidden />
          <img
            className="ph-scene"
            src="/img/printers/duo-dark.jpg"
            alt="The ODYX HALOT-X1 and P1-26 resin 3D printers side by side"
            width={1672}
            height={941}
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
}
