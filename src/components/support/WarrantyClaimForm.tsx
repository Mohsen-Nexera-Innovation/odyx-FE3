'use client';

import { useState } from 'react';
import { CheckCircle2, Upload } from 'lucide-react';
import { WARRANTY_CLAIM_PRODUCT_OPTIONS } from './data';

const inputClass =
  'w-full h-[42px] rounded-[8px] border border-[#E5E7EB] bg-white px-3.5 text-[13px] font-medium text-[#0A1020] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]';
const labelClass = 'text-[13px] font-bold text-[#0A1020]';

export function WarrantyClaimForm() {
  const [submitted, setSubmitted] = useState(false);
  const [invoiceName, setInvoiceName] = useState('');
  const [imagesName, setImagesName] = useState('');

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-[12px] border border-[#E5E7EB] bg-white p-8 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F8EE] text-[#16A34A]">
          <CheckCircle2 size={24} aria-hidden />
        </span>
        <h3 className="text-[16px] font-bold text-[#0A1020]">Claim submitted</h3>
        <p className="max-w-[420px] text-[13px] font-medium text-[#6B7280]">
          Thank you — our warranty team will review your claim and reach out by email within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-[12px] border border-[#E5E7EB] bg-white p-5 sm:p-6"
    >
      <h3 className="text-[16px] font-bold text-[#0A1020]">Submit a Warranty Claim</h3>
      <p className="mt-1 text-[13px] font-medium text-[#6B7280]">
        Please fill out the form and we will review your warranty claim.
      </p>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Product</span>
          <select required defaultValue="" className={`${inputClass} appearance-none`}>
            <option value="" disabled>
              Select product
            </option>
            {WARRANTY_CLAIM_PRODUCT_OPTIONS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Serial Number</span>
          <input required type="text" placeholder="e.g. ODYX-S1-000123" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Full Name</span>
          <input required type="text" placeholder="Your full name" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Email</span>
          <input required type="email" placeholder="you@clinic.com" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Purchase Date</span>
          <input required type="date" className={inputClass} />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className={labelClass}>Date of Issue</span>
          <input required type="date" className={inputClass} />
        </label>
      </div>

      <label className="mt-4 flex flex-col gap-1.5">
        <span className={labelClass}>Problem Description</span>
        <textarea
          required
          rows={4}
          placeholder="Describe the issue you are experiencing..."
          className="w-full resize-vertical rounded-[8px] border border-[#E5E7EB] bg-white px-3.5 py-2.5 text-[13px] font-medium text-[#0A1020] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]"
        />
      </label>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Upload Invoice / Proof of Purchase</span>
          <label className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[8px] border border-dashed border-[#D1D5DB] bg-[#F7F9FB] px-3.5 text-[13px] font-semibold text-[#6B7280] transition-colors hover:border-[#0050D8] hover:text-[#0050D8]">
            <Upload size={15} aria-hidden />
            <span className="truncate">{invoiceName || 'Choose File'}</span>
            <input
              type="file"
              accept="application/pdf,image/*"
              className="sr-only"
              onChange={(e) => setInvoiceName(e.target.files?.[0]?.name ?? '')}
            />
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className={labelClass}>Upload Images (Optional)</span>
          <label className="flex h-[42px] cursor-pointer items-center gap-2 rounded-[8px] border border-dashed border-[#D1D5DB] bg-[#F7F9FB] px-3.5 text-[13px] font-semibold text-[#6B7280] transition-colors hover:border-[#0050D8] hover:text-[#0050D8]">
            <Upload size={15} aria-hidden />
            <span className="truncate">{imagesName || 'Choose File'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => setImagesName(e.target.files?.[0]?.name ?? '')}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-[46px] w-full sm:w-auto items-center justify-center rounded-[8px] bg-[#0050D8] px-7 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors hover:bg-[#0040B0]"
      >
        Submit Claim
      </button>
    </form>
  );
}

export default WarrantyClaimForm;
