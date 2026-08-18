import { REQUEST_DEMO_TRUST } from '@/content/request-demo';
import { TRUST_ICONS } from './DemoIcons';
import { cardClass, shellClass } from './formStyles';

export function RequestDemoTrust() {
  return (
    <section className={shellClass} aria-label="ODYX trust signals">
      <ul
        className={`${cardClass} m-0 grid list-none grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:gap-6`}
      >
        {REQUEST_DEMO_TRUST.map((item) => {
          const Icon = TRUST_ICONS[item.icon];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <span
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#F4F8FD] text-[#0050D8]"
                aria-hidden
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="m-0 text-xl font-extrabold leading-tight text-[#0A1020]">
                  {item.value}
                </p>
                <p className="mt-0.5 text-[13px] font-bold text-[#0A1020]">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs font-medium leading-snug text-[#6B7280]">
                  {item.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
