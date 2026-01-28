import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'contact@evandavison.fr',
    href: 'mailto:contact@evandavison.fr',
  },
  {
    icon: HiPhone,
    label: 'Téléphone',
    value: '+33 6 51 01 95 06',
    href: 'tel:+33651019506',
  },
  {
    icon: HiLocationMarker,
    label: 'Localisation',
    value: 'Rennes , France',
    href: null,
  },
]

const socialLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/davisone',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/evan-d-766478247',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simule l'envoi - à remplacer par votre logique d'envoi
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert('Message envoyé ! (simulation)')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-slate-900/30">
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
              Me <span className="gradient-text">contacter</span>
            </h2>
            <p className="section-subtitle mx-auto">
              Un projet en tête ? Discutons-en ensemble.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Travaillons ensemble
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Que ce soit pour un site vitrine, une application web ou mobile,
                  une refonte ou une optimisation SEO, je suis à votre écoute.
                  N'hésitez pas à me contacter via le formulaire ou directement
                  par email.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="p-3 bg-primary-500/10 rounded-lg text-primary-400">
                      <info.icon size={20} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-primary-400 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-slate-500 text-sm mb-3">Retrouvez-moi sur</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* DVS Web CTA */}
              <div className="card p-6 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/30">
                <h4 className="text-white font-semibold mb-2">
                  Besoin d'un site professionnel ?
                </h4>
                <p className="text-slate-400 text-sm mb-4">
                  Découvrez les services de DVS Web pour votre projet digital.
                </p>
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm"
                >
                  Visiter DVS Web
                </a>
              </div>
            </div>

            {/* Contact form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card p-8"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-slate-400 text-sm mb-2"
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
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-slate-400 text-sm mb-2"
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
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="john@exemple.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-slate-400 text-sm mb-2"
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Création d'un site web"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-slate-400 text-sm mb-2"
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
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <HiPaperAirplane className="rotate-90" />
                    Envoyer le message
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
