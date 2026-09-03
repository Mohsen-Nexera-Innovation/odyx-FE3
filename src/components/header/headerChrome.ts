import { cn } from '@/lib/cn';

export function headerShellClass(opts: {
  transparent: boolean;
  onLight: boolean;
  solid: boolean;
  scrolled: boolean;
  atTop: boolean;
  clearTop: boolean;
}) {
  const { transparent, onLight, solid, scrolled, atTop, clearTop } = opts;
  const seeThrough = transparent || clearTop;
  return cn(
    'group/hdr fixed top-0 right-0 left-0 z-[1000] flex w-full min-h-0 flex-col items-stretch overflow-visible border-none p-0',
    'transition-[background,backdrop-filter,box-shadow] duration-[220ms] ease-in-out',
    "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-[radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),rgba(61,125,240,.12),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-[350ms] before:content-['']",
    '[&.solid:hover]:before:opacity-100 [&.scrolled:hover]:before:opacity-100',
    '[&.on-light]:before:bg-[radial-gradient(220px_circle_at_var(--mx,50%)_var(--my,50%),rgba(0,80,216,.12),transparent_70%)] [&.on-light]:before:opacity-0',
    seeThrough && 'bg-transparent shadow-none [backdrop-filter:none] [-webkit-backdrop-filter:none]',
    onLight &&
      !clearTop &&
      'bg-[rgba(245,250,253,.90)] shadow-none backdrop-blur-[14px] backdrop-saturate-[120%]',
    solid &&
      !scrolled &&
      'bg-[rgba(20,18,22,.86)] backdrop-blur-[14px] backdrop-saturate-[140%]',
    scrolled && 'bg-[rgba(20,18,22,.94)] backdrop-blur-[14px] backdrop-saturate-[140%]',
    transparent && 'transparent',
    onLight && 'on-light',
    solid && 'solid',
    scrolled && 'scrolled',
    atTop && 'at-top',
  );
}

export const SITE_NOTICE_CLASS =
  'relative z-[2] m-0 box-border block w-full shrink-0 overflow-hidden text-ellipsis whitespace-nowrap bg-[#0050D8] px-3 py-2 text-center font-[var(--font-tajawal),Tajawal,sans-serif] text-[clamp(11.5px,2.8vw,13.5px)] font-medium not-italic leading-[1.3] tracking-normal text-white normal-case';

export const NAV_BAR_CLASS =
  'relative z-[1] box-border flex min-h-[68px] w-full min-w-0 flex-1 items-center overflow-visible gap-[clamp(4px,1vw,10px)] px-[clamp(20px,4vw,56px)] py-[17px] max-[860px]:gap-1 max-[860px]:px-2.5';

export const LOGO_CLASS =
  'flex shrink-0 items-center ms-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#3D7DF0] hover:[&_img]:opacity-85 group-[.on-light]/hdr:focus-visible:outline-[#0050D8]';

export const LOGO_IMG_CLASS =
  'block h-[clamp(36px,4.6vw,46px)] w-auto object-contain transition-opacity duration-[180ms] max-[1280px]:h-[clamp(32px,3.8vw,40px)] max-1024:h-8';

export function navMenuClass(open: boolean, forceClose: boolean, onLight: boolean) {
  return cn(
    'nav-menu min-w-0 flex-[1_1_auto] items-center gap-[clamp(4px,1vw,10px)]',
    'min-1025:ms-[clamp(8px,1.6vw,20px)] min-1025:flex min-1025:self-stretch min-1025:min-w-0',
    'max-1024:absolute max-1024:top-full max-1024:left-1/2 max-1024:z-20 max-1024:ms-0 max-1024:w-screen max-1024:-translate-x-1/2',
    'max-1024:hidden data-[open=true]:max-1024:flex',
    'max-1024:max-h-[78vh] max-1024:flex-col max-1024:gap-0.5 max-1024:overflow-y-auto max-1024:p-3',
    'max-1024:shadow-[0_16px_40px_rgba(0,0,0,.5)] max-1024:backdrop-blur-[18px]',
    onLight
      ? 'max-1024:bg-[rgba(245,250,253,.98)] max-1024:shadow-[0_16px_40px_rgba(0,0,0,.08)]'
      : 'max-1024:bg-[rgba(16,14,18,.98)]',
    '[&.force-close_.mega]:pointer-events-none! [&.force-close_.mega]:invisible! [&.force-close_.mega]:translate-y-[5px]! [&.force-close_.mega]:opacity-0! [&.force-close_.mega]:transition-none!',
    open && 'open',
    forceClose && 'force-close',
  );
}

