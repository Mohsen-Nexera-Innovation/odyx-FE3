import { Circle, Crown, Gem, PlusCircle, Smile } from 'lucide-react';
import type { CaseDetails } from './types';

const DESIGN_TYPES = [
  { label: 'Inlay', icon: Gem },
  { label: 'Onlay', icon: Circle },
  { label: 'Crown', icon: Crown },
  { label: 'Veneer', icon: Smile },
  { label: 'Implant Crown', icon: PlusCircle },
] as const;

const RESTORATIVE_MATERIALS = [
  'Ceramic Resin',
  'Crown & Bridge Resin',
  'Temporary Crown Resin',
];

const OTHER_MATERIALS = [
  'Zirconia',
  'Lithium Disilicate (E.max)',
  'Composite',
  'Other',
];

function ToothDiagram() {
  return (
    <svg
      className="case-tooth-diagram"
      viewBox="0 0 120 106"
      role="img"
      aria-label="Tooth selection diagram"
    >
      <path
        d="M15 22c2-10 17-16 27-9 10 7 8 20 4 32-4 13-3 35-11 42-7 5-7-18-12-18s-7 23-12 18C4 80 7 58 3 45-1 33 2 25 15 22Z"
        fill="#fff"
        stroke="#aeb9c8"
        strokeWidth="2"
      />
      <path
        d="M76 13c10-7 25-1 27 9 13 3 16 11 12 23-4 13-1 35-8 42-5 5-7-18-12-18s-5 23-12 18c-8-7-7-29-11-42-4-12-6-25 4-32Z"
        fill="#fff"
        stroke="#aeb9c8"
        strokeWidth="2"
      />
      <path d="M9 29c9 4 24 4 33-1M77 28c9 5 24 5 33 1" fill="none" stroke="#d4dce6" strokeWidth="2" />
      <circle cx="20" cy="18" r="10" fill="#0d3477" />
      <circle cx="100" cy="18" r="10" fill="#0d3477" />
      <text x="20" y="21.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">11</text>
      <text x="100" y="21.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">21</text>
    </svg>
  );
}

type CaseDetailsStepProps = {
  value: CaseDetails;
  onChange: (value: CaseDetails) => void;
};

export default function CaseDetailsStep({ value, onChange }: CaseDetailsStepProps) {
  const update = (field: keyof CaseDetails, fieldValue: string) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="case-form-card case-details-card">
      <fieldset className="case-choice-group">
        <legend>Design Type <b>*</b></legend>
        <div className="case-design-grid">
          {DESIGN_TYPES.map(({ label, icon: Icon }) => (
            <label
              key={label}
              className={`case-design-option${value.designType === label ? ' is-selected' : ''}`}
            >
              <input
                type="radio"
                name="designType"
                checked={value.designType === label}
                onChange={() => update('designType', label)}
              />
              <Icon size={23} strokeWidth={1.7} aria-hidden />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="case-tooth-row">
        <label className="case-field">
          <span>Tooth Number(s) <b>*</b></span>
          <input
            value={value.toothNumbers}
            onChange={(event) => update('toothNumbers', event.target.value)}
            placeholder="e.g. 11, 12, 34, 36"
            required
          />
        </label>
        <ToothDiagram />
      </div>

      <div className="case-material-grid">
        <fieldset className="case-choice-group">
          <legend>
            Restorative Material <b>*</b>
            <small>ODYX 3D Printing Materials (Recommended)</small>
          </legend>
          <div className="case-radio-list">
            {RESTORATIVE_MATERIALS.map((material) => (
              <label key={material}>
                <input
                  type="radio"
                  name="material"
                  checked={value.material === material && !value.otherMaterial}
                  onChange={() => onChange({ ...value, material, otherMaterial: '' })}
                />
                <span>{material}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="case-choice-group">
          <legend>Other Material</legend>
          <div className="case-radio-list">
            {OTHER_MATERIALS.map((material) => (
              <label key={material}>
                <input
                  type="radio"
                  name="material"
                  checked={
                    material === 'Other'
                      ? value.otherMaterial.startsWith('Other')
                      : value.otherMaterial === material
                  }
                  onChange={() => update('otherMaterial', material)}
                />
                <span>{material}</span>
              </label>
            ))}
          </div>
          {value.otherMaterial.startsWith('Other') ? (
            <input
              className="case-inline-input"
              aria-label="Other material name"
              placeholder="Please specify material"
              value={value.otherMaterial.startsWith('Other: ') ? value.otherMaterial.slice(7) : ''}
              onChange={(event) => update('otherMaterial', event.target.value ? `Other: ${event.target.value}` : 'Other')}
              required
            />
          ) : null}
        </fieldset>
      </div>

      <div className="case-field-grid">
        <label className="case-field">
          <span>Shade <b>*</b></span>
          <select value={value.shade} onChange={(event) => update('shade', event.target.value)}>
            {['A1', 'A2', 'A3', 'A3.5', 'B1', 'B2', 'C1', 'D2', 'BL1'].map((shade) => (
              <option key={shade}>{shade}</option>
            ))}
          </select>
        </label>
        <label className="case-field">
          <span>Color Notes <small>(Optional)</small></span>
          <input
            value={value.colorNotes}
            onChange={(event) => update('colorNotes', event.target.value)}
            placeholder="e.g. Slightly brighter than adjacent tooth"
          />
        </label>
        <label className="case-field case-field--wide">
          <span>Special Instructions <small>(Optional)</small></span>
          <textarea
            rows={3}
            value={value.instructions}
            onChange={(event) => update('instructions', event.target.value)}
            placeholder="e.g. Keep natural anatomy. Tight proximal contact."
          />
        </label>
      </div>
    </div>
  );
}
