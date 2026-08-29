import Link from 'next/link';
import type { ReactNode } from 'react';
import BeforeAfterSlider from '@/components/clinical/BeforeAfterSlider';
import {
  CLINICAL_BADGE_ACCENTS,
  type ClinicalIndicationContent,
} from '@/content/clinical-indication-types';
import ClinicalCanvas from '@/components/solutions/ClinicalCanvas';

const INTER =
  "[font-family:var(--font-inter),'Inter',ui-sans-serif,system-ui,sans-serif]";
const WRAP = 'w-full max-w-none mx-auto px-[clamp(20px,4vw,56px)]';
const SEC_TITLE =
  `${INTER} m-0 mb-4 text-left text-[clamp(1.25rem,1.6vw,1.375rem)] font-bold tracking-[-0.02em] text-[#111827]`;
const CARD =
  'rounded-2xl border border-solid border-[#e8ebf2] bg-white p-[clamp(18px,2vw,22px)] shadow-[0_6px_18px_rgba(20,40,80,.04)]';
const CARD_TITLE = `${INTER} m-0 mb-3.5 text-left text-[1.25rem] font-bold tracking-[-0.02em] text-[#111827]`;
const PROD =
  'flex min-h-full flex-col items-center gap-2.5 rounded-[14px] border border-solid border-[#e8ebf2] bg-white px-3 pt-[18px] pb-4 text-center text-inherit no-underline shadow-[0_4px_14px_rgba(20,40,80,.04)] transition-[transform,box-shadow] duration-[250ms] ease-in-out';
const PROD_HOVER = 'hover:-translate-y-[3px] hover:shadow-[0_12px_28px_rgba(20,40,80,.1)]';

/** Why ODYX icons — blue outline line-art */
const WHY_ICONS: Record<string, ReactNode> = {
  'one-visit': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 7.2V12l3.4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  strength: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path
        d="M12 3.2c2.6 2.2 4.2 5.1 4.2 8.1a4.2 4.2 0 0 1-8.4 0c0-3 1.6-5.9 4.2-8.1z"
        strokeLinejoin="round"
      />
      <path d="M9.4 15.6c.8 1.6 1.7 2.9 2.6 3.7.9-.8 1.8-2.1 2.6 3.7" strokeLinecap="round" />
    </svg>
  ),
  connected: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="6.2" cy="12" r="2.3" />
      <circle cx="17.8" cy="6.8" r="2.3" />
      <circle cx="17.8" cy="17.2" r="2.3" />
      <path d="M8.4 11.1 15.5 7.8M8.4 12.9l7.1 3.3" strokeLinecap="round" />
    </svg>
  ),
  roi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M4.5 18.5V6.5M4.5 18.5H19" strokeLinecap="round" />
      <path d="M7.5 14.2 11 10l3 2.4L17.8 7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17.8" cy="7" r="1.35" fill="currentColor" stroke="none" />
    </svg>
  ),
};

/** Square checkbox mark — Clinical Tips (not circular / radio-style) */
function TipCheck() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden className="block size-[18px]">
      <rect x="1" y="1" width="18" height="18" rx="3" fill="rgba(0,80,216,.10)" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 10.2 8.6 13.2 14.7 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ProductCardBody({ name, sub, img }: { name: string; sub: string; img: string }) {
  return (
    <>
      <span className="relative isolate aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] max-[560px]:aspect-[4/5]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt=""
          className="relative z-[1] block size-full min-h-0 min-w-0 object-contain object-center px-[10%] py-[12%] drop-shadow-[0_8px_14px_rgba(0,0,0,.12)]"
        />
      </span>
      <span className="flex flex-col items-center gap-0.5">
        <strong className={`${INTER} text-[0.9375rem] font-bold leading-[1.25] tracking-[-0.015em] text-[#111827]`}>
          {name}
        </strong>
        <span className="text-[0.8125rem] font-normal leading-[1.3] text-[#8b93a3]">{sub}</span>
      </span>
    </>
  );
}

