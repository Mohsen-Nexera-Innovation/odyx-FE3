import { defineVariants } from '@/lib/variants';

export const cardVariants = defineVariants({
  base: 'overflow-hidden rounded-2xl transition-all duration-200 text-charcoal-ink',
  variants: {
    variant: {
      default: 'bg-white',
      outlined: 'bg-white border border-charcoal-ink/10',
      filled: 'bg-paper-light border border-transparent',
      ghost: 'bg-transparent border border-transparent',
      interactive: 'bg-white border border-transparent hover:border-sky-action/50 cursor-pointer',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    elevation: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    interactiveState: {
      true: 'cursor-pointer hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.98]',
      false: '',
    },
    hoverable: {
      true: 'hover:bg-paper-light/50',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    elevation: 'none',
  },
});

type CardVariantsOptions = NonNullable<Parameters<typeof cardVariants>[0]>;

export type CardVariant = NonNullable<CardVariantsOptions['variant']>;
export type CardPadding = NonNullable<CardVariantsOptions['padding']>;
export type CardElevation = NonNullable<CardVariantsOptions['elevation']>;
