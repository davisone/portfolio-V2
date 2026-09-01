# i18n Portfolio V2 — Plan d'implementation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ajouter l'internationalisation (FR par defaut, EN-GB, EN-US) aux pages principales du portfolio Astro.

**Architecture:** Utilisation du i18n natif d'Astro pour le routage par prefixe. Fichiers JSON de traductions avec un systeme base/overrides pour UK vs US. Hook React `useTranslations(locale)` pour les composants interactifs.

**Tech Stack:** Astro 5 i18n natif, JSON, TypeScript

---

## Task 1 : Configuration Astro i18n

**Files:**
- Modify: `astro.config.mjs`

**Step 1: Ajouter la config i18n**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://evandavison.fr',
  output: 'static',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en-gb', 'en-us'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
})
```

**Step 2: Verifier que le build passe**

Run: `npm run build`
Expected: Build reussi sans erreur

**Step 3: Commit**

```bash
git add astro.config.mjs
git commit -m "feat(i18n): configuration routage i18n Astro"
```

---

## Task 2 : Fichiers de traductions

**Files:**
- Create: `src/i18n/translations/fr.json`
- Create: `src/i18n/translations/en.json`
- Create: `src/i18n/translations/en-gb.json`

**Step 1: Creer fr.json**

Extraire tout le texte visible des composants principaux (Header, Hero, About, Services, Experience, Projects, Contact, Footer, 404) dans un fichier JSON structure par section :

```json
{
  "nav": {
    "home": "Accueil",
    "services": "Services",
    "blog": "Blog",
    "faq": "FAQ",
    "contact": "Contact",
    "openMenu": "Ouvrir le menu",
    "closeMenu": "Fermer le menu"
  },
  "hero": {
    "label": "En recherche d'alternance \u2014 Chef de projet IT",
    "subtitle": "Developpeur Fullstack \u2014 Rennes, Fondateur de",
    "description": "Passionne par le developpement web et mobile, je cree des <strong>applications modernes</strong> avec React, Next.js et Flutter. En parallele, j'accompagne les entreprises via mon activite <strong>freelance</strong>. Je recherche une <strong>alternance en gestion de projet IT</strong> pour allier ma vision technique a une approche strategique et organisationnelle.",
    "badge": "Disponible \u2014 Bac+3 Sup de Vinci",
    "cta": "Me contacter",
    "downloadCv": "Telecharger mon CV"
  },
  "about": {
    "label": "Qui suis-je",
    "title": "A propos",
    "titleEmphasis": "de moi",
    "paragraph1": "Developpeur fullstack base a <strong>Rennes</strong>, je suis en fin de cursus <strong>Bac+3</strong> en developpement informatique. Ma formation m'a permis de maitriser le developpement web et mobile, du frontend au backend.",
    "paragraph2": "En parallele de mes etudes, j'ai fonde <a>DVS Web</a>, mon activite freelance ou j'accompagne les entreprises dans la creation de leurs projets digitaux : sites vitrines, applications web, e-commerce et optimisation SEO.",
    "paragraph3": "Cette double casquette <strong>etudiant</strong> et <strong>entrepreneur</strong> me permet d'allier rigueur technique et experience terrain, pour livrer des solutions concretes et performantes.",
    "paragraph4": "Je suis actuellement a la recherche d'une <strong>alternance en gestion de projet IT</strong>. Mon parcours de developpeur me donne une comprehension fine des enjeux techniques, que je souhaite completer par une formation en <strong>pilotage de projets</strong>, coordination d'equipes et suivi de livraisons.",
    "values": [
      {
        "title": "Gestion de projet",
        "description": "Planification, coordination et suivi \u2014 transformer une idee en livrable concret."
      },
      {
        "title": "Efficacite",
        "description": "Livraison dans les delais avec une communication transparente."
      },
      {
        "title": "Collaboration",
        "description": "A l'ecoute de vos besoins pour des solutions sur-mesure."
      }
    ]
  },
  "services": {
    "label": "Expertise",
    "title": "Mes",
    "titleEmphasis": "services",
    "learnMore": "En savoir plus",
    "items": [
      {
        "title": "Developpement Web",
        "description": "Sites vitrines, applications web, e-commerce. Des solutions modernes et performantes adaptees a vos besoins."
      },
      {
        "title": "Applications Mobiles",
        "description": "Applications iOS et Android avec Flutter. Une seule codebase pour toutes les plateformes."
      },
      {
        "title": "Refonte de site",
        "description": "Modernisation de votre site existant : design, performance, accessibilite et experience utilisateur."
      },
      {
        "title": "SEO & Performance",
        "description": "Optimisation du referencement naturel et des performances pour une meilleure visibilite Google."
      }
    ]
  },
  "experience": {
    "label": "Parcours",
    "title": "Mon",
    "titleEmphasis": "parcours",
    "education": "Formation",
    "work": "Experience",
    "items": [
      {
        "title": "Fondateur & Developpeur Freelance",
        "company": "DVS Web - Rennes",
        "period": "2026 - Present",
        "description": "Creation et developpement de sites web et applications pour des clients varies. Gestion de projet, relation client, developpement fullstack."
      },
      {
        "title": "Developpeur Web (Alternance)",
        "company": "Le Referencement Professionnel - Cesson-Sevigne",
        "period": "septembre 2025 - septembre 2026",
        "description": "Creation de block liquid et integration dans un CMS. Integration d'un formulaire Tally et de son API dans le CMS de l'entreprise en passant par Firebase."
      },
      {
        "title": "Bachelor Developpement Web",
        "company": "Sup de Vinci - Chantepie",
        "period": "2025 - 2026",
        "description": "Formation complete en developpement web, mobile, bases de donnees, et gestion de projet. Bac+3."
      },
      {
        "title": "BTS SIO (SLAM)",
        "company": "Lycee Saint Sauveur - Redon",
        "period": "2022 - 2025",
        "description": "Solutions Logicielles et Applications Metiers. Apprentissage des fondamentaux du developpement."
      }
    ]
  },
  "projects": {
    "label": "Mes travaux",
    "title": "Reali",
    "titleEmphasis": "sations",
    "keyFeatures": "Fonctionnalites cles",
    "viewSite": "Voir le site",
    "sourceCode": "Code source",
    "privateProject": "Projet prive / en developpement",
    "closeModal": "Fermer la modale",
    "viewMoreGithub": "Voir plus sur GitHub",
    "items": [
      {
        "description": "Site vitrine professionnel pour mon activite de developpeur freelance. Design responsive noir/dore, animations fluides, formulaire de contact avec API Resend, SEO optimise (sitemap dynamique, Schema.org) et conformite RGPD.",
        "features": [
          "Design responsive mobile-first avec navigation adaptative",
          "Animations au scroll et micro-interactions",
          "Formulaire de contact securise avec double envoi d'email",
          "Sitemap et robots.txt dynamiques generes cote serveur",
          "Metadonnees SEO completes (Open Graph, Twitter Cards, Schema.org)",
          "Banniere cookies conforme RGPD"
        ]
      },
      {
        "description": "Application SaaS de generation de CV avec IA. Integre OpenAI (GPT-4o-mini) pour l'optimisation de contenu, Stripe pour les paiements, et NextAuth avec 2FA. 5 templates, analyse ATS et export PDF.",
        "features": [
          "5 templates de CV (Modern, Classic, ATS-Friendly, Minimal, Creative)",
          "Analyse ATS : Score 0-100 avec recommandations",
          "Suggestions IA pour amelioration du contenu",
          "Authentification OAuth (Google, GitHub) + 2FA avec QR code",
          "Paiement Stripe (1 template gratuit, premium a 4.99\u20ac)",
          "Export PDF haute qualite",
          "Emails transactionnels (bienvenue, reset password, confirmation paiement)"
        ]
      },
      {
        "description": "Application multiplateforme pour eleveurs et proprietaires d'animaux. Suivi medical complet, vaccins avec rappels automatiques, arbre genealogique, evolution du poids et export PDF.",
        "features": [
          "Fiche complete par animal avec photo et identification",
          "Suivi vaccins avec rappels automatiques",
          "Historique des traitements et consultations veterinaires",
          "Graphique d'evolution du poids",
          "Arbre genealogique interactif",
          "Export PDF du carnet de sante complet"
        ]
      },
      {
        "description": "Application web full-stack de generation, personnalisation et gestion de QR codes. Previsualisation en temps reel, templates de styles, dashboard avec filtres, export multi-format et partage public via liens uniques.",
        "features": [
          "Generation de QR codes a partir d'URLs ou texte avec previsualisation temps reel",
          "Personnalisation avancee : couleurs, taille, correction d'erreur, logo centre, templates",
          "Dashboard avec recherche, filtres (type, favoris) et selection multiple",
          "Export multi-format : PNG, JPEG, PDF (A4) et ZIP pour exports groupes",
          "Partage public via liens uniques avec tokens",
          "Authentification complete avec hashage bcrypt"
        ]
      },
      {
        "description": "Site vitrine pour une entreprise de peinture en batiment. Internationalisation FR/EN, galerie avant/apres interactive, avis Google dynamiques, carte Leaflet et formulaire securise.",
        "features": [
          "Internationalisation complete (FR/EN) avec next-intl",
          "Dark mode avec persistance des preferences",
          "Galerie avant/apres interactive avec slider tactile",
          "Avis Google dynamiques via API",
          "Carte interactive avec zone d'intervention",
          "Formulaire securise avec rate limiting et hCaptcha"
        ]
      }
    ]
  },
  "contact": {
    "label": "Contact",
    "title": "Un projet",
    "titleEmphasis": "en tete ?",
    "subtitle": "Que ce soit pour un site vitrine, une application web ou mobile, une refonte ou une optimisation SEO, je suis a votre ecoute.",
    "needSite": "Besoin d'un site pro ?",
    "form": {
      "name": "Nom complet",
      "namePlaceholder": "John Doe",
      "email": "Email",
      "emailPlaceholder": "john@exemple.com",
      "subject": "Sujet",
      "subjectPlaceholder": "Creation d'un site web",
      "message": "Message",
      "messagePlaceholder": "Decrivez votre projet...",
      "submit": "Envoyer le message",
      "submitting": "Envoi en cours...",
      "success": "Message envoye avec succes !",
      "error": "Une erreur est survenue. Veuillez reessayer."
    }
  },
  "footer": {
    "navigation": "Navigation",
    "navHome": "Accueil",
    "navAbout": "A propos",
    "navProjects": "Realisations",
    "navContact": "Contact",
    "services": "Services",
    "resources": "Ressources",
    "resourceBlog": "Blog",
    "resourceGlossary": "Glossaire",
    "resourceFaq": "FAQ",
    "resourceComparisons": "Comparatifs",
    "resourceCv": "Mon CV",
    "links": "Liens"
  },
  "notFound": {
    "title": "Page introuvable",
    "description": "La page que vous recherchez n'existe pas ou a ete deplacee.",
    "message": "Cette page n'existe pas ou a ete deplacee.",
    "backHome": "Retour a l'accueil"
  },
  "languageSwitcher": {
    "label": "Langue",
    "fr": "FR",
    "en-gb": "EN",
    "en-us": "EN"
  }
}
```

Note : Le contenu exact du fr.json devra reprendre les textes originaux avec les accents corrects tels qu'ils apparaissent dans les composants source.

**Step 2: Creer en.json**

Meme structure, traduit en anglais americain (base).

**Step 3: Creer en-gb.json**

Uniquement les cles qui different entre UK et US (ex: "colour" au lieu de "color", "organisation" au lieu de "organization", "optimisation" au lieu de "optimization", etc.). Structure partielle, memes cles.

**Step 4: Commit**

```bash
git add src/i18n/translations/
git commit -m "feat(i18n): ajout fichiers de traductions FR, EN, EN-GB"
```

---

## Task 3 : Helper getTranslations et hook React

**Files:**
- Create: `src/i18n/index.ts`
- Create: `src/i18n/useTranslations.ts`

**Step 1: Creer le helper getTranslations**

```ts
// src/i18n/index.ts
import fr from './translations/fr.json'
import en from './translations/en.json'
import enGbOverrides from './translations/en-gb.json'

