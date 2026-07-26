"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const DEFAULTS = {
  monthlyCases: 40,
  minutesSaved: 12,
  hourlyValue: 350,
};

function formatHours(n: number) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(n >= 10 ? 0 : 1)} hrs`;
}

function formatMoney(n: number) {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function CureRoiPanel({
  classPrefix = "cure-v4",
}: {
  classPrefix?: "cure-v4" | "cure-v5";
}) {
  const [monthlyCases, setMonthlyCases] = useState(DEFAULTS.monthlyCases);
  const [minutesSaved, setMinutesSaved] = useState(DEFAULTS.minutesSaved);
  const [hourlyValue, setHourlyValue] = useState(DEFAULTS.hourlyValue);

  const result = useMemo(() => {
    const hours = (Math.max(0, monthlyCases) * Math.max(0, minutesSaved)) / 60;
    const savings = hours * Math.max(0, hourlyValue);
    return { hours, savings, yearly: savings * 12 };
  }, [monthlyCases, minutesSaved, hourlyValue]);

  const cx = (part: string) => `${classPrefix}-${part}`;

  return (
    <div className={cx("roi")}>
      <div className={cx("roi__inputs")}>
        <label className={cx("roi__field")}>
          <span>Monthly cases</span>
          <input
            type="number"
            min={0}
            step={1}
            value={monthlyCases}
            onChange={(e) => setMonthlyCases(Number(e.target.value))}
          />
        </label>
        <label className={cx("roi__field")}>
          <span>Avg. time saved / case</span>
          <div className={cx("roi__with-unit")}>
            <input
              type="number"
              min={0}
              step={1}
              value={minutesSaved}
              onChange={(e) => setMinutesSaved(Number(e.target.value))}
            />
            <em>min</em>
          </div>
        </label>
        <label className={cx("roi__field")}>
          <span>Value of clinic time</span>
          <div className={cx("roi__with-unit")}>
            <input
              type="number"
              min={0}
              step={50}
              value={hourlyValue}
              onChange={(e) => setHourlyValue(Number(e.target.value))}
            />
            <em>EGP/hr</em>
          </div>
        </label>
      </div>

      <div className={cx("roi__outputs")} aria-live="polite">
        <div>
          <span>Potential time savings</span>
          <strong>{formatHours(result.hours)} / mo</strong>
        </div>
        <div>
          <span>Potential cost savings</span>
          <strong>{formatMoney(result.savings)} / mo</strong>
        </div>
        <div className={cx("roi__year")}>
          <span>Projected yearly value</span>
          <strong>{formatMoney(result.yearly)}</strong>
        </div>
      </div>

      <p className={cx("roi__note")}>
        Estimate based on faster validated cure cycles vs. babysitting open-ended UV exposure.
        Adjust the numbers to match your clinic.
      </p>

      <div className={cx("roi__actions")}>
        <Link className={cx("btn")} href="/support">
          Request a Demo
        </Link>
        <Link className={`${cx("btn")} ${cx("btn--ghost")}`} href="/roi">
          Full ROI calculator
        </Link>
      </div>
    </div>
  );
}
