import { setRequestLocale } from 'next-intl/server'
import { HowItWorksClient } from './how-it-works-client'

interface HowItWorksPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata() {
  return {
    title: 'How It Works - Your Medical Journey Made Simple',
    description: 'Learn how MeetYourClinic helps you find, compare, and book medical treatments abroad. From discovery to recovery, we guide you every step.',
  }
}

export default async function HowItWorksPage({ params }: HowItWorksPageProps) {
  const { locale } = await params
  setRequestLocale(locale)

  return <HowItWorksClient />
}
