import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'

const phrases = ["Développeur Web", "Étudiant BTS SIO SLAM", "Passionné par l'éthique tech"]

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setPhraseIndex((p) => (p + 1) % phrases.length)
    }

    setDisplayed(current.slice(0, charIndex))
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex])

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#e63946]/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        {/* Avatar */}
        <div className="w-28 h-28 rounded-full border-2 border-[#e63946]/60 overflow-hidden">
          <img
            src="/my-notion-face-transparent.png"
            alt="Caio Lesnioski"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            Caio <span className="text-[#e63946]">Lesnioski</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/70 h-8">
            {displayed}
            <span className="typewriter-cursor h-6 ml-0.5" />
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-4 mt-2">
          <a
            href="https://github.com/caiolesnioski"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/caio-lesnioski-3ba8a7197/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:caiolesnioski@gmail.com"
            aria-label="Email"
            className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-[#e63946] hover:bg-white/5 hover:border-[#e63946]/30 transition-all"
          >
            <Mail size={20} />
          </a>
        </div>

        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="mt-4 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
        >
          <span className="text-xs">Découvrir</span>
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
