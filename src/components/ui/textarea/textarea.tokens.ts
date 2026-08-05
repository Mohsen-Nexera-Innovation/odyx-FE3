import { defineVariants } from '@/lib/variants';
import { formTokens } from '../form';

export const textareaVariants = defineVariants({
  base: `flex w-full min-h-[80px] font-medium resize-y ${formTokens.transition} ${formTokens.focus} ${formTokens.disabled} ${formTokens.placeholder} read-only:opacity-70 read-only:cursor-default`,
  variants: {
    variant: {
      default: 'border border-charcoal-ink bg-white text-charcoal-ink hover:border-sky-action',
      filled: 'border border-transparent bg-paper-light text-charcoal-ink hover:bg-paper-dark',
      ghost: 'border border-transparent bg-transparent text-charcoal-ink hover:bg-paper-light',
    },
    size: {
      sm: `${formTokens.padding.sm} ${formTokens.typography.sm} ${formTokens.borderRadius.sm}`,
      md: `${formTokens.padding.md} ${formTokens.typography.md} ${formTokens.borderRadius.md}`,
      lg: `${formTokens.padding.lg} ${formTokens.typography.lg} ${formTokens.borderRadius.lg}`,
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type TextareaVariantsOptions = NonNullable<Parameters<typeof textareaVariants>[0]>;

export type TextareaVariant = NonNullable<TextareaVariantsOptions['variant']>;
export type TextareaSize = NonNullable<TextareaVariantsOptions['size']>;
