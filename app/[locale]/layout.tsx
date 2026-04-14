import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { getMessages } from 'next-intl/server'
import type { Metadata } from 'next'
import '../globals.css'

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
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
