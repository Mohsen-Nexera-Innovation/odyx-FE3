import { z } from 'zod';

export const PHONE_MIN_DIGITS = 8;
export const PHONE_MAX_DIGITS = 15;
export const PHONE_MAX_LENGTH = 22;
export const PHONE_REQUIRED_MESSAGE = 'Phone number is required';
export const PHONE_INVALID_MESSAGE = 'Enter a valid phone number';

const PHONE_CHAR_PATTERN =
  /^[+0-9\u0660-\u0669\u06F0-\u06F9\s().-]+$/;

function asciiDigit(code: number): string | null {
  if (code >= 0x30 && code <= 0x39) return String.fromCharCode(code);
  if (code >= 0x0660 && code <= 0x0669) return String(code - 0x0660);
  if (code >= 0x06f0 && code <= 0x06f9) return String(code - 0x06f0);
  return null;
}

/** Keep digits and typical phone punctuation; drop letters and other symbols. */
export function sanitizePhoneInput(value: string): string {
  let out = '';
  for (const ch of value) {
    const code = ch.codePointAt(0);
    if (code === undefined) continue;
    const digit = asciiDigit(code);
    if (digit !== null) {
      out += digit;
      continue;
    }
    if (ch === '+' && out.length === 0) {
      out += ch;
      continue;
    }
    if (ch === ' ' || ch === '-' || ch === '(' || ch === ')' || ch === '.') {
      out += ch;
    }
  }
  return out;
}

export function phoneDigits(value: string): string {
  return sanitizePhoneInput(value).replace(/\D/g, '');
}

export function isValidPhoneNumber(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (!PHONE_CHAR_PATTERN.test(trimmed)) return false;
  if ((trimmed.match(/\+/g) ?? []).length > 1) return false;
  if (trimmed.includes('+') && !trimmed.startsWith('+')) return false;
  const digits = phoneDigits(trimmed);
  return digits.length >= PHONE_MIN_DIGITS && digits.length <= PHONE_MAX_DIGITS;
}

export const requiredPhoneSchema = z
  .string()
  .trim()
  .min(1, PHONE_REQUIRED_MESSAGE)
  .refine(isValidPhoneNumber, { message: PHONE_INVALID_MESSAGE });
