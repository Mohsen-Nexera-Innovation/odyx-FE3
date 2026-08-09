import React from 'react';
import { Building2, User, Package, Heart } from 'lucide-react';
import { WhyOdyxData } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  settings: Building2,
  user: User,
  book: Package,
  heart: Heart,
};

export function WhyOdyxSection({ data }: { data: WhyOdyxData }) {
  return (
    <section id="why" className="w-full px-[clamp(20px,4vw,56px)] scroll-mt-[96px]">
      <div className="w-full bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/50">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column (Text & Icons) */}
          <div className="w-full lg:w-[45%] flex flex-col justify-center">
            
            {/* Kicker */}
            <p className="text-[#0050D8] text-[12px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[44px] font-extrabold text-[#0A1020] leading-[1.15] tracking-tight mb-5">
              {data.title.split(', ').map((chunk, index, array) => (
                <React.Fragment key={index}>
                  {chunk.split('partner').map((part, i, arr) => 
                    i < arr.length - 1 ? (
                      <React.Fragment key={i}>
                        {part}
                        <span className="text-[#0050D8]">partner</span>
                      </React.Fragment>
                    ) : part
                  )}
                  {index < array.length - 1 && (
                    <>
                      ,
                      <br />
                    </>
                  )}
                </React.Fragment>
              ))}
            </h2>

            {/* Subtitle */}
            <p className="text-[#0A1020] text-[15px] lg:text-[16px] leading-relaxed max-w-[95%] mb-6 font-medium">
              We stand by clinicians with reliable solutions,
              <br className="hidden lg:block" />
              real support, and a commitment to help
              <br className="hidden lg:block" />
              them grow—today and for the future.
            </p>

            {/* Features Grid (4 in a row) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-4">
              {data.features.map((feature, i) => {
                const Icon = ICON_MAP[feature.icon] || Building2;
                return (
                  <div key={i} className="flex flex-col items-start">
                    <div className="text-[#0050D8] mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#F0F6FA]">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-[13px] lg:text-[14px] font-extrabold text-[#0A1020] leading-tight mb-2">
                      {feature.title.split(' ')[0]}
                      <br />
                      {feature.title.split(' ').slice(1).join(' ')}
                    </h3>
                    <p className="text-[12px] lg:text-[13px] text-[#0A1020] font-medium leading-relaxed pr-2">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Cards) */}
          <div className="w-full lg:w-[55%]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
              {data.cards.map((card, i) => (
                <div 
                  key={i} 
                  className="group relative h-[300px] lg:h-[360px] rounded-[16px] lg:rounded-[20px] overflow-hidden shadow-sm transition-transform hover:-translate-y-1 duration-300"
                >
                  {/* Background Image */}
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  
                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001233] via-[#001233]/60 to-transparent pointer-events-none" />
                  
                  {/* Text Content at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6 flex flex-col justify-end">
                    <h3 className="text-white text-[15px] lg:text-[16px] font-bold mb-1.5">
                      {card.title}
                    </h3>
                    <p className="text-white/80 text-[12px] lg:text-[13px] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
