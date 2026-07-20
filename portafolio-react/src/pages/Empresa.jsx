import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useTilt } from '../hooks/useTilt';
import styles from './Empresa.module.css';

const FACTS = [
  {
    label: 'Sector',
    value: 'Cafetero',
    icon: '☕',
    description: 'Desarrollo y fortalecimiento de la caficultura regional.',
  },
  {
    label: 'Fundado',
    value: '1928',
    icon: '✦',
    description: 'Más de nueve décadas acompañando al sector cafetero.',
  },
  {
    label: 'Familias representadas',
    value: '+23.000',
    icon: '⌂',
    description: 'Familias caficultoras representadas en el departamento.',
  },
  {
    label: 'Municipios productores',
    value: '39',
    icon: '◉',
    description: 'Presencia institucional en las zonas cafeteras del Valle.',
  },
];

const FUNCTIONS = [
  {
    title: 'Prestación de servicios',
    text: 'Velar por la correcta prestación de los servicios que la Federación Nacional de Cafeteros ofrece a los productores.',
  },
  {
    title: 'Gestión de programas',
    text: 'Gestionar programas, proyectos y acciones que beneficien a los caficultores del departamento.',
  },
  {
    title: 'Desarrollo cafetero',
    text: 'Promover el desarrollo económico, productivo y social del sector cafetero en el territorio.',
  },
  {
    title: 'Representación gremial',
    text: 'Representar los intereses de los productores ante las diferentes instancias nacionales del gremio cafetero.',
  },
];

const IMPACTS = [
  {
    number: '01',
    title: 'Impacto rural',
    text: 'La caficultura constituye una actividad económica y social fundamental para las zonas rurales del departamento. En el Valle del Cauca existen más de 23.000 familias dedicadas al cultivo de café, distribuidas en 39 municipios productores.',
  },
  {
    number: '02',
    title: 'Economía y empleo',
    text: 'El café representa una fuente de ingresos para miles de familias rurales, genera empleo y dinamiza la economía local. El cultivo está compuesto principalmente por pequeños productores, lo que aumenta su relevancia social.',
  },
  {
    number: '03',
    title: 'Identidad cafetera',
    text: 'El Comité contribuye a conservar la identidad cafetera del departamento mediante programas, contenidos y acciones que reconocen el trabajo de las comunidades productoras.',
  },
];

function FactCard({ label, value, icon, description }) {
  const cardRef = useRef(null);

  useTilt(cardRef, {
    maxY: 7,
    maxX: 7,
  });

  return (
    <article
      ref={cardRef}
      className={styles.factCard}
      tabIndex={0}
    >
      <div className={styles.factIcon}>{icon}</div>

      <div className={styles.factContent}>
        <p className={styles.factLabel}>{label}</p>
        <p className={styles.factValue}>{value}</p>
        <p className={styles.factDescription}>{description}</p>
      </div>

      <span className={styles.factArrow}>↗</span>
    </article>
  );
}

