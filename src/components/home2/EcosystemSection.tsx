import type { ReactNode } from "react";
import { HV2_BLUE, HV2_BODY, HV2_EYEBROW, HV2_H2 } from "@/components/home2/hv2Chrome";

// Ecosystem orbit — content band inside the shared Eco+Products section.
// Separate cutouts on the parent gradient. Product nodes download the
// same flyers as the product pages. Stage geometry is physical left/top %
// (dir=ltr); not mirrored in RTL.

const ICON = {
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3.4" />
      <path d="M5.2 9.4a7.3 7.3 0 0 1 3-3.4M18.8 14.6a7.3 7.3 0 0 1-3 3.4" />
      <circle cx="17.6" cy="6.8" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="6.4" cy="17.2" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 8.2 12 3 3 8.2v7.6L12 21l9-5.2V8.2Z" />
      <path d="M3.3 8.4 12 13.4l8.7-5M12 21v-7.6" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
    </svg>
  ),
} as const;

type EcoNode = {
  key: string;
  label: string;
  src: string;
  icon: ReactNode;
  box: string;
  imgW: string;
  brochure?: string;
  brochureName?: string;
};

const NODES: EcoNode[] = [
  {
    key: "resin",
    label: "Resin Lines",
    src: "/img/hv2-hub/store-resins-cutout.png",
    icon: ICON.drop,
    box: "left-[1%] top-[6%] w-[24%] z-[2]",
    imgW: "w-[92%]",
    brochure: "/docs/resins/resin-flyer.pdf",
    brochureName: "ODYX-Resin-Brochure.pdf",
  },
  {
    key: "scanner",
    label: "Scanner",
    src: "/img/hv2-cut/scanner-product.webp",
    icon: ICON.scan,
    box: "left-[33%] top-[0%] w-[30%] z-[2]",
    imgW: "w-full",
    brochure: "/docs/resins/scanner-flyer.pdf",
    brochureName: "ODYX-S1-Brochure.pdf",
  },
  {
    key: "printer",
    label: "Printer",
    src: "/img/hv2-cut/printer-product.webp",
    icon: ICON.layers,
    box: "left-[74%] top-[2%] w-[18%] z-[2]",
    imgW: "w-[78%]",
    brochure: "/docs/resins/3d-printer-flyer.pdf",
    brochureName: "ODYX-P1-26-Brochure.pdf",
  },
  {
    key: "software",
    label: "Software",
    src: "/img/hv2-eco/eco-software.webp",
    icon: ICON.monitor,
    box: "left-[7%] top-[50%] w-[22%] z-[2]",
    imgW: "w-[90%]",
  },
  {
    key: "cure",
    label: "Cure",
    src: "/img/hv2-cut/cure-product.webp",
    icon: ICON.sun,
    box: "left-[64%] top-[62%] w-[18%] z-[2]",
    imgW: "w-[88%]",
    brochure: "/docs/resins/curing-flyer.pdf",
    brochureName: "ODYX-Cure-Brochure.pdf",
  },
];

const NODE_BOX =
  "absolute flex flex-col items-center gap-[clamp(4px,.7cqw,12px)] no-underline!";

const NODE_LINK =
  " cursor-pointer touch-manipulation" +
  " focus-visible:outline-2 focus-visible:outline-[var(--hv2-blue)] focus-visible:outline-offset-4" +
  " [&_img]:transition-[filter,transform] [&_img]:duration-300 [&_img]:ease-out" +
  " hover:[&_img]:[filter:drop-shadow(0_16px_30px_rgba(10,16,32,.18))_brightness(1.03)]" +
  " hover:[&_img]:-translate-y-px" +
  " motion-reduce:hover:[&_img]:translate-y-0!";

const NODE_IMG =
  "block h-auto max-w-full pointer-events-none select-none" +
  " [filter:drop-shadow(0_12px_26px_rgba(10,16,32,.12))]";

const BADGE =
  "w-[clamp(20px,2.15cqw,32px)] aspect-square shrink-0 rounded-full bg-[#2350E4] text-white" +
  " [box-shadow:0_0_0_2px_rgba(255,255,255,.9),0_4px_14px_rgba(35,80,228,.28)]" +
  " grid place-items-center [&>svg]:w-[58%] [&>svg]:h-[58%]";

function OrbitRings() {
  return (
    <svg
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
      viewBox="0 0 1024 576"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="eco-orbit-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g stroke="#FFFFFF" strokeLinecap="round" filter="url(#eco-orbit-soft)">
        <ellipse cx="518" cy="292" rx="318" ry="222" strokeWidth="9" opacity=".14" />
        <ellipse cx="518" cy="292" rx="318" ry="222" strokeWidth="2" opacity=".7" />
        <ellipse cx="518" cy="292" rx="368" ry="255" strokeWidth="1.5" opacity=".38" />
        <ellipse cx="518" cy="292" rx="248" ry="172" strokeWidth="1.35" opacity=".32" />
      </g>
      <g fill="#FFFFFF">
        <circle cx="268" cy="198" r="3" opacity=".5" />
        <circle cx="768" cy="205" r="3" opacity=".5" />
        <circle cx="292" cy="418" r="2.5" opacity=".42" />
        <circle cx="735" cy="428" r="2.5" opacity=".42" />
        <circle cx="518" cy="88" r="2.7" opacity=".48" />
        <circle cx="518" cy="498" r="2.4" opacity=".35" />
      </g>
    </svg>
  );
}

