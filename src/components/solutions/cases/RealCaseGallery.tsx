import type { RealClinicalCase } from '@/content/clinical-case-photos';

const SORA =
  "[font-family:var(--font-sora),'Sora',ui-sans-serif,system-ui,sans-serif]";

/** Grid of real before/after clinical case cards (not application links). */
export default function RealCaseGallery({
  cases,
  emptyLabel = 'Clinical case photography for this category is coming soon.',
  tagColor = '#D65765',
}: {
  cases: RealClinicalCase[];
  emptyLabel?: string;
  tagColor?: string;
}) {
  if (cases.length === 0) {
    return (
      <p className="mt-3 mb-0 rounded-2xl border border-dashed border-[#c5cee0] bg-white px-[22px] py-7 text-[0.95rem] font-medium leading-[1.45] text-[#7a8499]">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="mt-3 grid grid-cols-2 gap-[18px] max-[960px]:grid-cols-1">
      {cases.map((c) => (
        <article
          key={c.id}
          className="overflow-hidden rounded-[18px] border border-solid border-[#e4e9f2] bg-white shadow-[0_8px_22px_rgba(20,40,80,.05)]"
        >
          <header className="flex flex-col gap-1.5 px-[18px] pt-4 pb-3">
            <span
              className="self-start rounded-full bg-[rgba(214,87,101,.12)] px-[9px] py-[3px] text-[0.68rem] font-bold tracking-[0.06em] uppercase"
              style={{ color: tagColor }}
            >
              {c.tag}
            </span>
            <h3 className={`${SORA} m-0 text-[1.05rem] font-bold leading-[1.25] tracking-[-0.02em] text-[#14203a]`}>
              {c.title}
            </h3>
          </header>
          <div className="grid grid-cols-2 gap-0.5 bg-[#e4e9f2] max-[560px]:grid-cols-1">
            <Shot img={c.before.img} alt={c.before.alt} caption="Before" smile={c.before.focus === 'smile'} />
            <Shot img={c.after.img} alt={c.after.alt} caption="After" smile={c.after.focus === 'smile'} />
          </div>
        </article>
      ))}
    </div>
  );
}

function Shot({
  img,
  alt,
  caption,
  smile,
}: {
  img: string;
  alt: string;
  caption: string;
  smile: boolean;
}) {
  return (
    <figure className="relative m-0 aspect-[4/5] overflow-hidden bg-[#0f1420] max-[560px]:aspect-[5/4]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt={alt}
        loading="lazy"
        className={
          smile
            ? 'block size-full origin-[center_40%] scale-[1.15] object-cover object-[center_40%]'
            : 'block size-full object-cover'
        }
      />
      <figcaption className="absolute bottom-2.5 left-2.5 rounded-full bg-[rgba(10,14,24,.72)] px-[9px] py-1 text-[0.68rem] font-bold tracking-[0.06em] text-white uppercase backdrop-blur-[6px]">
        {caption}
      </figcaption>
    </figure>
  );
}
