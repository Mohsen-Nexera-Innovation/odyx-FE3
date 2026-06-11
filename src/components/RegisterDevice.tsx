'use client';
// Register your ODYX device: business flow from registration through verification,
// warranty activation, and unlocked support/learning access. Supports new registration
// and serial status lookup (demo serial ODYX-DEMO-001 shows an active device).
import { useEffect, useState, type FormEvent } from 'react';

type Phase = 'register' | 'pending' | 'active';
type Tab = 'register' | 'status';

const STEPS = [
  { label: 'Register', desc: 'Submit serial and clinic details' },
  { label: 'Verify', desc: 'Purchase validated by ODYX' },
  { label: 'Warranty', desc: 'Coverage and service activated' },
  { label: 'Full access', desc: 'Academy, cases, updates and support' },
];

const PRODUCTS = [
  'Intraoral Scanner', 'Desktop Lab Scanner', 'Design Software', '3D Printer',
  'Curing Machine', 'Milling Machine', 'Wash Station', 'Sintering Furnace',
];

const PERKS = [
  { t: 'Warranty & service', d: 'Repair coverage and service requests' },
  { t: 'Software updates', d: 'Latest firmware and design libraries' },
  { t: 'Clinical courses', d: 'Registered-only academy modules' },
  { t: 'Case library', d: 'Submit and browse clinical cases' },
];

const DEMO_SERIAL = 'ODYX-DEMO-001';

function stepIndex(phase: Phase) {
  if (phase === 'register') return 0;
  if (phase === 'pending') return 1;
  return 3;
}

export default function RegisterDevice() {
  const [tab, setTab] = useState<Tab>('register');
  const [phase, setPhase] = useState<Phase>('register');
  const [serial, setSerial] = useState('');
  const [lookup, setLookup] = useState('');
  const [msg, setMsg] = useState('');

  const activeStep = stepIndex(phase);

  useEffect(() => {
    if (phase !== 'pending') return;
    const t = setTimeout(() => {
      setPhase('active');
      setMsg('Device verified. Warranty active and full access unlocked.');
    }, 3200);
    return () => clearTimeout(t);
  }, [phase]);

  const submitRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!serial.trim()) {
      setMsg('Enter your device serial number.');
      return;
    }
    setPhase('pending');
    setMsg('Registration received. Verifying your device...');
  };

  const submitLookup = (e: FormEvent) => {
    e.preventDefault();
    const s = lookup.trim().toUpperCase();
    if (s === DEMO_SERIAL) {
      setPhase('active');
      setSerial(s);
      setMsg('Device registered. Warranty active until Jun 2028.');
      return;
    }
    if (s.startsWith('ODYX-') && s.length >= 8) {
      setPhase('pending');
      setMsg('Device found. Verification still in progress.');
      return;
    }
    setPhase('register');
    setMsg('Serial not found. Register your device to activate warranty.');
  };

  const reset = () => {
    setPhase('register');
    setSerial('');
    setLookup('');
    setMsg('');
    setTab('register');
  };

  return (
    <div className="reg">
      <div className="reg-visual">
        <div className="reg-art">
          <img src="/img/reg-device.jpg" alt="Register your ODYX device" loading="lazy" />
          <span className="reg-scrim" />
        </div>
        <div className="reg-steps" aria-label="Registration progress">
          <div className="reg-rail"><span className="reg-rail-fill" style={{ width: `${(activeStep / (STEPS.length - 1)) * 100}%` }} /></div>
          {STEPS.map((s, i) => (
            <div key={s.label} className={`reg-step${i === activeStep ? ' on' : i < activeStep ? ' done' : ''}`}>
              <span className="reg-step-dot">{i < activeStep ? '\u2713' : i + 1}</span>
              <span className="reg-step-label">{s.label}</span>
              <small>{s.desc}</small>
            </div>
          ))}
        </div>
        <div className="reg-perks">
          {PERKS.map((p) => (
            <div key={p.t} className={`reg-perk${phase === 'active' ? ' on' : ''}`}>
              <b>{p.t}</b><span>{p.d}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="reg-panel">
        <div className="reg-tabs" role="tablist">
          <button type="button" role="tab" className={tab === 'register' ? 'on' : ''} aria-selected={tab === 'register'} onClick={() => setTab('register')}>Register device</button>
          <button type="button" role="tab" className={tab === 'status' ? 'on' : ''} aria-selected={tab === 'status'} onClick={() => setTab('status')}>Check status</button>
        </div>

        {phase === 'active' ? (
          <div className="reg-status active">
            <span className="reg-badge ok">Registered</span>
            <h3>Device active</h3>
            <p className="reg-serial">Serial: <strong>{serial || DEMO_SERIAL}</strong></p>
            <ul className="reg-unlocks">
              <li>Warranty coverage active</li>
              <li>Software updates enabled</li>
              <li>Academy courses unlocked</li>
              <li>Case submission available</li>
              <li>Priority technical support</li>
            </ul>
            <div className="reg-actions">
              <a className="btn" href="#">Open support hub</a>
              <button type="button" className="btn btn-ghost" onClick={reset}>Register another</button>
            </div>
          </div>
        ) : tab === 'register' ? (
          <form className="reg-form" onSubmit={submitRegister}>
            <div className="field">
              <label htmlFor="reg-product">Product</label>
              <select id="reg-product" defaultValue="">
                <option value="" disabled>Select product</option>
                {PRODUCTS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="reg-serial">Serial number</label>
              <input id="reg-serial" type="text" placeholder="e.g. ODYX-XXXX-XXXX" value={serial} onChange={(e) => setSerial(e.target.value)} />
            </div>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="reg-clinic">Clinic / Lab name</label>
                <input id="reg-clinic" type="text" placeholder="Your practice name" />
              </div>
              <div className="field">
                <label htmlFor="reg-country">Country</label>
                <input id="reg-country" type="text" placeholder="Country" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="reg-date">Purchase date</label>
              <input id="reg-date" type="date" />
            </div>
            <button type="submit" className="btn" disabled={phase === 'pending'}>
              {phase === 'pending' ? 'Verifying...' : 'Register device'}
            </button>
          </form>
        ) : (
          <form className="reg-form" onSubmit={submitLookup}>
            <p className="reg-hint">Enter your serial to see warranty and access status. Try <code>{DEMO_SERIAL}</code> for a registered demo.</p>
            <div className="field">
              <label htmlFor="reg-lookup">Serial number</label>
              <input id="reg-lookup" type="text" placeholder="ODYX-XXXX-XXXX" value={lookup} onChange={(e) => setLookup(e.target.value)} />
            </div>
            <button type="submit" className="btn">Check status</button>
          </form>
        )}

        {msg && <p className={`reg-msg${phase === 'active' ? ' ok' : phase === 'pending' ? ' pending' : ''}`} role="status">{msg}</p>}
        {phase === 'pending' && tab === 'register' && (
          <div className="reg-pending" aria-live="polite">
            <span className="reg-spinner" aria-hidden />
            <span>Validating purchase and activating warranty...</span>
          </div>
        )}
      </div>
    </div>
  );
}
