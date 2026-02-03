'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Overview', icon: '🏠' },
  { href: '/dashboard/saved', label: 'Saved Clinics', icon: '❤️' },
  { href: '/dashboard/enquiries', label: 'My Enquiries', icon: '📋' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-neutral-200 bg-white lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-neutral-200 px-6">
          <Link href="/" className="text-xl font-bold text-primary-600">
            MediTravel
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href))

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

        {/* User Section */}
        <div className="border-t border-neutral-200 p-4">
          <div className="flex items-center gap-3 rounded-lg bg-neutral-50 p-3">
            <div className="h-10 w-10 rounded-full bg-neutral-200" />
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-neutral-900">User Name</p>
              <p className="truncate text-xs text-neutral-500">user@email.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
