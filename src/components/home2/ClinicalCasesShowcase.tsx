"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { HV2_BLUE, HV2_BTN, HV2_BTN_SIZE, HV2_EYEBROW, HV2_GUTTER, HV2_H2, HV2_NAV, HV2_SECTION_Y } from "@/components/home2/hv2Chrome";
import { CLINICAL_INDICATIONS } from "@/content/clinical-indications";

// Clinical Cases — the client reference's mirrored deck: a four-card stack that
// fans backward to the LEFT with the active card closest to the viewer, and the
// copy column on the right. Geometry is dimensioned against that reference at a
// 2048px viewport (1740px content container, 665x505 card box) and carried in
// cqw off the query container, so the whole composition holds its proportions
// at any width.
//
// Sibling of ClinicalApplicationsSection but deliberately its own component:
// the fan direction, card ratio, art crops and column order all differ, and
// sharing one component would mean a flag on every rule.

type ClinicalCase = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: "implant" | "crown" | "arch" | "aligner";
};

// Card art = hero cutouts from matching Clinical Applications type detail pages.
const CASES: ClinicalCase[] = [
  {
    id: "implant",
    title: "Implant Cases",
    description: "See real cases of implant planning and placement with precision.",
    image: CLINICAL_INDICATIONS["implant-model"].hero.img,
    alt: CLINICAL_INDICATIONS["implant-model"].hero.imgAlt,
    icon: "implant",
  },
  {
    id: "restorative",
    title: "Restorative Cases",
    description: "Crowns, bridges and veneers finished to a natural, lasting result.",
    image: CLINICAL_INDICATIONS["same-day-crown"].hero.img,
    alt: CLINICAL_INDICATIONS["same-day-crown"].hero.imgAlt,
    icon: "crown",
  },
  {
    id: "surgical",
    title: "Full-Arch Cases",
    description: "Guided full-arch restorations planned and delivered end to end.",
    image: CLINICAL_INDICATIONS.dentures.hero.img,
    alt: CLINICAL_INDICATIONS.dentures.hero.imgAlt,
    icon: "arch",
  },
  {
    id: "orthodontic",
    title: "Aligner Cases",
    description: "Clear aligner treatments tracked from first scan to final retainer.",
    image: CLINICAL_INDICATIONS.aligners.hero.img,
    alt: CLINICAL_INDICATIONS.aligners.hero.imgAlt,
    icon: "aligner",
  },
];
const N = CASES.length;
const mod = (v: number) => ((v % N) + N) % N;

// Card badges: one 44x66 outline set so all four sit on the same optical
// baseline inside the card, matching the reference's implant mark.
const ICONS = {
  implant: (
    <>
      <path d="M22 3.4c-7.3 0-13.1 4.7-13.1 10.8 0 3.4 1.6 6.1 3.5 8h19.2c1.9-1.9 3.5-4.6 3.5-8C35.1 8.1 29.3 3.4 22 3.4Z" />
      <path d="M13.4 24.6h17.2l-1.4 13-1.3 11.6L22 62.2l-5.9-13-1.3-11.6-1.4-13Z" />
      <path d="M15.2 31.2h13.6M16 38.5h12M17.1 45.7h9.8M18.4 52.5h7.2" />
    </>
  ),
  crown: (
    // Tall molar, not the 24-grid tooth used elsewhere on this screen — that
    // one is near-square and reads undersized in a 44x66 badge box.
    <path d="M15 3C8.6 3 4.5 7.9 4.5 14.6c0 4.4 1.3 7.9 2.9 12.6 1.6 4.6 2.2 9 2.9 14.7.6 4.8 1.2 9.7 4 9.7 2.9 0 3.5-4.5 4.4-8.5.8-3.8 1.6-7.3 4-7.3s3.2 3.5 4 7.3c.9 4 1.5 8.5 4.4 8.5 2.8 0 3.4-4.9 4-9.7.7-5.7 1.3-10.1 2.9-14.7 1.6-4.7 2.9-8.2 2.9-12.6C40.5 7.9 36.4 3 30 3c-3.8 0-6.4 1.9-7.5 1.9S18.8 3 15 3Z" transform="translate(-.5 5)" />
  ),
  arch: (
    // Occlusal view of a full arch: a U-shaped band split into tooth segments.
    <>
      <path d="M6 11v14c0 16.6 7.2 30 16 30s16-13.4 16-30V11" />
      <path d="M14.6 11v13c0 9 3.3 16 7.4 16s7.4-7 7.4-16V11" />
      <path d="M6 20h8.6M38 20h-8.6M7.6 31l7.4-1.8M36.4 31l-7.4-1.8" />
    </>
  ),
  aligner: (
    <>
      <path d="M5 13c0 3.6.9 5.5.9 9.3C5.9 36.6 12 62 22 62s16.1-25.4 16.1-39.7c0-3.8.9-5.7.9-9.3" />
      <path d="M5 13c1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0 1.8 2.8 5 2.8 6.8 0" />
      <path d="M10.5 29c3.6 1.8 19.4 1.8 23 0" />
    </>
  ),
} as const;