export function navItemClass(mega: boolean, expanded: boolean) {
  return cn(
    'group/item nav-item shrink-0 max-1024:w-full',
    'min-1025:flex min-1025:self-stretch min-1025:items-center',
    // Fill the nav bar's 17px vertical padding so the pointer never leaves
    // the hover group while moving from the label into the dropdown.
    'min-1025:-my-[17px] min-1025:py-[17px]',
    mega ? 'nav-item--mega min-1025:static max-1024:relative' : 'relative',
    expanded && 'exp',
  );
}

export const NAV_TRIGGER_TW =
  cn(
    'relative inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-[clamp(6px,.8vw,10px)] py-2',
    'font-sans text-[clamp(.9rem,1.1vw,1rem)] font-medium tracking-[.005em] text-white/72 transition-colors duration-[180ms]',
    'hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7DF0]',
    "after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-sm after:bg-[#3D7DF0] after:transition-[width] after:duration-200 after:ease-[cubic-bezier(.4,0,.2,1)] after:content-['']",
    'group-hover/item:after:w-[26px] has-[.active]:text-white has-[.active]:after:w-[26px]',
    'group-[.on-light]/hdr:text-[#5A555C] group-[.on-light]/hdr:hover:text-[#211C1D] group-[.on-light]/hdr:after:bg-[#0041AF]',
    'group-[.on-light]/hdr:has-[.active]:text-[#0041AF] group-[.on-light]/hdr:focus-visible:outline-[#0050D8]',
    'max-[860px]:px-1.5 max-[860px]:py-1 max-[860px]:text-[.62rem]',
    'max-1024:w-full max-1024:min-h-11 max-1024:justify-between max-1024:px-3 max-1024:py-2.5 max-1024:text-[.88rem]',
  );

export function navLinkLabelClass(active: boolean) {
  return cn(
    'nav-link-label',
    active && 'active font-semibold text-white group-[.on-light]/hdr:text-[#0041AF]',
  );
}

export const CARET_CLASS =
  'mt-[-2px] size-3.5 shrink-0 opacity-55 transition-[opacity,transform] duration-[180ms] ease-in-out group-hover/item:rotate-180 group-hover/item:opacity-90 group-[.on-light]/hdr:opacity-45 group-[.on-light]/hdr:group-hover/item:opacity-75 max-[1120px]:size-3 group-[.exp]/item:max-1024:rotate-180';

export const COMING_SOON_WRAP =
  'group/soon nav-item is-coming-soon relative shrink-0 max-1024:w-full';

export const NAV_SOON = cn(
  'relative inline-flex cursor-not-allowed items-center gap-1 whitespace-nowrap rounded-lg px-[clamp(6px,.8vw,10px)] py-2',
  'font-sans text-[clamp(.9rem,1.1vw,1rem)] font-medium text-[rgba(255,255,255,.42)]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7DF0]',
  'group-[.on-light]/hdr:text-[rgba(90,85,92,.45)]',
  'max-[860px]:px-1.5 max-[860px]:py-1 max-[860px]:text-[.62rem]',
  'max-1024:w-full max-1024:min-h-11 max-1024:justify-between max-1024:px-3 max-1024:py-2.5 max-1024:text-[.88rem]',
);

