import React, { ComponentPropsWithoutRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';

export interface FormErrorProps extends ComponentPropsWithoutRef<'p'> {}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        role="alert"
        className={cn('text-sm font-medium text-red-500', className)}
        {...props}
      />
    );
  }
);

FormError.displayName = 'FormError';
