import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import {
  TEMPORARY_RESIN_APPLICATIONS,
  TEMPORARY_RESIN_CASES,
  TEMPORARY_RESIN_CASES_CTA,
  TEMPORARY_RESIN_COMPATIBLE,
  TEMPORARY_RESIN_FEATURES,
  TEMPORARY_RESIN_HERO,
  TEMPORARY_RESIN_SPECS,
} from '@/content/temporary-resin';
import { FEATURE_ICON_COMPONENTS } from '@/components/temporary-resin/FeatureIcons';
import '@/app/temporary-resin.css';

const BLUE = '#0050D8';

const specColumns = [
  TEMPORARY_RESIN_SPECS.slice(0, 3),
  TEMPORARY_RESIN_SPECS.slice(3),
];

export default function TemporaryResinPage() {
  const hero = TEMPORARY_RESIN_HERO;

  return (
    <div
      id="top"
      className="trr-page min-h-screen bg-white text-gray-900"
      data-hero-light
      style={{
        fontFamily:
          'var(--font-tajawal), Tajawal, system-ui, sans-serif',
      }}
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
              <span className="block font-bold">Temporary</span>
              <span className="font-bold">Restoration</span>{' '}
              <span className="font-normal">Resin</span>
            </h1>
            <p className="mt-3! text-2xl font-bold leading-tight" style={{ color: BLUE }}>
              {hero.tagline}
            </p>
            <p className="mt-4! max-w-[340px] text-base font-medium leading-[1.65] text-gray-700">
              {hero.body}
            </p>
            <div className="trr-hero-ctas mt-7! flex flex-wrap items-center gap-[18px]!">
              <Link href={hero.primaryCta.href} className="trr-btn trr-btn-primary">
                {hero.primaryCta.label}
              </Link>
              <a href={hero.secondaryCta.href} className="trr-btn trr-btn-secondary">
                {hero.secondaryCta.label}
                <Download className="size-[15px]" strokeWidth={2} aria-hidden />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center lg:h-[290px] lg:justify-end">
            <Image
              src={hero.img}
              alt={hero.imgAlt}
              width={4096}
              height={2168}
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
            className="trr-app-grid mt-2! grid sm:grid-cols-3"
            style={{ gap: 8, columnGap: 8, rowGap: 8 }}
          >
            {TEMPORARY_RESIN_APPLICATIONS.map((application) => (
              <li key={application.id} className="m-0! min-w-0 p-0!">
                <Link
                  href={application.href}
                  className="block overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: BLUE }}
                >
                  <div className="trr-app-media flex h-[120px] items-center justify-center">
                    <Image
                      src={application.img}
                      alt={application.imgAlt}
                      width={900}
                      height={320}
                      quality={95}
                      sizes="(max-width: 639px) 100vw, 480px"
                      className="h-full w-full object-contain object-center"
                    />
                  </div>
                  <p className="flex h-8 items-center justify-center px-2! text-center text-sm font-bold text-gray-900">
                    {application.label}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Temporary Restoration Resin features"
          className="trr-features mt-2! overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <ul className="trr-features-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {TEMPORARY_RESIN_FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICON_COMPONENTS[feature.id];
              return (
                <li
                  key={feature.id}
                  className={[
                    'flex min-h-[104px] flex-col items-center justify-center px-2! py-3! text-center',
                    index > 0 ? 'border-l border-gray-200' : '',
                  ].join(' ')}
                >
                  <Icon className="size-11" />
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
            <div className="trr-specs-grid mt-[9px]! grid overflow-hidden rounded-lg border border-gray-200 sm:grid-cols-2">
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
                      'trr-specs-row grid h-[30px] border-b border-gray-200 bg-gray-50/60 text-xs font-bold',
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
                        'trr-specs-row grid min-h-[30px] border-b border-gray-200 text-xs last:border-b-0',
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
              {TEMPORARY_RESIN_COMPATIBLE.map((item) => {
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
              {TEMPORARY_RESIN_CASES.map((clinicalCase) => (
                <li key={clinicalCase.id}>
                  <Link
                    href={clinicalCase.href}
                    className="block overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)] focus-visible:outline-2 focus-visible:outline-offset-2"
                    style={{ outlineColor: BLUE }}
                  >
                    <Image
                      src={clinicalCase.img}
                      alt={clinicalCase.imgAlt}
                      width={1536}
                      height={1024}
                      quality={95}
                      sizes="(max-width: 639px) 50vw, 280px"
                      className="aspect-[1.58/1] h-auto w-full object-cover"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={TEMPORARY_RESIN_CASES_CTA.href}
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white px-8! text-sm font-bold transition hover:border-blue-300 hover:bg-blue-50/30 focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[206px] sm:px-0!"
              style={{ color: BLUE, outlineColor: BLUE }}
            >
              {TEMPORARY_RESIN_CASES_CTA.label}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
