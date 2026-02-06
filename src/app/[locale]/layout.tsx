import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: {
    default: 'Meet Your Clinic | Find Accredited Clinics Worldwide',
    template: '%s | Meet Your Clinic',
  },
  description:
    'Compare accredited clinics and specialists across 20+ countries. Read patient reviews, verify credentials, and connect with trusted medical providers abroad.',
  keywords: [
    'medical tourism',
    'healthcare abroad',
    'dental tourism',
    'cosmetic surgery abroad',
    'international healthcare',
    'medical travel',
  ],
  authors: [{ name: 'Meet Your Clinic' }],
  creator: 'Meet Your Clinic',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Meet Your Clinic',
    title: 'Meet Your Clinic | Find Accredited Clinics Worldwide',
    description:
      'Compare accredited clinics and specialists across 20+ countries. Read patient reviews, verify credentials, and connect with trusted medical providers abroad.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Your Clinic | Find Accredited Clinics Worldwide',
    description:
      'Compare accredited clinics and specialists across 20+ countries. Read patient reviews, verify credentials, and connect with trusted medical providers abroad.',
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
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
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
