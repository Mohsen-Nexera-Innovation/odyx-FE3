'use client';

type Variant = 'toolbar' | 'fab' | 'panel';

function AgentGlyph({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6.25 5.75h11.5a1.6 1.6 0 0 1 1.6 1.6v6.9a1.6 1.6 0 0 1-1.6 1.6H11.1l-3.35 2.75v-2.75H6.25a1.6 1.6 0 0 1-1.6-1.6V7.35a1.6 1.6 0 0 1 1.6-1.6z"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.35l.72 1.92 1.92.72-1.92.72-.72 1.92-.72-1.92-1.92-.72 1.92-.72.72-1.92z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AiChatbotIcon({
  size = 22,
  animate = true,
  variant = 'fab',
  className,
}: {
  size?: number;
  animate?: boolean;
  variant?: Variant;
  className?: string;
}) {
  const glyphSize = size;

  return (
    <span
      className={[
        'ai-agent-icon',
        `ai-agent-icon--${variant}`,
        animate ? 'ai-agent-icon--live' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: glyphSize, height: glyphSize }}
      aria-hidden
    >
      <AgentGlyph size={glyphSize} />
    </span>
  );
}
