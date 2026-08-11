import type { CSSProperties } from "react";
import { HV2_BTN, HV2_BTN_SIZE, HV2_GUTTER, HV2_SECTION_Y } from "@/components/home2/hv2Chrome";

// Ecosystem hub — the client mock's grid of connected panels below the
// clinical cases deck: Learning / Support on the first row, Store /
// Registration on the second. One shared outer container owns the border,
// radius and clipping; the panels are grid cells separated by a 14px
// (reference) white gutter, so no card carries a surface of its own.
//
// Geometry is measured off the client references — 2850x1116 for row 1 and
// 2846x962 for row 2 (knowledge_base/screens/041-… and 042-…) — where the
// container is 2836 wide, row-1 cards are 1411x886 and row-2 cards 1411x875.
// The query container holds every reference pixel as value / 28.36 cqw so the
// composition holds its proportions at any width.
//
// The product art is a soft-feathered patch of the mock (public/img/hv2-hub/,
// same technique as the ecosystem patches): the mock's own copy tails are
// erased from its alpha and its chip rail is painted back out of the artwork,
// so the DOM owns every word on screen and the chips can be translucent over
// the laptop's screen the way the mock's are.

const HubIcon = {
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 5.2h5.2A2.8 2.8 0 0 1 11 8v11a2.2 2.2 0 0 0-2.2-2.2H3V5.2Z" />
      <path d="M21 5.2h-5.2A2.8 2.8 0 0 0 13 8v11a2.2 2.2 0 0 1 2.2-2.2H21V5.2Z" />
    </svg>
  ),
  webinar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4.5" width="18" height="13" rx="2.2" />
      <path d="M10.2 8.9v4.2l3.8-2.1-3.8-2.1Z" fill="currentColor" stroke="none" />
      <path d="M8.5 21h7M12 17.5V21" />
    </svg>
  ),
  guide: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 3H7.4A1.4 1.4 0 0 0 6 4.4v15.2A1.4 1.4 0 0 0 7.4 21h9.2a1.4 1.4 0 0 0 1.4-1.4V7l-4-4Z" />
      <path d="M14 3v4h4M9.2 12h5.6M9.2 15.6h5.6" />
    </svg>
  ),
  quiz: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2-2.4 3.6" />
      <circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.5 12.4c0 3.8-3.8 6.9-8.5 6.9-1 0-2-.15-2.9-.4L4 20.5l1.5-3.5a6.6 6.6 0 0 1-2-4.6C3.5 8.6 7.3 5.5 12 5.5s8.5 3.1 8.5 6.9Z" />
      <path d="M9 11.6h6M9 14.3h3.8" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3.5v10.8M8 10.6l4 4 4-4" />
      <path d="M4.2 17v2.1c0 .8.6 1.4 1.4 1.4h12.8c.8 0 1.4-.6 1.4-1.4V17" />
    </svg>
  ),
} as const;

const CtaArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 12h14M12.5 6l6 6-6 6" />
  </svg>
);

type Chip = { label: string; icon: keyof typeof HubIcon };

// Chip boxes are staggered in the mock — each one steps a little further left
// as it follows the laptop's perspective — so every chip carries its own
// left/top (card %) rather than sitting in a plain stack.
// Learning chips hidden until learning hub is ready
// const LEARN_CHIPS: (Chip & { l: number; t: number; w: number })[] = [
//   { label: "Courses", icon: "book", l: 79.87, t: 29.12, w: 15.80 },
//   { label: "Webinars", icon: "webinar", l: 79.80, t: 42.66, w: 15.80 },
//   { label: "Guides", icon: "guide", l: 78.81, t: 56.21, w: 15.52 },
//   { label: "Quizzes", icon: "quiz", l: 77.60, t: 69.75, w: 15.80 },
// ];

const SUPPORT_CHIPS: (Chip & { l: number; t: number; w: number })[] = [
  { label: "Help Center", icon: "book", l: 76.68, t: 35.21, w: 18.57 },
  { label: "WhatsApp", icon: "chat", l: 76.68, t: 50.11, w: 18.57 },
  { label: "Downloads", icon: "download", l: 76.68, t: 64.67, w: 18.57 },
];