export type Locale = 'fr' | 'en-gb' | 'en-us'

export const defaultLocale: Locale = 'fr'

// Deep merge pour les overrides EN-GB
function deepMerge(base: Record<string, any>, overrides: Record<string, any>): Record<string, any> {
  const result = { ...base }
  for (const key of Object.keys(overrides)) {
    if (
      typeof overrides[key] === 'object' &&
      overrides[key] !== null &&
      !Array.isArray(overrides[key]) &&
      typeof base[key] === 'object'
    ) {
      result[key] = deepMerge(base[key], overrides[key])
    } else {
      result[key] = overrides[key]
    }
  }
  return result
}

const enGb = deepMerge(en, enGbOverrides)

const translations: Record<Locale, typeof fr> = {
  fr,
  'en-us': en as typeof fr,
  'en-gb': enGb as typeof fr,
}

export function getTranslations(locale: Locale = defaultLocale) {
  return translations[locale] ?? translations[defaultLocale]
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/')
  if (lang === 'en-gb') return 'en-gb'
  if (lang === 'en-us') return 'en-us'
  return 'fr'
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (locale === 'fr') return path
  return `/${locale}${path}`
}
```

**Step 2: Creer le hook React**

```ts
// src/i18n/useTranslations.ts
import { useMemo } from 'react'
import fr from './translations/fr.json'
import en from './translations/en.json'
import enGbOverrides from './translations/en-gb.json'

