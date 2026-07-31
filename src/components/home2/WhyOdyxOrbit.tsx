// Why ODYX — the client's orbit infographic (new-why-odyx reference).
//
// The whole diagram is laid out in the reference's own coordinate system:
// a 1041 x 434 stage, with every position, size and font measured off the
// mock in those units and converted with `--u` (one reference pixel, in
// container-query units). The stage keeps the 1041/434 aspect ratio, so the
// composition scales proportionally and stays pixel-faithful at any width.
//
// Positions are logical (inset-inline-start), so Arabic mirrors the whole
// orbit instead of colliding with it.

type Item = {
  key: string;
  icon: keyof typeof WO_IC;
  title: string;
  desc: string;
  /* icon-circle centre and text-block start, in reference pixels */
  icx: number;
  icy: number;
  tx: number;
  ty: number;
  /* starting point on the orbit, as a clockwise fraction from 3 o'clock —
     chosen so each card sets off from (near) its position in the mock */
  ph: number;
};

// Icon glyphs traced off the reference: outline, round caps, ODYX blue.
// The 24-unit box renders at 27 reference px; 1.65 keeps the stroke a
// touch lighter than the mock's icons so they don't outweigh the bubbles.
const WO_IC = {
  target: (
    // Dart in a target: both rings break where the shaft passes through.
    // The arcs opt out of the CSS frosted fill (filling an open arc closes
    // it into a disc and drowns the rings); a backing circle carries the
    // frosted tint instead.
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11.2" cy="13.5" r="9.6" fill="rgba(0,80,216,.1)" stroke="none" />
      <path d="M16.6 3.7a10 10 0 1 0 4.1 6.4" fill="none" />
      <path d="M14.2 8.3a5.5 5.5 0 1 0 2 4.7" fill="none" />
      <circle cx="11.2" cy="13.5" r="1.25" fill="currentColor" stroke="none" />
      <path d="m11.2 13.5 8.6-8.6" />
      <path d="M17.1 2.6 18 6l3.4.9-.6-4.3z" fill="currentColor" stroke="none" />
      <path d="M17.1 2.6 18 6l3.4.9-.6-4.3z" />
    </svg>
  ),
  nodes: (
    // Connector piece: one concave body with four round knobs — the mock's
    // "everything clicks together" mark. Frosted at half strength: the
    // silhouette is blobby, so a full fill swallows the knob detail.
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9.6 5.5a2.6 2.6 0 1 1 4.1.6c.6 2.6 2 3.9 4.1 4.4a2.6 2.6 0 1 1 .3 4.2c-1.8.5-2.7 1.7-3.1 3.3a2.45 2.45 0 1 1-3.8.8c-1.4-1.8-2.9-2.5-4.6-2.2a2.55 2.55 0 1 1-1.3-4c1.2-1.5 1.4-3 .9-4.6a2.6 2.6 0 1 1 3.4-2.5Z" fill="rgba(0,80,216,.05)" />
    </svg>
  ),
  puzzle: (
    // Square piece: knob out on top, sockets in on the left and bottom.
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.3 4.6a2.7 2.7 0 1 1 5.4 0H22.4v6.7h-.8a2.7 2.7 0 1 0 0 5.4h.8v4.7H15.5v-.8a2.7 2.7 0 1 0-5.4 0v.8H2.2v-4.7h.8a2.7 2.7 0 1 0 0-5.4h-.8V4.6z" />
    </svg>
  ),
  cap: (
    // Mortarboard with a hanging tassel bead.
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4.1 1.9 9.2 12 14.3l10.1-5.1z" />
      <path d="M5.8 11.4v4.9c0 1.6 2.8 2.9 6.2 2.9s6.2-1.3 6.2-2.9v-4.9" />
      <path d="M20.6 10.5v5" />
      <path d="M20.6 17.6a1.05 1.05 0 1 0 0-2.1 1.05 1.05 0 0 0 0 2.1Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22.2c5-2.3 7.8-6.2 7.8-11.1V4.7a9.4 9.4 0 0 1-4.8-1.2L12 1.6 9 3.5a9.4 9.4 0 0 1-4.8 1.2v6.4c0 4.9 2.8 8.8 7.8 11.1Z" />
    </svg>
  ),
} as const;

// Copy and geometry, both straight off the reference.
const ITEMS: Item[] = [
  {
    key: "precision",
    icon: "target",
    title: "Precision & Quality",
    desc: "High accuracy and\nconsistent results\nyou can trust.",
    icx: 454, icy: 125, tx: 494, ty: 103, ph: .72,
  },
  {
    key: "workflow",
    icon: "nodes",
    title: "Seamless Workflow",
    desc: "All tools work together\nfor a smooth and\nefficient workflow.",
    icx: 224, icy: 221, tx: 264, ty: 203, ph: .53,
  },
  {
    key: "open",
    icon: "puzzle",
    title: "Open & Flexible",
    desc: "Open system with wide\ncompatibility and\nmaterial freedom.",
    icx: 708, icy: 221, tx: 747, ty: 203, ph: .96,
  },
  {
    key: "training",
    icon: "cap",
    title: "Training & Support",
    desc: "Hands-on training and\ndedicated support\nevery step.",
    icx: 303, icy: 366, tx: 342, ty: 353, ph: .36,
  },
  {
    key: "reliable",
    icon: "shield",
    title: "Reliable & Durable",
    desc: "Built to perform\nday after day.",
    icx: 616, icy: 366, tx: 655, ty: 353, ph: .18,
  },
];

