import styles from './PublicacionCard.module.css';

function isVideo(path) {
  return /\.mp4$/i.test(path);
}

export default function PublicacionCard({ media, numero, onOpen }) {
  const [first] = media;
  const video = isVideo(first);

  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.thumb}
        onClick={() => onOpen({ media })}
        aria-label={`Reproducir publicación ${numero}`}
      >
        {video ? (
          <video
            className={styles.thumbMedia}
            src={first}
            muted
            preload="metadata"
            playsInline
            onLoadedMetadata={(e) => { e.currentTarget.currentTime = 0.1; }}
          />
        ) : (
          <img className={styles.thumbMedia} src={first} alt="" loading="lazy" />
        )}

        {media.length > 1 && (
          <span className={styles.countBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="7" width="14" height="14" rx="2" /><path d="M7 7V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-3" /></svg>
            {media.length}
          </span>
        )}

        <span className={styles.playIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
      </button>
      <div className={styles.meta}>
        <span className={styles.num}>Publicación {numero}</span>
      </div>
    </div>
  );
}
