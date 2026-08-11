import type { ReactNode } from 'react';

/**
 * Centered max-width container shared by every /support page — mirrors the
 * container pattern already used by the case-submission flow so Support does
 * not introduce a second layout system.
 */
export function SupportContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-full max-w-full min-w-0 px-[clamp(16px,4vw,56px)] box-border ${className}`}
    >
      {children}
    </div>
  );
}

export default SupportContainer;
