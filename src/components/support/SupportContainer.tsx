import type { ReactNode } from 'react';

/**
 * Centered max-width container shared by every /support page — mirrors the
 * container pattern already used by the case-submission flow so Support does
 * not introduce a second layout system.
 */
export function SupportContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-[min(1280px,calc(100%-24px))] sm:w-[min(1280px,calc(100%-clamp(40px,8vw,112px)))] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default SupportContainer;
