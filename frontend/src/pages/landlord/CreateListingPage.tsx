import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import ListingForm from '../../components/forms/ListingForm'
import { useCreateListing } from '../../hooks/mutations/useCreateListing'
import { useUploadListingImage } from '../../hooks/mutations/useUploadListingImage'
import type { CreateListingInput } from '../../schemas/listing.schema'

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
      onError: () => {
        toast.error('Failed to create listing')
      },
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Create Listing</h1>
      <div className="rounded-lg border bg-white p-6">
        <ListingForm
          onSubmit={onSubmit}
          isSubmitting={createListing.isPending || uploadImage.isPending}
          submitLabel="Create Listing"
        />
      </div>
    </div>
  )
}
