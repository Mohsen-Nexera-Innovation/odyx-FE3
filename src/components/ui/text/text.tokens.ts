import { defineVariants } from '@/lib/variants';

export const headingVariants = defineVariants({
  base: 'font-bold text-charcoal-ink tracking-tight',
  variants: {
    level: {
      1: 'text-4xl lg:text-5xl',
      2: 'text-3xl lg:text-4xl',
      3: 'text-2xl lg:text-3xl',
      4: 'text-xl lg:text-2xl',
      5: 'text-lg lg:text-xl',
      6: 'text-base lg:text-lg',
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export const textVariants = defineVariants({
  base: 'text-charcoal-ink',
  variants: {
    variant: {
      body: 'text-base',
      muted: 'text-base text-charcoal-ink/70',
      small: 'text-sm',
      caption: 'text-xs text-charcoal-ink/70',
      lead: 'text-xl text-charcoal-ink/80',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'body',
    weight: 'regular',
  },
});
