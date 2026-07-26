/**
 * 034 · "See the S1 at work" — CSS-built laptop running the scan software.
 * Staging follows the client reference (knowledge_base/product-photos/odyx-s1/
 * scanner-with-software.png): scanned arch in the viewport, File-export card,
 * margin / soft-tissue chips. The page's signature scan-sweep moment is restaged
 * on-screen: a teal scan line loops across the viewport rebuilding the arch
 * photo into its mesh — pure CSS animation, no JS. Reduced motion shows the
 * finished mesh, no sweep. All on-screen claims trace to the claims register
 * (content.md §7). Replaces the pinned ScanSweep (kept the moment, lost the pin).
 */
import type { SCAN_ACTION } from '@/content/scanner-s1';

type Demo = (typeof SCAN_ACTION)['demo'];

/* Viewport tool rail — abstract 2px-stroke glyphs, deliberately generic */
const TOOL_ICONS: React.ReactNode[] = [
  // select
  <svg key="sel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M6 3l14 8-6.5 1.5L11 19 6 3z" />
  </svg>,
  // orbit / rotate
  <svg key="rot" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M20 12a8 8 0 1 1-3-6.2" />
    <path d="M17 2.5l.3 3.6 3.5-.6" />
  </svg>,
  // pan
  <svg key="pan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M12 3v18M3 12h18M12 3l-2.5 2.5M12 3l2.5 2.5M12 21l-2.5-2.5M12 21l2.5-2.5M3 12l2.5-2.5M3 12l2.5 2.5M21 12l-2.5-2.5M21 12l-2.5 2.5" />
  </svg>,
  // zoom
  <svg key="zoom" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5" />
  </svg>,
  // mesh
  <svg key="mesh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M4 18L12 4l8 14H4zM8.5 18L12 11l3.5 7M12 4v7" />
  </svg>,
  // color
  <svg key="col" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11z" />
  </svg>,
  // margin trace
  <svg key="mar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M4 17c3-6 5 3 8-3s5 1 8-5" strokeDasharray="3 3" />
    <path d="M17 4l3 3-9 9-4 1 1-4 9-9z" transform="scale(.6) translate(13 13)" />
  </svg>,
  // trim
  <svg key="trim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <path d="M8.5 8.3L20 20M8.5 15.7L20 4" />
  </svg>,
];

export default function LaptopScanDemo({ demo }: { demo: Demo }) {
  return (
    <div className="sc-laptop-wrap reveal">
      <figure className="sc-laptop" role="img" aria-label={demo.alt}>
        <div className="sc-laptop-lid" aria-hidden>
          <span className="sc-laptop-cam" />
          <div className="sc-ui">
            {/* Window bar */}
            <div className="sc-ui-bar">
              <span className="sc-ui-dots"><i /><i /><i /></span>
              <span className="sc-ui-title">{demo.appTitle}</span>
              <span className="sc-ui-case">{demo.caseLabel}</span>
            </div>
            {/* Tool rail */}
            <div className="sc-ui-tools">
              {TOOL_ICONS.map((icon, i) => (
                <span key={i} data-on={i === 1 ? '' : undefined}>{icon}</span>
              ))}
            </div>
            {/* Viewport — arch photo resolves into the mesh behind the scan line */}
            <div className="sc-ui-stage">
              <div className="sc-ui-model">
                <img className="sc-ui-mesh" src={demo.mesh} alt="" loading="lazy" />
                <img className="sc-ui-photo" src={demo.photo} alt="" loading="lazy" />
                <span className="sc-scanline-track"><i className="sc-scanline" /></span>
              </div>
              <span className="sc-ui-chip sc-ui-chip--live">{demo.liveChip}</span>
              <div className="sc-ui-chips">
                <span className="sc-ui-chip">{demo.marginChip}</span>
                <span className="sc-ui-chip">{demo.tissueChip}</span>
              </div>
              {/* File-export card — the open-system proof, per the client reference */}
              <div className="sc-ui-export">
                <b>{demo.exportCard.title}</b>
                <span className="sc-ui-export-btn sc-ui-export-btn--stl">{demo.exportCard.stl}</span>
                <span className="sc-ui-export-btn sc-ui-export-btn--obj">{demo.exportCard.obj}</span>
                <small>{demo.exportCard.note}</small>
              </div>
            </div>
            {/* Status bar */}
            <div className="sc-ui-status">
              <span className="sc-ui-status-label">{demo.progressLabel}</span>
              <span className="sc-ui-progress"><i /></span>
              <span className="sc-ui-status-acc">{demo.statusAccuracy}</span>
            </div>
            <span className="sc-ui-glare" />
          </div>
        </div>
        <div className="sc-laptop-base" aria-hidden />
        <div className="sc-laptop-shadow" aria-hidden />
      </figure>
      <p className="sc-laptop-hint">{demo.hint}</p>
    </div>
  );
}
