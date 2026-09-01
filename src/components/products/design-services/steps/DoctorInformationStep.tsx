'use client';

import { Building2, ChevronDown, Search, UserRound } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { phoneDigits } from '@/lib/phone';
import { WORLD_COUNTRIES } from '../countries';
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

function CountrySelect({
  value,
  errorCls,
  onChange,
}: {
  value: string;
  errorCls: string;
  onChange: (country: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return WORLD_COUNTRIES;
    return WORLD_COUNTRIES.filter((country) => country.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`${errorCls} appearance-none pe-9 text-start`}
        >
          <span className={value ? 'text-[#0A1020]' : 'text-[#9CA3AF] font-normal'}>
            {value || 'Select your country'}
          </span>
        </button>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" size={16} />
      </div>

      {open ? (
        <div className="absolute z-30 top-full mt-1 w-full rounded-[6px] border border-[#E5E7EB] bg-white shadow-[0_8px_24px_rgba(10,16,32,0.12)] overflow-hidden">
          <div className="p-2 border-b border-[#E5E7EB]">
            <label className="relative block">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" aria-hidden />
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search country"
                aria-label="Search country"
                className="w-full h-8 border border-[#E5E7EB] rounded-[6px] bg-white text-[#0A1020] ps-8 pe-2 text-[13px] font-medium outline-none placeholder:text-[#9CA3AF] placeholder:font-normal focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]"
              />
            </label>
          </div>
          <ul role="listbox" aria-label="Countries" className="max-h-[148px] overflow-y-auto m-0 p-1 list-none">
            {filtered.length === 0 ? (
              <li className="px-2.5 py-2 text-[13px] font-medium text-[#6B7280]">No countries found</li>
            ) : (
              filtered.map((country) => {
                const selected = value === country;
                return (
                  <li key={country} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(country);
                        setOpen(false);
                      }}
                      className={`w-full text-start px-2.5 py-1.5 rounded-[4px] text-[13px] font-medium border-0 cursor-pointer ${
                        selected
                          ? 'bg-[#F3F7FF] text-[#0050D8]'
                          : 'bg-transparent text-[#0A1020] hover:bg-[#F7F9FB]'
                      }`}
                    >
                      {country}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      ) : null}
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
                onChange={(e) => update('whatsapp', phoneDigits(e.target.value))}
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

          <div className="flex flex-col gap-1.5 relative">
            <span className={labelCls}>Country <span className="text-[#EF4444]">*</span></span>
            <CountrySelect
              value={value.country}
              errorCls={getInputCls('country', selectCls)}
              onChange={(country) => update('country', country)}
            />
            <ErrorMsg field="country" />
          </div>

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
