import React, { ElementType, ComponentPropsWithoutRef, ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import {
  buttonVariants,
  ButtonVariant,
  ButtonSize,
} from './button.tokens';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export type ButtonProps<C extends ElementType> = BaseButtonProps & {
  /**
   * The polymorphic component to render (e.g. 'button', 'a', Link).
   * @default "button"
   */
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof BaseButtonProps | 'as'>;

const ButtonInner = <C extends ElementType = 'button'>(
  {
    as,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    type,
    ...props
  }: ButtonProps<C>,
  ref: React.Ref<any>
) => {
  const Component = as || 'button';
  
  // Safely assign type="button" only when rendering a native button element
  const defaultType = Component === 'button' ? 'button' : undefined;

  return (
    <Component
      ref={ref}
      type={type || defaultType}
      disabled={disabled || loading}
      aria-disabled={loading ? true : undefined}
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading && (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}

      <span
        className={cn(
          'inline-flex items-center gap-2',
          loading && 'invisible'
        )}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </Component>
  );
};

export type ButtonComponent = <C extends ElementType = 'button'>(
  props: ButtonProps<C> & { ref?: ComponentPropsWithRef<C>['ref'] }
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(ButtonInner) as unknown as ButtonComponent;
