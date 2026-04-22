import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 px-6 text-center">
      <p className="text-white font-semibold text-lg mb-1">Caio Lesnioski</p>
      <p className="text-white/40 text-sm mb-4">© 2026 Caio Lesnioski — Tous droits réservés</p>
      <div className="flex justify-center gap-5">
        <a
          href="https://github.com/caiolesnioski"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-white/50 hover:text-white transition-colors"
        >
          <Github size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/caio-lesnioski-3ba8a7197/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white/50 hover:text-white transition-colors"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:caiolesnioski@gmail.com"
          aria-label="Email"
          className="text-white/50 hover:text-[#e63946] transition-colors"
        >
          <Mail size={20} />
        </a>
      </div>
    </footer>
  )
}
