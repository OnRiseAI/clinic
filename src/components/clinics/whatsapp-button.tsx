'use client'

import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phone: string
  clinicName: string
  message?: string
  variant?: 'primary' | 'outline' | 'icon'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-numeric characters except leading +
  return phone.replace(/[^\d]/g, '')
}

export function WhatsAppButton({
  phone,
  clinicName,
  message,
  variant = 'primary',
  size = 'md',
  className,
}: WhatsAppButtonProps) {
  const formattedPhone = formatPhoneForWhatsApp(phone)
  const defaultMessage = message || `Hi! I'm interested in learning more about treatments at ${clinicName}. I found you on MeetYourClinic.`
  const encodedMessage = encodeURIComponent(defaultMessage)
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'

  const variants = {
    primary:
      'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    outline:
      'border-2 border-green-500 text-green-600 hover:bg-green-50 active:bg-green-100',
    icon: 'rounded-full bg-green-500 text-white hover:bg-green-600 active:bg-green-700 p-0',
  }

  const sizes = {
    sm: variant === 'icon' ? 'h-9 w-9' : 'h-9 px-4 text-sm rounded-lg',
    md: variant === 'icon' ? 'h-11 w-11' : 'h-11 px-6 text-sm rounded-lg',
    lg: variant === 'icon' ? 'h-14 w-14' : 'h-14 px-8 text-base rounded-xl',
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      aria-label={`Chat on WhatsApp with ${clinicName}`}
    >
      <WhatsAppIcon className={cn(
        variant === 'icon' ? 'h-5 w-5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
      )} />
      {variant !== 'icon' && <span>WhatsApp</span>}
    </a>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// Floating WhatsApp button for mobile
export function WhatsAppFloatingButton({
  phone,
  clinicName,
}: {
  phone: string
  clinicName: string
}) {
  const formattedPhone = formatPhoneForWhatsApp(phone)
  const message = `Hi! I'm interested in learning more about treatments at ${clinicName}. I found you on MeetYourClinic.`
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600 lg:hidden"
      aria-label={`Chat on WhatsApp with ${clinicName}`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  )
}
