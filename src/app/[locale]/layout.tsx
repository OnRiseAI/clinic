import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { MotionProvider } from '@/components/providers/motion-provider'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'MediTravel - Premium Healthcare, Worldwide',
    template: '%s | MediTravel',
  },
  description:
    'Discover accredited clinics and experienced doctors across the globe. Compare prices, read reviews, and book your medical journey with confidence.',
  keywords: [
    'medical tourism',
    'healthcare abroad',
    'dental tourism',
    'cosmetic surgery abroad',
    'international healthcare',
    'medical travel',
  ],
  authors: [{ name: 'MediTravel' }],
  creator: 'MediTravel',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'MediTravel',
    title: 'MediTravel - Premium Healthcare, Worldwide',
    description:
      'Discover accredited clinics and experienced doctors across the globe. Compare prices, read reviews, and book your medical journey with confidence.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MediTravel - Premium Healthcare, Worldwide',
    description:
      'Discover accredited clinics and experienced doctors across the globe. Compare prices, read reviews, and book your medical journey with confidence.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en')) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages for the current locale
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
