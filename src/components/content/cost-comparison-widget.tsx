'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { CostComparisonData } from '@/lib/data/content'

interface CostComparisonWidgetProps {
  data: CostComparisonData[]
  procedureSlug?: string
  title?: string
  className?: string
}

type SortKey = 'country' | 'avg_cost' | 'savings_vs_uk' | 'savings_vs_us' | 'clinic_count'
type ViewMode = 'table' | 'chart'

const COUNTRY_FLAGS: Record<string, string> = {
  TR: '🇹🇷',
  ES: '🇪🇸',
  TH: '🇹🇭',
  MX: '🇲🇽',
  HU: '🇭🇺',
  PL: '🇵🇱',
  CZ: '🇨🇿',
  IN: '🇮🇳',
  BR: '🇧🇷',
  CO: '🇨🇴',
  CR: '🇨🇷',
  MY: '🇲🇾',
  AE: '🇦🇪',
  GB: '🇬🇧',
  US: '🇺🇸',
  DE: '🇩🇪',
  PT: '🇵🇹',
  GR: '🇬🇷',
}

function formatCurrency(amount: number, currency: string = 'EUR'): string {
  const symbols: Record<string, string> = {
    EUR: '€',
    USD: '$',
    GBP: '£',
    THB: '฿',
  }
  return `${symbols[currency] || currency}${amount.toLocaleString()}`
}

function getSavingsColor(savings: number): string {
  if (savings >= 60) return 'text-green-600 bg-green-50'
  if (savings >= 40) return 'text-green-500 bg-green-50'
  if (savings >= 20) return 'text-yellow-600 bg-yellow-50'
  return 'text-neutral-500 bg-neutral-50'
}

function getBarColor(savings: number): string {
  if (savings >= 60) return 'bg-green-500'
  if (savings >= 40) return 'bg-green-400'
  if (savings >= 20) return 'bg-yellow-400'
  return 'bg-neutral-300'
}

