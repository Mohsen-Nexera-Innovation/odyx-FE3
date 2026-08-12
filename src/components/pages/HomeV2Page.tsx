import ClinicalApplicationsSection from "@/components/home2/ClinicalApplicationsSection";
import ClinicalCasesShowcase from "@/components/home2/ClinicalCasesShowcase";
import EcosystemSection from "@/components/home2/EcosystemSection";
import HubCardsSection from "@/components/home2/HubCardsSection";
import Hv2Motion from "@/components/home2/Hv2Motion";
import {
  HV2_BLUE,
  HV2_BODY,
  HV2_EYEBROW,
  HV2_GUTTER,
  HV2_H2,
  HV2_SECTION_Y,
} from "@/components/home2/hv2Chrome";
import PathCarousel from "@/components/home2/PathCarousel";
import ProductsRail from "@/components/home2/ProductsRail";
import WhyOdyxOrbit from "@/components/home2/WhyOdyxOrbit";

// Home V2 — rebuild of the home screen to the client hero-collage mock
// (light surfaces, action blue #0050D8, orbit hero, why-pillars, path
// carousel, radial ecosystem, products rail). Copy is claim-free marketing;
// no catalog numbers appear on this screen.

// Hero product cutouts + floor shadows (positions differ per element).
// Each cutout carries a resting perspective tilt, pointer-parallax via
// --hx/--hy from Hv2Motion, and an idle float on `translate`.
const ORBIT_IMG_BASE =
  "absolute block h-auto pointer-events-none" +
  " [filter:drop-shadow(0_calc(14*var(--u))_calc(22*var(--u))_rgba(10,16,32,.14))]" +
  " [transform:perspective(calc(1400*var(--u)))_translate3d(calc(var(--hx,0)*var(--op,1)*-22*var(--u)),calc(var(--hy,0)*var(--op,1)*-12*var(--u)),0)_rotateX(calc(2deg+var(--hy,0)*-4deg))_rotateY(calc(var(--oty,-4deg)*var(--odir,1)+var(--hx,0)*6deg))]" +
  " [animation:hv2-o-float_var(--ofd,7s)_ease-in-out_var(--ofo,0s)_infinite]" +
  " motion-reduce:[animation:none]! motion-reduce:[transform:none]!";
const ORBIT_SHADOW_BASE =
  "absolute z-[1] rounded-full pointer-events-none [background:radial-gradient(closest-side,rgba(30,58,118,.30),rgba(30,58,118,0))] [filter:blur(calc(9*var(--u)))] [animation:hv2-sh-float_var(--ofd,7s)_ease-in-out_var(--ofo,0s)_infinite] motion-reduce:[animation:none]!";

const ORBIT_PRODUCTS = [
  {
    src: "/img/hv2-cut/scanner-product.webp",
    label: "ODYX S1 Intraoral Scanner",
    pos: " start-[calc(700*var(--u))] top-[calc(288*var(--u))] w-[calc(300*var(--u))] z-[3] [--oty:-8deg] [--op:1.05] [--ofd:7.2s] [rotate:-12deg]",
  },
  {
    src: "/img/hv2-cut/printer-product.webp",
    label: "ODYX P1-26 3D Printer",
    pos: " start-[calc(1020*var(--u))] top-[calc(88*var(--u))] w-[calc(215*var(--u))] z-[4] [--oty:-6deg] [--op:.8] [--ofd:6.6s] [--ofo:-1.4s]",
  },
  {
    src: "/img/hv2-cut/cure-product.webp",
    label: "ODYX Cure",
    pos: " start-[calc(1280*var(--u))] top-[calc(210*var(--u))] w-[calc(255*var(--u))] z-[3] [--oty:-3deg] [--op:.9] [--ofd:8.4s] [--ofo:-2.8s]",
  },
  {
    src: "/img/hv2-hub/store-resins-cutout.png",
    label: "ODYX Resins",
    pos: " start-[calc(1565*var(--u))] top-[calc(300*var(--u))] w-[calc(340*var(--u))] z-[4] [--oty:-4deg] [--op:1.15] [--ofd:7.8s] [--ofo:-4s]",
  },
] as const;

