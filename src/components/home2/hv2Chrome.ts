/**
 * Shared Home V2 UI primitives — Tailwind ports of the former home-v2.css
 * utility classes. Page chrome (tokens, header/FAB, headings, focus,
 * scroll-margin) and reveal motion (`.rv`) stay in home-v2.css.
 *
 * `hv2-nav` / `hv2-dot` class tokens are kept as JS markers
 * (PathCarousel hit-testing); styles live on these constants.
 */

/** About-aligned horizontal page gutter. */
export const HV2_GUTTER = "px-[clamp(20px,4vw,56px)]";

/** Balanced section vertical rhythm — content bands after Hero/Why. */
export const HV2_SECTION_Y =
  "pt-[clamp(40px,5vw,64px)] pb-[clamp(40px,5vw,64px)]";

/** Tighter air for bands that share a parent composition (Why in Hero). */
export const HV2_SECTION_Y_TIGHT =
  "pt-[clamp(20px,3vw,40px)] pb-[clamp(20px,3vw,40px)]";

export const HV2_BLUE = "text-[var(--hv2-blue)]";

export const HV2_EYEBROW =
  "text-[var(--hv2-blue)] font-bold text-[12px] tracking-[.15em] uppercase mb-2.5" +
  " rtl:tracking-normal rtl:normal-case";

export const HV2_H2 = "text-[length:clamp(24px,2.5vw,31px)] mb-3";

export const HV2_BODY = "text-[14.5px] max-w-[36em]";

/** Shared layout — keep solid/ghost colors on separate tokens so
 *  `text-white!` and `text-[var(--hv2-blue)]!` never share a className
 *  (Tailwind resolves that conflict by stylesheet order, not HTML order). */
/** Shared layout + fixed 46px height for every Home V2 CTA. */
const HV2_BTN_BASE =
  "inline-flex items-center justify-center gap-[8px] cursor-pointer" +
  " box-border h-[46px] px-[18px] py-0 rounded-full border-0" +
  " font-bold text-[14.5px] leading-none [line-height:1]!" +
  " [text-box:trim-both_cap_alphabetic]" +
  " transition-[background,box-shadow,transform,color] duration-200 ease-in-out" +
  " [&>svg]:block [&>svg]:h-[19px] [&>svg]:w-[19px] [&>svg]:flex-none";

export const HV2_BTN =
  `${HV2_BTN_BASE}` +
  // text-white! beats global `a{color:inherit}` from odyx.css
  " bg-[var(--hv2-blue)] text-white!" +
  " [box-shadow:0_4px_14px_rgba(var(--hv2-blue-rgb),.35)]" +
  " hover:bg-[var(--hv2-blue-deep)] hover:-translate-y-px" +
  " hover:[box-shadow:0_6px_18px_rgba(var(--hv2-blue-rgb),.4)]";

/** Standalone ghost CTA — do not compose with `HV2_BTN`. */
export const HV2_BTN_GHOST =
  `${HV2_BTN_BASE}` +
  " bg-transparent! text-[var(--hv2-blue)]! [box-shadow:none]!" +
  " hover:bg-[rgba(var(--hv2-blue-rgb),.06)]! hover:text-[var(--hv2-blue-deep)]!";

/** !important size lock for section CTAs that layer custom fills/widths
 *  on top of HV2_BTN (Apps / Cases / Hub / Products). */
export const HV2_BTN_SIZE =
  " w-auto! h-[46px]! [padding:0_18px]! rounded-full! text-[14.5px]! font-bold!" +
  " leading-none! [line-height:1]! gap-[8px]! [&>svg]:block [&>svg]:h-[19px]! [&>svg]:w-[19px]! [&>svg]:flex-none";

/** Includes `hv2-nav` marker for PathCarousel `.closest(".hv2-nav")`. */
export const HV2_NAV =
  "hv2-nav w-[42px] h-[42px] rounded-full cursor-pointer" +
  " bg-white text-[var(--hv2-ink)] border border-[var(--hv2-line)]" +
  " [box-shadow:0_10px_24px_rgba(10,40,90,.14)]" +
  " grid place-items-center flex-none" +
  " transition-[color,transform] duration-200 ease-in-out" +
  " [&>svg]:w-[18px] [&>svg]:h-[18px] [&>svg]:block" +
  " hover:text-[var(--hv2-blue)] hover:scale-[1.06]" +
  " disabled:opacity-40 disabled:cursor-default disabled:pointer-events-none" +
  " disabled:hover:text-[var(--hv2-ink)] disabled:hover:scale-100";

export const HV2_DOTS = "hv2-dots flex gap-2 justify-center items-center";

/** Includes `hv2-dot` marker for PathCarousel `.closest(".hv2-dot")`. */
export const HV2_DOT =
  "hv2-dot w-2 h-2 rounded-full border-0 cursor-pointer p-0" +
  " bg-[rgba(10,30,70,.18)] transition-[width,background] duration-[.25s] ease-in-out";
