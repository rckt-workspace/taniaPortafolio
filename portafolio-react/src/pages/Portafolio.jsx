import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Lightbox from '../components/publicaciones/Lightbox';
import PublicacionCard from '../components/publicaciones/PublicacionCard';
import cardStyles from '../components/publicaciones/PublicacionCard.module.css';
import ExoticCarousel from '../components/carousel/ExoticCarousel';
import { categorias } from '../data/publicaciones';
import styles from './Portafolio.module.css';

/* =========================================================
   ESTADÍSTICAS DE LAS PUBLICACIONES
========================================================= */

const PUBLICATION_STATS = {
  elecciones: [
    { likes: 338, comments: 80 },
    { likes: 418, comments: 58 },
    { likes: 367, comments: 19 },
    { likes: 535, comments: 31 },
    { likes: 134, comments: 16 },
    { likes: 173, comments: 27 },
    { likes: 170, comments: 65 },
  ],

  esdelc: [
    { likes: 242, comments: 35 },
    { likes: 331, comments: 66 },
    { likes: 493, comments: 125 },
    { likes: 156, comments: 49 },
    { likes: 400, comments: 23 },
    { likes: 138, comments: 16 },
    { likes: 499, comments: 54 },
    { likes: 110, comments: 49 },
  ],

  cobertura: [
    { likes: 148, comments:31 },
    { likes: 183, comments: 60 },
    { likes: 177, comments: 79 },
    { likes: 126, comments: 33 },
    { likes: 177, comments: 79 },
    { likes: 126, comments: 33 },
    { likes: 138, comments: 10 },
    { likes: 109, comments: 36 },
    { likes: 126, comments: 45 },
    { likes: 146, comments: 69 },
    { likes: 77, comments: 29 },

  ],
};

/* =========================================================
   IMÁGENES DE LAS SECCIONES
========================================================= */

const SECTION_IMAGES = {
  esdelc: 'ESDELC.png',
  cobertura: 'Cubrimiento fotográfico y audiovisual.png',
};

/* =========================================================
   INFORMACIÓN DEL ANÁLISIS
========================================================= */

const ANALYSIS_PLATFORMS = [
  {
    id: 'facebook',
    name: 'Facebook',
    followers: '10.000',
    role: 'Informar y mantener la confianza',
    audience: 'Caficultores 40+ · votantes',
    consumption: 'Lento · denso · informativo',
    formats: 'Carruseles · historias · imágenes',
    topic: 'Elecciones · Federación · datos técnicos',
    metric:
      'Alcance y retención · interacción principalmente pasiva',
  },

  {
    id: 'instagram',
    name: 'Instagram',
    followers: '7.564',
    role: 'Informar y activar a los jóvenes',
    audience: 'Caficultores 40+ y jóvenes del sector',
    consumption: 'Rápido · scroll · visual',
    formats: 'Reels · tendencias · formatos híbridos',
    topic: 'Testimonios · campo · contenido de interacción',
    metric:
      'Alcance y retención · objetivo: activar a los jóvenes',
  },
];

const ANALYSIS_PUBLICS = [
  {
    number: '01',
    name: 'Caficultores 40+',
    channel: 'Votantes principales · Facebook',
    preference:
      'Prefieren información clara, técnica, útil y contextualizada.',
    function: 'Votar',
  },

  {
    number: '02',
    name: 'Jóvenes del sector',
    channel: 'Extensionistas y empleados · Instagram',
    preference:
      'Prefieren reels, tendencias, dinamismo y contenidos visuales.',
    function: 'Movilizar',
  },

  {
    number: '03',
    name: 'Amantes del café',
    channel: 'Público urbano secundario · ambas plataformas',
    preference:
      'Prefieren historias reales, información sencilla y contenidos humanos.',
    function: 'Interesar',
  },
];

const EXECUTION_KEYS = [
  'Medir alcance y retención',
  'Priorizar personas reales',
  'Trabajar dos mensajes en paralelo',
  'Convertir una salida en hasta cinco piezas',
  'Los mayores votan y los jóvenes movilizan',
];

/* =========================================================
   OBJETIVOS DE TU VOTO, TU GREMIO
========================================================= */

const OBJECTIVES = [
  {
    number: '01',
    title: 'Conectar emocionalmente',
    text: 'Conectar emocionalmente con el caficultor, reforzando su sentido de pertenencia y orgullo de ser parte del gremio.',
  },

  {
    number: '02',
    title: 'Comunicar con claridad',
    text: 'Comunicar los derechos y beneficios que defiende la Federación, el rol de los representantes y los casos reales de respaldo al caficultor.',
  },

  {
    number: '03',
    title: 'Proyectar el futuro',
    text: 'Proyectar una visión de futuro y generar urgencia en la participación electoral, entendiendo que elegir bien es defender la institución que protege al gremio.',
  },
];

