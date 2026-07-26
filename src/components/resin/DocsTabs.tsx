'use client';
// 039 · Resins — tabbed TDS/SDS block (Formlabs document-architecture pattern,
// content.md §10). Both tabs render the "on request" empty state until the
// Scientific Team supplies real files (screen-details §10 / §13.1).
import { useState } from 'react';
import { DOCS, LINES } from '@/content/resins';

const DocGlyph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4z" />
    <path d="M14 3v4h4M9 13h6M9 17h6" />
  </svg>
);

export default function DocsTabs() {
  const [tab, setTab] = useState(0);
  const doc = DOCS.docNames[tab];
  return (
    <div className="rs-docs">
      <div className="rs-tabs" role="tablist" aria-label="Document type">
        {DOCS.tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`rs-tab-${i}`}
            aria-selected={i === tab}
            aria-controls="rs-tabpanel"
            className="rs-tab"
            data-active={i === tab}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div id="rs-tabpanel" role="tabpanel" aria-labelledby={`rs-tab-${tab}`} className="rs-doclist">
        {LINES.map((line) => (
          <div key={line.id} className="rs-docrow" id={`docs-${line.id}`}>
            <span className="rs-docrow-ic" aria-hidden>
              <DocGlyph />
            </span>
            <div className="rs-docrow-copy">
              <span className="rs-docrow-line">{line.name}</span>
              <span className="rs-docrow-doc">{doc}</span>
            </div>
            <a className="rs-docrow-cta" href={DOCS.requestHref(line.name, doc)}>
              {/* Empty state until real documents exist — contact path, never an empty tab */}
              Request
            </a>
          </div>
        ))}
        <p className="rs-micro">{DOCS.emptyLine}</p>
      </div>
    </div>
  );
}
