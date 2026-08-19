import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServerApiBaseUrl } from '@/lib/config';
import { resolveMediaUrl, type ShowcaseCase } from '@/lib/api/case-library';

type Props = { params: Promise<{ slug: string }> };

export const dynamic = 'force-dynamic';

async function fetchCase(slug: string): Promise<ShowcaseCase | null> {
  const base = getServerApiBaseUrl();
  if (!base) return null;
  const url = `${base}/case-library/${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as ShowcaseCase;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = await fetchCase(slug);
  if (!c) return { title: 'Case | ODYX' };
  return {
    title: `${c.title} | ODYX Case Library`,
    description: c.summary || `${c.badge} clinical case from the ODYX Real Case Library.`,
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = await fetchCase(slug);
  if (!c) notFound();

  const cover = resolveMediaUrl(c.coverImageUrl);
  const before = c.beforeImageUrl ? resolveMediaUrl(c.beforeImageUrl) : '';
  const after = c.afterImageUrl ? resolveMediaUrl(c.afterImageUrl) : '';
  const hasPair = Boolean(before && after);

  return (
    <div className="bg-white min-h-screen" data-hero-light>
      <div className="w-full px-[clamp(20px,4vw,56px)] py-8 lg:py-12 max-w-[1100px] mx-auto">
        <Link
          href="/solutions/cases#featured-cases"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#0050D8] hover:underline mb-6"
        >
          ← Back to Case Library
        </Link>

        <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
          {c.badge}
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0A1020] leading-tight tracking-tight m-0 mb-4">
          {c.title}
        </h1>

        {c.tags.length ? (
          <div className="flex flex-wrap gap-2 mb-6">
            {c.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#F2F4F7] px-3 py-1 text-[12px] font-semibold text-[#475467]"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {c.summary ? (
          <p className="text-[15px] text-[#475467] leading-relaxed max-w-2xl mb-8">{c.summary}</p>
        ) : null}

        {hasPair ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 items-stretch">
            <figure className="m-0 relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 h-[280px] sm:h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={before}
                alt={`${c.title} before`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <figcaption className="absolute top-3 left-3 rounded-full bg-[#0A1020]/78 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                Before
              </figcaption>
            </figure>
            <figure className="m-0 relative bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 h-[280px] sm:h-[360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={after}
                alt={`${c.title} after`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <figcaption className="absolute top-3 left-3 rounded-full bg-[#0A1020]/78 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                After
              </figcaption>
            </figure>
          </div>
        ) : cover ? (
          <div className="mb-10 rounded-2xl overflow-hidden border border-gray-100 bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={c.coverImageAlt || c.title}
              className="w-full max-h-[480px] object-cover"
            />
          </div>
        ) : null}

        {c.products.length ? (
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#667085] mb-3">
              Products Used
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {c.products.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#F5F8FC] px-3 py-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveMediaUrl(p.img)}
                    alt={p.alt}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-[13px] font-semibold text-[#0A1020]">{p.alt}</span>
                </div>
              ))}
              {c.moreProducts > 0 ? (
                <span className="text-[13px] font-semibold text-[#0050D8]">
                  +{c.moreProducts} more
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
