"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import { HV2_BLUE, HV2_BTN, HV2_BTN_SIZE, HV2_EYEBROW, HV2_GUTTER, HV2_H2, HV2_NAV, HV2_SECTION_Y } from "@/components/home2/hv2Chrome";

// Clinical Applications — the mock's layered card deck: left copy column and
// a five-card stack that recedes to the left behind a large active card.
// Geometry is dimensioned against the client reference at a 2048px viewport
// (1828px content container, 680x585 card box) and carried in cqw off the
// query container, so every offset holds its proportion at any width.

type ClinicalApplication = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const APPLICATIONS: ClinicalApplication[] = [
  {
    id: "restorative",
    title: "Restorative",
    description: "From crowns to veneers,\nperfect esthetics and\nlasting durability.",
    image: "/img/hv2-clinical/restorative.webp",
    alt: "Posterior ceramic crowns seated on pink gingiva against a white background",
  },
  {
    id: "prosthetics",
    title: "Prosthetics",
    description: "Complete and partial\ndentures with a natural,\nlifelike finish.",
    image: "/img/hv2-clinical/prosthetics.webp",
    alt: "Full-arch prosthetic teeth set in a pink gum base on a white background",
  },
  {
    id: "implant",
    title: "Implant",
    description: "Surgical guides for\naccurate planning and\nprecise placement.",
    image: "/img/hv2-clinical/implant-dentistry.webp",
    alt: "Clear implant surgical guide with metal and colored drill sleeves",
  },
  {
    id: "models",
    title: "Models",
    description: "High-precision arches\nfor predictable try-ins\nand provisionals.",
    image: "/img/hv2-clinical/dental-models.webp",
    alt: "Tan 3D-printed lower dental arch model on a white background",
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    description: "Clear aligners and\nretainers for lasting\nresults.",
    image: "/img/hv2-clinical/clear-aligners.webp",
    alt: "Clear orthodontic aligner tray isolated on a white background",
  },
];

const N = APPLICATIONS.length;
const mod = (v: number) => ((v % N) + N) % N;

const Tooth = () => (
  <svg viewBox="0 0 44 52" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M22 2.6c-3 0-4.9 1.4-7.2 1.4S11 2.6 8.1 2.6C3.7 2.6 1.6 6.5 1.6 11c0 3.3 1 5.8 2.1 9.3 1.1 3.3 1.6 6.5 2 10.8.4 3.6.9 8.3 3.1 8.3 2.2 0 2.7-3.3 3.4-6.4.6-2.8 1.2-5.3 3.8-5.3s3.2 2.5 3.8 5.3c.7 3.1 1.2 6.4 3.4 6.4 2.2 0 2.7-4.7 3.1-8.3.4-4.3.9-7.5 2-10.8 1.1-3.5 2.1-6 2.1-9.3 0-4.5-2.1-8.4-6.5-8.4Z" transform="translate(5 4)" />
  </svg>
);

// Pointer-follow tilt while a card is hovered: writes --ca-mx/--ca-my (max
// ~2.2deg) that the hover transform adds to its rotateY/rotateX. Mouse only —
// touch never sets the vars, and reduced-motion overrides the hover transform
// entirely so the vars go unused there.
const setTilt = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== "mouse") return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ca-mx", `${(x * 4.4).toFixed(2)}deg`);
  el.style.setProperty("--ca-my", `${(y * -3.2).toFixed(2)}deg`);
};
const clearTilt = (e: PointerEvent<HTMLElement>) => {
  e.currentTarget.style.removeProperty("--ca-mx");
  e.currentTarget.style.removeProperty("--ca-my");
};

