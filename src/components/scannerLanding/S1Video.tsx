import { S1_VIDEO } from '@/content/scanner-landing';

/** Static poster stand-in — playback disabled until official clip is ready. */
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
      </div>
    </div>
  );
}
