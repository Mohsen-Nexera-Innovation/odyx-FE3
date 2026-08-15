import { S1_VIDEO } from '@/content/scanner-landing';

const CARD_TITLE =
  "m-0 mb-2.5 [font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif] text-[1.2rem] font-bold tracking-[-0.02em] text-[#0050D8]";

/** Decorative play mark — static poster only; not interactive until clip is ready. */
export default function S1Video() {
  return (
    <div
      data-s1-video
      className="reveal flex h-full min-h-[240px] flex-col rounded-2xl border-4 border-white bg-[#f1f7fe] px-[18px] py-4 shadow-none delay-[120ms] transition-transform duration-[280ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 max-[800px]:min-h-0"
    >
      <h2 className={CARD_TITLE}>{S1_VIDEO.title}</h2>
      <div className="relative min-h-[240px] w-full flex-[1_1_auto] overflow-hidden rounded-[14px] border border-[#d5dceb]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="block size-full object-cover"
          src={S1_VIDEO.poster}
          alt={S1_VIDEO.posterAlt}
          loading="lazy"
        />
        <span
          className="pointer-events-none absolute inset-0 [display:grid] place-items-center border-0 bg-[rgba(10,20,40,.18)]"
          aria-hidden="true"
        >
          <span className="flex size-[72px] items-center justify-center rounded-full bg-[rgba(255,255,255,.92)] text-[#0050D8] shadow-[0_10px_28px_rgba(0,0,0,.18)]">
            <svg
              viewBox="0 0 24 24"
              width="28"
              height="28"
              fill="currentColor"
              className="block translate-x-[2px] rtl:-translate-x-[2px] rtl:scale-x-[-1]"
            >
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
