import { S1_VIDEO } from '@/content/scanner-landing';

/** Decorative play mark — static poster only; not interactive until clip is ready. */
export default function S1Video() {
  return (
    <div className="s1l-card s1l-card--video reveal" data-s1-video>
      <h2 className="s1l-card-title s1l-card-title--accent">{S1_VIDEO.title}</h2>
      <div className="s1l-video">
        <img
          className="s1l-video-el"
          src={S1_VIDEO.poster}
          alt={S1_VIDEO.posterAlt}
          loading="lazy"
        />
        <span className="s1l-play" aria-hidden="true">
          <span className="s1l-play-circle">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M8 5.5v13l11-6.5-11-6.5z" />
            </svg>
          </span>
        </span>
      </div>
    </div>
  );
}
