import Link from "next/link";
import ClinicalApplicationsSection from "@/components/home2/ClinicalApplicationsSection";
import EcoPrinterVideo from "@/components/home2/EcoPrinterVideo";
import ClinicalCasesShowcase from "@/components/home2/ClinicalCasesShowcase";
import HubCardsSection from "@/components/home2/HubCardsSection";
import Hv2Footer from "@/components/home2/Hv2Footer";
import Hv2Motion from "@/components/home2/Hv2Motion";
import LatestUpdatesSection from "@/components/home2/LatestUpdatesSection";
import PathCarousel from "@/components/home2/PathCarousel";
import ProductsRail from "@/components/home2/ProductsRail";
import WhyOdyxOrbit from "@/components/home2/WhyOdyxOrbit";

// Home V2 — rebuild of the home screen to the client hero-collage mock
// (light surfaces, action blue #0050D8, orbit hero, why-pillars, path
// carousel, radial ecosystem, products rail). Copy is claim-free marketing;
// no catalog numbers appear on this screen.

const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const IC = {
  tooth: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7.5 3.2C5.4 3.2 3.8 4.9 3.8 7c0 1.4.4 2.5.9 4 .5 1.4.7 2.8.9 4.6.2 1.5.4 3 1.3 3 .9 0 1.1-1.4 1.4-2.7.2-1.2.5-2.3 1.2-2.3s1 1.1 1.2 2.3c.3 1.3.5 2.7 1.4 2.7.9 0 1.1-1.5 1.3-3 .2-1.8.4-3.2.9-4.6.5-1.5.9-2.6.9-4 0-2.1-1.6-3.8-3.7-3.8-1.2 0-2 .6-2.6.6s-1.4-.6-2.6-.6Z" />
    </svg>
  ),
  cube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z" />
      <path d="M3.3 8.4 12 13.4l8.7-5M12 21v-7.6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  diamond: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 4h12l4 5-10 12L2 9l4-5Z" />
      <path d="M2 9h20M9.5 4 8 9l4 12M14.5 4 16 9l-4 12" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2.6 20 7.2v9.6l-8 4.6-8-4.6V7.2l8-4.6Z" />
      <path d="M12 8.4l3.1 1.8v3.6L12 15.6l-3.1-1.8v-3.6L12 8.4Z" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  scanOrbit: (
    // Mock's scanner badge: centre aperture ring + orbiting capture dots.
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3.4" />
      <path d="M5.2 9.4a7.3 7.3 0 0 1 3-3.4M18.8 14.6a7.3 7.3 0 0 1-3 3.4" />
      <circle cx="17.6" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="6.4" cy="17.2" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    </svg>
  ),
  printer: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="6" y="9" width="12" height="8" rx="1" />
      <path d="M6 17v3h12v-3M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
} as const;

// Ecosystem art: soft-feathered patches cut from the client mock
// (public/img/hv2-eco/, 2x). Each node patch bakes the product, its
// white halo ring and glow; icons + labels are DOM on top.
const ECO_NODES = [
  { key: "scanner", label: "Scanner", icon: "scanOrbit" },
  { key: "resin", label: "Resin", icon: "drop" },
  { key: "printer", label: "Printer", icon: "cube" },
  { key: "software", label: "Software", icon: "monitor" },
  { key: "cure", label: "Cure", icon: "sun" },
] as const;

