import Link from "next/link";
import CureClinicalCases from "@/components/cure/CureClinicalCases";
import CureMaterialGuide from "@/components/cure/CureMaterialGuide";
import CureRoiPanel from "@/components/cure/CureRoiPanel";

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
    href: "/products/resins",
  },
  {
    name: "ODYX Cure",
    type: "UV-02 curing station",
    image: "/img/cure-stitch/wf-cure.png",
    href: "#cure-v4-hero",
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
    role: "Prosthodontist",
    place: "Cairo Digital Clinic",
    tag: "Chairside",
    initials: "ME",
    focus: "Crowns & provisionals",
  },
  {
    quote:
      "Presets removed the guesswork. The team spends less time babysitting cycles and more time delivering cases.",
    name: "Omar Farid",
    role: "Lab Director",
    place: "Precision Dental Lab",
    tag: "Production lab",
    initials: "OF",
    focus: "Daily throughput",
  },
  {
    quote:
      "Clear appliances come out crystal — heat stays controlled, so we stopped second-guessing every cycle.",
    name: "Sara Nabil",
    role: "Digital Dentist",
    place: "Aether Smile Studio",
    tag: "Clinic",
    initials: "SN",
    focus: "Guides & clear resins",
  },
] as const;

const VOICE_STATS = [
  { value: "4.9", label: "Clinic rating" },
  { value: "120+", label: "Practices" },
  { value: "1 tap", label: "Trusted presets" },
] as const;

