'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Search,
  Calendar,
  DollarSign,
  MapPin,
  ExternalLink,
} from 'lucide-react'

interface PatientEnquiry {
  id: string
  clinic_id: string
  clinic_name: string
  clinic_slug: string
  clinic_category_slug: string
  clinic_city: string | null
  clinic_country: string | null
  procedure_interest: string
  budget_range: string | null
  timeline: string
  message: string | null
  status: 'submitted' | 'viewed' | 'responded' | 'closed'
  created_at: string
  updated_at: string
}

interface EnquiriesClientProps {
  enquiries: PatientEnquiry[]
  statusCounts: {
    all: number
    active: number
    responded: number
    closed: number
  }
  currentStatus: string
  selectedEnquiryId?: string
}

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'responded', label: 'Responded' },
  { id: 'closed', label: 'Closed' },
]

const STATUS_COLORS = {
  submitted: 'bg-neutral-100 text-neutral-700',
  viewed: 'bg-blue-100 text-blue-700',
  responded: 'bg-green-100 text-green-700',
  closed: 'bg-neutral-100 text-neutral-500',
}

const STATUS_LABELS = {
  submitted: 'Submitted',
  viewed: 'Viewed by Clinic',
  responded: 'Responded',
  closed: 'Closed',
}

const TIMELINE_LABELS: Record<string, string> = {
  within_month: 'Within 1 month',
  '1_3_months': '1-3 months',
  '3_6_months': '3-6 months',
  '6_12_months': '6-12 months',
  just_researching: 'Just researching',
}

