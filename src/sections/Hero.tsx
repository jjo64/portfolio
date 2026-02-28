import { useEffect, useState } from 'react'
import { ArrowRight, GithubLogo } from '@phosphor-icons/react'
import { personal } from '../data/content'

const terminalLines = [
  { prompt: true, cmd: 'whoami' },
  { prompt: false, out: 'josue cueva — backend developer', highlight: false },
  { prompt: true, cmd: 'curl api.cinevault.art/v1/movies/1' },
  { prompt: false, out: '200 OK · { "title": "Blade Runner 2049" ... }', highlight: true },
  { prompt: true, cmd: 'nmap -sV josue.dev' },
  { prompt: false, out: 'PORT 443/tcp  open  https  nginx', highlight: false },
  { prompt: true, cmd: 'cat skills.txt' },
  { prompt: false, out: 'Node · TypeScript · Express · Kali · AWS', highlight: true },
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
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(#151520 1px, transparent 1px), linear-gradient(90deg, #151520 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 100% at 0% 50%, black 20%, transparent 80%)',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute pointer-events-none" style={{ top: '15%', left: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)' }} />
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '0%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)' }} />

      {/* Content — stacks vertically on mobile, side by side on desktop */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* LEFT — Text */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-10 lg:py-32">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 mb-6 text-[#00ff88] text-[10px] tracking-[3px] uppercase fade-in-up"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="w-8 h-px bg-[#00ff88] flex-shrink-0" />
            <span className="leading-snug">Backend Developer & Security Enthusiast</span>
          </div>

          {/* Name */}
          <h1
            className="font-display leading-none mb-5 glitch fade-in-up"
            style={{ fontSize: 'clamp(60px, 12vw, 112px)', animationDelay: '0.25s', opacity: 0 }}
          >
            <span className="block text-[#e8e8f5]">{personal.firstName}</span>
            <span className="block" style={{ color: 'transparent', WebkitTextStroke: '1.5px #00ff88' }}>
              {personal.lastName}
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-[#666680] text-[13px] leading-relaxed max-w-sm mb-8 fade-in-up"
            style={{ animationDelay: '0.4s', opacity: 0 }}
          >
            APIs REST, WebSockets, scraping y seguridad. Node.js + TypeScript en producción.
            Basado en <span className="text-[#00ff88]">Madrid</span>, de Argentina.
          </p>

          {/* Badges */}
          <div
            className="flex flex-wrap gap-2 mb-8 fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            {['Node.js', 'TypeScript', 'AWS EC2', 'Kali Linux', 'Docker'].map((b) => (
              <span key={b} className="text-[10px] px-3 py-1 border border-[#1e1e30] text-[#44445a] uppercase tracking-wider bg-[#0a0a10]">
                {b}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap items-center gap-4 fade-in-up"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <a
              href="#projects"
              className="flex items-center gap-2 bg-[#00ff88] text-[#050508] px-5 py-3 text-[11px] font-bold tracking-widest uppercase no-underline hover:brightness-110 transition-all hover:-translate-y-0.5"
            >
              Ver Proyectos <ArrowRight size={14} weight="bold" />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#44445a] text-[11px] tracking-widest uppercase no-underline hover:text-[#e8e8f5] transition-colors"
            >
              <GithubLogo size={16} /> GitHub
            </a>
          </div>
        </div>

        {/* RIGHT — Terminal (hidden on small mobile, shown from sm up) */}
        <div className="hidden sm:flex items-center justify-center lg:border-l border-[#1e1e30] p-6 sm:p-10 lg:p-12 pb-10 lg:pb-32 pt-0 lg:pt-32">
          <div className="w-full max-w-md bg-[#0a0a10] border border-[#1e1e30]">
            {/* Bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e30]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[11px] text-[#44445a] flex-1 text-center">josue@portfolio — zsh</span>
            </div>
            {/* Body */}
            <div className="p-5 sm:p-6 text-[11px] sm:text-[12px] leading-[1.9]">
              {terminalLines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="flex gap-2 min-w-0">
                  {line.prompt ? (
                    <>
                      <span className="text-[#00ff88] flex-shrink-0">❯</span>
                      <span className="text-[#e8e8f5] break-all">{line.cmd}</span>
                      {i === visibleLines - 1 && line.cmd === '' && <span className="term-cursor" />}
                    </>
                  ) : (
                    <span className={`pl-4 break-words ${line.highlight ? 'text-[#00ff88]' : 'text-[#44445a]'}`}>
                      {line.out}
                    </span>
                  )}
                </div>
              ))}
              {visibleLines < terminalLines.length && (
                <div className="flex gap-2">
                  <span className="text-[#00ff88]">❯</span>
                  <span className="term-cursor" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="hidden lg:flex absolute bottom-10 right-10 flex-col items-center gap-2 text-[10px] text-[#44445a] tracking-widest uppercase">
        <span>scroll</span>
        <div className="w-px bg-gradient-to-b from-[#00ff88] to-transparent" style={{ height: 60 }} />
      </div>
    </section>
  )
}
