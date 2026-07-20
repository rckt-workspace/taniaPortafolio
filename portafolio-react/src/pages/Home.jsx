import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useTilt } from '../hooks/useTilt';
import styles from './Home.module.css';

const METRICAS = [
  {
    value: '39',
    label: 'Municipios cafeteros',
    description:
      'Municipios productores acompañados por la institucionalidad cafetera del Valle del Cauca.',
  },
  {
    value: '23K+',
    label: 'Familias representadas',
    description:
      'Familias caficultoras vinculadas con los procesos institucionales del departamento.',
  },
  {
    value: '6',
    label: 'Meses de práctica',
    description:
      'Periodo de aprendizaje y aplicación profesional dentro del área de comunicaciones.',
  },
];

const AREAS_INTERES = [
  {
    icon: '✦',
    title: 'Comunicación estratégica',
    description:
      'Diseño de procesos comunicativos alineados con objetivos institucionales y sociales.',
  },
  {
    icon: '◈',
    title: 'Contenido institucional',
    description:
      'Creación de contenidos que fortalecen la identidad y el posicionamiento organizacional.',
  },
  {
    icon: '◎',
    title: 'Periodismo social',
    description:
      'Narración de historias humanas, territoriales y comunitarias con enfoque social.',
  },
  {
    icon: '◇',
    title: 'Producción digital',
    description:
      'Creación y adaptación de contenidos para plataformas, formatos y audiencias digitales.',
  },
  {
    icon: '○',
    title: 'Cobertura de eventos',
    description:
      'Registro periodístico, audiovisual y narrativo de actividades institucionales.',
  },
];

function MetricWidget({
  metric,
  index,
  activeMetric,
  onSelect,
}) {
  const isActive = activeMetric === index;

  return (
    <button
      type="button"
      className={`${styles.metricCard} ${
        isActive ? styles.metricCardActive : ''
      }`}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
    >
      <span className={styles.metricIndex}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <strong className={styles.numValue}>
        {metric.value}
      </strong>

      <span className={styles.numLabel}>
        {metric.label}
      </span>

      <span
        className={`${styles.metricDescription} ${
          isActive ? styles.metricDescriptionVisible : ''
        }`}
      >
        {metric.description}
      </span>

      <span className={styles.metricAction}>
        {isActive ? '−' : '+'}
      </span>
    </button>
  );
}

function InterestWidget({
  area,
  index,
  activeArea,
  onSelect,
}) {
  const isActive = activeArea === index;

  return (
    <button
      type="button"
      className={`${styles.skillTag} ${
        isActive ? styles.skillTagActive : ''
      }`}
      onClick={() => onSelect(index)}
      aria-pressed={isActive}
    >
      <span className={styles.skillIcon}>
        {area.icon}
      </span>

      <span className={styles.skillText}>
        <strong>{area.title}</strong>

        <span
          className={`${styles.skillDescription} ${
            isActive
              ? styles.skillDescriptionVisible
              : ''
          }`}
        >
          {area.description}
        </span>
      </span>

      <span className={styles.skillArrow}>
        {isActive ? '−' : '↗'}
      </span>
    </button>
  );
}

