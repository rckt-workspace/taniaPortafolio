// Cada publicación referencia uno o varios archivos locales (public/<categoria>/...).
// Si `media` tiene más de un archivo, la tarjeta se abre como carrusel (swiper).
// `likes` y `comentarios` son opcionales: si no se ponen, la tarjeta no muestra esa fila.
// Edita estos dos números con los datos reales de cada publicación en Instagram/Facebook/YouTube.

export const categorias = [
  {
    id: 'elecciones',
    numero: '02',
    label: 'Cobertura y contenido',
    titulo: 'Elecciones Cafeteras',
    descripcion: 'Cobertura comunicacional del proceso de Elecciones Cafeteras del Valle del Cauca, incluyendo la producción de contenidos informativos, registro fotográfico y audiovisual, y la difusión institucional del proceso en redes sociales y canales del Comité.',
    publicaciones: [
      { media: ['/elecciones/video1.mp4'], likes: 0, comentarios: 0 },
      { media: ['/elecciones/video2.mp4'] },
      { media: ['/elecciones/video3.mp4'] },
      { media: ['/elecciones/video4.mp4'] },
      { media: ['/elecciones/video5.mp4'] },
      { media: ['/elecciones/video6.mp4'] },
      { media: ['/elecciones/video7.mp4'] },
    ],
  },
  {
    id: 'esdelc',
    numero: '03',
    label: 'Serie de contenido digital',
    titulo: '#ESDELC',
    descripcion: 'El Servicio de Extensión Rural es el puente vivo entre la institución y los caficultores del territorio. A través de #ESDELC — El Servicio de Extensión le Cuenta — decidimos mostrar esta labor más allá de las asesorías técnicas: visibilizamos las historias de los extensionistas, sus encuentros en el campo, los casos reales que transforman fincas y familias. Porque la extensión no es solo transferencia de conocimiento, es relación, es presencia, es gente que se levanta cada día para acompañar a otros. Ese fue el ángulo: humanizar la labor para que los caficultores vieran en los extensionistas aliados cercanos, no solo técnicos.',
    publicaciones: [
      { media: ['/esdelc/video1.mp4'] },
      { media: ['/esdelc/video2.mp4'] },
      { media: ['/esdelc/video3.mp4'] },
      { media: ['/esdelc/video4.mp4'] },
      { media: ['/esdelc/video5.mp4'] },
      { media: ['/esdelc/video6.mp4'] },
      { media: ['/esdelc/video7.mp4'] },
      { media: ['/esdelc/video8.mp4'] },
    ],
  },
  {
    id: 'cobertura',
    numero: '04',
    label: 'Periodismo y audiovisual',
    titulo: 'Cubrimiento fotográfico y audiovisual',
    subtitulo: 'Más allá del lente',
    descripcion: 'El cubrimiento fotográfico y audiovisual de eventos institucionales va más allá de documentar momentos — se trata de capturar emociones y construir conexión. Cada fotografía, cada video que subimos tiene un propósito: sensibilizar. Cuando registramos encuentros con autoridades, celebraciones gremiales o reuniones decisivas, no solo inmortalizamos lo que pasó, sino que buscamos que nuestros públicos se sientan parte de eso. Para lograrlo, fuimos estratégicos: en coberturas fotográficas elegimos frases impactantes del protagonista — sus reflexiones sobre el gremio, su visión de la caficultura — y las convertimos en storytelling visual. En producción audiovisual, éramos rigurosos al revisar cada segundo para identificar esos ganchos conversacionales naturales — una frase que resonara, un inicio que atrapara — y los usamos como hooks emocionales y auditivos. Porque una foto o un video sin conexión emocional es solo registro; con ella, es testimonio.',
    publicaciones: [
      { media: ['/cobertura/imagen1.1.jpg', '/cobertura/imagen1.2.jpg', '/cobertura/imagen1.3.jpg'] },
      { media: ['/cobertura/imagen2.1.jpg', '/cobertura/imagen2.2.jpg', '/cobertura/imagen2.3.jpg'] },
      { media: ['/cobertura/imagen3.jpg'] },
      { media: ['/cobertura/imagen4.1.jpg', '/cobertura/imagen4.2.jpg', '/cobertura/imagen4.3.jpg'] },
      { media: ['/cobertura/imagen5.jpg'] },
      { media: ['/cobertura/video1.mp4'] },
      { media: ['/cobertura/video2.mp4'] },
      { media: ['/cobertura/video3.mp4'] },
      { media: ['/cobertura/video4.mp4'] },
      { media: ['/cobertura/video5.mp4'] },
      { media: ['/cobertura/video6.mp4'] },
    ],
  },
];
