# La Galerie — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rescénographier la home du portfolio en « galerie lumineuse » traversée au scroll (caméra multi-directions GSAP), et propager la nouvelle identité claire à tout le site.

**Architecture:** Le contenu reste du HTML statique Astro (ordre DOM = ordre de visite). Un script GSAP ScrollTrigger épingle le viewport et déplace un conteneur « monde » où les six salles sont positionnées en 2D ; les coordonnées vivent dans des attributs `data-salle-*` lus par le script (source de vérité unique). Sans JS ou avec `prefers-reduced-motion`, les salles s'empilent verticalement (layout par défaut).

**Tech Stack:** Astro 5, Tailwind 3, GSAP 3 + ScrollTrigger (nouveau), @emailjs/browser (conservé, utilisé en vanilla). Framer Motion et les îles React de la home sont supprimés.

**Spec:** `docs/superpowers/specs/2026-08-31-la-galerie-design.md`

## Global Constraints

- Réponses/commits/commentaires en français ; code en anglais ; aucune trace de Claude nulle part.
- Branche Git Flow : `feature/la-galerie` créée depuis `develop` (validation utilisateur obtenue à l'approbation de ce plan, commits par tâche inclus). Merge dans `develop` en fin de plan uniquement après validation.
- Aucun émoji dans le code ni l'UI — SVG uniquement.
- Palette exclusive (tokens spec §5) : cimaise `#FAFAF7`, oeuvre `#FFFFFF`, encre `#1C1B18`, cartel `#6F6A63`, filet `#E6E3DC`, point `#C8330A`. Le rouge uniquement pour : position sur le plan, pastille « Livré », hover de liens, CTA.
- Typographies : Marcellus (display), Source Serif 4 (lecture), Archivo (signalétique). Auto-hébergées en woff2 comme les fontes actuelles.
- Animations : `transform` et `opacity` uniquement. `prefers-reduced-motion` désactive la chorégraphie.
- SEO intangible : balises méta, canoniques, hreflang, schémas JSON-LD et sitemap ne changent pas ; tout le contenu texte reste dans le HTML statique.
- i18n : mécanique existante (`getTranslations(locale)`) conservée ; les trois homes (fr, `/en-gb/`, `/en-us/`) utilisent les mêmes composants.
- Vérification : pas de framework de test dans le projet — chaque tâche se valide par `npm run build` (zéro erreur) + contrôle visuel sur `npm run dev` (breakpoints 375/768/1024/1440).

---

### Task 1: Fondations — typographies et tokens de la Galerie

**Files:**
- Create: `public/fonts/` — woff2 Marcellus (400), Source Serif 4 (300/400/600 + italique 400), Archivo (400/500/600)
- Modify: `src/styles/global.css` (remplacement complet des @font-face, tokens, base)
- Modify: `tailwind.config.mjs` (couleurs, familles, suppression `darkMode`)
- Modify: `src/layouts/Layout.astro` (préchargement fontes, suppression script thème)

**Interfaces:**
- Produces: tokens Tailwind `cimaise`, `oeuvre`, `encre`, `cartel`, `filet`, `point` ; familles `font-display` (Marcellus), `font-lecture` (Source Serif 4), `font-signal` (Archivo) ; classes composant `.cartel-box`, `.signal-label`, `.btn-galerie`. Toutes les tâches suivantes stylent exclusivement avec ces tokens.

- [ ] **Step 1: Créer la branche**

```bash
git checkout develop && git checkout -b feature/la-galerie
```

- [ ] **Step 2: Télécharger les fontes woff2**

Via google-webfonts-helper (subset latin ; ajouter latin-ext comme pour les fontes actuelles) :

```bash
cd /tmp && for f in "marcellus:regular" "source-serif-4:300,regular,600,italic" "archivo:regular,500,600"; do
  name="${f%%:*}"; variants="${f##*:}"
  curl -sL "https://gwfh.mranftl.com/api/fonts/${name}?download=zip&subsets=latin,latin-ext&variants=${variants}&formats=woff2" -o "${name}.zip"
  unzip -o "${name}.zip" -d "${name}"
done
cp marcellus/*.woff2 source-serif-4/*.woff2 archivo/*.woff2 ~/IdeaProjects/portfolio-V2/public/fonts/
```

Si l'API est indisponible : télécharger les familles sur fonts.google.com et convertir en woff2. Ne pas supprimer les anciennes fontes ici (fait en Task 7).

- [ ] **Step 3: Réécrire `src/styles/global.css`**

Remplacer intégralement les blocs @font-face et le `@layer base` (garder `@tailwind` et la scrollbar, adapter ses couleurs). Un @font-face par fichier téléchargé sur ce modèle, avec `font-display: swap` :

```css
@font-face {
  font-family: 'Marcellus';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/marcellus-v17-latin-regular.woff2') format('woff2');
}
/* idem pour chaque poids Source Serif 4 (300, 400, 600, italic 400) et Archivo (400, 500, 600), noms de fichiers réels du zip */

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-cimaise: 250 250 247;
    --color-oeuvre: 255 255 255;
    --color-encre: 28 27 24;
    --color-cartel: 111 106 99;
    --color-filet: 230 227 220;
    --color-point: 200 51 10;
  }

  html { scroll-behavior: smooth; }

  body {
    @apply font-lecture antialiased bg-cimaise text-encre;
  }

  ::selection { @apply bg-point/15 text-encre; }

  :focus-visible { outline: 2px solid rgb(var(--color-point)); outline-offset: 3px; }
}

@layer components {
  .section-container { @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8; }

  .signal-label {
    @apply font-signal text-[11px] font-semibold tracking-[0.16em] uppercase text-cartel;
  }

  .cartel-box { @apply bg-oeuvre border border-filet; }

  .btn-galerie {
    @apply inline-flex items-center gap-2.5 px-7 py-3.5 bg-encre text-cimaise
           font-signal text-xs font-medium tracking-[0.1em] uppercase
           transition-colors duration-200 hover:bg-point cursor-pointer;
  }

  .btn-galerie-secondaire {
    @apply inline-flex items-center gap-2.5 px-7 py-3.5 border border-encre text-encre
           font-signal text-xs tracking-[0.1em] uppercase
           transition-colors duration-200 hover:border-point hover:text-point cursor-pointer;
  }
}
```

Supprimer : le bloc `.dark { … }`, les classes `.reveal`/`.reveal-right` (remplacées en Task 5), `.section-label`, `.section-title`, `.section-num`, `.btn-primary`, `.btn-secondary` (les composants qui les utilisent sont réécrits en Task 2/3 — les garder temporairement en alias vers les nouveaux styles n'est pas nécessaire : Task 1 et 2/3 se suivent sur la même branche, le site peut être visuellement incohérent entre les deux commits).

- [ ] **Step 4: Mettre à jour `tailwind.config.mjs`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        cimaise: 'rgb(var(--color-cimaise) / <alpha-value>)',
        oeuvre: 'rgb(var(--color-oeuvre) / <alpha-value>)',
        encre: 'rgb(var(--color-encre) / <alpha-value>)',
        cartel: 'rgb(var(--color-cartel) / <alpha-value>)',
        filet: 'rgb(var(--color-filet) / <alpha-value>)',
        point: 'rgb(var(--color-point) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Marcellus', 'Times New Roman', 'serif'],
        lecture: ['Source Serif 4', 'Georgia', 'serif'],
        signal: ['Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
```

`darkMode: 'class'` et les animations/keyframes existants sont supprimés (fadeIn/slideUp/shimmer/marquee ne sont plus utilisés après Task 3 ; s'il reste un usage dans les pages secondaires au build, garder uniquement ceux-là).

- [ ] **Step 5: Nettoyer `src/layouts/Layout.astro`**

Supprimer le script inline « Theme detection » (lignes ~196-204). Ajouter les préchargements des trois fontes critiques dans le `<head>` (un par fichier réellement utilisé au-dessus de la ligne de flottaison) :

```html
<link rel="preload" href="/fonts/marcellus-v17-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/source-serif-4-v9-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/archivo-v20-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
```

(Noms de fichiers : ceux du zip téléchargé.)

- [ ] **Step 6: Vérifier le build**

Run: `npm run build`
Expected: build sans erreur. Des classes `dark:` orphelines dans les composants ne cassent pas le build (elles deviennent inertes) — elles sont retirées en Task 2/3.

- [ ] **Step 7: Contrôle visuel**

Run: `npm run dev` — ouvrir `/blog/`, `/faq/` : fond cimaise, texte encre, nouvelles fontes visibles (vérifier dans l'inspecteur que Marcellus/Source Serif 4 sont bien chargées, pas les fallbacks).

- [ ] **Step 8: Commit**

```bash
git add public/fonts src/styles/global.css tailwind.config.mjs src/layouts/Layout.astro
git commit -m "feat(design): tokens et typographies La Galerie"
```

---

### Task 2: Header, Footer, suppression du mode sombre

**Files:**
- Modify: `src/components/Header.astro` (restyle + retrait ThemeToggle)
- Modify: `src/components/Footer.astro` (restyle)
- Modify: `src/components/LanguageSwitcher.astro` (couleurs tokens uniquement)
- Delete: `src/components/ThemeToggle.astro`, `src/components/ThemeToggle.jsx`, `src/components/Header.jsx`
- Modify: pages utilisant `Header.jsx` s'il y en a (vérifier par grep)

**Interfaces:**
- Consumes: tokens et classes de Task 1.
- Produces: `Header.astro` et `Footer.astro` restylés, sans aucune classe `dark:`, utilisés tels quels par la home et les pages secondaires.

- [ ] **Step 1: Restyler `Header.astro`**

Garder la structure (nav, liens ancres, LanguageSwitcher, burger mobile) et l'i18n. Remplacer les classes de couleurs/typo : fond `bg-cimaise/90 backdrop-blur-sm border-b border-filet`, liens `font-signal text-xs tracking-[0.14em] uppercase text-encre hover:text-point transition-colors`, logo/nom en `font-display`. Supprimer l'import et l'usage de `ThemeToggle`. Supprimer toute classe `dark:`.

- [ ] **Step 2: Restyler `Footer.astro`**

Même traitement : `bg-cimaise border-t border-filet`, titres de colonnes en `.signal-label`, liens `text-cartel hover:text-point`. Le lien CV (`/cv/Evan_Davison_cv.pdf`) est conservé. Supprimer toute classe `dark:`.

- [ ] **Step 3: Supprimer les fichiers thème et vérifier les références**

```bash
rm src/components/ThemeToggle.astro src/components/ThemeToggle.jsx src/components/Header.jsx
grep -rn "ThemeToggle\|Header.jsx\|localStorage.getItem('theme')" src/
```

Expected: aucune référence restante (corriger sinon).

- [ ] **Step 4: Balayer les classes `dark:` restantes des pages secondaires**

```bash
grep -rln "dark:" src/ | head -50
```

Retirer les préfixes `dark:*` de tous les fichiers listés (pages blog/glossaire/FAQ/404, composants). Remplacer au passage les anciennes couleurs (`ink`, `paper`, `accent`, `muted`, `border`, `text-body`) par les nouveaux tokens : `ink→encre`, `paper→cimaise`, `paper-alt→oeuvre`, `accent→point`, `muted→cartel`, `border→filet`, `text-body→cartel` ; `font-serif→font-display`, `font-sans→font-lecture`, `font-mono→font-signal`.

- [ ] **Step 5: Vérifier le build et le rendu**

Run: `npm run build && grep -rln "dark:\|bg-paper\|text-ink" src/ | wc -l`
Expected: build OK, compteur à 0.
Contrôle visuel : `/`, `/blog/`, `/faq/`, `/glossaire/` — cohérents, lisibles, header/footer clairs.

- [ ] **Step 6: Commit**

```bash
git add -A src/
git commit -m "refactor(design): header, footer et pages secondaires en clair uniquement"
```

---

### Task 3: Les six salles en HTML statique (fallback vertical)

**Files:**
- Create: `src/components/galerie/Cartel.astro`
- Create: `src/components/galerie/SalleHall.astro`, `SalleAPropos.astro`, `SalleServices.astro`, `GrandeSalle.astro`, `SalleExperience.astro`, `SalleSortie.astro`
- Modify: `src/pages/index.astro`, `src/pages/en-gb/index.astro`, `src/pages/en-us/index.astro`
- Delete: `src/components/Hero.astro`, `Hero.jsx`, `About.jsx`, `Services.jsx`, `Experience.jsx`, `Projects.jsx`, `Contact.jsx`, `ScrollToTop.jsx`, `src/hooks/useReveal.js`

**Interfaces:**
- Consumes: tokens/classes Task 1, `getTranslations(locale)` de `src/i18n`.
- Produces: six sections `.salle` avec `id` (`accueil`, `apropos`, `services`, `projets`, `experience`, `contact`) et attributs `data-salle-x`, `data-salle-y`, `data-salle-largeur` (unités viewport) lus par Task 4. DOM order = ordre de visite. Chaque salle : `<section id class="salle" data-…><div class="salle-contenu">…</div></section>`.

- [ ] **Step 1: Créer `Cartel.astro`**

```astro
---
// Cartel d'exposition : fiche projet au vocabulaire muséal
interface Props {
  titre: string
  medium: string        // ex. « Commande privée — boutique en ligne, 2025 »
  technologies: string[]
  livre?: boolean
  lien?: string | null
}
const { titre, medium, technologies, livre = false, lien = null } = Astro.props
---
<div class="cartel-box p-6 sm:p-7">
  <h3 class="font-display text-2xl text-encre mb-1">
    {lien ? <a href={lien} target="_blank" rel="noopener noreferrer" class="hover:text-point transition-colors">{titre}</a> : titre}
  </h3>
  <p class="font-lecture italic text-cartel text-[15px] mb-4">{medium}</p>
  <p class="font-signal text-[11px] tracking-[0.09em] uppercase text-cartel pt-3.5 border-t border-filet flex items-center justify-between gap-3 flex-wrap">
    <span>{technologies.join(' · ')}</span>
    {livre && (
      <span class="inline-flex items-center gap-2 text-encre font-semibold">
        <span class="w-2 h-2 rounded-full bg-point" aria-hidden="true"></span>
        Livré
      </span>
    )}
  </p>
</div>
```

(Le libellé « Livré » passe par i18n : ajouter la clé `projects.delivered` dans `fr.json`/`en.json` et la passer en prop `livreLabel` — même mécanique que les autres composants.)

- [ ] **Step 2: Créer les six salles**

Chaque salle suit ce squelette exact (exemple complet avec `SalleAPropos.astro` ; les autres suivent le même modèle avec leurs coordonnées) :

```astro
---
import { getTranslations, type Locale } from '../../i18n'
interface Props { locale?: Locale }
const { locale = 'fr' } = Astro.props
const t = getTranslations(locale)
---
<section
  id="apropos"
  class="salle min-h-screen flex items-center py-16"
  data-salle-x="0" data-salle-y="1"
  aria-label={t.about.title}
>
  <div class="salle-contenu section-container w-full">
    <p class="signal-label mb-3">Salle 1</p>
    <h2 class="font-display text-4xl sm:text-5xl text-encre mb-8">{t.about.title}</h2>
    <div class="max-w-2xl text-lg leading-relaxed text-encre space-y-4">
      <!-- porter ici les paragraphes de About.jsx (clés t.about.*) -->
    </div>
  </div>
</section>
```

Coordonnées par salle (parcours en S de la spec §3) :

| Composant | id | data-salle-x | data-salle-y | data-salle-largeur |
|---|---|---|---|---|
| SalleHall | `accueil` | 0 | 0 | — |
| SalleAPropos | `apropos` | 0 | 1 | — |
| SalleServices | `services` | 1 | 1 | — |
| GrandeSalle | `projets` | 2 | 2 | 2.5 |
| SalleExperience | `experience` | 3.5 | 3 | — |
| SalleSortie | `contact` | 2.5 | 3 | — |

Contenus à porter (même texte, mêmes clés i18n, nouvelle mise en scène) :
- **SalleHall** : reprendre `Hero.astro` (titre géant → `font-display` non gras, sous-titre, description, badge, CTA `btn-galerie`/`btn-galerie-secondaire`, lien CV, réseaux). Numérotation : `signal-label` « Hall ». h1 unique du document.
- **SalleServices** : les trois services de `Services.jsx` (clés `t.services.*`) présentés en trois `cartel-box` alignées, « Salle 2 ».
- **GrandeSalle** : la liste `projects` de `Projects.jsx` (données locales du fichier + clés `t.projects.*`) : chaque projet = image (`loading="lazy"`, `width`/`height` déclarés, alt existant) au-dessus d'un `<Cartel>`. Les œuvres sont disposées en rangée horizontale (`flex gap-16 lg:gap-24 items-center`) dans la salle large de 250 vw ; en fallback vertical (avant Task 4) la rangée passe en colonne (`flex-col lg:flex-row` n'est pas utilisé : le mode fallback est piloté par l'absence de `.galerie-active`, voir Task 4 — par défaut la rangée wrap en colonne via `flex-col`, le mode galerie la passera en rangée). La modale de `Projects.jsx` disparaît : le cartel porte le lien direct.
- **SalleExperience** : la frise de `Experience.jsx` (clés `t.experience.*`), items en liste verticale filetée, « Salle 4 ».
- **SalleSortie** : le formulaire de `Contact.jsx` — champs, labels visibles, mêmes IDs EmailJS (reprendre les constantes service/template/clé publique du fichier), messages d'erreur sous les champs. Le JS devient un `<script>` Astro vanilla :

```astro
<script>
  import emailjs from '@emailjs/browser'
  const form = document.getElementById('contact-form') as HTMLFormElement | null
  const status = document.getElementById('contact-status')
  form?.addEventListener('submit', async (e) => {
    e.preventDefault()
    const bouton = form.querySelector('button[type="submit"]') as HTMLButtonElement
    bouton.disabled = true
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY })
      if (status) status.textContent = form.dataset.successMessage ?? ''
      form.reset()
    } catch {
      if (status) status.textContent = form.dataset.errorMessage ?? ''
    } finally {
      bouton.disabled = false
    }
  })
