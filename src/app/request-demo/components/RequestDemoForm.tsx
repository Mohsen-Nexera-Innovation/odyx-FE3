'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { FormEvent } from 'react';
import {
  DEMO_APPLICATIONS,
  DEMO_CHAIR_OPTIONS,
  DEMO_COUNTRIES,
  DEMO_LANGUAGES,
  DEMO_PRODUCTS,
  DEMO_ROLES,
  DEMO_SPECIALTIES,
  DEMO_TIME_SLOTS,
  DEMO_TIMEZONES,
  DEMO_TYPES,
  REQUEST_DEMO_FORM,
  type DemoApplicationId,
  type DemoProductId,
  type DemoRoleId,
  type DemoTypeId,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import {
  APPLICATION_ICONS,
  ArrowIcon,
  CheckIcon,
  DEMO_TYPE_ICONS,
  LockIcon,
  ROLE_ICONS,
} from './DemoIcons';
import { Field } from './Field';
import {
  choiceCardClass,
  choiceCardSelectedClass,
  inputClass,
  inputErrorClass,
  selectClass,
  textareaClass,
} from './formStyles';

export type DemoFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  language: string;
  role: DemoRoleId;
  clinicName: string;
  chairs: string;
  specialty: string;
  products: DemoProductId[];
  applications: DemoApplicationId[];
  demoType: DemoTypeId;
  date: string;
  time: string;
  timezone: string;
  notes: string;
  privacy: boolean;
  marketing: boolean;
};

function SectionHead({
  number,
  titleId,
  title,
  subtitle,
}: {
  number: number;
  titleId: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-[1.15rem] flex items-start gap-3">
      <span
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0050D8] text-xs font-bold text-white"
        aria-hidden
      >
        {number}
      </span>
      <div>
        <h2 id={titleId} className="m-0 text-lg font-bold leading-tight text-[#0A1020]">
          {title}
        </h2>
        <p className="mt-0.5 text-[13px] font-medium leading-snug text-[#6B7280]">
          {subtitle}
        </p>
      </div>
    </header>
  );
}

function CheckMark({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'absolute start-2 top-2 inline-flex h-[1.05rem] w-[1.05rem] items-center justify-center rounded border-[1.5px] border-[#D1D5DB] bg-white text-white',
        on && 'border-[#0050D8] bg-[#0050D8]',
      )}
      aria-hidden
    >
      {on ? <CheckIcon className="h-3 w-3" /> : null}
    </span>
  );
}

