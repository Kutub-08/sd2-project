import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadListingImage } from '../../api/listings.api'

export function useUploadListingImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ listingId, file }: { listingId: string; file: File }) =>
      uploadListingImage(listingId, file),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['listings'] })
      queryClient.invalidateQueries({ queryKey: ['listing', variables.listingId] })
    },
  })
}
