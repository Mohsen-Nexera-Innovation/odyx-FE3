// Beat the unlayered global `footer { padding/margin }` in odyx.css.
export const FT =
  "relative m-0! p-0! border-0! rounded-none!" +
  " [background:linear-gradient(180deg,#04173D_0%,#01183D_48%,#011438_100%)]!" +
  " overflow-hidden text-[var(--ft-text)]" +
  " [font-family:var(--font-tajawal),'Tajawal',sans-serif]" +
  " [--fu:.048828cqw] [--ft-heading:#F3F6FF] [--ft-text:rgba(210,219,241,.72)]" +
  " [--ft-muted:rgba(190,202,229,.72)] [--ft-divider:rgba(108,137,190,.16)]" +
  " [--ft-input-bg:rgba(8,34,76,.75)] [--ft-input-line:rgba(93,122,173,.25)] [--ft-accent:#075EF6]" +
  " [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-[#7FB0FF] [&_:focus-visible]:outline-offset-[3px] [&_:focus-visible]:rounded";

export const FT_IN = "w-[min(100%,2048px)] mx-auto [container-type:inline-size]";

export const FT_PAD =
  "px-[clamp(20px,4vw,76px)]";

// One auto-fit grid: 1 col on phones, then 2 / 3 / … as the viewport grows.
// Avoid Tailwind `grid` — odyx.css `.grid { gap: 20px }` would win.
export const FT_GRID =
  "[display:grid]! min-w-0" +
  " [grid-template-columns:repeat(auto-fit,minmax(min(100%,12.5rem),1fr))]!" +
  " [gap:clamp(22px,3vw,40px)_clamp(16px,2.2vw,32px)]!" +
  " py-[clamp(32px,4vw,48px)]";

export const FT_NAV = "contents";

export const FT_BRAND = "min-w-0";

export const FT_LOGO =
  "block w-max no-underline! leading-none!" +
  " [&_img]:block [&_img]:h-[calc(72*var(--fu))] [&_img]:w-auto" +
  " max-1919:[&_img]:h-[48px]!";

export const FT_TAG =
  "m-[calc(16*var(--fu))_0_0]! max-w-[calc(245*var(--fu))] text-[var(--ft-muted)]" +
  " text-[length:calc(21*var(--fu))] font-medium leading-[calc(33*var(--fu))]" +
  " max-1919:mt-4! max-1919:max-w-[28ch]! max-1919:text-[16px]! max-1919:leading-7!" +
  " max-860:max-w-[32ch]!";

export const FT_SOCIAL =
  "flex items-center gap-[calc(31*var(--fu))] mt-[calc(38*var(--fu))]" +
  " max-1919:mt-6! max-1919:gap-[14px]!" +
  " max-860:gap-3!";

export const FT_SOC =
  "w-[calc(33*var(--fu))] h-[calc(33*var(--fu))] inline-flex items-center justify-center" +
  " rounded-full bg-[rgba(206,217,238,.92)] text-[#0A1745]" +
  " transition-[background,color] duration-[.18s] ease" +
  " hover:bg-white" +
  " [&>svg]:w-[calc(18*var(--fu))] [&>svg]:h-[calc(18*var(--fu))] [&>svg]:block" +
  " motion-reduce:transition-none!" +
  " max-1919:w-8! max-1919:h-8! max-1919:[&>svg]:w-4! max-1919:[&>svg]:h-4!" +
  " max-860:h-11! max-860:w-11!";

export const FT_COL = "min-w-0";

export const FT_H =
  "m-0! text-[var(--ft-heading)]! text-[length:calc(20*var(--fu))]! font-extrabold!" +
  " leading-[calc(24*var(--fu))]! [letter-spacing:.03em]! uppercase!" +
  " rtl:[letter-spacing:0]! rtl:normal-case!" +
  " max-1919:text-[14px]! max-1919:leading-[18px]! max-1919:[letter-spacing:.02em]! max-1919:rtl:[letter-spacing:0]!";

