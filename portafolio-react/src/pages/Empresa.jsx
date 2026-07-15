import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { useTilt } from '../hooks/useTilt';
import styles from './Empresa.module.css';

function FactCard({ label, value }) {
  const ref = useRef(null);
  useTilt(ref, { maxY: 7, maxX: 7 });
  return (
    <div ref={ref} className={styles.factCard}>
      <p className={styles.factLabel}>{label}</p>
      <p className={styles.factValue}>{value}</p>
    </div>
  );
}

const FACTS = [
  { label: 'Sector', value: 'Cafetero' },
  { label: 'Fundado', value: '1928' },
  { label: 'Familias representadas', value: '+22.000' },
  { label: 'Municipios productores', value: '39' },
];

export default function Empresa() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLogo}>✦</div>
        <p className={styles.heroLabel}>Empresa de prácticas</p>
        <h1 className={styles.heroName}>Comité de Cafeteros<br />del Valle del Cauca</h1>
        <p className={styles.heroSector}>Federación Nacional de Cafeteros · Cali, Colombia</p>
      </section>

      <main className={styles.pageContent}>
        <Reveal className={styles.quickFacts}>
          {FACTS.map((fact) => <FactCard key={fact.label} {...fact} />)}
        </Reveal>

        <Reveal as="section" className={styles.sectionBlock}>
          <p className={styles.blockLabel}>¿Quiénes son?</p>
          <h2 className={styles.blockTitle}>Sobre la empresa</h2>
          <div className={styles.blockDivider} />
          <div className={styles.blockText}>
            <p>El Comité de Cafeteros del Valle del Cauca es la entidad gremial encargada de representar y acompañar a los caficultores del departamento dentro del sistema institucional del café colombiano. Este comité hace parte de la estructura regional de la Federación Nacional de Cafeteros de Colombia, organización privada, sin ánimo de lucro y de carácter gremial fundada en 1927 por los propios productores de café del país.</p>
            <p>La Federación cuenta con una estructura organizativa que incluye comités departamentales y municipales en las zonas productoras del país, lo que permite mantener una relación directa con las comunidades cafeteras y garantizar la implementación de programas y servicios en los territorios.</p>
            <p>En el Valle del Cauca, la representación institucional se ejerce a través del Comité fundado el 14 de mayo de 1928, entidad que agrupa y representa a más de 22.000 familias caficultoras del departamento.</p>
          </div>
        </Reveal>

        <Reveal as="section" delay={0.08} className={styles.sectionBlock}>
          <p className={styles.blockLabel}>Rol institucional</p>
          <h2 className={styles.blockTitle}>Funciones del Comité</h2>
          <div className={styles.blockDivider} />
          <ul className={styles.funcList}>
            {[
              'Velar por la correcta prestación de los servicios que la Federación Nacional de Cafeteros ofrece a los productores.',
              'Gestionar programas y acciones que beneficien a los caficultores del departamento.',
              'Promover el desarrollo del sector cafetero en el territorio.',
              'Representar los intereses de los productores ante las instancias nacionales del gremio cafetero.',
            ].map((text) => (
              <li key={text} className={styles.funcItem}>
                <div className={styles.funcDot} />
                <p>{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" delay={0.1} className={styles.sectionBlock}>
          <p className={styles.blockLabel}>Su impacto</p>
          <h2 className={styles.blockTitle}>Importancia del Comité</h2>
          <div className={styles.blockDivider} />
          <div className={styles.importGrid}>
            <div className={styles.importCard}>
              <div className={styles.importCardImg}>✦</div>
              <div className={styles.importCardBody}>
                <p>La caficultura constituye una actividad económica y social fundamental para las zonas rurales del departamento. En el Valle del Cauca existen más de 23.000 familias dedicadas al cultivo de café, distribuidas en 39 municipios productores.</p>
              </div>
            </div>
            <div className={styles.importCard}>
              <div className={styles.importCardImg}>✦</div>
              <div className={styles.importCardBody}>
                <p>El café no solo representa una fuente de ingresos para miles de familias rurales, sino que también genera empleo y dinamiza la economía local. El cultivo está compuesto principalmente por pequeños productores, lo que resalta su relevancia en la sostenibilidad social y económica del territorio.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" delay={0.12} className={styles.sectionBlock}>
          <p className={styles.blockLabel}>Mi decisión</p>
          <h2 className={styles.blockTitle}>¿Por qué elegí el Comité de Cafeteros?</h2>
          <div className={styles.blockDivider} />
          <div className={styles.porqueGrid}>
            <div className={styles.porqueText}>
              <p>Elegí realizar mi práctica profesional en el Comité de Cafeteros del Valle del Cauca porque encontré en esta institución un espacio donde la comunicación trasciende lo corporativo y se convierte en una herramienta para conectar territorios, comunidades e historias humanas.</p>
              <p>El Comité representaba para mí la oportunidad de integrarme a un entorno donde la comunicación tiene un propósito ligado al desarrollo rural, la identidad cafetera y el fortalecimiento de las comunidades productoras del departamento. Me interesaba comprender cómo una institución de gran trayectoria construye estrategias de comunicación para visibilizar proyectos y fortalecer vínculos con los caficultores.</p>
              <p>Esta experiencia me permitía articular varios enfoques que han marcado mi trayectoria académica: la comunicación organizacional, la creación de contenidos, el cubrimiento audiovisual y la comunicación con enfoque humano y social. Encontré en el Comité un escenario donde podía aportar desde mis habilidades creativas y estratégicas, mientras fortalecía mi visión de la comunicación como un puente entre las instituciones y las comunidades.</p>
            </div>
            <div className={styles.porqueImg}>✦</div>
          </div>
        </Reveal>

        <Reveal as="section" delay={0.14} className={styles.sectionBlock}>
          <p className={styles.blockLabel}>Síguelos</p>
          <h2 className={styles.blockTitle}>Redes sociales del Comité</h2>
          <div className={styles.blockDivider} />
          <div className={styles.redesRow}>
            <a href="#" className={styles.redBtn} target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              Instagram
            </a>
            <a href="#" className={styles.redBtn} target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              Facebook
            </a>
            <a href="#" className={styles.redBtn} target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
              YouTube
            </a>
          </div>
        </Reveal>

        <Reveal as="section" delay={0.16} className={styles.sectionBlock}>
          <p className={styles.blockLabel}>Imágenes</p>
          <h2 className={styles.blockTitle}>La empresa en fotos</h2>
          <div className={styles.blockDivider} />
          <div className={styles.gallery}>
            <div className={styles.galleryItem}><span className={styles.galleryPh}>✦</span></div>
            <div className={styles.galleryItem}><span className={styles.galleryPh}>✦</span></div>
            <div className={styles.galleryItem}><span className={styles.galleryPh}>✦</span></div>
          </div>
        </Reveal>

        <Reveal className={styles.backBtnWrap}>
          <Link to="/#empresa" className={styles.btnBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Volver al portafolio
          </Link>
        </Reveal>
      </main>
    </>
  );
}
