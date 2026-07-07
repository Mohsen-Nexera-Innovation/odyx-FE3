/* ODYX home - ported from Sample/index.html (3D journey hero excluded). Static markup;
   animations are applied by <OdyxMotion/>. Same classes/flavour as the Sample stylesheet. */
import HeroJourney from "./HeroJourney";
import NewsShowcase from "./NewsShowcase";
import ProductGallery from "./ProductGallery";
import RegisterDevice from "./RegisterDevice";
import WorkflowStepper from "./WorkflowStepper";
import { FOOTER_COLUMNS } from "@/content/nav";
import SecHead from "@/components/SecHead";

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
    t: "Resins",
    d: "Five clinical resin lines.",
    img: "/img/feat-resin.jpg",
  },
] as const;
const CLIN = [
  {
    tag: "Restorative",
    t: "Crowns & Bridges",
    d: "Single units to full-arch, designed and printed in-house.",
    img: "/img/crowns.jpg",
    accent: "orange",
  },
  {
    tag: "Surgical",
    t: "Implant Guides",
    d: "Accurate surgical guides for confident placement.",
    img: "/img/implant.jpg",
    accent: "teal",
  },
  {
    tag: "Orthodontic",
    t: "Orthodontic Models",
    d: "Precise models and appliances from digital scans.",
    img: "/img/ortho.jpg",
    accent: "teal",
  },
  {
    tag: "Prosthetic",
    t: "Dentures",
    d: "Digital denture workflows with a natural finish.",
    img: "/img/denture.jpg",
    accent: "orange",
  },
  {
    tag: "Provisional",
    t: "Temporary Restorations",
    d: "Fast, durable provisionals while finals are made.",
    img: "/img/temp.jpg",
    accent: "orange",
  },
] as const;
const WHY = [
  [
    "REASON 01",
    "Precision",
    "Accurate scans and prints that fit the first time - less chair time, fewer remakes.",
    "99",
    "%",
    "First-fit accuracy",
    "/img/why/why-precision.png",
  ],
  [
    "REASON 02",
    "Integrated workflow",
    "Every device connects, so data flows scan-to-delivery with no compatibility guesswork.",
    "6",
    "",
    "Connected steps",
    "/img/why/why-integrated.png",
  ],
  [
    "REASON 03",
    "Training & support",
    "An academy and a team that grow with your practice, from first scan to advanced cases.",
    "24",
    "/7",
    "Support access",
    "/img/why/why-training.png",
  ],
  [
    "REASON 04",
    "Clinical confidence",
    "Proven materials and validated curing for safe, durable, biocompatible results.",
    "5",
    "",
    "Clinical resin lines",
    "/img/why/why-clinical.png",
  ],
] as const;

