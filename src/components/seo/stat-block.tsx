'use client'

import { cn } from '@/lib/utils'

interface StatBlockProps {
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
}

/**
 * StatBlock - GEO-optimised statistic display
 *
 * Renders key statistics in a format AI models can easily extract and cite.
 * Uses semantic HTML and ARIA labels for accessibility.
 */
export function StatBlock({
  label,
  value,
  prefix,
  suffix,
  trend,
  trendValue,
  className,
}: StatBlockProps) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString() : value

  return (
    <div
      className={cn(
        'stat-block flex flex-col items-center p-3 sm:p-4 bg-white rounded-lg border border-neutral-200 text-center',
        className
      )}
      role="group"
      aria-label={`${label}: ${prefix || ''}${formattedValue}${suffix || ''}`}
    >
      <span className="text-xs sm:text-sm text-neutral-600 mb-1">{label}</span>
      <span className="text-xl sm:text-2xl font-bold text-primary-900">
        {prefix}
        {formattedValue}
        {suffix}
      </span>
      {trend && trendValue && (
        <span
          className={cn(
            'text-xs mt-1',
            trend === 'up' && 'text-green-600',
            trend === 'down' && 'text-red-600',
            trend === 'neutral' && 'text-neutral-500'
          )}
        >
          {trend === 'up' && '↑'}
          {trend === 'down' && '↓'}
          {trendValue}
        </span>
      )}
    </div>
  )
}

interface StatGridProps {
  stats: StatBlockProps[]
  columns?: 2 | 3 | 4
  className?: string
}

/**
 * StatGrid - Display multiple stats in a responsive grid
 */
export function StatGrid({ stats, columns = 4, className }: StatGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div
      className={cn('grid gap-4', gridCols[columns], className)}
      role="region"
      aria-label="Key statistics"
    >
      {stats.map((stat, index) => (
        <StatBlock key={index} {...stat} />
      ))}
    </div>
  )
}

// =============================================================================
// PREBUILT STAT GENERATORS
// =============================================================================

interface ProcedureStatsData {
  minPrice: number
  maxPrice: number
  ukPrice: number
  clinicCount: number
  countryCount: number
  currency?: string
}

export function generateProcedureStats(data: ProcedureStatsData): StatBlockProps[] {
  const symbol = data.currency === 'EUR' || !data.currency ? '€' : data.currency
  const savings = Math.round(((data.ukPrice - data.minPrice) / data.ukPrice) * 100)

  return [
    {
      label: 'Starting from',
      value: data.minPrice,
      prefix: symbol,
    },
    {
      label: 'UK price',
      value: data.ukPrice,
      prefix: '£',
    },
    {
      label: 'Save up to',
      value: savings,
      suffix: '%',
    },
    {
      label: 'Clinics available',
      value: data.clinicCount,
    },
  ]
}

interface ClinicStatsData {
  rating: number | null
  reviewCount: number | null
  procedureCount: number
  doctorCount: number
  yearEstablished: number | null
}

export function generateClinicStats(data: ClinicStatsData): StatBlockProps[] {
  const stats: StatBlockProps[] = []

  if (data.rating && data.reviewCount) {
    stats.push({
      label: 'Patient rating',
      value: data.rating.toFixed(1),
      suffix: '/5',
    })
    stats.push({
      label: 'Reviews',
      value: data.reviewCount,
    })
  }

  stats.push({
    label: 'Procedures',
    value: data.procedureCount,
  })

  if (data.doctorCount > 0) {
    stats.push({
      label: 'Doctors',
      value: data.doctorCount,
    })
  }

  if (data.yearEstablished) {
    const yearsActive = new Date().getFullYear() - data.yearEstablished
    stats.push({
      label: 'Years experience',
      value: yearsActive,
      suffix: '+',
    })
  }

  return stats.slice(0, 4)
}

interface DestinationStatsData {
  clinicCount: number
  procedureCount: number
  avgSavings: number
  avgRating: number | null
}

export function generateDestinationStats(data: DestinationStatsData): StatBlockProps[] {
  const stats: StatBlockProps[] = [
    {
      label: 'Accredited clinics',
      value: data.clinicCount,
    },
    {
      label: 'Procedures available',
      value: data.procedureCount,
    },
    {
      label: 'Average savings',
      value: data.avgSavings,
      suffix: '%',
    },
  ]

  if (data.avgRating) {
    stats.push({
      label: 'Average rating',
      value: data.avgRating.toFixed(1),
      suffix: '/5',
    })
  }

  return stats
}
