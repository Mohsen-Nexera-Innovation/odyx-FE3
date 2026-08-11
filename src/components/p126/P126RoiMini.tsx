'use client';

import { useMemo, useState } from 'react';
import { P1_26_ROI } from '@/content/p1-26';

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
    <div className="p126-card p126-roi-card reveal" id="roi">
      <h2 className="p126-card-title">{P1_26_ROI.title}</h2>
      <p className="p126-roi-lead">{P1_26_ROI.lead}</p>
      <div className="p126-roi-grid">
        <div className="p126-roi-fields">
          <span className="p126-field-label">{P1_26_ROI.monthlyLabel}</span>
          <span className="p126-field-label">{P1_26_ROI.costLabel}</span>
          <input
            className="p126-field-input"
            type="number"
            min={0}
            step={1}
            aria-label={P1_26_ROI.monthlyLabel}
            value={monthly}
            onChange={(e) => setMonthly(Number(e.target.value) || 0)}
          />
          <input
            className="p126-field-input"
            type="number"
            min={0}
            step={50}
            aria-label={P1_26_ROI.costLabel}
            value={avgCost}
            onChange={(e) => setAvgCost(Number(e.target.value) || 0)}
          />
        </div>
        <div className="p126-roi-divider" aria-hidden />
        <div className="p126-roi-result" aria-live="polite">
          <span className="p126-roi-result-label">{P1_26_ROI.resultLabel}</span>
          <strong className="p126-roi-result-value" key={savings}>
            {formatEgp(savings)}
          </strong>
          <span className="p126-roi-result-unit">{P1_26_ROI.resultUnit}</span>
        </div>
      </div>
    </div>
  );
}
