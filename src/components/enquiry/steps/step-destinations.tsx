'use client'

import { cn } from '@/lib/utils'
import type { Destination } from '@/lib/validations/enquiry'
import { Check, Globe } from 'lucide-react'

interface StepDestinationsProps {
  selectedDestinations: string[]
  noPreference: boolean
  onDestinationsChange: (destinations: string[]) => void
  onNoPreferenceChange: (noPreference: boolean) => void
  destinations: Destination[]
  clinicCountry: string | null
}

export function StepDestinations({
  selectedDestinations,
  noPreference,
  onDestinationsChange,
  onNoPreferenceChange,
  destinations,
  clinicCountry,
}: StepDestinationsProps) {
  const handleDestinationToggle = (countryName: string) => {
    if (noPreference) {
      onNoPreferenceChange(false)
    }

    if (selectedDestinations.includes(countryName)) {
      onDestinationsChange(selectedDestinations.filter((d) => d !== countryName))
    } else {
      onDestinationsChange([...selectedDestinations, countryName])
    }
  }

  const handleNoPreferenceToggle = () => {
    onNoPreferenceChange(!noPreference)
    if (!noPreference) {
      onDestinationsChange([])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          Do you have a preferred destination?
        </h3>
        <p className="mt-2 text-neutral-600">
          Select one or more countries you&apos;re considering, or skip this step.
        </p>
      </div>

      <div className="space-y-3">
        {/* No preference option */}
        <button
          onClick={handleNoPreferenceToggle}
          className={cn(
            'flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
            noPreference
              ? 'border-primary-600 bg-primary-50'
              : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
          )}
        >
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              noPreference ? 'bg-primary-600 text-white' : 'bg-neutral-100 text-neutral-600'
            )}
          >
            <Globe className="h-5 w-5" />
          </div>
          <span
            className={cn(
              'font-medium',
              noPreference ? 'text-primary-900' : 'text-neutral-900'
            )}
          >
            No preference — I&apos;m open to any destination
          </span>
        </button>

        {/* Destinations list */}
        {!noPreference && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            {destinations.map((destination) => {
              const isSelected = selectedDestinations.includes(destination.country_name)
              const isClinicCountry = clinicCountry === destination.country_name

              return (
                <button
                  key={destination.id}
                  onClick={() => handleDestinationToggle(destination.country_name)}
                  className={cn(
                    'relative flex items-center gap-2 rounded-lg border-2 px-3 py-2.5 text-left text-sm transition-all',
                    isSelected
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-5 w-5 items-center justify-center rounded border',
                      isSelected
                        ? 'border-primary-600 bg-primary-600 text-white'
                        : 'border-neutral-300 bg-white'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                  <span
                    className={cn(
                      'flex-1',
                      isSelected ? 'font-medium text-primary-900' : 'text-neutral-700'
                    )}
                  >
                    {destination.country_name}
                  </span>
                  {isClinicCountry && (
                    <span className="rounded-full bg-primary-100 px-1.5 py-0.5 text-xs font-medium text-primary-700">
                      This clinic
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <p className="text-sm text-neutral-500">
        This step is optional. You can continue without selecting any destination.
      </p>
    </div>
  )
}
