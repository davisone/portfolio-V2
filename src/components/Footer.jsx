import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'

const navLinks = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'À propos', href: '#apropos' },
  { name: 'Services', href: '#services' },
  { name: 'Réalisations', href: '#realisations' },
  { name: 'Contact', href: '#contact' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="section-container py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div className="text-center md:text-left">
            <a href="#accueil" className="text-xl font-bold">
              <span className="text-white">Evan</span>
              <span className="gradient-text">.dev</span>
            </a>
            <p className="text-slate-500 text-sm mt-2">
              Développeur Fullstack & Freelance
            </p>
          </div>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/davisone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/evan-d-766478247"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            &copy; {currentYear} Evan Davison. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1">
            Fait avec <FaHeart className="text-red-500" size={12} /> et{' '}
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              React
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
