import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { gapMappings } from './layout.tokens';

type GapToken = keyof typeof gapMappings;

type ColCount = 1 | 2 | 3 | 4 | 5 | 6;

const baseCols: Record<ColCount, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const smCols: Record<ColCount, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
};

const mdCols: Record<ColCount, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
};

const lgCols: Record<ColCount, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

const xlCols: Record<ColCount, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
};

export interface ResponsiveColumns {
  base?: ColCount;
  sm?: ColCount;
  md?: ColCount;
  lg?: ColCount;
  xl?: ColCount;
}

export type ContentGridProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * The number of columns. Can be a fixed number (1-6) or a responsive object mapping breakpoints to column counts.
     * @default 1
     */
    columns?: ColCount | ResponsiveColumns;
    /**
     * The gap between grid items.
     * @default "lg"
     */
    gap?: GapToken;
  }
>;

const ContentGridInner = <C extends ElementType = 'div'>(
  {
    as,
    className,
    columns = 1,
    gap = 'lg',
    children,
    ...props
  }: ContentGridProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'div';
  let colClasses = '';

  if (typeof columns === 'number') {
    colClasses = baseCols[columns];
  } else if (columns) {
    const classes = [];
    if (columns.base) classes.push(baseCols[columns.base]);
    if (columns.sm) classes.push(smCols[columns.sm]);
    if (columns.md) classes.push(mdCols[columns.md]);
    if (columns.lg) classes.push(lgCols[columns.lg]);
    if (columns.xl) classes.push(xlCols[columns.xl]);
    colClasses = classes.join(' ');
  }

  return (
    <Component
      ref={ref}
      className={cn('grid', colClasses, gapMappings[gap], className)}
      {...props}
    >
      {children}
    </Component>
  );
};

export type ContentGridComponent = <C extends ElementType = 'div'>(
  props: ContentGridProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const ContentGrid: ContentGridComponent = forwardRef(ContentGridInner) as unknown as ContentGridComponent;

(ContentGrid as any).displayName = 'ContentGrid';
