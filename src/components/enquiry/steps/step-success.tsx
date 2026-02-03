'use client'

import { m } from 'framer-motion'
import { Check, Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'

interface StepSuccessProps {
  clinicName: string
  enquiryId: string | null
  onClose: () => void
}

export function StepSuccess({ clinicName, onClose }: StepSuccessProps) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {/* Animated checkmark */}
      <m.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
        className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
      >
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Check className="h-10 w-10 text-green-600" strokeWidth={3} />
        </m.div>
      </m.div>

      {/* Success message */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <h3 className="text-2xl font-bold text-neutral-900">Your enquiry has been sent!</h3>
        <p className="mt-3 text-neutral-600">
          We&apos;ve notified <span className="font-medium text-neutral-900">{clinicName}</span> and
          they&apos;ll get back to you soon.
        </p>
      </m.div>

      {/* Email confirmation notice */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 flex items-center gap-3 rounded-xl bg-primary-50 px-4 py-3"
      >
        <Mail className="h-5 w-5 text-primary-600" />
        <span className="text-sm text-primary-800">
          Check your email for a confirmation with the details of your enquiry.
        </span>
      </m.div>

      {/* Expected response time */}
      <m.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 text-sm text-neutral-500"
      >
        Most clinics respond within 24 hours.
      </m.p>

      {/* Action buttons */}
      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8 flex w-full flex-col gap-3"
      >
        <Link href="/dashboard/enquiries" className="w-full">
          <Button variant="accent" className="w-full">
            View My Enquiries
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <Button variant="outline" className="w-full" onClick={onClose}>
          Continue Browsing
        </Button>
      </m.div>
    </div>
  )
}
