import styles from './PublicacionCard.module.css';

function isVideo(path) {
  return /\.mp4$/i.test(path);
}

export default function PublicacionCard({ media, numero, likes, comentarios, onOpen }) {
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

      {(likes != null || comentarios != null) && (
        <div className={styles.interactions}>
          {likes != null && (
            <span className={styles.interaction}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {likes}
            </span>
          )}
          {comentarios != null && (
            <span className={styles.interaction}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              {comentarios}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
