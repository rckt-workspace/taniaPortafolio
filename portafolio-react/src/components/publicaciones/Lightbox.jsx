import { useEffect } from 'react';
import FacebookEmbed from './FacebookEmbed';
import styles from './Lightbox.module.css';

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
            Ver en Facebook ↗
          </a>
          <button type="button" className={styles.close} onClick={onClose}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            Cerrar
          </button>
        </div>
        <FacebookEmbed url={item.url} tipo={item.tipo} />
      </div>
    </div>
  );
}
