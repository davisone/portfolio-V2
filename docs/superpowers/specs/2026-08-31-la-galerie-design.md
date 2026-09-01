# La Galerie — Spec de design : refonte de la page d'accueil

Date : 2026-08-31
Statut : validé (direction artistique approuvée)
Référence visuelle : artifact « La Galerie » (page de présentation de la direction de design)

## 1. Vision

La page d'accueil du portfolio (evandavison.fr) devient une **galerie d'exposition lumineuse**. Le scroll ne fait pas défiler une page : il déplace le visiteur de salle en salle. La molette reste verticale (scroll natif), mais une « caméra » voyage dans un plan en deux dimensions — descentes, glissements latéraux, diagonales. Les projets sont accrochés comme des œuvres, chacun avec son cartel d'exposition.

Objectifs :
- Sensation réelle de déplacement (pas un simple scroll vertical).
- Univers clair, aéré, haut de gamme, qui donne envie de lire.
- Zéro régression SEO : le contenu reste du HTML statique dans l'ordre de lecture.

## 2. Périmètre

- **Inclus** : page d'accueil (`src/pages/index.astro`) entièrement rescénographiée ; propagation de la nouvelle identité visuelle (palette, typographies) aux pages blog, glossaire, FAQ et 404 en mise en page éditoriale classique.
- **Exclus** : structure de contenu du blog/glossaire/FAQ (inchangée), contenu textuel des sections (repris de l'existant), i18n (mécanique existante conservée).
- **Supprimé** : mode sombre (site clair uniquement, `ThemeToggle` retiré) ; Framer Motion sur la home (remplacé par GSAP ; retiré du projet si plus utilisé ailleurs).

## 3. Le parcours (chorégraphie)

Six salles, mêmes contenus que l'actuel, reliées par un parcours en S :

| Étape | Mouvement caméra | Salle | Contenu |
|---|---|---|---|
| 1 | Point de départ | Hall | Hero : nom, promesse, invitation à visiter |
| 2 | Descente | Salle 1 | À propos |
| 3 | Glissement droite | Salle 2 | Services (trois pièces exposées) |
| 4 | Diagonale bas-droite | Grande salle | Projets — cœur de l'exposition |
| 5 | Travelling horizontal | Grande salle (intérieur) | Le mur des projets défile devant la caméra |
| 6 | Descente | Salle 4 | Expérience (frise chronologique accrochée) |
| 7 | Glissement gauche | Sortie | Contact : calme, une seule action — écrire |

Chaque changement de direction marque l'entrée dans une salle : le mouvement encode la structure.

## 4. Signature : le plan de la visite

Mini-plan architectural fixe (bas d'écran) dessiné en filets fins :
- Les salles y figurent aux positions réelles de la chorégraphie.
- Un **point rouge** suit la position de scroll du visiteur en temps réel.
- Chaque salle est cliquable : cliquer = voyager jusqu'à la salle (scroll animé).
- Sur mobile : version compacte (réduite ou repliable), jamais au-dessus du contenu de lecture.
- Accessible : nav landmark, liens avec labels (« Aller à la salle Projets »), focus visible.

## 5. Système visuel

### Palette (tokens)

| Token | Hex | Usage |
|---|---|---|
| `--cimaise` | `#FAFAF7` | Fond général (blanc légèrement chaud) |
| `--oeuvre` | `#FFFFFF` | Surfaces exposées : cartes projets, cartels |
| `--encre` | `#1C1B18` | Textes, traits |
| `--cartel` | `#6F6A63` | Textes secondaires, légendes |
| `--filet` | `#E6E3DC` | Bordures, séparations |
| `--point` | `#C8330A` | Accent unique : position sur le plan, pastille « Livré », hover des liens, CTA |

Règle : le point rouge n'apparaît **nulle part ailleurs** que dans ces usages. Contrastes vérifiés : encre/cimaise 15,9:1 ; cartel/cimaise 4,9:1 ; le rouge n'est jamais utilisé pour du texte courant.

### Typographies (Google Fonts)

| Rôle | Fonte | Usage |
|---|---|---|
| Display | Marcellus (400) | Titres de salles, nom, gros titres — capitales lapidaires |
| Lecture | Source Serif 4 (300–600, italique) | Corps de texte, articles de blog |
| Signalétique | Archivo (400–600) | Cartels, labels, navigation — capitales espacées (letter-spacing ≥ 0.1em) |

Interdits maintenus : aucune police générique, aucun dégradé bleu/violet, aucun émoji dans l'UI (SVG uniquement).

### Les cartels (fiches projets)

Chaque projet = une œuvre accrochée + un cartel : titre (Marcellus), médium en italique (« Commande privée — boutique en ligne, 2025 »), technologies en signalétique Archivo, pastille point rouge « Livré » le cas échéant. Bordure `--filet`, fond `--oeuvre`, pas d'ombre ou une ombre très douce type encadrement.

## 6. Architecture technique

### Stack

- **Astro 5** conservé, contenu 100 % statique dans `index.astro` (ordre DOM = ordre de lecture = ordre de visite).
- **GSAP + ScrollTrigger** (nouvelle dépendance npm `gsap`) chargé dans un `<script>` Astro client-side — pas d'île React pour la chorégraphie.
- **Framer Motion retiré** de la home ; suppression de la dépendance si plus aucun usage.
- **Tailwind** conservé ; tokens ajoutés dans `tailwind.config.mjs` + variables CSS dans `global.css`.

### Principe de la caméra

- Un conteneur `.galerie-monde` positionne les six salles en coordonnées 2D (unités vw/vh).
- ScrollTrigger épingle le viewport et scrub une timeline GSAP qui translate le monde (`transform` uniquement) selon le parcours en S.
- La hauteur de scroll totale est proportionnelle à la longueur du parcours (distance cumulée), pour une vitesse de déplacement constante.
- Le plan de la visite lit la progression de la même timeline pour positionner le point rouge.
- Snap léger à l'entrée de chaque salle (`snap` ScrollTrigger avec durée courte), jamais bloquant : le scroll libre reste toujours possible.

### Fallbacks

- **Sans JavaScript** : les salles s'empilent verticalement (layout par défaut avant init GSAP), page entièrement lisible.
- **`prefers-reduced-motion`** : chorégraphie désactivée ; scroll vertical classique avec fondus discrets (opacité uniquement).
- **Mobile (< 768 px)** : voyage présent mais amplitudes latérales réduites ; salles recomposées en colonne ; le travelling de la Grande salle garde une amplitude horizontale réduite (~40 % de la version desktop) pour préserver la sensation de déplacement.

### Pages secondaires (blog, glossaire, FAQ, 404)

Mise en page éditoriale classique : palette et typographies de la Galerie, largeur de lecture ~65 caractères, aucun GSAP. Header/Footer redessinés aux couleurs de la Galerie, partagés avec la home. Suppression du toggle de thème.

## 7. Accessibilité

- Navigation clavier : ordre de tabulation = ordre DOM = ordre de visite ; focus visible (outline `--point`).
- Le plan de la visite : `<nav>` avec liens labellisés ; utilisable au clavier.
- Hiérarchie de titres séquentielle (h1 unique au Hall, h2 par salle).
- `prefers-reduced-motion` respecté (voir Fallbacks).
- Contrastes AA vérifiés sur tous les couples texte/fond.
- Cibles tactiles ≥ 44 px.

## 8. Performance

- Animations : `transform` et `opacity` uniquement ; `will-change` posé/retiré par GSAP.
- GSAP + ScrollTrigger : ~70 ko gz, chargé en `<script>` unique différé ; aucun autre JS lourd sur la home (moins de JS qu'actuellement avec les îles React + Framer Motion).
- Pas d'images décoratives lourdes ; visuels projets en WebP/AVIF avec dimensions réservées (CLS < 0.1).
- Fonts : `display=swap`, préchargement des trois fontes critiques.
- Budget : Lighthouse Performance ≥ 90 mobile sur la home.

## 9. SEO

- Contenu intégral dans le HTML statique, ordre de lecture préservé, balises méta/canoniques/sitemap inchangées (travail SEO récent conservé).
- Aucune section injectée en JS ; GSAP ne fait que déplacer visuellement des éléments présents dans le DOM.
- Les ancres de sections (`#projets`, etc.) restent fonctionnelles (scroll animé vers la salle correspondante).

## 10. Tests et validation

- Vérification visuelle aux breakpoints 375 / 768 / 1024 / 1440 px (captures Playwright).
- Test `prefers-reduced-motion` et navigation sans JavaScript.
- Test clavier complet (tabulation, plan de visite, formulaire contact).
- `astro build` sans erreur ; vérification de la sitemap et des canoniques après build.
- Lighthouse mobile ≥ 90 en Performance, ≥ 95 en Accessibilité et SEO sur la home.

## 11. Découpage indicatif de l'implémentation

1. Tokens (Tailwind + CSS), typographies, layout de base clair — pages secondaires migrées.
2. Structure statique des six salles (HTML/CSS, empilement vertical fallback).
3. Chorégraphie GSAP (caméra, timeline, snap éventuel) desktop.
4. Adaptation mobile + reduced-motion.
5. Plan de la visite (SVG, point rouge, navigation).
6. Retrait Framer Motion / ThemeToggle, nettoyage, tests, Lighthouse.

Le plan d'implémentation détaillé sera rédigé séparément (skill writing-plans).
