import { ArrowSquareOutIcon, GithubLogoIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { projects } from '../data/content'
import { useInView } from '../hooks/useInView'

const tagColors = {
  accent: 'text-accent',
  cyan: 'text-cyan',
  danger: 'text-danger',
}

export function Projects() {
  const { ref, inView } = useInView()
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" className="py-32 px-16 bg-bg">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-accent text-[10px] tracking-[4px] uppercase mb-4">
          <span className="section-line" />
          03 — Proyectos
        </div>
        <h2
          className={`font-display text-txt mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}
        >
          Lo que he construido
        </h2>

        {/* Featured */}
        <div
          className={`border border-border2 bg-surface grid grid-cols-2 mb-px transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="p-10 flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="text-[11px] text-muted tracking-widest uppercase mb-4">
                {featured.number} / FEATURED
              </div>
              <div className={`text-[10px] tracking-[3px] uppercase mb-3 flex items-center gap-2 ${tagColors[featured.tagColor]}`}>
                ⬡ {featured.tag}
              </div>
              <h3 className="font-display text-txt text-4xl mb-4" style={{ letterSpacing: 1 }}>
                {featured.name}
              </h3>
              <p className="text-muted text-[13px] leading-relaxed mb-6">
                {featured.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {featured.chips.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-1 border border-border2 text-muted uppercase tracking-wide">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#demos"
                data-hover
                className="flex items-center gap-2 bg-accent text-bg px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all hover:-translate-y-0.5"
              >
                ▸ Ver Demo
              </a>
              {featured.liveUrl && (
                <a
                  href={featured.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="flex items-center gap-1 text-muted text-[11px] tracking-widest uppercase no-underline hover:text-txt transition-colors"
                >
                  Live <ArrowSquareOutIcon size={13} />
                </a>
              )}
              <a
                href={featured.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="flex items-center gap-1 text-muted text-[11px] tracking-widest uppercase no-underline hover:text-txt transition-colors"
              >
                <GithubLogoIcon size={14} /> Code
              </a>
            </div>
          </div>

          {/* API preview */}
          <div className="border-l border-border2 p-8 flex items-center justify-center bg-bg">
            <div className="w-full max-w-sm bg-surface border border-border2 text-[12px]">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-border2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="flex-1 bg-surface border border-border mx-2 px-3 py-1 text-muted text-[10px]">
                  api.cinevault.art/v1/movies/42
                </div>
              </div>
              <pre className="p-5 text-[11px] leading-relaxed overflow-auto">
{`{
  `}<span className="text-cyan">"id"</span>{`: `}<span className="text-warn">42</span>{`,
  `}<span className="text-cyan">"title"</span>{`: `}<span className="text-accent">"Blade Runner 2049"</span>{`,
  `}<span className="text-cyan">"year"</span>{`: `}<span className="text-warn">2017</span>{`,
  `}<span className="text-cyan">"rating"</span>{`: `}<span className="text-warn">8.0</span>{`,
  `}<span className="text-cyan">"genres"</span>{`: [`}<span className="text-accent">"sci-fi"</span>{`],
  `}<span className="text-cyan">"available"</span>{`: `}<span className="text-danger">true</span>{`
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Grid of 3 */}
        <div className="grid grid-cols-3 gap-px bg-border2 border border-border2">
          {rest.map((p, i) => (
            <div
              key={p.id}
              className={`bg-surface p-8 flex flex-col relative group transition-all duration-700 hover:bg-surface2 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${(i + 2) * 100}ms` }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <div className="text-[11px] text-muted tracking-widest mb-4">{p.number}</div>
              <div className={`text-[10px] tracking-[3px] uppercase mb-3 ${tagColors[p.tagColor]}`}>
                {p.tag}
              </div>
              <h3 className="font-display text-txt text-3xl mb-3" style={{ letterSpacing: 1 }}>
                {p.name}
              </h3>
              <p className="text-muted text-[12px] leading-relaxed flex-1 mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.chips.map((c) => (
                  <span key={c} className="text-[9px] px-2 py-1 border border-border2 text-muted uppercase tracking-wide">
                    {c}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <a
                  href="#demos"
                  data-hover
                  className="flex items-center gap-1 text-accent text-[11px] tracking-widest uppercase no-underline hover:gap-2 transition-all"
                >
                  Demo <ArrowRightIcon size={12} />
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-hover
                  className="text-muted hover:text-txt transition-colors"
                >
                  <GithubLogoIcon size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
