import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2">
          À <span className="text-[#e63946]">propos</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#e63946] mb-8" />

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src="/images/projects/foto-perfil.png"
            alt="Caio Lesnioski"
            className="flex-shrink-0 mx-auto md:mx-0"
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid #e63946',
            }}
          />
          <div className="space-y-5 text-white/75 text-base leading-relaxed">
            <p>
              Étudiant brésilien en informatique à Lyon, je suis en constante évolution dans l&apos;univers
              du développement logiciel. Après avoir maîtrisé le français et m&apos;être adapté à un nouveau
              système éducatif, je me spécialise maintenant en développement d&apos;applications et gestion
              de bases de données.
            </p>
            <p>
              Actuellement en BTS SIO option SLAM, je travaille avec des langages comme PHP, JavaScript,
              Python et SQL. Au-delà des technologies, ce qui m&apos;anime c&apos;est la résolution de problèmes
              et la conception de solutions qui ont un impact réel.
            </p>
            <p>
              Mon intérêt pour l&apos;éthique technologique m&apos;amène à réfléchir sur notre responsabilité
              en tant que développeurs : comment créer des outils qui servent réellement les utilisateurs ?
            </p>
          </div>
        </div>

        {/* Quick info chips */}
        <div className="mt-8 flex flex-wrap gap-3">
          {['Lyon, France', 'BTS SIO SLAM', 'Brésil 🇧🇷', 'Open to work'].map((item) => (
            <span
              key={item}
              className="px-4 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-white/70"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
