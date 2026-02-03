'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ClinicProcedureOption } from '@/lib/validations/enquiry'

interface StepProcedureProps {
  value: string
  onChange: (value: string) => void
  procedures: ClinicProcedureOption[]
  error?: string
}

export function StepProcedure({ value, onChange, procedures, error }: StepProcedureProps) {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const hasProcedures = procedures.length > 0

  const handleProcedureSelect = (procedureName: string) => {
    onChange(procedureName)
    setShowCustomInput(false)
  }

  const handleOtherClick = () => {
    setShowCustomInput(true)
    onChange('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          What procedure are you interested in?
        </h3>
        <p className="mt-2 text-neutral-600">
          {hasProcedures
            ? 'Select from the procedures this clinic offers, or describe your needs.'
            : 'Tell us what treatment or procedure you are looking for.'}
        </p>
      </div>

      {hasProcedures && !showCustomInput ? (
        <div className="space-y-3">
          {procedures.map((procedure) => (
            <button
              key={procedure.id}
              onClick={() => handleProcedureSelect(procedure.name)}
              className={cn(
                'w-full rounded-xl border-2 p-4 text-left transition-all',
                value === procedure.name
                  ? 'border-primary-600 bg-primary-50 text-primary-900'
                  : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              <span className="font-medium">{procedure.name}</span>
            </button>
          ))}
          <button
            onClick={handleOtherClick}
            className={cn(
              'w-full rounded-xl border-2 border-dashed p-4 text-left transition-all',
              'border-neutral-300 text-neutral-600 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700'
            )}
          >
            <span className="font-medium">Other / Not listed</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {hasProcedures && (
            <button
              onClick={() => setShowCustomInput(false)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              ← Back to procedure list
            </button>
          )}
          <div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="E.g., Hair transplant, Dental implants, Rhinoplasty..."
              className={cn(
                'w-full rounded-xl border-2 p-4 text-neutral-900 placeholder:text-neutral-400',
                'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
                error ? 'border-red-500' : 'border-neutral-200'
              )}
              autoFocus
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
