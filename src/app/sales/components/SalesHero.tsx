import Image from 'next/image';
import { CONTACT_SALES_HERO } from '@/content/contact-sales';

export function SalesHero() {
  const { title, subtitle, description, images } = CONTACT_SALES_HERO;

  return (
    <section
      className="w-full px-[clamp(20px,4vw,56px)] pt-[80px] lg:pt-[85px]"
      data-hero-light
      aria-labelledby="contact-sales-title"
    >
      {/* <div className="w-full bg-[#F4F8FD] relative z-10"> */}
      <div className="w-full bg-[#F4F8FD] relative z-10 rounded-[var(--cs-radius)] px-5 py-5 lg:py-0 sm:px-7 lg:px-8 overflow-hidden">

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

          <div
            className="w-full lg:w-[55%] relative h-[200px] sm:h-[260px] md:h-[320px] lg:h-[420px] flex items-center justify-center"
            aria-label="ODYX products"
          >
            <div className="flex h-full w-auto max-w-full items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {images.map((image) => (
                <div
                  key={image.src}
                  className="relative h-[92%] w-[88px] sm:w-[120px] md:w-[150px] lg:w-[190px] shrink-0"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    sizes="(max-width: 640px) 88px, (max-width: 768px) 120px, (max-width: 1024px) 150px, 190px"
                    className="object-contain object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
