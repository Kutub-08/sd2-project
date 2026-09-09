import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createReview } from '../../api/reviews.api'

type CreateReviewVariables = {
  listingId: string
  rating: number
  comment: string
}

export function useCreateReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listingId, rating, comment }: CreateReviewVariables) =>
      createReview(listingId, rating, comment),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.listingId] })
    },
  })
}