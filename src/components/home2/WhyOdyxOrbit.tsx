// Why ODYX — the client's orbit infographic (new-why-odyx reference).
//
// Laid out in the mock's 1041×434 coordinates via `--u` (1 ref-px, width-
// based cqw). A mild vertical stretch (`STAGE_H`) opens the orbit without
// letting Why dominate the Hero. Circles stay equal in `--u`.
//
// Positions are logical (inset-inline-start), so Arabic mirrors the whole
// orbit instead of colliding with it.

import { HV2_GUTTER, HV2_SECTION_Y_TIGHT } from "@/components/home2/hv2Chrome";

const STAGE_W = 1041;
const STAGE_H_REF = 434;
const STAGE_H = 450; // slight open vs mock 434 — keeps Why from towering over Hero

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

// Card motion: the five benefit cards stay put at their mock coordinates
// (the layout that measures zero overlap with the central orb — the icon is
// absolutely placed off the text block via --icx/--icy, so text never rides
// over the sphere) and get a small "alive" wobble in place, only above
// 1001px and only when the visitor allows motion — see wo-wobble in
// globals.css. Freezes while the visitor is reading (group-hover).
const WOBBLE =
  "min-[1001px]:motion-safe:[animation:wo-wobble_7s_ease-in-out_infinite] min-[1001px]:motion-safe:[animation-delay:calc(var(--ph)*-7s)] min-[1001px]:motion-safe:group-hover:[animation-play-state:paused]" +
  // Below tablet the card becomes a two-column grid (icon left, copy right).
  " max-[1000px]:grid max-[1000px]:grid-cols-[auto_1fr] max-[1000px]:items-center max-[1000px]:gap-x-[14px] max-[1000px]:gap-y-[2px]";

// Same min-width + motion-safe gate as WOBBLE, plus a `supports-[...]:` guard
// for the two water droplets' offset-path orbit (see the map() below).
const BEAD_VARIANT =
  "min-[1001px]:motion-safe:supports-[offset-path:ellipse(1px_1px_at_0px_0px)]:";

