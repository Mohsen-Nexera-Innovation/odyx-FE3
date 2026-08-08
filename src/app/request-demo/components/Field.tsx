import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { labelClass } from './formStyles';

export function Field({
  id,
  label,
  required,
  hint,
  error,
  className = '',
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('relative flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="text-[#EF4444]" aria-hidden>
            {' '}
            *
          </span>
        ) : null}
        {hint ? (
          <span className="font-medium text-[#9CA3AF]"> ({hint})</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <span className="text-xs font-medium text-[#EF4444]" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
