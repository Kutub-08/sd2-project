import { useParams, useNavigate, Link } from 'react-router-dom'
import { toast } from 'sonner'
import { useListing } from '../../hooks/queries/useListing'
import { useUpdateListing } from '../../hooks/mutations/useUpdateListing'
import ListingForm from '../../components/forms/ListingForm'
import Skeleton from '../../components/ui/Skeleton'
import type { CreateListingInput } from '../../schemas/listing.schema'

export default function EditListingPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: listing, isLoading, isError } = useListing(id!)
  const updateListing = useUpdateListing()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-6">
        <Skeleton className="mb-6 h-8 w-48" />
        <div className="space-y-4 rounded-lg border bg-white p-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !listing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg font-medium">Listing not found</p>
        <Link to="/landlord/dashboard" className="mt-4 text-sm text-blue-600 underline">
          Back to dashboard
        </Link>
      </div>
    )
  }

  function onSubmit(data: CreateListingInput, _images: File[]) {
    const body: Record<string, unknown> = {
      ...data,
      amenities: data.amenities
        ? data.amenities.split(',').map((a) => a.trim()).filter(Boolean)
        : [],
    }

    updateListing.mutate(
      { id: id!, data: body },
      {
        onSuccess: () => {
          toast.success('Listing updated')
          navigate('/landlord/dashboard')
        },
        onError: () => {
          toast.error('Failed to update listing')
        },
      },
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Edit Listing</h1>
      <div className="rounded-lg border bg-white p-6">
        <ListingForm
          initialData={listing}
          onSubmit={onSubmit}
          isSubmitting={updateListing.isPending}
          submitLabel="Update Listing"
        />
      </div>
    </div>
  )
}
