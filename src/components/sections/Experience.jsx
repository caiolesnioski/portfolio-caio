import { motion } from 'framer-motion'
import { expIT, expOther } from '../../data/experiences'
import { Code2, Coffee } from 'lucide-react'

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Expériences <span className="text-[#e63946]">professionnelles</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-12" />

        {/* IT Experiences */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Code2 size={18} className="text-[#e63946]" />
            <h3 className="text-lg font-semibold text-white/80 uppercase tracking-wider text-sm">
              Informatique
            </h3>
          </div>
          <div className="space-y-4">
            {expIT.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#e63946]/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{exp.role}</h4>
                    <p className="text-[#e63946] text-sm font-medium">{exp.company}</p>
                  </div>
                  <div className="flex flex-col sm:items-end gap-1">
                    <span className="text-white/40 text-sm">{exp.period}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#e63946]/15 text-[#e63946] self-start sm:self-auto">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <p className="text-white/60 text-sm">{exp.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50 border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Other Experiences */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Coffee size={18} className="text-white/40" />
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              Autres expériences
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {expOther.map((exp) => (
              <div
                key={exp.role + exp.company}
                className="flex justify-between items-center rounded-lg border border-white/5 bg-white/[0.02] px-4 py-3"
              >
                <div>
                  <p className="text-white/60 text-sm font-medium">{exp.role}</p>
                  <p className="text-white/35 text-xs">{exp.company}</p>
                </div>
                <span className="text-white/30 text-xs">{exp.period}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
