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
import { z } from 'zod';
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
import {
  RequestDemoForm,
  type DemoFormState,
} from './RequestDemoForm';
import { RequestDemoHero } from './RequestDemoHero';
import {
  RD_HEADER_OFFSET_PX,
  RD_STICKY_STACK_GAP_PX,
  RequestDemoProgress,
} from './RequestDemoProgress';
import { RequestDemoSummary } from './RequestDemoSummary';
import { RequestDemoTrust } from './RequestDemoTrust';
import { shellClass } from './formStyles';

const INITIAL: DemoFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  language: '',
  role: '',
  clinicName: '',
  chairs: '',
  specialty: '',
  products: [],
  applications: [],
  demoType: '',
  date: '',
  time: '',
  timezone: '',
  notes: '',
  privacy: false,
  marketing: false,
};

const DemoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().optional(),
  language: z.string().optional(),
  role: z.enum(['dentist', 'lab', 'distributor', 'university', 'student', 'other']),
  clinicName: z.string().min(2, 'Clinic name is required'),
  chairs: z.string().min(1, 'Number of chairs is required'),
  specialty: z.string().optional(),
  products: z.array(z.string()).min(1, 'Select at least one product'),
  applications: z.array(z.string()).optional(),
  demoType: z.enum(['online', 'onsite', 'distributor']),
  date: z.string().min(1, 'Preferred date is required'),
  time: z.string().min(1, 'Preferred time is required'),
  timezone: z.string().optional(),
  notes: z.string().optional(),
  privacy: z.boolean().refine((v) => v === true, {
    message: 'Please accept the privacy policy',
  }),
  marketing: z.boolean().optional(),
});

function formatDisplayDate(value: string) {
  if (!value) return '';
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function scrollToSection(id: DemoStepId) {
  const el = document.getElementById(`rd-section-${id}`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function RequestDemoPage() {
  const formId = useId();
  const [form, setForm] = useState<DemoFormState>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [activeStep, setActiveStep] = useState<DemoStepId>('contact');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>(
    'idle',
  );
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

  const contactComplete =
    Boolean(form.firstName.trim()) &&
    Boolean(form.lastName.trim()) &&
    Boolean(form.email.trim()) &&
    Boolean(form.phone.trim()) &&
    Boolean(form.country);

  const practiceComplete =
    Boolean(form.role) &&
    Boolean(form.clinicName.trim()) &&
    Boolean(form.chairs) &&
    form.products.length > 0;

  const scheduleComplete =
    Boolean(form.demoType) && Boolean(form.date) && Boolean(form.time);

  const stepState = useMemo(
    () => ({
      contact: contactComplete,
      practice: practiceComplete,
      schedule: scheduleComplete,
    }),
    [contactComplete, practiceComplete, scheduleComplete],
  );

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
      if (
        firstKey === 'privacy' ||
        firstKey === 'date' ||
        firstKey === 'time' ||
        firstKey === 'demoType'
      ) {
        scrollToSection('schedule');
      } else if (
        firstKey === 'clinicName' ||
        firstKey === 'chairs' ||
        firstKey === 'products' ||
        firstKey === 'role'
      ) {
        scrollToSection('practice');
      } else {
        scrollToSection('contact');
      }
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
            <div className="min-w-0 rounded-[12px] border border-[#E5E7EB]/80 bg-white p-4 shadow-[0_0_12px_rgba(0,0,0,0.06)] sm:p-6 md:p-8">
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
