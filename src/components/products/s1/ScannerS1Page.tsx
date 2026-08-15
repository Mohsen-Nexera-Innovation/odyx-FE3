import Link from 'next/link';
import S1Video from '@/components/products/s1/S1Video';
import { APP_ICONS, CheckIcon, WHY_ICONS } from '@/components/products/s1/S1Icons';
import {
  S1_AI_FEATURES,
  S1_APPLICATIONS,
  S1_CASES,
  S1_COMPATIBLE,
  S1_LANDING_HERO,
  S1_REVIEW,
  S1_TECH_FEATURES,
  S1_WHY,
} from '@/content/scanner-landing';

const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";
const GUTTER = 'w-full mx-auto px-[clamp(20px,4vw,56px)]';
const BODY_RAIL = `${GUTTER} max-w-[80%] max-[800px]:max-w-none`;
const BTN =
  `inline-flex items-center justify-center gap-2 px-[22px] py-[13px] rounded-[10px] text-[.92rem] font-bold no-underline transition-[background,color,border-color,transform,box-shadow] duration-[220ms] ease-[ease] max-[640px]:w-full max-[640px]:rounded-xl`;
const BTN_PRIMARY =
  `${BTN} bg-[#0050D8] text-white border-0 shadow-none hover:-translate-y-px hover:text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)] motion-reduce:hover:translate-y-0`;
const BTN_GHOST =
  `${BTN} group bg-[rgba(255,255,255,.72)] text-[#0050D8] border-[1.5px] border-solid border-[#0050D8] hover:bg-white hover:text-[#0041AF] hover:border-[#0041AF]`;
const CARD_TITLE = `${DISPLAY} m-0 mb-4 text-[1.2rem] font-bold tracking-[-0.02em] text-[#0050D8]`;
const CHECK_ROW =
  'flex items-center gap-2.5 text-[.92rem] font-medium leading-[1.35] text-[#1a2438] transition-[transform,color] duration-[220ms] ease-[ease] hover:translate-x-[3px] hover:text-[#0d1b4d] motion-reduce:hover:translate-x-0';
const WHY_DELAY = [
  'delay-[20ms]',
  'delay-[70ms]',
  'delay-[120ms]',
  'delay-[170ms]',
  'delay-[220ms]',
] as const;
const COMPAT_DELAY = ['delay-[40ms]', 'delay-[120ms]', 'delay-[200ms]'] as const;
const CASE_DELAY = [
  'delay-[40ms]',
  'delay-[100ms]',
  'delay-[160ms]',
  'delay-[220ms]',
] as const;

function Stars() {
  return (
    <div className="flex gap-[3px] text-[#f5b400]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" aria-hidden>
          <path
            fill="currentColor"
            d="M10 1.8l2.4 5 5.5.5-4.2 3.6 1.3 5.3L10 13.6l-4.9 2.6 1.3-5.3L2.1 7.3l5.5-.5L10 1.8z"
          />
        </svg>
      ))}
    </div>
  );
}

function SectionRule({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-[18px]">
      <span className="h-px flex-1 bg-[#d5dceb]" aria-hidden />
      <h2
        className={`${DISPLAY} m-0 whitespace-nowrap text-[clamp(1.2rem,1.8vw,1.35rem)] font-bold tracking-[-0.02em] text-[#0d1b4d]`}
      >
        {children}
      </h2>
      <span className="h-px flex-1 bg-[#d5dceb]" aria-hidden />
    </div>
  );
}

