import { personal } from '../data/content'

export function Footer() {
  return (
    <footer className="border-t border-border2 px-16 py-6 flex items-center justify-between text-[11px] text-muted bg-bg">
      <span>
        <span className="text-accent">~/</span>josue.dev
      </span>
      <span>Construido con React · Vite · Desplegado en Vercel</span>
      <span>Madrid {new Date().getFullYear()}</span>
    </footer>
  )
}
