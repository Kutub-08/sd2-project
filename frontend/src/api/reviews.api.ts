import axiosClient from './axiosClient'
import type { ApiSuccess } from '../types/api.types'
import type { Review, ReviewInput } from '../types/review.types'

export async function getReviewsByListing(listingId: string) {
  const res = await axiosClient.get<ApiSuccess<Review[]>>(`/reviews/listing/${listingId}`)
  return res.data.data
}

export async function createReview(listingId: string, data: ReviewInput) {
  const res = await axiosClient.post<ApiSuccess<Review>>('/reviews', { listingId, ...data })
  return res.data.data
}

export async function updateReview(id: string, data: ReviewInput) {
  const res = await axiosClient.put<ApiSuccess<Review>>(`/reviews/${id}`, data)
  return res.data.data
}

export async function deleteReview(id: string) {
  const res = await axiosClient.delete<ApiSuccess<{ message: string }>>(`/reviews/${id}`)
  return res.data.data
}
