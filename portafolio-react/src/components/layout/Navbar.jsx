import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const HOME_LINKS = [
  { href: '#perfil', label: 'Perfil' },
  { href: '#empresa', label: 'Empresa' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [visible, setVisible] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      return;
    }
    setVisible(false);
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <nav className={`${styles.navbar} ${visible ? styles.vis : ''}`}>
      <Link to="/" className={styles.logo}>Tania P.</Link>
      {isHome ? (
        <ul className={styles.links}>
          {HOME_LINKS.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      ) : (
        <Link to="/" className={styles.back}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Inicio
        </Link>
      )}
    </nav>
  );
}
