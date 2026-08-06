import { z } from 'zod'

export const createListingSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive').max(9999999.99, 'Price too high'),
  sizeSqft: z.coerce.number().positive('Size must be positive').max(999999.99, 'Size too high'),
  bedrooms: z.coerce.number().int().min(0).max(50, 'Bedrooms must be 50 or less'),
  bathrooms: z.coerce.number().int().min(0).max(50, 'Bathrooms must be 50 or less'),
  floorNumber: z.coerce.number().int().optional(),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  area: z.string().min(1, 'Area is required'),
  city: z.string().min(1, 'City is required'),
  latitude: z.coerce.number().min(-90).max(90, 'Invalid latitude'),
  longitude: z.coerce.number().min(-180).max(180, 'Invalid longitude'),
  amenities: z.string().optional(),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