</script>
```

(`data-success-message`/`data-error-message` posés sur le `<form>` depuis les clés i18n ; `SERVICE_ID`/`TEMPLATE_ID`/`PUBLIC_KEY` : constantes reprises de `Contact.jsx`.)

- [ ] **Step 3: Réécrire `index.astro` (puis en-gb/en-us à l'identique avec leur locale)**

```astro
---
import Layout from '../layouts/Layout.astro'
import Header from '../components/Header.astro'
import Footer from '../components/Footer.astro'
import SalleHall from '../components/galerie/SalleHall.astro'
import SalleAPropos from '../components/galerie/SalleAPropos.astro'
import SalleServices from '../components/galerie/SalleServices.astro'
import GrandeSalle from '../components/galerie/GrandeSalle.astro'
import SalleExperience from '../components/galerie/SalleExperience.astro'
import SalleSortie from '../components/galerie/SalleSortie.astro'
---

<Layout … (props méta strictement inchangées) …>
  <Header locale="fr" />
  <main id="main-content" class="galerie-viewport">
    <div class="galerie-monde">
      <SalleHall locale="fr" />
      <SalleAPropos locale="fr" />
      <SalleServices locale="fr" />
      <GrandeSalle locale="fr" />
      <SalleExperience locale="fr" />
      <SalleSortie locale="fr" />
    </div>
  </main>
  <Footer locale="fr" />
