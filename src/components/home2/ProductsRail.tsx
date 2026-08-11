"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { HV2_DOT, HV2_DOTS, HV2_NAV } from "@/components/home2/hv2Chrome";

// Products panel from the client mock: a contained, rounded panel that holds
// the intro column (passed in as `children`) plus a horizontal snap rail of
// product-category cards, edge-mounted carousel arrows and page dots.
//
// The mock composes each card individually — different widths and different
// packshot framing per product — so every card carries its own `pr-*` class
// whose geometry lives as CSS custom properties on the rail root. Keep the two in
// sync when adding a card.

// Mock card widths and inter-card gaps (desktop only — deliberately unequal,
// carried per card as a share of the rail's own width) plus the media box's
// per-card framing. Below 980px every card drops to the same fixed basis
// (see PR_CARD_BASE's `max-[980px]:` overrides) and the framing tweaks stop
// mattering as much, but are kept for parity with the mock at every width.
const CARDS = [
  {
    key: "scanner",
    title: ["ODYX S1", "Intraoral Scanner"],
    href: "/products/odyx-s1-intraoral-scanner",
    img: "/img/hv2-cut/scanner-product.webp",
    alt: "The ODYX S1 intraoral scanner wand",
    width: "w-[17.771%] me-[2.024%]",
    // The scanner wand is much wider than tall and a white packshot —
    // force vertical centering (items-end from PR_MEDIA_BASE must lose —
    // Tailwind source order, not class-list order, decides the winner) and
    // drop the multiply blend that would otherwise wash it into the card tint.
    media: "items-center! [--art-bottom:26px]",
    mediaImg: "[mix-blend-mode:normal]! [filter:drop-shadow(0_8px_14px_rgba(10,40,90,.12))]",
  },
  {
    key: "printer",
    title: ["ODYX P1-26", "3D Printer"],
    href: "/products/odyx-p1-26",
    img: "/img/hv2-cut/printer-product.webp",
    alt: "The ODYX P1-26 resin 3D printer with red cover and touchscreen",
    width: "w-[17.690%] me-[1.954%]",
  },
  {
    key: "cure",
    title: ["ODYX Cure", "Curing Station"],
    href: "/products/curing-machines",
    img: "/img/hv2-cut/cure-product.webp",
    alt: "The ODYX Cure dental curing station",
    width: "w-[21.418%] me-[1.742%]",
    // White packshot — same multiply-blend fix as the scanner.
    mediaImg: "[mix-blend-mode:normal]! [filter:drop-shadow(0_10px_18px_rgba(10,40,90,.14))]",
    // Wider card in the mock; its device leans right, so the arrow sits left.
    arrowStart: true,
  },
  {
    key: "resin",
    title: ["ODYX", "Resins"],
    href: "/products/resins",
    img: "/img/hv2-cut/resins-product.webp",
    alt: "ODYX dental resin lines — Model, Ceramic Crown, Crown & Bridge, Surgical Guide, and Temporary",
    width: "w-[18.366%] me-[1.803%]",
    // Lift the bottles off the bottom edge so they sit mid-card; white
    // packshot, so drop the multiply blend too. Important wins over items-end.
    media: "items-center! [--art-bottom:18px]",
    mediaImg: "[mix-blend-mode:normal]! [filter:drop-shadow(0_8px_14px_rgba(10,40,90,.14))]",
  },
  {
    key: "accessories",
    title: ["Accessories"],
    href: "/shop",
    img: "/img/shop-accessories.jpg",
    alt: "Finishing and characterization accessories",
    width: "w-[17.104%]",
    // Category not live yet — shown dimmed and non-navigable.
    disabled: true,
  },
] as const;

// The mock shows four page indicators, not one per card.
const PAGES = 4;

// --- Tailwind style tables -------------------------------------------------
const PR_CARD_BASE =
  "group relative isolate overflow-hidden flex-none min-w-[148px] h-[var(--pr-card-h)] [scroll-snap-align:start] rounded-[var(--pr-radius)] border border-[rgba(10,40,90,.055)] [background:linear-gradient(180deg,#EFF1FB_0%,#EAEDF7_100%)] [box-shadow:0_14px_26px_-10px_rgba(10,40,90,.16)] [padding:var(--pr-pad-t)_var(--pr-pad)_0] transition-[transform,box-shadow] duration-[.25s] ease-out hover:-translate-y-[4px] hover:[box-shadow:0_22px_38px_-12px_rgba(10,40,90,.22)]" +
  " max-[980px]:w-auto! max-[980px]:me-0! max-[980px]:flex-[0_0_clamp(168px,23vw,210px)]!";
const PR_CARD_DISABLED =
  " opacity-[.45] [filter:saturate(.35)] cursor-default pointer-events-none hover:translate-y-0! hover:[box-shadow:0_14px_26px_-10px_rgba(10,40,90,.16)]!";

