import { cn } from '@/lib/cn';

/** Shared field styles — same pattern as Support WarrantyClaimForm. */
export const labelClass = 'text-[13px] font-bold text-[#0A1020]';

export const inputClass =
  'w-full h-11 rounded-lg border border-[#E5E7EB] bg-white px-[0.9rem] text-sm font-medium text-[#0A1020] placeholder:text-[#9CA3AF] placeholder:font-normal outline-none transition-[border-color,box-shadow] duration-150 hover:border-[#C5CDD8] focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]';

export const selectClass = cn(
  inputClass,
  'appearance-none pe-10 bg-no-repeat bg-[length:16px] bg-[right_0.85rem_center] rtl:bg-[left_0.85rem_center] rtl:pe-[0.9rem] rtl:ps-10',
  "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")]",
);

export const textareaClass = cn(
  inputClass,
  'h-auto min-h-[7.5rem] py-3 resize-y',
);

export function inputErrorClass(hasError?: boolean) {
  return hasError ? 'border-[#EF4444]' : '';
}

export const shellClass =
  'w-full max-w-[1180px] mx-auto px-[clamp(20px,4vw,56px)]';

export const choiceCardClass =
  'relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-[#E5E7EB] bg-white px-[0.55rem] py-[0.85rem] text-center transition-[border-color,background-color,box-shadow] duration-150 hover:border-[#C5CDD8]';

export const choiceCardSelectedClass =
  'border-[#0050D8] bg-[#F3F7FF] shadow-[0_0_0_1px_#0050D8]';
