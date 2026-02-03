'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Loader2, Check, AlertTriangle, X, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface NotificationSettings {
  enquiry_email: boolean
  marketing_email: boolean
  sms_notifications: boolean
}

interface SettingsClientProps {
  user: {
    id: string
    email: string
    full_name: string | null
    phone: string | null
    notification_settings: NotificationSettings | null
  }
}

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  enquiry_email: true,
  marketing_email: false,
  sms_notifications: false,
}

function Toggle({
  enabled,
  onChange,
  disabled,
}: {
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!enabled)}
      className={cn(
        'relative h-6 w-11 rounded-full transition-colors',
        enabled ? 'bg-primary-500' : 'bg-neutral-300',
        disabled && 'cursor-not-allowed opacity-50'
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all',
          enabled ? 'right-1' : 'left-1'
        )}
      />
    </button>
  )
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter()
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [isSavingPassword, setIsSavingPassword] = useState(false)
  const [isSavingNotifications, setIsSavingNotifications] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: user.full_name || '',
    phone: user.phone || '',
  })

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>(
    user.notification_settings || DEFAULT_NOTIFICATIONS
  )

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingProfile(true)
    setMessage(null)

    try {
      const res = await fetch('/api/patient/settings/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' })
        router.refresh()
      } else {
        const data = await res.json()
        setMessage({ type: 'error', text: data.error || 'Failed to update profile' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setIsSavingProfile(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingPassword(true)
    setMessage(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      setIsSavingPassword(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      setIsSavingPassword(false)
      return
    }

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) {
        setMessage({ type: 'error', text: error.message })
      } else {
        setMessage({ type: 'success', text: 'Password updated successfully!' })
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setIsSavingPassword(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSavingNotifications(true)
    setMessage(null)

    try {
      const res = await fetch('/api/patient/settings/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Notification preferences saved!' })
        router.refresh()
      } else {
        const data = await res.json()
        setMessage({ type: 'error', text: data.error || 'Failed to save preferences' })
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setIsSavingNotifications(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setMessage(null)

    try {
      const res = await fetch('/api/patient/settings/delete-account', {
        method: 'DELETE',
      })

      if (res.ok) {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
      } else {
        const data = await res.json()
        setMessage({ type: 'error', text: data.error || 'Failed to delete account' })
        setShowDeleteModal(false)
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' })
      setShowDeleteModal(false)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
          <p className="mt-1 text-neutral-600">
            Manage your account and preferences.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={cn(
              'flex items-center gap-2 rounded-lg p-4',
              message.type === 'success'
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            )}
          >
            {message.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertTriangle className="h-5 w-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Profile Section */}
        <form onSubmit={handleSaveProfile} className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">Profile</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-neutral-500"
                />
                <p className="mt-1 text-xs text-neutral-500">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={isSavingProfile}>
              {isSavingProfile && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>

        {/* Notifications Section */}
        <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-neutral-900">Enquiry status updates</p>
                <p className="text-sm text-neutral-500">
                  Email notifications when clinics view or respond to your enquiries
                </p>
              </div>
              <Toggle
                enabled={notifications.enquiry_email}
                onChange={(v) => handleNotificationChange('enquiry_email', v)}
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-neutral-900">Marketing emails</p>
                <p className="text-sm text-neutral-500">
                  Tips, offers, and medical tourism news
                </p>
              </div>
              <Toggle
                enabled={notifications.marketing_email}
                onChange={(v) => handleNotificationChange('marketing_email', v)}
              />
            </div>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-neutral-900">SMS notifications</p>
                <p className="text-sm text-neutral-500">
                  Text messages for important updates
                </p>
              </div>
              <Toggle
                enabled={notifications.sms_notifications}
                onChange={(v) => handleNotificationChange('sms_notifications', v)}
              />
            </div>

            <div className="pt-4">
              <Button variant="primary" onClick={handleSaveNotifications} disabled={isSavingNotifications}>
                {isSavingNotifications && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Preferences
              </Button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <form onSubmit={handleChangePassword} className="rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-neutral-900">Change Password</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="••••••••"
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSavingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
            >
              {isSavingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="rounded-xl border border-red-200 bg-white shadow-sm">
          <div className="border-b border-red-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
          </div>
          <div className="p-6">
            <h3 className="font-medium text-neutral-900">Delete Account</h3>
            <p className="text-sm text-neutral-500">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowDeleteModal(false)}
              />
              <m.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              >
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                  <Trash2 className="h-7 w-7 text-red-600" />
                </div>

                <h3 className="text-center text-xl font-semibold text-neutral-900">
                  Delete your account?
                </h3>
                <p className="mt-2 text-center text-neutral-600">
                  This will permanently delete your account and all your data including saved clinics and enquiries.
                  This action cannot be undone.
                </p>

                <div className="mt-6 flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Delete Account
                  </Button>
                </div>
              </m.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
