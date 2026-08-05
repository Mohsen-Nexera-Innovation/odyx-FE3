import React from 'react';
import { ShieldCheck, Lightbulb, GraduationCap, Handshake } from 'lucide-react';
import { ValuesData } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  shield: ShieldCheck,
  bulb: Lightbulb,
  cap: GraduationCap,
  handshake: Handshake,
};

const COLOR_MAP: Record<string, { text: string; glow: string }> = {
  shield: { text: 'text-[#1D4ED8]', glow: 'bg-[#3B82F6]' },
  bulb: { text: 'text-[#7C3AED]', glow: 'bg-[#8B5CF6]' },
  cap: { text: 'text-[#0D9488]', glow: 'bg-[#14B8A6]' },
  handshake: { text: 'text-[#C026D3]', glow: 'bg-[#D946EF]' },
};

export function ValuesSection({ data }: { data: ValuesData }) {
  return (
    <section className="w-full px-[clamp(20px,4vw,56px)]">
      <div className="w-full bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/50">
        
        {/* Header */}
        <div className="mb-8">
          <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-3">
            {data.kicker}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0A1020] leading-[1.2] tracking-tight">
            {data.title.split('Us.').map((part, i, arr) => 
              i < arr.length - 1 ? (
                <React.Fragment key={i}>
                  {part}
                  <span className="text-[#0050D8]">Us.</span>
                </React.Fragment>
              ) : part
            )}
          </h2>
          {data.subtitle && (
            <p className="text-[#0A1020] text-[15px] lg:text-[16px] max-w-2xl mt-4 leading-relaxed font-medium">
              {data.subtitle}
            </p>
          )}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.values.map((value, i) => {
            const Icon = ICON_MAP[value.icon] || ShieldCheck;
            const colors = COLOR_MAP[value.icon] || COLOR_MAP.shield;
            
            return (
              <div 
                key={i} 
                className="bg-white rounded-[24px] p-6 sm:p-8 flex flex-row items-start gap-5 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100/50"
              >
                {/* Glowing Icon Container */}
                <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center mt-1">
                  {/* Soft Background Glow (Shadow) */}
                  <div className={`absolute inset-0 rounded-full blur-lg opacity-[0.2] ${colors.glow}`} />
                  {/* Light Tint Circle */}
                  <div className={`absolute inset-0 rounded-full opacity-[0.08] ${colors.glow}`} />
                  
                  {/* Icon */}
                  <Icon 
                    className={`relative z-10 w-9 h-9 ${colors.text}`} 
                    fill="currentColor"
                    strokeWidth={1}
                  />
                </div>

                {/* Text Content */}
                <div className="flex flex-col pt-1">
                  <h3 className="text-[13px] lg:text-[14px] font-extrabold text-[#0A1020] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[12px] lg:text-[13px] text-[#0A1020] font-medium leading-[1.6] max-w-[180px]">
                    {value.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
