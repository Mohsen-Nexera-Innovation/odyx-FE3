import { P1_26_VIDEO } from '@/content/p1-26';

const DISPLAY =
  "[font-family:var(--font-space),'Space Grotesk',var(--font-sora),sans-serif]";

/** Decorative play mark — static poster only; not interactive until clip is ready. */
export default function P126Video() {
  return (
    <div className="reveal flex h-auto min-h-[334px] flex-col rounded-[18px] border-4 border-solid border-white bg-transparent p-[clamp(16px,1.8vw,22px)]">
      <h2
        className={`${DISPLAY} m-0 mb-3 text-[1.25rem] font-bold leading-[1.2] tracking-[-0.02em] text-[#1f2738]`}
      >
        {P1_26_VIDEO.title}
      </h2>
      <div className="relative min-h-[180px] w-full flex-[1_1_auto] overflow-hidden rounded-xl bg-[#1a2433] aspect-video max-h-[240px] max-[800px]:max-h-none max-[800px]:min-h-[200px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="block size-full object-cover"
          src={P1_26_VIDEO.poster}
          alt={P1_26_VIDEO.posterAlt}
          loading="lazy"
        />
        <span
          className="pointer-events-none absolute inset-0 [display:grid] place-items-center border-0 bg-[rgba(10,20,40,.18)]"
          aria-hidden="true"
        >
          <span className="flex size-[72px] items-center justify-center rounded-full bg-[rgba(255,255,255,.92)] text-[#0050D8] shadow-[0_10px_30px_rgba(0,0,0,.2)]">
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
