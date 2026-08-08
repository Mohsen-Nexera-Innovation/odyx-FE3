'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { ArrowIcon, ProgressRing, BTN_OUTLINE, BTN_PRIMARY, BTN_LINK } from './LearningShared';
import { PathIcon, PlayIcon, RoleIcon, ClockIcon } from './LearningIcons';
import type { FeaturedCourseData, LearningHeroData, LearningRoleId } from '../types';

type Props = {
  data: LearningHeroData;
  featured: FeaturedCourseData;
};

export function LearningHero({ data, featured }: Props) {
  const [role, setRole] = useState<LearningRoleId>('dentist');

  return (
    <section className="w-full px-[clamp(20px,4vw,56px)] pt-[65px] lg:pt-[85px]" data-hero-light>
      <div className="w-full bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100/50">
        <div className="flex flex-col xl:flex-row gap-8 lg:gap-10 py-7 lg:py-9 px-5 lg:px-8">
          <div className="w-full xl:w-[38%] flex flex-col justify-center">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] mb-4">
              {data.kicker}
            </p>

            <h1 className="text-[34px] lg:text-[42px] font-extrabold text-[#0A1020] leading-[1.15] tracking-tight mb-4">
              {data.titleLead}
              <br />
              <span className="text-[#0050D8]">{data.titleRest}</span>
            </h1>

            <p className="text-[#475467] text-[15px] leading-relaxed mb-6 max-w-[34rem] font-medium">
              {data.body}
            </p>

            <p className="text-[13px] font-bold text-[#0A1020] mb-2.5">Learn as:</p>
            <div className="flex flex-wrap gap-2 mb-7" role="group" aria-label="Learning role">
              {data.roles.map((item) => {
                const active = role === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-[13px] font-semibold transition-colors border ${
                      active
                        ? 'border-[#0050D8] bg-[#EEF4FF] text-[#0050D8]'
                        : 'border-[#E2E8F0] bg-white text-[#0A1020] hover:border-[#0050D8]/40 hover:bg-[#F5F8FF]'
                    }`}
                  >
                    <RoleIcon id={item.id} className="w-4 h-4 text-[#0050D8]" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {data.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={action.variant === 'primary' ? BTN_PRIMARY : BTN_OUTLINE}
                >
                  {action.label}
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full xl:w-[62%] flex flex-col gap-5 min-w-0">
            <div>
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-[16px] lg:text-[17px] font-extrabold text-[#0A1020] m-0">
                  {data.paths.kicker}
                </h2>
                <Link href={data.paths.viewAll.href} className={BTN_LINK}>
                  {data.paths.viewAll.label}
                  <ArrowIcon />
                </Link>
              </div>

              <div className="flex items-start">
                {data.paths.steps.map((step, i) => {
                  const isLast = i === data.paths.steps.length - 1;
                  return (
                    <React.Fragment key={step.id}>
                      <Link
                        href={step.href}
                        className="flex flex-col items-center text-center px-1.5 lg:px-2 no-underline flex-1 min-w-0"
                      >
                        <div className="mb-3 text-[#0050D8] w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#EEF4FF] border border-[#D6E6FF] flex items-center justify-center">
                          <PathIcon id={step.id} className="w-5 h-5 lg:w-6 lg:h-6" />
                        </div>
                        <strong className="block text-[12px] lg:text-[13px] font-extrabold text-[#0A1020] mb-0.5">
                          {step.title}
                        </strong>
                        <span className="block text-[11px] text-[#667085] font-medium mb-1">
                          {step.description}
                        </span>
                        <span className="block text-[11px] font-semibold text-[#0050D8]">
                          {step.meta}
                        </span>
                      </Link>
                      {!isLast ? (
                        <div className="flex items-start justify-center shrink-0 pt-4 text-[#B8C9E8]" aria-hidden>
                          →
                        </div>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[14px] border border-[#E4ECF7] bg-[#F8FAFD] p-4 lg:p-5">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-[15px] font-extrabold text-[#0A1020] m-0">{featured.kicker}</h3>
                  <span className="inline-flex items-center rounded-full bg-[#0050D8] text-white text-[10px] font-bold tracking-wide px-2.5 py-1">
                    {featured.badge}
                  </span>
                </div>
                <Link href={featured.viewAll.href} className={BTN_LINK}>
                  {featured.viewAll.label}
                  <ArrowIcon />
                </Link>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-stretch mb-4">
                <div className="relative w-full md:w-[200px] xl:w-[220px] shrink-0 rounded-[12px] overflow-hidden bg-[#E8EEF6] aspect-[16/10] md:aspect-auto md:min-h-[140px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.img}
                    alt={featured.imgAlt}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-11 h-11 rounded-full bg-black/45 text-white flex items-center justify-center">
                      <PlayIcon className="w-4 h-4" />
                    </span>
                  </span>
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <h4 className="text-[16px] lg:text-[18px] font-extrabold text-[#0A1020] leading-snug mb-1.5">
                    {featured.title}
                  </h4>
                  <p className="text-[13px] text-[#667085] font-medium leading-relaxed mb-3 line-clamp-2">
                    {featured.body}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto text-[12px] text-[#667085] font-medium">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0050D8]" strokeWidth={1.5} aria-hidden />
                      {featured.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClockIcon className="w-3.5 h-3.5 text-[#0050D8]" />
                      {featured.time}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.instructor.img}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover border border-white shadow-sm"
                      />
                      <span>
                        <strong className="block text-[#0A1020] text-[12px] font-bold leading-tight">
                          {featured.instructor.name}
                        </strong>
                        <span className="block text-[10px] text-[#98A2B3]">
                          {featured.instructor.role}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between pt-3 border-t border-[#E4ECF7]">
                <div className="flex flex-wrap items-center gap-2.5 min-w-0">
                  {featured.progress.map((item, i) => (
                    <React.Fragment key={item.title}>
                      <div className="flex items-center gap-2.5 rounded-[10px] border border-[#E4ECF7] bg-white px-2.5 py-2 min-w-[150px]">
                        <div className="min-w-0">
                          <strong className="block text-[12px] font-extrabold text-[#0A1020] leading-tight">
                            {item.title}
                          </strong>
                          <span className="block text-[10px] text-[#667085] font-medium">
                            {item.meta}
                          </span>
                        </div>
                        <ProgressRing percent={item.percent} size={40} stroke={3.5} />
                      </div>
                      {i < featured.progress.length - 1 ? (
                        <span className="text-[#B8C9E8] hidden sm:inline" aria-hidden>
                          →
                        </span>
                      ) : null}
                    </React.Fragment>
                  ))}
                </div>

                <Link
                  href={featured.register.href}
                  className={`${BTN_PRIMARY} text-[13px] shrink-0`}
                >
                  {featured.register.label}
                  <ArrowIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
