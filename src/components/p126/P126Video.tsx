'use client';

import { useRef, useState } from 'react';
import { P1_26_VIDEO } from '@/content/p1-26';

export default function P126Video() {
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
    <div className="p126-card p126-video-card reveal">
      <h2 className="p126-card-title">{P1_26_VIDEO.title}</h2>
      <div className="p126-video">
        <video
          ref={videoRef}
          className="p126-video-el"
          poster={P1_26_VIDEO.poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          controls={playing}
        >
          <source src={P1_26_VIDEO.src} type="video/mp4" />
        </video>
        {!playing ? (
          <button
            type="button"
            className="p126-play"
            onClick={toggle}
            aria-label="Play P1-26 video"
          >
            <span className="p126-play-circle" aria-hidden>
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
