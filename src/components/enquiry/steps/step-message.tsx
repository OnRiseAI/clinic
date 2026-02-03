'use client'

import { cn } from '@/lib/utils'

interface StepMessageProps {
  value: string
  onChange: (value: string) => void
}

export function StepMessage({ value, onChange }: StepMessageProps) {
  const characterCount = value.length
  const maxCharacters = 2000

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">
          Anything else you&apos;d like the clinic to know?
        </h3>
        <p className="mt-2 text-neutral-600">
          Add any specific questions, medical history, or details that might help.
        </p>
      </div>

      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="E.g., I've had previous consultations, I have specific medical conditions, I'm looking for a particular technique..."
          rows={6}
          maxLength={maxCharacters}
          className={cn(
            'w-full rounded-xl border-2 p-4 text-neutral-900 placeholder:text-neutral-400',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
            'resize-none border-neutral-200'
          )}
        />
        <div className="mt-2 flex justify-between text-sm text-neutral-500">
          <span>Optional</span>
          <span>
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>

      <div className="rounded-xl bg-primary-50 p-4">
        <p className="text-sm text-primary-800">
          <strong>Tip:</strong> Include any relevant medical history or previous consultations.
          This helps clinics provide more accurate information and personalized responses.
        </p>
      </div>
    </div>
  )
}
