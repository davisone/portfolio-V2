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
