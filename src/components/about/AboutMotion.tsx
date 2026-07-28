'use client';

import { useEffect } from 'react';

/**
 * About-page motion: chapter progress, hero float drift, filmstrip drag hint,
 * and sticky-value active states. Respects prefers-reduced-motion.
 */
export default function AboutMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.about-page');
    if (!root) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chapters = Array.from(
      root.querySelectorAll<HTMLElement>('[data-about-chapter]'),
    );
    const dots = Array.from(
      root.querySelectorAll<HTMLButtonElement>('.about-nav__dot'),
    );

    const setActive = (id: string) => {
      dots.forEach((dot) => {
        const on = dot.dataset.chapter === id;
        dot.classList.toggle('is-active', on);
        dot.setAttribute('aria-current', on ? 'true' : 'false');
      });
    };

    const chapterIo = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) {
          const id = visible.target.dataset.aboutChapter;
          if (id) setActive(id);
        }
      },
      { threshold: [0.25, 0.45, 0.6], rootMargin: '-12% 0px -35% 0px' },
    );
    chapters.forEach((el) => chapterIo.observe(el));

    const onDotClick = (e: Event) => {
      const btn = e.currentTarget as HTMLButtonElement;
      const id = btn.dataset.chapter;
      if (!id) return;
      const target = root.querySelector(`#${CSS.escape(id)}`);
      target?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };
    dots.forEach((d) => d.addEventListener('click', onDotClick));

    /* Hero cluster: layered pointer parallax (cluster + depth items) */
    const hero = root.querySelector<HTMLElement>('.about-hero');
    const cluster = root.querySelector<HTMLElement>('.about-hero__cluster');
    const items = root.querySelectorAll<HTMLElement>('.about-hero__item');
    let raf = 0;
    const onPointer = (e: PointerEvent) => {
      if (reduce || !hero || !cluster) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cluster.style.translate = `${(x * 10).toFixed(1)}px ${(y * 7).toFixed(1)}px`;
        items.forEach((el, i) => {
          const depth = 4 + i * 5;
          el.style.translate = `${(x * depth).toFixed(1)}px ${(y * depth * 0.65).toFixed(1)}px`;
        });
      });
    };
    const onLeave = () => {
      if (!cluster) return;
      cluster.style.translate = '0 0';
      items.forEach((el) => {
        el.style.translate = '0 0';
      });
    };
    hero?.addEventListener('pointermove', onPointer);
    hero?.addEventListener('pointerleave', onLeave);

    /* Filmstrip: show scroll affordance when overflow exists */
    const strip = root.querySelector<HTMLElement>('.about-spine__rail');
    const stripViewport = root.querySelector<HTMLElement>('.about-spine__viewport');
    const updateStrip = () => {
      if (!strip || !stripViewport) return;
      const canScroll = strip.scrollWidth > strip.clientWidth + 8;
      stripViewport.classList.toggle('can-scroll', canScroll);
      const atEnd =
        strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 12;
      const atStart = strip.scrollLeft <= 12;
      stripViewport.classList.toggle('at-start', atStart);
      stripViewport.classList.toggle('at-end', atEnd);
    };
    strip?.addEventListener('scroll', updateStrip, { passive: true });
    window.addEventListener('resize', updateStrip);
    updateStrip();

    /* Value chapters enter */
    const valueIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          valueIo.unobserve(entry.target);
        });
      },
      { threshold: 0.28 },
    );
    root.querySelectorAll<HTMLElement>('.about-value-row').forEach((el) => {
      if (reduce) el.classList.add('is-in');
      else valueIo.observe(el);
    });

    /* Local parallax for vision panels (global OdyxMotion only scopes #top) */
    const onScrollParallax = () => {
      if (reduce) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      root.querySelectorAll<HTMLElement>('.about-vm__media .parallax').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) {
          el.style.translate = '0 0';
          return;
        }
        const mid = rect.top + rect.height / 2;
        const progress = (mid - vh / 2) / vh;
        const offset = Math.max(-18, Math.min(18, progress * -22));
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      });
    };
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    onScrollParallax();

    root.classList.add('about-page--ready');

    return () => {
      chapterIo.disconnect();
      valueIo.disconnect();
      dots.forEach((d) => d.removeEventListener('click', onDotClick));
      hero?.removeEventListener('pointermove', onPointer);
      hero?.removeEventListener('pointerleave', onLeave);
      strip?.removeEventListener('scroll', updateStrip);
      window.removeEventListener('resize', updateStrip);
      window.removeEventListener('scroll', onScrollParallax);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
