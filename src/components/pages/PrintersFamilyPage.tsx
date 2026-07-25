import Link from 'next/link';
import HyperHero from '@/components/printers/HyperHero';
import IndicationRouter from '@/components/printers/IndicationRouter';
import SpecTabs from '@/components/printers/SpecTabs';
import {
  DOWNLOADS,
  HALOT_HONEST_LINE,
  HALOT_X1,
  HERO,
  MODELS_INTRO,
  ODYX_CHANGED,
  P1_26,
  P1_26_PRINTS,
  ROUTER,
  RUNNING_COSTS,
  SPECS_SECTION,
  SUBNAV,
  TECH_FEATURES,
  WHY_IN_HOUSE,
  WORKFLOW_SECTION,
  WORKS_WITH,
  type PrinterModel,
} from '@/content/printers-3d';

const CHIP_ICONS: React.ReactNode[] = [
  <svg key="light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1M8 21h8M12 17a5 5 0 1 0-5-5c0 2 1 3.4 2 4.3.6.5 1 1 1 1.7h4c0-.7.4-1.2 1-1.7 1-.9 2-2.3 2-4.3" />
  </svg>,
  <svg key="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3l2 4h-4l2-4zM7 10h10l1 10H6l1-10z" />
  </svg>,
  <svg key="cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 18a4.5 4.5 0 1 1 .6-8.96A6 6 0 0 1 19 11a3.5 3.5 0 0 1-1 7H7z" />
  </svg>,
  <svg key="bench" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 20h18M5 20V8h6v12M13 20V4h6v16" />
  </svg>,
  <svg key="clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>,
];

const STEP_ICONS: React.ReactNode[] = [
  // Scan
  <svg key="scan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M3 12h18" />
  </svg>,
  // Design
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </svg>,
  // Print
  <svg key="print" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 8V4h10v4M5 8h14a1 1 0 0 1 1 1v6h-4v4H8v-4H4V9a1 1 0 0 1 1-1z" />
  </svg>,
  // Wash & Cure
  <svg key="cure" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3s6 6.6 6 11a6 6 0 1 1-12 0c0-4.4 6-11 6-11z" />
  </svg>,
  // Deliver
  <svg key="deliver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 4c-2 0-3.5 1.8-3.5 4 0 4 2 12 3.8 12 1.3 0 1.6-3.5 4.7-3.5s3.4 3.5 4.7 3.5c1.8 0 3.8-8 3.8-12 0-2.2-1.5-4-3.5-4-2.2 0-3 1.5-5 1.5S9.2 4 7 4z" />
  </svg>,
];

const ArrowGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Check = () => (
  <svg className="pf-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" opacity=".12" />
    <path d="M7.5 12.2l3 3 6-6.4" />
  </svg>
);

/**
 * Client-reference style section header: accent bar + short clear title.
 * No description line under the header (client review #20 / Khaled 2026-07-25).
 * Rendered as a <div>, NOT <header> — odyx.css applies `position:fixed` to
 * bare <header> elements (site chrome), which would rip titles out of flow.
 */
function SectionHead({ title }: { title: string }) {
  return (
    <div className="pf-shead reveal">
      <h2 className="pf-h2">{title}</h2>
    </div>
  );
}

function SpecPull({ items }: { items: string[] }) {
  return (
    <div className="pf-specpull">
      {items.map((s) => (
        <div key={s}>{s}</div>
      ))}
    </div>
  );
}

function ModelGallery({ model }: { model: PrinterModel }) {
  if (!model.gallery) return null;
  return (
    <div className="pf-gallery">
      {model.gallery.map((g) => (
        <img key={g.img} src={g.img} alt={g.alt} loading="lazy" />
      ))}
    </div>
  );
}

/**
 * 036 · 3D Printers — product-family (forked) page, reference-anchored build.
 * Spec: knowledge_base/screens/036-3d-printers/ · copy from content.md §4,
 * every number traced in content.md §7 · dials per design-system/odyx/MASTER.md
 * (Variance 3 · Motion 6 · Density 7). Proof (§10) stays hidden until real
 * cases exist; downloads render "on request" (knowledge_base/OPEN-QUESTIONS.md).
 */
