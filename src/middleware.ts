import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { updateSession } from '@/lib/supabase/middleware'
import { routing } from '@/i18n/routing'

// Pre-compute the set of valid locales for O(1) lookup
const VALID_LOCALES = new Set<string>(routing.locales)

const intlMiddleware = createMiddleware(routing)

export async function middleware(request: NextRequest) {
  // ── Phase 4: Guard against invalid locale prefixes ──
  // If URL starts with a two-letter segment that isn't a valid locale,
  // redirect to the canonical non-prefixed URL (301 permanent).
  // This catches /uk/*, /ca/*, /fr/*, /de/*, etc. before they generate 404s.
  const pathname = request.nextUrl.pathname
  const localeSegmentMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
  if (localeSegmentMatch) {
    const potentialLocale = localeSegmentMatch[1]
    if (!VALID_LOCALES.has(potentialLocale)) {
      // Strip the invalid locale prefix and redirect
      const cleanPath = pathname.replace(/^\/[a-z]{2}/, '') || '/'
      const url = request.nextUrl.clone()
      url.pathname = cleanPath
      return NextResponse.redirect(url, { status: 301 })
    }
  }

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

