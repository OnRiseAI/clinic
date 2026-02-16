import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Meet Your Clinic — Find Accredited Clinics Worldwide'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0F1B2D 0%, #1a2a42 60%, #2A7A6E 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Decorative circle */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(198, 169, 108, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(42, 122, 110, 0.1)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            padding: '0 80px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #C6A96C, #b08f4f)',
              marginBottom: 8,
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Meet Your Clinic
          </div>

          <div
            style={{
              fontSize: 24,
              color: '#C6A96C',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase' as const,
            }}
          >
            Find Accredited Clinics Worldwide
          </div>

          <div
            style={{
              fontSize: 20,
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: 700,
              lineHeight: 1.5,
            }}
          >
            Compare 1,000+ clinics across 20+ countries. Verified reviews, transparent pricing, direct booking.
          </div>

          {/* Stats bar */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 16,
              padding: '16px 32px',
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {[
              { value: '1,000+', label: 'Clinics' },
              { value: '20+', label: 'Countries' },
              { value: '50K+', label: 'Patients' },
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>{stat.value}</span>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' as const, letterSpacing: '0.1em' }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #C6A96C, #2A7A6E)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
