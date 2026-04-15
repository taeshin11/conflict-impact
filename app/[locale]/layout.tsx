import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'
import { FeedbackButton } from '@/components/FeedbackButton'
import Script from 'next/script'
import AdMobileSticky from '@/components/ads/AdMobileSticky'

export const metadata: Metadata = {
  title: {
    default: 'Conflict Impact | Real-Time Intelligence',
    template: '%s | Conflict Impact'
  },
  description: 'Measuring the human, economic, and infrastructure impact of ongoing armed conflicts worldwide',
  keywords: 'conflict impact, war casualties, war damage, economic impact of war, humanitarian crisis',
  openGraph: {
    type: 'website',
    siteName: 'Conflict Impact',
    title: 'Conflict Impact | Real-Time Intelligence',
    description: 'Measuring the human, economic, and infrastructure impact of ongoing armed conflicts worldwide',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conflict Impact',
    description: 'Measuring the human, economic, and infrastructure impact of ongoing armed conflicts worldwide',
  },
  verification: {
    google: 'WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc',
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const messages = await getMessages()
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Conflict Impact",
              "url": "https://conflict-impact.vercel.app",
              "description": "Measuring the human, economic, and infrastructure impact of ongoing armed conflicts worldwide",
              "publisher": {
                "@type": "Organization",
                "name": "Conflict Impact",
                "url": "https://conflict-impact.vercel.app"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <AdMobileSticky />
      <FeedbackButton siteName="Conflict Impact" siteUrl="https://conflict-impact.vercel.app" />
      <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