const BUDGET_LABELS: Record<string, string> = {
  under_2500: 'Under €2,500',
  '2500_5000': '€2,500 - €5,000',
  '5000_10000': '€5,000 - €10,000',
  '10000_20000': '€10,000 - €20,000',
  over_20000: 'Over €20,000',
  not_sure: 'Not sure yet',
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatShortDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

export function EnquiriesClient({
  enquiries,
  statusCounts,
  currentStatus,
  selectedEnquiryId,
}: EnquiriesClientProps) {
  const router = useRouter()
  const [expandedId, setExpandedId] = useState<string | null>(selectedEnquiryId || null)

  const handleStatusChange = (status: string) => {
    router.push(`/dashboard/enquiries?status=${status}`)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">My Enquiries</h1>
            <p className="mt-1 text-neutral-600">
              Track your treatment enquiries and clinic responses.
            </p>
          </div>
          <Link href="/search">
            <Button variant="primary">
              <Search className="mr-2 h-4 w-4" />
              New Enquiry
            </Button>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto border-b border-neutral-200 pb-px">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleStatusChange(tab.id)}
              className={cn(
                'whitespace-nowrap border-b-2 px-4 py-2 text-sm font-medium transition-colors',
                currentStatus === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
              )}
            >
              {tab.label}
              <span className="ml-2 rounded-full bg-neutral-100 px-2 py-0.5 text-xs">
                {statusCounts[tab.id as keyof typeof statusCounts]}
              </span>
            </button>
          ))}
        </div>

        {/* Enquiries List */}
        {enquiries.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {enquiries.map((enquiry) => (
                <m.div
                  key={enquiry.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleExpand(enquiry.id)}
                    className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-neutral-50 sm:p-6"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-600">
                      {enquiry.clinic_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-neutral-900">{enquiry.clinic_name}</h3>
                          <p className="text-sm text-neutral-500 truncate">
                            {enquiry.procedure_interest}
                          </p>
                        </div>
                        <span
                          className={cn(
                            'flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium',
                            STATUS_COLORS[enquiry.status]
                          )}
                        >
                          {STATUS_LABELS[enquiry.status]}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-500">
                        {(enquiry.clinic_city || enquiry.clinic_country) && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {[enquiry.clinic_city, enquiry.clinic_country].filter(Boolean).join(', ')}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatShortDate(enquiry.created_at)}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      {expandedId === enquiry.id ? (
                        <ChevronUp className="h-5 w-5 text-neutral-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {expandedId === enquiry.id && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-neutral-200 bg-neutral-50 p-4 sm:p-6">
                          <div className="grid gap-6 sm:grid-cols-2">
                            {/* Enquiry Details */}
                            <div className="space-y-4">
                              <h4 className="font-semibold text-neutral-900">Enquiry Details</h4>
                              <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                  <Calendar className="mt-0.5 h-5 w-5 text-neutral-400" />
                                  <div>
                                    <p className="text-sm text-neutral-500">Timeline</p>
                                    <p className="font-medium text-neutral-900">
                                      {TIMELINE_LABELS[enquiry.timeline] || enquiry.timeline}
                                    </p>
                                  </div>
                                </div>
                                {enquiry.budget_range && (
                                  <div className="flex items-start gap-3">
                                    <DollarSign className="mt-0.5 h-5 w-5 text-neutral-400" />
                                    <div>
                                      <p className="text-sm text-neutral-500">Budget</p>
                                      <p className="font-medium text-neutral-900">
                                        {BUDGET_LABELS[enquiry.budget_range] || enquiry.budget_range}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-start gap-3">
                                  <MessageSquare className="mt-0.5 h-5 w-5 text-neutral-400" />
                                  <div>
                                    <p className="text-sm text-neutral-500">Submitted</p>
                                    <p className="font-medium text-neutral-900">
                                      {formatDate(enquiry.created_at)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Your Message */}
                            {enquiry.message && (
                              <div className="space-y-4">
                                <h4 className="font-semibold text-neutral-900">Your Message</h4>
                                <p className="whitespace-pre-wrap rounded-lg bg-white p-4 text-neutral-700 border border-neutral-200">
                                  {enquiry.message}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Status Timeline */}
                          <div className="mt-6 border-t border-neutral-200 pt-6">
                            <h4 className="mb-4 font-semibold text-neutral-900">Status</h4>
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'h-3 w-3 rounded-full',
                                  enquiry.status === 'submitted'
                                    ? 'bg-neutral-400'
                                    : 'bg-green-500'
                                )}
                              />
                              <span className="text-sm text-neutral-600">Submitted</span>
                              <div className="h-px flex-1 bg-neutral-200" />
                              <div
                                className={cn(
                                  'h-3 w-3 rounded-full',
                                  enquiry.status === 'viewed' ||
                                    enquiry.status === 'responded' ||
                                    enquiry.status === 'closed'
                                    ? 'bg-green-500'
                                    : 'bg-neutral-200'
                                )}
                              />
                              <span className="text-sm text-neutral-600">Viewed</span>
                              <div className="h-px flex-1 bg-neutral-200" />
                              <div
                                className={cn(
                                  'h-3 w-3 rounded-full',
                                  enquiry.status === 'responded' || enquiry.status === 'closed'
                                    ? 'bg-green-500'
                                    : 'bg-neutral-200'
                                )}
                              />
                              <span className="text-sm text-neutral-600">Responded</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-6 flex flex-wrap gap-3 border-t border-neutral-200 pt-6">
                            <Link href={`/clinics/${enquiry.clinic_category_slug}/${enquiry.clinic_slug}`}>
                              <Button variant="outline" size="sm">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Clinic
                              </Button>
                            </Link>
                            {enquiry.status === 'responded' && (
                              <Button variant="primary" size="sm">
                                View Response
                              </Button>
                            )}
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
                <MessageSquare className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {currentStatus === 'all' ? 'No enquiries yet' : `No ${currentStatus} enquiries`}
              </h3>
              <p className="mt-2 max-w-md mx-auto text-neutral-500">
                {currentStatus === 'all'
                  ? 'Submit an enquiry to clinics to receive personalized treatment plans and quotes.'
                  : 'Try viewing all enquiries or submit a new one.'}
              </p>
              <div className="mt-6 flex justify-center gap-3">
                {currentStatus !== 'all' && (
                  <Button variant="outline" onClick={() => handleStatusChange('all')}>
                    View All
                  </Button>
                )}
                <Link href="/search">
                  <Button variant="primary">
                    <Search className="mr-2 h-4 w-4" />
                    Find Clinics
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </LazyMotion>
  )
}
