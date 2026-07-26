import Link from "next/link";
import type { CSSProperties } from "react";

type IconName =
  | "arrow"
  | "check"
  | "cure"
  | "design"
  | "download"
  | "presets"
  | "print"
  | "scan"
  | "shield"
  | "speed"
  | "thermostat"
  | "uniformity";

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.4 12.2 2.4 2.4 4.8-5.4" />
    </>
  ),
  cure: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.6M12 19.4V22M4.2 4.2l1.9 1.9M17.9 17.9l1.9 1.9M2 12h2.6M19.4 12H22M4.2 19.8l1.9-1.9M17.9 6.1l1.9-1.9" />
    </>
  ),
  design: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M9.5 21h5M12 17v4" />
      <path d="M7.5 12.5 10 9.6l2.4 2.9L15 8.4" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v11" />
      <path d="m7.5 10 4.5 4.5 4.5-4.5" />
      <path d="M4.5 20.5h15" />
    </>
  ),
  presets: (
    <>
      <path d="M4 7.5h8.5M17.5 7.5H20" />
      <path d="M4 16.5h3.5M12.5 16.5H20" />
      <circle cx="15" cy="7.5" r="2.4" />
      <circle cx="10" cy="16.5" r="2.4" />
    </>
  ),
  print: (
    <>
      <path d="M6.5 9.5V3h11v6.5" />
      <path d="M6.5 18H5a2 2 0 0 1-2-2v-4.5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2V16a2 2 0 0 1-2 2h-1.5" />
      <rect x="6.5" y="14.5" width="11" height="6.5" rx="1" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8.5V6.2A2.2 2.2 0 0 1 6.2 4h2.3" />
      <path d="M15.5 4h2.3A2.2 2.2 0 0 1 20 6.2v2.3" />
      <path d="M20 15.5v2.3a2.2 2.2 0 0 1-2.2 2.2h-2.3" />
      <path d="M8.5 20H6.2A2.2 2.2 0 0 1 4 17.8v-2.3" />
      <path d="M4 12h16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 6v5.4c0 4.3 2.9 7.4 7 8.9 4.1-1.5 7-4.6 7-8.9V6l-7-2.8Z" />
      <path d="m9.2 12 2.1 2.1 3.9-4.2" />
    </>
  ),
  speed: (
    <>
      <path d="M3.5 17.8a9.5 9.5 0 1 1 17 0" />
      <path d="M12 14.2 16.2 9" />
      <circle cx="12" cy="14.8" r="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  thermostat: (
    <>
      <path d="M14 14.4V5a2 2 0 1 0-4 0v9.4a4 4 0 1 0 4 0Z" />
      <path d="M12 9.5v5.2" />
    </>
  ),
  uniformity: (
    <>
      <path d="M20.8 12a8.8 8.8 0 1 1-2.9-6.5" />
      <path d="M20.5 4.2v4.6h-4.6" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
};

function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const PILLARS = [
  {
    icon: "uniformity" as const,
    title: "Matched light",
    metric: "360°",
    image: "/img/cure-stitch/odyx-app-crown.png",
  },
  {
    icon: "thermostat" as const,
    title: "Measured heat",
    metric: "≤45°C",
    image: "/img/cure-stitch/odyx-app-denture.png",
  },
  {
    icon: "presets" as const,
    title: "Guided cycles",
    metric: "1 tap",
    image: "/img/cure-stitch/odyx-app-guard.png",
  },
] as const;

const STORIES = [
  {
    id: "uniform",
    title: "Uniform exposure",
    metric: "360°",
    image: "/img/cure-stitch/odyx-app-crown.png",
    alt: "Cured ceramic crown cutout",
  },
  {
    id: "dualwave",
    title: "UV bands",
    metric: "2λ",
    image: "/img/cure-stitch/odyx-app-guide.png",
    alt: "Clear surgical guide cutout",
  },
  {
    id: "thermo",
    title: "Regulated chamber",
    metric: "≤45°C",
    image: "/img/cure-stitch/odyx-app-denture.png",
    alt: "Denture base cutout",
  },
] as const;

const INDICATIONS = [
  { name: "Crowns & Bridges", time: "3–5 min", image: "/img/cure-stitch/odyx-app-crown.png" },
  { name: "Surgical Guides", time: "3 min", image: "/img/cure-stitch/odyx-app-guide.png" },
  { name: "Denture Bases", time: "8–10 min", image: "/img/cure-stitch/odyx-app-denture.png" },
  { name: "Dental Models", time: "2 min", image: "/img/cure-stitch/odyx-app-model.png" },
  { name: "Splints & Guards", time: "4 min", image: "/img/cure-stitch/odyx-app-guard.png" },
  { name: "Provisionals", time: "3 min", image: "/img/cure-stitch/odyx-app-temp.png" },
] as const;