</Layout>
```

- [ ] **Step 4: Supprimer les composants remplacés et vérifier**

```bash
rm src/components/Hero.astro src/components/Hero.jsx src/components/About.jsx \
   src/components/Services.jsx src/components/Experience.jsx src/components/Projects.jsx \
   src/components/Contact.jsx src/components/ScrollToTop.jsx src/hooks/useReveal.js
grep -rn "Hero\|About\|ScrollToTop\|useReveal" src/pages src/components | grep -v galerie
```

Expected: aucune référence orpheline.

Run: `npm run build`
Expected: OK. Contrôle visuel des trois homes : six sections empilées verticalement, tout le contenu présent et lisible, formulaire contact fonctionnel.

- [ ] **Step 5: Commit**

```bash
git add -A src/
git commit -m "feat(galerie): six salles statiques et cartels, home sans îles React"
```

---

### Task 4: Chorégraphie GSAP desktop

**Files:**
- Create: `src/scripts/galerie.js`
- Modify: `src/styles/global.css` (styles `.galerie-active`)
- Modify: `src/pages/index.astro` + en-gb/en-us (chargement du script)

**Interfaces:**
- Consumes: sections `.salle` avec `data-salle-x/y/largeur` (Task 3).
- Produces: `initGalerie()` exporté et auto-exécuté ; émet la progression caméra via `document.dispatchEvent(new CustomEvent('galerie:progress', { detail: { x, y, progress } }))` (consommé par Task 6) ; expose `window.__galerie = { allerA(id) }` pour la navigation (Task 6).

- [ ] **Step 1: Installer GSAP**

```bash
npm install gsap
```

- [ ] **Step 2: Styles du mode galerie dans `global.css`**

```css
/* Mode galerie : activé par JS quand la chorégraphie démarre */
.galerie-active .galerie-viewport { height: 100vh; overflow: hidden; }
.galerie-active .galerie-monde { position: relative; height: 100vh; }
.galerie-active .salle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(var(--color-cimaise));
}
.galerie-active .salle .salle-rangee { flex-direction: row; }
```

(La `GrandeSalle` utilise `salle-rangee flex flex-col` sur son conteneur d'œuvres : colonne en fallback, rangée en mode galerie.)

- [ ] **Step 3: Écrire `src/scripts/galerie.js`**

```js
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Amplitude horizontale reduite sur mobile (spec : ~40 %)
const AMPLITUDE_MOBILE = 0.4