export const FT_UL =
  "list-none m-[calc(17*var(--fu))_0_0]! p-0" +
  " max-1919:mt-[14px]!";

export const FT_A =
  "inline-block text-[var(--ft-text)]! no-underline!" +
  " text-[length:calc(21*var(--fu))]! font-medium! leading-[calc(38*var(--fu))]!" +
  " transition-colors duration-[.17s] ease hover:text-[#EEF3FF]!" +
  " motion-reduce:transition-none!" +
  " max-1919:text-[15px]! max-1919:leading-7!" +
  " max-860:py-2 max-860:leading-6";

export const FT_A_DIM =
  "inline-block text-[var(--ft-text)]! no-underline!" +
  " text-[length:calc(21*var(--fu))]! font-medium! leading-[calc(38*var(--fu))]!" +
  " opacity-[.42] cursor-not-allowed select-none" +
  " max-1919:text-[15px]! max-1919:leading-7!" +
  " max-860:py-2 max-860:leading-6";

export const FT_NEWS = "min-w-0";

export const FT_NEWSTAG =
  "m-[calc(20*var(--fu))_0_0]! max-w-[calc(195*var(--fu))] text-[var(--ft-muted)]" +
  " text-[length:calc(21*var(--fu))] font-medium leading-[calc(32*var(--fu))]" +
  " max-1919:mt-[14px]! max-1919:max-w-[30ch]! max-1919:text-[16px]! max-1919:leading-7!" +
  " max-860:max-w-[34ch]!";

export const FT_FORM =
  "flex items-stretch w-full max-w-[312px] h-[50px] mt-5" +
  " rounded-none bg-[var(--ft-input-bg)] border border-[var(--ft-input-line)] overflow-hidden" +
  " [box-shadow:inset_0_1px_0_rgba(255,255,255,.03),0_2px_10px_rgba(1,9,26,.25)]" +
  " focus-within:border-[rgba(126,164,235,.55)]" +
  " max-860:max-w-none!";

export const FT_INPUT =
  "flex-auto min-w-0 bg-transparent! border-0! outline-0! shadow-none!" +
  " ps-[calc(21*var(--fu))] pe-[calc(8*var(--fu))] text-[#E9EFFF]!" +
  " [font-family:inherit] text-[length:calc(18.5*var(--fu))]! font-medium!" +
  " placeholder:text-[rgba(203,214,238,.66)] focus-visible:outline-0!" +
  " max-1919:text-[16px]! max-1919:ps-4! max-1919:pe-2!";

export const FT_SEND =
  "flex-none w-[calc(57*var(--fu))] inline-flex items-center justify-center" +
  " bg-[var(--ft-accent)] text-white border-0 cursor-pointer" +
  " transition-colors duration-[.18s] ease hover:bg-[#2472FF]" +
  " [&>svg]:w-[calc(26*var(--fu))] [&>svg]:h-[calc(26*var(--fu))] [&>svg]:block" +
  " rtl:[&>svg]:scale-x-[-1]" +
  " motion-reduce:transition-none!" +
  " max-1919:w-[50px]! max-1919:[&>svg]:w-[21px]! max-1919:[&>svg]:h-[21px]!";

export const FT_SR =
  "absolute w-px h-px overflow-hidden [clip-path:inset(50%)] whitespace-nowrap";

export const FT_BOTTOM =
  "flex items-center justify-center text-center" +
  " h-[calc(64*var(--fu))] border-t border-[var(--ft-divider)]" +
  " max-1919:h-auto! max-1919:min-h-[58px]! max-1919:[padding-block:14px]!" +
  " max-860:[padding-block:20px]!";

export const FT_COPY =
  "m-0 text-[var(--ft-muted)] text-[length:calc(21*var(--fu))] font-medium" +
  " max-1919:text-[15px]!";
