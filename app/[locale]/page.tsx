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
  const sectors = new Set(impacts.map(i => i.sector)).size

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

      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-white py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-orange-500 text-xs font-semibold uppercase tracking-[0.15em] mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-orange-500 opacity-60"></span>SEE WHAT CONFLICT DESTROYS
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">Conflict Impact</h1>
              <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">Tracking civilian infrastructure disruption from active armed conflicts worldwide.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { value: criticalCount, label: 'Critical Situations' },
                { value: countriesAffected, label: 'Countries' },
                { value: sectors, label: 'Sectors' },
              ].map(stat => (
                <div key={stat.label} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 text-center min-w-[100px]">
                  <div className="text-3xl font-black text-orange-500">{stat.value}</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdHeader />

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1">
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
