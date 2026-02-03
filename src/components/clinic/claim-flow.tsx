'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { m, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Mail, Phone, Shield, Loader2, Check, ArrowLeft } from 'lucide-react'
import { CLINIC_ROLE_OPTIONS } from '@/lib/validations/clinic'

interface ClaimFlowProps {
  clinic: {
    id: string
    name: string
    address: string | null
    city: string | null
    country: string | null
    email: string | null
    phone: string | null
  }
  token: string
}

type Step = 'verify' | 'account' | 'success'
type VerificationMethod = 'email' | 'phone' | 'manual'

export function ClaimFlow({ clinic, token }: ClaimFlowProps) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('verify')
  const [verificationMethod, setVerificationMethod] = useState<VerificationMethod | null>(null)
  const [verificationCode, setVerificationCode] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Account creation form
  const [email, setEmail] = useState(clinic.email || '')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [roleInClinic, setRoleInClinic] = useState('')

  const hasEmail = !!clinic.email
  const hasPhone = !!clinic.phone
  const location = [clinic.city, clinic.country].filter(Boolean).join(', ')

  const handleSendCode = async (method: VerificationMethod) => {
    if (method === 'manual') {
      setVerificationMethod('manual')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/clinic/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: clinic.id,
          method,
          token,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send verification code')
      }

      setVerificationMethod(method)
      setCodeSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send code')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/clinic/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: clinic.id,
          code: verificationCode,
          token,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid verification code')
      }

      // Pre-fill email if verified via email
      if (verificationMethod === 'email' && clinic.email) {
        setEmail(clinic.email)
      }

      setStep('account')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/clinic/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: clinic.id,
          token,
          email,
          password,
          fullName,
          roleInClinic,
          verificationMethod,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create account')
      }

      setStep('success')

      // Redirect to clinic dashboard after short delay
      setTimeout(() => {
        router.push('/clinic?welcome=true')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed')
    } finally {
      setIsLoading(false)
    }
  }

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  }

  return (
    <div className="w-full max-w-md">
      {/* Clinic Preview */}
      <div className="mb-6 rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100">
            <span className="text-2xl">🏥</span>
          </div>
          <div>
            <p className="font-semibold text-neutral-900">{clinic.name}</p>
            {location && <p className="text-sm text-neutral-500">{location}</p>}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {['verify', 'account', 'success'].map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium',
                step === s
                  ? 'bg-primary-600 text-white'
                  : ['account', 'success'].indexOf(step) > i
                    ? 'bg-primary-100 text-primary-600'
                    : 'bg-neutral-100 text-neutral-400'
              )}
            >
              {['account', 'success'].indexOf(step) > i ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < 2 && (
              <div
                className={cn(
                  'mx-2 h-0.5 w-8',
                  ['account', 'success'].indexOf(step) > i ? 'bg-primary-600' : 'bg-neutral-200'
                )}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 'verify' && (
          <m.div
            key="verify"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                <Shield className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-neutral-900">Verify Your Ownership</h2>
              <p className="mt-2 text-neutral-600">
                Choose how you&apos;d like to verify that you&apos;re authorized to manage this clinic.
              </p>
            </div>

            {!codeSent ? (
              <div className="mt-6 space-y-3">
                {hasEmail && (
                  <button
                    onClick={() => handleSendCode('email')}
                    disabled={isLoading}
                    className="flex w-full items-center gap-4 rounded-xl border-2 border-neutral-200 p-4 text-left transition-all hover:border-primary-500 hover:bg-primary-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <Mail className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">Verify by Email</p>
                      <p className="text-sm text-neutral-500">
                        Send code to {clinic.email?.replace(/(.{3}).*@/, '$1***@')}
                      </p>
                    </div>
                  </button>
                )}

                {hasPhone && (
                  <button
                    onClick={() => handleSendCode('phone')}
                    disabled={isLoading}
                    className="flex w-full items-center gap-4 rounded-xl border-2 border-neutral-200 p-4 text-left transition-all hover:border-primary-500 hover:bg-primary-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                      <Phone className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">Verify by SMS</p>
                      <p className="text-sm text-neutral-500">
                        Send code to {clinic.phone?.replace(/(.{4}).*(.{2})$/, '$1***$2')}
                      </p>
                    </div>
                  </button>
                )}

                {(!hasEmail && !hasPhone) || (
                  <div className="pt-2">
                    <p className="text-center text-sm text-neutral-500">or</p>
                    <button
                      onClick={() => handleSendCode('manual')}
                      className="mt-2 w-full text-sm text-primary-600 hover:text-primary-700"
                    >
                      Request manual verification
                    </button>
                  </div>
                )}

                {!hasEmail && !hasPhone && (
                  <div className="rounded-xl bg-amber-50 p-4">
                    <p className="text-sm text-amber-800">
                      No contact information on file. Please{' '}
                      <button
                        onClick={() => handleSendCode('manual')}
                        className="font-medium underline"
                      >
                        request manual verification
                      </button>{' '}
                      and we&apos;ll verify your ownership.
                    </p>
                  </div>
                )}
              </div>
            ) : verificationMethod === 'manual' ? (
              <div className="mt-6">
                <div className="rounded-xl bg-primary-50 p-4 text-center">
                  <p className="font-medium text-primary-900">Manual Verification Requested</p>
                  <p className="mt-2 text-sm text-primary-700">
                    Our team will review your request and contact you within 24-48 hours to verify
                    your ownership.
                  </p>
                </div>
                <p className="mt-4 text-center text-sm text-neutral-500">
                  You can continue to create your account. Access will be granted once verified.
                </p>
                <Button
                  onClick={() => setStep('account')}
                  variant="primary"
                  className="mt-4 w-full"
                >
                  Continue to Create Account
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <p className="mb-4 text-center text-sm text-neutral-600">
                  We sent a 6-digit code to your {verificationMethod === 'email' ? 'email' : 'phone'}.
                </p>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="w-full rounded-xl border-2 border-neutral-200 p-4 text-center text-2xl tracking-widest focus:border-primary-500 focus:outline-none"
                    maxLength={6}
                  />
                  <Button
                    onClick={handleVerifyCode}
                    variant="primary"
                    className="w-full"
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                  <button
                    onClick={() => {
                      setCodeSent(false)
                      setVerificationCode('')
                    }}
                    className="w-full text-sm text-neutral-500 hover:text-neutral-700"
                  >
                    <ArrowLeft className="mr-1 inline h-4 w-4" />
                    Choose different method
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">{error}</p>
            )}
          </m.div>
        )}

        {step === 'account' && (
          <m.div
            key="account"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm"
          >
            <div className="text-center">
              <h2 className="text-xl font-bold text-neutral-900">Create Your Account</h2>
              <p className="mt-2 text-neutral-600">
                Set up your account to manage {clinic.name} on MediTravel.
              </p>
            </div>

            <form onSubmit={handleCreateAccount} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-neutral-200 p-3 focus:border-primary-500 focus:outline-none"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Your Role</label>
                <select
                  value={roleInClinic}
                  onChange={(e) => setRoleInClinic(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-neutral-200 p-3 focus:border-primary-500 focus:outline-none"
                >
                  <option value="">Select your role</option>
                  {CLINIC_ROLE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border-2 border-neutral-200 p-3 focus:border-primary-500 focus:outline-none"
                  placeholder="you@clinic.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-xl border-2 border-neutral-200 p-3 focus:border-primary-500 focus:outline-none"
                  placeholder="Minimum 8 characters"
                />
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="terms" className="text-sm text-neutral-600">
                  I confirm that I am authorized to manage this clinic&apos;s profile and agree to
                  the{' '}
                  <a href="/terms" className="text-primary-600 hover:underline">
                    Terms of Service
                  </a>
                </label>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">{error}</p>
              )}

              <Button type="submit" variant="accent" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Claim Clinic'
                )}
              </Button>
            </form>
          </m.div>
        )}

        {step === 'success' && (
          <m.div
            key="success"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm text-center"
          >
            <m.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
            >
              <Check className="h-10 w-10 text-green-600" strokeWidth={3} />
            </m.div>
            <h2 className="text-2xl font-bold text-neutral-900">Clinic Claimed!</h2>
            <p className="mt-3 text-neutral-600">
              You now have full control of {clinic.name} on MediTravel.
            </p>
            <p className="mt-2 text-sm text-neutral-500">Redirecting to your dashboard...</p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
