import type { ElementType } from 'react';
import { Box, CloudUpload, LayoutGrid } from 'lucide-react';
import type { ApplicationIconId, HeroActionIconId } from '../types';

/** About-page pattern: data stores icon ids, component resolves them. */
const HERO_ACTION_ICON_MAP: Record<HeroActionIconId, ElementType> = {
  'layout-grid': LayoutGrid,
  box: Box,
  'cloud-upload': CloudUpload,
};

export function HeroActionIcon({
  id,
  className = 'w-4 h-4',
}: {
  id: HeroActionIconId;
  className?: string;
}) {
  const Icon = HERO_ACTION_ICON_MAP[id] ?? LayoutGrid;
  return <Icon className={className} strokeWidth={1.8} aria-hidden />;
}

export function ApplicationIcon({ id }: { id: ApplicationIconId }) {
  if (id === 'implant') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]" aria-hidden>
        <path d="M12 3.5c-2.4 0-4.3 1.7-4.3 4.2 0 1.6.7 2.9 1.6 4.1L12 20l2.7-8.2c.9-1.2 1.6-2.5 1.6-4.1 0-2.5-1.9-4.2-4.3-4.2Z" strokeLinejoin="round" />
        <path d="M9.2 11.2h5.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'orthodontic') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]" aria-hidden>
        <path d="M5 10.5c1.2 3.8 3.6 6.5 7 6.5s5.8-2.7 7-6.5" strokeLinecap="round" />
        <path d="M7.2 11.2h1.8M11.1 11.2h1.8M15 11.2h1.8" strokeLinecap="round" />
        <circle cx="8.1" cy="11.2" r="1.15" />
        <circle cx="12" cy="11.2" r="1.15" />
        <circle cx="15.9" cy="11.2" r="1.15" />
      </svg>
    );
  }
  if (id === 'denture') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]" aria-hidden>
        <path
          d="M5.5 9.2C6 6.8 8.4 5 12 5s6 1.8 6.5 4.2c.2 1.1-.1 2.3-.8 3.2-.6.8-1 1.8-1 2.9 0 1.4-.9 2.5-2 2.5-.7 0-1.2-.5-1.5-1.2-.3.7-.8 1.2-1.5 1.2-1.1 0-2-1.1-2-2.5 0-1.1-.4-2.1-1-2.9-.7-.9-1-2.1-.8-3.2Z"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-[18px] h-[18px]" aria-hidden>
      <path
        d="M9.2 4.5c-2.2 0-3.7 1.8-3.7 4.2 0 2.2.8 3.8 1.6 5.8.7 1.8 1 3.5 1.4 5.3.3 1.4 1.1 2.2 2.5 2.2 1.1 0 1.5-1.1 1.9-2.2.4 1.1.8 2.2 1.9 2.2 1.4 0 2.2-.8 2.5-2.2.4-1.8.7-3.5 1.4-5.3.8-2 1.6-3.6 1.6-5.8 0-2.4-1.5-4.2-3.7-4.2-1.4 0-2.3.7-2.7.7s-1.3-.7-2.7-.7Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Trailing CTA arrow — matches About hero stroke weight. */
export function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 14 0" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
