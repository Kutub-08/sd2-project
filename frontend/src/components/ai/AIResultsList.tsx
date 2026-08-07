import { Sparkles, BadgeCheck, Wallet, MapPin, DoorOpen } from 'lucide-react'
import ListingGrid from '../listings/ListingGrid'
import Skeleton from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'
import type { Listing } from '../../types/listing.types'
import type { RecommendResult } from '../../api/ai.api'

type Props = {
  results: Listing[]
  total: number
  usedFallback: boolean
  isLoading: boolean
  query: string
  parsedFilters?: RecommendResult['parsedFilters']
}

function ResultSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ))}
    </div>
  )
}

function FilterChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
      {icon}
      {label}
    </span>
  )
}

function ParsedChips({ parsedFilters }: { parsedFilters?: RecommendResult['parsedFilters'] }) {
  const chips: { icon: React.ReactNode; label: string }[] = []
  if (!parsedFilters) return null
  if (parsedFilters.maxPrice !== undefined)
    chips.push({ icon: <Wallet className="h-3.5 w-3.5" />, label: `max ৳${parsedFilters.maxPrice.toLocaleString()}/mo` })
  if (parsedFilters.minBedrooms !== undefined)
    chips.push({ icon: <DoorOpen className="h-3.5 w-3.5" />, label: `${parsedFilters.minBedrooms} bedrooms` })
  if (parsedFilters.area) chips.push({ icon: <MapPin className="h-3.5 w-3.5" />, label: parsedFilters.area })
  if (parsedFilters.amenities?.length)
    chips.push({ icon: <BadgeCheck className="h-3.5 w-3.5" />, label: parsedFilters.amenities.join(', ') })

  if (chips.length === 0) return null

  return (
    <div className="mb-4">
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-teal">
        <Sparkles className="h-3.5 w-3.5" />
        Understood as
      </p>
      <div className="flex flex-wrap gap-2">
        {chips.map((c, i) => (
          <FilterChip key={i} icon={c.icon} label={c.label} />
        ))}
      </div>
    </div>
  )
}

export default function AIResultsList({ results, total, usedFallback, isLoading, query, parsedFilters }: Props) {
  if (isLoading) {
    return (
      <div>
        <div className="mb-4">
          <Skeleton className="h-5 w-48" />
        </div>
        <ResultSkeletons />
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <EmptyState
        icon={<Sparkles className="h-10 w-10" />}
        title="No flats matched that"
        description="Try a different search, like “2 bed flat under 15k near Bashundhara”"
      />
    )
  }

  return (
    <div>
      <ParsedChips parsedFilters={parsedFilters} />
      <div className="mb-4 flex items-center gap-3">
        <p className="text-sm text-mist">
          Found {total} result{total !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
        {usedFallback ? (
          <span className="inline-flex items-center rounded-full border border-amberglow/30 bg-amberglow/10 px-2.5 py-0.5 text-xs text-amberglow">
            Keyword results
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-2.5 py-0.5 text-xs text-teal">
            AI matched
          </span>
        )}
      </div>
      <ListingGrid listings={results} />
    </div>
  )
}