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

/** Learning CTA styles — pill buttons match the Learning Center mock.
 *  `!text-*` beats global `a { color: inherit }` in odyx.css.
 */
export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-2 bg-[#0050D8] hover:bg-[#0040B0] !text-white text-[14px] font-semibold px-6 py-2.5 rounded-full transition-colors shadow-[0_4px_14px_rgba(0,80,216,0.35)]';

export const BTN_OUTLINE =
  'inline-flex items-center justify-center gap-2 font-semibold text-[14px] px-6 py-2.5 rounded-full transition-colors border-[1.5px] border-[#0050D8] !text-[#0050D8] bg-white hover:bg-[#EEF4FF]';

export const BTN_OUTLINE_SM =
  'inline-flex items-center justify-center gap-1.5 font-semibold text-[13px] lg:text-[14px] px-5 py-2 rounded-full transition-colors border-[1.5px] border-[#0050D8] !text-[#0050D8] bg-white hover:bg-[#EEF4FF] shrink-0';

export const BTN_LINK =
  'inline-flex items-center gap-1.5 !text-[#0050D8] text-[13px] font-bold hover:!text-[#0040B0] transition-colors';

export const BTN_ON_BLUE =
  'inline-flex items-center justify-center gap-2 font-bold text-[14px] px-7 py-3 rounded-full transition-colors bg-white !text-[#0050D8] hover:bg-[#F3F7FF] shadow-[0_4px_16px_rgba(0,0,0,0.12)] shrink-0';