const Badge = ({ icon }: { icon: ClinicalCase["icon"] }) => (
  <svg viewBox="0 0 44 66" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {ICONS[icon]}
  </svg>
);

const CC_SECTION =
  `relative w-full box-border ${HV2_GUTTER} ${HV2_SECTION_Y}` +
  " [background:radial-gradient(ellipse_34%_46%_at_30%_96%,rgba(22,108,255,.30)_0%,rgba(55,130,255,.13)_30%,rgba(55,130,255,0)_64%),radial-gradient(ellipse_30%_40%_at_44%_2%,rgba(40,120,255,.13)_0%,rgba(40,120,255,0)_68%),radial-gradient(ellipse_34%_62%_at_92%_50%,rgba(255,255,255,.85)_0%,rgba(255,255,255,0)_70%),linear-gradient(96deg,#F2F5FE_0%,#F4F6FD_46%,#F7F9FE_100%)]" +
  // Glows are keyed to where the deck sits, so they mirror with it.
  " rtl:[background:radial-gradient(ellipse_34%_46%_at_70%_96%,rgba(22,108,255,.30)_0%,rgba(55,130,255,.13)_30%,rgba(55,130,255,0)_64%),radial-gradient(ellipse_30%_40%_at_56%_2%,rgba(40,120,255,.13)_0%,rgba(40,120,255,0)_68%),radial-gradient(ellipse_34%_62%_at_8%_50%,rgba(255,255,255,.85)_0%,rgba(255,255,255,0)_70%),linear-gradient(264deg,#F2F5FE_0%,#F4F6FD_46%,#F7F9FE_100%)]";

const CC_IN =
  "relative w-[min(100%,1740px)] mx-auto [container-type:inline-size]" +
  " [--cc-cw:40.23cqw] [--cc-ch:28.97cqw] [--cc-r:1.26cqw] [--cc-dx:5.55cqw]" +
  " max-[1120px]:w-[min(100%,760px)] max-[1120px]:[--cc-cw:80cqw] max-[1120px]:[--cc-ch:60.75cqw]" +
  " max-[1120px]:[--cc-r:3.1cqw] max-[1120px]:[--cc-dx:6.4cqw]" +
  " max-[700px]:[--cc-cw:82cqw] max-[700px]:[--cc-ch:68cqw] max-[700px]:[--cc-r:4cqw] max-[700px]:[--cc-dx:5.8cqw]";

const CC_STAGE =
  // Outer air lives on the section; keep a light internal gap around the deck.
  "relative h-[var(--cc-ch)] [margin-block:1.2cqw_1.4cqw]" +
  " max-[1120px]:[margin-block:clamp(12px,2vw,24px)_clamp(12px,2vw,24px)]!";

