/**
 * Real Case Library hub chrome — exact class strings from the current page.
 * Do not replace with Learning, Request Demo, or HV2 tokens.
 */

export const CASES_GUTTER = 'w-full px-[clamp(20px,4vw,56px)]';

export const CASES_CARD =
  'bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50';

export const CASES_CARD_PAD = 'py-6 lg:py-8 px-4 lg:px-6';

export const CASES_KICKER =
  'text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em]';

export const CASES_SECTION_H2 =
  'text-2xl md:text-3xl lg:text-[32px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight max-w-xl';

/** Shared CTA button classes for the Cases page.
 *  `!text-*` beats global `a { color: inherit }` in odyx.css (keeps label + icon visible).
 */
export const CASES_BTN_BASE =
  'inline-flex items-center justify-center gap-2 text-[13px] lg:text-[14px] font-semibold px-5 py-2.5 rounded-[10px] transition-colors';

export const CASES_BTN_PRIMARY = `${CASES_BTN_BASE} bg-[#0050D8] hover:bg-[#0040B0] !text-white shadow-[0_4px_14px_rgba(0,80,216,0.35)]`;

export const CASES_BTN_OUTLINE = `${CASES_BTN_BASE} bg-white hover:bg-[#F3F7FF] !text-[#0050D8] border-[1.5px] border-[#DCE6F7]`;

export const CASES_TEXT_LINK =
  'inline-flex items-center gap-1.5 !text-[#0050D8] text-[13px] lg:text-[14px] font-bold hover:!text-[#0040B0] transition-colors shrink-0';
