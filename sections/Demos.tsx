import { useState, useRef, useEffect } from 'react'
import { Play, PaperPlaneTilt } from '@phosphor-icons/react'

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
      const res = await fetch(`https://api.cinevault.art/movies?search=${encodeURIComponent(query)}`)
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
      <h3 className="font-display text-[#e8e8f5] text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Explorador CineVault
      </h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-6">
        Consultas reales contra{' '}
        <span className="text-[#00ff88]">api.cinevault.art</span> desplegada en AWS EC2.
      </p>

      <div className="flex mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar película... ej: Inception, Matrix, Dune"
          className="flex-1 bg-[#050508] border border-[#1e1e30] border-r-0 px-4 py-3 text-[13px] text-[#e8e8f5] placeholder-[#44445a] outline-none focus:border-[#00ff88] transition-colors font-mono"
        />
        <button
          onClick={handleSearch}
          data-hover
          disabled={loading}
          className="bg-[#00ff88] text-[#050508] px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? '...' : <><Play size={12} weight="fill" /> Buscar</>}
        </button>
      </div>

      {error && (
        <div className="border border-red-500/30 bg-red-500/5 text-red-400 text-[12px] p-4 mb-4">
          {error}
        </div>
      )}

      {results !== null && results.length === 0 && (
        <div className="text-[#666680] text-[13px] py-8 text-center border border-[#1e1e30]">
          Sin resultados para "{query}"
        </div>
      )}

      {results && results.length > 0 && (
        <div className="grid grid-cols-3 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {results.map((m, i) => (
            <div key={i} className="bg-[#0a0a10] p-5 hover:bg-[#0f0f18] transition-colors group">
              <div className="w-full aspect-[2/3] bg-[#151520] flex items-center justify-center text-4xl mb-4 relative overflow-hidden">
                🎬
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent" />
              </div>
              <div className="text-[#e8e8f5] text-[13px] font-bold mb-1 group-hover:text-[#00ff88] transition-colors">
                {m.title}
              </div>
              <div className="text-[#666680] text-[11px] mb-1">{m.year}</div>
              {m.rating && <div className="text-[#ffcc00] text-[11px]">★ {m.rating}</div>}
              {m.genres?.length > 0 && (
                <div className="text-[#666680] text-[10px] mt-1">{m.genres.slice(0, 2).join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {results === null && !error && !loading && (
        <div className="border border-[#1e1e30] p-8 text-center text-[#666680] text-[12px]">
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
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }

  useEffect(() => { scrollToBottom() }, [])

  const send = () => {
    if (!input.trim()) return
    const newMsg: Message = { user: 'tú', text: input, own: true }
    setMessages((m) => [...m, newMsg])
    setInput('')
    setTimeout(scrollToBottom, 50)

    setTimeout(() => {
      const responses = [
        'Buena respuesta! 😄',
        'Socket.io es genial para esto',
        'Conectado desde Madrid también!',
        'El chat funciona en tiempo real 🚀',
      ]
      setMessages((m) => [
        ...m,
        { user: 'bot_demo', text: responses[Math.floor(Math.random() * responses.length)], own: false },
      ])
      setTimeout(scrollToBottom, 50)
    }, 800)
  }

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Chat en Tiempo Real
      </h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-6">
        WebSockets con <span className="text-[#00d4ff]">Socket.io</span>. Salas, usuarios en vivo, persistencia con Redis.
      </p>

      <div className="border border-[#1e1e30] flex flex-col" style={{ height: 420 }}>
        <div className="flex items-center gap-3 px-5 py-3 border-b border-[#1e1e30] bg-[#0a0a10]">
          <span className="text-[#e8e8f5] text-[12px]">#sala-general</span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-[#00ff88]">
            <div className="pulse-dot" /> 3 online
          </div>
        </div>

        {/* Scroll container — NO scrollIntoView, just scrollTop */}
        <div
          ref={chatBoxRef}
          className="flex-1 p-5 overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-1 max-w-[75%] ${m.own ? 'self-end items-end' : ''}`}>
              <div className={`text-[10px] tracking-wider uppercase ${m.own ? 'text-[#00d4ff]' : 'text-[#00ff88]'}`}>
                {m.user}
              </div>
              <div className={`px-4 py-2.5 text-[12px] leading-relaxed border text-[#e8e8f5] ${
                m.own ? 'border-[#00d4ff]/20 bg-[#0a0a10]' : 'border-[#1e1e30] bg-[#0f0f18]'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e1e30] flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent px-5 py-3.5 text-[12px] text-[#e8e8f5] placeholder-[#44445a] outline-none font-mono"
          />
          <button
            onClick={send}
            data-hover
            className="px-5 border-l border-[#1e1e30] text-[#00ff88] hover:bg-[#00ff88] hover:text-[#050508] transition-colors flex items-center"
          >
            <PaperPlaneTilt size={14} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- SCRAPER DEMO ---- */
type LogLine = { time: string; level: 'INFO' | 'OK' | 'WARN' | 'ERR'; msg: string }

const levelColor: Record<LogLine['level'], string> = {
  INFO: 'text-[#00d4ff]',
  OK: 'text-[#00ff88]',
  WARN: 'text-[#ffcc00]',
  ERR: 'text-[#ff3366]',
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
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
    setLogs((l) => [...l, { time, level, msg }])
    setTimeout(() => {
      if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
    }, 50)
  }

  const runScraper = async () => {
    if (running) return
    setRunning(true)
    setResults([])
    setLogs([])

    const steps: [number, LogLine['level'], string][] = [
      [0,    'INFO', `Iniciando scraper...`],
      [350,  'INFO', `Conectando con ${url}`],
      [800,  'OK',   `Conexión establecida — 200 OK`],
      [1100, 'INFO', `Parseando HTML con Cheerio...`],
      [1500, 'OK',   `Encontrados 30 items en el DOM`],
      [1800, 'INFO', `Extrayendo títulos y URLs...`],
      [2200, 'INFO', `Filtrando duplicados...`],
      [2500, 'OK',   `Datos limpios — 24 registros únicos`],
      [2800, 'INFO', `Guardando en base de datos...`],
      [3200, 'OK',   `Pipeline completado — 24 registros procesados`],
    ]

    for (const [delay, level, msg] of steps) {
      await new Promise((r) => setTimeout(r, delay))
      addLog(level, msg)
    }

    setResults([
      { title: 'Show HN: I built a real-time scraper demo', url: 'news.ycombinator.com' },
      { title: 'Ask HN: Best Node.js practices in 2025', url: 'news.ycombinator.com' },
      { title: 'TypeScript 5.5 released with new features', url: 'news.ycombinator.com' },
      { title: 'Docker best practices for backend devs', url: 'news.ycombinator.com' },
      { title: 'Redis 8.0 features overview', url: 'news.ycombinator.com' },
      { title: 'Building secure APIs with JWT', url: 'news.ycombinator.com' },
    ])
    setRunning(false)
  }

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Data Pipeline
      </h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-6">
        Scraper con <span className="text-[#00ff88]">Cheerio</span> + <span className="text-[#00ff88]">BullMQ</span>. Logs en tiempo real via SSE.
      </p>

      <div className="flex mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 bg-[#050508] border border-[#1e1e30] border-r-0 px-4 py-3 text-[13px] text-[#e8e8f5] placeholder-[#44445a] outline-none focus:border-[#00ff88] transition-colors font-mono"
        />
        <button
          onClick={runScraper}
          disabled={running}
          data-hover
          className="bg-[#00ff88] text-[#050508] px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {running ? '⟳ Corriendo' : <><Play size={12} weight="fill" /> Iniciar</>}
        </button>
      </div>

      <div ref={logRef} className="bg-[#050508] border border-[#1e1e30] p-5 h-44 overflow-y-auto text-[12px] leading-[2] mb-4 font-mono">
        {logs.map((l, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-[#44445a] flex-shrink-0 w-16">{l.time}</span>
            <span className={`flex-shrink-0 w-12 ${levelColor[l.level]}`}>{l.level}</span>
            <span className="text-[#e8e8f5]">{l.msg}</span>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-2 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {results.map((r, i) => (
            <div key={i} className="bg-[#0a0a10] px-4 py-3 flex items-center gap-3 hover:bg-[#0f0f18] transition-colors group">
              <span className="text-[#44445a] text-[10px] w-5">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[#e8e8f5] text-[12px] truncate group-hover:text-[#00ff88] transition-colors">{r.title}</div>
                <div className="text-[#44445a] text-[10px]">{r.url}</div>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-[#00ff8812] text-[#00ff88] border border-[#00ff8830] tracking-wider uppercase flex-shrink-0">
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

  useEffect(() => {
    const t = setInterval(() => setBlocked((v) => v + Math.floor(Math.random() * 3)), 3000)
    return () => clearInterval(t)
  }, [])

  const attacks = [
    { time: '10:47:23', ip: '192.168.1.xxx', type: 'SQL Injection attempt on /api/users', status: 'blocked' },
    { time: '10:46:11', ip: '10.0.0.xxx', type: 'Brute force /api/auth/login (x89)', status: 'blocked' },
    { time: '10:45:59', ip: '172.16.x.x', type: 'Rate limit exceeded — 429 Too Many Requests', status: 'blocked' },
    { time: '10:45:01', ip: '203.0.113.x', type: 'Normal API request GET /movies', status: 'allowed' },
    { time: '10:44:38', ip: '198.51.x.x', type: 'XSS payload in query param', status: 'blocked' },
    { time: '10:43:55', ip: '192.0.2.x', type: 'Path traversal /../../../etc/passwd', status: 'blocked' },
  ]

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-3xl mb-2" style={{ letterSpacing: 1 }}>
        Security Monitor
      </h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-6">
        Honeypot, rate limiting y detección de ataques con{' '}
        <span className="text-[#ff3366]">conocimiento de Kali Linux</span> y redes.
      </p>

      <div className="grid grid-cols-3 gap-px bg-[#1e1e30] border border-[#1e1e30] mb-4">
        {[
          { label: 'Requests bloqueadas', value: blocked.toLocaleString(), color: 'text-[#00ff88]', bar: 'bg-[#00ff88]', sub: '↑ 12% vs ayer' },
          { label: 'Brute force detectados', value: '89', color: 'text-[#ff3366]', bar: 'bg-[#ff3366]', sub: 'Todos bloqueados' },
          { label: 'IPs en blacklist', value: '34', color: 'text-[#ffcc00]', bar: 'bg-[#ffcc00]', sub: 'Últimas 24h' },
        ].map((m) => (
          <div key={m.label} className="bg-[#0a0a10] p-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${m.bar}`} />
            <div className="text-[10px] text-[#666680] tracking-widest uppercase mb-3">{m.label}</div>
            <div className={`font-display text-5xl mb-1 ${m.color}`} style={{ letterSpacing: 1 }}>
              {m.value}
            </div>
            <div className="text-[#666680] text-[11px]">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#050508] border border-[#1e1e30] p-5">
        <div className="text-[10px] text-[#666680] tracking-[3px] uppercase mb-4 pb-3 border-b border-[#1e1e30]">
          // Log de actividad reciente
        </div>
        {attacks.map((a, i) => (
          <div key={i} className="grid grid-cols-[80px_120px_1fr_80px] gap-4 py-2.5 border-b border-[#1e1e30] last:border-0 text-[11px] items-center hover:bg-[#0a0a10] transition-colors px-2">
            <span className="text-[#44445a] font-mono">{a.time}</span>
            <span className="text-[#00d4ff] font-mono">{a.ip}</span>
            <span className="text-[#e8e8f5] truncate">{a.type}</span>
            <span className={`text-[9px] px-2 py-1 text-center tracking-wider uppercase border ${
              a.status === 'blocked'
                ? 'bg-[#ff3366]/10 text-[#ff3366] border-[#ff3366]/30'
                : 'bg-[#00ff8812] text-[#00ff88] border-[#00ff8830]'
            }`}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- MAIN ---- */
export function Demos() {
  const [active, setActive] = useState<Tab>('cinevault')

  return (
    <section id="demos" className="py-32 px-16 bg-[#0a0a10]">
      <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
        <span className="section-line" />
        04 — En Vivo
      </div>
      <h2 className="font-display text-[#e8e8f5] mb-12" style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: 2 }}>
        Demos Interactivas
      </h2>

      <div className="flex border-b border-[#1e1e30] mb-0">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            data-hover
            className={`px-7 py-3.5 text-[11px] tracking-widest uppercase font-mono transition-all border-b-2 mb-[-1px] ${
              active === t.id
                ? 'text-[#e8e8f5] border-[#00ff88]'
                : 'text-[#44445a] border-transparent hover:text-[#e8e8f5]'
            }`}
          >
            <span className="text-[#00ff88] text-[9px] mr-2">{t.index}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="border border-[#1e1e30] border-t-0 bg-[#050508] p-10">
        {active === 'cinevault' && <CineVaultDemo />}
        {active === 'chat' && <ChatDemo />}
        {active === 'scraper' && <ScraperDemo />}
        {active === 'security' && <SecurityDemo />}
      </div>
    </section>
  )
}