const construireParcours = (salles, facteurX) => {
  // Un waypoint par salle + un second en sortie de salle large (travelling interne)
  const waypoints = []
  salles.forEach((salle) => {
    const x = parseFloat(salle.dataset.salleX) * facteurX
    const y = parseFloat(salle.dataset.salleY)
    const largeur = parseFloat(salle.dataset.salleLargeur || '1')
    waypoints.push({ id: salle.id, x, y })
    if (largeur > 1) waypoints.push({ id: `${salle.id}-fin`, x: x + (largeur - 1) * facteurX, y })
  })
  // Distances cumulees pour une vitesse de deplacement constante
  let total = 0
  const segments = waypoints.map((w, i) => {
    if (i === 0) return 0
    const d = Math.hypot(w.x - waypoints[i - 1].x, w.y - waypoints[i - 1].y)
    total += d
    return d
  })
  return { waypoints, segments, total }
}

export const initGalerie = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const monde = document.querySelector('.galerie-monde')
  const salles = [...document.querySelectorAll('.salle')]
  if (!monde || salles.length === 0) return

  document.documentElement.classList.add('galerie-active')

  const mm = gsap.matchMedia()
  mm.add(
    { estMobile: '(max-width: 767px)', estDesktop: '(min-width: 768px)' },
    (ctx) => {
      const facteurX = ctx.conditions.estMobile ? AMPLITUDE_MOBILE : 1
      const vw = window.innerWidth
      const vh = window.innerHeight

      // Placement des salles dans le monde
      salles.forEach((salle, i) => {
        const largeur = parseFloat(salle.dataset.salleLargeur || '1')
        gsap.set(salle, {
          x: parseFloat(salle.dataset.salleX) * facteurX * vw,
          y: parseFloat(salle.dataset.salleY) * vh,
          width: largeur > 1 ? largeur * vw : vw,
          zIndex: i + 1,
        })
      })

      const { waypoints, segments, total } = construireParcours(salles, facteurX)

      // Timeline camera : translation du monde, vitesse constante
      const tl = gsap.timeline({ defaults: { ease: 'none' } })
      waypoints.forEach((w, i) => {
        if (i === 0) return
        tl.to(monde, { x: -w.x * vw, y: -w.y * vh, duration: segments[i] })
      })

      const progressions = (() => {
        let cumul = 0
        return waypoints.map((_, i) => {
          cumul += segments[i]
          return cumul / total
        })
      })()

      const st = ScrollTrigger.create({
        animation: tl,
        trigger: '.galerie-viewport',
        start: 'top top',
        end: () => `+=${Math.round(total * vh)}`,
        pin: true,
        scrub: 1,
        snap: { snapTo: progressions, duration: { min: 0.15, max: 0.4 }, ease: 'power1.inOut', delay: 0.1 },
        onUpdate: (self) => {
          const p = self.progress
          // Position camera courante pour le plan de la visite
          const x = -gsap.getProperty(monde, 'x') / vw
          const y = -gsap.getProperty(monde, 'y') / vh
          document.dispatchEvent(new CustomEvent('galerie:progress', { detail: { x, y, progress: p } }))
        },
      })

      // Navigation : ancres internes -> position de scroll correspondante
      const allerA = (id) => {
        const cible = id === 'accueil' ? 0 : progressions[waypoints.findIndex((w) => w.id === id)]
        if (cible === undefined) return
        window.scrollTo({ top: st.start + cible * (st.end - st.start), behavior: 'smooth' })
      }
      window.__galerie = { allerA }

      document.querySelectorAll('a[href^="#"]').forEach((lien) => {
        lien.addEventListener('click', (e) => {
          const id = lien.getAttribute('href').slice(1)
          if (document.getElementById(id)?.classList.contains('salle')) {
            e.preventDefault()
            allerA(id)
            history.replaceState(null, '', `#${id}`)
          }
        })
      })

      // Arrivee avec une ancre dans l'URL
      if (location.hash) allerA(location.hash.slice(1))

      return () => {
        st.kill()
        tl.kill()
        gsap.set([monde, ...salles], { clearProps: 'all' })
      }
    }
  )
}