type Locale = 'fr' | 'en-gb' | 'en-us'

function deepMerge(base: Record<string, any>, overrides: Record<string, any>): Record<string, any> {
  const result = { ...base }
  for (const key of Object.keys(overrides)) {
    if (
      typeof overrides[key] === 'object' &&
      overrides[key] !== null &&
      !Array.isArray(overrides[key]) &&
      typeof base[key] === 'object'
    ) {
      result[key] = deepMerge(base[key], overrides[key])
    } else {
      result[key] = overrides[key]
    }
  }
  return result
}

const enGb = deepMerge(en, enGbOverrides)

const translations: Record<Locale, typeof fr> = {
  fr,
  'en-us': en as typeof fr,
  'en-gb': enGb as typeof fr,
}

export function useTranslations(locale: Locale = 'fr') {
  return useMemo(() => translations[locale] ?? translations['fr'], [locale])
}
```

**Step 3: Verifier que le build passe**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/i18n/
git commit -m "feat(i18n): helper getTranslations et hook useTranslations"
```

---

## Task 4 : Adapter Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Ajouter le support locale au Layout**

- Ajouter une prop `locale` optionnelle (defaut `'fr'`)
- Changer `<html lang="fr">` en `<html lang={locale}>`
- Utiliser `getLocaleFromUrl` pour deriver la locale depuis l'URL si pas passee en prop
- Ajouter les balises `<link rel="alternate" hreflang="...">` pour les 3 locales

