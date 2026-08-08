import type { ReactNode } from 'react';
import {
  DEMO_APPLICATIONS,
  DEMO_PRODUCTS,
  REQUEST_DEMO_FORM,
  type DemoApplicationId,
  type DemoProductId,
} from '@/content/request-demo';
import { cn } from '@/lib/cn';
import {
  CheckIcon,
  ClipboardIcon,
  HeadsetIcon,
} from './DemoIcons';

function SummaryBlock({
  title,
  editLabel,
  onEdit,
  last,
  children,
}: {
  title: string;
  editLabel: string;
  onEdit: () => void;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mb-[0.9rem] border-b border-[#EEF1F5] pb-[0.9rem]',
        last && 'mb-0 border-b-0 pb-0',
      )}
    >
      <div className="mb-[0.55rem] flex items-center justify-between gap-2">
        <h3 className="m-0 text-[13px] font-bold text-[#0A1020]">{title}</h3>
        <button
          type="button"
          className="cursor-pointer border-0 bg-transparent p-0 text-xs font-bold text-[#0050D8] hover:underline"
          onClick={onEdit}
        >
          {editLabel}
        </button>
      </div>
      <div className="flex flex-col gap-1.5">{children}</div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-xs">
      <span className="shrink-0 font-medium text-[#9CA3AF]">{label}</span>
      <span className="text-end font-semibold text-[#0A1020]">{value}</span>
    </div>
  );
}

function SummaryList({
  items,
  empty,
}: {
  items: { id: string; label: string }[];
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="m-0 text-xs text-[#9CA3AF]">{empty}</p>;
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-[0.45rem] text-xs font-semibold text-[#0A1020]"
        >
          <span
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#16A34A] text-white"
            aria-hidden
          >
            <CheckIcon className="h-3 w-3" />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function RequestDemoSummary({
  name,
  roleLabel,
  clinicName,
  locationLabel,
  languageLabel,
  productIds,
  applicationIds,
  demoTypeLabel,
  dateLabel,
  time,
  timezoneLabel,
  onEditContact,
  onEditPractice,
  onEditSchedule,
}: {
  name: string;
  roleLabel: string;
  clinicName: string;
  locationLabel: string;
  languageLabel: string;
  productIds: DemoProductId[];
  applicationIds: DemoApplicationId[];
  demoTypeLabel: string;
  dateLabel: string;
  time: string;
  timezoneLabel: string;
  onEditContact: () => void;
  onEditPractice: () => void;
  onEditSchedule: () => void;
}) {
  const copy = REQUEST_DEMO_FORM;
  const selectedProducts = DEMO_PRODUCTS.filter((p) =>
    productIds.includes(p.id),
  ).map((p) => ({ id: p.id, label: p.title }));
  const selectedApplications = DEMO_APPLICATIONS.filter((a) =>
    applicationIds.includes(a.id),
  ).map((a) => ({ id: a.id, label: a.label }));

  return (
    <aside className="flex flex-col gap-[0.85rem] max-lg:order-first lg:sticky lg:top-[5.5rem]">
      <div className="rounded-[14px] border border-[#E5E7EB] bg-white p-4 shadow-[0_8px_24px_rgba(10,16,32,0.04)]">
        <header className="mb-4 flex items-center gap-2">
          <ClipboardIcon className="h-5 w-5 text-[#0050D8]" />
          <h2 className="m-0 text-base font-bold text-[#0A1020]">
            {copy.summary.title}
          </h2>
        </header>

        <SummaryBlock
          title={copy.summary.yourInfo}
          onEdit={onEditContact}
          editLabel={copy.summary.editLabel}
        >
          <SummaryRow label={copy.summary.fields.name} value={name} />
          <SummaryRow label={copy.summary.fields.role} value={roleLabel} />
          <SummaryRow label={copy.summary.fields.clinic} value={clinicName} />
          <SummaryRow
            label={copy.summary.fields.location}
            value={locationLabel}
          />
          <SummaryRow
            label={copy.summary.fields.language}
            value={languageLabel}
          />
        </SummaryBlock>

        <SummaryBlock
          title={copy.summary.products}
          onEdit={onEditPractice}
          editLabel={copy.summary.editLabel}
        >
          <SummaryList items={selectedProducts} empty={copy.summary.empty} />
        </SummaryBlock>

        <SummaryBlock
          title={copy.summary.applications}
          onEdit={onEditPractice}
          editLabel={copy.summary.editLabel}
        >
          <SummaryList
            items={selectedApplications}
            empty={copy.summary.empty}
          />
        </SummaryBlock>

        <SummaryBlock
          title={copy.summary.details}
          onEdit={onEditSchedule}
          editLabel={copy.summary.editLabel}
          last
        >
          <SummaryRow
            label={copy.summary.fields.demoType}
            value={demoTypeLabel}
          />
          <SummaryRow label={copy.summary.fields.date} value={dateLabel} />
          <SummaryRow label={copy.summary.fields.time} value={time} />
          <SummaryRow
            label={copy.summary.fields.timezone}
            value={timezoneLabel}
          />
        </SummaryBlock>
      </div>

      <div className="flex items-start gap-[0.8rem] rounded-[14px] border border-[#DBE4F5] bg-[#F5F8FF] p-4">
        <span
          className="inline-flex h-[2.35rem] w-[2.35rem] shrink-0 items-center justify-center rounded-[10px] bg-[rgba(0,80,216,0.1)] text-[#0050D8]"
          aria-hidden
        >
          <HeadsetIcon className="h-5 w-5" />
        </span>
        <div>
          <p className="m-0 text-sm font-bold text-[#0A1020]">
            {copy.help.title}
          </p>
          <p className="mb-[0.35rem] mt-[0.15rem] text-xs font-medium text-[#6B7280]">
            {copy.help.body}
          </p>
          <a
            href={copy.help.mailto}
            className="text-[13px] font-bold text-[#0050D8] no-underline hover:underline"
          >
            {copy.help.email}
          </a>
        </div>
      </div>
    </aside>
  );
}
