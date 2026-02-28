import { MapPin, GraduationCap, Briefcase, Heartbeat } from '@phosphor-icons/react'
import { personal } from '../data/content'
import { useInView } from '../hooks/useInView'

const facts = [
  { icon: MapPin, label: 'Ubicación', value: 'Madrid, España · De La Plata, Argentina' },
  { icon: GraduationCap, label: 'Formación', value: 'DAW — Desarrollo de Aplicaciones Web (próximo graduado)' },
  { icon: Briefcase, label: 'Buscando', value: 'Rol backend estable con crecimiento real' },
  { icon: Heartbeat, label: 'Intereses', value: 'Cine · Seguridad ofensiva · Backend · Infra' },
]

export function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-32 px-16 bg-bg border-t border-border2">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-accent text-[10px] tracking-[4px] uppercase mb-4">
          <span className="section-line" />
          05 — Sobre mí
        </div>

        <div className="grid grid-cols-2 gap-20 items-start">
          {/* Left: text */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <h2
              className="font-display text-txt mb-8"
              style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}
            >
              Quién soy
            </h2>
            <div className="space-y-4">
              {personal.about.map((p, i) => (
                <p key={i} className="text-muted text-[13px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* ASCII decoration */}
            <div className="mt-10 text-muted text-[11px] leading-relaxed font-mono opacity-30 select-none">
              {`/* backend by day, nmap by night */`}
            </div>
          </div>

          {/* Right: facts */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="grid grid-cols-1 gap-px bg-border2 border border-border2">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-surface p-6 flex gap-5 items-start group hover:bg-surface2 transition-colors"
                  data-hover
                >
                  <div className="w-10 h-10 border border-border2 flex items-center justify-center flex-shrink-0 group-hover:border-accent-dim transition-colors">
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted tracking-widest uppercase mb-1">{label}</div>
                    <div className="text-txt text-[13px]">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CineVault note */}
            <div className="mt-4 border border-accent-dim bg-accent-glow p-4 text-[12px] text-muted">
              <span className="text-accent">// nota:</span> CineVault nació de mi obsesión por el cine.
              El mejor proyecto siempre es el que resuelve algo que vos mismo necesitás.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
