import { useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/publicaciones/Lightbox';
import PublicacionCard from '../components/publicaciones/PublicacionCard';
import { categorias } from '../data/publicaciones';
import styles from './Portafolio.module.css';

const SECTIONS = [
  { id: 'voto-tu-gremio', label: 'Tu voto, tu gremio' },
  { id: 'estrategia', label: 'Estrategia global' },
  ...categorias.map((c) => ({ id: c.id, label: c.titulo })),
];

function AccordionSection({ id, alt, isOpen, children }) {
  return (
    <section
      className={styles.portSection}
      id={id}
      style={{
        background: alt ? 'var(--sand)' : undefined,
        paddingTop: isOpen ? undefined : 0,
        paddingBottom: isOpen ? undefined : 0,
      }}
    >
      <div className="wrap">
        <div
          className={`${styles.sectionCollapse} ${
            isOpen ? styles.sectionCollapseOpen : ''
          }`}
        >
          <div className={styles.sectionCollapseInner}>{children}</div>
        </div>
      </div>
    </section>
  );
}

function CategoriaSection({ categoria, onOpen }) {
  const [open, setOpen] = useState(false);

  return (
    <>
        <Reveal className={styles.secHead}>
          <div className={styles.secHeadLeft}>
            <span className={styles.secNum}>
              {categoria.numero}
            </span>

            <div>
              <p className={styles.secLabel}>
                {categoria.label}
              </p>

              <h2 className={styles.secTitle}>
                {categoria.titulo}
              </h2>

              <div className={styles.secRule} />
            </div>
          </div>
        </Reveal>

        {categoria.subtitulo && (
          <Reveal
            delay={0.05}
            as="p"
            className={styles.secSubtitulo}
          >
            {categoria.subtitulo}
          </Reveal>
        )}

        <Reveal
          delay={0.08}
          as="p"
          className={styles.secDesc}
        >
          {categoria.descripcion}
        </Reveal>

        <Reveal delay={0.12}>
          <button
            type="button"
            className={`${styles.verMasBtn} ${
              open ? styles.open : ''
            }`}
            onClick={() => setOpen((estadoActual) => !estadoActual)}
          >
            {open ? 'Ver menos' : 'Ver más'}

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </Reveal>

        <div
          className={`${styles.expandable} ${
            open ? styles.expandableOpen : ''
          }`}
        >
          <div className={styles.expandableInner}>
            <div className={styles.pubGrid}>
              {categoria.publicaciones.map((pub, i) => (
                <div
                  key={`${categoria.id}-${pub.media[0]}-${i}`}
                  className={styles.publicacionItem}
                >
                  <PublicacionCard
                    media={pub.media}
                    numero={String(i + 1).padStart(2, '0')}
                    onOpen={onOpen}
                  />

                  <div
                    className={styles.publicacionStats}
                    aria-label={`La publicación tiene ${
                      pub.likes ?? 0
                    } me gusta y ${
                      pub.comentarios ?? 0
                    } comentarios`}
                  >
                    <span
                      className={styles.publicacionStat}
                      title="Me gusta"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                      </svg>

                      <span>{pub.likes ?? 0}</span>
                    </span>

                    <span
                      className={styles.publicacionStat}
                      title="Comentarios"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
                      </svg>

                      <span>{pub.comentarios ?? 0}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  );
}

export default function Portafolio() {
  const [active, setActive] = useState(null);
  const [openSection, setOpenSection] = useState(null);

  function toggleSection(id) {
    setOpenSection((current) => (current === id ? null : id));
  }

  return (
    <>
      <div className={styles.pageHero}>
        <p className={styles.phEyebrow}>
          Comité de Cafeteros del Valle del Cauca
        </p>

        <h1 className={styles.phTitle}>
          Mi Portafolio
        </h1>

        <p className={styles.phSub}>
          Trabajo realizado durante la práctica profesional · 2026
        </p>
      </div>

      <section className={styles.introSection}>
        <div className="wrap">
          <Reveal className={styles.textBlock}>
            <p>
              Este portafolio reúne el trabajo que desarrollé durante
              mis prácticas profesionales en el Comité de Cafeteros
              del Valle del Cauca, específicamente en el área de
              Comunicaciones. Llegué a una institución con más de 95
              años de historia, con un territorio extenso, públicos
              muy diversos y un reto comunicacional concreto: acercar
              una organización gremial sólida, pero compleja, a las
              personas que la sostienen todos los días desde sus
              fincas.
            </p>

            <p>
              Lo que encontré no fue solo una entidad con redes
              sociales, sino una historia que merecía contarse mejor.
              Así que desde el primer día empecé a construir, probar y
              ajustar: guiones para reels, flyers de campaña
              electoral, coberturas institucionales, piezas emotivas
              para fechas especiales y contenidos que, sin perder el
              rigor institucional, hablaran de verdad con los
              caficultores del Valle del Cauca.
            </p>

            <p>
              Lo que aquí se presenta no es el plan con el que llegué,
              sino lo que aprendí al caminar. Cada pieza tiene detrás
              una decisión estratégica, una lectura del contexto y
              una intención clara: que comunicar también es construir
              gremio.
            </p>
          </Reveal>
        </div>
      </section>

      <div className={styles.portNavWrap}>
        <div className="wrap">
          <nav className={styles.portNav}>
            {SECTIONS.map((section, i) => (
              <button
                key={section.id}
                type="button"
                aria-expanded={openSection === section.id}
                className={`${styles.portNavItem} ${
                  openSection === section.id ? styles.portNavItemActive : ''
                }`}
                onClick={() => toggleSection(section.id)}
              >
                <span className={styles.portNavNum}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main>
        <AccordionSection
          id="voto-tu-gremio"
          isOpen={openSection === 'voto-tu-gremio'}
        >
            <Reveal className={styles.voteSection}>
              <p className={styles.voteEyebrow}>
                Estrategia electoral 2026
              </p>

              <h3 className={styles.voteTitle}>
                Tu voto, tu gremio
              </h3>

              <p className={styles.voteTagline}>
                Facebook informa. Instagram activa.
              </p>

              <div className={styles.voteGoal}>
                <span className={styles.voteGoalLabel}>
                  Objetivo central
                </span>

                <span className={styles.voteGoalText}>
                  Convertir alcance en voto — 40+ deciden, jóvenes
                  movilizan
                </span>
              </div>

              <div className={styles.platformGrid}>
                <div
                  className={`${styles.platformCard} ${styles.platformFb}`}
                >
                  <div className={styles.platformHead}>
                    <span className={styles.platformName}>
                      Facebook
                    </span>

                    <span className={styles.platformFollowers}>
                      9.900
                      <small>seguidores</small>
                    </span>
                  </div>

                  <dl className={styles.platformList}>
                    <div>
                      <dt>Rol estratégico</dt>
                      <dd>Informar y mantener la confianza</dd>
                    </div>

                    <div>
                      <dt>Audiencia core</dt>
                      <dd>Caficultores 40+ · votantes</dd>
                    </div>

                    <div>
                      <dt>Consumo</dt>
                      <dd>Lento · denso · informativo</dd>
                    </div>

                    <div>
                      <dt>Formatos top</dt>
                      <dd>Carruseles · historias · imágenes</dd>
                    </div>

                    <div>
                      <dt>Mejor tema</dt>
                      <dd>
                        Elecciones · Federación · datos técnicos
                      </dd>
                    </div>
                  </dl>

                  <p className={styles.platformMetric}>
                    Métrica: alcance + retención · Interacción actual:
                    pasiva
                  </p>
                </div>

                <div
                  className={`${styles.platformCard} ${styles.platformIg}`}
                >
                  <div className={styles.platformHead}>
                    <span className={styles.platformName}>
                      Instagram
                    </span>

                    <span className={styles.platformFollowers}>
                      7.555
                      <small>seguidores</small>
                    </span>
                  </div>

                  <dl className={styles.platformList}>
                    <div>
                      <dt>Rol estratégico</dt>
                      <dd>Informar y activar a los jóvenes</dd>
                    </div>

                    <div>
                      <dt>Audiencia core</dt>
                      <dd>40+ y jóvenes del sector</dd>
                    </div>

                    <div>
                      <dt>Consumo</dt>
                      <dd>Rápido · scroll · visual</dd>
                    </div>

                    <div>
                      <dt>Formatos top</dt>
                      <dd>
                        Reels · tendencias · híbridos visuales
                      </dd>
                    </div>

                    <div>
                      <dt>Mejor tema</dt>
                      <dd>
                        Testimonios · campo · animaciones IA
                      </dd>
                    </div>
                  </dl>

                  <p className={styles.platformMetric}>
                    Métrica: alcance + retención · Meta: activar jóvenes
                  </p>
                </div>
              </div>

              <h4 className={styles.voteSubhead}>
                Tres públicos, tres funciones
              </h4>

              <div className={styles.publicosGrid}>
                <div className={styles.publicoCard}>
                  <p className={styles.publicoNombre}>
                    Caficultores 40+
                  </p>

                  <p className={styles.publicoDesc}>
                    Votantes core · Facebook
                  </p>

                  <p className={styles.publicoPref}>
                    Prefieren: información clara y técnica
                  </p>

                  <span
                    className={`${styles.publicoTag} ${styles.tagVotar}`}
                  >
                    Función: votar
                  </span>
                </div>

                <div className={styles.publicoCard}>
                  <p className={styles.publicoNombre}>
                    Jóvenes del sector
                  </p>

                  <p className={styles.publicoDesc}>
                    Extensionistas y empleados · Instagram
                  </p>

                  <p className={styles.publicoPref}>
                    Prefieren: reels, tendencias y dinamismo
                  </p>

                  <span
                    className={`${styles.publicoTag} ${styles.tagMovilizar}`}
                  >
                    Función: movilizar
                  </span>
                </div>

                <div className={styles.publicoCard}>
                  <p className={styles.publicoNombre}>
                    Amantes del café
                  </p>

                  <p className={styles.publicoDesc}>
                    Público urbano secundario · ambas
                  </p>

                  <p className={styles.publicoPref}>
                    Prefieren: historias reales e información clara
                  </p>

                  <span
                    className={`${styles.publicoTag} ${styles.tagInteresar}`}
                  >
                    Función: interesar
                  </span>
                </div>
              </div>

              <div className={styles.clavesBar}>
                <span className={styles.clavesLabel}>
                  Claves de ejecución
                </span>

                <ol className={styles.clavesList}>
                  <li>Medir alcance y retención</li>
                  <li>Priorizar personas reales</li>
                  <li>Dos mensajes en paralelo</li>
                  <li>1 salida = hasta 5 piezas</li>
                  <li>40+ votan · jóvenes movilizan</li>
                </ol>
              </div>
            </Reveal>
        </AccordionSection>

        <AccordionSection
          id="estrategia"
          alt
          isOpen={openSection === 'estrategia'}
        >
            <Reveal className={styles.secHead}>
              <div className={styles.secHeadLeft}>
                <span className={styles.secNum}>
                  02
                </span>

                <div>
                  <p className={styles.secLabel}>
                    Comunicación institucional
                  </p>

                  <h2 className={styles.secTitle}>
                    Estrategia global
                    <br />
                    de redes sociales
                  </h2>

                  <div className={styles.secRule} />
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.05}
              as="p"
              className={styles.secDesc}
            >
              Diseño y estructuración de la estrategia de comunicación
              digital del Comité de Cafeteros del Valle del Cauca,
              orientada a fortalecer la presencia institucional en
              redes sociales y mejorar el alcance e impacto de los
              contenidos publicados.
            </Reveal>

            <Reveal
              delay={0.1}
              className={styles.textBlock}
            >
              <p>
                La estrategia global de redes sociales fue desarrollada
                con el objetivo de unificar la comunicación digital del
                Comité, estableciendo lineamientos claros para la
                producción y publicación de contenidos en las distintas
                plataformas institucionales.
              </p>

              <p>
                El proceso incluyó el análisis del estado actual de las
                redes, la identificación de públicos objetivo, la
                definición de pilares de contenido, la propuesta de
                formatos y frecuencias de publicación, y el
                establecimiento de métricas de seguimiento para evaluar
                el impacto de la estrategia.
              </p>

              <p>
                Este trabajo permitió articular los objetivos
                comunicacionales de las diferentes áreas del Comité con
                una propuesta coherente, visualmente consistente y
                orientada a fortalecer el vínculo entre la institución y
                las comunidades cafeteras del departamento.
              </p>

              <p>
                Entre los resultados destacados se encuentran la
                consolidación de una línea gráfica institucional, la
                propuesta de un calendario editorial mensual, y el
                diseño de indicadores de gestión para medir el alcance,
                la interacción y la percepción de la marca en redes
                sociales.
              </p>
            </Reveal>
        </AccordionSection>

        {categorias.map((categoria, index) => (
          <AccordionSection
            key={categoria.id}
            id={categoria.id}
            alt={index % 2 === 1}
            isOpen={openSection === categoria.id}
          >
            <CategoriaSection categoria={categoria} onOpen={setActive} />
          </AccordionSection>
        ))}
      </main>

      <section
        className={styles.contactSection}
        id="contacto"
      >
        <div className="wrap">
          <Reveal className={styles.contactInner}>
            <p className={styles.secLabel}>
              Hablemos
            </p>

            <h2 className={styles.secTitle}>
              Contacto
            </h2>

            <div className={styles.secRule} />

            <ul className={styles.contactList}>
              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16v16H4z" />
                  <path d="m22 6-10 7L2 6" />
                </svg>

                <a href="mailto:pelaezvalverdetania@gmail.com">
                  pelaezvalverdetania@gmail.com
                </a>
              </li>

              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>

                <a href="tel:+573172273409">
                  +57 317 227 3409
                </a>
              </li>

              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                  />

                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                  <line
                    x1="17.5"
                    y1="6.5"
                    x2="17.51"
                    y2="6.5"
                  />
                </svg>

                <a
                  href="https://instagram.com/tania_0224"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @tania_0224
                </a>
              </li>

              <li>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>

                <span>Cali, Colombia</span>
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <div className={styles.backSection}>
        <Link
          to="/experiencia"
          className={styles.btnBack}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line
              x1="19"
              y1="12"
              x2="5"
              y2="12"
            />

            <polyline points="12 19 5 12 12 5" />
          </svg>

          Volver a mi experiencia
        </Link>
      </div>

      <Lightbox
        item={active}
        onClose={() => setActive(null)}
      />
    </>
  );
}