// Orbit decorations: arrowheads riding the path and two diamond ticks,
// at the coordinates they sit on in the mock.
const TICKS: { x: number; y: number; r: number; d?: boolean }[] = [
  { x: 396, y: 117, r: -22 },
  { x: 631, y: 109, r: 24 },
  { x: 741, y: 158, r: 56 },
  { x: 259, y: 179, r: -62 },
  { x: 736, y: 304, r: 118 },
  { x: 240, y: 313, r: 0, d: true },
  { x: 473, y: 385, r: 0, d: true },
];

export default function WhyOdyxOrbit() {
  return (
    <section className="wo" id="why" aria-labelledby="wo-h">
      {/* Background: the client's supplied field — corner micro-dots and
          silk waves are baked into the image. */}
      <div className="wo-bg" aria-hidden />

      <div className="wo-stage rv">
        {/* Plain div, not <header>: the global `header{position:fixed}` rule
            in odyx.css matches the bare element and would rip it out of flow. */}
        <div className="wo-head">
          <h2 className="wo-h" id="wo-h">
            Why <span className="wo-blue">ODYX?</span>
          </h2>
          <p className="wo-sub">Everything works better together.</p>
        </div>

        {/* Orbit path, water droplets and tick marks. */}
        <svg className="wo-orbit" viewBox="0 0 1041 434" aria-hidden>
          <defs>
            {/* Droplet body: transparent middle, pale-blue meniscus at the
                rim — the central bubble's language at a smaller scale. */}
            <radialGradient id="wo-drop" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity=".42" />
              <stop offset=".52" stopColor="#EFF7FE" stopOpacity=".26" />
              <stop offset=".78" stopColor="#C4E0F7" stopOpacity=".4" />
              <stop offset=".93" stopColor="#98C7EF" stopOpacity=".52" />
              <stop offset="1" stopColor="#84B8EA" stopOpacity=".32" />
            </radialGradient>
            {/* Soft white highlight, upper-left. */}
            <radialGradient id="wo-drop-hi" cx="33%" cy="28%" r="42%">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity=".9" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            {/* Deeper cyan refraction pooling at the lower-right. */}
            <radialGradient id="wo-drop-lo" cx="68%" cy="76%" r="46%">
              <stop offset="0" stopColor="#5E9BD6" stopOpacity=".38" />
              <stop offset=".6" stopColor="#74ACDF" stopOpacity=".16" />
              <stop offset="1" stopColor="#74ACDF" stopOpacity="0" />
            </radialGradient>
            {/* Diffuse shadow puddle under each droplet. */}
            <radialGradient id="wo-drop-sh" cx="50%" cy="50%" r="50%">
              <stop offset="0" stopColor="#5E8FC8" stopOpacity=".2" />
              <stop offset="1" stopColor="#5E8FC8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="wo-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="1" />
              <stop offset=".55" stopColor="#fff" stopOpacity=".95" />
              <stop offset=".82" stopColor="#fff" stopOpacity=".5" />
              <stop offset="1" stopColor="#fff" stopOpacity=".25" />
            </linearGradient>
            <mask id="wo-mask">
              <rect width="1041" height="434" fill="url(#wo-fade)" />
            </mask>
          </defs>

          <g mask="url(#wo-mask)">
            <ellipse
              cx="501" cy="245" rx="273" ry="141"
              fill="none" stroke="#8FB6DE" strokeOpacity=".38" strokeWidth=".7"
            />
            {/* Upper-right run reads as dashes in the mock. */}
            <path
              d="M572.6 108.8A273 141 0 0 1 769.9 220.5"
              fill="none" stroke="#8FB6DE" strokeOpacity=".48" strokeWidth=".7"
              strokeLinecap="round" strokeDasharray="4 5.5"
            />
          </g>

          {TICKS.map((t) => (
            <g key={`${t.x}-${t.y}`} transform={`translate(${t.x} ${t.y}) rotate(${t.r})`} opacity=".3">
              {t.d ? (
                <rect x="-2.1" y="-2.1" width="4.2" height="4.2" transform="rotate(45)" fill="#7FA9DA" />
              ) : (
                <path d="M-2.3 -2.3 2.7 0 -2.3 2.3Z" fill="#7FA9DA" />
              )}
            </g>
          ))}

          {/* Droplets are drawn around a local origin and placed by the
              transform attribute, so the motion CSS can lift them onto
              their own offset ellipses (transform:none + offset-path)
              while this stays the reduced-motion position. */}
          {[
            { x: 334, y: 136, r: 10.5, cls: "wo-bead-a" },
            { x: 698, y: 131, r: 11, cls: "wo-bead-b" },
          ].map((d) => (
            <g key={d.cls} className={`wo-bead ${d.cls}`} transform={`translate(${d.x} ${d.y})`}>
              <ellipse cy={d.r * 1.25} rx={d.r * 0.85} ry={d.r * 0.3} fill="url(#wo-drop-sh)" />
              <circle r={d.r} fill="url(#wo-drop)" />
              <circle r={d.r} fill="url(#wo-drop-lo)" />
              <circle r={d.r} fill="url(#wo-drop-hi)" />
            </g>
          ))}
        </svg>

        {/* Glass sphere with the wordmark. */}
        <div className="wo-orb">
          <span className="wo-orb-mark">ODYX</span>
        </div>

        <ul className="wo-list">
          {ITEMS.map((it) => (
            <li
              className="wo-item"
              key={it.key}
              style={
                {
                  "--icx": it.icx,
                  "--icy": it.icy,
                  "--tx": it.tx,
                  "--ty": it.ty,
                  "--ph": it.ph,
                } as React.CSSProperties
              }
            >
              {/* The card is a separate layer from the li: the li rides the
                  orbit (offset-path), the card carries the depth scale — a
                  scale on the li itself would scale the path translation. */}
              <div className="wo-card">
                <span className="wo-ic" aria-hidden>{WO_IC[it.icon]}</span>
                <h3 className="wo-t">{it.title}</h3>
                <p className="wo-d">{it.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
