import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { ClaimFlow } from '@/components/clinic/claim-flow'
import { getClinicByClaimToken } from '@/lib/data/clinic-dashboard'

interface ClaimPageProps {
  params: Promise<{ locale: string; token: string }>
}

export async function generateMetadata() {
  return {
    title: 'Claim Your Clinic - MediTravel',
    description: 'Take ownership of your clinic profile on MediTravel',
  }
}

export default async function ClaimPage({ params }: ClaimPageProps) {
  const { locale, token } = await params
  setRequestLocale(locale)

  // Fetch clinic by claim token
  const clinic = await getClinicByClaimToken(token)

  // Check if token is valid and clinic is not already claimed
  const isValidToken = clinic && !clinic.claimed

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      {isValidToken ? (
        <div>
          <div className="mb-8 text-center">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              MediTravel
            </Link>
            <h1 className="mt-6 text-3xl font-bold text-neutral-900">Claim Your Clinic</h1>
            <p className="mt-2 text-neutral-600">
              Take ownership of your clinic profile and start receiving patient enquiries.
            </p>
          </div>

          <ClaimFlow
            clinic={{
              id: clinic.id,
              name: clinic.name,
              address: clinic.address,
              city: clinic.city,
              country: clinic.country,
              email: clinic.email,
              phone: clinic.phone,
            }}
            token={token}
          />

          <p className="mt-6 text-center text-sm text-neutral-500">
            Need help?{' '}
            <Link href="/contact" className="font-medium text-primary-600 hover:text-primary-700">
              Contact our team
            </Link>
          </p>
        </div>
      ) : clinic?.claimed ? (
        <div className="w-full max-w-md text-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            MediTravel
          </Link>
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-3xl">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Already Claimed</h1>
            <p className="mt-4 text-neutral-600">
              This clinic has already been claimed. If you believe this is an error, please contact
              support.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/auth/signin">
                <Button variant="primary" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md text-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            MediTravel
          </Link>
          <div className="mt-8 rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-neutral-900">Invalid or Expired Link</h1>
            <p className="mt-4 text-neutral-600">
              This claim link is no longer valid. It may have expired or the clinic may not exist.
            </p>
            <div className="mt-6">
              <Link href="/contact">
                <Button variant="primary">Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
