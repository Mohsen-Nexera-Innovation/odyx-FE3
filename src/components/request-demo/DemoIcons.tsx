import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const defaults: IconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function ToothIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3c-2.2 0-4 1.6-4 3.6 0 1.2.4 2.2.8 3.4.5 1.5.9 3.1.9 4.8 0 1.3.6 2.2 1.3 2.2s1.2-.7 1.2-1.8V14c0-.6.4-1 1-1s1 .4 1 1v1.2c0 1.1.5 1.8 1.2 1.8s1.3-.9 1.3-2.2c0-1.7.4-3.3.9-4.8.4-1.2.8-2.2.8-3.4C16 4.6 14.2 3 12 3Z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M10 9v6l5-3-5-3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H10l-4 3v-3H6.5A2.5 2.5 0 0 1 4 13.5v-7Z" />
    </svg>
  );
}

export function ClipboardIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <path d="M9 4.5h6V6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V4.5Z" />
      <path d="M9 11h6M9 14h4" />
    </svg>
  );
}

export function FlaskIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M9 3h6M10 3v5.5L5.5 18a2.5 2.5 0 0 0 2.2 3.5h8.6a2.5 2.5 0 0 0 2.2-3.5L14 8.5V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M3 7h11v10H3V7Z" />
      <path d="M14 10h4l3 3v4h-7v-7Z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export function GradIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M3 9.5 12 5l9 4.5-9 4.5L3 9.5Z" />
      <path d="M7 12v4.5c0 .8 2.2 2 5 2s5-1.2 5-2V12" />
      <path d="M21 10v6" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16H7.5A2.5 2.5 0 0 0 5 21.5" />
      <path d="M5 5.5v16" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5c1.8-3.2 4.2-4.5 7-4.5s5.2 1.3 7 4.5" />
    </svg>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="3" y="7" width="12" height="10" rx="2" />
      <path d="M15 10.5 20 8v8l-5-2.5" />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 20h16M6 20V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
      <path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" />
    </svg>
  );
}

export function HandshakeIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M8 12.5 5.5 10a2 2 0 0 1 0-2.8L8 4.7" />
      <path d="M16 12.5 18.5 10a2 2 0 0 0 0-2.8L16 4.7" />
      <path d="M8 12.5c1.5 1.8 3 2.8 4 2.8s2.5-1 4-2.8" />
      <path d="M9.5 15.5 8 20M14.5 15.5 16 20" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} strokeWidth={2.5}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function LockIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <path d="M4 13a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-6H4Z" />
      <path d="M20 13h-2v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" />
      <path d="M12 19h2a2 2 0 0 0 2-2" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c.8-3 3-4.5 6-4.5" />
      <circle cx="16.5" cy="9" r="2.5" />
      <path d="M14 19c.5-2.2 2-3.5 4.5-3.5 1.2 0 2.2.3 3 .8" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.8 3.8 5.8 3.8 9S14.5 18.2 12 21c-2.5-2.8-3.8-5.8-3.8-9S9.5 5.8 12 3Z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3 5 6v5c0 4.5 2.8 7.8 7 9 4.2-1.2 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props} strokeWidth={2.25}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CrownIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 16 6.5 8l3.5 4L12 7l2 5 3.5-4L20 16H4Z" />
      <path d="M5 18h14" />
    </svg>
  );
}

export function ImplantIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 3v7" />
      <path d="M9 10h6v2.5c0 1.5-.8 2.5-2 3.2V21h-2v-5.3c-1.2-.7-2-1.7-2-3.2V10Z" />
    </svg>
  );
}

export function GuideIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v2M12 18v2M4 12h2M18 12h2" />
    </svg>
  );
}

export function OrthoIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M4 10h16M4 14h16" />
      <path d="M7 8v8M10 8v8M14 8v8M17 8v8" />
    </svg>
  );
}

export function DentureIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M5 10c1.5-3 4-4.5 7-4.5S17.5 7 19 10c.4.8.5 1.6.2 2.3C18.5 14 16 15 12 15s-6.5-1-7.2-2.7C4.5 11.6 4.6 10.8 5 10Z" />
      <path d="M8 15.5c.8 2 2.2 3.5 4 3.5s3.2-1.5 4-3.5" />
    </svg>
  );
}

export function SmileIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 14c1.2 1.5 2.8 2.2 4 2.2s2.8-.7 4-2.2" />
      <path d="M9 10h.01M15 10h.01" />
    </svg>
  );
}

export function GeneralIcon(props: IconProps) {
  return (
    <svg {...defaults} {...props}>
      <path d="M12 4v16M8 8c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5-1.5 2.5-4 2.5-4 1-4 2.5 1.5 2.5 4 2.5 4-1 4-2.5" />
    </svg>
  );
}

export const VALUE_PROP_ICONS = {
  tooth: ToothIcon,
  play: PlayIcon,
  chat: ChatIcon,
  clipboard: ClipboardIcon,
} as const;

export const ROLE_ICONS = {
  tooth: ToothIcon,
  flask: FlaskIcon,
  truck: TruckIcon,
  grad: GradIcon,
  book: BookIcon,
  user: UserIcon,
} as const;

export const DEMO_TYPE_ICONS = {
  video: VideoIcon,
  building: BuildingIcon,
  handshake: HandshakeIcon,
} as const;

export const APPLICATION_ICONS = {
  crown: CrownIcon,
  implant: ImplantIcon,
  guide: GuideIcon,
  ortho: OrthoIcon,
  denture: DentureIcon,
  smile: SmileIcon,
  general: GeneralIcon,
} as const;

export const TRUST_ICONS = {
  users: UsersIcon,
  globe: GlobeIcon,
  shield: ShieldIcon,
  clock: ClockIcon,
} as const;
