import type { ComponentType, CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import '@/app/resin-detail.css';

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

export default function ResinDetailPage({ content }: { content: ResinDetailContent }) {
  const { hero } = content;
  const specColumns = [content.specs.slice(0, 3), content.specs.slice(3)];
  const style = {
    fontFamily:
      'var(--font-tajawal), Tajawal, system-ui, sans-serif',
    ['--rd-app-cols' as string]: String(content.appColumns),
  } as CSSProperties;

  return (
    <div
      id="top"
      className="rd-page min-h-screen bg-white text-gray-900"
      data-hero-light
      style={style}
    >
      <div className="mx-auto! w-full max-w-[1240px] px-[clamp(20px,4vw,56px)]! pb-16! pt-4! lg:pb-20! lg:pt-2!">
        <section className="grid items-center gap-7 lg:min-h-[307px] lg:grid-cols-[44%_56%] lg:gap-0">
          <div className="relative z-10 lg:-translate-y-[10px]">
            <p
              className="text-sm font-bold leading-none"
              style={{ color: BLUE }}
            >
              {hero.kicker}
            </p>
            <h1 className="mt-3! max-w-[430px] text-[2.5rem] leading-[1.08] tracking-[-0.035em] text-black sm:text-[2.8rem]">
              {hero.titleLines.map((line, index) => (
                <span
                  key={line}
                  className={index === 0 ? 'block font-bold' : 'font-bold'}
                >
                  {line}
                  {index < hero.titleLines.length - 1 && index > 0 ? ' ' : null}
                </span>
              ))}
            </h1>
            <p className="mt-3! text-2xl font-bold leading-tight" style={{ color: BLUE }}>
              {hero.tagline}
            </p>
            <p className="mt-4! max-w-[380px] text-base font-medium leading-[1.65] text-gray-700">
              {hero.body}
            </p>
            <div className="mt-7! flex flex-wrap items-center gap-[18px]!">
              <Link href={hero.primaryCta.href} className="rd-btn rd-btn-primary">
                {hero.primaryCta.label}
              </Link>
              <a href={hero.secondaryCta.href} className="rd-btn rd-btn-secondary">
                {hero.secondaryCta.label}
                <Download className="size-[15px]" strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:h-[290px] lg:justify-end">
            <Image
              src={hero.img}
              alt={hero.imgAlt}
              width={hero.imgWidth}
              height={hero.imgHeight}
              priority
              quality={95}
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </section>

        <section aria-labelledby="applications-title" className="mt-1!">
          <h2
            id="applications-title"
            className="text-base font-bold leading-5"
            style={{ color: BLUE }}
          >
            Applications
          </h2>
          <ul
            className="rd-app-grid mt-2! grid"
            style={{ gap: 8, columnGap: 8, rowGap: 8 }}
          >
            {content.applications.map((application) => (
              <li key={application.id} className="m-0! min-w-0 p-0!">
                <Link
                  href={application.href}
                  className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: BLUE }}
                >
                  <div className="rd-app-media flex h-[100px] items-center justify-center">
                    <Image
                      src={application.img}
                      alt={application.imgAlt}
                      width={700}
                      height={340}
                      quality={95}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 180px"
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <p className="flex min-h-8 items-center justify-center px-1! py-1! text-center text-xs font-bold leading-tight text-gray-900">
                    {application.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-label={content.featuresAriaLabel} className="mt-5!">
          <ul className="rd-features-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {content.features.map((feature) => {
              const Icon = content.featureIcons[feature.id];
              return (
                <li
                  key={feature.id}
                  className="flex min-h-[104px] flex-col items-center justify-center px-2! py-3! text-center"
                >
                  {Icon ? <Icon className="size-11" /> : null}
                  <span className="mt-1.5! max-w-[120px] text-xs font-medium leading-[1.3] text-gray-900">
                    {feature.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-5! grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,1fr)] lg:gap-6!">
          <div>
            <h2 className="text-base font-bold leading-5" style={{ color: BLUE }}>
              Technical Specifications
            </h2>
            <div className="rd-specs-grid mt-[9px]! grid overflow-hidden rounded-lg border border-gray-200 sm:grid-cols-2">
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
                      'rd-specs-row grid h-[30px] border-b border-gray-200 bg-gray-50/60 text-xs font-bold',
                      columnIndex === 0 ? 'grid-cols-[48%_52%]' : 'grid-cols-[64%_36%]',
                    ].join(' ')}
                  >
                    <span className="flex items-center px-3!">
                      {columnIndex === 0 ? 'Property' : ''}
                    </span>
                    <span className="flex items-center px-3!">Value</span>
                  </div>
                  {column.map((spec) => (
                    <div
                      key={spec.property}
                      className={[
                        'rd-specs-row grid min-h-[30px] border-b border-gray-200 text-xs last:border-b-0',
                        columnIndex === 0 ? 'grid-cols-[48%_52%]' : 'grid-cols-[64%_36%]',
                      ].join(' ')}
                    >
                      <span className="flex items-center px-3! text-gray-700">
                        {spec.property}
                      </span>
                      <span className="flex items-center px-3! font-semibold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="h-full border-gray-200 lg:border-l lg:ps-6!">
            <h2 className="text-base font-bold leading-5" style={{ color: BLUE }}>
              Compatible With
            </h2>
            <ul className="mt-1! grid grid-cols-3 gap-1">
              {content.compatible.map((item) => {
                const [brand, ...description] = item.label.split(' ');
                return (
                  <li key={item.id} className="min-w-0">
                    <Link
                      href={item.href}
                      className="flex flex-col items-center rounded-lg px-1! py-1! text-center transition hover:bg-blue-50/50 focus-visible:outline-2 focus-visible:outline-offset-2"
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
                      <p className="text-xs font-medium leading-[1.35] text-gray-900">
                        <strong>{brand}</strong> {description.join(' ')}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section aria-labelledby="cases-title" className="mt-8! mb-4!">
          <h2
            id="cases-title"
            className="text-base font-bold leading-5"
            style={{ color: BLUE }}
          >
            Clinical Cases &amp; Reviews
          </h2>
          <div className="mt-3! flex flex-col gap-4 sm:flex-row sm:items-center">
            <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
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
            <Link
              href={content.casesCta.href}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-8! text-sm font-bold transition hover:border-blue-300 hover:bg-blue-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[206px] sm:px-0!"
              style={{ color: BLUE, outlineColor: BLUE }}
            >
              {content.casesCta.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
