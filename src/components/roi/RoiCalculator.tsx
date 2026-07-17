'use client';

import { FormEvent, useState } from 'react';
import {
  ROI_COPY,
  ROI_COPY_BY_SCOPE,
  ROI_CURING,
  ROI_DEFAULTS,
  ROI_PRINTER,
  ROI_SCANNER,
  type RoiScope,
} from '@/content/roi';
import { formatMoney } from '@/content/shop';
import { createLeadApi } from '@/lib/api/leads';
import { isApiMode } from '@/lib/config';
import {
  calculateRoi,
  scenarioSnapshot,
  type RoiInputs,
} from '@/lib/roi/calculate';

function money(n: number) {
  return formatMoney(n, 'EGP');
}

function formatPayback(months: number | null): string {
  if (months == null || !Number.isFinite(months)) return '—';
  if (months < 1) return '< 1 month';
  if (months > 120) return '120+ months';
  const rounded = Math.round(months * 10) / 10;
  return `${rounded} month${rounded === 1 ? '' : 's'}`;
}

function SliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
}) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div className="roi-slider-field">
      <div className="roi-slider-head">
        <label htmlFor={id}>{label}</label>
        <div className="roi-slider-value">
          <input
            id={id}
            type="number"
            min={min}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
          />
          {unit ? <span>{unit}</span> : null}
        </div>
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range"
        style={{ ['--fill' as string]: `${pct}%` }}
      />
    </div>
  );
}

type Props = {
  /** printer = P1-26 page; ecosystem = full /roi page */
  scope?: RoiScope;
};

