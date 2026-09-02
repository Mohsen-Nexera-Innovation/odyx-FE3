/**
 * Learning Center chrome — exact class strings from the current page.
 * Do not replace with HV2 or Request Demo tokens.
 */

export const LEARNING_GUTTER = 'w-full px-[clamp(20px,4vw,56px)]';

export const LEARNING_CARD =
  'bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50';

export const LEARNING_CARD_PAD = 'py-6 lg:py-8 px-4 lg:px-6';

export const LEARNING_KICKER =
  'text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em]';

export const LEARNING_H2 =
  'text-3xl md:text-4xl lg:text-[36px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight';

/** Learning CTA styles — pill buttons match the Learning Center mock.
 *  `!text-*` beats global `a { color: inherit }` in odyx.css.
 */
export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#0050D8] hover:bg-[#0040B0] !text-white text-[14px] font-semibold leading-none px-6 py-2.5 rounded-full transition-colors shadow-[0_4px_14px_rgba(0,80,216,0.35)] [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0';

export const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 font-semibold text-[14px] leading-none px-6 py-2.5 rounded-full transition-colors border-[1.5px] border-[#0050D8] !text-[#0050D8] bg-white hover:bg-[#EEF4FF] [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0';

export const BTN_OUTLINE_SM =
  'inline-flex items-center justify-center gap-1.5 font-semibold text-[13px] lg:text-[14px] leading-none px-5 py-2 rounded-full transition-colors border-[1.5px] border-[#0050D8] !text-[#0050D8] bg-white hover:bg-[#EEF4FF] shrink-0 [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0';

export const BTN_LINK =
  'inline-flex items-center gap-1.5 !text-[#0050D8] text-[13px] font-bold leading-none hover:!text-[#0040B0] transition-colors [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0';

export const BTN_ON_BLUE =
  'inline-flex items-center justify-center gap-2 font-bold text-[14px] leading-none px-7 py-3 rounded-full transition-colors bg-white !text-[#0050D8] hover:bg-[#F3F7FF] shadow-[0_4px_16px_rgba(0,0,0,0.12)] shrink-0 [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0';
