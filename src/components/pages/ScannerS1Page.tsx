import Link from 'next/link';
import LaptopScanDemo from '@/components/scanner/LaptopScanDemo';
import {
  CHAIRSIDE,
  DOWNLOADS,
  FAQ,
  HERO,
  NEXT_STEP,
  OPEN_SYSTEM,
  SCAN_ACTION,
  SOFTWARE,
  SPECS,
  SUBNAV,
  WHY_CHIPS,
  WORKFLOW_STEPS,
} from '@/content/scanner-s1';

/* Chip icons — same stroke style as the printers page (Lucide-like, 2px) */
const CHIP_ICONS: React.ReactNode[] = [
  // ≤20 µm accuracy — crosshair
  <svg key="acc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="7" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
  </svg>,
  // 40 s full arch — timer
  <svg key="speed" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2.5M9 2h6" />
  </svg>,
  // 270 g — feather
  <svg key="weight" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.2 6.4c1.9 1.9 1.7 5.2-.4 7.3L9 24l-1-1 4-4H6l-3 3-1-1 3-3v-6l10.3-10.3c2.1-2.1 5.4-2.3 7.3-.4z" transform="scale(.82) translate(2 -1)" />
  </svg>,
  // AI margin detection — sparkles
  <svg key="ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 4l1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7L12 4zM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
  </svg>,
  // Open system — unlocked padlock
  <svg key="open" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="4" y="11" width="14" height="9" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 7.7-1.5" />
  </svg>,
];

/* Scan / Print / Wash & Cure carry the product icon renders (client-supplied);
   Design and Deliver keep line glyphs — no icon assets exist for them yet. */
const STEP_ICONS: React.ReactNode[] = [
  <img key="scan" src="/img/scanner/step-scan.jpg" alt="" loading="lazy" />,
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </svg>,
  <img key="print" src="/img/scanner/step-print.jpg" alt="" loading="lazy" />,
  <img key="cure" src="/img/scanner/step-cure.jpg" alt="" loading="lazy" />,
  <svg key="deliver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 4c-2 0-3.5 1.8-3.5 4 0 4 2 12 3.8 12 1.3 0 1.6-3.5 4.7-3.5s3.4 3.5 4.7 3.5c1.8 0 3.8-8 3.8-12 0-2.2-1.5-4-3.5-4-2.2 0-3 1.5-5 1.5S9.2 4 7 4z" />
  </svg>,
];

const ArrowGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** Five-dot workflow micro-spine — `active` dot filled (hero: step 1; design hand-off: step 2). */
function MicroSpine({ active = 0 }: { active?: number }) {
  return (
    <span className="sc-microspine" aria-hidden>
      {WORKFLOW_STEPS.map((s, i) => (
        <span key={s} className="sc-microspine-dot" data-active={i === active} />
      ))}
    </span>
  );
}

/** Client-reference section header: accent bar + short title.
 * <div>, not <header> — odyx.css fixes bare <header> elements (site chrome). */
function SectionHead({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <div className="sc-shead reveal">
      {eyebrow && <span className="sc-eyebrow">{eyebrow}</span>}
      <h2 className="sc-h2">{title}</h2>
    </div>
  );
}

/**
 * 034 · Intraoral Scanner — ODYX-S1 product detail page.
 * Spec: knowledge_base/screens/034-interoral-scanner/ · copy from content.md §4,
 * every number traced in content.md §7 · dials per design-system/odyx/MASTER.md
 * (Variance 3 · Motion 6 · Density 7): card-dense, imagery-first, bar-titled.
 * Light all the way down (sub-design-system §2: no dark band on this page) with
 * the Scanners family teal #3A9C96 as the Axis-A accent. Clinical cases (§9)
 * stay hidden until real cases and named clinicians exist (Halim #32).
 */
