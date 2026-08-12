export function SupportCTA({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] px-5 py-6 sm:px-6">
      <div className="flex flex-col justify-center">
        <h3 className="text-[14px] font-bold text-[#0A1020]">{title}</h3>
        {description && <p className="mt-0.5 text-[13px] font-medium text-[#6B7280]">{description}</p>}
      </div>
    </div>
  );
}

export default SupportCTA;
