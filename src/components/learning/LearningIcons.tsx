import type { ReactNode } from 'react';
import type { ImpactStat, LearningPathId, LearningRoleId } from '@/content/learning';

type IconProps = { className?: string };
type IconFn = (p: IconProps) => ReactNode;

export function PlayIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
    </svg>
  );
}

export function LockIcon({ className = 'w-4 h-4' }: IconProps) {
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
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

export function DownloadIcon({ className = 'w-4 h-4' }: IconProps) {
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
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function CertificateIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
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
      <circle cx="12" cy="9" r="6" />
      <path d="M9.5 14.5 8 21l4-2 4 2-1.5-6.5" />
      <path d="m10 9 1.5 1.5L14.5 8" />
    </svg>
  );
}

export function ClockIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function LessonsIcon({ className = 'w-3.5 h-3.5' }: IconProps) {
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
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 9v6" />
    </svg>
  );
}

/** Beginner path — open book with learner silhouette (mock). */
function BookPathIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="5.5" r="2.2" />
      <path d="M9.2 10.2c.8-.8 1.7-1.2 2.8-1.2s2 .4 2.8 1.2" />
      <path d="M4 19.2V9.5A1.5 1.5 0 0 1 5.5 8H11v12.5H6A2 2 0 0 1 4 18.5" />
      <path d="M20 19.2V9.5A1.5 1.5 0 0 0 18.5 8H13v12.5h5a2 2 0 0 0 2-2" />
    </svg>
  );
}

/** Workflows — circular process / gear rays (mock). */
function WorkflowPathIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </svg>
  );
}

/** Applications — tooth outline (mock). */
function ApplicationsPathIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3c-2.5 3.2-5.5 5.2-5.5 9.2 0 2.2 1.2 3.5 2.4 3.5.8 0 1.2-.5 1.6-1.4.4.9.8 1.4 1.6 1.4s1.2-.5 1.6-1.4c.4.9.8 1.4 1.6 1.4 1.2 0 2.4-1.3 2.4-3.5C17.7 8.2 14.5 6.2 12 3Z" />
    </svg>
  );
}

/** Advanced — medal / award ribbon (mock). */
function AdvancedPathIcon({ className = 'w-6 h-6' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-2.5L17 21l-1.5-8.5" />
      <path d="m10.5 7.5 1.5 1.5 2.5-2.5" />
    </svg>
  );
}

const PATH_ICONS: Record<LearningPathId, IconFn> = {
  beginner: BookPathIcon,
  workflows: WorkflowPathIcon,
  applications: ApplicationsPathIcon,
  advanced: AdvancedPathIcon,
};

export function PathIcon({ id, className }: { id: LearningPathId; className?: string }) {
  const Icon = PATH_ICONS[id];
  return <Icon className={className} />;
}

function ToothIcon({ className = 'w-4 h-4' }: IconProps) {
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

/** Dental Lab — flask / beakers (mock). */
function FlaskIcon({ className = 'w-4 h-4' }: IconProps) {
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
      <path d="M9 3h6M10 3v6.5L5.5 18A2.5 2.5 0 0 0 7.6 22h8.8a2.5 2.5 0 0 0 2.1-4L14 9.5V3" />
      <path d="M8.5 14h7" />
    </svg>
  );
}

function UserIcon({ className = 'w-4 h-4' }: IconProps) {
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
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  );
}

/** Existing Customer — user with lock badge (mock). */
function BadgeUserIcon({ className = 'w-4 h-4' }: IconProps) {
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
      <circle cx="9.5" cy="8" r="3.2" />
      <path d="M3.5 19.5a6.2 6.2 0 0 1 11.2-3.2" />
      <rect x="14.5" y="13.5" width="6.5" height="5.5" rx="1.2" />
      <path d="M16 13.5v-1.4a1.6 1.6 0 0 1 3.2 0v1.4" />
    </svg>
  );
}

const ROLE_ICONS: Record<LearningRoleId, IconFn> = {
  dentist: ToothIcon,
  lab: FlaskIcon,
  beginner: UserIcon,
  customer: BadgeUserIcon,
};

export function RoleIcon({ id, className }: { id: LearningRoleId; className?: string }) {
  const Icon = ROLE_ICONS[id];
  return <Icon className={className} />;
}

function VideoStatIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function GuideStatIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 3h8l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M15 3v4h4M9 13h6M9 17h4" />
    </svg>
  );
}

function CapStatIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m3 9 9-4 9 4-9 4-9-4Z" />
      <path d="M7 11.5v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
      <path d="M21 9v6" />
    </svg>
  );
}

function UsersStatIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M14.5 19a4.5 4.5 0 0 1 6-4" />
    </svg>
  );
}

const STAT_ICONS: Record<ImpactStat['icon'], IconFn> = {
  book: BookPathIcon,
  video: VideoStatIcon,
  guide: GuideStatIcon,
  cap: CapStatIcon,
  users: UsersStatIcon,
};

export function StatIcon({ id, className }: { id: ImpactStat['icon']; className?: string }) {
  const Icon = STAT_ICONS[id];
  return <Icon className={className} />;
}