export default function WhyOdyxOrbit() {
  return (
    <section
      // Transparent to the parent Hero wash — no second gradient restart.
      className={`relative isolate w-full box-border ${HV2_GUTTER} ${HV2_SECTION_Y_TIGHT} bg-transparent`}
      id="why"
      aria-labelledby="wo-h"
    >
      {/* Client field (micro-dots + silk waves). Soft top fade into the shared wash. */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none [background:url('/img/hv2-why-bg.png')_center_center/cover_no-repeat] [mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,.08)_12%,rgba(0,0,0,.45)_36%,#000_64%,#000_100%)] [-webkit-mask-image:linear-gradient(180deg,transparent_0%,rgba(0,0,0,.08)_12%,rgba(0,0,0,.45)_36%,#000_64%,#000_100%)] [mask-size:100%_100%] [-webkit-mask-size:100%_100%] [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
        aria-hidden
      />

      <div className="rv relative z-[1] mx-auto w-[min(100%,1480px)] aspect-[1041/450] [container-type:inline-size] [--u:0.09606cqw] [--uy:calc(var(--u)*450/434)] [--wo-navy:#0B1640] max-[1000px]:aspect-auto max-[1000px]:[container-type:normal] max-[1000px]:[padding:clamp(26px,6vw,44px)_0_clamp(12px,3vw,20px)] max-[1000px]:flex max-[1000px]:flex-col max-[1000px]:items-center">
        {/* Plain div, not <header>: the global `header{position:fixed}` rule
            in odyx.css matches the bare element and would rip it out of flow.
            Heading sits near the stage top so section pt/pb stay the visual air. */}
        <div className="absolute start-[calc(520.5*var(--u))] top-0 -translate-x-1/2 rtl:translate-x-1/2 text-center w-max max-[1000px]:static max-[1000px]:[translate:none]! max-[1000px]:w-auto max-[1000px]:max-w-[34em]">
          <h2
            className="text-[length:calc(26.4*var(--u))] leading-[1.1]! font-bold [letter-spacing:.04em]! m-0 text-[var(--hv2-ink)] max-[1000px]:text-[length:clamp(24px,4.6vw,31px)]!"
            id="wo-h"
          >
            Why <span className="text-[var(--hv2-blue)]">ODYX?</span>
          </h2>
          <p className="text-[length:calc(11.4*var(--u))] leading-[1.35] font-medium text-[#3F4757] [margin:calc(2*var(--uy))_0_0] max-[1000px]:text-[length:clamp(14px,1.9vw,16px)]! max-[1000px]:mt-2!">
            Everything works better together.
          </p>
        </div>

        {/* Orbit path, water droplets and tick marks. Hidden below tablet:
            there is no orbit for the stacked list to sit on.
            preserveAspectRatio=none lets the path open with the taller stage. */}
        <svg
          className="absolute inset-0 w-full h-full rtl:[transform:scaleX(-1)] max-[1000px]:hidden"
          viewBox={`0 0 ${STAGE_W} ${STAGE_H_REF}`}
          preserveAspectRatio="none"
          aria-hidden
        >
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
              while this stays the reduced-motion position. Guarded by
              `supports-[offset-path:...]:` — without it, `transform:none`
              would strand them at the svg origin instead of their mock
              positions. */}
          {[
            {
              x: 334,
              y: 136,
              r: 10.5,
              extra:
                "[offset-path:ellipse(256px_133px_at_501px_254px)] [animation-duration:36.8s] [animation-delay:-23.552s]",
            },
            {
              x: 698,
              y: 131,
              r: 11,
              extra:
                "[offset-path:ellipse(294px_164px_at_501px_254px)] [animation-duration:55.2s] [animation-delay:-47.472s]",
            },
          ].map((d, i) => (
            <g
              key={i}
              className={`${BEAD_VARIANT}[transform:none] ${BEAD_VARIANT}[offset-rotate:0deg] ${BEAD_VARIANT}[animation:wo-bead_46s_linear_infinite] ${BEAD_VARIANT}${d.extra.split(" ").join(` ${BEAD_VARIANT}`)}`}
              transform={`translate(${d.x} ${d.y})`}
            >
              <ellipse cy={d.r * 1.25} rx={d.r * 0.85} ry={d.r * 0.3} fill="url(#wo-drop-sh)" />
              <circle r={d.r} fill="url(#wo-drop)" />
              <circle r={d.r} fill="url(#wo-drop-lo)" />
              <circle r={d.r} fill="url(#wo-drop-hi)" />
            </g>
          ))}
        </svg>

        {/* Glass sphere with the wordmark. Halo + contact shadow (::before)
            and the top light bloom (::after) sit behind/above it. */}
        <div
          className="absolute start-[calc(437.5*var(--u))] top-[calc(184*var(--uy))] w-[calc(166*var(--u))] h-[calc(166*var(--u))] rounded-full grid place-items-center
            [background:radial-gradient(90%_58%_at_50%_10%,rgba(255,255,255,.96)_0%,rgba(255,255,255,.5)_44%,rgba(255,255,255,0)_70%),radial-gradient(circle_closest-side_at_50%_50%,rgba(255,255,255,.92)_0%,rgba(255,255,255,.88)_70%,rgba(242,249,255,.82)_83%,rgba(206,230,250,.68)_92%,rgba(150,200,242,.55)_97%,rgba(150,200,242,.14)_100%)]
            [box-shadow:inset_0_0_0_calc(1*var(--u))_rgba(186,220,247,.55),inset_0_0_calc(3.5*var(--u))_calc(2*var(--u))_rgba(255,255,255,.7),inset_calc(15*var(--u))_calc(-7*var(--u))_calc(26*var(--u))_rgba(110,176,233,.38),inset_calc(-12*var(--u))_calc(-4*var(--u))_calc(24*var(--u))_rgba(132,190,238,.3),inset_0_calc(-9*var(--u))_calc(14*var(--u))_rgba(255,255,255,.55),0_calc(12*var(--u))_calc(32*var(--u))_rgba(96,150,215,.16),0_0_calc(26*var(--u))_rgba(150,200,242,.18)]
            [backdrop-filter:blur(2px)_saturate(1.04)]
            before:content-[''] before:absolute before:inset-[calc(-34*var(--u))] before:rounded-full before:z-[-1]
            before:[background:radial-gradient(42%_10%_at_50%_88%,rgba(84,128,190,.14)_0%,rgba(84,128,190,0)_100%),radial-gradient(circle,rgba(173,212,247,.18)_0%,rgba(196,224,249,.08)_48%,transparent_72%)]
            after:content-[''] after:absolute after:rounded-full after:start-[14%] after:top-[4%] after:w-[72%] after:h-[30%] after:pointer-events-none after:blur-[calc(4*var(--u))]
            after:[background:radial-gradient(closest-side,rgba(255,255,255,.85),rgba(255,255,255,0))]
            max-[1000px]:static max-[1000px]:w-[clamp(150px,30vw,190px)] max-[1000px]:h-[clamp(150px,30vw,190px)] max-[1000px]:[margin-block:clamp(22px,4.4vw,34px)]
            max-[1000px]:[box-shadow:inset_0_0_0_1px_rgba(168,212,246,.55),inset_0_0_4px_3px_rgba(255,255,255,.7),inset_9px_-13px_24px_rgba(118,188,240,.32),inset_11px_14px_26px_rgba(255,255,255,.5),0_10px_30px_rgba(96,150,215,.14),0_0_28px_rgba(140,195,240,.2)]!
            max-[1000px]:before:inset-[-34px]! max-[1000px]:after:blur-[4px]!"
        >
          <span
            className="relative z-[1] [font-family:var(--font-sora),'Sora',sans-serif] text-[length:calc(29*var(--u))] leading-none font-normal [letter-spacing:calc(6.2*var(--u))] [text-indent:calc(6.2*var(--u))] text-[var(--wo-navy)] [translate:0_calc(1*var(--u))]
            max-[1000px]:text-[length:clamp(24px,4.8vw,30px)]! max-[1000px]:[letter-spacing:.28em]! max-[1000px]:[text-indent:.28em]!"
          >
            ODYX
          </span>
        </div>

        <ul className="group list-none m-0 p-0 max-[1000px]:grid max-[1000px]:grid-cols-2 max-[1000px]:[gap:clamp(20px,3.4vw,30px)_clamp(18px,3vw,34px)] max-[1000px]:w-full max-[1000px]:max-w-[660px] max-[620px]:grid-cols-1 max-[620px]:max-w-[400px] max-[620px]:gap-5">
          {ITEMS.map((it) => (
            <li
              className="absolute start-[calc(var(--tx)*var(--u))] top-[calc((var(--ty)_-_0.4)*var(--uy))] w-[calc(140*var(--u))] max-[1000px]:static max-[1000px]:w-auto"
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
              <div className={WOBBLE}>
                <span
                  className="absolute start-[calc((var(--icx)_-_var(--tx)_-_26)*var(--u))] top-[calc((var(--icy)_-_var(--ty)_+_0.4_-_26)*var(--uy))] w-[calc(52*var(--u))] h-[calc(52*var(--u))] rounded-full grid place-items-center text-[var(--hv2-blue)]
                    [background:radial-gradient(circle_at_50%_50%,rgba(72,128,232,.30)_0%,rgba(72,128,232,.14)_36%,rgba(72,128,232,0)_60%),radial-gradient(circle_closest-side_at_50%_50%,rgba(255,255,255,.98)_0%,rgba(255,255,255,.96)_68%,rgba(240,247,254,.97)_86%,rgba(255,255,255,1)_100%)]
                    [box-shadow:inset_0_0_calc(7*var(--u))_rgba(255,255,255,.9),0_0_0_calc(1.5*var(--u))_rgba(255,255,255,.95),0_0_calc(9*var(--u))_calc(2*var(--u))_rgba(255,255,255,.9),0_0_calc(26*var(--u))_calc(6*var(--u))_rgba(120,170,235,.32),0_calc(9*var(--u))_calc(24*var(--u))_rgba(64,101,161,.12)]
                    [backdrop-filter:blur(6px)]
                    [&>svg]:w-[calc(27*var(--u))] [&>svg]:h-[calc(27*var(--u))] [&>svg]:fill-[rgba(0,80,216,.1)]
                    [&>svg]:[filter:drop-shadow(0_0_calc(2*var(--u))_rgba(47,107,228,.42))_drop-shadow(0_0_calc(6*var(--u))_rgba(47,107,228,.28))]
                    max-[1000px]:static max-[1000px]:[grid-row:1_/_span_2] max-[1000px]:self-start max-[1000px]:w-[52px] max-[1000px]:h-[52px]
                    max-[1000px]:[box-shadow:inset_0_0_7px_rgba(255,255,255,.9),0_0_0_1.5px_rgba(255,255,255,.95),0_0_9px_2px_rgba(255,255,255,.9),0_0_26px_6px_rgba(120,170,235,.32),0_9px_24px_rgba(64,101,161,.12)]!
                    max-[1000px]:[&>svg]:w-6! max-[1000px]:[&>svg]:h-6! max-[1000px]:[&>svg]:[filter:drop-shadow(0_0_2px_rgba(47,107,228,.42))_drop-shadow(0_0_6px_rgba(47,107,228,.28))]!"
                  aria-hidden
                >
                  {WO_IC[it.icon]}
                </span>
                <h3 className="text-[length:calc(13*var(--u))] leading-[1.25]! text-[var(--hv2-ink)] m-0 max-[1000px]:text-[15.5px]!">
                  {it.title}
                </h3>
                <p className="text-[length:calc(10.4*var(--u))] leading-[1.55] font-normal text-[#4B5364] [margin:calc(3.5*var(--u))_0_0] whitespace-pre-line max-[1000px]:text-[13px]! max-[1000px]:leading-[1.6]! max-[1000px]:mt-1! max-[1000px]:whitespace-normal!">
                  {it.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
