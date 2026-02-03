'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Check, ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Link } from '@/i18n/navigation'

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const origin = window.location.origin

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
        setIsLoading(false)
        return
      }

      setSuccess(true)
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-neutral-900">Check your email</h3>
        <p className="mt-2 text-neutral-600">
          We&apos;ve sent a password reset link to <strong>{email}</strong>.
        </p>
        <p className="mt-4 text-sm text-neutral-500">
          Didn&apos;t receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setSuccess(false)}
            className="font-medium text-primary-600 hover:text-primary-700"
          >
            try again
          </button>
        </p>
        <Link href="/auth/signin">
          <Button variant="outline" className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-700">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            placeholder="you@example.com"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </>
  )
}
