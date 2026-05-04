import useReveal from '../hooks/useReveal'
import { useTranslations } from '../i18n/useTranslations'

export default function Experience({ locale = 'fr' }) {
  const [ref, isVisible] = useReveal()
  const t = useTranslations(locale)

  return (
    <section id="experiences" className="relative border-t border-border py-20 bg-paper-alt">
      <div className="section-container">
        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          <span className="section-num">03</span>

          <div className="mb-16">
            <p className="section-label">{t.experience.label}</p>
            <h2 className="section-title">
              {t.experience.title} <em>{t.experience.titleEmphasis}</em>
            </h2>
          </div>

          <div>
            {t.experience.items.map((exp, index) => (
              <div
                key={index}
                className={`reveal border-b border-border py-8 grid grid-cols-1 lg:grid-cols-[100px_1fr_1fr] gap-4 lg:gap-8 hover:pl-2 transition-all duration-300 ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <time className="font-mono text-xs text-muted uppercase tracking-wide block">
                  {exp.period}
                </time>

                <div>
                  <span className="font-mono text-[0.65rem] text-muted uppercase tracking-wide">
                    {exp.type === 'education' ? t.experience.typeLabels.education : t.experience.typeLabels.work}
                  </span>
                  <h3 className="font-medium text-ink text-base">{exp.title}</h3>
                  <p className="text-sm text-accent mt-1">{exp.company}</p>
                </div>

                <div>
                  <p className="text-sm text-text-body leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
