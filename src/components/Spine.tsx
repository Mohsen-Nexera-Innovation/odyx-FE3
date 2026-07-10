'use client';
// Left vertical story-spine — icon stepper (Stitch-inspired): checkmarks on
// done steps, section icons on active/pending, title + connectors.
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type SectionIcon =
  | 'start' | 'path' | 'ecosystem' | 'products' | 'clinical' | 'why'
  | 'cases' | 'learning' | 'support' | 'news' | 'register' | 'shop';

type Section = {
  target: string;
  title: string;
  icon: SectionIcon;
};

const SECTIONS: Section[] = [
  { target: '#why', title: 'Why ODYX', icon: 'why' },
  { target: '#path', title: 'Choose Path', icon: 'path' },
  { target: '#ecosystem', title: 'Ecosystem', icon: 'ecosystem' },
  { target: '#featured', title: 'Products', icon: 'products' },
  { target: '#clinical', title: 'Applications', icon: 'clinical' },
  { target: '#cases-preview', title: 'Cases', icon: 'cases' },
  { target: '#learning-preview', title: 'Learning', icon: 'learning' },
  { target: '#support-preview', title: 'Support', icon: 'support' },
  { target: '#news', title: 'News', icon: 'news' },
  { target: '#register', title: 'Register', icon: 'register' },
  { target: '#shop', title: 'Store', icon: 'shop' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const ICON_PATHS: Record<SectionIcon, ReactNode> = {
  start: <><path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" /></>,
  path: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h5a3 3 0 0 1 3 3v3" /><path d="M16 18h-5a3 3 0 0 1-3-3v-3" /></>,
  ecosystem: <><circle cx="12" cy="12" r="2.5" /><circle cx="5" cy="7" r="1.8" /><circle cx="19" cy="7" r="1.8" /><circle cx="5" cy="17" r="1.8" /><circle cx="19" cy="17" r="1.8" /><path d="M7 8l3.5 3M17 8l-3.5 3M7 16l3.5-3M17 16l-3.5-3" /></>,
  products: <><path d="M21 8.5 12 3 3 8.5V20h18z" /><path d="M9 20v-7h6v7" /></>,
  clinical: <><path d="M12 4v16M8 8h8M8 16h8" /><circle cx="12" cy="12" r="9" /></>,
  why: <><path d="M12 3l2.4 4.8L20 9l-3.8 3.7L17.5 19 12 16.2 6.5 19l1.3-6.3L4 9l5.6-1.2z" /></>,
  cases: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M3 12h18" /></>,
  learning: <><path d="M4 6.5 12 3l8 3.5-8 3.5z" /><path d="M6 9.5V16c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5V9.5" /><path d="M20 10v6" /></>,
  support: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" /></>,
  news: <><path d="M4 5h16v14H4z" /><path d="M8 9h8M8 13h5" /><path d="M16 13h2" /></>,
  register: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
  shop: <><path d="M6 7h15l-1.5 9H8L6 7z" /><path d="M6 7 5 3H2" /><circle cx="9.5" cy="19.5" r="1.5" /><circle cx="17.5" cy="19.5" r="1.5" /></>,
};

function SpineIcon({ name }: { name: SectionIcon }) {
  return (
    <svg className="spine-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[name]}
      </g>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="spine-check" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12.5l4.2 4.2L19 7"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Spine() {
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [theme, setTheme] = useState<'hero' | 'light'>('light');
  const [shown, setShown] = useState(false);
  const reduce = useReducedMotion();

  // Smoothly scroll to a section and reflect it in the URL hash (no jump).
  const go = useCallback((sel: string) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    if (history.replaceState) history.replaceState(null, '', sel);
  }, [reduce]);

  // Active-section tracking via IntersectionObserver (accurate, no scroll math).
  useEffect(() => {
    const visible = new Map<number, number>();
    const targets = SECTIONS.map(({ target }) => document.querySelector(target));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = targets.indexOf(entry.target);
          if (idx === -1) return;
          if (entry.isIntersecting) visible.set(idx, entry.intersectionRatio);
          else visible.delete(idx);
        });
        if (visible.size) {
          // Topmost section currently inside the active band wins.
          const next = Math.min(...visible.keys());
          setActiveIdx(next);
          const sel = SECTIONS[next].target;
          if (history.replaceState && location.hash !== sel) {
            history.replaceState(null, '', sel);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.01, 0.5, 1] },
    );

    targets.forEach((t) => t && io.observe(t));
    return () => io.disconnect();
  }, []);

  // rAF-throttled scroll handler: only drives the theme swap near the hero.
  useEffect(() => {
    const compute = () => {
      rafRef.current = 0;
      const vh = window.innerHeight;
      const hero = document.getElementById('hero');
      const heroRect = hero?.getBoundingClientRect();
      const inHero = !!heroRect && heroRect.bottom > vh * 0.28 && heroRect.top < vh * 0.55;
      setTheme(inHero ? 'hero' : 'light');
      // Reveal the spine only once the hero (video) has mostly scrolled away.
      const pastHero = !heroRect || heroRect.bottom <= vh * 0.5;
      setShown(pastHero);
    };
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(compute);
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    compute();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Keyboard: Arrow keys step through sections, Home/End jump to the ends.
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    let target = -1;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        target = Math.min(activeIdx + 1, SECTIONS.length - 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        target = Math.max(activeIdx - 1, 0);
        break;
      case 'Home':
        target = 0;
        break;
      case 'End':
        target = SECTIONS.length - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    go(SECTIONS[target].target);
    btnRefs.current[target]?.focus();
  };

  return (
    <nav
      className="spine"
      ref={navRef}
      data-theme={theme}
      data-active={activeIdx}
      data-shown={shown}
      aria-hidden={!shown}
      aria-label="Page sections"
      onKeyDown={onKeyDown}
    >
      <ol className="spine-list">
        {SECTIONS.map(({ target, title, icon }, i) => {
          const state = i < activeIdx ? 'done' : i === activeIdx ? 'on' : 'pending';
          const isLast = i === SECTIONS.length - 1;
          return (
            <li key={target} className={`spine-item spine-item--${state}`}>
              <button
                type="button"
                ref={(el) => { btnRefs.current[i] = el; }}
                className="spine-node"
                data-target={target}
                onClick={() => go(target)}
                aria-label={`${title}, section ${i + 1} of ${SECTIONS.length}`}
                aria-current={state === 'on' ? 'step' : undefined}
              >
                <span className="spine-marker" aria-hidden>
                  <motion.span
                    className="spine-circle"
                    layout
                    animate={{ scale: state === 'on' ? 1.12 : 1 }}
                    transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 24 }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {state === 'done' ? (
                        <motion.span
                          key="check"
                          className="spine-glyph"
                          initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={reduce ? undefined : { scale: 0.4, opacity: 0 }}
                          transition={{ duration: 0.28, ease: EASE }}
                        >
                          <CheckIcon />
                        </motion.span>
                      ) : (
                        <motion.span
                          key={icon}
                          className="spine-glyph"
                          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={reduce ? undefined : { scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.2, ease: EASE }}
                        >
                          <SpineIcon name={icon} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {state === 'on' && !reduce && (
                      <motion.span
                        className="spine-ring"
                        initial={{ scale: 0.85, opacity: 0.55 }}
                        animate={{ scale: 1.7, opacity: 0 }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                      />
                    )}
                  </motion.span>
                  {!isLast && <span className="spine-connector" />}
                </span>

                <span className="spine-text">
                  <span className="spine-title">{title}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