const CA_IN =
  "relative w-[min(100%,1828px)] mx-auto [container-type:inline-size]" +
  " [--ca-cw:37.20cqw] [--ca-ch:32.00cqw] [--ca-right:4.10cqw] [--ca-r:1.59cqw] [--ca-dx:-9.55cqw]" +
  " rtl:[--ca-dir:-1]" +
  " max-[1080px]:w-[min(100%,760px)] max-[1080px]:[--ca-cw:74cqw] max-[1080px]:[--ca-ch:63.7cqw]" +
  " max-[1080px]:[--ca-right:6cqw] max-[1080px]:[--ca-r:3.1cqw] max-[1080px]:[--ca-dx:-11cqw]" +
  " max-[700px]:[--ca-cw:80cqw] max-[700px]:[--ca-ch:86cqw] max-[700px]:[--ca-right:5cqw]" +
  " max-[700px]:[--ca-r:4cqw] max-[700px]:[--ca-dx:-8cqw]";

const CA_COPY =
  "absolute z-[6] start-0 top-[5.25cqw] w-[21.33cqw]" +
  " max-[1080px]:static! max-[1080px]:w-auto! max-[1080px]:max-w-[34em]! max-[1080px]:pt-[6px]!";

const CA_EYEBROW =
  `${HV2_EYEBROW} text-[#0757B8]! text-[1.286cqw]! font-bold! [letter-spacing:.02em]! leading-[1.2]! mb-0!` +
  " max-[1080px]:text-[12.5px]! max-[1080px]:[letter-spacing:.06em]!";

const CA_H =
  `${HV2_H2} text-[#03102D]! text-[3.392cqw]! font-bold! leading-[1.123]! [letter-spacing:-.025em]! [margin:1.58cqw_0_0]!` +
  " max-[1080px]:text-[length:clamp(28px,4.6vw,40px)]! max-[1080px]:mt-[14px]!";

const CA_RULE =
  "block w-[3.50cqw] h-[.274cqw] mt-[1.19cqw] rounded-[1px] bg-[#1671D9]" +
  " max-[1080px]:w-[52px]! max-[1080px]:h-[4px]! max-[1080px]:mt-[16px]!";

const CA_LEAD =
  "text-[#26334C] text-[1.395cqw] font-normal leading-[1.6] mt-[1.92cqw]" +
  " max-[1080px]:text-[length:clamp(15px,1.9vw,17px)]! max-[1080px]:mt-[16px]!";

const CA_CTA =
  `${HV2_BTN} ${HV2_BTN_SIZE} mt-[2.08cqw]! justify-between! border-0!` +
  " [background:linear-gradient(90deg,#0868E8_0%,#0876F4_100%)]!" +
  " [box-shadow:0_12px_25px_rgba(21,104,236,.18),0_3px_8px_rgba(20,92,220,.12)]!" +
  " transition-[transform,box-shadow]! duration-[.22s]! ease-out!" +
  " hover:-translate-y-[2px]! hover:[box-shadow:0_16px_30px_rgba(21,104,236,.24),0_4px_10px_rgba(20,92,220,.16)]!" +
  " [&>span]:mt-px rtl:[&>svg]:scale-x-[-1] motion-reduce:transition-none!" +
  " max-[1080px]:mt-[22px]! max-[700px]:w-full!";

const CA_STAGE =
  // Outer air lives on the section (HV2_SECTION_Y); keep a light internal gap.
  "relative h-[var(--ca-ch)] [margin-block:.574cqw_1.2cqw]" +
  " max-[1080px]:[margin-block:clamp(16px,2.4vw,28px)_clamp(12px,2vw,24px)]!";

