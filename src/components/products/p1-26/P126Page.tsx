import Link from 'next/link';
import type { ReactNode } from 'react';
import P126Cases from '@/components/products/p1-26/P126Cases';
import P126RoiMini from '@/components/products/p1-26/P126RoiMini';
import P126Video from '@/components/products/p1-26/P126Video';
import {
  P1_26_ECOSYSTEM,
  P1_26_FEATURE_CHIPS,
  P1_26_HERO,
  P1_26_PRINT_APPS,
  P1_26_REVIEWS,
  P1_26_SPECS,
  P1_26_WHY,
  P1_26_WORKFLOW,
} from '@/content/p1-26';

const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";
const GUTTER = 'w-full mx-auto px-[clamp(20px,4vw,56px)]';
const COLS =
  '[display:grid] items-stretch gap-3 [grid-template-columns:minmax(0,1.1fr)_minmax(0,1fr)] max-[1100px]:[grid-template-columns:1fr]';
const CARD_TITLE = `${DISPLAY} m-0 mb-3.5 text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`;
const CARD =
  'flex h-full min-h-0 flex-col rounded-[18px] border-4 border-solid border-white bg-transparent p-[clamp(16px,1.8vw,22px)]';
const BTN =
  `${SANS} inline-flex items-center justify-center gap-2 rounded-full px-[22px] py-[11px] text-[.9rem] font-semibold tracking-[0.01em] no-underline transition-[background,color,border-color,transform,box-shadow] duration-[220ms] ease-[ease] max-[640px]:w-full`;
const BTN_PRIMARY =
  `${BTN} border-0 bg-[#0050D8] text-white shadow-none hover:-translate-y-px hover:text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)] motion-reduce:hover:translate-y-0`;
const BTN_GHOST =
  `${BTN} group border-[1.5px] border-solid border-[#0050D8] bg-[rgba(255,255,255,.72)] text-[#0050D8] [backdrop-filter:blur(6px)] hover:-translate-y-px hover:border-[#0041AF] hover:bg-white hover:text-[#0041AF] motion-reduce:hover:translate-y-0`;

const chipStroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Feature-chip icons — bold line art matched to printer-odyx-p1-26.jpeg */
const CHIP_ICONS: Record<string, ReactNode> = {
  lcd: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <rect x="6" y="6" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="27" y="6" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="6" y="27" width="15" height="15" rx="2.2" {...chipStroke} />
      <rect x="27" y="27" width="15" height="15" rx="2.2" {...chipStroke} />
    </svg>
  ),
  tank: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M14 12h20v4H14z" {...chipStroke} />
      <path d="M16 16h16l-1.5 22a3 3 0 0 1-3 2.5h-7a3 3 0 0 1-3-2.5L16 16z" {...chipStroke} />
      <path d="M19 24h10M20 30h8" {...chipStroke} strokeWidth={2.2} />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M8 31a16 16 0 0 1 32 0" {...chipStroke} />
      <path d="M13 31h3.5M18.8 18.5l1.8 2.8M24 15v3.5M29.2 18.5l-1.8 2.8M35 31h-3.5" {...chipStroke} strokeWidth={2.3} />
      <path d="M24 31l11-10" {...chipStroke} />
      <circle cx="24" cy="31" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M10 15l14-7 14 7-14 7-14-7z" {...chipStroke} />
      <path d="M10 22l14 7 14-7" {...chipStroke} />
      <path d="M10 29l14 7 14-7" {...chipStroke} />
      <path d="M10 15v7M38 15v7M10 22v7M38 22v7" {...chipStroke} strokeWidth={2.3} />
    </svg>
  ),
  acf: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M13 10h16l7 7v21a2.2 2.2 0 0 1-2.2 2.2H13A2.2 2.2 0 0 1 10.8 38V12.2A2.2 2.2 0 0 1 13 10z" {...chipStroke} />
      <path d="M29 10v7h7" {...chipStroke} />
      <path d="M17 8h14l6 6" {...chipStroke} opacity={0.9} />
      <path d="M36 14l4-1.2M38 17.5l2.8 2.8" {...chipStroke} strokeWidth={2.2} />
    </svg>
  ),
};

