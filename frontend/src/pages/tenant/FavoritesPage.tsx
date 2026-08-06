import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useToggleFavorite } from '../../hooks/mutations/useToggleFavorite'
import { useFavorites } from '../../hooks/queries/useFavorites'
import ListingCard from '../../components/listings/ListingCard'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import EmptyState from '../../components/ui/EmptyState'

function FavoriteSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg border bg-white">
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

export default function FavoritesPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useFavorites(page, 20)
  const toggleFavorite = useToggleFavorite()

  const favoriteMap = useMemo(() => {
    const map = new Map<string, string>()
    if (data?.items) {
      for (const fav of data.items) {
        map.set(fav.listingId, fav.id)
      }
    }
    return map
  }, [data])

  function handleToggle(listingId: string) {
    const favId = favoriteMap.get(listingId)
    toggleFavorite.mutate({
      listingId,
      isFavorited: !!favId,
      favoriteId: favId,
    })
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">Failed to load favorites</p>
        <Link to="/" className="mt-4 text-sm text-blue-600 underline">Go home</Link>
      </div>
    )
  }

  const listings = data?.items.map((fav) => fav.listing) ?? []

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Favorites</h1>

      {isLoading ? (
        <FavoriteSkeletons />
      ) : listings.length === 0 ? (
        <EmptyState
          title="No saved listings yet"
          description="Save your favorite listings to find them quickly later"
          actionLabel="Browse listings"
          actionTo="/listings"
        />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                isFavorited={favoriteMap.has(listing.id)}
                onToggleFavorite={handleToggle}
              />
            ))}
          </div>
          {data && (
            <div className="mt-6">
              <Pagination
                currentPage={data.page}
                totalPages={data.totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
