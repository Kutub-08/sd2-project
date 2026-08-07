import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview } from '../../api/reviews.api'
import type { ReviewInput } from '../../types/review.types'

export function useCreateReview(listingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewInput) => createReview(listingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', listingId] })
    },
  })
}