// Kept out of JSX attrs so `[&>span]` / `[&>svg]` don't trip the TSX parser
// into treating the following <span> as a comparison (`Cannot find name 'span'`).
// const PRODUCTS_CTA =
//   `${HV2_BTN_GHOST} ${HV2_BTN_SIZE} mt-[16px]! w-[197px]! border! border-[rgba(24,68,160,.42)]!` +
//   " justify-between! [&>span]:mt-px rtl:[&>svg]:scale-x-[-1]";

export default function HomeV2Page() {
  return (
    <div className="hv2" id="top">
      {/* ===== 1 · Hero — headline + orbit product collage ===== */}
      <section
        // One shared atmosphere for Hero + Why (Why mounts inside this
        // section). Sky wash is full-bleed; content keeps the About gutter.
        className="relative w-full pt-[100px] pb-0 max-[980px]:pt-[84px] bg-[var(--hv2-surface)] [background-image:linear-gradient(180deg,rgba(232,240,252,.15)_0%,rgba(232,240,252,.4)_22%,rgba(232,240,252,.28)_38%,rgba(238,242,249,.55)_58%,rgba(243,245,253,.88)_78%,var(--hv2-surface)_100%),url('/img/hv2-section-bg.jpg')] [background-position:center_top,center_top] [background-size:cover,cover] [background-repeat:no-repeat]"
        data-hero-light
        id="hero"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(58%_52%_at_68%_28%,rgba(122,156,235,.14),transparent_70%),radial-gradient(36%_42%_at_92%_18%,rgba(150,170,240,.11),transparent_68%),radial-gradient(80%_40%_at_50%_100%,rgba(243,245,253,.65),transparent_70%)]"
        />

        {/* Page gutter matches About: content only — atmosphere stays edge-to-edge. */}
        <div className={`relative z-[1] w-full ${HV2_GUTTER} pb-0`}>
        {/* Hero band — mock 2048×628; slight extra height for collage air. */}
        <div className="hv2-hero-band relative mx-auto w-full max-w-[2200px] aspect-[2048/660] [container-type:inline-size] [--u:0.048828cqw] border-t-0 max-[980px]:aspect-auto max-[980px]:overflow-clip">
          <div className="absolute z-[2] start-0 top-[calc(122*var(--u))] max-w-[calc(700*var(--u))] max-[980px]:static max-[980px]:max-w-[560px]">
            <p className={`${HV2_EYEBROW} rv text-[length:calc(16*var(--u))]! leading-[1.4] [letter-spacing:.14em]! mb-[calc(33*var(--u))]! max-[980px]:text-[12.5px]! max-[980px]:mb-3!`}>
              Digital Dentistry Reimagined
            </p>
            <h1
              className="rv text-[length:calc(60*var(--u))] leading-[1.1]! mb-[calc(46*var(--u))] max-[980px]:text-[length:clamp(34px,7vw,44px)]! max-[980px]:mb-[14px]"
              data-rv="1"
            >
              One Ecosystem.
              <br />
              Endless <span className={HV2_BLUE}>Possibilities.</span>
            </h1>
            <p
              className="rv text-[length:calc(20*var(--u))] leading-[1.8] max-w-[calc(345*var(--u))] mb-[calc(44*var(--u))] max-[980px]:text-[15.5px] max-[980px]:leading-[1.65] max-[980px]:max-w-[26em] max-[980px]:mb-[22px]"
              data-rv="2"
            >
              Everything you need for digital dentistry in one seamless
              ecosystem.
            </p>
          </div>

          {/* Product cutouts — decorative, not links. */}
          <div
            className="rv absolute inset-0 z-[1] pointer-events-none [container-type:inline-size] rtl:[--odir:-1] max-[980px]:relative max-[980px]:inset-auto max-[980px]:w-[162%] max-[980px]:ms-[-57%] max-[980px]:aspect-[2048/628] max-[980px]:mt-[10px]"
            data-rv="2"
          >
            <i className={ORBIT_SHADOW_BASE + " start-[calc(740*var(--u))] top-[calc(400*var(--u))] w-[calc(220*var(--u))] h-[calc(34*var(--u))] [--ofd:7.2s]"} aria-hidden />
            <i className={ORBIT_SHADOW_BASE + " start-[calc(1010*var(--u))] top-[calc(470*var(--u))] w-[calc(235*var(--u))] h-[calc(42*var(--u))] [--ofd:6.6s] [--ofo:-1.4s]"} aria-hidden />
            <i className={ORBIT_SHADOW_BASE + " start-[calc(1280*var(--u))] top-[calc(468*var(--u))] w-[calc(270*var(--u))] h-[calc(44*var(--u))] [--ofd:8.4s] [--ofo:-2.8s]"} aria-hidden />
            <i className={ORBIT_SHADOW_BASE + " start-[calc(1585*var(--u))] top-[calc(525*var(--u))] w-[calc(320*var(--u))] h-[calc(42*var(--u))] [--ofd:7.8s] [--ofo:-4s]"} aria-hidden />
            {ORBIT_PRODUCTS.map((p) => (
              <img
                key={p.src}
                className={`${ORBIT_IMG_BASE} ${p.pos}`}
                src={p.src}
                alt={p.label}
                draggable={false}
              />
            ))}
          </div>
        </div>
        </div>

        {/* ===== 2 · Why ODYX — orbit infographic on the hero backdrop ===== */}
        <WhyOdyxOrbit />
      </section>

      {/* ===== 3 · Choose your path ===== */}
      <section
        className={`w-full box-border ${HV2_GUTTER} ${HV2_SECTION_Y} [container-type:inline-size] [--pc-u:clamp(.52px,0.0488281cqw,1px)] overflow-x-clip [background:linear-gradient(180deg,var(--hv2-surface)_0%,#FAFCFF_40%,#F6F8FE_100%)]`}
        id="path"
      >
        <div className="max-w-[1400px] mx-auto text-center rv">
          <p className={`${HV2_EYEBROW} text-[length:clamp(12px,1.2vw,14px)]! [letter-spacing:.12em]! mb-[clamp(10px,1.2vw,14px)]!`}>
            Choose Your Path
          </p>
          <h2 className={`${HV2_H2} text-[length:clamp(28px,3.6vw,42px)]! leading-[1.15]! [letter-spacing:-.015em]! mb-0!`}>
            Your Journey. <span className={HV2_BLUE}>Your Solution.</span>
          </h2>
        </div>
        <PathCarousel />
      </section>

      {/* ===== 4 · Ecosystem + Products — one section, no card ===== */}
      <section
        className={
          `w-full box-border ${HV2_GUTTER} ${HV2_SECTION_Y}` +
          " [background:radial-gradient(58%_70%_at_62%_32%,rgba(255,255,255,.9),rgba(255,255,255,0)_62%),linear-gradient(180deg,#F7F8FC_0%,var(--hv2-surface)_50%,#F0F2F8_100%)]" +
          " [--pr-card-h:261px] [--pr-radius:10px] [--pr-pad:20px] [--pr-pad-t:17.8px] [--pr-go:36px] [--pr-go-inset:15.5px] [--pr-go-bottom:24.6px] [--pr-title:16.2px] [--pr-title-lh:22.0px] [--pr-nav:37px] [--pr-panel-pad-i:0px] [--pr-band-y:clamp(2px,0.5vw,8px)]"
        }
      >
        <EcosystemSection />

        <div className="mt-0" id="products">
          <ProductsRail>
            <div className="pt-0 rv">
              <p className={`${HV2_EYEBROW} text-[14.7px]! font-medium! [letter-spacing:.028em]! mb-0! leading-[1.2]!`}>
                Products
              </p>
              <h2 className={`${HV2_H2} text-[length:clamp(24px,2.35vw,34px)]! font-normal! leading-[1.15]! [letter-spacing:-.014em]! [margin:19px_0_0]!`}>
                Built for precision.
                <br />
                Designed for <span className={HV2_BLUE}>you.</span>
              </h2>
              <p className={`${HV2_BODY} text-[16px]! leading-[28.2px]! text-[#4E5766]! max-w-[13.5em]! mt-[12px]! max-[980px]:max-w-[34em]!`}>
                Explore our complete range of digital dentistry solutions.
              </p>
              {/* Hidden until products overview is ready
              <Link className={PRODUCTS_CTA} href="/products">
                <span>Explore All Products</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              </Link>
              */}
            </div>
          </ProductsRail>
        </div>
      </section>

      {/* ===== 6 · Clinical applications ===== */}
      <ClinicalApplicationsSection />

      {/* ===== 7 · Clinical cases — the mirrored deck ===== */}
      <ClinicalCasesShowcase />

      {/* ===== 8 · Ecosystem hub — Learning / Support / Store / Registration ===== */}
      <HubCardsSection />

      {/* Footer: site-wide shared Footer from root layout */}

      <Hv2Motion />
    </div>
  );
}
