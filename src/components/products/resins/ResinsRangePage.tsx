import {
  HERO,
  LINES,
  LINES_SECTION,
  LINE_CTA_LABEL,
  WHY,
} from '@/content/resins';

const ICON_V = '2';

/** Icons AI-traced to product-design-refrences/all-resign.jpeg */
const FEATURE_ICONS: Record<string, string> = {
  validated: `/img/resins/icons/hero-validated.png?v=${ICON_V}`,
  strength: `/img/resins/icons/hero-strength.png?v=${ICON_V}`,
  compat: `/img/resins/icons/hero-compat.png?v=${ICON_V}`,
  esthetics: `/img/resins/icons/hero-esthetics.png?v=${ICON_V}`,
};

const WHY_ICONS: Record<string, string> = {
  proven: `/img/resins/icons/why-proven.png?v=${ICON_V}`,
  formulas: `/img/resins/icons/why-formulas.png?v=${ICON_V}`,
  compat: `/img/resins/icons/why-compat.png?v=${ICON_V}`,
  esthetics: `/img/resins/icons/why-esthetics.png?v=${ICON_V}`,
  safe: `/img/resins/icons/why-safe.png?v=${ICON_V}`,
};

const DOCS_ICON = `/img/resins/icons/why-docs.png?v=${ICON_V}`;

const SORA =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";
const TAJAWAL = "[font-family:var(--font-tajawal),'Tajawal',sans-serif]";
const GUTTER = 'mx-auto w-full px-[clamp(20px,4vw,56px)]';
const CTA =
  'group mt-auto inline-flex w-fit items-center gap-[5px] pt-1.5 text-[.8125rem] font-bold text-[#0050D8] no-underline transition-[gap,color] duration-200 ease-out hover:gap-[9px] hover:text-[#0041AF] focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050D8]';

const LINE_GLOW: Record<
  string,
  { core: string; streak: string; ray: string; base: string }
> = {
  'ceramic-crown': {
    core: 'rgba(200,140,60,.62)',
    streak: 'rgba(235,175,75,.42)',
    ray: 'rgba(255,205,120,.24)',
    base: '#1c150e',
  },
  temporary: {
    core: 'rgba(130,60,200,.6)',
    streak: 'rgba(175,90,235,.44)',
    ray: 'rgba(215,145,255,.26)',
    base: '#181024',
  },
  'surgical-guide': {
    core: 'rgba(45,160,165,.58)',
    streak: 'rgba(75,205,195,.4)',
    ray: 'rgba(125,235,225,.22)',
    base: '#0e1a1c',
  },
  'ortho-model': {
    core: 'rgba(45,95,220,.6)',
    streak: 'rgba(75,135,255,.42)',
    ray: 'rgba(145,185,255,.24)',
    base: '#0e1428',
  },
  'crown-bridge': {
    core: 'rgba(185,115,55,.6)',
    streak: 'rgba(220,145,65,.42)',
    ray: 'rgba(255,195,105,.24)',
    base: '#1a1410',
  },
};

