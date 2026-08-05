import { defineVariants } from '@/lib/variants';

export const buttonVariants = defineVariants({
  base: 'relative inline-flex items-center justify-center font-medium transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100',
  variants: {
    variant: {
      primary: 'bg-sky-action text-white hover:bg-sky-deep focus-visible:ring-sky-action border border-transparent shadow-sm',
      secondary: 'bg-paper-light text-charcoal-ink hover:bg-paper-dark focus-visible:ring-charcoal-ink border border-transparent shadow-sm',
      outline: 'bg-transparent text-charcoal-ink hover:bg-paper-light border border-charcoal-ink focus-visible:ring-charcoal-ink',
      ghost: 'bg-transparent text-charcoal-ink hover:bg-paper-light border border-transparent focus-visible:ring-charcoal-ink',
      danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500 border border-transparent shadow-sm',
    },
    size: {
      sm: 'h-8 px-3 text-sm rounded-sm',
      md: 'h-10 px-4 text-base rounded-md',
      lg: 'h-12 px-6 text-lg rounded-lg',
      icon: 'h-10 w-10 shrink-0 rounded-md',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type ButtonVariantsOptions = NonNullable<Parameters<typeof buttonVariants>[0]>;

export type ButtonVariant = NonNullable<ButtonVariantsOptions['variant']>;
export type ButtonSize = NonNullable<ButtonVariantsOptions['size']>;
