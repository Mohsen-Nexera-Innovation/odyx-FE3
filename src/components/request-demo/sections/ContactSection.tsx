import {
  DEMO_COUNTRIES,
  DEMO_LANGUAGES,
  REQUEST_DEMO_FORM,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import { Field } from '../Field';
import type { DemoFormState, DemoFormUpdate } from '../demoForm';
import {
  inputClass,
  inputErrorClass,
  selectClass,
} from '../formStyles';
import { SectionHead } from './SectionHead';

export function ContactSection({
  formId,
  form,
  errors,
  update,
  scrollMarginTop,
}: {
  formId: string;
  form: DemoFormState;
  errors: Record<string, string>;
  update: DemoFormUpdate;
  scrollMarginTop: number;
}) {
  const copy = REQUEST_DEMO_FORM;

  return (
    <section
      id="rd-section-contact"
      style={{ scrollMarginTop }}
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
            <option value="" disabled>
              {copy.sections.contact.fields.language.placeholder}
            </option>
            {DEMO_LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </section>
  );
}