const CC_CARD_BASE =
  "group/cc-card absolute top-0 start-0 w-[var(--cc-cw)] h-[var(--cc-ch)]" +
  " rounded-[var(--cc-r)] overflow-hidden isolate bg-[#070C1A]" +
  " [box-shadow:0_1.3cqw_2.1cqw_-.4cqw_rgba(20,104,255,.46),0_2.0cqw_3.4cqw_rgba(14,80,220,.22),0_.69cqw_1.7cqw_rgba(2,14,48,.16),inset_0_0_0_1px_rgba(214,231,255,.18)]" +
  " [transform-origin:0%_50%] rtl:[transform-origin:100%_50%]" +
  " transition-[transform,filter,box-shadow] duration-[.68s] ease-[cubic-bezier(.22,1,.36,1)]" +
  " motion-reduce:transition-none!" +
  // Cool veil (::after) that lifts rear cards toward frosted glass.
  " after:content-[''] after:absolute after:inset-0 after:z-[2] after:pointer-events-none" +
  " after:[background:linear-gradient(155deg,rgba(226,238,255,var(--cc-veil,0))_0%,rgba(203,222,252,var(--cc-veil,0))_100%)]" +
  " after:transition-[background] after:duration-[.68s] after:ease-[cubic-bezier(.22,1,.36,1)]" +
  " motion-reduce:after:transition-none!";

const REAR_SHADOW =
  " [box-shadow:0_1.0cqw_1.6cqw_-.6cqw_rgba(20,104,255,.42),0_1.4cqw_2.5cqw_-.3cqw_rgba(14,80,220,.15),inset_0_0_0_1px_rgba(228,240,255,.46)]!";

// Slot 0: translate BEFORE perspective (see home-v2.css comment). Below 1120px
// the perspective is dropped so the right edge stays inside the container.
const SLOT_CLASS: Record<number, string> = {
  0:
    "z-[5]" +
    " [transform:translateX(calc(var(--cc-dx)_*_3))_perspective(1325px)_rotateY(10deg)]" +
    " rtl:[transform:translateX(calc(var(--cc-dx)_*_-3))_perspective(1325px)_rotateY(-10deg)]" +
    " max-[1120px]:[transform:translateX(calc(var(--cc-dx)_*_3))_rotateY(0deg)]!" +
    " max-[1120px]:rtl:[transform:translateX(calc(var(--cc-dx)_*_-3))_rotateY(0deg)]!",
  1:
    "z-[4] [--cc-veil:.26] [filter:blur(.7px)_saturate(.56)_brightness(.95)]" +
    " [transform:translate(calc(var(--cc-dx)_*_1.780),_.12cqw)_scale(.929)]" +
    " rtl:[transform:translate(calc(var(--cc-dx)_*_-1.780),_.12cqw)_scale(.929)]" +
    REAR_SHADOW,
  2:
    "z-[3] [--cc-veil:.38] [filter:blur(1.5px)_saturate(.46)_brightness(.86)]" +
    " [transform:translate(calc(var(--cc-dx)_*_.818),_.29cqw)_scale(.869)]" +
    " rtl:[transform:translate(calc(var(--cc-dx)_*_-.818),_.29cqw)_scale(.869)]" +
    REAR_SHADOW,
  3:
    "z-[2] [--cc-veil:.52] [filter:blur(2.3px)_saturate(.36)_brightness(.92)]" +
    " [transform:translate(calc(var(--cc-dx)_*_.104),_.43cqw)_scale(.811)]" +
    " rtl:[transform:translate(calc(var(--cc-dx)_*_-.104),_.43cqw)_scale(.811)]" +
    " max-[700px]:hidden!" +
    REAR_SHADOW,
};

const CC_ART = "absolute inset-0 w-full h-full object-cover block rtl:scale-x-[-1]";

