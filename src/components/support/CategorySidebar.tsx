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
    <nav aria-label={title} className="w-full rounded-[12px] border border-gray-100/60 bg-[#F9FAFB] p-4 shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                aria-current={active ? 'true' : undefined}
                className={`relative flex w-full items-center justify-between gap-2 px-4 py-2.5 text-start text-[13.5px] transition-colors rounded-[8px] ${
                  active 
                    ? 'bg-[#F4F8FD] font-bold text-[#0050D8]' 
                    : 'bg-transparent font-medium text-[#4B5563] hover:text-[#0050D8] hover:bg-black/5'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-[18px] w-[3px] -translate-y-1/2 rounded-full bg-[#0050D8]" />
                )}
                <span>{item.label}</span>
                {typeof item.count === 'number' && (
                  <span
                    className={`text-[11px] font-bold ${active ? 'text-[#0050D8]' : 'text-[#9CA3AF]'}`}
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
