# Refonte Design — Direction C : Rétro-Futuriste / Terminal

## Contexte

Refonte complète du design du portfolio d'Evan Davison (evandavison.fr). Le design actuel est générique dark mode Tailwind (slate, Inter, cards rounded-xl). L'objectif est une identité visuelle unique, mémorable et intentionnelle — style terminal/rétro-futuriste.

## Design System

### Palette
```css
--bg: #06080a         /* fond quasi-noir */
--surface: #0c0f12    /* surface cards */
--border: #1a2230     /* bordures */
--text: #c8d8e8       /* texte principal */
--muted: #4a6080      /* texte secondaire */
--accent: #00e5ff     /* cyan — accent principal */
--accent2: #7b2fff    /* violet — accent secondaire */
```

### Typographie
- **Display / Mono** : `Space Mono` (Google Fonts) — titres, logo, labels, boutons
- **Corps** : `Space Grotesk` (Google Fonts) — textes, descriptions
- Remplace : Inter (interdit par CLAUDE.md)

### Effets globaux
- Grain CSS via SVG filter sur `body::before` (opacity 0.4)
- Scanlines via `repeating-linear-gradient` sur `body::after`
- Glow sur les accents : `text-shadow: 0 0 20px var(--accent)`
- Lignes de lumière sur les bordures : `linear-gradient(90deg, transparent, var(--accent), transparent)`
- Curseur clignotant animé via `@keyframes blink`

## Sections

### Header
- Logo : `evan@davison:~$` en Space Mono, cyan
- Nav : liens avec préfixe `>` au hover, couleur cyan
- Badge statut : point vert pulsant + "Disponible pour alternance"
- Mobile : menu hamburger adapté au style terminal

### Hero
- Layout 2 colonnes : titre + panel terminal JSON à droite
- Titre : `Evan` normal, `Davison` en cyan avec glow
- Sous-titre : "Développeur Fullstack · Chef de projet IT" avec accent violet
- Terminal panel : JSON `profile.json` avec syntax highlighting manuel
- Boutons : `./contact.sh ↗` (style primaire), `↓ cv.pdf` (style ghost)

### About
- Label de section `// à_propos`
- Texte gauche + 3 value cards droite
- Value cards : bordure gauche cyan au hover, index `[01]` `[02]` `[03]` en accent
- Contenu mis à jour : gestion de projet en premier, mention alternance

### Services / Compétences
- Section renommée ou restructurée visuellement
- Technos groupées par catégorie : `// langages`, `// frameworks`, `// bases_de_données`, `// outils`
- Tags style mono avec bordure `1px solid var(--border)`

### Expérience
- Timeline avec ligne verticale cyan glowée
- Cards style terminal : date en Space Mono, company en accent

### Projets
- Grille 3 colonnes
- Index `// 001` en accent opacity 0.6
- Nom de projet en Space Grotesk bold
- Au hover : bordure top animée cyan + nom en cyan + arrow `↗` glow
- Tags mono petits

### Contact
- Inputs : fond `var(--surface)`, bordure cyan + glow au focus
- Labels en Space Mono
- Bouton submit style `./envoyer.sh`
- Infos contact avec prompt `$` devant chaque ligne

### Footer
- `evan@davison:~$ █` avec curseur clignotant
- Copyright minimaliste en mono

## Fichiers à modifier

1. `src/styles/global.css` — reset complet du design system
2. `src/components/Header.jsx`
3. `src/components/Hero.jsx`
4. `src/components/About.jsx`
5. `src/components/Services.jsx`
6. `src/components/Experience.jsx`
7. `src/components/Projects.jsx`
8. `src/components/Contact.jsx`
9. `src/components/Footer.astro`
10. `src/components/ScrollToTop.jsx`

## Contraintes
- Garder toute la logique existante (EmailJS, framer-motion, modal projets)
- Ne pas changer les IDs de sections (accueil, apropos, services, realisations, contact)
- Tailwind CSS uniquement pour le styling
- Responsive mobile-first conservé
