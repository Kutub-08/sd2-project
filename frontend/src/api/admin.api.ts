import axiosClient from './axiosClient'
import type { ApiSuccess, PaginatedData } from '../types/api.types'
import type { Listing, ListingStatus } from '../types/listing.types'
import type { AdminUser } from '../types/admin.types'
import type { UserRole } from '../types/user.types'

export async function getAdminUsers(params: { page?: number; limit?: number; role?: UserRole }) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<AdminUser>>>('/admin/users', { params })
  return res.data.data
}

export async function updateUserRole(id: string, role: UserRole) {
  const res = await axiosClient.patch<ApiSuccess<AdminUser>>(`/admin/users/${id}/role`, { role })
  return res.data.data
}

export async function toggleUserBan(id: string, banned: boolean) {
  const res = await axiosClient.patch<ApiSuccess<AdminUser>>(`/admin/users/${id}/ban`, { banned })
  return res.data.data
}

export async function getAdminListings(params: { page?: number; limit?: number; status?: ListingStatus }) {
  const res = await axiosClient.get<ApiSuccess<PaginatedData<Listing>>>('/admin/listings', { params })
  return res.data.data
}

export async function updateListingStatus(id: string, status: ListingStatus) {
  const res = await axiosClient.patch<ApiSuccess<Listing>>(`/admin/listings/${id}/status`, { status })
  return res.data.data
}