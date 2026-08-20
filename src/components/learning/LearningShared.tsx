export {
  BTN_LINK,
  BTN_ON_BLUE,
  BTN_OUTLINE,
  BTN_OUTLINE_SM,
  BTN_PRIMARY,
} from './learningChrome';

/** Shared progress ring used by Featured / Clinical / Impact sections. */
export function ProgressRing({
  percent,
  size = 48,
  stroke = 4,
  className = '',
}: {
  percent: number;
  size?: number;
  stroke?: number;
  className?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#E8EEF6" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#0050D8"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-[#0050D8]"
        style={{ fontSize: size * 0.26, fontWeight: 700 }}
      >
        {percent}%
      </text>
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m5 12 14 0" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}