type ActionCard = {
  id: string;
  label: string;
  title: [string, string];
  desc: [string, string];
  cta?: string;
  href?: string;
  artClass: string;
  art: { src: string; alt: string; w: number; h: number };
};

const HUB_SECTION =
  `relative w-full overflow-x-clip box-border ${HV2_GUTTER} ${HV2_SECTION_Y}` +
  " [background:radial-gradient(ellipse_40%_60%_at_24%_6%,rgba(40,120,255,.08),rgba(40,120,255,0)_68%),linear-gradient(180deg,#F7F9FE_0%,#F4F6FD_100%)]";

const HUB_IN =
  "relative w-[min(100%,1828px)] mx-auto [container-type:inline-size] max-w-full box-border" +
  " border border-[rgba(255,255,255,.85)] rounded-[18px] overflow-hidden bg-white" +
  " [box-shadow:0_18px_46px_rgba(10,40,90,.07)]" +
  " [--hub-ch:31.24cqw] [--hub-ch2:30.85cqw] [--hub-gap:.7cqw] [--hub-pad:2.397cqw]" +
  " [--hub-blue:#2B63DE] [--hub-ic:#2E6FE0]" +
  " max-[1100px]:[--hub-gap:10px] max-[1100px]:rounded-[16px]!" +
  " max-[760px]:rounded-[14px]!";

const HUB_GRID =
  // `[gap:…]!` must beat the unlayered global `.grid { gap: 20px }` in odyx.css
  // (same pattern as resin detail / ceramic crown grids).
  "grid grid-cols-2 [gap:var(--hub-gap)]! [grid-template-rows:var(--hub-ch)_var(--hub-ch2)]" +
  " max-[1100px]:grid-cols-1! max-[1100px]:[grid-template-rows:auto]!";

const HUB_CARD =
  "relative overflow-hidden min-w-0" +
  " [background:linear-gradient(180deg,rgba(255,255,255,.75)_0%,rgba(255,255,255,0)_3.2%),#F4F6FC]" +
  // Phone / small tablet: stacked flow — copy / chips / CTA / art
  // Horizontal padding matches HV2_GUTTER rhythm (not flush to card edges).
  " max-[1100px]:flex! max-[1100px]:flex-col! max-[1100px]:items-stretch!" +
  " max-[1100px]:[padding:clamp(26px,4.4vw,36px)_clamp(24px,4vw,34px)_clamp(22px,3.4vw,30px)]!";

const HUB_COPY =
  // --hub-copy-top lets row-2 cards retune without fighting a second top-* utility.
  "absolute z-[3] start-[var(--hub-pad)] top-[var(--hub-copy-top,4.15cqw)] w-[min(25cqw,42%)]" +
  " max-[1100px]:static! max-[1100px]:w-full! max-[1100px]:max-w-[min(100%,34em)]!";

const HUB_COPY_ACT =
  // Store / Registration — keep copy clear of product art
  " [--hub-copy-top:3.62cqw] w-[min(28cqw,46%)]! max-[1100px]:w-full! max-[1100px]:top-auto!";

const HUB_EYEBROW =
  "text-[var(--hub-blue)]! text-[1.19cqw]! font-bold! uppercase! [letter-spacing:.02em]! leading-[1.2]! m-0!" +
  " rtl:[letter-spacing:0]! rtl:normal-case!" +
  " max-[1100px]:text-[12.5px]! max-[1100px]:[letter-spacing:.06em]! max-[1100px]:rtl:[letter-spacing:0]!";

const HUB_H =
  // ! needed: .hv2 h3 sets ink / tracking.
  "text-[#0D1B31]! text-[2.08cqw]! font-bold! leading-[1.187]! [letter-spacing:-.025em]! [margin:1.32cqw_0_0]!" +
  " rtl:[letter-spacing:0]!" +
  " max-[1100px]:text-[length:clamp(22px,5vw,32px)]! max-[1100px]:leading-[1.16]! max-[1100px]:mt-[14px]!";

