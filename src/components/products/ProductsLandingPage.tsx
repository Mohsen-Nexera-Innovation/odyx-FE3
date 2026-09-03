import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  PRODUCT_BTN_GHOST,
  PRODUCT_BTN_PRIMARY,
} from '@/components/products/productCtaChrome';
import { TRUST_ICONS } from '@/components/request-demo/DemoIcons';
import {
  PRODUCTS_LANDING_CTA,
  PRODUCTS_LANDING_FAMILIES,
  PRODUCTS_LANDING_HERO,
  PRODUCTS_LANDING_HERO_ITEMS,
  PRODUCTS_LANDING_TRUST,
  PRODUCTS_LANDING_WORKFLOW,
} from '@/content/products-landing';

const TAJAWAL =
  "[font-family:var(--font-tajawal),'Tajawal',sans-serif]";
const GUTTER = 'w-full mx-auto px-[clamp(20px,4vw,56px)]';
const EXPLORE =
  'group mt-5 inline-flex min-h-11 items-center gap-1.5 text-[16px] font-bold !text-[#0050D8] no-underline transition-[gap,color] duration-200 hover:gap-2.5 hover:!text-[#0041AF] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050D8]';

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="mt-[2px] shrink-0 overflow-visible"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      {/* Soft filled circle — check tip exits top-right like the mock */}
      <circle
        cx="11"
        cy="13"
        r="7.25"
        fill="rgba(0,80,216,0.14)"
        stroke="rgba(0,80,216,0.4)"
        strokeWidth="1"
      />
      <path
        d="M6.8 12.6 10.2 16 19.2 5.4"
        stroke="#0050D8"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Dark navy puck; electric blue only on the top rim and floor glow. */
