import { defineVariants } from '@/lib/variants';

export const inputVariants = defineVariants({
  base: 'flex w-full items-center font-medium transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed read-only:opacity-70 read-only:cursor-default',
  variants: {
    variant: {
      default: 'border border-charcoal-ink bg-white text-charcoal-ink focus-visible:ring-sky-action focus-visible:border-sky-action hover:border-sky-action',
      filled: 'border border-transparent bg-paper-light text-charcoal-ink focus-visible:ring-sky-action hover:bg-paper-dark',
      ghost: 'border border-transparent bg-transparent text-charcoal-ink focus-visible:ring-sky-action hover:bg-paper-light',
    },
    size: {
      sm: 'h-8 px-3 py-1 text-sm rounded-sm',
      md: 'h-10 px-4 py-2 text-base rounded-md',
      lg: 'h-12 px-6 py-3 text-lg rounded-lg',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

type InputVariantsOptions = NonNullable<Parameters<typeof inputVariants>[0]>;

export type InputVariant = NonNullable<InputVariantsOptions['variant']>;
export type InputSize = NonNullable<InputVariantsOptions['size']>;