export function RequestDemoForm({
  formId,
  form,
  errors,
  status,
  submitError,
  onSubmit,
  update,
  toggleProduct,
  toggleApplication,
}: {
  formId: string;
  form: DemoFormState;
  errors: Record<string, string>;
  status: 'idle' | 'submitting' | 'sent' | 'error';
  submitError: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  update: <K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) => void;
  toggleProduct: (id: DemoProductId) => void;
  toggleApplication: (id: DemoApplicationId) => void;
}) {
  const copy = REQUEST_DEMO_FORM;

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-7 rounded-2xl border border-[#E5E7EB] bg-white px-[1.15rem] py-[1.35rem] md:gap-8 md:px-[1.6rem] md:py-6 md:pb-7"
      noValidate
    >
      {/* Contact */}
      <section
        id="rd-section-contact"
        className="scroll-mt-28"
        aria-labelledby={`${formId}-contact-title`}
      >
        <SectionHead
          number={1}
          titleId={`${formId}-contact-title`}
          title={copy.sections.contact.title}
          subtitle={copy.sections.contact.subtitle}
        />

        <div className="grid grid-cols-1 gap-4 gap-x-[0.9rem] sm:grid-cols-2">
          <Field
            id={`${formId}-firstName`}
            label={copy.sections.contact.fields.firstName.label}
            required
            error={errors.firstName}
          >
            <input
              id={`${formId}-firstName`}
              className={cn(inputClass, inputErrorClass(!!errors.firstName))}
              autoComplete="given-name"
              placeholder={copy.sections.contact.fields.firstName.placeholder}
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-lastName`}
            label={copy.sections.contact.fields.lastName.label}
            required
            error={errors.lastName}
          >
            <input
              id={`${formId}-lastName`}
              className={cn(inputClass, inputErrorClass(!!errors.lastName))}
              autoComplete="family-name"
              placeholder={copy.sections.contact.fields.lastName.placeholder}
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-email`}
            label={copy.sections.contact.fields.email.label}
            required
            error={errors.email}
          >
            <input
              id={`${formId}-email`}
              type="email"
              className={cn(inputClass, inputErrorClass(!!errors.email))}
              autoComplete="email"
              placeholder={copy.sections.contact.fields.email.placeholder}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-phone`}
            label={copy.sections.contact.fields.phone.label}
            required
            error={errors.phone}
          >
            <input
              id={`${formId}-phone`}
              type="tel"
              className={cn(inputClass, inputErrorClass(!!errors.phone))}
              autoComplete="tel"
              placeholder={copy.sections.contact.fields.phone.placeholder}
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-country`}
            label={copy.sections.contact.fields.country.label}
            required
            error={errors.country}
          >
            <select
              id={`${formId}-country`}
              className={cn(selectClass, inputErrorClass(!!errors.country))}
              value={form.country}
              onChange={(e) => update('country', e.target.value)}
            >
              <option value="" disabled>
                {copy.sections.contact.fields.country.placeholder}
              </option>
              {DEMO_COUNTRIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field
            id={`${formId}-city`}
            label={copy.sections.contact.fields.city.label}
          >
            <input
              id={`${formId}-city`}
              className={inputClass}
              autoComplete="address-level2"
              placeholder={copy.sections.contact.fields.city.placeholder}
              value={form.city}
              onChange={(e) => update('city', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-language`}
            label={copy.sections.contact.fields.language.label}
          >
            <select
              id={`${formId}-language`}
              className={selectClass}
              value={form.language}
              onChange={(e) => update('language', e.target.value)}
            >
              {DEMO_LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Practice */}
      <section
        id="rd-section-practice"
        className="scroll-mt-28 border-t border-[#EEF1F5] pt-6"
        aria-labelledby={`${formId}-practice-title`}
      >
        <SectionHead
          number={2}
          titleId={`${formId}-practice-title`}
          title={copy.sections.practice.title}
          subtitle={copy.sections.practice.subtitle}
        />

        <fieldset className="m-0 mb-6 border-0 p-0">
          <legend className="mb-[0.65rem] p-0 text-[13px] font-bold text-[#0A1020]">
            {copy.sections.practice.aboutYou.label}{' '}
            <span className="text-[#EF4444]" aria-hidden>
              *
            </span>
          </legend>
          <div
            className="grid grid-cols-2 gap-[0.65rem] sm:grid-cols-3 min-[900px]:grid-cols-6"
            role="radiogroup"
            aria-label={copy.sections.practice.aboutYou.label}
          >
            {DEMO_ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.icon];
              const selected = form.role === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={cn(
                    choiceCardClass,
                    selected && choiceCardSelectedClass,
                  )}
                  onClick={() => update('role', role.id)}
                >
                  <Icon
                    className={cn(
                      'h-[1.35rem] w-[1.35rem]',
                      selected ? 'text-[#0050D8]' : 'text-[#7B8494]',
                    )}
                  />
                  <span
                    className={cn(
                      'text-xs font-semibold leading-tight',
                      selected ? 'text-[#0050D8]' : 'text-[#0A1020]',
                    )}
                  >
                    {role.label}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-6 grid grid-cols-1 gap-4 gap-x-[0.9rem] md:grid-cols-[1.4fr_1fr_1fr]">
          <Field
            id={`${formId}-clinic`}
            label={copy.sections.practice.clinicName.label}
            required
            error={errors.clinicName}
          >
            <input
              id={`${formId}-clinic`}
              className={cn(inputClass, inputErrorClass(!!errors.clinicName))}
              autoComplete="organization"
              placeholder={copy.sections.practice.clinicName.placeholder}
              value={form.clinicName}
              onChange={(e) => update('clinicName', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-chairs`}
            label={copy.sections.practice.chairs.label}
            required
            error={errors.chairs}
          >
            <select
              id={`${formId}-chairs`}
              className={cn(selectClass, inputErrorClass(!!errors.chairs))}
              value={form.chairs}
              onChange={(e) => update('chairs', e.target.value)}
            >
              <option value="" disabled>
                {copy.sections.practice.chairs.placeholder}
              </option>
              {DEMO_CHAIR_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field
            id={`${formId}-specialty`}
            label={copy.sections.practice.specialty.label}
            hint={copy.sections.practice.specialty.optionalNote}
          >
            <select
              id={`${formId}-specialty`}
              className={selectClass}
              value={form.specialty}
              onChange={(e) => update('specialty', e.target.value)}
            >
              <option value="">
                {copy.sections.practice.specialty.placeholder}
              </option>
              {DEMO_SPECIALTIES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <fieldset className="m-0 mb-6 border-0 p-0">
          <legend className="mb-[0.65rem] p-0 text-[13px] font-bold text-[#0A1020]">
            {copy.sections.practice.products.label}{' '}
            <span className="text-[#EF4444]" aria-hidden>
              *
            </span>
          </legend>
          <p className="-mt-[0.35rem] mb-3 text-xs font-medium text-[#9CA3AF]">
            {copy.sections.practice.products.hint}
          </p>
          <div className="grid grid-cols-2 gap-[0.7rem] min-[700px]:grid-cols-3 min-[1100px]:grid-cols-6">
            {DEMO_PRODUCTS.map((product) => {
              const selected = form.products.includes(product.id);
              return (
                <button
                  key={product.id}
                  type="button"
                  aria-pressed={selected}
                  className={cn(
                    choiceCardClass,
                    'min-h-36 items-start px-[0.65rem] py-[0.7rem] text-start',
                    selected && choiceCardSelectedClass,
                  )}
                  onClick={() => toggleProduct(product.id)}
                >
                  <CheckMark on={selected} />
                  <span className="my-[0.35rem] mb-[0.15rem] flex h-[4.5rem] w-full items-center justify-center overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt=""
                      width={160}
                      height={120}
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span className="text-[12.5px] font-bold leading-tight text-[#0A1020]">
                    {product.title}
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-[#6B7280]">
                    {product.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.products ? (
            <p className="mt-2 text-xs font-medium text-[#EF4444]" role="alert">
              {errors.products}
            </p>
          ) : null}
        </fieldset>

        <fieldset className="m-0 border-0 p-0">
          <legend className="mb-[0.65rem] p-0 text-[13px] font-bold text-[#0A1020]">
            {copy.sections.practice.applications.label}
          </legend>
          <p className="-mt-[0.35rem] mb-3 text-xs font-medium text-[#9CA3AF]">
            {copy.sections.practice.applications.hint}
          </p>
          <div className="grid grid-cols-1 gap-[0.55rem] min-[560px]:grid-cols-2 min-[900px]:grid-cols-4">
            {DEMO_APPLICATIONS.map((app) => {
              const Icon = APPLICATION_ICONS[app.icon];
              const selected = form.applications.includes(app.id);
              return (
                <label
                  key={app.id}
                  className={cn(
                    choiceCardClass,
                    'flex-row justify-start gap-[0.55rem] px-3 py-[0.65rem] text-start',
                    selected && choiceCardSelectedClass,
                  )}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selected}
                    onChange={() => toggleApplication(app.id)}
                  />
                  <span
                    className={cn(
                      'static inline-flex h-[1.05rem] w-[1.05rem] shrink-0 items-center justify-center rounded border-[1.5px] border-[#D1D5DB] bg-white text-white',
                      selected && 'border-[#0050D8] bg-[#0050D8]',
                    )}
                    aria-hidden
                  >
                    {selected ? <CheckIcon className="h-3 w-3" /> : null}
                  </span>
                  <Icon className="h-4 w-4 shrink-0 text-[#0050D8]" />
                  <span className="text-[12.5px] font-semibold text-[#0A1020]">
                    {app.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </section>

      {/* Schedule */}
      <section
        id="rd-section-schedule"
        className="scroll-mt-28 border-t border-[#EEF1F5] pt-6"
        aria-labelledby={`${formId}-schedule-title`}
      >
        <SectionHead
          number={3}
          titleId={`${formId}-schedule-title`}
          title={copy.sections.schedule.title}
          subtitle={copy.sections.schedule.subtitle}
        />

        <fieldset className="m-0 mb-6 border-0 p-0">
          <legend className="mb-[0.65rem] p-0 text-[13px] font-bold text-[#0A1020]">
            {copy.sections.schedule.demoType.label}{' '}
            <span className="text-[#EF4444]" aria-hidden>
              *
            </span>
          </legend>
          <div
            className="grid grid-cols-1 gap-[0.7rem] sm:grid-cols-3"
            role="radiogroup"
            aria-label={copy.sections.schedule.demoType.label}
          >
            {DEMO_TYPES.map((type) => {
              const Icon = DEMO_TYPE_ICONS[type.icon];
              const selected = form.demoType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={cn(
                    choiceCardClass,
                    'min-h-[6.75rem] items-start gap-[0.3rem] px-[0.95rem] py-4 text-start',
                    selected && choiceCardSelectedClass,
                  )}
                  onClick={() => update('demoType', type.id)}
                >
                  {selected ? (
                    <span
                      className="absolute end-[0.55rem] top-[0.55rem] inline-flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full bg-[#0050D8] text-white"
                      aria-hidden
                    >
                      <CheckIcon className="h-3 w-3" />
                    </span>
                  ) : null}
                  <Icon className="mb-[0.15rem] h-[1.4rem] w-[1.4rem] text-[#0050D8]" />
                  <span className="text-sm font-bold text-[#0A1020]">
                    {type.title}
                  </span>
                  <span className="text-xs font-medium leading-snug text-[#6B7280]">
                    {type.body}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mb-6 grid grid-cols-1 gap-4 gap-x-[0.9rem] md:grid-cols-[1fr_1fr_1.35fr]">
          <Field
            id={`${formId}-date`}
            label={copy.sections.schedule.date.label}
            required
            error={errors.date}
          >
            <input
              id={`${formId}-date`}
              type="date"
              className={cn(inputClass, inputErrorClass(!!errors.date))}
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
            />
          </Field>
          <Field
            id={`${formId}-time`}
            label={copy.sections.schedule.time.label}
            required
            error={errors.time}
          >
            <select
              id={`${formId}-time`}
              className={cn(selectClass, inputErrorClass(!!errors.time))}
              value={form.time}
              onChange={(e) => update('time', e.target.value)}
            >
              <option value="" disabled>
                {copy.sections.schedule.time.placeholder}
              </option>
              {DEMO_TIME_SLOTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field
            id={`${formId}-timezone`}
            label={copy.sections.schedule.timezone.label}
          >
            <select
              id={`${formId}-timezone`}
              className={selectClass}
              value={form.timezone}
              onChange={(e) => update('timezone', e.target.value)}
            >
              {DEMO_TIMEZONES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          id={`${formId}-notes`}
          label={copy.sections.schedule.notes.label}
          hint={copy.sections.schedule.notes.optionalNote}
          className="mb-6"
        >
          <textarea
            id={`${formId}-notes`}
            className={textareaClass}
            rows={5}
            placeholder={copy.sections.schedule.notes.placeholder}
            value={form.notes}
            onChange={(e) => update('notes', e.target.value)}
          />
        </Field>

        <div className="mb-6 flex flex-col gap-[0.7rem]">
          <label className="flex cursor-pointer items-start gap-[0.65rem] text-[13px] font-medium leading-snug text-[#0A1020]">
            <input
              type="checkbox"
              className="mt-[0.15rem] h-4 w-4 shrink-0 accent-[#0050D8]"
              checked={form.privacy}
              onChange={(e) => update('privacy', e.target.checked)}
            />
            <span>
              {copy.sections.schedule.privacy.labelBefore}{' '}
              <Link
                href={copy.sections.schedule.privacy.privacyHref}
                className="font-bold text-[#0050D8] underline underline-offset-2"
              >
                {copy.sections.schedule.privacy.privacyLabel}
              </Link>{' '}
              {copy.sections.schedule.privacy.and}{' '}
              <Link
                href={copy.sections.schedule.privacy.termsHref}
                className="font-bold text-[#0050D8] underline underline-offset-2"
              >
                {copy.sections.schedule.privacy.termsLabel}
              </Link>
              <span className="text-[#EF4444]" aria-hidden>
                {' '}
                *
              </span>
            </span>
          </label>
          {errors.privacy ? (
            <p className="text-xs font-medium text-[#EF4444]" role="alert">
              {errors.privacy}
            </p>
          ) : null}
          <label className="flex cursor-pointer items-start gap-[0.65rem] text-[13px] font-medium leading-snug text-[#0A1020]">
            <input
              type="checkbox"
              className="mt-[0.15rem] h-4 w-4 shrink-0 accent-[#0050D8]"
              checked={form.marketing}
              onChange={(e) => update('marketing', e.target.checked)}
            />
            <span>{copy.sections.schedule.marketing.label}</span>
          </label>
        </div>

        <div className="flex flex-col items-stretch gap-3 min-[720px]:flex-row min-[720px]:items-center">
          <button
            type="submit"
            className="inline-flex min-h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-0 bg-[#0050D8] px-[1.4rem] py-3 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors duration-150 hover:bg-[#0040B0] disabled:cursor-not-allowed disabled:opacity-60 min-[720px]:flex-none min-[720px]:min-w-60"
            disabled={status === 'submitting'}
          >
            {status === 'submitting'
              ? 'Submitting…'
              : copy.sections.schedule.submitLabel}
            <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
          </button>
          <p className="m-0 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B7280]">
            <LockIcon className="h-3.5 w-3.5" />
            {copy.sections.schedule.secureNote}
          </p>
        </div>

        {status === 'sent' ? (
          <p className="mt-[0.85rem] text-[13px] font-semibold text-[#0050D8]" role="status">
            {copy.success}
          </p>
        ) : null}
        {status === 'error' && submitError ? (
          <p className="mt-[0.85rem] text-[13px] font-semibold text-[#DC2626]" role="alert">
            {submitError}
          </p>
        ) : null}
      </section>
    </form>
  );
}
