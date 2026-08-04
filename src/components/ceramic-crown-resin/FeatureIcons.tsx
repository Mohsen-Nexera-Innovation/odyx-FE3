import type { ReactNode, JSX } from 'react';
import type { CeramicCrownResinFeatureId } from '@/content/ceramic-crown-resin';

const BLUE = '#0050D8';
const RING = '#D0D7E4';

type IconProps = {
  className?: string;
};

function IconShell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="24" cy="24" r="19" stroke={RING} strokeWidth="1.15" />
      {children}
    </svg>
  );
}

/** Nested diamond — High Hardness */
export function HardnessIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M24 13L33 21.2L24 35L15 21.2L24 13Z"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinejoin="round"
      />
      <path
        d="M19.2 20.6H28.8"
        stroke={BLUE}
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <path
        d="M24 13L28.6 20.6L24 28.2L19.4 20.6L24 13Z"
        stroke={BLUE}
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** Inward arrows — Low Shrinkage */
export function ShrinkageIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M14.5 24H21.5"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M18.2 20.6L21.6 24L18.2 27.4"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.5 24H26.5"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M29.8 20.6L26.4 24L29.8 27.4"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** Thermometer — High Temperature Resistance */
export function TemperatureIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M22.4 14.2C22.4 13.4 23.05 12.8 24 12.8C24.95 12.8 25.6 13.4 25.6 14.2V26.4"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="31" r="4.4" stroke={BLUE} strokeWidth="1.65" />
      <path
        d="M24 26.2V31"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      <path
        d="M27.4 16.6H29.6M27.4 20.2H29.6"
        stroke={BLUE}
        strokeWidth="1.45"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

/** Four interlocking circles — Low Irritation & Biocompatible */
export function BiocompatibleIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="18.8" cy="18.8" r="5.2" stroke={BLUE} strokeWidth="1.55" />
      <circle cx="29.2" cy="18.8" r="5.2" stroke={BLUE} strokeWidth="1.55" />
      <circle cx="18.8" cy="29.2" r="5.2" stroke={BLUE} strokeWidth="1.55" />
      <circle cx="29.2" cy="29.2" r="5.2" stroke={BLUE} strokeWidth="1.55" />
    </IconShell>
  );
}

/** Tooth silhouette — Natural Tooth Shades */
export function ShadesIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M24 13.5C20.2 13.5 17.4 16.6 17.4 20.2C17.4 23.4 18.6 25.2 19.4 28.2C20 30.4 20.4 33.2 21.6 34.2C22.4 34.9 23.2 34.6 24 34.6C24.8 34.6 25.6 34.9 26.4 34.2C27.6 33.2 28 30.4 28.6 28.2C29.4 25.2 30.6 23.4 30.6 20.2C30.6 16.6 27.8 13.5 24 13.5Z"
        stroke={BLUE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M21.2 19.2C21.8 18.4 22.8 17.9 24 17.9C25.2 17.9 26.2 18.4 26.8 19.2"
        stroke={BLUE}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

/** Wavelength nodes — 385–405nm Compatibility */
export function WavelengthIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="24" cy="24" r="9.5" stroke={BLUE} strokeWidth="1.5" />
      <circle cx="24" cy="14.5" r="2.1" stroke={BLUE} strokeWidth="1.45" />
      <circle cx="32.2" cy="19.2" r="2.1" stroke={BLUE} strokeWidth="1.45" />
      <circle cx="32.2" cy="28.8" r="2.1" stroke={BLUE} strokeWidth="1.45" />
      <circle cx="24" cy="33.5" r="2.1" stroke={BLUE} strokeWidth="1.45" />
      <circle cx="15.8" cy="28.8" r="2.1" stroke={BLUE} strokeWidth="1.45" />
      <circle cx="15.8" cy="19.2" r="2.1" stroke={BLUE} strokeWidth="1.45" />
    </IconShell>
  );
}

export const FEATURE_ICON_COMPONENTS: Record<
  CeramicCrownResinFeatureId,
  (props: IconProps) => JSX.Element
> = {
  hardness: HardnessIcon,
  shrinkage: ShrinkageIcon,
  temperature: TemperatureIcon,
  biocompatible: BiocompatibleIcon,
  shades: ShadesIcon,
  wavelength: WavelengthIcon,
};
