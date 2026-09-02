const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";

/** P1-26 hero CTAs — shared by product landings and Request Demo submit. */
export const PRODUCT_BTN =
  `${SANS} inline-flex box-border h-12 min-h-12 items-center justify-center gap-2 rounded-full px-[22px] py-0 text-[.9rem] font-semibold leading-none [line-height:1] [text-box:trim-both_cap_alphabetic] tracking-[0.01em] no-underline transition-[background,color,border-color,transform,box-shadow] duration-[220ms] ease-[ease] max-[640px]:w-full [&_svg]:block [&_svg]:size-[1em] [&_svg]:shrink-0 [&_svg]:overflow-visible`;

export const PRODUCT_BTN_PRIMARY =
  `${PRODUCT_BTN} border border-solid border-transparent bg-[#0050D8] !text-white shadow-none hover:-translate-y-px hover:!text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)] motion-reduce:hover:translate-y-0`;

export const PRODUCT_BTN_GHOST =
  `${PRODUCT_BTN} group border-[1.5px] border-solid border-[#0050D8] bg-[rgba(255,255,255,.72)] !text-[#0050D8] [backdrop-filter:blur(6px)] hover:-translate-y-px hover:border-[#0041AF] hover:bg-white hover:!text-[#0041AF] motion-reduce:hover:translate-y-0`;
