import { useState, useEffect } from 'react'
import { List, X } from '@phosphor-icons/react'
import { navLinks, personal } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNav = (href: string) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? 'bg-[#050508]/95 backdrop-blur-md border-b border-[#1e1e30]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 md:px-10 h-14">
          {/* Logo */}
          <a href="#" className="font-mono text-xs tracking-widest uppercase text-[#00ff88] no-underline">
            <span className="text-[#44445a]">~/</span>josue.dev
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-8 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`no-underline text-[11px] tracking-widest uppercase transition-colors duration-200 relative group ${
                    active === link.href ? 'text-[#e8e8f5]' : 'text-[#44445a] hover:text-[#e8e8f5]'
                  }`}
                >
                  <span className="text-[#00ff88] opacity-0 group-hover:opacity-100 mr-1 transition-opacity">//</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop status */}
          <div className="hidden md:flex items-center gap-2 text-[11px] text-[#44445a]">
            <div className="pulse-dot" />
            <span>disponible</span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#e8e8f5] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050508] flex flex-col justify-center px-8 pt-14">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className="no-underline py-4 border-b border-[#1e1e30] flex items-center justify-between group"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-display text-[#e8e8f5] text-4xl tracking-wide group-hover:text-[#00ff88] transition-colors" style={{ letterSpacing: 2 }}>
                  {link.label}
                </span>
                <span className="text-[#00ff88] text-[11px] tracking-[3px] uppercase">{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2 text-[12px] text-[#44445a]">
            <div className="pulse-dot" />
            <span>disponible para trabajar</span>
          </div>

          <div className="mt-6 text-[#44445a] text-[11px] font-mono">
            {personal.email}
          </div>
        </div>
      )}
    </>
  )
}
