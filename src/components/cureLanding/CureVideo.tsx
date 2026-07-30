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
    <div className="p126-card p126-video-card reveal">
      <h2 className="p126-card-title">{CURE_UV02_VIDEO.title}</h2>
      <div className="p126-video">
        <video
          ref={videoRef}
          className="p126-video-el"
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
          <button
            type="button"
            className="p126-play"
            onClick={toggle}
            aria-label="Play UV-02 video"
          >
            <span className="p126-play-circle" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
