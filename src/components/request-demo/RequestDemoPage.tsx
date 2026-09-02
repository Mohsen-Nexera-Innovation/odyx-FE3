'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from 'react';
import {
  DEMO_LANGUAGES,
  DEMO_ROLES,
  DEMO_TIMEZONES,
  DEMO_TYPES,
  REQUEST_DEMO_FORM,
  REQUEST_DEMO_STEPS,
  type DemoApplicationId,
  type DemoProductId,
  type DemoStepId,
} from '@/content/request-demo';
import { ApiError } from '@/lib/api/client';
import {
  createDemoRequestApi,
  type DemoRequestApplication,
  type DemoRequestProduct,
} from '@/lib/api/leads';
import { trackMetaLead } from '@/lib/meta-pixel';
import { RequestDemoForm } from './RequestDemoForm';
import { RequestDemoHero } from './RequestDemoHero';
import {
  RD_HEADER_OFFSET_PX,
  RD_STICKY_STACK_GAP_PX,
  RequestDemoProgress,
} from './RequestDemoProgress';
import { RequestDemoSummary } from './RequestDemoSummary';
import { RequestDemoTrust } from './RequestDemoTrust';
import {
  DemoFormSchema,
  INITIAL,
  formatDisplayDate,
  getStepState,
  scrollToFirstErrorSection,
  scrollToSection,
  type DemoFormState,
  type DemoFormStatus,
} from './demoForm';
import { cardClass, shellClass } from './formStyles';
import { cn } from '@/lib/cn';

export default function RequestDemoPage({
  initialProducts = [],
}: {
  initialProducts?: DemoProductId[];
}) {
  const formId = useId();
  const [form, setForm] = useState<DemoFormState>(() => ({
    ...INITIAL,
    products: initialProducts,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState<DemoStepId>('contact');
  const [status, setStatus] = useState<DemoFormStatus>('idle');
  const [submitError, setSubmitError] = useState('');
  const [progressHeight, setProgressHeight] = useState(92);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const copy = REQUEST_DEMO_FORM;

  const onProgressHeightChange = useCallback((height: number) => {
    setProgressHeight(height);
  }, []);

  const summaryStickyTop =
    RD_HEADER_OFFSET_PX + progressHeight + RD_STICKY_STACK_GAP_PX;
  const sectionScrollMargin = summaryStickyTop;

  const preselectedKey = initialProducts.join(',');

  useEffect(() => {
    if (initialProducts.length === 0) return;
    setForm((prev) => {
      const missing = initialProducts.filter(
        (id) => !prev.products.includes(id),
      );
      if (missing.length === 0) return prev;
      return { ...prev, products: [...prev.products, ...missing] };
    });
  }, [preselectedKey, initialProducts]);

  useEffect(() => {
    const sections = REQUEST_DEMO_STEPS.map((s) =>
      document.getElementById(`rd-section-${s.id}`),
    ).filter(Boolean) as HTMLElement[];

    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const id = visible.target.id.replace('rd-section-', '') as DemoStepId;
        setActiveStep(id);
      },
      // Offset for fixed header + sticky progress so the active step tracks what you actually see
      { rootMargin: '-28% 0px -45% 0px', threshold: [0.12, 0.35, 0.55] },
    );

    sections.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  function update<K extends keyof DemoFormState>(key: K, value: DemoFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  }

  function toggleProduct(id: DemoProductId) {
    setForm((prev) => {
      const has = prev.products.includes(id);
      return {
        ...prev,
        products: has
          ? prev.products.filter((p) => p !== id)
          : [...prev.products, id],
      };
    });
    if (errors.products) setErrors((prev) => ({ ...prev, products: '' }));
  }

  function toggleApplication(id: DemoApplicationId) {
    setForm((prev) => {
      const has = prev.applications.includes(id);
      return {
        ...prev,
        applications: has
          ? prev.applications.filter((a) => a !== id)
          : [...prev.applications, id],
      };
    });
  }

  const stepState = useMemo(() => getStepState(form), [form]);

  const roleLabel =
    DEMO_ROLES.find((r) => r.id === form.role)?.label ?? copy.summary.empty;
  const languageLabel =
    DEMO_LANGUAGES.find((l) => l.id === form.language)?.label ??
    copy.summary.empty;
  const demoTypeLabel =
    DEMO_TYPES.find((t) => t.id === form.demoType)?.title ?? copy.summary.empty;
  const timezoneLabel =
    DEMO_TIMEZONES.find((t) => t.id === form.timezone)?.label ??
    copy.summary.empty;

  const locationLabel =
    [form.city, form.country].filter(Boolean).join(', ') || copy.summary.empty;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    setSubmitError('');

    const result = DemoFormSchema.safeParse(form);
    if (!result.success) {
      const formatted: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0] ?? 'form');
        if (!formatted[key]) formatted[key] = issue.message;
      });
      setErrors(formatted);
      setStatus('idle');
      const firstKey = Object.keys(formatted)[0];
      scrollToFirstErrorSection(firstKey);
      return;
    }

    const data = result.data;
    try {
      await createDemoRequestApi({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        country: data.country,
        city: data.city?.trim() || undefined,
        language: data.language || undefined,
        role: data.role,
        clinicName: data.clinicName.trim(),
        chairs: data.chairs,
        specialty: data.specialty?.trim() || undefined,
        products: data.products as DemoRequestProduct[],
        applications: (data.applications ?? []) as DemoRequestApplication[],
        demoType: data.demoType,
        preferredDate: data.date,
        preferredTime: data.time,
        timezone: data.timezone || undefined,
        notes: data.notes?.trim() || undefined,
        marketingOptIn: Boolean(data.marketing),
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
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-white pb-4 text-[#0A1020] font-[var(--font-tajawal),Tajawal,sans-serif]">
      <RequestDemoHero />

      <div className="mt-3 flex flex-col gap-3 sm:mt-3.5 sm:gap-3.5 lg:mt-4 lg:gap-4">
        <RequestDemoProgress
          activeStep={activeStep}
          stepState={stepState}
          onStepClick={scrollToSection}
          onHeightChange={onProgressHeightChange}
        />

        <div className={shellClass}>
          <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,1fr)] xl:gap-8">
            <div className={cn('min-w-0', cardClass, 'p-4 sm:p-6 md:p-8')}>
              <RequestDemoForm
                formId={formId}
                form={form}
                errors={errors}
                status={status}
                submitError={submitError}
                onSubmit={onSubmit}
                update={update}
                toggleProduct={toggleProduct}
                toggleApplication={toggleApplication}
                scrollMarginTop={sectionScrollMargin}
              />
            </div>

            <RequestDemoSummary
              name={
                [form.firstName, form.lastName].filter(Boolean).join(' ') ||
                copy.summary.empty
              }
              roleLabel={roleLabel}
              clinicName={form.clinicName || copy.summary.empty}
              locationLabel={locationLabel}
              languageLabel={languageLabel}
              productIds={form.products}
              applicationIds={form.applications}
              demoTypeLabel={demoTypeLabel}
              dateLabel={formatDisplayDate(form.date) || copy.summary.empty}
              time={form.time || copy.summary.empty}
              timezoneLabel={timezoneLabel}
              stickyTopPx={summaryStickyTop}
              onEditContact={() => scrollToSection('contact')}
              onEditPractice={() => scrollToSection('practice')}
              onEditSchedule={() => scrollToSection('schedule')}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 md:mt-5">
        <RequestDemoTrust />
      </div>
    </div>
  );
}
