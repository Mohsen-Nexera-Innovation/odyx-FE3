'use client';

import { useMemo, useState } from 'react';
import { P1_26_ROI } from '@/content/p1-26';

const SANS =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";

function formatEgp(n: number) {
  if (!Number.isFinite(n) || n <= 0) return 'EGP 0';
  return `EGP ${Math.round(n).toLocaleString('en-US')}`;
}

export default function P126RoiMini() {
  const [monthly, setMonthly] = useState(P1_26_ROI.defaultMonthly);
  const [avgCost, setAvgCost] = useState(P1_26_ROI.defaultCost);

  const savings = useMemo(() => {
    const perCase = Math.max(0, avgCost - P1_26_ROI.resinCostPerCase);
    return Math.max(0, monthly * perCase);
  }, [monthly, avgCost]);

  return (
    <div
      className="reveal flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border-4 border-solid border-white bg-transparent p-[clamp(16px,1.8vw,22px)]"
      id="roi"
    >
      <h2
        className={`${DISPLAY} m-0 mb-1 text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`}
      >
        {P1_26_ROI.title}
      </h2>
      <p className={`${SANS} m-0 mb-3.5 text-[.875rem] font-medium text-[#4a5568]`}>
        {P1_26_ROI.lead}
      </p>
      <div className="flex min-h-0 min-w-0 w-full flex-1 items-center gap-x-3 [display:grid] [grid-template-columns:minmax(0,1.2fr)_1px_minmax(0,.9fr)] max-[800px]:gap-4 max-[800px]:[grid-template-columns:1fr]">
        <div className="min-w-0 content-center items-stretch [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(0,1fr)] [grid-template-rows:auto_40px] gap-x-2.5 gap-y-1.5 max-[800px]:[grid-template-columns:1fr]">
          <span
            className={`${SANS} block min-w-0 self-end text-[.72rem] font-semibold leading-[1.25] text-[#2c3444]`}
          >
            {P1_26_ROI.monthlyLabel}
          </span>
          <span
            className={`${SANS} block min-w-0 self-end text-[.72rem] font-semibold leading-[1.25] text-[#2c3444]`}
          >
            {P1_26_ROI.costLabel}
          </span>
          <input
            className={`${SANS} h-10 min-w-0 w-full rounded-[10px] border border-solid border-[#dce2ee] bg-white px-2.5 text-[.88rem] font-semibold text-[#1a2433] transition-[border-color,box-shadow] duration-200 ease-[ease] focus:border-[#0050D8] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,102,194,.12)] focus:outline-none`}
            type="number"
            min={0}
            step={1}
            aria-label={P1_26_ROI.monthlyLabel}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
          />
          <input
            className={`${SANS} h-10 min-w-0 w-full rounded-[10px] border border-solid border-[#dce2ee] bg-white px-2.5 text-[.88rem] font-semibold text-[#1a2433] transition-[border-color,box-shadow] duration-200 ease-[ease] focus:border-[#0050D8] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,102,194,.12)] focus:outline-none`}
            type="number"
            min={0}
            step={50}
            aria-label={P1_26_ROI.costLabel}
            value={avgCost}
            onChange={(e) => setAvgCost(Number(e.target.value) || 0)}
          />
        </div>
        <div
          className="min-h-20 w-px self-stretch bg-[#dce2ee] max-[800px]:hidden max-[800px]:h-0 max-[800px]:w-0"
          aria-hidden
        />
        <div className="flex min-w-0 max-w-full flex-col items-center justify-center overflow-hidden px-0.5 py-1 text-center">
          <span className={`${SANS} text-[.78rem] font-semibold text-[#2c3444]`}>
            {P1_26_ROI.resultLabel}
          </span>
          <strong
            key={savings}
            className={`${DISPLAY} p126-roi-pop m-[6px_0_2px] max-w-full text-[clamp(1.2rem,1.8vw,1.75rem)] font-extrabold leading-[1.1] text-[#0050D8] [overflow-wrap:anywhere] [animation:p126-pop_.35s_cubic-bezier(.16,1,.3,1)]`}
          >
            {formatEgp(savings)}
          </strong>
          <span className={`${SANS} text-[.84rem] font-bold text-[#0050D8]`}>
            {P1_26_ROI.resultUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
