# Redesign Editorial du Portfolio — Plan d'implementation

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refondre le design du portfolio d'Evan Davison avec le style "Direction A — Editorial/Typographique" : fond papier creme, Playfair Display + DM Sans + DM Mono, accent rouge brique, bordures fines, numeros de section, mise en page editoriale. Garder tout le contenu et les fonctionnalites existantes (EmailJS, Framer Motion, modal projets, SEO, etc.)

**Architecture:** Remplacement complet du design (couleurs, typo, layout) dans les composants React existants + Tailwind config + global CSS. La structure Astro (Layout, pages, routing) reste identique. Les donnees (projets, experiences, contact, services, technos) restent exactement les memes. On ajoute quelques features : section parcours en grille au lieu de timeline, affichage images projets dans la grille, et une barre de technos defilante.

**Tech Stack:** Astro, React, Tailwind CSS, Framer Motion, Google Fonts (Playfair Display, DM Sans, DM Mono), EmailJS (existant)

---

### Task 1: Palette, typos et Tailwind config

**Files:**
- Modify: `tailwind.config.mjs`
- Modify: `src/styles/global.css`

**Step 1: Mettre a jour tailwind.config.mjs**

Remplacer toute la palette primary/accent par la palette editoriale :

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1108',
        paper: '#f5f0e8',
        'paper-alt': '#ede8df',
        accent: '#c0392b',
        'accent-hover': '#e74c3c',
        muted: '#8a7f72',
        border: '#d4cbbf',
        'text-body': '#4a4035',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 1.5s infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

**Step 2: Remplacer global.css**

Remplacer les fonts Google, les composants utilitaires, la scrollbar, la selection :

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased bg-paper text-ink font-light;
  }

  ::selection {
    @apply bg-accent/20 text-ink;
  }
}

