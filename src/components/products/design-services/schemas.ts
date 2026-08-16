import { z } from 'zod';
import { RESTORATION_SHADES, RESTORATIVE_MATERIALS } from './types';

export const doctorInfoSchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  countryCode: z.string(),
  whatsapp: z.string().min(1, 'WhatsApp Number is required').regex(/^\d+$/, 'WhatsApp must contain only digits'),
  clinicName: z.string().min(1, 'Clinic Name is required'),
  country: z.string().min(1, 'Country is required'),
  city: z.string().optional(),
  address: z.string().optional(),
});

export const caseDetailsSchema = z.object({
  designType: z.string().min(1, 'Design Type is required'),
  toothNumbers: z.string().min(1, 'Tooth Number(s) is required').regex(/^[0-9,\s]+$/, 'Only numbers, commas, and spaces are allowed'),
  material: z.enum(RESTORATIVE_MATERIALS, { message: 'Material is required' }),
  shade: z.enum(RESTORATION_SHADES, { message: 'Shade is required' }),
  colorNotes: z.string().optional(),
  instructions: z.string().optional(),
});

export const sendMethodSchema = z.object({
  sendMethod: z.enum(['whatsapp', 'email'] as const, { message: 'Please select how you would like to receive the design' }),
});

export const attachmentsSchema = z.object({
  stlFile: z.instanceof(File).nullable(),
  intraoralFile: z.instanceof(File).nullable(),
});

export const paymentMethodSchema = z.object({
  paymentMethod: z.enum(['instapay', 'paymob'] as const, {
    message: 'Please select a payment method',
  }),
});
