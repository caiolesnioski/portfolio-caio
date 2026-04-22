import { Home, User, BookOpen, Briefcase, FolderOpen, Award, Rss, Mail } from 'lucide-react'

const navItems = [
  { id: 'hero', label: 'Accueil', Icon: Home },
  { id: 'about', label: 'À propos', Icon: User },
  { id: 'parcours', label: 'Parcours', Icon: BookOpen },
  { id: 'experience', label: 'Expériences', Icon: Briefcase },
  { id: 'projets', label: 'Projets', Icon: FolderOpen },
  { id: 'certification', label: 'Compétences', Icon: Award },
  { id: 'veille', label: 'Veille', Icon: Rss },
  { id: 'contact', label: 'Contact', Icon: Mail },
]

export default function Sidebar({ activeSection }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop: fixed left sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-20 flex-col items-center justify-center gap-3 z-50 bg-[#0a0a0a] border-r border-white/5">
        {navItems.map(({ id, label, Icon }) => (
          <div key={id} className="relative group">
            <button
              onClick={() => scrollTo(id)}
              aria-label={label}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 border ${
                activeSection === id
                  ? 'bg-[#e63946] border-[#e63946] text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon size={20} />
            </button>
            {/* Tooltip */}
            <div className="absolute left-14 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50">
              <span className="bg-[#1a1a1a] text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap border border-white/10 shadow-lg">
                {label}
              </span>
            </div>
          </div>
        ))}
      </aside>

      {/* Mobile: fixed bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-t border-white/10 flex justify-around py-2">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={label}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
              activeSection === id ? 'text-[#e63946]' : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Icon size={18} />
            <span className="text-[9px] leading-none">{label}</span>
          </button>
        ))}
      </nav>
    </>
  )
}
