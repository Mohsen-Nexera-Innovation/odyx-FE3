'use client';

import type { FormEvent } from 'react';
import type { DemoApplicationId, DemoProductId } from '@/content/request-demo';
import type {
  DemoFormState,
  DemoFormStatus,
  DemoFormUpdate,
} from './demoForm';
import { ContactSection } from './sections/ContactSection';
import { PracticeSection } from './sections/PracticeSection';
import { ScheduleSection } from './sections/ScheduleSection';

export type { DemoFormState } from './demoForm';

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
  scrollMarginTop = 160,
}: {
  formId: string;
  form: DemoFormState;
  errors: Record<string, string>;
  status: DemoFormStatus;
  submitError: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  update: DemoFormUpdate;
  toggleProduct: (id: DemoProductId) => void;
  toggleApplication: (id: DemoApplicationId) => void;
  scrollMarginTop?: number;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-7 md:gap-8"
      noValidate
    >
      <ContactSection
        formId={formId}
        form={form}
        errors={errors}
        update={update}
        scrollMarginTop={scrollMarginTop}
      />
      <PracticeSection
        formId={formId}
        form={form}
        errors={errors}
        update={update}
        toggleProduct={toggleProduct}
        toggleApplication={toggleApplication}
        scrollMarginTop={scrollMarginTop}
      />
      <ScheduleSection
        formId={formId}
        form={form}
        errors={errors}
        status={status}
        submitError={submitError}
        update={update}
        scrollMarginTop={scrollMarginTop}
      />
    </form>
  );
}
