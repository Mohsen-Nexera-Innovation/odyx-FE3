import { defineVariants } from '@/lib/variants';

export const labelVariants = defineVariants({
  base: 'block font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  variants: {
    variant: {
      default: 'text-charcoal-ink',
      muted: 'text-charcoal-ink/70',
      required: 'text-charcoal-ink',
    },
    size: {
      sm: 'text-sm leading-none',
      md: 'text-base leading-none',
      lg: 'text-lg leading-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

type LabelVariantsOptions = NonNullable<Parameters<typeof labelVariants>[0]>;

export type LabelVariant = NonNullable<LabelVariantsOptions['variant']>;
export type LabelSize = NonNullable<LabelVariantsOptions['size']>;
