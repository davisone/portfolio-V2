import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiAcademicCap, HiBriefcase } from 'react-icons/hi'

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
    <section id="experiences" className="py-20 sm:py-32 bg-slate-900/30">
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
              Mon <span className="gradient-text">parcours</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Expériences professionnelles et formation académique.
            </p>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-700 transform md:-translate-x-1/2" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`relative flex items-center mb-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-10 h-10 bg-slate-900 border-2 border-primary-500 rounded-full transform md:-translate-x-1/2 flex items-center justify-center z-10">
                    {exp.type === 'work' ? (
                      <HiBriefcase className="text-primary-400" size={18} />
                    ) : (
                      <HiAcademicCap className="text-primary-400" size={18} />
                    )}
                  </div>

                  {/* Content card */}
                  <div
                    className={`ml-16 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <div className="card p-6 hover:scale-[1.02]">
                      <span className="text-primary-400 text-sm font-medium">
                        {exp.period}
                      </span>
                      <h3 className="text-white font-semibold text-lg mt-1">
                        {exp.title}
                      </h3>
                      <p className="text-accent-400 text-sm mb-2">{exp.company}</p>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
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
