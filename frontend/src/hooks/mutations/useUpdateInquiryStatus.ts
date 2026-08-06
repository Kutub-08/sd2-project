import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateInquiryStatus } from '../../api/inquiries.api'

export function useUpdateInquiryStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'PENDING' | 'RESPONDED' | 'CLOSED' }) =>
      updateInquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] })
    },
  })
}
