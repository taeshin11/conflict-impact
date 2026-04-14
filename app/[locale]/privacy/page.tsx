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
  title: 'Privacy Policy',
  description: 'Conflict Impact Privacy Policy — how we collect, use, and protect your information.',
  keywords: 'privacy policy, data protection, cookies, GDPR',
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const navLinks = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/country/ukraine`, label: 'Countries' },
    { href: `/${locale}/sector/hospitals`, label: 'Sectors' },
    { href: `/${locale}/about`, label: 'About' },
  ]

  const sections = [
    { title: '1. Introduction', content: 'Conflict Impact ("we," "our," or "us") operates the website at conflict-impact.vercel.app (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.' },
    { title: '2. Information We Collect', content: 'Automatically Collected Data: When you visit our site, we may automatically collect browser type, operating system, referring URLs, device information, and pages visited — through standard server logs and analytics tools. No Registration Required: We do not require users to create accounts or provide personal information. We do not intentionally collect personally identifiable information.' },
    { title: '3. Cookies and Tracking Technologies', content: 'We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and serve relevant advertisements. Types of cookies: Essential cookies (required for basic functionality), Analytics cookies (Google Analytics — anonymized and aggregated), Advertising cookies (Google AdSense and other ad networks for personalized ads), and Preference cookies (language selection). You can control cookie settings through your browser preferences.' },
    { title: '4. Google AdSense & Third-Party Advertising', content: 'We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website and other websites. You may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or www.aboutads.info/choices. Google AdSense also uses the DoubleClick cookie to improve ad quality. Learn more at https://policies.google.com/technologies/partner-sites.' },
    { title: '5. Google Analytics', content: 'We use Google Analytics to analyze traffic patterns. Google Analytics collects information such as how often users visit the site, what pages they visit, and what other sites they used before coming to our site. Data is anonymized and aggregated. We do not combine Google Analytics data with personally identifiable information.' },
    { title: '6. Third-Party Links', content: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any third-party sites you visit.' },
    { title: '7. Data Retention & Security', content: 'We implement reasonable security measures to protect against unauthorized access. Analytics and server log data is retained for up to 26 months before automatic deletion. No method of transmission over the Internet is 100% secure.' },
    { title: "8. Children's Privacy", content: 'Our service is not directed to individuals under age 13. We do not knowingly collect personal information from children under 13. If we become aware that such information has been provided, we will take steps to delete it.' },
    { title: '9. Changes to This Policy', content: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Review this policy periodically for any changes.' },
    { title: '10. Contact Us', content: 'If you have questions about this Privacy Policy, contact us at: contact@conflict-impact.vercel.app' },
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
          <span>Privacy Policy</span>
        </nav>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
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