export const NAV_SOON_TIP = cn(
  'pointer-events-none absolute top-[calc(100%+8px)] left-1/2 z-[60] -translate-x-1/2 translate-y-1 rounded-lg',
  'bg-[#141216] px-2.5 py-1.5 font-sans text-[.75rem] font-medium leading-[1.35] tracking-normal whitespace-nowrap text-white',
  'opacity-0 invisible shadow-[0_8px_24px_rgba(0,0,0,.35)] transition-[opacity,transform,visibility] duration-[180ms] ease-in-out motion-reduce:transition-none',
  "after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[5px] after:border-transparent after:border-b-[#141216] after:content-['']",
  'group-hover/soon:visible group-hover/soon:translate-y-0 group-hover/soon:opacity-100',
  'group-focus-within/soon:visible group-focus-within/soon:translate-y-0 group-focus-within/soon:opacity-100',
  'max-1024:start-3 max-1024:left-auto max-1024:translate-y-1 max-1024:after:start-4 max-1024:after:left-auto max-1024:after:translate-x-0',
  'max-1024:group-hover/soon:translate-y-0 max-1024:group-focus-within/soon:translate-y-0',
);

export function megaDropdownClass() {
  return cn(
    "mega absolute top-full left-0 z-40 min-w-[200px] rounded-xl border border-[rgba(255,255,255,.09)] bg-[#2A262C] p-1.5 before:pointer-events-auto before:absolute before:top-[-18px] before:right-0 before:left-0 before:h-[18px] before:content-['']",
    'invisible translate-y-0 opacity-0 shadow-[0_20px_48px_rgba(0,0,0,.45)] transition-[opacity,visibility] duration-150 ease-in-out delay-300',
    'group-hover/item:visible group-hover/item:opacity-100 group-hover/item:delay-[60ms]',
    'group-[.on-light]/hdr:border-black/8 group-[.on-light]/hdr:bg-white group-[.on-light]/hdr:shadow-[0_20px_48px_rgba(0,0,0,.10)]',
    'max-1024:static max-1024:hidden data-[expanded=true]:max-1024:block',
    'max-1024:min-w-0 max-1024:my-1 max-1024:mb-2 max-1024:border-0 max-1024:bg-[rgba(0,0,0,.2)] max-1024:p-0 max-1024:shadow-none max-1024:visible max-1024:translate-y-0 max-1024:opacity-100 max-1024:delay-0',
    'group-[.on-light]/hdr:max-1024:bg-[rgba(0,0,0,.04)]',
  );
}

export const MEGA_SIMPLE_LINK = cn(
  'block rounded-lg px-3 py-[9px] font-sans text-[.875rem] font-medium leading-[1.3] text-[rgba(255,255,255,.82)] no-underline',
  'transition-[background,color] duration-[160ms] ease-in-out hover:bg-[rgba(61,125,240,.14)] hover:text-white',
  'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#3D7DF0]',
  'group-[.on-light]/hdr:text-[#48657c] group-[.on-light]/hdr:hover:bg-[rgba(0,80,216,.10)] group-[.on-light]/hdr:hover:text-[#0041AF]',
);

export const MEGA_SIMPLE_LINK_ACTIVE =
  'bg-[rgba(61,125,240,.14)] font-[650] text-white group-[.on-light]/hdr:bg-[rgba(0,80,216,.10)] group-[.on-light]/hdr:text-[#0041AF]';

export function megaPanelClass(onLight: boolean) {
  return cn(
    megaDropdownClass(),
    'mega-panel inset-x-0 top-full w-full min-w-0 rounded-none border-x-0 border-t border-b border-[rgba(255,255,255,.09)] bg-[rgba(22,20,24,.97)] p-0 shadow-[0_28px_60px_rgba(0,0,0,.45)] backdrop-blur-[18px]',
    "before:pointer-events-auto before:absolute before:top-[-48px] before:right-0 before:left-0 before:h-12 before:content-['']",
    onLight &&
      'border-t-[rgba(0,0,0,.06)] border-b-[rgba(0,0,0,.08)] bg-[rgba(255,255,255,.98)] shadow-[0_28px_60px_rgba(0,0,0,.10)]',
    'max-1024:border-0 max-1024:bg-[rgba(0,0,0,.22)] max-1024:shadow-none max-1024:backdrop-blur-none max-1024:[-webkit-backdrop-filter:none]',
    onLight && 'max-1024:bg-[rgba(0,0,0,.03)]',
  );
}

