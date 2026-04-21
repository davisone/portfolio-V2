import { motion } from 'framer-motion'
import { HiArrowDown, HiDownload } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Hero() {
  return (
    <section id="accueil" className="min-h-screen flex flex-col justify-between py-12 sm:py-16 lg:py-20">
      <div className="section-container flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Label */}
          <div className="section-label mb-10 sm:mb-14">
            En recherche d'alternance — Chef de projet IT
          </div>

          {/* Titre geant */}
          <h1 className="font-serif text-[clamp(4rem,10vw,9rem)] font-black leading-[0.9] tracking-tight text-ink mb-0">
            <span className="block">Evan</span>
            <span className="block">
              Davi<em className="italic text-accent">son</em>
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="font-sans text-lg sm:text-xl text-muted mt-4 mb-0">
            Développeur Fullstack — Rennes, Fondateur de{' '}
            <a
              href="https://dvs-web.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors underline underline-offset-4 decoration-accent/40"
            >
              DVS Web
            </a>
          </p>
        </motion.div>

        {/* Grille editoriale */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="border-t border-border mt-10 sm:mt-14 pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
        >
          {/* Colonne gauche — description */}
          <p className="font-sans text-base leading-relaxed text-body max-w-lg">
            Passionné par le développement web et mobile, je crée des{' '}
            <strong className="text-ink font-medium">applications modernes</strong> avec React,
            Next.js et Flutter. En parallèle, j'accompagne les entreprises via mon activité{' '}
            <strong className="text-ink font-medium">freelance</strong>. Je recherche une{' '}
            <strong className="text-ink font-medium">alternance en gestion de projet IT</strong>{' '}
            pour allier ma vision technique à une approche stratégique et organisationnelle.
          </p>

          {/* Colonne droite — badge + CTA */}
          <div className="flex flex-col items-start md:items-end justify-end gap-6">
            <span className="font-mono text-xs border border-border px-4 py-2 text-muted tracking-wide">
              Disponible — Bac+3 Sup de Vinci
            </span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                Me contacter →
              </motion.a>
              <motion.a
                href="/cv/Evan_Davison_cv.pdf"
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary"
              >
                <HiDownload />
                Télécharger mon CV
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-4 mt-10 sm:mt-14"
        >
          <a
            href="https://github.com/davisone"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors p-1"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/evan-d-766478247"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-ink transition-colors p-1"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#apropos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center text-muted hover:text-ink transition-colors mt-8"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <HiArrowDown size={20} />
        </motion.div>
      </motion.a>
    </section>
  )
}
