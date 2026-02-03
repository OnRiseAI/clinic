import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { updateSession } from '@/lib/supabase/middleware'
import { routing } from '@/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // First, handle Supabase session
  const response = await updateSession(request)

  // If Supabase middleware returned a redirect, use that
  if (response.status !== 200) {
    return response
  }

  // Then handle internationalization
  return intlMiddleware(request)
}

export const config = {
  matcher: [
    // Match all pathnames except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
