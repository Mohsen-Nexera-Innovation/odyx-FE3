'use client';
// Reproduces the Sample site's scroll animations (reveal / build / ecosystem / count-up / image
// loaders / top progress bar) as a single client effect. Class-based, native scroll (no Lenis).
import { useEffect } from 'react';

export default function OdyxMotion() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    // top progress bar
    let prog = document.getElementById('progress') as HTMLDivElement | null;
    if (!prog) { prog = document.createElement('div'); prog.id = 'progress'; document.body.appendChild(prog); }
    const onScroll = () => {
      const h = document.documentElement;
      prog!.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100 || 0) + '%';
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // image loaders (data-src / data-fsrc / data-isrc -> src + .loaded)
    document.querySelectorAll<HTMLImageElement>('img[data-src],img[data-fsrc],img[data-isrc]').forEach((img) => {
      const src = img.dataset.src || img.dataset.fsrc || img.dataset.isrc;
      if (!src) return;
      const probe = new Image();
      probe.onload = () => { img.src = src; img.classList.add('loaded'); };
      probe.src = src;
    });

    if (reduce) {
      document.querySelectorAll('.reveal,.build,.why-row,.news-lead,.news-item,.shop-card').forEach((e) => e.classList.add('in', 'built', 'vis'));
      document.querySelectorAll('[data-count]').forEach((e) => { e.textContent = (e as HTMLElement).dataset.count || '0'; });
      document.querySelector('.eco')?.classList.add('run');
      return () => removeEventListener('scroll', onScroll);
    }

    const observers: IntersectionObserver[] = [];

    // reveal
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 3 * 0.07) + 's'; io.observe(el); });
    observers.push(io);

    // diversified blocks -> .vis
    const vio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('vis'); vio.unobserve(e.target); } }), { threshold: 0.18 });
    document.querySelectorAll('.why-row,.news-lead,.news-item,.shop-card').forEach((el) => vio.observe(el));
    observers.push(vio);

    // build groups -> stagger .built; standalone .build too
    const bio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const g = e.target as HTMLElement;
      if (g.classList.contains('build-group')) {
        g.querySelectorAll('.build').forEach((it, i) => setTimeout(() => it.classList.add('built'), i * 160));
      } else { g.classList.add('built'); }
      bio.unobserve(g);
    }), { threshold: 0.2 });
    document.querySelectorAll('.build-group').forEach((g) => bio.observe(g));
    document.querySelectorAll('.build').forEach((b) => { if (!b.closest('.build-group')) bio.observe(b); });
    observers.push(bio);

    // ecosystem: run line + sequence active node
    const eco = document.querySelector('.eco');
    if (eco) {
      const nodes = [...eco.querySelectorAll('.eco-node')];
      const eio = new IntersectionObserver((es) => es.forEach((e) => {
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
      }), { threshold: 0.35 });
      eio.observe(eco);
      observers.push(eio);
    }

    // count-up
    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement; const end = +el.dataset.count!;
      const steps = 34; const inc = end / steps; let c = 0;
      const iv = setInterval(() => { c += inc; if (c >= end) { c = end; clearInterval(iv); } el.textContent = String(Math.floor(c)); }, 32);
      cio.unobserve(el);
    }), { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => cio.observe(el));
    observers.push(cio);

    return () => { removeEventListener('scroll', onScroll); observers.forEach((o) => o.disconnect()); };
  }, []);

  return null;
}