// Rest pose + shared chrome. Slot geometry / veil / filter live in SLOT_CLASS.
// Hover lift rebuilds the slot's own translate/scale/rotate and layers the
// reference's elevated 3D pose on top (pointer tilt via --ca-mx/--ca-my).
const CA_CARD_BASE =
  "group/ca-card absolute top-0 end-[var(--ca-right)] w-[var(--ca-cw)] h-[var(--ca-ch)]" +
  " rounded-[var(--ca-r)] overflow-hidden isolate bg-[#080D1C]" +
  " [box-shadow:0_1.2cqw_2.0cqw_-.45cqw_rgba(24,110,255,.50),0_1.9cqw_3.3cqw_rgba(17,87,224,.24),0_.66cqw_1.5cqw_rgba(2,14,48,.15),inset_0_0_0_1px_rgba(214,231,255,.20)]" +
  " [transform-origin:50%_50%]" +
  " [transform:translateX(var(--ca-tx,0cqw))_scale(var(--ca-sc,1))_rotate(var(--ca-rz,0deg))]" +
  " [filter:var(--ca-flt,none)]" +
  " transition-[transform,filter,box-shadow,opacity] duration-[.48s] ease-[cubic-bezier(.22,1,.36,1)]" +
  " focus-visible:outline-2 focus-visible:outline-[#7FB2FF] focus-visible:outline-offset-4" +
  " max-[1080px]:[--ca-hy:-.4cqw] max-[1080px]:[--ca-hsc:1.03] max-[1080px]:[--ca-hrz:1.2deg]" +
  " max-[1080px]:[--ca-hry:-.9deg] max-[1080px]:[--ca-hrx:.7deg]" +
  " hover:z-[7] hover:[--ca-veil:0] hover:[filter:none] hover:will-change-transform hover:duration-[.58s]" +
  " hover:[transform:perspective(1500px)_translateX(var(--ca-tx,0cqw))_translateY(var(--ca-hy,-.66cqw))_rotateX(calc(var(--ca-hrx,1.1deg)_+_var(--ca-my,0deg)))_rotateY(calc(var(--ca-hry,-1.6deg)_*_var(--ca-dir,1)_+_var(--ca-mx,0deg)))_rotate(calc(var(--ca-rz,0deg)_+_var(--ca-hrz,2.4deg)_*_var(--ca-dir,1)))_scale(calc(var(--ca-sc,1)_*_var(--ca-hsc,1.055)))]" +
  " hover:[box-shadow:0_2.1cqw_3.8cqw_-.5cqw_rgba(24,110,255,.55),0_3.0cqw_5.4cqw_rgba(10,40,110,.30),0_.9cqw_2cqw_rgba(2,14,48,.24),inset_0_0_0_1px_rgba(214,231,255,.28)]" +
  " focus-visible:z-[7] focus-visible:[--ca-veil:0] focus-visible:[filter:none] focus-visible:will-change-transform focus-visible:duration-[.58s]" +
  " focus-visible:[transform:perspective(1500px)_translateX(var(--ca-tx,0cqw))_translateY(var(--ca-hy,-.66cqw))_rotateX(calc(var(--ca-hrx,1.1deg)_+_var(--ca-my,0deg)))_rotateY(calc(var(--ca-hry,-1.6deg)_*_var(--ca-dir,1)_+_var(--ca-mx,0deg)))_rotate(calc(var(--ca-rz,0deg)_+_var(--ca-hrz,2.4deg)_*_var(--ca-dir,1)))_scale(calc(var(--ca-sc,1)_*_var(--ca-hsc,1.055)))]" +
  " focus-visible:[box-shadow:0_2.1cqw_3.8cqw_-.5cqw_rgba(24,110,255,.55),0_3.0cqw_5.4cqw_rgba(10,40,110,.30),0_.9cqw_2cqw_rgba(2,14,48,.24),inset_0_0_0_1px_rgba(214,231,255,.28)]" +
  " motion-reduce:transition-none! motion-reduce:hover:will-change-auto!" +
  " motion-reduce:hover:[transform:translateX(var(--ca-tx,0cqw))_scale(var(--ca-sc,1))_rotate(var(--ca-rz,0deg))]!" +
  " motion-reduce:focus-visible:[transform:translateX(var(--ca-tx,0cqw))_scale(var(--ca-sc,1))_rotate(var(--ca-rz,0deg))]!" +
  // Cool veil (::after) that lifts rear cards toward frosted glass.
  " after:content-[''] after:absolute after:inset-0 after:z-[2] after:pointer-events-none" +
  " after:[background:linear-gradient(150deg,rgba(228,239,255,var(--ca-veil,0))_0%,rgba(207,225,253,var(--ca-veil,0))_100%)]" +
  " after:transition-[background] after:duration-[.62s] after:ease-[cubic-bezier(.22,1,.36,1)]" +
  " motion-reduce:after:transition-none!";

