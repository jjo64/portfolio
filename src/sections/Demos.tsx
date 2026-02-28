import { useState, useRef, useEffect } from 'react'
import { Play, PaperPlaneTilt } from '@phosphor-icons/react'

type Tab = 'cinevault' | 'chat' | 'scraper' | 'security'

const tabs: { id: Tab; label: string; index: string }[] = [
  { id: 'cinevault', label: 'CineVault',  index: '01' },
  { id: 'chat',      label: 'Chat WS',    index: '02' },
  { id: 'scraper',   label: 'Scraper',    index: '03' },
  { id: 'security',  label: 'Security',   index: '04' },
]

/* ---- CINEVAULT ---- */
function CineVaultDemo() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<null | { title: string; year: number; rating: number; genres: string[] }[]>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true); setError(null)
    try {
      const res = await fetch(`https://api.cinevault.art/movies?search=${encodeURIComponent(query)}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResults(Array.isArray(data?.data) ? data.data.slice(0, 6) : Array.isArray(data) ? data.slice(0, 6) : [])
    } catch {
      setError('No se pudo conectar con la API.')
      setResults(null)
    } finally { setLoading(false) }
  }

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-2xl sm:text-3xl mb-2" style={{ letterSpacing: 1 }}>Explorador CineVault</h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-5">
        Consultas reales contra <span className="text-[#00ff88]">api.cinevault.art</span> en AWS EC2.
      </p>
      <div className="flex mb-5">
        <input
          type="text" value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Buscar película..."
          className="flex-1 min-w-0 bg-[#050508] border border-[#1e1e30] border-r-0 px-3 sm:px-4 py-3 text-[13px] text-[#e8e8f5] placeholder-[#44445a] outline-none focus:border-[#00ff88] transition-colors font-mono"
        />
        <button onClick={handleSearch} disabled={loading}
          className="bg-[#00ff88] text-[#050508] px-4 sm:px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0">
          {loading ? '...' : <><Play size={12} weight="fill" /><span className="hidden sm:inline">Buscar</span></>}
        </button>
      </div>
      {error && <div className="border border-red-500/30 bg-red-500/5 text-red-400 text-[12px] p-3 mb-4">{error}</div>}
      {results !== null && results.length === 0 && (
        <div className="text-[#666680] text-[13px] py-8 text-center border border-[#1e1e30]">Sin resultados para "{query}"</div>
      )}
      {results && results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {results.map((m, i) => (
            <div key={i} className="bg-[#0a0a10] p-4 hover:bg-[#0f0f18] transition-colors group">
              <div className="w-full aspect-[2/3] bg-[#151520] flex items-center justify-center text-3xl mb-3 relative overflow-hidden">
                🎬
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent" />
              </div>
              <div className="text-[#e8e8f5] text-[12px] font-bold mb-1 group-hover:text-[#00ff88] transition-colors line-clamp-2">{m.title}</div>
              <div className="text-[#666680] text-[10px]">{m.year}</div>
              {m.rating && <div className="text-[#ffcc00] text-[10px]">★ {m.rating}</div>}
            </div>
          ))}
        </div>
      )}
      {results === null && !error && !loading && (
        <div className="border border-[#1e1e30] p-6 sm:p-8 text-center text-[#666680] text-[12px]">
          Escribí una película y presioná buscar
        </div>
      )}
    </div>
  )
}

/* ---- CHAT ---- */
type Message = { user: string; text: string; own: boolean }

function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { user: 'visitor_a1b2', text: 'Hola! Qué buena pinta tiene el portfolio 👀', own: false },
    { user: 'visitor_x9z3', text: 'Socket.io + Redis, nice stack 🔥', own: false },
  ])
  const [input, setInput] = useState('')
  const chatBoxRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
  }
  useEffect(() => { scrollToBottom() }, [])

  const send = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { user: 'tú', text: input, own: true }])
    setInput('')
    setTimeout(scrollToBottom, 50)
    setTimeout(() => {
      const r = ['Buena respuesta! 😄','Socket.io es genial','El chat va en tiempo real 🚀','Conectado desde Madrid!']
      setMessages((m) => [...m, { user: 'bot_demo', text: r[Math.floor(Math.random() * r.length)], own: false }])
      setTimeout(scrollToBottom, 50)
    }, 800)
  }

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-2xl sm:text-3xl mb-2" style={{ letterSpacing: 1 }}>Chat en Tiempo Real</h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-5">WebSockets con <span className="text-[#00d4ff]">Socket.io</span>. Salas, usuarios en vivo, Redis.</p>
      <div className="border border-[#1e1e30] flex flex-col" style={{ height: 380 }}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e1e30] bg-[#0a0a10]">
          <span className="text-[#e8e8f5] text-[12px]">#sala-general</span>
          <div className="ml-auto flex items-center gap-2 text-[11px] text-[#00ff88]">
            <div className="pulse-dot" /> 3 online
          </div>
        </div>
        <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex flex-col gap-1 max-w-[85%] ${m.own ? 'self-end items-end' : ''}`}>
              <div className={`text-[10px] tracking-wider uppercase ${m.own ? 'text-[#00d4ff]' : 'text-[#00ff88]'}`}>{m.user}</div>
              <div className={`px-3 py-2 text-[12px] leading-relaxed border text-[#e8e8f5] ${m.own ? 'border-[#00d4ff]/20 bg-[#0a0a10]' : 'border-[#1e1e30] bg-[#0f0f18]'}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1e1e30] flex">
          <input
            type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Escribe un mensaje..."
            className="flex-1 min-w-0 bg-transparent px-4 py-3 text-[12px] text-[#e8e8f5] placeholder-[#44445a] outline-none font-mono"
          />
          <button onClick={send}
            className="px-4 border-l border-[#1e1e30] text-[#00ff88] hover:bg-[#00ff88] hover:text-[#050508] transition-colors flex items-center">
            <PaperPlaneTilt size={14} weight="fill" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- SCRAPER ---- */
type LogLine = { time: string; level: 'INFO' | 'OK' | 'WARN' | 'ERR'; msg: string }
const levelColor: Record<LogLine['level'], string> = {
  INFO: 'text-[#00d4ff]', OK: 'text-[#00ff88]', WARN: 'text-[#ffcc00]', ERR: 'text-[#ff3366]',
}

function ScraperDemo() {
  const [url, setUrl] = useState('https://news.ycombinator.com')
  const [running, setRunning] = useState(false)
  const [logs, setLogs] = useState<LogLine[]>([{ time: '--:--:--', level: 'INFO', msg: 'Esperando URL...' }])
  const [results, setResults] = useState<{ title: string; url: string }[]>([])
  const logRef = useRef<HTMLDivElement>(null)

  const addLog = (level: LogLine['level'], msg: string) => {
    const now = new Date()
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`
    setLogs((l) => [...l, { time, level, msg }])
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, 50)
  }

  const runScraper = async () => {
    if (running) return
    setRunning(true); setResults([]); setLogs([])
    const steps: [number, LogLine['level'], string][] = [
      [0,'INFO','Iniciando scraper...'], [350,'INFO',`Conectando con ${url}`],
      [800,'OK','Conexión establecida — 200 OK'], [1100,'INFO','Parseando HTML con Cheerio...'],
      [1500,'OK','Encontrados 30 items en el DOM'], [1800,'INFO','Extrayendo títulos y URLs...'],
      [2200,'INFO','Filtrando duplicados...'], [2500,'OK','Datos limpios — 24 registros únicos'],
      [2800,'INFO','Guardando en base de datos...'], [3200,'OK','Pipeline completado — 24 registros'],
    ]
    for (const [delay, level, msg] of steps) {
      await new Promise((r) => setTimeout(r, delay))
      addLog(level, msg)
    }
    setResults([
      { title: 'Show HN: Real-time scraper demo', url: 'news.ycombinator.com' },
      { title: 'Ask HN: Best Node.js practices 2025', url: 'news.ycombinator.com' },
      { title: 'TypeScript 5.5 new features', url: 'news.ycombinator.com' },
      { title: 'Docker best practices backend', url: 'news.ycombinator.com' },
      { title: 'Redis 8.0 overview', url: 'news.ycombinator.com' },
      { title: 'Secure APIs with JWT', url: 'news.ycombinator.com' },
    ])
    setRunning(false)
  }

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-2xl sm:text-3xl mb-2" style={{ letterSpacing: 1 }}>Data Pipeline</h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-5">
        <span className="text-[#00ff88]">Cheerio</span> + <span className="text-[#00ff88]">BullMQ</span>. Logs en tiempo real via SSE.
      </p>
      <div className="flex mb-4">
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
          className="flex-1 min-w-0 bg-[#050508] border border-[#1e1e30] border-r-0 px-3 sm:px-4 py-3 text-[12px] text-[#e8e8f5] placeholder-[#44445a] outline-none focus:border-[#00ff88] transition-colors font-mono" />
        <button onClick={runScraper} disabled={running}
          className="bg-[#00ff88] text-[#050508] px-4 sm:px-6 py-3 text-[11px] font-bold tracking-widest uppercase hover:brightness-110 disabled:opacity-50 flex items-center gap-1.5 flex-shrink-0">
          {running ? '⟳' : <><Play size={12} weight="fill" /><span className="hidden sm:inline ml-1">Iniciar</span></>}
        </button>
      </div>
      <div ref={logRef} className="bg-[#050508] border border-[#1e1e30] p-4 h-36 sm:h-44 overflow-y-auto text-[11px] sm:text-[12px] leading-[2] mb-4 font-mono">
        {logs.map((l, i) => (
          <div key={i} className="flex gap-2 sm:gap-3">
            <span className="text-[#44445a] flex-shrink-0 w-14 sm:w-16">{l.time}</span>
            <span className={`flex-shrink-0 w-8 sm:w-12 ${levelColor[l.level]}`}>{l.level}</span>
            <span className="text-[#e8e8f5] break-all">{l.msg}</span>
          </div>
        ))}
      </div>
      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e30] border border-[#1e1e30]">
          {results.map((r, i) => (
            <div key={i} className="bg-[#0a0a10] px-4 py-3 flex items-center gap-3 hover:bg-[#0f0f18] transition-colors group">
              <span className="text-[#44445a] text-[10px] w-5 flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[#e8e8f5] text-[12px] truncate group-hover:text-[#00ff88] transition-colors">{r.title}</div>
                <div className="text-[#44445a] text-[10px]">{r.url}</div>
              </div>
              <span className="text-[9px] px-2 py-0.5 bg-[#00ff8812] text-[#00ff88] border border-[#00ff8830] tracking-wider uppercase flex-shrink-0">ok</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---- SECURITY ---- */
function SecurityDemo() {
  const [blocked, setBlocked] = useState(1247)
  useEffect(() => {
    const t = setInterval(() => setBlocked((v) => v + Math.floor(Math.random() * 3)), 3000)
    return () => clearInterval(t)
  }, [])

  const attacks = [
    { time: '10:47:23', ip: '192.168.1.xxx', type: 'SQL Injection /api/users', status: 'blocked' },
    { time: '10:46:11', ip: '10.0.0.xxx',    type: 'Brute force /api/login (x89)', status: 'blocked' },
    { time: '10:45:59', ip: '172.16.x.x',    type: 'Rate limit exceeded 429', status: 'blocked' },
    { time: '10:45:01', ip: '203.0.113.x',   type: 'Normal GET /movies', status: 'allowed' },
    { time: '10:44:38', ip: '198.51.x.x',    type: 'XSS in query param', status: 'blocked' },
    { time: '10:43:55', ip: '192.0.2.x',     type: 'Path traversal /../etc/passwd', status: 'blocked' },
  ]

  return (
    <div>
      <h3 className="font-display text-[#e8e8f5] text-2xl sm:text-3xl mb-2" style={{ letterSpacing: 1 }}>Security Monitor</h3>
      <p className="text-[#666680] text-[13px] leading-relaxed mb-5">
        Honeypot, rate limiting y detección con <span className="text-[#ff3366]">Kali Linux</span>.
      </p>

      {/* Metrics — 3 col always, smaller on mobile */}
      <div className="grid grid-cols-3 gap-px bg-[#1e1e30] border border-[#1e1e30] mb-4">
        {[
          { label: 'Bloqueadas', value: blocked.toLocaleString(), color: 'text-[#00ff88]', bar: 'bg-[#00ff88]', sub: '↑ 12%' },
          { label: 'Brute force', value: '89',  color: 'text-[#ff3366]', bar: 'bg-[#ff3366]', sub: 'Blocked' },
          { label: 'IPs blacklist', value: '34', color: 'text-[#ffcc00]', bar: 'bg-[#ffcc00]', sub: '24h' },
        ].map((m) => (
          <div key={m.label} className="bg-[#0a0a10] p-3 sm:p-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-0.5 ${m.bar}`} />
            <div className="text-[9px] sm:text-[10px] text-[#666680] tracking-widest uppercase mb-1 sm:mb-3 leading-tight">{m.label}</div>
            <div className={`font-display text-2xl sm:text-4xl lg:text-5xl mb-0.5 sm:mb-1 ${m.color}`} style={{ letterSpacing: 1 }}>{m.value}</div>
            <div className="text-[#666680] text-[10px] sm:text-[11px]">{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Attack log */}
      <div className="bg-[#050508] border border-[#1e1e30] p-4 sm:p-5">
        <div className="text-[10px] text-[#666680] tracking-[3px] uppercase mb-3 pb-3 border-b border-[#1e1e30]">
          // Log de actividad
        </div>
        <div className="space-y-0 overflow-x-auto">
          {attacks.map((a, i) => (
            <div key={i} className="flex items-center gap-2 sm:gap-4 py-2 border-b border-[#1e1e30] last:border-0 text-[10px] sm:text-[11px] hover:bg-[#0a0a10] transition-colors px-1 min-w-0">
              <span className="text-[#44445a] font-mono flex-shrink-0 hidden sm:inline">{a.time}</span>
              <span className="text-[#00d4ff] font-mono flex-shrink-0 w-24 sm:w-32 truncate">{a.ip}</span>
              <span className="text-[#e8e8f5] flex-1 truncate">{a.type}</span>
              <span className={`text-[9px] px-2 py-0.5 text-center tracking-wider uppercase border flex-shrink-0 ${
                a.status === 'blocked'
                  ? 'bg-[#ff3366]/10 text-[#ff3366] border-[#ff3366]/30'
                  : 'bg-[#00ff8812] text-[#00ff88] border-[#00ff8830]'
              }`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ---- MAIN ---- */
export function Demos() {
  const [active, setActive] = useState<Tab>('cinevault')

  return (
    <section id="demos" className="py-20 lg:py-32 px-5 sm:px-10 lg:px-16 bg-[#0a0a10]">
      <div className="flex items-center gap-3 text-[#00ff88] text-[10px] tracking-[4px] uppercase mb-4">
        <span className="w-8 h-px bg-[#00ff88]" />
        04 — En Vivo
      </div>
      <h2 className="font-display text-[#e8e8f5] mb-8 sm:mb-12" style={{ fontSize: 'clamp(36px, 8vw, 64px)', letterSpacing: 2 }}>
        Demos Interactivas
      </h2>

      {/* Tabs — scrollable horizontally on mobile */}
      <div className="flex border-b border-[#1e1e30] overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`flex-shrink-0 px-4 sm:px-7 py-3 text-[10px] sm:text-[11px] tracking-widest uppercase font-mono transition-all border-b-2 mb-[-1px] whitespace-nowrap ${
              active === t.id
                ? 'text-[#e8e8f5] border-[#00ff88]'
                : 'text-[#44445a] border-transparent hover:text-[#e8e8f5]'
            }`}
          >
            <span className="text-[#00ff88] text-[9px] mr-1.5">{t.index}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="border border-[#1e1e30] border-t-0 bg-[#050508] p-5 sm:p-8 lg:p-10">
        {active === 'cinevault' && <CineVaultDemo />}
        {active === 'chat'      && <ChatDemo />}
        {active === 'scraper'   && <ScraperDemo />}
        {active === 'security'  && <SecurityDemo />}
      </div>
    </section>
  )
}
