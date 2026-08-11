import { CURE_UV02_VIDEO } from '@/content/cure-uv02';

/** Static poster stand-in — playback disabled until official clip is ready. */
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
      </div>
    </div>
  );
}
