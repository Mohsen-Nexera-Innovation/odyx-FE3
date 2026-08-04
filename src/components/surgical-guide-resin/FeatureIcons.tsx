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

function TransparencyIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M24 14.5L32.5 33.5H15.5L24 14.5Z" stroke={BLUE} strokeWidth="1.65" strokeLinejoin="round" />
      <path d="M20.5 26.5H27.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
    </IconShell>
  );
}

function SterilizableIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M24 15V21" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" />
      <path d="M20.2 18.2L24 15L27.8 18.2" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 33V27" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" />
      <path d="M20.2 29.8L24 33L27.8 29.8" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 24H20.5M27.5 24H31.5" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
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

function ImpactIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M17 29.5L24 15.5L31 29.5" stroke={BLUE} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.5 29.5H27.5" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
      <path d="M24 29.5V33" stroke={BLUE} strokeWidth="1.55" strokeLinecap="round" />
    </IconShell>
  );
}

function FlexibilityIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path d="M15.5 28C18 22 22 18.5 24 18.5C26 18.5 30 22 32.5 28" stroke={BLUE} strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15.5 28H18.5M29.5 28H32.5" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" />
    </IconShell>
  );
}

function BiocompatibleIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="24" cy="24" r="8.5" stroke={BLUE} strokeWidth="1.55" />
      <circle cx="24" cy="24" r="3.2" stroke={BLUE} strokeWidth="1.55" />
      <path d="M24 15.5V18.2M24 29.8V32.5M15.5 24H18.2M29.8 24H32.5" stroke={BLUE} strokeWidth="1.45" strokeLinecap="round" />
    </IconShell>
  );
}

export type SurgicalGuideFeatureId =
  | 'transparency'
  | 'sterilizable'
  | 'shrinkage'
  | 'impact'
  | 'flexibility'
  | 'biocompatible';

export const SURGICAL_GUIDE_FEATURE_ICONS: Record<
  SurgicalGuideFeatureId,
  (props: IconProps) => JSX.Element
> = {
  transparency: TransparencyIcon,
  sterilizable: SterilizableIcon,
  shrinkage: ShrinkageIcon,
  impact: ImpactIcon,
  flexibility: FlexibilityIcon,
  biocompatible: BiocompatibleIcon,
};
