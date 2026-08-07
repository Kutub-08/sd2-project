import { TrendingUp, Wallet, MapPin, Sparkles } from 'lucide-react'
import ListingGrid from '../listings/ListingGrid'
import Skeleton from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'
import { formatCurrency } from '../../utils/formatCurrency'
import type { AreaPriceResult } from '../../api/ai.api'

type Props = {
  data: AreaPriceResult | null
  isLoading: boolean
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-soft p-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist">{label}</p>
      <p className="mt-1.5 text-xl font-semibold text-paper">{value}</p>
    </div>
  )
}

export default function AreaPriceResult({ data, isLoading }: Props) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-24 rounded-2xl" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="space-y-2 p-3">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!data || data.summary.count === 0) {
    return (
      <EmptyState
        icon={<MapPin className="h-10 w-10" />}
        title="No flats found for that area"
        description="Try a different area name, like “flats in Khulshi” or “Panchlaish”"
      />
    )
  }

  const { summary, cheapest, bestReviewed, insight } = data

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-teal">
          <MapPin className="h-3.5 w-3.5" />
          Current rents in {summary.count > 0 ? data.area : 'that area'}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Available" value={String(summary.count)} />
          <StatCard label="Cheapest" value={summary.minPrice !== null ? formatCurrency(summary.minPrice) : '—'} />
          <StatCard label="Average" value={summary.avgPrice !== null ? formatCurrency(Math.round(summary.avgPrice)) : '—'} />
          <StatCard label="Highest" value={summary.maxPrice !== null ? formatCurrency(summary.maxPrice) : '—'} />
        </div>
      </div>

      {insight && (
        <div className="flex gap-3 rounded-2xl border border-teal/30 bg-teal/10 p-4">
          <Sparkles className="h-5 w-5 shrink-0 text-teal" />
          <p className="text-sm leading-relaxed text-paper">{insight}</p>
        </div>
      )}

      {cheapest.length > 0 && (
        <div>
          <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-teal">
            <Wallet className="h-3.5 w-3.5" />
            Cheapest flats
          </p>
          <ListingGrid listings={cheapest} />
        </div>
      )}

      {bestReviewed.length > 0 && (
        <div>
          <p className="mb-3 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-teal">
            <TrendingUp className="h-3.5 w-3.5" />
            Best reviewed
          </p>
          <ListingGrid listings={bestReviewed} />
        </div>
      )}
    </div>
  )
}
