import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import useReveal from '../hooks/useReveal'

// framer-motion est garde uniquement pour AnimatePresence (modale)

// Skeleton loader pour l'animation de chargement
function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-paper-alt">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border/30 to-transparent animate-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-0.5 bg-accent/50 animate-shimmer" />
          <span className="text-muted text-sm font-mono">Chargement...</span>
        </div>
      </div>
    </div>
  )
}

// Composant pour afficher l'image avec chargement optimise
function ProjectImage({ project, className }) {
  const [isLoading, setIsLoading] = useState(true)
  const imgRef = useRef(null)

  useEffect(() => {
    // Gere le cas ou l'image est deja en cache
    if (imgRef.current?.complete) {
      setIsLoading(false)
    }
  }, [])

  const handleLoad = () => {
    setIsLoading(false)
  }

  if (!project.image) {
    return <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted/50 group-hover:text-accent/50 transition-colors duration-300"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  }

  return (
    <>
      {isLoading && <ImageSkeleton />}
      <img
        ref={imgRef}
        src={project.image}
        alt={`${project.title} — ${project.tags.slice(0, 3).join(', ')}`}
        loading="lazy"
        decoding="async"
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
      />
    </>
  )
}

const projects = [
  {
    title: 'DVS Web',
    description:
      'Site vitrine professionnel pour mon activité de développeur freelance. Design responsive noir/doré, animations fluides, formulaire de contact avec API Resend, SEO optimisé (sitemap dynamique, Schema.org) et conformité RGPD.',
    image: '/projets/2.webp',
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    liveUrl: 'https://dvs-web.fr',
    githubUrl: null,
    features: [
      'Design responsive mobile-first avec navigation adaptative',
      'Animations au scroll et micro-interactions',
      'Formulaire de contact sécurisé avec double envoi d\'email',
      'Sitemap et robots.txt dynamiques générés côté serveur',
      'Métadonnées SEO complètes (Open Graph, Twitter Cards, Schema.org)',
      'Bannière cookies conforme RGPD',
    ],
  },
  {
    title: 'CV Builder',
    description:
      'Application SaaS de génération de CV avec IA. Intègre OpenAI (GPT-4o-mini) pour l\'optimisation de contenu, Stripe pour les paiements, et NextAuth avec 2FA. 5 templates, analyse ATS et export PDF.',
    image: '/projets/cv-builder.webp',
    tags: ['Next.js 16', 'TypeScript', 'OpenAI API', 'Stripe', 'Prisma', 'Supabase', 'NextAuth', 'Nodemailer'],
    liveUrl: 'https://cv-builder.fr',
    githubUrl: null,
    features: [
      '5 templates de CV (Modern, Classic, ATS-Friendly, Minimal, Creative)',
      'Analyse ATS : Score 0-100 avec recommandations',
      'Suggestions IA pour amélioration du contenu',
      'Authentification OAuth (Google, GitHub) + 2FA avec QR code',
      'Paiement Stripe (1 template gratuit, premium à 4.99€)',
      'Export PDF haute qualité',
      'Emails transactionnels (bienvenue, reset password, confirmation paiement)',
    ],
  },
  {
    title: 'Carnet de Santé Animal',
    description:
      'Application multiplateforme pour éleveurs et propriétaires d\'animaux. Suivi médical complet, vaccins avec rappels automatiques, arbre généalogique, évolution du poids et export PDF.',
    image: '/projets/carnet-de-sante.webp',
    tags: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FL Chart'],
    liveUrl: null,
    githubUrl: null,
    features: [
      'Fiche complète par animal avec photo et identification',
      'Suivi vaccins avec rappels automatiques',
      'Historique des traitements et consultations vétérinaires',
      'Graphique d\'évolution du poids',
      'Arbre généalogique interactif',
      'Export PDF du carnet de santé complet',
    ],
  },
  {
    title: 'UseQRaft',
    description:
      'Application web full-stack de génération, personnalisation et gestion de QR codes. Prévisualisation en temps réel, templates de styles, dashboard avec filtres, export multi-format et partage public via liens uniques.',
    image: '/projets/3.webp',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'NextAuth.js'],
    liveUrl: 'https://useqraft.com',
    githubUrl: null,
    features: [
      'Génération de QR codes à partir d\'URLs ou texte avec prévisualisation temps réel',
      'Personnalisation avancée : couleurs, taille, correction d\'erreur, logo centré, templates (Ocean, Forest, Sunset…)',
      'Dashboard avec recherche, filtres (type, favoris) et sélection multiple',
      'Export multi-format : PNG, JPEG, PDF (A4) et ZIP pour exports groupés',
      'Partage public via liens uniques avec tokens',
      'Authentification complète avec hashage bcrypt',
    ],
  },
  {
    title: 'Haut en Couleur',
    description:
      'Site vitrine pour une entreprise de peinture en bâtiment. Internationalisation FR/EN, galerie avant/après interactive, avis Google dynamiques, carte Leaflet et formulaire sécurisé.',
    image: '/projets/haut-en-couleur.webp',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel KV', 'Leaflet'],
    liveUrl: 'https://haut-en-couleur.fr',
    githubUrl: null,
    features: [
      'Internationalisation complète (FR/EN) avec next-intl',
      'Dark mode avec persistance des préférences',
      'Galerie avant/après interactive avec slider tactile',
      'Avis Google dynamiques via API',
      'Carte interactive avec zone d\'intervention',
      'Formulaire sécurisé avec rate limiting et hCaptcha',
    ],
  },
]