// Extra icons for the Learning + Support tiles
const IX: Record<string, React.ReactNode> = {
  book: (
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
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5" />
    </svg>
  ),
  cap: (
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
      <path d="M22 9L12 5 2 9l10 4 10-4z" />
      <path d="M6 11v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  ),
  play: (
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
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M10 9l5 3-5 3z" />
    </svg>
  ),
  award: (
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
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
    </svg>
  ),
  whats: (
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
      <path d="M3 21l1.6-4.5A8 8 0 1 1 8 19.4z" />
      <path d="M9 9c0 3 3 6 6 6l1.5-1.5-2-1.5-1 1c-1-.5-2-1.5-2.5-2.5l1-1L10.5 8z" />
    </svg>
  ),
  chat: (
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
      <path d="M4 4h16v12H8l-4 4z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  doc: (
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
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h6" />
    </svg>
  ),
  shield: (
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
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
};

const CASES = [
  {
    badge: "Crown & Bridge",
    t: "Same-day full-contour crown",
    d: "Scan, design and print a natural-looking crown in a single visit.",
    img: "/img/crowns.jpg",
    metric: "1 visit",
    metricLbl: "Scan to seat",
  },
  {
    badge: "Surgical Guide",
    t: "Guided implant placement",
    d: "A printed surgical guide for confident, accurate positioning.",
    img: "/img/implant.jpg",
    metric: "0.1 mm",
    metricLbl: "Positional accuracy",
  },
  {
    badge: "Prosthetics",
    t: "Digital denture, delivered",
    d: "A complete denture workflow with a natural, lifelike finish.",
    img: "/img/denture.jpg",
    metric: "3 steps",
    metricLbl: "Streamlined workflow",
  },
] as const;

const LEARN = [
  {
    ic: "book",
    t: "Beginner guides",
    d: "Step-by-step onboarding to go fully digital with confidence.",
    meta: "20+ guides",
  },
  {
    ic: "cap",
    t: "Clinical courses",
    d: "Structured modules from the first scan to final delivery.",
    meta: "12 courses",
  },
  {
    ic: "play",
    t: "Webinars & events",
    d: "Live demos and Q&A with ODYX clinical specialists.",
    meta: "Monthly",
  },
  {
    ic: "award",
    t: "Certified academy",
    d: "Certification paths for chairside teams and labs.",
    meta: "Members",
  },
] as const;

const SUPPORT = [
  {
    ic: "whats",
    t: "WhatsApp care",
    d: "Instant help from our customer-care team, any day.",
    meta: "24/7",
  },
  {
    ic: "chat",
    t: "Odyx Agent & live chat",
    d: "Guided answers across the whole ODYX ecosystem.",
    meta: "Online",
  },
  {
    ic: "doc",
    t: "Help center & manuals",
    d: "Setup guides, troubleshooting and firmware downloads.",
    meta: "Self-service",
  },
  {
    ic: "shield",
    t: "Warranty & service",
    d: "Register devices, track repairs and coverage in one place.",
    meta: "Coverage",
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

      {/* ===== Choose Your Path ===== */}
      <section className="sec sec-mint" id="path">
        <div className="wrap">
          <SecHead eyebrow="Choose Your Path" />
          <div className="pgrid build-group">
            {/* Dentist - floating tooth + scan sweep (teal) */}
            <a href="/solutions/dentists" className="pcard teal reveal build">
              <div className="pcard-art">
                <img
                  className="pimg"
                  src="/img/paths/dentist.jpg"
                  alt="Dentist using a chairside scanner"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
                  <svg
                    width="22"
                    height="26"
                    viewBox="0 0 24 28"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M7 1C4.2 1 2 3.2 2 6c0 1.9.5 3.4 1.1 5.4.5 1.8.8 3.6 1.1 5.8.2 1.7.4 3.8 1.4 3.8.9 0 1.1-1.8 1.4-3.3.3-1.9.5-3.2 1.5-3.2s1.2 1.3 1.5 3.2c.3 1.5.5 3.3 1.4 3.3 1 0 1.2-2.1 1.4-3.8.3-2.2.6-4 1.1-5.8C21.5 9.4 22 7.9 22 6c0-2.8-2.2-5-5-5-1.6 0-2.6.8-3.5.8S8.6 1 7 1z" />
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

            {/* Lab Technician - 3D print building layer by layer (orange) */}
            <a href="/solutions/labs" className="pcard reveal build">
              <div className="pcard-art">
                <img
                  className="pimg"
                  src="/img/paths/lab.jpg"
                  alt="Dental lab production equipment"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">{I.print}</div>
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

            {/* Guest - connected ecosystem orbit (teal + orange core) */}
            <a href="/workflows" className="pcard teal reveal build">
              <div className="pcard-art">
                <img
                  className="pimg"
                  src="/img/paths/guest.jpg"
                  alt="Digital dentistry on screen"
                />
                <span className="scrim2" />
              </div>
              <div className="pcard-body">
                <div className="ic">
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
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
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
          </div>
        </div>
      </section>

      {/* ===== Legacy ecosystem map (hidden - superseded by the workflow stepper below) ===== */}
      <section className="sec" id="ecosystem-map" hidden>
        <div className="wrap">
          <SecHead eyebrow="The ODYX Ecosystem" />
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

      {/* ===== The ODYX Ecosystem (guided workflow stepper) ===== */}
      <section className="sec sec-orange" id="ecosystem">
        <div className="wrap">
          <SecHead eyebrow="The ODYX Ecosystem" />
          <WorkflowStepper />
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
      <section className="sec sec-teal" id="featured">
        <div className="wrap">
          <SecHead
            eyebrow="Featured Products"
            action={
              <a className="btn btn-ghost btn-sm" href="/products">
                All products →
              </a>
            }
          />
          <ProductGallery />
        </div>
      </section>

      {/* ===== Clinical Applications ===== */}
      <section className="sec sec-orange" id="clinical">
        <div className="wrap">
          <SecHead eyebrow="Clinical Applications" />
          <div className="capp-grid build-group">
            {CLIN.map((c) => (
              <a
                key={c.t}
                href="#"
                className={`capp build${c.accent === "teal" ? " teal" : ""}`}
              >
                <div className="capp-art">
                  <div className="imgslot">
                    <PH label={c.t} />
                    <img data-isrc={c.img} alt={c.t} />
                  </div>
                  <span className="capp-tag">{c.tag}</span>
                </div>
                <div className="capp-body">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="more">
                    See solutions <Arrow s={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why ODYX ===== */}
      <section className="sec sec-teal" id="why">
        <div className="wrap">
          <SecHead eyebrow="Why ODYX" />
          <div className="why-grid">
            {WHY.map(([n, t, d, count, suf, lbl, img]) => (
              <article className="why-card reveal" key={n}>
                <div className="why-card__media">
                  <img src={img} alt={t} loading="lazy" />
                </div>
                <div className="why-card__body">
                  <div className="why-card__stat">
                    <span
                      className="why-card__num"
                      data-count={count}
                      data-suf={suf}
                    >
                      0
                    </span>
                    {suf && <span className="why-card__suf">{suf}</span>}
                  </div>
                  <div className="why-card__lbl">{lbl}</div>
                  <div className="why-card__n">{n}</div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Case Library ===== */}
      <section className="sec sec-orange" id="cases-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Proof"
            action={
              <a className="btn btn-ghost btn-sm" href="/learning">
                Browse all cases →
              </a>
            }
          />
          <div className="prev-grid build-group">
            {CASES.map((c) => (
              <a key={c.t} href="/learning" className="prev build">
                <div className="prev-art">
                  <img src={c.img} alt={c.t} loading="lazy" />
                  <span className="prev-scrim" />
                  <span className="prev-badge">{c.badge}</span>
                </div>
                <div className="prev-body">
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <div className="prev-meta">
                    <span className="prev-metric">{c.metric}</span>
                    <span className="prev-metric-lbl">{c.metricLbl}</span>
                  </div>
                  <span className="more">
                    View case <Arrow s={15} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Learning Center preview ===== */}
      <section className="sec sec-teal" id="learning-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Learn"
            action={
              <a className="btn btn-ghost btn-sm" href="/learning">
                Enter academy →
              </a>
            }
          />
          <div className="g4 info-grid build-group">
            {LEARN.map((l) => (
              <a key={l.t} href="/learning" className="card info-card build">
                <span className="card-meta">{l.meta}</span>
                <div className="ic">{IX[l.ic]}</div>
                <h3>{l.t}</h3>
                <p>{l.d}</p>
                <span className="more">
                  Explore <Arrow s={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Support preview ===== */}
      <section className="sec sec-orange" id="support-preview">
        <div className="wrap">
          <SecHead
            eyebrow="Help"
            action={
              <a className="btn btn-ghost btn-sm" href="/support">
                Visit support →
              </a>
            }
          />
          <div className="g4 info-grid build-group">
            {SUPPORT.map((s) => (
              <a key={s.t} href="/support" className="card info-card build">
                <span className="card-meta">{s.meta}</span>
                <div className="ic">{IX[s.ic]}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <span className="more">
                  Get help <Arrow s={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Latest News ===== */}
      <section className="sec sec-teal" id="news">
        <div className="wrap">
          <SecHead
            eyebrow="Latest News"
            action={
              <a className="btn btn-ghost btn-sm" href="/about">
                All news →
              </a>
            }
          />
          <NewsShowcase />
        </div>
      </section>

      {/* ===== Register Device ===== */}
      <section className="sec sec-teal" id="register">
        <div className="wrap">
          <SecHead eyebrow="Device Registration" />
          <RegisterDevice />
        </div>
      </section>

      {/* ===== Shop ===== */}
      <section className="sec sec-orange" id="shop">
        <div className="wrap">
          <SecHead eyebrow="ODYX Shop" />
          <div className="shop-flow">
            <div className="pulse-line" />
            <div className="shop-grid build-group">
              {[
                [
                  "Clinical Resins",
                  "Permanent crown, ceramic, temporary, model & surgical-guide lines.",
                  "From $-",
                  "Shop resins",
                  "/img/shop-resin.jpg",
                ],
                [
                  "Accessories & Consumables",
                  "Build plates, tanks and everyday workflow consumables.",
                  "From $-",
                  "Shop accessories",
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
                    <div className="imgslot">
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
