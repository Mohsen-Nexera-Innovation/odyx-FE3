/* ODYX home - ported from Sample/index.html (3D journey hero excluded). Static markup;
   animations are applied by <OdyxMotion/>. Same classes/flavour as the Sample stylesheet. */
import HeroJourney from "./HeroJourney";
import WhyOdyx from "./WhyOdyx";
import NewsShowcase from "./NewsShowcase";
import ProductGallery from "./ProductGallery";
import RegisterDevice from "./RegisterDevice";
import EcosystemHighlights from "./EcosystemHighlights";
import ClinicalBento from "./ClinicalBento";
import CaseSpotlight from "./CaseSpotlight";
import LearningTabs from "./LearningTabs";
import SupportHub from "./SupportHub";
import { FOOTER_COLUMNS } from "@/content/nav";
import SecHead from "@/components/SecHead";

const PathUpArrow = ({ s = 22 }: { s?: number }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 19V5" />
    <path d="M7 10l5-5 5 5" />
  </svg>
);

const PathLane = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="path-lane">
    <div className="path-guide" aria-hidden="true">
      <span className="path-guide-head">
        <PathUpArrow />
      </span>
    </div>
    {children}
  </div>
);

const Arrow = ({ s = 16 }: { s?: number }) => (
  <svg
    width={s}
    height={s}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
const I = {
  scan: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  design: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h18v14H3zM3 21h18M9 17v4M15 17v4" />
      <path d="M7 9l3 3-3 3" />
    </svg>
  ),
  print: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="9" width="12" height="8" rx="1" />
      <path d="M6 17v3h12v-3M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
    </svg>
  ),
  labprint: (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 11c0-1 .6-1.7 1.3-2.6C10 7.5 10.4 6.7 12 6.7s2 .8 2.7 1.7C15.4 9.3 16 10 16 11c0 1.1-.3 2-.6 3.1-.3 1-.4 2-.6 3.1-.1.9-.3 1.7-.9 1.7-.6 0-.7-.9-.9-1.7-.2-.9-.4-1.6-1-1.6s-.8.7-1 1.6c-.2.8-.3 1.7-.9 1.7-.6 0-.8-.8-.9-1.7-.2-1.1-.3-2.1-.6-3.1C8.3 13 8 12.1 8 11Z" />
      <path d="M4 5h16" />
      <path d="M6 5 5 2M18 5l1-3" />
    </svg>
  ),
  cure: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>
  ),
  finish: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19l7-7a4 4 0 0 0-6-6l-1 1-1-1a4 4 0 0 0-6 6l7 7z" />
    </svg>
  ),
  deliver: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  resin: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 8h14l-1 12H6L5 8zM8 8V6a4 4 0 0 1 8 0v2" />
    </svg>
  ),
};
const PH = ({ label }: { label: string }) => (
  <div className="ph">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M3 17l5-4 4 3 5-5 4 4" />
    </svg>
    <small>{label}</small>
  </div>
);
const PATHS = [
  {
    t: "Dentist",
    d: "Go fully digital with same-day restorations, implant guides and chairside workflows.",
    cta: "Enter clinic journey",
    img: "/img/path-dentist.jpg",
  },
  {
    t: "Lab Technician",
    d: "Move from milling to 3D printing with high-volume production and CAD/CAM integration.",
    cta: "Enter lab journey",
    img: "/img/path-lab.jpg",
  },
  {
    t: "Guest",
    d: "Just exploring? Browse the ecosystem and see how every ODYX product connects.",
    cta: "Explore freely",
    img: "/img/path-guest.jpg",
  },
];
const ECO = [
  ["scan", "Scanner", "01"],
  ["design", "Design Software", "02"],
  ["print", "3D Printer", "03"],
  ["cure", "Curing Machine", "04"],
  ["resin", "Resin", "05"],
] as const;
const FEAT = [
  {
    i: "scan",
    t: "Intraoral Scanner",
    d: "Real-time 3D digital impressions, chairside.",
    img: "/img/feat-scanner.jpg",
  },
  {
    i: "print",
    t: "3D Printer",
    d: "Crowns, guides, models & dentures in-house.",
    img: "/img/feat-printer.jpg",
  },
  {
    i: "cure",
    t: "Curing Machine",
    d: "Controlled UV for final strength.",
    img: "/img/feat-curing.jpg",
  },
  {
    i: "resin",
    t: "Resin",
    d: "Five clinical resin lines.",
    img: "/img/feat-resin.jpg",
  },
] as const;
export default function Home() {
  return (
    <div id="top">
      {/* ===== HERO (non-3D) ===== */}
      <section className="page-hero hero-wrap" id="hero">
        {/* full-bleed video hero: scan -> smile, stepper synced to the video */}
        <HeroJourney />
      </section>

      <WhyOdyx />

      {/* ===== Choose Your Path ===== */}
      <section className="sec sec-mint sec-motion" id="path">
        <div className="wrap">
          <SecHead eyebrow="Choose Your Path" />
          <div className="path-stage m-fan">
            {/* Dentist */}
            <PathLane>
            <a href="/solutions/dentists" className="pcard teal">
              <div className="pcard-art">
                <img
                  className="pimg parallax"
                  src="/img/paths/dentist.jpg"
                  alt="Dentist using a chairside scanner"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M7.5 3.2C5.4 3.2 3.8 4.9 3.8 7c0 1.4.4 2.5.9 4 .5 1.4.7 2.8.9 4.6.2 1.5.4 3 1.3 3 .9 0 1.1-1.4 1.4-2.7.2-1.2.5-2.3 1.2-2.3s1 1.1 1.2 2.3c.3 1.3.5 2.7 1.4 2.7.9 0 1.1-1.5 1.3-3 .2-1.8.4-3.2.9-4.6.5-1.5.9-2.6.9-4 0-2.1-1.6-3.8-3.7-3.8-1.2 0-2 .6-2.6.6s-1.4-.6-2.6-.6Z" />
                  </svg>
                </div>
                <h3>Dentist</h3>
                <p>
                  Go fully digital with same-day restorations, implant guides
                  and chairside workflows.
                </p>
                <span className="more">
                  Enter clinic journey <Arrow />
                </span>
              </div>
            </a>
            </PathLane>

            {/* Lab Technician */}
            <PathLane>
            <a href="/solutions/labs" className="pcard">
              <div className="pcard-art">
                <img
                  className="pimg parallax"
                  src="/img/paths/lab.jpg"
                  alt="Dental lab production equipment"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">{I.labprint}</div>
                <h3>Lab Technician</h3>
                <p>
                  Move from milling to 3D printing with high-volume production
                  and CAD/CAM integration.
                </p>
                <span className="more">
                  Enter lab journey <Arrow />
                </span>
              </div>
            </a>
            </PathLane>

            {/* Guest */}
            <PathLane>
            <a href="/workflows" className="pcard teal">
              <div className="pcard-art">
                <img
                  className="pimg parallax"
                  src="/img/paths/guest.jpg"
                  alt="Digital dentistry on screen"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
                  </svg>
                </div>
                <h3>Guest</h3>
                <p>
                  Just exploring? Browse the ecosystem and see how every ODYX
                  product connects.
                </p>
                <span className="more">
                  Explore freely <Arrow />
                </span>
              </div>
            </a>
            </PathLane>
          </div>
        </div>
      </section>

      {/* ===== Legacy ecosystem map (hidden - superseded by the workflow stepper below) ===== */}
      <section className="sec" id="ecosystem-map" hidden>
        <div className="wrap">
          <SecHead eyebrow="ODYX Ecosystem" />
          <div className="eco" id="ecoFlow">
            <svg
              className="eco-flow-svg"
              viewBox="0 0 1000 60"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ecoGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#06a5df" />
                  <stop offset="1" stopColor="#0D9696" />
                </linearGradient>
                <radialGradient id="ecoPulseG" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#06a5df" stopOpacity="1" />
                  <stop offset="100%" stopColor="#06a5df" stopOpacity="0" />
                </radialGradient>
              </defs>
              <line
                className="eco-base"
                x1="40"
                y1="30"
                x2="960"
                y2="30"
                stroke="rgba(255,255,255,.12)"
                strokeWidth="2"
              />
              <line
                className="eco-draw"
                x1="40"
                y1="30"
                x2="960"
                y2="30"
                stroke="url(#ecoGrad)"
                strokeWidth="2.5"
              />
              <circle
                className="eco-pulse-glow"
                cx="40"
                cy="30"
                r="16"
                fill="url(#ecoPulseG)"
              />
              <circle
                className="eco-pulse"
                cx="40"
                cy="30"
                r="5"
                fill="#06a5df"
              />
            </svg>
            {ECO.map(([icon, label, step], k) => (
              <a
                key={label}
                href="#featured"
                className="eco-node build"
                data-node={k}
              >
                <div className="eco-ic">{I[icon]}</div>
                <span>{label}</span>
                <small className="eco-step">Step {step}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== The ODYX Ecosystem (Get the highlights video slider) ===== */}
      <section className="sec sec-orange sec-motion" id="ecosystem">
        <div className="wrap">
          <SecHead eyebrow="ODYX Ecosystem" />
        </div>
        <div className="m-scale">
          <EcosystemHighlights />
        </div>
        <div className="wrap">
          <div
            className="reveal"
            style={{ marginTop: 36, textAlign: "center" }}
          >
            <a className="btn" href="/workflows">
              Open the Workflow Hub →
            </a>
          </div>
        </div>
      </section>

      {/* ===== Featured Products ===== */}
      <section className="sec sec-teal sec-motion" id="featured">
        <div className="wrap">
          <SecHead
            eyebrow="Featured Products"
            action={
              <a className="btn btn-ghost btn-sm" href="/products">
                All products →
              </a>
            }
          />
          <div className="pgx-stage">
            <ProductGallery />
          </div>
        </div>
      </section>

      {/* ===== Clinical Applications ===== */}
      <section className="sec sec-orange sec-motion" id="clinical">
        <div className="wrap">
          <SecHead eyebrow="Clinical Applications" />
          <ClinicalBento />
        </div>
      </section>

      {/* ===== Case Library ===== */}
      <section className="sec sec-orange sec-motion" id="cases-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Proof"
            action={
              <a className="btn btn-ghost btn-sm" href="/learning">
                Browse all cases →
              </a>
            }
          />
          <CaseSpotlight />
        </div>
      </section>
      <section className="sec sec-teal sec-motion" id="learning-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Learn"
            action={
              <a className="btn btn-ghost btn-sm" href="/learning">
                Enter academy →
              </a>
            }
          />
          <LearningTabs />
        </div>
      </section>

      {/* ===== Support preview ===== */}
      <section className="sec sec-orange sec-motion" id="support-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Help"
            action={
              <a className="btn btn-ghost btn-sm" href="/support">
                Visit support →
              </a>
            }
          />
          <SupportHub />
        </div>
      </section>

      {/* ===== Latest News ===== */}
      <section className="sec sec-teal sec-motion" id="news">
        <div className="wrap">
          <SecHead
            eyebrow="Latest News"
            action={
              <a className="btn btn-ghost btn-sm" href="/about">
                All news →
              </a>
            }
          />
          <div className="m-up">
            <NewsShowcase />
          </div>
        </div>
      </section>

      {/* ===== Register Device ===== */}
      <section className="sec sec-orange sec-motion" id="register">
        <div className="wrap">
          <SecHead eyebrow="Device Registration" />
          <div className="m-left">
            <RegisterDevice />
          </div>
        </div>
      </section>

      {/* ===== Shop ===== */}
      <section className="sec sec-orange sec-motion" id="shop">
        <div className="wrap">
          <SecHead eyebrow="ODYX Store" />
          <div className="shop-flow">
            <div className="pulse-line" />
            <div className="shop-grid build-group">
              {[
                [
                  "Clinical Resin",
                  "Permanent crown, ceramic, temporary, model & surgical-guide lines.",
                  "From $-",
                  "Buy online",
                  "/img/shop-resin.jpg",
                ],
                [
                  "Accessories & Consumables",
                  "Build plates, tanks and everyday workflow consumables.",
                  "From $-",
                  "Buy online",
                  "/img/shop-accessories.jpg",
                ],
                [
                  "Demo & Brochure",
                  "Book a live demo or download the full ODYX product brochure.",
                  "Free",
                  "Request a demo",
                  "/img/shop-brochure.jpg",
                ],
              ].map(([t, d, price, cta, img]) => (
                <div key={t} className="shop-card build">
                  <div className="shop-media">
                    <div className="imgslot parallax">
                      <PH label={t} />
                      <img data-isrc={img} alt={t} />
                    </div>
                    <span className="price">{price}</span>
                  </div>
                  <div className="shop-body">
                    <h4>{t}</h4>
                    <p>{d}</p>
                    <a className="btn btn-sm" href="/support">
                      {cta} <Arrow s={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div className="foot-brand">
              <a href="#top" className="logo">
                <img
                  className="logo-img"
                  src="/brand/odyx-company.png"
                  alt="ODYX"
                />
              </a>
              <p>
                Premium digital dentistry - the complete connected workflow,
                from the first scan to the delivered restoration.
              </p>
            </div>
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h5>{col.title}</h5>
                {col.links.map((l) => (
                  <a key={l.label} href={l.href}>
                    {l.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div className="foot-bottom">
            <span>© 2026 ODYX. All rights reserved.</span>
            <span>
              <a href="/about">Privacy</a> · <a href="/about">Terms</a> ·{" "}
              <a href="/about">Cookies</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
