import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { technicalSkills, validatedSkills } from '../../data/skills'

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(level), 200)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [level])

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="text-white/80 text-sm font-medium">{name}</span>
        <span className="text-[#e63946] text-sm font-semibold">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e63946] rounded-full skill-bar-fill"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

export default function Certifications() {
  return (
    <section id="certification" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Compétences & <span className="text-[#e63946]">certifications</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Technical skills with bars */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">
              Compétences techniques
            </h3>
            {technicalSkills.map((skill) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} />
            ))}
          </div>

          {/* Validated skills cards */}
          <div>
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-6">
              Compétences validées en formation
            </h3>
            <div className="flex flex-wrap gap-2">
              {validatedSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative"
                >
                  <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#e63946]/30 transition-colors cursor-default">
                    <p className="text-white/80 text-sm font-medium">{skill.name}</p>
                    <p className="text-white/35 text-xs mt-0.5">{skill.context}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