/* =========================================================
   PILARES DE TU VOTO, TU GREMIO
========================================================= */

const PILLARS = [
  {
    id: 'identidad',
    number: '01',
    shortTitle: 'Identidad y orgullo',
    title: 'Pilar 1: Identidad y orgullo',
    concept: 'El corazón',
    focus: 'Emoción, pertenencia y democracia',
    icon: '♥',

    description:
      'Este pilar busca conectar emocionalmente con el caficultor federado, recordándole que ser parte de la Federación Nacional de Cafeteros no es solamente un trámite administrativo, sino una identidad compartida, un sentido de comunidad y pertenencia. Se trata de fortalecer el orgullo de ser cafetero y reconocer que, a través de la cédula cafetera, los productores tienen poder real para elegir quién los representa.',

    themes: [
      {
        title: 'Testimonios de caficultores',
        text: 'Historias reales de caficultores beneficiados por programas, políticas o gestiones de la Federación. Estos testimonios humanizan la organización y permiten que otros productores vean su propia historia reflejada.',
      },

      {
        title: 'Historias de éxito gremial',
        text: 'Narrativas que muestran cómo la acción colectiva ha generado cambios concretos: mejores condiciones, acceso a tecnología, resolución de conflictos y defensa durante momentos de crisis.',
      },

      {
        title: 'Humanización de representantes',
        text: 'Mostrar quiénes son los candidatos y representantes, sus historias, territorios, motivaciones y trabajo, para que el caficultor los perciba como personas cercanas y comprometidas.',
      },
    ],

    proposal: {
      format: 'Reel testimonial de 60 a 90 segundos',
      network: 'Instagram',
      title: 'Mi cédula cafetera, mi historia',
      idea:
        'Un extensionista visita diferentes municipios y pregunta a tres o cuatro caficultores qué significa para ellos su cédula cafetera. Las respuestas se presentan como un mosaico ágil y emotivo, con frases clave en pantalla y un llamado final a participar en las elecciones.',
    },
  },

  {
    id: 'confianza',
    number: '02',
    shortTitle: 'Solidez y confianza',
    title: 'Pilar 2: Solidez y confianza',
    concept: 'La razón',
    focus: 'Recursos, resultados e importancia de la Federación',
    icon: '◆',

    description:
      'Este pilar apela a la lógica y a la razón. Busca comunicar que la Federación Nacional de Cafeteros es una institución sólida, que maneja recursos responsablemente y que su gestión genera beneficios concretos y medibles para los caficultores federados. El productor necesita comprender qué derechos defiende la Federación y cómo los representantes elegidos protegen esas decisiones.',

    themes: [
      {
        title: 'Derechos y beneficios',
        text: 'Explicar de forma clara la defensa del precio del café, el acceso a crédito, la asistencia técnica, la seguridad social y la protección frente a las fluctuaciones del mercado.',
      },

      {
        title: 'Rol de los representantes',
        text: 'Mostrar qué hace un representante electo, cómo participa en las decisiones del gremio y por qué el voto incide directamente en políticas, recursos y derechos.',
      },

      {
        title: 'Respaldo al caficultor',
        text: 'Presentar casos concretos de negociación, crédito, asistencia técnica, productividad y defensa institucional que demuestren que la organización respalda al productor.',
      },
    ],

    proposal: {
      format: 'Carrusel informativo de 5 a 6 láminas',
      network: 'Facebook',
      title: 'Esto hace tu Federación por ti',
      idea:
        'Una serie visual con cifras, íconos y beneficios tangibles gestionados por la Federación Nacional de Cafeteros. La última lámina conecta esos resultados con la responsabilidad de elegir bien a quienes representan al caficultor.',
    },
  },

  {
    id: 'futuro',
    number: '03',
    shortTitle: 'Futuro y defensa',
    title: 'Pilar 3: Futuro y defensa',
    concept: 'La acción',
    focus: 'Rumbo y defensa de la institución',
    icon: '↗',

    description:
      'Este pilar proyecta una visión de futuro para el café colombiano y el gremio cafetero. Recuerda que elegir bien es invertir en el futuro de las familias productoras y de las nuevas generaciones. Ante amenazas como el mercado global, el cambio climático y la competencia, la Federación funciona como un escudo colectivo.',

    themes: [
      {
        title: 'El futuro del café',
        text: 'Comunicar los desafíos relacionados con el clima, la volatilidad de precios, la competencia internacional y el relevo generacional, junto con las propuestas para proteger el sector.',
      },

      {
        title: 'La importancia de elegir bien',
        text: 'Reforzar que la elección tiene consecuencias directas: representantes comprometidos fortalecen la Federación y protegen mejor los derechos y beneficios del productor.',
      },

      {
        title: 'Legitimidad del proceso',
        text: 'Demostrar que el proceso es transparente, democrático y representativo, y que el poder de la Federación proviene de caficultores que deciden juntos.',
      },
    ],

    proposal: {
      format: 'Video híbrido de 45 a 60 segundos',
      network: 'Instagram y Facebook',
      title: 'El café que viene',
      idea:
        'Un candidato o representante habla sobre un reto concreto del café mientras una animación sencilla ayuda a explicar el problema. El video cierra con la frase: “Tu voto decide quién defiende este futuro”.',
    },
  },
];

