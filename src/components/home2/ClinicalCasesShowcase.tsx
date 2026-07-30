"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

// Clinical Cases — the client reference's mirrored deck: a four-card stack that
// fans backward to the LEFT with the active card closest to the viewer, and the
// copy column on the right. Geometry is dimensioned against that reference at a
// 2048px viewport (1740px content container, 665x505 card box) and carried in
// cqw off .hv2-cc-in, so the whole composition holds its proportions at any
// width. See the "7 · Clinical cases" block in home-v2.css.
//
// Sibling of ClinicalApplicationsSection but deliberately its own component:
// the fan direction, card ratio, art crops and column order all differ, and
// sharing one component would mean a flag on every rule.

type ClinicalCase = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: "implant" | "crown" | "arch" | "aligner";
};

const CASES: ClinicalCase[] = [
  {
    id: "implant",
    title: "Implant Cases",
    description: "See real cases of implant planning and placement with precision.",
    image: "/img/hv2-cases/implant.webp",
    alt: "Ceramic crowns and an implant-supported bridge on a dark reflective surface",
    icon: "implant",
  },
  {
    id: "restorative",
    title: "Restorative Cases",
    description: "Crowns, bridges and veneers finished to a natural, lasting result.",
    image: "/img/hv2-cases/restorative.webp",
    alt: "A sectioned dental model carrying a row of finished ceramic crowns",
    icon: "crown",
  },
  {
    id: "surgical",
    title: "Full-Arch Cases",
    description: "Guided full-arch restorations planned and delivered end to end.",
    image: "/img/hv2-cases/surgical.webp",
    alt: "A printed implant surgical guide with metal sleeves seated on an arch model",
    icon: "arch",
  },
  {
    id: "orthodontic",
    title: "Aligner Cases",
    description: "Clear aligner treatments tracked from first scan to final retainer.",
    image: "/img/hv2-cases/orthodontic.webp",
    alt: "Clear orthodontic aligners in front of two printed arch models",
    icon: "aligner",
  },
];

const N = CASES.length;
const mod = (v: number) => ((v % N) + N) % N;

// Card badges: one 44x66 outline set so all four sit on the same optical
// baseline inside the card, matching the reference's implant mark.
const ICONS = {
  implant: (
    <>
      <path d="M22 3.4c-7.3 0-13.1 4.7-13.1 10.8 0 3.4 1.6 6.1 3.5 8h19.2c1.9-1.9 3.5-4.6 3.5-8C35.1 8.1 29.3 3.4 22 3.4Z" />
      <path d="M13.4 24.6h17.2l-1.4 13-1.3 11.6L22 62.2l-5.9-13-1.3-11.6-1.4-13Z" />
      <path d="M15.2 31.2h13.6M16 38.5h12M17.1 45.7h9.8M18.4 52.5h7.2" />
    </>
  ),
  crown: (
    // Tall molar, not the 24-grid tooth used elsewhere on this screen — that
    // one is near-square and reads undersized in a 44x66 badge box.
    <path d="M15 3C8.6 3 4.5 7.9 4.5 14.6c0 4.4 1.3 7.9 2.9 12.6 1.6 4.6 2.2 9 2.9 14.7.6 4.8 1.2 9.7 4 9.7 2.9 0 3.5-4.5 4.4-8.5.8-3.8 1.6-7.3 4-7.3s3.2 3.5 4 7.3c.9 4 1.5 8.5 4.4 8.5 2.8 0 3.4-4.9 4-9.7.7-5.7 1.3-10.1 2.9-14.7 1.6-4.7 2.9-8.2 2.9-12.6C40.5 7.9 36.4 3 30 3c-3.8 0-6.4 1.9-7.5 1.9S18.8 3 15 3Z" transform="translate(-.5 5)" />
  ),
  arch: (
    // Occlusal view of a full arch: a U-shaped band split into tooth segments.
    // An earlier take put implant posts above the arch, which at 43px read as
    // antennae rather than anything dental.
    <>
      <path d="M6 11v14c0 16.6 7.2 30 16 30s16-13.4 16-30V11" />
      <path d="M14.6 11v13c0 9 3.3 16 7.4 16s7.4-7 7.4-16V11" />
      {/* Two separator pairs only — a third at the arch's apex collides with
          the inner band's tip and reads as a smudge at 43px. */}
      <path d="M6 20h8.6M38 20h-8.6M7.6 31l7.4-1.8M36.4 31l-7.4-1.8" />
    </>
  ),
  aligner: (
    <>
      <path d="M5 13c0 3.6.9 5.5.9 9.3C5.9 36.6 12 62 22 62s16.1-25.4 16.1-39.7c0-3.8.9-5.7.9-9.3" />
      <path d="M5 13c1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0" />
      <path d="M10.5 29c3.6 1.8 19.4 1.8 23 0" />
    </>
  ),
} as const;

const Badge = ({ icon }: { icon: ClinicalCase["icon"] }) => (
  <svg viewBox="0 0 44 66" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {ICONS[icon]}
  </svg>
);

export default function ClinicalCasesShowcase() {
  const [active, setActive] = useState(0);
  // Pointer swipe: one gesture = one step, threshold in px so a tap never fires.
  const drag = useRef<{ x: number; id: number } | null>(null);

  const step = useCallback((d: number) => setActive((a) => mod(a + d)), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  return (
    <section className="hv2-cc" id="cases" aria-labelledby="hv2-cc-h">
      <div className="hv2-cc-in">
        <div className="hv2-cc-stage rv" data-rv="1">
          {/* aria-roledescription needs a real role to attach to. */}
          <div
            className="hv2-cc-deck"
            role="group"
            aria-roledescription="carousel"
            aria-label="Clinical cases"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { drag.current = null; }}
          >
            {CASES.map((c, i) => {
              const slot = mod(i - active);
              return (
                <article
                  className="hv2-cc-card"
                  key={c.id}
                  data-slot={slot}
                  aria-hidden={slot !== 0 ? true : undefined}
                >
                  <img
                    className="hv2-cc-art"
                    src={c.image}
                    alt={slot === 0 ? c.alt : ""}
                    width={1700}
                    height={1224}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="hv2-cc-scrim" aria-hidden />
                  <div className="hv2-cc-cbody">
                    <span className="hv2-cc-ic" aria-hidden>
                      <Badge icon={c.icon} />
                    </span>
                    <h3 className="hv2-cc-t">{c.title}</h3>
                    <span className="hv2-cc-t-rule" aria-hidden />
                    <p className="hv2-cc-d">{c.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="hv2-nav hv2-cc-nav hv2-cc-nav-prev"
            aria-label="Previous clinical case"
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hv2-nav hv2-cc-nav hv2-cc-nav-next"
            aria-label="Next clinical case"
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="hv2-cc-copy rv" data-rv="2">
          <p className="hv2-eyebrow hv2-cc-eyebrow">Clinical Cases</p>
          <h2 className="hv2-h2 hv2-cc-h" id="hv2-cc-h">
            Real Cases.
            <br />
            Real Results<span className="hv2-blue">.</span>
          </h2>
          <span className="hv2-cc-rule" aria-hidden />
          {/* The explicit space survives the <br> being dropped when this
              stacks — without it the two lines butt together. */}
          <p className="hv2-cc-lead">
            See how professionals{" "}
            <br />
            achieve more with ODYX.
          </p>
          {/* No dedicated cases route yet — /learning is where the existing
              CaseSpotlight CTA points, so the two stay consistent. */}
          <Link className="hv2-btn hv2-cc-cta" href="/learning">
            <span>View Clinical Cases</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
