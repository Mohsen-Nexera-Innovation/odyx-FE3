import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { inputVariants, InputVariant, InputSize } from './input.tokens';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, variant = 'default', size = 'md', invalid = false, type = 'text', ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        type={type}
        aria-invalid={invalid ? 'true' : undefined}
        aria-required={props.required ? 'true' : undefined}
        className={cn(
          inputVariants({ variant, size }),
          invalid && 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 text-red-900',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
