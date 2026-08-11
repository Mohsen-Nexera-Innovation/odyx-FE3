import { CURE_UV02_VIDEO } from '@/content/cure-uv02';

/** Decorative play mark — static poster only; not interactive until clip is ready. */
export default function CureVideo() {
  return (
    <div className="p126-card p126-video-card reveal">
      <h2 className="p126-card-title">{CURE_UV02_VIDEO.title}</h2>
      <div className="p126-video">
        <img
          className="p126-video-el"
          src={CURE_UV02_VIDEO.poster}
          alt={CURE_UV02_VIDEO.posterAlt}
          loading="lazy"
        />
        <span className="p126-play" aria-hidden="true">
          <span className="p126-play-circle">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
