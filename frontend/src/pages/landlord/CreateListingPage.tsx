import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'
import ListingForm from '../../components/forms/ListingForm'
import { useCreateListing } from '../../hooks/mutations/useCreateListing'
import { useUploadListingImage } from '../../hooks/mutations/useUploadListingImage'
import type { CreateListingInput } from '../../schemas/listing.schema'
import type { ApiError } from '../../types/api.types'

export default function CreateListingPage() {
  const navigate = useNavigate()
  const createListing = useCreateListing()
  const uploadImage = useUploadListingImage()

  function onSubmit(data: CreateListingInput, images: File[]) {
    const body: Record<string, unknown> = {
      ...data,
      amenities: data.amenities
        ? data.amenities.split(',').map((a) => a.trim()).filter(Boolean)
        : [],
    }

    createListing.mutate(body, {
      onSuccess: (listing) => {
        if (images.length > 0) {
          const uploads = images.map((file) =>
            uploadImage.mutateAsync({ listingId: listing.id, file }),
          )
          Promise.all(uploads)
            .then(() => {
              toast.success('Listing created with images')
              navigate('/landlord/dashboard')
            })
            .catch(() => {
              toast.success('Listing created, but some images failed')
              navigate('/landlord/dashboard')
            })
        } else {
          toast.success('Listing created')
          navigate('/landlord/dashboard')
        }
      },
      onError: (err: unknown) => {
        if (isAxiosError<ApiError>(err) && err.response?.data?.error?.code === 'EMAIL_NOT_VERIFIED') {
          toast.info('Verify your email to publish a listing')
          navigate('/verify-email')
          return
        }
        toast.error('Failed to create listing')
      },
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-teal">Landlord</p>
      <h1 className="mb-6 mt-1 font-display text-2xl font-semibold tracking-tight text-paper">Create Listing</h1>
      <div className="rounded-2xl border border-white/10 bg-ink-soft/60 p-6">
        <ListingForm
          onSubmit={onSubmit}
          isSubmitting={createListing.isPending || uploadImage.isPending}
          submitLabel="Create Listing"
        />
      </div>
    </div>
  )
}
