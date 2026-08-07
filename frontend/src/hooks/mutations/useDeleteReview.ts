import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReview } from '../../api/reviews.api'

export function useDeleteReview(listingId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', listingId] })
    },
  })
}