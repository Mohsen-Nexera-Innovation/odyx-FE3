import { REQUEST_DEMO_HERO } from '@/content/request-demo';
import { VALUE_PROP_ICONS } from './DemoIcons';
import { shellClass } from './formStyles';

export function RequestDemoHero() {
  return (
    <section
      className="w-full bg-white pt-[88px]"
      data-hero-light
      aria-labelledby="rd-title"
    >
      <div className={shellClass}>
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(115deg,#f8faff_0%,#eef4ff_48%,#f7faff_100%)] px-6 py-8 md:px-9 md:pb-8 md:pt-10">
          <div
            className="pointer-events-none absolute end-[-6%] top-[-30%] h-[160%] w-[min(560px,58%)] opacity-90 [background:radial-gradient(circle_at_28%_38%,rgba(0,80,216,0.09)_0%,transparent_42%),radial-gradient(circle_at_72%_58%,rgba(6,165,222,0.1)_0%,transparent_46%),repeating-linear-gradient(-32deg,transparent_0_16px,rgba(0,80,216,0.04)_16px_17px)] [mask-image:linear-gradient(90deg,transparent_0%,#000_28%)]"
            aria-hidden
          />

          <p className="relative mb-3 text-xs font-bold tracking-[0.08em] text-[#0050D8] rtl:tracking-normal">
            {REQUEST_DEMO_HERO.eyebrow}
          </p>
          <h1
            id="rd-title"
            className="relative mb-3 max-w-[22ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-extrabold leading-[1.12] tracking-[-0.02em] text-[#0A1020]"
          >
            {REQUEST_DEMO_HERO.titleBefore}{' '}
            <span className="text-[#0050D8]">{REQUEST_DEMO_HERO.titleAccent}</span>{' '}
            {REQUEST_DEMO_HERO.titleAfter}
          </h1>
          <p className="relative mb-7 max-w-xl text-[15px] font-medium leading-[1.55] text-[#6B7280]">
            {REQUEST_DEMO_HERO.description}
          </p>

          <ul className="relative m-0 grid list-none grid-cols-1 gap-[1.1rem] p-0 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 lg:grid-cols-4 lg:gap-0">
            {REQUEST_DEMO_HERO.valueProps.map((item, i) => {
              const Icon = VALUE_PROP_ICONS[item.icon];
              return (
                <li
                  key={item.id}
                  className="relative flex items-start gap-3 p-0 lg:px-4 lg:first:ps-0 lg:last:pe-0"
                >
                  {i > 0 ? (
                    <span
                      className="absolute start-0 top-[0.35rem] bottom-[0.35rem] hidden w-px bg-[rgba(0,80,216,0.12)] lg:block"
                      aria-hidden
                    />
                  ) : null}
                  <span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[rgba(0,80,216,0.35)] bg-white text-[#0050D8]"
                    aria-hidden
                  >
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <div>
                    <p className="mb-0.5 text-sm font-bold leading-tight text-[#0A1020]">
                      {item.title}
                    </p>
                    <p className="m-0 text-[12.5px] font-medium leading-snug text-[#6B7280]">
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
