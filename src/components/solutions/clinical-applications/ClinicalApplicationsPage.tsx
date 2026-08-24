import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  CLINICAL_CATEGORIES,
  CLINICAL_HUB_BANNER,
  CLINICAL_HUB_FEATURES,
} from '@/content/clinical-applications';
import ClinicalCanvas from '@/components/solutions/ClinicalCanvas';
import {
  SOLUTIONS_BANNER,
  SOLUTIONS_BANNER_CTA,
  SOLUTIONS_BANNER_TITLE,
  SOLUTIONS_CARD,
  SOLUTIONS_CAT_TITLE,
  SOLUTIONS_EXPLORE,
  SOLUTIONS_FEATURE_BODY,
  SOLUTIONS_FEATURE_ITEM,
  SOLUTIONS_FEATURE_LIST,
  SOLUTIONS_FEATURE_TITLE,
  SOLUTIONS_HERO_SECTION,
  SOLUTIONS_HUB_GRID,
  SOLUTIONS_ITEM_BODY,
  SOLUTIONS_ITEM_LINK,
  SOLUTIONS_ITEM_THUMB,
  SOLUTIONS_ITEM_TITLE,
  SOLUTIONS_PAGE,
  SOLUTIONS_WRAP,
} from './solutionsChrome';

/** Category icons — extracted from design strip (circle + white glyph) */
const CAT_ICON_SRC: Record<string, string> = {
  restorative: '/img/clinical-hub/icons/cat-restorative.png',
  implant: '/img/clinical-hub/icons/cat-implant.png',
  orthodontics: '/img/clinical-hub/icons/cat-orthodontics.png',
  prosthetics: '/img/clinical-hub/icons/cat-prosthetics.png',
  cases: '/img/clinical-hub/icons/cat-cases.png',
};

