import Link from 'next/link';
import {
  ABOUT_BLUE,
  ABOUT_BODY,
  ABOUT_CARD_TITLE,
  ABOUT_EYEBROW,
  ABOUT_GUTTER,
  ABOUT_H1,
} from '@/components/about/aboutChrome';
import { NEWS_ARTICLES, NEWS_PAGE } from '@/content/news';

export default function NewsPage() {
  return (
    <div className="about min-h-screen bg-white pb-10 pt-[calc(var(--hdr-h)+12px)] lg:pt-[calc(var(--hdr-h)+17px)]">
      <div className={`${ABOUT_GUTTER} flex flex-col gap-8`}>
        <header className="max-w-[40rem]">
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-[13px] font-medium text-[var(--hv2-body)]" aria-label="Breadcrumb">
            <Link href="/" className="text-[#0050D8] no-underline hover:underline">
              Home
            </Link>
            <span aria-hidden>/</span>
            <Link href="/about" className="text-[#0050D8] no-underline hover:underline">
              About
            </Link>
            <span aria-hidden>/</span>
            <span>News</span>
          </nav>
          <p className={`${ABOUT_EYEBROW} mb-4!`}>{NEWS_PAGE.kicker}</p>
          <h1 className={ABOUT_H1}>
            Stay Inspired.{' '}
            <span className={ABOUT_BLUE}>Stay Ahead.</span>
          </h1>
          <p className={`${ABOUT_BODY} max-w-[36rem]`}>{NEWS_PAGE.description}</p>
        </header>

        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_ARTICLES.map((item) => (
            <li key={item.title} className="min-w-0">
              <Link
                href={item.href}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[rgba(10,40,90,.08)] bg-white text-inherit no-underline transition hover:border-blue-300 hover:shadow-[0_4px_14px_rgba(0,80,216,0.1)]"
              >
                <div className="relative h-[160px] w-full overflow-hidden bg-[var(--hv2-surface,#F3F5FD)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" className="size-full object-cover" />
                  {item.category ? (
                    <div className="absolute top-3 left-3 z-10 rounded-full bg-[var(--hv2-blue)] px-2.5 py-1 text-[12px] font-bold tracking-[.08em] text-white uppercase shadow-sm">
                      {item.category}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-1 flex-col p-4 lg:p-5">
                  <div className="mb-2 text-[12px] font-medium text-[var(--hv2-body)]">{item.date}</div>
                  <h2 className={`${ABOUT_CARD_TITLE} mb-2 line-clamp-2`}>{item.title}</h2>
                  <p className="m-0 line-clamp-2 text-[length:clamp(12px,1vw,14.5px)] font-normal leading-relaxed text-[var(--hv2-body)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
