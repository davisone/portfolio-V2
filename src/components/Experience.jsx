import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    type: 'work',
    title: 'Fondateur & Développeur Freelance',
    company: 'DVS Web - Rennes',
    period: '2026 - Présent',
    description:
      'Création et développement de sites web et applications pour des clients variés. Gestion de projet, relation client, développement fullstack.',
  },
  {
    type: 'work',
    title: 'Développeur Web (Alternance)',
    company: 'Le Reférencement Professionnel - Cesson-Sévigné',
    period: 'septembre 2025 - septembre 2026',
    description:
      "Création de block liquid et intégration dans un cms. Intégration d'un formulaire tally et de son api dans le CMS de l'entreprise en passant par firebase.",
  },
  {
    type: 'education',
    title: 'Bachelor Développement Web',
    company: 'Sup de Vinci - Chantepie',
    period: '2025 - 2026',
    description:
      'Formation complète en développement web, mobile, bases de données, et gestion de projet. Bac+3.',
  },
  {
    type: 'education',
    title: 'BTS SIO (SLAM)',
    company: 'Lycée Saint Sauveur - Redon',
    period: '2022 - 2025',
    description:
      'Solutions Logicielles et Applications Métiers. Apprentissage des fondamentaux du développement.',
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experiences" className="relative border-t border-border py-20 bg-paper-alt">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-num">03</span>

          <div className="mb-16">
            <p className="section-label">Parcours</p>
            <h2 className="section-title">
              Mon <em>parcours</em>
            </h2>
          </div>

          <div>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="border-b border-border py-8 grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-4 lg:gap-8 hover:pl-2 transition-all duration-300"
              >
                <time className="font-mono text-xs text-muted uppercase tracking-wide block">
                  {exp.period}
                </time>

                <div>
                  <span className="font-mono text-[0.65rem] text-muted uppercase tracking-wide">
                    {exp.type === 'education' ? 'Formation' : 'Experience'}
                  </span>
                  <h3 className="font-medium text-ink text-base">{exp.title}</h3>
                  <p className="text-sm text-accent mt-1">{exp.company}</p>
                </div>

                <div>
                  <p className="text-sm text-text-body leading-relaxed">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
