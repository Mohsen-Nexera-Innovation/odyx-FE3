import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { formTokens } from '../form';
import { textareaVariants, TextareaVariant, TextareaSize } from './textarea.tokens';

export interface TextareaProps extends Omit<ComponentPropsWithRef<'textarea'>, 'size'> {
  variant?: TextareaVariant;
  size?: TextareaSize;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, variant = 'default', size = 'md', invalid = false, ...props },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid ? 'true' : undefined}
        aria-required={props.required ? 'true' : undefined}
        className={cn(
          textareaVariants({ variant, size }),
          invalid && formTokens.invalid,
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
