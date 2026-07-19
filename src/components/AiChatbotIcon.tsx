'use client';

type Variant = 'toolbar' | 'fab' | 'panel';

/**
 * Chat bubble + Gemini dual sparkle (large star + small star).
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
      {/* Chat bubble */}
      <path
        fill="currentColor"
        d="M4.8 3.2h12.4A3.4 3.4 0 0 1 20.6 6.6v7.2a3.4 3.4 0 0 1-3.4 3.4h-3.7l-2.5 2.7a.95.95 0 0 1-1.58-.06l-1.95-2.64H4.8A3.4 3.4 0 0 1 1.4 13.8V6.6A3.4 3.4 0 0 1 4.8 3.2z"
      />
      {/* Large Gemini star */}
      <path
        className="ai-agent-gemini"
        d="M12.6 5.35c1.05 2.45 2.55 3.95 5 5-2.45 1.05-3.95 2.55-5 5-1.05-2.45-2.55-3.95-5-5 2.45-1.05 3.95-2.55 5-5z"
      />
      {/* Small Gemini star */}
      <path
        className="ai-agent-gemini"
        d="M18.55 4.2c.48 1.15 1.15 1.82 2.3 2.3-1.15.48-1.82 1.15-2.3 2.3-.48-1.15-1.15-1.82-2.3-2.3 1.15-.48 1.82-1.15 2.3-2.3z"
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
