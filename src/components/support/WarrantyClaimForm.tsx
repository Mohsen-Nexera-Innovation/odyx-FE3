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
      className="overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white"
    >
      <div className="flex flex-col justify-center bg-[#F9FAFB] border-b border-[#E5E7EB] px-5 py-3 sm:px-6">
        <h3 className="text-[16px] font-bold text-[#0A1020]">Submit a Warranty Claim</h3>
        <p className="mt-1 text-[13px] font-medium text-[#6B7280]">
          Please fill out the form below and our team will review your claim.
        </p>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Product</span>
            <select required defaultValue="" className={`${inputClass} appearance-none`}>
              <option value="" disabled>
                Select Product
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
            <input required type="text" placeholder="Enter serial number" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Purchase Date</span>
            <input required type="date" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Dealer / Store</span>
            <input required type="text" placeholder="Enter dealer or store name" className={inputClass} />
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

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <div>
            <span className={labelClass}>Upload Invoice / Proof of Purchase</span>
            <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">(PDF, JPG, PNG, Max 10MB)</p>
          </div>
          <label className="mt-2 inline-flex h-[38px] w-[130px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#0050D8]/20 bg-white px-3.5 text-[13px] font-bold text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40">
            <Upload size={14} aria-hidden />
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
          <div>
            <span className={labelClass}>Upload Images / Videos (Optional)</span>
            <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">(Show the issue clearly)</p>
          </div>
          <label className="mt-2 inline-flex h-[38px] w-[130px] cursor-pointer items-center justify-center gap-2 rounded-[8px] border border-[#0050D8]/20 bg-white px-3.5 text-[13px] font-bold text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40">
            <Upload size={14} aria-hidden />
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

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="inline-flex h-[46px] w-[200px] items-center justify-center rounded-[8px] bg-[#0050D8] px-7 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors hover:bg-[#0040B0]"
          >
            Submit Claim
          </button>
        </div>
      </div>
    </form>
  );
}

export default WarrantyClaimForm;
