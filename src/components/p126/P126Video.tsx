import { P1_26_VIDEO } from '@/content/p1-26';

/** Static poster stand-in — playback disabled until official clip is ready. */
export default function P126Video() {
  return (
    <div className="p126-card p126-video-card reveal">
      <h2 className="p126-card-title">{P1_26_VIDEO.title}</h2>
      <div className="p126-video">
        <img
          className="p126-video-el"
          src={P1_26_VIDEO.poster}
          alt={P1_26_VIDEO.posterAlt}
          loading="lazy"
        />
      </div>
    </div>
  );
}