const CC_SCRIM_BASE =
  "absolute inset-0 z-[1]" +
  " [background:linear-gradient(0deg,rgba(6,17,48,.28)_0%,rgba(6,17,48,0)_30%)]";

const CC_SCRIM_ACTIVE =
  " [background:linear-gradient(0deg,rgba(4,12,36,.52)_0%,rgba(4,12,36,.14)_20%,rgba(4,12,36,0)_40%),linear-gradient(90deg,rgba(3,10,26,.58)_0%,rgba(3,10,26,.40)_34%,rgba(3,10,26,0)_52%),linear-gradient(90deg,rgba(3,12,29,.97)_0%,rgba(3,12,29,.82)_31%,rgba(3,12,29,.28)_60%,rgba(3,12,29,.04)_100%)]!" +
  " rtl:[background:linear-gradient(0deg,rgba(4,12,36,.52)_0%,rgba(4,12,36,.14)_20%,rgba(4,12,36,0)_40%),linear-gradient(270deg,rgba(3,10,26,.58)_0%,rgba(3,10,26,.40)_34%,rgba(3,10,26,0)_52%),linear-gradient(270deg,rgba(3,12,29,.97)_0%,rgba(3,12,29,.82)_31%,rgba(3,12,29,.28)_60%,rgba(3,12,29,.04)_100%)]!" +
  // Phone: darken the whole frame — the copy reaches too far for a left-third wash.
  " max-[700px]:[background:linear-gradient(0deg,rgba(4,12,36,.55)_0%,rgba(4,12,36,.12)_34%,rgba(4,12,36,0)_56%),linear-gradient(90deg,rgba(3,10,26,.94)_0%,rgba(3,10,26,.84)_46%,rgba(3,10,26,.55)_74%,rgba(3,10,26,.28)_100%)]!" +
  " max-[700px]:rtl:[background:linear-gradient(0deg,rgba(4,12,36,.55)_0%,rgba(4,12,36,.12)_34%,rgba(4,12,36,0)_56%),linear-gradient(270deg,rgba(3,10,26,.94)_0%,rgba(3,10,26,.84)_46%,rgba(3,10,26,.55)_74%,rgba(3,10,26,.28)_100%)]!";

const CC_CBODY =
  "relative z-[3] h-full flex flex-col items-start ps-[3.22cqw] pt-[3.28cqw]" +
  " transition-opacity duration-[.48s] ease-out motion-reduce:transition-none!" +
  " max-[1120px]:ps-[6cqw]! max-[1120px]:pt-[6cqw]!" +
  " max-[700px]:ps-[7.5cqw]! max-[700px]:pt-[8cqw]!";

const CC_IC =
  "block text-white [&>svg]:w-[2.47cqw] [&>svg]:h-[3.71cqw] [&>svg]:block" +
  " max-[1120px]:[&>svg]:w-[5.2cqw]! max-[1120px]:[&>svg]:h-[7.8cqw]!" +
  " max-[700px]:[&>svg]:w-[7cqw]! max-[700px]:[&>svg]:h-[10.5cqw]!";

const CC_T =
  // ! needed: .hv2 h3 sets ink color / tracking.
  "text-white! text-[1.78cqw]! font-bold! leading-[1.2]! [letter-spacing:-.015em]! [margin:1.32cqw_0_0]! rtl:[letter-spacing:0]!" +
  " max-[1120px]:text-[3.6cqw]! max-[1120px]:mt-[2.8cqw]!" +
  " max-[700px]:text-[5.2cqw]! max-[700px]:mt-[3.6cqw]!";

const CC_T_RULE =
  "block w-[3.33cqw] h-[.23cqw] mt-[1.26cqw] rounded-[1px] bg-[#1268E6]" +
  " max-[1120px]:w-[6.8cqw]! max-[1120px]:h-[.48cqw]! max-[1120px]:mt-[2.6cqw]!" +
  " max-[700px]:w-[9cqw]! max-[700px]:h-[.62cqw]! max-[700px]:mt-[3.2cqw]!";

