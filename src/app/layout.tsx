import type { ReactNode } from 'react'

// Root layout that wraps all routes
// The actual layout with header/footer is in [locale]/layout.tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return children
}
