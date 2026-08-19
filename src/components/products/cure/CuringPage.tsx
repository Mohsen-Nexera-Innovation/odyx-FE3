import Link from 'next/link';
import type { ReactNode } from 'react';
import CureCases from '@/components/products/cure/CureCases';
import CureRoiMini from '@/components/products/cure/CureRoiMini';
import CureVideo from '@/components/products/cure/CureVideo';
import {
  CURE_UV02_APPS,
  CURE_UV02_CHIPS,
  CURE_UV02_ECOSYSTEM,
  CURE_UV02_HERO,
  CURE_UV02_REVIEWS,
  CURE_UV02_SPECS,
  CURE_UV02_WHY,
  CURE_UV02_WORKFLOW,
} from '@/content/cure-uv02';

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
  `${SANS} inline-flex box-border h-12 min-h-12 items-center justify-center gap-2 rounded-full px-[22px] py-0 text-[.9rem] font-semibold tracking-[0.01em] no-underline transition-[background,color,border-color,transform,box-shadow] duration-[220ms] ease-[ease] max-[640px]:w-full`;
const BTN_PRIMARY =
  `${BTN} border border-solid border-transparent bg-[#0050D8] !text-white shadow-none hover:-translate-y-px hover:!text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)] motion-reduce:hover:translate-y-0`;
const BTN_GHOST =
  `${BTN} group border-[1.5px] border-solid border-[#0050D8] bg-[rgba(255,255,255,.72)] !text-[#0050D8] [backdrop-filter:blur(6px)] hover:-translate-y-px hover:border-[#0041AF] hover:bg-white hover:!text-[#0041AF] motion-reduce:hover:translate-y-0`;

const chipStroke = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/** Feature-chip icons — motifs from product-design-refrences/cure.jpeg */
const CHIP_ICONS: Record<string, ReactNode> = {
  orbit: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="8" {...chipStroke} />
      <path
        d="M24 6.5v5M24 36.5v5M6.5 24h5M36.5 24h5M12.2 12.2l3.5 3.5M32.3 32.3l3.5 3.5M35.8 12.2l-3.5 3.5M15.7 32.3l-3.5 3.5"
        {...chipStroke}
        strokeWidth={2.4}
      />
    </svg>
  ),
  waves: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M24 3.5v3.2M17.2 6.2l1.8 2.6M30.8 6.2l-1.8 2.6" {...chipStroke} strokeWidth={2.2} />
      <path
        d="M24 9.5c-5.4 0-9.6 4-9.6 9 0 3.3 1.7 5.7 4 7.5.7.6 1.2 1.4 1.2 2.3V31h8.8v-2.7c0-.9.5-1.7 1.2-2.3 2.3-1.8 4-4.2 4-7.5 0-5-4.2-9-9.6-9z"
        {...chipStroke}
      />
      <path d="M20 34h8M21 37h6M22 40h4" {...chipStroke} strokeWidth={2.2} />
    </svg>
  ),
  heat: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path d="M16 31c2.4-3.5 2.4-7 0-10.5 2.4-3.5 2.4-7 0-10.5" {...chipStroke} />
      <path d="M24 33c2.4-3.8 2.4-7.6 0-11.4 2.4-3.8 2.4-7.6 0-11.4" {...chipStroke} />
      <path d="M32 31c2.4-3.5 2.4-7 0-10.5 2.4-3.5 2.4-7 0-10.5" {...chipStroke} />
      <path d="M12 36.5h24" {...chipStroke} strokeWidth={3} />
    </svg>
  ),
  compat: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="11.5" r="3.6" {...chipStroke} />
      <circle cx="11.5" cy="35" r="3.6" {...chipStroke} />
      <circle cx="36.5" cy="35" r="3.6" {...chipStroke} />
      <path d="M21.4 14.4L14.4 31.6M26.6 14.4l7 17.2M15.2 35h17.6" {...chipStroke} strokeWidth={2.3} />
    </svg>
  ),
  safe: (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        d="M24 6.5l13.5 4.8v11.2c0 9.4-5.5 15.2-13.5 18-8-2.8-13.5-8.6-13.5-18V11.3L24 6.5z"
        {...chipStroke}
      />
      <path d="M17.2 24.2l4.4 4.4L31.5 18" {...chipStroke} strokeWidth={2.8} />
    </svg>
  ),
};

