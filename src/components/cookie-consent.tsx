'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const CONSENT_KEY = 'meetyourclinic-cookie-consent'

type ConsentLevel = 'essential' | 'analytics' | 'all'

interface CookieConsentProps {
  className?: string
}

export function CookieConsent({ className }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    // Check if consent already given
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      // Small delay to prevent flash
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleConsent = (level: ConsentLevel) => {
    const consent = {
      level,
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent))
    setIsVisible(false)

    // Trigger analytics if consented
    if (level === 'analytics' || level === 'all') {
      // Enable GA4 or other analytics here
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
        })
      }
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-white border-t border-neutral-200 shadow-lg',
        className
      )}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              We value your privacy
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              We use cookies to enhance your browsing experience, analyse site traffic,
              and personalise content. By clicking &quot;Accept All&quot;, you consent to our
              use of cookies.{' '}
              <Link href="/privacy" className="text-primary-600 hover:underline">
                Learn more
              </Link>
            </p>

            {isExpanded && (
              <div className="mb-4 p-4 bg-neutral-50 rounded-lg text-sm">
                <div className="space-y-3">
                  <div>
                    <strong className="text-neutral-900">Essential cookies</strong>
                    <p className="text-neutral-600">
                      Required for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div>
                    <strong className="text-neutral-900">Analytics cookies</strong>
                    <p className="text-neutral-600">
                      Help us understand how visitors interact with our website (Google Analytics).
                    </p>
                  </div>
                  <div>
                    <strong className="text-neutral-900">Marketing cookies</strong>
                    <p className="text-neutral-600">
                      Used to deliver relevant ads and track campaign effectiveness.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleConsent('all')}
                className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => handleConsent('analytics')}
                className="px-4 py-2 bg-neutral-100 text-neutral-900 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Accept Analytics Only
              </button>
              <button
                onClick={() => handleConsent('essential')}
                className="px-4 py-2 text-neutral-600 text-sm hover:text-neutral-900 transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-4 py-2 text-neutral-600 text-sm hover:text-neutral-900 transition-colors"
              >
                {isExpanded ? 'Hide details' : 'Cookie settings'}
              </button>
            </div>
          </div>

          <button
            onClick={() => handleConsent('essential')}
            className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
            aria-label="Close cookie consent"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, options: Record<string, string>) => void
  }
}
