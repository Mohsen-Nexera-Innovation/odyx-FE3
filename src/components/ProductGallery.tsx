"use client";
// Featured products as a 3D coverflow carousel across the full ODYX range (not just the
// workflow steps — the connected workflow is shown in the Ecosystem section). The focused
// product sits front-and-center with an intraoral "scan-beam" sweep; neighbours fan back in
// perspective. Auto-advances (pauses on hover); arrows, side cards and dots all navigate.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { addItem } from "@/lib/cart-store";
import { formatMoney, getProductById } from "@/content/shop";

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

/* Sub-brand line: scanning/imaging → ODYX Scanners; print/cure/materials/finishing → ODYX Digital Printing */
const BRAND_LINE: Record<string, { src: string; alt: string }> = {
  Scanning: { src: "/brand/odyx-scanners-wide.png", alt: "ODYX Scanners" },
  Imaging: { src: "/brand/odyx-scanners-wide.png", alt: "ODYX Scanners" },
  Printing: {
    src: "/brand/odyx-digital-printing.png",
    alt: "ODYX Digital Printing",
  },
  Curing: {
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
    img: "/img/feat-scanner.jpg",
    accent: "teal",
    href: "/products/intraoral-scanner",
    shopProductId: "scanner-s1",
  },
  {
    cat: "Imaging",
    name: "Intraoral Camera",
    desc: "High-definition chairside imaging for diagnosis, documentation and patient communication.",
    chips: ["HD capture", "Patient education", "Lightweight"],
    img: "/img/feat-iocamera.jpg",
    accent: "teal",
    href: "/products",
  },
  {
    cat: "Scanning",
    name: "Face Scanner",
    desc: "Captures facial geometry to align smile design with the patient's real features.",
    chips: ["3D facial map", "Smile design", "Esthetic planning"],
    img: "/img/feat-facescanner.jpg",
    accent: "teal",
    href: "/products",
  },
  {
    cat: "Scanning",
    name: "Desktop Lab Scanner",
    desc: "High-precision desktop scanning of models and impressions for the lab workflow.",
    chips: ["High precision", "Model & impression", "Fast"],
    img: "/img/feat-labscanner.jpg",
    accent: "teal",
    href: "/products",
  },
  {
    cat: "Software",
    name: "Design Software",
    desc: "Turn scan data into precise crowns, guides and models in CAD.",
    chips: ["CAD / CAM", "Crown / Guide / Model", "Precision fit"],
    img: "/img/odyx/design.webp",
    accent: "teal",
    href: "/products/design",
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
    cat: "Production",
    name: "Milling Machine",
    desc: "Precision CAD/CAM milling of zirconia and ceramic blocks for durable restorations.",
    chips: ["Wet & dry", "Zirconia / ceramic", "High accuracy"],
    img: "/img/feat-mill.jpg",
    accent: "orange",
    href: "/products",
  },
  {
    cat: "Curing Machine",
    name: "ODYX Cure",
    desc: "Controlled UV completes polymerization for final strength and biocompatibility.",
    chips: ["Controlled UV", "Full strength", "Biocompatible"],
    img: "/img/feat-curing.jpg",
    accent: "orange",
    href: "/products/curing-machines",
    shopProductId: "curing-odyx-cure",
  },
  {
    cat: "Post-Processing",
    name: "Wash Station",
    desc: "Automated cleaning of printed parts for a flawless surface before curing.",
    chips: ["Automated wash", "Clean finish", "Print-ready"],
    img: "/img/feat-wash.jpg",
    accent: "teal",
    href: "/products/3d-printers",
  },
  {
    cat: "Production",
    name: "Sintering Furnace",
    desc: "High-temperature sintering brings milled zirconia to full density and strength.",
    chips: ["High-temp", "Full density", "Zirconia"],
    img: "/img/feat-furnace.jpg",
    accent: "orange",
    href: "/products",
  },
  {
    cat: "Materials",
    name: "Resin",
    desc: "Five clinical resin lines engineered for the full ODYX workflow.",
    chips: ["5 clinical lines", "Validated", "Biocompatible"],
    img: "/img/feat-resin.jpg",
    accent: "orange",
    href: "/products/Resin",
  },
  {
    cat: "Materials",
    name: "Zirconia & Blocks",
    desc: "Premium zirconia discs and CAD/CAM blocks for milled crowns, bridges and more.",
    chips: ["Discs & blocks", "High translucency", "Durable"],
    img: "/img/feat-zirconia.jpg",
    accent: "orange",
    href: "/products/Resin",
  },
];
const N = PRODUCTS.length;

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

export default function ProductGallery() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const iv = setInterval(() => {
      if (!paused.current) setActive((a) => (a + 1) % N);
    }, 4200);
    return () => clearInterval(iv);
  }, []);

  const go = (d: number) => setActive((a) => (a + d + N) % N);
  const rel = (i: number) => {
    let o = i - active;
    if (o > N / 2) o -= N;
    if (o < -N / 2) o += N;
    return o;
  };
  const current = PRODUCTS[active];
  const shopProduct = current.shopProductId
    ? getProductById(current.shopProductId)
    : undefined;

  function onBuyNow() {
    if (!current.shopProductId) return;
    addItem(current.shopProductId, 1);
    router.push("/checkout");
  }

  /** Coverflow: active card straight; neighbors fanned in 3D */
  const cardStyle = (o: number): CSSProperties => {
    const abs = Math.abs(o);
    if (o === 0) {
      return {
        transform: "translate3d(0, 0, 56px) scale(1)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto",
      };
    }
    const x = o * 18;
    const z = -210 - (abs - 1) * 100;
    const ry = o < 0 ? 62 : -62;
    const s = abs === 1 ? 0.86 : 0.78;
    return {
      transform: `translate3d(${x}cqi, 0, ${z}px) rotateY(${ry}deg) scale(${s})`,
      opacity: abs > 2 ? 0 : abs === 1 ? 0.78 : 0.45,
      zIndex: 20 - abs,
      pointerEvents: abs > 2 ? "none" : "auto",
    };
  };

  return (
    <div
      className="pgx"
      data-accent={current.accent}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="pgx-deck">
        <div className="pgx-ring" role="listbox" aria-label="Featured products">
          {PRODUCTS.map((pr, i) => {
            const o = rel(i);
            return (
              <button
                key={pr.name}
                type="button"
                className={`pgx-card${i === active ? " on" : ""}`}
                data-accent={pr.accent}
                style={cardStyle(o)}
                onClick={() => setActive(i)}
                aria-selected={i === active}
                aria-label={pr.name}
              >
                <img src={pr.img} alt={pr.name} loading="lazy" />
                <span className="pgx-scrim" />
                {i === active && <span className="pgx-beam" aria-hidden />}
                <span className="pgx-card-tag">
                  <b>{pr.name}</b>
                  <span>{pr.cat}</span>
                </span>
              </button>
            );
          })}
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
            <button type="button" className="btn pgx-view-btn" onClick={onBuyNow}>
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
                onClick={() => setActive(i)}
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
