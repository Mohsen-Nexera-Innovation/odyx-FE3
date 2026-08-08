import type { ReactNode } from 'react';

/**
 * Centered max-width container shared by every /support page — mirrors the
 * container pattern already used by the case-submission flow so Support does
 * not introduce a second layout system.
 */
export function SupportContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-full px-[clamp(20px,4vw,56px)] ${className}`}
    >
      {children}
    </div>
  );
}

export default SupportContainer;
