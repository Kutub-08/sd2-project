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

export type AreaPriceResult = {
  query: string
  area: string
  summary: {
    count: number
    minPrice: number | null
    avgPrice: number | null
    maxPrice: number | null
  }
  cheapest: Listing[]
  bestReviewed: Listing[]
  insight: string
}

export async function recommendListings(query: string) {
  const res = await axiosClient.post<ApiSuccess<RecommendResult>>('/ai/recommend', { query })
  return res.data.data
}

export async function areaPrice(query: string) {
  const res = await axiosClient.post<ApiSuccess<AreaPriceResult>>('/ai/price', { query })
  return res.data.data
}
