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
      <main className="max-w-3xl mx-auto px-4 py-12 flex-1">
        <Link href={`/${locale}`} className="text-sm text-orange-500 hover:text-orange-600 font-medium mb-6 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">About Conflict Impact</h1>
        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>Conflict Impact tracks civilian infrastructure disruption in active conflict zones. We monitor damage and operational status of hospitals, schools, power grids, water systems, and telecommunications networks.</p>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Severity Scale</h2>
            <div className="space-y-3">
              {[
                { level: 'Critical', color: 'bg-red-500', desc: 'Near-total destruction or collapse, immediate threat to life' },
                { level: 'Severe', color: 'bg-orange-500', desc: 'Major damage, significantly reduced functionality' },
                { level: 'Moderate', color: 'bg-yellow-400', desc: 'Partial damage with workarounds in place' },
                { level: 'Limited', color: 'bg-green-400', desc: 'Minor disruptions, mostly functional' },
              ].map(item => (
                <div key={item.level} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color} flex-shrink-0 mt-1`}></div>
                  <div><strong className="text-slate-800">{item.level}:</strong> {item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Data Sources</h2>
            <p>Data compiled from WHO, UNICEF, UN OCHA, NGO reports, and verified news sources. All data is independently verified where possible.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-amber-900 mb-3">Disclaimer</h2>
            <p className="text-amber-800">War data is inherently uncertain. Figures represent best available estimates from credible sources and are subject to change.</p>
          </div>
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
