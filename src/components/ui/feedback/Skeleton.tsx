import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { skeletonVariants } from './feedback.tokens';

type SkeletonVariantsOptions = NonNullable<Parameters<typeof skeletonVariants>[0]>;
type SkeletonRadius = NonNullable<SkeletonVariantsOptions['radius']>;

export interface SkeletonProps extends ComponentPropsWithoutRef<'div'> {
  radius?: SkeletonRadius;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ radius }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
