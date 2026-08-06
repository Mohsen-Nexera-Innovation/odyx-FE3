import { CONTACT_SALES_DIRECT } from '@/content/contact-sales';
import { ContactChannelCard } from './ContactChannelCard';

export function DirectContactSection() {
  const { title, channels } = CONTACT_SALES_DIRECT;

  return (
    <section
      className="w-full px-[clamp(20px,4vw,56px)] pt-5"
      aria-labelledby="direct-contact-title"
    >
      <h2
        id="direct-contact-title"
        className="text-[20px] lg:text-[22px] font-bold text-[#0A1020] mb-6 flex items-center gap-2"
      >
        <span className="text-[#25D366] font-extrabold">C</span>
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {channels.map((channel) => (
          <ContactChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </section>
  );
}
