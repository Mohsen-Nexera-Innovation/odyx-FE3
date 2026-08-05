import { defineVariants } from '@/lib/variants';

export const gapMappings = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
};

export const alignMappings = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

export const justifyMappings = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export const stackVariants = defineVariants({
  base: 'flex flex-col',
  variants: {
    gap: gapMappings,
    align: alignMappings,
  },
  defaultVariants: {
    gap: 'md',
    align: 'stretch',
  },
});

export const clusterVariants = defineVariants({
  base: 'flex flex-row',
  variants: {
    wrap: {
      true: 'flex-wrap',
      false: 'flex-nowrap'
    },
    gap: gapMappings,
    align: alignMappings,
    justify: justifyMappings,
  },
  defaultVariants: {
    wrap: 'true',
    gap: 'md',
    align: 'center',
    justify: 'start',
  },
});

export const pageContainerVariants = defineVariants({
  base: 'mx-auto w-full px-4 md:px-6 lg:px-8',
  variants: {
    size: {
      content: 'max-w-7xl',
      wide: 'max-w-screen-2xl',
      full: 'max-w-full',
    }
  },
  defaultVariants: {
    size: 'content'
  }
});

export const sectionVariants = defineVariants({
  base: 'w-full',
  variants: {
    spacing: {
      comfortable: 'py-8 md:py-12',
      compact: 'py-4 md:py-6',
      none: 'py-0',
    },
    background: {
      transparent: 'bg-transparent',
      paper: 'bg-paper-light',
      'paper-alt': 'bg-paper-dark',
      dark: 'bg-dark-ground',
    }
  },
  defaultVariants: {
    spacing: 'comfortable',
    background: 'transparent'
  }
});
