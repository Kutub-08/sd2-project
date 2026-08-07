import { useQuery } from '@tanstack/react-query'
import { getReviewsByListing } from '../../api/reviews.api'

export function useReviews(listingId: string) {
  return useQuery({
    queryKey: ['reviews', listingId],
    queryFn: () => getReviewsByListing(listingId),
  })
}