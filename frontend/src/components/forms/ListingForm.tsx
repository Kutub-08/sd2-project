import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImagePlus, X, Save, Loader2 } from 'lucide-react'
import { createListingSchema, type CreateListingInput } from '../../schemas/listing.schema'
import type { Listing } from '../../types/listing.types'

type Props = {
  initialData?: Listing
  onSubmit: (data: CreateListingInput, images: File[]) => void
  isSubmitting: boolean
  submitLabel: string
}

const inputClass =
  'block w-full rounded-lg border border-line bg-ink-soft px-3 py-2 text-sm text-paper placeholder-mist/50 transition-colors focus:border-teal/50 focus:outline-none'
const labelClass = 'mb-1 block text-xs font-medium text-mist'
const errorClass = 'mt-1 text-xs text-red-400'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className={errorClass}>{message}</p>
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
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>Title</label>
          <input id="title" {...register('title')} className={inputClass} />
          <FieldError message={errors.title?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>Description</label>
          <textarea id="description" {...register('description')} rows={4} className={`${inputClass} resize-y`} />
          <FieldError message={errors.description?.message} />
        </div>

        <div>
          <label htmlFor="price" className={labelClass}>Price (monthly, ৳)</label>
          <input id="price" type="number" step="0.01" {...register('price')} className={inputClass} />
          <FieldError message={errors.price?.message} />
        </div>

        <div>
          <label htmlFor="sizeSqft" className={labelClass}>Size (sqft)</label>
          <input id="sizeSqft" type="number" step="0.01" {...register('sizeSqft')} className={inputClass} />
          <FieldError message={errors.sizeSqft?.message} />
        </div>

        <div>
          <label htmlFor="bedrooms" className={labelClass}>Bedrooms</label>
          <input id="bedrooms" type="number" {...register('bedrooms')} className={inputClass} />
          <FieldError message={errors.bedrooms?.message} />
        </div>

        <div>
          <label htmlFor="bathrooms" className={labelClass}>Bathrooms</label>
          <input id="bathrooms" type="number" {...register('bathrooms')} className={inputClass} />
          <FieldError message={errors.bathrooms?.message} />
        </div>

        <div>
          <label htmlFor="floorNumber" className={labelClass}>Floor number</label>
          <input id="floorNumber" type="number" {...register('floorNumber')} className={inputClass} />
          <FieldError message={errors.floorNumber?.message} />
        </div>

        <div>
          <label htmlFor="area" className={labelClass}>Area</label>
          <input id="area" {...register('area')} className={inputClass} />
          <FieldError message={errors.area?.message} />
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>City</label>
          <input id="city" {...register('city')} className={inputClass} />
          <FieldError message={errors.city?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClass}>Address</label>
          <input id="address" {...register('address')} className={inputClass} />
          <FieldError message={errors.address?.message} />
        </div>

        <div>
          <label htmlFor="latitude" className={labelClass}>Latitude</label>
          <input id="latitude" type="number" step="any" {...register('latitude')} className={inputClass} />
          <FieldError message={errors.latitude?.message} />
        </div>

        <div>
          <label htmlFor="longitude" className={labelClass}>Longitude</label>
          <input id="longitude" type="number" step="any" {...register('longitude')} className={inputClass} />
          <FieldError message={errors.longitude?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="amenities" className={labelClass}>Amenities (comma-separated)</label>
          <input id="amenities" {...register('amenities')} placeholder="e.g. WiFi, Parking, AC" className={inputClass} />
          <FieldError message={errors.amenities?.message} />
        </div>
      </div>

      {!initialData && (
        <div>
          <label className={labelClass}>Images — after uploading, set the first as cover</label>
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-sm transition-colors ${
              isDragActive
                ? 'border-teal bg-teal/10 text-teal'
                : 'border-line bg-ink-soft/40 text-mist hover:border-teal/40 hover:text-paper'
            }`}
          >
            <input {...getInputProps()} />
            <ImagePlus className="mb-2 h-8 w-8" />
            {isDragActive ? (
              <p>Drop images here...</p>
            ) : (
              <p>Drag &amp; drop images, or click to select (JPEG, PNG, GIF, WebP &mdash; max 5MB each)</p>
            )}
          </div>

          {images.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {images.map((file, i) => (
                <div key={i} className="group relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${i + 1}`}
                    className={`h-20 w-24 rounded-lg border object-cover ${
                      i === 0 ? 'border-teal' : 'border-white/10'
                    }`}
                  />
                  {i === 0 && (
                    <span className="absolute left-1 top-1 rounded bg-teal px-1.5 py-0.5 text-[10px] font-semibold text-ink-950">
                      Cover
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-transform hover:scale-110"
                    aria-label={`Remove image ${i + 1}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-teal px-6 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  )
}