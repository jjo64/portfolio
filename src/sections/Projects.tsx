import { ArrowRight, GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'
import { projects } from '../data/content'
import { useInView } from '../hooks/useInView'

const tagColors: Record<string, string> = {
  accent: 'text-[#00ff88]',
  cyan:   'text-[#00d4ff]',
  danger: 'text-[#ff3366]',
}

export function Projects() {
  const { ref, inView } = useInView()
  const featured = projects[0]
  const rest = projects.slice(1)

  return (
    <section id="projects" className="py-20 lg:py-32 px-5 sm:px-10 lg:px-16 bg-[#050508]">
      <div ref={ref}>
        <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
          <span className="w-8 h-px bg-[#00ff88]" />
          03 — Proyectos
        </div>
        <h2
          className={`font-display text-[#e8e8f5] mb-10 lg:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ fontSize: 'clamp(36px, 8vw, 64px)', letterSpacing: 2 }}
        >
          Lo que he construido
        </h2>

        {/* Featured — stacks vertically on mobile */}
        <div
          className={`border border-[#1e1e30] bg-[#0a0a10] mb-px transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {/* Info */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="text-[11px] text-[#44445a] tracking-widest uppercase mb-3">
              {featured.number} / FEATURED
            </div>
            <div className={`text-[10px] tracking-[3px] uppercase mb-3 flex items-center gap-2 ${tagColors[featured.tagColor]}`}>
              ⬡ {featured.tag}
            </div>
            <h3 className="font-display text-[#e8e8f5] text-3xl sm:text-4xl mb-4" style={{ letterSpacing: 1 }}>
              {featured.name}
            </h3>
            <p className="text-[#666680] text-[13px] leading-relaxed mb-5 max-w-xl">
              {featured.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {featured.chips.map((c) => (
                <span key={c} className="text-[10px] px-2 py-1 border border-[#1e1e30] text-[#44445a] uppercase tracking-wide">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#demos" className="flex items-center gap-2 bg-[#00ff88] text-[#050508] px-5 py-2.5 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all">
                ▸ Ver Demo
              </a>
              {featured.liveUrl && (
                <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#44445a] text-[11px] tracking-widest uppercase no-underline hover:text-[#e8e8f5] transition-colors">
                  Live <ArrowSquareOut size={13} />
                </a>
              )}
              <a href={featured.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#44445a] text-[11px] tracking-widest uppercase no-underline hover:text-[#e8e8f5] transition-colors">
                <GithubLogo size={14} /> Code
              </a>
            </div>
          </div>

          {/* API preview — hidden on small mobile, shown from sm */}
          <div className="hidden sm:flex border-t border-[#1e1e30] p-6 sm:p-8 items-center justify-center bg-[#050508]">
            <div className="w-full max-w-sm bg-[#0a0a10] border border-[#1e1e30] text-[12px]">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1e1e30]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <div className="flex-1 bg-[#0a0a10] border border-[#151520] mx-2 px-3 py-1 text-[#44445a] text-[10px] truncate">
                  api.cinevault.art/v1/movies/42
                </div>
              </div>
              <pre className="p-4 sm:p-5 text-[11px] leading-relaxed overflow-auto">
{`{
  `}<span className="text-[#00d4ff]">"id"</span>{`: `}<span className="text-[#ffcc00]">42</span>{`,
  `}<span className="text-[#00d4ff]">"title"</span>{`: `}<span className="text-[#00ff88]">"Blade Runner 2049"</span>{`,
  `}<span className="text-[#00d4ff]">"year"</span>{`: `}<span className="text-[#ffcc00]">2017</span>{`,
  `}<span className="text-[#00d4ff]">"rating"</span>{`: `}<span className="text-[#ffcc00]">8.0</span>{`,
  `}<span className="text-[#00d4ff]">"available"</span>{`: `}<span className="text-[#ff3366]">true</span>{`
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Rest — 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {rest.map((p, i) => (
            <div
              key={p.id}
              className={`bg-[#0a0a10] p-6 sm:p-8 flex flex-col relative group hover:bg-[#0f0f18] transition-all duration-700`}
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.5s ease ${(i + 2) * 100}ms, transform 0.5s ease ${(i + 2) * 100}ms, background 0.3s`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#00ff88] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-[11px] text-[#44445a] tracking-widest mb-3">{p.number}</div>
              <div className={`text-[10px] tracking-[3px] uppercase mb-3 ${tagColors[p.tagColor]}`}>{p.tag}</div>
              <h3 className="font-display text-[#e8e8f5] text-2xl sm:text-3xl mb-3" style={{ letterSpacing: 1 }}>{p.name}</h3>
              <p className="text-[#666680] text-[12px] leading-relaxed flex-1 mb-5">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {p.chips.map((c) => (
                  <span key={c} className="text-[9px] px-2 py-1 border border-[#1e1e30] text-[#44445a] uppercase tracking-wide">{c}</span>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <a href="#demos" className="flex items-center gap-1 text-[#00ff88] text-[11px] tracking-widest uppercase no-underline hover:gap-2 transition-all">
                  Demo <ArrowRight size={12} />
                </a>
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#44445a] hover:text-[#e8e8f5] transition-colors">
                  <GithubLogo size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
