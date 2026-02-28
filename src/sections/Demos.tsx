import { useState, useRef } from 'react'
import { PlayIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react'

type Tab = 'cinevault' | 'chat' | 'scraper' | 'security'

const tabs: { id: Tab; label: string; index: string }[] = [
  { id: 'cinevault', label: 'CineVault API', index: '01' },
  { id: 'chat', label: 'Chat WS', index: '02' },
  { id: 'scraper', label: 'Web Scraper', index: '03' },
  { id: 'security', label: 'Security', index: '04' },
]

/* ---- CINEVAULT DEMO ---- */
function CineVaultDemo() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<null | { title: string; year: number; rating: number; genres: string[] }[]>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.cinevault.art/api/search?q=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResults(Array.isArray(data?.data) ? data.data.slice(0, 6) : Array.isArray(data) ? data.slice(0, 6) : [])
    } catch (_e) {
      setError('No se pudo conectar con la API. Verificá que esté activa.')
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="font-display text-txt text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Explorador CineVault
      </h3>
      <p className="text-muted text-[13px] leading-relaxed mb-6">
        Consultas reales contra{' '}
        <span className="text-accent">api.cinevault.art</span> desplegada en Railway.
      </p>

      {/* Search */}
      <div className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar película... ej: Inception, Matrix, Dune"
          className="flex-1 bg-bg border border-border2 border-r-0 px-4 py-3 text-[13px] text-txt placeholder-muted outline-none focus:border-accent transition-colors font-mono"
        />
        <button
          onClick={handleSearch}
          data-hover
          disabled={loading}
          className="bg-accent text-bg px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? '...' : <><PlayIcon size={12} weight="fill" /> Buscar</>}
        </button>
      </div>

      {error && (
        <div className="border border-danger/30 bg-danger/5 text-danger text-[12px] p-4 mb-4">
          {error}
        </div>
      )}

      {results !== null && results.length === 0 && (
        <div className="text-muted text-[13px] py-8 text-center border border-border2">
          Sin resultados para "{query}"
        </div>
      )}

      {results && results.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-border2 border border-border2">
          {results.map((m, i) => (
            <div key={i} className="bg-surface p-5 hover:bg-surface2 transition-colors group">
              <div
                className="w-full aspect-[2/3] bg-border flex items-center justify-center text-4xl mb-4 relative overflow-hidden"
              >
                🎬
                <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
              </div>
              <div className="text-txt text-[13px] font-bold mb-1 group-hover:text-accent transition-colors">
                {m.title}
              </div>
              <div className="text-muted text-[11px] mb-1">{m.year}</div>
              {m.rating && (
                <div className="text-warn text-[11px]">★ {m.rating}</div>
              )}
              {m.genres?.length > 0 && (
                <div className="text-muted text-[10px] mt-1">{m.genres.slice(0, 2).join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {results === null && !error && !loading && (
        <div className="border border-border2 p-8 text-center text-muted text-[12px]">
          Escribí el nombre de una película y presioná Buscar o Enter
        </div>
      )}
    </div>
  )
}

/* ---- CHAT DEMO ---- */
type Message = { user: string; text: string; own: boolean }

function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { user: 'visitor_a1b2', text: 'Hola! Qué buena pinta tiene el portfolio 👀', own: false },
    { user: 'visitor_x9z3', text: 'Socket.io + Redis, nice stack 🔥', own: false },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const send = () => {
    if (!input.trim()) return
    const newMsg: Message = { user: 'tú', text: input, own: true }
    setMessages((m) => [...m, newMsg])
    setInput('')
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)

    setTimeout(() => {
      const responses = [
        'Buena respuesta! 😄',
        'Socket.io es genial para esto',
        'Conectado desde Madrid yo también!',
        'El chat funciona en tiempo real 🚀',
      ]
      setMessages((m) => [
        ...m,
        { user: 'bot_demo', text: responses[Math.floor(Math.random() * responses.length)], own: false },
      ])
    }, 800)
  }

  return (
    <div>
      <h3 className="font-display text-txt text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Chat en Tiempo Real
      </h3>
      <p className="text-muted text-[13px] leading-relaxed mb-6">
        WebSockets con <span className="text-cyan">Socket.io</span>. Salas, usuarios en vivo, persistencia con Redis.
      </p>

      <div className="border border-border2 flex flex-col" style={{ height: 420 }}>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-border2 bg-surface">
          <span className="text-txt text-[12px]">#sala-general</span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-accent">
            <div className="pulse-dot" /> 3 online
          </div>
        </div>

        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-1 max-w-[75%] ${m.own ? 'self-end items-end' : ''}`}>
              <div className={`text-[10px] tracking-wider uppercase ${m.own ? 'text-cyan' : 'text-accent'}`}>
                {m.user}
              </div>
              <div className={`px-4 py-2.5 text-[12px] leading-relaxed border ${
                m.own
                  ? 'border-cyan/20 bg-surface'
                  : 'border-border2 bg-surface2'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-border2 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent px-5 py-3.5 text-[12px] text-txt placeholder-muted outline-none font-mono"
          />
          <button
            onClick={send}
            data-hover
            className="px-5 border-l border-border2 text-accent hover:bg-accent hover:text-bg transition-colors flex items-center gap-2 text-[11px] tracking-widest uppercase"
          >
            <PaperPlaneTiltIcon size={14} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- SCRAPER DEMO ---- */
type LogLine = { time: string; level: 'INFO' | 'OK' | 'WARN' | 'ERR'; msg: string }

const levelColor = {
  INFO: 'text-cyan',
  OK: 'text-accent',
  WARN: 'text-warn',
  ERR: 'text-danger',
}

function ScraperDemo() {
  const [url, setUrl] = useState('https://news.ycombinator.com')
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<LogLine[]>([
    { time: '--:--:--', level: 'INFO', msg: 'Esperando URL...' },
  ])
  const [results, setResults] = useState<{ title: string; url: string }[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  const addLog = (level: LogLine['level'], msg: string) => {
    const now = new Date()
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
    setLogs((l) => [...l, { time, level, msg }])
    setTimeout(() => logRef.current?.scrollTo({ top: 9999, behavior: 'smooth' }), 50)
  }

  const runScraper = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setLogs([])

    const steps: [number, LogLine['level'], string][] = [
      [0, 'INFO', `Iniciando scraper...`],
      [350, 'INFO', `Conectando con ${url}`],
      [800, 'OK', `Conexión establecida — 200 OK`],
      [1100, 'INFO', `Parseando HTML con Cheerio...`],
      [1500, 'OK', `Encontrados 30 items en el DOM`],
      [1800, 'INFO', `Extrayendo títulos y URLs...`],
      [2200, 'INFO', `Filtrando duplicados...`],
      [2500, 'OK', `Datos limpios — 24 registros únicos`],
      [2800, 'INFO', `Guardando en base de datos...`],
      [3200, 'OK', `Pipeline completado — 24 registros procesados`],
    ]

    for (const [delay, level, msg] of steps) {
      await new Promise((r) => setTimeout(r, delay))
      addLog(level, msg)
    }

    setResults([
      { title: 'Show HN: I built a real-time scraper demo', url: 'news.ycombinator.com' },
      { title: 'Ask HN: Best Node.js practices in 2025', url: 'news.ycombinator.com' },
      { title: 'TypeScript 5.5 released', url: 'news.ycombinator.com' },
      { title: 'Docker best practices for backend devs', url: 'news.ycombinator.com' },
      { title: 'Redis 8.0 features overview', url: 'news.ycombinator.com' },
      { title: 'Building secure APIs with JWT', url: 'news.ycombinator.com' },
    ])
    setRunning(false)
  }

  return (
    <div>
      <h3 className="font-display text-txt text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Data Pipeline
      </h3>
      <p className="text-muted text-[13px] leading-relaxed mb-6">
        Scraper con <span className="text-accent">Cheerio</span> + <span className="text-accent">BullMQ</span>. Logs en tiempo real via SSE.
      </p>

      <div className="flex mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-bg border border-border2 border-r-0 px-4 py-3 text-[13px] text-txt placeholder-muted outline-none focus:border-accent transition-colors font-mono"
        />
        <button
          onClick={runScraper}
          disabled={running}
          data-hover
          className="bg-accent text-bg px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {running ? '⟳ Corriendo' : <><PlayIcon size={12} weight="fill" /> Iniciar</>}
        </button>
      </div>

      <div ref={logRef} className="bg-bg border border-border2 p-5 h-44 overflow-y-auto text-[12px] leading-[2] mb-4 font-mono">
        {logs.map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-muted flex-shrink-0 w-16">{l.time}</span>
            <span className={`flex-shrink-0 w-12 ${levelColor[l.level]}`}>{l.level}</span>
            <span className="text-txt">{l.msg}</span>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-px bg-border2 border border-border2">
          {results.map((r, i) => (
            <div key={i} className="bg-surface px-4 py-3 flex items-center gap-3 hover:bg-surface2 transition-colors group">
              <span className="text-muted text-[10px] w-5">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <div className="text-txt text-[12px] truncate group-hover:text-accent transition-colors">{r.title}</div>
                <div className="text-muted text-[10px]">{r.url}</div>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-accent-glow text-accent border border-accent-dim tracking-wider uppercase flex-shrink-0">
                scraped
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---- SECURITY DEMO ---- */
function SecurityDemo() {
  const [blocked, setBlocked] = useState(1247)

  // Simulate live counter
  useState(() => {
    const t = setInterval(() => setBlocked((v) => v + Math.floor(Math.random() * 3)), 3000)
    return () => clearInterval(t)
  })

  const attacks = [
    { time: '10:47:23', ip: '192.168.1.xxx', type: 'SQL Injection attempt on /api/users', status: 'blocked' },
    { time: '10:46:11', ip: '10.0.0.xxx', type: 'Brute force /api/auth/login (x89)', status: 'blocked' },
    { time: '10:45:59', ip: '172.16.x.x', type: 'Rate limit exceeded — 429 Too Many Requests', status: 'blocked' },
    { time: '10:45:01', ip: '203.0.113.x', type: 'Normal API request GET /movies', status: 'allowed' },
    { time: '10:44:38', ip: '198.51.x.x', type: 'XSS payload in query param', status: 'blocked' },
    { time: '10:43:55', ip: '192.0.2.x', type: 'Path traversal attempt /../../../etc/passwd', status: 'blocked' },
  ]

  return (
    <div>
      <h3 className="font-display text-txt text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Security Monitor
      </h3>
      <p className="text-muted text-[13px] leading-relaxed mb-6">
        Honeypot, rate limiting y detección de ataques con <span className="text-danger">conocimiento de Kali Linux</span> y redes.
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-px bg-border2 border border-border2 mb-4">
        {[
          { label: 'Requests bloqueadas', value: blocked.toLocaleString(), color: 'text-accent', bar: 'bg-accent', sub: '↑ 12% vs ayer' },
          { label: 'Brute force detectados', value: '89', color: 'text-danger', bar: 'bg-danger', sub: 'Todos bloqueados' },
          { label: 'IPs en blacklist', value: '34', color: 'text-warn', bar: 'bg-warn', sub: 'Últimas 24h' },
        ].map((m) => (
          <div key={m.label} className="bg-surface p-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${m.bar}`} />
            <div className="text-[10px] text-muted tracking-widest uppercase mb-3">{m.label}</div>
            <div className={`font-display text-5xl mb-1 ${m.color}`} style={{ letterSpacing: 1 }}>
              {m.value}
            </div>
            <div className="text-muted text-[11px]">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Attack log */}
      <div className="bg-bg border border-border2 p-5">
        <div className="text-[10px] text-muted tracking-[3px] uppercase mb-4 pb-3 border-b border-border2">
          // Log de actividad reciente
        </div>
        <div className="space-y-0">
          {attacks.map((a, i) => (
            <div key={i} className="grid grid-cols-[80px_120px_1fr_80px] gap-4 py-2.5 border-b border-border2 last:border-0 text-[11px] items-center hover:bg-surface transition-colors px-2">
              <span className="text-muted font-mono">{a.time}</span>
              <span className="text-cyan font-mono">{a.ip}</span>
              <span className="text-txt truncate">{a.type}</span>
              <span
                className={`text-[9px] px-2 py-1 text-center tracking-wider uppercase border ${
                  a.status === 'blocked'
                    ? 'bg-danger/10 text-danger border-danger/30'
                    : 'bg-accent-glow text-accent border-accent-dim'
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- MAIN DEMOS SECTION ---- */
export function Demos() {
  const [active, setActive] = useState<Tab>('cinevault')

  return (
    <section id="demos" className="py-32 px-16 bg-surface">
      <div className="flex items-center gap-3 text-accent text-[10px] tracking-[4px] uppercase mb-4">
        <span className="section-line" />
        04 — En Vivo
      </div>
      <h2
        className="font-display text-txt mb-12"
        style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}
      >
        Demos Interactivas
      </h2>

      {/* Tabs */}
      <div className="flex border-b border-border2 mb-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            data-hover
            className={`px-7 py-3.5 text-[11px] tracking-widest uppercase font-mono transition-all border-b-2 mb-[-1px] ${
              active === t.id
                ? 'text-txt border-accent'
                : 'text-muted border-transparent hover:text-txt'
            }`}
          >
            <span className="text-accent text-[9px] mr-2">{t.index}</span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="border border-border2 border-t-0 bg-bg p-10">
        {active === 'cinevault' && <CineVaultDemo />}
        {active === 'chat' && <ChatDemo />}
        {active === 'scraper' && <ScraperDemo />}
        {active === 'security' && <SecurityDemo />}
      </div>
    </section>
  )
}
