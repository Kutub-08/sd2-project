import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInquiry } from '../../api/inquiries.api'

export function useCreateInquiry() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listingId, message }: { listingId: string; message: string }) =>
      createInquiry(listingId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}
