import axiosClient from './axiosClient'
import type { ApiSuccess } from '../types/api.types'
import type { User } from '../types/user.types'

export async function updateProfile(
  id: string,
  data: { name?: string; phone?: string },
): Promise<User> {
  const res = await axiosClient.patch<ApiSuccess<User>>(`/users/${id}`, data)
  return res.data.data
}