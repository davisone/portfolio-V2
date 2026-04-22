import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    num: '01',
    title: 'Développement Web',
    description:
      'Sites vitrines, applications web, e-commerce. Des solutions modernes et performantes adaptées à vos besoins.',
    href: '/services/creation-site-web-rennes',
  },
  {
    num: '02',
    title: 'Applications Mobiles',
    description:
      'Applications iOS et Android avec Flutter. Une seule codebase pour toutes les plateformes.',
    href: '/services/developpement-application-mobile',
  },
  {
    num: '03',
    title: 'Refonte de site',
    description:
      'Modernisation de votre site existant : design, performance, accessibilité et expérience utilisateur.',
    href: '/services/creation-site-web-rennes',
  },
  {
    num: '04',
    title: 'SEO & Performance',
    description:
      'Optimisation du référencement naturel et des performances pour une meilleure visibilité Google.',
    href: '/services/creation-site-web-rennes',
  },
]

const techNames = [
  'TypeScript', 'JavaScript', 'Python', 'Dart', 'C++', 'C#', 'Java', 'PHP',
  'HTML', 'CSS', 'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
  'Spring Boot', 'Laravel', 'Tailwind', 'Bootstrap', 'Prisma', 'PostgreSQL',
  'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'Docker', 'Git', 'GitHub',
  'GitLab', 'Vercel', 'Railway', 'Google Cloud', 'Stripe', 'Auth0', 'Resend',
  'Postman', 'Figma', 'Canva',
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="border-t border-border py-20 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-num">02</span>

          <div className="mb-16">
            <span className="section-label">Expertise</span>
            <h2 className="section-title">
              Mes <em>services</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.a
                key={service.title}
                href={service.href}
                itemScope
                itemType="https://schema.org/Service"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group border-r border-border last:border-r-0 py-8 px-6 transition-colors duration-300 hover:bg-ink"
              >
                <span className="font-serif text-5xl font-black text-border/30 mb-6 block group-hover:text-paper/10 transition-colors duration-300">
                  {service.num}
                </span>
                <h3 itemProp="name" className="font-medium text-ink text-base mb-2 group-hover:text-paper transition-colors duration-300">
                  {service.title}
                </h3>
                <p itemProp="description" className="text-sm text-muted leading-relaxed group-hover:text-paper/60 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="text-xs text-accent hover:text-accent-hover uppercase tracking-wide mt-4 inline-block group-hover:text-accent-hover transition-colors duration-300">
                  En savoir plus &rarr;
                </span>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 border-t border-b border-border py-4 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {[...techNames, ...techNames].map((name, i) => (
                <span key={`${name}-${i}`} className="flex items-center shrink-0">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                    {name}
                  </span>
                  <span className="text-accent mx-3">&middot;</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
