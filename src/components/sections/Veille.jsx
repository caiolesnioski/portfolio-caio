import { motion } from 'framer-motion'
import { veilleArticles, veilleReponse } from '../../data/veille'
import { BookOpen, ExternalLink } from 'lucide-react'

export default function Veille() {
  return (
    <section id="veille" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          Veille <span className="text-[#e63946]">technologique</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-4" />

        <p className="text-white/50 text-base mb-2 italic">
          Ma veille technologique sur le paradoxe technologique
        </p>
        <div className="rounded-xl bg-[#e63946]/[0.08] border border-[#e63946]/20 px-5 py-4 mb-10">
          <p className="text-white/80 font-medium">
            <span className="text-[#e63946] font-semibold">Problématique :</span>{' '}
            Comment les nouvelles technologies peuvent-elles résoudre les problèmes qu&apos;elles ont
            elles-mêmes créés ?
          </p>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {veilleArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 flex flex-col"
            >
              <div className="flex items-start gap-3 flex-1">
                <BookOpen size={16} className="flex-shrink-0 mt-0.5 text-white/30" />
                <div className="flex flex-col flex-1">
                  <p className="text-white/35 text-xs mb-1">{article.date} — {article.source}</p>
                  <h4 className="text-white font-semibold text-sm mb-2">{article.title}</h4>
                  <p className="text-white/55 text-xs leading-relaxed flex-1">{article.summary}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#e63946] hover:text-[#e63946]/80 transition-colors self-start"
                  >
                    <ExternalLink size={12} />
                    Lire l&apos;article
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Response */}
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#e63946] flex-shrink-0" />
            Ma réponse à la problématique
          </h3>
          <div className="space-y-4">
            {veilleReponse.split('\n\n').map((para, i) => (
              <p key={i} className="text-white/65 text-sm leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <img
            src="/images/projects/nouvelles-technologies.jpeg"
            alt="Nouvelles technologies"
            style={{ borderRadius: '12px', margin: '1.5rem auto 0', display: 'block' }}
            className="w-full max-w-[600px] object-cover"
          />
        </div>
      </motion.div>
    </section>
  )
}
