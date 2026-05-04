import useReveal from '../hooks/useReveal'
import { useTranslations } from '../i18n/useTranslations'

const serviceHrefs = [
  '/services/creation-site-web-rennes',
  '/services/developpement-application-mobile',
  '/services/refonte-site-web',
  '/services/optimisation-seo',
]

const techNames = [
  'TypeScript', 'JavaScript', 'Python', 'Dart', 'C++', 'C#', 'Java', 'PHP',
  'HTML', 'CSS', 'React', 'Vue.js', 'Angular', 'Next.js', 'Node.js',
  'Spring Boot', 'Laravel', 'Tailwind', 'Bootstrap', 'Prisma', 'PostgreSQL',
  'MySQL', 'MongoDB', 'Supabase', 'Firebase', 'Docker', 'Git', 'GitHub',
  'GitLab', 'Vercel', 'Railway', 'Google Cloud', 'Stripe', 'Auth0', 'Resend',
  'Postman', 'Figma', 'Canva',
]

export default function Services({ locale = 'fr' }) {
  const [ref, isVisible] = useReveal()
  const t = useTranslations(locale)

  return (
    <section id="services" className="border-t border-border py-20 relative">
      <div className="section-container">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <span className="section-num">02</span>

          <div className="mb-16">
            <span className="section-label">{t.services.label}</span>
            <h2 className="section-title">
              {t.services.title} <em>{t.services.titleEmphasis}</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.items.map((service, index) => (
              <a
                key={service.title}
                href={serviceHrefs[index]}
                itemScope
                itemType="https://schema.org/Service"
                className={`reveal group border-r border-border last:border-r-0 py-8 px-6 transition-colors duration-300 hover:bg-ink ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="font-serif text-5xl font-black text-border/30 mb-6 block group-hover:text-paper/10 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 itemProp="name" className="font-medium text-ink text-base mb-2 group-hover:text-paper transition-colors duration-300">
                  {service.title}
                </h3>
                <p itemProp="description" className="text-sm text-muted leading-relaxed group-hover:text-paper/60 transition-colors duration-300">
                  {service.description}
                </p>
                <span className="text-xs text-accent hover:text-accent-hover uppercase tracking-wide mt-4 inline-block group-hover:text-accent-hover transition-colors duration-300">
                  {t.services.learnMore} &rarr;
                </span>
              </a>
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
        </div>
      </div>
    </section>
  )
}