@layer components {
  .section-container {
    @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .section-label {
    @apply font-mono text-xs tracking-[0.15em] uppercase text-accent flex items-center gap-3;
  }

  .section-label::before {
    content: '';
    @apply block w-8 h-px bg-accent;
  }

  .section-title {
    @apply font-serif text-4xl sm:text-5xl font-bold text-ink leading-none tracking-tight;
  }

  .section-title em {
    @apply italic text-accent;
  }

  .section-num {
    @apply font-serif text-8xl font-black text-border leading-none absolute right-4 sm:right-8 lg:right-16 -top-5 select-none pointer-events-none;
  }

  .btn-primary {
    @apply inline-flex items-center gap-2 px-7 py-3.5 bg-ink text-paper
           text-sm font-medium tracking-[0.1em] uppercase
           transition-all duration-200 hover:bg-accent;
  }

  .btn-secondary {
    @apply inline-flex items-center gap-2 px-7 py-3.5 border border-ink text-ink
           text-sm font-normal tracking-[0.1em] uppercase
           transition-all duration-200 hover:bg-ink hover:text-paper;
  }

  .card {
    @apply border-t border-border pt-6 transition-all duration-200;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-paper;
}

::-webkit-scrollbar-thumb {
  @apply bg-border rounded-full hover:bg-muted;
}
```

**Step 3: Commit**

```bash
git add tailwind.config.mjs src/styles/global.css
git commit -m "style: palette editoriale, typos Playfair/DM Sans/DM Mono"
```

---

### Task 2: Layout.astro — Fond clair, classes body

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Mettre a jour le body et supprimer dark mode**

Changer `<html lang="fr" class="dark scroll-smooth">` en `<html lang="fr" class="scroll-smooth">` et `<body class="bg-slate-950 text-slate-100">` en `<body>` (les styles sont dans global.css maintenant). Supprimer le `darkMode: 'class'` de tailwind config aussi.

**Step 2: Commit**

```bash
git add src/layouts/Layout.astro tailwind.config.mjs
git commit -m "style: fond clair, suppression du dark mode"
```

---

### Task 3: Header — Navigation editoriale

**Files:**
- Modify: `src/components/Header.jsx`

**Step 1: Recrire le Header**

Navigation sobre : logo serif a gauche, liens en uppercase espaces, CTA "DVS Web" en lien souligne accent a droite. Fond paper avec border-bottom. Menu mobile adapte.

Le header doit utiliser les memes liens de navigation, le meme lien DVS Web, et le meme comportement scroll/mobile. Remplacer tout le JSX et les classes par le style editorial.

**Step 2: Commit**

```bash
git add src/components/Header.jsx
git commit -m "style: header editorial avec typo serif"
```

---

### Task 4: Hero — Mise en page editoriale

**Files:**
- Modify: `src/components/Hero.jsx`

**Step 1: Recrire le Hero**

- Label mono en haut : "En recherche d'alternance — Chef de projet IT"
- Titre geant en Playfair Display : "Evan / Davi*son*" (son en italic accent)
- Grille 2 colonnes en bas : description a gauche, meta (badge + CTA) a droite
- Garder les liens sociaux GitHub/LinkedIn
- Garder le lien de telechargement CV
- Supprimer les blur circles et le fond gradient

**Step 2: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "style: hero editorial typographique"
```

---

### Task 5: About — Grille editoriale

**Files:**
- Modify: `src/components/About.jsx`

**Step 1: Recrire le About**

- Section avec numero "01" en gros a droite
- Label mono + titre serif "A propos / de *moi*"
- Grille 2 colonnes : textes a gauche, 3 values avec numeros a droite
- Garder exactement le meme contenu textuel et les 3 values
- Bordures fines au lieu de cards avec fond

**Step 2: Commit**

```bash
git add src/components/About.jsx
git commit -m "style: section about editoriale avec grille"
```

---

### Task 6: Services — Grille 4 colonnes + barre de technos defilante

**Files:**
- Modify: `src/components/Services.jsx`

**Step 1: Recrire les Services**

- Section avec numero "02" en gros a droite
- 4 services en colonnes avec bordures droites, numero en gros gris, titre, description
- Hover : fond ink, texte paper (inversion)
- Remplacer les grilles d'icones par une barre de technos defilante (marquee) qui liste toutes les technos en texte uppercase mono, separees par des points

**Step 2: Commit**

```bash
git add src/components/Services.jsx
git commit -m "style: services en grille editoriale + marquee technos"
```

---

### Task 7: Experience — Grille au lieu de timeline

**Files:**
- Modify: `src/components/Experience.jsx`

**Step 1: Recrire Experience**

- Section avec numero "03"
- Remplacer la timeline par une grille : chaque experience est une ligne avec period | titre + lieu | description
- Bordures fines entre chaque entree
- Icones diplome/travail conserves en plus subtil

**Step 2: Commit**

```bash
git add src/components/Experience.jsx
git commit -m "style: parcours en grille editoriale"
```

---

### Task 8: Projects — Grille editoriale avec images

**Files:**
- Modify: `src/components/Projects.jsx`

**Step 1: Recrire Projects**

- Section avec numero "04"
- Grille 3 colonnes avec bordures
- Chaque card : tag mono accent, nom en serif, description, fleche hover
- Garder les images existantes (avec le meme skeleton loader)
- Garder la modal de detail au clic (adapter son style : fond paper, texte ink, bordures)
- Garder le lien GitHub en bas

**Step 2: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "style: projets en grille editoriale avec images"
```

---

### Task 9: Contact — Split accent/paper

**Files:**
- Modify: `src/components/Contact.jsx`

**Step 1: Recrire Contact**

- Section avec numero "05"
- Grille 2 colonnes : colonne gauche fond accent (rouge) avec titre, description, liens de contact en blanc ; colonne droite fond paper avec formulaire
- Garder exactement la meme logique EmailJS, le honeypot, les memes champs
- Inputs : pas de border visible, juste un border-bottom fin
- Labels en mono uppercase
- Garder la card DVS Web en version plus subtile

**Step 2: Commit**

```bash
git add src/components/Contact.jsx
git commit -m "style: contact editorial split accent/paper"
```

---

### Task 10: Footer — Sobre et editorial

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Recrire Footer**

- Ligne simple : copyright a gauche, email a droite
- Border-top fine
- Supprimer la navigation dupliquee et les icones sociales (deja dans le hero et le contact)
- Garder le lien DVS Web discret

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "style: footer minimal editorial"
```

---

### Task 11: ScrollToTop + index.astro — Finalisation

**Files:**
- Modify: `src/components/ScrollToTop.jsx`
- Modify: `src/pages/index.astro`

**Step 1: Adapter ScrollToTop**

Changer les couleurs : fond ink, texte paper, hover accent.

**Step 2: Adapter index.astro**

Supprimer `class="min-h-screen bg-slate-950"` du div wrapper, remplacer par rien (le body gere le fond).

**Step 3: Commit**

```bash
git add src/components/ScrollToTop.jsx src/pages/index.astro
git commit -m "style: finalisation scroll-to-top et index"
```

---

### Task 12: Verification et nettoyage

**Step 1: Lancer le serveur de dev**

```bash
npm run dev
```

Verifier visuellement chaque section dans le navigateur.

**Step 2: Verifier le responsive**

Tester sur mobile (375px), tablette (768px) et desktop (1280px).

**Step 3: Verifier les fonctionnalites**

- Navigation smooth scroll
- Menu mobile
- Modal projets (clic sur un projet)
- Formulaire de contact (soumission)
- Telechargement CV
- Liens externes (DVS Web, GitHub, LinkedIn)
- Scroll to top

**Step 4: Commit final si ajustements**

```bash
git add -A
git commit -m "fix: ajustements responsive et polish final"
```

---

## Features bonus suggerees (post-redesign)

1. **Curseur personnalise** — Un petit point qui suit la souris avec un cercle plus grand en hover sur les liens
2. **Transition de page** — Animation de slide entre les pages (blog, services)
3. **Mode sombre** — Un toggle qui passe de paper/ink a ink/paper (inversion complete)
4. **Section temoignages** — Citations de clients DVS Web avec design editorial
5. **Compteur anime** — Les chiffres (20+ projets, 3 ans, etc.) qui comptent de 0 a la valeur au scroll