export const MEGA_INNER = cn(
  'mega-panel__inner grid w-full max-w-none grid-cols-1 gap-[clamp(16px,2vw,24px)] px-[clamp(20px,4vw,56px)] py-[clamp(16px,2vw,24px)]',
  'min-1025:has-[.mega-featured]:grid-cols-[minmax(0,1fr)_minmax(180px,240px)] min-1025:has-[.mega-featured]:items-start',
  'max-[1200px]:min-[1025px]:has-[.mega-featured]:grid-cols-1',
  'max-1024:flex max-1024:flex-col max-1024:gap-3 max-1024:px-2.5 max-1024:pt-3 max-1024:pb-3.5',
);

export const MEGA_COLS = cn(
  'mega-panel__cols grid items-start gap-[clamp(16px,2.5vw,32px)] [grid-template-columns:repeat(var(--mega-cols,3),minmax(0,1fr))]',
  'group-hover/item:[&_.mega-col:nth-child(1)_.mega-link]:delay-[30ms]',
  'group-hover/item:[&_.mega-col:nth-child(2)_.mega-link]:delay-[60ms]',
  'group-hover/item:[&_.mega-col:nth-child(3)_.mega-link]:delay-[90ms]',
  'group-hover/item:[&_.mega-col:nth-child(4)_.mega-link]:delay-[120ms]',
  'max-[1100px]:min-[1025px]:grid-cols-2',
  'max-1024:flex max-1024:flex-col max-1024:gap-[18px]',
  'max-1024:relative max-1024:z-[1]',
);

export const MEGA_COLS_FEATURED = 'mega-panel__cols--featured min-1025:col-start-1';

export const MEGA_COL = 'mega-col flex min-w-0 flex-col gap-0.5';

export const MEGA_COL_TITLE = cn(
  'mega-col__title mb-2 mt-0 inline-block p-0 font-[var(--font-display)] text-[.72rem] font-extrabold uppercase tracking-[.14em]',
  'text-[#3D7DF0] no-underline',
  'group-[.on-light]/hdr:text-[#0041AF]',
);

export const MEGA_COL_TITLE_LINK = cn(
  MEGA_COL_TITLE,
  'transition-colors duration-[160ms] ease-in-out hover:text-white group-[.on-light]/hdr:hover:text-[#211C1D]',
);

export const MEGA_COL_TITLE_ACTIVE =
  'text-white group-[.on-light]/hdr:text-[#0041AF]';

export const MEGA_GROUP = 'mega-group mb-2.5 last:mb-0';

export const MEGA_GROUP_LABEL =
  'mega-group__label mb-1 mt-0 p-0 text-[.68rem] font-bold uppercase tracking-[.06em] text-[rgba(255,255,255,.42)] group-[.on-light]/hdr:text-[rgba(33,28,29,.4)]';

export const MEGA_LINK = cn(
  'mega-link mx-[-10px] my-0 block rounded-lg px-2.5 py-[5px] text-inherit no-underline',
  'translate-y-1.5 opacity-0 transition-[background,transform,opacity] duration-[160ms] ease-in-out',
  'hover:bg-[rgba(61,125,240,.12)]',
  'group-hover/item:translate-y-0 group-hover/item:opacity-100 group-hover/item:duration-[220ms]',
  'group-[.on-light]/hdr:hover:bg-[rgba(0,80,216,.08)]',
  'max-1024:translate-y-0 max-1024:opacity-100 max-1024:delay-0',
);

export const MEGA_LINK_ACTIVE =
  'bg-[rgba(61,125,240,.14)] group-[.on-light]/hdr:bg-[rgba(0,80,216,.10)]';

export const MEGA_LINK_LABEL = cn(
  'mega-link__label font-sans text-[.86rem] font-[650] leading-[1.2] text-[rgba(255,255,255,.92)]',
  'group-hover/link:text-white',
  'group-[.on-light]/hdr:text-[#2a262c] group-[.on-light]/hdr:group-hover/link:text-[#0041AF]',
);

