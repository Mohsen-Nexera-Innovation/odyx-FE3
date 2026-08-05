import { defineVariants } from '@/lib/variants';

export const badgeVariants = defineVariants({
  base: 'inline-flex items-center justify-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sky-action focus:ring-offset-2',
  variants: {
    variant: {
      default: 'bg-paper-light text-charcoal-ink',
      primary: 'bg-sky-action text-white',
      secondary: 'bg-charcoal-ink text-white',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      outline: 'text-charcoal-ink border border-charcoal-ink/30',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'text-base px-3 py-1',
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

export const spinnerVariants = defineVariants({
  base: 'animate-spin text-charcoal-ink/50',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    }
  },
  defaultVariants: {
    size: 'md',
  },
});

export const dividerVariants = defineVariants({
  base: 'shrink-0 bg-charcoal-ink/10',
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    }
  },
  defaultVariants: {
    orientation: 'horizontal',
  }
});

export const skeletonVariants = defineVariants({
  base: 'animate-pulse bg-charcoal-ink/10',
  variants: {
    radius: {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    }
  },
  defaultVariants: {
    radius: 'md',
  }
});
