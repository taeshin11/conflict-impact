import { MetadataRoute } from 'next'
import impacts from '@/public/data/impacts.json'

const BASE_URL = 'https://conflict-impact.vercel.app'
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt']
const sectors = ['hospitals', 'schools', 'power', 'water', 'telecom']

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = [...new Set(impacts.map(i => i.country_slug))]
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    entries.push({ url: `${BASE_URL}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 })
    entries.push({ url: `${BASE_URL}/${locale}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 })
    for (const country of countries) {
      entries.push({ url: `${BASE_URL}/${locale}/country/${country}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 })
    }
    for (const sector of sectors) {
      entries.push({ url: `${BASE_URL}/${locale}/sector/${sector}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 })
    }
  }

  return entries
}
