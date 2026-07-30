'use client';

import { useMemo, useState } from 'react';
import { CURE_UV02_ROI } from '@/content/cure-uv02';

function formatUsd(n: number) {
  if (!Number.isFinite(n) || n <= 0) return '$0';
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

function formatHours(mins: number) {
  if (!Number.isFinite(mins) || mins <= 0) return '0 h';
  const h = mins / 60;
  return h >= 10 ? `${Math.round(h)} h` : `${Math.round(h * 10) / 10} h`;
}

export default function CureRoiMini() {
  const [monthly, setMonthly] = useState(CURE_UV02_ROI.defaultMonthly);
  const [minutes, setMinutes] = useState(CURE_UV02_ROI.defaultMinutes);

  const timeMins = useMemo(() => Math.max(0, monthly * minutes), [monthly, minutes]);
  const cost = useMemo(
    () => Math.max(0, (timeMins / 60) * CURE_UV02_ROI.hourlyValue),
    [timeMins],
  );

  return (
    <div className="cu2-card cu2-roi-card reveal" id="roi">
      <h2 className="cu2-card-title">{CURE_UV02_ROI.title}</h2>
      <p className="cu2-roi-lead">{CURE_UV02_ROI.lead}</p>
      <div className="cu2-roi-grid cu2-roi-grid--dual">
        <div className="cu2-roi-fields">
          <label className="cu2-field">
            <span>{CURE_UV02_ROI.monthlyLabel}</span>
            <input
              type="number"
              min={0}
              step={1}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value) || 0)}
            />
          </label>
          <label className="cu2-field">
            <span>{CURE_UV02_ROI.timeLabel}</span>
            <input
              type="number"
              min={0}
              step={1}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value) || 0)}
            />
          </label>
        </div>
        <div className="cu2-roi-results" aria-live="polite">
          <div className="cu2-roi-result">
            <span className="cu2-roi-result-label">{CURE_UV02_ROI.timeResultLabel}</span>
            <strong className="cu2-roi-result-value" key={`t-${timeMins}`}>
              {formatHours(timeMins)}
            </strong>
            <span className="cu2-roi-result-unit">{CURE_UV02_ROI.timeResultUnit}</span>
          </div>
          <div className="cu2-roi-result">
            <span className="cu2-roi-result-label">{CURE_UV02_ROI.costResultLabel}</span>
            <strong className="cu2-roi-result-value" key={`c-${cost}`}>
              {formatUsd(cost)}
            </strong>
            <span className="cu2-roi-result-unit">{CURE_UV02_ROI.costResultUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
