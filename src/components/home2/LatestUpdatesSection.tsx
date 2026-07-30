"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

// Latest Updates — the client mock's five-up update carousel, the last band on
// the home screen (after the ecosystem hub's Store / Registration row).
//
// Geometry is dimensioned against `knowledge_base/screens/043-latest-updates-
// reference.png` (2852x1256 = a 2048-CSS-px viewport at 1.3926x) and carried in
// cqw off `.hv2-lu-row`, whose reference width is 1878.7px — so every reference
// pixel is value / 18.787 cqw and the whole composition holds its proportions
// at any width. See "9 · Latest updates" in home-v2.css.
//
// Two things the mock does that look like plain rotation but are not: the outer
// cards are trapezoids (vertical edges stay vertical, the horizontal ones tilt
// and the far edge is SHORTER), which is a Y-axis rotation under its own
// perspective camera — a shared scene camera compounds off-axis, same finding as
// the path carousel. And the nav discs sit BEHIND the cards, clipped by card 1
// and card 5, ~60px above the card row's centre line.
//
// The mock draws five cards but four pagination dots, so the deck is eight
// items paginated two-per-dot. Items 6-8 are placeholder updates built from the
// repo's existing photography — swap them for CMS content.

type Update = {
  id: string;
  cat: string;
  tone: "navy" | "light" | "beige";
  title: string;
  desc: string[];
  date: string;
  iso: string;
  href: string;
  /* placeholders cut from repo photography need a fade painted into the card
     field; the mock's own five already carry theirs */
  fade?: true;
  /* Each asset was cut at exactly the image band the mock gives its card, so
     its own w/h IS the band's aspect ratio — driving the band off that (rather
     than off a share of the card height) keeps the art uncropped, and its faded
     tail flush with the card field, at every slot and every breakpoint. */
  art: { src: string; alt: string; w: number; h: number };
};

const UPDATES: Update[] = [
  {
    id: "aeedc",
    cat: "Event",
    tone: "navy",
    title: "ODYX at AEEDC 2025",
    desc: ["Thank you for visiting", "our booth!"],
    date: "May 10, 2025",
    iso: "2025-05-10",
    href: "/about",
    art: {
      src: "/img/hv2-news/aeedc-event.webp",
      alt: "The ODYX exhibition booth lit in blue, with product counters under a glowing ODYX sign",
      w: 668,
      h: 684,
    },
  },
  {
    id: "resins",
    cat: "Product",
    tone: "light",
    title: "New Resin Line",
    desc: ["High performance", "resins now available."],
    date: "May 5, 2025",
    iso: "2025-05-05",
    href: "/products/resins",
    art: {
      src: "/img/hv2-news/resin-line.webp",
      alt: "A dark ODYX resin bottle and a printed restoration on a grey pedestal in a bright studio",
      w: 704,
      h: 728,
    },
  },
  {
    id: "workflow",
    cat: "Update",
    tone: "navy",
    title: "ODYX Workflow",
    desc: ["Simplify your", "digital workflow."],
    date: "April 28, 2025",
    iso: "2025-04-28",
    href: "/workflows",
    art: {
      src: "/img/hv2-news/workflow.webp",
      alt: "A robotic manufacturing arm over a glowing blue platform in a dark chamber",
      w: 764,
      h: 720,
    },
  },
  {
    id: "webinar",
    cat: "Webinar",
    tone: "beige",
    title: "Webinar: Integration",
    desc: ["Tips for a seamless", "digital workflow."],
    date: "April 20, 2025",
    iso: "2025-04-20",
    href: "/learning",
    art: {
      src: "/img/hv2-news/webinar.webp",
      alt: "A tablet on a warm beige surface showing the ODYX dashboard's grid of blue app tiles",
      w: 707,
      h: 716,
    },
  },
  {
    id: "partners",
    cat: "News",
    tone: "navy",
    title: "New Partner Announcement",
    desc: ["Excited to welcome", "new partners to", "the ODYX family."],
    date: "April 15, 2025",
    iso: "2025-04-15",
    href: "/about",
    art: {
      src: "/img/hv2-news/partners.webp",
      alt: "Two people in dark suits shaking hands in front of a blue-lit modern skyline",
      w: 632,
      h: 616,
    },
  },
  {
    id: "design-suite",
    cat: "Update",
    tone: "navy",
    title: "Design Suite Update",
    desc: ["New tools across the", "ODYX design workflow."],
    date: "April 8, 2025",
    iso: "2025-04-08",
    href: "/design-services",
    fade: true,
    art: {
      src: "/img/hv2-news/design-suite.webp",
      alt: "A monitor in a dark studio showing a crown designed on a scanned lower arch",
      w: 764,
      h: 720,
    },
  },
  {
    id: "open-house",
    cat: "Event",
    tone: "light",
    title: "Open House Sessions",
    desc: ["Hands-on demos at the", "ODYX showroom."],
    date: "March 27, 2025",
    iso: "2025-03-27",
    href: "/support",
    fade: true,
    art: {
      src: "/img/hv2-news/open-house.webp",
      alt: "Two visitors reviewing a digital arch scan on a screen at an ODYX stand",
      w: 764,
      h: 720,
    },
  },
  {
    id: "scan-live",
    cat: "Webinar",
    tone: "beige",
    title: "Scan to Print, Live",
    desc: ["Join our clinical team", "for a full walkthrough."],
    date: "March 14, 2025",
    iso: "2025-03-14",
    href: "/learning",
    fade: true,
    art: {
      src: "/img/hv2-news/scan-live.webp",
      alt: "A clinician presenting a scanned arch to colleagues in a training room",
      w: 764,
      h: 720,
    },
  },
];