const CC_D =
  "text-[rgba(255,255,255,.90)] text-[1.07cqw] font-medium leading-[1.88] mt-[2.42cqw] w-[12.90cqw]" +
  " max-[1120px]:text-[2.2cqw]! max-[1120px]:mt-[3cqw]! max-[1120px]:w-[29cqw]!" +
  " max-[700px]:text-[3.5cqw]! max-[700px]:mt-[3.6cqw]! max-[700px]:w-[55cqw]!";

// Centering uses the CSS `translate` property; hover lift uses `transform` so
// the two compose (see original home-v2.css note — repeating -50% in transform
// would shove the disc off the click target under reduced-motion).
const CC_NAV =
  `${HV2_NAV} absolute! z-[8]! top-[62.9%]! w-[3.68cqw]! h-[3.68cqw]!` +
  " bg-white! text-[#0E5FD8]! border-0!" +
  " [box-shadow:0_12px_28px_rgba(22,75,166,.16),0_3px_9px_rgba(14,48,107,.09)]!" +
  " transition-[transform,box-shadow]! duration-200! ease-out!" +
  " hover:[transform:translateY(-2px)]! hover:[box-shadow:0_16px_34px_rgba(22,75,166,.22),0_4px_11px_rgba(14,48,107,.12)]!" +
  " [&>svg]:w-[1.26cqw]! [&>svg]:h-[1.26cqw]!" +
  " motion-reduce:transition-none!" +
  " max-[1120px]:w-[48px]! max-[1120px]:h-[48px]! max-[1120px]:[&>svg]:w-[19px]! max-[1120px]:[&>svg]:h-[19px]!" +
  " max-[700px]:w-[42px]! max-[700px]:h-[42px]! max-[700px]:[&>svg]:w-[17px]! max-[700px]:[&>svg]:h-[17px]!";

const CC_NAV_PREV =
  "start-[14.89cqw]! [translate:-50%_-50%]! rtl:[translate:50%_-50%]!" +
  " max-[1120px]:start-[19.2cqw]! max-[700px]:start-[17.4cqw]!";

const CC_NAV_NEXT =
  "start-[52.93cqw]! [translate:-50%_-50%]! rtl:[translate:50%_-50%]!" +
  " max-[1120px]:start-[96cqw]! max-[700px]:start-[96cqw]!";

const CC_COPY =
  "absolute z-[6] start-[62.70cqw] top-[7.87cqw] w-[24.14cqw]" +
  " max-[1120px]:static! max-[1120px]:w-auto! max-[1120px]:max-w-[34em]! max-[1120px]:pb-[6px]!";

const CC_EYEBROW =
  `${HV2_EYEBROW} text-[#0750DE]! text-[1.09cqw]! font-bold! [letter-spacing:.04em]! leading-[1.2]! mb-0! rtl:[letter-spacing:0]!` +
  " max-[1120px]:text-[12.5px]! max-[1120px]:[letter-spacing:.06em]! max-[1120px]:rtl:[letter-spacing:0]!";

const CC_H =
  `${HV2_H2} text-[#030817]! text-[3.79cqw]! font-bold! leading-[.98]! [letter-spacing:-.025em]! [margin:1.98cqw_0_0]! rtl:[letter-spacing:0]!` +
  " max-[1120px]:text-[length:clamp(28px,4.6vw,40px)]! max-[1120px]:mt-[14px]!";

const CC_RULE =
  "block w-[3.39cqw] h-[.20cqw] mt-[1.55cqw] rounded-[2px] bg-[#0F5FD6]" +
  " max-[1120px]:w-[52px]! max-[1120px]:h-[4px]! max-[1120px]:mt-[16px]!";

