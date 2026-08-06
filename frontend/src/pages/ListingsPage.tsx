import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useListings } from '../hooks/queries/useListings'
import { useListingFilters } from '../utils/queryParams'
import FilterPanel from '../components/listings/FilterPanel'
import ListingCard from '../components/listings/ListingCard'
import SortDropdown from '../components/listings/SortDropdown'
import Pagination from '../components/ui/Pagination'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function ListingSkeletons() {
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

export default function ListingsPage() {
  const { filters, setFilters } = useListingFilters()
  const { data, isLoading, isFetching } = useListings(filters)

  const listings = data?.items ?? []
  const totalPages = data?.totalPages ?? 1

  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  return (
    <div className="min-h-screen bg-black px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Listings</h1>
          <SortDropdown
            sort={filters.sort}
            onChange={(sort) => setFilters({ sort, page: 1 })}
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 lg:w-64">
            <FilterPanel
              filters={filters}
              onApply={(patch) => setFilters(patch)}
              onReset={() => setFilters({
                minPrice: undefined,
                maxPrice: undefined,
                minBedrooms: undefined,
                minBathrooms: undefined,
                area: undefined,
                city: undefined,
                sort: 'newest',
                page: 1,
              })}
            />
          </aside>

          <main className="flex-1">
            {isLoading ? (
              <ListingSkeletons />
            ) : listings.length === 0 ? (
              <EmptyState
                title="No listings match your filters"
                description="Try adjusting your search criteria"
              />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filterKey}
                    variants={gridVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity ${isFetching ? 'opacity-70' : 'opacity-100'}`}
                  >
                    {listings.map((listing) => (
                      <motion.div key={listing.id} variants={cardVariants}>
                        <ListingCard listing={listing} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6">
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