export default function ScannerS1Page() {
  return (
    <div className="sc">
      {/* 1 · Hero — light split, model name as H1 (review #22).
          data-hero-light switches the site header to its on-light variant. */}
      <section className="sc-hero" id="overview" data-hero-light>
        <div className="sc-wrap">
          <div className="sc-hero-copy">
            <p className="sc-hero-eyebrow reveal">
              <MicroSpine />
              <span className="sc-eyebrow">{HERO.eyebrow}</span>
            </p>
            <h1 className="reveal">{HERO.h1}</h1>
            <p className="sc-hero-sub reveal">{HERO.sub}</p>
            <p className="sc-hero-body reveal">{HERO.body}</p>
            <div className="sc-hero-ctas reveal">
              <Link className="sc-btn" href={HERO.ctaPrimary.href}>
                {HERO.ctaPrimary.label} <ArrowGlyph />
              </Link>
              <a className="sc-btn sc-btn--ghost" href={HERO.ctaSecondary.href}>
                {HERO.ctaSecondary.label}
              </a>
            </div>
            <p className="sc-cta-micro reveal">{HERO.ctaMicrocopy}</p>
          </div>
          <figure className="sc-hero-media reveal">
            <img src={HERO.img} alt={HERO.imgAlt} width={1536} height={1024} fetchPriority="high" />
          </figure>
        </div>
      </section>

      {/* Sticky sub-nav — the client's four inner links */}
      <nav className="sc-subnav" aria-label="Page sections">
        <ul>
          {SUBNAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2 · Why S1 — five proof chips */}
      <section className="sc-sec sc-sec--tint">
        <div className="sc-wrap">
          <SectionHead title="Why the S1" />
          <ul className="sc-chips">
            {WHY_CHIPS.map((chip, i) => (
              <li key={chip.label} className="sc-chip reveal">
                {CHIP_ICONS[i]}
                <b className="sc-chip-figure">{chip.figure}</b>
                <span className="sc-chip-label">{chip.label}</span>
                <span className="sc-chip-line">{chip.line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · Clean by design — the chairside argument */}
      <section className="sc-sec">
        <div className="sc-wrap">
          <SectionHead eyebrow={CHAIRSIDE.eyebrow} title={CHAIRSIDE.title} />
          <div className="sc-card sc-split reveal">
            <figure className="sc-split-media">
              <img src={CHAIRSIDE.img} alt={CHAIRSIDE.imgAlt} loading="lazy" />
              <figcaption>{CHAIRSIDE.caption}</figcaption>
            </figure>
            <div className="sc-split-copy">
              <p>{CHAIRSIDE.body}</p>
              <ul className="sc-facts">
                <li><b>270 g</b><span>in the hand, all day</span></li>
                <li><b>20 × 17 mm</b><span>rounded tip</span></li>
                <li><b>0 touches</b><span>screen stays clean — remote control from the wand</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4 · Scan in action — laptop software demo + applications (.STL badges) */}
      <section className="sc-sec sc-sec--tint" id="applications">
        <div className="sc-wrap">
          <SectionHead title={SCAN_ACTION.title} />
          <p className="sc-intro reveal">{SCAN_ACTION.body}</p>
          <LaptopScanDemo demo={SCAN_ACTION.demo} />
          <div className="sc-apps reveal">
            <span className="sc-apps-label">{SCAN_ACTION.applicationsLabel}</span>
            <ul className="sc-apps-list">
              {SCAN_ACTION.applications.map((app) => (
                <li key={app} className="sc-app">
                  {app} <span className="sc-stl" aria-label="exports as STL">.STL</span>
                </li>
              ))}
            </ul>
            <p className="sc-micro">{SCAN_ACTION.microcopy}</p>
          </div>
        </div>
      </section>

      {/* 5 · Software that works with you — catalog-backed features only (§13.4) */}
      <section className="sc-sec">
        <div className="sc-wrap">
          <SectionHead title={SOFTWARE.title} />
          <div className="sc-panels">
            {SOFTWARE.panels.map((panel) => (
              <article key={panel.title} className="sc-card sc-panel reveal">
                <div className="sc-panel-media">
                  <img src={panel.img} alt={panel.imgAlt} loading="lazy" />
                </div>
                <div className="sc-panel-body">
                  <h3>{panel.title}</h3>
                  <p>{panel.body}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="sc-linkout reveal">
            <Link href={SOFTWARE.linkOut.href}>
              {SOFTWARE.linkOut.label} <ArrowGlyph />
            </Link>
          </p>
        </div>
      </section>

      {/* 6 · Specifications — the lab's section, locally dense */}
      <section className="sc-sec sc-sec--tint" id="specs">
        <div className="sc-wrap">
          <SectionHead title={SPECS.title} />
          <div className="sc-card sc-card--pad reveal">
            <p className="sc-specs-intro">{SPECS.intro}</p>
            <dl className="sc-specgrid">
              {SPECS.rows.map((row) => (
                <div key={row.label} className="sc-specrow">
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 7 · Open system — the anti-lock-in statement */}
      <section className="sc-sec">
        <div className="sc-wrap">
          <div className="sc-card sc-open reveal">
            <div className="sc-open-copy">
              <h2 className="sc-open-h">{OPEN_SYSTEM.title}</h2>
              <p>{OPEN_SYSTEM.body}</p>
              <p className="sc-micro">
                {OPEN_SYSTEM.microcopy}{' '}
                <Link href="/products/3d-printers">See the P1-26</Link>
              </p>
            </div>
            <figure className="sc-open-media">
              <img src={OPEN_SYSTEM.img} alt={OPEN_SYSTEM.imgAlt} loading="lazy" />
            </figure>
            {/* 7b · DESIGN hand-off — the next phase of the ecosystem (screen-details §6/§7) */}
            <div className="sc-open-next reveal">
              <div className="sc-open-next-copy">
                <p className="sc-open-next-eyebrow">
                  <MicroSpine active={1} />
                  <span className="sc-eyebrow">{OPEN_SYSTEM.next.eyebrow}</span>
                </p>
                <h3>{OPEN_SYSTEM.next.title}</h3>
                <p>{OPEN_SYSTEM.next.body}</p>
              </div>
              <Link className="sc-btn sc-btn--ghost sc-open-next-cta" href={OPEN_SYSTEM.next.cta.href}>
                {OPEN_SYSTEM.next.cta.label} <ArrowGlyph />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Your scan's next step — workflow stepper + ecosystem strip */}
      <section className="sc-sec sc-sec--tint">
        <div className="sc-wrap">
          <SectionHead eyebrow={NEXT_STEP.eyebrow} title={NEXT_STEP.title} />
          <div className="sc-spine" aria-label="The ODYX workflow, five steps">
            {WORKFLOW_STEPS.map((step, i) => (
              <span key={step} className="sc-spine-step reveal" data-active={i === NEXT_STEP.activeStep}>
                <span className="sc-spine-node">
                  <span className="sc-spine-ic">{STEP_ICONS[i]}</span>
                  <span className="sc-spine-name">{step}</span>
                </span>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <span className="sc-spine-arrow" aria-hidden>
                    <ArrowGlyph />
                  </span>
                )}
              </span>
            ))}
          </div>
          <p className="sc-intro reveal">{NEXT_STEP.body}</p>
          <div className="sc-chain">
            {NEXT_STEP.ecosystem.map((node) => (
              <div key={node.name} className="sc-card sc-chain-node reveal">
                <img src={node.img} alt="" loading="lazy" data-fit={'fit' in node ? node.fit : undefined} />
                <h3>
                  <Link href={node.href}>{node.name}</Link>
                </h3>
                <p>{node.line}</p>
              </div>
            ))}
          </div>
          <p className="sc-linkout reveal">
            <Link href={NEXT_STEP.linkOut.href}>
              {NEXT_STEP.linkOut.label} <ArrowGlyph />
            </Link>
          </p>
        </div>
      </section>

      {/* 9 · Clinical cases & reviews — hidden until client supplies real cases
          and named clinicians (screen-details §13.3, Halim #32). Never fabricated. */}

      {/* 10 · FAQ + Downloads + closing CTA */}
      <section className="sc-sec" id="downloads">
        <div className="sc-wrap">
          <div className="sc-final">
            <div className="sc-faq">
              <SectionHead title={FAQ.title} />
              {FAQ.items.map((item) => (
                <details key={item.q} className="sc-faq-item reveal">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
            <div className="sc-card sc-closing reveal">
              <h2 className="sc-h3">{DOWNLOADS.title}</h2>
              <p className="sc-downloads-line">{DOWNLOADS.emptyCopy}</p>
              <hr className="sc-rule" />
              <h3 className="sc-closing-h">{DOWNLOADS.closing.headline}</h3>
              <p>{DOWNLOADS.closing.sub}</p>
              <div className="sc-hero-ctas">
                <Link className="sc-btn" href={DOWNLOADS.closing.cta.href}>
                  {DOWNLOADS.closing.cta.label} <ArrowGlyph />
                </Link>
              </div>
              <p className="sc-cta-micro">{DOWNLOADS.closing.ctaMicrocopy}</p>
              <p className="sc-rep">
                <Link href={DOWNLOADS.closing.secondary.href}>{DOWNLOADS.closing.secondary.label}</Link>
                <span> — {DOWNLOADS.closing.secondaryMicrocopy}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