const REAR_SHADOW =
  " [box-shadow:0_1.0cqw_1.5cqw_-.62cqw_rgba(24,110,255,.46),0_1.3cqw_2.4cqw_-.3cqw_rgba(17,87,224,.16),inset_0_0_0_1px_rgba(228,240,255,.50)]!";

const SLOT_CLASS: Record<number, string> = {
  0: "z-[5]",
  1:
    "z-[4] [--ca-veil:.34] [--ca-flt:blur(.8px)_saturate(.44)_brightness(.95)]" +
    " [--ca-tx:calc(var(--ca-dx)_*_1_*_var(--ca-dir,1))] [--ca-sc:.91]" +
    " [--ca-rz:calc(.9deg_*_var(--ca-dir,1))]" +
    REAR_SHADOW,
  2:
    "z-[3] [--ca-veil:.44] [--ca-flt:blur(1.6px)_saturate(.5)_brightness(.80)]" +
    " [--ca-tx:calc(var(--ca-dx)_*_1.750_*_var(--ca-dir,1))] [--ca-sc:.84]" +
    " [--ca-rz:calc(.2deg_*_var(--ca-dir,1))]" +
    REAR_SHADOW,
  3:
    "z-[2] [--ca-veil:.60] [--ca-flt:blur(2.4px)_saturate(.42)_brightness(.86)]" +
    " [--ca-tx:calc(var(--ca-dx)_*_2.402_*_var(--ca-dir,1))] [--ca-sc:.79]" +
    " [--ca-rz:calc(-.4deg_*_var(--ca-dir,1))] [--ca-hrz:-1.8deg]" +
    " max-[1080px]:[--ca-hrz:-1deg] max-[700px]:hidden!" +
    REAR_SHADOW,
  4:
    "z-[1] [--ca-veil:.86] [--ca-flt:blur(3.2px)_saturate(.3)_brightness(1.02)]" +
    " [--ca-tx:calc(var(--ca-dx)_*_2.979_*_var(--ca-dir,1))] [--ca-sc:.75]" +
    " [--ca-rz:calc(-.8deg_*_var(--ca-dir,1))] [--ca-hrz:-1.8deg]" +
    " max-[1080px]:[--ca-hrz:-1deg] max-[700px]:hidden!" +
    REAR_SHADOW,
};

const CA_ART =
  "absolute inset-0 w-full h-full object-cover block rtl:scale-x-[-1]";

// Rear cards: navy foot only. Active / hovered / focused: heavy left wash for
// copy. RTL replaces the resting rear wash (active/hover still win via !).
const CA_SCRIM =
  "absolute inset-0 z-[1]" +
  " [background:linear-gradient(0deg,rgba(6,17,48,.30)_0%,rgba(6,17,48,0)_30%)]" +
  " transition-[background] duration-[.48s] ease-[cubic-bezier(.22,1,.36,1)]" +
  " motion-reduce:transition-none!" +
  " rtl:[background:linear-gradient(0deg,rgba(6,17,48,.55)_0%,rgba(6,17,48,0)_34%),linear-gradient(270deg,rgba(3,6,18,.92)_0%,rgba(4,7,20,.78)_26%,rgba(8,8,18,.26)_53%,rgba(4,4,10,.04)_75%)]" +
  " group-data-[slot=0]/ca-card:[background:linear-gradient(0deg,rgba(5,14,42,.74)_0%,rgba(5,14,42,.20)_22%,rgba(5,14,42,0)_42%),linear-gradient(90deg,rgba(4,8,22,.95)_0%,rgba(4,8,22,.90)_29%,rgba(6,10,24,.44)_51%,rgba(4,6,16,.08)_73%,rgba(4,6,16,0)_86%)]!" +
  " group-hover/ca-card:[background:linear-gradient(0deg,rgba(5,14,42,.74)_0%,rgba(5,14,42,.20)_22%,rgba(5,14,42,0)_42%),linear-gradient(90deg,rgba(4,8,22,.95)_0%,rgba(4,8,22,.90)_29%,rgba(6,10,24,.44)_51%,rgba(4,6,16,.08)_73%,rgba(4,6,16,0)_86%)]!" +
  " group-focus-visible/ca-card:[background:linear-gradient(0deg,rgba(5,14,42,.74)_0%,rgba(5,14,42,.20)_22%,rgba(5,14,42,0)_42%),linear-gradient(90deg,rgba(4,8,22,.95)_0%,rgba(4,8,22,.90)_29%,rgba(6,10,24,.44)_51%,rgba(4,6,16,.08)_73%,rgba(4,6,16,0)_86%)]!";