export default function HomeV2Page() {
  return (
    <div className="hv2" id="top">
      {/* ===== 1 · Hero — headline + orbit product collage ===== */}
      <section className="hv2-hero" data-hero-light id="hero">
        {/* The hero band is the client's 2048x628 desktop composition;
            copy and collage are placed in those reference pixels (--u)
            so the whole band scales as one piece. */}
        <div className="hv2-hero-band">
          <div className="hv2-hero-copy">
            <p className="hv2-eyebrow rv">Digital Dentistry Reimagined</p>
            <h1 className="hv2-h1 rv" data-rv="1">
              One Ecosystem.
              <br />
              Endless <span className="hv2-blue">Possibilities.</span>
            </h1>
            <p className="hv2-lead rv" data-rv="2">
              Everything you need for digital dentistry in one seamless
              ecosystem.
            </p>
            <div className="rv" data-rv="3">
              <Link className="hv2-btn hv2-hero-cta" href="/support">
                <span>Request a Demo</span>
                <Arrow s={23} />
              </Link>
            </div>
          </div>

          {/* Real product cutouts (same photography as the product
              screens, prepared in /img/hv2-cut/) over glowing orbit
              sweeps, with soft floor shadows and DOM icon bubbles. */}
          <div className="hv2-orbit rv" data-rv="2" aria-hidden>
            <svg className="hv2-o-orbits" viewBox="0 0 2048 628" fill="none" aria-hidden>
              <g transform="rotate(-8 1340 320)" stroke="#fff" strokeLinecap="round">
                <ellipse cx="1340" cy="315" rx="655" ry="252" strokeWidth="9" opacity=".22" />
                <ellipse cx="1340" cy="315" rx="655" ry="252" strokeWidth="2.2" opacity=".85" />
                <ellipse cx="1310" cy="348" rx="520" ry="196" strokeWidth="1.8" opacity=".5" />
              </g>
              <ellipse cx="1430" cy="295" rx="735" ry="296" transform="rotate(-8 1430 295)" stroke="#7FA8F2" strokeWidth="2.4" opacity=".55" strokeLinecap="round" />
            </svg>
            <i className="hv2-o-sh hv2-sh-scanner" />
            <i className="hv2-o-sh hv2-sh-cure" />
            <i className="hv2-o-sh hv2-sh-printers" />
            <i className="hv2-o-sh hv2-sh-resins" />
            <img className="hv2-o-img hv2-o-scanner" src="/img/hv2-cut/scanner-product.webp" alt="" />
            <img className="hv2-o-img hv2-o-cure" src="/img/hv2-cut/cure-product.webp" alt="" />
            <img className="hv2-o-img hv2-o-printers" src="/img/hv2-cut/printer-product.webp" alt="" />
            <img className="hv2-o-img hv2-o-resins" src="/img/hv2-cut/resins-product.webp" alt="" />
            <span className="hv2-chip hv2-chip-tooth">{IC.tooth}</span>
            <span className="hv2-chip hv2-chip-cube">{IC.cube}</span>
            <span className="hv2-chip hv2-chip-target">{IC.target}</span>
            <span className="hv2-chip hv2-chip-diamond">{IC.diamond}</span>
          </div>
        </div>

        {/* ===== 2 · Why ODYX — orbit infographic on the hero backdrop ===== */}
        <WhyOdyxOrbit />
      </section>

      {/* ===== 3 · Choose your path ===== */}
      <section className="hv2-sec" id="path">
        <div className="hv2-wrap hv2-center rv">
          <p className="hv2-eyebrow">Choose Your Path</p>
          <h2 className="hv2-h2">
            Your Journey. <span className="hv2-blue">Your Solution.</span>
          </h2>
        </div>
        <PathCarousel />
      </section>

      {/* ===== 4 + 5 · Ecosystem and Products ==========================
           One shared panel in the mock: a single border, radius and
           background wrap both bands, so neither section carries a card
           surface of its own and they meet on a straight edge. */}
      <div className="hv2-stack">
        <div className="hv2-stack-in">
          <section className="hv2-eco rv" id="ecosystem">
            <div className="hv2-eco-bg" aria-hidden>
              {/* Orbit sweeps behind the composition; clipped to the panel. */}
              <svg className="hv2-eco-orbits" viewBox="0 0 1358 485" preserveAspectRatio="none" aria-hidden>
                <g fill="none" stroke="#fff" strokeLinecap="round">
                  <ellipse cx="732" cy="200" rx="380" ry="255" strokeWidth="7" opacity=".16" />
                  <ellipse cx="732" cy="200" rx="380" ry="255" strokeWidth="2" opacity=".65" />
                  <ellipse cx="775" cy="212" rx="432" ry="292" strokeWidth="1.6" opacity=".38" />
                </g>
              </svg>
              {/* Silk light ribbon on the right, cut from the mock art. */}
              <img className="hv2-eco-silk" src="/img/hv2-eco/eco-swoosh.webp" alt="" loading="lazy" />
            </div>
            <div className="hv2-eco-copy">
              <p className="hv2-eyebrow">Ecosystem</p>
              <h2 className="hv2-h2">
                Everything
                <br />
                works better
                <br />
                <span className="hv2-blue">together.</span>
              </h2>
              <p className="hv2-body">
                A seamless ecosystem where every product is designed to work in
                perfect harmony.
              </p>
            </div>
            <div className="hv2-eco-stage">
              <img
                className="hv2-eco-patch hv2-eco-p-mouth"
                src="/img/hv2-eco/eco-mouth.webp"
                alt="Intraoral scanner capturing a patient's teeth with blue structured light"
              />
              {ECO_NODES.map((n) => (
                <img
                  className={`hv2-eco-patch hv2-eco-p-${n.key}`}
                  src={`/img/hv2-eco/eco-${n.key}.webp`}
                  alt=""
                  loading="lazy"
                  key={n.key}
                />
              ))}
              {ECO_NODES.map((n) => (
                <div className={`hv2-eco-node hv2-eco-n-${n.key}`} key={n.key}>
                  <span className="hv2-eco-ic" aria-hidden>{IC[n.icon]}</span>
                  <span className="hv2-eco-lbl">{n.label}</span>
                </div>
              ))}
              <EcoPrinterVideo />
              <a className="hv2-eco-more" href="#products" aria-label="Continue to products">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </a>
            </div>
          </section>

          <section className="hv2-prod" id="products">
            <ProductsRail>
              <div className="hv2-prod-intro rv">
                <p className="hv2-eyebrow">Products</p>
                <h2 className="hv2-h2">
                  Built for precision.
                  <br />
                  Designed for <span className="hv2-blue">you.</span>
                </h2>
                <p className="hv2-body">
                  Explore our complete range of digital dentistry solutions.
                </p>
                <Link className="hv2-btn hv2-btn-ghost hv2-prod-cta" href="/products">
                  <span>Explore All Products</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 12h15M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </ProductsRail>
          </section>
        </div>
      </div>

      {/* ===== 6 · Clinical applications ===== */}
      <ClinicalApplicationsSection />

      {/* ===== 7 · Clinical cases — the mirrored deck ===== */}
      <ClinicalCasesShowcase />

      {/* ===== 8 · Ecosystem hub — Learning / Support / Store / Registration ===== */}
      <HubCardsSection />

      {/* ===== 9 · Latest updates — five-up update carousel ===== */}
      <LatestUpdatesSection />

      {/* ===== 10 · Footer — the mock's navy band (replaces the global one) ===== */}
      <Hv2Footer />

      <Hv2Motion />
    </div>
  );
}
