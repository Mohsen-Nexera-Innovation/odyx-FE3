import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_SALES_HERO } from '@/content/contact-sales';

export function SalesHero() {
  const { breadcrumb, title, subtitle, description, image } = CONTACT_SALES_HERO;

  return (
    <section
      className="w-full px-[clamp(20px,4vw,56px)] pt-[80px] lg:pt-[85px]"
      data-hero-light
      aria-labelledby="contact-sales-title"
    >
      {/* <div className="w-full bg-[#F4F8FD] relative z-10"> */}
      <div className="w-full bg-[#F4F8FD] relative z-10 rounded-[var(--cs-radius)] px-5 py-5 lg:py-0 sm:px-7 lg:px-8 overflow-hidden">


        {/* <nav aria-label="Breadcrumb" className="mb-6 lg:mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-[13px] font-medium text-[#9CA3AF]">
            {breadcrumb.map((crumb, i) => (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden className="text-[#D1D5DB]">&gt;</span>}
                {i < breadcrumb.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-[#0050D8] transition-colors text-[#0050D8] font-bold">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-[#6B7280] font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav> */}

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            <h1
              id="contact-sales-title"
              className="text-[28px] sm:text-[36px] lg:text-[52px] font-extrabold text-[#0A1020] leading-[1.1] tracking-tight mb-3 lg:mb-4"
            >
              {title}
            </h1>
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-bold text-[#0A1020] mb-2 lg:mb-4">
              {subtitle}
            </p>
            <p className="text-[#6B7280] text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed max-w-[95%] font-medium whitespace-pre-line">
              {description}
            </p>
          </div>

          <div className="w-full lg:w-[55%] relative h-[200px] sm:h-[260px] md:h-[320px] lg:h-[420px]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-contain object-center lg:object-right mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
