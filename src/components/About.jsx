import useReveal from '../hooks/useReveal'
import { useTranslations } from '../i18n/useTranslations'

export default function About({ locale = 'fr' }) {
  const [ref, isVisible] = useReveal()
  const t = useTranslations(locale)

  const dvsWebLink = 'https://dvs-web.fr'

  return (
    <section id="apropos" className="relative border-t border-border py-20">
      <div className="section-container">
        {/* Big faded number */}
        <span className="section-num">01</span>

        <div ref={ref} className={`reveal ${isVisible ? 'visible' : ''}`}>
          {/* Section header */}
          <div className="mb-16">
            <span className="section-label">{t.about.label}</span>
            <h2 className="section-title">
              {t.about.title}<br />
              de <em>{t.about.titleEmphasis}</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Text content */}
            <div className="space-y-6">
              <p
                className="text-text-body text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.about.paragraphs[0] }}
              />
              <p
                className="text-text-body text-base leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t.about.paragraphs[1].replace(
                    '<a>DVS Web</a>',
                    `<a href="${dvsWebLink}" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent-hover transition-colors font-medium">DVS Web</a>`
                  ),
                }}
              />
              <p
                className="text-text-body text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.about.paragraphs[2] }}
              />
              <p
                className="text-text-body text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.about.paragraphs[3] }}
              />
            </div>

            {/* Values */}
            <div className="space-y-0">
              {t.about.values.map((value, index) => (
                <div
                  key={value.title}
                  className={`reveal-right ${isVisible ? 'visible' : ''} border-t border-border pt-6 pb-6`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-serif text-accent text-lg">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-medium text-ink">{value.title}</h3>
                      <p className="text-sm text-muted mt-1">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
