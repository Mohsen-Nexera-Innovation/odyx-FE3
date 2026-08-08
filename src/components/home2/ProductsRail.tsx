"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

// Products panel from the client mock: a contained, rounded panel that holds
// the intro column (passed in as `children`) plus a horizontal snap rail of
// product-category cards, edge-mounted carousel arrows and page dots.
//
// The mock composes each card individually — different widths and different
// packshot framing per product — so every card carries its own `pr-*` class
// whose geometry lives in home-v2.css as custom properties. Keep the two in
// sync when adding a card.

const CARDS = [
  {
    key: "scanner",
    title: ["ODYX S1", "Intraoral Scanner"],
    href: "/products/odyx-s1-intraoral-scanner",
    img: "/img/scanner/s1-hero-cutout.png",
    alt: "The ODYX S1 intraoral scanner on its docking stand",
  },
  {
    key: "printer",
    title: ["ODYX P1-26", "3D Printer"],
    href: "/products/odyx-p1-26",
    img: "/img/hv2-cut/printer-product.webp",
    alt: "The ODYX P1-26 resin 3D printer with red cover and touchscreen",
  },
  {
    key: "cure",
    title: ["ODYX Cure", "UV-02"],
    href: "/products/curing-machines",
    img: "/img/cure-uv02/hero/machine-cutout.png",
    alt: "The ODYX Cure UV-02 dental UV curing station",
    // Wider card in the mock; its device leans right, so the arrow sits left.
    arrowStart: true,
  },
  {
    key: "resin",
    title: ["ODYX", "Resins"],
    href: "/products/resins",
    img: "/img/hv2-cut/resins-product.webp",
    alt: "An ODYX dental resin bottle",
  },
  {
    key: "accessories",
    title: ["Accessories"],
    href: "/shop",
    img: "/img/shop-accessories.jpg",
    alt: "Finishing and characterization accessories",
    // Category not live yet — shown dimmed and non-navigable.
    disabled: true,
  },
] as const;

// The mock shows four page indicators, not one per card.
const PAGES = 4;

function ArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ProductsRail({ children }: { children?: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [stopCount, setStopCount] = useState(0);

  // Snap stops are each card's own start edge (the rail scroll-snaps to
  // `.hv2-pr-card { scroll-snap-align: start }`), not an even fraction of
  // the scrollable range — the cards are deliberately unequal widths, so a
  // fraction-based target rarely lands on a real snap point and the browser's
  // mandatory snap immediately pulled it back, which is why the arrows/dots
  // looked inert. Reading the actual card offsets keeps every programmatic
  // scroll on a position the browser will actually hold. At some breakpoints
  // a couple of the trailing cards clamp to the same max scroll position
  // (little overflow left to give); those collapse into one stop so a dot
  // never claims a position the rail can't actually reach.
  const getStops = useCallback((el: HTMLDivElement) => {
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 1) return [0];
    // Prefer layout offsets relative to the rail itself — offsetLeft can
    // resolve against `.hv2-rail-wrap` (position:relative) rather than the
    // scrolling element, so derive from bounding rects for reliability.
    const railLeft = el.getBoundingClientRect().left;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".hv2-pr-card")).slice(0, PAGES);
    const stops: number[] = [];
    for (const c of cards) {
      const v = Math.max(
        0,
        Math.min(el.scrollLeft + (c.getBoundingClientRect().left - railLeft), max),
      );
      if (!stops.length || v - stops[stops.length - 1] > 4) stops.push(v);
    }
    if (!stops.length) stops.push(0);
    if (stops[stops.length - 1] !== max) stops.push(max);
    return stops;
  }, []);

  const measure = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const stops = getStops(el);
    setStopCount(stops.length);
    let closest = 0;
    let closestDist = Infinity;
    stops.forEach((stop, i) => {
      const dist = Math.abs(el.scrollLeft - stop);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setPage(closest);
  }, [getStops]);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    measure();
    // Images loading grow scrollWidth without changing the rail's client
    // box — observe cards too, and remeasure on load / late layout.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.querySelectorAll<HTMLElement>(".hv2-pr-card").forEach((c) => ro.observe(c));
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure);
    });
    const t1 = window.setTimeout(measure, 100);
    const t2 = window.setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", measure));
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = (k: number) => {
    const el = railRef.current;
    if (!el) return;
    const stops = getStops(el);
    const t = Math.min(Math.max(k, 0), stops.length - 1);
    el.scrollTo({ left: stops[t] ?? 0, behavior: "smooth" });
    setPage(t);
  };

  const canScroll = stopCount > 1;

  return (
    <div className="hv2-prod-panel">
      <div className="hv2-prod-grid">
        {children}

        <div className="hv2-rail-wrap rv" data-rv="1">
          <div className="hv2-rail" ref={railRef} onScroll={measure}>
            {CARDS.map((c) => {
              const disabled = "disabled" in c && c.disabled;
              const inner = (
                <>
                  <span className="hv2-pr-media">
                    <img src={c.img} alt={c.alt} loading="lazy" />
                  </span>
                  <h3 className="hv2-pr-title">
                    <span className="hv2-pr-lead">{c.title[0]}</span>
                    {c.title[1] ? (
                      <>
                        <br />
                        {c.title[1]}
                      </>
                    ) : null}
                  </h3>
                  <span
                    className={`hv2-pr-go${"arrowStart" in c && c.arrowStart ? " is-start" : ""}${
                      "onDark" in c && c.onDark ? " on-dark" : ""
                    }`}
                    aria-hidden
                  >
                    <ArrowRight />
                  </span>
                </>
              );
              const cls = `hv2-pr-card hv2-pr-${c.key}${disabled ? " is-disabled" : ""}`;
              return disabled ? (
                <div className={cls} key={c.href} aria-disabled>
                  {inner}
                </div>
              ) : (
                <Link className={cls} href={c.href} key={c.href}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {canScroll && (
        <div className="hv2-dots hv2-prod-dots">
          {Array.from({ length: stopCount }, (_, k) => (
            <button
              key={k}
              type="button"
              className={`hv2-dot${k === page ? " is-on" : ""}`}
              aria-label={`Show products page ${k + 1} of ${stopCount}`}
              aria-current={k === page}
              onClick={() => goTo(k)}
            />
          ))}
        </div>
      )}

      {canScroll && (
        <>
          <button
            type="button"
            className="hv2-nav hv2-prod-nav hv2-prod-nav-prev"
            aria-label="Show previous products"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="hv2-nav hv2-prod-nav hv2-prod-nav-next"
            aria-label="Show next products"
            onClick={() => goTo(page + 1)}
            disabled={page === stopCount - 1}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