**Step 2: Verifier le build**

Run: `npm run build`

**Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat(i18n): support locale dans Layout (lang, hreflang)"
```

---

## Task 5 : Adapter Header.astro + LanguageSwitcher

**Files:**
- Modify: `src/components/Header.astro`
- Create: `src/components/LanguageSwitcher.astro`

**Step 1: Creer le LanguageSwitcher**

Composant Astro qui affiche les 3 options de langue (FR / EN-GB / EN-US) avec la locale active mise en avant. Utilise `getLocalizedPath` pour generer les hrefs.

**Step 2: Adapter le Header**

- Accepter une prop `locale`
- Utiliser `getTranslations(locale)` pour les labels de navigation
- Integrer le LanguageSwitcher a cote du ThemeToggle
- Adapter les hrefs de navigation avec `getLocalizedPath`
- Adapter les aria-labels dans le script inline

**Step 3: Verifier le build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/components/Header.astro src/components/LanguageSwitcher.astro
git commit -m "feat(i18n): Header traduit et LanguageSwitcher"
```

---

## Task 6 : Adapter Hero.astro

**Files:**
- Modify: `src/components/Hero.astro`

**Step 1: Adapter le Hero**

- Accepter une prop `locale`
- Utiliser `getTranslations(locale)` pour tous les textes
- Remplacer les textes hardcodes par les cles de traduction

**Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat(i18n): Hero traduit"
```

---

## Task 7 : Adapter Footer.astro

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Adapter le Footer**

- Accepter une prop `locale`
- Utiliser `getTranslations(locale)` pour les titres de colonnes et les labels de liens
- Adapter les hrefs avec `getLocalizedPath` pour les liens internes (accueil, a propos, etc.)
- Les liens services/blog/glossaire restent en FR (pas traduits)

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat(i18n): Footer traduit"
```

---

## Task 8 : Adapter les composants React

**Files:**
- Modify: `src/components/About.jsx`
- Modify: `src/components/Services.jsx`
- Modify: `src/components/Experience.jsx`
- Modify: `src/components/Projects.jsx`
- Modify: `src/components/Contact.jsx`

**Step 1: Adapter About.jsx**

- Accepter une prop `locale`
- Appeler `useTranslations(locale)` pour obtenir `t`
- Remplacer les textes hardcodes par `t.about.*`
- Remplacer le tableau `values` hardcode par `t.about.values`

**Step 2: Adapter Services.jsx**

- Meme approche : prop `locale`, hook, remplacement des textes
- Les `href` des services restent en FR (pages non traduites)

**Step 3: Adapter Experience.jsx**

- Meme approche
- Remplacer le tableau `experiences` hardcode par `t.experience.items`
- Utiliser `t.experience.education` / `t.experience.work` pour les labels de type

