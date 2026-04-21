import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const values = [
  {
    num: '01',
    title: 'Gestion de projet',
    description: 'Planification, coordination et suivi — transformer une idée en livrable concret.',
  },
  {
    num: '02',
    title: 'Efficacité',
    description: 'Livraison dans les délais avec une communication transparente.',
  },
  {
    num: '03',
    title: 'Collaboration',
    description: "À l'écoute de vos besoins pour des solutions sur-mesure.",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="apropos" className="relative border-t border-border py-20">
      <div className="section-container">
        {/* Big faded number */}
        <span className="section-num">01</span>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="mb-16">
            <span className="section-label">Qui suis-je</span>
            <h2 className="section-title">
              À propos<br />
              de <em>moi</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Text content */}
            <div className="space-y-6">
              <p className="text-text-body text-base leading-relaxed">
                Développeur fullstack basé à <strong className="text-ink font-medium">Rennes</strong>, je suis en fin
                de cursus <strong className="text-ink font-medium">Bac+3</strong> en développement informatique.
                Ma formation m'a permis de maîtriser le développement web et mobile, du frontend au backend.
              </p>
              <p className="text-text-body text-base leading-relaxed">
                En parallèle de mes études, j'ai fondé{' '}
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover transition-colors font-medium"
                >
                  DVS Web
                </a>
                , mon activité freelance où j'accompagne les entreprises dans la création de leurs
                projets digitaux : sites vitrines, applications web, e-commerce et optimisation SEO.
              </p>
              <p className="text-text-body text-base leading-relaxed">
                Cette double casquette <strong className="text-ink font-medium">étudiant</strong> et{' '}
                <strong className="text-ink font-medium">entrepreneur</strong> me permet d'allier rigueur technique
                et expérience terrain, pour livrer des solutions concrètes et performantes.
              </p>
              <p className="text-text-body text-base leading-relaxed">
                Je suis actuellement à la recherche d'une{' '}
                <strong className="text-ink font-medium">alternance en gestion de projet IT</strong>. Mon
                parcours de développeur me donne une compréhension fine des enjeux techniques,
                que je souhaite compléter par une formation en{' '}
                <strong className="text-ink font-medium">pilotage de projets</strong>, coordination d'équipes
                et suivi de livraisons.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-0">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-t border-border pt-6 pb-6"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-accent text-lg">{value.num}</span>
                    <div>
                      <h3 className="font-medium text-ink">{value.title}</h3>
                      <p className="text-sm text-muted mt-1">{value.description}</p>
                    </div>
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
