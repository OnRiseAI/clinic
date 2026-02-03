'use client'

import { cn } from '@/lib/utils'
import { TRAVEL_READINESS_OPTIONS } from '@/lib/validations/enquiry'
import { Plane, Search, Calendar } from 'lucide-react'

interface StepTravelReadinessProps {
  value: string
  onChange: (value: string) => void
  error?: string
}

const icons = {
  ready: Plane,
  researching: Search,
  planned: Calendar,
}

export function StepTravelReadiness({ value, onChange, error }: StepTravelReadinessProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          Are you open to travelling abroad for treatment?
        </h3>
        <p className="mt-2 text-neutral-600">
          This helps clinics understand your readiness and provide better guidance.
        </p>
      </div>

      <div className="space-y-3">
        {TRAVEL_READINESS_OPTIONS.map((option) => {
          const Icon = icons[option.value]
          return (
            <button
              key={option.value}
              onClick={() => onChange(option.value)}
              className={cn(
                'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
                value === option.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full',
                  value === option.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={cn(
                  'font-medium',
                  value === option.value ? 'text-primary-900' : 'text-neutral-900'
                )}
              >
                {option.label}
              </span>
            </button>
          )
        })}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