export const MEGA_LINK_LABEL_ACTIVE =
  'font-bold text-white group-[.on-light]/hdr:text-[#0041AF]';

export const MEGA_FEATURED = cn(
  'mega-featured relative z-0 flex flex-col justify-start overflow-hidden rounded-[14px] border border-[rgba(255,255,255,.09)] px-4 pt-3.5 pb-3',
  'translate-y-2 opacity-0 bg-[radial-gradient(420px_240px_at_80%_0%,rgba(61,125,240,.22),transparent_65%),linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.02))]',
  'transition-[opacity,transform] duration-[250ms] ease-in-out delay-[80ms]',
  'group-hover/item:translate-y-0 group-hover/item:opacity-100',
  'group-[.on-light]/hdr:border-[rgba(0,80,216,.18)] group-[.on-light]/hdr:bg-[radial-gradient(420px_240px_at_80%_0%,rgba(0,80,216,.14),transparent_65%),linear-gradient(160deg,#f4fafd,#eef6fb)]',
  'max-1024:order-last max-1024:w-full max-1024:max-w-none max-1024:p-3 max-1024:translate-y-0 max-1024:opacity-100 max-1024:delay-0',
  'min-1025:max-[1100px]:max-w-[420px]',
);

export const MEGA_FEATURED_MEDIA = cn(
  'mega-featured__media relative mb-2 flex min-h-24 items-end justify-center overflow-hidden',
  "before:pointer-events-none before:absolute before:inset-[8%_6%_0] before:bg-[radial-gradient(closest-side_at_50%_62%,rgba(61,125,240,.28),rgba(61,125,240,.06)_62%,transparent_78%)] before:blur-[18px] before:content-['']",
  "after:pointer-events-none after:absolute after:inset-x-[18%] after:bottom-[-2px] after:h-3.5 after:bg-[radial-gradient(closest-side,rgba(0,0,0,.5),transparent_72%)] after:blur-[6px] after:content-['']",
  'group-[.on-light]/hdr:before:bg-[radial-gradient(closest-side_at_50%_62%,rgba(0,80,216,.20),rgba(0,80,216,.05)_62%,transparent_78%)]',
  'group-[.on-light]/hdr:after:bg-[radial-gradient(closest-side,rgba(10,60,100,.22),transparent_72%)]',
  'max-1024:min-h-[4.5rem]',
);

export const MEGA_FEATURED_IMG = cn(
  'relative z-0 max-h-24 w-auto max-w-[82%] object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,.4)] transition-transform duration-300',
  'animate-[megaPreviewIn_.28s_ease] motion-reduce:animate-none',
  'min-1025:group-hover/item:-translate-y-[3px]',
  'group-[.on-light]/hdr:drop-shadow-[0_10px_16px_rgba(10,60,100,.22)]',
  'max-1024:max-h-[4.5rem] max-1024:max-w-[70%] max-1024:translate-y-0',
);

export const MEGA_FEATURED_EYEBROW =
  'mega-featured__eyebrow mb-1.5 text-[.64rem] font-extrabold uppercase tracking-[.14em] text-[#3D7DF0] group-[.on-light]/hdr:text-[#0041AF]';

export const MEGA_FEATURED_TITLE =
  'mega-featured__title font-[var(--font-display)] text-[1.1rem] font-extrabold leading-[1.15] tracking-[-.02em] text-white group-[.on-light]/hdr:text-[#211C1D]';

export const MEGA_FEATURED_DESC =
  'mega-featured__desc mt-1.5 mb-0 overflow-hidden text-[.78rem] font-light leading-[1.4] text-[rgba(255,255,255,.58)] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] group-[.on-light]/hdr:text-[#5A555C]';

