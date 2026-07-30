'use client';

import { useRef, useState } from 'react';
import { CURE_UV02_VIDEO } from '@/content/cure-uv02';

export default function CureVideo() {
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
    <div className="cu2-card cu2-video-card reveal">
      <h2 className="cu2-card-title">{CURE_UV02_VIDEO.title}</h2>
      <div className="cu2-video">
        <video
          ref={videoRef}
          className="cu2-video-el"
          poster={CURE_UV02_VIDEO.poster}
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
          controls={playing}
        >
          <source src={CURE_UV02_VIDEO.src} type="video/mp4" />
        </video>
        {!playing ? (
          <button type="button" className="cu2-play" onClick={toggle} aria-label="Play Cure UV-02 video">
            <span className="cu2-play-circle" aria-hidden>
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
