'use client';

import { useMemo, useState } from 'react';
import { type ProductCaseCard } from '@/content/product-cases';

type Props = {
  caseItem: ProductCaseCard;
};

type Pair = {
  id: string;
  before: { img: string; alt: string };
  after: { img: string; alt: string };
};

function SplitFrame({
  before,
  after,
  labels,
  className,
}: {
  before: { img: string; alt: string };
  after: { img: string; alt: string };
  labels?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative flex h-full w-full overflow-hidden bg-[#EEF1F5] ${className ?? ''}`}>
      <div className="relative h-full w-1/2 min-w-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.img} alt={before.alt} className="block h-full w-full object-cover" />
        {labels ? (
          <span className="absolute bottom-2 start-2 sm:bottom-3 sm:start-3 rounded-md bg-[#111827] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-extrabold tracking-[0.08em] text-white uppercase">
            Before
          </span>
        ) : null}
      </div>
      <div className="relative h-full w-px shrink-0 bg-white" aria-hidden />
      <div className="relative h-full w-1/2 min-w-0 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.img} alt={after.alt} className="block h-full w-full object-cover" />
        {labels ? (
          <span className="absolute bottom-2 start-2 sm:bottom-3 sm:start-3 rounded-md bg-[#111827] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[10px] font-extrabold tracking-[0.08em] text-white uppercase">
            After
          </span>
        ) : null}
      </div>
    </div>
  );
}

function pairsForCase(caseItem: ProductCaseCard): Pair[] {
  const pairs: Pair[] = [];
  const seen = new Set<string>();
  const push = (pair: Pair) => {
    const key = `${pair.before.img}|${pair.after.img}`;
    if (!pair.before.img || !pair.after.img || seen.has(key)) return;
    seen.add(key);
    pairs.push(pair);
  };

  if (caseItem.before?.img && caseItem.after?.img) {
    push({ id: `${caseItem.id}-main`, before: caseItem.before, after: caseItem.after });
  } else if (caseItem.img) {
    push({
      id: `${caseItem.id}-cover`,
      before: { img: caseItem.img, alt: caseItem.imgAlt },
      after: { img: caseItem.img, alt: caseItem.imgAlt },
    });
  }

  const extras = caseItem.gallery.filter((t) => t.id !== 'before' && t.id !== 'after' && t.img);
  for (let i = 0; i + 1 < extras.length; i += 2) {
    push({
      id: extras[i].id,
      before: { img: extras[i].img, alt: extras[i].alt },
      after: { img: extras[i + 1].img, alt: extras[i + 1].alt },
    });
  }

  return pairs.slice(0, 6);
}

export default function ProductCaseGallery({ caseItem }: Props) {
  const pairs = useMemo(() => pairsForCase(caseItem), [caseItem]);
  const [activeId, setActiveId] = useState(pairs[0]?.id ?? '');
  const active = pairs.find((p) => p.id === activeId) ?? pairs[0];

  if (!active) {
    return <div className="aspect-[16/10] rounded-[10px] bg-[#EEF1F5]" />;
  }

  return (
    <div className="min-w-0 w-full">
      <div className="aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-[10px]">
        <SplitFrame before={active.before} after={active.after} labels />
      </div>

      <div className="mt-3 [display:grid] grid-cols-3 gap-2 sm:flex sm:gap-2.5">
        {pairs.map((pair, i) => {
          const selected = pair.id === active.id;
          return (
            <button
              key={pair.id}
              type="button"
              onClick={() => setActiveId(pair.id)}
              aria-pressed={selected}
              aria-label={`Image ${String(i + 1).padStart(2, '0')}`}
              className={`relative min-w-0 sm:flex-1 overflow-hidden rounded-[8px] p-0 appearance-none cursor-pointer bg-transparent ${
                selected
                  ? 'ring-2 ring-[#0050D8] ring-inset'
                  : 'ring-1 ring-[#E6EAF0] ring-inset'
              }`}
            >
              <span className="block h-[56px] sm:h-[72px] lg:h-[78px] w-full">
                <SplitFrame before={pair.before} after={pair.after} />
              </span>
              <span className="absolute top-1 start-1 sm:top-1.5 sm:start-1.5 z-[2] inline-flex h-4 min-w-[18px] sm:h-[18px] sm:min-w-[22px] items-center justify-center rounded-[3px] bg-white px-0.5 sm:px-1 text-[9px] sm:text-[10px] font-bold text-[#111827]">
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
