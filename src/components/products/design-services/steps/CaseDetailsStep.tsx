import { Check, ChevronDown } from "lucide-react";

import { RESTORATION_SHADES, RESTORATIVE_MATERIALS, type CaseDetails } from '../types';

function InlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7c-1 0-1.5.5-2 1.5-.5.5-1.5.5-2 .5-1.5 0-2.5 1-3 3-.5 3 0 7 1.5 9 1 1 2 1 3 0 1-1 1.5-2 2.5-2s1.5 1 2.5 2c1 1 2 1 3 0 1.5-2 2-6 1.5-9-.5-2-1.5-3-3-3-.5 0-1.5 0-2-.5C13.5 7.5 13 7 12 7z" />
      <path d="M10.5 11c0-1 1-1.5 1.5-1.5s1.5.5 1.5 1.5c0 1-1.5 1.5-1.5 2.5-1.5-1-1.5-1.5-1.5-2.5z" />
    </svg>
  );
}

function OnlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7c-1 0-1.5.5-2 1.5-.5.5-1.5.5-2 .5-1.5 0-2.5 1-3 3-.5 3 0 7 1.5 9 1 1 2 1 3 0 1-1 1.5-2 2.5-2s1.5 1 2.5 2c1 1 2 1 3 0 1.5-2 2-6 1.5-9-.5-2-1.5-3-3-3-.5 0-1.5 0-2-.5C13.5 7.5 13 7 12 7z" />
      <path d="M8 10c0-1.5 1.5-2 2.5-2 1.5 0 2.5 1 3.5 1s2.5-1 3.5-1v2.5c0 1-1.5 2-2.5 2-1 0-2-.5-3-1.5-1-1-2-1-4-1z" />
    </svg>
  );
}

function CrownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7c-1.5 0-2 1-3 1.5-1-.5-2-1-3.5-1-1.5 0-2.5 1-3 3-.5 3 0 7 1.5 9 1 1 2 1 3 0 1-1 1.5-2 2.5-2s1.5 1 2.5 2c1 1 2 1 3 0 1.5-2 2-6 1.5-9-.5-2-1.5-3-3-3-1.5.5-2.5 1-3.5 1.5C14 8 13.5 7 12 7z" />
      <path d="M7 11.5c1.5 0 2 1 3 1.5 1-.5 1.5-1.5 3-1.5" />
    </svg>
  );
}

function VeneerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5c-2.5 0-4 1.5-4.5 4-.5 3 .5 8 2 10 1 1.5 2 2 2.5 2s1.5-.5 2.5-2c1.5-2 2.5-7 2-10C16 6.5 14.5 5 12 5z" />
      <path d="M8.5 18c1.5-1.5 3.5-1.5 5 0" />
    </svg>
  );
}

function ImplantCrownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c-1.5 0-2 1-3 1.5-1-.5-2-1-3.5-1-1.5 0-2.5 1-3 3-.5 3 0 6 1.5 8 1 1.5 2 1.5 3 0 1-1 1.5-2 2.5-2s1.5 1 2.5 2c1 1.5 2 1.5 3 0 1.5-2 2-5 1.5-8-.5-2-1.5-3-3-3-1.5.5-2.5 1-3.5 1.5C14 4 13.5 3 12 3z" />
      <path d="M10 16v6h4v-6" />
      <path d="M9 18h6" />
      <path d="M9.5 20h5" />
      <path d="M9 16h6" />
    </svg>
  );
}

const DESIGN_TYPES = [
  { label: 'Inlay',        icon: InlayIcon },
  { label: 'Onlay',        icon: OnlayIcon },
  { label: 'Crown',        icon: CrownIcon },
  { label: 'Veneer',       icon: VeneerIcon },
  { label: 'Implant Crown', icon: ImplantCrownIcon },
] as const;


const inputCls =
  'w-full min-h-[42px] border border-[#E5E7EB] rounded-[6px] bg-white text-[#0A1020] px-3 py-2 text-[14px] font-medium outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#9CA3AF] placeholder:font-normal hover:border-[#C5CDD8] focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]';

const selectCls = inputCls + ' appearance-none pe-9';

const labelCls = 'text-[13px] font-bold text-[#0A1020]';

type ToothType = 'incisor' | 'canine' | 'premolar' | 'molar';

