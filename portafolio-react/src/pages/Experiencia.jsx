import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import styles from './Experiencia.module.css';

const FUNCIONES = [
  {
    number: '01',
    icon: '✦',
    title: 'Comunicación Institucional',
    subtitle: 'Circulación de información',
    back: 'Apoyo en la construcción y difusión de contenidos institucionales, elaboración de boletines internos, carteleras informativas y piezas comunicativas para socializar actividades, proyectos y convocatorias entre las diferentes áreas de la organización.',
  },
  {
    number: '02',
    icon: '◎',
    title: 'Cobertura de Eventos',
    subtitle: 'Periodismo y audiovisual',
    back: 'Cubrimiento periodístico y audiovisual de actividades institucionales: registro fotográfico, producción de entrevistas, documentación de eventos y generación de contenidos digitales. También brindé apoyo logístico para el adecuado desarrollo de las actividades.',
  },
  {
    number: '03',
    icon: '◈',
    title: 'Creación de Contenidos',
    subtitle: 'Narrativas institucionales',
    back: 'Concepción, producción y posproducción de contenidos digitales para redes sociales y canales institucionales del Comité. Construcción de narrativas para visibilizar proyectos, fortalecer la identidad cafetera y acercar la institución a las comunidades.',
  },
];

const INDICADORES = [
  {
    label: 'Área',
    value: 'Comunicación',
    detail:
      'Participación dentro de los procesos de comunicación institucional del Comité.',
  },
  {
    label: 'Modalidad',
    value: 'Práctica',
    detail:
      'Aplicación de conocimientos académicos en un entorno organizacional real.',
  },
  {
    label: 'Enfoque',
    value: 'Humano',
    detail:
      'Comunicación orientada a conectar instituciones, territorios y comunidades.',
  },
];

const HABILIDADES = [
  {
    id: 'comunicativas',
    number: '01',
    title: 'Competencias comunicativas',
    description:
      'Habilidades relacionadas con la creación, adaptación y difusión estratégica de contenidos.',
    items: [
      'Comunicación institucional',
      'Redacción y creación de contenidos',
      'Storytelling organizacional',
      'Cubrimiento periodístico',
      'Producción audiovisual',
      'Gestión de redes sociales',
    ],
  },
  {
    id: 'organizacionales',
    number: '02',
    title: 'Competencias organizacionales',
    description:
      'Capacidades para responder a las dinámicas, tiempos y necesidades de una organización.',
    items: [
      'Planeación y apoyo logístico',
      'Gestión del tiempo',
      'Organización de tareas',
      'Adaptación a entornos dinámicos',
      'Trabajo interdisciplinario',
    ],
  },
  {
    id: 'personales',
    number: '03',
    title: 'Competencias personales',
    description:
      'Cualidades fortalecidas durante el desarrollo de la práctica profesional.',
    items: [
      'Pensamiento estratégico',
      'Proactividad',
      'Liderazgo colaborativo',
      'Empatía social',
      'Resolución de problemas',
      'Disposición al aprendizaje',
    ],
  },
];