/* =========================================================
   CATEGORÍAS DISPONIBLES
========================================================= */

const ELECTION_CATEGORY = categorias.find(
  (categoria) => categoria.id === 'elecciones'
);

const ESDELC_CATEGORY = categorias.find(
  (categoria) => categoria.id === 'esdelc'
);

/* =========================================================
   CARRUSELES DE TU VOTO, TU GREMIO
========================================================= */

const VOTE_CAROUSEL_1 = [
  '/portafolio/carrusel1/imagen1.png',
  '/portafolio/carrusel1/imagen2.png',
  '/portafolio/carrusel1/imagen3.png',
];

const VOTE_CAROUSEL_2 = [
  '/portafolio/carrusel2/imagen1.png',
  '/portafolio/carrusel2/imagen2.png',
  '/portafolio/carrusel2/imagen3.jpg',
];

const COBERTURA_CATEGORY = categorias.find(
  (categoria) => categoria.id === 'cobertura'
);

const VISIBLE_CATEGORIES = [
  ESDELC_CATEGORY
    ? {
        ...ESDELC_CATEGORY,
        numero: '02',
      }
    : null,

  COBERTURA_CATEGORY
    ? {
        ...COBERTURA_CATEGORY,
        numero: '03',
        titulo: 'Más allá del lente',
        subtitulo: 'Cubrimiento fotográfico y audiovisual',
      }
    : null,
].filter(Boolean);

const SECTIONS = [
  {
    id: 'voto-tu-gremio',
    numero: '01',
    label: 'Tu voto, tu gremio',
  },

  ...VISIBLE_CATEGORIES.map((categoria) => ({
    id: categoria.id,
    numero: categoria.numero,
    label:
      categoria.id === 'cobertura'
        ? 'Más allá del lente'
        : categoria.titulo,
  })),
];

/* =========================================================
   COMPONENTES AUXILIARES
========================================================= */

function SectionImage({ file, alt, delay = 0.1 }) {
  if (!file) return null;

  return (
    <Reveal delay={delay} className={styles.secIntroImage}>
      <img
        src={`/portafolio/${encodeURIComponent(file)}`}
        alt={alt}
      />
    </Reveal>
  );
}

function StatIcon({ type }) {
  if (type === 'comments') {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z" />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function VoteCarouselCard() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;

    document.body.style.overflow = 'hidden';

    function handleKey(e) {
      if (e.key === 'Escape') setExpanded(false);
    }

    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKey);
    };
  }, [expanded]);

  return (
    <>
      <article className={styles.publicacionItem}>
        <div className={cardStyles.card}>
          <div className={cardStyles.thumb}>
            <ExoticCarousel
              media={VOTE_CAROUSEL_1}
              compact
              onOpen={() => setExpanded(true)}
            />
          </div>

          <div className={cardStyles.meta}>
            <span className={cardStyles.num}>
              Publicación 00
            </span>
          </div>
        </div>
      </article>

      {expanded &&
        createPortal(
          <div
            className={styles.voteCarouselOverlay}
            onClick={(e) =>
              e.target === e.currentTarget &&
              setExpanded(false)
            }
          >
            <button
              type="button"
              className={styles.voteCarouselClose}
              onClick={() => setExpanded(false)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Cerrar
            </button>

            <ExoticCarousel media={VOTE_CAROUSEL_1} />
          </div>,
          document.body
        )}
    </>
  );
}

