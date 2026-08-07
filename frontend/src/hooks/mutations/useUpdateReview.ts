import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReview } from '../../api/reviews.api'
import type { ReviewInput } from '../../types/review.types'

export function useUpdateReview(listingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReviewInput }) => updateReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', listingId] })
    },
  })
}