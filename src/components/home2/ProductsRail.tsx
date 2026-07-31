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
    title: ["Intraoral", "Scanners"],
    href: "/products/odyx-s1-intraoral-scanner",
    img: "/img/cutouts/feat-scanner-cutout.png",
    alt: "ODYX S1 intraoral scanner",
  },
  {
    key: "printer",
    title: ["3D", "Printers"],
    href: "/products/odyx-p1-26",
    img: "/img/printers/duo-cutout.png",
    alt: "ODYX resin 3D printers",
    // The packshot is near-black behind this card's arrow — flip it to the
    // on-dark treatment so the glyph stays legible (as in the mock).
    onDark: true,
  },
  {
    key: "cure",
    title: ["UV", "Curing Units"],
    href: "/products/curing-machines",
    img: "/img/cure-stitch/odyx-cure-chamber-glow-cutout.png",
    alt: "ODYX UV curing unit with a glowing chamber",
    // Wider card in the mock; its device leans right, so the arrow sits left.
    arrowStart: true,
  },
  {
    key: "resin",
    title: ["Premium", "Resins"],
    href: "/products/resins",
    img: "/img/cutouts/feat-resin-cutout.png",
    alt: "The ODYX premium resin bottle",
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

  const onScroll = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const t = max > 0 ? el.scrollLeft / max : 0;
    setPage(Math.round(t * (PAGES - 1)));
  }, []);

  useEffect(() => {
    onScroll();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onScroll]);

  const goTo = (k: number) => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const t = Math.min(Math.max(k, 0), PAGES - 1);
    el.scrollTo({ left: (max * t) / (PAGES - 1), behavior: "smooth" });
    setPage(t);
  };

  return (
    <div className="hv2-prod-panel">
      <div className="hv2-prod-grid">
        {children}

        <div className="hv2-rail-wrap rv" data-rv="1">
          <div className="hv2-rail" ref={railRef} onScroll={onScroll}>
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

      <div className="hv2-dots hv2-prod-dots">
        {Array.from({ length: PAGES }, (_, k) => (
          <button
            key={k}
            type="button"
            className={`hv2-dot${k === page ? " is-on" : ""}`}
            aria-label={`Show products page ${k + 1} of ${PAGES}`}
            aria-current={k === page}
            onClick={() => goTo(k)}
          />
        ))}
      </div>

      <button
        type="button"
        className="hv2-nav hv2-prod-nav hv2-prod-nav-prev"
        aria-label="Show previous products"
        onClick={() => goTo(page - 1)}
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
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m9 6 6 6-6 6" />
        </svg>
      </button>
    </div>
  );
}
