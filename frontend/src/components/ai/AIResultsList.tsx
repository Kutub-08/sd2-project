import ListingGrid from '../listings/ListingGrid'
import Skeleton from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'
import type { Listing } from '../../types/listing.types'

type Props = {
  results: Listing[]
  total: number
  usedFallback: boolean
  isLoading: boolean
  query: string
}

function ResultSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AIResultsList({ results, total, usedFallback, isLoading, query }: Props) {
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
        title="No results found"
        description="Try a different search query"
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <p className="text-sm text-white/60">
          Found {total} result{total !== 1 ? 's' : ''} for &quot;{query}&quot;
        </p>
        {usedFallback && (
          <span className="inline-flex items-center rounded-full bg-yellow-500/20 px-2.5 py-0.5 text-xs text-yellow-400 backdrop-blur-sm">
            Keyword results
          </span>
        )}
      </div>
      <ListingGrid listings={results} />
    </div>
  )
}
