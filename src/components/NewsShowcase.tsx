'use client';
// Latest news: featured lead card auto-cycles through all stories with a zoom
// crossfade; side list shows distinct thumbnails - click or auto-advance syncs the lead.
import { useEffect, useRef, useState } from 'react';

interface Story { tag: string; title: string; desc: string; img: string; alt: string; }

const STORIES: Story[] = [
  { tag: 'Featured', title: 'New permanent crown & bridge resin line', desc: 'An expanded clinical resin range engineered for same-day crown and bridge work - validated end-to-end with ODYX printers and curing.', img: '/img/news-lead.jpg', alt: 'New crown and bridge resin' },
  { tag: 'Expo', title: 'ODYX at the digital dentistry expo', desc: 'Live workflow demos - scan to delivered restoration.', img: '/img/news-1.jpg', alt: 'Digital dentistry expo' },
  { tag: 'Academy', title: 'Academy: new implant-guide course', desc: 'Structured clinical education, now open to members.', img: '/img/news-2.jpg', alt: 'Implant guide course' },
  { tag: 'Software', title: 'Design software update released', desc: 'Faster CAD and new appliance libraries.', img: '/img/news-3.jpg', alt: 'Design software update' },
];
const N = STORIES.length;

export default function NewsShowcase() {
  const [active, setActive] = useState(0);
  const [anim, setAnim] = useState(false);
  const paused = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const pick = (i: number) => {
    if (i === active) return;
    setAnim(true);
    setTimeout(() => { setActive(i); setAnim(false); }, 320);
  };

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    timer.current = setInterval(() => {
      if (paused.current) return;
      setAnim(true);
      setTimeout(() => {
        setActive((a) => (a + 1) % N);
        setAnim(false);
      }, 320);
    }, 4800);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  const s = STORIES[active];

  return (
    <div className="news-strip" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <a href="/#news" className="news-lead">
        <div className="news-lead-media">
          <img src={s.img} alt={s.alt} className={`news-lead-img parallax${anim ? ' swap' : ''}`} />
        </div>
        <span className="badge2">{s.tag}</span>
        <h3>{s.title}</h3>
        <p>{s.desc}</p>
      </a>
      <div className="news-side news-side--strip" role="list">
        {STORIES.map((story, i) => (
          <button key={story.title} type="button"
            className={`news-item${i === active ? ' on' : ''}`}
            onClick={() => pick(i)} aria-current={i === active}>
            <div className="news-thumb">
              <img src={story.img} alt={story.alt} loading="lazy" />
            </div>
            <div className="news-item-body">
              <h4>{story.title}</h4>
              <p>{story.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
