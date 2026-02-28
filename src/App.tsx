import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Hero } from './sections/Hero'
import { Stack } from './sections/Stack'
import { Projects } from './sections/Projects'
import { Demos } from './sections/Demos'
import { About } from './sections/About'
import { Contact } from './sections/Contact'

export default function App() {
  const { dotRef, ringRef } = useCursor()

  // Re-bind cursor hover on dynamic content
  useEffect(() => {
    const rebind = () => {
      const elements = document.querySelectorAll('a, button, [data-hover]')
      elements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dotRef.current?.classList.add('hover')
          ringRef.current?.classList.add('hover')
        })
        el.addEventListener('mouseleave', () => {
          dotRef.current?.classList.remove('hover')
          ringRef.current?.classList.remove('hover')
        })
      })
    }
    rebind()
  }, [dotRef, ringRef])

  return (
    <>
      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />

      <Navbar />

      <main>
        <Hero />
        <Stack />
        <Projects />
        <Demos />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
