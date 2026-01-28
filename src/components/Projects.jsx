import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiExternalLink, HiCode } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

const projects = [
  {
    title: 'DVS Web',
    description:
      'Site vitrine professionnel pour mon activité de développeur freelance. Design responsive noir/doré, animations fluides, formulaire de contact avec API Resend, SEO optimisé (sitemap dynamique, Schema.org) et conformité RGPD.',
    image: '/projects/dvs-web.jpg',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    liveUrl: 'https://dvs-web.fr',
    githubUrl: null,
  },
  {
    title: 'Smart Detection',
    description:
      'Plateforme de prospection B2B automatisée. Identifie les entreprises avec des sites obsolètes, analyse leur présence web (HTTPS, responsive, performance) et génère des emails personnalisés via GPT-4.',
    image: '/projects/smart-detection.jpg',
    tags: ['Next.js 14', 'TypeScript', 'OpenAI API', 'Drizzle ORM', 'SQLite'],
    liveUrl: null,
    githubUrl: null,
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="realisations" className="py-20 sm:py-32">
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
              Mes <span className="gradient-text">réalisations</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Une sélection de projets sur lesquels j'ai travaillé.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                {/* Project image placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HiCode
                      size={48}
                      className="text-slate-700 group-hover:text-primary-500/50 transition-colors duration-300"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300" />
                </div>

                {/* Project info */}
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-primary-400 transition-colors"
                      >
                        <HiExternalLink size={16} />
                        Voir le site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        <FaGithub size={16} />
                        Code source
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/evandavison"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <FaGithub />
              Voir plus sur GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
