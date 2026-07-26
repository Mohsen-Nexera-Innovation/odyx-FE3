import Link from 'next/link';
import DocsTabs from '@/components/resin/DocsTabs';
import {
  COMPARE,
  DOCS,
  ECOSYSTEM,
  GLOSSARY,
  HERO,
  LINES,
  LINES_SECTION,
  LINE_CTA_LABEL,
  SHADES,
  SUBNAV,
  WASH_CURE,
  WORKFLOW_BAND,
} from '@/content/resins';

/* Trust-chip icons — drawn to the client's icon reference
   (knowledge_base/product-photos/resin/icons-resin-chips-ref.jpg):
   bottle lineup · shade fan · cure lamp + stopwatch · certified document */
const CHIP_ICONS: React.ReactNode[] = [
  <svg key="bottles" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9.5 4h5v3.2l1.5 1.8V20h-8V9l1.5-1.8V4z" />
    <path d="M4 9.5h3.5v2L8.5 13v7H3v-7l1-1.5v-2zM16.5 9.5H20v2l1 1.5v7h-5.5v-7l1-1.5v-2z" />
  </svg>,
  <svg key="shades" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 20L7.2 6.8a2.4 2.4 0 1 1 4.5-1.6L12 8M12 20l-1-14a2.4 2.4 0 1 1 4.8 0l-.6 8M12 20l6.2-11.4a2.4 2.4 0 1 1 3.2 3L14 20z" transform="translate(-3 0) scale(.92)" />
    <circle cx="9.2" cy="18.4" r=".9" fill="currentColor" stroke="none" />
  </svg>,
  <svg key="cure" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 6h13M5.5 6v2M9 6v2M12.5 6v2M16 3.5v5M19.5 4.5c.8.8.8 1.6 0 2.4M21.5 3c1.3 1.5 1.3 3.9 0 5.4" />
    <circle cx="10.5" cy="16" r="4.6" />
    <path d="M10.5 13.6V16l1.7 1.4M10.5 10.6V9M8.5 9h4" />
  </svg>,
  <svg key="doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 3H6.8A.8.8 0 0 0 6 3.8v16.4a.8.8 0 0 0 .8.8H17a.8.8 0 0 0 .8-.8V7L14 3z" />
    <path d="M14 3v4h4" />
    <circle cx="15.6" cy="16.4" r="3.4" />
    <path d="M14.2 16.5l1 1 1.9-2" />
  </svg>,
];

const STEP_ICONS: React.ReactNode[] = [
  <svg key="scan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M3 12h18" />
  </svg>,
  <svg key="design" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M9 20h6M12 16v4" />
  </svg>,
  <svg key="print" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 8V4h10v4M5 8h14a1 1 0 0 1 1 1v6h-4v4H8v-4H4V9a1 1 0 0 1 1-1z" />
  </svg>,
  <svg key="cure" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3s6 6.6 6 11a6 6 0 1 1-12 0c0-4.4 6-11 6-11z" />
  </svg>,
  <svg key="deliver" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 4c-2 0-3.5 1.8-3.5 4 0 4 2 12 3.8 12 1.3 0 1.6-3.5 4.7-3.5s3.4 3.5 4.7 3.5c1.8 0 3.8-8 3.8-12 0-2.2-1.5-4-3.5-4-2.2 0-3 1.5-5 1.5S9.2 4 7 4z" />
  </svg>,
];

const ArrowGlyph = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const Dot = () => (
  <svg className="rs-dot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" opacity=".12" />
    <path d="M7.5 12.2l3 3 6-6.4" />
  </svg>
);

/** Client-reference section header: accent bar + short noun title.
 *  <div>, not <header> — odyx.css fixes bare <header> elements (site chrome). */
function SectionHead({ title }: { title: string }) {
  return (
    <div className="rs-shead reveal">
      <h2 className="rs-h2">{title}</h2>
    </div>
  );
}

const lineById = (id: string) => LINES.find((l) => l.id === id)!;

