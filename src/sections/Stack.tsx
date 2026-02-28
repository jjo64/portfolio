import { stack } from '../data/content'
import { useInView } from '../hooks/useInView'

const levelConfig = {
  solid: { label: 'Sólido', color: 'text-accent', bar: 'bg-accent', w: 'w-full' },
  familiar: { label: 'Familiar', color: 'text-cyan', bar: 'bg-cyan', w: 'w-3/4' },
  learning: { label: 'Aprendiendo', color: 'text-warn', bar: 'bg-warn', w: 'w-1/3' },
}

export function Stack() {
  const { ref, inView } = useInView()

  return (
    <section id="stack" className="py-32 px-16 bg-surface">
      <div
        ref={ref}
        className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="flex items-center gap-3 text-accent text-[10px] tracking-[4px] uppercase mb-4">
          <span className="section-line" />
          02 — Tecnologías
        </div>
        <h2
          className="font-display text-txt mb-16"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}
        >
          Mi Stack
        </h2>

        <div className="grid grid-cols-5 gap-px bg-border2 border border-border2">
          {stack.map((item, i) => {
            const cfg = levelConfig[item.level as keyof typeof levelConfig]
            return (
              <div
                key={item.name}
                data-hover
                className="bg-surface2 p-6 relative overflow-hidden group transition-colors duration-300 hover:bg-border"
                style={{
                  transitionDelay: inView ? `${i * 40}ms` : '0ms',
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms, background 0.3s`,
                }}
              >
                {/* Top accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${cfg.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />

                <div className="text-[11px] tracking-widest uppercase text-muted mb-1">
                  {item.category}
                </div>
                <div className="text-txt font-bold text-[14px] mb-3">{item.name}</div>

                {/* Level bar */}
                <div className="h-px bg-border2 w-full mb-2">
                  <div className={`h-px ${cfg.bar} ${cfg.w} transition-all duration-500`} />
                </div>
                <div className={`text-[10px] tracking-wider uppercase ${cfg.color}`}>
                  {cfg.label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
