'use client';

import { Search } from 'lucide-react';

export function SupportSearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  size = 'md',
  onSubmit,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'lg' | 'md';
  onSubmit?: () => void;
  className?: string;
}) {
  const isLg = size === 'lg';

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`flex w-full flex-col sm:flex-row items-stretch gap-2.5 ${className}`}
    >
      <label className="relative flex-1">
        <span className="sr-only">Search</span>
        <Search
          size={isLg ? 18 : 16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          aria-hidden
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={
            isLg
              ? 'w-full h-[52px] rounded-[10px] border border-[#E5E7EB] bg-white pl-11 pr-4 text-base font-medium text-[#0A1020] placeholder:text-[#9CA3AF] shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-colors focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]'
              : 'w-full h-[44px] rounded-[8px] border border-[#E5E7EB] bg-white pl-10 pr-4 text-sm font-medium text-[#0A1020] placeholder:text-[#9CA3AF] outline-none transition-colors focus:border-[#0050D8] focus:shadow-[0_0_0_3px_rgba(0,80,216,0.12)]'
          }
        />
      </label>
      {isLg && (
        <button
          type="submit"
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[10px] bg-[#0050D8] px-7 text-base font-bold text-white shadow-[0_4px_14px_rgba(0,80,216,0.28)] transition-colors hover:bg-[#0040B0]"
        >
          Search
        </button>
      )}
    </form>
  );
}

export default SupportSearchBar;
