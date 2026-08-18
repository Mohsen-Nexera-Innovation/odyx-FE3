import { z } from 'zod';
import {
  type DemoApplicationId,
  type DemoProductId,
  type DemoRoleId,
  type DemoStepId,
  type DemoTypeId,
} from '@/content/request-demo';

export type DemoFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  language: string;
  role: DemoRoleId | '';
  clinicName: string;
  chairs: string;
  specialty: string;
  products: DemoProductId[];
  applications: DemoApplicationId[];
  demoType: DemoTypeId | '';
  date: string;
  time: string;
  timezone: string;
  notes: string;
  privacy: boolean;
  marketing: boolean;
};

export type DemoFormStatus = 'idle' | 'submitting' | 'sent' | 'error';

export type DemoFormUpdate = <K extends keyof DemoFormState>(
  key: K,
  value: DemoFormState[K],
) => void;

export const INITIAL: DemoFormState = {
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

export const DemoFormSchema = z.object({
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

export function formatDisplayDate(value: string) {
  if (!value) return '';
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function scrollToSection(id: DemoStepId) {
  const el = document.getElementById(`rd-section-${id}`);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToFirstErrorSection(firstKey: string | undefined) {
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
}

export function getStepState(form: DemoFormState): Record<DemoStepId, boolean> {
  return {
    contact:
      Boolean(form.firstName.trim()) &&
      Boolean(form.lastName.trim()) &&
      Boolean(form.email.trim()) &&
      Boolean(form.phone.trim()) &&
      Boolean(form.country),
    practice:
      Boolean(form.role) &&
      Boolean(form.clinicName.trim()) &&
      Boolean(form.chairs) &&
      form.products.length > 0,
    schedule:
      Boolean(form.demoType) && Boolean(form.date) && Boolean(form.time),
  };
}
