import { useState, useEffect } from 'react'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Parcours from './components/sections/Parcours'
import Experience from './components/sections/Experience'
import Projets from './components/sections/Projets'
import Certifications from './components/sections/Certifications'
import Veille from './components/sections/Veille'
import Contact from './components/sections/Contact'

export default function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      <Sidebar activeSection={activeSection} />
      <main className="flex-1 ml-0 md:ml-20">
        <Hero />
        <About />
        <Parcours />
        <Experience />
        <Projets />
        <Certifications />
        <Veille />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}
