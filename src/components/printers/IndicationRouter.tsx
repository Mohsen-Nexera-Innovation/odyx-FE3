'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  OPEN_MATERIAL_PANEL,
  RESIN_LINES,
  ROUTER,
  type IndicationRow,
} from '@/content/printers-3d';

function certLabel(cert: IndicationRow['certification']): string {
  switch (cert) {
    case 'ce-fda':
      return 'CE and FDA cleared';
    case 'none':
      return 'No CE, no FDA';
    case 'open':
      return 'Open material — set by your resin';
  }
}

const ToothGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 4c-2 0-3.5 1.8-3.5 4 0 4 2 12 3.8 12 1.3 0 1.6-3.5 4.7-3.5s3.4 3.5 4.7 3.5c1.8 0 3.8-8 3.8-12 0-2.2-1.5-4-3.5-4-2.2 0-3 1.5-5 1.5S9.2 4 7 4z" />
  </svg>
);

const CameraGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
    <circle cx="12" cy="14" r="3.5" />
  </svg>
);

const ArrowGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/** The matching resin line, imagery-first: scene photo, packshot, per-line certification. */
function ResinLineCard({ row }: { row: IndicationRow }) {
  const line = row.resinId ? RESIN_LINES[row.resinId] : null;

  if (!line) {
    return (
      <aside className="pf-rt-resin pf-rt-resin--open" aria-label={ROUTER.resinCardLabel}>
        <div className="pf-rt-resin-media">
          <img src={OPEN_MATERIAL_PANEL.img} alt={OPEN_MATERIAL_PANEL.imgAlt} loading="lazy" />
        </div>
        <div className="pf-rt-resin-body">
          <div className="pf-rt-resin-label">{ROUTER.resinCardLabel}</div>
          <h3>{OPEN_MATERIAL_PANEL.title}</h3>
          <p>{ROUTER.openMaterialCopy}</p>
          <Link className="pf-rt-resin-cta" href={OPEN_MATERIAL_PANEL.cta.href}>
            {OPEN_MATERIAL_PANEL.cta.label} <ArrowGlyph />
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <aside className="pf-rt-resin" aria-label={ROUTER.resinCardLabel}>
      <div className="pf-rt-resin-media">
        <img src={line.scene} alt={line.sceneAlt} loading="lazy" />
      </div>
      <div className="pf-rt-resin-body">
        <div className="pf-rt-resin-label">{ROUTER.resinCardLabel}</div>
        <div className="pf-rt-resin-id">
          <img className="pf-rt-packshot" src={line.packshot} alt="" loading="lazy" />
          <div>
            <h3>{line.name}</h3>
            <div className="pf-rt-badges">
              <span className="pf-rt-cert-label">{line.cert.label}</span>
              {line.cert.badges.map((b) => (
                <span key={b} className="pf-rt-badge">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p>
          <b>Ideal for</b> {line.idealFor}
        </p>
        <p>{line.highlight}</p>
        <Link className="pf-rt-resin-cta" href={ROUTER.links.resin.href}>
          Explore {line.name} <ArrowGlyph />
        </Link>
      </div>
    </aside>
  );
}

/**
 * Indication Router — pick what you're printing, get printer → resin line →
 * published cure time, the matching resin product, and its clinical cases
 * (placeholder frames until real case photography lands — OPEN-QUESTIONS #12).
 * Renders its default selection server-side so it is never an empty panel;
 * a <noscript> table carries the full data without JS.
 */
export default function IndicationRouter() {
  const [activeId, setActiveId] = useState(ROUTER.indications[0].id);
  const active =
    ROUTER.indications.find((i) => i.id === activeId) ?? ROUTER.indications[0];

  return (
    <div>
      <div
        className="pf-router-chips"
        role="group"
        aria-label="Pick what you are printing"
      >
        {ROUTER.indications.map((row) => (
          <button
            key={row.id}
            type="button"
            className="pf-rchip"
            aria-pressed={row.id === activeId}
            onClick={() => setActiveId(row.id)}
          >
            {row.pick}
          </button>
        ))}
      </div>

      <div className="pf-rt-grid" data-anim key={active.id} aria-live="polite">
        <div className="pf-router-result">
          <div className="pf-rr-chain">
            <div className="pf-rr-node">
              <div className="pf-rr-k">Print it on</div>
              <div className="pf-rr-v">{active.printer}</div>
              {active.printerNote && (
                <div className="pf-rr-note">{active.printerNote}</div>
              )}
            </div>
            <div className="pf-rr-node">
              <div className="pf-rr-k">In</div>
              <div className="pf-rr-v">{active.resin}</div>
              <div className="pf-rr-note">
                {certLabel(active.certification)}
                {active.resinNote ? ` · ${active.resinNote}` : ''}
              </div>
            </div>
            <div className="pf-rr-node">
              <div className="pf-rr-k">Cure</div>
              <div className="pf-rr-v">{active.cure}</div>
            </div>
          </div>

          <div className="pf-rr-links">
            <Link href={ROUTER.links.resin.href}>{ROUTER.links.resin.label}</Link>
            <Link href={ROUTER.links.cure.href}>{ROUTER.links.cure.label}</Link>
          </div>

          <div className="pf-rt-cases">
            <div className="pf-rt-cases-head">
              <h3>{ROUTER.casesLabel}</h3>
              <span className="pf-rt-cases-pick">{active.pick}</span>
            </div>
            <div className="pf-rt-case-grid">
              {active.cases.map((c) => (
                <div key={c.title} className="pf-rt-case">
                  <div className="pf-rt-case-frame" aria-hidden>
                    <ToothGlyph />
                  </div>
                  <div className="pf-rt-case-body">
                    <div className="pf-rt-case-title">{c.title}</div>
                    <div className="pf-rt-case-meta">
                      {active.printer} ·{' '}
                      {active.resinId ? RESIN_LINES[active.resinId].name : 'Open material'}
                    </div>
                    <span className="pf-rt-case-tag">
                      <CameraGlyph /> {ROUTER.casePendingTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <p className="pf-micro">{ROUTER.casesNote}</p>
          </div>
        </div>

        <ResinLineCard row={active} />
      </div>

      {/* Content, not an app: full data without scripting */}
      <noscript>
        <div className="pf-table-scroll" style={{ marginTop: 24 }}>
          <table className="pf-table">
            <thead>
              <tr>
                <th>Pick this</th>
                <th>Printer</th>
                <th>Resin line</th>
                <th>Cure time</th>
              </tr>
            </thead>
            <tbody>
              {ROUTER.indications.map((row) => (
                <tr key={row.id}>
                  <td>{row.pick}</td>
                  <td>
                    {row.printer}
                    {row.printerNote ? ` · ${row.printerNote}` : ''}
                  </td>
                  <td>
                    {row.resin} — {certLabel(row.certification)}
                    {row.resinNote ? ` · ${row.resinNote}` : ''}
                  </td>
                  <td>{row.cure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </noscript>

      <p className="pf-router-foot">{ROUTER.footnote}</p>
    </div>
  );
}