initGalerie()
```

- [ ] **Step 4: Charger le script sur les trois homes**

Dans `index.astro` (et en-gb/en-us), après le `</Layout>` du markup, ajouter :

```astro
<script>
  import '../scripts/galerie.js'
</script>
```

(chemin relatif adapté pour en-gb/en-us : `../../scripts/galerie.js`).

- [ ] **Step 5: Vérifier la chorégraphie desktop**

Run: `npm run dev` — sur `/` à 1440 px :
- le scroll molette traverse : descente, glissement droite, diagonale, travelling horizontal dans la Grande salle, descente, glissement gauche ;
- le snap accroche doucement chaque salle sans bloquer le scroll libre ;
- les liens du header (`#projets`, `#contact`) voyagent jusqu'à la bonne salle ;
- aucun scroll horizontal du body (vérifier `document.body.scrollWidth === window.innerWidth`).

Run: `npm run build`
Expected: OK.

- [ ] **Step 6: Commit**

```bash
git add src/scripts/galerie.js src/styles/global.css src/pages
git commit -m "feat(galerie): chorégraphie GSAP multi-directions avec snap"
```

---

### Task 5: Mobile, reduced-motion, sans JavaScript

**Files:**
- Modify: `src/scripts/galerie.js` (fondus reduced-motion)
- Modify: `src/styles/global.css` (styles des fondus)
- Modify: composants salles si des ajustements responsive sont nécessaires