function FunctionCard({ item, index, isOpen, onToggle }) {
  return (
    <li className={styles.funcItem}>
      <button
        type="button"
        className={`${styles.funcButton} ${
          isOpen ? styles.funcButtonOpen : ''
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.funcNumber}>
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className={styles.funcInfo}>
          <strong>{item.title}</strong>

          <span
            className={`${styles.funcDescription} ${
              isOpen ? styles.funcDescriptionOpen : ''
            }`}
          >
            {item.text}
          </span>
        </span>

        <span className={styles.funcToggle}>
          {isOpen ? '−' : '+'}
        </span>
      </button>
    </li>
  );
}

function ImpactCard({ impact, index, activeImpact, onSelect }) {
  const impactRef = useRef(null);

  useTilt(impactRef, {
    maxY: 5,
    maxX: 5,
  });

  const isActive = activeImpact === index;

  return (
    <button
      ref={impactRef}
      type="button"
      className={`${styles.importCard} ${
        isActive ? styles.importCardActive : ''
      }`}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
    >
      <div className={styles.importCardTop}>
        <span className={styles.importNumber}>{impact.number}</span>
        <span className={styles.importIcon}>
          {isActive ? '✦' : '○'}
        </span>
      </div>

      <div className={styles.importCardBody}>
        <h3>{impact.title}</h3>
        <p>{impact.text}</p>
      </div>

      <span className={styles.importAction}>
        {isActive ? 'Información seleccionada' : 'Conocer más'}
      </span>
    </button>
  );
}

export default function Empresa() {
  const [openFunction, setOpenFunction] = useState(0);
  const [activeImpact, setActiveImpact] = useState(0);

  const toggleFunction = (index) => {
    setOpenFunction((current) => (current === index ? null : index));
  };

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroShapeOne} />
        <div className={styles.heroShapeTwo} />
        <div className={styles.heroGrid} />

        <div className={styles.heroContent}>
          <Reveal>
            <div className={styles.heroLogo}>
              <span>✦</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className={styles.heroLabel}>Empresa de prácticas</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className={styles.heroName}>
              Comité de Cafeteros
              <span>del Valle del Cauca</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className={styles.heroSector}>
              Federación Nacional de Cafeteros
              <span className={styles.heroSeparator}>•</span>
              Cali, Colombia
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a href="#informacion" className={styles.scrollButton}>
              <span>Explorar la empresa</span>
              <span className={styles.scrollIcon}>↓</span>
            </a>
          </Reveal>
        </div>
      </section>

      <main id="informacion" className={styles.pageContent}>
        <Reveal className={styles.quickFacts}>
          {FACTS.map((fact) => (
            <FactCard key={fact.label} {...fact} />
          ))}
        </Reveal>

        <Reveal
          as="section"
          className={`${styles.sectionBlock} ${styles.aboutSection}`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.blockLabel}>¿Quiénes son?</p>

            <h2 className={styles.blockTitle}>
              Sobre la <span>empresa</span>
            </h2>

            <div className={styles.blockDivider}>
              <span />
            </div>
          </div>

          <div className={styles.aboutLayout}>
            <div className={styles.aboutSidebar}>
              <span className={styles.aboutNumber}>95+</span>
              <p>Años de trayectoria institucional</p>

              <div className={styles.aboutDecorativeLine} />
            </div>

            <div className={styles.blockText}>
              <p>
                El{' '}
                <strong>
                  Comité de Cafeteros del Valle del Cauca
                </strong>{' '}
                es la entidad gremial encargada de representar y
                acompañar a los caficultores del departamento dentro
                del sistema institucional del café colombiano.
              </p>

              <p>
                Este Comité hace parte de la estructura regional de la{' '}
                <strong>
                  Federación Nacional de Cafeteros de Colombia
                </strong>
                , organización privada, sin ánimo de lucro y de
                carácter gremial fundada en 1927 por los propios
                productores de café del país.
              </p>

              <p>
                La Federación cuenta con una estructura organizativa
                que incluye{' '}
                <strong>
                  comités departamentales y municipales
                </strong>{' '}
                en las zonas productoras del país. Esta organización
                permite mantener una relación directa con las
                comunidades cafeteras y garantizar la implementación
                de programas y servicios en los territorios.
              </p>

              <p>
                En el Valle del Cauca, la representación institucional
                se ejerce a través del Comité fundado el{' '}
                <strong>14 de mayo de 1928</strong>, entidad que agrupa
                y representa a{' '}
                <strong>
                  más de 23.000 familias caficultoras del departamento
                </strong>
                .
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal
          as="section"
          delay={0.08}
          className={`${styles.sectionBlock} ${styles.functionsSection}`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.blockLabel}>Rol institucional</p>

            <h2 className={styles.blockTitle}>
              Funciones del <span>Comité</span>
            </h2>

            <div className={styles.blockDivider}>
              <span />
            </div>

            <p className={styles.sectionIntroduction}>
              Selecciona cada función para conocer más información
              sobre el trabajo institucional del Comité.
            </p>
          </div>

          <ul className={styles.funcList}>
            {FUNCTIONS.map((item, index) => (
              <FunctionCard
                key={item.title}
                item={item}
                index={index}
                isOpen={openFunction === index}
                onToggle={() => toggleFunction(index)}
              />
            ))}
          </ul>
        </Reveal>

        {/* Las tarjetas aparecen progresivamente mientras se baja por la página. */}
        <Reveal
          as="section"
          delay={0.1}
          className={`${styles.sectionBlock} ${styles.impactSection}`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.blockLabel}>Su impacto</p>

            <h2 className={styles.blockTitle}>
              Importancia del <span>Comité</span>
            </h2>

            <div className={styles.blockDivider}>
              <span />
            </div>

            <p className={styles.sectionIntroduction}>
              Cada tarjeta presenta una dimensión de su impacto
              económico, social y cultural.
            </p>
          </div>

          <div className={styles.importGrid}>
            {IMPACTS.map((impact, index) => (
              <ImpactCard
                key={impact.title}
                impact={impact}
                index={index}
                activeImpact={activeImpact}
                onSelect={setActiveImpact}
              />
            ))}
          </div>
        </Reveal>

        <Reveal
          as="section"
          delay={0.12}
          className={`${styles.sectionBlock} ${styles.choiceSection}`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.blockLabel}>Mi decisión</p>

            <h2 className={styles.blockTitle}>
              ¿Por qué elegí el{' '}
              <span>Comité de Cafeteros?</span>
            </h2>

            <div className={styles.blockDivider}>
              <span />
            </div>
          </div>

          <div className={styles.porqueGrid}>
            <div className={styles.porqueText}>
              <p>
                Elegí realizar mi{' '}
                <strong>práctica profesional</strong> en el{' '}
                <strong>
                  Comité de Cafeteros del Valle del Cauca
                </strong>{' '}
                porque encontré en esta institución un espacio donde{' '}
                <strong>
                  la comunicación trasciende lo corporativo
                </strong>{' '}
                y se convierte en una herramienta para conectar
                territorios, comunidades e historias humanas.
              </p>

              <p>
                El Comité representaba para mí{' '}
                <strong>
                  la oportunidad de integrarme a un entorno donde la
                  comunicación tiene un propósito
                </strong>{' '}
                ligado al desarrollo rural, la identidad cafetera y
                el fortalecimiento de las comunidades productoras del
                departamento.
              </p>

              <p>
                Me interesaba comprender cómo una institución de gran
                trayectoria construye estrategias de comunicación
                para <strong>visibilizar proyectos</strong> y{' '}
                <strong>
                  fortalecer los vínculos con los caficultores
                </strong>
                .
              </p>

              <p>
                Esta experiencia me permitía articular varios enfoques
                que han marcado mi trayectoria académica: la{' '}
                <strong>comunicación organizacional</strong>, la
                creación de contenidos, el cubrimiento audiovisual y
                la comunicación con enfoque humano y social.
              </p>

              <blockquote className={styles.porqueQuote}>
                <span>“</span>
                La comunicación como un puente entre las instituciones
                y las comunidades.
              </blockquote>
            </div>

            <div className={styles.porqueVisual}>
              <div className={styles.porqueVisualCircle}>
                <span>✦</span>
              </div>

              <div className={styles.porqueVisualText}>
                <strong>Comunicar</strong>
                <span>Conectar</span>
                <span>Transformar</span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal
          as="section"
          delay={0.14}
          className={`${styles.sectionBlock} ${styles.socialSection}`}
        >
          <div className={styles.sectionHeading}>
            <p className={styles.blockLabel}>Síguelos</p>

            <h2 className={styles.blockTitle}>
              Redes sociales del <span>Comité</span>
            </h2>

            <div className={styles.blockDivider}>
              <span />
            </div>
          </div>

          <div className={styles.redesRow}>
            <a
              href="https://www.instagram.com/fnc_valle/?hl=es-la"
              className={styles.redBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.socialIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
              </span>

              <span className={styles.socialText}>
                <small>Contenido visual</small>
                <strong>Instagram</strong>
              </span>

              <span className={styles.socialArrow}>↗</span>
            </a>

            <a
              href="https://www.facebook.com/FNCValle"
              className={styles.redBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.socialIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </span>

              <span className={styles.socialText}>
                <small>Comunidad</small>
                <strong>Facebook</strong>
              </span>

              <span className={styles.socialArrow}>↗</span>
            </a>

            <a
              href="https://www.youtube.com/@comitecafeterosvalle"
              className={styles.redBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.socialIcon}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />

                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                </svg>
              </span>

              <span className={styles.socialText}>
                <small>Contenido audiovisual</small>
                <strong>YouTube</strong>
              </span>

              <span className={styles.socialArrow}>↗</span>
            </a>
          </div>
        </Reveal>

        <Reveal className={styles.backBtnWrap}>
          <Link to="/#empresa" className={styles.btnBack}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>

            <span>Volver al portafolio</span>
          </Link>
        </Reveal>
      </main>
    </div>
  );
}