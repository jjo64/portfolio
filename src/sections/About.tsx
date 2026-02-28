import { MapPin, GraduationCap, Briefcase, Heartbeat } from '@phosphor-icons/react'
import { personal } from '../data/content'
import { useInView } from '../hooks/useInView'

const facts = [
  { icon: MapPin,        label: 'Ubicación',  value: 'Madrid, España · De La Plata, Argentina' },
  { icon: GraduationCap, label: 'Formación',  value: 'DAW — Desarrollo de Aplicaciones Web (próximo graduado)' },
  { icon: Briefcase,     label: 'Buscando',   value: 'Rol backend estable con crecimiento real' },
  { icon: Heartbeat,     label: 'Intereses',  value: 'Cine · Seguridad ofensiva · Backend · Infra' },
]

export function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-20 lg:py-32 px-5 sm:px-10 lg:px-16 bg-[#050508] border-t border-[#1e1e30]">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
          <span className="w-8 h-px bg-[#00ff88]" />
          05 — Sobre mí
        </div>

        {/* 1 col on mobile, 2 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* Text */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2
              className="font-display text-[#e8e8f5] mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(36px, 8vw, 64px)', letterSpacing: 2 }}
            >
              Quién soy
            </h2>
            <div className="space-y-4">
              {personal.about.map((p, i) => (
                <p key={i} className="text-[#666680] text-[13px] leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="mt-8 text-[#44445a] text-[11px] font-mono opacity-40 select-none">
              {`/* backend by day, nmap by night */`}
            </div>
          </div>

          {/* Facts card */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="grid grid-cols-1 gap-px bg-[#1e1e30] border border-[#1e1e30]">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-[#0a0a10] p-4 sm:p-6 flex gap-4 items-start group hover:bg-[#0f0f18] transition-colors"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[#1e1e30] flex items-center justify-center flex-shrink-0 group-hover:border-[#00ff8840] transition-colors">
                    <Icon size={16} className="text-[#00ff88]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#44445a] tracking-widest uppercase mb-0.5">{label}</div>
                    <div className="text-[#e8e8f5] text-[12px] sm:text-[13px] leading-snug">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 border border-[#00ff8830] bg-[#00ff8807] p-4 text-[12px] text-[#666680]">
              <span className="text-[#00ff88]">// nota:</span> CineVault nació de mi obsesión por el cine.
              El mejor proyecto siempre es el que resuelve algo que vos mismo necesitás.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