/** Shared clinical indication detail — Same-Day Crown chrome; content/images only vary. */
export default function ClinicalIndicationPage({ data }: { data: ClinicalIndicationContent }) {
  const d = data;
  const badge = CLINICAL_BADGE_ACCENTS[d.category];

  return (
    <div className={`${INTER} min-h-dvh overflow-x-clip bg-[#f7f8fb] text-[16px] font-normal text-[#5b6475] antialiased`}>
      <ClinicalCanvas color="#f7f8fb" />
      <section
        className="relative overflow-hidden bg-[#05070c] pt-[clamp(96px,11vh,118px)] pb-[clamp(28px,4vw,40px)] text-white"
        data-hero-dark
      >
        <div
          className={`${WRAP} grid min-h-[clamp(300px,38vh,420px)] grid-cols-[minmax(280px,.92fr)_minmax(300px,1.2fr)] items-center gap-[clamp(12px,2.5vw,28px)] max-[1100px]:min-h-0 max-[1100px]:grid-cols-1 max-[1100px]:gap-5`}
        >
          <div className="relative z-[2] max-w-[38ch] max-[1100px]:max-w-none">
            <p
              className={`${INTER} mb-[18px] inline-flex items-center gap-[7px] rounded-full py-[5px] pr-3 pl-2 text-[0.6875rem] font-bold leading-[1.2] tracking-[0.08em] text-white uppercase`}
              style={{ background: badge }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="size-[13px]">
                <path
                  d="M12 3c2.5 2.2 4 5.2 4 8.2A4 4 0 0 1 8 11.2C8 8.2 9.5 5.2 12 3z"
                  strokeLinejoin="round"
                />
              </svg>
              {d.hero.badge}
            </p>
            <h1 className={`${INTER} m-0 mb-3.5 text-[clamp(2.75rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white`}>
              {d.hero.title}
            </h1>
            <p className="mb-3 text-[clamp(1.2rem,1.7vw,1.4rem)] font-semibold leading-[1.3] tracking-[-0.015em] text-white/95">
              {d.hero.subtitle}
            </p>
            <p className="mb-[26px] max-w-[36ch] text-[clamp(1rem,1.15vw,1.125rem)] font-normal leading-[1.55] text-[rgba(226,232,240,.78)]">
              {d.hero.body}
            </p>
            <Link
              href={d.hero.cta.href}
              className={`${INTER} inline-flex max-w-full items-center justify-center gap-[9px] rounded-full border-0 bg-[#0050D8] px-5 py-[13px] text-[0.9375rem] font-semibold tracking-[-0.01em] text-white no-underline shadow-[0_10px_24px_rgba(0,80,216,.28)] transition-[background,transform] duration-200 ease-in-out hover:-translate-y-px hover:bg-[#0041AF]`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="size-4">
                <path d="M12 4v10M8 10l4 4 4-4M5 18h14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d.hero.cta.label}
            </Link>
          </div>
          <figure className="relative m-0 w-full max-w-[620px] justify-self-end overflow-visible rounded-none bg-transparent shadow-none max-[1100px]:max-w-[480px] max-[1100px]:justify-self-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={d.hero.img}
              alt={d.hero.imgAlt}
              className="block h-auto max-h-[min(420px,52vh)] w-full object-contain object-right drop-shadow-[0_18px_28px_rgba(0,0,0,.35)] max-[1100px]:max-h-[min(320px,46vh)] max-[1100px]:object-center"
            />
          </figure>
        </div>
      </section>

      <div className="flex flex-col gap-[clamp(28px,4vw,40px)] pt-[clamp(28px,4vw,40px)] pb-[clamp(48px,6vw,72px)]">
      <section>
        <div className={WRAP}>
          <h2 className={SEC_TITLE}>{d.productsTitle}</h2>
          <div className="grid grid-cols-5 gap-3 max-[1100px]:grid-cols-3 max-[800px]:grid-cols-2 max-[560px]:grid-cols-1">
            {d.products.map((p) => {
              const body = <ProductCardBody name={p.name} sub={p.sub} img={p.img} />;
              return p.dimmed ? (
                <span
                  key={p.id}
                  className={`${PROD} pointer-events-none cursor-not-allowed opacity-40 grayscale-[.2]`}
                  aria-disabled="true"
                  title="Coming soon"
                >
                  {body}
                </span>
              ) : (
                <Link key={p.id} href={p.href} className={`${PROD} ${PROD_HOVER}`}>
                  {body}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section>
        <div className={WRAP}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <h2 className={`${SEC_TITLE} mb-0`}>{d.timeline.title}</h2>
            <p className={`${INTER} inline-flex items-center gap-[7px] text-[0.875rem] font-medium text-[#111827]`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
                className="size-[15px] text-[#8b93a3]"
              >
                <circle cx="12" cy="12" r="8.5" />
                <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {d.timeline.total}
            </p>
          </div>
          <ol className="m-0 grid w-full min-w-0 list-none grid-cols-5 gap-3 p-0 max-[1023px]:grid-cols-1 max-[1023px]:gap-0">
            {d.timeline.steps.map((s, i) => {
              const last = i === d.timeline.steps.length - 1;
              const img = (
                <span className="relative z-[1] grid size-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f3f5f8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="block size-[86%] object-contain object-center" />
                </span>
              );
              const num = (
                <span
                  className={`${INTER} z-[1] grid size-[26px] place-items-center rounded-full bg-[#0050D8] text-[0.75rem] font-bold text-white`}
                >
                  {s.n}
                </span>
              );
              const copy = (
                <>
                  <strong className={`${INTER} text-[0.9375rem] font-bold tracking-[-0.015em] text-[#111827]`}>
                    {s.title}
                  </strong>
                  <p className="m-0 text-[0.8125rem] font-normal leading-[1.4] text-[#5b6475] min-[1024px]:max-w-[20ch]">
                    {s.body}
                  </p>
                  <span className={`${INTER} inline-flex rounded-full bg-[#eef1f6] px-[11px] py-1 text-[0.75rem] font-medium text-[#111827]`}>
                    {s.time}
                  </span>
                </>
              );
              return (
                <li key={s.n} className="relative min-w-0 w-full p-0 text-left">
                  <div className="flex gap-3.5 min-[1024px]:hidden">
                    <div className="flex w-16 shrink-0 flex-col items-center self-stretch">
                      {num}
                      <span className="mt-2">{img}</span>
                      {!last ? (
                        <span className="mt-2 w-0.5 min-h-[20px] flex-1 bg-[#0050D8]" aria-hidden />
                      ) : null}
                    </div>
                    <div className={`flex min-w-0 flex-1 flex-col items-start gap-1.5 pt-0.5 ${last ? 'pb-0' : 'pb-5'}`}>{copy}</div>
                  </div>
                  <div className="hidden min-[1024px]:flex min-[1024px]:flex-col min-[1024px]:items-start min-[1024px]:gap-2">
                    {num}
                    <div className="relative flex w-full min-w-0 items-center">
                      {img}
                      {!last ? (
                        <span
                          className="relative ml-2 flex h-[2px] w-[clamp(2rem,5vw,3.25rem)] shrink-0 items-center bg-[#0050D8] min-[1280px]:ml-2.5 min-[1280px]:h-0.5 min-[1280px]:w-auto min-[1280px]:min-w-3 min-[1280px]:flex-1 min-[1280px]:-mr-3"
                          aria-hidden
                        >
                          <span className="absolute top-1/2 right-0 h-0 w-0 -translate-y-1/2 translate-x-[1px] border-y-[4px] border-l-[6px] border-y-transparent border-l-[#0050D8] min-[1280px]:border-y-[5px] min-[1280px]:border-l-[7px]" />
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-0.5 flex flex-col items-start gap-1.5">{copy}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section>
        <div className={`${WRAP} grid grid-cols-[1.2fr_.9fr] items-stretch gap-3.5 max-[1100px]:grid-cols-1`}>
          <BeforeAfterSlider title={d.beforeAfter.title} slides={d.beforeAfter.slides} />
          <div className={CARD}>
            <h2 className={CARD_TITLE}>{d.why.title}</h2>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {d.why.items.map((item) => (
                <li key={item.id} className="grid grid-cols-[44px_1fr] items-center gap-3 rounded-xl bg-[#f3f5f9] p-3.5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[11px] border border-solid border-[rgba(0,80,216,.22)] bg-white text-[#0050D8]">
                    <span className="[&_svg]:size-[22px]">{WHY_ICONS[item.id] ?? WHY_ICONS.connected}</span>
                  </span>
                  <span className="min-w-0">
                    <strong className={`${INTER} mb-[3px] block text-[0.9375rem] font-bold tracking-[-0.015em] text-[#111827]`}>
                      {item.title}
                    </strong>
                    <span className="block text-[0.8125rem] font-normal leading-[1.4] text-[#5b6475]">{item.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className={`${WRAP} grid grid-cols-3 items-stretch gap-3.5 max-[1100px]:grid-cols-1`}>
          <div className={`${CARD} h-full`}>
            <h2 className={CARD_TITLE}>{d.params.title}</h2>
            <table className={`${INTER} w-full min-w-0 border-collapse text-[0.875rem]`}>
              <tbody>
                {d.params.rows.map((row) => (
                  <tr key={row.label} className="even:bg-[#f3f5f9]">
                    <th
                      scope="row"
                      className={`${INTER} min-w-0 border-0 px-3 py-2.5 text-left align-middle font-semibold break-words text-[#111827]`}
                    >
                      {row.label}
                    </th>
                    <td className={`${INTER} min-w-0 border-0 px-3 py-2.5 text-right align-middle font-normal break-words text-[#5b6475]`}>
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`${CARD} h-full`}>
            <h2 className={CARD_TITLE}>{d.tips.title}</h2>
            <ul className="m-0 flex list-none flex-col gap-3.5 p-0">
              {d.tips.items.map((tip) => (
                <li
                  key={tip}
                  className={`${INTER} grid grid-cols-[20px_1fr] items-start gap-2.5 text-[0.875rem] font-normal leading-[1.4] text-[#111827]`}
                >
                  <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-none bg-transparent text-[#0050D8]" aria-hidden>
                    <TipCheck />
                  </span>
                  <span className="min-w-0 break-words">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${CARD} h-full`}>
            <h2 className={CARD_TITLE}>{d.realCase.title}</h2>
            <div className="grid grid-cols-[1fr_1.05fr] items-start gap-3 max-[1100px]:grid-cols-1">
              <div>
                <p className="mb-3 text-[0.875rem] font-normal leading-[1.5] text-[#5b6475]">{d.realCase.body}</p>
                <Link
                  href={d.realCase.videoHref}
                  className={`${INTER} inline-flex items-center gap-1.5 text-[0.875rem] font-semibold tracking-[-0.01em] text-[#0050D8] no-underline hover:text-[#0041AF]`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-[13px]">
                    <path d="M8 5.5v13l11-6.5-11-6.5z" />
                  </svg>
                  {d.realCase.videoLabel}
                </Link>
              </div>
              <Link
                href={d.realCase.videoHref}
                className="relative m-0 block aspect-[16/11] overflow-hidden rounded-xl bg-[#f3f5f9]"
                aria-label={d.realCase.videoLabel}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.realCase.thumb} alt={d.realCase.thumbAlt} className="block size-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-[rgba(10,16,28,.16)]">
                  <span className="grid size-[46px] place-items-center rounded-full bg-[rgba(255,255,255,.94)] text-[#0050D8] shadow-[0_8px_20px_rgba(0,0,0,.16)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="ml-0.5 size-[17px]">
                      <path d="M8 5.5v13l11-6.5-11-6.5z" />
                    </svg>
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
