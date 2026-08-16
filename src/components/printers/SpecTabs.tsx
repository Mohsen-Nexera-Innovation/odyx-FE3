'use client';

import { useState } from 'react';
import type { PrinterModel } from '@/content/printers-3d';

/**
 * Specifications table. Tabs only appear when more than one model is passed.
 */
export default function SpecTabs({ models }: { models: PrinterModel[] }) {
  const [activeId, setActiveId] = useState(models[0].id);
  const active = models.find((m) => m.id === activeId) ?? models[0];
  const showTabs = models.length > 1;

  return (
    <div className="pf-specs">
      {showTabs && (
        <div className="pf-specs-tabs" role="tablist" aria-label="Printer model">
          {models.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`pf-tab-${m.id}`}
              aria-selected={m.id === activeId}
              aria-controls={`pf-panel-${m.id}`}
              className="pf-tab"
              onClick={() => setActiveId(m.id)}
            >
              {m.name}
            </button>
          ))}
        </div>
      )}
      <p className="pf-specs-intro">
        Every figure below is from the ODYX product catalog, 18 July 2026.
      </p>
      <div
        role={showTabs ? 'tabpanel' : undefined}
        id={`pf-panel-${active.id}`}
        aria-labelledby={showTabs ? `pf-tab-${active.id}` : undefined}
        className="pf-table-scroll"
      >
        <table className="pf-table">
          <tbody>
            {active.specs.map((row) => (
              <tr key={row.label}>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
