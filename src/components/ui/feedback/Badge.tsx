import React, { ElementType, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { PolymorphicProps } from '../types';
import { badgeVariants } from './feedback.tokens';

type BadgeVariantsOptions = NonNullable<Parameters<typeof badgeVariants>[0]>;
type BadgeVariant = NonNullable<BadgeVariantsOptions['variant']>;
type BadgeSize = NonNullable<BadgeVariantsOptions['size']>;

export type BadgeProps<C extends ElementType> = PolymorphicProps<
  C,
  {
    variant?: BadgeVariant;
    size?: BadgeSize;
  }
>;

const BadgeInner = <C extends ElementType = 'span'>(
  { as, className, variant, size, ...props }: BadgeProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'span';

  return (
    <Component
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
};

export type BadgeComponent = <C extends ElementType = 'span'>(
  props: BadgeProps<C> & { ref?: React.ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Badge: BadgeComponent = forwardRef(BadgeInner) as unknown as BadgeComponent;
(Badge as any).displayName = 'Badge';
