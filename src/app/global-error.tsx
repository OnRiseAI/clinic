'use client'

import { useEffect } from 'react'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            fontFamily: 'system-ui, sans-serif',
            background: 'linear-gradient(to bottom right, #fef2f2, #fff7ed)',
          }}
        >
          <div style={{ maxWidth: '28rem', textAlign: 'center' }}>
            <div
              style={{
                width: '5rem',
                height: '5rem',
                borderRadius: '50%',
                background: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem',
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#171717',
                marginBottom: '0.75rem',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                color: '#525252',
                marginBottom: '2rem',
              }}
            >
              We encountered a critical error. Please try refreshing the page.
            </p>

            {error.digest && (
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#a3a3a3',
                  marginBottom: '1.5rem',
                }}
              >
                Error ID: {error.digest}
              </p>
            )}

            <button
              onClick={reset}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.25rem',
                background: '#0066cc',
                color: 'white',
                fontWeight: '500',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
