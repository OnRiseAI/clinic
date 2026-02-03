'use client'

import { cn } from '@/lib/utils'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface StepContactProps {
  fullName: string
  email: string
  phone: string
  onFullNameChange: (value: string) => void
  onEmailChange: (value: string) => void
  onPhoneChange: (value: string) => void
  errors: Record<string, string>
}

export function StepContact({
  fullName,
  email,
  phone,
  onFullNameChange,
  onEmailChange,
  onPhoneChange,
  errors,
}: StepContactProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-neutral-900">Your contact details</h3>
        <p className="mt-2 text-neutral-600">
          The clinic will use these details to get back to you.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="John Smith"
            className={cn(
              'mt-1 w-full rounded-xl border-2 p-3 text-neutral-900 placeholder:text-neutral-400',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              errors.fullName ? 'border-red-500' : 'border-neutral-200'
            )}
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
            Email address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="john@example.com"
            className={cn(
              'mt-1 w-full rounded-xl border-2 p-3 text-neutral-900 placeholder:text-neutral-400',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
              errors.email ? 'border-red-500' : 'border-neutral-200'
            )}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
            Phone number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            international
            defaultCountry="GB"
            value={phone}
            onChange={(value) => onPhoneChange(value || '')}
            className={cn(
              'mt-1 w-full rounded-xl border-2 p-3',
              'focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
              errors.phone ? 'border-red-500' : 'border-neutral-200',
              '[&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:outline-none [&_.PhoneInputInput]:text-neutral-900',
              '[&_.PhoneInputCountrySelect]:border-0 [&_.PhoneInputCountrySelect]:bg-transparent'
            )}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>
      </div>

      <p className="text-sm text-neutral-500">
        Your information is secure and will only be shared with this clinic.
      </p>
    </div>
  )
}