/** Bottom feature icons — stroke + light fill, matching design reference */
const FEAT_ICONS: Record<string, ReactNode> = {
  integration: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.2 20.2 7.8v8.4L12 20.8 3.8 16.2V7.8L12 3.2Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 3.2v17.6M3.8 7.8 12 12.2l8.2-4.4" stroke="#0050D8" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  open: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.5 3.5h7.4L18.5 8.1V20a1.4 1.4 0 0 1-1.4 1.4H6.5A1.4 1.4 0 0 1 5.1 20V4.9A1.4 1.4 0 0 1 6.5 3.5Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M13.7 3.5V8h4.8" stroke="#0050D8" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.4 12h7.2M8.4 15h5.6M8.4 18h4" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  reliable: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="10.4" r="6.2" fill="#E8F0FF" stroke="#0050D8" strokeWidth="1.6" />
      <path
        d="M8.2 8.2c.7-.9 1.7-1.5 2.8-1.7M15.8 8.2c-.7-.9-1.7-1.5-2.8-1.7M7.6 12.6c.4 1.8 1.8 3.2 3.6 3.7M16.4 12.6c-.4 1.8-1.8 3.2-3.6 3.7"
        stroke="#0050D8"
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path d="M9.6 10.5 11.3 12.2 14.7 8.7" stroke="#0050D8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.6 16.6 8.5 21.2l3.5-1.2 3.5 1.2-1.1-4.6" stroke="#0050D8" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  time: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="13" r="7.4" fill="#E8F0FF" stroke="#0050D8" strokeWidth="1.6" />
      <path d="M12 9.2V13l2.8 1.7" stroke="#0050D8" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 3.6h4" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5.8 12a6.2 6.2 0 0 1 12.4 0" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M4.6 12.2v2.8a1.7 1.7 0 0 0 1.7 1.7h1.3V12.2H4.6Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 12.2v2.8a1.7 1.7 0 0 1-1.7 1.7h-1.3V12.2h3Z"
        fill="#E8F0FF"
        stroke="#0050D8"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M16.4 16.7v.7A2.4 2.4 0 0 1 14 19.8h-1.2" stroke="#0050D8" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

/** Clinical Applications hub — fidelity: clinical-application-all-types.jpeg */
export default function ClinicalApplicationsPage() {
  return (
    <div className={SOLUTIONS_PAGE}>
      <ClinicalCanvas color="#fafafc" />
      <section className={SOLUTIONS_HERO_SECTION} data-hero-light>
        <div className={SOLUTIONS_WRAP}>
          <div className={SOLUTIONS_HUB_GRID}>
            {CLINICAL_CATEGORIES.map((cat) => {
              const isCases = cat.id === 'cases';
              return (
                <article
                  key={cat.id}
                  id={cat.id}
                  className={`${SOLUTIONS_CARD} scroll-mt-[96px]`}
                >
                  <div className="relative z-auto flex w-auto items-center gap-2.5 bg-transparent px-4 pt-[18px] pb-3.5">
                    <span
                      className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-transparent leading-none"
                      aria-hidden
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={CAT_ICON_SRC[cat.id]} alt="" className="block size-full object-contain" />
                    </span>
                    <h2
                      className={SOLUTIONS_CAT_TITLE}
                      style={{ color: cat.accent }}
                    >
                      {cat.title}
                    </h2>
                  </div>

                  <ul
                    className={`m-0 flex list-none flex-col gap-0.5 px-2.5 pb-1 ${isCases ? 'pb-2' : ''} flex-1`}
                  >
                    {cat.items.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          className={SOLUTIONS_ITEM_LINK}
                        >
                          <span className={SOLUTIONS_ITEM_THUMB}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.thumb}
                              alt=""
                              className={
                                isCases
                                  ? item.id === 'restorative-cases'
                                    ? 'block size-full origin-[center_40%] scale-[1.2] object-cover object-[center_40%]'
                                    : 'block size-full object-cover object-center'
                                  : 'block size-[88%] object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,.12)]'
                              }
                            />
                          </span>
                          <span className="min-w-0">
                            <strong className={SOLUTIONS_ITEM_TITLE}>
                              {item.title}
                            </strong>
                            <span className={SOLUTIONS_ITEM_BODY}>
                              {item.body}
                            </span>
                          </span>
                          <span className="grid w-3.5 place-items-center text-[#c0c6d2]" aria-hidden>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-3">
                              <path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {cat.exploreAll ? (
                    <Link
                      href={cat.exploreAll.href}
                      className={`${SOLUTIONS_EXPLORE} ${
                        isCases ? 'mt-auto mr-4 mb-[18px] ml-4' : 'mx-4 mt-2 mb-1'
                      }`}
                      style={{ color: cat.accent }}
                    >
                      {cat.exploreAll.label}
                    </Link>
                  ) : null}

                  {cat.footerImg ? (
                    <div className="mt-auto flex min-h-[170px] items-end justify-center bg-white px-2 pt-2 pb-3.5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.footerImg}
                        alt={cat.footerAlt || ''}
                        className="block h-auto max-h-[190px] w-full object-contain object-bottom"
                      />
                    </div>
                  ) : (
                    <div className="mt-auto min-h-3 p-0" aria-hidden />
                  )}
                </article>
              );
            })}
          </div>

          <aside className={SOLUTIONS_BANNER}>
            <div className="grid grid-cols-[40px_1fr] items-start gap-x-3 gap-y-1.5 max-[560px]:grid-cols-1">
              <span
                className="row-span-2 mt-0.5 grid size-10 place-items-center rounded-xl bg-[#efe6ff] text-[#8153CF] max-[560px]:row-auto"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
                  <path d="M12 2.2 13.8 9.2 21 11l-7.2 1.8L12 19.8l-1.8-7L3 11l7.2-1.8L12 2.2Z" />
                  <circle cx="18.8" cy="5.6" r="1.15" />
                  <circle cx="5.4" cy="7.8" r=".9" />
                  <circle cx="18.2" cy="17.6" r=".8" />
                </svg>
              </span>
              <h2
                className={SOLUTIONS_BANNER_TITLE}
              >
                <span>{CLINICAL_HUB_BANNER.titleLine1}</span>
                <span>{CLINICAL_HUB_BANNER.titleLine2}</span>
              </h2>
              <p className="col-start-2 m-0 max-w-[34ch] text-[0.84rem] leading-[1.45] text-[#6b7385] max-[560px]:col-start-1">
                {CLINICAL_HUB_BANNER.body}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2.5 max-[560px]:grid-cols-1">
              {CLINICAL_HUB_BANNER.thumbs.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="block aspect-[5/3.4] w-full rounded-xl object-cover object-[center_40%] shadow-[0_4px_12px_rgba(20,30,50,.08)]"
                />
              ))}
            </div>

            <Link
              href={CLINICAL_HUB_BANNER.cta.href}
              className={SOLUTIONS_BANNER_CTA}
            >
              {CLINICAL_HUB_BANNER.cta.label}
            </Link>
          </aside>

          <ul className={SOLUTIONS_FEATURE_LIST}>
            {CLINICAL_HUB_FEATURES.map((f) => (
              <li
                key={f.id}
                className={SOLUTIONS_FEATURE_ITEM}
              >
                <span className="grid size-[26px] place-items-center text-[#0050D8]">
                  <span className="block size-6 [&_svg]:block [&_svg]:size-6">{FEAT_ICONS[f.id]}</span>
                </span>
                <span className="flex min-w-0 flex-col gap-0.5">
                  <strong className={SOLUTIONS_FEATURE_TITLE}>
                    {f.title}
                  </strong>
                  <span className={SOLUTIONS_FEATURE_BODY}>
                    {f.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