const HUB_RULE =
  "block w-[2.12cqw] h-[.141cqw] [margin:1.19cqw_0_0_.14cqw] rounded-[1px] bg-[var(--hub-blue)]" +
  " max-[1100px]:w-[52px]! max-[1100px]:h-1! max-[1100px]:m-[16px_0_0]!";

const HUB_D =
  "text-[#24354F] text-[1.26cqw] font-medium leading-[1.485] [letter-spacing:-.012em] mt-[1.71cqw]" +
  " max-[1100px]:text-[length:clamp(15px,3.6vw,17.5px)]! max-[1100px]:leading-[1.6]! max-[1100px]:mt-4! max-[1100px]:[letter-spacing:0]!";

// Absolutely placed so CTAs share the same y regardless of copy height.
// Size is fixed (HV2_BTN_SIZE) so hub buttons match Apps / Cases / Products.
const HUB_CTA =
  `${HV2_BTN} ${HV2_BTN_SIZE} absolute! z-[4]! start-[var(--hub-pad)]! top-[var(--hub-cta-top,24.19cqw)]!` +
  " justify-between! border-0! max-w-[calc(100%-2rem)]!" +
  " [background:linear-gradient(180deg,#1A3FDB_0%,#1134BE_100%)]!" +
  " [box-shadow:0_14px_30px_rgba(21,60,225,.26),0_4px_10px_rgba(14,40,160,.16)]!" +
  " transition-[transform,box-shadow]! duration-[.22s]! ease!" +
  // Arbitrary transform beats HV2_BTN hover translateY(-1px) reliably.
  " hover:[transform:translateY(-2px)]! hover:[box-shadow:0_18px_36px_rgba(21,60,225,.32),0_5px_12px_rgba(14,40,160,.20)]!" +
  " [&>span]:mt-px rtl:[&>svg]:scale-x-[-1] motion-reduce:transition-none!" +
  " max-[1100px]:static! max-[1100px]:relative! max-[1100px]:mt-[clamp(18px,3vw,24px)]! max-[1100px]:top-auto! max-[1100px]:start-auto! max-[1100px]:self-start!";

const HUB_CTA_ACT = " [--hub-cta-top:22.74cqw]";

const HUB_ART =
  "absolute z-[1] top-0 h-full block object-contain object-right object-bottom pointer-events-none" +
  // ≤1100: flow with the card instead of floating over copy/CTA
  " max-[1100px]:relative! max-[1100px]:inset-auto! max-[1100px]:self-end!" +
  " max-[1100px]:w-[min(100%,420px)]! max-[1100px]:max-w-none! max-[1100px]:h-auto!" +
  " max-[1100px]:mt-[clamp(12px,2.4vw,20px)]! max-[1100px]:mx-auto!" +
  " max-[760px]:w-[min(100%,380px)]!";

// In Arabic the whole composition mirrors. Only the laptop flips with it —
// the chip rail is pinned to its screen edge. Headset / carton / device keep
// their mark orientation.
const HUB_ART_LEARN =
  " start-[27.50%] w-[61.16%] object-fill! rtl:scale-x-[-1]" +
  " max-[1100px]:start-auto! max-[1100px]:w-[min(92%,400px)]! max-[1100px]:object-contain!" +
  " max-[760px]:w-[min(100%,360px)]!";

const HUB_ART_SUPPORT =
  " start-[24%] w-[52%] object-contain! object-left!" +
  " max-[1100px]:start-auto! max-[1100px]:w-[min(78%,360px)]!" +
  " max-[760px]:w-[min(100%,340px)]!";

const HUB_ART_STORE =
  // Sit clear of the Store copy column (was overlapping “In One Place.”)
  " start-[48%] w-[54%] object-contain! object-center!" +
  " max-[1100px]:start-auto! max-[1100px]:w-[min(96%,460px)]! max-[1100px]:max-h-[280px]!" +
  " max-[760px]:w-[min(100%,420px)]! max-[760px]:max-h-[240px]!";