**Step 4: Adapter Projects.jsx**

- Prop `locale`, hook
- Les titres de projets, tags, URLs restent identiques (noms propres)
- Traduire : descriptions, features, labels UI (Voir le site, Code source, etc.)

**Step 5: Adapter Contact.jsx**

- Prop `locale`, hook
- Traduire : labels, placeholders, boutons, messages de statut

**Step 6: Verifier le build**

Run: `npm run build`

**Step 7: Commit**

```bash
git add src/components/About.jsx src/components/Services.jsx src/components/Experience.jsx src/components/Projects.jsx src/components/Contact.jsx
git commit -m "feat(i18n): composants React traduits (About, Services, Experience, Projects, Contact)"
```

---

## Task 9 : Adapter la page index.astro (FR)

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Passer locale="fr" a tous les composants**

- Ajouter `locale="fr"` en prop a Header, Hero, About, Services, Experience, Projects, Contact, Footer
- Pas besoin de changer les imports

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(i18n): page index FR avec prop locale"
```

---

## Task 10 : Creer les pages EN-GB et EN-US

**Files:**
- Create: `src/pages/en-gb/index.astro`
- Create: `src/pages/en-us/index.astro`

**Step 1: Creer en-gb/index.astro**

Wrapper minimal qui importe les memes composants et passe `locale="en-gb"` :

```astro
---
import Layout from '../../layouts/Layout.astro'
import Header from '../../components/Header.astro'
import Hero from '../../components/Hero.astro'
import About from '../../components/About.jsx'
import Services from '../../components/Services.jsx'
import Experience from '../../components/Experience.jsx'
import Projects from '../../components/Projects.jsx'
import Contact from '../../components/Contact.jsx'
import ScrollToTop from '../../components/ScrollToTop.jsx'
import Footer from '../../components/Footer.astro'
import { getTranslations } from '../../i18n'

const locale = 'en-gb'
const t = getTranslations(locale)
---

<Layout
  title="Evan Davison | Fullstack Developer & IT Project Management Apprenticeship — Rennes"
  description="Evan Davison's portfolio, fullstack developer in Rennes and founder of DVS Web. Looking for an apprenticeship in IT project management."
  canonical="https://evandavison.fr/en-gb"
  locale={locale}
>
  <div class="min-h-screen">
    <Header locale={locale} />
    <main id="main-content">
      <Hero locale={locale} />
      <About locale={locale} client:visible />
      <Services locale={locale} client:visible />
      <Experience locale={locale} client:visible />
      <Projects locale={locale} client:visible />
      <Contact locale={locale} client:visible />
    </main>
    <Footer locale={locale} />
    <ScrollToTop client:load />
  </div>
</Layout>
```

**Step 2: Creer en-us/index.astro**

Meme structure avec `locale="en-us"` et `canonical="https://evandavison.fr/en-us"`.

**Step 3: Verifier le build et tester**

Run: `npm run build && npm run preview`
Verifier : `/` affiche FR, `/en-gb/` affiche EN-GB, `/en-us/` affiche EN-US

**Step 4: Commit**

```bash
git add src/pages/en-gb/ src/pages/en-us/
git commit -m "feat(i18n): pages EN-GB et EN-US"
```

---

## Task 11 : Page 404 traduite

**Files:**
- Modify: `src/pages/404.astro`

**Step 1: Adapter la 404**

La 404 est une page speciale — elle ne peut pas facilement detecter la locale depuis l'URL (puisque l'URL n'existe pas). On peut utiliser `Astro.preferredLocale` ou afficher un message bilingue. Approche simple : utiliser `getLocaleFromUrl` pour tenter de deduire la locale depuis le chemin demande.

**Step 2: Commit**

```bash
git add src/pages/404.astro
git commit -m "feat(i18n): page 404 traduite"
```

---

## Task 12 : Test final et nettoyage

**Step 1: Build complet**

Run: `npm run build`
Expected: Build reussi, pas d'erreur

**Step 2: Test en preview**

Run: `npm run preview`
Verifier manuellement :
- `/` : francais, tous les textes corrects
- `/en-gb/` : anglais UK (verifier les overrides : organisation, colour, etc.)
- `/en-us/` : anglais US
- LanguageSwitcher fonctionne dans les 3 directions
- 404 fonctionne

**Step 3: Commit final si nettoyage necessaire**

```bash
git commit -m "fix(i18n): corrections finales"
```