/** Digital Workflow icons — 5 steps (no wash) */
const FLOW_ICONS: Record<string, string> = {
  scan: '/img/workflow/flow/scan.png',
  design: '/img/workflow/flow/design.png',
  print: '/img/workflow/flow/print.png',
  cure: '/img/cure-uv02/flow/cure.png',
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

/** Single curing landing — P1-26 layout system + cure.jpeg content */
export default function CuringPage() {
  const hero = CURE_UV02_HERO;

  return (
    <main
      className={`${SANS} bg-[#f1f7fe] pb-[clamp(36px,5vh,56px)] text-[#1a2433]`}
      id="top"
      data-cure
    >
      <style>{`
        @keyframes p126-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes cure-float-arch{0%,100%{transform:rotate(-6deg) translateY(0)}50%{transform:rotate(-6deg) translateY(-3px)}}
        @keyframes cure-float-aligner{0%,100%{transform:rotate(8deg) translateY(0)}50%{transform:rotate(8deg) translateY(-3px)}}
        @keyframes p126-fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        [data-cure] .reveal.in{opacity:1!important;transform:none!important}
        body:has([data-cure]),
        body:has([data-cure]) .site-bg,
        body:has([data-cure]) main{background:#f1f7fe!important}
        @media (prefers-reduced-motion:reduce){
          [data-cure] .reveal{opacity:1!important;transform:none!important;transition:none!important}
          [data-cure] .cure-hero-float,
          [data-cure] .cure-hero-float-arch,
          [data-cure] .cure-hero-float-aligner,
          [data-cure] .cure-case-fade{animation:none}
        }
      `}</style>

      <section
        className="relative overflow-visible bg-transparent pt-[calc(var(--hdr-h)+clamp(24px,3vh,44px))] pb-[clamp(18px,2.4vh,28px)] max-[800px]:pt-[calc(var(--hdr-h)+clamp(20px,3vh,36px))] max-[800px]:pb-[clamp(14px,2vh,22px)]"
        data-hero-light
        aria-label="ODYX Cure"
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-cover bg-no-repeat bg-[center_top] opacity-75"
          aria-hidden
          style={{
            backgroundImage:
              'radial-gradient(ellipse 55% 70% at 78% 28%, rgba(255,255,255,.4), transparent 70%), radial-gradient(ellipse 40% 50% at 88% 8%, rgba(190,215,245,.3), transparent 65%)',
          }}
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,#f1f7fe_100%)]" />
        </div>
        <div
          className={`${GUTTER} ${COLS} relative z-[1] min-h-[clamp(420px,58vh,560px)] gap-[clamp(20px,3vw,40px)] max-[1100px]:min-h-[clamp(380px,52vh,500px)] max-[800px]:min-h-0 max-[800px]:gap-2`}
        >
          <div className="flex w-full min-w-0 max-w-none flex-col justify-start gap-[clamp(12px,1.6vh,18px)] pt-[clamp(36px,5.5vh,64px)] max-[800px]:order-2">
            <div className="relative z-[2]">
              <p className={`${DISPLAY} m-0 mb-2.5 text-[.78rem] font-semibold uppercase tracking-[0.12em] text-[#0041AF]`}>
                {hero.eyebrow}
              </p>
              <h1 className={`${DISPLAY} m-0 mb-3.5 max-w-[14ch] text-[clamp(2.15rem,4.6vw,3.15rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#141c2b] max-[800px]:max-w-none`}>
                {hero.title}
              </h1>
              <p className={`${SANS} m-0 mb-[22px] max-w-[42ch] text-[.98rem] font-normal leading-[1.55] text-[#5a6574]`}>
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
            <ul className="m-0 w-full max-w-none list-none items-stretch p-0 [display:grid] gap-[7px] [grid-template-columns:repeat(5,minmax(0,1fr))] max-[1100px]:[grid-template-columns:repeat(3,1fr)] max-[640px]:[grid-template-columns:repeat(2,1fr)]">
              {CURE_UV02_CHIPS.map((chip) => (
                <li
                  key={chip.id}
                  className="flex min-h-0 min-w-0 flex-col items-center justify-start gap-1 overflow-hidden rounded-[10px] border border-solid border-[rgba(30,50,90,.1)] bg-white px-1.5 pb-2 pt-[9px] text-center text-[#1a2740] shadow-[0_3px_10px_rgba(25,40,90,.04)] transition-[transform,box-shadow,border-color] duration-[280ms] ease-[ease] hover:-translate-y-0.5 hover:border-[rgba(30,50,90,.16)] hover:shadow-[0_8px_18px_rgba(25,40,90,.1)] motion-reduce:hover:translate-y-0"
                >
                  <span className="size-[34px] shrink-0 place-items-center text-[#0050D8] [display:grid]">
                    <span className="block size-full [&>svg]:block [&>svg]:size-full">{CHIP_ICONS[chip.id]}</span>
                  </span>
                  <span className={`${SANS} flex w-full max-w-full flex-col items-center gap-0 overflow-hidden px-px text-[clamp(.52rem,.95vw,.64rem)] font-normal leading-[1.1] tracking-[-0.01em] text-[#111827]`}>
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
            className="relative isolate block w-full min-w-0 min-h-full overflow-visible max-[800px]:order-first max-[800px]:min-h-[300px]"
            aria-label={hero.imgAlt}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cure-hero-float-arch pointer-events-none absolute bottom-[36%] left-[64%] z-[3] block h-[46%] w-[34%] object-contain object-center [animation:cure-float-arch_6.2s_ease-in-out_.2s_infinite] max-[800px]:bottom-[20%] max-[800px]:h-[34%] max-[800px]:w-[28%]"
              src={`${hero.outputArchImg}?v=${hero.imgVersion}`}
              alt=""
              width={953}
              height={759}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cure-hero-float-aligner pointer-events-none absolute bottom-[16%] left-[68%] z-[4] block h-[28%] w-[32%] object-contain object-center [animation:cure-float-aligner_6.6s_ease-in-out_.4s_infinite] max-[800px]:bottom-[4%] max-[800px]:h-[22%] max-[800px]:w-[28%]"
              src={`${hero.outputAlignerImg}?v=${hero.imgVersion}`}
              alt=""
              width={898}
              height={464}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="cure-hero-float pointer-events-none absolute -top-[6%] -left-[2%] z-[5] block h-[96%] w-[56%] object-contain object-center [animation:p126-float_5.5s_ease-in-out_infinite] max-[800px]:relative max-[800px]:inset-auto max-[800px]:mx-auto max-[800px]:mb-2 max-[800px]:h-auto max-[800px]:w-[min(62%,260px)]"
              src={`${hero.machineImg}?v=${hero.imgVersion}`}
              alt=""
              width={1309}
              height={1020}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <div className={`${GUTTER} mt-2.5 flex flex-col gap-3.5`}>
        <div className={`${COLS} [grid-auto-rows:minmax(334px,auto)] [grid-template-columns:minmax(0,1.265fr)_minmax(0,1fr)] max-[1100px]:[grid-template-columns:1fr]`}>
          <div className={`${CARD} group min-h-[334px] reveal`}>
            <h2 className={`${DISPLAY} m-0 mb-2.5 text-[clamp(1.05rem,1.5vw,1.2rem)] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`}>
              {CURE_UV02_WHY.title}
            </h2>
            <div className="flex min-h-0 flex-1 items-center gap-[clamp(55px,6.3vw,88px)] [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(200px,1.05fr)] max-[1100px]:gap-[clamp(20px,3vw,36px)] max-[1100px]:[grid-template-columns:minmax(0,1fr)_minmax(160px,.9fr)] max-[800px]:gap-4 max-[800px]:[grid-template-columns:1fr]">
              <ul className={`${SANS} m-0 flex min-w-0 max-w-none list-none flex-col justify-center gap-2.5 py-0 pe-1 ps-0 max-[800px]:pe-0`}>
                {CURE_UV02_WHY.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 whitespace-nowrap text-[clamp(.72rem,.95vw,.8rem)] font-medium leading-[1.25] text-[#4a5568] max-[1100px]:whitespace-normal max-[800px]:text-[.82rem] max-[800px]:leading-[1.35]"
                  >
                    <span
                      className="size-[18px] shrink-0 place-items-center rounded-full bg-[#0050D8] shadow-[0_3px_8px_rgba(0,80,216,.22)] [display:grid]"
                      aria-hidden
                    >
                      <svg viewBox="0 0 20 20" width="10" height="10">
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
              <figure className="m-0 flex aspect-square w-full max-h-[280px] items-center justify-center overflow-visible rounded-xl bg-transparent p-0.5 max-[800px]:mx-auto max-[800px]:aspect-video max-[800px]:max-h-none max-[800px]:max-w-[280px] max-[800px]:overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${CURE_UV02_WHY.img}?v=${CURE_UV02_WHY.imgVersion ?? 14}`}
                  alt={CURE_UV02_WHY.imgAlt}
                  loading="lazy"
                  className="block h-full max-h-[270px] w-full object-contain object-center transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] translate-x-9 group-hover:translate-x-9 group-hover:scale-[1.04] max-[1100px]:translate-x-0 max-[1100px]:group-hover:translate-x-0 max-[1100px]:group-hover:scale-100 max-[800px]:max-h-[200px] motion-reduce:group-hover:scale-100"
                />
              </figure>
            </div>
          </div>
          <CureVideo />
        </div>

        <div className={`${COLS} [grid-auto-rows:minmax(334px,auto)]`}>
          <div className={`${CARD} min-h-[334px] self-stretch reveal`}>
            <h2 className={`${CARD_TITLE} mb-2.5`}>Technical Specifications</h2>
            <ul className="m-0 flex min-h-0 flex-[1_1_auto] list-none flex-col justify-between gap-0 p-0">
              {CURE_UV02_SPECS.map((row) => (
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
            <h2 className={`${CARD_TITLE} mb-3 w-full p-0 text-left`}>What Can You Cure?</h2>
            <ul className="m-0 w-full list-none p-0 content-start justify-items-stretch [display:grid] flex-[1_1_auto] [grid-template-columns:repeat(3,minmax(0,1fr))] gap-x-1 gap-y-3 max-[640px]:[grid-template-columns:repeat(2,1fr)]">
              {CURE_UV02_APPS.map((app) => (
                <li
                  key={app.label}
                  className="group flex min-w-0 flex-col items-stretch justify-start text-center transition-transform duration-[250ms] ease-[ease] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                >
                  <div className="mb-1.5 flex h-24 w-full items-center justify-center overflow-visible border-0 bg-transparent p-0 shadow-none">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${app.img}?v=cut1`}
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
          <div className="reveal in flex h-full min-h-0 flex-col overflow-visible rounded-[18px] border border-solid border-[rgba(30,50,90,.08)] bg-white p-[clamp(16px,1.8vw,22px)] shadow-[0_10px_28px_rgba(20,40,80,.06)]">
            <h2 className={`${CARD_TITLE} mb-4 shrink-0`}>Digital Workflow</h2>
            <ol className="mx-0 my-auto flex w-full flex-1 list-none items-center justify-between gap-0 px-0.5 py-2">
              {CURE_UV02_WORKFLOW.map((step, i) => {
                const current = step.id === 'cure';
                const body = (
                  <>
                    <span
                      className={`size-14 place-items-center overflow-visible rounded-none bg-transparent shadow-none transition-transform duration-300 ease-[ease] [display:grid] group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0 max-[800px]:size-12 ${
                        current ? 'rounded-full outline outline-2 outline-offset-[3px] outline-[#0050D8]' : ''
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${FLOW_ICONS[step.id]}?v=4`}
                        alt=""
                        loading="lazy"
                        className="block size-14 object-contain max-[800px]:size-12"
                      />
                    </span>
                    <span className={`${SANS} text-[.78rem] font-semibold leading-[1.2] tracking-[-0.01em] text-[#1f2738] group-hover:text-[#0050D8] group-focus-visible:text-[#0050D8]`}>
                      <strong className="inline font-semibold">{step.bold}</strong>
                      {step.rest}
                    </span>
                  </>
                );
                return (
                  <li key={step.id} className="relative flex min-w-0 flex-[1_1_0] flex-col items-center gap-3 text-center">
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
                    {i < CURE_UV02_WORKFLOW.length - 1 ? (
                      <span
                        className="pointer-events-none absolute top-[18px] right-[-10px] z-[1] size-[22px] place-items-center text-[#0050D8] [display:grid] max-[800px]:hidden"
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
          <CureRoiMini />
        </div>

        <div className={`${CARD} min-h-[220px] overflow-hidden p-[clamp(18px,2vw,26px)] reveal`}>
          <h2 className={`${CARD_TITLE} mb-[18px]`}>{CURE_UV02_ECOSYSTEM.title}</h2>
          <ul className="m-0 flex list-none flex-nowrap items-start justify-between gap-0 p-[2px_0_0] max-[800px]:flex-wrap max-[800px]:justify-center max-[800px]:gap-x-3 max-[800px]:gap-y-5">
            {CURE_UV02_ECOSYSTEM.nodes.map((node, i) => (
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
                      src={`${node.img}?v=14`}
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
                {i < CURE_UV02_ECOSYSTEM.nodes.length - 1 ? (
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
          <CureCases />
          <div className={`${CARD} flex h-full flex-col reveal`}>
            <h2 className={CARD_TITLE}>{CURE_UV02_REVIEWS.title}</h2>
            <ul className="m-0 flex flex-1 list-none content-start gap-2.5 p-0 [display:grid] [grid-template-columns:repeat(3,minmax(0,1fr))] max-[1100px]:[grid-template-columns:1fr]">
              {CURE_UV02_REVIEWS.items.map((r) => (
                <li
                  key={r.author}
                  className="flex min-w-0 flex-col items-start gap-2 rounded-xl border border-solid border-[rgba(30,50,90,.08)] bg-white px-[11px] pt-3 pb-3.5 shadow-[0_4px_14px_rgba(25,40,90,.04)]"
                >
                  <Stars />
                  <blockquote className={`${SANS} m-0 text-[.76rem] font-medium italic leading-[1.4] text-[#4a5568]`}>
                    “{r.quote}”
                  </blockquote>
                  <cite className={`${SANS} mt-auto text-[.74rem] not-italic font-semibold text-[#2c3444]`}>
                    - {r.author}
                  </cite>
                </li>
              ))}
            </ul>
            <p className={`${SANS} mt-4 mb-0 border-t border-solid border-[#dce2ee] pt-3 text-center text-[.82rem] font-semibold text-[#4a5568]`}>
              {CURE_UV02_REVIEWS.footer}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
