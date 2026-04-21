import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'A propos', href: '#apropos' },
  { name: 'Realisations', href: '#realisations' },
  { name: 'Blog', href: '/blog' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-paper border-b border-border py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#accueil"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-serif text-ink"
        >
          Evan<span className="text-accent">.</span>
        </motion.a>

        {/* Desktop Navigation */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          {navLinks.map((link, index) => (
            <motion.li
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={link.href}
                className="font-sans text-xs tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors duration-300"
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <motion.a
          href="https://dvs-web.fr"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:inline-flex font-sans text-xs tracking-[0.12em] uppercase text-accent border-b border-accent hover:opacity-80 transition-opacity duration-300"
        >
          DVS Web &#8599;
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-muted hover:text-ink p-2 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-paper border-b border-border"
          >
            <ul className="section-container py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-sans text-xs tracking-[0.12em] uppercase text-muted hover:text-ink transition-colors py-2"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs tracking-[0.12em] uppercase text-accent border-b border-accent"
                >
                  DVS Web &#8599;
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
