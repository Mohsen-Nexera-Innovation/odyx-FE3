import Link from 'next/link';

type Props = {
  badge?: string;
  badgeColor?: string;
  title: string;
  subtitle: string;
  body: string;
  images: string[];
  backHref?: string;
  backLabel?: string;
};

const INTER =
  "[font-family:var(--font-inter),'Inter',system-ui,sans-serif]";
const SORA =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const WRAP = 'w-full max-w-none mx-auto px-[clamp(20px,4vw,56px)]';

const SHOT =
  'absolute m-0 overflow-hidden rounded-[18px] border-[3px] border-solid border-white bg-white shadow-[0_18px_40px_rgba(20,40,80,.16)]';
const SHOT_IMG = 'block size-full object-cover';

const SHOT_POS = [
  'top-[4%] left-[2%] z-[2] w-[56%] aspect-[4/5] -rotate-[2.5deg]',
  'top-[14%] right-0 z-[3] w-1/2 aspect-[5/4] rotate-[2deg]',
  'bottom-[2%] left-[36%] z-[4] w-[38%] aspect-square -rotate-1',
  'right-[14%] bottom-[6%] z-[1] w-[30%] aspect-[4/5] rotate-[3deg] opacity-95 max-[560px]:hidden',
] as const;

const SHOT_IMG_POS = [
  'origin-[center_72%] scale-[1.2] object-[center_72%]',
  'object-[center_40%]',
  'object-center',
  'object-[center_28%]',
] as const;

/** Light clinical hero with real case photo collage (not black cutout chrome). */
export default function ClinicalCasesHero({
  badge = 'Clinical Cases',
  badgeColor = '#D65765',
  title,
  subtitle,
  body,
  images,
  backHref = '/solutions/clinical-applications',
  backLabel = '← All clinical applications',
}: Props) {
  const shots = images.slice(0, 4);

  return (
    <section
      className="relative overflow-hidden bg-[radial-gradient(ellipse_55%_70%_at_88%_20%,rgba(0,80,216,.08),transparent_60%),radial-gradient(ellipse_40%_50%_at_8%_0%,rgba(129,83,207,.06),transparent_55%),linear-gradient(180deg,#eef3fb_0%,#f4f7fc_70%,#f4f7fc_100%)] pt-[clamp(96px,12vh,120px)] pb-[clamp(36px,5vw,56px)]"
      data-hero-light
      aria-label={title}
    >
      <div
        className={`${WRAP} grid grid-cols-[minmax(260px,.95fr)_minmax(280px,1.15fr)] items-center gap-[clamp(24px,4vw,48px)] max-[960px]:grid-cols-1 max-[960px]:gap-7`}
      >
        <div className={`${INTER} max-w-[40ch]`}>
          <p
            className={`${INTER} mb-4 inline-flex items-center gap-[7px] rounded-full py-[5px] pr-3 pl-2 text-[0.6875rem] font-bold leading-[1.2] tracking-[0.08em] text-white uppercase`}
            style={{ background: badgeColor }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="size-[13px]">
              <path
                d="M12 3c2.5 2.2 4 5.2 4 8.2A4 4 0 0 1 8 11.2C8 8.2 9.5 5.2 12 3z"
                strokeLinejoin="round"
              />
            </svg>
            {badge}
          </p>
          <h1
            className={`${SORA} m-0 mb-3 text-[clamp(2.2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#14203a]`}
          >
            {title}
          </h1>
          <p className="mb-2.5 text-[clamp(1.1rem,1.6vw,1.3rem)] font-semibold leading-[1.3] tracking-[-0.015em] text-[#1a2a4a]">
            {subtitle}
          </p>
          <p className="mb-[22px] max-w-[42ch] text-base font-normal leading-[1.55] text-[#5a6578]">{body}</p>
          <Link
            href={backHref}
            className="inline-flex text-[0.875rem] font-semibold tracking-[-0.01em] text-[#0050D8] no-underline hover:text-[#0041AF]"
          >
            {backLabel}
          </Link>
        </div>

        <div
          className="relative min-h-[clamp(280px,38vh,400px)] max-[960px]:mx-auto max-[960px]:min-h-[280px] max-[960px]:w-full max-[960px]:max-w-[520px]"
          aria-hidden={shots.length === 0}
        >
          {shots.length > 0 ? (
            shots.map((src, i) => (
              <figure key={src} className={`${SHOT} ${SHOT_POS[i]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className={`${SHOT_IMG} ${SHOT_IMG_POS[i]}`} />
              </figure>
            ))
          ) : (
            <div className="grid min-h-[260px] place-items-center rounded-[18px] border border-dashed border-[#c5cee0] bg-[rgba(255,255,255,.7)] text-[0.95rem] font-semibold text-[#7a8499]">
              Case photography coming soon
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