const TEETH_LAYOUT: { id: string; cx: number; cy: number; angle: number; type: ToothType }[] = [
  // Upper Jaw
  { id: '18', cx: 29, cy: 170, angle: -85, type: 'molar' },
  { id: '17', cx: 32, cy: 135, angle: -75, type: 'molar' },
  { id: '16', cx: 38, cy: 105, angle: -60, type: 'molar' },
  { id: '15', cx: 48, cy: 80, angle: -45, type: 'premolar' },
  { id: '14', cx: 62, cy: 62, angle: -30, type: 'premolar' },
  { id: '13', cx: 80, cy: 50, angle: -20, type: 'canine' },
  { id: '12', cx: 103, cy: 43, angle: -10, type: 'incisor' },
  { id: '11', cx: 125, cy: 40, angle: -2, type: 'incisor' },
  { id: '21', cx: 155, cy: 40, angle: 2, type: 'incisor' },
  { id: '22', cx: 177, cy: 43, angle: 10, type: 'incisor' },
  { id: '23', cx: 200, cy: 50, angle: 20, type: 'canine' },
  { id: '24', cx: 218, cy: 62, angle: 30, type: 'premolar' },
  { id: '25', cx: 232, cy: 80, angle: 45, type: 'premolar' },
  { id: '26', cx: 242, cy: 105, angle: 60, type: 'molar' },
  { id: '27', cx: 248, cy: 135, angle: 75, type: 'molar' },
  { id: '28', cx: 251, cy: 170, angle: 85, type: 'molar' },
  // Lower Jaw
  { id: '48', cx: 29, cy: 230, angle: -95, type: 'molar' },
  { id: '47', cx: 32, cy: 265, angle: -105, type: 'molar' },
  { id: '46', cx: 38, cy: 295, angle: -120, type: 'molar' },
  { id: '45', cx: 48, cy: 320, angle: -135, type: 'premolar' },
  { id: '44', cx: 62, cy: 338, angle: -150, type: 'premolar' },
  { id: '43', cx: 80, cy: 350, angle: -160, type: 'canine' },
  { id: '42', cx: 103, cy: 357, angle: -170, type: 'incisor' },
  { id: '41', cx: 125, cy: 360, angle: -178, type: 'incisor' },
  { id: '31', cx: 155, cy: 360, angle: 178, type: 'incisor' },
  { id: '32', cx: 177, cy: 357, angle: 170, type: 'incisor' },
  { id: '33', cx: 200, cy: 350, angle: 160, type: 'canine' },
  { id: '34', cx: 218, cy: 338, angle: 150, type: 'premolar' },
  { id: '35', cx: 232, cy: 320, angle: 135, type: 'premolar' },
  { id: '36', cx: 242, cy: 295, angle: 120, type: 'molar' },
  { id: '37', cx: 248, cy: 265, angle: 105, type: 'molar' },
  { id: '38', cx: 251, cy: 230, angle: 95, type: 'molar' }
];

function getToothDims(type: ToothType) {
  if (type === 'incisor') return { w: 22, h: 14, rx: 5 };
  if (type === 'canine') return { w: 20, h: 18, rx: 8 };
  if (type === 'premolar') return { w: 22, h: 20, rx: 7 };
  return { w: 28, h: 24, rx: 9 }; // molar
}

