import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useTilt } from '../hooks/useTilt';
import styles from './Home.module.css';

export default function Home() {
  const empresaRef = useRef(null);
  const experienciaRef = useRef(null);

  useTilt(empresaRef);
  useTilt(experienciaRef);

  const areasInteres = [
    'Comunicación estratégica',
    'Contenido institucional',
    'Periodismo social',
    'Producción digital',
    'Cobertura de eventos',
  ];

  return (
    <>
      {/* =====================================================
          PORTADA
      ===================================================== */}
      <section id="hero" className={styles.hero}>
        <div className={`${styles.blob} ${styles.b1}`} />
        <div className={`${styles.blob} ${styles.b2}`} />

        <div className={styles.heroText}>
          <h1 className={styles.heroName}>
            <span className={styles.heroMainName}>
              Tania Peláez Valverde
            </span>
          </h1>

          <div className={styles.heroBar} />

          <p className={styles.heroSubtitle}>
            Comunicación Social y Periodismo
          </p>

          <p className={styles.heroEyebrow}>
            Comunicación estratégica con propósito social. Conectar,
            visibilizar y transformar.
          </p>

          <div className={styles.heroPerfil}>
            <h2 className={styles.heroPerfilTitle}>
              Perfil Profesional
            </h2>

            <p className={styles.heroPerfilSubtitle}>
              Comunicación estratégica con propósito social.
            </p>

            <div className={styles.heroPerfilDescription}>
              <p>
                Soy estudiante de Comunicación Social y Periodismo, con
                interés en la comunicación estratégica, la creación de
                contenido institucional y la narración de procesos sociales
                desde una perspectiva humana y territorial. Me interesa
                especialmente el papel de la comunicación como herramienta
                para visibilizar iniciativas que generan desarrollo,
                fortalecen comunidades y promueven transformaciones sociales.
              </p>

              <p>
                Me caracterizo por ser una persona comprometida, creativa y
                sensible frente a las realidades sociales, con interés en
                desarrollar procesos comunicativos que integren narrativa,
                estrategia y propósito social.
              </p>
            </div>
          </div>

          <a href="#perfil" className={styles.heroCta}>
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
          </div>

          <a
            href={encodeURI('/CV - Organizacional Prácticas.pdf')}
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
          VIDEO, MÉTRICAS Y ÁREAS DE INTERÉS
      ===================================================== */}
      <section id="perfil" className={styles.perfil}>
        <div className="wrap">
          <div className={styles.perfilGrid}>
            {/* VIDEO DE PRESENTACIÓN */}
            <Reveal
              delay={0.1}
              className={styles.perfilVideoBlock}
            >
              <div className={styles.videoPlaceholder}>
                <div className={styles.videoPlay}>
                  <svg
                    width="22"
                    height="22"
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
                </div>

                <p className={styles.videoLabel}>
                  Video de presentación
                </p>
              </div>
            </Reveal>

            {/* MÉTRICAS */}
            <Reveal
              delay={0.2}
              className={styles.perfilNumbers}
            >
              <div className={styles.numItem}>
                <p className={styles.numValue}>39</p>

                <p className={styles.numLabel}>
                  Municipios
                  <br />
                  Cafeteros
                </p>
              </div>

              <div className={styles.numItem}>
                <p className={styles.numValue}>23K+</p>

                <p className={styles.numLabel}>
                  Familias caficultoras
                  <br />
                  representadas
                </p>
              </div>

              <div className={styles.numItem}>
                <p className={styles.numValue}>6</p>

                <p className={styles.numLabel}>
                  Meses de
                  <br />
                  Práctica Profesional
                </p>
              </div>
            </Reveal>

            {/* ÁREAS DE INTERÉS */}
            <Reveal
              delay={0.3}
              className={styles.skillsBlock}
            >
              <p className={styles.skillsTitle}>
                Áreas de interés
              </p>

              <div className={styles.skillsList}>
                {areasInteres.map((skill) => (
                  <span
                    key={skill}
                    className={styles.skillTag}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          EMPRESA
      ===================================================== */}
      <section
  id="empresa"
  className={styles.empresaSection}
>
  <div className="wrap">
    <Reveal delay={0.16}>
      <div
        ref={empresaRef}
        className={styles.empresaCard}
      >
        <div className={styles.empresaImg}>
          <img
            src="/comiteDeCafeteros.png"
            alt="Comité de Cafeteros del Valle del Cauca"
            className={styles.empresaImgReal}
          />
        </div>

        <div className={styles.empresaText}>
          <span className={styles.eTag}>
            Prácticas profesionales
          </span>

          <h2>
            Comité de Cafeteros del Valle del Cauca
          </h2>

          <p className={styles.empresaSub}>
            Federación Nacional de Cafeteros · Valle del Cauca,
            Colombia
          </p>

          <p>
            Entidad gremial encargada de representar y acompañar a
            los caficultores del departamento dentro del sistema
            institucional del café colombiano. Fundada el 14 de
            mayo de 1928, agrupa a más de 23.000 familias
            caficultoras del Valle del Cauca, como parte de la
            estructura regional de la Federación Nacional de
            Cafeteros de Colombia, fundada en 1927.
          </p>

          <Link
            to="/empresa"
            className={styles.btnArrow}
          >
            <span>Conoce más sobre la empresa</span>

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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
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
  <div className="wrap">
    <Reveal delay={0.16}>
      <div
        ref={experienciaRef}
        className={`${styles.empresaCard} ${styles.experienciaCard}`}
      >
        <div className={styles.empresaText}>
          <span className={styles.eTag}>
            Experiencia profesional
          </span>

          <h2>Mi experiencia</h2>

          <p className={styles.empresaSub}>
            Comité de Cafeteros del Valle del Cauca · 2026
          </p>

          <p>
            Actualmente realizo mi práctica profesional en el
            Comité de Cafeteros del Valle del Cauca, donde apoyo
            procesos de comunicación institucional orientados a la
            difusión de proyectos, programas e iniciativas que
            impactan al sector cafetero del departamento.
          </p>

          <p>
            Mi experiencia me ha permitido comprender la
            comunicación como una herramienta estratégica para
            fortalecer el vínculo entre la institucionalidad
            cafetera, los territorios y las comunidades
            productoras.
          </p>

          <Link
            to="/experiencia"
            className={styles.btnArrow}
          >
            <span>Ver toda mi experiencia</span>

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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className={styles.empresaImg}>
          <img
            src="/Experiencia.png"
            alt="Experiencia profesional en el Comité de Cafeteros del Valle del Cauca"
            className={styles.empresaImgReal}
          />
        </div>
      </div>
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
        <div className="wrap">
          <Reveal
            as="h2"
            className={`sec-title ${styles.contactoTitle}`}
          >
            Contacto
          </Reveal>

          <Reveal
            delay={0.08}
            className={`sec-div ${styles.contactoDiv}`}
          />

          <Reveal
            delay={0.16}
            className={styles.contactGrid}
          >
            <div className={styles.contactCard}>
              <span className={styles.cLbl}>
                Correo electrónico
              </span>

              <a
                href="pelaezvalverdetania@gmail.com"
                className={styles.cVal}
              >
                pelaezvalverdetania@gmail.com
                tania.pelaez@cafedecolombia.com
              </a>
            </div>

            <div className={styles.contactCard}>
              <span className={styles.cLbl}>
                WhatsApp
              </span>

              <a
                href="https://wa.me/573172273408"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cVal}
              >
                +57 317 227 3408
              </a>
            </div>

             <div className={styles.contactCard}>
              <span className={styles.cLbl}>
                instagram
              </span>

              <span className={styles.cVal}>
                @tania_0224
              </span>
            </div>

            <div className={styles.contactCard}>
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
    </>
  );
}