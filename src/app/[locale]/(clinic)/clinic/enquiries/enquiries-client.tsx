'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  Mail,
  Phone,
  MessageSquare,
  Clock,
  DollarSign,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Loader2,
} from 'lucide-react'
import {
  TRAVEL_READINESS_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/lib/validations/enquiry'

interface Enquiry {
  id: string
  procedure_interest: string
  willing_to_travel: string
  preferred_destinations: string[]
  budget_range: string | null
  timeline: string
  full_name: string
  email: string
  phone: string
  message: string | null
  status: 'submitted' | 'viewed' | 'responded' | 'closed'
  created_at: string
  updated_at: string
}

interface EnquiriesClientProps {
  enquiries: Enquiry[]
  totalPages: number
  currentPage: number
  currentStatus: string
  selectedEnquiryId?: string
  statusCounts: {
    all: number
    submitted: number
    viewed: number
    responded: number
    closed: number
  }
}

const STATUS_TABS = [
  { id: 'all', label: 'All' },
  { id: 'submitted', label: 'New' },
  { id: 'viewed', label: 'Viewed' },
  { id: 'responded', label: 'Responded' },
  { id: 'closed', label: 'Closed' },
]

function getReadableValue(value: string, options: readonly { value: string; label: string }[]): string {
  const option = options.find((o) => o.value === value)
  return option?.label || value
}

function formatRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return then.toLocaleDateString()
}

export function EnquiriesClient({
  enquiries,
  totalPages,
  currentPage,
  currentStatus,
  selectedEnquiryId,
  statusCounts,
}: EnquiriesClientProps) {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(selectedEnquiryId || null)
  const [isUpdating, setIsUpdating] = useState(false)

  const selectedEnquiry = enquiries.find((e) => e.id === selectedId)

  const handleStatusChange = (status: string) => {
    router.push(`/clinic/enquiries?status=${status}`)
  }

  const handlePageChange = (page: number) => {
    router.push(`/clinic/enquiries?status=${currentStatus}&page=${page}`)
  }

  const handleSelectEnquiry = (id: string) => {
    setSelectedId(id)
  }

  const handleUpdateStatus = async (enquiryId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      router.refresh()
    } catch (error) {
      console.error('Failed to update status:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Enquiries</h1>
        <p className="mt-1 text-neutral-600">View and respond to patient enquiries.</p>
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

      {enquiries.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Enquiry List */}
          <div className="lg:col-span-1 space-y-3">
            {enquiries.map((enquiry) => (
              <button
                key={enquiry.id}
                onClick={() => handleSelectEnquiry(enquiry.id)}
                className={cn(
                  'w-full rounded-xl border bg-white p-4 text-left transition-all',
                  selectedId === enquiry.id
                    ? 'border-primary-500 ring-2 ring-primary-500/20'
                    : 'border-neutral-200 hover:border-neutral-300 hover:shadow-sm'
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-600">
                      {enquiry.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{enquiry.full_name}</p>
                      <p className="text-sm text-neutral-500 truncate max-w-[150px]">
                        {enquiry.procedure_interest}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-0.5 text-xs font-medium',
                        enquiry.status === 'submitted'
                          ? 'bg-amber-100 text-amber-700'
                          : enquiry.status === 'viewed'
                            ? 'bg-blue-100 text-blue-700'
                            : enquiry.status === 'responded'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-neutral-100 text-neutral-700'
                      )}
                    >
                      {enquiry.status === 'submitted' ? 'New' : enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
                    </span>
                    <p className="mt-1 text-xs text-neutral-400">
                      {formatRelativeTime(enquiry.created_at)}
                    </p>
                  </div>
                </div>
                {enquiry.message && (
                  <p className="mt-3 text-sm text-neutral-600 line-clamp-2">{enquiry.message}</p>
                )}
              </button>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-neutral-500">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Enquiry Detail */}
          <div className="lg:col-span-2">
            {selectedEnquiry ? (
              <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                <div className="border-b border-neutral-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 text-lg font-semibold text-primary-600">
                        {selectedEnquiry.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-neutral-900">
                          {selectedEnquiry.full_name}
                        </h2>
                        <p className="text-neutral-500">{selectedEnquiry.procedure_interest}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 lg:hidden"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Contact Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                    >
                      <Mail className="h-4 w-4" />
                      Send Email
                    </a>
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                    <a
                      href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Contact Info */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-neutral-50 p-4">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Email</p>
                      <p className="mt-1 font-medium text-neutral-900">{selectedEnquiry.email}</p>
                    </div>
                    <div className="rounded-lg bg-neutral-50 p-4">
                      <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Phone</p>
                      <p className="mt-1 font-medium text-neutral-900">{selectedEnquiry.phone}</p>
                    </div>
                  </div>

                  {/* Enquiry Details */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-neutral-900">Enquiry Details</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <Calendar className="mt-0.5 h-5 w-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Timeline</p>
                          <p className="font-medium text-neutral-900">
                            {getReadableValue(selectedEnquiry.timeline, TIMELINE_OPTIONS)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <DollarSign className="mt-0.5 h-5 w-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Budget</p>
                          <p className="font-medium text-neutral-900">
                            {selectedEnquiry.budget_range
                              ? getReadableValue(selectedEnquiry.budget_range, BUDGET_OPTIONS)
                              : 'Not specified'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageSquare className="mt-0.5 h-5 w-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Travel Readiness</p>
                          <p className="font-medium text-neutral-900">
                            {getReadableValue(selectedEnquiry.willing_to_travel, TRAVEL_READINESS_OPTIONS)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-5 w-5 text-neutral-400" />
                        <div>
                          <p className="text-sm text-neutral-500">Submitted</p>
                          <p className="font-medium text-neutral-900">
                            {new Date(selectedEnquiry.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedEnquiry.preferred_destinations.length > 0 && (
                      <div>
                        <p className="text-sm text-neutral-500">Preferred Destinations</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedEnquiry.preferred_destinations.map((dest) => (
                            <span
                              key={dest}
                              className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700"
                            >
                              {dest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  {selectedEnquiry.message && (
                    <div>
                      <h3 className="font-semibold text-neutral-900">Message</h3>
                      <p className="mt-2 whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 text-neutral-700">
                        {selectedEnquiry.message}
                      </p>
                    </div>
                  )}

                  {/* Status Actions */}
                  <div className="border-t border-neutral-200 pt-6">
                    <h3 className="mb-3 font-semibold text-neutral-900">Update Status</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEnquiry.status !== 'responded' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedEnquiry.id, 'responded')}
                          disabled={isUpdating}
                        >
                          {isUpdating ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="mr-2 h-4 w-4" />
                          )}
                          Mark as Responded
                        </Button>
                      )}
                      {selectedEnquiry.status !== 'closed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(selectedEnquiry.id, 'closed')}
                          disabled={isUpdating}
                        >
                          Close Enquiry
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-xl border border-neutral-200 bg-white">
                <div className="text-center">
                  <MessageSquare className="mx-auto h-12 w-12 text-neutral-300" />
                  <p className="mt-4 text-neutral-500">Select an enquiry to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <MessageSquare className="h-8 w-8 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900">No enquiries yet</h3>
            <p className="mt-2 mx-auto max-w-md text-neutral-500">
              When patients submit enquiries about your clinic, they&apos;ll appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
