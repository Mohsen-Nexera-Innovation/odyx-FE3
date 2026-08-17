import Link from 'next/link';
import {
  productCaseCardHref,
  type ProductCaseCard,
  type ProductCaseFamily,
} from '@/content/product-cases';

function CaseMedia({ item }: { item: ProductCaseCard }) {
  const before = item.before;
  const after = item.after;

  const overlays = (
    <div className="absolute top-2 start-2 z-10 flex items-center gap-1 max-w-[calc(100%-16px)] min-w-0">
      <span className="rounded-[4px] bg-[#E8EAED] px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[12px] font-extrabold tracking-[0.05em] text-[#111827] uppercase leading-none truncate">
        {item.badge}
      </span>
      {item.products.length ? (
        <div className="flex items-center shrink-0">
          {item.products.slice(0, 3).map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.id}
              src={p.img}
              alt=""
              className={`h-[20px] w-[20px] sm:h-[22px] sm:w-[22px] rounded-full object-contain bg-white p-px ring-1 ring-white shadow-[0_1px_3px_rgba(15,23,42,0.14)] ${
                i === 0 ? '' : '-ms-1'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );

  if (before && after) {
    return (
      <div className="relative px-1.5 pt-1.5 shrink-0">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-white">
          <div className="absolute inset-y-0 left-0 w-[calc(50%-1px)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={before.img} alt={before.alt} className="h-full w-full object-cover" />
            <span className="absolute bottom-2 start-2 rounded-full bg-[#111827]/80 px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.08em] text-white uppercase">
              Before
            </span>
          </div>
          <div className="absolute inset-y-0 right-0 w-[calc(50%-1px)] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={after.img} alt={after.alt} className="h-full w-full object-cover" />
            <span className="absolute bottom-2 start-2 rounded-full bg-[#0050D8] px-2 sm:px-2.5 py-1 text-[8px] sm:text-[9px] font-bold tracking-[0.08em] text-white uppercase">
              After
            </span>
          </div>
          {overlays}
        </div>
      </div>
    );
  }

  return (
    <div className="relative px-1.5 pt-1.5 shrink-0">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-slate-100">
        {item.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img} alt={item.imgAlt} className="w-full h-full object-cover" />
        ) : null}
        {overlays}
      </div>
    </div>
  );
}

export default function ProductCaseCardView({
  item,
  listingFamily,
}: {
  item: ProductCaseCard;
  listingFamily: ProductCaseFamily;
}) {
  const href = productCaseCardHref(item, listingFamily);
  const productTags = item.products.map((p) => p.alt).filter(Boolean);

  const body = (
    <>
      <CaseMedia item={item} />
      <div className="flex flex-col flex-1 p-4 sm:p-5 md:p-6 min-h-0">
        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-bold text-[#0F172A] leading-[1.3] m-0 break-words">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="m-0 mt-2 text-[14px] leading-[1.55] text-[#6B7280] line-clamp-2">
            {item.summary}
          </p>
        ) : null}

        {productTags.length ? (
          <div className="mt-4">
            <span className="block text-[11px] font-bold tracking-[0.14em] text-[#6B7280] uppercase">
              Products used
            </span>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {productTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium text-[#4B5563]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {href ? (
          <span className="mt-auto pt-4 sm:pt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold !text-[#0050D8]">
            View case
            <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span className="mt-auto pt-5" />
        )}
      </div>
    </>
  );

  const className =
    'group flex flex-col w-full h-full min-w-0 bg-white rounded-2xl border border-[#D5DCE6] no-underline !text-inherit';

  if (href) {
    return (
      <Link href={href} className={className}>
        {body}
      </Link>
    );
  }

  return <article className={className}>{body}</article>;
}
