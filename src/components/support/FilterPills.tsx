'use client';

export interface FilterPillItem {
  id: string;
  label: string;
  count?: number;
}

export function FilterPills({
  items,
  activeId,
  onSelect,
}: {
  items: FilterPillItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-nowrap items-center gap-2 w-max max-w-none sm:flex-wrap sm:w-auto" role="tablist">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(item.id)}
            className={`cursor-pointer inline-flex h-[44px] items-center gap-1.5 rounded-[8px] border px-4 text-sm font-bold transition-colors ${
              active
                ? 'border-[#0050D8] bg-[#0050D8] text-white'
                : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#0050D8]/40 hover:text-[#0050D8]'
            }`}
          >
            {item.label}
            {typeof item.count === 'number' && (
              <span className={active ? 'text-white/80' : 'text-[#9CA3AF]'}>({item.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterPills;
