import { useQuery } from '@tanstack/react-query'
import { getReviewByListing } from '../../api/reviews.api'

export function useReviews(listingId: string) {
  return useQuery({
    queryKey: ['reviews', listingId],
    queryFn: () => getReviewByListing(listingId),
    enabled: !!listingId,
  })
}