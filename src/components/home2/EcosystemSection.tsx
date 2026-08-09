import EcoPrinterVideo from "@/components/home2/EcoPrinterVideo";
import { HV2_BLUE, HV2_BODY, HV2_EYEBROW, HV2_H2 } from "@/components/home2/hv2Chrome";

// Ecosystem — radial board rebuild of the client mock's ecosystem panel.
// Geometry is measured from the client reference at a 1434px viewport: panel
// 1358x485, art stage x356-1396 (1040x485). Node art ships as soft-feathered
// patches (halo + glow baked, cut from the mock at 2x) in /img/hv2-eco/;
// icons, labels and orbit sweeps are DOM. All type/controls scale in cqw so
// proportions hold at any panel width. DOM icons sit exactly over the baked
// ones (#2350E4 is sampled from the mock art, NOT the action-blue token, so
// edges can't fringe).
//
// Every patch/node/hotspot position below is a physical left/top percentage
// of the stage — the composition is a fixed photo layout, not mirrored in
// RTL (unlike the copy column, which uses logical `start`).

const IC = {
  scanOrbit: (
    // Mock's scanner badge: centre aperture ring + orbiting capture dots.
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
  cube: (
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

const ECO_NODES = [
  { key: "scanner", label: "Scanner", icon: "scanOrbit", patch: "left-[28.27%] top-[-11.75%] w-[16.35%] z-[2]", node: "left-[36.44%] top-[15.26%]" },
  { key: "resin", label: "Resin", icon: "drop", patch: "left-[2.79%] top-[6.80%] w-[16.83%] z-[2]", node: "left-[11.15%] top-[43.09%]" },
  { key: "printer", label: "Printer", icon: "cube", patch: "left-[59.23%] top-[7.22%] w-[17.88%] z-[2]", node: "left-[68.37%] top-[43.09%]" },
  { key: "software", label: "Software", icon: "monitor", patch: "left-[7.31%] top-[52.16%] w-[19.42%] z-[2]", node: "left-[17.50%] top-[86.39%]" },
  { key: "cure", label: "Cure", icon: "sun", patch: "left-[47.69%] top-[51.75%] w-[19.23%] z-[2]", node: "left-[57.50%] top-[86.39%]" },
] as const;

const ECO_PATCH_BASE = "absolute block h-auto pointer-events-none select-none";
const ECO_NODE_BASE = "absolute z-[3] [translate:-50%_0] flex flex-col items-center gap-[clamp(3px,.5cqw,8px)]";

export default function EcosystemSection() {
  return (
    <section className="relative block w-full max-[560px]:pb-[26px] rv" id="ecosystem">
      {/* Card wash stays edge-to-edge; content uses the page gutter. */}
      <div
        className="absolute inset-0 overflow-hidden rounded-t-[16px] [background:radial-gradient(46%_62%_at_52%_42%,rgba(255,255,255,.92),rgba(255,255,255,0)_72%),linear-gradient(115deg,#F7F8FE_0%,#F2F5FC_48%,#F6F8FE_100%)]"
        aria-hidden
      >
        <svg className="absolute inset-0 w-full h-full block" viewBox="0 0 1358 485" preserveAspectRatio="none" aria-hidden>
          <g fill="none" stroke="#fff" strokeLinecap="round">
            <ellipse cx="732" cy="200" rx="380" ry="255" strokeWidth="7" opacity=".16" />
            <ellipse cx="732" cy="200" rx="380" ry="255" strokeWidth="2" opacity=".65" />
            <ellipse cx="775" cy="212" rx="432" ry="292" strokeWidth="1.6" opacity=".38" />
          </g>
        </svg>
        <img
          className="absolute left-[79.68%] top-[2.06%] w-[20.32%] h-[97.94%] object-fill pointer-events-none"
          src="/img/hv2-eco/eco-swoosh.webp"
          alt=""
          loading="lazy"
        />
      </div>

      {/* Outer pad + inner relative box: absolute kids must sit in the
          content box or they ignore padding (CSS padding-edge CB). */}
      <div className="w-full px-[clamp(20px,2.5vw,44px)]">
        <div className="relative w-full [container-type:inline-size]">
          <div className="absolute z-[3] start-0 top-[10.3%] w-[24%] max-[980px]:relative! max-[980px]:start-0! max-[980px]:top-0! max-[980px]:w-auto! max-[980px]:max-w-[440px]! max-[980px]:pt-6!">
            <p className={`${HV2_EYEBROW} text-[length:clamp(10px,.89cqw,13px)]! [letter-spacing:.1em]! mb-[clamp(10px,1.32cqw,20px)]!`}>
              Ecosystem
            </p>
            <h2 className={`${HV2_H2} text-[length:clamp(26px,2.95cqw,42px)]! leading-[1.13]! [letter-spacing:-.005em]! mb-[clamp(8px,1.1cqw,17px)]!`}>
              Everything
              <br />
              works better
              <br />
              <span className={HV2_BLUE}>together.</span>
            </h2>
            <p className={`${HV2_BODY} text-[length:clamp(11.5px,1.06cqw,15.5px)]! leading-[1.95]! max-w-[12.9em]!`}>
              A seamless ecosystem where every product is designed to work in
              perfect harmony.
            </p>
          </div>

          <div className="relative ms-[23.42%] w-[76.58%] aspect-[1040/485] mb-[-1.09cqw] max-[980px]:w-full! max-[980px]:ms-0! max-[980px]:mt-[clamp(28px,7vw,48px)]!">
            <img
              className={`${ECO_PATCH_BASE} left-[11.73%] top-[14.64%] w-[54.23%] z-[1]`}
              src="/img/hv2-eco/eco-mouth.webp"
              alt="Intraoral scanner capturing a patient's teeth with blue structured light"
            />
            {ECO_NODES.map((n) => (
              <img
                className={`${ECO_PATCH_BASE} ${n.patch}`}
                src={`/img/hv2-eco/eco-${n.key}.webp`}
                alt=""
                loading="lazy"
                key={n.key}
              />
            ))}
            {ECO_NODES.map((n) => (
              <div className={`${ECO_NODE_BASE} ${n.node}`} key={n.key}>
                <span
                  className="w-[clamp(20px,2.07cqw,30px)] aspect-square rounded-full bg-[#2350E4] text-white [box-shadow:0_0_0_2px_rgba(255,255,255,.85),0_4px_12px_rgba(35,80,228,.30)] grid place-items-center [&>svg]:w-[58%] [&>svg]:h-[58%]"
                  aria-hidden
                >
                  {IC[n.icon]}
                </span>
                <span className="text-[length:clamp(10px,1.26cqw,18px)] font-bold [letter-spacing:0] text-[#262B3C] whitespace-nowrap [text-shadow:0_1px_6px_rgba(255,255,255,.9),0_0_2px_rgba(255,255,255,.65)]">
                  {n.label}
                </span>
              </div>
            ))}
            <EcoPrinterVideo />
          </div>
        </div>
      </div>
    </section>
  );
}
