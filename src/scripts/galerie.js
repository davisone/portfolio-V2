import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MOBILE_MAX = 767

const construireParcours = (salles, travels) => {
  // Un waypoint par salle + un second en sortie de salle traversante (travelling interne)
  const waypoints = []
  salles.forEach((salle) => {
    const x = parseFloat(salle.dataset.salleX)
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

// Signature cursive « Evan » d'un seul trait avec paraphe (boîte locale 260x80, base 64)
const SIGNATURE = [
  [52, 16], [38, 6], [22, 10], [18, 22], [30, 26],
  [14, 32], [8, 46], [16, 60], [34, 63], [48, 54],
  [62, 40], [66, 60], [74, 42], [78, 38], [82, 46],
  [93, 38], [85, 40], [82, 49], [87, 57], [95, 55], [98, 46], [96, 40],
  [99, 52], [103, 61], [109, 56],
  [114, 46], [117, 38], [119, 52], [121, 60],
  [126, 40], [132, 36], [137, 46], [139, 58],
  [150, 46], [160, 38], [166, 46], [156, 58], [128, 66], [100, 68], [76, 64],
]

// Fil de visite : trait baladeur qui ondule et fait des loopings entre les salles (desktop)
const construireFil = (waypoints, vw, vh) => {
  // Dans les salles traversantes, le fil passe sous les œuvres
  const traversants = new Set(
    waypoints.filter((w) => w.id.endsWith('-fin')).map((w) => w.id.slice(0, -4))
  )
  const ancres = waypoints.map((w, i) => {
    // Dernière salle : le fil arrive dans la bande basse, prêt à signer
    if (i === waypoints.length - 1) {
      return { x: w.x * vw + vw * 0.42, y: w.y * vh + vh - 96 }
    }
    const sousOeuvres = traversants.has(w.id) || w.id.endsWith('-fin')
    return {
      x: w.x * vw + vw / 2,
      y: w.y * vh + vh * (sousOeuvres ? 0.88 : 0.5 + (i % 2 ? 0.09 : -0.09)),
    }
  })

  // Points de passage : ondulations et boucle complète au milieu de chaque transition
  const pts = [ancres[0]]
  const indexAncres = [0]
  for (let i = 1; i < ancres.length; i++) {
    const a = ancres[i - 1]
    const b = ancres[i]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const longueur = Math.hypot(dx, dy) || 1
    const ux = dx / longueur
    const uy = dy / longueur
    const perpX = -uy
    const perpY = ux
    const sens = i % 2 ? 1 : -1

    if (waypoints[i].id.endsWith('-fin') || i === ancres.length - 1) {
      // Travelling sous les œuvres ou approche finale : vagues douces, pas de boucle
      for (let k = 1; k <= 4; k++) {
        const t = k / 5
        const s = k % 2 ? 1 : -1
        pts.push({ x: a.x + dx * t + perpX * 30 * s, y: a.y + dy * t + perpY * 30 * s })
      }
    } else {
      // Vadrouille avant la boucle
      pts.push({ x: a.x + dx * 0.22 + perpX * 46 * sens, y: a.y + dy * 0.22 + perpY * 46 * sens })
      // Looping au milieu du trajet
      const rayon = Math.min(88, longueur * 0.16)
      const cx = a.x + dx * 0.5
      const cy = a.y + dy * 0.5
      const theta0 = Math.atan2(-uy, -ux)
      for (let k = 0; k < 8; k++) {
        const theta = theta0 + sens * (k / 8) * Math.PI * 2
        pts.push({ x: cx + Math.cos(theta) * rayon, y: cy + Math.sin(theta) * rayon })
      }
      // Vadrouille après la boucle, de l'autre côté
      pts.push({ x: a.x + dx * 0.8 - perpX * 46 * sens, y: a.y + dy * 0.8 - perpY * 46 * sens })
    }
    pts.push({ x: b.x, y: b.y })
    indexAncres.push(pts.length - 1)
  }

  // Finale : le fil signe l'exposition dans la bande basse de la dernière salle
  const dernier = waypoints[waypoints.length - 1]
  const echelleSig = Math.min((vw * 0.15) / 260, 64 / 80)
  const sigX = dernier.x * vw + vw * 0.58
  const sigY = dernier.y * vh + vh - 24 - 80 * echelleSig
  SIGNATURE.forEach(([x, y]) => {
    pts.push({ x: sigX + x * echelleSig, y: sigY + y * echelleSig })
  })
  indexAncres[indexAncres.length - 1] = pts.length - 1

  // Spline Catmull-Rom convertie en courbes cubiques, avec longueur cumulée par point
  let d = `M ${Math.round(pts[0].x)} ${Math.round(pts[0].y)}`
  const longueurAuPoint = [0]
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${Math.round(c1x)} ${Math.round(c1y)} ${Math.round(c2x)} ${Math.round(c2y)} ${Math.round(p2.x)} ${Math.round(p2.y)}`
    // Longueur de la cubique par échantillonnage
    let lc = 0
    let px = p1.x
    let py = p1.y
    for (let k = 1; k <= 8; k++) {
      const t = k / 8
      const u = 1 - t
      const qx = u * u * u * p1.x + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * p2.x
      const qy = u * u * u * p1.y + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * p2.y
      lc += Math.hypot(qx - px, qy - py)
      px = qx
      py = qy
    }
    longueurAuPoint.push(longueurAuPoint[i] + lc)
  }
  const cumule = indexAncres.map((idx) => longueurAuPoint[idx])

  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  const maxX = Math.max(...pts.map((p) => p.x)) + vw / 2
  const maxY = Math.max(...pts.map((p) => p.y)) + vh / 2
  svg.classList.add('fil-visite')
  svg.setAttribute('width', String(maxX))
  svg.setAttribute('height', String(maxY))
  svg.setAttribute('viewBox', `0 0 ${maxX} ${maxY}`)
  svg.setAttribute('aria-hidden', 'true')
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  svg.appendChild(path)
  return { svg, path, cumule }
}

const initChoregraphie = () => {
  const monde = document.querySelector('.galerie-monde')
  const salles = [...document.querySelectorAll('.salle')]
  if (!monde || salles.length === 0) return null

  const vw = window.innerWidth
  const vh = window.innerHeight

  document.documentElement.classList.add('galerie-active')

  // Placement des salles dans le monde
  salles.forEach((salle, i) => {
    gsap.set(salle, {
      x: parseFloat(salle.dataset.salleX) * vw,
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

  const { waypoints, segments, total } = construireParcours(salles, travels)

  // Timeline caméra : translation du monde, vitesse constante
  const tl = gsap.timeline({ defaults: { ease: 'none' } })
  waypoints.forEach((w, i) => {
    if (i === 0) return
    tl.to(monde, { x: -w.x * vw, y: -w.y * vh, duration: segments[i] })
  })

  // Fil de visite dessiné en parallèle du voyage, pointe synchronisée avec la caméra
  const fil = construireFil(waypoints, vw, vh)
  monde.prepend(fil.svg)
  const longueurFil = fil.path.getTotalLength()
  const echelle = longueurFil / fil.cumule[fil.cumule.length - 1]
  gsap.set(fil.path, { strokeDasharray: longueurFil, strokeDashoffset: longueurFil })
  let position = 0
  waypoints.forEach((w, i) => {
    if (i === 0) return
    tl.to(
      fil.path,
      { strokeDashoffset: longueurFil - fil.cumule[i] * echelle, duration: segments[i], ease: 'none' },
      position
    )
    position += segments[i]
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
      // Aimantation de proximité seulement : on se cale sur une salle quand on
      // s'arrête tout près, on ne happe jamais l'utilisateur entre deux salles
      snapTo: (valeur, self) => {
        const courant = self ? self.progress : valeur
        for (let i = 1; i < progressions.length; i++) {
          if (courant <= progressions[i]) {
            if (waypoints[i].id.endsWith('-fin')) return courant
            break
          }
        }
        for (let i = 1; i < progressions.length; i++) {
          if (valeur <= progressions[i]) {
            if (waypoints[i].id.endsWith('-fin')) return valeur
            const avant = progressions[i - 1]
            const seuil = (progressions[i] - avant) * 0.12
            if (valeur - avant <= seuil) return avant
            if (progressions[i] - valeur <= seuil) return progressions[i]
            return valeur
          }
        }
        return 1
      },
      duration: { min: 0.15, max: 0.4 },
      ease: 'power1.inOut',
      delay: 0.1,
    },
  })

  // Navigation : ancre de salle -> position de scroll correspondante
  const allerA = (id) => {
    const index = waypoints.findIndex((w) => w.id === id)
    if (index === -1) return
    const cible = progressions[index]
    window.scrollTo({ top: st.start + cible * (st.end - st.start), behavior: 'smooth' })
  }
  window.__galerie = { allerA, st, tl, waypoints, progressions }

  return { st, tl, salles, monde, fil }
}

const detruireChoregraphie = (instance) => {
  if (!instance) return
  instance.st.kill()
  instance.tl.kill()
  instance.fil?.svg.remove()
  gsap.set([instance.monde, ...instance.salles], { clearProps: 'all' })
  document.documentElement.classList.remove('galerie-active')
}

// Parcours vertical natif : salles empilées, simple apparition des contenus au défilement
const initStatique = () => {
  const contenus = document.querySelectorAll('.salle .salle-contenu')
  contenus.forEach((c) => c.classList.add('fondu'))
  const io = new IntersectionObserver(
    (entrees) => entrees.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  contenus.forEach((c) => io.observe(c))
}

// Tactile ou petit écran : pas d'épinglage. Sur téléphone, la barre d'URL déclenche
// un resize à chaque inversion de scroll, les salles plus hautes que l'écran avalent
// le geste, et la vélocité des flicks fait sauter le snap — parcours vertical natif.
const estStatique = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  window.matchMedia('(pointer: coarse)').matches ||
  window.innerWidth <= MOBILE_MAX

export const initGalerie = () => {
  if (estStatique()) {
    initStatique()
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

  // Reconstruction au redimensionnement (positions en px) ; bascule en parcours
  // vertical si la fenêtre passe sous le seuil mobile
  let delaiResize
  window.addEventListener('resize', () => {
    clearTimeout(delaiResize)
    delaiResize = setTimeout(() => {
      if (!instance) return
      const progression = instance.st.progress
      detruireChoregraphie(instance)
      if (estStatique()) {
        instance = null
        initStatique()
        return
      }
      instance = initChoregraphie()
      if (instance) {
        window.scrollTo({ top: instance.st.start + progression * (instance.st.end - instance.st.start) })
      }
    }, 250)
  })
}

initGalerie()
