import type { ReactNode, JSX } from 'react';
import type { TemporaryResinFeatureId } from '@/content/temporary-resin';

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

/** Nested diamond / gem — Excellent Strength */
export function StrengthIcon({ className }: IconProps) {
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

/** Interlocking flexible ribbons — Comfortable Wear */
export function ComfortIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M19.5 15.8C17.2 15.8 15.6 17.9 15.6 20.2C15.6 23.1 18.2 24.2 20.6 25.6C23.2 27.1 25.4 28.4 25.4 31.1C25.4 33.2 27 34.6 29 34.6"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M28.5 15.8C30.8 15.8 32.4 17.9 32.4 20.2C32.4 23.1 29.8 24.2 27.4 25.6C24.8 27.1 22.6 28.4 22.6 31.1C22.6 33.2 21 34.6 19 34.6"
        stroke={BLUE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M21.2 22.8C22.4 23.6 23.6 24.2 24 24.4C24.4 24.2 25.6 23.6 26.8 22.8"
        stroke={BLUE}
        strokeWidth="1.55"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

/** Thermometer with degree ticks — High Temperature Resistance */
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

/** Three overlapping circles / molecule — Low Shrinkage */
export function ShrinkageIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <circle cx="24" cy="18.2" r="5.1" stroke={BLUE} strokeWidth="1.6" />
      <circle cx="19.2" cy="27.4" r="5.1" stroke={BLUE} strokeWidth="1.6" />
      <circle cx="28.8" cy="27.4" r="5.1" stroke={BLUE} strokeWidth="1.6" />
    </IconShell>
  );
}

/** Four-loop quatrefoil — Multiple Tooth Shades */
export function ShadesIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M24 16.4C22.2 14.2 19.1 14.4 17.8 16.6C16.5 18.8 17.9 21.4 20.2 22.2C17.9 23 16.5 25.6 17.8 27.8C19.1 30 22.2 30.2 24 28C25.8 30.2 28.9 30 30.2 27.8C31.5 25.6 30.1 23 27.8 22.2C30.1 21.4 31.5 18.8 30.2 16.6C28.9 14.4 25.8 14.2 24 16.4Z"
        stroke={BLUE}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </IconShell>
  );
}

/** Open frame with mid bar (polish / “E”) — Smooth Surface Finish */
export function FinishIcon({ className }: IconProps) {
  return (
    <IconShell className={className}>
      <path
        d="M31 17.2H19.4C18 17.2 16.8 18.4 16.8 19.8V28.2C16.8 29.6 18 30.8 19.4 30.8H31"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.8 24H27.4"
        stroke={BLUE}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </IconShell>
  );
}

export const FEATURE_ICON_COMPONENTS: Record<
  TemporaryResinFeatureId,
  (props: IconProps) => JSX.Element
> = {
  strength: StrengthIcon,
  comfort: ComfortIcon,
  temperature: TemperatureIcon,
  shrinkage: ShrinkageIcon,
  shades: ShadesIcon,
  finish: FinishIcon,
};