function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    const modal = modalRef.current
    if (!modal) return

    const focusableElements = modal.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    firstFocusable?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable?.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90"
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Projet ${project.title}`}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-paper border border-border rounded-sm shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Fermer la modale"
          className="absolute top-4 right-4 p-2 text-muted hover:text-ink hover:bg-paper-alt transition-colors z-10"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>

        {/* Header image */}
        <div className="relative h-48 bg-paper-alt flex items-center justify-center overflow-hidden">
          {(project.liveUrl || project.image) ? (
            <ProjectImage
              project={project}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted/30"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="font-serif text-2xl font-bold text-ink mb-3">{project.title}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent/10 text-accent text-xs font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-text-body leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-ink font-medium mb-3">Fonctionnalites cles</h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-text-body text-sm">
                    <span className="text-accent mt-0.5">&#8226;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 pt-6 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Voir le site
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                Code source
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="text-muted text-sm">Projet prive / en developpement</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [revealRef, isInView] = useReveal()
  const [selectedProject, setSelectedProject] = useState(null)

  return (
    <section id="realisations" className="border-t border-border py-20 relative">
      <div className="section-container">
        <div ref={revealRef} className={`reveal ${isInView ? 'visible' : ''}`}>
          {/* Big number */}
          <span className="section-num">04</span>

          {/* Section header */}
          <div className="mb-16">
            <span className="section-label">Mes travaux</span>
            <h2 className="section-title">
              Reali<em>sations</em>
            </h2>
          </div>

          {/* Projects grid */}
          <div className="border border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <article
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className={`reveal group cursor-pointer p-8 border-b border-border transition-colors duration-300 hover:bg-paper-alt ${isInView ? 'visible' : ''} ${
                  (index + 1) % 3 !== 0 ? 'lg:border-r' : ''
                } ${
                  (index + 1) % 2 !== 0 ? 'md:border-r lg:border-r-0' : 'md:border-r-0'
                } ${
                  (index + 1) % 3 !== 0 ? 'lg:border-r' : 'lg:border-r-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Project image */}
                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-paper-alt">
                  {(project.liveUrl || project.image) ? (
                    <ProjectImage
                      project={project}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted/50 group-hover:text-accent/50 transition-colors duration-300"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                    </div>
                  )}
                </div>

                {/* Tag line */}
                <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-accent mb-3">
                  {project.tags.slice(0, 3).join(' \u00b7 ')}
                </p>

                {/* Project name */}
                <h3 className="font-serif text-xl font-bold text-ink mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Arrow */}
                <span className="inline-block text-ink mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </article>
            ))}

            {/* Ghost card — voir plus sur GitHub */}
            <a
              href="https://github.com/davisone"
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal group flex flex-col items-center justify-center p-8 border-b border-border text-center transition-colors duration-300 hover:bg-paper-alt md:border-r-0 lg:border-r-0 ${isInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${projects.length * 100}ms` }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-muted/40 mb-4 group-hover:text-ink transition-colors duration-300"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              <span className="font-mono text-sm text-muted group-hover:text-ink transition-colors duration-300">
                Voir plus sur GitHub &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