export default function PrintersFamilyPage() {
  return (
    <div className="pf">
      {/* 1 · Hero — 3D & Hyperrealism (CSS-tier), dark cinematic ground */}
      <HyperHero
        chips={HERO.chips.map((label, i) => ({ label, icon: CHIP_ICONS[i] }))}
      />

      {/* Sticky sub-nav — the client's four inner links */}
      <nav className="pf-subnav" aria-label="Page sections">
        <ul>
          {SUBNAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2 · Why print in-house — two boxed checklists with imagery */}
      <section className="pf-sec">
        <div className="pf-wrap">
          <SectionHead title={WHY_IN_HOUSE.title} />
          <div className="pf-card pf-why reveal">
            {WHY_IN_HOUSE.cards.map((card) => (
              <div key={card.label} className="pf-why-col">
                <div className="pf-why-head">
                  <img src={card.img} alt={card.imgAlt} loading="lazy" />
                  <h3>{card.label}</h3>
                </div>
                <ul className="pf-checklist">
                  {card.points.map((p) => (
                    <li key={p}>
                      <Check />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · The two printers */}
      <section className="pf-sec pf-sec--tint" id="models">
        <div className="pf-wrap">
          <SectionHead title={MODELS_INTRO.title} />

          <article className="pf-card pf-model" id="p1-26">
            <div className="pf-model-media reveal">
              <img src={P1_26.img} alt={P1_26.imgAlt} width={870} height={1400} loading="lazy" />
            </div>
            <div className="pf-model-copy">
              <div className="pf-model-label reveal">{P1_26.label}</div>
              <h3 className="reveal">{P1_26.name}</h3>
              <p className="pf-model-headline reveal">{P1_26.headline}</p>
              <p className="pf-model-body reveal">{P1_26.body}</p>
              <SpecPull items={P1_26.specPull} />
              <ModelGallery model={P1_26} />
              <p className="pf-prints reveal">
                <b>{P1_26_PRINTS.label}:</b> {P1_26_PRINTS.items.join(' · ')} —
                each with the resin line cleared for it.
              </p>
              <p className="pf-micro reveal">
                {P1_26_PRINTS.microcopy}{' '}
                <Link href={P1_26_PRINTS.microcopyLink.href}>
                  {P1_26_PRINTS.microcopyLink.label}
                </Link>
              </p>
            </div>
          </article>

          <article className="pf-card pf-model pf-model--halot" id="halot-x1">
            <div className="pf-model-media reveal">
              <img src={HALOT_X1.img} alt={HALOT_X1.imgAlt} width={429} height={431} loading="lazy" />
            </div>
            <div className="pf-model-copy">
              <div className="pf-model-label reveal">{HALOT_X1.label}</div>
              <h3 className="reveal">{HALOT_X1.name}</h3>
              <p className="pf-model-headline reveal">{HALOT_X1.headline}</p>
              <p className="pf-model-body reveal">{HALOT_X1.body}</p>
              <SpecPull items={HALOT_X1.specPull} />
              <ModelGallery model={HALOT_X1} />
              <div className="pf-honest reveal">
                <p>{HALOT_HONEST_LINE.body}</p>
                <p>
                  <b>Suitable for</b> {HALOT_HONEST_LINE.suitable}
                </p>
                <p>
                  <b>Not recommended for</b> {HALOT_HONEST_LINE.notRecommended}
                </p>
              </div>
              <p className="pf-micro reveal">{HALOT_HONEST_LINE.microcopy}</p>
            </div>
          </article>
        </div>
      </section>

      {/* 4 · Technical features — image-card grid */}
      <section className="pf-sec" id="features">
        <div className="pf-wrap">
          <SectionHead title={TECH_FEATURES.title} />
          <div className="pf-feat-grid">
            {TECH_FEATURES.cards.map((f) => (
              <article key={f.title} className="pf-card pf-feat reveal">
                <div className="pf-feat-media">
                  <img src={f.img} alt={f.alt} loading="lazy" />
                  <span className="pf-badge" data-model={f.model}>
                    {f.model}
                  </span>
                </div>
                <div className="pf-feat-body">
                  <h3>{f.title}</h3>
                  <p>{f.line}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · Indication router */}
      <section className="pf-sec pf-sec--tint" id="indications">
        <div className="pf-wrap">
          <div className="pf-router-head">
            <SectionHead title={ROUTER.title} />
            <img
              className="pf-router-img reveal"
              src={ROUTER.img}
              alt={ROUTER.imgAlt}
              loading="lazy"
            />
          </div>
          <IndicationRouter />
        </div>
      </section>

      {/* 6 · Specifications */}
      <section className="pf-sec" id="specs">
        <div className="pf-wrap">
          <SectionHead title={SPECS_SECTION.title} />
          <div className="pf-card pf-card--pad reveal">
            <SpecTabs models={[P1_26, HALOT_X1]} />
          </div>
        </div>
      </section>

      {/* 7 · Running costs — tight against specs: one argument */}
      <section className="pf-sec pf-sec--tight pf-costs" id="running-costs">
        <div className="pf-wrap">
          <SectionHead title={RUNNING_COSTS.title} />
          <div className="pf-card pf-card--pad reveal">
            <div className="pf-table-scroll">
              <table className="pf-table">
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>ODYX P1-26</th>
                    <th>ODYX HALOT-X1</th>
                  </tr>
                </thead>
                <tbody>
                  {RUNNING_COSTS.rows.map((row) => (
                    <tr key={row.part}>
                      <td>{row.part}</td>
                      <td>{row.p126}</td>
                      <td>{row.halot}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="pf-micro" style={{ marginTop: 12 }}>
              {RUNNING_COSTS.microcopy}
            </p>
          </div>
        </div>
      </section>

      {/* 8 · What ODYX changed */}
      <section className="pf-sec pf-sec--tint" id="engineered">
        <div className="pf-wrap">
          <SectionHead title={ODYX_CHANGED.title} />
          <div className="pf-card pf-changed reveal">
            <figure className="pf-changed-media">
              <img src={ODYX_CHANGED.img} alt={ODYX_CHANGED.imgAlt} loading="lazy" />
            </figure>
            <ol className="pf-callouts">
              {ODYX_CHANGED.callouts.map((c, i) => (
                <li key={c.title} className="pf-callout reveal">
                  <span className="pf-callout-n" aria-hidden>
                    {i + 1}
                  </span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 9 · PRINT, in the workflow — the one dark section */}
      <section className="pf-sec pf-sec--dark" id="workflow">
        <div className="pf-wrap">
          <SectionHead title={WORKFLOW_SECTION.title} />
          <div className="pf-spine" aria-label="The ODYX workflow, five steps">
            {WORKFLOW_SECTION.steps.map((step, i) => (
              <span
                key={step}
                className="pf-spine-step reveal"
                data-active={i === WORKFLOW_SECTION.activeStep}
              >
                <span className="pf-spine-node">
                  <span className="pf-spine-ic">{STEP_ICONS[i]}</span>
                  <span className="pf-spine-name">{step}</span>
                </span>
                {i < WORKFLOW_SECTION.steps.length - 1 && (
                  <span className="pf-spine-arrow" aria-hidden>
                    <ArrowGlyph />
                  </span>
                )}
              </span>
            ))}
          </div>
          <div className="pf-workflow-grid">
            <div>
              <p className="pf-step-copy reveal">{WORKFLOW_SECTION.stepCopy}</p>
              <div className="pf-neighbours">
                <div className="pf-neighbour reveal">
                  <p>{WORKFLOW_SECTION.back.copy}</p>
                  <Link href={WORKFLOW_SECTION.back.link.href}>
                    {WORKFLOW_SECTION.back.link.label}
                  </Link>
                </div>
                <div className="pf-neighbour reveal">
                  <p>{WORKFLOW_SECTION.forward.copy}</p>
                  <Link href={WORKFLOW_SECTION.forward.link.href}>
                    {WORKFLOW_SECTION.forward.link.label}
                  </Link>
                </div>
              </div>
              <Link className="pf-btn pf-btn--onDark reveal" href={WORKFLOW_SECTION.followAll.href}>
                {WORKFLOW_SECTION.followAll.label} <ArrowGlyph />
              </Link>
            </div>
            <figure className="pf-workflow-media reveal">
              <img src={WORKFLOW_SECTION.img} alt={WORKFLOW_SECTION.imgAlt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* 10 · Ecosystem — product-image chain with dotted connectors */}
      <section className="pf-sec" id="ecosystem">
        <div className="pf-wrap">
          <SectionHead title={WORKS_WITH.title} />
          <div className="pf-chain">
            {WORKS_WITH.nodes.map((node) => (
              <div key={node.name} className="pf-card pf-chain-node reveal">
                <img src={node.img} alt="" loading="lazy" />
                <h3>
                  {node.href.startsWith('#') ? (
                    <a href={node.href}>{node.name}</a>
                  ) : (
                    <Link href={node.href}>{node.name}</Link>
                  )}
                </h3>
                <p>{node.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof (§10 of the spec) stays hidden until real cases and named clinicians exist */}

      {/* 11 · Downloads + demo */}
      <section className="pf-sec pf-sec--tint" id="downloads">
        <div className="pf-wrap">
          <SectionHead title={DOWNLOADS.title} />
          <div className="pf-card pf-downloads reveal">
            <div className="pf-downloads-copy">
              <p className="pf-downloads-line">{DOWNLOADS.emptyCopy}</p>
              <h3>{DOWNLOADS.closing.headline}</h3>
              <p className="pf-intro">{DOWNLOADS.closing.sub}</p>
              <div className="pf-hero-ctas">
                <Link className="pf-btn" href={DOWNLOADS.closing.cta.href}>
                  {DOWNLOADS.closing.cta.label} <ArrowGlyph />
                </Link>
              </div>
              <p className="pf-cta-micro">{DOWNLOADS.closing.ctaMicrocopy}</p>
            </div>
            <img src={DOWNLOADS.img} alt={DOWNLOADS.imgAlt} loading="lazy" />
          </div>
        </div>
      </section>
    </div>
  );
}
