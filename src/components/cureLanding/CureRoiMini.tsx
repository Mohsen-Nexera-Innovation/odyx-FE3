'use client';

import { useMemo, useState } from 'react';
import { CURE_UV02_ROI } from '@/content/cure-uv02';

function formatLe(n: number) {
  if (!Number.isFinite(n) || n <= 0) return 'L.E 0';
  return `L.E ${Math.round(n).toLocaleString('en-US')}`;
}

function formatHours(mins: number) {
  if (!Number.isFinite(mins) || mins <= 0) return '0 h';
  const h = mins / 60;
  return h >= 10 ? `${Math.round(h)} h` : `${Math.round(h * 10) / 10} h`;
}

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
    <div className="p126-card p126-roi-card cure-roi-card reveal in" id="roi">
      <h2 className="p126-card-title">{CURE_UV02_ROI.title}</h2>
      <p className="p126-roi-lead">{CURE_UV02_ROI.lead}</p>

      <div className="cure-roi-grid">
        {/* Labels + inputs share one grid so columns stay flush like cure.jpeg */}
        <div className="cure-roi-fields" role="group" aria-label="ROI inputs">
          <span className="cure-roi-label">{CURE_UV02_ROI.monthlyLabel}</span>
          <span className="cure-roi-label">{CURE_UV02_ROI.timeLabel}</span>

          <input
            className="cure-roi-input"
            type="number"
            min={0}
            step={1}
            aria-label={CURE_UV02_ROI.monthlyLabel}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
          />
          <input
            className="cure-roi-input"
            type="number"
            min={0}
            step={1}
            aria-label={CURE_UV02_ROI.timeLabel}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value) || 0)}
          />

          <span className="cure-roi-label cure-roi-label--span">{CURE_UV02_ROI.hourlyLabel}</span>
          <input
            className="cure-roi-input cure-roi-input--span"
            type="number"
            min={0}
            step={10}
            aria-label={CURE_UV02_ROI.hourlyLabel}
            value={hourly}
            onChange={(e) => setHourly(Number(e.target.value) || 0)}
          />
        </div>

        <div className="cure-roi-divider" aria-hidden />

        <div className="cure-roi-results" aria-live="polite">
          <div className="cure-roi-metric">
            <span className="cure-roi-metric-label">{CURE_UV02_ROI.timeResultLabel}</span>
            <div className="cure-roi-metric-line">
              <strong className="cure-roi-metric-value" key={`t-${timeMins}`}>
                {formatHours(timeMins)}
              </strong>
              <span className="cure-roi-metric-unit">{CURE_UV02_ROI.timeResultUnit}</span>
            </div>
          </div>
          <div className="cure-roi-metric">
            <span className="cure-roi-metric-label">{CURE_UV02_ROI.costResultLabel}</span>
            <div className="cure-roi-metric-line">
              <strong className="cure-roi-metric-value" key={`c-${cost}`}>
                {formatLe(cost)}
              </strong>
              <span className="cure-roi-metric-unit">{CURE_UV02_ROI.costResultUnit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