function ToothDiagram({ 
  selectedTeeth = [], 
  onToggle 
}: { 
  selectedTeeth?: string[];
  onToggle?: (id: string) => void;
}) {
  return (
    <svg viewBox="0 0 280 400" role="img" aria-label="Tooth selection diagram" className="w-[180px] h-[257px] sm:w-[210px] sm:h-[300px] mx-auto select-none">
      <path d="M 29 170 C 29 15, 251 15, 251 170" fill="none" stroke="#E5E7EB" strokeWidth="16" strokeLinecap="round" />
      <path d="M 29 230 C 29 385, 251 385, 251 230" fill="none" stroke="#E5E7EB" strokeWidth="16" strokeLinecap="round" />
      
      {TEETH_LAYOUT.map(t => {
        const isSelected = selectedTeeth.includes(t.id);
        const d = getToothDims(t.type);
        return (
          <g 
            key={t.id} 
            transform={`translate(${t.cx}, ${t.cy})`} 
            className="transition-all duration-200 cursor-pointer hover:opacity-80"
            onClick={() => onToggle?.(t.id)}
          >
            <rect 
              x={-d.w / 2} 
              y={-d.h / 2} 
              width={d.w} 
              height={d.h} 
              rx={d.rx}
              transform={`rotate(${t.angle})`}
              fill={isSelected ? '#0050D8' : '#F3F4F6'} 
              stroke={isSelected ? '#0050D8' : '#D1D5DB'} 
              strokeWidth="1.5" 
              className="transition-colors duration-200"
            />
            <text 
              x="0" 
              y="3.5" 
              textAnchor="middle" 
              fontSize="10" 
              fontFamily="sans-serif" 
              fontWeight="bold" 
              fill={isSelected ? '#fff' : '#6B7280'}
              className="transition-colors duration-200"
            >
              {t.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

type CaseDetailsStepProps = {
  value: CaseDetails;
  onChange: (value: CaseDetails) => void;
  errors?: Record<string, string>;
  onClearError?: (field: string) => void;
};

export default function CaseDetailsStep({ value, onChange, errors = {}, onClearError }: CaseDetailsStepProps) {
  const update = (field: keyof CaseDetails, val: string) => {
    onChange({ ...value, [field]: val });
    onClearError?.(field);
  };

  const selectedTeethArray = value.toothNumbers
    .split(/[\s,]+/)
    .filter(Boolean);

  const handleToggleTooth = (id: string) => {
    let newTeeth = [...selectedTeethArray];
    if (newTeeth.includes(id)) {
      newTeeth = newTeeth.filter(t => t !== id);
    } else {
      newTeeth.push(id);
    }
    update('toothNumbers', newTeeth.join(', '));
  };

  const getInputCls = (field: string, baseCls = inputCls) => {
    if (errors[field]) {
      return baseCls.replace('border-[#E5E7EB]', 'border-[#EF4444]');
    }
    return baseCls;
  };

  const ErrorMsg = ({ field }: { field: string }) => {
    if (!errors[field]) return null;
    return <span className="text-[#EF4444] text-[12.5px] font-medium absolute -bottom-[22px] left-0">{errors[field]}</span>;
  };

  return (
    <div className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)] p-6 sm:p-8 flex flex-col gap-5">

      {/* Design Type */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-[13px] font-bold text-[#0A1020] mb-3">
          Design Type <span className="text-[#EF4444]">*</span>
        </legend>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {DESIGN_TYPES.map(({ label, icon: Icon }) => {
            const selected = value.designType === label;
            return (
              <label
                key={label}
                className={`relative min-h-[82px] border-[1.5px] rounded-[6px] flex flex-col items-center justify-center gap-1.5 text-[11px] font-semibold cursor-pointer transition-all duration-150 text-center select-none ${
                  selected
                    ? 'border-[#0050D8] text-[#0A1020]'
                    : 'border-[#E5E7EB] text-[#0A1020] hover:border-[#C5CDD8]'
                }`}
              >
                <input
                  type="radio"
                  name="designType"
                  className="sr-only"
                  checked={selected}
                  onChange={() => update('designType', label)}
                />
                <Icon className={`w-7 h-7 mb-0.5 ${selected ? 'text-[#0050D8]' : 'text-[#0050D8]'}`} aria-hidden />
                <span>{label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Tooth Number + Diagram */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 sm:items-center sm:justify-between">
        <label className="flex flex-col gap-2 relative w-full sm:flex-1">
          <span className={labelCls}>Tooth Number(s) <span className="text-[#EF4444]">*</span></span>
          <input
            value={value.toothNumbers}
            onChange={(e) => update('toothNumbers', e.target.value.replace(/[^0-9,\s]/g, ''))}
            placeholder="e.g. 11, 12, 34, 36"
            required
            className={getInputCls('toothNumbers')}
          />
          <ErrorMsg field="toothNumbers" />
        </label>
        <div className="flex-shrink-0">
          <ToothDiagram selectedTeeth={selectedTeethArray} onToggle={handleToggleTooth} />
        </div>
      </div>

      {/* Materials */}
      <fieldset className="border-0 p-0 m-0">
        <legend className="text-[13px] font-bold text-[#0A1020] mb-4">
          Restorative Material <span className="text-[#EF4444]">*</span>
        </legend>
        <div className="bg-white rounded-[8px] shadow-[0_2px_14px_rgba(0,0,0,0.05)] border border-gray-100 p-5 flex flex-col gap-4 max-w-md">
          {RESTORATIVE_MATERIALS.map((mat) => {
            const selected = value.material === mat;
            return (
              <label key={mat} className="flex items-center gap-3 text-[13px] font-medium text-[#0A1020] cursor-pointer select-none">
                <div className={`w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center transition-colors ${selected ? 'border-[#0050D8] bg-[#0050D8]' : 'border-[#D1D5DB] bg-white'}`}>
                  {selected && <Check size={11} strokeWidth={4} color="white" />}
                </div>
                <input
                  type="radio"
                  name="material"
                  className="sr-only"
                  checked={selected}
                  onChange={() => update('material', mat)}
                />
                {mat}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Shade + Notes + Instructions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-2 relative">
          <span className={labelCls}>Shade <span className="text-[#EF4444]">*</span></span>
          <div className="relative">
            <select value={value.shade} onChange={(e) => update('shade', e.target.value)} className={getInputCls('shade', selectCls)}>
              {RESTORATION_SHADES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
          </div>
          <ErrorMsg field="shade" />
        </label>

        <label className="flex flex-col gap-2 relative">
          <span className={labelCls}>
            Color Notes{' '}
            <span className="text-[12px] text-[#6B7280] font-normal">(Optional)</span>
          </span>
          <input
            value={value.colorNotes}
            onChange={(e) => update('colorNotes', e.target.value)}
            placeholder="e.g. Slightly brighter than adjacent tooth"
            className={inputCls}
          />
        </label>

        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className={labelCls}>
            Special Instructions{' '}
            <span className="text-[12px] text-[#6B7280] font-normal">(Optional)</span>
          </span>
          <input
            value={value.instructions}
            onChange={(e) => update('instructions', e.target.value)}
            placeholder="e.g. Keep natural anatomy. Tight proximal contact."
            className={inputCls}
          />
        </label>
      </div>

    </div>
  );
}
