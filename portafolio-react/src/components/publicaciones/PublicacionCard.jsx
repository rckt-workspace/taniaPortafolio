import styles from './PublicacionCard.module.css';

const TIPO_LABEL = {
  video: 'Reel / Video',
  post: 'Publicación',
};

export default function PublicacionCard({ url, tipo, numero, onOpen }) {
  return (
    <div className={styles.card}>
      <button
        type="button"
        className={styles.thumb}
        onClick={() => onOpen({ url, tipo })}
        aria-label={`Reproducir publicación ${numero}`}
      >
        <span className={styles.thumbLabel}>{TIPO_LABEL[tipo]}</span>
        <span className={styles.playIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </span>
      </button>
      <div className={styles.meta}>
        <span className={styles.num}>Publicación {numero}</span>
        <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          Ver en Facebook ↗
        </a>
      </div>
    </div>
  );
}
