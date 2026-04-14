import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: 'https://conflict-impact.vercel.app/sitemap.xml' }
}
