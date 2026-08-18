export function SectionHead({
  number,
  titleId,
  title,
  subtitle,
}: {
  number: number;
  titleId: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mb-[1.15rem] flex items-start gap-3">
      <span
        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0050D8] text-xs font-bold text-white"
        aria-hidden
      >
        {number}
      </span>
      <div>
        <h2 id={titleId} className="m-0 text-lg font-bold leading-tight text-[#0A1020]">
          {title}
        </h2>
        <p className="mt-0.5 text-[13px] font-medium leading-snug text-[#6B7280]">
          {subtitle}
        </p>
      </div>
    </header>
  );
}
