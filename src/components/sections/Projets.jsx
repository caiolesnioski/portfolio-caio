import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, filterTags } from '../../data/projects'
import { Github, ExternalLink, X, Code, Image } from 'lucide-react'

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(project)}
      className="cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden hover:shadow-lg hover:border-white/20 transition-all group"
    >
      {project.img ? (
        <img
          src={project.img}
          alt={project.title}
          className="h-[240px] w-full object-cover rounded-t-xl border-b border-white/5"
        />
      ) : (
        <div className="h-[240px] bg-white/5 flex flex-col items-center justify-center gap-2 border-b border-white/5 rounded-t-xl">
          <Image size={32} className="text-white/20" />
          <span className="text-white/20 text-xs">Aperçu non disponible</span>
        </div>
      )}

      <div className="p-5">
        <h3 className="font-bold text-white text-base mb-0.5">{project.title}</h3>
        <p className="text-white/40 text-xs mb-3">{project.subtitle}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <Github size={14} />
              Code
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-white/20 cursor-not-allowed">
              <Github size={14} />
              Privé
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <ExternalLink size={14} />
              Démo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-[#111] border border-white/10 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111] border-b border-white/10 px-6 py-4 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
            <p className="text-white/40 text-sm">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors ml-4 mt-1 flex-shrink-0"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>

        {project.img ? (
          <img
            src={project.img}
            alt={project.title}
            className="h-48 w-full object-cover border-b border-white/5"
          />
        ) : (
          <div className="h-48 bg-white/[0.03] flex flex-col items-center justify-center gap-2 border-b border-white/5">
            <Image size={36} className="text-white/15" />
            <span className="text-white/20 text-xs">Aperçu non disponible</span>
          </div>
        )}

        {/* Links */}
        <div className="px-6 py-4 flex gap-4 border-b border-white/5">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all"
            >
              <Github size={16} />
              Voir le code
            </a>
          ) : (
            <span className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-white/25 cursor-not-allowed">
              <Github size={16} />
              Code non disponible
            </span>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#e63946]/10 border border-[#e63946]/30 text-[#e63946] hover:bg-[#e63946]/20 transition-all"
            >
              <ExternalLink size={16} />
              Voir la démo
            </a>
          )}
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {[
            { label: 'Contexte', content: project.contexte },
            { label: 'Besoin', content: project.besoin },
            { label: 'Environnement', content: project.environnement },
            { label: 'Réalisation', content: project.realisation },
            { label: 'Bilan', content: project.bilan },
          ].map(({ label, content }) => (
            <div key={label}>
              <h4 className="text-[#e63946] font-semibold text-sm uppercase tracking-wider mb-2">
                {label}
              </h4>
              <p className="text-white/65 text-sm leading-relaxed">{content}</p>
            </div>
          ))}

          {/* Compétences */}
          <div>
            <h4 className="text-[#e63946] font-semibold text-sm uppercase tracking-wider mb-2">
              Compétences
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.competences.map((c) => (
                <span
                  key={c}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState('Tous')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered =
    activeFilter === 'Tous'
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter))

  return (
    <section id="projets" className="py-24 px-6 md:px-16 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Situations <span className="text-[#e63946]">professionnelles</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-8" />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                activeFilter === tag
                  ? 'bg-[#e63946] border-[#e63946] text-white'
                  : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
