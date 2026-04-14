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

const COUNTRIES = [...new Set(impacts.map(i => i.country_slug))]

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COUNTRIES.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const countryImpacts = impacts.filter(i => i.country_slug === slug)
  const countryName = countryImpacts[0]?.country ?? slug
  return {
    title: `${countryName} Infrastructure Impact — Conflict Impact`,
    description: `Civilian infrastructure damage in ${countryName}: hospitals, schools, power, water and telecom.`,
  }
}

export default async function CountryPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const countryImpacts = impacts.filter(i => i.country_slug === slug)
  if (countryImpacts.length === 0) notFound()

  const countryName = countryImpacts[0].country
  const criticalCount = countryImpacts.filter(i => i.severity === 'critical').length

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
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{countryName}</h1>
        <p className="text-gray-500 mb-2">{countryImpacts[0].conflict}</p>
        <div className="flex gap-4 mb-6">
          <span className="text-sm text-red-700 font-medium">{criticalCount} critical situations</span>
          <span className="text-sm text-gray-500">{countryImpacts.length} sectors affected</span>
        </div>
        <AdInContent />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {countryImpacts.map(impact => <ImpactCard key={impact.id} impact={impact} />)}
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
