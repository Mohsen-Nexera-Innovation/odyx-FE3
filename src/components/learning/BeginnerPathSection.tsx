import React from 'react';
import Link from 'next/link';
import { ArrowIcon, BTN_OUTLINE_SM, BTN_LINK } from './LearningShared';
import { ClockIcon } from './LearningIcons';
import {
  LEARNING_CARD,
  LEARNING_CARD_PAD,
  LEARNING_GUTTER,
  LEARNING_H2,
  LEARNING_KICKER,
} from './learningChrome';
import type { BeginnerPathData } from '@/content/learning';

export function BeginnerPathSection({ data }: { data: BeginnerPathData }) {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {data.lessons.map((lesson) => (
            <article
              key={lesson.id}
              className="group flex h-full flex-col rounded-[16px] bg-white border border-gray-100/50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden"
            >
              <div
                className="relative h-[168px] sm:h-[180px] lg:h-[190px] shrink-0 overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 50% 55%, ${lesson.accent} 0%, #FFFFFF 72%)`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lesson.img}
                  alt={lesson.imgAlt}
                  className="absolute inset-0 m-auto max-h-[78%] max-w-[78%] w-auto h-auto object-contain drop-shadow-[0_10px_20px_rgba(15,23,42,0.12)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-col flex-1 px-5 py-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#0A1020]">
                    <ClockIcon className="w-3.5 h-3.5 text-[#0050D8]" />
                    {lesson.duration}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#EEF4FF] text-[#0050D8] text-[11px] font-bold px-2.5 py-1">
                    {lesson.level}
                  </span>
                </div>

                <h3 className="text-[14px] lg:text-[15px] font-extrabold text-[#0A1020] leading-snug mb-2">
                  {lesson.title}
                </h3>
                <p className="text-[12px] lg:text-[13px] text-[#0A1020] font-medium leading-relaxed mb-4 flex-1">
                  {lesson.body}
                </p>

                <Link href={lesson.href} className={`${BTN_LINK} group/cta mt-auto`}>
                  Watch Lesson
                  <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5">
                    <ArrowIcon />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