const N = UPDATES.length;
const PER_DOT = 2;        // the mock shows four dots for eight items
const DOTS = N / PER_DOT;
// How many cards are on screen, which one is emphasised and where the off-deck
// ones park is entirely a CSS concern (see the --s<n>-* slot tokens), so this
// component only publishes each card's ring position as data-slot.

const mod = (v: number, n: number) => ((v % n) + n) % n;

// Rounded-square calendar, drawn to the edges of its box: in the mock the icon's
// left edge sits exactly on the card's text margin, so any padding inside the
// viewBox would push the whole date row right.
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="1.1" y="4.2" width="21.8" height="18.7" rx="4.6" />
    <path d="M6.9 1.6v4.4M17.1 1.6v4.4M1.5 10.6h21" />
  </svg>
);

const CardArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.6 12h14.2M12.6 5.6 19 12l-6.4 6.4" />
  </svg>
);

export default function LatestUpdatesSection() {
  // `offset` is the ring position of the card in slot 0.
  const [offset, setOffset] = useState(0);
  // Pointer swipe: one gesture = one step, threshold in px so a tap never fires.
  const drag = useRef<{ x: number; id: number } | null>(null);

  const step = useCallback((d: number) => setOffset((o) => mod(o + d, N)), []);

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
    <section className="hv2-lu" id="updates" aria-labelledby="hv2-lu-h">
      <div className="hv2-lu-in">
        <div className="hv2-lu-head rv">
          <p className="hv2-lu-eyebrow">
            <span className="hv2-lu-hl">
              <span className="hv2-lu-pip" aria-hidden>&bull;</span>
              Stay Informed
              <span className="hv2-lu-pip" aria-hidden>&bull;</span>
            </span>
          </p>
          <h2 className="hv2-lu-h" id="hv2-lu-h">
            <span className="hv2-lu-hl">Latest Updates</span>
          </h2>
          <p className="hv2-lu-sub">
            <span className="hv2-lu-hl">News, events, product updates and more from ODYX.</span>
          </p>
        </div>

        <div className="hv2-lu-stage rv" data-rv="1">
          <div className="hv2-lu-row">
            {/* aria-roledescription needs a real role to attach to. */}
            <div
              className="hv2-lu-track"
              role="group"
              aria-roledescription="carousel"
              aria-label="Latest ODYX updates"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { drag.current = null; }}
            >
              {UPDATES.map((u, i) => (
                <article
                  className="hv2-lu-card"
                  key={u.id}
                  data-slot={mod(i - offset, N)}
                  data-tone={u.tone}
                  data-cat={u.cat}
                  data-id={u.id}
                  data-fade={u.fade ? "" : undefined}
                  style={{ "--band": `${u.art.w} / ${u.art.h}` } as React.CSSProperties}
                >
                  <span className="hv2-lu-media">
                    <img
                      className="hv2-lu-art"
                      src={u.art.src}
                      alt={u.art.alt}
                      width={u.art.w}
                      height={u.art.h}
                      loading={i < 5 ? undefined : "lazy"}
                      decoding="async"
                    />
                  </span>
                  <p className="hv2-lu-cat">{u.cat}</p>
                  <div className="hv2-lu-copy">
                    {/* One focusable target per card: the title link stretches
                        over the whole card, so the arrow disc stays decorative. */}
                    <h3 className="hv2-lu-t">
                      <Link className="hv2-lu-link" href={u.href}>{u.title}</Link>
                    </h3>
                    <p className="hv2-lu-d">
                      {u.desc.map((line) => (
                        <span className="hv2-lu-dline" key={line}>{line}</span>
                      ))}
                    </p>
                    <div className="hv2-lu-foot">
                      <p className="hv2-lu-date">
                        <span className="hv2-lu-cal" aria-hidden><CalendarIcon /></span>
                        <time dateTime={u.iso}>{u.date}</time>
                      </p>
                      <span className="hv2-lu-go" aria-hidden><CardArrow /></span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Siblings of the deck, not children: on phones they leave the row
              and become grid items either side of the dots. */}
          <button
            type="button"
            className="hv2-nav hv2-lu-nav hv2-lu-nav-prev"
            aria-label="Previous updates"
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className="hv2-nav hv2-lu-nav hv2-lu-nav-next"
            aria-label="Next updates"
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>

          <div className="hv2-lu-dots" role="group" aria-label="Update pages">
            {Array.from({ length: DOTS }, (_, k) => {
              const on = Math.floor(offset / PER_DOT) === k;
              return (
                <button
                  type="button"
                  className="hv2-lu-dot"
                  key={k}
                  aria-label={`Updates ${k * PER_DOT + 1}\u2013${k * PER_DOT + PER_DOT}`}
                  aria-current={on || undefined}
                  data-on={on ? "" : undefined}
                  onClick={() => setOffset(k * PER_DOT)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