export default function ScannerS1Page() {
  const hero = S1_LANDING_HERO;

  return (
    <main
      id="top"
      data-s1-landing
      className={`${SANS} relative isolate pb-[clamp(36px,5vh,56px)] text-[#1a2438] [background:radial-gradient(ellipse_55%_50%_at_82%_6%,rgba(0,80,216,.06),transparent_65%),radial-gradient(ellipse_40%_40%_at_8%_0%,rgba(0,80,216,.04),transparent_60%),#f1f7fe]`}
    >
      <style>{`
        @keyframes s1-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        body:has([data-s1-landing]),
        body:has([data-s1-landing]) .site-bg,
        body:has([data-s1-landing]) main{
          background:#f1f7fe !important;
        }
        @media (prefers-reduced-motion:reduce){
          [data-s1-landing] .s1-hero-float{animation:none}
        }
      `}</style>

      <section
        className="overflow-hidden bg-transparent pt-[clamp(100px,12vh,120px)] pb-[clamp(22px,3vh,32px)] max-[800px]:pt-[clamp(92px,12vh,110px)] max-[800px]:pb-[clamp(20px,2.5vh,28px)]"
        data-hero-light
        aria-label="ODYX-S1 Intraoral Scanner"
      >
        <div
          className={`${GUTTER} [display:grid] items-center gap-[clamp(12px,2vw,28px)] [grid-template-columns:minmax(0,0.95fr)_minmax(0,1.15fr)] max-[800px]:grid-cols-1`}
        >
          <div className="relative z-[2] bg-transparent">
            <h1
              className={`${DISPLAY} m-0 mb-2 text-[clamp(2.6rem,5.6vw,3.8rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#00034c]`}
            >
              {hero.title}
            </h1>
            <p
              className={`${DISPLAY} mb-2.5 text-[clamp(1.15rem,2vw,1.45rem)] font-bold tracking-[-0.01em] text-[#282da9]`}
            >
              {hero.subtitle}
            </p>
            <p
              className={`${DISPLAY} mb-3.5 text-[clamp(1.05rem,1.6vw,1.22rem)] font-bold tracking-[-0.015em] text-[#0d1b4d]`}
            >
              {hero.tagline}
            </p>
            <p className="mb-[26px] max-w-[40ch] text-[.98rem] font-normal leading-[1.55] text-[#6b7385]">
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3 max-[640px]:flex-col max-[640px]:items-stretch">
              <Link className={BTN_PRIMARY} href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <span aria-hidden>→</span>
              </Link>
              <a className={BTN_GHOST} href={hero.secondaryCta.href}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                  className="transition-transform duration-[220ms] ease-[ease] group-hover:translate-y-[2px]"
                >
                  <path
                    d="M12 4v12M6 12l6 6 6-6M5 20h14"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="relative isolate m-0 flex h-full min-h-[clamp(260px,38vh,420px)] w-full max-h-[min(440px,48vh,calc(100vh-170px))] items-center justify-center overflow-visible bg-transparent max-[1100px]:max-h-[min(360px,42vh,calc(100vh-180px))] max-[1100px]:min-h-[clamp(240px,34vh,340px)] max-[1100px]:justify-self-center max-[800px]:order-first max-[800px]:mx-auto max-[800px]:w-[min(100%,520px)] max-[800px]:min-h-[220px] max-[800px]:max-h-[min(280px,36vh,calc(100vh-200px))]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="s1-hero-float relative z-[1] block h-full w-full max-h-full max-w-full bg-transparent object-contain object-right motion-reduce:animate-none max-[1100px]:object-center"
              style={{ animation: 's1-float 6.5s ease-in-out infinite' }}
              src={`${hero.img}?v=waves4`}
              alt={hero.imgAlt}
              width={1200}
              height={800}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="py-[clamp(20px,2.8vh,30px)]">
        <div className={BODY_RAIL}>
          <SectionRule>Why S1?</SectionRule>
          <ul className="m-0 [display:grid] list-none grid-cols-5 gap-3.5 p-0 max-[1100px]:gap-2.5 max-[900px]:grid-cols-3 max-[900px]:gap-3 max-[640px]:grid-cols-2">
            {S1_WHY.map((item, i) => (
              <li
                key={item.id}
                className={`group reveal flex min-h-[150px] flex-col items-center justify-center gap-3.5 rounded-[14px] border-4 border-white bg-[#f1f7fe] px-3 py-[22px] pb-[18px] text-center text-[#111827] shadow-none transition-[transform,border-color] duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] ${WHY_DELAY[i]} hover:-translate-y-1 motion-reduce:hover:translate-y-0`}
              >
                <span className="[display:grid] size-16 place-items-center text-[#0050D8] transition-transform duration-[350ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08] motion-reduce:group-hover:scale-100 max-[1100px]:size-14 max-[900px]:size-[60px] max-[800px]:size-[54px] [&_img]:block [&_img]:size-full [&_img]:object-contain">
                  {WHY_ICONS[item.id]}
                </span>
                <span
                  className={`${DISPLAY} max-w-[13ch] text-[.86rem] font-bold leading-tight tracking-[-0.01em] text-[#111827] max-[1100px]:text-[.8rem] max-[900px]:text-[.88rem]`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-[clamp(20px,2.8vh,30px)]">
        <div className={BODY_RAIL}>
          <div className="[display:grid] w-full auto-rows-[minmax(240px,auto)] grid-cols-2 items-stretch gap-3.5 bg-transparent max-[800px]:grid-cols-1">
            <div className="reveal flex h-full min-h-[240px] flex-col rounded-2xl border-4 border-white bg-[#f1f7fe] px-[18px] py-4 shadow-none delay-[40ms] transition-transform duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 max-[800px]:min-h-0">
              <h2 className={`${CARD_TITLE} mb-2.5`}>Applications</h2>
              <ul className="m-0 [display:grid] flex-1 list-none grid-cols-2 content-center gap-x-3.5 gap-y-4 p-0 max-[640px]:grid-cols-1">
                {S1_APPLICATIONS.map((app) => (
                  <li key={app.id} className="flex items-start gap-2.5 p-0">
                    <span className="[display:grid] size-12 shrink-0 place-items-center text-[#0050D8]">
                      {APP_ICONS[app.id]}
                    </span>
                    <div className="flex min-w-0 flex-col items-start gap-[5px]">
                      <span className={`${DISPLAY} text-[.92rem] font-bold leading-tight tracking-[-0.01em] text-[#0d1b4d]`}>
                        {app.label}
                      </span>
                      <span className="inline-flex items-center justify-center rounded-full border border-[rgba(0,80,216,.35)] bg-[rgba(0,80,216,.08)] px-2 py-0.5 text-[.64rem] font-bold tracking-[0.04em] text-[#0041AF]">
                        {app.badge}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <S1Video />
          </div>
        </div>
      </section>

      <section className="py-[clamp(20px,2.8vh,30px)]">
        <div className={BODY_RAIL}>
          <div className="reveal w-full rounded-2xl border-4 border-white bg-[#f1f7fe] px-[clamp(22px,2.4vw,30px)] py-[clamp(24px,2.6vw,32px)] shadow-none transition-transform duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0">
            <div className="[display:grid] grid-cols-2 items-start gap-0 max-[800px]:grid-cols-1">
              <div className="min-w-0 pr-[clamp(22px,2.8vw,36px)] border-r border-[#d5dceb] max-[800px]:mb-[22px] max-[800px]:border-r-0 max-[800px]:border-b max-[800px]:pr-0 max-[800px]:pb-[22px]">
                <h2 className={`${CARD_TITLE} mb-[18px]`}>AI-Powered Features</h2>
                <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
                  {S1_AI_FEATURES.map((f) => (
                    <li key={f} className={CHECK_ROW}>
                      <span className="m-0 [display:grid] size-5 shrink-0 place-items-center rounded-full bg-transparent text-[#0050D8] shadow-none" aria-hidden>
                        <CheckIcon />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 pl-[clamp(22px,2.8vw,36px)] max-[800px]:pl-0">
                <h2 className={`${CARD_TITLE} mb-[18px]`}>Technical Features</h2>
                <ul className="m-0 [display:grid] list-none grid-cols-2 grid-rows-4 grid-flow-col content-start gap-x-7 gap-y-3.5 p-0 max-[800px]:grid-flow-row max-[800px]:grid-cols-1 max-[800px]:grid-rows-none">
                  {S1_TECH_FEATURES.map((f) => (
                    <li key={f.label} className={CHECK_ROW}>
                      <span className="m-0 [display:grid] size-5 shrink-0 place-items-center rounded-full bg-transparent text-[#0050D8] shadow-none" aria-hidden>
                        <CheckIcon />
                      </span>
                      <span className="font-medium">{f.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-[clamp(20px,2.8vh,30px)]">
        <div className={BODY_RAIL}>
          <SectionRule>Compatible Products</SectionRule>
          <ul className="m-0 [display:grid] list-none grid-cols-3 gap-3.5 p-0 max-[900px]:grid-cols-1">
            {S1_COMPATIBLE.map((p, i) => (
              <li
                key={p.name}
                className={`reveal m-0 min-h-0 overflow-hidden rounded-2xl border-4 border-white bg-[#f1f7fe] p-0 shadow-none transition-[transform,border-color] duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] ${COMPAT_DELAY[i]} hover:-translate-y-1 hover:border-white motion-reduce:hover:translate-y-0`}
              >
                <Link
                  href={p.href}
                  className="group [display:grid] h-full min-h-[112px] grid-cols-[minmax(96px,44%)_minmax(0,1fr)] items-center gap-x-2.5 gap-y-1.5 py-2 pr-3.5 pl-1.5 no-underline text-inherit max-[640px]:min-h-[100px] max-[640px]:py-2 max-[640px]:pr-3 max-[640px]:pl-1.5"
                >
                  <span className="flex h-full min-h-24 w-full items-center justify-center overflow-visible bg-transparent p-0 max-[640px]:min-h-[88px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${p.img}?v=cut2`}
                      alt=""
                      loading="lazy"
                      className="block h-full max-h-[100px] w-full bg-transparent object-contain object-bottom mix-blend-normal transition-transform duration-[400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06] group-hover:-translate-y-0.5 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:translate-y-0 max-[640px]:max-h-[90px]"
                    />
                  </span>
                  <span className="flex min-w-0 flex-col items-start justify-center gap-0.5 pr-0.5">
                    <p className={`${DISPLAY} m-0 text-[.98rem] font-bold leading-tight tracking-[-0.015em] text-[#0d1b4d] transition-colors duration-[220ms] ease-[ease] group-hover:text-[#0050D8]`}>
                      {p.name}
                    </p>
                    {p.category ? (
                      <p className="m-0 text-[.8rem] font-medium leading-[1.25] text-[#6b7385]">{p.category}</p>
                    ) : null}
                    <span className="mt-1 inline-block text-[.82rem] font-semibold text-[#0050D8] transition-[color,transform] duration-[220ms] ease-[ease] group-hover:translate-x-[3px] group-hover:text-[#0041AF] motion-reduce:group-hover:translate-x-0">
                      Learn more &gt;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-[clamp(20px,2.8vh,30px)] pb-[clamp(36px,5vh,52px)]">
        <div className={GUTTER}>
          <SectionRule>Clinical Cases &amp; Reviews</SectionRule>
          <ul className="m-0 [display:grid] list-none grid-cols-4 items-stretch gap-3.5 p-0 max-[1100px]:grid-cols-2 max-[640px]:grid-cols-1">
            {S1_CASES.map((c, i) => (
              <li
                key={c.title}
                className={`group reveal flex min-h-full flex-col overflow-hidden rounded-2xl border-4 border-white bg-[#f1f7fe] pb-4 shadow-none transition-transform duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] ${CASE_DELAY[i]} hover:-translate-y-1 motion-reduce:hover:translate-y-0`}
              >
                <figure className="m-0 aspect-[16/11] overflow-hidden bg-[rgba(255,255,255,.5)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    className="block size-full object-cover transition-transform duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                </figure>
                <h3 className={`${DISPLAY} mx-4 mt-3.5 mb-1.5 text-base font-bold text-[#0d1b4d]`}>{c.title}</h3>
                <p className="mx-4 mb-2.5 flex-1 text-[.86rem] leading-[1.45] text-[#6b7385]">{c.body}</p>
                <cite className="mx-4 mb-2 block text-[.84rem] font-semibold not-italic text-[#1a2438]">
                  — {c.author}
                </cite>
                <div className="mx-4">
                  <Stars />
                </div>
              </li>
            ))}
            <li
              className={`reveal flex min-h-full flex-col overflow-hidden rounded-2xl border-4 border-white bg-[#f1f7fe] px-[18px] py-[22px] shadow-none transition-transform duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] ${CASE_DELAY[3]} hover:-translate-y-1 motion-reduce:hover:translate-y-0`}
            >
              <span className="text-[3.2rem] font-extrabold leading-[.85] text-[#0050D8]" aria-hidden>
                “
              </span>
              <blockquote className="mb-3.5 flex-1 text-[.92rem] leading-[1.5] italic text-[#6b7385]">
                {S1_REVIEW.quote}
              </blockquote>
              <cite className="mb-2 block text-[.84rem] font-semibold not-italic text-[#1a2438]">
                — {S1_REVIEW.author}
              </cite>
              <Stars />
            </li>
          </ul>
          <div className="mt-[22px] flex justify-center">
            <Link className={`${BTN_PRIMARY} min-w-[220px] px-[26px] py-3`} href="/learning">
              View More Cases
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