/** Exact icons cropped from printer-odyx-p1-26.jpeg — do not replace with SVGs */
const FLOW_ICONS: Record<string, string> = {
  scan: '/img/workflow/flow/scan.png',
  design: '/img/workflow/flow/design.png',
  print: '/img/workflow/flow/print.png',
  cure: '/img/workflow/flow/cure.png',
  deliver: '/img/workflow/flow/deliver.png',
};

const FLOW_CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-[15px]">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Stars() {
  return (
    <div className="m-0 flex gap-0.5 text-[#f5b400]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="13" height="13" aria-hidden>
          <path
            fill="currentColor"
            d="M10 1.8l2.4 5 5.5.5-4.2 3.6 1.3 5.3L10 13.6l-4.9 2.6 1.3-5.3L2.1 7.3l5.5-.5L10 1.8z"
          />
        </svg>
      ))}
    </div>
  );
}

export default function P126Page() {
  const hero = P1_26_HERO;

  return (
    <main
      className={`${SANS} pb-[clamp(36px,5vh,56px)] text-[#1a2433] bg-[#f1f7fe] bg-[url('/img/printers/p126/page-bg.jpg')] bg-cover bg-no-repeat bg-[center_top] bg-fixed max-[800px]:bg-scroll`}
      id="top"
      data-p126
    >
      <style>{`
        @keyframes p126-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes p126-float-bridge{0%,100%{transform:rotate(-8deg) translateY(0)}50%{transform:rotate(-8deg) translateY(-3px)}}
        @keyframes p126-float-arch{0%,100%{transform:rotate(6deg) translateY(0)}50%{transform:rotate(6deg) translateY(-3px)}}
        @keyframes p126-pop{from{opacity:.4;transform:scale(.96)}to{opacity:1;transform:none}}
        @keyframes p126-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        [data-p126] .reveal.in{opacity:1!important;transform:none!important}
        @media (prefers-reduced-motion:reduce){
          [data-p126] .reveal{opacity:1!important;transform:none!important;transition:none!important}
          [data-p126] .p126-hero-float,
          [data-p126] .p126-hero-float-bridge,
          [data-p126] .p126-hero-float-arch,
          [data-p126] .p126-roi-pop,
          [data-p126] .p126-case-fade{animation:none}
        }
      `}</style>

      <section
        className="relative overflow-visible bg-transparent pt-[calc(var(--hdr-h)+clamp(24px,3vh,44px))] pb-[clamp(18px,2.4vh,28px)] max-[800px]:pt-[calc(var(--hdr-h)+clamp(20px,3vh,36px))] max-[800px]:pb-[clamp(14px,2vh,22px)]"
        data-hero-light
        aria-label="ODYX P1-26"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_top] opacity-75"
          aria-hidden
          style={{
            backgroundImage: `radial-gradient(ellipse 55% 70% at 78% 28%, rgba(255,255,255,.4), transparent 70%), radial-gradient(ellipse 40% 50% at 88% 8%, rgba(190,215,245,.3), transparent 65%), url('${hero.bg}?v=12')`,
          }}
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#f1f7fe_100%)]" />
        </div>
        <div
          className={`${GUTTER} ${COLS} relative z-[1] min-h-[clamp(420px,58vh,560px)] max-[1100px]:min-h-[clamp(380px,52vh,500px)] max-[800px]:min-h-0 max-[800px]:gap-2`}
        >
          <div className="flex w-full min-w-0 max-w-none flex-col justify-start gap-[clamp(18px,2.4vh,28px)] pt-[clamp(4px,1vh,12px)] max-[800px]:order-2">
            <div className="relative z-[2]">
              <p
                className={`${DISPLAY} m-0 mb-2.5 text-[.78rem] font-semibold uppercase tracking-[0.12em] text-[#0041AF]`}
              >
                {hero.eyebrow}
              </p>
              <h1
                className={`${DISPLAY} m-0 mb-3.5 max-w-[14ch] text-[clamp(2.15rem,4.6vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#141c2b] max-[800px]:max-w-none`}
              >
                {hero.title}
              </h1>
              <p
                className={`${SANS} m-0 mb-[22px] max-w-[42ch] text-[.98rem] font-normal leading-[1.55] text-[#5a6574]`}
              >
                {hero.body}
              </p>
              <div className="flex flex-wrap gap-2.5 max-[640px]:flex-col max-[640px]:items-stretch">
                <Link className={BTN_PRIMARY} href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </Link>
                <a className={BTN_GHOST} href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                    className="transition-transform duration-[220ms] ease-[ease] group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                  >
                    <path
                      d="M12 3v12M7 11l5 5 5-5M5 20h14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <ul className="m-0 w-full max-w-none list-none p-0 [display:grid] gap-[5px] [grid-template-columns:repeat(5,minmax(0,1fr))] max-[1100px]:[grid-template-columns:repeat(3,1fr)] max-[640px]:[grid-template-columns:repeat(2,1fr)]">
              {P1_26_FEATURE_CHIPS.map((chip) => (
                <li
                  key={chip.id}
                  className="flex aspect-square min-h-0 min-w-0 flex-col items-center justify-center gap-[3px] overflow-hidden rounded-[9px] border border-solid border-[rgba(30,50,90,.1)] bg-white px-0.5 pb-1 pt-[5px] text-center text-[#1a2740] shadow-[0_3px_10px_rgba(25,40,90,.04)] transition-[transform,box-shadow,border-color] duration-[280ms] ease-[ease] hover:-translate-y-0.5 hover:border-[rgba(30,50,90,.16)] hover:shadow-[0_8px_18px_rgba(25,40,90,.1)] motion-reduce:hover:translate-y-0"
                >
                  <span className="size-[min(48px,52%)] shrink-0 place-items-center text-[#0050D8] [display:grid]">
                    <span className="block size-full [&>svg]:block [&>svg]:size-full">
                      {CHIP_ICONS[chip.id]}
                    </span>
                  </span>
                  <span
                    className={`${SANS} flex w-full max-w-full flex-col items-center gap-0 overflow-hidden px-px text-[clamp(.48rem,.95vw,.58rem)] font-normal leading-[1.12] tracking-[-0.01em] text-[#111827]`}
                  >
                    {chip.lines.map((line, i) => (
                      <span key={line} className={`block max-w-full ${i === 0 ? 'font-bold' : ''}`}>
                        {line}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="relative w-full min-w-0 min-h-full self-stretch justify-self-stretch overflow-visible max-[800px]:order-first max-[800px]:mx-auto max-[800px]:min-h-[320px] max-[800px]:w-full max-[800px]:max-w-[420px]"
            aria-label={hero.imgAlt}
          >
            <span
              className="pointer-events-none absolute bottom-[2%] left-[4%] z-[1] h-[14%] w-[54%] scale-y-[0.85] blur-[2px] [background:radial-gradient(ellipse_72%_55%_at_50%_50%,rgba(20,35,60,.34)_0%,rgba(20,35,60,.16)_42%,rgba(20,35,60,.05)_68%,transparent_78%)]"
              aria-hidden
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-hero-float-bridge pointer-events-none absolute bottom-[18%] left-[58%] z-[2] block h-[32%] w-[26%] object-contain object-bottom [animation:p126-float-bridge_6s_ease-in-out_.25s_infinite]"
              src={`${hero.outputBridgeImg}?v=46`}
              alt=""
              width={885}
              height={595}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-hero-float-arch pointer-events-none absolute bottom-[6%] left-[76%] z-[3] block h-[30%] w-[28%] object-contain object-bottom [animation:p126-float-arch_6.4s_ease-in-out_.45s_infinite]"
              src={`${hero.outputArchImg}?v=46`}
              alt=""
              width={895}
              height={698}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="p126-hero-float pointer-events-none absolute top-0 left-0 z-[5] block h-full w-[64%] object-contain object-bottom [animation:p126-float_5.5s_ease-in-out_infinite]"
              src={`${hero.printerImg}?v=21`}
              alt=""
              width={661}
              height={1170}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className={`${GUTTER} mt-2.5 flex flex-col gap-3.5`}>
        <div className={`${COLS} [grid-auto-rows:minmax(334px,auto)]`}>
          <div className={`${CARD} group min-h-[334px] reveal`}>
            <h2 className={`${CARD_TITLE} mb-3`}>{P1_26_WHY.title}</h2>
            <div className="flex min-h-0 flex-1 items-center gap-[clamp(36px,4vw,52px)] [display:grid] [grid-template-columns:minmax(0,1.1fr)_minmax(180px,1fr)] max-[800px]:[grid-template-columns:1fr]">
              <ul className={`${SANS} m-0 flex min-w-0 list-none flex-col justify-center gap-3.5 py-0 pe-2 ps-0`}>
                {P1_26_WHY.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2.5 whitespace-nowrap text-[.875rem] font-medium leading-[1.25] text-[#4a5568] max-[1100px]:whitespace-normal"
                  >
                    <span
                      className="size-[22px] shrink-0 place-items-center rounded-full bg-[#0050D8] shadow-[0_3px_8px_rgba(0,80,216,.22)] [display:grid]"
                      aria-hidden
                    >
                      <svg viewBox="0 0 20 20" width="12" height="12">
                        <path
                          d="M4 10.5l4 4 8-9"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <figure className="m-0 flex aspect-square w-full max-h-[280px] items-center justify-center overflow-visible rounded-xl bg-transparent p-0.5 max-[800px]:mx-auto max-[800px]:aspect-video max-[800px]:max-h-none max-[800px]:max-w-[320px] max-[800px]:overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${P1_26_WHY.img}?v=29`}
                  alt={P1_26_WHY.imgAlt}
                  loading="lazy"
                  className="block h-full max-h-[270px] w-full object-contain object-center transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] translate-x-9 group-hover:translate-x-9 group-hover:scale-[1.04] max-[800px]:max-h-[200px] max-[800px]:translate-x-0 max-[800px]:group-hover:translate-x-0 max-[800px]:group-hover:scale-100 motion-reduce:group-hover:scale-100"
                />
              </figure>
            </div>
          </div>
          <P126Video />
        </div>

        <div className={`${COLS} [grid-auto-rows:minmax(334px,auto)]`}>
          <div className={`${CARD} min-h-[334px] self-stretch reveal`}>
            <h2 className={`${CARD_TITLE} mb-2.5`}>Technical Specifications</h2>
            <ul className="m-0 flex min-h-0 flex-[1_1_auto] list-none flex-col justify-between gap-0 p-0">
              {P1_26_SPECS.map((row) => (
                <li
                  key={row.label}
                  className="items-center gap-x-4 gap-y-2.5 border-b border-solid border-[rgba(30,50,90,.1)] py-[9px] last:border-b-0 last:pb-0.5 [display:grid] [grid-template-columns:minmax(128px,40%)_1fr]"
                >
                  <span className={`${SANS} text-[.875rem] font-medium leading-[1.25] tracking-[-0.005em] text-[#2c3444]`}>
                    {row.label}
                  </span>
                  <span className={`${SANS} text-[.875rem] font-normal leading-[1.25] tracking-[-0.005em] text-[#4a5568]`}>
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${CARD} min-h-[334px] self-stretch px-[clamp(8px,.9vw,12px)] reveal`}>
            <h2 className={`${CARD_TITLE} mb-3 w-full p-0 text-left`}>What Can You Print?</h2>
            <ul className="m-0 w-full list-none p-0 content-start justify-items-stretch [display:grid] flex-[1_1_auto] [grid-template-columns:repeat(3,minmax(0,1fr))] gap-x-1 gap-y-3 max-[640px]:[grid-template-columns:repeat(2,1fr)]">
              {P1_26_PRINT_APPS.map((app) => (
                <li
                  key={app.label}
                  className="group flex min-w-0 flex-col items-stretch justify-start text-center transition-transform duration-[250ms] ease-[ease] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  <div className="mb-1.5 flex h-24 w-full items-center justify-center overflow-visible border-0 bg-transparent p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${app.img}?v=32`}
                      alt={app.alt}
                      loading="lazy"
                      className="block h-full max-h-24 max-w-full w-full bg-transparent object-contain transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                  </div>
                  <p className={`${SANS} m-0 px-0.5 text-center text-[.8rem] font-medium leading-[1.2] text-[#4a5568]`}>
                    {app.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${COLS} [grid-template-columns:minmax(0,1.22fr)_minmax(0,1fr)] max-[1100px]:[grid-template-columns:1fr]`}>
          <div className={`${CARD} h-full min-h-0 reveal`}>
            <h2 className={`${CARD_TITLE} mb-4 shrink-0`}>Digital Workflow</h2>
            <ol className="mx-0 my-auto flex w-full shrink-0 list-none items-start justify-between gap-0 px-0.5 py-2">
              {P1_26_WORKFLOW.map((step, i) => {
                const body = (
                  <>
                    <span className="size-16 place-items-center overflow-visible rounded-none bg-transparent shadow-none transition-transform duration-300 ease-[ease] [display:grid] group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${FLOW_ICONS[step.id]}?v=42`}
                        alt=""
                        loading="lazy"
                        className="block size-16 object-contain"
                      />
                    </span>
                    <span
                      className={`${SANS} text-[.82rem] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1f2738] group-hover:text-[#0050D8] group-focus-visible:text-[#0050D8]`}
                    >
                      <strong className="inline font-semibold">{step.bold}</strong>
                      {step.rest}
                    </span>
                  </>
                );
                return (
                  <li
                    key={step.id}
                    className="relative flex min-w-0 flex-[1_1_0] flex-col items-center gap-3 text-center"
                  >
                    {step.dimmed ? (
                      <span
                        className="flex w-full cursor-not-allowed flex-col items-center gap-3 text-inherit no-underline opacity-[.38] grayscale-[.2]"
                        aria-disabled="true"
                        title="Coming soon"
                      >
                        {body}
                      </span>
                    ) : (
                      <Link
                        href={step.href}
                        className="group flex w-full cursor-pointer flex-col items-center gap-3 text-inherit no-underline focus-visible:rounded-[10px] focus-visible:outline-2 focus-visible:outline-[#0050D8] focus-visible:outline-offset-4"
                      >
                        {body}
                      </Link>
                    )}
                    {i < P1_26_WORKFLOW.length - 1 ? (
                      <span
                        className="pointer-events-none absolute top-[22px] right-[-12px] z-[1] size-[22px] place-items-center text-[#0050D8] [display:grid] max-[800px]:hidden"
                        aria-hidden
                      >
                        {FLOW_CHEVRON}
                      </span>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
          <P126RoiMini />
        </div>

        <div className={`${CARD} min-h-[220px] overflow-hidden p-[clamp(18px,2vw,26px)] reveal`}>
          <h2 className={`${CARD_TITLE} mb-[18px]`}>{P1_26_ECOSYSTEM.title}</h2>
          <ul className="m-0 flex list-none flex-nowrap items-start justify-between gap-0 p-[2px_0_0] max-[800px]:flex-wrap max-[800px]:justify-center max-[800px]:gap-x-3 max-[800px]:gap-y-5">
            {P1_26_ECOSYSTEM.nodes.map((node, i) => (
              <li
                key={node.name}
                className="flex min-w-0 flex-[1_1_0] items-start gap-0 max-[800px]:max-w-[200px] max-[800px]:flex-[1_1_40%]"
              >
                <Link
                  href={node.href}
                  className="group flex w-full flex-col items-center gap-2.5 px-1.5 text-center text-[#1a2433] no-underline transition-[transform,color] duration-[250ms] ease-[ease] hover:-translate-y-0.5 hover:text-[#0050D8] motion-reduce:hover:translate-y-0"
                >
                  <span className="flex min-h-[2.6em] shrink-0 flex-col items-center justify-start gap-0.5">
                    <span className={`${SANS} text-[.9rem] font-bold leading-[1.2] tracking-[-0.01em] text-[#1f2738] group-hover:text-[#0050D8]`}>
                      {node.name}
                    </span>
                    {node.subtitle ? (
                      <span className={`${SANS} text-[.78rem] font-medium leading-[1.25] text-[#4a5568] group-hover:text-[#0050D8]`}>
                        {node.subtitle}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex h-[150px] max-h-[150px] w-full max-w-[148px] shrink-0 items-center justify-center overflow-visible border-0 bg-transparent p-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${node.img}?v=43`}
                      alt=""
                      loading="lazy"
                      className={
                        i === 1
                          ? 'mx-auto block h-full max-h-full w-auto max-w-full bg-transparent object-contain object-center'
                          : 'block size-full max-h-full max-w-full bg-transparent object-contain object-center'
                      }
                    />
                  </span>
                </Link>
                {i < P1_26_ECOSYSTEM.nodes.length - 1 ? (
                  <span
                    className="relative mt-[calc(2.6em+10px+75px)] h-0 w-[clamp(28px,4.5vw,56px)] shrink-0 self-start border-t-2 border-dotted border-[#0050D8] opacity-70 max-[800px]:hidden before:absolute before:-top-[5px] before:-left-[3px] before:size-2 before:rounded-full before:bg-[#0050D8] before:content-[''] after:absolute after:-top-[5px] after:-right-[3px] after:size-2 after:rounded-full after:bg-[#0050D8] after:content-['']"
                    aria-hidden
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${GUTTER} mt-3.5`}>
        <div className={COLS}>
          <P126Cases />
          <div className={`${CARD} flex h-full flex-col reveal`}>
            <h2 className={CARD_TITLE}>{P1_26_REVIEWS.title}</h2>
            <ul className="m-0 flex flex-1 list-none content-start gap-2.5 p-0 [display:grid] [grid-template-columns:repeat(3,minmax(0,1fr))] max-[1100px]:[grid-template-columns:1fr]">
              {P1_26_REVIEWS.items.map((r) => (
                <li
                  key={r.author}
                  className="flex min-w-0 flex-col items-start gap-2 rounded-xl border border-solid border-[rgba(30,50,90,.08)] bg-white px-[11px] pt-3 pb-3.5 shadow-[0_4px_14px_rgba(25,40,90,.04)]"
                >
                  <Stars />
                  <blockquote
                    className={`${SANS} m-0 text-[.76rem] font-medium italic leading-[1.4] text-[#4a5568]`}
                  >
                    “{r.quote}”
                  </blockquote>
                  <cite className={`${SANS} mt-auto text-[.74rem] not-italic font-semibold text-[#2c3444]`}>
                    - {r.author}
                  </cite>
                </li>
              ))}
            </ul>
            <p
              className={`${SANS} mt-4 mb-0 border-t border-solid border-[#dce2ee] pt-3 text-center text-[.82rem] font-semibold text-[#4a5568]`}
            >
              {P1_26_REVIEWS.footer}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
