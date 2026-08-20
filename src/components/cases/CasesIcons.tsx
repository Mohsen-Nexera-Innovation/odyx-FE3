import type { ReactNode } from 'react';
import type { ApplicationIconId, HeroActionIconId } from '@/content/cases';

type IconProps = { className?: string };

/** Browse by Application — 2×2 circle grid (mock). */
function GridDotsIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="8" cy="16" r="2.2" />
      <circle cx="16" cy="16" r="2.2" />
    </svg>
  );
}

/** Browse by Product — wireframe cube (mock). */
function CubeIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3 4.5 7.5v9L12 21l7.5-4.5v-9L12 3Z" />
      <path d="M12 12 4.5 7.5M12 12l7.5-4.5M12 12v9" />
    </svg>
  );
}

/** Submit Your Case — upload arrow into tray (mock). */
function UploadIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 16V5" />
      <path d="m8 9 4-4 4 4" />
      <path d="M5 19h14" />
    </svg>
  );
}

const HERO_ACTION_ICONS: Record<HeroActionIconId, (p: IconProps) => ReactNode> = {
  'layout-grid': GridDotsIcon,
  box: CubeIcon,
  'cloud-upload': UploadIcon,
};

export function HeroActionIcon({
  id,
  className = 'w-4 h-4',
}: {
  id: HeroActionIconId;
  className?: string;
}) {
  const Icon = HERO_ACTION_ICONS[id] ?? GridDotsIcon;
  return <Icon className={className} />;
}

/** Restorative — tooth outline (mock). */
function RestorativeIcon({ className = 'w-[18px] h-[18px]' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3c-2.5 3.2-5.5 5.2-5.5 9.2 0 2.2 1.2 3.5 2.4 3.5.8 0 1.2-.5 1.6-1.4.4.9.8 1.4 1.6 1.4s1.2-.5 1.6-1.4c.4.9.8 1.4 1.6 1.4 1.2 0 2.4-1.3 2.4-3.5C17.7 8.2 14.5 6.2 12 3Z" />
    </svg>
  );
}

/** Implant — fixture / screw profile (mock). */
function ImplantIcon({ className = 'w-[18px] h-[18px]' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9.5 4.5h5" />
      <path d="M10.5 4.5v3.2c0 .8-.3 1.5-.8 2.1L8.2 12.2a3.2 3.2 0 0 0-.7 2v5.3h9V14.2c0-.7-.2-1.4-.7-2l-1.5-2.4c-.5-.6-.8-1.3-.8-2.1V4.5" />
      <path d="M9.2 14.5h5.6M9.2 17h5.6" />
    </svg>
  );
}

/** Orthodontic — brackets / linked circles (mock). */
function OrthodonticIcon({ className = 'w-[18px] h-[18px]' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M5 11c1.2 4 3.6 6.8 7 6.8s5.8-2.8 7-6.8" />
      <circle cx="8" cy="11" r="1.35" />
      <circle cx="12" cy="11" r="1.35" />
      <circle cx="16" cy="11" r="1.35" />
      <path d="M9.35 11h1.3M13.35 11h1.3" />
    </svg>
  );
}

/** Denture — full arch (mock). */
function DentureIcon({ className = 'w-[18px] h-[18px]' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4.5 10.5c.6-3.2 3.5-5.5 7.5-5.5s6.9 2.3 7.5 5.5c.2 1.2-.2 2.4-1 3.2-.7.7-1.1 1.7-1.1 2.8 0 1.3-.9 2.3-2 2.3-.7 0-1.2-.5-1.5-1.2-.3.7-.8 1.2-1.5 1.2-.7 0-1.2-.5-1.5-1.2-.3.7-.8 1.2-1.5 1.2-1.1 0-2-1-2-2.3 0-1.1-.4-2.1-1.1-2.8-.8-.8-1.2-2-1-3.2Z" />
      <path d="M8.2 10.8h1.4M11.3 10.8h1.4M14.4 10.8h1.4" />
    </svg>
  );
}

export function ApplicationIcon({ id }: { id: ApplicationIconId }) {
  if (id === 'implant') return <ImplantIcon />;
  if (id === 'orthodontic') return <OrthodonticIcon />;
  if (id === 'denture') return <DentureIcon />;
  return <RestorativeIcon />;
}

/** Trailing CTA arrow — matches About / Learning stroke weight. */
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
