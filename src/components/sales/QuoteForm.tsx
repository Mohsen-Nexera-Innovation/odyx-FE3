'use client';

import { useId, useState, type FormEvent } from 'react';
import { z } from 'zod';
import {
  CONTACT_SALES_QUOTE,
  type ProductInterestId,
} from '@/content/contact-sales';
import { ApiError } from '@/lib/api/client';
import { createQuoteRequestApi } from '@/lib/api/leads';
import { trackMetaLead } from '@/lib/meta-pixel';
import { ArrowIcon, ProductInterestIcon } from './SalesIcons';

const QuoteFormSchema = z.object({
  fullName: z.string().min(2, 'Full Name is required'),
  clinicName: z.string().min(2, 'Clinic / Lab Name is required'),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  city: z.string().min(1, 'City is required'),
  product: z.enum(['scanner', 'printer', 'cure', 'resin', 'ecosystem']),
  message: z.string().optional(),
});

type FormState = {
  fullName: string;
  clinicName: string;
  phone: string;
  email: string;
  city: string;
  product: ProductInterestId;
  message: string;
};

const INITIAL: FormState = {
  fullName: '',
  clinicName: '',
  phone: '',
  email: '',
  city: '',
  product: 'scanner',
  message: '',
};

export function QuoteForm() {
  const formId = useId();
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>(
    'idle',
  );
  const [submitError, setSubmitError] = useState('');

  const fields = CONTACT_SALES_QUOTE.fields;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: '' }));
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setSubmitError('');

    const result = QuoteFormSchema.safeParse(form);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(formattedErrors);
      setStatus('idle');
      return;
    }

    try {
      await createQuoteRequestApi({
        fullName: result.data.fullName,
        clinicName: result.data.clinicName,
        phone: result.data.phone,
        email: result.data.email,
        city: result.data.city,
        product: result.data.product,
        message: result.data.message?.trim() || undefined,
      });
      setForm(INITIAL);
      setStatus('sent');
      trackMetaLead();
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Something went wrong. Please try again.';
      setSubmitError(message);
      setStatus('error');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
      noValidate={false}
      aria-labelledby={`${formId}-title`}
    >
      <div className="mb-4">
        <h2
          id={`${formId}-title`}
          className="text-[16px] lg:text-[17px] font-bold text-[#0A1020] mb-1.5 block"
        >
          {CONTACT_SALES_QUOTE.title}
        </h2>
        <p className="text-[14px] lg:text-[15px] text-[#6B7280] font-medium leading-relaxed max-w-xl block">
          {CONTACT_SALES_QUOTE.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 cs-grid">
        {/* Left column — identity fields */}
        <div className="flex flex-col gap-7">
          <div className="cs-field relative">
            <label htmlFor={`${formId}-fullName`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.fullName.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </label>
            <input
              id={`${formId}-fullName`}
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder={fields.fullName.placeholder}
              value={form.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              className={`cs-input ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
            {errors.fullName && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.fullName}</span>}
          </div>

          <div className="cs-field relative">
            <label htmlFor={`${formId}-clinic`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.clinicName.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </label>
            <input
              id={`${formId}-clinic`}
              name="clinicName"
              type="text"
              autoComplete="organization"
              placeholder={fields.clinicName.placeholder}
              value={form.clinicName}
              onChange={(e) => update('clinicName', e.target.value)}
              className={`cs-input ${errors.clinicName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
            {errors.clinicName && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.clinicName}</span>}
          </div>

          <div className="cs-field relative">
            <label htmlFor={`${formId}-phone`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.phone.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={fields.phone.placeholder}
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className={`cs-input ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
            {errors.phone && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.phone}</span>}
          </div>

          <div className="cs-field relative">
            <label htmlFor={`${formId}-email`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.email.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </label>
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder={fields.email.placeholder}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={`cs-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            />
            {errors.email && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.email}</span>}
          </div>

          <div className="cs-field relative">
            <label htmlFor={`${formId}-city`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.city.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </label>
            <select
              id={`${formId}-city`}
              name="city"
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
              className={`cs-input cs-select ${errors.city ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
            >
              <option value="" disabled>
                {fields.city.placeholder}
              </option>
              {CONTACT_SALES_QUOTE.cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.city}</span>}
          </div>
        </div>

        {/* Right column — product + message */}
        <div className="flex flex-col gap-7">
          <fieldset className="cs-field relative border-0 p-0 m-0">
            <legend className="text-[13px] font-bold text-[var(--cs-ink)] mb-2 px-0">
              {fields.product.label} <span className="text-[#0050D8]" aria-hidden>*</span>
            </legend>
            <div
              className="flex flex-col gap-2"
              role="radiogroup"
              aria-label={fields.product.label}
            >
              {CONTACT_SALES_QUOTE.products.map((product) => {
                const selected = form.product === product.id;
                return (
                  <button
                    key={product.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-selected={selected}
                    className="cs-product-option"
                    onClick={() => update('product', product.id)}
                  >
                    <ProductInterestIcon id={product.id} selected={selected} />
                    <span className="text-[13px] font-semibold text-[var(--cs-ink)]">
                      {product.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <input type="hidden" name="product" value={form.product} />
            {errors.product && <span className="text-red-500 text-[12px] font-medium absolute -bottom-5 left-0">{errors.product}</span>}
          </fieldset>

          <div className="cs-field relative flex-1">
            <label htmlFor={`${formId}-message`} className="text-[13px] font-bold text-[var(--cs-ink)]">
              {fields.message.label}
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              placeholder={fields.message.placeholder}
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="cs-input cs-textarea"
              rows={6}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="cs-primary-btn"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? 'Submitting…' : CONTACT_SALES_QUOTE.submitLabel}
        <ArrowIcon className="h-4 w-4 rtl:rotate-180" aria-hidden />
      </button>

      {status === 'sent' && (
        <p className="text-[13px] font-medium text-[#0050D8]" role="status">
          Thanks — our sales team will contact you shortly.
        </p>
      )}
      {status === 'error' && submitError ? (
        <p className="text-[13px] font-medium text-red-600" role="alert">
          {submitError}
        </p>
      ) : null}
    </form>
  );
}
