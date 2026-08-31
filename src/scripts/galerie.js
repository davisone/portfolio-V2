import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Amplitude horizontale réduite sur mobile (spec : ~40 %)
const AMPLITUDE_MOBILE = 0.4
const MOBILE_MAX = 767

const construireParcours = (salles, facteurX, travels) => {
  // Un waypoint par salle + un second en sortie de salle traversante (travelling interne)
  const waypoints = []
  salles.forEach((salle) => {
    const x = parseFloat(salle.dataset.salleX) * facteurX
    const y = parseFloat(salle.dataset.salleY)
    waypoints.push({ id: salle.id, x, y })
    const travel = travels.get(salle.id)
    if (travel) waypoints.push({ id: `${salle.id}-fin`, x: x + travel, y })
  })
  // Distances cumulées pour une vitesse de déplacement constante
  let total = 0
  const segments = waypoints.map((w, i) => {
    if (i === 0) return 0
    const d = Math.hypot(w.x - waypoints[i - 1].x, w.y - waypoints[i - 1].y)
    total += d
    return d
  })
  return { waypoints, segments, total }
}

const initChoregraphie = () => {
  const monde = document.querySelector('.galerie-monde')
  const salles = [...document.querySelectorAll('.salle')]
  if (!monde || salles.length === 0) return null

  const estMobile = window.innerWidth <= MOBILE_MAX
  const facteurX = estMobile ? AMPLITUDE_MOBILE : 1
  const vw = window.innerWidth
  const vh = window.innerHeight

  document.documentElement.classList.add('galerie-active')

  // Placement des salles dans le monde
  salles.forEach((salle, i) => {
    gsap.set(salle, {
      x: parseFloat(salle.dataset.salleX) * facteurX * vw,
      y: parseFloat(salle.dataset.salleY) * vh,
      width: vw,
      zIndex: i + 1,
    })
  })

  // Salles traversantes : largeur ajustée au contenu réel, travelling en unités viewport
  const travels = new Map()
  salles.forEach((salle) => {
    if (parseFloat(salle.dataset.salleLargeur || '1') > 1) {
      const contenu = salle.scrollWidth + 32
      const largeurPx = Math.max(vw, contenu)
      gsap.set(salle, { width: largeurPx })
      travels.set(salle.id, (largeurPx - vw) / vw)
    }
  })

  const { waypoints, segments, total } = construireParcours(salles, facteurX, travels)

  // Timeline caméra : translation du monde, vitesse constante
  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  waypoints.forEach((w, i) => {
    if (i === 0) return
    tl.to(monde, { x: -w.x * vw, y: -w.y * vh, duration: segments[i] })
  })

  const progressions = (() => {
    let cumul = 0
    return waypoints.map((_, i) => {
      cumul += segments[i]
      return total > 0 ? cumul / total : 0
    })
  })()

  const st = ScrollTrigger.create({
    animation: tl,
    trigger: '.galerie-viewport',
    start: 'top top',
    end: () => `+=${Math.round(total * vh)}`,
    pin: true,
    scrub: 1,
    snap: {
      snapTo: progressions,
      duration: { min: 0.15, max: 0.4 },
      ease: 'power1.inOut',
      delay: 0.1,
    },
    onUpdate: (self) => {
      // Progression de la visite pour le plan (interpolation côté plan)
      document.dispatchEvent(new CustomEvent('galerie:progress', { detail: { progress: self.progress } }))
    },
  })

  // Position initiale pour le plan de la visite
  document.dispatchEvent(new CustomEvent('galerie:progress', { detail: { progress: st.progress } }))

  // Navigation : ancre de salle -> position de scroll correspondante
  const allerA = (id) => {
    const index = waypoints.findIndex((w) => w.id === id)
    if (index === -1) return
    const cible = progressions[index]
    window.scrollTo({ top: st.start + cible * (st.end - st.start), behavior: 'smooth' })
  }
  window.__galerie = { allerA, st, tl, waypoints, progressions }

  return { st, tl, salles, monde }
}

const detruireChoregraphie = (instance) => {
  if (!instance) return
  instance.st.kill()
  instance.tl.kill()
  gsap.set([instance.monde, ...instance.salles], { clearProps: 'all' })
  document.documentElement.classList.remove('galerie-active')
}

export const initGalerie = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Chorégraphie désactivée : simple apparition des contenus au défilement
    const contenus = document.querySelectorAll('.salle .salle-contenu')
    contenus.forEach((c) => c.classList.add('fondu'))
    const io = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.15 }
    )
    contenus.forEach((c) => io.observe(c))
    return
  }

  let instance = initChoregraphie()
  if (!instance) return

  // Ancres internes vers les salles : voyage au lieu du saut natif
  document.querySelectorAll('a[href*="#"]').forEach((lien) => {
    const href = lien.getAttribute('href')
    const id = href.split('#')[1]
    if (!id) return
    lien.addEventListener('click', (e) => {
      const cible = document.getElementById(id)
      if (cible?.classList.contains('salle')) {
        e.preventDefault()
        window.__galerie?.allerA(id)
        history.replaceState(null, '', `#${id}`)
      }
    })
  })

  // Arrivée avec une ancre dans l'URL
  if (location.hash) {
    const id = location.hash.slice(1)
    requestAnimationFrame(() => window.__galerie?.allerA(id))
  }

  // Reconstruction au redimensionnement (positions en px)
  let delaiResize
  window.addEventListener('resize', () => {
    clearTimeout(delaiResize)
    delaiResize = setTimeout(() => {
      const progression = instance ? instance.st.progress : 0
      detruireChoregraphie(instance)
      instance = initChoregraphie()
      if (instance) {
        window.scrollTo({ top: instance.st.start + progression * (instance.st.end - instance.st.start) })
      }
    }, 250)
  })
}

initGalerie()
