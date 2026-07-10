'use client';
// Reproduces the Sample site's scroll animations (reveal / build / ecosystem / count-up / image
// loaders / top progress bar) as a single client effect. Class-based, native scroll (no Lenis).
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const MOTION_SEL = '.m-up,.m-left,.m-right,.m-scale,.m-rot,.m-stagger,.m-fan,.m-words';
const BUILD_STAGGER_HOME = 220;
const BUILD_STAGGER_DEFAULT = 160;

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh * 0.94 && rect.bottom > vh * 0.06;
}

function buildStaggerMs(el: Element) {
  return el.closest('#top') ? BUILD_STAGGER_HOME : BUILD_STAGGER_DEFAULT;
}

function updateParallax() {
  const top = document.getElementById('top');
  if (!top) return;
  const vh = window.innerHeight || document.documentElement.clientHeight;
  top.querySelectorAll<HTMLElement>('.parallax').forEach((el) => {
    const rect = el.getBoundingClientRect();
    // Skip far-offscreen nodes
    if (rect.bottom < -80 || rect.top > vh + 80) {
      el.style.setProperty('--par', '0px');
      return;
    }
    const mid = rect.top + rect.height / 2;
    const progress = (mid - vh / 2) / vh;
    const offset = Math.max(-24, Math.min(24, progress * -28));
    el.style.setProperty('--par', `${offset.toFixed(1)}px`);
  });
}

function flushVisibleOnLoad(
  revealIo: IntersectionObserver,
  buildIo: IntersectionObserver,
  visIo: IntersectionObserver,
  countIo: IntersectionObserver,
  secIo: IntersectionObserver,
) {
  document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((el) => {
    if (!isInViewport(el)) return;
    el.classList.add('in');
    revealIo.unobserve(el);
  });

  document.querySelectorAll<HTMLElement>('.build-group').forEach((group) => {
    if (!isInViewport(group)) return;
    const stagger = buildStaggerMs(group);
    group.querySelectorAll('.build').forEach((item, i) => {
      setTimeout(() => item.classList.add('built'), i * stagger);
    });
    buildIo.unobserve(group);
  });

  document.querySelectorAll<HTMLElement>('.build:not(.built)').forEach((el) => {
    if (el.closest('.build-group') || !isInViewport(el)) return;
    el.classList.add('built');
    buildIo.unobserve(el);
  });

  document.querySelectorAll<HTMLElement>(
    `.why-row:not(.vis), .news-lead:not(.vis), .news-item:not(.vis), .shop-card:not(.vis), ${MOTION_SEL}:not(.vis)`,
  ).forEach((el) => {
    if (!isInViewport(el)) return;
    el.classList.add('vis');
    visIo.unobserve(el);
  });

  document.querySelectorAll<HTMLElement>('#top > .sec.sec-motion:not(.sec-in)').forEach((el) => {
    if (!isInViewport(el)) return;
    el.classList.add('sec-in');
    secIo.unobserve(el);
  });

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    if (!isInViewport(el) || el.dataset.countDone === '1') return;
    const end = +el.dataset.count!;
    const steps = 34;
    const inc = end / steps;
    let c = 0;
    el.dataset.countDone = '1';
    const iv = setInterval(() => {
      c += inc;
      if (c >= end) {
        c = end;
        clearInterval(iv);
      }
      el.textContent = String(Math.floor(c));
    }, 32);
    countIo.unobserve(el);
  });
}

