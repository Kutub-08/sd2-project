export type ListingStatus = 'AVAILABLE' | 'RENTED' | 'INACTIVE'

export type Listing = {
  id: string
  title: string
  description: string
  price: number
  sizeSqft: number
  bedrooms: number
  bathrooms: number
  floorNumber: number | null
  address: string
  area: string
  city: string
  latitude: number | null
  longitude: number | null
  amenities: string[]
  status: ListingStatus
  landlordId: string
  landlord?: {
    id: string
    name: string
    email: string
    phone: string
  }
  images: ListingImage[]
  createdAt: string
  updatedAt: string
}

export type ListingImage = {
  id: string
  listingId: string
  imageUrl: string
  isPrimary: boolean
  orderIndex: number
}

export type ListingFilters = {
  minPrice?: number
  maxPrice?: number
  minBedrooms?: number
  maxBedrooms?: number
  minBathrooms?: number
  maxBathrooms?: number
  area?: string
  city?: string
  status?: ListingStatus
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'oldest'
  page?: number
  limit?: number
}
