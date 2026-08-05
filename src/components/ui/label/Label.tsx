import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { labelVariants, LabelVariant, LabelSize } from './label.tokens';

export type LabelProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    variant?: LabelVariant;
    size?: LabelSize;
  }
>;

const LabelInner = <C extends ElementType = 'label'>(
  { as, className, variant, size, ...props }: LabelProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'label';

  return (
    <Component
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export type LabelComponent = <C extends ElementType = 'label'>(
  props: LabelProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Label: LabelComponent = forwardRef(LabelInner) as unknown as LabelComponent;

(Label as any).displayName = 'Label';
