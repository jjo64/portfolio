import { useEffect, useState } from 'react'
import { ArrowRight, GithubLogo } from '@phosphor-icons/react'
import { personal } from '../data/content'

const terminalLines = [
  { prompt: true, cmd: 'whoami' },
  { prompt: false, out: 'josue cueva — backend developer' },
  { prompt: true, cmd: 'curl api.cinevault.art/v1/movies/1' },
  { prompt: false, out: '200 OK · { "title": "Blade Runner 2049" ... }', highlight: true },
  { prompt: true, cmd: 'nmap -sV josue.dev' },
  { prompt: false, out: 'PORT 443/tcp  open  https  nginx' },
  { prompt: true, cmd: 'cat skills.txt' },
  { prompt: false, out: 'Node · TypeScript · Express · Kali · AWS · Docker', highlight: true },
  { prompt: true, cmd: '' },
]

export function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return
    const t = setTimeout(
      () => setVisibleLines((v) => v + 1),
      visibleLines === 0 ? 600 : 280
    )
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <section
      id="home"
      className="relative min-h-screen grid grid-cols-2 overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 grid-bg opacity-40"
        style={{
          maskImage:
            'radial-gradient(ellipse 80% 100% at 0% 50%, black 20%, transparent 80%)',
        }}
      />

      {/* Glow blobs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '15%', left: '-5%',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '5%', right: '0%',
          width: 350, height: 350,
          background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* LEFT */}
      <div className="relative z-10 flex flex-col justify-center px-16 py-32">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 mb-8 text-accent text-[10px] tracking-[4px] uppercase fade-in-up"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <span className="section-line" />
          Backend Developer & Security Enthusiast
        </div>

        {/* Name */}
        <h1
          className="font-display leading-none mb-6 glitch fade-in-up"
          style={{ fontSize: 'clamp(72px, 9vw, 112px)', animationDelay: '0.25s', opacity: 0 }}
        >
          <span className="block text-txt">{personal.firstName}</span>
          <span className="block text-stroke-accent">{personal.lastName}</span>
        </h1>

        {/* Sub */}
        <p
          className="text-muted text-[13px] leading-relaxed max-w-sm mb-10 fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          APIs REST, WebSockets, scraping y seguridad. Node.js + TypeScript en producción.
          Basado en <span className="text-accent">Madrid</span>, de Argentina.
        </p>

        {/* Badges */}
        <div
          className="flex flex-wrap gap-2 mb-10 fade-in-up"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          {['Node.js', 'TypeScript', 'AWS EC2', 'Kali Linux', 'Docker'].map((b) => (
            <span
              key={b}
              className="text-[10px] px-3 py-1 border border-border2 text-muted uppercase tracking-wider bg-surface"
            >
              {b}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex items-center gap-5 fade-in-up"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <a
            href="#projects"
            data-hover
            className="flex items-center gap-2 bg-accent text-bg px-6 py-3 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            Ver Proyectos <ArrowRight size={14} weight="bold" />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="flex items-center gap-2 text-muted text-[11px] tracking-widest uppercase no-underline hover:text-txt transition-colors"
          >
            <GithubLogo size={16} /> GitHub
          </a>
        </div>
      </div>

      {/* RIGHT — Terminal */}
      <div className="relative z-10 flex items-center justify-center border-l border-border2 p-12">
        <div className="w-full max-w-md bg-surface border border-border2">
          {/* Bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-border2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] text-muted flex-1 text-center">
              josue@portfolio — zsh
            </span>
          </div>
          {/* Body */}
          <div className="p-6 text-[12px] leading-[1.9]">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="flex gap-2">
                {line.prompt ? (
                  <>
                    <span className="text-accent flex-shrink-0">❯</span>
                    <span className="text-txt">{line.cmd}</span>
                    {i === visibleLines - 1 && line.cmd === '' && (
                      <span className="term-cursor" />
                    )}
                  </>
                ) : (
                  <span
                    className={`pl-4 ${
                      line.highlight ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    {line.out}
                  </span>
                )}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <div className="flex gap-2">
                <span className="text-accent">❯</span>
                <span className="term-cursor" />
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 right-10 flex flex-col items-center gap-2 text-[10px] text-muted tracking-widest uppercase">
          <span>scroll</span>
          <div
            className="w-px bg-gradient-to-b from-accent to-transparent"
            style={{
              height: 60,
              animation: 'fadeInUp 2s ease infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
