import { useQuery } from '@tanstack/react-query'
import { getListings } from '../../api/listings.api'
import type { ListingFilters } from '../../types/listing.types'

export function useListings(filters: ListingFilters = {}) {
  return useQuery({
    queryKey: ['listings', filters],
    queryFn: () => getListings(filters),
  })
}
