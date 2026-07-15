// tipo se infiere del propio patrón de URL de Facebook:
// /share/r/ y /share/v/ -> reproductor de video (plugins/video.php)
// /share/p/ -> reproductor de post/foto (plugins/post.php)

export const categorias = [
  {
    id: 'elecciones',
    numero: '02',
    label: 'Cobertura y contenido',
    titulo: 'Elecciones Cafeteras',
    descripcion: 'Cobertura comunicacional del proceso de Elecciones Cafeteras del Valle del Cauca, incluyendo la producción de contenidos informativos, registro fotográfico y audiovisual, y la difusión institucional del proceso en redes sociales y canales del Comité.',
    publicaciones: [
      { url: 'https://www.facebook.com/share/r/1FjDeU8yjV/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1BVWU8vXcK/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1H8Qej4PSo/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1DsAf2MFJJ/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1bWJh5kT1P/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1EnRK6TEV6/', tipo: 'video' },
    ],
  },
  {
    id: 'esdelc',
    numero: '03',
    label: 'Serie de contenido digital',
    titulo: '#ESDELC',
    descripcion: 'El Servicio de Extensión le Cuenta — serie de contenidos digitales orientada a visibilizar los programas y servicios que el Comité ofrece a los caficultores del departamento, conectando la institucionalidad con las comunidades productoras desde un enfoque cercano y territorial.',
    publicaciones: [
      { url: 'https://www.facebook.com/share/r/183pALPmVr/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/19D28mDxEY/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1Du8i2Gvqa/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/v/1DDbSS51FK/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1KZ5CytpEy/', tipo: 'video' },
      { url: 'https://www.facebook.com/share/r/1EMfHfD7YS/', tipo: 'video' },
    ],
  },
  {
    id: 'cobertura',
    numero: '04',
    label: 'Periodismo y audiovisual',
    titulo: 'Cubrimiento fotográfico y audiovisual',
    descripcion: 'Registro fotográfico y audiovisual de actividades institucionales del Comité de Cafeteros del Valle del Cauca, incluyendo eventos gremiales, recorridos de campo y actividades de formación y acompañamiento a caficultores del departamento.',
    publicaciones: [
      { url: 'https://www.facebook.com/share/p/1ENSR361pb/', tipo: 'post' },
      { url: 'https://www.facebook.com/share/p/1FQicjCNU5/', tipo: 'post' },
      { url: 'https://www.facebook.com/share/p/1FY9FaFxQL/', tipo: 'post' },
      { url: 'https://www.facebook.com/share/p/1BR5T4LvqN/', tipo: 'post' },
      { url: 'https://www.facebook.com/share/r/1DsDEEcqsB/', tipo: 'video' },
    ],
  },
];