function PublicationGrid({ categoria, onOpen, leading }) {
  if (!categoria?.publicaciones?.length) {
    return leading ? (
      <div className={styles.pubGrid}>{leading}</div>
    ) : (
      <p className={styles.emptyPublications}>
        No hay publicaciones disponibles en esta sección.
      </p>
    );
  }

  const stats = PUBLICATION_STATS[categoria.id] ?? [];

  return (
    <div className={styles.pubGrid}>
      {leading}

      {categoria.publicaciones.map((publicacion, index) => {
        const itemStats = stats[index];

        return (
          <article
            key={`${categoria.id}-${index}`}
            className={styles.publicacionItem}
          >
            <PublicacionCard
              media={publicacion.media}
              numero={String(index + 1).padStart(2, '0')}
              onOpen={onOpen}
            />

            {itemStats && (
              <div className={styles.publicacionStats}>
                <span
                  className={styles.publicacionStat}
                  title="Me gusta"
                >
                  <StatIcon type="likes" />

                  <span>{itemStats.likes}</span>
                </span>

                <span
                  className={styles.publicacionStat}
                  title="Comentarios"
                >
                  <StatIcon type="comments" />

                  <span>{itemStats.comments}</span>
                </span>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

function AccordionSection({
  id,
  alternate = false,
  isOpen,
  children,
}) {
  return (
    <section
      id={id}
      className={`${styles.portSection} ${
        alternate ? styles.portSectionAlt : ''
      } ${isOpen ? styles.portSectionOpen : ''}`}
    >
      <div className={styles.wrap}>
        <div
          className={`${styles.sectionCollapse} ${
            isOpen ? styles.sectionCollapseOpen : ''
          }`}
        >
          <div className={styles.sectionCollapseInner}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECCIÓN DE ANÁLISIS
   ESTA SECCIÓN SIEMPRE ESTÁ ENCIMA DE LOS BOTONES
========================================================= */

function AnalysisSection() {
  const [activePlatform, setActivePlatform] =
    useState('facebook');

  const [activePublic, setActivePublic] = useState(0);

  return (
    <section
      id="analisis"
      className={styles.analysisSection}
    >
      <div className={styles.wrap}>
        <Reveal className={styles.analysisHeader}>
          <div>
            <p className={styles.analysisEyebrow}>
              Diagnóstico digital
            </p>

            <h2 className={styles.analysisMainTitle}>
              Análisis
            </h2>

            <p className={styles.analysisIntro}>
              Lectura estratégica de las plataformas,
              audiencias, formatos y comportamientos que
              orientaron la propuesta de comunicación
              electoral.
            </p>

            <div className={styles.analysisRule} />
          </div>

          <div className={styles.analysisSummary}>
            <span>Objetivo central</span>

            <strong>
              Convertir alcance en participación
            </strong>

            <p>
              Los caficultores deciden y los jóvenes
              movilizan.
            </p>
          </div>
        </Reveal>

        {/* FACEBOOK E INSTAGRAM */}

        <Reveal
          delay={0.08}
          className={styles.analysisPlatformsGrid}
        >
          {ANALYSIS_PLATFORMS.map((platform) => {
            const isActive =
              activePlatform === platform.id;

            return (
              <button
                key={platform.id}
                type="button"
                className={`${styles.analysisPlatformCard} ${
                  isActive
                    ? styles.analysisPlatformCardActive
                    : ''
                }`}
                onClick={() =>
                  setActivePlatform(platform.id)
                }
                aria-pressed={isActive}
              >
                <div
                  className={styles.analysisPlatformHeader}
                >
                  <div>
                    <span>Plataforma</span>
                    <h3>{platform.name}</h3>
                  </div>

                  <div
                    className={
                      styles.analysisPlatformFollowers
                    }
                  >
                    <strong>{platform.followers}</strong>
                    <small>Seguidores</small>
                  </div>
                </div>

                <dl className={styles.analysisPlatformList}>
                  <div>
                    <dt>Rol estratégico</dt>
                    <dd>{platform.role}</dd>
                  </div>

                  <div>
                    <dt>Audiencia central</dt>
                    <dd>{platform.audience}</dd>
                  </div>

                  <div>
                    <dt>Tipo de consumo</dt>
                    <dd>{platform.consumption}</dd>
                  </div>

                  <div>
                    <dt>Formatos principales</dt>
                    <dd>{platform.formats}</dd>
                  </div>

                  <div>
                    <dt>Temas con mejor respuesta</dt>
                    <dd>{platform.topic}</dd>
                  </div>
                </dl>

                <div
                  className={styles.analysisPlatformMetric}
                >
                  <span>Métrica prioritaria</span>
                  <p>{platform.metric}</p>
                </div>

                <span
                  className={styles.analysisPlatformAction}
                >
                  {isActive ? '✓' : '↗'}
                </span>
              </button>
            );
          })}
        </Reveal>

        <Reveal
          delay={0.1}
          className={styles.platformInsight}
        >
          <span>Lectura estratégica</span>

          <p>
            {activePlatform === 'facebook'
              ? 'Facebook funciona como el canal principal para informar, explicar y fortalecer la confianza de los caficultores con mayor intención de voto.'
              : 'Instagram funciona como el canal para activar audiencias jóvenes, ampliar el alcance y presentar el proceso gremial mediante contenidos dinámicos y visuales.'}
          </p>
        </Reveal>

        {/* TRES PÚBLICOS, TRES FUNCIONES */}

        <Reveal
          delay={0.14}
          className={styles.audiencesSection}
        >
          <div className={styles.audiencesHeading}>
            <div>
              <p className={styles.analysisEyebrow}>
                Segmentación
              </p>

              <h3>Tres públicos</h3>
            </div>

            <strong>Tres funciones</strong>
          </div>

          <div className={styles.audiencesGrid}>
            {ANALYSIS_PUBLICS.map((item, index) => {
              const isActive = activePublic === index;

              return (
                <button
                  key={item.name}
                  type="button"
                  className={`${styles.audienceCard} ${
                    isActive
                      ? styles.audienceCardActive
                      : ''
                  }`}
                  onClick={() => setActivePublic(index)}
                  aria-pressed={isActive}
                >
                  <div className={styles.audienceTop}>
                    <span>{item.number}</span>

                    <span>{isActive ? '−' : '+'}</span>
                  </div>

                  <h4>{item.name}</h4>

                  <p className={styles.audienceChannel}>
                    {item.channel}
                  </p>

                  <div
                    className={`${styles.audienceDetails} ${
                      isActive
                        ? styles.audienceDetailsVisible
                        : ''
                    }`}
                  >
                    <p>{item.preference}</p>
                  </div>

                  <strong>
                    Función: {item.function}
                  </strong>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* CLAVES DE EJECUCIÓN */}

        <Reveal
          delay={0.18}
          className={styles.executionWidget}
        >
          <div className={styles.executionHeading}>
            <span>Claves de ejecución</span>

            <strong>05 decisiones estratégicas</strong>
          </div>

          <ol className={styles.executionList}>
            {EXECUTION_KEYS.map((key, index) => (
              <li key={key}>
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <p>{key}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   CONTENIDO DEL BOTÓN TU VOTO, TU GREMIO
========================================================= */

function VoteCampaignSection({ onOpen }) {
  const [activePillar, setActivePillar] = useState(0);

  const [showCampaignPieces, setShowCampaignPieces] =
    useState(false);

  const pillar = PILLARS[activePillar];

  return (
    <div className={styles.voteCampaignContent}>
      <Reveal className={styles.voteCampaignHeader}>
        <div>
          <p className={styles.campaignEyebrow}>
            Estrategia electoral 2026
          </p>

          <h2 className={styles.campaignTitle}>
            Tu voto, <em>tu gremio</em>
          </h2>

          <p className={styles.campaignLead}>
            Estrategia para fortalecer la identidad, la
            confianza y la participación de los
            caficultores federados durante las elecciones
            cafeteras de 2026.
          </p>
        </div>

        <div className={styles.campaignDates}>
          <div>
            <span>Inscripciones</span>
            <strong>Hasta el 24 de julio</strong>
          </div>

          <div>
            <span>Votación</span>
            <strong>1 al 6 de septiembre</strong>
          </div>
        </div>
      </Reveal>

      {/* OBJETIVO GENERAL */}

      <Reveal
        delay={0.08}
        className={styles.voteGoalWidget}
      >
        <div className={styles.voteGoalTop}>
          <span className={styles.voteGoalLabel}>
            Objetivo general
          </span>

          <span className={styles.voteGoalIcon}>
            ✦
          </span>
        </div>

        <p className={styles.voteGoalText}>
          Movilizar a los caficultores federados con cédula
          cafetera a participar activamente en las
          elecciones cafeteras 2026, fortaleciendo su
          confianza en la Federación Nacional de
          Cafeteros, reconociendo el impacto real de la
          organización en sus derechos y beneficios, y
          comprendiendo que elegir bien a sus
          representantes es elegir proteger su futuro
          económico y el del gremio.
        </p>
      </Reveal>

      {/* OBJETIVOS ESPECÍFICOS */}

      <div className={styles.objectivesHeading}>
        <span>Objetivos específicos</span>
        <div />
      </div>

      <div className={styles.objectivesGrid}>
        {OBJECTIVES.map((objective) => (
          <article
            key={objective.number}
            className={styles.objectiveCard}
          >
            <span className={styles.objectiveNumber}>
              {objective.number}
            </span>

            <h3>{objective.title}</h3>

            <p>{objective.text}</p>
          </article>
        ))}
      </div>

      {/* PILARES */}

      <div className={styles.pillarsHeader}>
        <div>
          <p className={styles.campaignEyebrow}>
            Arquitectura de campaña
          </p>

          <h3>Tres pilares estratégicos</h3>
        </div>

        <p>
          Selecciona cada pilar para explorar su enfoque,
          las temáticas y la propuesta de contenido.
        </p>
      </div>

      <div
        className={styles.pillarTabs}
        role="tablist"
        aria-label="Pilares estratégicos"
      >
        {PILLARS.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activePillar === index}
            className={`${styles.pillarTab} ${
              activePillar === index
                ? styles.pillarTabActive
                : ''
            }`}
            onClick={() => setActivePillar(index)}
          >
            <span className={styles.pillarTabNumber}>
              {item.number}
            </span>

            <span className={styles.pillarTabIcon}>
              {item.icon}
            </span>

            <strong>{item.shortTitle}</strong>

            <small>{item.concept}</small>
          </button>
        ))}
      </div>

      <div className={styles.pillarPanel}>
        <div className={styles.pillarPanelHeader}>
          <div>
            <p className={styles.pillarConcept}>
              {pillar.concept} · {pillar.focus}
            </p>

            <h3>{pillar.title}</h3>
          </div>

          <span className={styles.pillarLargeNumber}>
            {pillar.number}
          </span>
        </div>

        <p className={styles.pillarDescription}>
          {pillar.description}
        </p>

        <div className={styles.themesGrid}>
          {pillar.themes.map((theme, index) => (
            <article
              key={theme.title}
              className={styles.themeCard}
            >
              <span>
                {pillar.number}.{index + 1}
              </span>

              <h4>{theme.title}</h4>

              <p>{theme.text}</p>
            </article>
          ))}
        </div>

        <div className={styles.proposalWidget}>
          <div className={styles.proposalHeading}>
            <span>Propuesta creativa</span>

            <strong>{pillar.proposal.network}</strong>
          </div>

          <div className={styles.proposalContent}>
            <div>
              <small>Formato</small>
              <p>{pillar.proposal.format}</p>
            </div>

            <div>
              <small>Propuesta</small>
              <h4>{pillar.proposal.title}</h4>
              <p>{pillar.proposal.idea}</p>
            </div>
          </div>
        </div>
      </div>

      {/* PUBLICACIONES ELECTORALES */}

      {ELECTION_CATEGORY && (
        <div className={styles.campaignPieces}>
          <button
            type="button"
            className={`${styles.campaignPiecesButton} ${
              showCampaignPieces
                ? styles.campaignPiecesButtonOpen
                : ''
            }`}
            onClick={() =>
              setShowCampaignPieces((current) => !current)
            }
            aria-expanded={showCampaignPieces}
          >
            <span>
              <small>Producción de campaña</small>

              <strong>
                Ver piezas de “Tu voto, tu gremio”
              </strong>
            </span>

            <span className={styles.campaignPiecesIcon}>
              {showCampaignPieces ? '−' : '+'}
            </span>
          </button>

          <div
            className={`${styles.campaignPiecesCollapse} ${
              showCampaignPieces
                ? styles.campaignPiecesCollapseOpen
                : ''
            }`}
          >
            <div
              className={
                styles.campaignPiecesCollapseInner
              }
            >
              <PublicationGrid
                categoria={ELECTION_CATEGORY}
                onOpen={onOpen}
                leading={<VoteCarouselCard />}
              />
            </div>
          </div>
        </div>
      )}

      <Reveal className={styles.voteCarouselBottom}>
        <ExoticCarousel media={VOTE_CAROUSEL_2} reverse />
      </Reveal>
    </div>
  );
}

/* =========================================================
   BOTONES DE NAVEGACIÓN
========================================================= */

function PortfolioNavigation({
  openSection,
  onSelect,
}) {
  return (
    <section
      className={styles.portNavWrap}
      aria-labelledby="portfolio-nav-title"
    >
      <div className={styles.wrap}>
        <Reveal className={styles.portNavHeading}>
          <div>
            <p className={styles.navEyebrow}>
              Explora el portafolio
            </p>

            <h2 id="portfolio-nav-title">
              Proyectos y contenidos
            </h2>
          </div>

          <p>
            Selecciona uno de los tres proyectos para abrir
            su contenido.
          </p>
        </Reveal>

        <nav
          className={styles.portNav}
          aria-label="Secciones del portafolio"
        >
          {SECTIONS.map((section) => {
            const isActive =
              openSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                aria-pressed={isActive}
                className={`${styles.portNavItem} ${
                  isActive
                    ? styles.portNavItemActive
                    : ''
                }`}
                onClick={() => onSelect(section.id)}
              >
                <span className={styles.portNavNum}>
                  {section.numero}
                </span>

                <span className={styles.portNavText}>
                  <small>Proyecto</small>
                  <strong>{section.label}</strong>
                </span>

                <span className={styles.portNavArrow}>
                  {isActive ? '−' : '↗'}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

/* =========================================================
   SECCIONES #ESDELC Y MÁS ALLÁ DEL LENTE
========================================================= */

function CategoriaSection({ categoria, onOpen }) {
  const [showPublications, setShowPublications] =
    useState(false);

  const title =
    categoria.id === 'cobertura'
      ? 'Más allá del lente'
      : categoria.titulo;

  const subtitle =
    categoria.id === 'cobertura'
      ? 'Cubrimiento fotográfico y audiovisual'
      : categoria.subtitulo;

  return (
    <div className={styles.categoryShell}>
      <div
        className={`${styles.secIntro} ${
          categoria.id === 'cobertura'
            ? styles.secIntroCobertura
            : ''
        }`}
      >
        <div className={styles.secIntroText}>
          <Reveal className={styles.secHead}>
            <div className={styles.secHeadLeft}>
              <span className={styles.secNum}>
                {categoria.numero}
              </span>

              <div>
                <p className={styles.secLabel}>
                  {categoria.label ??
                    'Producción de contenidos'}
                </p>

                <h2 className={styles.secTitle}>
                  {title}
                </h2>

                <div className={styles.secRule} />
              </div>
            </div>
          </Reveal>

          {subtitle && (
            <Reveal
              delay={0.05}
              as="p"
              className={styles.secSubtitulo}
            >
              {subtitle}
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
                showPublications ? styles.open : ''
              }`}
              onClick={() =>
                setShowPublications(
                  (current) => !current
                )
              }
              aria-expanded={showPublications}
            >
              <span>
                {showPublications
                  ? 'Ocultar publicaciones'
                  : 'Ver publicaciones'}
              </span>

              <span className={styles.verMasIcon}>
                {showPublications ? '−' : '+'}
              </span>
            </button>
          </Reveal>
        </div>

        <SectionImage
          file={SECTION_IMAGES[categoria.id]}
          alt={
            categoria.id === 'cobertura'
              ? 'Cubrimiento fotográfico y audiovisual'
              : title
          }
        />
      </div>

      <div
        className={`${styles.expandable} ${
          showPublications
            ? styles.expandableOpen
            : ''
        }`}
      >
        <div className={styles.expandableInner}>
          <PublicationGrid
            categoria={categoria}
            onOpen={onOpen}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function Portafolio() {
  const [active, setActive] = useState(null);

  const [openSection, setOpenSection] = useState(
    'voto-tu-gremio'
  );

  const handleSectionSelect = (sectionId) => {
    const shouldOpen = openSection !== sectionId;

    setOpenSection(shouldOpen ? sectionId : null);

    if (shouldOpen) {
      // Espera a que termine la transición de colapso/expansión
      // (0.55s en .sectionCollapse) antes de desplazar, para que
      // el cambio de altura no compita con el scroll y lo desvíe.
      window.setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
      }, 600);
    }
  };

  return (
    <div className={styles.page}>
      {/* PORTADA */}

      <header className={styles.pageHero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroCircleOne} />
        <div className={styles.heroCircleTwo} />

        <Reveal>
          <p className={styles.phEyebrow}>
            Comité de Cafeteros del Valle del Cauca
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className={styles.phTitle}>
            Mi <em>portafolio</em>
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className={styles.phSub}>
            Trabajo realizado durante la práctica
            profesional · 2026
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <a
            href="#presentacion-portafolio"
            className={styles.heroButton}
          >
            <span>Explorar proyectos</span>
            <span>↓</span>
          </a>
        </Reveal>
      </header>

      <main>
        {/* PRESENTACIÓN */}

        <section
          id="presentacion-portafolio"
          className={styles.introSection}
        >
          <div className={styles.wrap}>
            <div className={styles.introGrid}>
              <Reveal className={styles.portadaImage}>
                <img
                  src={`/portafolio/${encodeURIComponent(
                    'portadaPortafolio.png'
                  )}`}
                  alt="Portafolio de Tania Peláez Valverde"
                />

                <div className={styles.portadaBadge}>
                  <span>✦</span>

                  <p>
                    Comunicación
                    <strong>con propósito</strong>
                  </p>
                </div>
              </Reveal>

              <Reveal
                delay={0.08}
                className={styles.textBlock}
              >
                <p className={styles.introEyebrow}>
                  Una experiencia en construcción
                </p>

                <h2 className={styles.introTitle}>
                  Comunicar también es
                  <em> construir gremio</em>
                </h2>

                <div className={styles.introRule} />

                <p>
                  Este portafolio reúne el trabajo que
                  desarrollé durante mis prácticas
                  profesionales en el Comité de Cafeteros
                  del Valle del Cauca, específicamente en
                  el{' '}
                  <strong>
                    área de Comunicaciones
                  </strong>
                  .
                </p>

                <p>
                  Llegué a una institución con más de 98
                  años de historia, un territorio extenso,
                  públicos diversos y un reto concreto:
                  acercar una organización gremial sólida a
                  las personas que la sostienen todos los
                  días desde sus fincas.
                </p>

                <p>
                  Cada pieza tiene detrás una decisión
                  estratégica, una lectura del contexto y
                  una intención clara:{' '}
                  <strong>
                    comunicar también es construir gremio.
                  </strong>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* EL ANÁLISIS VA ENCIMA DE LOS BOTONES */}

        <AnalysisSection />

        {/* LOS TRES BOTONES */}

        <PortfolioNavigation
          openSection={openSection}
          onSelect={handleSectionSelect}
        />

        {/* CONTENIDO DE LOS BOTONES */}

        <div className={styles.categorySections}>
          <AccordionSection
            id="voto-tu-gremio"
            isOpen={
              openSection === 'voto-tu-gremio'
            }
          >
            <VoteCampaignSection
              onOpen={setActive}
            />
          </AccordionSection>

          {VISIBLE_CATEGORIES.map(
            (categoria, index) => (
              <AccordionSection
                key={categoria.id}
                id={categoria.id}
                alternate={index % 2 === 0}
                isOpen={
                  openSection === categoria.id
                }
              >
                <CategoriaSection
                  categoria={categoria}
                  onOpen={setActive}
                />
              </AccordionSection>
            )
          )}
        </div>
      </main>

      {/* CONTACTO */}

      <section
        className={styles.contactSection}
        id="contacto"
      >
        <div className={styles.contactCircleOne} />
        <div className={styles.contactCircleTwo} />

        <div className={styles.wrap}>
          <Reveal className={styles.contactInner}>
            <p className={styles.secLabel}>
              Hablemos
            </p>

            <h2 className={styles.contactTitle}>
              Contacto
            </h2>

            <p className={styles.contactIntro}>
              Conoce más sobre mi trabajo, mis procesos de
              comunicación y los proyectos desarrollados
              durante la práctica profesional.
            </p>

            <div className={styles.secRule} />

            <div className={styles.contactList}>
              <a
                href="mailto:pelaezvalverdetania@gmail.com"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>
                  @
                </span>

                <span>
                  <small>Correo electrónico</small>

                  <strong>
                    pelaezvalverdetania@gmail.com
                  </strong>
                </span>

                <i>↗</i>
              </a>

              <a
                href="tel:+573172273409"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>
                  ◉
                </span>

                <span>
                  <small>Teléfono</small>
                  <strong>+57 317 227 3409</strong>
                </span>

                <i>↗</i>
              </a>

              <a
                href="https://instagram.com/tania_0224"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactCard}
              >
                <span className={styles.contactIcon}>
                  ◎
                </span>

                <span>
                  <small>Instagram</small>
                  <strong>@tania_0224</strong>
                </span>

                <i>↗</i>
              </a>

              <div className={styles.contactCard}>
                <span className={styles.contactIcon}>
                  ◇
                </span>

                <span>
                  <small>Ciudad</small>
                  <strong>Cali, Colombia</strong>
                </span>
              </div>
            </div>
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

          <span>Volver a mi experiencia</span>
        </Link>
      </div>

      <Lightbox
        item={active}
        onClose={() => setActive(null)}
      />
    </div>
  );
}