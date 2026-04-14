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
  title: 'Terms of Service',
  description: 'Conflict Impact Terms of Service — the rules and conditions governing use of our platform.',
  keywords: 'terms of service, terms of use, user agreement, legal',
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/country/ukraine`, label: 'Countries' },
    { href: `/${locale}/sector/hospitals`, label: 'Sectors' },
    { href: `/${locale}/about`, label: 'About' },
  ]

  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using Conflict Impact ("the Service") at conflict-impact.vercel.app, you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service. We reserve the right to modify these terms at any time; continued use constitutes acceptance.' },
    { title: '2. Description of Service', content: 'Conflict Impact is a free, publicly accessible web platform that measures the human, economic, and infrastructure impact of ongoing armed conflicts worldwide. The Service is provided for informational and educational purposes only. We do not charge fees and require no user registration.' },
    { title: '3. Disclaimer of Warranties', content: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. We do not warrant that data is complete, accurate, current, or error-free. Conflict data is inherently uncertain and rapidly changing. ALL DATA IS FOR INFORMATIONAL PURPOSES ONLY AND DOES NOT CONSTITUTE MILITARY ADVICE, LEGAL ADVICE, FINANCIAL ADVICE, OR PROFESSIONAL INTELLIGENCE ANALYSIS. Independently verify information before making decisions based on it.' },
    { title: '4. Limitation of Liability', content: 'TO THE FULLEST EXTENT PERMITTED BY LAW, CONFLICT IMPACT SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES resulting from your use of the Service. Our total liability shall not exceed $0, as the Service is provided entirely free of charge.' },
    { title: '5. Accuracy of Information', content: 'We strive to present accurate, up-to-date information from reliable sources. However, we make no guarantees about timeliness, accuracy, completeness, or suitability for any purpose. We are not responsible for errors in underlying third-party data sources.' },
    { title: '6. Intellectual Property', content: 'The design, layout, and original written content of Conflict Impact are protected by copyright. Underlying conflict data is subject to its original source licenses. You may reference and cite information for non-commercial, educational, or journalistic purposes with attribution. Systematic scraping or commercial republication without permission is prohibited.' },
    { title: '7. Prohibited Uses', content: 'You agree not to: (a) use the Service for illegal activities; (b) attempt unauthorized access to any system; (c) systematically harvest data using automated tools without permission; (d) use the Service to spread disinformation; (e) interfere with or disrupt the Service.' },
    { title: '8. Third-Party Content', content: 'The Service may display advertising (including Google AdSense) and links to external websites. We are not responsible for third-party content or privacy practices. Third-party advertisers are responsible for their ad content.' },
    { title: '9. Governing Law', content: 'These Terms shall be governed by applicable law. Disputes shall be resolved through good-faith negotiation before any legal action is taken.' },
    { title: '10. Contact', content: 'For questions about these Terms of Service, contact us at contact@conflict-impact.vercel.app.' },
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
      <main className="max-w-4xl mx-auto px-4 py-12 flex-1">
        <nav className="text-sm text-slate-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-slate-700">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
        <p className="text-slate-500 mb-10">Last updated: April 2025</p>
        <div className="space-y-4">
          {sections.map(({ title, content }) => (
            <section key={title} className="bg-white rounded-2xl border border-slate-100 p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">{title}</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
            </section>
          ))}
        </div>
      </main>
      <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-slate-700 pt-6 mb-4 mt-4">
            <a href="/about" className="hover:text-white transition-colors">About Us</a>
            <a href="/faq" className="hover:text-white transition-colors">How to Use &amp; FAQ</a>
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-bold">Conflict Impact</div>
              <div className="text-xs text-slate-500 mt-1">For informational purposes only.</div>
            </div>
            <VisitorCounter />
          </div>
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
