import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { stackVariants } from './layout.tokens';

type StackVariantsOptions = NonNullable<Parameters<typeof stackVariants>[0]>;
type StackGap = NonNullable<StackVariantsOptions['gap']>;
type StackAlign = NonNullable<StackVariantsOptions['align']>;

export type StackProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    /**
     * The vertical gap between children.
     * @default "md"
     */
    gap?: StackGap;
    /**
     * The horizontal alignment of children.
     * @default "stretch"
     */
    align?: StackAlign;
  }
>;

const StackInner = <C extends ElementType = 'div'>(
  { as, className, gap = 'md', align = 'stretch', ...props }: StackProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'div';

  return (
    <Component
      ref={ref}
      className={cn(stackVariants({ gap, align }), className)}
      {...props}
    />
  );
};

export type StackComponent = <C extends ElementType = 'div'>(
  props: StackProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Stack: StackComponent = forwardRef(StackInner) as unknown as StackComponent;

(Stack as any).displayName = 'Stack';
