import { REQUEST_DEMO_TRUST } from '@/content/request-demo';
import { TRUST_ICONS } from './DemoIcons';
import { shellClass } from './formStyles';

export function RequestDemoTrust() {
  return (
    <section className="mt-8 pb-2" aria-label="ODYX trust signals">
      <div className={shellClass}>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 gap-x-5 rounded-[14px] border border-[#E5E7EB] bg-white p-[1.15rem_1.1rem] sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          {REQUEST_DEMO_TRUST.map((item) => {
            const Icon = TRUST_ICONS[item.icon];
            return (
              <li key={item.id} className="flex items-start gap-3">
                <span
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[rgba(0,80,216,0.08)] text-[#0050D8]"
                  aria-hidden
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="m-0 text-xl font-extrabold leading-tight text-[#0A1020]">
                    {item.value}
                  </p>
                  <p className="mt-0.5 text-[13px] font-bold text-[#0A1020]">
                    {item.label}
                  </p>
                  <p className="mt-px text-xs font-medium text-[#6B7280]">
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
