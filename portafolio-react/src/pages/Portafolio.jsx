import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/publicaciones/Lightbox';
import PublicacionCard from '../components/publicaciones/PublicacionCard';
import { categorias } from '../data/publicaciones';
import styles from './Portafolio.module.css';

const NAV_ITEMS = [
  { href: '#estrategia', label: 'Estrategia global' },
  ...categorias.map((c) => ({ href: `#${c.id}`, label: c.titulo })),
];

function CategoriaSection({ categoria, index, onOpen }) {
  const [open, setOpen] = useState(false);
  const alt = index % 2 === 1;

  return (
    <section
      className={styles.portSection}
      id={categoria.id}
      style={alt ? { background: 'var(--sand)' } : undefined}
    >
      <div className="wrap">
        <Reveal className={styles.secHead}>
          <div className={styles.secHeadLeft}>
            <span className={styles.secNum}>{categoria.numero}</span>
            <div>
              <p className={styles.secLabel}>{categoria.label}</p>
              <h2 className={styles.secTitle}>{categoria.titulo}</h2>
              <div className={styles.secRule} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} as="p" className={styles.secDesc}>{categoria.descripcion}</Reveal>

        <Reveal delay={0.12}>
          <button
            type="button"
            className={`${styles.verMasBtn} ${open ? styles.open : ''}`}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Ver menos' : 'Ver más'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </Reveal>

        <div className={`${styles.expandable} ${open ? styles.expandableOpen : ''}`}>
          <div className={styles.expandableInner}>
            <div className={styles.pubGrid}>
              {categoria.publicaciones.map((pub, i) => (
                <PublicacionCard
                  key={pub.url}
                  url={pub.url}
                  tipo={pub.tipo}
                  numero={String(i + 1).padStart(2, '0')}
                  onOpen={onOpen}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Portafolio() {
  const [active, setActive] = useState(null);

  return (
    <>
      <div className={styles.pageHero}>
        <p className={styles.phEyebrow}>Comité de Cafeteros del Valle del Cauca</p>
        <h1 className={styles.phTitle}>Mi Portafolio</h1>
        <p className={styles.phSub}>Trabajo realizado durante la práctica profesional · 2026</p>
      </div>

      <div className={styles.portNavWrap}>
        <div className="wrap">
          <nav className={styles.portNav}>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className={styles.portNavItem}>{item.label}</a>
            ))}
          </nav>
        </div>
      </div>

      <main>
        <section className={styles.portSection} id="estrategia">
          <div className="wrap">
            <Reveal className={styles.secHead}>
              <div className={styles.secHeadLeft}>
                <span className={styles.secNum}>01</span>
                <div>
                  <p className={styles.secLabel}>Comunicación institucional</p>
                  <h2 className={styles.secTitle}>Estrategia global<br />de redes sociales</h2>
                  <div className={styles.secRule} />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} as="p" className={styles.secDesc}>
              Diseño y estructuración de la estrategia de comunicación digital del Comité de Cafeteros del Valle del Cauca, orientada a fortalecer la presencia institucional en redes sociales y mejorar el alcance e impacto de los contenidos publicados.
            </Reveal>

            <Reveal delay={0.12} className={styles.textBlock}>
              <p>La estrategia global de redes sociales fue desarrollada con el objetivo de unificar la comunicación digital del Comité, estableciendo lineamientos claros para la producción y publicación de contenidos en las distintas plataformas institucionales.</p>
              <p>El proceso incluyó el análisis del estado actual de las redes, la identificación de públicos objetivo, la definición de pilares de contenido, la propuesta de formatos y frecuencias de publicación, y el establecimiento de métricas de seguimiento para evaluar el impacto de la estrategia.</p>
              <p>Este trabajo permitió articular los objetivos comunicacionales de las diferentes áreas del Comité con una propuesta coherente, visualmente consistente y orientada a fortalecer el vínculo entre la institución y las comunidades cafeteras del departamento.</p>
              <p>Entre los resultados destacados se encuentran la consolidación de una línea gráfica institucional, la propuesta de un calendario editorial mensual, y el diseño de indicadores de gestión para medir el alcance, la interacción y la percepción de la marca en redes sociales.</p>
            </Reveal>
          </div>
        </section>

        {categorias.map((categoria, index) => (
          <CategoriaSection key={categoria.id} categoria={categoria} index={index} onOpen={setActive} />
        ))}
      </main>

      <div className={styles.backSection}>
        <Link to="/experiencia" className={styles.btnBack}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
          Volver a mi experiencia
        </Link>
      </div>

      <Lightbox item={active} onClose={() => setActive(null)} />
    </>
  );
}
