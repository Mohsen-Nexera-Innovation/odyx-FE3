import type { ReactNode } from 'react';

export function SupportPageHeader({
  title,
  description,
  centered = false,
  children,
}: {
  title: string;
  description?: string;
  centered?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={centered ? 'text-center max-w-[640px] mx-auto' : ''}>
      <h1
        className={
          centered
            ? 'text-[28px] sm:text-[34px] lg:text-[40px] font-extrabold text-[#0A1020] tracking-tight leading-[1.15]'
            : 'text-[24px] sm:text-[28px] lg:text-[32px] font-extrabold text-[#0A1020] tracking-tight leading-[1.15]'
        }
      >
        {title}
      </h1>
      {description && (
        <p
          className={
            centered
              ? 'mt-3 text-[14px] sm:text-[15px] text-[#6B7280] font-medium leading-relaxed'
              : 'mt-2 text-[13px] sm:text-[14px] text-[#6B7280] font-medium leading-relaxed max-w-[640px]'
          }
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}

export default SupportPageHeader;