const PR_MEDIA_BASE =
  "absolute [inset:var(--art-top,68px)_var(--art-pad,10px)_var(--art-bottom,10px)] flex items-end justify-center";
const PR_MEDIA_IMG_BASE = "block w-auto h-auto max-w-full max-h-full [mix-blend-mode:multiply]";

const PR_GO_BASE =
  "absolute z-[2] bottom-[var(--pr-go-bottom)] end-[var(--pr-go-inset)] w-[var(--pr-go)] h-[var(--pr-go)] rounded-full text-[var(--hv2-blue)] border border-[rgba(26,58,132,.30)] bg-[rgba(255,255,255,.55)] [box-shadow:0_0_16px_7px_rgba(255,255,255,.5)] grid place-items-center transition-[background-color,color,border-color] duration-200" +
  " [&>svg]:w-[18px] [&>svg]:h-[18px] rtl:[&>svg]:scale-x-[-1]" +
  " group-hover:bg-[var(--hv2-blue)] group-hover:text-white group-hover:border-[var(--hv2-blue)]";
const PR_GO_START = " start-[var(--pr-go-inset)]! end-auto!";
const PR_GO_ON_DARK =
  " text-white! border-[rgba(255,255,255,.8)]! bg-transparent! [box-shadow:0_0_18px_4px_rgba(255,255,255,.4)]!" +
  " group-hover:bg-white! group-hover:text-[var(--hv2-blue)]! group-hover:border-white!";

const PROD_NAV_BASE =
  `${HV2_NAV} absolute! bottom-[calc(42px+var(--pr-card-h)/2+2.2px)]! z-[6]! w-[var(--pr-nav)]! h-[var(--pr-nav)]! text-[var(--hv2-blue)]! border! border-[rgba(10,40,90,.07)]! [box-shadow:0_6px_18px_rgba(10,40,90,.13)]! [&>svg]:w-[24px]! [&>svg]:h-[24px]!`;
const PROD_NAV_PREV = "start-[3px]! [translate:-50%_50%]! rtl:[translate:50%_50%]!";
const PROD_NAV_NEXT = "end-[3px]! [translate:50%_50%]! rtl:[translate:-50%_50%]!";

const PROD_DOTS = `${HV2_DOTS} gap-[23.5px]! mt-[5px]!`;
const PROD_DOT =
  `${HV2_DOT} w-[11px]! h-[11px]! rounded-full! bg-[rgba(10,30,70,.19)]! transition-[background-color]! duration-[.25s]!`;
const PROD_DOT_ON = " bg-[var(--hv2-blue)]!";

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
    <div className="relative [padding:var(--pr-band-y,clamp(20px,2.5vw,32px))_var(--pr-panel-pad-i)_0]">
      <div className="grid [grid-template-columns:clamp(240px,19vw,280px)_minmax(0,1fr)] gap-[clamp(24px,3.958vw,70px)] items-start max-[980px]:grid-cols-1! max-[980px]:gap-[clamp(20px,3.4vw,34px)]!">
        {children}

        <div className="min-w-0 relative rv" data-rv="1">
          <div
            className="flex overflow-x-auto [padding-block:6px_18px] [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-[980px]:gap-4!"
            ref={railRef}
            onScroll={measure}
          >
            {CARDS.map((c) => {
              const disabled = "disabled" in c && c.disabled;
              const onDark = "onDark" in c && c.onDark;
              const arrowStart = "arrowStart" in c && c.arrowStart;
              const inner = (
                <>
                  <span className={`${PR_MEDIA_BASE} ${"media" in c ? c.media : ""}`}>
                    <img
                      className={`${PR_MEDIA_IMG_BASE} ${"mediaImg" in c ? c.mediaImg : ""}`}
                      src={c.img}
                      alt={c.alt}
                      loading="lazy"
                    />
                  </span>
                  <h3 className="relative z-[2] text-[length:var(--pr-title)] [line-height:var(--pr-title-lh)] font-medium [letter-spacing:-.004em]">
                    <span className="text-[length:var(--pr-title)]">{c.title[0]}</span>
                    {c.title[1] ? (
                      <>
                        <br />
                        {c.title[1]}
                      </>
                    ) : null}
                  </h3>
                  <span
                    className={`${PR_GO_BASE}${arrowStart ? PR_GO_START : ""}${onDark ? PR_GO_ON_DARK : ""}`}
                    aria-hidden
                  >
                    <ArrowRight />
                  </span>
                </>
              );
              const cls = `hv2-pr-card ${PR_CARD_BASE} ${c.width}${disabled ? PR_CARD_DISABLED : ""}`;
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
        <div className={PROD_DOTS}>
          {Array.from({ length: stopCount }, (_, k) => (
            <button
              key={k}
              type="button"
              className={`${PROD_DOT}${k === page ? PROD_DOT_ON : ""}`}
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
            className={`${PROD_NAV_BASE} ${PROD_NAV_PREV}`}
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
            className={`${PROD_NAV_BASE} ${PROD_NAV_NEXT}`}
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