export default function EcosystemSection() {
  return (
    <div className="relative w-full overflow-x-clip rv" id="ecosystem">
      {/* dir=ltr: copy left / orbit right on every locale. Stacks below ~1080. */}
      <div
        dir="ltr"
        className={
          "relative w-full grid items-start [container-type:inline-size]" +
          " [grid-template-columns:minmax(0,0.36fr)_minmax(0,0.64fr)]" +
          " gap-x-[clamp(20px,2.8vw,56px)]" +
          " max-[1080px]:grid-cols-1!" +
          " max-[1080px]:gap-y-[clamp(24px,5vw,40px)]!"
        }
      >
        <div className="relative z-[3] min-w-0 w-full max-w-[26em] justify-self-start pt-0 max-[1080px]:max-w-none!">
          <p className={`${HV2_EYEBROW} text-[length:clamp(12px,1.2cqw,15px)]! tracking-[.12em]! mb-[clamp(12px,1.5cqw,22px)]! max-[1080px]:text-[12.5px]!`}>
            Ecosystem
          </p>
          <h2
            className={
              `${HV2_H2} text-[length:clamp(30px,4.2cqw,52px)]! font-bold! leading-[1.1]!` +
              " tracking-[-.02em]! text-[var(--hv2-ink)]! mb-[clamp(12px,1.4cqw,22px)]!" +
              " max-[1080px]:text-[length:clamp(30px,7.2vw,40px)]!"
            }
          >
            Everything
            <br />
            works better
            <br />
            <span className={HV2_BLUE}>together.</span>
          </h2>
          <p
            className={
              `${HV2_BODY} text-[length:clamp(15px,1.45cqw,19px)]! leading-[1.75]!` +
              " text-[var(--hv2-body)]! max-w-[22em]! mb-0!" +
              " max-[1080px]:text-[15.5px]! max-[1080px]:leading-[1.65]! max-[1080px]:max-w-[36em]!"
            }
          >
            A seamless ecosystem where every product is designed to work in
            perfect harmony.
            <br />
            <span className={`${HV2_BLUE}!`}>Click on a product to download the brochures.</span>
          </p>
        </div>

        {/* Stage: air on top for scanner; clip x so side nodes never scroll the page */}
        <div
          className={
            "relative min-w-0 w-full aspect-[1024/576] justify-self-stretch" +
            " overflow-x-clip overflow-y-visible" +
            " max-[1080px]:max-w-[720px] max-[1080px]:mx-auto" +
            " max-[560px]:aspect-[1024/620]"
          }
        >
          <div
            className="absolute z-0 left-[50.6%] top-[50.7%] w-[42%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none [background:radial-gradient(closest-side,rgba(255,255,255,.9),rgba(165,196,245,.28)_48%,transparent_74%)]"
            aria-hidden
          />

          <OrbitRings />

          <div
            className="absolute z-[1] left-[50.6%] top-[50.7%] w-[min(22%,160px)] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            role="img"
            aria-label="ODYX"
          >
            <span
              className="absolute inset-[-36%] rounded-full [background:radial-gradient(closest-side,rgba(91,147,245,.4),rgba(0,80,216,.1)_50%,transparent_74%)]"
              aria-hidden
            />
            <span
              className={
                "relative grid h-full w-full place-items-center rounded-full select-none" +
                " [background:radial-gradient(circle_at_36%_30%,#FFFFFF_0%,#EAF1FC_44%,#C9DBF6_76%,#A8C4F0_100%)]" +
                " [box-shadow:0_10px_32px_rgba(0,80,216,.16),inset_0_-10px_22px_rgba(0,80,216,.08),inset_0_8px_16px_rgba(255,255,255,.72)]"
              }
              aria-hidden
            >
              <span className="font-bold leading-none text-[length:clamp(13px,2.55cqw,26px)] text-[var(--hv2-blue)]">
                ODYX
              </span>
            </span>
          </div>

          {NODES.map((n) => {
            const nodeClass = `${NODE_BOX} ${n.box}${n.brochure ? NODE_LINK : " pointer-events-none"}`;
            const body = (
              <>
                <img
                  className={`${NODE_IMG} ${n.imgW}`}
                  src={n.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className={BADGE}>{n.icon}</span>
                <span className="text-[length:clamp(10px,1.3cqw,18px)] max-[560px]:text-[11px]! font-bold leading-none text-[#262B3C] whitespace-nowrap [text-shadow:0_1px_8px_rgba(255,255,255,.95)]">
                  {n.label}
                </span>
              </>
            );
            if (n.brochure) {
              return (
                <a
                  key={n.key}
                  className={nodeClass}
                  href={n.brochure}
                  download={n.brochureName}
                  aria-label={`Download ${n.label} brochure`}
                >
                  {body}
                </a>
              );
            }
            return (
              <div key={n.key} className={nodeClass}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
