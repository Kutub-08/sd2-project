import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createListingSchema, type CreateListingInput } from '../../schemas/listing.schema'
import type { Listing } from '../../types/listing.types'

type Props = {
  initialData?: Listing
  onSubmit: (data: CreateListingInput, images: File[]) => void
  isSubmitting: boolean
  submitLabel: string
}

export default function ListingForm({ initialData, onSubmit, isSubmitting, submitLabel }: Props) {
  const [images, setImages] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListingInput>({
    resolver: zodResolver(createListingSchema) as any,
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          price: initialData.price,
          sizeSqft: initialData.sizeSqft,
          bedrooms: initialData.bedrooms,
          bathrooms: initialData.bathrooms,
          floorNumber: initialData.floorNumber,
          address: '',
          area: initialData.area,
          city: initialData.city,
          latitude: initialData.lat,
          longitude: initialData.lng,
          amenities: initialData.amenities?.join(', ') ?? '',
        }
      : undefined,
  })

  const onDrop = useCallback((accepted: File[]) => {
    setImages((prev) => [...prev, ...accepted])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/gif': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
  })

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  function handleFormSubmit(data: CreateListingInput) {
    onSubmit(data, images)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium">Title</label>
          <input id="title" {...register('title')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
          <textarea id="description" {...register('description')} rows={4} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium">Price (monthly)</label>
          <input id="price" type="number" step="0.01" {...register('price')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="sizeSqft" className="mb-1 block text-sm font-medium">Size (sqft)</label>
          <input id="sizeSqft" type="number" step="0.01" {...register('sizeSqft')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.sizeSqft && <p className="mt-1 text-sm text-red-600">{errors.sizeSqft.message}</p>}
        </div>

        <div>
          <label htmlFor="bedrooms" className="mb-1 block text-sm font-medium">Bedrooms</label>
          <input id="bedrooms" type="number" {...register('bedrooms')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.bedrooms && <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>}
        </div>

        <div>
          <label htmlFor="bathrooms" className="mb-1 block text-sm font-medium">Bathrooms</label>
          <input id="bathrooms" type="number" {...register('bathrooms')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.bathrooms && <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>}
        </div>

        <div>
          <label htmlFor="floorNumber" className="mb-1 block text-sm font-medium">Floor number</label>
          <input id="floorNumber" type="number" {...register('floorNumber')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.floorNumber && <p className="mt-1 text-sm text-red-600">{errors.floorNumber.message}</p>}
        </div>

        <div>
          <label htmlFor="area" className="mb-1 block text-sm font-medium">Area</label>
          <input id="area" {...register('area')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.area && <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>}
        </div>

        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium">City</label>
          <input id="city" {...register('city')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className="mb-1 block text-sm font-medium">Address</label>
          <input id="address" {...register('address')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="latitude" className="mb-1 block text-sm font-medium">Latitude</label>
          <input id="latitude" type="number" step="any" {...register('latitude')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>}
        </div>

        <div>
          <label htmlFor="longitude" className="mb-1 block text-sm font-medium">Longitude</label>
          <input id="longitude" type="number" step="any" {...register('longitude')} className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="amenities" className="mb-1 block text-sm font-medium">Amenities (comma-separated)</label>
          <input id="amenities" {...register('amenities')} placeholder="e.g. WiFi, Parking, AC" className="block w-full rounded border px-3 py-2 text-sm" />
          {errors.amenities && <p className="mt-1 text-sm text-red-600">{errors.amenities.message}</p>}
        </div>
      </div>

      {!initialData && (
        <div>
          <label className="mb-1 block text-sm font-medium">Images</label>
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed p-6 text-sm text-gray-500 transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop images here...</p>
            ) : (
              <p>Drag & drop images, or click to select (JPEG, PNG, GIF, WebP — max 5MB each)</p>
            )}
          </div>

          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {images.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i}`}
                    className="h-20 w-24 rounded border object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
