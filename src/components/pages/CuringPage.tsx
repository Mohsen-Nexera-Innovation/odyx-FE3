import Link from "next/link";
import CureClinicalCases from "@/components/cure/CureClinicalCases";
import CureMaterialGuide from "@/components/cure/CureMaterialGuide";
import CureRoiPanel from "@/components/cure/CureRoiPanel";
import CureHeroCopy from "@/components/cure/CureHeroCopy";

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
    proof: "360° uniform exposure",
    image: "/img/cure-stitch/odyx-360-curing.webp",
    alt: "Dental restoration surrounded by uniform curing light",
    metric: "360°",
    focus: "center",
  },
  {
    id: "heat",
    kicker: "02 — Heat",
    title: "Warm enough. Never harsh.",
    copy: "Chamber temperature stays in a controlled band so prints finish strong without warping thin margins or cloudy clear resins.",
    proof: "Regulated ≤ 45°C",
    image: "/img/cure-stitch/odyx-cure-macro-amber.png",
    alt: "Close-up of a crown curing under amber UV light",
    metric: "≤45°C",
    focus: "heat",
  },
  {
    id: "time",
    kicker: "03 — Time",
    title: "Material-specific. Not guesswork.",
    copy: "Validated presets map resin chemistry to cycle length — so clinics and labs get repeatable finish without babysitting the machine.",
    proof: "Material-validated presets",
    image: "/img/cure-stitch/odyx-guided-cycles.webp",
    alt: "Guided curing cycles on the ODYX Cure interface",
    metric: "Presets",
    focus: "time",
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
    href: "#cure-hero",
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

export default function CuringPage() {
  return (
    <div className="cure">
      <section className="cure-hero" id="cure-hero">
        <div className="cure-hero__stage" aria-hidden>
          <video
            className="cure-hero__bg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/img/uw03/hero-packshot.png?v=10"
          >
            <source src="/video/cure-uv02-hero.mp4?v=ext-1" type="video/mp4" />
          </video>
          <img
            src="/img/uw03/hero-packshot.png?v=10"
            alt=""
            className="cure-hero__fallback"
            width={1223}
            height={933}
          />
          <div className="cure-hero__veil" />
          <div className="cure-hero__amber" />
        </div>

        <CureHeroCopy />
      </section>

      <section className="cure-manifesto" aria-label="Core variables">
        <div className="cure-wrap cure-manifesto__inner reveal">
          <p className="cure-kicker">Three variables. One finish.</p>
          <h2 className="cure-manifesto__title">
            <span>Light</span>
            <i aria-hidden>×</i>
            <span>Heat</span>
            <i aria-hidden>×</i>
            <span>Time</span>
          </h2>
          <p className="cure-manifesto__copy">
            Polymerization stops being a variable when the chamber manages all three with
            clinical precision.
          </p>
        </div>
        <div className="cure-wrap cure-metrics m-stagger">
          {METRICS.map((m) => (
            <div className="cure-metric" key={m.label}>
              <strong>{m.value}</strong>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {CHAPTERS.map((chapter, index) => (
        <section
          key={chapter.id}
          className={`cure-chapter${index % 2 === 1 ? " cure-chapter--flip cure-chapter--light" : ""}`}
          id={`cure-${chapter.id}`}
        >
          <div
            className={`cure-chapter__media cure-chapter__media--${chapter.focus} m-scale`}
          >
            <img src={chapter.image} alt={chapter.alt} />
            <strong className="cure-chapter__metric" aria-hidden>
              {chapter.metric}
            </strong>
          </div>
          <div className="cure-chapter__copy m-stagger">
            <p className="cure-kicker">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
            <p className="cure-chapter__proof">{chapter.proof}</p>
          </div>
        </section>
      ))}

      <section className="cure-materials" id="cure-guide">
        <div className="cure-wrap">
          <div className="cure-section-head reveal">
            <p className="cure-kicker">Cure guide</p>
            <h2>Pick a material. See the cycle.</h2>
            <p>Validated profiles for the indications you print every day.</p>
          </div>
          <CureMaterialGuide />
        </div>
      </section>

      <section className="cure-workflow" id="cure-workflow">
        <div className="cure-wrap">
          <div className="cure-workflow__head reveal">
            <p className="cure-kicker">Digital workflow</p>
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
              >
                <div className="cure-workflow__visual">
                  <span className="cure-workflow__number">0{index + 1}</span>
                  <img src={stage.image} alt={stage.alt} />
                </div>
                <h3>{stage.label}</h3>
                {index < WORKFLOW.length - 1 ? (
                  <span className="cure-workflow__connector" aria-hidden>
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

      <section className="cure-specs" id="cure-precision">
        <div className="cure-wrap cure-specs__grid">
          <div className="cure-specs__intro m-left">
            <p className="cure-kicker">Engineering</p>
            <h2>Complex inside. Clear outside.</h2>
            <p>
              Dual-wavelength light, regulated heat, and guided cycles — presented through a
              calm interface built for daily clinical use.
            </p>
            <Link className="cure-text-link" href="/support#contact">
              Talk to a specialist →
            </Link>
          </div>
          <dl className="cure-specs__list m-stagger">
            {SPECS.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="cure-roi-sec" id="cure-roi">
        <div className="cure-wrap cure-roi-sec__grid">
          <div className="cure-section-head reveal">
            <p className="cure-kicker">ROI calculator</p>
            <h2>What does a faster last step save?</h2>
            <p>
              Model monthly time and cost recovered when Cure UV-02 removes guesswork from every
              cycle.
            </p>
          </div>
          <CureRoiPanel />
        </div>
      </section>

      <section className="cure-ecosystem" id="cure-ecosystem">
        <div className="cure-wrap">
          <div className="cure-section-head reveal">
            <p className="cure-kicker">ODYX ecosystem</p>
            <h2>One workflow, end to end.</h2>
          </div>
          <div className="cure-ecosystem__row m-stagger">
            {ECOSYSTEM.map((product, index) => (
              <div className="cure-eco-item" key={product.name}>
                <Link href={product.href}>
                  <img src={product.image} alt={product.name} />
                  <strong>{product.name}</strong>
                  <span>{product.type}</span>
                </Link>
                {index < ECOSYSTEM.length - 1 ? (
                  <span className="cure-eco-item__join" aria-hidden>
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cure-cases-sec" id="cure-cases">
        <div className="cure-wrap">
          <div className="cure-section-head reveal">
            <p className="cure-kicker">Clinical cases</p>
            <h2>Before. Curing. Finished.</h2>
            <p>Follow common indications from printed green to clinical finish inside UV-02.</p>
          </div>
          <CureClinicalCases />
        </div>
      </section>

      <section className="cure-voice" id="cure-reviews" aria-labelledby="cure-voice-title">
        <div className="cure-voice__glow" aria-hidden />
        <div className="cure-wrap">
          <div className="cure-voice__top reveal">
            <div className="cure-voice__intro">
              <p className="cure-kicker">Social proof</p>
              <h2 id="cure-voice-title">Heard where prints become patients.</h2>
              <p className="cure-voice__lead">
                Clinics and labs talk about the last step the same way — calm, repeatable, done.
              </p>
            </div>
            <ul className="cure-voice__stats" aria-label="Trust signals">
              {VOICE_STATS.map((stat) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cure-voice__stage m-stagger">
            <blockquote className="cure-voice__feature">
              <div className="cure-voice__mark" aria-hidden>
                ”
              </div>
              <div className="cure-voice__stars" aria-label="5 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} />
                ))}
              </div>
              <p>“{REVIEWS[0].quote}”</p>
              <div className="cure-voice__person">
                <span className="cure-voice__avatar" aria-hidden>
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

            <div className="cure-voice__stack">
              {REVIEWS.slice(1).map((review) => (
                <blockquote key={review.name} className="cure-voice__card">
                  <p>“{review.quote}”</p>
                  <div className="cure-voice__person">
                    <span className="cure-voice__avatar" aria-hidden>
                      {review.initials}
                    </span>
                    <div>
                      <strong>{review.name}</strong>
                      <span>
                        {review.role} · {review.place}
                      </span>
                    </div>
                  </div>
                  <span className="cure-voice__focus">{review.focus}</span>
                </blockquote>
              ))}
            </div>
          </div>

          <p className="cure-voice__band" aria-hidden>
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

      <section className="cure-close">
        <div className="cure-close__stage" aria-hidden>
          <img
            src="/img/uw03/hero-packshot.png?v=10"
            alt=""
            width={1223}
            height={933}
          />
          <div className="cure-close__veil" />
        </div>
        <div className="cure-wrap cure-close__content m-scale">
          <p className="cure-hero__brand">ODYX</p>
          <h2>The last step deserves precision.</h2>
          <p>See how Cure UV-02 turns printed parts into dependable clinical outcomes.</p>
          <div className="cure-actions">
            <Link className="cure-btn" href="/support">
              Schedule a Demo
            </Link>
            <Link className="cure-btn cure-btn--ghost" href="/support#manuals">
              Download Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
