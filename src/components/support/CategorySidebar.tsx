'use client';

export interface CategorySidebarItem {
  id: string;
  label: string;
  count?: number;
}

export function CategorySidebar({
  title,
  items,
  activeId,
  onSelect,
}: {
  title: string;
  items: CategorySidebarItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label={title} className="rounded-[12px] border border-[#E5E7EB] bg-white p-3">
      <p className="px-2 pb-2 pt-1 text-[12px] font-bold uppercase tracking-wide text-[#9CA3AF]">{title}</p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={active ? 'true' : undefined}
                className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                  active ? 'bg-[#0050D8] text-white' : 'text-[#374151] hover:bg-[#F3F7FF] hover:text-[#0050D8]'
                }`}
              >
                <span>{item.label}</span>
                {typeof item.count === 'number' && (
                  <span
                    className={`text-[11px] font-bold ${active ? 'text-white/80' : 'text-[#9CA3AF]'}`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategorySidebar;
