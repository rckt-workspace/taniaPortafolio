import { useEffect, useRef, useState } from 'react';
import styles from './ExoticCarousel.module.css';

function shortestOffset(i, active, length) {
  let diff = i - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export default function ExoticCarousel({ media, reverse = false, interval = 4200 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const length = media.length;

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + (reverse ? -1 : 1) + length) % length);
    }, interval);

    return () => clearInterval(id);
  }, [paused, length, reverse, interval]);

  function go(delta) {
    setIndex((i) => (i + delta + length) % length);
  }

  function handleTouchStart(e) {
    touchX.current = e.touches[0].clientX;
    setPaused(true);
  }

  function handleTouchEnd(e) {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    setPaused(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  }

  return (
    <div
      className={`${styles.outer} ${reverse ? styles.outerReverse : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span className={styles.blobA} aria-hidden="true" />
      <span className={styles.blobB} aria-hidden="true" />
      <span className={styles.ring} aria-hidden="true" />

      <div
        className={styles.stage}
        role="group"
        aria-roledescription="carrusel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {media.map((path, i) => {
          const offset = shortestOffset(i, index, length);
          const abs = Math.abs(offset);
          const active = offset === 0;

          return (
            <div
              key={path}
              className={`${styles.slide} ${active ? styles.slideActive : ''}`}
              style={{ '--offset': offset, '--abs': abs, zIndex: 10 - abs }}
              onClick={() => setIndex(i)}
            >
              <div className={styles.slideInner}>
                <img src={path} alt="" loading="lazy" />
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          onClick={() => go(-1)}
          aria-label="Anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          onClick={() => go(1)}
          aria-label="Siguiente"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

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
    </div>
  );
}
