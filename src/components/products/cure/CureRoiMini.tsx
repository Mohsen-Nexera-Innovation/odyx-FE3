'use client';

import { useMemo, useState } from 'react';
import { CURE_UV02_ROI } from '@/content/cure-uv02';

const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";

function compactQty(n: number) {
  if (!Number.isFinite(n) || n <= 0) return '0';
  if (n < 1_000_000) return Math.round(n).toLocaleString('en-US');
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(n);
}

function formatLe(n: number) {
  if (!Number.isFinite(n) || n <= 0) return 'L.E 0';
  return `L.E ${compactQty(n)}`;
}

function formatHours(mins: number) {
  if (!Number.isFinite(mins) || mins <= 0) return '0 h';
  const h = mins / 60;
  if (h < 10) return `${Math.round(h * 10) / 10} h`;
  if (h < 1_000_000) return `${Math.round(h).toLocaleString('en-US')} h`;
  return `${compactQty(h)} h`;
}

const resultValueCls =
  `${DISPLAY} max-w-full min-w-0 text-[clamp(1rem,1.5vw,1.55rem)] font-extrabold leading-[1.2] text-[#0050D8] [overflow-wrap:anywhere] [word-break:break-word]`;

const inputCls =
  `${SANS} h-[42px] min-w-0 w-full appearance-none rounded-lg border border-solid border-[#d5dce8] bg-white px-3 text-left text-[.9rem] font-semibold text-[#1a2433] transition-[border-color,box-shadow] duration-200 ease-[ease] [appearance:textfield] [-moz-appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,.14)] focus:outline-none`;

const labelCls =
  `${SANS} block self-end overflow-hidden text-ellipsis whitespace-nowrap p-0 m-0 text-left text-[.74rem] font-semibold leading-[1.25] text-[#2c3444] max-[800px]:whitespace-normal`;

export default function CureRoiMini() {
  const [monthly, setMonthly] = useState(CURE_UV02_ROI.defaultMonthly);
  const [minutes, setMinutes] = useState(CURE_UV02_ROI.defaultMinutes);
  const [hourly, setHourly] = useState(CURE_UV02_ROI.defaultHourly);

  const timeMins = useMemo(() => Math.max(0, monthly * minutes), [monthly, minutes]);
  const cost = useMemo(
    () => Math.max(0, (timeMins / 60) * Math.max(0, hourly)),
    [timeMins, hourly],
  );

  return (
    <div
      className="reveal in flex min-h-[280px] min-w-0 flex-col overflow-hidden rounded-[18px] border border-solid border-[rgba(30,50,90,.08)] bg-white p-[clamp(18px,2vw,26px)] shadow-[0_10px_28px_rgba(20,40,80,.06)]"
      id="roi"
    >
      <h2
        className={`${DISPLAY} m-0 mb-0.5 text-left text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`}
      >
        {CURE_UV02_ROI.title}
      </h2>
      <p className={`${SANS} m-0 mb-4 text-left text-[.92rem] font-medium text-[#4a5568]`}>
        {CURE_UV02_ROI.lead}
      </p>
      <div className="flex min-w-0 w-full flex-1 items-stretch gap-x-4 [display:grid] [grid-template-columns:minmax(0,1.35fr)_1px_minmax(0,.85fr)] max-[800px]:[grid-template-columns:1fr] max-[800px]:gap-y-[18px]">
        <div
          className="min-w-0 content-center items-end [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] [grid-template-rows:auto_42px_auto_42px] gap-x-3 gap-y-1.5 max-[800px]:[grid-template-columns:1fr] max-[800px]:[grid-template-rows:auto]"
          role="group"
          aria-label="ROI inputs"
        >
          <span className={labelCls}>{CURE_UV02_ROI.monthlyLabel}</span>
          <span className={labelCls}>{CURE_UV02_ROI.timeLabel}</span>
          <input
            className={inputCls}
            type="number"
            min={0}
            step={1}
            aria-label={CURE_UV02_ROI.monthlyLabel}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
          />
          <input
            className={inputCls}
            type="number"
            min={0}
            step={1}
            aria-label={CURE_UV02_ROI.timeLabel}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value) || 0)}
          />
          <span className={`${labelCls} col-span-full mt-1.5 whitespace-normal max-[800px]:col-auto`}>
            {CURE_UV02_ROI.hourlyLabel}
          </span>
          <input
            className={`${inputCls} col-span-full max-[800px]:col-auto`}
            type="number"
            min={0}
            step={10}
            aria-label={CURE_UV02_ROI.hourlyLabel}
            value={hourly}
            onChange={(e) => setHourly(Number(e.target.value) || 0)}
          />
        </div>
        <div className="min-h-full w-px self-stretch bg-[#dce2ee] max-[800px]:hidden" aria-hidden />
        <div className="flex min-w-0 max-w-full flex-col justify-center gap-[18px] overflow-hidden py-1 ps-1 pe-0.5 text-left max-[800px]:flex-row max-[800px]:gap-4">
          <div className="flex min-w-0 max-w-full flex-col items-start gap-1 max-[800px]:flex-1">
            <span className={`${SANS} text-[.74rem] font-semibold leading-[1.25] text-[#2c3444]`}>
              {CURE_UV02_ROI.timeResultLabel}
            </span>
            <div className="flex min-w-0 max-w-full flex-wrap items-baseline gap-1.5">
              <strong key={`t-${timeMins}`} className={resultValueCls}>
                {formatHours(timeMins)}
              </strong>
              <span className={`${SANS} text-[.88rem] font-bold text-[#0050D8]`}>
                {CURE_UV02_ROI.timeResultUnit}
              </span>
            </div>
          </div>
          <div className="flex min-w-0 max-w-full flex-col items-start gap-1 max-[800px]:flex-1">
            <span className={`${SANS} text-[.74rem] font-semibold leading-[1.25] text-[#2c3444]`}>
              {CURE_UV02_ROI.costResultLabel}
            </span>
            <div className="flex min-w-0 max-w-full flex-wrap items-baseline gap-1.5">
              <strong key={`c-${cost}`} className={resultValueCls}>
                {formatLe(cost)}
              </strong>
              <span className={`${SANS} text-[.88rem] font-bold text-[#0050D8]`}>
                {CURE_UV02_ROI.costResultUnit}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
