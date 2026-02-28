import { useState, useEffect } from 'react'
import { navLinks, personal } from '../data/content'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border2' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-10 h-14">
        {/* Logo */}
        <a
          href="#"
          className="font-mono text-xs tracking-widest uppercase text-accent no-underline"
          data-hover
        >
          <span className="text-muted">~/</span>josue.dev
        </a>

        {/* Links */}
        <ul className="flex gap-8 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-hover
                onClick={() => setActive(link.href)}
                className={`no-underline text-[11px] tracking-widest uppercase transition-colors duration-200 relative group ${
                  active === link.href ? 'text-txt' : 'text-muted hover:text-txt'
                }`}
              >
                <span className="text-accent opacity-0 group-hover:opacity-100 mr-1 transition-opacity">
                  //
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Status */}
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <div className="pulse-dot" />
          <span>disponible</span>
        </div>
      </div>
    </nav>
  )
}
