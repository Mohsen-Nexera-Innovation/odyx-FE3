import type { ReactNode, JSX } from 'react';

const BLUE = '#0050D8';
const RING = '#D0D7E4';

type IconProps = { className?: string };

function IconShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <circle cx="24" cy="24" r="19" stroke={RING} strokeWidth="1.15" />
      {children}
    </svg>
  );
}

function AccuracyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M24 13L33 21.2L24 35L15 21.2L24 13Z" stroke={BLUE} strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M19.2 20.6H28.8" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
    </IconShell>
  );
}

function SurfaceIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M15 22C17.5 19.5 20.5 19.5 24 22C27.5 24.5 30.5 24.5 33 22" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15 27C17.5 24.5 20.5 24.5 24 27C27.5 29.5 30.5 29.5 33 27" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" />
    </IconShell>
  );
}

function ScanIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M16.5 19.5V16.5H19.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 19.5V16.5H28.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 28.5V31.5H19.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 28.5V31.5H28.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="19" y="19" width="10" height="10" rx="1.5" stroke={BLUE} strokeWidth="1.5" />
    </IconShell>
  );
}

function DetailIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="15.5" y="15.5" width="17" height="17" rx="2.5" stroke={BLUE} strokeWidth="1.6" />
      <path d="M19 22H29M19 26H26" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
    </IconShell>
  );
}

function ShrinkageIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M14.5 24H21.5" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M18.2 20.6L21.6 24L18.2 27.4" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33.5 24H26.5" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M29.8 20.6L26.4 24L29.8 27.4" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </IconShell>
  );
}

function FastIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="24" cy="24" r="9.5" stroke={BLUE} strokeWidth="1.6" />
      <path d="M24 18.5V24.5L28 26.5" stroke={BLUE} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </IconShell>
  );
}

export type ModelResinFeatureId =
  | 'accuracy'
  | 'surface'
  | 'scan'
  | 'detail'
  | 'shrinkage'
  | 'fast';

export const MODEL_RESIN_FEATURE_ICONS: Record<
  ModelResinFeatureId,
  (props: IconProps) => JSX.Element
> = {
  accuracy: AccuracyIcon,
  surface: SurfaceIcon,
  scan: ScanIcon,
  detail: DetailIcon,
  shrinkage: ShrinkageIcon,
  fast: FastIcon,
};