const CC_LEAD =
  "text-[#394158] text-[1.18cqw] font-medium leading-[1.8] mt-[1.67cqw]" +
  " max-[1120px]:text-[length:clamp(15px,1.9vw,17px)]! max-[1120px]:mt-[16px]! max-[1120px]:[&_br]:hidden";

const CC_CTA =
  `${HV2_BTN} ${HV2_BTN_SIZE} mt-[2.27cqw]! justify-between! border-0!` +
  " [background:linear-gradient(90deg,#0038D9_0%,#005BFF_100%)]!" +
  " [box-shadow:0_13px_26px_rgba(0,77,255,.24),0_4px_9px_rgba(0,50,190,.18)]!" +
  " transition-[transform,box-shadow]! duration-[.22s]! ease-out!" +
  " hover:-translate-y-[2px]! hover:[box-shadow:0_17px_32px_rgba(0,77,255,.30),0_5px_11px_rgba(0,50,190,.22)]!" +
  " [&>span]:mt-px rtl:[&>svg]:scale-x-[-1] motion-reduce:transition-none!" +
  " max-[1120px]:mt-[22px]! max-[700px]:w-full!";

export default function ClinicalCasesShowcase() {
  const [active, setActive] = useState(0);
  // Pointer swipe: one gesture = one step, threshold in px so a tap never fires.
  const drag = useRef<{ x: number; id: number } | null>(null);

  const step = useCallback((d: number) => setActive((a) => mod(a + d)), []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    drag.current = { x: e.clientX, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
  };

  return (
    <section className={CC_SECTION} id="cases" aria-labelledby="hv2-cc-h">
      <div className={CC_IN}>
        <div className={`${CC_STAGE} rv`} data-rv="1">
          {/* aria-roledescription needs a real role to attach to. */}
          <div
            className="absolute inset-0 focus-visible:outline-offset-[6px]"
            role="group"
            aria-roledescription="carousel"
            aria-label="Clinical cases"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => { drag.current = null; }}
          >
            {CASES.map((c, i) => {
              const slot = mod(i - active);
              return (
                <article
                  className={`${CC_CARD_BASE} ${SLOT_CLASS[slot]}`}
                  key={c.id}
                  data-slot={slot}
                  aria-hidden={slot !== 0 ? true : undefined}
                >
                  <img
                    className={CC_ART}
                    src={c.image}
                    alt={slot === 0 ? c.alt : ""}
                    width={1700}
                    height={1224}
                    loading="lazy"
                    decoding="async"
                  />
                  <span
                    className={`${CC_SCRIM_BASE}${slot === 0 ? CC_SCRIM_ACTIVE : ""}`}
                    aria-hidden
                  />
                  <div className={`${CC_CBODY}${slot !== 0 ? " opacity-0" : ""}`}>
                    <span className={CC_IC} aria-hidden>
                      <Badge icon={c.icon} />
                    </span>
                    <h3 className={CC_T}>{c.title}</h3>
                    <span className={CC_T_RULE} aria-hidden />
                    <p className={CC_D}>{c.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className={`${CC_NAV} ${CC_NAV_PREV}`}
            aria-label="Previous clinical case"
            onClick={() => step(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${CC_NAV} ${CC_NAV_NEXT}`}
            aria-label="Next clinical case"
            onClick={() => step(1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className={`${CC_COPY} rv`} data-rv="2">
          <p className={CC_EYEBROW}>Clinical Cases</p>
          <h2 className={CC_H} id="hv2-cc-h">
            Real Cases.
            <br />
            Real Results<span className={HV2_BLUE}>.</span>
          </h2>
          <span className={CC_RULE} aria-hidden />
          {/* The explicit space survives the <br> being dropped when this
              stacks — without it the two lines butt together. */}
          <p className={CC_LEAD}>
            See how professionals{" "}
            <br />
            achieve more with ODYX.
          </p>
          <Link className={CC_CTA} href="/cases#featured-cases">
            <span>View Clinical Cases</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
