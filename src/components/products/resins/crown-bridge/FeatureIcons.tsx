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

function HardnessIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M24 13L33 21.2L24 35L15 21.2L24 13Z" stroke={BLUE} strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M19.2 20.6H28.8" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
    </IconShell>
  );
}

function ImpactIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M18 30.5C18 26.2 20.6 23.2 24 20.2C27.4 23.2 30 26.2 30 30.5" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" />
      <path d="M21 31.5H27" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
      <path d="M24 14.5V18.2" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
    </IconShell>
  );
}

function AccuracyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <rect x="15.5" y="15.5" width="17" height="17" rx="2.5" stroke={BLUE} strokeWidth="1.6" />
      <path d="M20 24H28" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
      <path d="M20 20.2H24.5" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
      <path d="M20 27.8H26" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
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

function TemperatureIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M22.4 14.2C22.4 13.4 23.05 12.8 24 12.8C24.95 12.8 25.6 13.4 25.6 14.2V26.4" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="31" r="4.4" stroke={BLUE} strokeWidth="1.65" />
      <path d="M24 26.2V31" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" />
    </IconShell>
  );
}

function ShadesIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M24 16.5C21.2 14.8 17.8 16.2 17.8 19.2C17.8 21.4 19.4 22.6 21.2 23.4C19.4 24.2 17.8 25.6 17.8 28C17.8 31 21 32.2 24 30.4C27 32.2 30.2 31 30.2 28C30.2 25.6 28.6 24.2 26.8 23.4C28.6 22.6 30.2 21.4 30.2 19.2C30.2 16.2 26.8 14.8 24 16.5Z" stroke={BLUE} strokeWidth="1.5" strokeLinejoin="round" />
    </IconShell>
  );
}

export type CrownBridgeFeatureId =
  | 'hardness'
  | 'impact'
  | 'accuracy'
  | 'shrinkage'
  | 'temperature'
  | 'shades';

export const CROWN_BRIDGE_FEATURE_ICONS: Record<
  CrownBridgeFeatureId,
  (props: IconProps) => JSX.Element
> = {
  hardness: HardnessIcon,
  impact: ImpactIcon,
  accuracy: AccuracyIcon,
  shrinkage: ShrinkageIcon,
  temperature: TemperatureIcon,
  shades: ShadesIcon,
};
