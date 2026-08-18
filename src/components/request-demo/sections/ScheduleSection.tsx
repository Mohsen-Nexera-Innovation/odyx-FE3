import Link from 'next/link';
import {
  DEMO_TIME_SLOTS,
  DEMO_TIMEZONES,
  DEMO_TYPES,
  REQUEST_DEMO_FORM,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import {
  ArrowIcon,
  CheckIcon,
  DEMO_TYPE_ICONS,
  LockIcon,
} from '../DemoIcons';
import { Field } from '../Field';
import type {
  DemoFormState,
  DemoFormStatus,
  DemoFormUpdate,
} from '../demoForm';
import {
  choiceCardClass,
  choiceCardSelectedClass,
  inputClass,
  inputErrorClass,
  selectClass,
  textareaClass,
} from '../formStyles';
import { SectionHead } from './SectionHead';

export function ScheduleSection({
  formId,
  form,
  errors,
  status,
  submitError,
  update,
  scrollMarginTop,
}: {
  formId: string;
  form: DemoFormState;
  errors: Record<string, string>;
  status: DemoFormStatus;
  submitError: string;
  update: DemoFormUpdate;
  scrollMarginTop: number;
}) {
  const copy = REQUEST_DEMO_FORM;

  return (
    <section
      id="rd-section-schedule"
      style={{ scrollMarginTop }}
      className="border-t border-[#EEF1F5] pt-6"
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

      <div className="mb-6 grid grid-cols-1 gap-4 gap-x-[0.9rem] sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1.35fr]">
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
            <option value="" disabled>
              {copy.sections.schedule.timezone.placeholder}
            </option>
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

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] border-0 bg-[#0050D8] px-[1.4rem] py-3 text-[0.95rem] font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors duration-150 hover:bg-[#0040B0] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-60"
          disabled={status === 'submitting'}
        >
          {status === 'submitting'
            ? 'Submitting…'
            : copy.sections.schedule.submitLabel}
          <ArrowIcon className="h-4 w-4 rtl:rotate-180" />
        </button>
        <p className="m-0 inline-flex items-center justify-center gap-1.5 text-center text-xs font-medium text-[#6B7280] sm:justify-start sm:text-start">
          <LockIcon className="h-3.5 w-3.5 shrink-0" />
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
  );
}
