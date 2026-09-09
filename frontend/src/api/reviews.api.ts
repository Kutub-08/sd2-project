import axiosClient from './axiosClient'
import type { ApiSuccess } from '../types/api.types'
import type { Review } from '../types/review.types'

export async function getReviewByListing(listingId: string) {
  const res = await axiosClient.get<ApiSuccess<Review[]>>(`/reviews/listing/${listingId}`)
  return res.data.data
}

export async function createReview(listingId: string, rating: number, comment: string) {
  const res = await axiosClient.post<ApiSuccess<Review>>('/reviews', { listingId, rating, comment })
  return res.data.data
}