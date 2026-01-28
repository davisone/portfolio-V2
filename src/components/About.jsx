import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiCode, HiLightningBolt, HiUserGroup } from 'react-icons/hi'

const values = [
  {
    icon: HiCode,
    title: 'Code de qualité',
    description: 'Des solutions propres, maintenables et performantes.',
  },
  {
    icon: HiLightningBolt,
    title: 'Efficacité',
    description: 'Livraison dans les délais avec une communication transparente.',
  },
  {
    icon: HiUserGroup,
    title: 'Collaboration',
    description: "À l'écoute de vos besoins pour des solutions sur-mesure.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="apropos" className="py-20 sm:py-32 bg-slate-900/30">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="section-title">
              À propos de <span className="gradient-text">moi</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Découvrez mon parcours et ma vision du développement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                Développeur fullstack basé à <strong className="text-white">Rennes</strong>, je suis en fin
                de cursus <strong className="text-white">Bac+3</strong> en développement informatique.
                Ma formation m'a permis de maîtriser le développement web et mobile, du frontend au backend.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                En parallèle de mes études, j'ai fondé{' '}
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-400 hover:text-accent-500 transition-colors font-semibold"
                >
                  DVS Web
                </a>
                , mon activité freelance où j'accompagne les entreprises dans la création de leurs
                projets digitaux : sites vitrines, applications web, e-commerce et optimisation SEO.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed">
                Cette double casquette <strong className="text-white">étudiant</strong> et{' '}
                <strong className="text-white">entrepreneur</strong> me permet d'allier rigueur technique
                et expérience terrain, pour livrer des solutions concrètes et performantes.
              </p>
            </div>

            {/* Values cards */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6 flex items-start gap-4 hover:scale-[1.02]"
                >
                  <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                    <value.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                    <p className="text-slate-400 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