function FlipCard({ number, icon, title, subtitle, back }) {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(null);

  useEffect(() => {
    const element = tiltRef.current;

    if (!element) return undefined;

    const handleMove = (event) => {
      if (flipped) return;

      const rectangle = element.getBoundingClientRect();

      const horizontal =
        (event.clientX - rectangle.left) / rectangle.width - 0.5;

      const vertical =
        (event.clientY - rectangle.top) / rectangle.height - 0.5;

      element.style.setProperty(
        '--rotate-y',
        `${horizontal * 10}deg`
      );

      element.style.setProperty(
        '--rotate-x',
        `${vertical * -8}deg`
      );
    };

    const resetTilt = () => {
      element.style.setProperty('--rotate-y', '0deg');
      element.style.setProperty('--rotate-x', '0deg');
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('mouseleave', resetTilt);

    return () => {
      element.removeEventListener('mousemove', handleMove);
      element.removeEventListener('mouseleave', resetTilt);
    };
  }, [flipped]);

  const toggleCard = () => {
    setFlipped((current) => !current);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleCard();
    }
  };

  return (
    <article
      className={styles.expCard}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={`Ver información sobre ${title}`}
      onClick={toggleCard}
      onKeyDown={handleKeyDown}
    >
      <div ref={tiltRef} className={styles.expCardTilt}>
        <div
          className={`${styles.expCardInner} ${
            flipped ? styles.flipped : ''
          }`}
        >
          <div className={styles.expFront}>
            <div className={styles.expFrontTop}>
              <span className={styles.expNumber}>{number}</span>
              <span className={styles.expIcon}>{icon}</span>
            </div>

            <div className={styles.expFrontContent}>
              <p className={styles.expCategory}>Función profesional</p>
              <h3>{title}</h3>
              <p className={styles.expSubtitle}>{subtitle}</p>
            </div>

            <div className={styles.flipHint}>
              <span>Haz clic para conocer más</span>
              <span className={styles.flipArrow}>↗</span>
            </div>
          </div>

          <div className={styles.expBack}>
            <div className={styles.expBackTop}>
              <span className={styles.expNumber}>{number}</span>
              <span className={styles.expBackIcon}>✦</span>
            </div>

            <div className={styles.expBackContent}>
              <p className={styles.expCategory}>Mi participación</p>
              <h3>{title}</h3>
              <p>{back}</p>
            </div>

            <div className={styles.flipHintBack}>
              <span>Volver</span>
              <span>↶</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function ApItem({ direction, numero, titulo, children }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const element = itemRef.current;

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -70px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={itemRef}
      className={`${styles.apItem} ${
        direction === 'left'
          ? styles.fromLeft
          : styles.fromRight
      }`}
    >
      <div className={styles.apDeco}>
        <div className={styles.apTop}>
          <span className={styles.apDecoNum}>{numero}</span>
          <span className={styles.apStar}>✦</span>
        </div>

        <div className={styles.apDecoLine} />

        <h3 className={styles.apDecoTitle}>{titulo}</h3>

        <div className={styles.apContent}>{children}</div>
      </div>
    </article>
  );
}

function SkillWidget({
  skill,
  activeSkill,
  onSelect,
}) {
  const isActive = activeSkill === skill.id;

  return (
    <button
      type="button"
      className={`${styles.skillsCol} ${
        isActive ? styles.skillsColActive : ''
      }`}
      onClick={() => onSelect(skill.id)}
      aria-pressed={isActive}
    >
      <div className={styles.skillTop}>
        <span className={styles.skillNumber}>{skill.number}</span>
        <span className={styles.skillToggle}>
          {isActive ? '−' : '+'}
        </span>
      </div>

      <p className={styles.skillsColTitle}>{skill.title}</p>

      <p className={styles.skillDescription}>
        {skill.description}
      </p>

      <div
        className={`${styles.skillContent} ${
          isActive ? styles.skillContentVisible : ''
        }`}
      >
        <ul>
          {skill.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export default function Experiencia() {
  const [activeIndicator, setActiveIndicator] = useState(0);
  const [activeSkill, setActiveSkill] = useState('comunicativas');

  return (
    <div className={styles.page}>
      <section className={styles.pageHero}>
        <div className={styles.heroCircleOne} />
        <div className={styles.heroCircleTwo} />
        <div className={styles.heroPattern} />

        <div className={styles.heroContent}>
          <Reveal>
            <div className={styles.heroSymbol}>✦</div>
          </Reveal>

          <Reveal delay={0.05}>
            <p className={styles.phEyebrow}>
              Comité de Cafeteros del Valle del Cauca
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className={styles.phTitle}>
              Mi <em>experiencia</em>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className={styles.phSub}>
              Práctica profesional · 2026
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <a href="#introduccion" className={styles.heroButton}>
              <span>Conocer mi experiencia</span>
              <span className={styles.heroButtonIcon}>↓</span>
            </a>
          </Reveal>
        </div>
      </section>

      <main>
        <section
          id="introduccion"
          className={styles.introSection}
        >
          <div className={styles.wrap}>
            <Reveal className={styles.introGrid}>
              <div className={styles.introText}>
                <p className={styles.introLabel}>
                  Contexto profesional
                </p>

                <h2 className={styles.introTitle}>
                  Comunicación con propósito
                </h2>

                <div className={styles.titleDivider} />

                <p>
                  Actualmente realizo mi{' '}
                  <strong>práctica profesional</strong> en el{' '}
                  <strong>
                    Comité de Cafeteros del Valle del Cauca
                  </strong>
                  , entidad adscrita a la{' '}
                  <strong>
                    Federación Nacional de Cafeteros de Colombia
                  </strong>
                  , donde apoyo procesos de comunicación institucional
                  orientados a la difusión de proyectos, programas e
                  iniciativas que impactan al sector cafetero del
                  departamento.
                </p>

                <p>
                  Mi experiencia dentro de la organización me ha
                  permitido comprender la comunicación como una{' '}
                  <strong>herramienta estratégica</strong> para
                  fortalecer el vínculo entre la institucionalidad
                  cafetera, los territorios y las comunidades
                  productoras.
                </p>
              </div>

              <div className={styles.summaryWidget}>
                <div className={styles.summaryHeader}>
                  <div>
                    <p className={styles.summaryEyebrow}>
                      Resumen de experiencia
                    </p>

                    <h3>Mi práctica en tres dimensiones</h3>
                  </div>

                  <span className={styles.summarySymbol}>✦</span>
                </div>

                <div className={styles.indicatorButtons}>
                  {INDICADORES.map((indicator, index) => (
                    <button
                      key={indicator.label}
                      type="button"
                      className={`${styles.indicatorButton} ${
                        activeIndicator === index
                          ? styles.indicatorButtonActive
                          : ''
                      }`}
                      onClick={() => setActiveIndicator(index)}
                    >
                      <span>{indicator.label}</span>
                      <strong>{indicator.value}</strong>
                    </button>
                  ))}
                </div>

                <div className={styles.indicatorDetail}>
                  <span className={styles.indicatorDetailNumber}>
                    {String(activeIndicator + 1).padStart(2, '0')}
                  </span>

                  <p>{INDICADORES[activeIndicator].detail}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.cardsSection}>
          <div className={styles.wrap}>
            <Reveal>
              <p className={styles.cardsLabel}>Lo que hice</p>

              <h2 className={styles.cardsTitle}>
                Mis <span>funciones</span>
              </h2>

              <div className={styles.cardsDiv} />

              <p className={styles.cardsIntro}>
                Interactúa con cada tarjeta para conocer las
                actividades que desarrollé durante mi práctica
                profesional.
              </p>
            </Reveal>

            <Reveal
              delay={0.08}
              className={styles.cardsGrid}
            >
              {FUNCIONES.map((funcion) => (
                <FlipCard
                  key={funcion.title}
                  {...funcion}
                />
              ))}
            </Reveal>
          </div>
        </section>

        <section className={styles.aprendizajesSection}>
          <div className={styles.wrapNarrow}>
            <Reveal>
              <p className={styles.sectionEyebrow}>
                Evolución profesional
              </p>

              <h2 className={styles.apTitle}>
                Aprendizajes
              </h2>

              <div className={styles.cardsDiv} />

              <p className={styles.apIntro}>
                Mi experiencia de práctica profesional en el Comité de
                Cafeteros ha representado un proceso de{' '}
                <strong>
                  crecimiento académico, profesional y humano
                </strong>{' '}
                que me ha permitido fortalecer mi visión de la{' '}
                <strong>
                  comunicación como una herramienta estratégica al
                  servicio de las organizaciones y las comunidades
                </strong>
                .
              </p>
            </Reveal>

            {/* Estos widgets aparecen progresivamente al bajar. */}
            <div className={styles.aprendizajesList}>
              <ApItem
                direction="right"
                numero="01"
                titulo="Comprensión estratégica de la comunicación institucional"
              >
                <p>
                  Uno de los principales aprendizajes ha sido
                  comprender el papel de la comunicación institucional
                  como un eje fundamental para{' '}
                  <strong>
                    fortalecer la relación entre las organizaciones y
                    sus públicos
                  </strong>
                  .
                </p>

                <p>
                  Esta experiencia me permitió entender cómo los
                  procesos comunicativos contribuyen a generar{' '}
                  <strong>cercanía, identidad y confianza</strong>{' '}
                  entre la institucionalidad cafetera y las
                  comunidades productoras del territorio.
                </p>

                <p>
                  Fortalecí mi capacidad para construir contenidos
                  alineados con objetivos organizacionales,
                  reconociendo la importancia de{' '}
                  <strong>
                    comunicar de manera clara, pertinente y
                    estratégica
                  </strong>{' '}
                  en contextos institucionales.
                </p>
              </ApItem>

              <ApItem
                direction="left"
                numero="02"
                titulo="Desarrollo de habilidades en creación de contenidos"
              >
                <p>
                  La participación constante en la producción de
                  contenidos digitales, piezas informativas y
                  cubrimientos institucionales fortaleció mis
                  habilidades en redacción, producción audiovisual,
                  fotografía, documentación de eventos, edición,
                  storytelling organizacional y uso de herramientas de
                  inteligencia artificial.
                </p>

                <p>
                  Este proceso me permitió desarrollar una{' '}
                  <strong>visión más integral</strong> sobre la manera
                  en que los contenidos pueden conectar emocionalmente
                  con las audiencias y transmitir el valor social de
                  las iniciativas institucionales.
                </p>
              </ApItem>

              <ApItem
                direction="right"
                numero="03"
                titulo="Fortalecimiento de capacidades organizacionales"
              >
                <p>
                  El trabajo dentro del área de comunicaciones me
                  permitió{' '}
                  <strong>
                    integrarme a dinámicas interdisciplinarias
                  </strong>{' '}
                  con diferentes equipos y áreas del Comité.
                </p>

                <p>
                  Fortalecí habilidades como trabajo colaborativo,
                  adaptabilidad, organización, gestión del tiempo,
                  comunicación asertiva, resolución de situaciones y
                  capacidad de respuesta frente a múltiples tareas.
                </p>
              </ApItem>

              <ApItem
                direction="left"
                numero="04"
                titulo="Sensibilidad social y comprensión del territorio"
              >
                <p>
                  La experiencia dentro del Comité fortaleció mi{' '}
                  <strong>
                    sensibilidad frente a las realidades sociales y
                    humanas
                  </strong>{' '}
                  presentes en los territorios cafeteros.
                </p>

                <p>
                  Comprendí la importancia de la comunicación como una
                  herramienta para visibilizar historias, fortalecer
                  identidades y generar conexiones entre las
                  instituciones y las personas.
                </p>

                <p>
                  Este aprendizaje reafirmó mi interés por desarrollar
                  procesos comunicativos con{' '}
                  <strong>enfoque humano y propósito social</strong>.
                </p>
              </ApItem>
            </div>
          </div>
        </section>

        <section className={styles.crecimientoSection}>
          <div className={styles.wrapNarrow}>
            <Reveal>
              <p className={styles.sectionEyebrow}>
                Construcción profesional
              </p>

              <h2 className={styles.apTitle}>
                Crecimiento y habilidades desarrolladas
              </h2>

              <div className={styles.cardsDiv} />

              <p className={styles.apSub}>
                Construcción de mi identidad como comunicadora
              </p>

              <p className={styles.apIntro}>
                La práctica profesional representó un espacio de
                transición entre la formación académica y el ejercicio
                profesional, permitiéndome aplicar conocimientos
                adquiridos durante la carrera en escenarios reales de
                comunicación institucional.
              </p>

              <p className={styles.apIntro}>
                Esta experiencia fortaleció mi confianza profesional,
                mi criterio comunicativo y mi capacidad para asumir
                responsabilidades dentro de un entorno organizacional.
                También me permitió consolidar una visión más clara
                sobre el tipo de comunicación que deseo ejercer:{' '}
                <strong>
                  estratégica, humana y orientada a generar impacto
                  positivo
                </strong>
                .
              </p>
            </Reveal>

            {/* Esta sección aparece al entrar en el área visible. */}
            <Reveal delay={0.1}>
              <p className={styles.skillsHeading}>
                Selecciona una categoría
              </p>

              <div className={styles.skillsCols}>
                {HABILIDADES.map((skill) => (
                  <SkillWidget
                    key={skill.id}
                    skill={skill}
                    activeSkill={activeSkill}
                    onSelect={setActiveSkill}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.ctaDecorationOne} />
          <div className={styles.ctaDecorationTwo} />

          <div className={styles.wrap}>
            <Reveal
              as="p"
              className={styles.ctaQuote}
            >
              Mi experiencia en el Comité de Cafeteros del Valle del
              Cauca me ha permitido fortalecer competencias en
              comunicación organizacional, producción audiovisual,
              creación de contenidos y estrategias institucionales,
              comprendiendo el valor de la comunicación como una
              herramienta capaz de{' '}
              <em>
                conectar organizaciones, territorios y comunidades
              </em>{' '}
              desde un enfoque humano y social.
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                to="/portafolio"
                className={styles.btnCta}
              >
                <span>Conoce mi trabajo</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
}