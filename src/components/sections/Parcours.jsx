import { motion } from 'framer-motion'
import { parcours } from '../../data/parcours'
import { GraduationCap } from 'lucide-react'

export default function Parcours() {
  return (
    <section id="parcours" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Parcours <span className="text-[#e63946]">scolaire</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-12" />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-white/10" />

          <div className="space-y-8">
            {parcours.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6"
              >
                {/* Icon */}
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-[#e63946]/15 border border-[#e63946]/40 flex items-center justify-center">
                  <GraduationCap size={16} className="text-[#e63946]" />
                </div>

                {/* Content */}
                <div className="pb-2">
                  <span className="text-xs text-[#e63946] font-medium tracking-wide uppercase">
                    {item.year}
                  </span>
                  <h3 className="text-white font-semibold text-lg mt-0.5">{item.institution}</h3>
                  <p className="text-white/60 text-sm font-medium">{item.degree}</p>
                  <p className="text-white/50 text-sm mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
