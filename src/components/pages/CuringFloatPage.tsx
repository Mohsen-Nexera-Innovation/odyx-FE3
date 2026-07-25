import Link from "next/link";
import CureMaterialGuide from "@/components/cure/CureMaterialGuide";

const METRICS = [
  { value: "360°", label: "Uniform exposure" },
  { value: "2λ", label: "385 + 405 nm" },
  { value: "≤45°C", label: "Regulated heat" },
  { value: "1 tap", label: "Guided presets" },
] as const;

const CHAPTERS = [
  {
    id: "light",
    kicker: "01 — Light",
    title: "Every surface. Same dose.",
    copy: "Multi-angle LEDs wrap restorations so crowns, guides, and bases cure evenly — not just the faces that face the lamp.",
    image: "/img/cure-stitch/ch-light-float.png",
    alt: "Dental restoration surrounded by uniform curing light",
    metric: "360°",
  },
  {
    id: "heat",
    kicker: "02 — Heat",
    title: "Warm enough. Never harsh.",
    copy: "Chamber temperature stays in a controlled band so prints finish strong without warping thin margins or cloudy clear resins.",
    image: "/img/cure-stitch/ch-heat-float.png",
    alt: "Close-up of a crown curing under amber UV light",
    metric: "≤45°C",
  },
  {
    id: "time",
    kicker: "03 — Time",
    title: "Material-specific. Not guesswork.",
    copy: "Validated presets map resin chemistry to cycle length — so clinics and labs get repeatable finish without babysitting the machine.",
    image: "/img/cure-stitch/ch-time-float.png",
    alt: "Guided curing cycles on the ODYX Cure interface",
    metric: "Presets",
  },
] as const;

const WORKFLOW = [
  {
    label: "Scan",
    image: "/img/cure-stitch/wf-scanner.png",
    alt: "ODYX intraoral scanner",
  },
  {
    label: "Design",
    image: "/img/cure-stitch/wf-design.png",
    alt: "ODYX design software",
  },
  {
    label: "Print",
    image: "/img/cure-stitch/wf-printer.png",
    alt: "ODYX dental 3D printer",
  },
  {
    label: "Cure",
    image: "/img/cure-stitch/wf-cure.png",
    alt: "ODYX Cure UV-02",
    active: true,
  },
] as const;

const ECOSYSTEM = [
  {
    name: "ODYX S1",
    type: "Intraoral scanner",
    image: "/img/cure-stitch/wf-scanner.png",
    href: "/products/intraoral-scanner",
  },
  {
    name: "ODYX P1-26",
    type: "Dental 3D printer",
    image: "/img/cure-stitch/wf-printer.png",
    href: "/products/3d-printers",
  },
  {
    name: "ODYX Resin",
    type: "Validated materials",
    image: "/img/cure-stitch/wf-resin.png",
    href: "/products/Resin",
  },
  {
    name: "ODYX Cure",
    type: "UV-02 curing station",
    image: "/img/cure-stitch/wf-cure.png",
    href: "#cure-fl-hero",
  },
] as const;

const SPECS = [
  { label: "Light source", value: "Multi-angle UV LED array" },
  { label: "Wavelength", value: "385 nm + 405 nm" },
  { label: "Chamber heat", value: "Regulated ≤ 45°C" },
  { label: "Curing modes", value: "Material-validated presets" },
  { label: "Capacity", value: "Multi-part clinical chamber" },
  { label: "Material classes", value: "Class I & IIa resins" },
  { label: "Power", value: "110–240 V" },
  { label: "Interface", value: "Guided touch controls" },
] as const;

const REVIEWS = [
  {
    quote:
      "Finish quality is consistent enough that we trust the last step the same way we trust the print.",
    name: "Dr. Maya El-Sayed",
    role: "Prosthodontist · Cairo Digital Clinic",
  },
  {
    quote:
      "Presets removed the guesswork. The team spends less time babysitting cycles and more time delivering cases.",
    name: "Omar Farid",
    role: "Lab Director · Precision Dental Lab",
  },
] as const;

