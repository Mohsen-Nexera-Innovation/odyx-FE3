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
    image: "/img/cure-stitch/odyx-360-curing.webp",
    alt: "Dental restoration surrounded by uniform curing light",
    metric: "360°",
  },
  {
    id: "heat",
    kicker: "02 — Heat",
    title: "Warm enough. Never harsh.",
    copy: "Chamber temperature stays in a controlled band so prints finish strong without warping thin margins or cloudy clear resins.",
    image: "/img/cure-stitch/odyx-cure-macro-amber.png",
    alt: "Close-up of a crown curing under amber UV light",
    metric: "≤45°C",
  },
  {
    id: "time",
    kicker: "03 — Time",
    title: "Material-specific. Not guesswork.",
    copy: "Validated presets map resin chemistry to cycle length — so clinics and labs get repeatable finish without babysitting the machine.",
    image: "/img/cure-stitch/odyx-guided-cycles.webp",
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
    href: "#cure-ed-hero",
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

export default function CuringEditorialPage() {
  return (
    <div className="cure-ed">
      <section className="cure-ed-hero" id="cure-ed-hero">
        <div className="cure-ed-hero__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-chamber-glow.png"
            alt=""
            className="cure-ed-hero__bg"
            width={1920}
            height={1080}
          />
          <div className="cure-ed-hero__veil" />
          <div className="cure-ed-hero__amber" />
        </div>

        <div className="cure-ed-wrap cure-ed-hero__content m-stagger">
          <p className="cure-ed-hero__brand">ODYX</p>
          <h1>Cure UV-02</h1>
          <p className="cure-ed-hero__lead">
            The last clinical step — controlled light, heat, and time in one chamber.
          </p>
          <div className="cure-ed-actions">
            <Link className="cure-ed-btn" href="/support">
              Request a Demo
            </Link>
            <Link className="cure-ed-btn cure-ed-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>

      <section className="cure-ed-manifesto" aria-label="Core variables">
        <div className="cure-ed-wrap cure-ed-manifesto__inner reveal">
          <p className="cure-ed-kicker">Three variables. One finish.</p>
          <h2 className="cure-ed-manifesto__title">
            <span>Light</span>
            <i aria-hidden>×</i>
            <span>Heat</span>
            <i aria-hidden>×</i>
            <span>Time</span>
          </h2>
          <p className="cure-ed-manifesto__copy">
            Polymerization stops being a variable when the chamber manages all three with
            clinical precision.
          </p>
        </div>
        <div className="cure-ed-wrap cure-ed-metrics m-stagger">
          {METRICS.map((m) => (
            <div className="cure-ed-metric" key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          className={`cure-ed-chapter${index % 2 === 1 ? " cure-ed-chapter--flip" : ""}`}
          id={`cure-ed-${chapter.id}`}
        >
          <div className="cure-ed-chapter__media m-scale">
            <img src={chapter.image} alt={chapter.alt} />
            <strong className="cure-ed-chapter__metric" aria-hidden>
              {chapter.metric}
            </strong>
          </div>
          <div className="cure-ed-chapter__copy m-left">
            <p className="cure-ed-kicker">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </div>
        </section>
      ))}

      <section className="cure-ed-materials" id="cure-ed-guide">
        <div className="cure-ed-wrap">
          <div className="cure-ed-section-head reveal">
            <p className="cure-ed-kicker">Cure guide</p>
            <h2>Pick a material. See the cycle.</h2>
            <p>Validated profiles for the indications you print every day.</p>
          </div>
          <CureMaterialGuide />
        </div>
      </section>

      <section className="cure-ed-workflow" id="cure-ed-workflow">
        <div className="cure-ed-wrap">
          <div className="cure-ed-section-head reveal">
            <p className="cure-ed-kicker">Connected workflow</p>
            <h2>Scan → Design → Print → Cure</h2>
          </div>
          <ol className="cure-ed-workflow__rail m-stagger">
            {WORKFLOW.map((stage, index) => (
              <li
                key={stage.label}
                className={`cure-ed-workflow__step${"active" in stage ? " is-active" : ""}`}
              >
                <span className="cure-ed-workflow__num">0{index + 1}</span>
                <div className="cure-ed-workflow__visual">
                  <img src={stage.image} alt={stage.alt} />
                </div>
                <h3>{stage.label}</h3>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cure-ed-specs" id="cure-ed-precision">
        <div className="cure-ed-wrap cure-ed-specs__grid">
          <div className="cure-ed-specs__intro m-left">
            <p className="cure-ed-kicker">Engineering</p>
            <h2>Complex inside. Clear outside.</h2>
            <p>
              Dual-wavelength light, regulated heat, and guided cycles — presented through a
              calm interface built for daily clinical use.
            </p>
            <Link className="cure-ed-text-link" href="/support#contact">
              Talk to a specialist →
            </Link>
          </div>
          <dl className="cure-ed-specs__list m-stagger">
            {SPECS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cure-ed-ecosystem" id="cure-ed-ecosystem">
        <div className="cure-ed-wrap">
          <div className="cure-ed-section-head reveal">
            <p className="cure-ed-kicker">ODYX ecosystem</p>
            <h2>One workflow, end to end.</h2>
          </div>
          <div className="cure-ed-ecosystem__row m-stagger">
            {ECOSYSTEM.map((product, index) => (
              <div className="cure-ed-eco-item" key={product.name}>
                <Link href={product.href}>
                  <img src={product.image} alt={product.name} />
                  <strong>{product.name}</strong>
                  <span>{product.type}</span>
                </Link>
                {index < ECOSYSTEM.length - 1 ? (
                  <span className="cure-ed-eco-item__join" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-ed-voice" id="cure-ed-reviews">
        <div className="cure-ed-wrap">
          <div className="cure-ed-section-head reveal">
            <p className="cure-ed-kicker">From the chair & the lab</p>
            <h2>Trusted where prints become patients.</h2>
          </div>
          <div className="cure-ed-voice__grid m-stagger">
            {REVIEWS.map((review) => (
              <blockquote key={review.name}>
                <p>“{review.quote}”</p>
                <div className="cure-ed-voice__by">
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-ed-close">
        <div className="cure-ed-close__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-cinematic-hero.webp"
            alt=""
            width={1024}
            height={683}
          />
          <div className="cure-ed-close__veil" />
        </div>
        <div className="cure-ed-wrap cure-ed-close__content m-scale">
          <p className="cure-ed-hero__brand">ODYX</p>
          <h2>The last step deserves precision.</h2>
          <p>See how Cure UV-02 turns printed parts into dependable clinical outcomes.</p>
          <div className="cure-ed-actions">
            <Link className="cure-ed-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-ed-btn cure-ed-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
