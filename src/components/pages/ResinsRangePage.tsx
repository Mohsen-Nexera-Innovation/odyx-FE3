import {
  HERO,
  LINES,
  LINES_SECTION,
  LINE_CTA_LABEL,
  WHY,
} from '@/content/resins';

const ICON_V = '2';

/** Icons AI-traced to product-design-refrences/all-resign.jpeg */
const FEATURE_ICONS: Record<string, string> = {
  validated: `/img/resins/icons/hero-validated.png?v=${ICON_V}`,
  strength: `/img/resins/icons/hero-strength.png?v=${ICON_V}`,
  compat: `/img/resins/icons/hero-compat.png?v=${ICON_V}`,
  esthetics: `/img/resins/icons/hero-esthetics.png?v=${ICON_V}`,
};

const WHY_ICONS: Record<string, string> = {
  proven: `/img/resins/icons/why-proven.png?v=${ICON_V}`,
  formulas: `/img/resins/icons/why-formulas.png?v=${ICON_V}`,
  compat: `/img/resins/icons/why-compat.png?v=${ICON_V}`,
  esthetics: `/img/resins/icons/why-esthetics.png?v=${ICON_V}`,
  safe: `/img/resins/icons/why-safe.png?v=${ICON_V}`,
};

const DOCS_ICON = `/img/resins/icons/why-docs.png?v=${ICON_V}`;

/** 039 · Resins — fidelity target: product-design-refrences/all-resign.jpeg */
export default function ResinsRangePage() {
  return (
    <div className="rs">
      <section className="rs-hero" data-hero-dark>
        <div className="rs-hero-glow" aria-hidden />
        <div className="rs-hero-glow rs-hero-glow--streak" aria-hidden />
        <div className="rs-wrap rs-wrap--hero rs-hero-grid">
          <div className="rs-hero-copy">
            <p className="rs-eyebrow">{HERO.title}</p>
            <h1 className="rs-display">{HERO.tagline}</h1>
            <p className="rs-hero-sub">{HERO.sub}</p>
            <ul className="rs-features">
              {HERO.features.map((f) => (
                <li key={f.id} className="rs-feature">
                  <span className="rs-feature-ic" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={FEATURE_ICONS[f.id]} alt="" width={56} height={56} />
                  </span>
                  <span className="rs-feature-copy">
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="rs-hero-media" aria-label={HERO.imgAlt}>
            <div className="rs-hero-products">
              {LINES.map((line, i) => (
                <a
                  key={line.id}
                  className="rs-hero-product-link"
                  href={line.href ?? '#lines'}
                  aria-label={`${line.name} — view product`}
                >
                  <img
                    className="rs-hero-product"
                    src={`${line.img}?v=15`}
                    alt={line.imgAlt}
                    width={800}
                    height={1400}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </a>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section className="rs-sec rs-lines-sec" id="lines">
        <div className="rs-wrap rs-wrap--body">
          <div className="rs-sec-head">
            <p className="rs-sec-eyebrow">{LINES_SECTION.eyebrow}</p>
            <h2 className="rs-sec-title">{LINES_SECTION.title}</h2>
            <p className="rs-sec-intro">{LINES_SECTION.intro}</p>
          </div>
          <div className="rs-lines">
            {LINES.map((line) => (
              <article key={line.id} className={`rs-line rs-line--${line.id}`}>
                <div className="rs-line-media">
                  <img
                    src={`${line.img}?v=15`}
                    alt={line.imgAlt}
                    loading="lazy"
                    width={800}
                    height={1400}
                  />
                </div>
                <div className="rs-line-body">
                  <h3>{line.name}</h3>
                  <p>{line.highlight}</p>
                  <a
                    className="rs-line-cta"
                    href={line.href ?? '#why'}
                  >
                    {LINE_CTA_LABEL} <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-sec rs-why-sec" id="why">
        <div className="rs-wrap rs-wrap--last">
          <div className="rs-why">
            <div className="rs-why-main">
              <p className="rs-why-eyebrow">{WHY.eyebrow}</p>
              <ul className="rs-why-grid">
                {WHY.features.map((f) => (
                  <li key={f.id} className="rs-why-item">
                    <span className="rs-why-ic" aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={WHY_ICONS[f.id]} alt="" width={56} height={56} />
                    </span>
                    <strong>{f.title}</strong>
                    <span>{f.body}</span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="rs-why-docs">
              <span className="rs-why-docs-ic" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={DOCS_ICON} alt="" width={40} height={40} />
              </span>
              <h3>{WHY.docs.title}</h3>
              <p>{WHY.docs.body}</p>
              <a className="rs-line-cta" href={WHY.docs.cta.href}>
                {WHY.docs.cta.label} <span aria-hidden>→</span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