const CA_CBODY =
  "relative z-[3] h-full flex flex-col items-start ps-[2.63cqw] pt-[9.41cqw]" +
  " transition-opacity duration-[.45s] ease-out" +
  " motion-reduce:transition-none!" +
  // Rear cards keep their art but never their copy at rest; hover/focus
  // reveals copy on any slot (matches the reference's elevated pose).
  " group-data-[slot=1]/ca-card:opacity-0 group-data-[slot=2]/ca-card:opacity-0" +
  " group-data-[slot=3]/ca-card:opacity-0 group-data-[slot=4]/ca-card:opacity-0" +
  " group-hover/ca-card:opacity-100! group-focus-visible/ca-card:opacity-100!" +
  " max-[1080px]:ps-[5.4cqw]! max-[1080px]:pt-[19cqw]!" +
  " max-[700px]:ps-[7cqw]! max-[700px]:pt-[20cqw]!";

const CA_IC =
  "block text-white [&>svg]:w-[2.66cqw] [&>svg]:h-[3.06cqw] [&>svg]:block" +
  " max-[1080px]:[&>svg]:w-[5.2cqw]! max-[1080px]:[&>svg]:h-[6cqw]!" +
  " max-[700px]:[&>svg]:w-[7.4cqw]! max-[700px]:[&>svg]:h-[8.5cqw]!";

const CA_T =
  // ! needed: .hv2 h3 sets ink color / 700 weight / -.01em tracking.
  "text-white! text-[1.860cqw]! font-semibold! leading-[1.2]! [letter-spacing:-.005em]! [margin:2.13cqw_0_0]!" +
  " max-[1080px]:text-[3.5cqw]! max-[1080px]:mt-[4.2cqw]!" +
  " max-[700px]:text-[5.4cqw]! max-[700px]:mt-[5cqw]!";

const CA_T_RULE =
  "block w-[3.23cqw] h-[.219cqw] mt-[1.07cqw] rounded-[1px] bg-[#126BE8]" +
  " max-[1080px]:w-[6.4cqw]! max-[1080px]:h-[.45cqw]! max-[1080px]:mt-[2.1cqw]!" +
  " max-[700px]:w-[9cqw]! max-[700px]:h-[.62cqw]! max-[700px]:mt-[3cqw]!";

const CA_D =
  "text-[rgba(255,255,255,.88)] text-[1.149cqw] font-normal leading-[1.82] mt-[2.35cqw] w-[13.68cqw] whitespace-pre-line" +
  " max-[1080px]:text-[2.2cqw]! max-[1080px]:mt-[4.6cqw]! max-[1080px]:w-[27cqw]!" +
  " max-[700px]:text-[3.8cqw]! max-[700px]:mt-[4.6cqw]! max-[700px]:w-[60cqw]!";

const CA_NAV =
  `${HV2_NAV} absolute! z-[8]! top-[56.7%]! w-[3.61cqw]! h-[3.61cqw]!` +
  " bg-[rgba(255,255,255,.96)]! text-[#0F63DA]! border-0!" +
  " [box-shadow:0_10px_26px_rgba(22,75,166,.15),0_2px_8px_rgba(14,48,107,.08)]!" +
  " [&>svg]:w-[1.26cqw]! [&>svg]:h-[1.26cqw]!" +
  " max-[1080px]:w-[46px]! max-[1080px]:h-[46px]! max-[1080px]:top-1/2!" +
  " max-[1080px]:[&>svg]:w-[19px]! max-[1080px]:[&>svg]:h-[19px]!" +
  " max-[700px]:w-[42px]! max-[700px]:h-[42px]!" +
  " max-[700px]:[&>svg]:w-[17px]! max-[700px]:[&>svg]:h-[17px]!";

