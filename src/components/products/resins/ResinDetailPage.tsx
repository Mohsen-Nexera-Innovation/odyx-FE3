import type { ComponentType, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';

const BLUE = '#0050D8';

export type ResinDetailCta = { label: string; href: string };

export type ResinDetailHero = {
  kicker: string;
  titleLines: string[];
  tagline: string;
  body: string;
  img: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  primaryCta: ResinDetailCta;
  secondaryCta: ResinDetailCta;
};

export type ResinDetailApplication = {
  id: string;
  label: string;
  img: string;
  imgAlt: string;
  href: string;
};

export type ResinDetailFeature = {
  id: string;
  label: string;
};

export type ResinDetailSpec = {
  property: string;
  value: string;
};

export type ResinDetailCompatible = {
  id: string;
  label: string;
  img: string;
  imgAlt: string;
  href: string;
};

export type ResinDetailCase = {
  id: string;
  img: string;
  imgAlt: string;
  href: string;
};

export type ResinDetailContent = {
  featuresAriaLabel: string;
  appColumns: 3 | 5 | 6;
  hero: ResinDetailHero;
  applications: readonly ResinDetailApplication[];
  features: readonly ResinDetailFeature[];
  featureIcons: Record<string, ComponentType<{ className?: string }>>;
  specs: readonly ResinDetailSpec[];
  compatible: readonly ResinDetailCompatible[];
  cases: readonly ResinDetailCase[];
  casesCta: ResinDetailCta;
};

const BTN =
  'inline-flex box-border h-[46px] min-h-[46px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-[18px] py-0 text-[14.5px] font-bold leading-none [line-height:1] [text-box:trim-both_cap_alphabetic] tracking-normal no-underline transition-[background,box-shadow,transform,border-color] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0050d8] max-[639px]:max-w-full [&_svg]:block [&_svg]:size-[1.05em] [&_svg]:shrink-0';
const BTN_PRIMARY = `${BTN} border border-solid border-transparent bg-[#0050D8] !text-white hover:bg-[#0041AF]`;
const BTN_SECONDARY = `${BTN} border border-solid border-[#6c6c6c] bg-white !text-[#1a1a1a] hover:border-[#404040]`;
const BTN_CASES = `${BTN_SECONDARY} min-w-[220px] px-7 text-[16px] !text-[#0050D8] hover:border-[#0050D8] hover:bg-[rgba(0,80,216,0.04)] max-[1023px]:w-full max-[1023px]:min-w-0 max-[1023px]:max-w-[260px] max-[1023px]:px-[18px]`;

export default function ResinDetailPage({ content }: { content: ResinDetailContent }) {
  const { hero } = content;
  const specColumns = [content.specs.slice(0, 3), content.specs.slice(3)];
  const style = {
    fontFamily: 'var(--font-tajawal), Tajawal, system-ui, sans-serif',
    ['--app-cols' as string]: String(content.appColumns),
  } as CSSProperties;

  return (
    <div
      id="top"
      data-resin-detail
      data-hero-light
      className="min-h-screen bg-white pt-[calc(var(--hdr-h)+20px)] pb-7 text-gray-900 max-[1023px]:pt-[calc(var(--hdr-h)+12px)]"
      style={style}
    >
      <style>{`
        body:has([data-resin-detail]),
        body:has([data-resin-detail]) main,
        body:has([data-resin-detail]) .site-bg{
          background:#fff !important;
        }
        body.grain:has([data-resin-detail])::before{
          display:none !important;
        }
        body:has([data-resin-detail]) .dev-preview-tools,
        body:has([data-resin-detail]) .fabs,
        body:has([data-resin-detail]) nextjs-portal{
          display:none !important;
        }
      `}</style>

      <div className="mx-auto w-full max-w-none px-[clamp(20px,4vw,56px)] pt-8">
        <section className="items-end gap-7 [display:grid] lg:gap-0 lg:[grid-template-columns:44%_56%]">
          <div className="relative z-10 max-w-[40rem] pb-1 lg:-translate-y-20">
            <p className="text-sm font-bold leading-none" style={{ color: BLUE }}>
              {hero.kicker}
            </p>
            <h1 className="mt-3 max-w-none font-[inherit] text-[clamp(1.75rem,6.5vw,2.8rem)] leading-[1.08] tracking-[-0.035em] text-black lg:whitespace-nowrap max-[1023px]:text-[clamp(1.75rem,6.5vw,2.45rem)] max-[1023px]:whitespace-normal max-[1023px]:tracking-[-0.03em]">
              <span className="font-bold">{hero.titleLines.join(' ')}</span>
            </h1>
            <p className="mt-3 text-2xl font-bold leading-tight" style={{ color: BLUE }}>
              {hero.tagline}
            </p>
            <p className="mt-4 max-w-[380px] text-base font-medium leading-[1.65] text-gray-700">
              {hero.body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-[18px]">
              <Link href={hero.primaryCta.href} className={BTN_PRIMARY}>
                {hero.primaryCta.label}
              </Link>
              <a
                href={hero.secondaryCta.href}
                className={BTN_SECONDARY}
                target="_blank"
                rel="noopener noreferrer"
              >
                {hero.secondaryCta.label}
                <Download className="block size-[19px] shrink-0" strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <Image
              src={hero.img}
              alt={hero.imgAlt}
              width={hero.imgWidth}
              height={hero.imgHeight}
              priority
              quality={95}
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="h-auto w-full max-h-[min(360px,42vh)] object-contain object-bottom"
            />
          </div>
        </section>
      </div>

      <div className="mx-auto flex w-full max-w-none flex-col gap-[clamp(28px,4vw,40px)] px-[clamp(20px,4vw,56px)] pt-[clamp(28px,4vw,40px)] pb-[clamp(48px,6vw,72px)]">
        <section aria-labelledby="applications-title">
          <h2
            id="applications-title"
            className="mb-4 font-[inherit] text-lg font-bold leading-6"
            style={{ color: BLUE }}
          >
            Applications
          </h2>
          <ul
            className="m-0 list-none gap-2 p-0 [display:grid] [grid-template-columns:repeat(var(--app-cols),minmax(0,1fr))] max-[1023px]:[grid-template-columns:repeat(3,minmax(0,1fr))] max-[639px]:[grid-template-columns:1fr]"
          >
            {content.applications.map((application) => (
              <li key={application.id} className="m-0 min-w-0 p-0">
                <Link
                  href={application.href}
                  className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: BLUE }}
                >
                  <div
                    className={[
                      'box-border w-full bg-white',
                      content.appColumns <= 3 ? 'h-[220px] p-5' : 'h-[168px] p-4',
                    ].join(' ')}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={application.img}
                        alt={application.imgAlt}
                        fill
                        unoptimized
                        sizes={`(max-width: 639px) 100vw, (max-width: 1023px) 50vw, ${Math.round(200 / content.appColumns)}vw`}
                        className="object-contain object-center"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                  <p className="flex min-h-9 items-center justify-center px-1 py-1.5 text-center text-sm font-bold leading-tight text-gray-900">
                    {application.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={content.featuresAriaLabel}>
          <ul className="m-0 list-none gap-0 p-0 [display:grid] [grid-template-columns:repeat(2,minmax(0,1fr))] sm:[grid-template-columns:repeat(3,minmax(0,1fr))] lg:[grid-template-columns:repeat(6,minmax(0,1fr))]">
            {content.features.map((feature) => {
              const Icon = content.featureIcons[feature.id];
              return (
                <li
                  key={feature.id}
                  className="flex min-h-[104px] flex-col items-center justify-center px-2 py-3 text-center"
                >
                  {Icon ? <Icon className="size-11" /> : null}
                  <span className="mt-1.5 max-w-[148px] text-sm font-medium leading-[1.35] text-gray-900">
                    {feature.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="items-start gap-6 [display:grid] lg:gap-6 lg:[grid-template-columns:minmax(0,1.65fr)_minmax(280px,1fr)]">
          <div>
            <h2 className="mb-4 font-[inherit] text-lg font-bold leading-6" style={{ color: BLUE }}>
              Technical Specifications
            </h2>
            <div className="overflow-hidden rounded-lg border border-gray-200 [display:grid] [gap:0] sm:[grid-template-columns:repeat(2,minmax(0,1fr))]">
              {specColumns.map((column, columnIndex) => (
                <div
                  key={columnIndex === 0 ? 'primary-specs' : 'secondary-specs'}
                  className={
                    columnIndex === 1
                      ? 'border-t border-gray-200 sm:border-t-0 sm:border-l'
                      : ''
                  }
                >
                  <div
                    className={[
                      'min-h-[38px] border-b border-gray-200 bg-gray-50/60 text-sm font-bold [display:grid] [gap:0]',
                      columnIndex === 0
                        ? '[grid-template-columns:48%_52%]'
                        : '[grid-template-columns:64%_36%]',
                    ].join(' ')}
                  >
                    <span className="flex items-center px-3">
                      {columnIndex === 0 ? 'Property' : ''}
                    </span>
                    <span className="flex items-center px-3">Value</span>
                  </div>
                  {column.map((spec) => (
                    <div
                      key={spec.property}
                      className={[
                        'min-h-[38px] border-b border-gray-200 text-sm last:border-b-0 [display:grid] [gap:0]',
                        columnIndex === 0
                          ? '[grid-template-columns:48%_52%]'
                          : '[grid-template-columns:64%_36%]',
                      ].join(' ')}
                    >
                      <span className="flex items-center px-3 text-gray-700">
                        {spec.property}
                      </span>
                      <span className="flex items-center px-3 font-semibold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="h-full border-gray-200 lg:border-l lg:ps-6">
            <h2 className="mb-4 font-[inherit] text-lg font-bold leading-6" style={{ color: BLUE }}>
              Compatible With
            </h2>
            <ul className="m-0 list-none gap-1 p-0 [display:grid] [grid-template-columns:repeat(3,minmax(0,1fr))]">
              {content.compatible.map((item) => {
                const [brand, ...description] = item.label.split(' ');
                return (
                  <li key={item.id} className="min-w-0">
                    <Link
                      href={item.href}
                      className="flex flex-col items-center rounded-lg px-1 py-1 text-center transition hover:bg-blue-50/50 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ outlineColor: BLUE }}
                    >
                      <div className="flex h-[82px] w-full items-center justify-center">
                        <Image
                          src={item.img}
                          alt={item.imgAlt}
                          width={1536}
                          height={1024}
                          quality={95}
                          sizes="220px"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium leading-[1.4] text-gray-900">
                        <strong>{brand}</strong> {description.join(' ')}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="cases-title">
          <h2
            id="cases-title"
            className="mb-4 font-[inherit] text-lg font-bold leading-6"
            style={{ color: BLUE }}
          >
            Clinical Cases &amp; Reviews
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <ul className="m-0 flex-1 list-none gap-4 p-0 [display:grid] [grid-template-columns:repeat(2,minmax(0,1fr))] sm:[grid-template-columns:repeat(4,minmax(0,1fr))]">
              {content.cases.map((clinicalCase) => (
                <li key={clinicalCase.id}>
                  <Link
                    href={clinicalCase.href}
                    className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ outlineColor: BLUE }}
                  >
                    <Image
                      src={clinicalCase.img}
                      alt={clinicalCase.imgAlt}
                      width={600}
                      height={336}
                      quality={95}
                      sizes="(max-width: 639px) 50vw, 280px"
                      className="aspect-[1.58/1] h-auto w-full object-cover"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={content.casesCta.href} className={BTN_CASES}>
              {content.casesCta.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
