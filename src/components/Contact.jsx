import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import emailjs from '@emailjs/browser'

const contactLinks = [
  {
    label: 'contact@evandavison.fr',
    href: 'mailto:contact@evandavison.fr',
  },
  {
    label: '+33 6 51 01 95 06',
    href: 'tel:+33651019506',
  },
  {
    label: 'Rennes, France',
    href: null,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/davisone',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/evan-d-766478247',
  },
]

export default function Contact() {
  const [ref, isInView] = useReveal()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot) return

    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      await emailjs.send(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
      )

      setStatus({ type: 'success', message: 'Message envoy\u00e9 avec succ\u00e8s !' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus({ type: 'error', message: 'Une erreur est survenue. Veuillez r\u00e9essayer.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="border-t border-border relative" ref={ref}>
      <span className="section-num">05</span>

      <div className={`reveal grid lg:grid-cols-2 ${isInView ? 'visible' : ''}`}>
        {/* Colonne gauche — infos */}
        <div className="bg-accent text-paper p-12 sm:p-16">
          <span className="font-mono text-[0.7rem] tracking-[0.2em] uppercase text-paper/60 mb-6 block">
            Contact
          </span>

          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-paper leading-none mb-6">
            Un projet<br />
            en <em>tête</em> ?
          </h2>

          <p className="text-paper/80 text-base leading-relaxed mb-8">
            Que ce soit pour un site vitrine, une application web ou mobile,
            une refonte ou une optimisation SEO, je suis à votre écoute.
          </p>

          <div className="flex flex-col gap-4 mb-10">
            {contactLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 text-paper/80 hover:text-paper font-sans text-sm transition-colors"
                >
                  <span className="w-4 h-px bg-paper/60 shrink-0" />
                  {link.label}
                </a>
              ) : (
                <span
                  key={link.label}
                  className="flex items-center gap-3 text-paper/80 font-sans text-sm"
                >
                  <span className="w-4 h-px bg-paper/60 shrink-0" />
                  {link.label}
                </span>
              )
            )}
          </div>

          <a
            href="https://dvs-web.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/50 hover:text-paper text-xs font-sans transition-colors"
          >
            Besoin d'un site pro ? &rarr; dvs-web.fr
          </a>
        </div>

        {/* Colonne droite — formulaire */}
        <div className="bg-paper p-12 sm:p-16">
          <form onSubmit={handleSubmit}>
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute opacity-0 pointer-events-none"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="mb-6">
              <label
                htmlFor="name"
                className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted mb-2 block"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full py-3 border-b border-border bg-transparent font-sans text-ink text-base outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted mb-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full py-3 border-b border-border bg-transparent font-sans text-ink text-base outline-none focus:border-accent transition-colors"
                placeholder="john@exemple.com"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted mb-2 block"
              >
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full py-3 border-b border-border bg-transparent font-sans text-ink text-base outline-none focus:border-accent transition-colors"
                placeholder="Création d'un site web"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="font-mono text-[0.7rem] tracking-[0.1em] uppercase text-muted mb-2 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full py-3 border-b border-border bg-transparent font-sans text-ink text-base outline-none focus:border-accent transition-colors resize-y min-h-[100px]"
                placeholder="Décrivez votre projet..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full justify-center mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>

            <div aria-live="polite" aria-atomic="true">
              {status.message && (
                <p
                  role={status.type === 'error' ? 'alert' : 'status'}
                  className={`text-sm mt-4 text-center ${
                    status.type === 'success' ? 'text-ink' : 'text-accent'
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
