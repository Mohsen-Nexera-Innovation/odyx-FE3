"use client";

import { useState } from "react";
import Link from "next/link";

// Coverflow path picker matching the mock: wide active card centered, two
// narrower near-full-height cards beside it, and heavily rotated blurred
// card slivers hugging both viewport edges. Arrows and dots rotate the ring.

const PATHS = [
  {
    key: "lab",
    title: "Lab Technician",
    desc: "Powerful tools for dental laboratories.",
    cta: "I'm a Lab Tech",
    href: "/solutions/labs",
    // guest.jpg is the workstation-with-scan-software shot the mock uses
    // on the Lab card (lab-scene.jpg is a printer close-up — wrong scene).
    img: "/img/paths/guest.jpg",
    alt: "Dental scan software on a lab workstation screen",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M9.5 2.5h5M10 2.5v3c0 .8-.8 1.4-1.5 2A4.4 4.4 0 0 0 7 10.9V18.5a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-7.6a4.4 4.4 0 0 0-1.5-3.4c-.7-.6-1.5-1.2-1.5-2v-3" />
        <path d="M7.2 13h9.6" />
      </svg>
    ),
  },
  {
    key: "dentist",
    title: "Dentist",
    desc: "Digital solutions for clinics of all sizes.",
    cta: "I'm a Dentist",
    href: "/solutions/dentists",
    // The chair-side half of clinic-scene.jpg (CSS zooms past the printer)
    // — dentist.jpg is a person portrait, not the mock's empty operatory.
    img: "/img/printers/clinic-scene.jpg",
    alt: "A dental chair and imaging monitor in a modern clinic",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M7.5 3.2C5.4 3.2 3.8 4.9 3.8 7c0 1.4.4 2.5.9 4 .5 1.4.7 2.8.9 4.6.2 1.5.4 3 1.3 3 .9 0 1.1-1.4 1.4-2.7.2-1.2.5-2.3 1.2-2.3s1 1.1 1.2 2.3c.3 1.3.5 2.7 1.4 2.7.9 0 1.1-1.5 1.3-3 .2-1.8.4-3.2.9-4.6.5-1.5.9-2.6.9-4 0-2.1-1.6-3.8-3.7-3.8-1.2 0-2 .6-2.6.6s-1.4-.6-2.6-.6Z" />
      </svg>
    ),
  },
  {
    key: "guest",
    title: "Guest",
    desc: "Explore ODYX as a guest.",
    cta: "Continue as Guest",
    href: "/workflows",
    img: "/img/scanner/s1-chairside.jpg",
    alt: "An ODYX intraoral scanner resting chairside",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21c1.2-3.6 4.1-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
      </svg>
    ),
  },
] as const;

const N = PATHS.length;
const mod = (v: number) => ((v % N) + N) % N;
// 0 = active, ±1 = side cards, ±2 = edge slivers, ±3 = clipped edge slivers
const SLOTS = [-3, -2, -1, 0, 1, 2, 3] as const;

export default function PathCarousel() {
  const [active, setActive] = useState(1); // Dentist centered first, like the mock

  return (
    <div className="hv2-path rv" data-rv="1">
      <div className="hv2-path-stage">
        <button
          type="button"
          className="hv2-nav hv2-nav-prev"
          aria-label="Previous path"
          onClick={() => setActive((a) => mod(a - 1))}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m15 6-6 6 6 6" />
          </svg>
        </button>

        <div className="hv2-path-ring">
          {SLOTS.map((off) => {
            const k = mod(active + off);
            const p = PATHS[k];
            const g = Math.abs(off);
            const pos =
              off === 0
                ? "is-active"
                : `is-side is-${off < 0 ? "left" : "right"}${g >= 2 ? " is-ghost" : ""}${g === 3 ? " is-ghost2" : ""}`;
            return (
              <article
                className={`hv2-pcard hv2-pcard-${p.key} ${pos}`}
                key={off}
                data-off={off}
                onClick={() => g === 1 && setActive(k)}
                aria-hidden={off !== 0 ? true : undefined}
              >
                <div className="hv2-pcard-art" aria-hidden>
                  <img src={p.img} alt="" loading="lazy" />
                </div>
                <div className="hv2-pcard-body">
                  <span className="hv2-pcard-ic">{p.icon}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <Link className="hv2-pcard-btn" href={p.href} tabIndex={off === 0 ? 0 : -1}>
                    {p.cta}
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="hv2-nav hv2-nav-next"
          aria-label="Next path"
          onClick={() => setActive((a) => mod(a + 1))}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>
      </div>

      <div className="hv2-dots" role="tablist" aria-label="Paths">
        {PATHS.map((p, k) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={k === active}
            aria-label={p.title}
            className={`hv2-dot${k === active ? " is-on" : ""}`}
            onClick={() => setActive(k)}
          />
        ))}
      </div>
    </div>
  );
}
