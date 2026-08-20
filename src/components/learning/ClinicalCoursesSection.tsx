import React from 'react';
import Link from 'next/link';
import { ArrowIcon, ProgressRing, BTN_OUTLINE_SM, BTN_PRIMARY, BTN_LINK } from './LearningShared';
import {
  CertificateIcon,
  ClockIcon,
  LessonsIcon,
  LockIcon,
  PlayIcon,
} from './LearningIcons';
import {
  LEARNING_CARD,
  LEARNING_CARD_PAD,
  LEARNING_GUTTER,
  LEARNING_H2,
  LEARNING_KICKER,
} from './learningChrome';
import type { ClinicalCoursesData } from '@/content/learning';

function levelTone(level: string) {
  if (level === 'Advanced') {
    return 'bg-[#F3E8FF] text-[#7C3AED]';
  }
  if (level === 'Intermediate') {
    return 'bg-[#FFF1E6] text-[#EA580C]';
  }
  return 'bg-[#EEF4FF] text-[#0050D8]';
}

export function ClinicalCoursesSection({ data }: { data: ClinicalCoursesData }) {
  return (
    <section id={data.id} className={LEARNING_GUTTER}>
      <div className={`w-full ${LEARNING_CARD} ${LEARNING_CARD_PAD}`}>
        <div className="mb-8">
          <p className={`${LEARNING_KICKER} mb-3`}>
            {data.kicker}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className={`${LEARNING_H2} m-0`}>
              {data.title}
            </h2>
            <Link
              href={data.viewAll.href}
              className={`${BTN_OUTLINE_SM} self-start sm:self-auto`}
            >
              {data.viewAll.label}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          {data.courses.map((course) => (
            <article
              key={course.id}
              className="relative flex flex-col rounded-[14px] bg-white border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <span className="absolute top-3 end-3 z-10 w-8 h-8 rounded-full bg-white/95 text-[#667085] border border-gray-100 flex items-center justify-center shadow-sm">
                <LockIcon className="w-3.5 h-3.5" />
              </span>

              <div className="relative aspect-[16/11] bg-gradient-to-b from-[#F4F7FB] to-[#E8EEF6] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.img}
                  alt={course.imgAlt}
                  className="w-full h-full object-cover"
                />
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center">
                    <PlayIcon className="w-3.5 h-3.5" />
                  </span>
                </span>
              </div>

              <div className="px-4 py-4 flex flex-col flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <ProgressRing percent={course.percent} size={48} stroke={4} className="shrink-0" />
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-[15px] font-extrabold text-[#0A1020] leading-snug mb-1.5">
                      {course.title}
                    </h3>
                    <p className="flex flex-col gap-1 text-[12px] text-[#667085] font-medium m-0">
                      <span className="inline-flex items-center gap-1.5">
                        <LessonsIcon className="w-3.5 h-3.5 text-[#98A2B3]" />
                        {course.lessons}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ClockIcon className="w-3.5 h-3.5 text-[#98A2B3]" />
                        {course.duration}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center rounded-full text-[11px] font-bold px-2.5 py-1 ${levelTone(course.level)}`}
                  >
                    {course.level}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#667085]">
                    <CertificateIcon className="w-3.5 h-3.5 text-[#0050D8]" />
                    {course.certificate}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[12px] border border-[#E4ECF7] bg-[#F7F9FC] px-4 py-4">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-[#667085] m-0">
            <LockIcon className="w-4 h-4 text-[#98A2B3] shrink-0" />
            {data.gate.message}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href={data.gate.signIn.href} className={BTN_LINK}>
              {data.gate.signIn.label}
            </Link>
            <Link href={data.gate.register.href} className={BTN_PRIMARY}>
              {data.gate.register.label}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
