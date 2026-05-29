import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://www.evandavison.fr',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en-gb', 'en-us'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url

        if (url === 'https://www.evandavison.fr/') {
          item.priority = 1.0
          item.changefreq = 'weekly'
        } else if (/\/(services|blog)\//.test(url)) {
          item.priority = 0.8
          item.changefreq = 'weekly'
        } else if (/\/(glossaire|comparatifs|faq)/.test(url)) {
          item.priority = 0.6
          item.changefreq = 'monthly'
        } else if (/\/(en-gb|en-us)\//.test(url)) {
          item.priority = 0.5
          item.changefreq = 'monthly'
        } else {
          item.priority = 0.5
          item.changefreq = 'monthly'
        }

        return item
      },
    }),
  ],
})
