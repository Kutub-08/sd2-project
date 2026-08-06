import axiosClient from './axiosClient'
import type { ApiSuccess, PaginatedData } from '../types/api.types'
import type { Favorite } from '../types/favorite.types'

type FavoriteItem = Favorite

export async function addFavorite(listingId: string) {
  const res = await axiosClient.post<ApiSuccess<FavoriteItem>>('/favorites', { listingId })
  return res.data.data
}

export async function getFavorites(page = 1, limit = 20) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<FavoriteItem>>>('/favorites', {
    params: { page, limit },
  })
  return res.data.data
}

export async function removeFavorite(id: string) {
  const res = await axiosClient.delete<ApiSuccess<{ message: string }>>(`/favorites/${id}`)
  return res.data.data
}
