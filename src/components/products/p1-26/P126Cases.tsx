'use client';

import Link from 'next/link';
import { Fragment, useState } from 'react';
import { P1_26_CASE_TABS } from '@/content/p1-26';

const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";
const BTN =
  'inline-flex items-center justify-center gap-2 rounded-full px-[22px] py-[11px] text-[.9rem] font-semibold tracking-[0.01em] no-underline transition-[background,color,border-color,transform,box-shadow] duration-[220ms] ease-[ease] max-[640px]:w-full';

type CaseTabId = (typeof P1_26_CASE_TABS)[number]['id'];

const CASE_CHEVRON = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="block size-4">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function P126Cases() {
  const [active, setActive] = useState<CaseTabId>(P1_26_CASE_TABS[0].id);
  const tab = P1_26_CASE_TABS.find((t) => t.id === active) ?? P1_26_CASE_TABS[0];

  return (
    <div className="reveal flex h-full flex-col rounded-[18px] border-4 border-solid border-white bg-transparent p-[clamp(16px,1.8vw,22px)]">
      <h2
        className={`${DISPLAY} m-0 mb-2.5 text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`}
      >
        Clinical Cases
      </h2>
      <div
        className="mb-[18px] flex w-full flex-nowrap items-stretch justify-between gap-0 border-b border-solid border-[#dce2ee] max-[1100px]:flex-wrap"
        role="tablist"
        aria-label="Case indication"
      >
        {P1_26_CASE_TABS.map((t) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(t.id)}
              className={`${SANS} relative min-w-0 flex-[1_1_0] cursor-pointer border-0 bg-transparent px-1 py-[10px] pb-3 text-center text-[clamp(.78rem,1.05vw,.9rem)] transition-colors duration-200 ease-[ease] max-[1100px]:flex-[1_1_30%] max-[1100px]:whitespace-normal ${
                selected
                  ? 'font-bold whitespace-nowrap text-[#0050D8] after:absolute after:bottom-[-1px] after:left-[10%] after:right-[10%] after:h-0.5 after:rounded-sm after:bg-[#0050D8] after:content-[""]'
                  : 'font-semibold whitespace-nowrap text-[#5a6574] hover:text-[#0050D8]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        className="p126-case-fade mb-[18px] flex items-center justify-between gap-0 [animation:p126-fade_.35s_ease] max-[640px]:flex-col"
        key={tab.id}
        role="tabpanel"
      >
        {tab.steps.map((step, i) => (
          <Fragment key={step.label}>
            <div className="group flex min-w-0 flex-[1_1_0] flex-col items-center gap-2 text-center">
              <figure className="m-0 aspect-square max-h-[148px] w-full overflow-hidden rounded-xl border border-solid border-[#dce2ee] bg-[rgba(255,255,255,.45)] max-[640px]:aspect-video max-[640px]:max-h-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.img}
                  alt={step.alt}
                  loading="lazy"
                  className="block size-full object-cover transition-transform duration-[400ms] ease-[ease] group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
                />
              </figure>
              <p
                className={`${SANS} m-0 text-[.78rem] font-semibold leading-[1.25] text-[#2c3444]`}
              >
                {step.label}
              </p>
            </div>
            {i < tab.steps.length - 1 ? (
              <span
                className="pointer-events-none mx-0.5 mb-[1.6em] flex size-[22px] shrink-0 items-center justify-center self-center text-[#0050D8] max-[800px]:hidden"
                aria-hidden
              >
                {CASE_CHEVRON}
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
      <Link
        href="/learning"
        className={`${SANS} ${BTN} mt-auto w-fit self-center border-0 bg-[#0050D8] text-white shadow-none hover:-translate-y-px hover:text-white hover:shadow-[0_10px_28px_rgba(0,80,216,.35)] motion-reduce:hover:translate-y-0`}
      >
        View More Cases
      </Link>
    </div>
  );
}
