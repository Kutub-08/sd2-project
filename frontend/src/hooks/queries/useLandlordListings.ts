import { useQuery } from '@tanstack/react-query'
import { getLandlordListings } from '../../api/listings.api'

export function useLandlordListings(landlordId: string) {
  return useQuery({
    queryKey: ['listings', 'landlord', landlordId],
    queryFn: () => getLandlordListings(landlordId),
    enabled: !!landlordId,
  })
}
