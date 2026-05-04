import fr from './translations/fr.json'
import en from './translations/en.json'
import enGbOverrides from './translations/en-gb.json'

export type Locale = 'fr' | 'en-gb' | 'en-us'
export const defaultLocale: Locale = 'fr'
export const locales: Locale[] = ['fr', 'en-gb', 'en-us']

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