export default function CuringV4Page() {
  return (
    <div className="cure-v4">
      <section className="cure-v4-hero" id="cure-v4-hero">
        <div className="cure-v4-hero__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-chamber-glow.png"
            alt=""
            className="cure-v4-hero__bg"
            width={1920}
            height={1080}
          />
          <div className="cure-v4-hero__veil" />
          <div className="cure-v4-hero__amber" />
        </div>

        <div className="cure-v4-wrap cure-v4-hero__content m-stagger">
          <p className="cure-v4-hero__brand">ODYX</p>
          <h1>Cure UV-02</h1>
          <p className="cure-v4-hero__lead">
            The last clinical step — controlled light, heat, and time in one chamber.
          </p>
          <div className="cure-v4-actions">
            <Link className="cure-v4-btn" href="/support">
              Request a Demo
            </Link>
            <Link className="cure-v4-btn cure-v4-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>

      <section className="cure-v4-manifesto" aria-label="Core variables">
        <div className="cure-v4-wrap cure-v4-manifesto__inner reveal">
          <p className="cure-v4-kicker">Three variables. One finish.</p>
          <h2 className="cure-v4-manifesto__title">
            <span>Light</span>
            <i aria-hidden>×</i>
            <span>Heat</span>
            <i aria-hidden>×</i>
            <span>Time</span>
          </h2>
          <p className="cure-v4-manifesto__copy">
            Polymerization stops being a variable when the chamber manages all three with
            clinical precision.
          </p>
        </div>
        <div className="cure-v4-wrap cure-v4-metrics m-stagger">
          {METRICS.map((m) => (
            <div className="cure-v4-metric" key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          className={`cure-v4-chapter${index % 2 === 1 ? " cure-v4-chapter--flip" : ""}`}
          id={`cure-v4-${chapter.id}`}
        >
          <div className="cure-v4-chapter__media m-scale">
            <img src={chapter.image} alt={chapter.alt} />
            <strong className="cure-v4-chapter__metric" aria-hidden>
              {chapter.metric}
            </strong>
          </div>
          <div className="cure-v4-chapter__copy m-left">
            <p className="cure-v4-kicker">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </div>
        </section>
      ))}

      <section className="cure-v4-materials" id="cure-v4-guide">
        <div className="cure-v4-wrap">
          <div className="cure-v4-section-head reveal">
            <p className="cure-v4-kicker">Cure guide</p>
            <h2>Pick a material. See the cycle.</h2>
            <p>Validated profiles for the indications you print every day.</p>
          </div>
          <CureMaterialGuide classPrefix="cure-v4" />
        </div>
      </section>

      <section className="cure-v4-workflow" id="cure-v4-workflow">
        <div className="cure-v4-wrap">
          <div className="cure-v4-workflow__head reveal">
            <p className="cure-v4-kicker">Digital workflow</p>
            <h2 className="cure-v4-workflow__title">Scan → Design → Print → Cure</h2>
            <div className="cure-v4-workflow__route" aria-hidden>
              <span>Patient</span>
              <i />
              <span>Outcome</span>
            </div>
          </div>

          <div className="cure-v4-workflow__row m-stagger">
            {WORKFLOW.map((stage, index) => (
              <article
                className={`cure-v4-workflow__item${"active" in stage ? " is-active" : ""}`}
                key={stage.label}
              >
                <div className="cure-v4-workflow__visual">
                  <span className="cure-v4-workflow__number">0{index + 1}</span>
                  <img src={stage.image} alt={stage.alt} />
                </div>
                <h3>{stage.label}</h3>
                {index < WORKFLOW.length - 1 ? (
                  <span className="cure-v4-workflow__connector" aria-hidden>
                    <i />
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      focusable="false"
                      aria-hidden
                    >
                      <path d="M5 12h13" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>
                  </span>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-v4-specs" id="cure-v4-precision">
        <div className="cure-v4-wrap cure-v4-specs__grid">
          <div className="cure-v4-specs__intro m-left">
            <p className="cure-v4-kicker">Engineering</p>
            <h2>Complex inside. Clear outside.</h2>
            <p>
              Dual-wavelength light, regulated heat, and guided cycles — presented through a
              calm interface built for daily clinical use.
            </p>
            <Link className="cure-v4-text-link" href="/support#contact">
              Talk to a specialist →
            </Link>
          </div>
          <dl className="cure-v4-specs__list m-stagger">
            {SPECS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cure-v4-roi-sec" id="cure-v4-roi">
        <div className="cure-v4-wrap cure-v4-roi-sec__grid">
          <div className="cure-v4-section-head reveal">
            <p className="cure-v4-kicker">ROI calculator</p>
            <h2>What does a faster last step save?</h2>
            <p>
              Model monthly time and cost recovered when Cure UV-02 removes guesswork from every
              cycle.
            </p>
          </div>
          <CureRoiPanel classPrefix="cure-v4" />
        </div>
      </section>

      <section className="cure-v4-ecosystem" id="cure-v4-ecosystem">
        <div className="cure-v4-wrap">
          <div className="cure-v4-section-head reveal">
            <p className="cure-v4-kicker">ODYX ecosystem</p>
            <h2>One workflow, end to end.</h2>
          </div>
          <div className="cure-v4-ecosystem__row m-stagger">
            {ECOSYSTEM.map((product, index) => (
              <div className="cure-v4-eco-item" key={product.name}>
                <Link href={product.href}>
                  <img src={product.image} alt={product.name} />
                  <strong>{product.name}</strong>
                  <span>{product.type}</span>
                </Link>
                {index < ECOSYSTEM.length - 1 ? (
                  <span className="cure-v4-eco-item__join" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-v4-cases-sec" id="cure-v4-cases">
        <div className="cure-v4-wrap">
          <div className="cure-v4-section-head reveal">
            <p className="cure-v4-kicker">Clinical cases</p>
            <h2>Before. Curing. Finished.</h2>
            <p>Follow common indications from printed green to clinical finish inside UV-02.</p>
          </div>
          <CureClinicalCases classPrefix="cure-v4" />
        </div>
      </section>

      <section className="cure-v4-voice" id="cure-v4-reviews" aria-labelledby="cure-v4-voice-title">
        <div className="cure-v4-voice__glow" aria-hidden />
        <div className="cure-v4-wrap">
          <div className="cure-v4-voice__top reveal">
            <div className="cure-v4-voice__intro">
              <p className="cure-v4-kicker">Social proof</p>
              <h2 id="cure-v4-voice-title">Heard where prints become patients.</h2>
              <p className="cure-v4-voice__lead">
                Clinics and labs talk about the last step the same way — calm, repeatable, done.
              </p>
            </div>
            <ul className="cure-v4-voice__stats" aria-label="Trust signals">
              {VOICE_STATS.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cure-v4-voice__stage m-stagger">
            <blockquote className="cure-v4-voice__feature">
              <div className="cure-v4-voice__mark" aria-hidden>
                ”
              </div>
              <div className="cure-v4-voice__stars" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
              <p>“{REVIEWS[0].quote}”</p>
              <div className="cure-v4-voice__person">
                <span className="cure-v4-voice__avatar" aria-hidden>
                  {REVIEWS[0].initials}
                </span>
                <div>
                  <strong>{REVIEWS[0].name}</strong>
                  <span>
                    {REVIEWS[0].role} · {REVIEWS[0].place}
                  </span>
                </div>
                <em>{REVIEWS[0].tag}</em>
              </div>
            </blockquote>

            <div className="cure-v4-voice__stack">
              {REVIEWS.slice(1).map((review) => (
                <blockquote key={review.name} className="cure-v4-voice__card">
                  <p>“{review.quote}”</p>
                  <div className="cure-v4-voice__person">
                    <span className="cure-v4-voice__avatar" aria-hidden>
                      {review.initials}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <span>
                        {review.role} · {review.place}
                      </span>
                    </div>
                  </div>
                  <span className="cure-v4-voice__focus">{review.focus}</span>
                </blockquote>
              ))}
            </div>
          </div>

          <p className="cure-v4-voice__band" aria-hidden>
            <span>Chairside</span>
            <i />
            <span>Production labs</span>
            <i />
            <span>Digital clinics</span>
            <i />
            <span>Teaching hospitals</span>
          </p>
        </div>
      </section>

      <section className="cure-v4-close">
        <div className="cure-v4-close__stage" aria-hidden>
          <img
            src="/img/cure-stitch/odyx-cure-cinematic-hero.webp"
            alt=""
            width={1024}
            height={683}
          />
          <div className="cure-v4-close__veil" />
        </div>
        <div className="cure-v4-wrap cure-v4-close__content m-scale">
          <p className="cure-v4-hero__brand">ODYX</p>
          <h2>The last step deserves precision.</h2>
          <p>See how Cure UV-02 turns printed parts into dependable clinical outcomes.</p>
          <div className="cure-v4-actions">
            <Link className="cure-v4-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-v4-btn cure-v4-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
