'use client';

import { useRef, useState } from 'react';
import { S1_VIDEO } from '@/content/scanner-landing';

export default function S1Video() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="s1l-card s1l-card--video reveal" data-s1-video>
      <h2 className="s1l-card-title s1l-card-title--accent">{S1_VIDEO.title}</h2>
      <div className="s1l-video">
        <video
          ref={videoRef}
          className="s1l-video-el"
          poster={S1_VIDEO.poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          controls={playing}
        >
          <source src={S1_VIDEO.src} type="video/mp4" />
        </video>
        {!playing ? (
          <button type="button" className="s1l-play" onClick={toggle} aria-label="Play S1 video">
            <span className="s1l-play-circle" aria-hidden>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M8 5.5v13l11-6.5-11-6.5z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
