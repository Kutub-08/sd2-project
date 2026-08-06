import axiosClient from './axiosClient'
import type { ApiSuccess, PaginatedData } from '../types/api.types'
import type { Listing, ListingFilters } from '../types/listing.types'

type BackendFilters = {
  page?: number
  limit?: number
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  bathrooms?: number
  area?: string
  city?: string
  status?: string
  sort?: string
}

function toBackendFilters(filters: ListingFilters): BackendFilters {
  return {
    page: filters.page,
    limit: filters.limit,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.minBedrooms,
    bathrooms: filters.minBathrooms,
    area: filters.area,
    city: filters.city,
    status: filters.status,
    sort: filters.sort,
  }
}

export async function getListings(filters: ListingFilters = {}) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<Listing>>>('/listings', {
    params: toBackendFilters(filters),
  })
  return res.data.data
}

export async function getListingById(id: string) {
  const res = await axiosClient.get<ApiSuccess<Listing>>(`/listings/${id}`)
  return res.data.data
}

export async function createListing(data: Record<string, unknown>) {
  const res = await axiosClient.post<ApiSuccess<Listing>>('/listings', data)
  return res.data.data
}

export async function updateListing(id: string, data: Record<string, unknown>) {
  const res = await axiosClient.put<ApiSuccess<Listing>>(`/listings/${id}`, data)
  return res.data.data
}

export async function deleteListing(id: string) {
  const res = await axiosClient.delete<ApiSuccess<{ message: string }>>(`/listings/${id}`)
  return res.data.data
}

export async function getLandlordListings(landlordId: string) {
  const res = await axiosClient.get<ApiSuccess<Listing[]>>(`/listings/landlord/${landlordId}`)
  return res.data.data
}

export async function uploadListingImage(listingId: string, file: File) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await axiosClient.post<ApiSuccess<ListingImageType>>(`/listings/${listingId}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return res.data.data
}

type ListingImageType = {
  id: string
  listingId: string
  imageUrl: string
  isPrimary: boolean
  orderIndex: number
}