function GlowDisc({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`} aria-hidden>
      <span className="absolute -bottom-2 start-[-22%] end-[-22%] h-[56px] rounded-full bg-[#0050D8] opacity-40 blur-[20px]" />
      <span className="relative z-[3] block h-[56px] w-full rounded-[50%] bg-[radial-gradient(ellipse_at_50%_38%,#1a2744_0%,#0b1222_62%,#070b14_100%)]" />
      <span className="relative z-[2] -mt-[28px] block h-[56px] w-full bg-[linear-gradient(180deg,#152038_0%,#0a1020_50%,#050810_100%)]" />
      <span className="relative z-[3] -mt-[28px] block h-[56px] w-full rounded-[50%] bg-[radial-gradient(ellipse_at_50%_0%,#121a2e_0%,#05070e_75%)]" />
    </div>
  );
}

function Pedestal({
  children,
  href,
  label,
}: {
  children: ReactNode;
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 flex-col items-center text-center no-underline !text-white"
      aria-label={label}
    >
      <div className="relative z-[2] mb-[-24px] flex h-[clamp(140px,28vw,280px)] w-full items-end justify-center sm:mb-[-32px]">
        <div className="flex h-full w-full items-end justify-center transition-transform duration-200 group-hover:-translate-y-1 motion-reduce:group-hover:translate-y-0">
          {children}
        </div>
      </div>
      <div className="relative z-[1] w-[min(100%,268px)]">
        <GlowDisc />
      </div>
      <span className="mt-4 text-[10px] font-bold uppercase leading-snug text-white sm:mt-5 sm:text-[12px] rtl:tracking-normal ltr:tracking-[0.18em]">
        {label}
      </span>
    </Link>
  );
}

function HeroMedia({
  item,
}: {
  item: (typeof PRODUCTS_LANDING_HERO_ITEMS)[number];
}) {
  if (item.media === 'bottles') {
    return (
      <div className="flex h-[94%] items-end justify-center">
        <img
          src={item.bottles[0].src}
          alt={item.bottles[0].alt}
          className="relative z-[2] h-full w-auto max-w-[50%] -me-5 object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,.45)]"
        />
        <img
          src={item.bottles[1].src}
          alt=""
          className="relative z-[1] h-[88%] w-auto max-w-[46%] -ms-5 object-contain object-bottom drop-shadow-[0_10px_16px_rgba(0,0,0,.4)]"
        />
      </div>
    );
  }
  return (
    <img
      src={item.img}
      alt={item.imgAlt}
      className="h-full w-auto max-w-[min(100%,260px)] object-contain object-bottom drop-shadow-[0_16px_22px_rgba(0,0,0,.45)]"
    />
  );
}

export default function ProductsLandingPage() {
  return (
    <div
      data-products-landing
      className={`${TAJAWAL} flex flex-col gap-[clamp(8px,1.2vw,14px)] overflow-x-clip bg-white text-[#0A1020]`}
    >
      {/* 1 · Hero */}
      <section
        data-hero-dark
        className="relative overflow-hidden bg-[#050814] pt-[calc(var(--hdr-h)+clamp(36px,5.5vw,64px))] pb-[clamp(56px,8vw,96px)] text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-[-8%] h-[62%] bg-[radial-gradient(ellipse_70%_70%_at_50%_78%,rgba(0,80,216,.55),rgba(0,40,120,.18)_42%,transparent_72%)]"
        />

        <div className={`${GUTTER} relative z-[1]`}>
          <h1 className="flex flex-col items-center gap-2.5 text-center text-[length:clamp(34px,5.5vw,42px)] font-bold leading-[1.15] tracking-[-.01em] rtl:tracking-normal">
            <span className="block text-white">{PRODUCTS_LANDING_HERO.titleLead}</span>
            <span className="block text-[#5BA8FF]">{PRODUCTS_LANDING_HERO.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-[34em] text-start text-[clamp(0.92rem,1.2vw,1.02rem)] font-medium leading-[1.75] text-white/88 ms-0 md:ms-[clamp(4%,10vw,18%)]">
            {PRODUCTS_LANDING_HERO.body}
          </p>

          <div className="mt-[clamp(40px,7vw,88px)] grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-4 sm:gap-y-12 md:grid-cols-4 md:gap-x-8 lg:gap-x-12">
            {PRODUCTS_LANDING_HERO_ITEMS.map((item) => (
              <Pedestal key={item.id} href={item.href} label={item.label}>
                <HeroMedia item={item} />
              </Pedestal>
            ))}
          </div>
        </div>
      </section>

      {/* 2 · Family rows — one band each, alternating surfaces */}
      {PRODUCTS_LANDING_FAMILIES.map((family) => {
        const imageFirst = family.imageSide === 'start';
        return (
          <section
            key={family.id}
            className="bg-[#F7F7F7] py-[clamp(36px,5vw,64px)] text-[#0A1020]"
            aria-labelledby={`products-family-${family.id}`}
          >
            <div className={GUTTER}>
              <article
                className={`grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 ${
                  imageFirst
                    ? ''
                    : '[&>:first-child]:lg:order-2 [&>:last-child]:lg:order-1 rtl:[&>:first-child]:lg:order-1 rtl:[&>:last-child]:lg:order-2'
                }`}
              >
                <div
                  className={`flex w-full min-w-0 items-center justify-center overflow-visible ${
                    family.id === 'scanner'
                      ? 'min-h-[160px] py-6 sm:min-h-[220px] sm:py-8 lg:min-h-[300px] lg:py-10'
                      : ''
                  }`}
                >
                  {'bottles' in family ? (
                    <div className="flex h-[min(240px,48vw)] max-h-[360px] w-full max-w-[320px] items-end justify-center sm:h-[min(300px,42vw)] lg:h-[360px] lg:max-w-none">
                      <img
                        src={family.bottles[0].src}
                        alt={family.bottles[0].alt}
                        className="relative z-[2] h-full w-auto max-w-[50%] -me-5 object-contain object-bottom drop-shadow-[0_20px_32px_rgba(10,16,32,.18)]"
                      />
                      <img
                        src={family.bottles[1].src}
                        alt=""
                        className="relative z-[1] h-[88%] w-auto max-w-[46%] -ms-5 object-contain object-bottom drop-shadow-[0_18px_28px_rgba(10,16,32,.16)]"
                      />
                    </div>
                  ) : (
                    <img
                      src={family.img}
                      alt={family.imgAlt}
                      className={`object-contain drop-shadow-[0_22px_36px_rgba(10,16,32,.14)] ${
                        family.id === 'scanner'
                          ? 'h-auto w-[min(100%,280px)] origin-center -rotate-[36deg] sm:w-[min(100%,360px)] lg:w-[min(92%,440px)]'
                          : 'h-auto w-auto max-h-[240px] max-w-full sm:max-h-[300px] lg:max-h-[360px] xl:max-h-[400px]'
                      }`}
                    />
                  )}
                </div>
                <div className="w-full min-w-0">
                  <p className="m-0 text-[12px] font-bold uppercase text-[#0050D8] sm:text-[13px] rtl:tracking-normal ltr:tracking-[0.18em]">
                    {family.index} {family.kicker}
                  </p>
                  <h2
                    id={`products-family-${family.id}`}
                    className="mt-3 text-[clamp(1.45rem,4.2vw,2.5rem)] font-bold leading-[1.18] tracking-[-0.02em] text-[#0A1020] rtl:tracking-normal"
                  >
                    {family.title}
                  </h2>
                  <p className="mt-3 text-[clamp(15px,2.8vw,17px)] font-medium leading-[1.7] text-[#5A6478]">
                    {family.body}
                  </p>
                  <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
                    {family.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-[clamp(14.5px,2.6vw,16.5px)] font-medium text-[#1A2438]"
                      >
                        <CheckIcon />
                        <span className="min-w-0">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link className={EXPLORE} href={family.href}>
                    {family.cta}
                    <ArrowIcon className="rtl:rotate-180" />
                  </Link>
                </div>
              </article>
            </div>
          </section>
        );
      })}

      {/* 3 · Workflow */}
      <section
        className="bg-[#050814] py-[clamp(44px,6.5vw,80px)] text-white"
        aria-labelledby="products-workflow-heading"
      >
        <div className={GUTTER}>
          <h2
            id="products-workflow-heading"
            className="text-center text-[clamp(1.5rem,2.7vw,2.05rem)] font-bold tracking-[-0.02em] rtl:tracking-normal"
          >
            {PRODUCTS_LANDING_WORKFLOW.title}
          </h2>
          <ol className="mt-10 flex list-none flex-col items-center gap-7 p-0 sm:mt-12 sm:gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-0">
            {PRODUCTS_LANDING_WORKFLOW.steps.map((step, i) => (
              <li
                key={step.id}
                className="flex w-full max-w-[220px] flex-col items-center lg:w-auto lg:max-w-none lg:flex-1 lg:flex-row lg:items-start"
              >
                <Link
                  href={step.href}
                  className="flex min-w-0 flex-1 flex-col items-center text-center no-underline !text-white"
                >
                  <span className="flex h-[72px] w-full items-center justify-center overflow-hidden sm:h-[84px]">
                    {'bottles' in step ? (
                      <span className="flex h-full w-[96px] max-w-full items-end justify-center sm:w-[110px]">
                        <img
                          src={step.bottles[0].src}
                          alt=""
                          className="h-full w-auto max-w-[54%] object-contain object-bottom drop-shadow-[0_10px_16px_rgba(0,0,0,.35)]"
                        />
                        <img
                          src={step.bottles[1].src}
                          alt=""
                          className="-ms-2 h-[88%] w-auto max-w-[48%] object-contain object-bottom drop-shadow-[0_10px_16px_rgba(0,0,0,.35)] sm:-ms-2.5"
                        />
                      </span>
                    ) : (
                      <img
                        src={step.img}
                        alt=""
                        className="max-h-full max-w-[96px] object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,.35)] sm:max-w-[110px]"
                      />
                    )}
                  </span>
                  <span className="mt-3 text-[13px] font-bold uppercase sm:mt-4 sm:text-[14px] rtl:tracking-normal ltr:tracking-[0.14em]">
                    {step.label}
                  </span>
                  <span className="mt-1 text-[12px] font-medium text-white/60 sm:text-[13px]">
                    {step.caption}
                  </span>
                </Link>
                {i < PRODUCTS_LANDING_WORKFLOW.steps.length - 1 ? (
                  <span
                    className="my-1 flex shrink-0 rotate-90 items-center text-white lg:mt-[28px] lg:rotate-0 lg:px-[clamp(12px,2.2vw,28px)] rtl:lg:rotate-180"
                    aria-hidden
                  >
                    <svg
                      width="36"
                      height="28"
                      viewBox="0 0 32 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-8 sm:h-7 sm:w-9 lg:h-8 lg:w-11"
                    >
                      <path d="M2 12h21.5" />
                      <path d="M20.5 9.4 26 12l-5.5 2.6" />
                    </svg>
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4 · CTA — mock: rich navy with blue stage glow (not near-black like workflow) */}
      <section className="relative overflow-hidden bg-[#001B45] bg-[radial-gradient(ellipse_85%_75%_at_78%_72%,rgba(0,80,216,.55)_0%,rgba(0,55,160,.28)_32%,transparent_62%),linear-gradient(165deg,#00102E_0%,#001B45_42%,#002157_78%,#001A4A_100%)] py-[clamp(52px,8vw,96px)] text-white">
        <div
          className={`${GUTTER} relative z-[1] grid items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10`}
        >
          <div className="min-w-0 text-center lg:text-start">
            <h2 className="mx-auto max-w-[13.5em] text-[clamp(1.5rem,4vw,2.55rem)] font-bold leading-[1.18] tracking-[-0.02em] rtl:tracking-normal lg:mx-0">
              {PRODUCTS_LANDING_CTA.titleLead}{' '}
              <span className="text-[#4F9DFF]">{PRODUCTS_LANDING_CTA.titleAccent}</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[32em] text-[clamp(14.5px,2.8vw,15.5px)] font-medium leading-[1.7] text-white/75 lg:mx-0">
              {PRODUCTS_LANDING_CTA.body}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5 max-[640px]:flex-col max-[640px]:items-stretch lg:justify-start">
              <Link className={PRODUCT_BTN_PRIMARY} href={PRODUCTS_LANDING_CTA.primary.href}>
                {PRODUCTS_LANDING_CTA.primary.label}
              </Link>
              <Link
                className={`${PRODUCT_BTN_GHOST} !bg-white hover:!bg-white`}
                href={PRODUCTS_LANDING_CTA.secondary.href}
              >
                {PRODUCTS_LANDING_CTA.secondary.label}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-[560px] overflow-x-clip px-1 sm:overflow-visible sm:px-0">
            {/* Side-by-side row — no overlap, scales with width */}
            <div className="relative z-[2] flex w-full items-end justify-center gap-[clamp(6px,2vw,18px)]">
              <img
                src={PRODUCTS_LANDING_CTA.collage[0].src}
                alt={PRODUCTS_LANDING_CTA.collage[0].alt}
                className="mb-[2%] h-auto w-[22%] min-w-0 origin-bottom -rotate-[22deg] object-contain drop-shadow-[0_10px_14px_rgba(0,0,0,.35)] rtl:rotate-[22deg]"
              />
              <img
                src={PRODUCTS_LANDING_CTA.collage[1].src}
                alt={PRODUCTS_LANDING_CTA.collage[1].alt}
                className="h-auto w-[20%] min-w-0 object-contain object-bottom drop-shadow-[0_14px_20px_rgba(0,0,0,.4)]"
              />
              <img
                src={PRODUCTS_LANDING_CTA.collage[2].src}
                alt={PRODUCTS_LANDING_CTA.collage[2].alt}
                className="h-auto w-[20%] min-w-0 object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,.38)]"
              />
              {'bottles' in PRODUCTS_LANDING_CTA.collage[3] ? (
                <div className="flex w-[18%] min-w-0 items-end justify-center">
                  <img
                    src={PRODUCTS_LANDING_CTA.collage[3].bottles[0].src}
                    alt={PRODUCTS_LANDING_CTA.collage[3].bottles[0].alt}
                    className="relative z-[2] h-auto w-[55%] -me-[10%] object-contain object-bottom drop-shadow-[0_10px_14px_rgba(0,0,0,.32)]"
                  />
                  <img
                    src={PRODUCTS_LANDING_CTA.collage[3].bottles[1].src}
                    alt=""
                    className="relative z-[1] h-auto w-[52%] object-contain object-bottom drop-shadow-[0_10px_14px_rgba(0,0,0,.32)]"
                  />
                </div>
              ) : null}
            </div>

            <div aria-hidden className="relative z-[1] -mt-[2%] aspect-[12/1] w-full">
              <span className="absolute inset-x-[10%] top-[18%] h-[70%] rounded-[50%] bg-[#0050D8] opacity-35 blur-[14px]" />
              <span className="absolute inset-x-[6%] top-[28%] h-[55%] rounded-[50%] bg-[radial-gradient(ellipse_at_50%_28%,#1a2744_0%,#070b14_68%,transparent_100%)]" />
            </div>
          </div>
        </div>
      </section>

      {/* 5 · Trust */}
      <section className="bg-white py-[clamp(36px,5.5vw,72px)]" aria-label="ODYX trust signals">
        <div className={`${GUTTER} grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4 lg:gap-6`}>
          {PRODUCTS_LANDING_TRUST.map((item) => {
            const Icon = TRUST_ICONS[item.icon];
            return (
              <div key={item.id} className="flex min-w-0 items-start gap-3.5 sm:gap-4">
                <Icon
                  className="mt-0.5 h-8 w-8 shrink-0 text-[#0050D8] sm:h-9 sm:w-9 lg:h-10 lg:w-10"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="m-0 text-[clamp(1.25rem,3.5vw,1.45rem)] font-extrabold leading-none text-[#0050D8]">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[13px] font-bold leading-snug text-[#0A1020] sm:text-[14px]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[12px] font-medium leading-snug text-[#6B7280] sm:text-[13px]">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
