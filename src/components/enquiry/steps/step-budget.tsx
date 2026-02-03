'use client'

import { cn } from '@/lib/utils'
import { BUDGET_OPTIONS } from '@/lib/validations/enquiry'
import { CircleDollarSign } from 'lucide-react'

interface StepBudgetProps {
  value: string
  onChange: (value: string) => void
}

export function StepBudget({ value, onChange }: StepBudgetProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          What&apos;s your approximate budget?
        </h3>
        <p className="mt-2 text-neutral-600">
          This helps clinics provide accurate quotes. Select an option or skip this step.
        </p>
      </div>

      <div className="space-y-3">
        {BUDGET_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value === value ? '' : option.value)}
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
              <CircleDollarSign className="h-5 w-5" />
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
        ))}
      </div>

      <p className="text-sm text-neutral-500">
        This step is optional. Prices shown are typical ranges for medical tourism.
      </p>
    </div>
  )
}
