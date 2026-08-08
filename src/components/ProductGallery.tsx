"use client";
// Featured products — 3-slot coverflow (left / center / right). Cards enter and exit
// from the sides via motion; no circular CSS-transform wrap, so nothing flies through center.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type WheelEvent, type KeyboardEvent } from "react";
import { formatMoney, getProductById } from "@/content/shop";
import { readSession } from "@/lib/auth";
import { addItemAsync, resolveCartProductId } from "@/lib/commerce";

type Accent = "teal" | "orange";
interface Product {
  cat: string;
  name: string;
  desc: string;
  chips: string[];
  img: string;
  accent: Accent;
  href: string;
  /** When set, Featured Products shows Add to cart / Buy now for this shop SKU */
  shopProductId?: string;
}

/* Sub-brand line: scanners → ODYX Scanners; print/cure/materials → ODYX Digital Printing */
const BRAND_LINE: Record<string, { src: string; alt: string }> = {
  Scanner: { src: "/brand/odyx-scanners-wide.png", alt: "ODYX Scanners" },
  Scanning: { src: "/brand/odyx-scanners-wide.png", alt: "ODYX Scanners" },
  Imaging: { src: "/brand/odyx-scanners-wide.png", alt: "ODYX Scanners" },
  Printer: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  Printing: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  Curing: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  "Curing Machine": {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  "Post-Processing": {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  Materials: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  Finishing: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
};

const PRODUCTS: Product[] = [
  {
    cat: "Scanner",
    name: "ODYX-S1",
    desc: "Real-time 3D digital impressions, chairside - no molds, just instant accurate data.",
    chips: ["~20s capture", "Open .STL", "Powder-free"],
    img: "/img/scanner/s1-hero.png",
    accent: "teal",
    href: "/products/odyx-s1-intraoral-scanner",
    shopProductId: "scanner-s1",
  },
  {
    cat: "Printer",
    name: "ODYX P1-26",
    desc: "Crowns, guides, models & dentures printed in-house, layer by layer.",
    chips: ["Layer-by-layer", "ODYX resin", "In-house"],
    img: "/img/feat-printer.jpg",
    accent: "orange",
    href: "/products/3d-printers",
    shopProductId: "printer-p1-26",
  },
  {
    cat: "Curing Machine",
    name: "ODYX Cure",
    desc: "Controlled UV completes polymerization for final strength and biocompatibility.",
    chips: ["Controlled UV", "Full strength", "Biocompatible"],
    img: "/img/cure-uv02/hero/machine-cutout.png",
    accent: "orange",
    href: "/products/curing-machines",
    shopProductId: "curing-odyx-cure",
  },
  {
    cat: "Materials",
    name: "Resin",
    desc: "Five clinical resin lines engineered for the full ODYX workflow.",
    chips: ["5 clinical lines", "Validated", "Biocompatible"],
    img: "/img/resins/all-resins-cutout.png",
    accent: "orange",
    href: "/products/resins",
    shopProductId: "resin-odyx",
  },
];
const N = PRODUCTS.length;
const SLOTS = [-1, 0, 1] as const;
type Slot = (typeof SLOTS)[number];

const spring = { type: "spring" as const, stiffness: 280, damping: 32, mass: 0.85 };

/** Shortest signed step on a circular list of length N. */
function shortestDelta(from: number, to: number) {
  let d = to - from;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

function poseFor(slot: Slot, sideX: number) {
  if (slot === 0) {
    return { x: 0, rotateY: 0, scale: 1, opacity: 1, z: 48 };
  }
  if (slot < 0) {
    return { x: -sideX, rotateY: 34, scale: 0.86, opacity: 0.9, z: -130 };
  }
  return { x: sideX, rotateY: -34, scale: 0.86, opacity: 0.9, z: -130 };
}

function enterPose(dir: number, flyX: number) {
  return {
    x: dir >= 0 ? flyX : -flyX,
    rotateY: dir >= 0 ? -46 : 46,
    scale: 0.72,
    opacity: 0,
    z: -240,
  };
}

function exitPose(dir: number, flyX: number) {
  return {
    x: dir >= 0 ? -flyX : flyX,
    rotateY: dir >= 0 ? 46 : -46,
    scale: 0.72,
    opacity: 0,
    z: -240,
  };
}

const Arrow = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const Chevron = ({ left }: { left?: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {left ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

const DRAG_THRESHOLD = 48;
const WHEEL_COOLDOWN_MS = 550;

export default function ProductGallery() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ringW, setRingW] = useState(640);
  const [dragging, setDragging] = useState(false);
  const paused = useRef(false);
  const activeRef = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const wheelLockRef = useRef(0);
  activeRef.current = active;

  useEffect(() => {
    const el = ringRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setRingW(w);
    });
    ro.observe(el);
    setRingW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const sideX = Math.round(ringW * 0.34);
  const flyX = Math.round(ringW * 0.58);

  const moveTo = (next: number | ((a: number) => number)) => {
    const a = activeRef.current;
    const target =
      (((typeof next === "function" ? next(a) : next) % N) + N) % N;
    if (target === a) return;
    const delta = shortestDelta(a, target);
    setDirection(delta >= 0 ? 1 : -1);
    setActive(target);
  };

  const moveToRef = useRef(moveTo);
  moveToRef.current = moveTo;

  useEffect(() => {
    if (reduceMotion) return;
    const iv = setInterval(() => {
      if (!paused.current) moveToRef.current((cur) => cur + 1);
    }, 4200);
    return () => clearInterval(iv);
  }, [reduceMotion]);

  const go = (d: number) => moveTo((a) => a + d);

  const endDrag = (clientX: number) => {
    const drag = dragRef.current;
    dragRef.current = null;
    setDragging(false);
    if (!drag) return;
    const dx = clientX - drag.startX;
    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      suppressClickRef.current = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const onDeckPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest(".pgx-nav")) return;
    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      moved: false,
    };
    deckRef.current?.setPointerCapture(e.pointerId);
  };

  const onDeckPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    if (!drag.moved && Math.hypot(dx, dy) > 6) {
      drag.moved = true;
      setDragging(true);
    }
  };

  const onDeckPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    if (deckRef.current?.hasPointerCapture(e.pointerId)) {
      deckRef.current.releasePointerCapture(e.pointerId);
    }
    endDrag(e.clientX);
  };

  const onDeckPointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
  };

  const onDeckWheel = (e: WheelEvent<HTMLDivElement>) => {
    // Prefer horizontal trackpad/mouse gestures so vertical page scroll stays free
    if (Math.abs(e.deltaX) < Math.abs(e.deltaY) || Math.abs(e.deltaX) < 10) return;
    const now = Date.now();
    if (now < wheelLockRef.current) return;
    wheelLockRef.current = now + WHEEL_COOLDOWN_MS;
    go(e.deltaX > 0 ? 1 : -1);
  };

  const current = PRODUCTS[active];
  const shopProduct = current.shopProductId
    ? getProductById(current.shopProductId)
    : undefined;

  async function onBuyNow() {
    if (!current.shopProductId) return;
    if (!readSession()) {
      router.push("/login");
      return;
    }
    const id =
      (await resolveCartProductId(current.shopProductId)) ?? current.shopProductId;
    await addItemAsync(id, 1);
    router.push("/checkout");
  }

  const visible = SLOTS.map((slot) => ({
    slot,
    index: (active + slot + N) % N,
  }));

  const transition = reduceMotion ? { duration: 0 } : spring;

  return (
    <div
      className="pgx"
      data-accent={current.accent}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div
        ref={deckRef}
        className={`pgx-deck${dragging ? " is-dragging" : ""}`}
        onPointerDown={onDeckPointerDown}
        onPointerMove={onDeckPointerMove}
        onPointerUp={onDeckPointerUp}
        onPointerCancel={onDeckPointerCancel}
        onWheel={onDeckWheel}
      >
        <div
          ref={ringRef}
          className="pgx-ring"
          role="listbox"
          aria-label="Featured products"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(-1);
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              go(1);
            }
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {visible.map(({ slot, index }) => {
              const pr = PRODUCTS[index];
              const on = slot === 0;
              return (
                <motion.button
                  key={pr.name}
                  type="button"
                  className={`pgx-card${on ? " on" : ""}`}
                  data-accent={pr.accent}
                  initial={enterPose(direction, flyX)}
                  animate={poseFor(slot, sideX)}
                  exit={exitPose(direction, flyX)}
                  transition={transition}
                  style={{ zIndex: on ? 30 : 20, transformPerspective: 1200 }}
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    if (!on) moveTo(index);
                  }}
                  aria-selected={on}
                  aria-label={pr.name}
                >
                  <img src={pr.img} alt={pr.name} loading="lazy" draggable={false} />
                  <span className="pgx-scrim" />
                  {on && !reduceMotion && (
                    <span className="pgx-beam" aria-hidden />
                  )}
                  <span className="pgx-card-tag">
                    <b>{pr.name}</b>
                    <span>{pr.cat}</span>
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
        <button
          className="pgx-nav prev"
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous product"
        >
          <Chevron left />
        </button>
        <button
          className="pgx-nav next"
          type="button"
          onClick={() => go(1)}
          aria-label="Next product"
        >
          <Chevron />
        </button>
      </div>

      <div className="pgx-side">
        <div className="pgx-info" key={`info-${active}`}>
          {BRAND_LINE[current.cat] && (
            <img
              className="pgx-brand"
              src={BRAND_LINE[current.cat].src}
              alt={BRAND_LINE[current.cat].alt}
              loading="lazy"
            />
          )}
          <span className="eyebrow">{current.cat}</span>
          <h3>{current.name}</h3>
          <p>{current.desc}</p>
          <div className="pg-chips">
            {current.chips.map((c) => (
              <span key={c} className="pg-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="pgx-actions" key={`cta-${active}`}>
          {shopProduct ? (
            <button type="button" className="btn pgx-view-btn" onClick={() => void onBuyNow()}>
              Buy now — {formatMoney(shopProduct.price)} <Arrow />
            </button>
          ) : (
            <Link
              className="btn pgx-view-btn"
              href={current.href}
              aria-label={`View ${current.name}`}
            >
              View product <Arrow />
            </Link>
          )}
        </div>
        <div className="pgx-foot">
          <span className="pgx-count">
            <b>{String(active + 1).padStart(2, "0")}</b> /{" "}
            {String(N).padStart(2, "0")}
          </span>
          <div className="pgx-dots" role="tablist" aria-label="Choose product">
            {PRODUCTS.map((pr, i) => (
              <button
                key={pr.name}
                type="button"
                className={`pgx-dot${i === active ? " on" : ""}`}
                data-accent={pr.accent}
                onClick={() => moveTo(i)}
                aria-current={i === active}
                aria-label={pr.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
