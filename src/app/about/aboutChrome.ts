/**
 * About typography — aliases of Home V2 tokens so About stays on the same
 * Tajawal hierarchy (400 / 500 / 700) without inventing a second scale.
 */
import {
  HV2_BLUE,
  HV2_BODY,
  HV2_BTN,
  HV2_BTN_GHOST,
  HV2_BTN_SIZE,
  HV2_EYEBROW,
  HV2_H2,
} from "@/components/home2/hv2Chrome";

export const ABOUT_BLUE = HV2_BLUE;
export const ABOUT_EYEBROW = HV2_EYEBROW;
export const ABOUT_BODY = `${HV2_BODY} text-[var(--hv2-body)] font-normal leading-relaxed`;
/** Lock Tajawal on CTAs so global `odyx.css` body/button fonts cannot win. */
const ABOUT_FONT =
  "[font-family:var(--font-tajawal),'Tajawal',sans-serif]!";

export const ABOUT_BTN = `${HV2_BTN} ${ABOUT_FONT}`;
export const ABOUT_BTN_GHOST = `${HV2_BTN_GHOST} ${ABOUT_FONT}`;
export const ABOUT_BTN_SIZE = HV2_BTN_SIZE;

/** Hero H1 — Home-style clamp, Tajawal 700 via `.about h1`. */
export const ABOUT_H1 =
  "text-[length:clamp(34px,5.5vw,42px)] font-bold text-[var(--hv2-ink)] leading-[1.15] tracking-[-.01em] mb-5";

/** Section H2 — same marketing band scale as Home path carousel. */
export const ABOUT_H2 =
  `${HV2_H2} text-[length:clamp(28px,3.6vw,42px)]! font-bold! leading-[1.15]! tracking-[-.015em]! text-[var(--hv2-ink)]!`;

/** Card / feature titles. */
export const ABOUT_CARD_TITLE =
  "text-[length:clamp(13px,1.1vw,14.5px)] font-bold text-[var(--hv2-ink)] leading-snug";

/** Card / feature descriptions — muted body. */
export const ABOUT_CARD_DESC =
  "text-[length:clamp(12px,1vw,14.5px)] font-medium text-[var(--hv2-body)] leading-relaxed";

/** Outline CTAs that keep existing chrome but match HV2 type (14.5 / 700). */
export const ABOUT_CTA_OUTLINE =
  `${ABOUT_BTN_GHOST} ${HV2_BTN_SIZE}` +
  " border! border-[rgba(24,68,160,.42)]! bg-white!";
