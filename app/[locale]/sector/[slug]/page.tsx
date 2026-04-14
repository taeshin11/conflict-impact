import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import ImpactCard from '@/components/ImpactCard'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import impacts from '@/public/data/impacts.json'
import type { Metadata } from 'next'

const SECTORS = ['hospitals', 'schools', 'power', 'water', 'telecom']

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SECTORS.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Infrastructure Impact | Conflict Impact`,
    description: `Civilian ${slug} infrastructure damage across active conflict zones.`,
  }
}

export default async function SectorPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  if (!SECTORS.includes(slug)) notFound()

  const sectorImpacts = impacts.filter(i => i.sector === slug)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🏥</span> Conflict Impact
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to all</Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{slug}</h1>
        <p className="text-gray-500 mb-6">{sectorImpacts.length} records across {new Set(sectorImpacts.map(i => i.country)).size} countries</p>
        <AdInContent />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sectorImpacts.map(impact => <ImpactCard key={impact.id} impact={impact} />)}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-end">
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
