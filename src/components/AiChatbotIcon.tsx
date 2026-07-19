'use client';

type Variant = 'toolbar' | 'fab' | 'panel';

/**
 * White chat bubble with a Gemini sparkle cutout on the right —
 * matches the reference: bubble + AI sparkle, no letters.
 */
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
      {/* Bubble (outer) + Gemini star (inner hole) via evenodd */}
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M5.2 3.4h11.6c1.77 0 3.2 1.43 3.2 3.2v7.1c0 1.77-1.43 3.2-3.2 3.2h-3.55l-2.35 2.55a.9.9 0 0 1-1.5-.05l-1.85-2.5H5.2c-1.77 0-3.2-1.43-3.2-3.2V6.6c0-1.77 1.43-3.2 3.2-3.2z
          M15.35 6.15c.85 1.95 2.05 3.15 4 4-1.95.85-3.15 2.05-4 4-.85-1.95-2.05-3.15-4-4 1.95-.85 3.15-2.05 4-4z
        "
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
      style={{ width: size, height: size }}
      aria-hidden
    >
      <AgentGlyph size={size} />
    </span>
  );
}
