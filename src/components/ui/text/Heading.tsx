import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { headingVariants } from './text.tokens';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    level?: HeadingLevel;
  }
>;

const HeadingInner = <C extends ElementType = 'h2'>(
  { as, className, level = 2, ...props }: HeadingProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || (`h${level}` as ElementType);

  return (
    <Component
      ref={ref}
      className={cn(headingVariants({ level: level.toString() as any }), className)}
      {...props}
    />
  );
};

export type HeadingComponent = <C extends ElementType = 'h2'>(
  props: HeadingProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Heading: HeadingComponent = forwardRef(HeadingInner) as unknown as HeadingComponent;

(Heading as any).displayName = 'Heading';
