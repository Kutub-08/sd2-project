import axiosClient from './axiosClient'
import type { ApiSuccess } from '../types/api.types'
import type { Listing } from '../types/listing.types'

export type RecommendResult = {
  query: string
  parsedFilters: {
    maxPrice?: number
    minBedrooms?: number
    area?: string
    amenities?: string[]
  }
  usedFallback: boolean
  results: Listing[]
  total: number
}

export async function recommendListings(query: string) {
  const res = await axiosClient.post<ApiSuccess<RecommendResult>>('/ai/recommend', { query })
  return res.data.data
}