**Interfaces:**
- Consumes: `initGalerie()` de Task 4.
- Produces: comportements dégradés conformes spec §6 (fallbacks).

- [ ] **Step 1: Fondus discrets en reduced-motion**

Dans `global.css` :

```css
/* Fondus reduced-motion : opacite seule, jamais de translation */
.fondu { opacity: 0; transition: opacity 0.6s ease-out; }
.fondu.visible { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .fondu { transition-duration: 0.01ms; }
}
```

Dans `galerie.js`, remplacer le `return` anticipé reduced-motion par :

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Chorégraphie désactivée : simple apparition des contenus au defilement
  const contenus = document.querySelectorAll('.salle .salle-contenu')
  contenus.forEach((c) => c.classList.add('fondu'))
  const io = new IntersectionObserver(
    (entrees) => entrees.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15 }
  )
  contenus.forEach((c) => io.observe(c))
  return
}
```

- [ ] **Step 2: Vérifier les trois modes**

- **Sans JS** : dans DevTools, désactiver JavaScript, recharger `/` : six sections empilées, tout lisible, ancres natives fonctionnelles.
- **Reduced motion** : DevTools → Rendering → `prefers-reduced-motion: reduce` : scroll vertical, contenus en fondu, pas de caméra.
- **Mobile 375 px** : la chorégraphie tourne avec glissements latéraux courts (40 %), les salles suivantes recouvrent les précédentes proprement (fond cimaise opaque), aucun contenu tronqué, cibles tactiles ≥ 44 px, formulaire utilisable.

Run: `npm run build`
Expected: OK.

- [ ] **Step 3: Commit**

```bash
git add src/scripts/galerie.js src/styles/global.css src/components/galerie
git commit -m "feat(galerie): fallbacks mobile, reduced-motion et sans JavaScript"
```

---

### Task 6: Le plan de la visite (signature)

**Files:**
- Create: `src/components/galerie/PlanVisite.astro`
- Modify: `src/pages/index.astro` + en-gb/en-us (inclusion du composant)
- Modify: `src/styles/global.css` (styles du plan)

**Interfaces:**
- Consumes: évènement `galerie:progress` et `window.__galerie.allerA(id)` (Task 4).
- Produces: navigation fixe en bas à gauche, masquée si la chorégraphie est inactive.

- [ ] **Step 1: Créer `PlanVisite.astro`**

Les coordonnées du SVG reflètent les `data-salle-*` (échelle : 1 unité viewport = 48 px de plan, pièces 40×28) :

```astro
---
import { getTranslations, type Locale } from '../../i18n'
interface Props { locale?: Locale }
const { locale = 'fr' } = Astro.props
const t = getTranslations(locale)
const salles = [
  { id: 'accueil', x: 0, y: 0, l: 1, nom: t.nav.home },
  { id: 'apropos', x: 0, y: 1, l: 1, nom: t.nav.about },
  { id: 'services', x: 1, y: 1, l: 1, nom: t.nav.services },
  { id: 'projets', x: 2, y: 2, l: 2.5, nom: t.nav.projects },
  { id: 'experience', x: 3.5, y: 3, l: 1, nom: t.nav.experience },
  { id: 'contact', x: 2.5, y: 3, l: 1, nom: t.nav.contact },
]
const E = 48 // echelle px par unite viewport
const M = 8  // marge
---
<nav id="plan-visite" class="plan-visite" aria-label={t.nav.planLabel ?? 'Plan de la visite'} hidden>
  <svg
    width={4.5 * E + 2 * M + 40} height={3 * E + 2 * M + 28}
    viewBox={`0 0 ${4.5 * E + 2 * M + 40} ${3 * E + 2 * M + 28}`}
  >
    {salles.map((s) => (
      <a href={`#${s.id}`} class="plan-salle" data-salle={s.id} aria-label={s.nom}>
        <rect x={M + s.x * E} y={M + s.y * E} width={s.l * E - 6} height={E - 20 + 12} />
      </a>
    ))}
    <circle id="plan-visiteur" r="4" cx={M + 4} cy={M + 4} />
  </svg>