export const MEGA_FEATURED_CTA = cn(
  'mega-featured__cta mt-2.5 inline-flex items-center gap-1.5 text-[.78rem] font-bold text-[#3D7DF0] no-underline transition-[gap,color] duration-200',
  'hover:gap-2.5 hover:text-white',
  'group-[.on-light]/hdr:text-[#0041AF] group-[.on-light]/hdr:hover:text-[#00337F]',
);

export const NAV_MOBILE_AUTH = cn(
  'nav-mobile-auth mt-3 flex-wrap gap-2 border-t border-[rgba(255,255,255,.09)] pt-3',
  'min-1025:hidden max-1024:flex',
);

export const NAV_MOBILE_AUTH_ON_LIGHT = 'border-t-[rgba(0,0,0,.08)]';

export const NAV_TOOLS =
  'nav-tools ms-auto flex min-w-0 shrink-0 items-center gap-[clamp(4px,.7vw,8px)] max-1024:overflow-visible max-[520px]:gap-[3px]';

export function burgerClass() {
  return cn(
    'burger inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer flex-col items-center justify-center gap-[5px] border-none bg-transparent p-0',
    'text-white group-[.on-light]/hdr:text-[#211C1D]',
    'max-1024:inline-flex min-1025:hidden',
  );
}

export const BURGER_BAR =
  'block h-0.5 w-6 origin-center bg-current transition-[transform,opacity,background-color] duration-300';

export const NAV_DEMO = cn(
  'inline-flex h-8 shrink-0 box-border w-fit items-center justify-center rounded-full bg-[#0050D8] px-[11px]',
  'font-sans text-[clamp(.74rem,.95vw,.82rem)] font-semibold leading-none whitespace-nowrap text-white no-underline',
  'transition-[transform,box-shadow,background] duration-300 hover:-translate-y-0.5 hover:bg-[#0041AF] hover:text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)]',
  'max-[1280px]:h-7 max-[1280px]:px-2 max-[1280px]:text-[clamp(.62rem,.85vw,.72rem)]',
  'max-980:h-7 max-980:px-[7px] max-980:text-[.62rem]',
);

export const NAV_DEMO_TOOLS = 'max-1024:hidden min-1025:inline-flex';

export const NAV_DEMO_MOBILE =
  'max-1024:min-h-11 max-1024:min-w-[120px] max-1024:flex-[1_1_calc(50%-4px)] max-1024:justify-center';

export const NAV_AUTH = cn(
  'inline-flex h-8 shrink-0 box-border w-fit min-w-[4.75rem] items-center justify-center rounded-full px-[11px]',
  'font-sans text-[clamp(.74rem,.95vw,.82rem)] font-semibold leading-none whitespace-nowrap no-underline',
  'border border-solid border-[rgba(255,255,255,.28)] bg-transparent text-white/90',
  'transition-[transform,background,color,border-color] duration-200',
  'hover:-translate-y-0.5 hover:border-white/55 hover:bg-[rgba(255,255,255,.08)] hover:text-white',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3D7DF0]',
  'group-[.on-light]/hdr:border-[rgba(0,80,216,.28)] group-[.on-light]/hdr:text-[#0041AF]',
  'group-[.on-light]/hdr:hover:border-[#0050D8] group-[.on-light]/hdr:hover:bg-[rgba(0,80,216,.08)] group-[.on-light]/hdr:hover:text-[#00337F]',
  'group-[.on-light]/hdr:focus-visible:outline-[#0050D8]',
  'disabled:pointer-events-none disabled:opacity-60',
  'max-[1280px]:h-7 max-[1280px]:px-2 max-[1280px]:text-[clamp(.62rem,.85vw,.72rem)]',
  'max-980:h-7 max-980:px-[7px] max-980:text-[.62rem]',
);

export const NAV_AUTH_TOOLS = 'max-1024:hidden min-1025:inline-flex';

export const NAV_AUTH_MOBILE =
  'max-1024:min-h-11 max-1024:min-w-[120px] max-1024:flex-[1_1_calc(50%-4px)] max-1024:justify-center';

export const NAV_LABEL_LONG = 'max-980:hidden min-981:inline';

export const NAV_LABEL_SHORT = 'max-980:inline min-981:hidden';
