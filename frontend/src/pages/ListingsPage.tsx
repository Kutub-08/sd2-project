import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, MapPin, Map as MapIcon } from 'lucide-react'
import { useListings } from '../hooks/queries/useListings'
import { useListingFilters } from '../utils/queryParams'
import { useFavoriteIds } from '../hooks/queries/useFavoriteIds'
import { useToggleFavorite } from '../hooks/mutations/useToggleFavorite'
import FilterPanel from '../components/listings/FilterPanel'
import ListingCard from '../components/listings/ListingCard'
import SortDropdown from '../components/listings/SortDropdown'
import Pagination from '../components/ui/Pagination'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

const gridVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function ListingSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-ink-soft">
          <Skeleton className="aspect-[4/3] w-full rounded-none" />
          <div className="space-y-2 p-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

function MapView({ listings }: { listings: NonNullable<ReturnType<typeof useListings>['data']>['items'] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (listings.length === 0) {
    return (
      <EmptyState
        icon={<MapPin className="h-10 w-10" />}
        title="No flats to show on the map"
        description="Adjust your filters to see flats pinned by location"
      />
    )
  }

  const selected = listings.find((l) => l.id === selectedId) ?? listings[0]
  const lat = Number(selected.latitude ?? 23.8103)
  const lng = Number(selected.longitude ?? 90.4125)
  const margin = 0.02
  const bbox = `${lng - margin},${lat - margin},${lng + margin},${lat + margin}`

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div className="no-scrollbar overflow-hidden rounded-2xl border border-white/10">
        <iframe
          title="Map of available flats"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`}
          className="h-[60vh] w-full border-0 bg-ink"
          loading="lazy"
        />
      </div>
      <div className="no-scrollbar max-h-[60vh] space-y-2 overflow-y-auto pr-1">
        {listings.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelectedId(l.id)}
            className={`flex w-full items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
              l.id === selected.id
                ? 'border-teal/50 bg-teal/10'
                : 'border-white/10 bg-ink-soft hover:border-white/30'
            }`}
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-paper">{l.title}</p>
              <p className="text-xs text-mist">
                {l.area}, {l.city}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ListingsPage() {
  const { filters, setFilters } = useListingFilters()
  const { data, isLoading, isFetching } = useListings(filters)
  const { ids: favoriteIds, map: favoriteMap, enabled: favoritesEnabled } = useFavoriteIds()
  const toggleFavorite = useToggleFavorite()
  const [view, setView] = useState<'grid' | 'map'>('grid')

  const listings = data?.items ?? []
  const totalPages = data?.totalPages ?? 1
  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  function handleToggleFavorite(listingId: string) {
    toggleFavorite.mutate({
      listingId,
      isFavorited: favoriteIds.has(listingId),
      favoriteId: favoriteMap.get(listingId),
    })
  }

  const toggleClass = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
      active ? 'bg-teal font-semibold text-ink-deep' : 'text-mist hover:bg-white/5 hover:text-paper'
    }`

  return (
    <div className="min-h-screen bg-ink px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.3em] text-teal">
              Browse flats
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-paper sm:text-3xl">
              Available flats in Bangladesh
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-white/10 bg-ink-soft p-1">
              <button onClick={() => setView('grid')} className={toggleClass(view === 'grid')} aria-pressed={view === 'grid'}>
                <LayoutGrid className="h-4 w-4" />
                Grid
              </button>
              <button onClick={() => setView('map')} className={toggleClass(view === 'map')} aria-pressed={view === 'map'}>
                <MapIcon className="h-4 w-4" />
                Map
              </button>
            </div>
            <SortDropdown sort={filters.sort} onChange={(sort) => setFilters({ sort, page: 1 })} />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <FilterPanel
              filters={filters}
              onApply={(patch) => setFilters(patch)}
              onReset={() =>
                setFilters({
                  minPrice: undefined,
                  maxPrice: undefined,
                  minBedrooms: undefined,
                  minBathrooms: undefined,
                  area: undefined,
                  city: undefined,
                  sort: 'newest',
                  page: 1,
                })
              }
            />
          </aside>

          <main className="flex-1">
            {isLoading ? (
              <ListingSkeletons />
            ) : listings.length === 0 ? (
              <EmptyState
                icon={<MapPin className="h-10 w-10" />}
                title="No flats match your filters"
                description="Try widening the price range or clearing a filter"
                actionLabel="Clear filters"
                onAction={() =>
                  setFilters({ minPrice: undefined, maxPrice: undefined, minBedrooms: undefined, minBathrooms: undefined, area: undefined, city: undefined, sort: 'newest', page: 1 })
                }
              />
            ) : view === 'map' ? (
              <MapView listings={listings} />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filterKey}
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity ${
                      isFetching ? 'opacity-70' : 'opacity-100'
                    }`}
                  >
                    {listings.map((listing) => (
                      <motion.div key={listing.id} variants={cardVariants}>
                        <ListingCard
                          listing={listing}
                          isFavorited={favoriteIds.has(listing.id)}
                          onToggleFavorite={favoritesEnabled ? handleToggleFavorite : undefined}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-8">
                  <Pagination
                    currentPage={filters.page ?? 1}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setFilters({ page })
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}