</nav>

<script>
  const plan = document.getElementById('plan-visite')
  const visiteur = document.getElementById('plan-visiteur')
  const E = 48, M = 8
  document.addEventListener('galerie:progress', (e) => {
    if (plan?.hidden) plan.hidden = false
    const { x, y } = e.detail
    visiteur?.setAttribute('cx', String(M + x * E + 4))
    visiteur?.setAttribute('cy', String(M + y * E + 4))
  })
  plan?.querySelectorAll('.plan-salle').forEach((lien) => {
    lien.addEventListener('click', (e) => {
      e.preventDefault()
      window.__galerie?.allerA(lien.dataset.salle)
    })
  })
</script>
```

(Le plan reste `hidden` tant qu'aucun évènement `galerie:progress` n'arrive : invisible sans JS et en reduced-motion. Sur mobile, le facteur 0.4 s'applique déjà aux valeurs `x` reçues — le point reste cohérent si les `x` du SVG sont multipliés par le même facteur : lire `matchMedia('(max-width: 767px)')` dans le script du plan et appliquer `x * 0.4` inversement, ou plus simple : l'évènement transporte déjà des unités monde, le SVG desktop utilise les positions non réduites — diviser `x` reçu par le facteur courant avant de placer le point. Implémenter cette division.)

- [ ] **Step 2: Styles du plan dans `global.css`**

```css
.plan-visite {
  position: fixed;
  left: 16px;
  bottom: 16px;
  z-index: 40;
  background: rgb(var(--color-oeuvre) / 0.92);
  border: 1px solid rgb(var(--color-filet));
  padding: 8px;
}
.plan-visite rect {
  fill: transparent;
  stroke: rgb(var(--color-encre));
  stroke-width: 1.2;
  cursor: pointer;
}
.plan-visite .plan-salle:hover rect,
.plan-visite .plan-salle:focus-visible rect { stroke: rgb(var(--color-point)); }
.plan-visite #plan-visiteur { fill: rgb(var(--color-point)); }
@media (max-width: 767px) {
  .plan-visite { transform: scale(0.7); transform-origin: bottom left; left: 8px; bottom: 8px; }
}
```

- [ ] **Step 3: Inclure le composant sur les trois homes** (juste avant `<Footer …/>`), vérifier :

- le point rouge suit la position pendant tout le voyage ;
- cliquer chaque pièce voyage vers la bonne salle, au clavier aussi (tab + entrée) ;
- le plan n'apparaît ni sans JS ni en reduced-motion ;
- mobile : plan compact, ne recouvre pas le contenu de lecture.

Run: `npm run build`
Expected: OK.

- [ ] **Step 4: Commit**

```bash
git add src/components/galerie/PlanVisite.astro src/styles/global.css src/pages
git commit -m "feat(galerie): plan de la visite avec point rouge et navigation"
```

---

### Task 7: Nettoyage, performance et validation finale

**Files:**
- Modify: `package.json` (dépendances retirées)
- Delete: anciennes fontes woff2 inutilisées dans `public/fonts/`
- Modify: divers (résidus)

- [ ] **Step 1: Retirer les dépendances mortes**

```bash
grep -rn "framer-motion\|react-icons" src/
```

Si aucun usage : `npm uninstall framer-motion react-icons`. Vérifier de même `@astrojs/react`, `react`, `react-dom` : s'il ne reste **aucun** fichier `.jsx` dans `src/` (`find src -name "*.jsx"`), les retirer aussi et supprimer l'intégration react de `astro.config.mjs`. Sinon les garder.

- [ ] **Step 2: Purger les anciennes fontes**

```bash
grep -rn "DM Sans\|DM Mono\|Playfair" src/ || rm public/fonts/dm-*.woff2 public/fonts/playfair-*.woff2
```

- [ ] **Step 3: Build complet et contrôles**

```bash
npm run build && npx astro preview
```

- Vérifier `dist/index.html` : tout le texte des six salles présent dans le HTML (grep d'un extrait de chaque salle), balises canoniques/hreflang/JSON-LD inchangées par rapport à `develop` (`git diff develop -- src/layouts/Layout.astro` : seuls le script thème et les preloads de fontes diffèrent).
- Captures aux breakpoints 375/768/1024/1440 sur `/` (outil Playwright disponible en session d'exécution).
- Lighthouse mobile sur la preview : Performance ≥ 90, Accessibilité ≥ 95, SEO ≥ 95. Si le score chute : vérifier poids des images projets, `content-visibility` inutile ici (salles absolues), preload fontes.

- [ ] **Step 4: Commit final et proposition de merge**

```bash
git add -A
git commit -m "chore(galerie): nettoyage des dépendances et fontes héritées"
```

Puis proposer à l'utilisateur (validation obligatoire) : merge `feature/la-galerie` → `develop`, et déploiement preview Vercel pour validation visuelle avant toute release sur `main`.
