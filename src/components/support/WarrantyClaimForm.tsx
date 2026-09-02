'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Upload } from 'lucide-react';
import { ApiError } from '@/lib/api/client';
import {
  createWarrantyClaimApi,
  type WarrantyClaimProduct,
} from '@/lib/api/leads';
import { SUPPORT_PRODUCTS } from '@/content/support';
import {
  isValidPhoneNumber,
  PHONE_INVALID_MESSAGE,
  PHONE_MAX_LENGTH,
  sanitizePhoneInput,
} from '@/lib/phone';

const inputClass =
  'w-full h-[42px] rounded-[8px] border border-[#E5E7EB] bg-white px-3.5 text-[13px] font-medium text-[#0A1020] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]';
const labelClass = 'text-[13px] font-bold text-[#0A1020]';

export function WarrantyClaimForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [invoiceName, setInvoiceName] = useState('');
  const [imagesName, setImagesName] = useState('');
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [phone, setPhone] = useState('');

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const fullName = String(data.get('fullName') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const clinicName = String(data.get('clinicName') ?? '').trim();
    const product = String(data.get('product') ?? '').trim() as WarrantyClaimProduct;
    const serialNumber = String(data.get('serialNumber') ?? '').trim();
    const purchaseDate = String(data.get('purchaseDate') ?? '').trim();
    const dealer = String(data.get('dealer') ?? '').trim();
    const problemDescription = String(data.get('problemDescription') ?? '').trim();

    if (!isValidPhoneNumber(phone)) {
      setError(PHONE_INVALID_MESSAGE);
      return;
    }

    setSubmitting(true);
    try {
      await createWarrantyClaimApi({
        fullName,
        email,
        phone: phone.trim(),
        clinicName: clinicName || undefined,
        product,
        serialNumber,
        purchaseDate,
        dealer,
        problemDescription,
        invoice: invoiceFile,
        evidence: evidenceFiles,
      });
      setSubmitted(true);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Could not submit your claim. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
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
            <span className={labelClass}>Full Name</span>
            <input
              required
              name="fullName"
              type="text"
              placeholder="Your full name"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Email</span>
            <input
              required
              name="email"
              type="email"
              placeholder="you@clinic.com"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Phone</span>
            <input
              required
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={PHONE_MAX_LENGTH}
              placeholder="+20 100 123 4567"
              className={inputClass}
              value={phone}
              onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Clinic / Lab (Optional)</span>
            <input
              name="clinicName"
              type="text"
              placeholder="Clinic or lab name"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Product</span>
            <select required name="product" defaultValue="" className={`${inputClass} appearance-none`}>
              <option value="" disabled>
                Select Product
              </option>
              {SUPPORT_PRODUCTS.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Serial Number</span>
            <input
              required
              name="serialNumber"
              type="text"
              placeholder="Enter serial number"
              className={inputClass}
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Purchase Date</span>
            <input required name="purchaseDate" type="date" className={inputClass} />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className={labelClass}>Dealer / Store</span>
            <input
              required
              name="dealer"
              type="text"
              placeholder="Enter dealer or store name"
              className={inputClass}
            />
          </label>
        </div>

      <label className="mt-4 flex flex-col gap-1.5">
        <span className={labelClass}>Problem Description</span>
        <textarea
          required
          name="problemDescription"
          rows={4}
          minLength={10}
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
          <label className="mt-2 inline-flex h-[38px] w-[130px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#0050D8]/20 bg-white px-3.5 text-[13px] font-bold text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40">
            <Upload size={14} aria-hidden />
            <span className="truncate">{invoiceName || 'Choose File'}</span>
            <input
              type="file"
              accept="application/pdf,image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setInvoiceFile(file);
                setInvoiceName(file?.name ?? '');
              }}
            />
          </label>
        </div>

        <div className="flex flex-col gap-1.5">
          <div>
            <span className={labelClass}>Upload Images / Videos (Optional)</span>
            <p className="mt-0.5 text-[11px] font-medium text-[#6B7280]">(Show the issue clearly)</p>
          </div>
          <label className="mt-2 inline-flex h-[38px] w-[130px] cursor-pointer items-center justify-center gap-2 rounded-full border border-[#0050D8]/20 bg-white px-3.5 text-[13px] font-bold text-[#0050D8] transition-colors hover:bg-[#F3F7FF] hover:border-[#0050D8]/40">
            <Upload size={14} aria-hidden />
            <span className="truncate">{imagesName || 'Choose File'}</span>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              className="sr-only"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []).slice(0, 5);
                setEvidenceFiles(files);
                setImagesName(
                  files.length === 0
                    ? ''
                    : files.length === 1
                      ? files[0].name
                      : `${files.length} files`,
                );
              }}
            />
          </label>
        </div>
      </div>

        {error ? (
          <p className="mt-4 text-center text-[13px] font-medium text-[#DC2626]" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-[46px] w-[200px] items-center justify-center rounded-full bg-[#0050D8] px-7 text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors hover:bg-[#0040B0] disabled:opacity-60"
          >
            {submitting ? 'Submitting…' : 'Submit Claim'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default WarrantyClaimForm;
