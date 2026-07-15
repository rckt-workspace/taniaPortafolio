import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import styles from './Experiencia.module.css';

function FlipCard({ title, subtitle, back }) {
  const [flipped, setFlipped] = useState(false);
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    function handleMove(e) {
      if (flipped) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / r.width;
      const y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    }
    function handleLeave() {
      if (!flipped) el.style.transform = '';
    }
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [flipped]);

  return (
    <div className={styles.expCard} onClick={() => setFlipped((f) => !f)}>
      <div
        ref={innerRef}
        className={`${styles.expCardInner} ${flipped ? styles.flipped : ''}`}
      >
        <div className={styles.expFront}>
          <div className={styles.expFrontImg}>
            <span className={styles.expFrontImgPh}>Imagen</span>
            <span className={styles.flipHint}>Clic para ver más</span>
          </div>
          <div className={styles.expFrontBody}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </div>
        <div className={styles.expBack}>
          <h3>{title}</h3>
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
}

function ApItem({ direction, numero, titulo, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.apItem} ${direction === 'left' ? styles.fromLeft : styles.fromRight}`}>
      <div className={styles.apDeco}>
        <span className={styles.apDecoNum}>{numero}</span>
        <div className={styles.apDecoLine} />
        <h3 className={styles.apDecoTitle}>{titulo}</h3>
        {children}
      </div>
    </div>
  );
}

const FUNCIONES = [
  {
    title: 'Comunicación Institucional',
    subtitle: 'Circulación de información',
    back: 'Apoyo en la construcción y difusión de contenidos institucionales, elaboración de boletines internos, carteleras informativas y piezas comunicativas para socializar actividades, proyectos y convocatorias entre las diferentes áreas de la organización.',
  },
  {
    title: 'Cobertura de Eventos',
    subtitle: 'Periodismo y audiovisual',
    back: 'Cubrimiento periodístico y audiovisual de actividades institucionales: registro fotográfico, producción de entrevistas, documentación de eventos y generación de contenidos digitales. Apoyo logístico para el adecuado desarrollo de las actividades.',
  },
  {
    title: 'Creación de Contenidos',
    subtitle: 'Narrativas institucionales',
    back: 'Concepción, producción y posproducción de contenidos digitales para redes sociales y canales institucionales del Comité. Construcción de narrativas para visibilizar proyectos, fortalecer la identidad cafetera y acercar la institución a las comunidades.',
  },
];

export default function Experiencia() {
  return (
    <>
      <div className={styles.pageHero}>
        <p className={styles.phEyebrow}>Comité de Cafeteros del Valle del Cauca</p>
        <h1 className={styles.phTitle}>Mi <em>experiencia</em></h1>
        <p className={styles.phSub}>Práctica profesional · 2026</p>
      </div>

      <section className={styles.introSection}>
        <div className="wrap">
          <Reveal className={styles.introGrid}>
            <div className={styles.introText}>
              <p>Actualmente realizo mi práctica profesional en el Comité de Cafeteros del Valle del Cauca, entidad adscrita a la Federación Nacional de Cafeteros de Colombia, donde apoyo procesos de comunicación institucional orientados a la difusión de proyectos, programas e iniciativas que impactan al sector cafetero del departamento.</p>
              <p>Mi experiencia dentro de la organización me ha permitido comprender la comunicación como una herramienta estratégica para fortalecer el vínculo entre la institucionalidad cafetera, los territorios y las comunidades productoras.</p>
            </div>
            <div className={styles.introImg}>Foto de presentación</div>
          </Reveal>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <div className="wrap">
          <p className={styles.cardsLabel}>Lo que hice</p>
          <h2 className={styles.cardsTitle}>Mis Funciones</h2>
          <div className={styles.cardsDiv} />
          <div className={styles.cardsGrid}>
            {FUNCIONES.map((f) => <FlipCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      <section className={styles.collageSection}>
        <div className="wrap">
          <p className={styles.collageLabel}>Momentos en el campo</p>
          <h2 className={styles.collageTitle}>Galería</h2>
          <div className={styles.collageDiv} />
          <Reveal className={styles.collageGrid}>
            <div className={`${styles.collageItem} ${styles.tall}`}><span className={styles.collageItemPh}>Foto 1</span></div>
            <div className={styles.collageItem}><span className={styles.collageItemPh}>Foto 2</span></div>
            <div className={styles.collageItem}><span className={styles.collageItemPh}>Foto 3</span></div>
            <div className={`${styles.collageItem} ${styles.wide}`}><span className={styles.collageItemPh}>Foto 4 (ancha)</span></div>
            <div className={styles.collageItem}><span className={styles.collageItemPh}>Foto 5</span></div>
            <div className={styles.collageItem}><span className={styles.collageItemPh}>Foto 6</span></div>
          </Reveal>
        </div>
      </section>

      <section className={styles.aprendizajesSection}>
        <div className={styles.wrapNarrow}>
          <Reveal>
            <h2 className={styles.apTitle}>Aprendizajes</h2>
            <p className={styles.apIntro}>Mi experiencia de práctica profesional en el Comité de Cafeteros ha representado un proceso de crecimiento académico, profesional y humano que me ha permitido fortalecer mi visión de la comunicación como una herramienta estratégica al servicio de las organizaciones y las comunidades.</p>
          </Reveal>

          <ApItem direction="right" numero="01" titulo="Comprensión estratégica de la comunicación institucional">
            <p>Uno de los principales aprendizajes ha sido comprender el papel de la comunicación institucional como un eje fundamental para fortalecer la relación entre las organizaciones y sus públicos. Esta experiencia me permitió entender cómo los procesos comunicativos contribuyen a generar cercanía, identidad y confianza entre la institucionalidad cafetera y las comunidades productoras del territorio.</p>
            <p>Fortalecí mi capacidad para construir contenidos alineados con objetivos organizacionales, reconociendo la importancia de comunicar de manera clara, pertinente y estratégica en contextos institucionales.</p>
          </ApItem>

          <ApItem direction="left" numero="02" titulo="Desarrollo de habilidades en creación de contenidos">
            <p>La participación constante en la producción de contenidos digitales, piezas informativas y cubrimientos institucionales fortaleció mis habilidades en: redacción y creación de contenidos, construcción de narrativas institucionales, producción audiovisual, fotografía y documentación de eventos, edición y adaptación de contenidos para plataformas digitales, storytelling organizacional y manejo de herramientas de IA.</p>
            <p>Este proceso me permitió desarrollar una visión más integral sobre la manera en que los contenidos pueden conectar emocionalmente con las audiencias y transmitir el valor social de las iniciativas institucionales.</p>
          </ApItem>

          <ApItem direction="right" numero="03" titulo="Fortalecimiento de capacidades organizacionales">
            <p>El trabajo dentro del área de comunicaciones me permitió integrarme a dinámicas interdisciplinarias con diferentes equipos y áreas del Comité, fortaleciendo habilidades como: trabajo colaborativo, adaptabilidad, organización y gestión del tiempo, comunicación asertiva, resolución de situaciones en entornos dinámicos y capacidad de respuesta frente a múltiples tareas.</p>
          </ApItem>

          <ApItem direction="left" numero="04" titulo="Sensibilidad social y comprensión del territorio">
            <p>La experiencia dentro del Comité fortaleció mi sensibilidad frente a las realidades sociales y humanas presentes en los territorios cafeteros. A través del contacto con proyectos, comunidades y procesos institucionales, comprendí la importancia de la comunicación como una herramienta para visibilizar historias, fortalecer identidades y generar conexiones entre las instituciones y las personas.</p>
            <p>Este aprendizaje reafirmó mi interés por desarrollar procesos comunicativos con enfoque humano y propósito social, capaces de contribuir al reconocimiento de las comunidades y al fortalecimiento del tejido social.</p>
          </ApItem>
        </div>
      </section>

      <section className={styles.crecimientoSection}>
        <div className={styles.wrapNarrow}>
          <Reveal>
            <h2 className={styles.apTitle}>Crecimiento y Habilidades Desarrolladas</h2>
            <p className={styles.apSub}>Construcción de mi identidad como comunicadora</p>
            <p className={styles.apIntro}>La práctica profesional representó un espacio de transición entre la formación académica y el ejercicio profesional, permitiéndome aplicar conocimientos adquiridos durante la carrera en escenarios reales de comunicación institucional. Esta experiencia fortaleció mi confianza profesional, mi criterio comunicativo y mi capacidad para asumir responsabilidades dentro de un entorno organizacional. Asimismo, me permitió consolidar una visión más clara sobre el tipo de comunicación que deseo ejercer: una comunicación estratégica, humana y orientada a generar impacto positivo en las organizaciones y las comunidades.</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className={styles.skillsHeading}>Resumen de habilidades fortalecidas</p>
            <div className={styles.skillsCols}>
              <div className={styles.skillsCol}>
                <p className={styles.skillsColTitle}>Competencias comunicativas</p>
                <ul>
                  <li>Comunicación institucional</li>
                  <li>Redacción y creación de contenidos</li>
                  <li>Storytelling organizacional</li>
                  <li>Cubrimiento periodístico</li>
                  <li>Producción audiovisual</li>
                  <li>Gestión de redes sociales</li>
                </ul>
              </div>
              <div className={styles.skillsCol}>
                <p className={styles.skillsColTitle}>Competencias organizacionales</p>
                <ul>
                  <li>Planeación y apoyo logístico</li>
                  <li>Gestión del tiempo</li>
                  <li>Organización de tareas</li>
                  <li>Adaptación a entornos dinámicos</li>
                  <li>Trabajo interdisciplinario</li>
                </ul>
              </div>
              <div className={styles.skillsCol}>
                <p className={styles.skillsColTitle}>Competencias personales</p>
                <ul>
                  <li>Pensamiento estratégico</li>
                  <li>Proactividad</li>
                  <li>Liderazgo colaborativo</li>
                  <li>Empatía social</li>
                  <li>Resolución de problemas</li>
                  <li>Disposición al aprendizaje</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="wrap">
          <Reveal as="p" className={styles.ctaQuote}>
            Mi experiencia en el Comité de Cafeteros del Valle del Cauca me ha permitido fortalecer competencias en comunicación organizacional, producción audiovisual, creación de contenidos y estrategias institucionales, comprendiendo el valor de la comunicación como una herramienta capaz de <em>conectar organizaciones, territorios y comunidades</em> desde un enfoque humano y social.
          </Reveal>
          <Reveal delay={0.1}>
            <Link to="/portafolio" className={styles.btnCta}>
              Conoce mi trabajo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
