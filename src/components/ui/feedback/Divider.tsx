import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { dividerVariants } from './feedback.tokens';

type DividerVariantsOptions = NonNullable<Parameters<typeof dividerVariants>[0]>;
type DividerOrientation = NonNullable<DividerVariantsOptions['orientation']>;

export interface DividerProps extends ComponentPropsWithoutRef<'div'> {
  orientation?: DividerOrientation;
  decorative?: boolean;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        className={cn(dividerVariants({ orientation }), className)}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