export default function CuringFloatPage() {
  return (
    <div className="cure-fl">
      <section className="cure-fl-hero" id="cure-fl-hero">
        <div className="cure-fl-hero__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-chamber-glow.png"
            alt=""
            className="cure-fl-hero__bg"
            width={1920}
            height={1080}
          />
          <div className="cure-fl-hero__veil" />
          <div className="cure-fl-hero__amber" />
        </div>

        <div className="cure-fl-wrap cure-fl-hero__content">
          <p className="cure-fl-hero__brand">ODYX</p>
          <h1>Cure UV-02</h1>
          <p className="cure-fl-hero__lead">
            The last clinical step — controlled light, heat, and time in one chamber.
          </p>
          <div className="cure-fl-actions">
            <Link className="cure-fl-btn" href="/support">
              Request a Demo
            </Link>
            <Link className="cure-fl-btn cure-fl-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>

      <section className="cure-fl-manifesto" aria-label="Core variables">
        <div className="cure-fl-wrap cure-fl-manifesto__inner">
          <p className="cure-fl-kicker">Three variables. One finish.</p>
          <h2 className="cure-fl-manifesto__title">
            <span>Light</span>
            <i aria-hidden>×</i>
            <span>Heat</span>
            <i aria-hidden>×</i>
            <span>Time</span>
          </h2>
          <p className="cure-fl-manifesto__copy">
            Polymerization stops being a variable when the chamber manages all three with
            clinical precision.
          </p>
        </div>
        <div className="cure-fl-wrap cure-fl-metrics">
          {METRICS.map((m) => (
            <div className="cure-fl-metric" key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          className={`cure-fl-chapter${index % 2 === 1 ? " cure-fl-chapter--flip" : ""}`}
          id={`cure-fl-${chapter.id}`}
        >
          <div className="cure-fl-wrap cure-fl-chapter__inner">
            <div className="cure-fl-chapter__media">
              <div className="cure-fl-chapter__glow" aria-hidden />
              <img src={chapter.image} alt={chapter.alt} className="cure-fl-chapter__fly" loading="lazy" />
              <strong className="cure-fl-chapter__metric" aria-hidden>
                {chapter.metric}
              </strong>
            </div>
            <div className="cure-fl-chapter__copy">
              <p className="cure-fl-kicker">{chapter.kicker}</p>
              <h2>{chapter.title}</h2>
              <p>{chapter.copy}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="cure-fl-materials" id="cure-fl-guide">
        <div className="cure-fl-wrap">
          <div className="cure-fl-section-head">
            <p className="cure-fl-kicker">Cure guide</p>
            <h2>Pick a material. See the cycle.</h2>
            <p>Validated profiles for the indications you print every day.</p>
          </div>
          <CureMaterialGuide classPrefix="cure-fl" />
        </div>
      </section>

      <section className="cure-fl-workflow" id="cure-fl-workflow">
        <div className="cure-fl-wrap">
          <div className="cure-fl-section-head">
            <p className="cure-fl-kicker">Connected workflow</p>
            <h2>Scan → Design → Print → Cure</h2>
          </div>
          <ol className="cure-fl-workflow__rail">
            {WORKFLOW.map((stage, index) => (
              <li
                key={stage.label}
                className={`cure-fl-workflow__step${"active" in stage ? " is-active" : ""}`}
              >
                <span className="cure-fl-workflow__num">0{index + 1}</span>
                <div className="cure-fl-workflow__visual">
                  <img src={stage.image} alt={stage.alt} loading="lazy" />
                </div>
                <h3>{stage.label}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cure-fl-specs" id="cure-fl-precision">
        <div className="cure-fl-wrap cure-fl-specs__grid">
          <div className="cure-fl-specs__intro">
            <p className="cure-fl-kicker">Engineering</p>
            <h2>Complex inside. Clear outside.</h2>
            <p>
              Dual-wavelength light, regulated heat, and guided cycles — presented through a
              calm interface built for daily clinical use.
            </p>
            <Link className="cure-fl-text-link" href="/support#contact">
              Talk to a specialist →
            </Link>
          </div>
          <dl className="cure-fl-specs__list">
            {SPECS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cure-fl-ecosystem" id="cure-fl-ecosystem">
        <div className="cure-fl-wrap">
          <div className="cure-fl-section-head">
            <p className="cure-fl-kicker">ODYX ecosystem</p>
            <h2>One workflow, end to end.</h2>
          </div>
          <div className="cure-fl-ecosystem__row">
            {ECOSYSTEM.map((product, index) => (
              <div className="cure-fl-eco-item" key={product.name}>
                <Link href={product.href}>
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <strong>{product.name}</strong>
                  <span>{product.type}</span>
                </Link>
                {index < ECOSYSTEM.length - 1 ? (
                  <span className="cure-fl-eco-item__join" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-fl-voice" id="cure-fl-reviews">
        <div className="cure-fl-wrap">
          <div className="cure-fl-section-head">
            <p className="cure-fl-kicker">From the chair & the lab</p>
            <h2>Trusted where prints become patients.</h2>
          </div>
          <div className="cure-fl-voice__grid">
            {REVIEWS.map((review) => (
              <blockquote key={review.name}>
                <p>“{review.quote}”</p>
                <div className="cure-fl-voice__by">
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-fl-close">
        <div className="cure-fl-close__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-cinematic-hero.webp"
            alt=""
            width={1024}
            height={683}
            loading="lazy"
          />
          <div className="cure-fl-close__veil" />
        </div>
        <div className="cure-fl-wrap cure-fl-close__content">
          <p className="cure-fl-hero__brand">ODYX</p>
          <h2>The last step deserves precision.</h2>
          <p>See how Cure UV-02 turns printed parts into dependable clinical outcomes.</p>
          <div className="cure-fl-actions">
            <Link className="cure-fl-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-fl-btn cure-fl-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
