/**
 * Solutions landing / Clinical Applications hub chrome.
 * Exact class strings from ClinicalApplicationsPage — do not swap for
 * Learning, Request Demo, HV2, or Tajawal tokens.
 */

export const SOLUTIONS_SORA =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";

export const SOLUTIONS_WRAP = 'w-full max-w-none mx-auto px-[clamp(20px,4vw,56px)]';

export const SOLUTIONS_PAGE =
  `${SOLUTIONS_SORA} min-h-dvh overflow-x-clip bg-[#fafafc] text-[#5b6475]`;

export const SOLUTIONS_HERO_SECTION =
  'pt-[clamp(96px,11vh,118px)] pb-[clamp(40px,5vw,64px)]';

export const SOLUTIONS_HUB_GRID =
  'grid grid-cols-5 items-stretch gap-4 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1';

export const SOLUTIONS_CARD =
  'flex min-h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-solid border-[#eceef3] bg-white shadow-[0_10px_28px_rgba(24,36,64,.05)]';

export const SOLUTIONS_CAT_TITLE =
  `${SOLUTIONS_SORA} m-0 text-[1.05rem] font-bold leading-[1.2] tracking-[-0.015em]`;

export const SOLUTIONS_ITEM_LINK =
  'grid grid-cols-[44px_minmax(0,1fr)_14px] items-center gap-2.5 rounded-[10px] px-1.5 py-2 text-inherit no-underline transition-colors duration-[180ms] ease-in-out hover:bg-[rgba(24,36,64,.035)] max-[1280px]:grid-cols-[40px_minmax(0,1fr)_14px]';

export const SOLUTIONS_ITEM_THUMB =
  'grid size-11 shrink-0 place-items-center overflow-hidden rounded-[9px] border border-solid border-[rgba(24,36,64,.04)] bg-[#f3f4f8] max-[1280px]:size-10';

export const SOLUTIONS_ITEM_TITLE =
  'block text-[0.78rem] font-bold leading-[1.25] tracking-[-0.01em] text-[#1a1f2e] max-[1280px]:text-[0.74rem]';

export const SOLUTIONS_ITEM_BODY =
  'mt-0.5 block text-[0.68rem] font-normal leading-[1.3] text-[#7a8292] max-[1280px]:text-[0.64rem]';

export const SOLUTIONS_EXPLORE =
  'inline-flex self-start p-0 text-[0.8rem] font-bold tracking-[-0.01em] no-underline hover:opacity-85';

export const SOLUTIONS_BANNER =
  'mt-[22px] grid grid-cols-[minmax(220px,.95fr)_minmax(280px,1.35fr)_auto] items-center gap-[22px] rounded-[22px] border border-solid border-[#eceef2] bg-[#f5f5f7] px-6 py-[22px] max-[1100px]:grid-cols-1 max-[1100px]:gap-4';

export const SOLUTIONS_BANNER_TITLE =
  `${SOLUTIONS_SORA} col-start-2 m-0 flex flex-col text-[1.35rem] font-extrabold leading-[1.12] tracking-[-0.03em] text-[#1a1f2e] max-[560px]:col-start-1`;

export const SOLUTIONS_BANNER_CTA =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full border-[1.5px] border-solid border-[#c9d4ef] bg-white px-4 py-3 text-[0.86rem] font-bold text-[#0050D8] no-underline shadow-[0_4px_12px_rgba(37,99,235,.08)] transition-[background,border-color,transform] duration-[180ms] ease-in-out hover:-translate-y-px hover:border-[#9db4ef] hover:bg-[#f5f8ff] max-[1100px]:justify-self-start';

export const SOLUTIONS_FEATURE_LIST =
  'mt-7 mb-0 ml-0 mr-0 grid list-none grid-cols-5 overflow-visible rounded-none border-0 bg-transparent px-0 py-2 max-[1100px]:grid-cols-1';

export const SOLUTIONS_FEATURE_ITEM =
  "relative grid grid-cols-[28px_1fr] items-center gap-2.5 py-2.5 pr-3.5 pl-1 not-last:after:absolute not-last:after:top-2.5 not-last:after:right-0 not-last:after:bottom-2.5 not-last:after:w-px not-last:after:bg-[#e6e8ef] not-last:after:content-[''] max-[1280px]:gap-2 max-[1280px]:py-3.5 max-[1280px]:pr-2.5 max-[1280px]:pl-3 max-[1100px]:not-last:after:top-auto max-[1100px]:not-last:after:right-4 max-[1100px]:not-last:after:bottom-0 max-[1100px]:not-last:after:left-4 max-[1100px]:not-last:after:h-px max-[1100px]:not-last:after:w-auto";

export const SOLUTIONS_FEATURE_TITLE =
  'text-[0.82rem] font-bold tracking-[-0.01em] text-[#1a1f2e] max-[1280px]:text-[0.76rem]';

export const SOLUTIONS_FEATURE_BODY =
  'text-[0.72rem] leading-[1.3] text-[#7a8292] max-[1280px]:text-[0.68rem]';
