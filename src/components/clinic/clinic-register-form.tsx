'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { CLINIC_ROLE_OPTIONS } from '@/lib/validations/clinic'

export function ClinicRegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    roleInClinic: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/clinic/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      // Redirect to profile setup wizard
      router.push('/clinic/setup')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Full Name</label>
        <input
          type="text"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
          className={cn(
            'w-full rounded-xl border-2 border-neutral-200 px-4 py-3',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
          )}
          placeholder="John Smith"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Your Role at the Clinic</label>
        <select
          value={formData.roleInClinic}
          onChange={(e) => setFormData({ ...formData, roleInClinic: e.target.value })}
          required
          className={cn(
            'w-full rounded-xl border-2 border-neutral-200 px-4 py-3',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
          )}
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className={cn(
            'w-full rounded-xl border-2 border-neutral-200 px-4 py-3',
            'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
          )}
          placeholder="you@clinic.com"
        />
        <p className="mt-1 text-xs text-neutral-500">Use your official clinic email address</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-neutral-700">Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={8}
            className={cn(
              'w-full rounded-xl border-2 border-neutral-200 px-4 py-3 pr-12',
              'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20'
            )}
            placeholder="Minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="terms"
          required
          className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
        />
        <label htmlFor="terms" className="text-sm text-neutral-600">
          I agree to the{' '}
          <a href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
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
          'Create Account'
        )}
      </Button>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-neutral-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-neutral-500">or</span>
        </div>
      </div>

      <Button type="button" variant="outline" className="w-full" size="lg">
        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>
    </form>
  )
}
