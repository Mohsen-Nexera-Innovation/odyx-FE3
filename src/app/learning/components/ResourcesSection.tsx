'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowIcon, BTN_LINK } from './LearningShared';
import { DownloadIcon, PlayIcon } from './LearningIcons';
import type { ResourcesSectionData } from '../types';

export function ResourcesSection({ data }: { data: ResourcesSectionData }) {
  const [videoFilter, setVideoFilter] = useState('All');
  const [articleFilter, setArticleFilter] = useState('All');

  const videos =
    videoFilter === 'All'
      ? data.videos.items
      : data.videos.items.filter((v) => v.category === videoFilter);

  const articles =
    articleFilter === 'All'
      ? data.articles.items
      : data.articles.items.filter((a) => a.category === articleFilter);

  return (
    <section id={data.id} className="w-full px-[clamp(20px,4vw,56px)]">
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4">
        <div
          id="videos"
          className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/50"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] m-0">
              {data.videos.kicker}
            </p>
            <Link
              href={data.videos.viewAll.href}
              className={BTN_LINK}
            >
              {data.videos.viewAll.label}
              <ArrowIcon />
            </Link>
          </div>
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#0A1020] mb-4">
            {data.videos.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Video categories">
            {data.videos.filters.map((filter) => {
              const active = videoFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setVideoFilter(filter)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                    active
                      ? 'bg-[#0050D8] text-white'
                      : 'bg-[#F1F5F9] text-[#667085] hover:bg-[#E8EEF6]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {videos.map((video) => (
              <Link
                key={video.id}
                href={video.href}
                className="group block rounded-[12px] overflow-hidden border border-gray-100/50 no-underline"
              >
                <div className="relative aspect-[16/10] bg-[#E8EEF6]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.img}
                    alt={video.imgAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-8 h-8 rounded-full bg-black/45 text-white flex items-center justify-center">
                      <PlayIcon className="w-3 h-3" />
                    </span>
                  </span>
                  <span className="absolute bottom-1.5 end-1.5 rounded bg-black/65 text-white text-[10px] font-semibold px-1.5 py-0.5">
                    {video.duration}
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <strong className="block text-[13px] font-bold text-[#0A1020] leading-snug">
                    {video.title}
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          id="articles"
          className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/50"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] m-0">
              {data.articles.kicker}
            </p>
            <Link
              href={data.articles.viewAll.href}
              className={BTN_LINK}
            >
              {data.articles.viewAll.label}
              <ArrowIcon />
            </Link>
          </div>
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#0A1020] mb-4">
            {data.articles.title}
          </h2>

          <div className="flex flex-wrap gap-1.5 mb-4" role="tablist" aria-label="Article categories">
            {data.articles.filters.map((filter) => {
              const active = articleFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setArticleFilter(filter)}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                    active
                      ? 'bg-[#0050D8] text-white'
                      : 'bg-[#F1F5F9] text-[#667085] hover:bg-[#E8EEF6]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <ul className="flex flex-col gap-3 m-0 p-0 list-none">
            {articles.map((article) => (
              <li key={article.id}>
                <Link
                  href={article.href}
                  className="flex items-center gap-3 rounded-[12px] border border-gray-100/50 p-2 hover:bg-[#F8FAFD] transition-colors no-underline"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.img}
                    alt={article.imgAlt}
                    className="w-14 h-14 rounded-[10px] object-cover shrink-0"
                  />
                  <span className="min-w-0">
                    <strong className="block text-[13px] font-bold text-[#0A1020] leading-snug mb-1">
                      {article.title}
                    </strong>
                    <span className="block text-[11px] text-[#667085] font-medium">
                      {article.readTime}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-[16px] overflow-hidden shadow-[0_4px_40px_rgba(0,0,0,0.03)] py-6 lg:py-8 px-4 lg:px-6 border border-gray-100/50">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[#0050D8] text-[11px] font-bold uppercase tracking-[0.15em] m-0">
              {data.guides.kicker}
            </p>
            <Link
              href={data.guides.viewAll.href}
              className={BTN_LINK}
            >
              {data.guides.viewAll.label}
              <ArrowIcon />
            </Link>
          </div>
          <h2 className="text-[20px] lg:text-[24px] font-extrabold text-[#0A1020] mb-4">
            {data.guides.title}
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {data.guides.items.map((guide) => (
              <Link
                key={guide.id}
                href={guide.href}
                className="group relative flex flex-col justify-between min-h-[150px] rounded-[16px] p-4 text-white no-underline overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${guide.accent} 0%, #0A1020 140%)` }}
              >
                <div>
                  <strong className="block text-[14px] font-extrabold leading-snug mb-1">
                    {guide.title}
                  </strong>
                  <span className="block text-[11px] text-white/80 font-medium leading-snug">
                    {guide.subtitle}
                  </span>
                </div>
                <span className="self-end w-8 h-8 rounded-full bg-white/15 group-hover:bg-white/25 flex items-center justify-center transition-colors">
                  <DownloadIcon className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
