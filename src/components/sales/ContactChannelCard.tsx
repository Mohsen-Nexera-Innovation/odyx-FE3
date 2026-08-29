import Link from 'next/link';
import type { ContactChannel } from '@/content/contact-sales';
import { ArrowIcon, ChannelIconBadge } from './SalesIcons';

export function ContactChannelCard({ channel }: { channel: ContactChannel }) {
  return (
    <article className="flex h-full rounded-[12px] bg-white p-6 shadow-[0_0_12px_rgba(0,0,0,0.06)]">
      <div className="flex gap-5 w-full">
        <div className="shrink-0">
          <ChannelIconBadge id={channel.id} />
        </div>
        
        <div className="flex flex-col flex-1 gap-4">
          <h3 className="text-[18px] font-bold text-[#0A1020]">{channel.title}</h3>
          
          <p className="text-[15px] leading-relaxed text-[#6B7280] font-medium whitespace-pre-line">
            {channel.description}
          </p>

          <div className="mt-1">
            <Link
              href={channel.cta.href}
              className="inline-flex items-center justify-center gap-2 border-[1.5px] border-[#DCE6F7] !text-[#0050D8] bg-transparent hover:bg-[#0050D8] hover:!text-white hover:border-[#0050D8] hover:shadow-[0_4px_14px_rgba(0,80,216,0.35)] font-bold text-[13px] lg:text-[14px] px-6 py-2.5 rounded-full transition-all min-w-[150px] group"
              {...(channel.cta.href.startsWith('http')
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {channel.cta.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-colors"><path d="m5 12 14 0"/><path d="m13 5 7 7-7 7"/></svg>
            </Link>
          </div>

          {channel.emailDisplay && (
            <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280]">
              <span className="text-[#9CA3AF]">@</span>
              <span>{channel.emailDisplay}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