export default function RoiCalculator({ scope = 'printer' }: Props) {
  const d = ROI_DEFAULTS;
  const scopeCopy = ROI_COPY_BY_SCOPE[scope];
  const [monthlyCrowns, setMonthlyCrowns] = useState(d.monthlyCrowns);
  const [labFeePerCrown, setLabFeePerCrown] = useState(d.labFeePerCrown);
  const [resinCostPerCrown, setResinCostPerCrown] = useState(d.resinCostPerCrown);
  const [visitsSavedPerCrown, setVisitsSavedPerCrown] = useState(
    d.visitsSavedPerCrown,
  );
  const [costPerAvoidedVisit, setCostPerAvoidedVisit] = useState(
    d.costPerAvoidedVisit,
  );
  const [patientFeePerCrown, setPatientFeePerCrown] = useState(
    d.patientFeePerCrown,
  );
  const [includeScanner, setIncludeScanner] = useState(d.includeScanner);
  const [includePrinter, setIncludePrinter] = useState(d.includePrinter);
  const [includeCuring, setIncludeCuring] = useState(d.includeCuring);
  const [investmentOverride, setInvestmentOverride] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [org, setOrg] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const inputs: RoiInputs = {
    scope,
    monthlyCrowns,
    labFeePerCrown,
    resinCostPerCrown,
    visitsSavedPerCrown,
    costPerAvoidedVisit,
    patientFeePerCrown,
    includeScanner: scope === 'ecosystem' ? includeScanner : false,
    includePrinter: scope === 'ecosystem' ? includePrinter : true,
    includeCuring,
    investmentOverride:
      investmentOverride.trim() === '' ? null : Number(investmentOverride),
  };

  const results = calculateRoi(inputs);
  const maxCost = Math.max(
    results.monthlyLabSpend,
    results.monthlyInHouseSpend,
    1,
  );
  const maxProfit = Math.max(
    Math.abs(results.profitAnalogMonthly),
    Math.abs(results.profitDigitalMonthly),
    1,
  );

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    setError('');
    setMsg('');

    if (!name.trim()) {
      setError('Enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid email.');
      return;
    }

    const scenario = scenarioSnapshot(inputs, results);
    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      org: org.trim() || undefined,
      clientType: 'DENTIST' as const,
      note: note.trim() || undefined,
      scenario,
    };

    if (!isApiMode()) {
      setMsg(
        'Thanks — your scenario is ready. (Demo mode: lead was not sent to the API.)',
      );
      return;
    }

    setBusy(true);
    try {
      await createLeadApi(payload);
      setMsg('Thanks — we received your ROI scenario. Our team will follow up.');
      setNote('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit lead.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="roi-root">
      <div className="roi-shell">
        <div className="roi-main">
          <div className="roi-card">
            <div className="roi-step">
              <div className="roi-step-head">
                <span className="roi-step-dot">1</span>
                <h3>{ROI_COPY.labels.stepCases}</h3>
              </div>
              <div className="roi-step-body">
                <SliderField
                  id="roi-crowns"
                  label={ROI_COPY.labels.monthlyCrowns}
                  value={monthlyCrowns}
                  onChange={setMonthlyCrowns}
                  min={0}
                  max={200}
                  step={1}
                  unit="cases / mo"
                />
              </div>
            </div>

            <div className="roi-step">
              <div className="roi-step-head">
                <span className="roi-step-dot">2</span>
                <h3>{ROI_COPY.labels.stepFee}</h3>
              </div>
              <div className="roi-step-body">
                <SliderField
                  id="roi-fee"
                  label={ROI_COPY.labels.patientFeePerCrown}
                  value={patientFeePerCrown}
                  onChange={setPatientFeePerCrown}
                  min={0}
                  max={10000}
                  step={50}
                  unit="EGP"
                />
              </div>
            </div>

            <div className="roi-step">
              <div className="roi-step-head">
                <span className="roi-step-dot">3</span>
                <h3>{ROI_COPY.labels.stepCosts}</h3>
              </div>
              <div className="roi-step-body">
                <SliderField
                  id="roi-lab"
                  label={ROI_COPY.labels.labFeePerCrown}
                  value={labFeePerCrown}
                  onChange={setLabFeePerCrown}
                  min={0}
                  max={5000}
                  step={50}
                  unit="EGP"
                />
                <SliderField
                  id="roi-resin"
                  label={ROI_COPY.labels.resinCostPerCrown}
                  value={resinCostPerCrown}
                  onChange={setResinCostPerCrown}
                  min={0}
                  max={2000}
                  step={25}
                  unit="EGP"
                />
                <div className="form-grid">
                  <div className="field">
                    <label htmlFor="roi-visits">
                      {ROI_COPY.labels.visitsSavedPerCrown}
                    </label>
                    <input
                      id="roi-visits"
                      type="number"
                      min={0}
                      step={0.5}
                      value={visitsSavedPerCrown}
                      onChange={(e) =>
                        setVisitsSavedPerCrown(Number(e.target.value))
                      }
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="roi-visit-cost">
                      {ROI_COPY.labels.costPerAvoidedVisit}
                    </label>
                    <input
                      id="roi-visit-cost"
                      type="number"
                      min={0}
                      step={1}
                      value={costPerAvoidedVisit}
                      onChange={(e) =>
                        setCostPerAvoidedVisit(Number(e.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="roi-step">
              <div className="roi-step-head">
                <span className="roi-step-dot">4</span>
                <h3>{ROI_COPY.labels.stepInvest}</h3>
              </div>
              <div className="roi-step-body">
                <div
                  className={`roi-invest-cards${scope === 'ecosystem' ? ' roi-invest-cards--3' : ''}`}
                >
                  {scope === 'ecosystem' ? (
                    <label
                      className={`roi-invest-card${includeScanner ? ' on' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={includeScanner}
                        onChange={(e) => setIncludeScanner(e.target.checked)}
                      />
                      <span className="roi-invest-name">{ROI_SCANNER.name}</span>
                      <span className="roi-invest-price">
                        {money(ROI_SCANNER.price)}
                      </span>
                      <span className="roi-invest-tag">
                        {includeScanner ? 'Added' : 'Optional'}
                      </span>
                    </label>
                  ) : null}

                  {scope === 'ecosystem' ? (
                    <label
                      className={`roi-invest-card${includePrinter ? ' on' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={includePrinter}
                        onChange={(e) => setIncludePrinter(e.target.checked)}
                      />
                      <span className="roi-invest-name">{ROI_PRINTER.name}</span>
                      <span className="roi-invest-price">
                        {money(ROI_PRINTER.price)}
                      </span>
                      <span className="roi-invest-tag">
                        {includePrinter ? 'Added' : 'Optional'}
                      </span>
                    </label>
                  ) : (
                    <label className="roi-invest-card on locked">
                      <input type="checkbox" checked disabled readOnly />
                      <span className="roi-invest-name">{ROI_PRINTER.name}</span>
                      <span className="roi-invest-price">
                        {money(ROI_PRINTER.price)}
                      </span>
                      <span className="roi-invest-tag">Included</span>
                    </label>
                  )}

                  <label
                    className={`roi-invest-card${includeCuring ? ' on' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={includeCuring}
                      onChange={(e) => setIncludeCuring(e.target.checked)}
                    />
                    <span className="roi-invest-name">{ROI_CURING.name}</span>
                    <span className="roi-invest-price">
                      {money(ROI_CURING.price)}
                    </span>
                    <span className="roi-invest-tag">
                      {includeCuring ? 'Added' : 'Optional'}
                    </span>
                  </label>
                </div>
                <div className="field">
                  <label htmlFor="roi-invest">
                    {ROI_COPY.labels.investmentOverride}
                  </label>
                  <input
                    id="roi-invest"
                    type="number"
                    min={0}
                    step={1}
                    placeholder={String(results.investment)}
                    value={investmentOverride}
                    onChange={(e) => setInvestmentOverride(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="roi-aside">
          <div className="roi-results">
            <div className="roi-results-glow" aria-hidden />
            <p className="roi-results-eyebrow">Your estimate</p>

            <div className="roi-hero-result">
              <span>{ROI_COPY.results.breakEven}</span>
              <strong>{formatPayback(results.paybackMonths)}</strong>
              <em>Investment {money(results.investment)}</em>
            </div>

            <div className="roi-hero-grid">
              <div className="roi-hero-card">
                <span>{ROI_COPY.results.profitMonth}</span>
                <strong>{money(results.monthlySavings)}</strong>
              </div>
              <div className="roi-hero-card">
                <span>{ROI_COPY.results.profitYear}</span>
                <strong>{money(results.savings12)}</strong>
              </div>
            </div>

            <div className="roi-compare-panel">
              <p className="roi-compare-title">{ROI_COPY.results.revenueCompare}</p>
              <div className="roi-vs">
                <div className="roi-vs-col">
                  <h4>Lab</h4>
                  <div className="roi-vs-row">
                    <span>{ROI_COPY.results.costAnalog}</span>
                    <strong>{money(results.monthlyLabSpend)}</strong>
                  </div>
                  <div className="roi-bar-track">
                    <div
                      className="roi-bar analog"
                      style={{
                        width: `${(results.monthlyLabSpend / maxCost) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="roi-vs-row">
                    <span>{ROI_COPY.results.profitAnalog}</span>
                    <strong>{money(results.profitAnalogMonthly)}</strong>
                  </div>
                  <div className="roi-bar-track">
                    <div
                      className="roi-bar analog"
                      style={{
                        width: `${(Math.max(0, results.profitAnalogMonthly) / maxProfit) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="roi-vs-col on">
                  <h4>{scopeCopy.digitalLabel}</h4>
                  <div className="roi-vs-row">
                    <span>{scopeCopy.costDigital}</span>
                    <strong>{money(results.monthlyInHouseSpend)}</strong>
                  </div>
                  <div className="roi-bar-track">
                    <div
                      className="roi-bar digital"
                      style={{
                        width: `${(results.monthlyInHouseSpend / maxCost) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="roi-vs-row">
                    <span>{scopeCopy.resultsDigital}</span>
                    <strong className="pos">
                      {money(results.profitDigitalMonthly)}
                    </strong>
                  </div>
                  <div className="roi-bar-track">
                    <div
                      className="roi-bar digital"
                      style={{
                        width: `${(Math.max(0, results.profitDigitalMonthly) / maxProfit) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <ul className="roi-breakdown">
              <li>
                <span>Lab fee savings / mo</span>
                <strong>{money(results.labFeeSavingsMonthly)}</strong>
              </li>
              <li>
                <span>Visit + materials / mo</span>
                <strong>{money(results.visitMaterialSavingsMonthly)}</strong>
              </li>
              <li>
                <span>36-month profit increase</span>
                <strong>{money(results.savings36)}</strong>
              </li>
            </ul>
          </div>

          <form className="roi-lead" onSubmit={submitLead}>
            <h3>Get your tailored ROI</h3>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="roi-name">Name</label>
                <input
                  id="roi-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="roi-email">Email</label>
                <input
                  id="roi-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="roi-phone">Phone</label>
                <input
                  id="roi-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="field">
                <label htmlFor="roi-org">Clinic</label>
                <input
                  id="roi-org"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  autoComplete="organization"
                />
              </div>
              <div className="field full">
                <label htmlFor="roi-note">Note (optional)</label>
                <textarea
                  id="roi-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-sign" disabled={busy}>
              {busy ? 'Sending…' : 'Send my ROI'}
            </button>
            {error ? (
              <p className="roi-msg err" role="alert">
                {error}
              </p>
            ) : null}
            {msg ? (
              <p className="roi-msg" role="status">
                {msg}
              </p>
            ) : null}
          </form>
        </aside>
      </div>
      <p className="roi-disclaimer">{ROI_COPY.disclaimer}</p>
    </div>
  );
}
