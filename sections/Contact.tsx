import { GithubLogo, Envelope, ArrowRight } from '@phosphor-icons/react'
import { personal } from '../data/content'
import { useInView } from '../hooks/useInView'

export function Contact() {
  const { ref, inView } = useInView()

  const links = [
    {
      icon: Envelope,
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      icon: GithubLogo,
      label: 'GitHub',
      value: personal.githubHandle,
      href: personal.github,
    },
  ]

  return (
    <section id="contact" className="py-32 px-16 bg-surface border-t border-border2">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-accent text-[10px] tracking-[4px] uppercase mb-4">
          <span className="section-line" />
          06 — Contacto
        </div>

        <div className="grid grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <h2
              className="font-display leading-none mb-6"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: 2 }}
            >
              <span className="text-txt block">¿Hablamos?</span>
              <span className="text-stroke-accent block">Disponible.</span>
            </h2>
            <p className="text-muted text-[13px] leading-relaxed max-w-sm">
              Busco una empresa donde pueda quedarme, crecer y tomar responsabilidades reales.
              Si trabajás en backend, seguridad o infraestructura, escribime.
            </p>

            <div className="mt-8">
              <a
                href={`mailto:${personal.email}`}
                data-hover
                className="inline-flex items-center gap-2 bg-accent text-bg px-7 py-3.5 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all hover:-translate-y-0.5"
              >
                Escribir un email <ArrowRight size={14} weight="bold" />
              </a>
            </div>
          </div>

          {/* Right */}
          <div
            className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="flex flex-col gap-px bg-border2 border border-border2">
              {links.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  data-hover
                  className="flex items-center justify-between px-6 py-5 bg-surface hover:bg-surface2 transition-all no-underline group hover:pl-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 border border-border2 flex items-center justify-center group-hover:border-accent-dim transition-colors">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted tracking-widest uppercase mb-0.5">{label}</div>
                      <div className="text-txt text-[14px]">{value}</div>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>

            {/* Location note */}
            <div className="mt-4 text-muted text-[11px] flex items-center gap-2">
              <span className="text-accent">▸</span>
              Madrid, España · Open to remote & relocation
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