/** 039 · Resins — fidelity target: product-design-refrences/all-resign.jpeg */
export default function ResinsRangePage() {
  return (
    <div
      data-resins
      className={`${SORA} overflow-x-clip bg-white text-base leading-[1.55] text-[#5a6478] [&_[id]]:scroll-mt-24`}
    >
      <style>{`
        body:has([data-resins]),
        body:has([data-resins]) .site-bg,
        body:has([data-resins]) main{
          background:#fff !important;
        }
      `}</style>

      <section
        className={`${TAJAWAL} relative overflow-hidden bg-[#050507] pt-[clamp(88px,9vw,104px)] pb-[clamp(10px,1.2vw,16px)] text-[rgba(224,229,240,.88)] max-[1100px]:pt-[clamp(88px,10vw,100px)] max-[1100px]:pb-[clamp(14px,2vw,20px)] max-[900px]:pt-[clamp(84px,11vw,96px)] max-[900px]:pb-[clamp(12px,2.5vw,18px)]`}
        data-hero-dark
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-auto bottom-[4%] left-[38%] right-0 z-0 h-[70%]"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 68% 48%, rgba(0,80,216,.42), transparent 70%), radial-gradient(ellipse 45% 40% at 90% 40%, rgba(0,65,175,.28), transparent 72%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-auto bottom-[10%] left-[48%] right-0 z-0 h-[55%] opacity-55 blur-[28px]"
          style={{
            background:
              'linear-gradient(105deg, transparent 0%, rgba(0,80,216,0) 16%, rgba(0,80,216,.35) 48%, rgba(0,65,175,.2) 70%, transparent 100%)',
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-auto right-[4%] bottom-[6%] left-[52%] z-0 h-[28%] opacity-50 blur-[24px]"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 50% 80%, rgba(0,80,216,.28), transparent 70%)',
          }}
        />

        <div
          className={`${GUTTER} relative z-[1] items-center gap-[clamp(12px,2vw,28px)] [display:grid] [grid-template-columns:minmax(240px,.85fr)_minmax(0,1.4fr)] max-[1100px]:gap-4 max-[1100px]:[grid-template-columns:1fr]`}
        >
          <div className="max-w-[34em] pt-0 max-[1100px]:max-w-[46em]">
            <p className={`${TAJAWAL} mb-2.5 mt-0 text-[clamp(14px,1.2vw,16px)] font-semibold tracking-[0.01em] text-white`}>
              {HERO.title}
            </p>
            <h1
              className={`${TAJAWAL} mb-3.5 mt-0 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white max-[520px]:text-[clamp(1.75rem,8vw,2.2rem)]`}
            >
              {HERO.tagline}
            </h1>
            <p
              className={`${TAJAWAL} mb-[34px] mt-0 max-w-[36em] text-[clamp(14px,1.2vw,16px)] leading-[1.55] text-[rgba(224,229,240,.78)]`}
            >
              {HERO.sub}
            </p>
            <ul
              className={`${TAJAWAL} m-0 max-w-[34em] list-none gap-x-3 gap-y-[18px] p-0 [display:grid] [grid-template-columns:repeat(4,minmax(0,1fr))] max-[1360px]:gap-x-4 max-[1360px]:gap-y-3.5 max-[1360px]:[grid-template-columns:repeat(2,minmax(0,1fr))] max-[1100px]:max-w-none max-[1100px]:gap-x-3 max-[1100px]:gap-y-3.5 max-[1100px]:[grid-template-columns:repeat(4,minmax(0,1fr))] max-[900px]:gap-3 max-[900px]:[grid-template-columns:repeat(2,minmax(0,1fr))]`}
            >
              {HERO.features.map((f) => (
                <li key={f.id} className="flex min-w-0 flex-col gap-[7px]">
                  <span className="block size-8" aria-hidden>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={FEATURE_ICONS[f.id]}
                      alt=""
                      width={56}
                      height={56}
                      className="block size-full object-contain"
                    />
                  </span>
                  <span className={`${TAJAWAL} flex flex-col gap-[3px]`}>
                    <strong className="text-[12px] font-bold leading-[1.25] text-white max-[1360px]:text-[13px]">
                      {f.title}
                    </strong>
                    <span className="text-[10.5px] leading-[1.35] text-[rgba(201,207,222,.68)] max-[1360px]:text-[11.5px]">
                      {f.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <figure
            className="relative z-[1] m-0 block h-[clamp(268px,28vw,340px)] w-full max-w-none isolate justify-self-stretch self-center max-[1100px]:h-[clamp(280px,42vw,360px)] max-[1100px]:w-[min(100%,720px)] max-[1100px]:justify-self-center max-[1100px]:self-start max-[900px]:h-[clamp(280px,68vw,360px)] max-[900px]:w-[min(100%,640px)] max-[520px]:h-[clamp(240px,72vw,320px)]"
            aria-label={HERO.imgAlt}
          >
            <div className="relative m-0 box-border flex h-full w-full items-center justify-between gap-[clamp(4px,.8vw,12px)] p-0">
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-[4%] right-[4%] z-0 h-[12%]"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 0%, rgba(0,0,0,.28) 100%)',
                }}
              />
              {LINES.map((line, i) => (
                <a
                  key={line.id}
                  className="group relative z-[1] flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden no-underline outline-none focus-visible:rounded-lg focus-visible:shadow-[0_0_0_2px_rgba(0,80,216,.85)] max-[900px]:min-w-11"
                  href={line.href ?? '#lines'}
                  aria-label={`${line.name} — view product`}
                >
                  <img
                    className="block h-full w-auto max-w-full origin-bottom object-contain object-center transition-transform duration-[280ms] ease-[cubic-bezier(.2,.8,.2,1)] [filter:none] group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-reduce:group-hover:translate-y-0"
                    src={`${line.img}?v=18`}
                    alt={line.imgAlt}
                    width={720}
                    height={1400}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </a>
              ))}
            </div>
          </figure>
        </div>
      </section>

      <section
        className="bg-white pt-[clamp(56px,6.5vw,88px)] pb-[clamp(40px,5vw,56px)]"
        id="lines"
      >
        <div className={GUTTER}>
          <div className="mx-auto mb-[clamp(28px,3.5vw,40px)] max-w-[700px] text-center">
            <p className="mb-3 mt-0 text-[12px] font-bold tracking-[0.16em] text-[#0050D8] uppercase">
              {LINES_SECTION.eyebrow}
            </p>
            <h2
              className={`${SORA} mb-3 mt-0 text-[clamp(1.65rem,3vw,2.15rem)] font-extrabold leading-[1.15] tracking-[-0.025em] text-[#1a2740] max-[520px]:text-[clamp(1.35rem,6vw,1.75rem)]`}
            >
              {LINES_SECTION.title}
            </h2>
            <p className="mx-auto mb-0 mt-0 max-w-[46em] text-[.98rem] leading-[1.55] text-[#5a6478]">
              {LINES_SECTION.intro}
            </p>
          </div>
          <div
            className="items-stretch gap-3.5 [display:grid] [grid-template-columns:repeat(5,minmax(0,1fr))] max-[1100px]:gap-3 max-[1100px]:[grid-template-columns:repeat(3,minmax(0,1fr))] max-[720px]:[grid-template-columns:repeat(2,minmax(0,1fr))] max-[520px]:[grid-template-columns:1fr]"
          >
            {LINES.map((line) => {
              const glow = LINE_GLOW[line.id];
              return (
                <article
                  key={line.id}
                  className="group flex min-h-full flex-col overflow-hidden rounded-[14px] border border-solid border-[rgba(26,50,90,.08)] bg-white shadow-[0_8px_24px_rgba(20,40,80,.07)] transition-[transform,box-shadow] duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-[5px] hover:shadow-[0_16px_40px_rgba(20,40,80,.14)] motion-reduce:hover:translate-y-0"
                >
                  <div className="relative isolate aspect-[3/4] overflow-hidden bg-[#141416]">
                    {glow ? (
                      <>
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 z-0"
                          style={{
                            background: `radial-gradient(ellipse 85% 75% at 50% 40%, ${glow.core}, transparent 70%), radial-gradient(ellipse 50% 42% at 72% 28%, ${glow.streak}, transparent 72%), linear-gradient(165deg, ${glow.base} 0%, #0c0c0e 58%, #080809 100%)`,
                          }}
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 z-0 opacity-70"
                          style={{
                            background: `linear-gradient(125deg, transparent 40%, ${glow.ray} 52%, transparent 64%)`,
                          }}
                        />
                      </>
                    ) : null}
                    <img
                      src={`${line.img}?v=18`}
                      alt={line.imgAlt}
                      loading="lazy"
                      width={720}
                      height={1400}
                      className="relative z-[1] block size-full object-contain object-center px-[10%] py-[6%] transition-transform duration-[280ms] ease-[cubic-bezier(.2,.8,.2,1)] [filter:none] group-hover:-translate-y-[3px] motion-reduce:group-hover:translate-y-0"
                    />
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col gap-2 bg-white px-[15px] pt-4 pb-[18px]">
                    <h3
                      className={`${SORA} m-0 text-[.95rem] font-bold leading-[1.25] tracking-[-0.015em] text-[#1a2740]`}
                    >
                      {line.name}
                    </h3>
                    <p className="m-0 flex-1 text-[.8125rem] leading-[1.45] text-[#5a6478]">
                      {line.highlight}
                    </p>
                    <a className={CTA} href={line.href ?? '#why'}>
                      {LINE_CTA_LABEL}{' '}
                      <span
                        aria-hidden
                        className="transition-transform duration-[250ms] ease-out group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="bg-white pt-0 pb-[clamp(48px,6vw,72px)]"
        id="why"
      >
        <div className={GUTTER}>
          <div
            className="items-stretch gap-[clamp(18px,2.2vw,28px)] rounded-[18px] bg-[#e8ebf2] px-[clamp(26px,3vw,38px)] py-[clamp(28px,3.4vw,40px)] [display:grid] [grid-template-columns:minmax(0,1fr)_minmax(220px,260px)] max-[1100px]:[grid-template-columns:1fr]"
          >
            <div>
              <p className="mb-5 mt-0 text-left text-[11.5px] font-bold tracking-[0.13em] text-[#1a2740] uppercase">
                {WHY.eyebrow}
              </p>
              <ul
                className="m-0 list-none gap-x-3 gap-y-4 p-0 [display:grid] [grid-template-columns:repeat(5,minmax(0,1fr))] max-[1100px]:[grid-template-columns:repeat(3,minmax(0,1fr))] max-[720px]:[grid-template-columns:repeat(2,minmax(0,1fr))]"
              >
                {WHY.features.map((f) => (
                  <li key={f.id} className="flex min-w-0 flex-col gap-2">
                    <span className="block size-[30px]" aria-hidden>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={WHY_ICONS[f.id]}
                        alt=""
                        width={56}
                        height={56}
                        className="block size-full object-contain"
                      />
                    </span>
                    <strong
                      className={`${SORA} text-[.84rem] font-bold leading-[1.25] tracking-[-0.01em] text-[#1a2740]`}
                    >
                      {f.title}
                    </strong>
                    <span className="text-[.75rem] leading-[1.4] text-[#5a6478]">
                      {f.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <aside className="flex flex-col justify-center gap-2 self-stretch border-s border-solid border-[rgba(26,50,90,.14)] ps-[clamp(18px,2.2vw,28px)] max-[1100px]:border-s-0 max-[1100px]:border-t max-[1100px]:border-[rgba(26,50,90,.12)] max-[1100px]:ps-0 max-[1100px]:pt-5">
              <span className="mb-1 block size-12" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={DOCS_ICON}
                  alt=""
                  width={40}
                  height={40}
                  className="block size-full object-contain"
                />
              </span>
              <h3
                className={`${SORA} m-0 text-[.95rem] font-bold tracking-[-0.015em] text-[#1a2740]`}
              >
                {WHY.docs.title}
              </h3>
              <p className="mb-0.5 mt-0 text-[.8rem] leading-[1.45] text-[#5a6478]">
                {WHY.docs.body}
              </p>
              <a className={`${CTA} mt-1 pt-0`} href={WHY.docs.cta.href}>
                {WHY.docs.cta.label}{' '}
                <span
                  aria-hidden
                  className="transition-transform duration-[250ms] ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