export default function OdyxMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hero = document.getElementById('hero');

    let prog = document.getElementById('progress') as HTMLDivElement | null;
    if (!prog) {
      prog = document.createElement('div');
      prog.id = 'progress';
      document.body.appendChild(prog);
    }
    const onScroll = () => {
      const h = document.documentElement;
      prog!.style.width = `${(h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) || 0}%`;
      if (hero) {
        const vh = window.innerHeight || h.clientHeight;
        // Snappier handoff into Why — reaches full curtain sooner
        const exit = Math.min(1, Math.max(0, h.scrollTop / (vh * 0.55)));
        hero.style.setProperty('--hero-exit', String(exit));
      }
      if (!reduce) updateParallax();
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelectorAll<HTMLImageElement>('img[data-src],img[data-fsrc],img[data-isrc]').forEach((img) => {
      const src = img.dataset.src || img.dataset.fsrc || img.dataset.isrc;
      if (!src) return;
      const probe = new Image();
      probe.onload = () => {
        img.src = src;
        img.classList.add('loaded');
      };
      probe.src = src;
    });

    if (reduce) {
      document.querySelectorAll('.reveal,.build,.why-row,.news-lead,.news-item,.shop-card').forEach((e) =>
        e.classList.add('in', 'built', 'vis'),
      );
      document.querySelectorAll(MOTION_SEL).forEach((e) => e.classList.add('vis'));
      document.querySelectorAll('#top > .sec.sec-motion').forEach((e) => e.classList.add('sec-in'));
      document.querySelectorAll('[data-count]').forEach((e) => {
        e.textContent = (e as HTMLElement).dataset.count || '0';
      });
      document.querySelector('.eco')?.classList.add('run');
      return () => removeEventListener('scroll', onScroll);
    }

    const observers: IntersectionObserver[] = [];

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 3) * 0.07}s`;
      io.observe(el);
    });
    observers.push(io);

    const vio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          vio.unobserve(e.target);
        }
      }),
      { threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
    );
    document.querySelectorAll(`.why-row,.news-lead,.news-item,.shop-card,${MOTION_SEL}`).forEach((el) => vio.observe(el));
    observers.push(vio);

    const secIo = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('sec-in');
          secIo.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -2% 0px' },
    );
    document.querySelectorAll('#top > .sec.sec-motion').forEach((el) => secIo.observe(el));
    observers.push(secIo);

    const bio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const g = e.target as HTMLElement;
        if (g.classList.contains('build-group')) {
          const stagger = buildStaggerMs(g);
          g.querySelectorAll('.build').forEach((it, i) => setTimeout(() => it.classList.add('built'), i * stagger));
        } else {
          g.classList.add('built');
        }
        bio.unobserve(g);
      }),
      { threshold: 0.15 },
    );
    document.querySelectorAll('.build-group').forEach((g) => bio.observe(g));
    document.querySelectorAll('.build').forEach((b) => {
      if (!b.closest('.build-group')) bio.observe(b);
    });
    observers.push(bio);

    const eco = document.querySelector('.eco');
    if (eco) {
      const nodes = [...eco.querySelectorAll('.eco-node')];
      const eio = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (!e.isIntersecting) return;
          eco.classList.add('run');
          let i = 0;
          setTimeout(function seq() {
            nodes.forEach((n) => n.classList.remove('active'));
            if (nodes[i]) nodes[i].classList.add('active');
            i = (i + 1) % (nodes.length + 1);
            setTimeout(seq, 1000);
          }, 700);
          eio.unobserve(eco);
        }),
        { threshold: 0.35 },
      );
      eio.observe(eco);
      observers.push(eio);
    }

    const cio = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        if (el.dataset.countDone === '1') return;
        const end = +el.dataset.count!;
        const steps = 34;
        const inc = end / steps;
        let c = 0;
        el.dataset.countDone = '1';
        const iv = setInterval(() => {
          c += inc;
          if (c >= end) {
            c = end;
            clearInterval(iv);
          }
          el.textContent = String(Math.floor(c));
        }, 32);
        cio.unobserve(el);
      }),
      { threshold: 0.35 },
    );
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));
    observers.push(cio);

    const flush = () => flushVisibleOnLoad(io, bio, vio, cio, secIo);
    requestAnimationFrame(() => requestAnimationFrame(flush));

    return () => {
      removeEventListener('scroll', onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [pathname]);

  return null;
}
