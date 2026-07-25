'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ROUTER, type IndicationRow } from '@/content/printers-3d';

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

/**
 * Indication Router — pick what you're printing, get printer → resin line →
 * published cure time. Renders its default selection server-side so it is
 * never an empty panel; a <noscript> table carries the full data without JS.
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

      <div className="pf-router-result" aria-live="polite">
        <div className="pf-rr-chain" data-anim key={active.id}>
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

        {active.certification === 'open' && (
          <p className="pf-rr-open">{ROUTER.openMaterialCopy}</p>
        )}

        <div className="pf-rr-links">
          <Link href={ROUTER.links.resin.href}>{ROUTER.links.resin.label}</Link>
          <Link href={ROUTER.links.cure.href}>{ROUTER.links.cure.label}</Link>
        </div>
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