/**
 * 039 · Resins — range-lineup page (range hub with a Detail-grade hero).
 * Spec: knowledge_base/screens/039-resin/ · copy from content.md §4, every
 * number traced in content.md §7 · dials per design-system/odyx/MASTER.md
 * (Variance 3 · Motion 6 · Density 7, dense 6–7 local in matrix + cert table).
 * Bottle renders are design-comp stand-ins until ODYX supplies packshots.
 */
export default function ResinsRangePage() {
  return (
    <div className="rs">
      {/* 1 · Range hero — the lineup page earns the one dark full-bleed (MASTER §6).
          data-hero-dark lets the site header go transparent over the hero and
          switch to its on-light variant once scrolled past it (Header.tsx). */}
      <section className="rs-hero" data-hero-dark>
        <div className="rs-wrap rs-hero-grid">
          <div className="rs-hero-copy">
            <nav className="rs-crumbs reveal" aria-label="Breadcrumb">
              {HERO.breadcrumb.map((c, i) => (
                <span key={c.label}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
                  {i < HERO.breadcrumb.length - 1 && <span className="rs-crumb-sep" aria-hidden> › </span>}
                </span>
              ))}
            </nav>
            <p className="rs-eyebrow reveal">{HERO.eyebrow}</p>
            <h1 className="rs-h1 reveal">{HERO.h1}</h1>
            <p className="rs-display reveal">{HERO.headline}</p>
            <p className="rs-hero-sub reveal">{HERO.sub}</p>
            <div className="rs-hero-ctas reveal">
              <Link className="rs-btn" href={HERO.primaryCta.href}>
                {HERO.primaryCta.label} <ArrowGlyph />
              </Link>
              <a className="rs-btn rs-btn--onDark" href={HERO.secondaryCta.href}>
                {HERO.secondaryCta.label}
              </a>
            </div>
            <ul className="rs-chips">
              {HERO.chips.map((chip, i) => (
                <li key={chip} className="rs-chip reveal">
                  {CHIP_ICONS[i]}
                  <span>{chip}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="rs-hero-media reveal">
            <img src={HERO.img} alt={HERO.imgAlt} width={858} height={606} fetchPriority="high" />
          </figure>
        </div>
      </section>

      {/* Sticky sub-nav — the client's inner links (Types / Applications / Data Sheets / Downloads) */}
      <nav className="rs-subnav" aria-label="Page sections">
        <ul>
          {SUBNAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* 2 · Where resin sits in the workflow — inline spine, PRINT active */}
      <section className="rs-sec" id="workflow">
        <div className="rs-wrap">
          <SectionHead title={WORKFLOW_BAND.title} />
          <div className="rs-card rs-band reveal">
            <div className="rs-band-copy">
              <h3>{WORKFLOW_BAND.headline}</h3>
              <p>{WORKFLOW_BAND.body}</p>
              <div className="rs-band-links">
                <Link href={WORKFLOW_BAND.back.href}>{WORKFLOW_BAND.back.label}</Link>
                <a href={WORKFLOW_BAND.forward.href}>{WORKFLOW_BAND.forward.label}</a>
              </div>
            </div>
            <div className="rs-spine" aria-label="The ODYX workflow, five steps — resin is the material of PRINT">
              {WORKFLOW_BAND.steps.map((step, i) => (
                <span key={step.name} className="rs-spine-step" data-active={i === WORKFLOW_BAND.activeStep}>
                  <span className="rs-spine-node">
                    <span className="rs-spine-ic">{STEP_ICONS[i]}</span>
                    <span className="rs-spine-name">{step.name}</span>
                    <span className="rs-spine-cap">{step.caption}</span>
                  </span>
                  {i < WORKFLOW_BAND.steps.length - 1 && (
                    <span className="rs-spine-arrow" aria-hidden>
                      <ArrowGlyph />
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · The five lines — dense grid, per-line gradient environments (imagery only) */}
      <section className="rs-sec rs-sec--tint" id="lines">
        <div className="rs-wrap">
          <SectionHead title={LINES_SECTION.title} />
          <p className="rs-intro reveal">{LINES_SECTION.intro}</p>
          <div className="rs-lines">
            {LINES.map((line) => (
              <article key={line.id} className="rs-card rs-line reveal" style={{ '--env': line.env } as React.CSSProperties}>
                <div className="rs-line-media">
                  <img src={line.img} alt={line.imgAlt} loading="lazy" width={450} height={450} />
                </div>
                <div className="rs-line-body">
                  <h3>{line.name}</h3>
                  <p className="rs-line-ideal">
                    <b>Ideal for:</b> {line.idealFor}
                  </p>
                  <p className="rs-line-note">{line.highlight}</p>
                  <p className="rs-line-cert" data-kind={line.certKind}>
                    {line.certKind === 'regulatory' ? 'Certified: ' : ''}
                    {line.cert}
                  </p>
                  {/* Routes to per-line docs until the five child pages ship (spec §13.5) */}
                  <a className="rs-line-cta" href={`#docs-${line.id}`}>
                    {LINE_CTA_LABEL} <ArrowGlyph />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Which resin for which job — indication matrix + teaching glossary */}
      <section className="rs-sec" id="compare">
        <div className="rs-wrap">
          <SectionHead title={COMPARE.title} />
          <p className="rs-intro reveal">{COMPARE.intro}</p>
          <div className="rs-card rs-card--pad reveal">
            {/* Desktop / tablet: the matrix scrolls inside its own container, never the page */}
            <div className="rs-table-scroll">
              <table className="rs-matrix">
                <thead>
                  <tr>
                    <th scope="col">Clinical job</th>
                    {LINES.map((l) => (
                      <th scope="col" key={l.id}>
                        {l.name.replace(' Resin', '')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.rows.map((row) => (
                    <tr key={row.job}>
                      <th scope="row">{row.job}</th>
                      {LINES.map((l) => (
                        <td key={l.id} data-yes={row.lines.includes(l.id)}>
                          {row.lines.includes(l.id) ? <Dot /> : <span aria-hidden>—</span>}
                          <span className="rs-visually-hidden">
                            {row.lines.includes(l.id) ? `${l.name} covers this` : 'not indicated'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile: same rows as a per-job list — the matrix never side-scrolls the page */}
            <ul className="rs-matrix-mobile">
              {COMPARE.rows.map((row) => (
                <li key={row.job}>
                  <span className="rs-mm-job">{row.job}</span>
                  <span className="rs-mm-lines">{row.lines.map((id) => lineById(id).name).join(' · ')}</span>
                </li>
              ))}
            </ul>
            <p className="rs-micro">{COMPARE.microcopy}</p>
          </div>
          <div className="rs-gloss reveal">
            <h3 className="rs-gloss-title">{GLOSSARY.title}</h3>
            <div className="rs-gloss-grid">
              {GLOSSARY.terms.map((t) => (
                <details key={t.term} className="rs-gloss-item">
                  <summary>{t.term}</summary>
                  <p>{t.def}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5 · The shade system — split editorial */}
      <section className="rs-sec rs-sec--tint" id="shades">
        <div className="rs-wrap">
          <SectionHead title={SHADES.title} />
          <div className="rs-card rs-shades reveal">
            <div className="rs-shades-copy">
              <h3>{SHADES.headline}</h3>
              <p>{SHADES.body}</p>
              <div className="rs-swatches" role="img" aria-label="The six shades: BL1, A1, A2, A3, B1, B2">
                {SHADES.swatches.map((s) => (
                  <span key={s.code} className="rs-swatch" style={{ '--fill': s.fill } as React.CSSProperties}>
                    <i aria-hidden />
                    <span className="rs-swatch-code">{s.code}</span>
                  </span>
                ))}
              </div>
              <p className="rs-micro">{SHADES.carriedBy}</p>
            </div>
            <figure className="rs-shades-media">
              <img src={SHADES.img} alt={SHADES.imgAlt} loading="lazy" width={1028} height={495} />
            </figure>
          </div>
        </div>
      </section>

      {/* 6 · Wash & cure — the PRINT→WASH & CURE handoff, cross-sell to 037 */}
      <section className="rs-sec" id="wash-cure">
        <div className="rs-wrap">
          <SectionHead title={WASH_CURE.title} />
          <div className="rs-card rs-wash reveal">
            <div className="rs-wash-copy">
              <h3>{WASH_CURE.headline}</h3>
              <p>{WASH_CURE.body}</p>
              <div className="rs-times">
                {WASH_CURE.times.map((t) => (
                  <div key={t.app} className="rs-time">
                    <span className="rs-time-val">{t.time}</span>
                    <span className="rs-time-app">{t.app}</span>
                  </div>
                ))}
              </div>
              <p className="rs-micro">{WASH_CURE.timesNote}</p>
              <div className="rs-waves">
                {WASH_CURE.wavelengths.map((w) => (
                  <span key={w} className="rs-wave">
                    {w}
                  </span>
                ))}
                <span className="rs-waves-note">{WASH_CURE.wavelengthsNote}</span>
              </div>
              <Link className="rs-btn rs-btn--ghost" href={WASH_CURE.link.href}>
                {WASH_CURE.link.label} <ArrowGlyph />
              </Link>
              <p className="rs-micro">{WASH_CURE.microcopy}</p>
            </div>
            <figure className="rs-wash-media">
              <img src={WASH_CURE.img} alt={WASH_CURE.imgAlt} loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* 7 · Documents & certification — tabs + per-line badge table (dense local) */}
      <section className="rs-sec rs-sec--tint" id="downloads">
        <div className="rs-wrap">
          <SectionHead title={DOCS.title} />
          <p className="rs-intro reveal">{DOCS.intro}</p>
          <div className="rs-docs-grid">
            <div className="rs-card rs-card--pad reveal">
              <DocsTabs />
            </div>
            <div className="rs-card rs-card--pad reveal">
              <h3 className="rs-cert-title">{DOCS.certTitle}</h3>
              <div className="rs-table-scroll">
                <table className="rs-cert">
                  <thead>
                    <tr>
                      <th scope="col">Line</th>
                      {DOCS.certColumns.map((c) => (
                        <th scope="col" key={c}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DOCS.certRows.map((row) => (
                      <tr key={row.line}>
                        <th scope="row">{row.line}</th>
                        {DOCS.certColumns.map((c) => (
                          <td key={c} data-yes={row.marks.includes(c)}>
                            {row.marks.includes(c) ? <Dot /> : <span aria-hidden>—</span>}
                            <span className="rs-visually-hidden">{row.marks.includes(c) ? `${c}: yes` : `${c}: no`}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="rs-micro">{DOCS.certMicro}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Ecosystem strip + closing CTA — one primary CTA per page */}
      <section className="rs-sec" id="ecosystem">
        <div className="rs-wrap">
          <SectionHead title={ECOSYSTEM.title} />
          <div className="rs-chain">
            {ECOSYSTEM.nodes.map((node) => (
              <div key={node.name} className="rs-card rs-chain-node reveal" data-active={node.active || undefined}>
                <img src={node.img} alt="" loading="lazy" data-fit={'fit' in node ? node.fit : undefined} />
                <h3>{node.href.startsWith('#') ? <a href={node.href}>{node.name}</a> : <Link href={node.href}>{node.name}</Link>}</h3>
              </div>
            ))}
          </div>
          <div className="rs-closing reveal">
            <h3>{ECOSYSTEM.closing.headline}</h3>
            <p className="rs-intro">{ECOSYSTEM.closing.body}</p>
            <Link className="rs-btn" href={ECOSYSTEM.closing.cta.href}>
              {ECOSYSTEM.closing.cta.label} <ArrowGlyph />
            </Link>
            <p className="rs-cta-micro">{ECOSYSTEM.closing.ctaMicro}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
