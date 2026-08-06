import { useQuery } from '@tanstack/react-query'
import { getListingById } from '../../api/listings.api'

export function useListing(id: string) {
  return useQuery({
    queryKey: ['listing', id],
    queryFn: () => getListingById(id),
    enabled: !!id,
  })
}
