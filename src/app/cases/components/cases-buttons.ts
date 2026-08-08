/** Shared CTA button classes for the Cases page.
 *  `!text-*` beats global `a { color: inherit }` in odyx.css (keeps label + icon visible).
 */

export const CASES_BTN_BASE =
  'inline-flex items-center justify-center gap-2 text-[13px] lg:text-[14px] font-semibold px-5 py-2.5 rounded-[10px] transition-colors';

export const CASES_BTN_PRIMARY = `${CASES_BTN_BASE} bg-[#0050D8] hover:bg-[#0040B0] !text-white shadow-[0_4px_14px_rgba(0,80,216,0.35)]`;

export const CASES_BTN_OUTLINE = `${CASES_BTN_BASE} bg-white hover:bg-[#F3F7FF] !text-[#0050D8] border-[1.5px] border-[#DCE6F7]`;

export const CASES_TEXT_LINK =
  'inline-flex items-center gap-1.5 !text-[#0050D8] text-[13px] lg:text-[14px] font-bold hover:!text-[#0040B0] transition-colors shrink-0';
