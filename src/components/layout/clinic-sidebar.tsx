'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/clinic', label: 'Dashboard', icon: '📊' },
  { href: '/clinic/profile', label: 'Clinic Profile', icon: '🏥' },
  { href: '/clinic/doctors', label: 'Doctors', icon: '👨‍⚕️' },
  { href: '/clinic/enquiries', label: 'Enquiries', icon: '📬' },
  { href: '/clinic/reviews', label: 'Reviews', icon: '⭐' },
  { href: '/clinic/settings', label: 'Settings', icon: '⚙️' },
]

export function ClinicSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <Link href="/" className="text-xl font-bold text-primary-600">
            MeetYourClinic
          </Link>
          <span className="ml-2 rounded bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">
            Clinic
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/clinic' && pathname.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <div className="border-t border-neutral-200 p-4">
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs font-medium text-neutral-500">New Enquiries</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">0</p>
          </div>
        </div>

        {/* Clinic Section */}
        <div className="border-t border-neutral-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-neutral-50 p-3">
            <div className="h-10 w-10 rounded-lg bg-neutral-200" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-neutral-900">Clinic Name</p>
              <p className="truncate text-xs text-neutral-500">View public profile</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