const WORKFLOW = [
  {
    label: "Scan",
    image: "/img/cutouts/feat-scanner-cutout.png",
    alt: "ODYX intraoral scanner",
  },
  {
    label: "Design",
    image: "/img/cutouts/feat-design-cutout.png",
    alt: "ODYX design software",
  },
  {
    label: "Print",
    image: "/img/cutouts/feat-printer-cutout.png",
    alt: "ODYX dental 3D printer",
  },
  {
    label: "Cure",
    image: "/img/cure-stitch/machine-hero-cutout.png",
    alt: "ODYX Cure UV-02",
    active: true,
  },
] as const;

const ECOSYSTEM = [
  {
    name: "ODYX S1",
    type: "Intraoral scanner",
    image: "/img/cutouts/feat-scanner-cutout.png",
    href: "/products/intraoral-scanner",
  },
  {
    name: "ODYX P1-26",
    type: "Dental 3D printer",
    image: "/img/cutouts/feat-printer-cutout.png",
    href: "/products/3d-printers",
  },
  {
    name: "ODYX Resin",
    type: "Validated materials",
    image: "/img/cutouts/feat-resin-cutout.png",
    href: "/products/resins",
  },
  {
    name: "ODYX Cure",
    type: "UV-02 curing station",
    image: "/img/cure-stitch/machine-hero-cutout.png",
    href: "#cure-hero",
  },
] as const;

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/** Cinematic cutout version — same staging as the main page, transparent product images. */
export default function CuringCutoutPage() {
  return (
    <div className="cure-page cure-page--cutout">
      <section className="cure-hero" id="cure-hero">
        <div className="cure-hero__stage" aria-hidden>
          <img
            src="/img/cure-stitch/machine-hero-cutout.png"
            alt=""
            className="cure-hero__product"
            width={724}
            height={559}
          />
          <div className="cure-hero__veil" />
          <div className="cure-hero__grain" />
        </div>

        <div className="cure-wrap cure-hero__content m-stagger">
          <p className="cure-brand">
            ODYX Cure <span>UV-02</span>
          </p>
          <h1>The final layer of precision.</h1>
          <p className="cure-lead">
            Light, temperature, and time brought into one controlled clinical finish.
          </p>
          <div className="cure-actions">
            <Link className="cure-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-btn cure-btn--ghost" href="/support#manuals">
              Tech Specs
              <Icon name="download" className="cure-btn__ic" />
            </Link>
          </div>
          <Link className="cure-version-link" href="/products/curing-machines">
            View cinematic version
            <Icon name="arrow" className="cure-version-link__ic" />
          </Link>
        </div>

        <div className="cure-hero__scroll" aria-hidden>
          <span />
        </div>
      </section>

      <section className="cure-pillars" aria-label="Core capabilities">
        <div className="cure-wrap cure-pillars__intro reveal">
          <p className="cure-eyebrow">Three variables</p>
          <h2>Light × Heat × Time</h2>
        </div>
        <div className="cure-wrap cure-pillars__grid m-stagger">
          {PILLARS.map((p) => (
            <article className="cure-pillar" key={p.title}>
              <div className="cure-pillar__media">
                <img src={p.image} alt="" aria-hidden />
              </div>
              <div className="cure-pillar__label">
                <Icon name={p.icon} className="cure-pillar__ic" />
                <div>
                  <strong>{p.metric}</strong>
                  <h2>{p.title}</h2>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {STORIES.map((story) => (
        <section key={story.id} className="cure-story" id={`cure-${story.id}`}>
          <div className="cure-story__media m-scale">
            <img src={story.image} alt={story.alt} />
            <div className="cure-story__badge">
              <strong>{story.metric}</strong>
              <span>{story.title}</span>
            </div>
          </div>
        </section>
      ))}

      <section className="cure-impact" id="cure-impact">
        <div className="cure-wrap cure-impact__equation m-stagger">
          <div>
            <strong>Light</strong>
            <span>385 + 405nm</span>
          </div>
          <b>×</b>
          <div>
            <strong>Heat</strong>
            <span>regulated ≤45°C</span>
          </div>
          <b>×</b>
          <div>
            <strong>Time</strong>
            <span>material-specific</span>
          </div>
          <b>=</b>
          <div className="is-result">
            <strong>Resolved</strong>
            <span>ready for clinical use</span>
          </div>
        </div>
      </section>

      <section className="cure-indications" id="cure-applications">
        <div className="cure-wrap">
          <div className="cure-section-head reveal">
            <p className="cure-eyebrow">Clinical range</p>
            <h2>From print to placed.</h2>
          </div>

          <div className="cure-indications__feature m-scale">
            <img
              src="/img/cure-stitch/clinical-apps-cutout.png"
              alt="Crown, surgical guide, denture base and clear dental guard"
              width={948}
              height={948}
            />
            <div className="cure-indications__feature-glow" aria-hidden />
          </div>

          <div className="cure-indications__grid m-stagger">
            {INDICATIONS.map((item) => (
              <article className="cure-indication" key={item.name}>
                <div className="cure-indication__media">
                  <img src={item.image} alt="" aria-hidden />
                  <span className="cure-indication__aura" aria-hidden />
                </div>
                <div className="cure-indication__meta">
                  <h3>{item.name}</h3>
                  <strong>{item.time}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-workflow" id="cure-workflow">
        <div className="cure-wrap">
          <div className="cure-workflow__head reveal">
            <p className="cure-eyebrow">Digital workflow</p>
            <h2 className="cure-workflow__title">Scan → Design → Print → Cure</h2>
            <div className="cure-workflow__route" aria-hidden>
              <span>Patient</span>
              <i />
              <span>Outcome</span>
            </div>
          </div>

          <div className="cure-workflow__row m-stagger">
            {WORKFLOW.map((stage, index) => (
              <article
                className={`cure-workflow__item${"active" in stage ? " is-active" : ""}`}
                key={stage.label}
                style={step(index)}
              >
                <div className="cure-workflow__visual">
                  <span className="cure-workflow__number">0{index + 1}</span>
                  <img src={stage.image} alt={stage.alt} />
                </div>
                <h3>{stage.label}</h3>
                {index < WORKFLOW.length - 1 ? (
                  <span className="cure-workflow__connector" aria-hidden>
                    <i />
                    <Icon name="arrow" />
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-engineering" id="cure-precision">
        <div className="cure-wrap cure-engineering__grid">
          <div className="cure-engineering__copy m-left">
            <p className="cure-eyebrow">The control layer</p>
            <h2>Complex inside. Clear outside.</h2>
            <p>
              The machine manages the variables beneath a calm, direct interface designed for
              repeated daily use.
            </p>
            <Link className="cure-link" href="/support#contact">
              Talk to a product specialist
              <Icon name="arrow" className="cure-link__ic" />
            </Link>
          </div>
          <ul className="cure-spec-tiles m-stagger">
            <li>
              <Icon name="cure" />
              <strong>385 + 405</strong>
              <span>nm wavelengths</span>
            </li>
            <li>
              <Icon name="thermostat" />
              <strong>≤45°C</strong>
              <span>heat ceiling</span>
            </li>
            <li>
              <Icon name="uniformity" />
              <strong>Multi-part</strong>
              <span>chamber capacity</span>
            </li>
            <li>
              <Icon name="shield" />
              <strong>I + IIa</strong>
              <span>material classes</span>
            </li>
            <li>
              <Icon name="presets" />
              <strong>Smart</strong>
              <span>validated presets</span>
            </li>
            <li>
              <Icon name="speed" />
              <strong>110–240V</strong>
              <span>global power</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="cure-ecosystem" id="cure-ecosystem">
        <div className="cure-wrap">
          <div className="cure-section-head reveal">
            <p className="cure-eyebrow">One connected ecosystem</p>
            <h2>One workflow, carried all the way through.</h2>
          </div>
          <div className="cure-ecosystem__grid m-stagger">
            {ECOSYSTEM.map((product, index) => (
              <div className="cure-ecosystem__group" key={product.name}>
                <Link className="cure-product-card" href={product.href}>
                  <img src={product.image} alt={product.name} />
                  <span>
                    <strong>{product.name}</strong>
                    <small>{product.type}</small>
                  </span>
                </Link>
                {index < ECOSYSTEM.length - 1 ? (
                  <Icon name="arrow" className="cure-product-card__arrow" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-cta">
        <div className="cure-wrap cure-cta__inner m-scale">
          <h2>The last step deserves precision.</h2>
          <p>
            See how ODYX Cure UV-02 turns printed parts into dependable clinical outcomes.
          </p>
          <div className="cure-actions">
            <Link className="cure-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-btn cure-btn--ghost cure-btn--on-dark" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
