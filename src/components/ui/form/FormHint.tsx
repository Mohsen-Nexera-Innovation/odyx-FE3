import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface FormHintProps extends ComponentPropsWithoutRef<'p'> {}

export const FormHint = forwardRef<HTMLParagraphElement, FormHintProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-charcoal-ink/70', className)}
        {...props}
      />
    );
  }
);

FormHint.displayName = 'FormHint';
