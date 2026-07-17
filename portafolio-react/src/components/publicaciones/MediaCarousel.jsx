import { useRef, useState } from 'react';
import styles from './MediaCarousel.module.css';

function isVideo(path) {
  return /\.mp4$/i.test(path);
}

function Slide({ path, active }) {
  if (isVideo(path)) {
    return active ? (
      <video
        key={path}
        className={styles.media}
        src={path}
        controls
        autoPlay
        playsInline
      />
    ) : null;
  }
  return <img className={styles.media} src={path} alt="" loading="lazy" />;
}

export default function MediaCarousel({ media }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const multiple = media.length > 1;

  function go(delta) {
    setIndex((i) => (i + delta + media.length) % media.length);
  }

  function handleTouchStart(e) {
    touchX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx > 0 ? -1 : 1);
  }

  return (
    <div className={styles.wrap}>
      <div
        className={styles.stage}
        onTouchStart={multiple ? handleTouchStart : undefined}
        onTouchEnd={multiple ? handleTouchEnd : undefined}
      >
        <Slide path={media[index]} active />

        {multiple && (
          <>
            <button type="button" className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => go(-1)} aria-label="Anterior">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button type="button" className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => go(1)} aria-label="Siguiente">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </>
        )}
      </div>

      {multiple && (
        <div className={styles.dots}>
          {media.map((path, i) => (
            <button
              key={path}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
