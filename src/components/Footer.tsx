export function Footer() {
  return (
    <footer className="border-t border-[#1e1e30] px-5 sm:px-10 lg:px-16 py-5 sm:py-6 bg-[#050508]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#44445a]">
        <span><span className="text-[#00ff88]">~/</span>josue.dev</span>
        <span className="text-center">React · Vite · TypeScript · Desplegado en Vercel</span>
        <span>Madrid {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