const CA_NAV_PREV =
  "start-[35.0cqw]! -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2!" +
  " max-[1080px]:start-[10cqw]! max-[700px]:start-[11cqw]!";

const CA_NAV_NEXT =
  "start-[96.06cqw]! -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2!" +
  " max-[1080px]:start-[97cqw]! max-[700px]:start-[96cqw]!";

export default function ClinicalApplicationsSection() {
  const [active, setActive] = useState(0);
  // Sibling dim while any card is hovered/focused — done in state rather than
  // a :has() Tailwind arbitrary (those fail to parse with nested :is/:not).
  const [lifted, setLifted] = useState<number | null>(null);

  return (
    <section
      className={`relative w-full ${HV2_GUTTER} ${HV2_SECTION_Y} [background:radial-gradient(ellipse_36%_50%_at_68%_90%,rgba(25,112,255,.28)_0%,rgba(55,130,255,.13)_26%,rgba(55,130,255,0)_62%),radial-gradient(ellipse_26%_52%_at_89%_47%,rgba(104,121,255,.10)_0%,rgba(104,121,255,0)_62%),linear-gradient(90deg,#FAFBFF_0%,#F7F9FF_42%,#F5F7FD_100%)]`}
      id="applications"
      aria-labelledby="hv2-ca-h"
    >
      <div className={CA_IN}>
        <div className={`${CA_COPY} rv`} data-rv="1">
          <p className={CA_EYEBROW}>Clinical Applications</p>
          <h2 className={CA_H} id="hv2-ca-h">
            Solutions for
            <br />
            Every Need<span className={HV2_BLUE}>.</span>
          </h2>
          <span className={CA_RULE} aria-hidden />
          <p className={CA_LEAD}>
            Discover how ODYX fits into
            <br />
            every clinical indication.
          </p>
          <Link className={CA_CTA} href="/solutions/clinical-applications">
            <span>Explore All Applications</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className={`${CA_STAGE} rv`} data-rv="2">
          {/* aria-roledescription needs a real role to attach to. */}
          <div className="absolute inset-0" role="group" aria-roledescription="carousel" aria-label="Clinical applications">
            {APPLICATIONS.map((a, i) => {
              const slot = mod(i - active);
              const dimmed = lifted !== null && lifted !== i;
              return (
                <article
                  className={`${CA_CARD_BASE} ${SLOT_CLASS[slot]}${dimmed ? " opacity-[.82]" : ""}`}
                  key={a.id}
                  data-slot={slot}
                  aria-hidden={slot !== 0 ? true : undefined}
                  /* Active card is keyboard-reachable so :focus-visible can
                     mirror the hover lift; rear cards stay aria-hidden. */
                  tabIndex={slot === 0 ? 0 : undefined}
                  onPointerMove={setTilt}
                  onPointerEnter={() => setLifted(i)}
                  onPointerLeave={(e) => {
                    clearTilt(e);
                    setLifted(null);
                  }}
                  onFocus={() => setLifted(i)}
                  onBlur={() => setLifted(null)}
                >
                  <img
                    className={CA_ART}
                    src={a.image}
                    alt={slot === 0 ? a.alt : ""}
                    width={1400}
                    height={1204}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={CA_SCRIM} aria-hidden />
                  <div className={CA_CBODY}>
                    <span className={CA_IC} aria-hidden>
                      <Tooth />
                    </span>
                    <h3 className={CA_T}>{a.title}</h3>
                    <span className={CA_T_RULE} aria-hidden />
                    <p className={CA_D}>{a.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className={`${CA_NAV} ${CA_NAV_PREV}`}
            aria-label="Previous application"
            onClick={() => setActive((a) => mod(a - 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
          <button
            type="button"
            className={`${CA_NAV} ${CA_NAV_NEXT}`}
            aria-label="Next application"
            onClick={() => setActive((a) => mod(a + 1))}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
