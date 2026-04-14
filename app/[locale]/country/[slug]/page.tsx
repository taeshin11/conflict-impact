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

  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/country/ukraine`, label: 'Countries' },
    { href: `/${locale}/sector/hospitals`, label: 'Sectors' },
    { href: `/${locale}/about`, label: 'About' },
  ]

  return (
    <>
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
              <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">Conflict Impact</Link>
              <span className="text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-0.5 hidden sm:block">LIVE</span>
            </div>
            <nav className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white hover:bg-slate-700/50 px-3 py-2 rounded-lg text-sm transition-colors">{link.label}</Link>
              ))}
            </nav>
          </div>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
        <Link href={`/${locale}`} className="text-sm text-orange-500 hover:text-orange-600 font-medium mb-6 inline-block">← Back to all</Link>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{countryName}</h1>
          <p className="text-slate-500 mb-3">{countryImpacts[0].conflict}</p>
          <div className="flex gap-3 flex-wrap">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-600 ring-1 ring-inset ring-red-500/20">{criticalCount} critical</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-600 ring-1 ring-inset ring-slate-500/20">{countryImpacts.length} sectors affected</span>
          </div>
        </div>
        <AdInContent />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {countryImpacts.map(impact => <ImpactCard key={impact.id} impact={impact} />)}
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-white font-bold">Conflict Impact</div>
            <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
          </div>
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
