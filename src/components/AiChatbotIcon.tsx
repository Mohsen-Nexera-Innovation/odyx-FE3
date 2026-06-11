'use client';

type Variant = 'toolbar' | 'fab' | 'panel';

export default function AiChatbotIcon({
  size = 28,
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
        'ai-bot-icon',
        `ai-bot-icon--${variant}`,
        animate ? 'ai-bot-icon--live' : 'ai-bot-icon--idle',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="ai-bot-shell">
        <span className="ai-bot-blobs">
          <span className="ai-bot-orb ai-bot-orb--1" />
          <span className="ai-bot-orb ai-bot-orb--2" />
          <span className="ai-bot-orb ai-bot-orb--3" />
          <span className="ai-bot-orb ai-bot-orb--4" />
        </span>
        <span className="ai-bot-shine" />
      </span>
    </span>
  );
}
