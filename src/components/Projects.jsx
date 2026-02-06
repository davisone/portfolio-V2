import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { HiExternalLink, HiCode, HiX } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

// Skeleton loader pour l'animation de chargement
function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/30 to-transparent animate-shimmer" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
          <span className="text-slate-500 text-sm">Chargement...</span>
        </div>
      </div>
    </div>
  )
}

// Composant pour afficher l'image avec screenshot dynamique et fallback
function ProjectImage({ project, className }) {
  const [imgSrc, setImgSrc] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    if (project.liveUrl) {
      // Utilise le screenshot dynamique si l'URL live existe
      // Le paramètre v= permet d'invalider le cache quand on modifie screenshotVersion
      const version = project.screenshotVersion || 1
      setImgSrc(`https://api.microlink.io/?url=${encodeURIComponent(project.liveUrl)}&screenshot=true&meta=false&embed=screenshot.url&v=${version}`)
    } else if (project.image) {
      setImgSrc(project.image)
    } else {
      setIsLoading(false)
    }
  }, [project.liveUrl, project.image, project.screenshotVersion])

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    // Si le screenshot échoue, utilise l'image statique en fallback
    if (project.image && imgSrc !== project.image) {
      setImgSrc(project.image)
    } else {
      setIsLoading(false)
    }
  }

  if (!imgSrc) {
    return <HiCode size={48} className="text-slate-700 group-hover:text-primary-500/50 transition-colors duration-300" />
  }

  return (
    <>
      {isLoading && <ImageSkeleton />}
      <img
        src={imgSrc}
        alt={project.title}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </>
  )
}

const projects = [
  {
    title: 'DVS Web',
    description:
      'Site vitrine professionnel pour mon activité de développeur freelance. Design responsive noir/doré, animations fluides, formulaire de contact avec API Resend, SEO optimisé (sitemap dynamique, Schema.org) et conformité RGPD.',
    image: '/projets/DSV-Web.png', // Fallback
    tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    liveUrl: 'https://dvs-web.fr',
    screenshotVersion: 1,
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
    title: 'Smart Detection',
    description:
      'Plateforme de prospection B2B automatisée. Identifie les entreprises avec des sites obsolètes, analyse leur présence web (HTTPS, responsive, performance) et génère des emails personnalisés via GPT-4.',
    image: '/projets/scrapping.png',
    tags: ['Next.js 14', 'TypeScript', 'OpenAI API', 'Drizzle ORM', 'SQLite'],
    liveUrl: null,
    githubUrl: null,
    features: [
      'Tableau de bord analytique en temps réel',
      'Acquisition multi-sources (CSV, Google Places API)',
      'Analyse automatisée : HTTPS, responsive, performance, 30+ technologies',
      'Algorithme de scoring d\'obsolescence (0-100)',
      'Génération d\'emails IA personnalisés via GPT-4',
      'Gestion de campagnes avec file d\'attente d\'envoi',
    ],
  },
  {
    title: 'DVS - CV',
    description:
      'Application SaaS de génération de CV avec IA. Intègre Claude API pour l\'optimisation de contenu, Stripe pour les paiements, et NextAuth avec 2FA. 5 templates, analyse ATS et export PDF.',
    image: '/projets/resume-forge.png',
    tags: ['Next.js 15', 'TypeScript', 'Claude API', 'Stripe', 'Prisma', 'Supabase'],
    liveUrl: 'https://cv-intelligent.vercel.app',
    screenshotVersion: 1,
    githubUrl: null,
    features: [
      '5 templates de CV (Modern, Classic, ATS-Friendly, Minimal, Creative)',
      'Analyse ATS : Score 0-100 avec recommandations',
      'Suggestions IA pour amélioration du contenu',
      'Authentification 2FA avec QR code',
      'Paiement Stripe (1 template gratuit, premium à 4.99€)',
      'Export PDF haute qualité',
    ],
  },
  {
    title: 'Carnet de Santé Animal',
    description:
      'Application multiplateforme pour éleveurs et propriétaires d\'animaux. Suivi médical complet, vaccins avec rappels automatiques, arbre généalogique, évolution du poids et export PDF.',
    image: '/projects/carnet-sante.jpg',
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
    title: 'QR Code Generator',
    description:
      'Application web full-stack de génération, personnalisation et gestion de QR codes. Prévisualisation en temps réel, templates de styles, dashboard avec filtres, export multi-format et partage public via liens uniques.',
    image: '/projets/QR-code-image.png',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'PostgreSQL', 'Prisma 7', 'NextAuth.js'],
    liveUrl: 'https://qr-dvsweb.vercel.app',
    screenshotVersion: 2, // Incrémenté pour forcer le refresh du nouveau design
    githubUrl: null,
    features: [
      'Génération de QR codes à partir d\'URLs ou texte avec prévisualisation temps réel',
      'Personnalisation avancée : couleurs, taille, correction d\'erreur, logo centré, templates (Ocean, Forest, Sunset…)',
      'Dashboard avec recherche, filtres (type, favoris) et sélection multiple',
      'Export multi-format : PNG, JPEG, PDF (A4) et ZIP pour exports groupés',
      'Partage public via liens uniques avec tokens',
      'Authentification complète : inscription, connexion, sessions JWT avec hashage bcrypt',
    ],
  },
  {
    title: 'Haut en Couleur',
    description:
      'Site vitrine pour une entreprise de peinture en bâtiment. Internationalisation FR/EN, galerie avant/après interactive, avis Google dynamiques, carte Leaflet et formulaire sécurisé.',
    image: '/projets/haut-en-couleur.png',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'Vercel KV', 'Leaflet'],
    liveUrl: 'https://haut-en-couleur.fr',
    screenshotVersion: 1,
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors z-10"
        >
          <HiX size={20} />
        </button>

        {/* Header image */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          {(project.liveUrl || project.image) ? (
            <ProjectImage
              project={project}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <HiCode size={64} className="text-primary-500/30" />
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-500/10 text-primary-400 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Features */}
          {project.features && (
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Fonctionnalités clés</h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-slate-400 text-sm">
                    <span className="text-primary-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
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
                className="btn-secondary text-sm"
              >
                <FaGithub size={16} />
                Code source
              </a>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <span className="text-slate-500 text-sm">Projet privé / en développement</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)

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
                onClick={() => setSelectedProject(project)}
                className="card overflow-hidden group cursor-pointer"
              >
                {/* Project image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                  {(project.liveUrl || project.image) ? (
                    <ProjectImage
                      project={project}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <HiCode
                        size={48}
                        className="text-slate-700 group-hover:text-primary-500/50 transition-colors duration-300"
                      />
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-slate-900/80 px-4 py-2 rounded-lg">
                      Voir les détails
                    </span>
                  </div>
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
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-slate-800 text-slate-500 text-xs rounded-md">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
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
                        onClick={(e) => e.stopPropagation()}
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
              href="https://github.com/davisone"
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