const HUB_ART_REG =
  " start-[40%] w-[62%] object-contain! object-center!" +
  " max-[1100px]:start-auto! max-[1100px]:w-[min(92%,440px)]!" +
  " max-[760px]:w-[min(100%,400px)]!";

const HUB_CHIPS =
  "list-none m-0 p-0" +
  " max-[1100px]:relative! max-[1100px]:z-[2]! max-[1100px]:flex! max-[1100px]:flex-wrap! max-[1100px]:gap-2.5!" +
  " max-[1100px]:mt-[clamp(16px,2.4vw,22px)]! max-[1100px]:w-full! max-[1100px]:max-w-[min(100%,34em)]!";

const HUB_CHIP =
  "absolute z-[2] start-[var(--l)] top-[var(--t)] w-[var(--w)] h-[var(--h,9.93%)]" +
  " flex items-center gap-[.49cqw] px-[.78cqw] rounded-[.63cqw]" +
  " bg-[rgba(255,255,255,.87)] backdrop-blur-[2px]" +
  " [box-shadow:0_0_.95cqw_.3cqw_rgba(255,255,255,.5),0_.28cqw_.8cqw_rgba(39,76,145,.07),inset_0_0_0_1px_rgba(222,232,248,.5)]" +
  " max-[1100px]:static! max-[1100px]:w-auto! max-[1100px]:h-auto! max-[1100px]:min-h-[48px]!" +
  " max-[1100px]:px-[14px]! max-[1100px]:gap-[10px]! max-[1100px]:rounded-[12px]!";

const HUB_CHIP_SUPPORT =
  " [--h:10.50%] px-[1.10cqw]! gap-[.62cqw]! max-[1100px]:px-[14px]! max-[1100px]:gap-[10px]!";

const HUB_CHIP_IC =
  "grid place-items-center text-[var(--hub-ic)] flex-none" +
  " [&>svg]:w-[1.85cqw] [&>svg]:h-[1.85cqw] [&>svg]:block" +
  " max-[1100px]:[&>svg]:w-[20px]! max-[1100px]:[&>svg]:h-[20px]!";

const HUB_CHIP_L =
  "text-[#1B3050] text-[1.05cqw] font-medium leading-[1.2] whitespace-nowrap mt-[.35cqw]" +
  " max-[1100px]:text-[14px]! max-[1100px]:mt-px!" +
  " max-[760px]:text-[13.5px]!";

const ACTION_CARDS: ActionCard[] = [
  {
    id: "store",
    label: "Store",
    title: ["Everything You Need.", "In One Place."],
    desc: ["Resins, accessories and more –", "delivered to your door."],
    // CTA hidden until shop is ready
    artClass: HUB_ART_STORE,
    art: {
      src: "/img/hv2-hub/store-resins-cutout.png",
      alt: "ODYX resin collection — Ortho Model, Ceramic Crown, Crown & Bridge, Surgical Guide Pro, and Temporary Crown",
      w: 788,
      h: 537,
    },
  },
  {
    id: "reg",
    label: "Registration",
    title: ["Register Your Device.", "Stay Protected."],
    desc: ["Activate warranty and get", "the full ODYX experience."],
    // CTA hidden until registration flow is ready
    // cta: "Register Device",
    // href: "/support#register",
    artClass: HUB_ART_REG,
    art: {
      src: "/img/hv2-hub/registration-device.webp",
      alt: "An ODYX device on its base behind a glowing shield with a checkmark",
      w: 1003,
      h: 875,
    },
  },
];

