import { useInView } from '../hooks/useInView'

// Devicons via CDN — colored versions
const stackItems = [
  {
    name: 'Node.js',
    category: 'runtime',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'TypeScript',
    category: 'language',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  },
  {
    name: 'Express',
    category: 'framework',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
  },
  {
    name: 'Prisma',
    category: 'orm',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg',
  },
  {
    name: 'MySQL',
    category: 'database',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'PHP',
    category: 'language',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    name: 'Laravel',
    category: 'framework',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Git',
    category: 'tool',
    level: 'solid',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Linux',
    category: 'os',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',
  },
  {
    name: 'AWS EC2',
    category: 'cloud',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    name: 'Docker',
    category: 'devops',
    level: 'learning',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
  {
    name: 'Redis',
    category: 'cache',
    level: 'learning',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
  },
  {
    name: 'Socket.io',
    category: 'realtime',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg',
  },
  {
    name: 'Nginx',
    category: 'server',
    level: 'familiar',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg',
  },
  {
    name: 'Python',
    category: 'language',
    level: 'learning',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
]

const levelConfig = {
  solid:    { label: 'Sólido',      color: 'text-[#00ff88]', dot: 'bg-[#00ff88]', barW: '100%' },
  familiar: { label: 'Familiar',    color: 'text-[#00d4ff]', dot: 'bg-[#00d4ff]', barW: '70%'  },
  learning: { label: 'Aprendiendo', color: 'text-[#ffcc00]', dot: 'bg-[#ffcc00]', barW: '35%'  },
}

export function Stack() {
  const { ref, inView } = useInView()

  return (
    <section id="stack" className="py-32 px-16 bg-[#0a0a10]">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
          <span className="section-line" />
          02 — Tecnologías
        </div>
        <h2
          className={`font-display text-[#e8e8f5] mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}
        >
          Mi Stack
        </h2>

        <div className="grid grid-cols-5 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {stackItems.map((item, i) => {
            const cfg = levelConfig[item.level as keyof typeof levelConfig]
            return (
              <div
                key={item.name}
                data-hover
                className="bg-[#0f0f18] p-6 relative overflow-hidden group hover:bg-[#151524] transition-colors duration-300"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms, background 0.3s`,
                }}
              >
                {/* Hover top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-px bg-[#00ff88] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                />

                {/* Icon */}
                <div className="w-10 h-10 mb-4 relative">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-full h-full object-contain"
                    style={{
                      // Express and Socket.io icons are black — invert them so they show on dark bg
                      filter: ['Express', 'Socket.io', 'Prisma'].includes(item.name)
                        ? 'invert(1) brightness(0.7)'
                        : 'none',
                    }}
                    onError={(e) => {
                      // Fallback: hide broken img, show first letter
                      ;(e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                </div>

                {/* Category */}
                <div className="text-[10px] tracking-widest uppercase text-[#44445a] mb-1">
                  {item.category}
                </div>

                {/* Name */}
                <div className="text-[#e8e8f5] font-bold text-[14px] mb-3 group-hover:text-[#00ff88] transition-colors">
                  {item.name}
                </div>

                {/* Level bar */}
                <div className="h-px bg-[#1e1e30] w-full mb-2 overflow-hidden">
                  <div
                    className={`h-px ${cfg.dot.replace('bg-', 'bg-')} transition-all duration-700`}
                    style={{ width: inView ? cfg.barW : '0%', transitionDelay: `${i * 40 + 300}ms` }}
                  />
                </div>

                {/* Level label */}
                <div className={`text-[10px] tracking-wider uppercase flex items-center gap-1.5 ${cfg.color}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-6 text-[11px] text-[#44445a]">
          {Object.entries(levelConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${cfg.dot}`} />
              <span className={cfg.color}>{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
