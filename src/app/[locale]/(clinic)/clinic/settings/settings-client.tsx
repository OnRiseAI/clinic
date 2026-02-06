'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2, Check, AlertTriangle } from 'lucide-react'

interface NotificationSettings {
  enquiry_email: boolean
  enquiry_sms: boolean
  review_notifications: boolean
  weekly_report: boolean
  marketing_updates: boolean
}

interface SettingsClientProps {
  user: {
    id: string
    email: string
    full_name: string | null
  }
  clinic: {
    id: string
    name: string
    notification_settings: NotificationSettings | null
  }
}

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enquiry_email: true,
  enquiry_sms: false,
  review_notifications: true,
  weekly_report: true,
  marketing_updates: false,
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
          'absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform',
          enabled ? 'right-1' : 'left-1'
        )}
      />
    </button>
  )
}

export function SettingsClient({ user, clinic }: SettingsClientProps) {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Account form state
  const [accountData, setAccountData] = useState({
    email: user.email,
    fullName: user.full_name || '',
  })

  // Notification settings state
  const [notifications, setNotifications] = useState<NotificationSettings>(
    clinic.notification_settings || DEFAULT_NOTIFICATION_SETTINGS
  )

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAccountData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleSaveAccount = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const res = await fetch('/api/clinic/settings/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountData),
      })

      if (res.ok) {
        setSaveMessage({ type: 'success', text: 'Account updated successfully!' })
        router.refresh()
      } else {
        const data = await res.json()
        setSaveMessage({ type: 'error', text: data.error || 'Failed to update account' })
      }
    } catch (error) {
      console.error('Error updating account:', error)
      setSaveMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const res = await fetch(`/api/clinic/settings/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicId: clinic.id,
          notifications,
        }),
      })

      if (res.ok) {
        setSaveMessage({ type: 'success', text: 'Notification settings saved!' })
        router.refresh()
      } else {
        const data = await res.json()
        setSaveMessage({ type: 'error', text: data.error || 'Failed to save settings' })
      }
    } catch (error) {
      console.error('Error saving notifications:', error)
      setSaveMessage({ type: 'error', text: 'An error occurred' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-1 text-neutral-600">
          Manage your account and clinic settings.
        </p>
      </div>

      {saveMessage && (
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg p-4',
            saveMessage.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          )}
        >
          {saveMessage.type === 'success' ? (
            <Check className="h-5 w-5" />
          ) : (
            <AlertTriangle className="h-5 w-5" />
          )}
          {saveMessage.text}
        </div>
      )}

      {/* Account Section */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Account</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Account Email
              </label>
              <input
                type="email"
                name="email"
                value={accountData.email}
                onChange={handleAccountChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="admin@clinic.com"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Account Name
              </label>
              <input
                type="text"
                name="fullName"
                value={accountData.fullName}
                onChange={handleAccountChange}
                className="w-full rounded-lg border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Admin Name"
              />
            </div>
          </div>
          <Button variant="primary" onClick={handleSaveAccount} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Account
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Notifications</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-neutral-900">New enquiry email notifications</p>
              <p className="text-sm text-neutral-500">
                Receive an email when patients submit enquiries
              </p>
            </div>
            <Toggle
              enabled={notifications.enquiry_email}
              onChange={(v) => handleNotificationChange('enquiry_email', v)}
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-neutral-900">New enquiry SMS notifications</p>
              <p className="text-sm text-neutral-500">
                Receive an SMS when patients submit enquiries
              </p>
            </div>
            <Toggle
              enabled={notifications.enquiry_sms}
              onChange={(v) => handleNotificationChange('enquiry_sms', v)}
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-neutral-900">Review notifications</p>
              <p className="text-sm text-neutral-500">
                Get notified when patients leave reviews
              </p>
            </div>
            <Toggle
              enabled={notifications.review_notifications}
              onChange={(v) => handleNotificationChange('review_notifications', v)}
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-neutral-900">Weekly performance report</p>
              <p className="text-sm text-neutral-500">
                Summary of views, enquiries, and conversions
              </p>
            </div>
            <Toggle
              enabled={notifications.weekly_report}
              onChange={(v) => handleNotificationChange('weekly_report', v)}
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-neutral-900">Marketing updates</p>
              <p className="text-sm text-neutral-500">
                Tips and updates from MeetYourClinic
              </p>
            </div>
            <Toggle
              enabled={notifications.marketing_updates}
              onChange={(v) => handleNotificationChange('marketing_updates', v)}
            />
          </div>

          <div className="pt-4">
            <Button variant="primary" onClick={handleSaveNotifications} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Notification Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-900">Team Members</h2>
            <Button variant="outline" size="sm" disabled>
              Invite Member
            </Button>
          </div>
        </div>
        <div className="px-6 py-8 text-center">
          <p className="text-neutral-500">Only you have access to this clinic account</p>
          <p className="mt-2 text-sm text-neutral-400">
            Team member invitations coming soon
          </p>
        </div>
      </div>

      {/* Subscription */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Subscription</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Free Plan</p>
              <p className="text-sm text-neutral-500">Basic clinic listing</p>
            </div>
            <Button variant="primary" disabled>
              Upgrade Plan
            </Button>
          </div>
          <div className="mt-6 rounded-lg bg-neutral-50 p-4">
            <h4 className="font-medium text-neutral-900">Premium Features (Coming Soon)</h4>
            <ul className="mt-2 space-y-2 text-sm text-neutral-600">
              <li>• Featured placement in search results</li>
              <li>• Unlimited photos</li>
              <li>• Priority support</li>
              <li>• Advanced analytics</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-neutral-900">Security</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium text-neutral-900">Change Password</h3>
            <p className="text-sm text-neutral-500">Update your account password.</p>
            <Button variant="outline" size="sm" className="mt-3">
              Change Password
            </Button>
          </div>
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="font-medium text-neutral-900">Two-Factor Authentication</h3>
            <p className="text-sm text-neutral-500">Add an extra layer of security.</p>
            <Button variant="outline" size="sm" className="mt-3" disabled>
              Enable 2FA (Coming Soon)
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-white shadow-sm">
        <div className="border-b border-red-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        </div>
        <div className="p-6">
          <h3 className="font-medium text-neutral-900">Delete Clinic Account</h3>
          <p className="text-sm text-neutral-500">
            Permanently delete your clinic listing and all associated data.
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  )
}