function HubActionCard({ card, rv }: { card: ActionCard; rv: number }) {
  return (
    <article className={`${HUB_CARD} rv`} data-rv={rv}>
      <div className={`${HUB_COPY}${HUB_COPY_ACT}`}>
        <p className={HUB_EYEBROW}>{card.label}</p>
        <h3 className={HUB_H}>
          {card.title[0]}
          <br />
          {card.title[1]}
        </h3>
        <span className={HUB_RULE} aria-hidden />
        <p className={HUB_D}>
          {card.desc[0]}
          <br />
          {card.desc[1]}
        </p>
      </div>
      {card.cta && card.href ? (
        <a className={`${HUB_CTA}${HUB_CTA_ACT}`} href={card.href}>
          <span>{card.cta}</span>
          <CtaArrow />
        </a>
      ) : null}
      <img
        className={`${HUB_ART}${card.artClass}`}
        src={card.art.src}
        alt={card.art.alt}
        width={card.art.w}
        height={card.art.h}
        loading="lazy"
        decoding="async"
      />
    </article>
  );
}

export default function HubCardsSection() {
  return (
    <section className={HUB_SECTION} id="hub" aria-label="Learning, support, store and device registration">
      <div className={HUB_IN}>
        <div className={HUB_GRID}>
          {/* ---- Learning ---- */}
          <article className={`${HUB_CARD} rv`} data-rv="1">
            <div className={HUB_COPY}>
              <p className={HUB_EYEBROW}>Learning</p>
              <h3 className={HUB_H}>
                Grow Your Skills.
                <br />
                Master Digital Dentistry.
              </h3>
              <span className={HUB_RULE} aria-hidden />
              <p className={HUB_D}>
                Access courses, webinars
                <br />
                and step-by-step guides.
              </p>
            </div>
            {/* Learning category chips hidden until learning hub is ready
            <ul className={HUB_CHIPS} aria-label="What the learning centre covers">
              {LEARN_CHIPS.map((c) => (
                <li
                  className={HUB_CHIP}
                  key={c.label}
                  style={{ "--l": `${c.l}%`, "--t": `${c.t}%`, "--w": `${c.w}%` } as CSSProperties}
                >
                  <span className={HUB_CHIP_IC} aria-hidden>{HubIcon[c.icon]}</span>
                  <span className={HUB_CHIP_L}>{c.label}</span>
                </li>
              ))}
            </ul>
            */}
            <a className={HUB_CTA} href="/learning">
              <span>Start Learning</span>
              <CtaArrow />
            </a>
            <img
              className={`${HUB_ART}${HUB_ART_LEARN}`}
              src="/img/hv2-hub/learning-laptop.webp"
              alt="A laptop showing the ODYX learning centre with a course video ready to play"
              width={863}
              height={886}
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* ---- Support ---- */}
          <article className={`${HUB_CARD} rv`} data-rv="2">
            <div className={HUB_COPY}>
              <p className={HUB_EYEBROW}>Support</p>
              <h3 className={HUB_H}>
                We&rsquo;re Here
                <br />
                When You Need Us.
              </h3>
              <span className={HUB_RULE} aria-hidden />
              <p className={HUB_D}>
                Get technical support,
                <br />
                resources and live help.
              </p>
            </div>
            <ul className={HUB_CHIPS} aria-label="Ways to get support">
              {SUPPORT_CHIPS.map((c) => (
                <li
                  className={`${HUB_CHIP}${HUB_CHIP_SUPPORT}`}
                  key={c.label}
                  style={{ "--l": `${c.l}%`, "--t": `${c.t}%`, "--w": `${c.w}%` } as CSSProperties}
                >
                  <span className={HUB_CHIP_IC} aria-hidden>{HubIcon[c.icon]}</span>
                  <span className={HUB_CHIP_L}>{c.label}</span>
                </li>
              ))}
            </ul>
            <a className={HUB_CTA} href="/support">
              <span>Get Support</span>
              <CtaArrow />
            </a>
            <img
              className={`${HUB_ART}${HUB_ART_SUPPORT}`}
              src="/img/hv2-hub/support-headset.webp"
              alt="An ODYX support headset with a boom microphone on a lit display pedestal"
              width={678}
              height={886}
              loading="lazy"
              decoding="async"
            />
          </article>

          {/* ---- Store / Registration (second row) ---- */}
          {ACTION_CARDS.map((card, i) => (
            <HubActionCard key={card.id} card={card} rv={i + 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
