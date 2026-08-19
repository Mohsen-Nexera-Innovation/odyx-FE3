import Link from 'next/link';
import type { ReactNode } from 'react';
import { resolveMediaUrl } from '@/lib/api/case-library';
import ProductCaseGallery from '@/components/solutions/cases/products/ProductCaseGallery';
import { CURE_UV02_HERO } from '@/content/cure-uv02';
import { P1_26_HERO } from '@/content/p1-26';
import { HERO as RESIN_HERO } from '@/content/resins';
import { HERO as SCANNER_HERO } from '@/content/scanner-s1';
import {
  APPLICATION_CASE_META,
  applicationCasesPath,
  isApplicationCaseSlug,
} from '@/content/application-cases';
import {
  PRODUCT_FAMILY_ICONS,
  PRODUCT_FAMILY_META,
  isProductFamilySlug,
  productCaseGlance,
  productCaseUsedProducts,
  type ApplicationCaseSlug,
  type ProductCaseCard,
  type ProductFamilySlug,
} from '@/content/product-cases';

type Props = {
  productSlug: ProductFamilySlug;
  caseItem: ProductCaseCard;
  applicationSlug?: ApplicationCaseSlug;
};

const PRODUCT_PAGES: Record<
  ProductFamilySlug,
  { name: string; description: string; href: string; img: string }
> = {
  scanner: {
    name: 'ODYX S1 Intraoral Scanner',
    description: SCANNER_HERO.sub,
    href: '/products/odyx-s1',
    img: PRODUCT_FAMILY_ICONS.scanner.img,
  },
  printer: {
    name: 'P1-26 Dental 3D Printer',
    description: P1_26_HERO.body,
    href: '/products/odyx-p1-26',
    img: PRODUCT_FAMILY_ICONS.printer.img,
  },
  curing: {
    name: 'ODYX CURE UV-02',
    description: CURE_UV02_HERO.body,
    href: '/products/curing-machines',
    img: PRODUCT_FAMILY_ICONS.curing.img,
  },
  resin: {
    name: 'ODYX Resins',
    description: RESIN_HERO.sub,
    href: '/products/resins',
    img: PRODUCT_FAMILY_ICONS.resin.img,
  },
};

