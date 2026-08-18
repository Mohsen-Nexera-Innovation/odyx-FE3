import Image from 'next/image';
import {
  DEMO_APPLICATIONS,
  DEMO_CHAIR_OPTIONS,
  DEMO_PRODUCTS,
  DEMO_ROLES,
  DEMO_SPECIALTIES,
  REQUEST_DEMO_FORM,
  type DemoApplicationId,
  type DemoProductId,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import {
  APPLICATION_ICONS,
  CheckIcon,
  ROLE_ICONS,
} from '../DemoIcons';
import { Field } from '../Field';
import type { DemoFormState, DemoFormUpdate } from '../demoForm';
import {
  choiceCardClass,
  choiceCardSelectedClass,
  inputClass,
  inputErrorClass,
  selectClass,
} from '../formStyles';
import { SectionHead } from './SectionHead';

function CheckMark({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        'absolute start-2 top-2 z-[1] inline-flex h-[1.05rem] w-[1.05rem] items-center justify-center rounded border-[1.5px]',
        on
          ? 'border-[#0050D8] bg-[#0050D8] text-white'
          : 'border-[#D1D5DB] bg-white text-transparent',
      )}
      aria-hidden
    >
      {on ? <CheckIcon className="h-3 w-3" /> : null}
    </span>
  );
}

export function PracticeSection({
  formId,
  form,
  errors,
  update,
  toggleProduct,
  toggleApplication,
  scrollMarginTop,
}: {
  formId: string;
  form: DemoFormState;
  errors: Record<string, string>;
  update: DemoFormUpdate;
  toggleProduct: (id: DemoProductId) => void;
  toggleApplication: (id: DemoApplicationId) => void;
  scrollMarginTop: number;
}) {
  const copy = REQUEST_DEMO_FORM;

  return (
    <section
      id="rd-section-practice"
      style={{ scrollMarginTop }}
      className="border-t border-[#EEF1F5] pt-6"
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
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-[0.65rem] xl:grid-cols-6"
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

      <div className="mb-6 grid grid-cols-1 gap-4 gap-x-[0.9rem] sm:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr]">
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
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-[0.7rem] xl:grid-cols-3 2xl:grid-cols-6">
          {DEMO_PRODUCTS.map((product) => {
            const selected = form.products.includes(product.id);
            return (
              <button
                key={product.id}
                type="button"
                aria-pressed={selected}
                className={cn(
                  choiceCardClass,
                  'min-h-[8.5rem] items-start px-2 py-2.5 text-start sm:min-h-36 sm:px-[0.65rem] sm:py-[0.7rem]',
                  selected && choiceCardSelectedClass,
                )}
                onClick={() => toggleProduct(product.id)}
              >
                <CheckMark on={selected} />
                <span className="my-1 mb-0.5 flex h-14 w-full items-center justify-center overflow-hidden rounded-md sm:my-[0.35rem] sm:mb-[0.15rem] sm:h-[4.5rem]">
                  <Image
                    src={product.image}
                    alt=""
                    width={160}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="text-[11.5px] font-bold leading-tight text-[#0A1020] sm:text-[12.5px]">
                  {product.title}
                </span>
                <span className="text-[10.5px] font-medium leading-tight text-[#6B7280] sm:text-[11px]">
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
        <div className="grid grid-cols-1 gap-[0.55rem] sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4">
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
                    'static inline-flex h-[1.05rem] w-[1.05rem] shrink-0 items-center justify-center rounded border-[1.5px]',
                    selected
                      ? 'border-[#0050D8] bg-[#0050D8] text-white'
                      : 'border-[#D1D5DB] bg-white text-transparent',
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
  );
}
