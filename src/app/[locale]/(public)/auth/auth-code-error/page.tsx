import { setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface AuthCodeErrorPageProps {
    params: Promise<{ locale: string }>
}

export async function generateMetadata() {
    return {
        title: 'Authentication Error - MeetYourClinic',
    }
}

export default async function AuthCodeErrorPage({ params }: AuthCodeErrorPageProps) {
    const { locale } = await params
    setRequestLocale(locale)

    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-md text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                    Authentication Error
                </h1>
                <p className="mt-4 text-lg text-neutral-600">
                    There was a problem verifying your account or the login link has expired. Please try signing in again, or request a new magic link.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                    <Link href="/auth/signin">
                        <Button variant="primary" className="w-full sm:w-auto">
                            Return to Sign In
                        </Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button variant="outline" className="w-full sm:w-auto">
                            Create an Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
