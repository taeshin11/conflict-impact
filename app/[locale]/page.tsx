import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import ImpactFilter from '@/components/ImpactFilter'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdSidebar from '@/components/ads/AdSidebar'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import impacts from '@/public/data/impacts.json'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Conflict Impact — Civilian Infrastructure Disruption Dashboard',
  description: 'Track damage to hospitals, schools, power, water and telecom in active conflicts worldwide.',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const criticalCount = impacts.filter(i => i.severity === 'critical').length
  const countriesAffected = new Set(impacts.map(i => i.country)).size

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🏥</span> Conflict Impact
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-gray-900">Home</Link>
            <Link href={`/${locale}/about`} className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Conflict Impact</h1>
          <p className="text-gray-500 mt-1">Civilian Infrastructure Disruption Dashboard</p>
          <div className="flex gap-6 mt-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-700">{criticalCount}</p>
              <p className="text-xs text-gray-500">Critical Situations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{impacts.length}</p>
              <p className="text-xs text-gray-500">Impact Records</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{countriesAffected}</p>
              <p className="text-xs text-gray-500">Countries Tracked</p>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <AdInContent />
            <ImpactFilter impacts={impacts as any} />
          </div>
          <aside className="hidden xl:block w-[300px] flex-shrink-0">
            <AdSidebar />
          </aside>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">Tracking civilian infrastructure disruption</p>
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
