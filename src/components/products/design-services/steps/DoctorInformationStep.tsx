import { Building2, UserRound, ChevronDown } from 'lucide-react';
import type { DoctorInformation } from '../types';

/* ── Shared field input class ───────────────────────────────── */
const inputCls =
  'w-full min-h-[42px] border border-[#E5E7EB] rounded-[6px] bg-white text-[#0A1020] px-3 py-2 text-[14px] font-medium outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#9CA3AF] placeholder:font-normal hover:border-[#C5CDD8] focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]';

const selectCls = inputCls + ' appearance-none pe-9';

const labelCls = 'text-[13px] font-bold text-[#0A1020]';

type DoctorInformationStepProps = {
  value: DoctorInformation;
  onChange: (value: DoctorInformation) => void;
  errors?: Record<string, string>;
  onClearError?: (field: string) => void;
};

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 text-[#0050D8]">
      {icon}
      <h2 className="text-[16px] font-bold text-[#0A1020] m-0">{title}</h2>
    </div>
  );
}

export default function DoctorInformationStep({ value, onChange, errors = {}, onClearError }: DoctorInformationStepProps) {
  const update = (field: keyof DoctorInformation, val: string) => {
    onChange({ ...value, [field]: val });
    onClearError?.(field);
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
    <div className="border border-[#E5E7EB] rounded-[8px] bg-white shadow-[0_0_12px_rgba(0,0,0,0.06)]">

      {/* Personal Information */}
      <section className="px-4 sm:px-7 py-5">
        <SectionTitle icon={<UserRound size={30} aria-hidden />} title="Personal Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2 relative">
            <span className={labelCls}>Full Name <span className="text-[#EF4444]">*</span></span>
            <input
              value={value.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              required
              className={getInputCls('fullName')}
            />
            <ErrorMsg field="fullName" />
          </label>

          <label className="flex flex-col gap-1.5 relative">
            <span className={labelCls}>Email Address <span className="text-[#EF4444]">*</span></span>
            <input
              type="email"
              value={value.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className={getInputCls('email')}
            />
            <ErrorMsg field="email" />
          </label>

          <label className="flex flex-col gap-2 relative">
            <span className={labelCls}>WhatsApp Number <span className="text-[#EF4444]">*</span></span>
            <div className="grid grid-cols-[90px_1fr] gap-1">
              <div className="relative">
                <select
                  aria-label="Country calling code"
                  value={value.countryCode}
                  onChange={(e) => update('countryCode', e.target.value)}
                  className={selectCls}
                >
                  <option>+20</option>
                  <option>+966</option>
                  <option>+971</option>
                  <option>+962</option>
                  <option>+1</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
              </div>
              <input
                type="tel"
                aria-label="WhatsApp phone number"
                value={value.whatsapp}
                onChange={(e) => update('whatsapp', e.target.value.replace(/\D/g, ''))}
                placeholder="10 1234 5678"
                autoComplete="tel"
                required
                className={getInputCls('whatsapp')}
              />
            </div>
            <ErrorMsg field="whatsapp" />
          </label>
        </div>
      </section>

      <hr className="border-t border-[#E5E7EB] mx-4 sm:mx-7 my-0" />

      {/* Clinic Information */}
      <section className="px-4 sm:px-7 py-5">
        <SectionTitle icon={<Building2 size={30} aria-hidden />} title="Clinic Information" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <label className="flex flex-col gap-2 relative">
            <span className={labelCls}>Clinic Name <span className="text-[#EF4444]">*</span></span>
            <input
              value={value.clinicName}
              onChange={(e) => update('clinicName', e.target.value)}
              placeholder="Enter clinic name"
              autoComplete="organization"
              required
              className={getInputCls('clinicName')}
            />
            <ErrorMsg field="clinicName" />
          </label>

          <label className="flex flex-col gap-1.5 relative">
            <span className={labelCls}>Country <span className="text-[#EF4444]">*</span></span>
            <div className="relative">
              <select
                value={value.country}
                onChange={(e) => update('country', e.target.value)}
                required
                className={getInputCls('country', selectCls)}
              >
                <option value="">Select your country</option>
                <option>Egypt</option>
                <option>Saudi Arabia</option>
                <option>United Arab Emirates</option>
                <option>Jordan</option>
                <option>United States</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
            </div>
            <ErrorMsg field="country" />
          </label>

          <label className="flex flex-col gap-1.5 relative">
            <span className={labelCls}>City</span>
            <input
              value={value.city}
              onChange={(e) => update('city', e.target.value)}
              placeholder="Enter city"
              autoComplete="address-level2"
              className={inputCls}
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={labelCls}>
              Address{' '}
              <span className="text-[12px] text-[#6B7280] font-normal">(Optional)</span>
            </span>
            <textarea
              rows={2}
              value={value.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Enter clinic address"
              autoComplete="street-address"
              className={inputCls + ' resize-y py-2.5'}
            />
          </label>
        </div>
      </section>

    </div>
  );
}
