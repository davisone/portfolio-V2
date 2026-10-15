// Contrôle post-build : tout lien interne doit viser la forme canonique avec slash final
// et une page existante, pour qu'aucun lien du site ne passe par une redirection.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const SITE = 'https://www.evandavison.fr'

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const full = join(dir, name)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })

// Un chemin pointe vers un fichier (extension) : pas de slash final attendu
const isFilePath = (path) => /\.[a-z0-9]{2,5}$/i.test(path)

const resolvesToPage = (path) => {
  const clean = decodeURI(path.split('#')[0].split('?')[0])
  if (isFilePath(clean)) return existsSync(join(DIST, clean))
  return existsSync(join(DIST, clean, 'index.html'))
}

const problems = []
const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'))
const attrPattern = /\b(?:href|content)="([^"]+)"/g
const jsonUrlPattern = /"(?:url|@id|item|href)":"([^"]+)"/g

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const page = '/' + relative(DIST, file).replace(/index\.html$/, '')
  const candidates = [...html.matchAll(attrPattern), ...html.matchAll(jsonUrlPattern)].map((m) => m[1])

  for (const raw of candidates) {
    let path
    if (raw.startsWith(SITE)) path = raw.slice(SITE.length) || '/'
    else if (raw.startsWith('/') && !raw.startsWith('//')) path = raw
    else continue

    const bare = path.split('#')[0].split('?')[0]
    // Ancre seule sur la page courante ou racine : rien à vérifier
    if (bare === '' || bare === '/') continue
    if (bare.startsWith('/_astro/')) continue

    if (!isFilePath(bare) && !bare.endsWith('/')) {
      problems.push(`${page} -> ${raw} (slash final manquant)`)
    } else if (!resolvesToPage(bare)) {
      problems.push(`${page} -> ${raw} (cible absente du build)`)
    }
  }
}

// Le sitemap doit lui aussi ne lister que des URL canoniques existantes
const sitemapUrls = walk(DIST)
  .filter((f) => /sitemap-\d+\.xml$/.test(f))
  .flatMap((f) => [...readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))
for (const url of sitemapUrls) {
  const path = url.slice(SITE.length) || '/'
  if (!path.endsWith('/') || !resolvesToPage(path)) problems.push(`sitemap -> ${url}`)
}

const unique = [...new Set(problems)]
if (unique.length) {
  console.error(`${unique.length} lien(s) interne(s) non canonique(s) :`)
  unique.forEach((p) => console.error('  ' + p))
  process.exit(1)
}
console.log(`OK : ${htmlFiles.length} pages et ${sitemapUrls.length} URL de sitemap contrôlées, aucun lien interne ne redirige.`)
