import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  HiGlobe,
  HiDeviceMobile,
  HiRefresh,
  HiSearchCircle,
} from 'react-icons/hi'
import {
  SiTypescript,
  SiCss3,
  SiJavascript,
  SiDart,
  SiCplusplus,
  SiPython,
  SiHtml5,
  SiPhp,
  SiVuedotjs,
  SiNextdotjs,
  SiTailwindcss,
  SiDocker,
  SiVercel,
  SiSupabase,
  SiFirebase,
  SiStripe,
  SiGithub,
  SiPostgresql,
  SiFigma,
  SiGit,
  SiMongodb,
  SiReact,
  SiAngular,
  SiBootstrap,
  SiNodedotjs,
  SiSpring,
  SiLaravel,
  SiMysql,
  SiPrisma,
  SiGooglecloud,
  SiRailway,
  SiGitlab,
  SiAuth0,
  SiCanva,
  SiPostman,
  SiGoogle,
} from 'react-icons/si'
import { TbBrandCSharp } from 'react-icons/tb'
import { FaJava } from 'react-icons/fa'
import { SiResend } from 'react-icons/si'

const services = [
  {
    icon: HiGlobe,
    title: 'Développement Web',
    description:
      'Sites vitrines, applications web, e-commerce. Des solutions modernes et performantes adaptées à vos besoins.',
  },
  {
    icon: HiDeviceMobile,
    title: 'Applications Mobiles',
    description:
      'Applications iOS et Android avec Flutter. Une seule codebase pour toutes les plateformes.',
  },
  {
    icon: HiRefresh,
    title: 'Refonte de site',
    description:
      'Modernisation de votre site existant : design, performance, accessibilité et expérience utilisateur.',
  },
  {
    icon: HiSearchCircle,
    title: 'SEO & Performance',
    description:
      'Optimisation du référencement naturel et des performances pour une meilleure visibilité Google.',
  },
]

const languages = [
  { icon: SiTypescript, name: 'TypeScript', color: 'text-blue-400' },
  { icon: SiJavascript, name: 'JavaScript', color: 'text-yellow-400' },
  { icon: SiPython, name: 'Python', color: 'text-yellow-300' },
  { icon: SiDart, name: 'Dart', color: 'text-cyan-400' },
  { icon: SiCplusplus, name: 'C++', color: 'text-blue-500' },
  { icon: TbBrandCSharp, name: 'C#', color: 'text-purple-500' },
  { icon: FaJava, name: 'Java', color: 'text-red-500' },
  { icon: SiPhp, name: 'PHP', color: 'text-indigo-400' },
  { icon: SiHtml5, name: 'HTML', color: 'text-orange-500' },
  { icon: SiCss3, name: 'CSS', color: 'text-blue-400' },
]

const frameworks = [
  { icon: SiReact, name: 'React', color: 'text-cyan-400' },
  { icon: SiVuedotjs, name: 'Vue.js', color: 'text-green-500' },
  { icon: SiAngular, name: 'Angular', color: 'text-red-600' },
  { icon: SiNextdotjs, name: 'Next.js', color: 'text-white' },
  { icon: SiNodedotjs, name: 'Node.js', color: 'text-green-500' },
  { icon: SiSpring, name: 'Spring Boot', color: 'text-green-500' },
  { icon: SiLaravel, name: 'Laravel', color: 'text-red-500' },
  { icon: SiTailwindcss, name: 'Tailwind', color: 'text-cyan-400' },
  { icon: SiBootstrap, name: 'Bootstrap', color: 'text-purple-500' },
  { icon: SiPrisma, name: 'Prisma', color: 'text-slate-300' },
]

const databases = [
  { icon: SiPostgresql, name: 'PostgreSQL', color: 'text-blue-400' },
  { icon: SiMysql, name: 'MySQL', color: 'text-blue-500' },
  { icon: SiMongodb, name: 'MongoDB', color: 'text-green-500' },
  { icon: SiSupabase, name: 'Supabase', color: 'text-green-500' },
  { icon: SiFirebase, name: 'Firebase', color: 'text-yellow-500' },
]

const tools = [
  { icon: SiDocker, name: 'Docker', color: 'text-blue-500' },
  { icon: SiGit, name: 'Git', color: 'text-orange-500' },
  { icon: SiGithub, name: 'GitHub', color: 'text-white' },
  { icon: SiGitlab, name: 'GitLab', color: 'text-orange-600' },
  { icon: SiVercel, name: 'Vercel', color: 'text-white' },
  { icon: SiRailway, name: 'Railway', color: 'text-white' },
  { icon: SiGooglecloud, name: 'Google Cloud', color: 'text-blue-400' },
  { icon: SiStripe, name: 'Stripe', color: 'text-purple-400' },
  { icon: SiAuth0, name: 'Auth0', color: 'text-orange-500' },
  { icon: SiResend, name: 'Resend', color: 'text-white' },
  { icon: SiPostman, name: 'Postman', color: 'text-orange-500' },
  { icon: SiFigma, name: 'Figma', color: 'text-purple-400' },
  { icon: SiCanva, name: 'Canva', color: 'text-cyan-400' },
  { icon: SiGoogle, name: 'Google Business', color: 'text-blue-500' },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-20 sm:py-32">
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
              Mes <span className="gradient-text">services</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Des solutions digitales complètes pour votre projet.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 group"
              >
                <div className="inline-flex p-4 bg-primary-500/10 rounded-xl text-primary-400 mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <service.icon size={32} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Langages */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-white mb-8">
              Langages
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {languages.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.02 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-primary-500/50 transition-all duration-300 group-hover:scale-110">
                    <tech.icon size={26} className={tech.color} />
                  </div>
                  <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-white mb-8">
              Frameworks & Librairies
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {frameworks.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-primary-500/50 transition-all duration-300 group-hover:scale-110">
                    <tech.icon size={26} className={tech.color} />
                  </div>
                  <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bases de données */}
          <div className="text-center mb-12">
            <h3 className="text-xl font-semibold text-white mb-8">
              Bases de données
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {databases.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.02 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-primary-500/50 transition-all duration-300 group-hover:scale-110">
                    <tech.icon size={26} className={tech.color} />
                  </div>
                  <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Outils & Services */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-8">
              Outils & Services
            </h3>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {tools.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.02 }}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:border-primary-500/50 transition-all duration-300 group-hover:scale-110">
                    <tech.icon size={26} className={tech.color} />
                  </div>
                  <span className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
