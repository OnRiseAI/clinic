'use client'

import { useState, useEffect } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Sparkles, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

interface ClinicDashboardClientProps {
  children: React.ReactNode
  showWelcome: boolean
  clinicName: string
}

export function ClinicDashboardClient({ children, showWelcome, clinicName }: ClinicDashboardClientProps) {
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(showWelcome)

  useEffect(() => {
    if (showWelcome) {
      // Remove the query param without reloading
      window.history.replaceState({}, '', '/clinic')
    }
  }, [showWelcome])

  const closeWelcome = () => {
    setIsWelcomeOpen(false)
  }

  return (
    <>
      {children}

      {/* Welcome Modal */}
      <AnimatePresence>
        {isWelcomeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeWelcome}
            />

            {/* Modal */}
            <m.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={closeWelcome}
                className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200">
                <Sparkles className="h-10 w-10 text-primary-600" />
              </div>

              {/* Content */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Welcome to MediTravel!
                </h2>
                <p className="mt-2 text-lg text-primary-600">{clinicName} is now live</p>
                <p className="mt-4 text-neutral-600">
                  Your clinic profile is set up and ready to receive patient enquiries. Complete
                  your profile to maximize visibility.
                </p>
              </div>

              {/* Quick Tour */}
              <div className="mt-8 space-y-3">
                <h3 className="text-sm font-semibold text-neutral-900">Quick Tour</h3>
                {[
                  { icon: '📬', text: 'View and respond to patient enquiries' },
                  { icon: '👨‍⚕️', text: 'Add your doctor profiles' },
                  { icon: '📸', text: 'Upload photos to showcase your clinic' },
                  { icon: '💰', text: 'Set procedure prices to attract patients' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg bg-neutral-50 p-3 text-sm"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-neutral-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3">
                <Link href="/clinic/profile" className="w-full">
                  <Button variant="accent" className="w-full" size="lg">
                    Complete Your Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" onClick={closeWelcome} className="w-full">
                  I&apos;ll explore on my own
                </Button>
              </div>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