function IconAlert() {
  return (
    <svg className="size-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="16.2" r="1" fill="currentColor" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg className="size-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="6" y="5" width="12" height="15" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 5.5h6v2.5H9z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 12h6M9 15.5h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="size-7 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m8.5 12.2 2.4 2.4 4.6-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductCaseDetail({ productSlug, caseItem, applicationSlug }: Props) {
  const family = PRODUCT_FAMILY_META[productSlug];
  const glance = productCaseGlance(caseItem);
  const summary = caseItem.summary?.trim() || '';
  const materials = caseItem.keyMaterials.filter((m) => m.name.trim());
  const journey = caseItem.treatmentJourney.filter((s) => s.title.trim());
  const narrative: { id: string; title: string; body: string; icon: ReactNode }[] = [
    caseItem.clinicalChallenge?.trim()
      ? {
          id: 'challenge',
          title: 'Clinical Challenge',
          body: caseItem.clinicalChallenge.trim(),
          icon: <IconAlert />,
        }
      : null,
    caseItem.treatmentApproach?.trim()
      ? {
          id: 'approach',
          title: 'Treatment Approach',
          body: caseItem.treatmentApproach.trim(),
          icon: <IconClipboard />,
        }
      : null,
    caseItem.treatmentOutcome?.trim()
      ? {
          id: 'outcome',
          title: 'Treatment Outcome',
          body: caseItem.treatmentOutcome.trim(),
          icon: <IconCheck />,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  const used = productCaseUsedProducts(caseItem);
  const productCards = [
    ...new Map(
      used
        .filter((p) => isProductFamilySlug(p.id))
        .map((p) => [p.id, PRODUCT_PAGES[p.id as ProductFamilySlug]] as const),
    ).values(),
  ];

  const crumbSlug = applicationSlug ?? caseItem.applicationSlug;
  const appHref = isApplicationCaseSlug(crumbSlug ?? '')
    ? applicationCasesPath(crumbSlug as ApplicationCaseSlug)
    : `/solutions/cases/products/${productSlug}`;
  const crumbLabel = isApplicationCaseSlug(crumbSlug ?? '')
    ? APPLICATION_CASE_META[crumbSlug as ApplicationCaseSlug].label
    : caseItem.badge || family.label;

  return (
    <div className="bg-[#F3F6FA] w-full min-h-dvh overflow-x-clip pb-12" data-hero-light>
      <article className="w-full px-[clamp(20px,4vw,56px)] pt-[calc(var(--hdr-h)+12px)] sm:pt-[calc(var(--hdr-h)+16px)] lg:pt-[calc(var(--hdr-h)+24px)]">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] sm:text-[16px] !text-[#6B7280] mb-3 sm:mb-4 min-w-0"
        >
          <Link
            href="/solutions/cases"
            className="cursor-pointer hover:!text-[#0050D8] no-underline !text-[#6B7280]"
          >
            Clinical Cases
          </Link>
          <span aria-hidden>›</span>
          <Link href={appHref} className="cursor-pointer hover:!text-[#0050D8] no-underline !text-[#6B7280]">
            {crumbLabel}
          </Link>
          <span aria-hidden>›</span>
          <span className="text-[#374151] min-w-0 break-words">{caseItem.title}</span>
        </nav>

        <div className="[display:grid] grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-5 sm:gap-8 lg:gap-12 items-start">
          <ProductCaseGallery caseItem={caseItem} />

          <div className="min-w-0">
            <p className="inline-flex items-center rounded-[4px] border border-[#1F2937] bg-transparent px-2 py-[3px] text-[10px] font-extrabold tracking-[0.08em] text-[#0F2744] uppercase">
              {caseItem.badge}
            </p>
            <h1 className="mt-3 text-[24px] sm:text-[32px] lg:text-[34px] font-bold text-[#0F2744] leading-[1.15] tracking-tight m-0 break-words">
              {caseItem.title}
            </h1>
            {summary ? (
              <p className="m-0 mt-3 mb-5 text-[14px] sm:text-[15px] text-[#6B7280] leading-[1.65]">
                {summary}
              </p>
            ) : null}

            {glance.length ? (
            <div className="rounded-[10px] border border-[#E6EAF0] bg-white px-4 py-4 sm:px-6 sm:py-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
              <h2 className="m-0 text-[16px] font-bold text-[#0F2744]">Case At A Glance</h2>
              <div className="mt-3 mb-4 sm:mb-5 h-px w-full bg-[#E8ECF1]" />
              <dl className="m-0 [display:grid] grid-cols-1 sm:[grid-template-columns:1fr_1fr] gap-x-8 sm:gap-x-10 gap-y-4 sm:gap-y-6">
                {glance.map((row) => (
                  <div key={row.label} className="min-w-0">
                    <dt className="m-0 text-[12px] font-medium text-[#9AA3B2]">{row.label}</dt>
                    <dd className="m-0 mt-1.5 text-[15px] font-semibold break-words">
                      {row.label === 'Case ID' ? (
                        <a
                          href={`#${row.value}`}
                          className="cursor-pointer !text-[#0050D8] no-underline font-semibold"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-[#0F2744]">{row.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            ) : null}

            {materials.length ? (
            <div className="mt-6">
              <p className="m-0 mb-3 text-[13px] font-semibold text-[#6B7280]">Key Materials Used</p>
              <ul className="m-0 p-0 list-none flex flex-wrap gap-2.5">
                {materials.map((m) => (
                  <li
                    key={m.name}
                    className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F7F8FA] px-3.5 py-2 text-[13px] font-medium text-[#374151]"
                  >
                    {m.name}
                    {m.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={resolveMediaUrl(m.img)} alt="" className="w-4 h-4 object-contain" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            ) : null}
          </div>
        </div>

        {productCards.length ? (
        <section className="mt-10 md:mt-12" aria-labelledby="products-used-title">
          <h2 id="products-used-title" className="m-0 text-[20px] sm:text-[22px] md:text-[26px] font-bold text-[#0F2744] break-words">
            Products Used In This Case
          </h2>
          <p className="m-0 mt-1.5 text-[14px] text-[#6B7280]">
            Explore the products utilized to achieve these clinical results.
          </p>
          <div className="mt-4 mb-5 h-px w-full bg-[#E6EAF0]" />

          <ul className="m-0 p-0 list-none [display:grid] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productCards.slice(0, 3).map((p) => (
              <li key={p.href} className="min-w-0">
                <article className="h-full flex flex-col overflow-hidden rounded-[12px] border border-[#E6EAF0] bg-white">
                  <div className="bg-[#F3F5F8] aspect-[16/9] flex items-center justify-center p-3 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" className="h-full w-full object-contain" />
                  </div>
                  <div className="flex flex-col flex-1 bg-white p-5">
                    <h3 className="m-0 min-w-0 text-[15px] sm:text-[16px] font-bold text-[#0F2744] break-words">{p.name}</h3>
                    <p className="m-0 mt-2 text-[13px] leading-relaxed text-[#6B7280] line-clamp-3">
                      {p.description}
                    </p>
                    <Link
                      href={p.href}
                      className="mt-auto pt-4 inline-flex items-center gap-1 text-[13px] font-semibold !text-[#0050D8] no-underline cursor-pointer"
                    >
                      View Product
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
        ) : null}

        {narrative.length ? (
        <section className="mt-5 md:mt-6">
          <ul className="m-0 p-0 list-none [display:grid] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {narrative.map((item) => (
              <li
                key={item.id}
                className="min-w-0 rounded-[12px] border border-[#E6EAF0] bg-white p-4 sm:p-5"
              >
                <div className="flex items-start sm:items-center gap-2.5 mb-2.5 text-[#0050D8]">
                  {item.icon}
                  <h3 className="m-0 min-w-0 text-[15px] sm:text-[16px] font-bold text-[#0F2744] break-words">
                    {item.title}
                  </h3>
                </div>
                <p className="m-0 text-[13px] leading-relaxed text-[#6B7280]">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>
        ) : null}

        {journey.length ? (
        <section className="mt-6 md:mt-7" aria-labelledby="journey-title">
          <h2 id="journey-title" className="m-0 mb-4 sm:mb-5 text-[20px] sm:text-[22px] md:text-[26px] font-bold text-[#0F2744] break-words">
            Treatment Journey
          </h2>
          <ol className="m-0 p-0 list-none [display:grid] grid-cols-1 sm:grid-cols-2 gap-4">
            {journey.map((step, i) => (
              <li
                key={`${step.title}-${i}`}
                className="min-w-0 rounded-[12px] border border-[#E6EAF0] bg-white p-4 sm:p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-9 h-9 rounded-full bg-[#0050D8] text-white text-[13px] font-bold flex items-center justify-center">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="m-0 text-[16px] font-bold text-[#0F2744]">{step.title}</h3>
                    {step.body ? (
                      <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-[#6B7280]">{step.body}</p>
                    ) : null}
                    {step.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveMediaUrl(step.img)}
                        alt=""
                        className="mt-3 w-full max-h-40 object-cover rounded-xl"
                      />
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>
        ) : null}
      </article>
    </div>
  );
}