export default function Home() {
  const empresaRef = useRef(null);
  const experienciaRef = useRef(null);

  const [activeMetric, setActiveMetric] = useState(0);
  const [activeArea, setActiveArea] = useState(0);
  const [videoExpanded, setVideoExpanded] = useState(false);

  useTilt(empresaRef, {
    maxX: 4,
    maxY: 4,
  });

  useTilt(experienciaRef, {
    maxX: 4,
    maxY: 4,
  });

  return (
    <div className={styles.page}>
      {/* =====================================================
          PORTADA
      ===================================================== */}
      <section
        id="hero"
        className={styles.hero}
        aria-labelledby="home-title"
      >
        <div className={`${styles.blob} ${styles.b1}`} />
        <div className={`${styles.blob} ${styles.b2}`} />
        <div className={styles.heroGridPattern} />

        <div className={styles.heroText}>
          <div className={styles.heroTopLabel}>
            <span className={styles.heroTopDot} />
            Portafolio profesional
          </div>

          <h1
            id="home-title"
            className={styles.heroName}
          >
            <span className={styles.heroMainName}>
              Tania Peláez Valverde
            </span>
          </h1>

          <div className={styles.heroBar} />

          <p className={styles.heroSubtitle}>
            Comunicación Social y Periodismo
          </p>

          <p className={styles.heroEyebrow}>
            Comunicación estratégica con propósito social.
            Conectar, visibilizar y transformar.
          </p>

          <div className={styles.heroPerfil}>
            <div className={styles.heroPerfilHeading}>
              <div>
                <p className={styles.heroPerfilLabel}>
                  Perfil
                </p>

                <h2 className={styles.heroPerfilTitle}>
                  Perfil profesional
                </h2>
              </div>

              <span className={styles.heroPerfilIcon}>
                ✦
              </span>
            </div>

            <p className={styles.heroPerfilSubtitle}>
              Comunicación estratégica con propósito social.
            </p>

            <div className={styles.heroPerfilDescription}>
              <p>
                Soy estudiante de Comunicación Social y
                Periodismo, con interés en la{' '}
                <strong>comunicación estratégica</strong>,
                la creación de contenido institucional y la
                narración de procesos sociales desde una
                perspectiva humana y territorial.
              </p>

              <p>
                Me interesa especialmente el papel de{' '}
                <strong>
                  la comunicación como herramienta
                </strong>{' '}
                para visibilizar iniciativas que generan
                desarrollo, fortalecen comunidades y
                promueven{' '}
                <strong>
                  transformaciones sociales
                </strong>
                .
              </p>

              <p>
                Me caracterizo por ser una persona
                comprometida, creativa y sensible frente a
                las realidades sociales, con interés en
                desarrollar procesos comunicativos que
                integren narrativa,{' '}
                <strong>
                  estrategia y propósito social
                </strong>
                .
              </p>
            </div>
          </div>

          <a
            href="#perfil"
            className={styles.heroCta}
          >
            <span className={styles.heroCtaLine} />

            <span>Descubrir</span>

            <svg
              className={styles.heroCtaArrow}
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />

              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <div className={styles.heroPhoto}>
          <div className={styles.heroFrame}>
            <img
              src={encodeURI('/SecciónPortada.png')}
              alt="Tania Peláez Valverde"
              className={styles.heroFrameImg}
            />

            <div className={styles.heroImageBadge}>
              <span>✦</span>

              <p>
                Comunicación
                <strong>con propósito</strong>
              </p>
            </div>
          </div>

          <a
            href={encodeURI(
              '/CV - Organizacional Prácticas.pdf'
            )}
            download
            className={`${styles.btnCv} ${styles.heroPhotoBtnCv}`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />

              <polyline points="7 10 12 15 17 10" />

              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>

            <span>Descargar hoja de vida</span>
          </a>
        </div>
      </section>

      {/* =====================================================
          PERFIL, MÉTRICAS Y ÁREAS DE INTERÉS
      ===================================================== */}
      <section
        id="perfil"
        className={styles.perfil}
      >
        <div className={styles.wrap}>
          <Reveal className={styles.sectionHeader}>
            <p className={styles.sectionEyebrow}>
              Mi perfil
            </p>

            <h2 className={styles.sectionTitle}>
              Comunicación que conecta
              <span>personas y territorios</span>
            </h2>

            <div className={styles.sectionDivider}>
              <span />
            </div>
          </Reveal>

          <div className={styles.perfilGrid}>
            {/* WIDGET DE PRESENTACIÓN */}
            <Reveal
              delay={0.1}
              className={styles.perfilVideoBlock}
            >
              <button
                type="button"
                className={`${styles.videoWidget} ${
                  videoExpanded
                    ? styles.videoWidgetExpanded
                    : ''
                }`}
                onClick={() =>
                  setVideoExpanded((current) => !current)
                }
                aria-expanded={videoExpanded}
              >
                <div className={styles.videoWidgetTop}>
                  <span className={styles.videoNumber}>
                    01
                  </span>

                  <span className={styles.videoStatus}>
                    Presentación profesional
                  </span>
                </div>

                <div className={styles.videoWidgetCenter}>
                  <span className={styles.videoPlay}>
                    {videoExpanded ? '×' : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </span>

                  <div>
                    <p className={styles.videoLabel}>
                      Conoce mi perfil
                    </p>

                    <h3>
                      Comunicación estratégica con enfoque
                      humano
                    </h3>
                  </div>
                </div>

                <div
                  className={`${styles.videoDetails} ${
                    videoExpanded
                      ? styles.videoDetailsVisible
                      : ''
                  }`}
                >
                  <p>
                    Mi formación integra comunicación
                    institucional, creación de contenidos,
                    producción audiovisual y narración de
                    procesos sociales.
                  </p>

                  <p>
                    Mi propósito es construir mensajes que
                    acerquen a las organizaciones con sus
                    comunidades y permitan visibilizar
                    historias con impacto social.
                  </p>
                </div>

                <div className={styles.videoWidgetBottom}>
                  <span>
                    {videoExpanded
                      ? 'Cerrar presentación'
                      : 'Abrir presentación'}
                  </span>

                  <span>
                    {videoExpanded ? '−' : '↗'}
                  </span>
                </div>
              </button>
            </Reveal>

            <div className={styles.profileSide}>
              {/* MÉTRICAS */}
              <Reveal
                delay={0.2}
                className={styles.metricsWidget}
              >
                <div className={styles.widgetHeading}>
                  <div>
                    <p className={styles.widgetLabel}>
                      Datos destacados
                    </p>

                    <h3>Métricas</h3>
                  </div>

                  <span className={styles.widgetIcon}>
                    ✦
                  </span>
                </div>

                <div className={styles.perfilNumbers}>
                  {METRICAS.map((metric, index) => (
                    <MetricWidget
                      key={metric.label}
                      metric={metric}
                      index={index}
                      activeMetric={activeMetric}
                      onSelect={setActiveMetric}
                    />
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* ÁREAS DE INTERÉS */}
          <Reveal
            delay={0.3}
            className={styles.skillsBlock}
          >
            <div className={styles.skillsHeader}>
              <div>
                <p className={styles.skillsEyebrow}>
                  Enfoque profesional
                </p>

                <h3 className={styles.skillsTitle}>
                  Áreas de interés
                </h3>
              </div>

              <p className={styles.skillsIntro}>
                Selecciona cada área para conocer el enfoque
                que deseo fortalecer profesionalmente.
              </p>
            </div>

            <div className={styles.skillsList}>
              {AREAS_INTERES.map((area, index) => (
                <InterestWidget
                  key={area.title}
                  area={area}
                  index={index}
                  activeArea={activeArea}
                  onSelect={setActiveArea}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          EMPRESA
      ===================================================== */}
      <section
        id="empresa"
        className={styles.empresaSection}
      >
        <div className={styles.wrap}>
          <Reveal delay={0.16}>
            <article
              ref={empresaRef}
              className={styles.empresaCard}
            >
              <div className={styles.empresaImg}>
                <img
                  src="/comiteDeCafeteros.png"
                  alt="Comité de Cafeteros del Valle del Cauca"
                  className={styles.empresaImgReal}
                />

                <div className={styles.imageOverlay} />

                <span className={styles.imageNumber}>
                  01
                </span>

                <div className={styles.imageCaption}>
                  <span>Entidad gremial</span>
                  <strong>Valle del Cauca</strong>
                </div>
              </div>

              <div className={styles.empresaText}>
                <span className={styles.eTag}>
                  Prácticas profesionales
                </span>

                <h2>
                  Comité de Cafeteros del Valle del Cauca
                </h2>

                <p className={styles.empresaSub}>
                  Federación Nacional de Cafeteros · Valle
                  del Cauca, Colombia
                </p>

                <p>
                  <strong>Entidad gremial</strong> encargada
                  de{' '}
                  <strong>
                    representar y acompañar a
                  </strong>{' '}
                  los caficultores del departamento dentro
                  del sistema institucional del café
                  colombiano.
                </p>

                <p>
                  Fundada el 14 de mayo de 1928, agrupa a{' '}
                  <strong>
                    más de 23.000 familias caficultoras
                  </strong>{' '}
                  del <strong>Valle del Cauca</strong>, como
                  parte de la estructura regional de la{' '}
                  <strong>
                    Federación Nacional de Cafeteros de
                    Colombia
                  </strong>
                  .
                </p>

                <Link
                  to="/empresa"
                  className={styles.btnArrow}
                >
                  <span>
                    Conoce más sobre la empresa
                  </span>

                  <span className={styles.btnArrowIcon}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                      />

                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          EXPERIENCIA
      ===================================================== */}
      <section
        id="experiencia"
        className={styles.experienciaSection}
      >
        <div className={styles.wrap}>
          <Reveal delay={0.16}>
            <article
              ref={experienciaRef}
              className={`${styles.empresaCard} ${styles.experienciaCard}`}
            >
              <div className={styles.empresaText}>
                <span className={styles.eTag}>
                  Experiencia profesional
                </span>

                <h2>Mi experiencia</h2>

                <p className={styles.empresaSub}>
                  Comité de Cafeteros del Valle del Cauca ·
                  2026
                </p>

                <p>
                  Actualmente realizo mi práctica
                  profesional en el{' '}
                  <strong>
                    Comité de Cafeteros del Valle del Cauca
                  </strong>
                  , donde apoyo procesos de comunicación
                  institucional orientados a la difusión de
                  proyectos, programas e iniciativas que
                  impactan al{' '}
                  <strong>
                    sector cafetero del departamento
                  </strong>
                  .
                </p>

                <p>
                  Mi experiencia me ha permitido comprender
                  la comunicación como una{' '}
                  <strong>
                    herramienta estratégica
                  </strong>{' '}
                  para fortalecer el vínculo entre la
                  institucionalidad cafetera, los
                  territorios y las comunidades productoras.
                </p>

                <Link
                  to="/experiencia"
                  className={styles.btnArrow}
                >
                  <span>
                    Ver toda mi experiencia
                  </span>

                  <span className={styles.btnArrowIcon}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line
                        x1="5"
                        y1="12"
                        x2="19"
                        y2="12"
                      />

                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </Link>
              </div>

              <div className={styles.empresaImg}>
                <img
                  src="/Experiencia.png"
                  alt="Experiencia profesional en el Comité de Cafeteros del Valle del Cauca"
                  className={styles.empresaImgReal}
                />

                <div className={styles.imageOverlay} />

                <span className={styles.imageNumber}>
                  02
                </span>

                <div className={styles.imageCaption}>
                  <span>Comunicación</span>
                  <strong>Experiencia profesional</strong>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CONTACTO
      ===================================================== */}
      <section
        id="contacto"
        className={styles.contacto}
      >
        <div className={styles.contactDecorationOne} />
        <div className={styles.contactDecorationTwo} />

        <div className={styles.wrap}>
          <Reveal className={styles.contactHeader}>
            <p className={styles.contactEyebrow}>
              Hablemos
            </p>

            <h2 className={styles.contactoTitle}>
              Contacto
            </h2>

            <p className={styles.contactIntro}>
              Puedes comunicarte conmigo a través de estos
              canales para conocer más sobre mi trabajo,
              experiencia y proyectos.
            </p>

            <div className={styles.contactoDiv} />
          </Reveal>

          <Reveal
            delay={0.16}
            className={styles.contactGrid}
          >
            <a
              href="mailto:pelaezvalverdetania@gmail.com"
              className={styles.contactCard}
            >
              <div className={styles.contactCardTop}>
                <span className={styles.contactIcon}>
                  @
                </span>

                <span className={styles.contactArrow}>
                  ↗
                </span>
              </div>

              <span className={styles.cLbl}>
                Correo personal
              </span>

              <span className={styles.cVal}>
                pelaezvalverdetania@gmail.com
              </span>
            </a>

            <a
              href="mailto:tania.pelaez@cafedecolombia.com"
              className={styles.contactCard}
            >
              <div className={styles.contactCardTop}>
                <span className={styles.contactIcon}>
                  ✦
                </span>

                <span className={styles.contactArrow}>
                  ↗
                </span>
              </div>

              <span className={styles.cLbl}>
                Correo institucional
              </span>

              <span className={styles.cVal}>
                tania.pelaez@cafedecolombia.com
              </span>
            </a>

            <a
              href="https://wa.me/573172273408"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactCardTop}>
                <span className={styles.contactIcon}>
                  ◉
                </span>

                <span className={styles.contactArrow}>
                  ↗
                </span>
              </div>

              <span className={styles.cLbl}>
                WhatsApp
              </span>

              <span className={styles.cVal}>
                +57 317 227 3408
              </span>
            </a>

            <a
              href="https://www.instagram.com/tania_0224/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.contactCard}
            >
              <div className={styles.contactCardTop}>
                <span className={styles.contactIcon}>
                  ◎
                </span>

                <span className={styles.contactArrow}>
                  ↗
                </span>
              </div>

              <span className={styles.cLbl}>
                Instagram
              </span>

              <span className={styles.cVal}>
                @tania_0224
              </span>
            </a>

            <div className={styles.contactCard}>
              <div className={styles.contactCardTop}>
                <span className={styles.contactIcon}>
                  ◇
                </span>
              </div>

              <span className={styles.cLbl}>
                Ciudad
              </span>

              <span className={styles.cVal}>
                Cali, Colombia
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}