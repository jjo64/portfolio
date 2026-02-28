import { GithubLogo, Envelope, ArrowRight } from '@phosphor-icons/react'
import { personal } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Contact() {
  const { ref, inView } = useInView()

  const links = [
    { icon: Envelope,   label: 'Email',  value: personal.email,         href: `mailto:${personal.email}` },
    { icon: GithubLogo, label: 'GitHub', value: personal.githubHandle,  href: personal.github },
  ]

  return (
    <section id="contact" className="py-20 lg:py-32 px-5 sm:px-10 lg:px-16 bg-[#0a0a10] border-t border-[#1e1e30]">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
          <span className="w-8 h-px bg-[#00ff88]" />
          06 — Contacto
        </div>

        {/* 1 col on mobile, 2 on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* CTA text */}
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2
              className="font-display leading-none mb-5 sm:mb-6"
              style={{ fontSize: 'clamp(48px, 12vw, 80px)', letterSpacing: 2 }}
            >
              <span className="text-[#e8e8f5] block">¿Hablamos?</span>
              <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1.5px #00ff88' }}>
                Disponible.
              </span>
            </h2>
            <p className="text-[#666680] text-[13px] leading-relaxed max-w-sm mb-8">
              Busco una empresa donde pueda quedarme, crecer y tomar responsabilidades reales.
              Backend, seguridad o infra — escribime.
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 bg-[#00ff88] text-[#050508] px-6 py-3 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all hover:-translate-y-0.5"
            >
              Escribir un email <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          {/* Links */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="flex flex-col gap-px bg-[#1e1e30] border border-[#1e1e30]">
              {links.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 bg-[#0a0a10] hover:bg-[#0f0f18] transition-all no-underline group hover:pl-7 sm:hover:pl-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-[#1e1e30] flex items-center justify-center flex-shrink-0 group-hover:border-[#00ff8840] transition-colors">
                      <Icon size={16} className="text-[#00ff88]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-[#44445a] tracking-widest uppercase mb-0.5">{label}</div>
                      <div className="text-[#e8e8f5] text-[13px] sm:text-[14px] truncate">{value}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-[#00ff88] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>

            <div className="mt-4 text-[#44445a] text-[11px] flex items-center gap-2">
              <span className="text-[#00ff88]">▸</span>
              Madrid, España · Open to remote & relocation
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
