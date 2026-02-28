export const personal = {
  name: 'Josue Cueva',
  firstName: 'Josue',
  lastName: 'Cueva',
  title: 'Backend Developer',
  subtitle: '& Security Enthusiast',
  location: 'Madrid, España',
  origin: 'La Plata, Argentina',
  email: 'josuecuevaes@gmail.com',
  github: 'https://github.com/jjo64',
  githubHandle: 'jjo64',
  available: true,
  tagline: 'Node.js · TypeScript · APIs · Seguridad · AWS',
  about: [
    '22 años. Argentino viviendo en Madrid. A punto de graduarme en DAW (Desarrollo de Aplicaciones Web).',
    'Me apasiona construir sistemas que funcionen bien por dentro, no solo por fuera. Backend, APIs, seguridad, infraestructura — el tipo de trabajo que la mayoría no ve pero que hace que todo lo demás funcione.',
    'Apasionado del cine (de ahí CineVault), del aprendizaje constante y de la ciberseguridad. Mi próximo salto natural es combinar backend con seguridad ofensiva.',
    'Busco una empresa donde pueda crecer, tomar responsabilidades reales y quedarme a largo plazo.',
  ],
}

export const stack = [
  { name: 'Node.js', level: 'solid', category: 'runtime' },
  { name: 'TypeScript', level: 'solid', category: 'language' },
  { name: 'Express', level: 'solid', category: 'framework' },
  { name: 'Prisma', level: 'solid', category: 'orm' },
  { name: 'MySQL', level: 'solid', category: 'database' },
  { name: 'PHP', level: 'familiar', category: 'language' },
  { name: 'Laravel', level: 'familiar', category: 'framework' },
  { name: 'Git', level: 'solid', category: 'tool' },
  { name: 'Linux / Kali', level: 'familiar', category: 'os' },
  { name: 'AWS EC2', level: 'familiar', category: 'cloud' },
  { name: 'Docker', level: 'learning', category: 'devops' },
  { name: 'Redis', level: 'learning', category: 'database' },
  { name: 'Socket.io', level: 'familiar', category: 'realtime' },
  { name: 'Nginx', level: 'familiar', category: 'server' },
]

export const projects = [
  {
    id: 'cinevault',
    number: '01',
    tag: 'REST API · PRODUCCIÓN',
    tagColor: 'accent' as const,
    name: 'CineVault API',
    description:
      'API REST completa para gestión y descubrimiento de películas. Autenticación JWT, endpoints documentados, ORM con Prisma. Desplegada en producción en AWS EC2 con dominio propio.',
    chips: ['Node.js', 'TypeScript', 'Express', 'Prisma', 'MySQL', 'JWT', 'AWS EC2'],
    liveUrl: 'https://api.cinevault.art',
    githubUrl: 'https://github.com/jjo64',
    featured: true,
    demoSection: 'cinevault',
  },
  {
    id: 'chat',
    number: '02',
    tag: 'WebSockets · Tiempo Real',
    tagColor: 'cyan' as const,
    name: 'Chat en Vivo',
    description:
      'Sistema de mensajería en tiempo real con Socket.io. Salas, usuarios conectados en vivo y persistencia con Redis.',
    chips: ['Socket.io', 'Node.js', 'Redis', 'TypeScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/jjo64',
    featured: false,
    demoSection: 'chat',
  },
  {
    id: 'scraper',
    number: '03',
    tag: 'Data Pipeline · Scraping',
    tagColor: 'accent' as const,
    name: 'Web Scraper',
    description:
      'Pipeline de extracción de datos con Cheerio y BullMQ. Logs en tiempo real via SSE, scheduler automático y almacenamiento en base de datos.',
    chips: ['Cheerio', 'BullMQ', 'SSE', 'Redis', 'Node.js'],
    liveUrl: null,
    githubUrl: 'https://github.com/jjo64',
    featured: false,
    demoSection: 'scraper',
  },
  {
    id: 'security',
    number: '04',
    tag: 'Seguridad · Kali Linux',
    tagColor: 'danger' as const,
    name: 'Security Toolkit',
    description:
      'Rate limiting, detección de ataques, honeypot con monitor en tiempo real. Construido con conocimiento de redes y Kali Linux.',
    chips: ['Node.js', 'Kali Linux', 'JWT', 'Rate Limiting', 'Honeypot'],
    liveUrl: null,
    githubUrl: 'https://github.com/jjo64',
    featured: false,
    demoSection: 'security',
  },
]

export const navLinks = [
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Demos', href: '#demos' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Contacto', href: '#contact' },
]
