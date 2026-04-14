import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'About — Conflict Impact',
  description: 'About the Conflict Impact civilian infrastructure disruption dashboard.',
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href={`/${locale}`} className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span>🏥</span> Conflict Impact
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 prose prose-gray">
        <h1>About Conflict Impact</h1>
        <p>Conflict Impact tracks civilian infrastructure disruption in active conflict zones. We monitor damage and operational status of hospitals, schools, power grids, water systems, and telecommunications networks.</p>
        <h2>Severity Scale</h2>
        <ul>
          <li><strong>Critical</strong>: Near-total destruction or collapse, immediate threat to life</li>
          <li><strong>Severe</strong>: Major damage, significantly reduced functionality</li>
          <li><strong>Moderate</strong>: Partial damage with workarounds in place</li>
          <li><strong>Limited</strong>: Minor disruptions, mostly functional</li>
        </ul>
        <h2>Data Sources</h2>
        <p>Data compiled from WHO, UNICEF, UN OCHA, NGO reports, and verified news sources. All data is independently verified where possible.</p>
        <h2>Disclaimer</h2>
        <p>War data is inherently uncertain. Figures represent best available estimates from credible sources and are subject to change.</p>
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
