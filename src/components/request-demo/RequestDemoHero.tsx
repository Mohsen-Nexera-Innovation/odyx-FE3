import {
  ABOUT_BLUE,
  ABOUT_BODY,
  ABOUT_CARD_DESC,
  ABOUT_CARD_TITLE,
  ABOUT_EYEBROW,
  ABOUT_H1,
} from '@/app/about/aboutChrome';
import { REQUEST_DEMO_HERO } from '@/content/request-demo';
import { VALUE_PROP_ICONS } from './DemoIcons';

export function RequestDemoHero() {
  const { eyebrow, titleBefore, titleAccent, titleAfter, description, valueProps } =
    REQUEST_DEMO_HERO;

  return (
    <section
      className="w-full min-w-0 px-[clamp(16px,4vw,56px)] pt-[calc(var(--hdr-h)+4px)] sm:pt-[calc(var(--hdr-h)+12px)] lg:pt-[calc(var(--hdr-h)+17px)]"
      data-hero-light
      aria-labelledby="rd-title"
    >
      <div className="relative w-full min-w-0 overflow-hidden rounded-[12px] bg-[#F4F8FD]">
        <div className="relative z-10 flex flex-col gap-6 px-4 py-5 sm:gap-8 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-8">
          <div className="flex w-full min-w-0 flex-col justify-center lg:w-[40%]">
            <p className={`${ABOUT_EYEBROW} mb-2! sm:mb-3!`}>{eyebrow}</p>

            <h1
              id="rd-title"
              className={`${ABOUT_H1} text-[length:clamp(28px,7vw,42px)]! mb-3! sm:mb-5!`}
            >
              {titleBefore}{' '}
              <span className={ABOUT_BLUE}>{titleAccent}</span>
              <br />
              {titleAfter}
            </h1>

            <p className={`${ABOUT_BODY} mb-0 max-w-[36em] text-[14px] sm:text-[14.5px]`}>
              {description}
            </p>
          </div>

          <div className="w-full min-w-0 lg:w-[60%]">
            <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-6 p-0 sm:gap-x-4 sm:gap-y-7 lg:grid-cols-4 lg:gap-y-0">
              {valueProps.map((item, i) => {
                const Icon = VALUE_PROP_ICONS[item.icon];
                return (
                  <li
                    key={item.id}
                    className={`flex min-w-0 flex-col items-center px-1 text-center sm:px-2 lg:px-3 ${
                      i !== 0 ? 'lg:border-l lg:border-gray-200/60' : ''
                    }`}
                  >
                    <div className="mb-2.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/60 bg-gradient-to-b from-white to-[#F1F5F9] text-[#0050D8] shadow-[0_8px_16px_rgba(0,80,216,0.06)] sm:mb-3.5 sm:h-14 sm:w-14">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className={`${ABOUT_CARD_TITLE} mb-1`}>{item.title}</h3>
                    <p className={`${ABOUT_CARD_DESC} px-0.5`}>{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