export function CostComparisonWidget({
  data,
  procedureSlug,
  title = 'Cost Comparison by Country',
  className,
}: CostComparisonWidgetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [sortKey, setSortKey] = useState<SortKey>('avg_cost')
  const [sortAsc, setSortAsc] = useState(true)

  if (data.length === 0) {
    return (
      <div className={cn('rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center', className)}>
        <p className="text-neutral-500">Cost comparison data not yet available.</p>
      </div>
    )
  }

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    let comparison = 0
    switch (sortKey) {
      case 'country':
        comparison = a.country.localeCompare(b.country)
        break
      case 'avg_cost':
        comparison = a.avg_cost - b.avg_cost
        break
      case 'savings_vs_uk':
        comparison = a.savings_vs_uk - b.savings_vs_uk
        break
      case 'savings_vs_us':
        comparison = a.savings_vs_us - b.savings_vs_us
        break
      case 'clinic_count':
        comparison = a.clinic_count - b.clinic_count
        break
    }
    return sortAsc ? comparison : -comparison
  })

  const maxCost = Math.max(...data.map((d) => d.avg_cost))

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortAsc(!sortAsc)
    } else {
      setSortKey(key)
      setSortAsc(key === 'avg_cost')
    }
  }

  const SortIcon = ({ active, asc }: { active: boolean; asc: boolean }) => (
    <span className={cn('ml-1 inline-block transition-opacity', active ? 'opacity-100' : 'opacity-30')}>
      {asc ? '↑' : '↓'}
    </span>
  )

  return (
    <div className={cn('rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden', className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>

        {/* View Toggle */}
        <div className="flex rounded-lg border border-neutral-200 p-1">
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'table' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              viewMode === 'chart' ? 'bg-primary-100 text-primary-700' : 'text-neutral-600 hover:text-neutral-900'
            )}
          >
            Chart
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'table' ? (
          <m.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50 text-left">
                  <th className="p-4">
                    <button
                      onClick={() => handleSort('country')}
                      className="flex items-center font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      Country
                      <SortIcon active={sortKey === 'country'} asc={sortAsc} />
                    </button>
                  </th>
                  <th className="p-4">
                    <button
                      onClick={() => handleSort('avg_cost')}
                      className="flex items-center font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      Avg. Cost
                      <SortIcon active={sortKey === 'avg_cost'} asc={sortAsc} />
                    </button>
                  </th>
                  <th className="p-4">
                    <button
                      onClick={() => handleSort('savings_vs_uk')}
                      className="flex items-center font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      vs UK
                      <SortIcon active={sortKey === 'savings_vs_uk'} asc={sortAsc} />
                    </button>
                  </th>
                  <th className="p-4">
                    <button
                      onClick={() => handleSort('savings_vs_us')}
                      className="flex items-center font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      vs US
                      <SortIcon active={sortKey === 'savings_vs_us'} asc={sortAsc} />
                    </button>
                  </th>
                  <th className="p-4">
                    <button
                      onClick={() => handleSort('clinic_count')}
                      className="flex items-center font-semibold text-neutral-700 hover:text-neutral-900"
                    >
                      Clinics
                      <SortIcon active={sortKey === 'clinic_count'} asc={sortAsc} />
                    </button>
                  </th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <m.tr
                    key={row.country}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-neutral-100 transition-colors hover:bg-neutral-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{COUNTRY_FLAGS[row.country_code] || '🌍'}</span>
                        <span className="font-medium text-neutral-900">{row.country}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-neutral-900">
                        {formatCurrency(row.avg_cost, row.currency)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-sm font-medium', getSavingsColor(row.savings_vs_uk))}>
                        {row.savings_vs_uk > 0 ? `Save ${row.savings_vs_uk}%` : '-'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={cn('rounded-full px-2.5 py-1 text-sm font-medium', getSavingsColor(row.savings_vs_us))}>
                        {row.savings_vs_us > 0 ? `Save ${row.savings_vs_us}%` : '-'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-neutral-600">{row.clinic_count}</span>
                    </td>
                    <td className="p-4">
                      {procedureSlug ? (
                        <Link href={`/destinations/${row.country.toLowerCase().replace(/\s+/g, '-')}/${procedureSlug}`}>
                          <Button variant="ghost" size="sm">
                            View Clinics →
                          </Button>
                        </Link>
                      ) : (
                        <Link href={`/destinations/${row.country.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button variant="ghost" size="sm">
                            View →
                          </Button>
                        </Link>
                      )}
                    </td>
                  </m.tr>
                ))}
              </tbody>
            </table>
          </m.div>
        ) : (
          <m.div
            key="chart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4 sm:p-6"
          >
            <div className="space-y-4">
              {sortedData.map((row, index) => (
                <m.div
                  key={row.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{COUNTRY_FLAGS[row.country_code] || '🌍'}</span>
                      <span className="font-medium text-neutral-900">{row.country}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-neutral-900">
                        {formatCurrency(row.avg_cost, row.currency)}
                      </span>
                      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', getSavingsColor(row.savings_vs_uk))}>
                        -{row.savings_vs_uk}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-8 overflow-hidden rounded-lg bg-neutral-100">
                    <m.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(row.avg_cost / maxCost) * 100}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                      className={cn('h-full rounded-lg', getBarColor(row.savings_vs_uk))}
                    />
                    {procedureSlug && (
                      <Link
                        href={`/destinations/${row.country.toLowerCase().replace(/\s+/g, '-')}/${procedureSlug}`}
                        className="absolute inset-0 flex items-center justify-end pr-3 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <span className="rounded bg-white/90 px-2 py-1 text-xs font-medium text-primary-600 shadow">
                          View Clinics →
                        </span>
                      </Link>
                    )}
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Disclaimer */}
      <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3 sm:px-6">
        <p className="text-xs text-neutral-500">
          Prices are average estimates based on available data and may vary by clinic. Savings calculated vs UK/US average costs.
        </p>
      </div>
    </div>
  )
}

// Simplified version for destination pages
export function DestinationCostTable({
  data,
  className,
}: {
  data: Array<{ procedure: string; local_cost: number; uk_cost: number; us_cost: number; savings: number }>
  className?: string
}) {
  if (data.length === 0) {
    return (
      <div className={cn('rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center', className)}>
        <p className="text-neutral-500">Cost comparison data not yet available.</p>
      </div>
    )
  }

  return (
    <div className={cn('rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50 text-left">
              <th className="p-4 font-semibold text-neutral-700">Procedure</th>
              <th className="p-4 font-semibold text-neutral-700">Here</th>
              <th className="p-4 font-semibold text-neutral-700">UK</th>
              <th className="p-4 font-semibold text-neutral-700">US</th>
              <th className="p-4 font-semibold text-neutral-700">Savings</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <m.tr
                key={row.procedure}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-neutral-100"
              >
                <td className="p-4 font-medium text-neutral-900">{row.procedure}</td>
                <td className="p-4 font-semibold text-primary-600">
                  {formatCurrency(row.local_cost)}
                </td>
                <td className="p-4 text-neutral-400 line-through">
                  {formatCurrency(row.uk_cost, 'GBP')}
                </td>
                <td className="p-4 text-neutral-400 line-through">
                  {formatCurrency(row.us_cost, 'USD')}
                </td>
                <td className="p-4">
                  <span className={cn('rounded-full px-2.5 py-1 text-sm font-medium', getSavingsColor(row.savings))}>
                    Save {row.savings}%
                  </span>
                </td>
              </m.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-neutral-100 bg-neutral-50 px-4 py-3">
        <p className="text-xs text-neutral-500">
          Prices are average estimates and may vary by clinic.
        </p>
      </div>
    </div>
  )
}
