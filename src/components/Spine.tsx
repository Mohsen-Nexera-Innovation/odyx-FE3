'use client';
// Left vertical story-spine — minimal dots + animated section label on scroll.
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const SECTIONS: [string, string][] = [
  ['#hero', 'Start'],
  ['#path', 'Choose Path'],
  ['#featured', 'Products'],
  ['#ecosystem', 'Ecosystem'],
  ['#clinical', 'Applications'],
  ['#why', 'Why ODYX'],
  ['#previews', 'Resources'],
  ['#news', 'News'],
  ['#register', 'Register'],
  ['#shop', 'Shop'],
  ['#cta', 'Demo'],
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Spine() {
  const navRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [theme, setTheme] = useState<'hero' | 'light'>('hero');
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;

      const hero = document.getElementById('hero');
      const heroRect = hero?.getBoundingClientRect();
      const inHero = !!heroRect && heroRect.bottom > vh * 0.28 && heroRect.top < vh * 0.55;
      setTheme(inHero ? 'hero' : 'light');

      let next = 0;
      SECTIONS.forEach(([,], i) => {
        const tgt = document.querySelector(SECTIONS[i][0]);
        if (!tgt) return;
        const r = tgt.getBoundingClientRect();
        if (r.top <= vh * 0.44) next = i;
      });
      setActiveIdx(next);
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
    };
  }, []);

  const go = (sel: string) => document.querySelector(sel)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav
      className="spine"
      ref={navRef}
      data-theme={theme}
      data-active={activeIdx}
      aria-label="Page sections"
    >
      <ol className="spine-list">
        {SECTIONS.map(([target, label], i) => {
          const state = i < activeIdx ? 'done' : i === activeIdx ? 'on' : 'pending';
          return (
            <li key={target} className={`spine-item spine-item--${state}`}>
              <button
                type="button"
                className="spine-node"
                data-target={target}
                onClick={() => go(target)}
                aria-label={label}
                aria-current={state === 'on' ? 'step' : undefined}
              >
                <motion.span
                  className="spine-dot"
                  aria-hidden
                  layout
                  animate={{
                    scale: state === 'on' ? 1.3 : state === 'done' ? 0.95 : 0.82,
                    opacity: state === 'pending' ? 0.45 : 1,
                  }}
                  transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                />
                {state === 'on' && !reduce && (
                  <motion.span
                    className="spine-pulse"
                    initial={{ scale: 0.9, opacity: 0.65 }}
                    animate={{ scale: 2.1, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
                    aria-hidden
                  />
                )}

                <AnimatePresence mode="wait">
                  {state === 'on' && (
                    <motion.span
                      key={label}
                      className="spine-label"
                      initial={reduce ? false : { opacity: 0, x: -10, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={reduce ? undefined : { opacity: 0, x: -8, filter: 'blur(3px)' }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
